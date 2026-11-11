import { describe, expect, it } from 'vitest';
import { MAPS, POOL, isFireworkSeed, isWalkable, nearStage, showAt } from '../src';

describe('fireworks', () => {
  it('only the pool party has a DJ booth to launch them from', () => {
    expect(MAPS.pool.stage).toEqual(POOL.dj);
    expect(MAPS.gallery.stage).toBeUndefined();
    expect(MAPS.home.stage).toBeUndefined();
  });

  it('you can reach the button from the sand in front of the booth, not from the pool', () => {
    const d = POOL.dj, front = { x: (d.x0 + d.x1) / 2, z: d.z1 + 1.2 };
    expect(isWalkable(front, MAPS.pool)).toBe(true);
    expect(nearStage(MAPS.pool, front)).toBe(true);
    expect(nearStage(MAPS.pool, { x: 20, z: 0 })).toBe(false);
    expect(nearStage(MAPS.home, front)).toBe(false);
  });

  it('the automatic show: evenings and nights, the first 25 s of every third minute', () => {
    const at = (h: number, m: number, s: number) => new Date(2026, 10, 13, h, m, s);
    expect(showAt(at(21, 3, 10))).toBe(true);
    expect(showAt(at(21, 3, 30))).toBe(false);
    expect(showAt(at(21, 4, 10))).toBe(false);
    expect(showAt(at(2, 0, 0))).toBe(true);
    expect(showAt(at(14, 3, 10))).toBe(false); // broad daylight
  });

  it('seeds are plain non-negative whole numbers', () => {
    expect(isFireworkSeed(12345)).toBe(true);
    expect(isFireworkSeed(-1)).toBe(false);
    expect(isFireworkSeed(1.5)).toBe(false);
    expect(isFireworkSeed('9')).toBe(false);
  });
});
