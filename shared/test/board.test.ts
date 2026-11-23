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

import { checkGallery, GALLERY_SLOTS } from '../src/gallery';
import GALLERY from '../../client/src/world/gallery.json';
describe('the gallery list (manager page)', () => {
  it('the current gallery is valid as it is', () => {
    const r = checkGallery(GALLERY);
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.items).toEqual(GALLERY.map(g => ({ ...g })));
  });
  it('tidies text and refuses what would break the walls', () => {
    const one = { ...GALLERY[0], title: '  새 제목\t ', desc: 'a\r\nb' };
    const r = checkGallery([one, ...GALLERY.slice(1)]);
    expect(r.ok && r.items[0].title).toBe('새 제목');
    expect(r.ok && r.items[0].desc).toBe('a\nb');
    expect(checkGallery([{ ...GALLERY[0], title: '' }, ...GALLERY.slice(1)])).toMatchObject({ ok: false });
    expect(checkGallery([{ ...GALLERY[0], image: '../etc/passwd', wall: 'x', thumb: 'y' }])).toMatchObject({ ok: false });
    expect(checkGallery([GALLERY[0], GALLERY[0]])).toMatchObject({ ok: false, error: expect.stringContaining('번호') });
    const toy = GALLERY.filter(g => g.room === 'toy');
    const extra = { ...toy[0], i: 900 };
    expect(checkGallery([...GALLERY, extra])).toMatchObject({ ok: false, error: expect.stringContaining(`${GALLERY_SLOTS.toy}점`) });
    expect(checkGallery([...GALLERY, { ...extra, hidden: true }]).ok).toBe(true);
  });
  it('a replaced picture must come with its smaller copies', () => {
    const r = checkGallery([{ ...GALLERY[0], image: 'gallery/17-abc.jpg' }, ...GALLERY.slice(1)]);
    expect(r).toMatchObject({ ok: false });
    const ok = checkGallery([{ ...GALLERY[0], image: 'gallery/17-abc.jpg', wall: 'gallery/17-abc-wall.jpg', thumb: 'gallery/17-abc-t.jpg' }, ...GALLERY.slice(1)]);
    expect(ok.ok).toBe(true);
  });
});
