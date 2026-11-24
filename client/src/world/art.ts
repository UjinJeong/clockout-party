import { GALLERY, GALLERY_LAYOUT, HALL_COLORS, type GalleryItem, type Slot } from '@party/shared';
export type { Slot } from '@party/shared';

/**
 * The paintings and their words, from the gallery file (edited on the manager page).
 * Taken-down ones are left out here; order is hanging order.
 */
export type Artwork = GalleryItem;
export const ALL_ART = GALLERY.items as Artwork[];
export const ART = ALL_ART.filter(a => !a.hidden);

/**
 * Paintings hang at sizes that follow their images: a 1800-pixel-wide picture
 * is wider on the wall than a 1400 one, a tall narrow one stays narrow.
 * (Metres of wall per pixel of the original image.)
 */
export const WALL_PER_PX = 0.00142;
/** Centre of a painting on the wall: eye level, raised only as much as a big one needs. */
export const EYE = 1.72;

/** A painting's size on the wall (true proportions), never bigger than the spot it hangs in. */
export function wallSize(a: Artwork, slot?: Pick<Slot, 'maxW' | 'maxH'>): { w: number; h: number } {
  let w = a.w * WALL_PER_PX, h = a.h * WALL_PER_PX;
  if (slot) {
    const k = Math.min(1, slot.maxW / w, slot.maxH / h);
    w *= k; h *= k;
  }
  return { w, h };
}

/** The walls have a dark wainscot with a gilt rail on top, up to this height. */
export const RAIL_TOP = 1.06;
/**
 * How high to hang it: centred at eye level, but always with its frame clear
 * above the wainscot rail (a big painting is raised just enough).
 */
export const hangY = (h: number) => Math.max(EYE, h / 2 + RAIL_TOP + 0.2);

const pad = (n: number) => String(n).padStart(2, '0');
/** The wall-sized picture: a replacement from the manager page, or the original. */
export const wallSrc = (a: Artwork) => a.wall ?? `art/wall/${pad(a.i)}.jpg`;

/** Name, wall colour and intro of each room: the lobby, then the halls from the gallery file. */
export const ROOM_INFO: Record<string, { name: string; color: string; note: string }> = {
  lobby: { name: '로비', color: '#3d2c24', note: '와인 한 잔 받아 들고 천천히 둘러보세요.' },
  ...Object.fromEntries(GALLERY.halls.map(h => [h.id, { name: h.name, color: HALL_COLORS[h.color], note: h.note }])),
};

/** Where a hall's paintings hang, in hanging order (from the shared layout). */
export const slotsFor = (hallId: string): Slot[] => GALLERY_LAYOUT.spans.find(s => s.hall?.id === hallId)?.slots ?? [];
