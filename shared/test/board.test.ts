import { describe, expect, it } from 'vitest';
import { Board, NOTES_KEPT, NOTE_EVERY, NOTE_MAX } from '../src/board';

describe('📝 a board that outlives the server', () => {
  it('says whether a heart went on or came off, so it can be saved', () => {
    const b = new Board();
    expect(b.toggleLike('v1', '7')).toEqual({ n: 1, on: true });
    expect(b.toggleLike('v2', '7')).toEqual({ n: 2, on: true });
    expect(b.toggleLike('v1', '7')).toEqual({ n: 1, on: false });
    expect(b.toggleLike('v1', '../x')).toBeNull();
  });
  it('comes back from what was saved, hearts and all', () => {
    const b = new Board();
    b.restore({ notes: [{ name: '앞사람', text: '수고했어요', ts: 1 }], voters: { '7': ['v1', 'v2'], bad: 'x' as never } });
    expect(b.snapshot()).toMatchObject({ notes: [{ name: '앞사람', text: '수고했어요', ts: 1 }], likes: { '7': 2 } });
    expect(b.toggleLike('v1', '7')).toEqual({ n: 1, on: false });           // the same visitor takes it back
  });
  it('keeps only the newest notes and only tidy ones when restoring', () => {
    const b = new Board();
    const many = Array.from({ length: NOTES_KEPT + 5 }, (_, k) => ({ name: 'n', text: 't' + k, ts: k }));
    b.restore({ notes: [...many, { name: 1, text: null } as never], voters: {} });
    const notes = b.snapshot().notes;
    expect(notes).toHaveLength(NOTES_KEPT);
    expect(notes.at(-1)!.text).toBe('t' + (NOTES_KEPT + 4));
  });
});

describe('📝 taking a note down (manager page)', () => {
  it('every note has an id that stays the same after saving and restoring', () => {
    const b = new Board();
    const n = b.note('a', '손님', '장난 글', 1000)!;
    expect(n.id).toMatch(/^[a-z0-9]{6,16}$/);
    const again = new Board();
    again.restore({ notes: [{ name: '손님', text: '장난 글', ts: 1000 }], voters: {} });   // saved before notes had ids
    expect(again.snapshot().notes[0].id).toBe(n.id);
  });
  it('removes just that note', () => {
    const b = new Board();
    const keep = b.note('a', '갑', '좋은 글', 1000)!;
    const bad = b.note('b', '을', '나쁜 글', 2000)!;
    expect(b.removeNote(bad.id!)).toBe(true);
    expect(b.removeNote(bad.id!)).toBe(false);
    expect(b.removeNote('nope')).toBe(false);
    expect(b.snapshot().notes.map(n => n.id)).toEqual([keep.id]);
  });
});

describe('📝 방명록', () => {
  it('keeps short, tidy lines, newest last', () => {
    const b = new Board();
    expect(b.note('a', '곰', '  오늘 회의\n4개…  살았다 ', 0)).toMatchObject({ name: '곰', text: '오늘 회의 4개… 살았다', ts: 0 });
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

import { FX_KEYS } from '../src/gallery';
describe('auto motion on a replaced picture', () => {
  const pic = { image: 'gallery/17-new.jpg', wall: 'gallery/17-new-wall.jpg', thumb: 'gallery/17-new-t.jpg' };
  it('keeps the motion maps and the effect strengths', () => {
    const one = { ...items[0], ...pic, mask: 'gallery/17-new-m.png', depth: 'gallery/17-new-d.png', fx: { flow: 0.004, sway: 0.003, shimmer: 0.2, ripMask: 1 } };
    const r = withItems([one, ...items.slice(1)]);
    expect(r.ok && r.gallery.items[0]).toMatchObject({ mask: 'gallery/17-new-m.png', depth: 'gallery/17-new-d.png', fx: { flow: 0.004, sway: 0.003, shimmer: 0.2, ripMask: 1 } });
  });
  it('an empty fx means "no motion" and is kept as such', () => {
    const r = withItems([{ ...items[0], ...pic, fx: {} }, ...items.slice(1)]);
    expect(r.ok && r.gallery.items[0].fx).toEqual({});
  });
  it('drops unknown effects, clamps strengths, refuses bad map paths', () => {
    const r = withItems([{ ...items[0], ...pic, fx: { flow: 9, sway: -1, shimmer: 'x', evil: 1, uWater: 1 } }, ...items.slice(1)]);
    const fx = r.ok ? r.gallery.items[0].fx! : {};
    expect(Object.keys(fx).every(k => (FX_KEYS as readonly string[]).includes(k))).toBe(true);
    expect(fx.flow).toBeLessThanOrEqual(0.012);
    expect(fx.sway).toBe(0);
    expect('shimmer' in fx).toBe(false);
    expect(withItems([{ ...items[0], ...pic, mask: '../x.png', fx: {} }, ...items.slice(1)])).toMatchObject({ ok: false });
  });
  it('motion belongs to a replaced picture only (an original keeps its hand-made motion)', () => {
    const r = withItems([{ ...items[0], fx: { flow: 0.004 }, mask: 'gallery/17-new-m.png' }, ...items.slice(1)]);
    expect(r.ok && r.gallery.items[0].fx).toBeUndefined();
    expect(r.ok && r.gallery.items[0].mask).toBeUndefined();
  });
});

import { DRIFTS } from '../src/gallery';
describe('motion words and things that drift (replaced pictures)', () => {
  const pic = { image: 'gallery/17-new.jpg', wall: 'gallery/17-new-wall.jpg', thumb: 'gallery/17-new-t.jpg' };
  it('keeps the words and what drifts over the picture', () => {
    const r = withItems([{ ...items[0], ...pic, fx: {}, prompt: '  회색 하늘, 꽃잎 날림 ', drift: 'petals' }, ...items.slice(1)]);
    expect(r.ok && r.gallery.items[0]).toMatchObject({ prompt: '회색 하늘, 꽃잎 날림', drift: 'petals' });
    expect(DRIFTS).toEqual(['petals', 'snow', 'fireflies', 'rain']);
  });
  it('drops an unknown drift, trims long words; an original never gets them', () => {
    const r = withItems([{ ...items[0], ...pic, drift: 'bats', prompt: 'x'.repeat(200) }, ...items.slice(1)]);
    expect(r.ok && r.gallery.items[0].drift).toBeUndefined();
    expect(r.ok && r.gallery.items[0].prompt!.length).toBe(60);
    const o = withItems([{ ...items[0], drift: 'snow', prompt: '눈' }, ...items.slice(1)]);
    expect(o.ok && o.gallery.items[0].drift).toBeUndefined();
    expect(o.ok && o.gallery.items[0].prompt).toBeUndefined();
  });
});
