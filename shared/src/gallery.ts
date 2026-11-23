/**
 * The gallery's paintings and every word shown with them, in one list
 * (client/src/world/gallery.json). The manager page edits it; the 3D gallery,
 * the living-painting viewer and the docent all read it. Order = hanging order.
 */
export const GALLERY_ROOMS = ['garden', 'face', 'toy', 'pond'] as const;
export type GalleryRoom = (typeof GALLERY_ROOMS)[number];
export const GALLERY_ROOM_LABEL: Record<GalleryRoom, string> = { garden: '정원관', face: '얼굴관', toy: '장난감관', pond: '연못관' };
/** How many paintings each room has wall space for. */
export const GALLERY_SLOTS: Record<GalleryRoom, number> = { garden: 5, face: 4, toy: 3, pond: 7 };
/** The docent's four questions, in order. */
export const DOCENT_QUESTIONS = ['먼저 어디를 보면 좋을까요?', '색은 어떻게 쓰였나요?', '아이에게 설명해 주세요', '이 그림이 움직인다면?'] as const;

export interface GalleryItem {
  /** Stable id (also names the built-in image files). */
  i: number;
  room: GalleryRoom;
  title: string;
  /** Size of the original image in pixels: decides how big it hangs. */
  w: number; h: number;
  /** One or two lines beside the painting. */
  desc: string;
  /** The docent's note. */
  doc: string;
  /** "해 보기": what to try in the living painting, and its short hint. */
  how: string; hint: string;
  /** The docent's answers to DOCENT_QUESTIONS. */
  answers: string[];
  /** A replacement picture (paths under the site, e.g. gallery/17-k3j2.jpg). Without it, the original. */
  image?: string; wall?: string; thumb?: string;
  /** Taken down for now (kept, not shown). */
  hidden?: boolean;
}

export const LIMITS = { title: 40, desc: 300, doc: 800, how: 200, hint: 30, answer: 800 } as const;
const PATH = /^gallery\/[A-Za-z0-9_-]{1,64}\.(jpg|jpeg|png|webp)$/;
export const isGalleryPath = (v: unknown): v is string => typeof v === 'string' && PATH.test(v);

const text = (v: unknown, max: number) => typeof v === 'string' ? v.replace(/\r\n?/g, '\n').replace(/[\u0000-\u0009\u000b-\u001f\u007f]/g, '').trim().slice(0, max) : '';
const size = (v: unknown) => typeof v === 'number' && Number.isFinite(v) && v >= 100 && v <= 8000 ? Math.round(v) : null;

/**
 * Check a whole gallery sent from the manager page. Returns the cleaned list, or the first
 * problem in plain words (shown on the page as is).
 */
export function checkGallery(raw: unknown): { ok: true; items: GalleryItem[] } | { ok: false; error: string } {
  if (!Array.isArray(raw) || raw.length === 0 || raw.length > 200) return { ok: false, error: '그림 목록이 비어 있거나 너무 길어요.' };
  const items: GalleryItem[] = [];
  const seen = new Set<number>();
  for (const [n, r] of raw.entries()) {
    const o = (r ?? {}) as Record<string, unknown>;
    const where = `${n + 1}번째 그림`;
    if (!Number.isInteger(o.i) || (o.i as number) < 0 || (o.i as number) > 9999 || seen.has(o.i as number)) return { ok: false, error: `${where}: 번호가 잘못됐어요.` };
    seen.add(o.i as number);
    if (!GALLERY_ROOMS.includes(o.room as GalleryRoom)) return { ok: false, error: `${where}: 전시실을 골라 주세요.` };
    const title = text(o.title, LIMITS.title);
    if (!title) return { ok: false, error: `${where}: 제목이 비어 있어요.` };
    const w = size(o.w), h = size(o.h);
    if (!w || !h) return { ok: false, error: `「${title}」: 그림 크기를 알 수 없어요.` };
    const it: GalleryItem = {
      i: o.i as number, room: o.room as GalleryRoom, title, w, h,
      desc: text(o.desc, LIMITS.desc), doc: text(o.doc, LIMITS.doc), how: text(o.how, LIMITS.how), hint: text(o.hint, LIMITS.hint),
      answers: DOCENT_QUESTIONS.map((_, k) => text(Array.isArray(o.answers) ? o.answers[k] : '', LIMITS.answer)),
    };
    for (const k of ['image', 'wall', 'thumb'] as const) {
      if (o[k] === undefined || o[k] === null || o[k] === '') continue;
      if (!isGalleryPath(o[k])) return { ok: false, error: `「${title}」: 그림 파일 경로가 잘못됐어요.` };
      it[k] = o[k] as string;
    }
    if (it.image && (!it.wall || !it.thumb)) return { ok: false, error: `「${title}」: 새 그림의 작은 사본이 빠졌어요. 다시 올려 주세요.` };
    if (o.hidden === true) it.hidden = true;
    items.push(it);
  }
  for (const room of GALLERY_ROOMS) {
    const shown = items.filter(x => x.room === room && !x.hidden).length;
    if (shown > GALLERY_SLOTS[room]) return { ok: false, error: `${GALLERY_ROOM_LABEL[room]}에는 그림을 ${GALLERY_SLOTS[room]}점까지 걸 수 있어요. (지금 ${shown}점)` };
  }
  return { ok: true, items };
}
