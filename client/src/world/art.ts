import type { RoomId } from '@party/shared';
import ARTWORKS from './artworks.json';

/** The paintings of 「액자 밖으로」 by 정유진, with the docent's notes from the exhibition. */
export interface Artwork {
  i: number; room: RoomId; title: string; w: number; h: number; desc: string; doc: string;
}
export const ART = ARTWORKS as Artwork[];

/**
 * How big each painting really is: the longer side, in cm.
 * ⚠️ 임시값 — 실제 작품 크기를 받으면 이 숫자만 바꾸면 돼요.
 * (대 162cm ≈ 100호, 중 117cm ≈ 50호, 소 73cm ≈ 20호)
 */
export const LONG_CM: Record<number, number> = {
  17: 162, 1: 162, 9: 162, 6: 162,                                       // 대: 민들레와 발, 해바라기 밭, 둥근 연못, 먹 고릴라
  2: 117, 5: 117, 0: 117, 4: 117, 7: 117, 8: 117, 18: 117, 12: 117, 14: 117, // 중
  15: 73, 3: 73, 16: 73, 10: 73, 13: 73, 11: 73,                          // 소: 크레파스, 스노우볼, 곰 인형, 잉어 I·III, 꿈꾸는 잉어
};
/** Metres of wall per cm of canvas — a little larger than life, since the guests are cartoon-sized. */
export const WALL_PER_CM = 0.0142;
/** Centre of a painting on the wall: eye level, raised only as much as a big one needs. */
export const EYE = 1.72;

/** A painting's size on the wall (true proportions), never bigger than the spot it hangs in. */
export function wallSize(a: Artwork, slot?: Pick<Slot, 'maxW' | 'maxH'>): { w: number; h: number } {
  const long = (LONG_CM[a.i] ?? 117) * WALL_PER_CM;
  let w = a.w >= a.h ? long : long * a.w / a.h;
  let h = a.w >= a.h ? long * a.h / a.w : long;
  if (slot) {
    const k = Math.min(1, slot.maxW / w, slot.maxH / h);
    w *= k; h *= k;
  }
  return { w, h };
}

/** How high to hang it: centred at eye level, with at least 60 cm of wall underneath. */
export const hangY = (h: number) => Math.max(EYE, h / 2 + 0.6);

const pad = (n: number) => String(n).padStart(2, '0');
export const wallSrc = (a: Artwork) => `art/wall/${pad(a.i)}.jpg`;

export const ROOM_INFO: Record<RoomId, { name: string; color: string; note: string }> = {
  lobby: { name: '로비', color: '#3d2c24', note: '와인 한 잔 받아 들고 천천히 둘러보세요.' },
  garden: { name: '정원관', color: '#4a5a43', note: '바람과 숨결이 지나가는 방.' },
  face: { name: '얼굴관', color: '#6b2727', note: '정면을 바라보는 얼굴들.' },
  toy: { name: '장난감관', color: '#28324f', note: '유리구와 가챠, 곰 인형 더미.' },
  pond: { name: '연못관', color: '#22434a', note: '먹과 금박, 얼음 속 물고기들.' },
};

/**
 * Where a painting hangs. `face` is the direction the painting looks toward
 * (unit vector on the floor); visitors stand in front of it to look.
 */
export interface Slot { x: number; y: number; z: number; face: { x: number; z: number }; maxW: number; maxH: number }

const BACK_Z = -5;
const back = (x: number, maxW = 2.6): Slot => ({ x, y: 2.15, z: BACK_Z + 0.06, face: { x: 0, z: 1 }, maxW, maxH: 2.1 });
/** A partition's back panel (z from -5 to -2), seen from the room to its right (+x) or left (-x). */
const side = (wallX: number, toward: 1 | -1, z = -3.5, maxW = 2.2): Slot =>
  ({ x: wallX + toward * 0.11, y: 2.1, z, face: { x: toward, z: 0 }, maxW, maxH: 2.0 });

export function slotsFor(room: RoomId): Slot[] {
  const r = ['lobby', 'garden', 'face', 'toy', 'pond'].indexOf(room);
  const x0 = r * 12;
  switch (room) {
    case 'garden': return [back(x0 + 2.4), back(x0 + 6), back(x0 + 9.6), side(x0, 1), side(x0 + 12, -1)];
    case 'face': return [back(x0 + 2.4), back(x0 + 6), back(x0 + 9.6), side(x0, 1)];
    case 'toy': return [back(x0 + 2.4), back(x0 + 6), back(x0 + 9.6)];
    case 'pond': return [back(x0 + 1.8, 2.3), back(x0 + 4.6, 2.3), back(x0 + 7.4, 2.3), back(x0 + 10.2, 2.3),
      side(x0, 1), side(60, -1, -3.3), side(60, -1, 0, 2.0)];
    default: return [];
  }
}
