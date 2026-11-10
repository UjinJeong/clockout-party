import { describe, it, expect } from 'vitest';
import { moveWithCollision, isWalkable, roomAt, isNear, nearbyIds, SPAWN, OBSTACLES } from '../src';

describe('world', () => {
  it('spawn is walkable', () => expect(isWalkable(SPAWN)).toBe(true));

  it('blocks walking through a partition outside the doorway', () => {
    const p = moveWithCollision({ x: 11, z: -4 }, { x: 13, z: -4 });
    expect(p.x).toBeLessThan(12);
  });

  it('lets you through the doorway', () => {
    const p = moveWithCollision({ x: 11.5, z: 0 }, { x: 12.5, z: 0 });
    expect(p.x).toBeCloseTo(12.5);
  });

  it('slides along a wall instead of stopping dead', () => {
    const p = moveWithCollision({ x: 11.4, z: -4 }, { x: 12.4, z: -3 });
    expect(p.x).toBeLessThan(12);
    expect(p.z).toBeCloseTo(-3);
  });

  it('clamps to the back wall and the open front edge', () => {
    expect(moveWithCollision({ x: 6, z: -4 }, { x: 6, z: -9 }).z).toBeGreaterThan(-5);
    expect(moveWithCollision({ x: 6, z: 4 }, { x: 6, z: 9 }).z).toBeLessThan(5);
  });

  it('cannot walk into an obstacle', () => {
    const o = OBSTACLES[0];
    const cz = (o.z0 + o.z1) / 2;
    const p = moveWithCollision({ x: o.x0 - 1, z: cz }, { x: (o.x0 + o.x1) / 2, z: cz });
    expect(p.x).toBeLessThan(o.x0);
  });

  it('roomAt', () => {
    expect(roomAt(3)).toBe('lobby');
    expect(roomAt(13)).toBe('garden');
    expect(roomAt(50)).toBe('pond');
  });
});

describe('proximity', () => {
  it('near within radius', () => expect(isNear({ x: 0, z: 0 }, { x: 3, z: 3 })).toBe(true));
  it('far outside radius', () => expect(isNear({ x: 0, z: 0 }, { x: 5, z: 0 })).toBe(false));
  it('nearbyIds includes self', () => {
    const a = { id: 'a', x: 0, z: 0 }, b = { id: 'b', x: 1, z: 0 }, c = { id: 'c', x: 20, z: 0 };
    expect(nearbyIds(a, [a, b, c]).sort()).toEqual(['a', 'b']);
  });
});

describe('party furniture', () => {
  it('adds standing tables and plants you cannot walk through', async () => {
    const { TABLES, PLANTS } = await import('../src');
    expect(TABLES.length).toBeGreaterThanOrEqual(8);
    expect(PLANTS.length).toBeGreaterThanOrEqual(4);
    for (const t of [...TABLES, ...PLANTS]) expect(isWalkable({ x: t.x, z: t.z })).toBe(false);
  });
  it('keeps the doorways, spawn and painting viewpoints clear', async () => {
    for (const x of [12, 24, 36, 48]) expect(isWalkable({ x, z: 0 })).toBe(true);
    expect(isWalkable(SPAWN)).toBe(true);
    // in front of each back-wall painting
    for (const r of [1, 2, 3]) for (const dx of [2.4, 6, 9.6]) expect(isWalkable({ x: r * 12 + dx, z: -3.3 })).toBe(true);
  });
});
