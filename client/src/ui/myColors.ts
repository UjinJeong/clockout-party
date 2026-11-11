import { load, save } from './dom';

/**
 * "내 색": colours you saved from the palette, kept on this device so you can
 * come back to the exact same one. Newest first, no repeats, at most MAX.
 */
const KEY = 'party.colors';
export const MY_COLORS_MAX = 8;
const ok = (v: unknown): v is string => typeof v === 'string' && /^#[0-9a-f]{6}$/.test(v);

export const addColor = (list: readonly string[], hex: string): string[] => {
  const h = hex.toLowerCase();
  return ok(h) ? [h, ...list.filter(c => c !== h)].slice(0, MY_COLORS_MAX) : [...list];
};
export const removeColor = (list: readonly string[], hex: string): string[] => list.filter(c => c !== hex.toLowerCase());

export function myColors(): string[] {
  const v = load<unknown>(KEY);
  return Array.isArray(v) ? v.filter(ok).slice(0, MY_COLORS_MAX) : [];
}
export const saveMyColors = (list: readonly string[]) => save(KEY, list);
