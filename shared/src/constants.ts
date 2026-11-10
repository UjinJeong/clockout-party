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

export const EMOTES = ['cheers', 'laugh', 'clap', 'heart', 'wow', 'wave'] as const;
export type Emote = (typeof EMOTES)[number];
export const EMOTE_ICON: Record<Emote, string> = {
  cheers: '🥂', laugh: '😂', clap: '👏', heart: '❤️', wow: '😮', wave: '👋',
};

export const KINDS = ['bear', 'cat', 'penguin', 'rabbit'] as const;
export type Kind = (typeof KINDS)[number];
export const KIND_LABEL: Record<Kind, string> = {
  bear: '녹초 된 곰', cat: '졸린 고양이', penguin: '퇴근한 펭귄', rabbit: '야근한 토끼',
};

/** Shared palette: every avatar is coloured from these eight swatches. */
export const PALETTE = ['#c98b5a', '#f2e6d0', '#5b5f6b', '#e9a8b8', '#8fb8a0', '#9fb4e0', '#f0c75e', '#3a3236'] as const;

export const PROPS = ['none', 'wine', 'beret', 'ribbon'] as const;
export type Prop = (typeof PROPS)[number];
export const PROP_LABEL: Record<Prop, string> = {
  none: '없음', wine: '와인잔', beret: '베레모', ribbon: '리본',
};

export interface Look { kind: Kind; color: number; prop: Prop }
export const DEFAULT_LOOK: Look = { kind: 'bear', color: 0, prop: 'none' };

export const BATTERIES = ['charging', 'low'] as const;
export type Battery = (typeof BATTERIES)[number];
export const BATTERY_LABEL: Record<Battery, string> = {
  charging: '충전 중 · 말 걸어도 돼요', low: '방전 · 구경만 할래요',
};

export const THEME = 'gallery';
export const DEFAULT_TITLE = '오프닝 파티';
