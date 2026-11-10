import {
  BATTERIES, CHAT_MAX, DEFAULT_LOOK, DEFAULT_TITLE, EMOTES, HANDS, HATS, KINDS, NAME_MAX, OUTFITS, PALETTE, TITLE_MAX,
  VOICE_MAX_BYTES, VOICE_MAX_MS, colorHex, customColor, isCustomColor, type Battery, type Emote, type Look,
} from './constants';

function clean(s: unknown, max: number): string | null {
  if (typeof s !== 'string') return null;
  // eslint-disable-next-line no-control-regex
  const t = s.replace(/[\u0000-\u001f\u007f]+/g, ' ').replace(/\s+/g, ' ').trim();
  if (!t) return null;
  return Array.from(t).slice(0, max).join('');
}

export const sanitizeName = (s: unknown) => clean(s, NAME_MAX);
export const sanitizeChat = (s: unknown) => clean(s, CHAT_MAX);
export const sanitizeTitle = (s: unknown) => clean(s, TITLE_MAX) ?? DEFAULT_TITLE;

export function parseLook(v: unknown): Look {
  const o = (v && typeof v === 'object' ? v : {}) as Record<string, unknown>;
  const kind = (KINDS as readonly unknown[]).includes(o.kind) ? (o.kind as Look['kind']) : DEFAULT_LOOK.kind;
  const c = o.color as number;
  const color = isCustomColor(c) ? customColor(colorHex(c))          // re-pack: lifts near-black
    : Number.isInteger(c) && c >= 0 && c < PALETTE.length ? c : DEFAULT_LOOK.color;
  // Older saves had one "prop" slot: the wine glass went in the paw, beret/ribbon on the head.
  const legacyHat = o.prop === 'beret' || o.prop === 'ribbon' ? o.prop : undefined;
  const legacyHand = o.prop === 'wine' ? o.prop : undefined;
  const pick = <T extends string>(list: readonly T[], v: unknown, fallback: T): T =>
    (list as readonly unknown[]).includes(v) ? (v as T) : fallback;
  return {
    kind, color,
    hat: pick(HATS, o.hat ?? legacyHat, DEFAULT_LOOK.hat),
    hand: pick(HANDS, o.hand ?? legacyHand, DEFAULT_LOOK.hand),
    outfit: pick(OUTFITS, o.outfit, DEFAULT_LOOK.outfit),
  };
}

export const isEmote = (v: unknown): v is Emote => (EMOTES as readonly unknown[]).includes(v);
export const isBattery = (v: unknown): v is Battery => (BATTERIES as readonly unknown[]).includes(v);

export interface VoiceNote { mime: string; ms: number; data: Uint8Array }

export function validateVoice(v: unknown): VoiceNote | null {
  if (!v || typeof v !== 'object') return null;
  const o = v as Record<string, unknown>;
  if (typeof o.mime !== 'string' || !o.mime.startsWith('audio/') || o.mime.length > 64) return null;
  if (typeof o.ms !== 'number' || !(o.ms > 0) || o.ms > VOICE_MAX_MS + 500) return null;
  const data = o.data;
  if (!(data instanceof Uint8Array) || data.byteLength === 0 || data.byteLength > VOICE_MAX_BYTES) return null;
  return { mime: o.mime, ms: Math.round(o.ms), data };
}

export const finite = (v: unknown): v is number => typeof v === 'number' && Number.isFinite(v);
