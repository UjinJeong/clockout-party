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

import { checkGallery, DEFAULT_HALLS, GALLERY, HALL_MAX, MAX_HALLS, newHallId, shownIn, type Gallery } from '../src/gallery';
import FILE from '../src/gallery.json';
const items = FILE.items;
const withItems = (xs: unknown[], halls: unknown = FILE.halls) => checkGallery({ halls, items: xs });
describe('the gallery list (manager page)', () => {
  it('the gallery file passes its own check', () => {
    const r = checkGallery(FILE);
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.gallery).toEqual(JSON.parse(JSON.stringify(FILE)));
    expect(GALLERY).toEqual(JSON.parse(JSON.stringify(FILE)));
  });
  it('reads the old array shape with the four default halls', () => {
    const r = checkGallery(items);
    expect(r.ok && r.gallery.halls).toEqual(DEFAULT_HALLS);
    expect(r.ok && r.gallery.items.length).toBe(items.length);
  });
  it('tidies text and refuses what would break the walls', () => {
    const one = { ...items[0], title: '  새 제목\t ', desc: 'a\r\nb' };
    const r = withItems([one, ...items.slice(1)]);
    expect(r.ok && r.gallery.items[0].title).toBe('새 제목');
    expect(r.ok && r.gallery.items[0].desc).toBe('a\nb');
    expect(withItems([{ ...items[0], title: '' }, ...items.slice(1)])).toMatchObject({ ok: false });
    expect(withItems([{ ...items[0], image: '../etc/passwd', wall: 'x', thumb: 'y' }])).toMatchObject({ ok: false });
    expect(withItems([items[0], items[0]])).toMatchObject({ ok: false, error: expect.stringContaining('번호') });
  });
  it('refuses items in a missing hall', () => {
    expect(withItems([{ ...items[0], room: 'nope' }, ...items.slice(1)])).toMatchObject({ ok: false, error: expect.stringContaining('전시실') });
  });
  it(`refuses a ninth painting in one hall, hidden ones don't count`, () => {
    const pond = items.filter(g => g.room === 'pond');
    const extra = (n: number) => Array.from({ length: n }, (_, k) => ({ ...pond[0], i: 900 + k }));
    const need = HALL_MAX - pond.length;
    expect(withItems([...items, ...extra(need)]).ok).toBe(true);
    expect(withItems([...items, ...extra(need + 1)])).toMatchObject({ ok: false, error: expect.stringContaining(`${HALL_MAX}점`) });
    expect(withItems([...items, ...extra(need), { ...pond[0], i: 950, hidden: true }]).ok).toBe(true);
  });
  it('hall rules', () => {
    const h = FILE.halls;
    expect(withItems(items, [...h, { ...h[0] }])).toMatchObject({ ok: false });                       // same id twice
    expect(withItems(items, [{ ...h[0], name: ' ' }, ...h.slice(1)])).toMatchObject({ ok: false });
    expect(withItems(items, [{ ...h[0], name: '가'.repeat(13) }, ...h.slice(1)])).toMatchObject({ ok: false });
    expect(withItems(items, [{ ...h[0], color: 'pink' }, ...h.slice(1)])).toMatchObject({ ok: false });
    expect(withItems(items, [{ ...h[0], motion: 'spin' }, ...h.slice(1)])).toMatchObject({ ok: false });
    expect(withItems(items, [{ ...h[0], id: '../x' }, ...h.slice(1)])).toMatchObject({ ok: false });
    const many = Array.from({ length: MAX_HALLS + 1 - h.length }, (_, k) => ({ ...h[0], id: `h00000${k}`.slice(-7), name: `새 ${k}` }));
    expect(withItems(items, [...h, ...many])).toMatchObject({ ok: false, error: expect.stringContaining(`${MAX_HALLS}`) });
    expect(withItems(items, [...h, ...many.slice(1)]).ok).toBe(true);                                // 12 is fine, empty halls too
    const r = withItems(items, [{ ...h[0], note: 'x'.repeat(200) }, ...h.slice(1)]);
    expect(r.ok && r.gallery.halls[0].note.length).toBe(80);
  });
  it('a new hall id', () => {
    const id = newHallId();
    expect(id).toMatch(/^h[a-z0-9]{6}$/);
    expect(newHallId()).not.toBe(id);
  });
  it('counts what a hall shows', () => {
    const g = GALLERY as Gallery;
    expect(shownIn(g, 'pond')).toBe(g.items.filter(x => x.room === 'pond' && !x.hidden).length);
  });
  it('a replaced picture must come with its smaller copies', () => {
    expect(withItems([{ ...items[0], image: 'gallery/17-abc.jpg' }, ...items.slice(1)])).toMatchObject({ ok: false });
    expect(withItems([{ ...items[0], image: 'gallery/17-abc.jpg', wall: 'gallery/17-abc-wall.jpg', thumb: 'gallery/17-abc-t.jpg' }, ...items.slice(1)]).ok).toBe(true);
  });
});
