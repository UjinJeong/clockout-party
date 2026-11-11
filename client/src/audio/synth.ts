/**
 * Tiny synth toolkit: every sound in the party is built from these at play
 * time with WebAudio (no sound files to download, nothing to license).
 * Everything takes a BaseAudioContext, so it renders the same in a live
 * AudioContext and in an OfflineAudioContext (used to check levels).
 */
export type Ctx = BaseAudioContext;

export const hz = (midi: number) => 440 * 2 ** ((midi - 69) / 12);

const SILENT = 0.0001;

/** Attack to `peak`, then an exponential fall to silence over `decay` seconds. */
export function env(p: AudioParam, t: number, peak: number, attack: number, decay: number) {
  p.cancelScheduledValues(t);
  p.setValueAtTime(SILENT, t);
  p.linearRampToValueAtTime(Math.max(SILENT, peak), t + attack);
  p.exponentialRampToValueAtTime(SILENT, t + attack + decay);
}

export function gain(ctx: Ctx, out: AudioNode, v = 1): GainNode {
  const g = ctx.createGain(); g.gain.value = v; g.connect(out); return g;
}

export function filter(ctx: Ctx, out: AudioNode, type: BiquadFilterType, freq: number, q = 0.7): BiquadFilterNode {
  const f = ctx.createBiquadFilter(); f.type = type; f.frequency.value = freq; f.Q.value = q; f.connect(out); return f;
}

export interface ToneOpts {
  freq: number; type?: OscillatorType; peak?: number; attack?: number; decay?: number;
  /** slide to this frequency over `glideTime` */
  glide?: number; glideTime?: number;
  /** vibrato depth (Hz) and speed */
  vib?: number; vibRate?: number;
  detune?: number;
}

/** One oscillator with an envelope. Returns when it ends. */
export function tone(ctx: Ctx, out: AudioNode, t: number, o: ToneOpts): number {
  const attack = o.attack ?? 0.005, decay = o.decay ?? 0.3, end = t + attack + decay + 0.02;
  const osc = ctx.createOscillator();
  osc.type = o.type ?? 'sine';
  osc.frequency.setValueAtTime(o.freq, t);
  if (o.glide) osc.frequency.exponentialRampToValueAtTime(o.glide, t + (o.glideTime ?? attack + decay));
  if (o.detune) osc.detune.value = o.detune;
  if (o.vib) {
    const lfo = ctx.createOscillator(), depth = ctx.createGain();
    lfo.frequency.value = o.vibRate ?? 6; depth.gain.value = o.vib;
    lfo.connect(depth).connect(osc.frequency);
    lfo.start(t); lfo.stop(end);
  }
  const g = ctx.createGain();
  env(g.gain, t, o.peak ?? 0.3, attack, decay);
  osc.connect(g).connect(out);
  osc.start(t); osc.stop(end);
  return end;
}

/** FM bell / electric piano: a sine whose brightness fades as it rings. */
export function fm(ctx: Ctx, out: AudioNode, t: number, freq: number, o: { peak?: number; ratio?: number; index?: number; decay?: number; attack?: number; bright?: number } = {}): number {
  const decay = o.decay ?? 1.2, attack = o.attack ?? 0.004, end = t + attack + decay + 0.05;
  const car = ctx.createOscillator(), mod = ctx.createOscillator(), mg = ctx.createGain(), g = ctx.createGain();
  car.frequency.value = freq;
  mod.frequency.value = freq * (o.ratio ?? 1);
  const index = (o.index ?? 1.6) * freq;
  mg.gain.setValueAtTime(index, t);
  mg.gain.exponentialRampToValueAtTime(Math.max(1, index * (o.bright ?? 0.08)), t + Math.min(decay, 0.6));
  mod.connect(mg).connect(car.frequency);
  env(g.gain, t, o.peak ?? 0.2, attack, decay);
  car.connect(g).connect(out);
  car.start(t); mod.start(t); car.stop(end); mod.stop(end);
  return end;
}

const noiseCache = new WeakMap<Ctx, AudioBuffer>();
/** Two seconds of white noise, made once per context. */
export function noiseBuffer(ctx: Ctx): AudioBuffer {
  let b = noiseCache.get(ctx);
  if (!b) {
    b = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
    const d = b.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    noiseCache.set(ctx, b);
  }
  return b;
}

export interface NoiseOpts {
  type?: BiquadFilterType; freq: number; q?: number; peak?: number; attack?: number; decay?: number;
  /** sweep the filter to this frequency */
  sweep?: number;
}

/** A burst of filtered noise: claps, steps, breaths, splashes, door slides. */
export function noise(ctx: Ctx, out: AudioNode, t: number, o: NoiseOpts): number {
  const attack = o.attack ?? 0.002, decay = o.decay ?? 0.1, end = t + attack + decay + 0.02;
  const src = ctx.createBufferSource();
  src.buffer = noiseBuffer(ctx);
  const f = ctx.createBiquadFilter();
  f.type = o.type ?? 'bandpass'; f.Q.value = o.q ?? 1;
  f.frequency.setValueAtTime(o.freq, t);
  if (o.sweep) f.frequency.exponentialRampToValueAtTime(o.sweep, t + attack + decay);
  const g = ctx.createGain();
  env(g.gain, t, o.peak ?? 0.3, attack, decay);
  src.connect(f).connect(g).connect(out);
  // start somewhere random in the buffer so repeated hits don't sound identical
  src.start(t, Math.random() * 1.5); src.stop(end);
  return end;
}

/** A room for the sound to ring in: decaying stereo noise as an impulse response. */
export function impulse(ctx: Ctx, seconds: number, damp = 3): AudioBuffer {
  const n = Math.max(1, Math.floor(ctx.sampleRate * seconds));
  const b = ctx.createBuffer(2, n, ctx.sampleRate);
  for (let c = 0; c < 2; c++) {
    const d = b.getChannelData(c);
    for (let i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / n) ** damp;
  }
  return b;
}
