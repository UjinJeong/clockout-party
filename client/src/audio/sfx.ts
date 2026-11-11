import { fm, gain, filter, hz, noise, tone, type Ctx } from './synth';

/**
 * Every effect in the party, as a recipe: (context, where to play, when, pitch)
 * → the time it's finished. Kept soft and short; nothing here should ever
 * be louder than a glass clink.
 */
export type Recipe = (ctx: Ctx, out: AudioNode, t: number, pitch: number) => number;

const r = (spread: number) => 1 + (Math.random() * 2 - 1) * spread; // a little variation each time

export const SFX = {
  // ---------------------------------------------------------------- UI
  tick: (ctx, out, t, p) => Math.max(
    tone(ctx, out, t, { freq: 1700 * p, peak: 0.12, attack: 0.002, decay: 0.045 }),
    noise(ctx, out, t, { type: 'highpass', freq: 4000, peak: 0.04, decay: 0.02 }),
  ),
  dice: (ctx, out, t) => {
    let end = t;
    for (let i = 0; i < 6; i++) {
      const at = t + i * 0.045 + Math.random() * 0.03;
      end = noise(ctx, out, at, { freq: 2200 + Math.random() * 1800, q: 4, peak: 0.4 * (1 - i * 0.12), decay: 0.03 });
    }
    return end;
  },

  // ---------------------------------------------------------------- talking
  /** someone nearby said something */
  pop: (ctx, out, t, p) => tone(ctx, out, t, { freq: 480 * p * r(0.06), glide: 880 * p, glideTime: 0.06, peak: 0.22, attack: 0.004, decay: 0.09 }),
  /** you said something */
  send: (ctx, out, t, p) => tone(ctx, out, t, { freq: 700 * p, glide: 1250 * p, glideTime: 0.05, peak: 0.16, attack: 0.003, decay: 0.08 }),

  // ---------------------------------------------------------------- reactions
  /** 🥂 two glasses touching (the arm is up after ~0.45 s, see the animator) */
  cheers: (ctx, out, t0, p) => {
    let end = t0;
    for (const [dt, k] of [[0.45, 1], [0.53, 0.94]] as const) {
      const t = t0 + dt;
      for (const [f, d, a] of [[2637, 1.1, 0.07], [3510, 0.8, 0.05], [5280, 0.5, 0.035], [6170, 0.35, 0.025]] as const)
        end = Math.max(end, tone(ctx, out, t, { freq: f * k * p * r(0.004), peak: a, attack: 0.001, decay: d }));
    }
    return end;
  },
  /** 😂 a bubbly little "ha-ha-ha-ha" */
  laugh: (ctx, out, t, p) => {
    const f = filter(ctx, out, 'bandpass', 1100, 1.2);
    let end = t;
    for (let i = 0; i < 5; i++) {
      const at = t + i * 0.13, base = (430 - i * 18) * p * r(0.03);
      end = tone(ctx, f, at, { type: 'sawtooth', freq: base, glide: base * 0.82, glideTime: 0.1, peak: 0.28 * (1 - i * 0.12), attack: 0.012, decay: 0.09 });
      noise(ctx, out, at, { freq: 1600, q: 0.8, peak: 0.03, decay: 0.07 });
    }
    return end;
  },
  /** 👏 claps in time with the paws (one every ~0.22 s) */
  clap: (ctx, out, t) => {
    let end = t;
    for (let i = 0; i < 5; i++) {
      const at = t + 0.12 + i * 0.224;
      end = noise(ctx, out, at, { freq: 1250 * r(0.1), q: 0.9, peak: 0.42 * (i === 4 ? 0.6 : 1), decay: 0.07 });
      noise(ctx, out, at + 0.006, { type: 'highpass', freq: 3200, peak: 0.12, decay: 0.03 });
    }
    return end;
  },
  /** ❤️ "boo-oop" up, and a twinkle */
  heart: (ctx, out, t, p) => {
    tone(ctx, out, t, { freq: hz(76) * p, glide: hz(81) * p, glideTime: 0.12, peak: 0.16, attack: 0.01, decay: 0.22, vib: 8, vibRate: 7 });
    tone(ctx, out, t + 0.16, { freq: hz(81) * p, glide: hz(88) * p, glideTime: 0.1, peak: 0.15, attack: 0.01, decay: 0.3, vib: 10, vibRate: 7 });
    let end = t;
    [96, 100, 103, 108].forEach((m, i) => { end = fm(ctx, out, t + 0.3 + i * 0.06, hz(m) * p, { peak: 0.035, ratio: 3.5, index: 0.6, decay: 0.5 }); });
    return end;
  },
  /** 😮 "ooh~" rising */
  wow: (ctx, out, t, p) => {
    const f = filter(ctx, out, 'lowpass', 1100, 2);
    f.frequency.setValueAtTime(500, t); f.frequency.linearRampToValueAtTime(1500, t + 0.45);
    tone(ctx, f, t, { type: 'triangle', freq: 300 * p, glide: 470 * p, glideTime: 0.45, peak: 0.3, attack: 0.06, decay: 0.55, vib: 6, vibRate: 5 });
    return tone(ctx, out, t, { freq: 600 * p, glide: 940 * p, glideTime: 0.45, peak: 0.06, attack: 0.06, decay: 0.5 });
  },
  /** 👋 a friendly two-note whistle */
  wave: (ctx, out, t, p) => {
    tone(ctx, out, t, { freq: 1150 * p, glide: 1720 * p, glideTime: 0.14, peak: 0.12, attack: 0.02, decay: 0.16, vib: 12, vibRate: 9 });
    return tone(ctx, out, t + 0.22, { freq: 1500 * p, glide: 1420 * p, glideTime: 0.2, peak: 0.1, attack: 0.02, decay: 0.24, vib: 14, vibRate: 9 });
  },
  /** 😌 "mm. mm." with each nod (~0.48 s apart) */
  nod: (ctx, out, t, p) => {
    const f = filter(ctx, out, 'lowpass', 700, 1);
    tone(ctx, f, t + 0.1, { type: 'triangle', freq: 196 * p, glide: 185 * p, peak: 0.32, attack: 0.04, decay: 0.2 });
    return tone(ctx, f, t + 0.58, { type: 'triangle', freq: 185 * p, glide: 165 * p, peak: 0.28, attack: 0.04, decay: 0.24 });
  },
  /** 🫥 a slow, blank, sinking "wooo" */
  zone: (ctx, out, t, p) => {
    const f = filter(ctx, out, 'lowpass', 900, 1);
    tone(ctx, f, t, { type: 'triangle', freq: 233 * p, glide: 150 * p, glideTime: 1.1, peak: 0.16, attack: 0.15, decay: 1.0, vib: 4, vibRate: 2.5 });
    tone(ctx, f, t, { type: 'triangle', freq: 236 * p, glide: 152 * p, glideTime: 1.1, peak: 0.1, attack: 0.15, decay: 1.0 });
    return noise(ctx, out, t, { freq: 700, q: 0.6, peak: 0.03, attack: 0.3, decay: 0.8 });
  },
  /** stepping out of the lift after work: "huuu…" */
  sigh: (ctx, out, t, p) => noise(ctx, out, t, { freq: 1100 * p, sweep: 380 * p, q: 1.4, peak: 0.32, attack: 0.25, decay: 0.75 }),

  // ---------------------------------------------------------------- moving about
  'step-wood': (ctx, out, t, p) => Math.max(
    noise(ctx, out, t, { freq: 420 * p * r(0.12), q: 1.2, peak: 0.16, decay: 0.05 }),
    tone(ctx, out, t, { freq: 115 * r(0.08), glide: 80, peak: 0.12, attack: 0.002, decay: 0.05 }),
  ),
  'step-deck': (ctx, out, t, p) => Math.max(
    noise(ctx, out, t, { freq: 760 * p * r(0.12), q: 2.5, peak: 0.12, decay: 0.06 }),
    tone(ctx, out, t, { freq: 190 * r(0.08), glide: 150, peak: 0.08, attack: 0.002, decay: 0.06 }),
  ),
  'step-water': (ctx, out, t, p) => Math.max(
    noise(ctx, out, t, { freq: 1500 * r(0.2), sweep: 600, q: 0.8, peak: 0.14, attack: 0.01, decay: 0.16 }),
    tone(ctx, out, t + 0.02, { freq: 520 * p * r(0.15), glide: 1300, glideTime: 0.05, peak: 0.05, attack: 0.002, decay: 0.05 }),
  ),
  /** plonking down on a sofa: a soft "pff" */
  sit: (ctx, out, t) => Math.max(
    tone(ctx, out, t, { freq: 95, glide: 55, peak: 0.3, attack: 0.005, decay: 0.18 }),
    noise(ctx, out, t, { type: 'lowpass', freq: 520, peak: 0.3, attack: 0.01, decay: 0.28 }),
  ),
  /** lying back on a lounger: a creak and a sigh of relief */
  lie: (ctx, out, t) => {
    const f = filter(ctx, out, 'bandpass', 700, 6);
    tone(ctx, f, t, { type: 'sawtooth', freq: 150, glide: 118, peak: 0.12, attack: 0.04, decay: 0.32 });
    tone(ctx, out, t + 0.05, { freq: 85, glide: 55, peak: 0.24, attack: 0.01, decay: 0.2 });
    return noise(ctx, out, t + 0.35, { freq: 900, sweep: 420, q: 1.3, peak: 0.1, attack: 0.15, decay: 0.5 });
  },
  stand: (ctx, out, t) => noise(ctx, out, t, { freq: 380, sweep: 1300, q: 1.2, peak: 0.24, attack: 0.04, decay: 0.2 }),
  /** a soft little snore while you doze */
  snore: (ctx, out, t) => {
    const f = filter(ctx, out, 'lowpass', 320, 3);
    tone(ctx, f, t, { type: 'sawtooth', freq: 62, glide: 70, peak: 0.16, attack: 0.5, decay: 0.45 });
    noise(ctx, f, t, { type: 'lowpass', freq: 400, peak: 0.16, attack: 0.5, decay: 0.45 });
    return tone(ctx, out, t + 1.1, { freq: 980, glide: 760, peak: 0.022, attack: 0.15, decay: 0.45 }); // the whistle out
  },

  // ---------------------------------------------------------------- moments
  /** fully recharged: a bright little run up */
  charged: (ctx, out, t, p) => {
    let end = t;
    [72, 76, 79, 84, 88].forEach((m, i) => { end = fm(ctx, out, t + i * 0.075, hz(m) * p, { peak: 0.11, ratio: 2, index: 0.9, decay: i === 4 ? 1.2 : 0.4 }); });
    return end;
  },
  ding: (ctx, out, t, p) => Math.max(
    fm(ctx, out, t, 1318.5 * p, { peak: 0.13, ratio: 3.5, index: 0.5, decay: 0.9 }),
    fm(ctx, out, t + 0.16, 1046.5 * p, { peak: 0.13, ratio: 3.5, index: 0.5, decay: 1.1 }),
  ),
  /** the whole 퇴근 lift arrival, in time with ARRIVAL: hum up, ding, doors open, doors close */
  lift: (ctx, out, t) => {
    const f = filter(ctx, out, 'lowpass', 240, 1);
    tone(ctx, f, t, { type: 'sawtooth', freq: 48, glide: 62, glideTime: 0.7, peak: 0.16, attack: 0.25, decay: 0.55 });
    SFX.ding(ctx, out, t + 0.7, 1);
    noise(ctx, out, t + 0.75, { freq: 700, sweep: 1100, q: 1.5, peak: 0.07, attack: 0.25, decay: 0.5 });
    noise(ctx, out, t + 2.55, { freq: 1000, sweep: 650, q: 1.5, peak: 0.06, attack: 0.2, decay: 0.45 });
    return tone(ctx, out, t + 3.2, { freq: 140, glide: 90, peak: 0.12, attack: 0.003, decay: 0.12 }); // doors meet
  },

  // ---------------------------------------------------------------- 🎆 fireworks
  /** a rocket whistling up */
  launch: (ctx, out, t, p) => Math.max(
    noise(ctx, out, t, { type: 'bandpass', freq: 900 * p, sweep: 3200 * p, q: 6, peak: 0.07, attack: 0.08, decay: 0.95 }),
    tone(ctx, out, t, { freq: 700 * p, glide: 2300 * p, glideTime: 1.0, peak: 0.025, attack: 0.1, decay: 0.9 }),
  ),
  /** the bang, felt more than heard */
  boom: (ctx, out, t, p) => Math.max(
    tone(ctx, out, t, { freq: 78 * p, glide: 32, glideTime: 0.5, peak: 0.42, attack: 0.004, decay: 1.1 }),
    noise(ctx, out, t, { type: 'lowpass', freq: 1300 * p, sweep: 180, peak: 0.34, attack: 0.003, decay: 0.85 }),
  ),
  /** glitter: a shower of tiny crackles */
  crackle: (ctx, out, t) => {
    let end = t;
    for (let i = 0; i < 26; i++) end = Math.max(end, noise(ctx, out, t + 0.15 + Math.random() * 1.1, { type: 'highpass', freq: 3500 + Math.random() * 3000, peak: 0.05 + Math.random() * 0.06, decay: 0.015 }));
    return end;
  },

  // ---------------------------------------------------------------- "오늘 하루 어땠어요?"
  'mood-drained': (ctx, out, t) => {
    const f = filter(ctx, out, 'lowpass', 1200, 1);
    let end = t;
    [[67, 0], [66, 0.28], [65, 0.56]].forEach(([m, dt], i) => {
      end = tone(ctx, f, t + dt, { type: 'triangle', freq: hz(m), glide: i === 2 ? hz(m - 2) : undefined, glideTime: 0.6, peak: 0.2, attack: 0.02, decay: i === 2 ? 0.8 : 0.24, vib: i === 2 ? 4 : 0, vibRate: 5 });
    });
    return end;
  },
  'mood-meh': (ctx, out, t) => Math.max(
    fm(ctx, out, t, hz(72), { peak: 0.12, ratio: 4, index: 0.5, decay: 0.4 }),
    fm(ctx, out, t + 0.16, hz(76), { peak: 0.12, ratio: 4, index: 0.5, decay: 0.6 }),
  ),
  'mood-sleepy': (ctx, out, t) => {
    noise(ctx, out, t, { freq: 700, sweep: 300, q: 1.2, peak: 0.1, attack: 0.3, decay: 0.7 });
    return tone(ctx, out, t + 0.05, { type: 'triangle', freq: hz(74), glide: hz(62), glideTime: 0.9, peak: 0.14, attack: 0.15, decay: 0.85, vib: 5, vibRate: 4 });
  },
  'mood-hyped': (ctx, out, t) => {
    // a party horn, then a quick run up
    const f = filter(ctx, out, 'bandpass', 1400, 1.5);
    tone(ctx, f, t, { type: 'sawtooth', freq: 520, glide: 560, peak: 0.22, attack: 0.02, decay: 0.3, vib: 30, vibRate: 22 });
    let end = t;
    [72, 76, 79, 84].forEach((m, i) => { end = fm(ctx, out, t + 0.3 + i * 0.07, hz(m), { peak: 0.1, ratio: 2, index: 1, decay: i === 3 ? 0.7 : 0.25 }); });
    return end;
  },
} satisfies Record<string, Recipe>;

export type SfxName = keyof typeof SFX;

/** Mixer helper used by tests and the level check: build a recipe into its own gain. */
export function render(ctx: Ctx, out: AudioNode, name: SfxName, t = 0, pitch = 1) {
  return SFX[name](ctx, gain(ctx, out), t, pitch);
}
