import { describe, expect, it } from 'vitest';
import { MAPS, WALK_SPEED, findPath, isWalkable, moveWithCollision, type Vec2, type WorldMap } from '../src';

/** Every step along the path is open floor. */
function clear(map: WorldMap, path: Vec2[]) {
  for (let i = 1; i < path.length; i++) {
    const a = path[i - 1], b = path[i];
    const n = Math.ceil(Math.hypot(b.x - a.x, b.z - a.z) / 0.05);
    for (let k = 0; k <= n; k++) {
      const p = { x: a.x + ((b.x - a.x) * k) / n, z: a.z + ((b.z - a.z) * k) / n };
      if (!isWalkable(p, map)) return false;
    }
  }
  return true;
}

describe('finding a way around the furniture', () => {
  it('walks around the coffee table to sit on the sofa', () => {
    const map = MAPS.home;
    const sofa = map.seats[1];
    const path = findPath(map, map.spawn, sofa.stand)!;
    expect(path).not.toBeNull();
    expect(path.length).toBeGreaterThan(2); // it had to go around something
    expect(clear(map, path)).toBe(true);
    const end = path[path.length - 1];
    expect(Math.hypot(end.x - sofa.stand.x, end.z - sofa.stand.z)).toBeLessThan(0.05);
  });

  it('goes through the doorway to the next room, not through the wall', () => {
    const map = MAPS.home;
    const path = findPath(map, { x: 10, z: -4 }, { x: 14, z: -3 })!;
    expect(clear(map, path)).toBe(true);
    expect(path.some(p => Math.abs(p.z) < 1.8 && p.x > 11 && p.x < 13)).toBe(true);
  });

  it('a clear line is just a straight line', () => {
    const map = MAPS.pool;
    const path = findPath(map, { x: 20, z: 3 }, { x: 24, z: 3.5 })!;
    expect(path).toHaveLength(2);
  });

  it('a target inside furniture leads to the open floor next to it', () => {
    const map = MAPS.home;
    const island = { x: 18, z: -1.4 };
    expect(isWalkable(island, map)).toBe(false);
    const path = findPath(map, map.spawn, island)!;
    expect(path).not.toBeNull();
    expect(isWalkable(path[path.length - 1], map)).toBe(true);
    expect(clear(map, path)).toBe(true);
  });

  it('every seat can be reached from the spawn in every place', () => {
    for (const map of Object.values(MAPS)) {
      for (const s of map.seats) {
        const path = findPath(map, map.spawn, s.stand);
        expect(path, `${map.theme} seat ${s.id}`).not.toBeNull();
        expect(clear(map, path!)).toBe(true);
      }
    }
  });
});

/** Walk a route the way the game does: small steps toward each waypoint, sliding along walls. */
function walk(map: WorldMap, path: Vec2[], dt = 1 / 30) {
  let p = { ...path[0] };
  for (const wp of path.slice(1)) {
    for (let i = 0; i < 2000; i++) {
      const dx = wp.x - p.x, dz = wp.z - p.z, d = Math.hypot(dx, dz);
      if (d < 0.12) break;
      const s = Math.min(d, WALK_SPEED * dt);
      const next = moveWithCollision(p, { x: p.x + (dx / d) * s, z: p.z + (dz / d) * s }, map);
      if (Math.hypot(next.x - p.x, next.z - p.z) < s * 0.1) return { stuck: true, at: p };
      p = next;
    }
  }
  return { stuck: false, at: p };
}

describe('the route can actually be walked', () => {
  it('to every seat in every place, without getting stuck on a corner', () => {
    for (const map of Object.values(MAPS)) {
      for (const s of map.seats) {
        for (const from of [map.spawn, ...map.spots.slice(0, 4)]) {
          const route = findPath(map, from, s.stand)!;
          const r = walk(map, route);
          expect(r.stuck, `${map.theme} ${JSON.stringify(from)} → seat ${s.id} stuck at ${JSON.stringify(r.at)}`).toBe(false);
          expect(Math.hypot(r.at.x - s.stand.x, r.at.z - s.stand.z)).toBeLessThan(0.15);
        }
      }
    }
  });
});
