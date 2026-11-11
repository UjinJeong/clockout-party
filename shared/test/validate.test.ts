import { describe, it, expect } from 'vitest';
import {
  sanitizeName, sanitizeChat, parseLook, isEmote, validateVoice, sanitizeTitle,
  KINDS, KIND_LABEL, HATS, HAT_LABEL, HANDS, HAND_LABEL, OUTFITS, OUTFIT_LABEL,
} from '../src';

describe('validate', () => {
  it('name trims and limits', () => {
    expect(sanitizeName('  유진  ')).toBe('유진');
    expect(sanitizeName('')).toBeNull();
    expect(sanitizeName(42)).toBeNull();
    expect(sanitizeName('a'.repeat(30))!.length).toBe(12);
  });
  it('name collapses control characters and whitespace', () => {
    expect(sanitizeName('유\n진\t\u0000님')).toBe('유 진 님');
  });
  it('chat limits to 120 and rejects empty', () => {
    expect(sanitizeChat('   ')).toBeNull();
    expect(sanitizeChat('x'.repeat(300))!.length).toBe(120);
  });
  it('title falls back to a default', () => {
    expect(sanitizeTitle(undefined)).toBe('퇴근 파티');
    expect(sanitizeTitle('  금요일 밤  ')).toBe('금요일 밤');
  });
  it('look falls back to defaults', () => {
    const plain = { kind: 'bear', color: 0, hat: 'none', hand: 'none', outfit: 'none' };
    expect(parseLook({ kind: 'dragon', color: 99, hat: 'crown', hand: 'sword', outfit: 'cape' })).toEqual(plain);
    expect(parseLook(null)).toEqual(plain);
  });
  it('look keeps every valid choice', () => {
    const fox = { kind: 'fox', color: 3, hat: 'headphones', hand: 'coffee', outfit: 'tie' };
    expect(parseLook(fox)).toEqual(fox);
    expect(parseLook({ kind: 'frog', color: 7, hat: 'eyemask', hand: 'balloon', outfit: 'badge' }).kind).toBe('frog');
  });
  it('look reads the old single "prop" slot', () => {
    // characters saved before hats, hands and outfits were split up
    expect(parseLook({ kind: 'cat', color: 3, prop: 'wine' })).toMatchObject({ hand: 'wine', hat: 'none' });
    expect(parseLook({ kind: 'cat', color: 3, prop: 'beret' })).toMatchObject({ hat: 'beret', hand: 'none' });
    expect(parseLook({ kind: 'cat', color: 3, prop: 'ribbon' })).toMatchObject({ hat: 'ribbon' });
  });
  it('every look option has a label', () => {
    for (const k of KINDS) expect(KIND_LABEL[k]).toBeTruthy();
    for (const h of HATS) expect(HAT_LABEL[h]).toBeTruthy();
    for (const h of HANDS) expect(HAND_LABEL[h]).toBeTruthy();
    for (const o of OUTFITS) expect(OUTFIT_LABEL[o]).toBeTruthy();
    expect(KINDS.length).toBe(7);
  });
  it('emote whitelist', () => {
    expect(isEmote('cheers')).toBe(true);
    expect(isEmote('bomb')).toBe(false);
  });
  it('voice limits', () => {
    expect(validateVoice({ mime: 'audio/webm', ms: 2000, data: new Uint8Array(10) })).not.toBeNull();
    expect(validateVoice({ mime: 'audio/webm', ms: 40000, data: new Uint8Array(10) })).toBeNull();
    expect(validateVoice({ mime: 'text/html', ms: 2000, data: new Uint8Array(10) })).toBeNull();
    expect(validateVoice({ mime: 'audio/webm', ms: 2000, data: new Uint8Array(500_000) })).toBeNull();
    expect(validateVoice({ mime: 'audio/webm', ms: 2000, data: 'nope' })).toBeNull();
  });
});
