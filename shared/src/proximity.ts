import { NEAR_RADIUS } from './constants';
import type { Vec2 } from './world';

export function isNear(a: Vec2, b: Vec2, r = NEAR_RADIUS): boolean {
  const dx = a.x - b.x, dz = a.z - b.z;
  return dx * dx + dz * dz <= r * r;
}

/** Ids of everyone close enough to `from` to hear them — including `from` itself. */
export function nearbyIds<T extends { id: string } & Vec2>(from: T, all: Iterable<T>, r = NEAR_RADIUS): string[] {
  const out: string[] = [];
  for (const p of all) if (p.id === from.id || isNear(from, p, r)) out.push(p.id);
  return out;
}
