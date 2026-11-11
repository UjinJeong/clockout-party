/** Rules shared by the server and every client (web today, Unity later). */

export const ROOM_NAME = 'party';
export const MAX_PLAYERS = 20;

/** Players within this distance (metres) hear each other. */
export const NEAR_RADIUS = 4.5;

export const NAME_MAX = 12;
export const CHAT_MAX = 120;
export const TITLE_MAX = 24;

export const VOICE_MAX_MS = 30_000;
export const VOICE_MAX_BYTES = 400_000;

/** Client walking speed and the server's hard limit (with headroom for jitter). */
export const WALK_SPEED = 2.6;
export const MAX_SPEED = 3.2;
export const AVATAR_RADIUS = 0.35;

/** Client sends its position this many times per second. */
export const MOVE_HZ = 10;

/** Reactions. The last two are for when you have no energy to talk: nod along, or zone out together. */
export const EMOTES = ['cheers', 'laugh', 'clap', 'heart', 'wow', 'wave', 'nod', 'zone'] as const;
export type Emote = (typeof EMOTES)[number];
export const EMOTE_ICON: Record<Emote, string> = {
  cheers: '🥂', laugh: '😂', clap: '👏', heart: '❤️', wow: '😮', wave: '👋', nod: '😌', zone: '🫥',
};

export const KINDS = ['bear', 'cat', 'penguin', 'rabbit', 'fox', 'dog', 'frog'] as const;
export type Kind = (typeof KINDS)[number];
export const KIND_LABEL: Record<Kind, string> = {
  bear: '녹초 된 곰', cat: '졸린 고양이', penguin: '퇴근한 펭귄', rabbit: '야근한 토끼',
  fox: '칼퇴한 여우', dog: '산책 못 간 강아지', frog: '월요병 개구리',
};

/** Eight suggested swatches. Any other colour can be picked from the palette (see customColor). */
export const PALETTE = ['#c98b5a', '#f2e6d0', '#5b5f6b', '#e9a8b8', '#8fb8a0', '#9fb4e0', '#f0c75e', '#3a3236'] as const;

/**
 * A look's colour is one number, so it syncs as a single field (web and Unity alike):
 *   0–7                    → one of the PALETTE swatches
 *   0x1000000 + 0xRRGGBB   → a colour picked from the palette
 */
export const CUSTOM_COLOR = 0x1000000;
/** Darkest a picked colour may be (brightest channel), so the eyes and face still show. */
const MIN_BRIGHT = 0x30;

export const isCustomColor = (c: number) => Number.isInteger(c) && c >= CUSTOM_COLOR && c < CUSTOM_COLOR * 2;

/** Pack '#rrggbb' as a look colour, lifting near-black so faces stay visible. Not a colour → 0. */
export function customColor(hex: string): number {
  const m = /^#([0-9a-f]{6})$/i.exec(hex);
  if (!m) return 0;
  let rgb = [0, 2, 4].map(i => parseInt(m[1].slice(i, i + 2), 16));
  const top = Math.max(...rgb);
  if (top < MIN_BRIGHT) rgb = top === 0 ? [MIN_BRIGHT, MIN_BRIGHT, MIN_BRIGHT] : rgb.map(v => Math.round(v * MIN_BRIGHT / top));
  return CUSTOM_COLOR + ((rgb[0] << 16) | (rgb[1] << 8) | rgb[2]);
}

/** The colour to paint with, '#rrggbb'. Anything unknown → the first swatch. */
export function colorHex(c: number): string {
  if (isCustomColor(c)) return '#' + (c - CUSTOM_COLOR).toString(16).padStart(6, '0');
  return Number.isInteger(c) && c >= 0 && c < PALETTE.length ? PALETTE[c] : PALETTE[0];
}

/** What sits on the head. */
export const HATS = ['none', 'beret', 'ribbon', 'party', 'headphones', 'eyemask'] as const;
export type Hat = (typeof HATS)[number];
export const HAT_LABEL: Record<Hat, string> = {
  none: '없음', beret: '베레모', ribbon: '리본', party: '고깔모자', headphones: '헤드폰', eyemask: '수면 안대',
};

/** What the right paw holds. */
export const HANDS = ['none', 'wine', 'coffee', 'beer', 'cocktail', 'balloon'] as const;
export type Hand = (typeof HANDS)[number];
export const HAND_LABEL: Record<Hand, string> = {
  none: '빈손', wine: '와인', coffee: '아아', beer: '맥주', cocktail: '칵테일', balloon: '풍선',
};

/** What hangs around the neck. */
export const OUTFITS = ['none', 'tie', 'scarf', 'badge', 'pajama', 'slippers'] as const;
export type Outfit = (typeof OUTFITS)[number];
export const OUTFIT_LABEL: Record<Outfit, string> = {
  none: '없음', tie: '넥타이', scarf: '목도리', badge: '사원증', pajama: '잠옷', slippers: '슬리퍼',
};

/** The drinks you can swap between at a bar or in the kitchen, in order. */
export const DRINKS: readonly Hand[] = ['wine', 'coffee', 'beer', 'cocktail'];
export const nextDrink = (h: Hand): Hand => DRINKS[(DRINKS.indexOf(h) + 1) % DRINKS.length];
/** Rooms with a bar or a kitchen counter: you can swap your drink there. */
export const DRINK_ROOMS: readonly string[] = ['lobby', 'kitchen', 'cabana'];

export interface Look { kind: Kind; color: number; hat: Hat; hand: Hand; outfit: Outfit }
export const DEFAULT_LOOK: Look = { kind: 'bear', color: 0, hat: 'none', hand: 'none', outfit: 'none' };

export const BATTERIES = ['charging', 'low'] as const;
export type Battery = (typeof BATTERIES)[number];
export const BATTERY_LABEL: Record<Battery, string> = {
  charging: '충전 중 · 말 걸어도 돼요', low: '방전 · 구경만 할래요',
};

export const DEFAULT_TITLE = '퇴근 파티';

/** Little things to do at a place, seen by everyone: a dive off the board, a squirt of the water pistol, the next TV channel. */
export const ACTS = ['dive', 'squirt', 'tv'] as const;
export type Act = (typeof ACTS)[number];
export const isAct = (v: unknown): v is Act => (ACTS as readonly unknown[]).includes(v);
/** Seconds between two acts from the same guest. */
export const ACT_EVERY = 1.2;
/** A dive: how long it takes, and how far the water pistol reaches. */
export const DIVE_TIME = 1.2;
export const SQUIRT_REACH = 3.2;
