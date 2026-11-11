import { describe, it, expect, beforeEach, vi } from 'vitest';
import { THEMES } from '@party/shared';
import { FakeCtx, FakeNode } from './fake-audio';
import { SFX, type SfxName } from '../src/audio/sfx';
import { STYLES, barEvents, isNight, stepTime } from '../src/audio/music';

describe('every sound effect', () => {
  const names = Object.keys(SFX) as SfxName[];

  it('covers every reaction, moving about and the big moments', () => {
    for (const n of ['cheers', 'laugh', 'clap', 'heart', 'wow', 'wave', 'nod', 'zone', 'sigh',
      'pop', 'send', 'step-wood', 'step-deck', 'step-water', 'sit', 'lie', 'stand', 'charged', 'lift', 'snore',
      'mood-drained', 'mood-meh', 'mood-sleepy', 'mood-hyped', 'tick', 'dice'])
      expect(names).toContain(n);
  });

  it.each(names)('%s: builds, reaches the speakers, stops by itself, stays soft', name => {
    const ctx = new FakeCtx(), out = new FakeNode('out', ctx);
    const end = SFX[name](ctx as unknown as BaseAudioContext, out as unknown as AudioNode, 1, 1);
    expect(end).toBeGreaterThan(1);
    expect(end - 1).toBeLessThan(name === 'lift' ? 3.6 : 2);
    const sources = ctx.nodes.filter(n => n.kind === 'osc' || n.kind === 'source');
    expect(sources.length).toBeGreaterThan(0);
    for (const s of sources) {
      expect(s.starts.length, `${name} ${s.kind} started`).toBe(1);
      expect(s.stops.length, `${name} ${s.kind} stops`).toBe(1);
      expect(s.stops[0]).toBeLessThanOrEqual(end + 0.1);
    }
    // every sound-making node ends up at `out` (LFOs feed a frequency or a gain instead)
    const heard = sources.filter(s => ctx.reaches(s, out));
    expect(heard.length).toBeGreaterThan(0);
    // no single envelope louder than a glass clink
    for (const g of ctx.nodes.filter(n => n.kind === 'gain' && !n.modulates)) expect(g.gain.peak, name).toBeLessThanOrEqual(0.5);
  });
});

describe('background music', () => {
  it.each(THEMES)('%s: chords and melody stay in key, bass on the downbeat', theme => {
    const style = STYLES[theme];
    for (let bar = 0; bar < 16; bar++) {
      const chord = style.chords[bar % style.chords.length];
      const ev = barEvents(style, bar, false);
      expect(ev.find(e => e.part === 'bass' && e.step === 0)?.notes[0]).toBe(chord.bass);
      for (const e of ev.filter(e => e.part === 'melody')) expect(style.scale).toContain(e.notes[0]);
      for (const e of ev.filter(e => e.part === 'arp')) expect(chord.notes.map(n => n % 12)).toContain(e.notes[0] % 12);
      for (const e of ev) expect(e.step).toBeGreaterThanOrEqual(0), expect(e.step).toBeLessThan(8);
    }
  });

  it('each place has its own sound', () => {
    expect(STYLES.gallery.bed).toBe('room');
    expect(STYLES.home.bed).toBe('vinyl');
    expect(STYLES.pool.bed).toBe('waves');
    expect(STYLES.home.drums.kick.length).toBeGreaterThan(0);  // lo-fi beat
    expect(STYLES.pool.instrument).toBe('marimba');
    expect(STYLES.gallery.reverb.seconds).toBeGreaterThan(STYLES.pool.reverb.seconds); // a big hall vs outdoors
  });

  it('after midnight: no drums, fewer notes', () => {
    expect(isNight(2)).toBe(true); expect(isNight(21)).toBe(false);
    const rand = () => 0.1;
    for (const theme of THEMES) {
      const day = barEvents(STYLES[theme], 0, false, rand), night = barEvents(STYLES[theme], 0, true, rand);
      expect(night.some(e => ['kick', 'snare', 'hat', 'shaker'].includes(e.part))).toBe(false);
      expect(night.length).toBeLessThan(day.length);
    }
  });

  it('swing pushes the off-beats late', () => {
    const s = STYLES.gallery, beat = 60 / s.bpm;
    expect(stepTime(s, 2)).toBeCloseTo(beat);
    expect(stepTime(s, 3)).toBeGreaterThan(beat * 1.6);
    expect(stepTime(STYLES.pool, 1)).toBeCloseTo(30 / STYLES.pool.bpm); // bossa: straight
  });
});

describe('hearing others', () => {
  it('loud up close, fading with distance, silent across the room; right is right', async () => {
    const { spatial, HEAR_FAR } = await import('../src/audio/sound');
    expect(spatial(0.5, 0.5).gain).toBe(1);
    expect(spatial(5, 0).gain).toBeLessThan(spatial(3, 0).gain);
    expect(spatial(HEAR_FAR + 1, 0).gain).toBe(0);
    expect(spatial(3, 0).pan).toBeGreaterThan(0);
    expect(spatial(-3, 0).pan).toBeLessThan(0);
  });
});

describe('the 🔊 button', () => {
  let store: Record<string, string>;
  beforeEach(() => {
    vi.resetModules();
    store = {};
    (globalThis as any).localStorage = { getItem: (k: string) => store[k] ?? null, setItem: (k: string, v: string) => { store[k] = v; }, removeItem: (k: string) => { delete store[k]; } };
    (globalThis as any).document = { hidden: false, addEventListener() {} };
    (globalThis as any).window = { AudioContext: FakeCtx, setInterval, clearInterval, setTimeout };
  });

  it('is silent until the first tap, then plays', async () => {
    const { Sound } = await import('../src/audio/sound');
    const s = new Sound();
    expect(s.play('pop')).toBe(false);
    s.unlock();
    expect(s.play('pop')).toBe(true);
  });

  it('cycles all → effects only → off, and remembers', async () => {
    const { Sound } = await import('../src/audio/sound');
    const s = new Sound(); s.unlock();
    expect(s.mode).toBe('all');
    expect(s.cycle()).toBe('sfx');
    expect(s.play('cheers')).toBe(true);
    expect(s.cycle()).toBe('off');
    expect(s.play('cheers')).toBe(false);
    expect(new Sound().mode).toBe('off'); // next visit
    expect(s.cycle()).toBe('all');
  });

  it('skips sounds from across the room', async () => {
    const { Sound } = await import('../src/audio/sound');
    const s = new Sound(); s.unlock();
    s.setListener(0, 0);
    expect(s.play('laugh', { at: { x: 1, z: 1 } })).toBe(true);
    expect(s.play('laugh', { at: { x: 40, z: 0 } })).toBe(false);
  });

  it('music plays only in "all", and follows the place', async () => {
    const { Sound } = await import('../src/audio/sound');
    const s = new Sound(); s.unlock();
    s.setMusic('pool');
    expect((s as any).music?.theme).toBe('pool');
    s.setMusic('home');
    expect((s as any).music?.theme).toBe('home');
    s.cycle(); // effects only
    expect((s as any).music).toBeNull();
    s.cycle(); s.cycle(); // back to all
    expect((s as any).music?.theme).toBe('home');
    s.setMusic(null);
    expect((s as any).music).toBeNull();
  });
});
