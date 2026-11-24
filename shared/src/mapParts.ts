import type { Seat } from './energy';
import type { Furniture, Rect, Vec2 } from './world';

/** Small building blocks every map uses. */
let seatNo = 0;
/** A seat facing `dir`, with its stand-up spot at `stand`. */
export const seat = (x: number, z: number, y: number, dir: number, pose: 'sit' | 'lie', stand: Vec2): Seat =>
  ({ id: seatNo++, x, z, y, dir, pose, stand });

export const square = (p: Furniture): Rect => ({ x0: p.x - p.r, x1: p.x + p.r, z0: p.z - p.r, z1: p.z + p.r });
export const WALL_T = 0.1;
/** A partition at x with a doorway |z| < doorHalf, from the back (-5) to the front (+5). */
export function partition(x: number, doorHalf: number, z0 = -5, z1 = 5): Rect[] {
  return [
    { x0: x - WALL_T / 2, x1: x + WALL_T / 2, z0, z1: -doorHalf },
    { x0: x - WALL_T / 2, x1: x + WALL_T / 2, z0: doorHalf, z1 },
  ];
}
