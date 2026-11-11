import { describe, expect, it } from 'vitest';
import {
  HOME_MAP, MAPS, THEMES, findPath, fromWorld, isWalkable, moveWithCollision, roomAt, seatsFor, toWorld, type Vec2,
} from '../src';

/**
 * The home party is a two-storey house. The walking map stays flat (the server
 * and pathfinding don't change): upstairs is kept behind the living room, and
 * `lifts` say where those parts are really drawn — up on the landing, or
 * climbing the stairs.
 */
const map = HOME_MAP;
const at = (x: number, z: number): Vec2 => ({ x, z });

describe('🏠 the two-storey house', () => {
  it('downstairs is drawn where it is walked', () => {
    expect(toWorld(map, at(6, 1.5))).toEqual({ x: 6, y: 0, z: 1.5 });
    expect(toWorld(map, at(20, -3))).toEqual({ x: 20, y: 0, z: -3 });
  });

  it('upstairs floats above the back of the living room', () => {
    const w = toWorld(map, at(6, -8));
    expect(w.y).toBeGreaterThan(3);
    expect(w.z).toBeGreaterThan(-5);   // inside the house…
    expect(w.z).toBeLessThan(-2);      // …over the back of the living room
  });

  it('the stairs climb smoothly from the floor to the landing, with no jumps anywhere', () => {
    let prev = toWorld(map, at(0.8, 3.2));
    for (let z = 3.2; z >= -9; z -= 0.02) {
      const w = toWorld(map, at(0.8, z));
      const jump = Math.hypot(w.x - prev.x, w.y - prev.y, w.z - prev.z);
      expect(jump, `at z=${z.toFixed(2)}`).toBeLessThan(0.08);
      prev = w;
    }
    expect(prev.y).toBeGreaterThan(3);
  });

  it('a tap on any floor finds its way back to the walking map', () => {
    for (const p of [at(6, 1.5), at(6, -8), at(0.8, -1), at(0.8, -6.5), at(9, -7.5)]) {
      const back = fromWorld(map, toWorld(map, p));
      expect(back.x).toBeCloseTo(p.x, 5);
      expect(back.z).toBeCloseTo(p.z, 5);
    }
  });

  it('you can walk up: the stairs connect the living room to the landing', () => {
    const route = findPath(map, at(6, 1.5), at(6, -7.6));
    expect(route).not.toBeNull();
    // and actually follow it
    let p = route![0];
    for (const w of route!.slice(1)) { for (let i = 0; i < 60; i++) p = moveWithCollision(p, { x: p.x + Math.sign(w.x - p.x) * Math.min(0.2, Math.abs(w.x - p.x)), z: p.z + Math.sign(w.z - p.z) * Math.min(0.2, Math.abs(w.z - p.z)) }, map); }
    expect(Math.hypot(p.x - 6, p.z + 7.6)).toBeLessThan(0.3);
    expect(toWorld(map, p).y).toBeGreaterThan(3);
  });

  it('no shortcuts: the banister, the balcony edge and the space behind the kitchen are solid', () => {
    expect(isWalkable(at(0.8, -1), map)).toBe(true);    // on the stairs
    expect(isWalkable(at(1.5, -1), map)).toBe(false);   // the banister
    expect(isWalkable(at(6, -6), map)).toBe(false);     // off the edge of the landing
    expect(isWalkable(at(18, -7.5), map)).toBe(false);  // behind the kitchen wall
    expect(isWalkable(at(6, -7.6), map)).toBe(true);    // on the landing
    // walking straight from the sofa toward the back doesn't climb into the loft
    const p = moveWithCollision(at(6, -3.2), at(6, -8), map);
    expect(toWorld(map, p).y).toBe(0);
  });

  it('knows when you are upstairs or on the stairs', () => {
    expect(roomAt(6, map, -7.6).name).toBe('2층');
    expect(roomAt(0.8, map, -1).name).toBe('계단');
    expect(roomAt(6, map, 0).name).toBe('거실');
    expect(roomAt(6, map).name).toBe('거실');             // without z: the strip as before
  });

  it('upstairs has somewhere to sit', () => {
    const up = seatsFor(map).filter(s => toWorld(map, s).y > 3);
    expect(up.length).toBeGreaterThanOrEqual(3);
    for (const s of up) expect(isWalkable(s.stand, map)).toBe(true);
  });

  it('bots like to hang out upstairs too', () => {
    expect(map.spots.some(s => toWorld(map, s).y > 3)).toBe(true);
  });

  it('only the house has lifts', () => {
    for (const t of THEMES) if (t !== 'home') expect(MAPS[t].lifts ?? []).toHaveLength(0);
  });

  it('🛏️ a guest room upstairs: through the door off the landing, with a bed to lie on', () => {
    const bed = seatsFor(map).filter(s => s.pose === 'lie');
    expect(bed).toHaveLength(2);
    for (const s of bed) {
      expect(toWorld(map, s).y).toBeGreaterThan(3);
      expect(roomAt(s.x, map, s.z).name).toBe('손님방');
      const route = findPath(map, map.spawn, s.stand);
      expect(route, 'can walk to the bed from the front door').not.toBeNull();
    }
  });

  it('the guest room wall is solid except for its door', () => {
    const up = (wz: number) => wz - 4.4; // drawn z → walking z upstairs
    expect(isWalkable(at(12, up(-4.8)), map)).toBe(false);
    expect(isWalkable(at(12, up(-2.7)), map)).toBe(false);
    expect(isWalkable(at(12, up(-3.75)), map)).toBe(true);
    expect(isWalkable(at(22, up(-3.75)), map)).toBe(false); // nothing beyond the guest room
  });
});
