import type { Theme } from '@party/shared';
import { load, save } from '../ui/dom';
import { Music } from './music';
import { SFX, type SfxName } from './sfx';

/**
 * The party's sound: one place that owns the AudioContext, the volume
 * buses and the 🔊 setting. Nothing makes a sound until the visitor has
 * clicked or tapped once (browsers require it), and nothing plays while the
 * tab is hidden.
 *
 *   master ─┬─ music  (background band, ducked under voice notes)
 *           └─ sfx    (effects; others' effects are quieter with distance and panned left/right)
 */
export type SoundMode = 'all' | 'sfx' | 'off';
export const SOUND_MODES: SoundMode[] = ['all', 'sfx', 'off'];
export const SOUND_LABEL: Record<SoundMode, { icon: string; text: string }> = {
  all: { icon: '🔊', text: '소리 켜짐' },
  sfx: { icon: '🔉', text: '효과음만 (음악 끔)' },
  off: { icon: '🔇', text: '소리 끔' },
};

/** Effects from others: full volume up close, gone by this distance (m). */
export const HEAR_FAR = 10;

/**
 * How loud, and how far left/right, a sound `dx`/`dz` metres away from you is.
 * The camera always looks down −z, so +x is to your right on screen.
 */
export function spatial(dx: number, dz: number): { gain: number; pan: number } {
  const d = Math.hypot(dx, dz);
  const near = 2;
  const gain = d <= near ? 1 : Math.max(0, 1 - (d - near) / (HEAR_FAR - near)) ** 1.6;
  const pan = Math.max(-1, Math.min(1, dx / 6)) * 0.7;
  return { gain, pan };
}

export interface PlayOpts {
  /** where the sound comes from (omit for your own sounds: centre, full volume) */
  at?: { x: number; z: number };
  delay?: number;
  volume?: number;
  pitch?: number;
}

const MAX_VOICES = 28;
export const MUSIC_LEVEL = 0.85;
export const SFX_LEVEL = 1.3;

export class Sound {
  ctx: AudioContext | null = null;
  mode: SoundMode;
  private master!: GainNode;
  private musicBus!: GainNode;
  private sfxBus!: GainNode;
  private music: Music | null = null;
  private want: { theme: Theme; hour: () => number } | null = null;
  private listener = { x: 0, z: 0 };
  private voices = 0;
  private snoring = 0;
  private duckUntil = 0;

  constructor() {
    const saved = load<SoundMode>('party.sound');
    this.mode = saved && SOUND_MODES.includes(saved) ? saved : 'all';
  }

  /** Call from a click/tap: creates or wakes the audio (browsers only allow it after a gesture). */
  unlock() {
    if (!this.ctx) {
      const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!AC) return;
      try { this.ctx = new AC({ latencyHint: 'interactive' }); } catch { return; }
      const c = this.ctx;
      // a gentle limiter at the end, so a burst of everyone cheering never clips
      const limit = c.createDynamicsCompressor();
      limit.threshold.value = -10; limit.knee.value = 8; limit.ratio.value = 6; limit.attack.value = 0.004; limit.release.value = 0.2;
      limit.connect(c.destination);
      this.master = c.createGain(); this.master.connect(limit);
      this.musicBus = c.createGain(); this.musicBus.connect(this.master);
      this.sfxBus = c.createGain(); this.sfxBus.connect(this.master);
      this.applyMode();
      document.addEventListener('visibilitychange', () => {
        if (document.hidden) void c.suspend().catch(() => {});
        else if (this.mode !== 'off') void c.resume().catch(() => {});
      });
      if (this.want) this.startMusic();
    }
    if (this.ctx.state !== 'running' && this.mode !== 'off' && !document.hidden) void this.ctx.resume().catch(() => {});
  }

  setMode(m: SoundMode) {
    this.mode = m;
    save('party.sound', m);
    this.applyMode();
  }

  /** 🔊 → 🔉 → 🔇 → 🔊 */
  cycle(): SoundMode {
    this.setMode(SOUND_MODES[(SOUND_MODES.indexOf(this.mode) + 1) % SOUND_MODES.length]);
    return this.mode;
  }

  private applyMode() {
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    this.musicBus.gain.setTargetAtTime(this.mode === 'all' ? MUSIC_LEVEL : 0, t, 0.15);
    this.sfxBus.gain.setTargetAtTime(this.mode === 'off' ? 0 : SFX_LEVEL, t, 0.05);
    if (this.mode === 'off') void this.ctx.suspend().catch(() => {});
    else if (!document.hidden) void this.ctx.resume().catch(() => {});
    if (this.mode === 'all' && this.want && !this.music) this.startMusic();
    if (this.mode !== 'all' && this.music) { this.music.stop(); this.music = null; }
  }

  /** Where you are, for distance and left/right. */
  setListener(x: number, z: number) { this.listener.x = x; this.listener.z = z; }

  /** Play an effect. Returns false if it was skipped (muted, too far, too busy). */
  play(name: SfxName, o: PlayOpts = {}): boolean {
    const c = this.ctx;
    if (!c || this.mode === 'off' || c.state !== 'running' || this.voices >= MAX_VOICES) return false;
    let vol = o.volume ?? 1, pan = 0;
    if (o.at) {
      const s = spatial(o.at.x - this.listener.x, o.at.z - this.listener.z);
      vol *= s.gain; pan = s.pan;
    }
    if (vol < 0.02) return false;
    const g = c.createGain(); g.gain.value = vol;
    if (pan && c.createStereoPanner) { const p = c.createStereoPanner(); p.pan.value = pan; g.connect(p); p.connect(this.sfxBus); }
    else g.connect(this.sfxBus);
    const t = c.currentTime + 0.01 + (o.delay ?? 0);
    let end = t + 1;
    try { end = SFX[name](c, g, t, o.pitch ?? 1); } catch { /* a broken recipe must never break the party */ }
    this.voices++;
    setTimeout(() => { this.voices--; g.disconnect(); }, (end - c.currentTime) * 1000 + 100);
    return true;
  }

  /** Background music for a place (null: none). Starts once sound is unlocked and the mode allows. */
  setMusic(theme: Theme | null, hour: () => number = () => new Date().getHours()) {
    if (this.music && (!theme || this.music.theme !== theme)) { this.music.stop(); this.music = null; }
    this.want = theme ? { theme, hour } : null;
    if (theme && !this.music) this.startMusic();
  }

  private startMusic() {
    if (!this.ctx || !this.want || this.mode !== 'all' || this.music) return;
    this.music = new Music(this.ctx, this.musicBus, this.want.theme, this.want.hour);
  }

  /**
   * Beats since the music started — the DJ and the stage lights move to it. With
   * the music off it keeps counting at the pool's tempo, so the party still dances.
   */
  beats(): number {
    if (this.music) return this.music.beats();
    return (performance.now() / 1000) * 100 / 60;
  }

  /** Turn the music down while someone's voice message plays. */
  duck(seconds: number) {
    const c = this.ctx;
    if (!c || this.mode !== 'all') return;
    const t = c.currentTime;
    this.duckUntil = Math.max(this.duckUntil, t + seconds);
    this.musicBus.gain.cancelScheduledValues(t);
    this.musicBus.gain.setTargetAtTime(MUSIC_LEVEL * 0.25, t, 0.08);
    this.musicBus.gain.setTargetAtTime(MUSIC_LEVEL, this.duckUntil, 0.4);
  }

  /** Music back up right away (recording finished). */
  unduck() {
    const c = this.ctx;
    if (!c || this.mode !== 'all') return;
    this.duckUntil = 0;
    this.musicBus.gain.cancelScheduledValues(c.currentTime);
    this.musicBus.gain.setTargetAtTime(MUSIC_LEVEL, c.currentTime, 0.3);
  }

  /** A soft snore every few seconds while you doze. */
  dozing(on: boolean) {
    if (on && !this.snoring) {
      this.play('snore', { volume: 0.8 });
      this.snoring = window.setInterval(() => this.play('snore', { volume: 0.8 }), 3200);
    } else if (!on && this.snoring) { clearInterval(this.snoring); this.snoring = 0; }
  }
}

/** The one sound system for the page. */
export const sound = new Sound();
