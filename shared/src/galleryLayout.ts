import { GALLERY, shownIn, type Hall } from './gallery';
import { partition, seat, square } from './mapParts';
import type { Furniture, MapRoom, Rect, Vec2, WorldMap } from './world';

/**
 * 🖼️ The gallery 「액자 밖으로」, built from its list of halls: the lobby, then each hall in
 * order, as wide as the paintings it shows need. The server (walls you can't walk through),
 * the 3D gallery and the demo all build from this, so they always agree.
 */
export const ROOM_W = 12;
export const ROOM_D = 10;
export const DOOR_HALF = 2;
/** The lobby's wine bar. */
export const BAR: Rect = { x0: 3.2, x1: 8.8, z0: -3.9, z1: -3.1 };
export const SPAWN: Vec2 = { x: 6, z: 1.5 };
const BACK_Z = -ROOM_D / 2;

/**
 * Where a painting hangs. `face` is the direction the painting looks toward
 * (unit vector on the floor); visitors stand in front of it to look.
 */
export interface Slot { x: number; y: number; z: number; face: { x: number; z: number }; maxW: number; maxH: number }
/** One stretch of the building: the lobby (hall null) or a hall, with where its paintings hang. */
export interface HallSpan { hall: Hall | null; x0: number; x1: number; slots: Slot[] }
export interface GalleryLayout {
  spans: HallSpan[];
  bounds: Rect;
  /** x of every wall between two rooms (each with a doorway). */
  partitions: number[];
  benches: Rect[];
  tables: Furniture[];
  plants: Furniture[];
  map: WorldMap;
}

/** A hall is 12 m wide, or 15 m when it shows six or more paintings. */
export const hallWidth = (count: number): 12 | 15 => (count >= 6 ? 15 : 12);

const backSlot = (x: number, maxW = 2.6): Slot => ({ x, y: 2.15, z: BACK_Z + 0.06, face: { x: 0, z: 1 }, maxW, maxH: 2.1 });
/** On the back panel of a side wall (z from -5 to -2), facing into the hall. */
const sideSlot = (wallX: number, toward: 1 | -1): Slot =>
  ({ x: wallX + toward * 0.11, y: 2.1, z: -3.5, face: { x: toward, z: 0 }, maxW: 2.2, maxH: 2.0 });

/** How a hall's paintings are spread: [on the back wall, on the left wall, on the right wall]. */
const SPREAD: [number, number, number][] = [[0, 0, 0], [1, 0, 0], [2, 0, 0], [3, 0, 0], [3, 1, 0], [3, 1, 1], [4, 1, 1], [5, 1, 1], [6, 1, 1]];
/** Back-wall places on a 12 m hall (the original halls' spacing). */
const BACK_12: number[][] = [[], [6], [3.6, 8.4], [2.4, 6, 9.6]];

function hallSlots(x0: number, w: number, count: number): Slot[] {
  const [nb, nl, nr] = SPREAD[Math.max(0, Math.min(SPREAD.length - 1, count))];
  const backs = w === 12 && nb < BACK_12.length
    ? BACK_12[nb].map(dx => backSlot(x0 + dx))
    : Array.from({ length: nb }, (_, k) => backSlot(x0 + (w * (k + 0.5)) / nb, Math.min(2.6, w / nb - 0.3)));
  return [...backs, ...(nl ? [sideSlot(x0, 1)] : []), ...(nr ? [sideSlot(x0 + w, -1)] : [])];
}

/** Where someone stands to look at a painting. */
const standAt = (s: Slot): Vec2 => s.face.z ? { x: s.x, z: -2.6 } : { x: s.x + s.face.x * 1.2, z: -2.6 };

export function buildGalleryLayout(halls: Hall[], counts: Record<string, number>): GalleryLayout {
  const spans: HallSpan[] = [{ hall: null, x0: 0, x1: ROOM_W, slots: [] }];
  let x = ROOM_W;
  for (const hall of halls) {
    const n = counts[hall.id] ?? 0, w = hallWidth(n);
    spans.push({ hall, x0: x, x1: x + w, slots: hallSlots(x, w, n) });
    x += w;
  }
  const bounds: Rect = { x0: 0, x1: x, z0: -ROOM_D / 2, z1: ROOM_D / 2 };
  const partitions = spans.slice(1).map(s => s.x0);
  const halfs = spans.slice(1);
  const benches = halfs.map(s => { const c = (s.x0 + s.x1) / 2; return { x0: c - 1.4, x1: c + 1.4, z0: 0.9, z1: 1.6 }; });
  const tables = spans.flatMap(s => [{ x: s.x0 + 2.2, z: 2.9, r: 0.32 }, { x: s.x1 - 2.2, z: 2.9, r: 0.32 }]);
  // plants only in back corners whose side wall has no painting
  const plants = spans.flatMap(s => [
    ...(s.slots.some(p => p.face.x === 1) ? [] : [{ x: s.x0 + 0.7, z: -4.35, r: 0.3 }]),
    ...(s.slots.some(p => p.face.x === -1) ? [] : [{ x: s.x1 - 0.7, z: -4.35, r: 0.3 }]),
  ]);
  const rooms: MapRoom[] = spans.map(s => ({ id: s.hall?.id ?? 'lobby', name: s.hall?.name ?? '로비', x0: s.x0, x1: s.x1 }));
  const map: WorldMap = {
    theme: 'gallery',
    bounds,
    rooms,
    walls: partitions.flatMap(px => partition(px, DOOR_HALF)),
    obstacles: [BAR, ...benches, ...tables.map(square), ...plants.map(square)],
    water: [],
    spawn: SPAWN,
    // in front of every painting, the middle of an empty hall, and a few places in the lobby
    spots: halfs.flatMap(s => s.slots.length ? s.slots.map(standAt) : [{ x: (s.x0 + s.x1) / 2, z: -2.6 }])
      .concat([{ x: 3.5, z: -2.2 }, { x: 8, z: -2.2 }, { x: 6, z: 3.6 }]),
    // the viewing benches: three seats each, facing the paintings
    seats: benches.flatMap(b => [-0.85, 0, 0.85].map(dx => {
      const sx = (b.x0 + b.x1) / 2 + dx;
      return seat(sx, (b.z0 + b.z1) / 2, 0.42, Math.PI, 'sit', { x: sx, z: 0.4 });
    })),
  };
  return { spans, bounds, partitions, benches, tables, plants, map };
}

/** The gallery as this copy of the site builds it. */
export const GALLERY_LAYOUT = buildGalleryLayout(GALLERY.halls, Object.fromEntries(GALLERY.halls.map(h => [h.id, shownIn(GALLERY, h.id)])));
