import { describe, expect, it } from 'vitest';
import { DANCE_PERSONAL, PERSONAL, separate, spawnSpot, tieAngle } from '../src/crowd';
import { mapFor, isWalkable } from '../src/world';

const map = mapFor('gallery'), pool = mapFor('pool');
const dist = (a: { x: number; z: number }, b: { x: number; z: number }) => Math.hypot(a.x - b.x, a.z - b.z);
const open = { ...map.spawn };

describe('guests ease apart instead of standing inside each other', () => {
  it('two overlapping guests each step aside and settle about shoulder to shoulder', () => {
    let a = { x: open.x, z: open.z }, b = { x: open.x + 0.1, z: open.z };
    for (let i = 0; i < 120; i++) {
      const na = separate(a, [b], map, 1 / 60, null, tieAngle('a'));
      const nb = separate(b, [a], map, 1 / 60, null, tieAngle('b'));
      a = na; b = nb;
    }
    expect(dist(a, b)).toBeGreaterThan(PERSONAL - 0.03);
    expect(dist(a, b)).toBeLessThan(PERSONAL + 0.05);
    expect(Math.abs(a.x + b.x - (2 * open.x + 0.1))).toBeLessThan(0.05); // each moved about half
  });
  it('exactly the same spot (arrived together): ids send them different ways', () => {
    let a = { ...open }, b = { ...open };
    for (let i = 0; i < 120; i++) { const na = separate(a, [b], map, 1 / 60, null, tieAngle('guest-a')); b = separate(b, [a], map, 1 / 60, null, tieAngle('guest-b')); a = na; }
    expect(dist(a, b)).toBeGreaterThan(PERSONAL - 0.05);
  });
  it('far enough apart: nothing moves', () => {
    const me = { ...open };
    expect(separate(me, [{ x: open.x + PERSONAL + 0.01, z: open.z }], map, 1 / 60)).toBe(me);
  });
  it('a walker is never stopped dead: they slip round and get past', () => {
    const them = { x: open.x + 1.2, z: open.z };
    let me = { x: open.x, z: open.z }; // walking +x straight at them
    const heading = { x: 1, z: 0 };
    for (let i = 0; i < 150; i++) {
      me = { x: me.x + 2.6 / 60, z: me.z };
      me = separate(me, [them], map, 1 / 60, heading, tieAngle('me'));
    }
    expect(me.x).toBeGreaterThan(them.x + 1);          // made it past
  });
  it('never pushed into a wall', () => {
    const wall = { x: map.bounds.x0 + 0.36, z: open.z };
    let me = { ...wall };
    for (let i = 0; i < 60; i++) me = separate(me, [{ x: wall.x + 0.2, z: wall.z }], map, 1 / 60);
    expect(isWalkable(me, map)).toBe(true);
  });
  it('closer is fine on the dance floor', () => {
    const d = pool.dance!, c = { x: (d.x0 + d.x1) / 2, z: (d.z0 + d.z1) / 2 };
    const near = { x: c.x + (DANCE_PERSONAL + PERSONAL) / 2, z: c.z };
    expect(separate(c, [near], pool, 1 / 60)).toBe(c);
  });
});

describe('stepping out of the lift', () => {
  it('twenty newcomers in a row: no two on the same spot', () => {
    let seed = 7; const rand = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
    const placed: { x: number; z: number }[] = [];
    for (let i = 0; i < 20; i++) placed.push(spawnSpot(map, placed, rand));
    let closest = Infinity;
    for (let i = 0; i < placed.length; i++) for (let j = i + 1; j < placed.length; j++) closest = Math.min(closest, dist(placed[i], placed[j]));
    expect(closest).toBeGreaterThan(0.6);
    for (const p of placed) expect(isWalkable(p, map)).toBe(true);
  });
  it('the first few get a clear 1.3 m to themselves', () => {
    let seed = 3; const rand = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
    const placed: { x: number; z: number }[] = [];
    for (let i = 0; i < 3; i++) placed.push(spawnSpot(map, placed, rand));
    expect(dist(placed[0], placed[1])).toBeGreaterThanOrEqual(1.3);
    expect(dist(placed[1], placed[2])).toBeGreaterThanOrEqual(1.3);
  });
});
