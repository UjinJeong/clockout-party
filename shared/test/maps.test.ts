import { describe, expect, it } from 'vitest';
import {
  MAPS, THEMES, THEME_LABEL, inWater, isWalkable, mapFor, moveWithCollision, nearestWalkable, roomAt,
  type Vec2, type WorldMap,
} from '../src';

/** Flood-fill the walkable floor from the spawn on a 0.25m grid. */
function reachable(map: WorldMap) {
  const step = 0.25, b = map.bounds;
  const key = (x: number, z: number) => `${Math.round(x / step)},${Math.round(z / step)}`;
  const seen = new Set<string>();
  const queue: Vec2[] = [map.spawn];
  seen.add(key(map.spawn.x, map.spawn.z));
  while (queue.length) {
    const p = queue.pop()!;
    for (const [dx, dz] of [[step, 0], [-step, 0], [0, step], [0, -step]]) {
      const q = { x: p.x + dx, z: p.z + dz };
      if (q.x < b.x0 || q.x > b.x1 || q.z < b.z0 || q.z > b.z1) continue;
      const k = key(q.x, q.z);
      if (seen.has(k) || !isWalkable(q, map)) continue;
      seen.add(k); queue.push(q);
    }
  }
  return (p: Vec2) => {
    // within half a grid step of a reached cell
    for (const dx of [-0.25, 0, 0.25]) for (const dz of [-0.25, 0, 0.25]) if (seen.has(key(p.x + dx, p.z + dz))) return true;
    return false;
  };
}

describe.each(THEMES)('%s map', theme => {
  const map = MAPS[theme];

  it('has a name and spawns you on open floor', () => {
    expect(THEME_LABEL[theme]).toBeTruthy();
    expect(map.theme).toBe(theme);
    expect(isWalkable(map.spawn, map)).toBe(true);
  });

  it('rooms run edge to edge with no gaps', () => {
    expect(map.rooms[0].x0).toBe(map.bounds.x0);
    expect(map.rooms[map.rooms.length - 1].x1).toBe(map.bounds.x1);
    for (let i = 1; i < map.rooms.length; i++) expect(map.rooms[i].x0).toBe(map.rooms[i - 1].x1);
    for (const r of map.rooms) expect(roomAt((r.x0 + r.x1) / 2, map).id).toBe(r.id);
  });

  it('every hangout spot is open floor you can actually walk to from the spawn', () => {
    const canReach = reachable(map);
    for (const s of map.spots) {
      expect(isWalkable(s, map), `${theme} spot ${JSON.stringify(s)}`).toBe(true);
      expect(canReach(s), `${theme} spot ${JSON.stringify(s)} reachable`).toBe(true);
    }
  });

  it('every room can be reached', () => {
    const canReach = reachable(map);
    for (const r of map.rooms) {
      const mid = nearestWalkable({ x: (r.x0 + r.x1) / 2, z: 0 }, map);
      expect(canReach(mid), `${theme} ${r.name}`).toBe(true);
    }
  });

  it('furniture stays inside the map', () => {
    const b = map.bounds;
    for (const o of map.obstacles) {
      expect(o.x0).toBeGreaterThanOrEqual(b.x0); expect(o.x1).toBeLessThanOrEqual(b.x1);
      expect(o.z0).toBeGreaterThanOrEqual(b.z0); expect(o.z1).toBeLessThanOrEqual(b.z1);
    }
  });
});

describe('themes', () => {
  it('unknown themes fall back to the gallery', () => {
    expect(mapFor('moon').theme).toBe('gallery');
    expect(mapFor('pool').theme).toBe('pool');
  });

  it('the home party walls block you outside the doorways', () => {
    const map = MAPS.home;
    expect(moveWithCollision({ x: 11, z: -4 }, { x: 13, z: -4 }, map).x).toBeLessThan(12);
    expect(moveWithCollision({ x: 11.5, z: 0 }, { x: 12.5, z: 0 }, map).x).toBeCloseTo(12.5);
  });

  it('you can wade into the pool, and only the pool is water', () => {
    const map = MAPS.pool;
    const inPool = { x: 21, z: -0.5 };
    expect(isWalkable(inPool, map)).toBe(true);
    expect(inWater(inPool, map)).toBe(true);
    expect(inWater({ x: 21, z: 3.5 }, map)).toBe(false);
    expect(inWater({ x: 6, z: 1 }, MAPS.gallery)).toBe(false);
    expect(moveWithCollision({ x: 21, z: 3.5 }, inPool, map).z).toBeCloseTo(-0.5);
  });
});
