import { AVATAR_RADIUS } from './constants';
import { moveWithCollision, nearestWalkable, onDanceFloor, type Vec2, type WorldMap } from './world';

/**
 * Guests don't stand inside each other. Nobody is a wall, though: every client
 * nudges only ITS OWN guest away from the others, softly, so two people who
 * overlap each step half aside, and someone walking past slips round you.
 * The same rule runs on the web, in the demo's bots, and later in Unity.
 */
/** Closest two guests settle to (centre to centre): about shoulders touching. */
export const PERSONAL = 0.66;
/** On the dance floor people stand closer. */
export const DANCE_PERSONAL = 0.46;
/** How fast an overlap eases out (per second). */
const EASE = 7;

/** A steady direction for a guest (from their id), to break exact ties without everyone picking the same way. */
export function tieAngle(id: string): number {
  let h = 2166136261;
  for (let i = 0; i < id.length; i++) h = Math.imul(h ^ id.charCodeAt(i), 16777619);
  return ((h >>> 0) % 6283) / 1000;
}

/**
 * Where `me` should be after easing away from `others` for `dt` seconds.
 * `heading` (unit vector, or null when standing) keeps a walker moving: the push never
 * shoves you backwards, it slides you round. `tie` picks the side when dead centre.
 */
export function separate(me: Vec2, others: Iterable<Vec2>, map: WorldMap, dt: number, heading: Vec2 | null = null, tie = 0): Vec2 {
  const min = onDanceFloor(me, map) ? DANCE_PERSONAL : PERSONAL;
  let px = 0, pz = 0;
  for (const o of others) {
    let dx = me.x - o.x, dz = me.z - o.z;
    const d = Math.hypot(dx, dz);
    if (d >= min) continue;
    if (d < 1e-3) { dx = Math.sin(tie); dz = Math.cos(tie); } else { dx /= d; dz /= d; }
    const over = min - d;
    px += dx * over; pz += dz * over;
  }
  const push = Math.hypot(px, pz);
  if (push < 1e-4) return me;
  if (heading) {
    // walking: drop the part that pushes straight back, and slip sideways instead
    const back = px * heading.x + pz * heading.z;
    if (back < 0) {
      px -= back * heading.x; pz -= back * heading.z;
      const side = Math.hypot(px, pz);
      if (side < push * 0.5) {
        const s = (px * -heading.z + pz * heading.x) >= 0 && side > 1e-4 ? 1 : side > 1e-4 ? -1 : (Math.sin(tie) >= 0 ? 1 : -1);
        px = -heading.z * s * push * 0.8; pz = heading.x * s * push * 0.8;
      }
    }
  }
  const k = Math.min(1, dt * EASE);
  return moveWithCollision(me, { x: me.x + px * k, z: me.z + pz * k }, map);
}

/**
 * Where a newcomer steps out of the lift: near the map's entrance, but not on top of
 * anyone already there. `rand` returns 0–1. Tries a few spots, widening as it goes;
 * if the entrance is packed, takes the emptiest one it found.
 */
export function spawnSpot(map: WorldMap, taken: Iterable<Vec2>, rand: () => number = Math.random, clear = 1.3): Vec2 {
  const people = [...taken];
  let best: Vec2 | null = null, bestGap = -1;
  for (let i = 0; i < 20; i++) {
    const wide = 1 + i * 0.12;
    const p = nearestWalkable({ x: map.spawn.x + (rand() - 0.5) * 3 * wide, z: map.spawn.z + (rand() - 0.5) * 1.5 * wide }, map, AVATAR_RADIUS);
    let gap = Infinity;
    for (const o of people) gap = Math.min(gap, Math.hypot(p.x - o.x, p.z - o.z));
    if (gap >= clear) return p;
    if (gap > bestGap) { bestGap = gap; best = p; }
  }
  return best ?? nearestWalkable(map.spawn, map);
}
