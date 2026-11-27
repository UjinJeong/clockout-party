import FILE from './gallery.json';

/**
 * The gallery's halls and paintings, with every word shown with them, in one file
 * (shared/src/gallery.json). The manager page edits it; the server, the 3D gallery,
 * the living-painting viewer and the docent all read it. Hall order = building order,
 * item order = hanging order.
 */
export const MAX_HALLS = 12;
/** Most paintings one hall shows. */
export const HALL_MAX = 8;
/** Wall colours a hall can have (the first four are the original halls'). */
export const HALL_COLORS = {
  moss: '#4a5a43', crimson: '#6b2727', navy: '#28324f', teal: '#22434a',
  plum: '#4b2c4a', ochre: '#6a5226', slate: '#3b4650', umber: '#4e3426',
} as const;
export type HallColor = keyof typeof HALL_COLORS;
/** How the paintings on a hall's walls quietly move. */
export const HALL_MOTIONS = {
  wind: { label: '바람 (위쪽이 살랑)', sway: 0.007, breath: 0, ripple: 0, sheen: 0.02 },
  breath: { label: '숨 (천천히 부풀었다 가라앉음)', sway: 0, breath: 0.016, ripple: 0, sheen: 0.02 },
  glint: { label: '반짝임 (유리에 빛이 스침)', sway: 0, breath: 0.006, ripple: 0, sheen: 0.09 },
  water: { label: '물결 (아래쪽이 일렁임)', sway: 0.002, breath: 0, ripple: 0.0045, sheen: 0.03 },
  still: { label: '고요 (거의 움직이지 않음)', sway: 0, breath: 0, ripple: 0, sheen: 0.02 },
} as const;
export type HallMotion = keyof typeof HALL_MOTIONS;
export const HALL_LIMITS = { name: 12, note: 80 } as const;

export interface Hall { id: string; name: string; color: HallColor; motion: HallMotion; note: string }
export const DEFAULT_HALLS: Hall[] = [
  { id: 'garden', name: '정원관', color: 'moss', motion: 'wind', note: '바람과 숨결이 지나가는 방. 꽃과 나비, 씨앗이 액자 밖으로 날아갑니다.' },
  { id: 'face', name: '얼굴관', color: 'crimson', motion: 'breath', note: '정면을 바라보는 얼굴들. 시선과 숨, 빛이 관람객에게 반응합니다.' },
  { id: 'toy', name: '장난감관', color: 'navy', motion: 'glint', note: '유리구와 가챠, 곰 인형 더미. 흔들고 누르면 쏟아집니다.' },
  { id: 'pond', name: '연못관', color: 'teal', motion: 'water', note: '먹과 금박, 얼음 속 물고기들. 물결이 일고 빛이 스칩니다.' },
];
const HALL_ID = /^[a-z][a-z0-9]{1,15}$/;
/** A fresh id for a new hall (paintings point at it, so renaming never breaks them). */
export const newHallId = (rand: () => number = Math.random) =>
  'h' + Array.from({ length: 6 }, () => 'abcdefghijklmnopqrstuvwxyz0123456789'[Math.floor(rand() * 36)]).join('');

/** The docent's four questions, in order. */
export const DOCENT_QUESTIONS = ['먼저 어디를 보면 좋을까요?', '색은 어떻게 쓰였나요?', '아이에게 설명해 주세요', '이 그림이 움직인다면?'] as const;

export interface GalleryItem {
  /** Stable id (also names the built-in image files). */
  i: number;
  /** The hall it hangs in (a Hall id). */
  room: string;
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
  /**
   * Motion made for a replaced picture by the manager page's auto analysis: a motion map
   * (R flow, G sway, B shimmer), a depth map, and how strong each effect is. `fx: {}` = keep it still.
   */
  mask?: string; depth?: string; fx?: AutoFx;
  /** Taken down for now (kept, not shown). */
  hidden?: boolean;
}

export interface Gallery { halls: Hall[]; items: GalleryItem[] }
/** How many paintings a hall shows (taken-down ones don't count). */
export const shownIn = (g: Gallery, hallId: string) => g.items.filter(x => x.room === hallId && !x.hidden).length;

/** The effects auto motion may set, and how far each may go (the living painting viewer's own knobs). */
export const FX_RANGE = {
  flow: [0, 0.012], flowScale: [1, 8], flowSpeed: [0.1, 2],
  sway: [0, 0.01], swayFreq: [1, 14], swaySpeed: [0.3, 3], swayTop: [0, 1],
  shimmer: [0, 0.6], breath: [0, 0.012], ripple: [0, 0.012], ripMask: [0, 1], para: [0, 0.04],
} as const;
export type FxKey = keyof typeof FX_RANGE;
export const FX_KEYS = Object.keys(FX_RANGE) as FxKey[];
export type AutoFx = Partial<Record<FxKey, number>>;
const checkFx = (v: unknown): AutoFx | null => {
  if (!v || typeof v !== 'object' || Array.isArray(v)) return null;
  const out: AutoFx = {};
  for (const k of FX_KEYS) {
    const n = (v as Record<string, unknown>)[k];
    if (typeof n !== 'number' || !Number.isFinite(n)) continue;
    const [lo, hi] = FX_RANGE[k];
    out[k] = Math.min(hi, Math.max(lo, n));
  }
  return out;
};

export const LIMITS = { title: 40, desc: 300, doc: 800, how: 200, hint: 30, answer: 800 } as const;
const PATH = /^gallery\/[A-Za-z0-9_-]{1,64}\.(jpg|jpeg|png|webp)$/;
export const isGalleryPath = (v: unknown): v is string => typeof v === 'string' && PATH.test(v);

const text = (v: unknown, max: number) => typeof v === 'string' ? v.replace(/\r\n?/g, '\n').replace(/[\u0000-\u0009\u000b-\u001f\u007f]/g, '').trim().slice(0, max) : '';
const size = (v: unknown) => typeof v === 'number' && Number.isFinite(v) && v >= 100 && v <= 8000 ? Math.round(v) : null;

function checkHalls(raw: unknown): { ok: true; halls: Hall[] } | { ok: false; error: string } {
  if (!Array.isArray(raw) || raw.length === 0) return { ok: false, error: '관이 하나는 있어야 해요.' };
  if (raw.length > MAX_HALLS) return { ok: false, error: `관은 ${MAX_HALLS}개까지 만들 수 있어요.` };
  const halls: Hall[] = [];
  for (const [n, r] of raw.entries()) {
    const o = (r ?? {}) as Record<string, unknown>;
    const name = text(o.name, 100).replace(/\s+/g, ' ');
    const where = name ? `「${name}」` : `${n + 1}번째 관`;
    if (typeof o.id !== 'string' || !HALL_ID.test(o.id) || halls.some(h => h.id === o.id)) return { ok: false, error: `${where}: 관 번호가 잘못됐어요.` };
    if (!name) return { ok: false, error: `${n + 1}번째 관: 이름이 비어 있어요.` };
    if (name.length > HALL_LIMITS.name) return { ok: false, error: `${where}: 관 이름은 ${HALL_LIMITS.name}자까지예요.` };
    if (halls.some(h => h.name === name)) return { ok: false, error: `${where}: 같은 이름의 관이 이미 있어요.` };
    if (typeof o.color !== 'string' || !(o.color in HALL_COLORS)) return { ok: false, error: `${where}: 벽 색을 골라 주세요.` };
    if (typeof o.motion !== 'string' || !(o.motion in HALL_MOTIONS)) return { ok: false, error: `${where}: 그림 움직임을 골라 주세요.` };
    halls.push({ id: o.id, name, color: o.color as HallColor, motion: o.motion as HallMotion, note: text(o.note, HALL_LIMITS.note).replace(/\s+/g, ' ') });
  }
  return { ok: true, halls };
}

/**
 * Check a whole gallery ({ halls, items }; a bare list of items is the older shape and gets
 * the four original halls). Returns the cleaned gallery, or the first problem in plain words
 * (shown on the manager page as is).
 */
export function checkGallery(input: unknown): { ok: true; gallery: Gallery } | { ok: false; error: string } {
  const old = Array.isArray(input);
  const o = (old ? { halls: DEFAULT_HALLS, items: input } : input ?? {}) as Record<string, unknown>;
  const hc = checkHalls(o.halls);
  if (!hc.ok) return hc;
  const halls = hc.halls;
  const raw = o.items;
  if (!Array.isArray(raw) || raw.length === 0 || raw.length > 200) return { ok: false, error: '그림 목록이 비어 있거나 너무 길어요.' };
  const items: GalleryItem[] = [];
  const seen = new Set<number>();
  for (const [n, r] of raw.entries()) {
    const o = (r ?? {}) as Record<string, unknown>;
    const where = `${n + 1}번째 그림`;
    if (!Number.isInteger(o.i) || (o.i as number) < 0 || (o.i as number) > 9999 || seen.has(o.i as number)) return { ok: false, error: `${where}: 번호가 잘못됐어요.` };
    seen.add(o.i as number);
    if (typeof o.room !== 'string' || !halls.some(h => h.id === o.room)) return { ok: false, error: `${where}: 전시실을 골라 주세요.` };
    const title = text(o.title, LIMITS.title);
    if (!title) return { ok: false, error: `${where}: 제목이 비어 있어요.` };
    const w = size(o.w), h = size(o.h);
    if (!w || !h) return { ok: false, error: `「${title}」: 그림 크기를 알 수 없어요.` };
    const it: GalleryItem = {
      i: o.i as number, room: o.room as string, title, w, h,
      desc: text(o.desc, LIMITS.desc), doc: text(o.doc, LIMITS.doc), how: text(o.how, LIMITS.how), hint: text(o.hint, LIMITS.hint),
      answers: DOCENT_QUESTIONS.map((_, k) => text(Array.isArray(o.answers) ? o.answers[k] : '', LIMITS.answer)),
    };
    for (const k of ['image', 'wall', 'thumb'] as const) {
      if (o[k] === undefined || o[k] === null || o[k] === '') continue;
      if (!isGalleryPath(o[k])) return { ok: false, error: `「${title}」: 그림 파일 경로가 잘못됐어요.` };
      it[k] = o[k] as string;
    }
    if (it.image && (!it.wall || !it.thumb)) return { ok: false, error: `「${title}」: 새 그림의 작은 사본이 빠졌어요. 다시 올려 주세요.` };
    // auto motion only ever belongs to a replaced picture: an original keeps its hand-made one
    if (it.image) {
      for (const k of ['mask', 'depth'] as const) {
        if (o[k] === undefined || o[k] === null || o[k] === '') continue;
        if (!isGalleryPath(o[k])) return { ok: false, error: `「${title}」: 움직임 파일 경로가 잘못됐어요.` };
        it[k] = o[k] as string;
      }
      const fx = checkFx(o.fx);
      if (fx) it.fx = fx;
    }
    if (o.hidden === true) it.hidden = true;
    items.push(it);
  }
  const gallery = { halls, items };
  for (const h of halls) {
    const shown = shownIn(gallery, h.id);
    if (shown > HALL_MAX) return { ok: false, error: `${h.name}에는 그림을 ${HALL_MAX}점까지 걸 수 있어요. (지금 ${shown}점) 같은 분위기의 관을 하나 더 만들어 나눠 걸어 주세요.` };
  }
  return { ok: true, gallery };
}

/** The gallery as built into this copy of the site. A broken file never stops the server: it falls back to the original halls. */
export const GALLERY: Gallery = (() => {
  const r = checkGallery(FILE);
  if (r.ok) return r.gallery;
  console.error(`[gallery] gallery.json is not valid (${r.error}); using the original halls.`);
  return { halls: DEFAULT_HALLS, items: [] };
})();
