import type { Rect } from '@party/shared';

/**
 * The pool toys (flamingo, donut, beach ball) really float: wade into one and it
 * is shoved away, they bump off each other and off the pool's edge, and the
 * water slows them back to a lazy drift. Pure numbers, so it can be tested.
 * (Each guest's screen runs its own copy — close enough for pool toys.)
 */
export interface FloatBody { x: number; z: number; vx: number; vz: number; r: number; spin: number; turn: number }
export interface Pusher { x: number; z: number }

const PUSH_R = 0.55;    // a wading guest (with their swim ring)
const DRAG = 0.9;       // how quickly the water stops a toy
const BOUNCE = 0.55;    // off the pool's edge
const SHOVE = 2.4;
const TURN_MAX = 0.7;   // a bumped toy turns lazily (rad/s) — it's a pool float, not a spinning top      // how hard a guest shoves (m/s per metre of overlap, plus a base)

/** Advance the toys by dt. Returns how hard the hardest bump was this step (0 if none), for a sound. */
export function stepFloats(bodies: FloatBody[], pushers: Pusher[], pool: Rect, dt: number, t = 0): number {
  let hit = 0;
  const cx = (pool.x0 + pool.x1) / 2, cz = (pool.z0 + pool.z1) / 2;
  bodies.forEach((b, i) => {
    // a lazy current: round and round, and gently back toward the middle
    const dx = b.x - cx, dz = b.z - cz;
    const swirl = (i % 2 ? -1 : 1) * 0.035;
    b.vx += (-dz * swirl - dx * 0.012 + Math.sin(t * 0.3 + i * 2.1) * 0.01) * dt;
    b.vz += (dx * swirl - dz * 0.012 + Math.cos(t * 0.27 + i * 1.3) * 0.01) * dt;
    // guests wading into it
    for (const p of pushers) {
      const ox = b.x - p.x, oz = b.z - p.z, d = Math.hypot(ox, oz), min = b.r + PUSH_R;
      if (d >= min) continue;
      const nx = d > 1e-4 ? ox / d : 1, nz = d > 1e-4 ? oz / d : 0, over = min - d;
      b.x += nx * over; b.z += nz * over;
      const along = b.vx * nx + b.vz * nz, want = 0.9 + SHOVE * over;
      if (along < want) {
        const gain = want - along;
        b.vx += nx * gain; b.vz += nz * gain; hit = Math.max(hit, gain);
        // a glancing shove turns it a little, once per shove (not every frame you stand in it)
        const side = b.vx * nz - b.vz * nx || (i % 2 ? -1 : 1);
        b.turn += Math.sign(side) * Math.min(0.35, gain * 0.3);
      }
    }
  });
  // toys bumping into each other
  for (let i = 0; i < bodies.length; i++) for (let j = i + 1; j < bodies.length; j++) {
    const a = bodies[i], b = bodies[j];
    const ox = b.x - a.x, oz = b.z - a.z, d = Math.hypot(ox, oz), min = a.r + b.r;
    if (d >= min) continue;
    const nx = d > 1e-4 ? ox / d : 1, nz = d > 1e-4 ? oz / d : 0, over = (min - d) / 2;
    a.x -= nx * over; a.z -= nz * over; b.x += nx * over; b.z += nz * over;
    const rel = (b.vx - a.vx) * nx + (b.vz - a.vz) * nz;
    if (rel < 0) { // closing: swap the speed along the line between them (equal weights)
      a.vx += nx * rel; a.vz += nz * rel; b.vx -= nx * rel; b.vz -= nz * rel;
      hit = Math.max(hit, -rel * 0.6);
    }
  }
  for (const b of bodies) {
    const k = Math.exp(-DRAG * dt);
    b.vx *= k; b.vz *= k;
    b.turn = Math.max(-TURN_MAX, Math.min(TURN_MAX, b.turn)) * Math.exp(-1.6 * dt);
    b.x += b.vx * dt; b.z += b.vz * dt; b.spin += b.turn * dt;
    // the pool's edge
    if (b.x < pool.x0 + b.r) { b.x = pool.x0 + b.r; if (b.vx < 0) { hit = Math.max(hit, -b.vx * 0.5); b.vx *= -BOUNCE; } }
    if (b.x > pool.x1 - b.r) { b.x = pool.x1 - b.r; if (b.vx > 0) { hit = Math.max(hit, b.vx * 0.5); b.vx *= -BOUNCE; } }
    if (b.z < pool.z0 + b.r) { b.z = pool.z0 + b.r; if (b.vz < 0) { hit = Math.max(hit, -b.vz * 0.5); b.vz *= -BOUNCE; } }
    if (b.z > pool.z1 - b.r) { b.z = pool.z1 - b.r; if (b.vz > 0) { hit = Math.max(hit, b.vz * 0.5); b.vz *= -BOUNCE; } }
  }
  return hit;
}
