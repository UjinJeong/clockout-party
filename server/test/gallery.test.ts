import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { createGalleryStore, GALLERY_JSON } from '../src/galleryStore';

const today = JSON.parse(readFileSync(new URL('../../shared/src/gallery.json', import.meta.url), 'utf8'));
const items0 = today.items;
const JPEG = Buffer.from([0xff, 0xd8, 0xff, 0xe0, 1, 2, 3]).toString('base64');

/** A pretend GitHub that keeps one branch in memory. */
function fakeGitHub(start = today) {
  const files = new Map<string, Buffer>([[GALLERY_JSON, Buffer.from(JSON.stringify(start))]]);
  const blobs = new Map<string, Buffer>();
  let head = 'c0', n = 0;
  const calls: string[] = [];
  const messages: string[] = [];
  const blobSha = (b: Buffer) => 'b' + b.length + '-' + b.toString('base64').slice(-6);
  const fakeFetch: typeof globalThis.fetch = (async (url: string, init: RequestInit = {}) => {
    const path = url.replace('https://api.github.com/repos/me/party', '').replace(/\?.*$/, '');
    const body = init.body ? JSON.parse(String(init.body)) : null;
    calls.push(`${init.method ?? 'GET'} ${path}`);
    const ok = (v: unknown) => new Response(JSON.stringify(v), { status: 200 });
    if (!String((init.headers as Record<string, string>).Authorization).includes('good-token')) return new Response('{}', { status: 401 });
    if (path === `/contents/${GALLERY_JSON}`) { const b = files.get(GALLERY_JSON)!; return ok({ content: b.toString('base64'), sha: blobSha(b) }); }
    if (path === '/git/ref/heads/main') return ok({ object: { sha: head } });
    if (path.startsWith('/git/commits/')) return ok({ tree: { sha: 't-' + head } });
    if (path === '/git/blobs') { const b = Buffer.from(body.content, body.encoding === 'base64' ? 'base64' : 'utf8'); const s = 'blob' + ++n; blobs.set(s, b); return ok({ sha: s }); }
    if (path === '/git/trees') { for (const e of body.tree) files.set(e.path, blobs.get(e.sha)!); return ok({ sha: 'tree' + ++n }); }
    if (path === '/git/commits') { messages.push(body.message); return ok({ sha: 'commit' + ++n, html_url: 'https://github.com/me/party/commit/x', message: body.message }); }
    if (path === '/git/refs/heads/main') { head = body.sha; return ok({}); }
    return new Response('{}', { status: 404 });
  }) as typeof globalThis.fetch;
  return { fetch: fakeFetch, files, calls, messages, head: () => head };
}

describe('saving the gallery to GitHub', () => {
  it('reads the latest list, and saves words and a new picture in one commit', async () => {
    const gh = fakeGitHub();
    const store = createGalleryStore({ token: 'good-token', repo: 'me/party', fetch: gh.fetch });
    const now = await store.load();
    expect(now.source).toBe('github');
    expect(now.gallery.items).toHaveLength(items0.length);
    expect(now.gallery.halls.map(h => h.id)).toEqual(['garden', 'face', 'toy', 'pond']);
    const items = structuredClone(now.gallery.items);
    items[0].title = '바뀐 제목';
    Object.assign(items[0], { image: 'gallery/17-new.jpg', wall: 'gallery/17-new-wall.jpg', thumb: 'gallery/17-new-t.jpg' });
    const pics = ['gallery/17-new.jpg', 'gallery/17-new-wall.jpg', 'gallery/17-new-t.jpg'].map(path => ({ path, data: JPEG }));
    const r = await store.save({ halls: now.gallery.halls, items }, pics, now.version, '민들레와 발 그림 교체');
    expect(r.ok).toBe(true);
    expect(gh.head()).not.toBe('c0');
    expect(GALLERY_JSON).toBe('shared/src/gallery.json');
    expect(JSON.parse(gh.files.get(GALLERY_JSON)!.toString()).items[0].title).toBe('바뀐 제목');
    expect(gh.files.has('client/public/gallery/17-new.jpg')).toBe(true);
    expect(gh.calls.filter(c => c === 'POST /git/commits')).toHaveLength(1);
  });
  it('refuses to overwrite a newer version', async () => {
    const gh = fakeGitHub();
    const store = createGalleryStore({ token: 'good-token', repo: 'me/party', fetch: gh.fetch });
    const r = await store.save(today, [], 'old-version');
    expect(r).toMatchObject({ ok: false, status: 409 });
    expect(gh.calls).not.toContain('POST /git/commits');
  });
  it('checks before touching GitHub: bad words, stray files, not-a-picture', async () => {
    const gh = fakeGitHub();
    const store = createGalleryStore({ token: 'good-token', repo: 'me/party', fetch: gh.fetch });
    expect(await store.save({ ...today, items: [{ ...items0[0], title: '' }, ...items0.slice(1)] }, [], '')).toMatchObject({ ok: false, status: 400 });
    expect(await store.save(today, [{ path: 'gallery/unused.jpg', data: JPEG }], '')).toMatchObject({ ok: false, status: 400 });
    const items = { ...today, items: [{ ...items0[0], image: 'gallery/a.jpg', wall: 'gallery/a-w.jpg', thumb: 'gallery/a-t.jpg' }, ...items0.slice(1)] };
    const text = Buffer.from('<script>').toString('base64');
    expect(await store.save(items, [{ path: 'gallery/a.jpg', data: text }], '')).toMatchObject({ ok: false, status: 400 });
    expect(gh.calls).toEqual([]);
  });
  it('reads an older file (a bare list of paintings) as the four original halls', async () => {
    const gh = fakeGitHub(items0);
    const store = createGalleryStore({ token: 'good-token', repo: 'me/party', fetch: gh.fetch });
    const now = await store.load();
    expect(now.gallery.halls).toHaveLength(4);
    expect(now.gallery.items).toHaveLength(items0.length);
  });
  it('a new hall and a painting moved into it are saved together', async () => {
    const gh = fakeGitHub();
    const store = createGalleryStore({ token: 'good-token', repo: 'me/party', fetch: gh.fetch });
    const now = await store.load();
    const g = structuredClone(now.gallery);
    g.halls.push({ id: 'hsea001', name: '바다관', color: 'slate', motion: 'water', note: '파도 소리' });
    g.items[0].room = 'hsea001';
    expect(await store.save(g, [], now.version, '새 관 "바다관"')).toMatchObject({ ok: true });
    const saved = JSON.parse(gh.files.get(GALLERY_JSON)!.toString());
    expect(saved.halls).toHaveLength(5);
    expect(saved.items[0].room).toBe('hsea001');
    expect(gh.messages[0]).toContain('새 관 "바다관"');
    expect(gh.calls.filter(c => c === 'POST /git/commits')).toHaveLength(1);
  });
  it('a wrong token says so in plain words', async () => {
    const gh = fakeGitHub();
    const store = createGalleryStore({ token: 'bad', repo: 'me/party', fetch: gh.fetch });
    const r = await store.save(today, [], '');
    expect(r).toMatchObject({ ok: false, error: expect.stringContaining('토큰') });
  });
  it('without a token: shows this server\'s copy, cannot save', async () => {
    const store = createGalleryStore({});
    const now = await store.load();
    expect(now).toMatchObject({ source: 'disk', canSave: false });
    expect(now.gallery.items).toHaveLength(items0.length);
    expect(await store.save(today, [], now.version)).toMatchObject({ ok: false, status: 503 });
  });
});
