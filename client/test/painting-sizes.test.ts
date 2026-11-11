import { describe, it, expect } from 'vitest';
import { ART, RAIL_TOP, hangY, slotsFor, wallSize } from '../src/world/art';

describe('paintings sized by their own images', () => {
  it('keeps each painting’s own proportions', () => {
    for (const a of ART) {
      const s = wallSize(a);
      expect(s.w / s.h).toBeCloseTo(a.w / a.h, 5);
    }
  });

  it('more pixels, more wall: the size follows the image', () => {
    const by = (title: string) => wallSize(ART.find(a => a.title === title)!);
    expect(by('민들레와 발').w).toBeGreaterThan(by('해바라기 밭').w * 1.2);   // 1800 px wide vs 1400
    expect(by('금빛 잉어 I').w).toBeLessThan(by('금빛 잉어 II').w * 0.65);    // 808 px wide vs 1400
    const areas = ART.map(a => { const s = wallSize(a); return s.w * s.h; });
    expect(Math.max(...areas)).toBeGreaterThan(Math.min(...areas) * 1.8);
  });

  it('fits the spot it hangs in, near eye level, with its frame clear above the wall rail', () => {
    for (const room of ['garden', 'face', 'toy', 'pond'] as const) {
      const slots = slotsFor(room);
      ART.filter(a => a.room === room).forEach((a, k) => {
        const slot = slots[k];
        const s = wallSize(a, slot);
        expect(s.w).toBeLessThanOrEqual(slot.maxW + 1e-9);
        expect(s.h).toBeLessThanOrEqual(slot.maxH + 1e-9);
        const y = hangY(s.h);
        expect(y - s.h / 2 - 0.09).toBeGreaterThan(RAIL_TOP);          // frame (9 cm) above the gilt rail
        expect(y + s.h / 2 + 0.3).toBeLessThan(4.2);
        expect(y).toBeLessThan(2.4);
      });
    }
  });
});
