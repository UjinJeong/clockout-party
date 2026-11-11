import { AVATAR_RADIUS } from './constants';
import type { Seat } from './energy';

/**
 * The party maps, shared so the server and clients agree on where you can walk.
 *
 * Every place is a strip of rooms side by side along x; z runs from the back
 * (-5) to the open front edge (+5) the camera looks in from. A map is plain
 * data — walls, furniture, water — and the same few functions below do the
 * walking for every theme.
 */
export interface Vec2 { x: number; z: number }
export interface Rect { x0: number; x1: number; z0: number; z1: number }
/** Round furniture: tables, plants, stools… */
export interface Furniture { x: number; z: number; r: number }

export const THEMES = ['gallery', 'home', 'pool'] as const;
export type Theme = (typeof THEMES)[number];
export const THEME_LABEL: Record<Theme, string> = { gallery: '전시장', home: '홈파티', pool: '풀파티' };
export const THEME_ICON: Record<Theme, string> = { gallery: '🖼️', home: '🏠', pool: '🏖️' };
export const isTheme = (v: unknown): v is Theme => (THEMES as readonly unknown[]).includes(v);

export interface MapRoom { id: string; name: string; x0: number; x1: number }
/** A named place inside the strip that only covers part of it (upstairs, the stairs). */
export interface MapZone extends MapRoom { z0: number; z1: number }

/**
 * A part of the map that is walked in one place and drawn in another: a floor
 * upstairs, or the stairs up to it. Inside `rect`, x stays as it is while the
 * drawn z runs from `wz0` (at rect.z0) to `wz1` (at rect.z1) and the height
 * from `y0` to `y1`. This keeps walking flat and simple — the server and the
 * pathfinding never see a second floor — while the house is drawn in 3D.
 */
export interface Lift { rect: Rect; wz0: number; wz1: number; y0: number; y1: number }
export interface WorldMap {
  theme: Theme;
  bounds: Rect;
  rooms: MapRoom[];
  /** Solid wall pieces (partitions with their doorways already cut out). */
  walls: Rect[];
  /** Furniture you bump into. The client draws these, the server enforces them. */
  obstacles: Rect[];
  /** Water you can wade into (the pool). Walkable, just wetter. */
  water: Rect[];
  spawn: Vec2;
  /** Where bot guests like to hang out. */
  spots: Vec2[];
  /** Places to sit down and recharge. */
  seats: Seat[];
  /** A DJ booth, where fireworks can be launched (pool party). */
  stage?: Rect;
  /** Parts drawn somewhere other than where they're walked (a second floor). */
  lifts?: Lift[];
  /** Named places within the rooms (upstairs, the stairs). */
  zones?: MapZone[];
}

let seatNo = 0;
/** A seat facing `dir`, with its stand-up spot `out` metres in front of it (or at `stand`). */
const seat = (x: number, z: number, y: number, dir: number, pose: 'sit' | 'lie', stand: Vec2): Seat =>
  ({ id: seatNo++, x, z, y, dir, pose, stand });

const square = (p: Furniture): Rect => ({ x0: p.x - p.r, x1: p.x + p.r, z0: p.z - p.r, z1: p.z + p.r });
export const WALL_T = 0.1;
/** A partition at x with a doorway |z| < doorHalf, from the back (-5) to the front (+5). */
function partition(x: number, doorHalf: number, z0 = -5, z1 = 5): Rect[] {
  return [
    { x0: x - WALL_T / 2, x1: x + WALL_T / 2, z0, z1: -doorHalf },
    { x0: x - WALL_T / 2, x1: x + WALL_T / 2, z0: doorHalf, z1 },
  ];
}

// ───────────────────────── 🖼️ gallery: 「액자 밖으로」 ─────────────────────────
export const ROOM_W = 12;
export const ROOM_D = 10;
export const ROOM_IDS = ['lobby', 'garden', 'face', 'toy', 'pond'] as const;
export type RoomId = (typeof ROOM_IDS)[number];
export const WORLD: Rect = { x0: 0, x1: ROOM_W * ROOM_IDS.length, z0: -ROOM_D / 2, z1: ROOM_D / 2 };
export const PARTITIONS = [12, 24, 36, 48];
export const DOOR_HALF = 2;
const ROOM_NAME: Record<RoomId, string> = { lobby: '로비', garden: '정원관', face: '얼굴관', toy: '장난감관', pond: '연못관' };

export const BAR: Rect = { x0: 3.2, x1: 8.8, z0: -3.9, z1: -3.1 }; // lobby wine bar
export const BENCHES: Rect[] = [1, 2, 3, 4].map(i => ({ x0: i * ROOM_W + 4.6, x1: i * ROOM_W + 7.4, z0: 0.9, z1: 1.6 }));
/** Standing tables (with a candle) and potted plants. */
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
export const OBSTACLES: Rect[] = [BAR, ...BENCHES, ...TABLES.map(square), ...PLANTS.map(square)];
export const SPAWN: Vec2 = { x: 6, z: 1.5 };

export const GALLERY_MAP: WorldMap = {
  theme: 'gallery',
  bounds: WORLD,
  rooms: ROOM_IDS.map((id, i) => ({ id, name: ROOM_NAME[id], x0: i * ROOM_W, x1: (i + 1) * ROOM_W })),
  walls: PARTITIONS.flatMap(x => partition(x, DOOR_HALF)),
  obstacles: OBSTACLES,
  water: [],
  spawn: SPAWN,
  spots: [1, 2, 3, 4].flatMap(r => [2.4, 6, 9.6].map(dx => ({ x: r * ROOM_W + dx, z: -2.6 })))
    .concat([{ x: 3.5, z: -2.2 }, { x: 8, z: -2.2 }, { x: 6, z: 3.6 }]),
  // the viewing benches: three seats each, facing the paintings
  seats: BENCHES.flatMap(b => [-0.85, 0, 0.85].map(dx => {
    const x = (b.x0 + b.x1) / 2 + dx;
    return seat(x, (b.z0 + b.z1) / 2, 0.42, Math.PI, 'sit', { x, z: 0.4 });
  })),
};

// ───────────────────────── 🏠 home party: a two-storey house ─────────────────────────
/**
 * Living room (0–12, two storeys high), kitchen (12–24), terrace (24–36).
 * A staircase runs up the left wall of the living room to a landing over its
 * back half: on the walking map the landing sits behind the house (z < −5) and
 * the stairs run straight back to it; `lifts` lift them into place when drawn.
 */
export const HOUSE = {
  back: -5,          // the back wall of the house, as drawn
  upY: 3.2,          // landing floor height
  edge: -2.4,        // the front edge of the landing (its railing), as drawn
  stairX: 1.45,      // the stairs run along the left wall, x 0 … stairX
  stairFoot: 2.6,    // where the bottom step is
  /** where the landing lives on the walking map: behind the house */
  upZ0: -9.4, upZ1: -6.8,
  upX1: 11.95,
  /** the guest room upstairs, over the back of the kitchen (12 … bedX1), through a door at x = 12 */
  bedX1: 20,
  door: { z0: -4.4, z1: -3.1 },   // as drawn
};
/** Landing (as walked) → drawn: z shifted forward by this, raised to upY. */
const UP_SHIFT = HOUSE.edge - HOUSE.upZ1;
/** A rect on the landing, given as drawn (world) coordinates. */
const up = (r: Rect): Rect => ({ x0: r.x0, x1: r.x1, z0: r.z0 - UP_SHIFT, z1: r.z1 - UP_SHIFT });
const upAt = (x: number, z: number): Vec2 => ({ x, z: z - UP_SHIFT });

export const HOME = {
  partitions: [12, 24],
  doorHalf: [1.8, 2.4] as const, // the terrace has a wide glass sliding door
  sofa: { x0: 2.6, x1: 7.4, z0: -4.6, z1: -3.6 } as Rect,
  coffeeTable: { x0: 4.1, x1: 5.9, z0: -2.5, z1: -1.8 } as Rect,
  fireplace: { x0: 8.7, x1: 10.9, z0: -5, z1: -4.45 } as Rect,
  armchair: { x: 2.5, z: -1.3, r: 0.5 } as Furniture,
  lamp: { x: 2.1, z: -4.45, r: 0.25 } as Furniture,
  record: { x0: 10.6, x1: 11.8, z0: -2.6, z1: -1.6 } as Rect, // record player on a low cabinet
  counter: { x0: 12.3, x1: 23.7, z0: -5, z1: -4.35 } as Rect,  // back counter, sink and fridge
  island: { x0: 15.4, x1: 20.6, z0: -1.9, z1: -0.9 } as Rect,
  stools: [16.3, 18, 19.7].map(x => ({ x, z: -0.3, r: 0.2 })) as Furniture[],
  grill: { x: 34.2, z: -3.9, r: 0.45 } as Furniture,
  beanbags: [{ x: 27.4, z: -2.6, r: 0.5 }, { x: 29.3, z: -3.5, r: 0.5 }] as Furniture[],
  patioTable: { x: 31.2, z: 1.6, r: 0.6 } as Furniture,
  plants: [{ x: 24.8, z: -4.4, r: 0.35 }, { x: 35.4, z: -1.2, r: 0.35 }, { x: 11.3, z: 4.1, r: 0.3 }] as Furniture[],
  // upstairs, as drawn (over the back of the living room)
  loveseat: { x0: 4.9, x1: 7.1, z0: -5, z1: -4.15 } as Rect,
  tvConsole: { x0: 9.3, x1: 11.5, z0: -5, z1: -4.6 } as Rect,
  bookshelf: { x0: 1.9, x1: 3.3, z0: -5, z1: -4.65 } as Rect,
  // right up against the TV stand, so the walkway along the railing stays open to the guest room
  upBeanbag: { x: 10.3, z: -4.1, r: 0.45 } as Furniture,
  upPlant: { x: 0.7, z: -4.7, r: 0.28 } as Furniture, // in the corner of the stair landing
  // the guest room: a double bed with its head against the right-hand wall
  bed: { x0: 18.0, x1: 19.95, z0: -5, z1: -3.3 } as Rect,
  nightstand: { x0: 19.4, x1: 19.95, z0: -3.25, z1: -2.85 } as Rect,
  wardrobe: { x0: 12.4, x1: 13.7, z0: -5, z1: -4.4 } as Rect,
};
export const HOME_MAP: WorldMap = {
  theme: 'home',
  bounds: { x0: 0, x1: 36, z0: HOUSE.upZ0, z1: 5 },
  rooms: [
    { id: 'living', name: '거실', x0: 0, x1: 12 },
    { id: 'kitchen', name: '부엌', x0: 12, x1: 24 },
    { id: 'terrace', name: '테라스', x0: 24, x1: 36 },
  ],
  walls: HOME.partitions.flatMap((x, i) => partition(x, HOME.doorHalf[i])),
  obstacles: [
    HOME.sofa, HOME.coffeeTable, HOME.fireplace, HOME.record, HOME.counter, HOME.island,
    ...[HOME.armchair, HOME.lamp, ...HOME.stools, HOME.grill, ...HOME.beanbags, HOME.patioTable, ...HOME.plants].map(square),
    // the banister between the stairs and the living room (you get on at the bottom)
    { x0: HOUSE.stairX, x1: HOUSE.stairX + 0.15, z0: HOUSE.back, z1: HOUSE.stairFoot },
    // behind the house on the walking map: solid, except the stairs and the landing
    { x0: HOUSE.stairX, x1: 36, z0: HOUSE.upZ1, z1: HOUSE.back },
    { x0: HOUSE.bedX1, x1: 36, z0: HOUSE.upZ0, z1: HOUSE.upZ1 },
    // the wall between the landing and the guest room, with its door
    { x0: HOUSE.upX1, x1: 12.05, z0: HOUSE.upZ0, z1: HOUSE.door.z0 - UP_SHIFT },
    { x0: HOUSE.upX1, x1: 12.05, z0: HOUSE.door.z1 - UP_SHIFT, z1: HOUSE.upZ1 },
    up(HOME.bed), up(HOME.nightstand), up(HOME.wardrobe),
    // upstairs furniture
    up(HOME.loveseat), up(HOME.tvConsole), up(HOME.bookshelf),
    square({ ...upAt(HOME.upBeanbag.x, HOME.upBeanbag.z), r: HOME.upBeanbag.r }),
    square({ ...upAt(HOME.upPlant.x, HOME.upPlant.z), r: HOME.upPlant.r }),
  ],
  lifts: [
    // the landing: walked behind the house, drawn over the back of the living room
    { rect: { x0: 0, x1: HOUSE.bedX1, z0: HOUSE.upZ0, z1: HOUSE.upZ1 }, wz0: HOUSE.back, wz1: HOUSE.edge, y0: HOUSE.upY, y1: HOUSE.upY },
    // the stairs: from the landing's front edge down to the bottom step
    { rect: { x0: 0, x1: HOUSE.stairX, z0: HOUSE.upZ1, z1: HOUSE.stairFoot }, wz0: HOUSE.edge, wz1: HOUSE.stairFoot, y0: HOUSE.upY, y1: 0 },
  ],
  zones: [
    { id: 'bedroom', name: '손님방', x0: 12, x1: HOUSE.bedX1, z0: HOUSE.upZ0, z1: HOUSE.upZ1 },
    { id: 'upstairs', name: '2층', x0: 0, x1: 12, z0: HOUSE.upZ0, z1: HOUSE.upZ1 },
    { id: 'stairs', name: '계단', x0: 0, x1: HOUSE.stairX, z0: HOUSE.upZ1, z1: HOUSE.stairFoot },
  ],
  water: [],
  spawn: { x: 6, z: 1.5 },
  spots: [
    { x: 5, z: -1.0 }, { x: 9.8, z: -3.4 }, { x: 2.8, z: -2.6 }, { x: 8, z: 2.4 },
    { x: 18, z: -2.9 }, { x: 14, z: -2.8 }, { x: 18, z: 0.6 }, { x: 22, z: 1.5 },
    { x: 28.4, z: -1.5 }, { x: 32.5, z: -2.6 }, { x: 31.2, z: 3.2 }, { x: 26.5, z: 2.5 },
    upAt(3.8, -3.0), upAt(8.2, -3.1), upAt(6, -3.4), upAt(15.2, -3.6),
  ],
  seats: [
    // the sofa, three cushions facing the room
    ...[3.6, 5.0, 6.4].map(x => seat(x, -4.0, 0.58, 0, 'sit', { x, z: -3.05 })),
    // the armchair, angled toward the coffee table
    seat(2.5, -1.3, 0.5, 0.85, 'sit', { x: 2.5 + Math.sin(0.85) * 1.2, z: -1.3 + Math.cos(0.85) * 1.2 }),
    // stools at the kitchen island, facing it
    ...[16.3, 18, 19.7].map(x => seat(x, -0.3, 0.78, Math.PI, 'sit', { x, z: 0.45 })),
    // bean bags on the terrace: sink right in
    seat(27.4, -2.6, 0.36, 0.3, 'sit', { x: 27.4, z: -1.6 }),
    seat(29.3, -3.5, 0.36, -0.2, 'sit', { x: 29.3, z: -2.5 }),
    // upstairs: a loveseat looking out over the party below, and a bean bag in front of the TV
    ...[5.5, 6.5].map(x => seat(x, upAt(x, -4.55).z, 0.5, 0, 'sit', upAt(x, -3.75))),
    seat(HOME.upBeanbag.x, upAt(0, HOME.upBeanbag.z).z, 0.36, Math.PI, 'sit', upAt(9.4, -3.2)),
    // the guest room bed: lie down from the foot of it, head on the pillows by the wall
    ...[-4.55, -3.75].map(z => seat(18.35, upAt(0, z).z, 0.5, -Math.PI / 2, 'lie', upAt(17.5, z))),
  ],
};

// ───────────────────────── 🏖️ pool party: outdoors ─────────────────────────
/** Cabana bar (0–12), pool (12–30), sand (30–40). No walls, just sky. */
export const POOL = {
  bar: { x0: 2.6, x1: 8.4, z0: -4.1, z1: -3.2 } as Rect,
  pool: { x0: 14.5, x1: 27.5, z0: -2.8, z1: 1.6 } as Rect,
  loungers: [15.6, 18.1, 20.6, 23.1, 25.6].map(x => ({ x0: x - 0.36, x1: x + 0.36, z0: -4.95, z1: -3.35 })) as Rect[],
  // only along the back: anything tall near the front would stand between you and the camera
  palms: [{ x: 12.9, z: -4.3, r: 0.4 }, { x: 29.1, z: -4.3, r: 0.4 }, { x: 0.9, z: -4.3, r: 0.4 }] as Furniture[],
  // off to the side of the DJ stage, so they never stand between you and it
  umbrellas: [{ x: 32.2, z: -2.4, r: 0.15 }, { x: 31.2, z: 3.4, r: 0.15 }] as Furniture[],
  dj: { x0: 35.4, x1: 38.6, z0: -4.9, z1: -3.9 } as Rect,
  bonfire: { x: 34.2, z: 1.4, r: 0.6 } as Furniture,
  barStools: [3.6, 5.5, 7.4].map(x => ({ x, z: -2.75, r: 0.2 })) as Furniture[],
};
export const POOL_MAP: WorldMap = {
  theme: 'pool',
  bounds: { x0: 0, x1: 40, z0: -5, z1: 5 },
  rooms: [
    { id: 'cabana', name: '바 오두막', x0: 0, x1: 12 },
    { id: 'pool', name: '수영장', x0: 12, x1: 30 },
    { id: 'beach', name: '모래사장', x0: 30, x1: 40 },
  ],
  walls: [],
  obstacles: [
    POOL.bar, POOL.dj, ...POOL.loungers,
    ...[...POOL.palms, ...POOL.umbrellas, POOL.bonfire, ...POOL.barStools].map(square),
  ],
  water: [POOL.pool],
  spawn: { x: 6, z: 1.5 },
  spots: [
    { x: 4.5, z: -1.8 }, { x: 7.2, z: -1.8 }, { x: 9.5, z: 1.2 },
    { x: 17.5, z: -0.6 }, { x: 22.5, z: 0.2 }, { x: 25.5, z: -1.6 }, { x: 19.5, z: 3.2 }, { x: 24.5, z: -3.05 },
    { x: 33.2, z: -1.2 }, { x: 35.8, z: 2.8 }, { x: 36.8, z: -2.9 },
  ],
  seats: [
    // stretch out on a lounger: the seat point is at the feet, you lie back from there
    ...[15.6, 18.1, 20.6, 23.1, 25.6].map(x => seat(x, -3.5, 0.38, 0, 'lie', { x, z: -2.95 })),
    // stools at the cabana bar
    ...[3.6, 5.5, 7.4].map(x => seat(x, -2.75, 0.78, Math.PI, 'sit', { x, z: -1.95 })),
  ],
  stage: POOL.dj,
};

export const MAPS: Record<Theme, WorldMap> = { gallery: GALLERY_MAP, home: HOME_MAP, pool: POOL_MAP };
export const mapFor = (theme: unknown): WorldMap => MAPS[isTheme(theme) ? theme : 'gallery'];

// ───────────────────────── walking, for every map ─────────────────────────

/** Which room a point is in: by its place along the strip, or (given z) a zone like upstairs. */
export function roomAt(x: number, map: WorldMap = GALLERY_MAP, z?: number): MapRoom {
  if (z !== undefined) {
    const zone = map.zones?.find(r => x >= r.x0 && x < r.x1 && z >= r.z0 && z < r.z1);
    if (zone) return zone;
  }
  return map.rooms.find(r => x >= r.x0 && x < r.x1) ?? (x < map.rooms[0].x0 ? map.rooms[0] : map.rooms[map.rooms.length - 1]);
}

/** Where a point of the walking map is drawn (y = how high its floor is). */
export function toWorld(map: WorldMap, p: Vec2): { x: number; y: number; z: number } {
  for (const l of map.lifts ?? []) {
    const r = l.rect;
    if (p.x >= r.x0 && p.x <= r.x1 && p.z >= r.z0 && p.z <= r.z1) {
      const u = (p.z - r.z0) / (r.z1 - r.z0);
      return { x: p.x, y: l.y0 + (l.y1 - l.y0) * u, z: l.wz0 + (l.wz1 - l.wz0) * u };
    }
  }
  return { x: p.x, y: 0, z: p.z };
}

/** The walking-map point for a spot on a drawn floor (a tap), the inverse of `toWorld`. */
export function fromWorld(map: WorldMap, w: { x: number; y: number; z: number }): Vec2 {
  for (const l of map.lifts ?? []) {
    const r = l.rect;
    if (w.x < r.x0 || w.x > r.x1) continue;
    const u = (w.z - l.wz0) / (l.wz1 - l.wz0);
    if (u < -1e-6 || u > 1 + 1e-6) continue;
    if (Math.abs(w.y - (l.y0 + (l.y1 - l.y0) * u)) > 0.5) continue; // a different floor at this spot
    return { x: w.x, z: r.z0 + (r.z1 - r.z0) * u };
  }
  return { x: w.x, z: w.z };
}

function inRect(p: Vec2, r: Rect, pad: number) {
  return p.x > r.x0 - pad && p.x < r.x1 + pad && p.z > r.z0 - pad && p.z < r.z1 + pad;
}

/** Standing in the pool? */
export function inWater(p: Vec2, map: WorldMap = GALLERY_MAP): boolean {
  return map.water.some(w => inRect(p, w, 0));
}

/** True when a circle of `radius` at p touches nothing solid. */
export function isWalkable(p: Vec2, map: WorldMap = GALLERY_MAP, radius = AVATAR_RADIUS): boolean {
  if (!Number.isFinite(p.x) || !Number.isFinite(p.z)) return false;
  const b = map.bounds;
  if (p.x < b.x0 + radius || p.x > b.x1 - radius) return false;
  if (p.z < b.z0 + radius || p.z > b.z1 - radius) return false;
  for (const w of map.walls) if (inRect(p, w, radius)) return false;
  for (const o of map.obstacles) if (inRect(p, o, radius)) return false;
  return true;
}

/**
 * Move from `from` toward `to`, stopping at walls. Each axis is tried on its
 * own so you slide along a wall instead of sticking to it. Long moves are
 * stepped so you can never tunnel through a thin partition.
 */
export function moveWithCollision(from: Vec2, to: Vec2, map: WorldMap = GALLERY_MAP, radius = AVATAR_RADIUS): Vec2 {
  let cur: Vec2 = isWalkable(from, map, radius) ? { ...from } : nearestWalkable(from, map, radius);
  const dx = to.x - cur.x, dz = to.z - cur.z;
  const steps = Math.max(1, Math.ceil(Math.hypot(dx, dz) / (radius * 0.5)));
  const sx = dx / steps, sz = dz / steps;
  for (let i = 0; i < steps; i++) {
    const nx = { x: cur.x + sx, z: cur.z };
    if (isWalkable(nx, map, radius)) cur = nx;
    const nz = { x: cur.x, z: cur.z + sz };
    if (isWalkable(nz, map, radius)) cur = nz;
  }
  return cur;
}

/** Pull a point that ended up inside something back onto open floor. */
export function nearestWalkable(p: Vec2, map: WorldMap = GALLERY_MAP, radius = AVATAR_RADIUS): Vec2 {
  const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));
  const b = map.bounds;
  const base = {
    x: clamp(Number.isFinite(p.x) ? p.x : map.spawn.x, b.x0 + radius, b.x1 - radius),
    z: clamp(Number.isFinite(p.z) ? p.z : map.spawn.z, b.z0 + radius, b.z1 - radius),
  };
  if (isWalkable(base, map, radius)) return base;
  for (let r = 0.25; r < 6; r += 0.25) {
    for (let a = 0; a < 16; a++) {
      const t = (a / 16) * Math.PI * 2;
      const q = { x: base.x + Math.cos(t) * r, z: base.z + Math.sin(t) * r };
      if (isWalkable(q, map, radius)) return q;
    }
  }
  return { ...map.spawn };
}
