import { describe, it, expect } from 'vitest';
import { sanitizeName, sanitizeChat, parseLook, isEmote, validateVoice, sanitizeTitle } from '../src';

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
    expect(sanitizeTitle(undefined)).toBe('오프닝 파티');
    expect(sanitizeTitle('  금요일 밤  ')).toBe('금요일 밤');
  });
  it('look falls back to defaults', () => {
    expect(parseLook({ kind: 'dragon', color: 99, prop: 'x' })).toEqual({ kind: 'bear', color: 0, prop: 'none' });
    expect(parseLook({ kind: 'cat', color: 3, prop: 'wine' })).toEqual({ kind: 'cat', color: 3, prop: 'wine' });
    expect(parseLook(null)).toEqual({ kind: 'bear', color: 0, prop: 'none' });
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
