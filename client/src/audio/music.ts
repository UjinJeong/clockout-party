import { timeMood } from '../game/timeEvents';
import type { Theme } from '@party/shared';
import { filter, fm, gain, hz, impulse, noise, noiseBuffer, tone, type Ctx } from './synth';

/**
 * Background music that never repeats exactly: a chord loop per place, played
 * by a little band that improvises over it (a few random fills and melody
 * notes each bar). The score is plain data + pure functions (`barEvents`), so
 * it can be tested; `Music` just schedules it into WebAudio a moment ahead.
 */
export interface Chord { bass: number; notes: number[] }
export interface Style {
  bpm: number;
  /** 0.5 straight … 0.66 lazy swing (the off-beat 8th lands this far through the beat) */
  swing: number;
  chords: Chord[];          // one per bar
  /** which 8th-note steps (0–7) the chords sound on, and the bass notes as [step, semitones above the root] */
  comp: number[];
  bass: [number, number][];
  drums: { kick: number[]; snare: number[]; hat: number[]; shaker?: boolean };
  instrument: 'ep' | 'marimba';
  /** arpeggiate the chord on every 8th (bossa marimba) instead of block chords */
  arp?: boolean;
  /** melody notes to improvise from (MIDI), and how likely a note is per beat */
  scale: number[];
  melody: number;
  bed: 'room' | 'vinyl' | 'waves';
  reverb: { seconds: number; wet: number };
  /** overall loudness of this style */
  level: number;
}

export const STYLES: Record<Theme, Style> = {
  // 전시장: a late-evening jazz trio in a big hall — F major ii–V–I–vi, Rhodes and upright bass, brushes
  gallery: {
    bpm: 72, swing: 0.64,
    chords: [
      { bass: 43, notes: [58, 62, 65, 69] }, // Gm9
      { bass: 36, notes: [58, 64, 69, 74] }, // C13
      { bass: 41, notes: [57, 60, 64, 67] }, // Fmaj9
      { bass: 38, notes: [53, 57, 60, 64] }, // Dm9
    ],
    comp: [0, 3], bass: [[0, 0], [4, 7], [6, 12]],
    drums: { kick: [], snare: [2, 6], hat: [] },
    instrument: 'ep', scale: [72, 74, 77, 79, 81, 84], melody: 0.35,
    bed: 'room', reverb: { seconds: 2.8, wet: 0.32 }, level: 0.9,
  },
  // 홈파티: lo-fi beat in someone's living room — C major, dusty Rhodes, vinyl crackle
  home: {
    bpm: 78, swing: 0.62,
    chords: [
      { bass: 36, notes: [52, 55, 59, 62] }, // Cmaj9
      { bass: 45, notes: [55, 60, 64, 67] }, // Am7
      { bass: 38, notes: [53, 57, 60, 65] }, // Dm7
      { bass: 43, notes: [53, 59, 62, 65] }, // G7
    ],
    comp: [0, 5], bass: [[0, 0], [3, 0], [5, 7]],
    drums: { kick: [0, 5], snare: [2, 6], hat: [0, 1, 2, 3, 4, 5, 6, 7] },
    instrument: 'ep', scale: [72, 74, 76, 79, 81], melody: 0.25,
    bed: 'vinyl', reverb: { seconds: 1.1, wet: 0.14 }, level: 0.85,
  },
  // 풀파티: bossa by the pool — D major, marimba, shaker, waves
  pool: {
    bpm: 100, swing: 0.5,
    chords: [
      { bass: 38, notes: [54, 57, 61, 64] }, // Dmaj9
      { bass: 47, notes: [57, 62, 66, 69] }, // Bm7
      { bass: 40, notes: [55, 59, 62, 66] }, // Em9
      { bass: 45, notes: [55, 61, 64, 67] }, // A7
    ],
    comp: [], arp: true, bass: [[0, 0], [3, 7], [4, 0], [7, 7]],
    drums: { kick: [], snare: [], hat: [], shaker: true },
    instrument: 'marimba', scale: [74, 76, 78, 81, 83, 86], melody: 0.3,
    bed: 'waves', reverb: { seconds: 0.7, wet: 0.08 }, level: 0.85,
  },
};

/** 불금: on a Friday evening the band picks the tempo up. */
export const FRIDAY_TEMPO = 1.12;

/** After midnight and before dawn the band plays softer and slower, without drums. */
export const isNight = (hour: number) => hour >= 0 && hour < 5;

export type Part = 'chord' | 'arp' | 'bass' | 'melody' | 'kick' | 'snare' | 'hat' | 'shaker';
export interface NoteEvent { step: number; part: Part; notes: number[]; vel: number }

/** Everything one bar plays. `rand` is injectable so tests can pin it. */
export function barEvents(style: Style, bar: number, night: boolean, rand: () => number = Math.random): NoteEvent[] {
  const chord = style.chords[bar % style.chords.length];
  const ev: NoteEvent[] = [];
  for (const s of style.comp) ev.push({ step: s, part: 'chord', notes: chord.notes, vel: s === 0 ? 0.8 : 0.5 });
  if (style.arp) {
    const up = [...chord.notes, chord.notes[0] + 12, ...chord.notes.slice(1, 3).map(n => n + 12)];
    for (let s = 0; s < 8; s++) if (!night || s % 2 === 0) ev.push({ step: s, part: 'arp', notes: [up[(s * 3 + (bar % 2) * 2) % up.length]], vel: s % 2 ? 0.45 : 0.7 });
  }
  for (const [s, semis] of style.bass) ev.push({ step: s, part: 'bass', notes: [chord.bass + semis], vel: s === 0 ? 0.9 : 0.6 });
  if (!night) {
    for (const s of style.drums.kick) ev.push({ step: s, part: 'kick', notes: [], vel: 0.8 });
    for (const s of style.drums.snare) ev.push({ step: s, part: 'snare', notes: [], vel: 0.6 });
    for (const s of style.drums.hat) ev.push({ step: s, part: 'hat', notes: [], vel: s % 2 ? 0.35 : 0.55 });
    if (style.drums.shaker) for (let s = 0; s < 8; s++) ev.push({ step: s, part: 'shaker', notes: [], vel: s % 2 ? 0.4 : 0.7 });
  }
  // a few melody notes, leaning on the chord's own tones so it never clashes
  const chance = style.melody * (night ? 0.5 : 1);
  const pcs = new Set(chord.notes.map(n => n % 12));
  for (let s = 1; s < 8; s += 2) {
    if (rand() > chance) continue;
    const fits = style.scale.filter(n => pcs.has(n % 12) || rand() < 0.3);
    const pool = fits.length ? fits : style.scale;
    ev.push({ step: s, part: 'melody', notes: [pool[Math.floor(rand() * pool.length)]], vel: 0.5 + rand() * 0.3 });
  }
  return ev;
}

/** Seconds from the start of the bar to an 8th-note step, with swing. */
export function stepTime(style: Style, step: number, bpm = style.bpm): number {
  const beat = 60 / bpm;
  return Math.floor(step / 2) * beat + (step % 2 ? style.swing * beat : 0);
}

// ---------------------------------------------------------------- the band

function play(ctx: Ctx, out: AudioNode, ev: NoteEvent, style: Style, t: number, beat: number) {
  const v = ev.vel;
  switch (ev.part) {
    case 'chord':
      ev.notes.forEach((n, i) => fm(ctx, out, t + i * 0.012, hz(n), { peak: 0.045 * v, ratio: 1, index: 1.4, bright: 0.12, decay: beat * 2.6, attack: 0.008 }));
      break;
    case 'arp':
    case 'melody':
      if (style.instrument === 'marimba' || ev.part === 'arp') {
        const f = hz(ev.notes[0]);
        tone(ctx, out, t, { freq: f, peak: 0.075 * v, attack: 0.002, decay: 0.5 });
        tone(ctx, out, t, { freq: f * 4, peak: 0.02 * v, attack: 0.001, decay: 0.07 });
      } else fm(ctx, out, t, hz(ev.notes[0]), { peak: 0.05 * v, ratio: 1, index: 1.1, bright: 0.15, decay: beat * 1.6 });
      break;
    case 'bass': {
      const f = filter(ctx, out, 'lowpass', 420, 0.8);
      tone(ctx, f, t, { type: 'triangle', freq: hz(ev.notes[0]), peak: 0.2 * v, attack: 0.012, decay: beat * 1.3 });
      break;
    }
    case 'kick': tone(ctx, out, t, { freq: 105, glide: 44, glideTime: 0.12, peak: 0.28 * v, attack: 0.002, decay: 0.24 }); break;
    case 'snare':
      // brushes in the gallery, a dusty snare at home
      if (style.bed === 'room') noise(ctx, out, t, { freq: 2600, q: 0.6, peak: 0.035 * v, attack: 0.03, decay: 0.16 });
      else { noise(ctx, out, t, { freq: 1800, q: 0.8, peak: 0.09 * v, decay: 0.13 }); tone(ctx, out, t, { freq: 190, peak: 0.05 * v, decay: 0.07 }); }
      break;
    case 'hat': noise(ctx, out, t, { type: 'highpass', freq: 7500, peak: 0.03 * v, decay: 0.035 }); break;
    case 'shaker': noise(ctx, out, t, { freq: 6200, q: 1.2, peak: 0.045 * v, attack: 0.012, decay: 0.05 }); break;
  }
}

/** A steady sound under the music: hall murmur, vinyl crackle, or waves. */
function startBed(ctx: Ctx, out: AudioNode, kind: Style['bed']): () => void {
  const src = ctx.createBufferSource();
  src.loop = true;
  const stops: (() => void)[] = [];
  if (kind === 'vinyl') {
    const n = ctx.sampleRate * 4, b = ctx.createBuffer(1, n, ctx.sampleRate), d = b.getChannelData(0);
    for (let i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * 0.012 + (Math.random() < 0.0007 ? (Math.random() * 2 - 1) * 0.16 : 0);
    src.buffer = b;
    src.connect(filter(ctx, gain(ctx, out, 0.7), 'highpass', 900));
  } else {
    src.buffer = noiseBuffer(ctx);
    const g = gain(ctx, out, kind === 'waves' ? 0.05 : 0.018);
    const f = filter(ctx, g, kind === 'waves' ? 'lowpass' : 'bandpass', kind === 'waves' ? 650 : 420, kind === 'waves' ? 0.5 : 0.9);
    src.connect(f);
    // waves roll in and out every ~9 s; the hall murmur drifts slowly
    const lfo = ctx.createOscillator(), depth = ctx.createGain();
    lfo.frequency.value = kind === 'waves' ? 0.11 : 0.07;
    depth.gain.value = kind === 'waves' ? 0.04 : 0.008;
    lfo.connect(depth).connect(g.gain);
    lfo.start(); stops.push(() => lfo.stop());
  }
  src.start();
  stops.push(() => src.stop());
  return () => stops.forEach(s => { try { s(); } catch { /* already stopped */ } });
}

/** Render some bars straight into a context (for checking levels offline, without the live scheduler). */
export function renderBars(ctx: Ctx, out: AudioNode, theme: Theme, bars: number, night = false): number {
  const style = STYLES[theme];
  const dry = gain(ctx, out, style.level * (night ? 0.7 : 1));
  const verb = ctx.createConvolver(); verb.buffer = impulse(ctx, style.reverb.seconds);
  verb.connect(gain(ctx, out, style.reverb.wet)); dry.connect(verb);
  const bpm = style.bpm * (night ? 0.85 : 1), barLen = (60 / bpm) * 4;
  for (let b = 0; b < bars; b++) for (const ev of barEvents(style, b, night)) play(ctx, dry, ev, style, 0.1 + b * barLen + stepTime(style, ev.step, bpm), 60 / bpm);
  return 0.1 + bars * barLen;
}

const LOOKAHEAD = 0.35;

export class Music {
  private out: GainNode;
  private dry: GainNode;
  private wet: GainNode;
  private timer = 0;
  private bar = 0;
  private barStart = 0;
  private stopBed: () => void;
  private style: Style;
  /** when the first bar started, and the tempo now, for `beats()` */
  private origin = 0;
  private bpmNow = 0;

  constructor(private ctx: AudioContext, dest: AudioNode, readonly theme: Theme, private hour: () => number) {
    this.style = STYLES[theme];
    this.out = ctx.createGain();
    this.out.connect(dest);
    // fade in over two seconds
    this.out.gain.setValueAtTime(0, ctx.currentTime);
    this.out.gain.linearRampToValueAtTime(1, ctx.currentTime + 2);
    this.dry = gain(ctx, this.out, this.style.level);
    const verb = ctx.createConvolver();
    verb.buffer = impulse(ctx, this.style.reverb.seconds);
    this.wet = gain(ctx, this.out, this.style.reverb.wet);
    verb.connect(this.wet);
    this.dry.connect(verb);
    this.stopBed = startBed(ctx, this.out, this.style.bed);
    this.barStart = ctx.currentTime + 0.3;
    this.origin = this.barStart; this.bpmNow = this.style.bpm;
    this.timer = window.setInterval(() => this.schedule(), 90);
    this.schedule();
  }

  private schedule() {
    const now = this.ctx.currentTime;
    const night = isNight(this.hour());
    const bpm = this.style.bpm * (night ? 0.85 : 1) * (timeMood(new Date()).friday && !night ? FRIDAY_TEMPO : 1);
    const barLen = (60 / bpm) * 4;
    if (bpm !== this.bpmNow) { this.origin = this.ctx.currentTime - this.beats() * 60 / bpm; this.bpmNow = bpm; }
    // fell asleep in a background tab? pick up from now instead of catching up
    if (this.barStart + barLen < now) this.barStart = now + 0.05;
    while (this.barStart < now + LOOKAHEAD) {
      this.dry.gain.setValueAtTime(this.style.level * (night ? 0.7 : 1), this.barStart);
      for (const ev of barEvents(this.style, this.bar, night)) {
        play(this.ctx, this.dry, ev, this.style, this.barStart + stepTime(this.style, ev.step, bpm), 60 / bpm);
      }
      this.bar++;
      this.barStart += barLen;
    }
  }

  /** Beats played since the music started (fractional): the DJ nods along to this. */
  beats() { return Math.max(0, (this.ctx.currentTime - this.origin) * this.bpmNow / 60); }

  /** Fade out and let go. */
  stop() {
    clearInterval(this.timer);
    const t = this.ctx.currentTime;
    this.out.gain.cancelScheduledValues(t);
    this.out.gain.setValueAtTime(this.out.gain.value, t);
    this.out.gain.linearRampToValueAtTime(0, t + 1.2);
    setTimeout(() => { this.stopBed(); this.out.disconnect(); }, 1400);
  }
}
