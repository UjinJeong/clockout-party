import { describe, expect, it } from 'vitest';
import { MARGIN, MOTION, warpUv } from '../src/world/livingWall';

const ROOMS = ['garden', 'face', 'toy', 'pond'] as const;

/** Sample the warp over the canvas and over a minute of time. */
function sweep(room: (typeof ROOMS)[number], phase: number, strength = 1) {
  let maxShift = 0, minUv = 1, maxUv = 0;
  for (let t = 0; t < 60; t += 0.37) {
    for (let u = 0; u <= 1.0001; u += 0.125) {
      for (let v = 0; v <= 1.0001; v += 0.125) {
        const [x, y] = warpUv(MOTION[room], u, v, t, phase, strength);
        const bx = MARGIN + u * (1 - 2 * MARGIN), by = MARGIN + v * (1 - 2 * MARGIN);
        maxShift = Math.max(maxShift, Math.abs(x - bx), Math.abs(y - by));
        minUv = Math.min(minUv, x, y);
        maxUv = Math.max(maxUv, x, y);
      }
    }
  }
  return { maxShift, minUv, maxUv };
}

describe('living wall paintings', () => {
  it.each(ROOMS)('%s never samples outside the painting (no smeared edges)', room => {
    for (const phase of [0, 1.7, 4.2]) {
      const s = sweep(room, phase);
      expect(s.minUv).toBeGreaterThanOrEqual(0);
      expect(s.maxUv).toBeLessThanOrEqual(1);
      expect(s.maxShift).toBeLessThanOrEqual(MARGIN);
    }
  });

  it.each(ROOMS)('%s visibly moves, but only a little', room => {
    const s = sweep(room, 0.5);
    expect(s.maxShift).toBeGreaterThan(0.002); // something moves
    expect(s.maxShift).toBeLessThan(0.013);    // ...subtly
  });

  it('each room has its own kind of motion', () => {
    expect(MOTION.garden.sway).toBeGreaterThan(0);
    expect(MOTION.face.breath).toBeGreaterThan(0);
    expect(MOTION.pond.ripple).toBeGreaterThan(0);
    expect(MOTION.toy.sheen).toBeGreaterThan(MOTION.garden.sheen);
  });

  it('stands still for people who asked for less motion', () => {
    const s = sweep('garden', 0, 0);
    expect(s.maxShift).toBeLessThan(1e-9);
  });
});
