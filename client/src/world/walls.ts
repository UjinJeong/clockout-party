import type { WorldMap } from '@party/shared';

/**
 * The inner walls to draw, taken straight from the map the server walks people
 * on — so a doorway you can walk through is always a doorway you can see.
 * Pieces at the back stand full height; pieces toward the open front stay low,
 * so the camera can look into the rooms like a dollhouse.
 */
export interface WallPiece { x: number; z0: number; z1: number; h: number }

export function wallPieces(map: WorldMap, tall: number, low: number): WallPiece[] {
  return map.walls.map(w => ({ x: (w.x0 + w.x1) / 2, z0: w.z0, z1: w.z1, h: w.z1 <= 0 ? tall : low }));
}

/** Doorways: the open gaps between pieces on the same wall line. */
export function doorways(pieces: WallPiece[]): { x: number; z0: number; z1: number }[] {
  const byX = new Map<number, WallPiece[]>();
  for (const p of pieces) byX.set(p.x, [...(byX.get(p.x) ?? []), p]);
  const out: { x: number; z0: number; z1: number }[] = [];
  for (const [x, list] of byX) {
    const sorted = [...list].sort((a, b) => a.z0 - b.z0);
    for (let i = 1; i < sorted.length; i++) if (sorted[i].z0 > sorted[i - 1].z1) out.push({ x, z0: sorted[i - 1].z1, z1: sorted[i].z0 });
  }
  return out;
}
