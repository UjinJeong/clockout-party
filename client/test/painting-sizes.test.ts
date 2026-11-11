import { describe, it, expect } from 'vitest';
import { ART, LONG_CM, hangY, slotsFor, wallSize } from '../src/world/art';

describe('paintings at their real sizes', () => {
  it('every painting has a size', () => {
    for (const a of ART) expect(LONG_CM[a.i], a.title).toBeGreaterThan(0);
  });

  it('keeps each painting’s own proportions', () => {
    for (const a of ART) {
      const s = wallSize(a);
      expect(s.w / s.h).toBeCloseTo(a.w / a.h, 5);
    }
  });

  it('big works hang clearly bigger than small ones', () => {
    const area = (i: number) => { const a = ART.find(x => x.i === i)!; const s = wallSize(a); return s.w * s.h; };
    const big = ART.filter(a => LONG_CM[a.i] >= 150).map(a => area(a.i));
    const small = ART.filter(a => LONG_CM[a.i] <= 80).map(a => area(a.i));
    expect(Math.min(...big)).toBeGreaterThan(Math.max(...small) * 2.5);
  });

  it('fits the spot it hangs in, centred near eye level, never touching the floor', () => {
    for (const room of ['garden', 'face', 'toy', 'pond'] as const) {
      const slots = slotsFor(room);
      ART.filter(a => a.room === room).forEach((a, k) => {
        const slot = slots[k];
        const s = wallSize(a, slot);
        expect(s.w).toBeLessThanOrEqual(slot.maxW + 1e-9);
        expect(s.h).toBeLessThanOrEqual(slot.maxH + 1e-9);
        const y = hangY(s.h);
        expect(y - s.h / 2).toBeGreaterThanOrEqual(0.6 - 1e-9);
        expect(y + s.h / 2 + 0.3).toBeLessThan(4.2);   // the picture lamp still fits under the ceiling
        expect(y).toBeLessThan(2.3);
      });
    }
  });
});
