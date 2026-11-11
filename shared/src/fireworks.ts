import type { Rect, Vec2, WorldMap } from './world';

/**
 * 🎆 Fireworks at the pool party.
 *  - Anyone standing at the DJ booth can launch a volley for the whole party
 *    (the room allows one every FIREWORK_COOLDOWN seconds).
 *  - Evenings and nights there's also a short show every three minutes, worked
 *    out from the clock so every guest sees it at the same moment.
 */
export const FIREWORK_COOLDOWN = 6;
/** How close to the booth you must stand to reach the button (metres from its edge). */
export const STAGE_REACH = 2.6;

export function nearStage(map: WorldMap, p: Vec2): boolean {
  const s: Rect | undefined = map.stage;
  if (!s) return false;
  const dx = Math.max(s.x0 - p.x, 0, p.x - s.x1), dz = Math.max(s.z0 - p.z, 0, p.z - s.z1);
  return Math.hypot(dx, dz) <= STAGE_REACH;
}

/** Is the automatic show on right now? (18:00–05:00, the first 25 s of every third minute.) */
export function showAt(d: Date): boolean {
  const h = d.getHours();
  if (!(h >= 18 || h < 5)) return false;
  return d.getMinutes() % 3 === 0 && d.getSeconds() < 25;
}

export const isFireworkSeed = (v: unknown): v is number => Number.isInteger(v) && (v as number) >= 0 && (v as number) < 2 ** 31;
