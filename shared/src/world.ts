import { AVATAR_RADIUS } from './constants';

/**
 * The gallery map, shared so the server and clients agree on where you can walk.
 *
 * Five rooms sit side by side along x (each 12m wide), z runs from the back
 * wall (-5) to the open front edge (+5) the camera looks in from.
 * Partitions between rooms have a 4m doorway in the middle (|z| < 2).
 */
export interface Vec2 { x: number; z: number }
export interface Rect { x0: number; x1: number; z0: number; z1: number }

export const ROOM_W = 12;
export const ROOM_D = 10;
export const ROOM_IDS = ['lobby', 'garden', 'face', 'toy', 'pond'] as const;
export type RoomId = (typeof ROOM_IDS)[number];
export const WORLD: Rect = { x0: 0, x1: ROOM_W * ROOM_IDS.length, z0: -ROOM_D / 2, z1: ROOM_D / 2 };
export const PARTITIONS = [12, 24, 36, 48];
export const DOOR_HALF = 2;
export const WALL_T = 0.1;

/** Furniture you bump into. The client draws exactly these, the server enforces them. */
export const BAR: Rect = { x0: 3.2, x1: 8.8, z0: -3.9, z1: -3.1 }; // lobby wine bar
export const BENCHES: Rect[] = [1, 2, 3, 4].map(i => ({ x0: i * ROOM_W + 4.6, x1: i * ROOM_W + 7.4, z0: 0.9, z1: 1.6 }));

/** Round party furniture: standing tables (with a candle) and potted plants. */
export interface Furniture { x: number; z: number; r: number }
export const TABLES: Furniture[] = ROOM_IDS.flatMap((_, i) => [
  { x: i * ROOM_W + 2.2, z: 2.9, r: 0.32 },
  { x: i * ROOM_W + 9.8, z: 2.9, r: 0.32 },
]);
// Only in corners that have no painting hanging on the side wall.
export const PLANTS: Furniture[] = [
  { x: 0.7, z: -4.35, r: 0.3 }, { x: 11.3, z: -4.35, r: 0.3 },   // lobby
  { x: 35.3, z: -4.35, r: 0.3 },                                // face room, right corner
  { x: 36.7, z: -4.35, r: 0.3 }, { x: 47.3, z: -4.35, r: 0.3 },  // toy room
];
const square = (p: Furniture): Rect => ({ x0: p.x - p.r, x1: p.x + p.r, z0: p.z - p.r, z1: p.z + p.r });

export const OBSTACLES: Rect[] = [BAR, ...BENCHES, ...TABLES.map(square), ...PLANTS.map(square)];

export const SPAWN: Vec2 = { x: 6, z: 1.5 };

export function roomAt(x: number): RoomId {
  const i = Math.max(0, Math.min(ROOM_IDS.length - 1, Math.floor(x / ROOM_W)));
  return ROOM_IDS[i];
}

function inRect(p: Vec2, r: Rect, pad: number) {
  return p.x > r.x0 - pad && p.x < r.x1 + pad && p.z > r.z0 - pad && p.z < r.z1 + pad;
}

/** True when a circle of `radius` at p touches nothing solid. */
export function isWalkable(p: Vec2, radius = AVATAR_RADIUS): boolean {
  if (!Number.isFinite(p.x) || !Number.isFinite(p.z)) return false;
  if (p.x < WORLD.x0 + radius || p.x > WORLD.x1 - radius) return false;
  if (p.z < WORLD.z0 + radius || p.z > WORLD.z1 - radius) return false;
  for (const wx of PARTITIONS) {
    if (Math.abs(p.x - wx) < radius + WALL_T / 2 && Math.abs(p.z) > DOOR_HALF - radius) return false;
  }
  for (const o of OBSTACLES) if (inRect(p, o, radius)) return false;
  return true;
}

/**
 * Move from `from` toward `to`, stopping at walls. Each axis is tried on its
 * own so you slide along a wall instead of sticking to it. Long moves are
 * stepped so you can never tunnel through a thin partition.
 */
export function moveWithCollision(from: Vec2, to: Vec2, radius = AVATAR_RADIUS): Vec2 {
  let cur: Vec2 = isWalkable(from, radius) ? { ...from } : nearestWalkable(from, radius);
  const dx = to.x - cur.x, dz = to.z - cur.z;
  const steps = Math.max(1, Math.ceil(Math.hypot(dx, dz) / (radius * 0.5)));
  const sx = dx / steps, sz = dz / steps;
  for (let i = 0; i < steps; i++) {
    const nx = { x: cur.x + sx, z: cur.z };
    if (isWalkable(nx, radius)) cur = nx;
    const nz = { x: cur.x, z: cur.z + sz };
    if (isWalkable(nz, radius)) cur = nz;
  }
  return cur;
}

/** Pull a point that ended up inside something back onto open floor. */
export function nearestWalkable(p: Vec2, radius = AVATAR_RADIUS): Vec2 {
  const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));
  const base = {
    x: clamp(Number.isFinite(p.x) ? p.x : SPAWN.x, WORLD.x0 + radius, WORLD.x1 - radius),
    z: clamp(Number.isFinite(p.z) ? p.z : SPAWN.z, WORLD.z0 + radius, WORLD.z1 - radius),
  };
  if (isWalkable(base, radius)) return base;
  for (let r = 0.25; r < 6; r += 0.25) {
    for (let a = 0; a < 16; a++) {
      const t = (a / 16) * Math.PI * 2;
      const q = { x: base.x + Math.cos(t) * r, z: base.z + Math.sin(t) * r };
      if (isWalkable(q, radius)) return q;
    }
  }
  return { ...SPAWN };
}
