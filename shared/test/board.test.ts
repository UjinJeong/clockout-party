import { describe, expect, it } from 'vitest';
import { Board, NOTES_KEPT, NOTE_EVERY, NOTE_MAX } from '../src/board';

describe('📝 방명록', () => {
  it('keeps short, tidy lines, newest last', () => {
    const b = new Board();
    expect(b.note('a', '곰', '  오늘 회의\n4개…  살았다 ', 0)).toEqual({ name: '곰', text: '오늘 회의 4개… 살았다', ts: 0 });
    expect(b.note('b', '펭', 'x'.repeat(200), 1)!.text).toHaveLength(NOTE_MAX);
    expect(b.note('c', '토', '   ', 2)).toBeNull();
    expect(b.snapshot().notes.map(n => n.name)).toEqual(['곰', '펭']);
  });
  it('one note every so often per guest, and only the latest are kept', () => {
    const b = new Board();
    expect(b.note('a', '곰', '하나', 0)).not.toBeNull();
    expect(b.note('a', '곰', '둘', 1000)).toBeNull();
    expect(b.note('a', '곰', '셋', NOTE_EVERY * 1000)).not.toBeNull();
    for (let i = 0; i < NOTES_KEPT + 5; i++) b.note('g' + i, '손님', '글 ' + i, i);
    expect(b.snapshot().notes).toHaveLength(NOTES_KEPT);
  });
});
describe('❤️ on a painting', () => {
  it('one heart per guest, tap again to take it back', () => {
    const b = new Board();
    expect(b.like('a', '3')).toBe(1);
    expect(b.like('b', '3')).toBe(2);
    expect(b.like('a', '3')).toBe(1);
    expect(b.like('a', '../x')).toBeNull();
    expect(b.snapshot().likes).toEqual({ '3': 1 });
  });
});
