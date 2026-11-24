import { describe, expect, it } from 'vitest';
import { buildGalleryLayout, hallWidth, SPAWN, type Hall, type Slot } from '../src';
import { DEFAULT_HALLS, HALL_MAX, MAX_HALLS } from '../src/gallery';
import { findPath } from '../src/path';
import { isWalkable, nearestWalkable } from '../src/world';

// Where the walls hung paintings before halls could change (client/src/world/art.ts slotsFor).
const back = (x: number, maxW = 2.6): Slot => ({ x, y: 2.15, z: -4.94, face: { x: 0, z: 1 }, maxW, maxH: 2.1 });
const side = (wallX: number, toward: 1 | -1): Slot => ({ x: wallX + toward * 0.11, y: 2.1, z: -3.5, face: { x: toward, z: 0 }, maxW: 2.2, maxH: 2.0 });
const TODAY = { garden: 5, face: 4, toy: 3, pond: 7 };

const hall = (k: number): Hall => ({ id: `h${String(k).padStart(6, '0')}`, name: `관${k}`, color: 'moss', motion: 'still', note: '' });
const close = (a: Slot, b: Slot) => {
  for (const k of ['x', 'y', 'z', 'maxW', 'maxH'] as const) expect(a[k]).toBeCloseTo(b[k], 6);
  expect(a.face.x).toBeCloseTo(b.face.x); expect(a.face.z).toBeCloseTo(b.face.z);
};

describe('building the gallery from its halls', () => {
  it(`today's garden, face and toy halls are built where they are now`, () => {
    const L = buildGalleryLayout(DEFAULT_HALLS, TODAY);
    const span = (id: string) => L.spans.find(s => s.hall?.id === id)!;
    expect(L.spans[0].hall).toBeNull();
    expect([L.spans[0].x0, L.spans[0].x1]).toEqual([0, 12]);
    expect(['garden', 'face', 'toy'].map(id => [span(id).x0, span(id).x1])).toEqual([[12, 24], [24, 36], [36, 48]]);
    const want = {
      garden: [back(14.4), back(18), back(21.6), side(12, 1), side(24, -1)],
      face: [back(26.4), back(30), back(33.6), side(24, 1)],
      toy: [back(38.4), back(42), back(45.6)],
    };
    for (const [id, slots] of Object.entries(want)) {
      expect(span(id).slots).toHaveLength(slots.length);
      span(id).slots.forEach((s, k) => close(s, slots[k]));
    }
    expect(L.partitions.slice(0, 4)).toEqual([12, 24, 36, 48]);
    for (const x0 of [12, 24, 36]) expect(L.benches).toContainEqual({ x0: x0 + 4.6, x1: x0 + 7.4, z0: 0.9, z1: 1.6 });
    for (const x of [2.2, 9.8, 14.2, 21.8, 26.2, 33.8, 38.2, 45.8]) expect(L.tables).toContainEqual({ x, z: 2.9, r: 0.32 });
    // plants only in corners whose side wall has no painting
    expect(L.plants).toEqual(expect.arrayContaining([{ x: 0.7, z: -4.35, r: 0.3 }, { x: 11.3, z: -4.35, r: 0.3 }, { x: 35.3, z: -4.35, r: 0.3 }, { x: 36.7, z: -4.35, r: 0.3 }, { x: 47.3, z: -4.35, r: 0.3 }]));
    expect(L.plants.some(p => p.x > 12 && p.x < 24)).toBe(false);
  });

  it('pond widens to 15 m with 7 paintings', () => {
    const L = buildGalleryLayout(DEFAULT_HALLS, TODAY);
    const pond = L.spans.find(s => s.hall?.id === 'pond')!;
    expect([pond.x0, pond.x1]).toEqual([48, 63]);
    expect(L.bounds).toEqual({ x0: 0, x1: 63, z0: -5, z1: 5 });
    expect(pond.slots).toHaveLength(7);
    expect(L.map.rooms.map(r => r.name)).toEqual(['로비', '정원관', '얼굴관', '장난감관', '연못관']);
  });

  it('hall width follows how many paintings it shows', () => {
    for (let n = 0; n <= 5; n++) expect(hallWidth(n)).toBe(12);
    for (let n = 6; n <= HALL_MAX; n++) expect(hallWidth(n)).toBe(15);
  });

  it('slots never overlap and stay on the walls', () => {
    let seed = 7;
    const rand = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
    for (let run = 0; run < 200; run++) {
      const halls = Array.from({ length: 1 + Math.floor(rand() * MAX_HALLS) }, (_, k) => hall(k));
      const counts = Object.fromEntries(halls.map(h => [h.id, Math.floor(rand() * (HALL_MAX + 1))]));
      const L = buildGalleryLayout(halls, counts);
      for (const s of L.spans.slice(1)) {
        expect(s.slots).toHaveLength(counts[s.hall!.id]);
        const backs = s.slots.filter(x => x.face.z === 1).sort((a, b) => a.x - b.x);
        for (const b of backs) { expect(b.x - b.maxW / 2).toBeGreaterThanOrEqual(s.x0); expect(b.x + b.maxW / 2).toBeLessThanOrEqual(s.x1); }
        for (let k = 1; k < backs.length; k++) expect(backs[k].x - backs[k - 1].x).toBeGreaterThanOrEqual((backs[k].maxW + backs[k - 1].maxW) / 2);
        for (const x of s.slots.filter(x => x.face.z === 0)) expect([s.x0 + 0.11, s.x1 - 0.11].some(v => Math.abs(v - x.x) < 1e-9)).toBe(true);
      }
    }
  });

  it('every viewing spot is reachable', () => {
    const halls = Array.from({ length: MAX_HALLS }, (_, k) => hall(k));
    const L = buildGalleryLayout(halls, Object.fromEntries(halls.map(h => [h.id, HALL_MAX])));
    expect(L.map.spots.length).toBeGreaterThanOrEqual(MAX_HALLS * HALL_MAX);
    for (const spot of L.map.spots) {
      expect(isWalkable(spot, L.map), JSON.stringify(spot)).toBe(true);
      expect(findPath(L.map, SPAWN, spot), JSON.stringify(spot)).not.toBeNull();
    }
    for (const s of L.map.seats) expect(isWalkable(s.stand, L.map)).toBe(true);
  });

  it('spawn and snap stay inside the new bounds', () => {
    const L = buildGalleryLayout(DEFAULT_HALLS.slice(0, 1), { garden: 2 });
    expect(L.bounds.x1).toBe(24);
    expect(nearestWalkable({ x: 500, z: 0 }, L.map).x).toBeLessThan(24);
  });

  it('an empty hall still has a doorway and a bench', () => {
    const L = buildGalleryLayout([hall(1), hall(2)], { [hall(1).id]: 0, [hall(2).id]: 3 });
    const s = L.spans[1];
    expect(s.slots).toHaveLength(0);
    expect(L.benches.some(b => b.x0 > s.x0 && b.x1 < s.x1)).toBe(true);
    expect(findPath(L.map, SPAWN, { x: L.spans[2].x0 + 6, z: 0 })).not.toBeNull();
  });
});
