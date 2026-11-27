import { describe, expect, it } from 'vitest';
import { isOwnerKey } from '@party/shared';
import { visitorKey } from '../src/net/visitor';

const memory = () => { const m = new Map<string, string>(); return { getItem: (k: string) => m.get(k) ?? null, setItem: (k: string, v: string) => { m.set(k, v); } }; };

describe('one heart per visitor: a key kept on this device', () => {
  it('is made once and then kept', () => {
    const s = memory();
    const k = visitorKey(s);
    expect(isOwnerKey(k)).toBe(true);
    expect(visitorKey(s)).toBe(k);
  });
  it('a broken saved key is replaced; no storage still gives a key for this visit', () => {
    const s = memory(); s.setItem('party.visitor', '<script>');
    expect(isOwnerKey(visitorKey(s))).toBe(true);
    expect(isOwnerKey(visitorKey(null))).toBe(true);
    const throws = { getItem: () => { throw new Error('blocked'); }, setItem: () => { throw new Error('blocked'); } };
    expect(isOwnerKey(visitorKey(throws))).toBe(true);
  });
});
