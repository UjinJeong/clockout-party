import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { checkGallery, DEFAULT_HALLS, isGalleryPath, type Gallery } from '@party/shared';

/**
 * Where the manager page keeps the gallery: the project's own GitHub repository.
 *  - Reading: the latest gallery file (halls + paintings) on the branch (so edits not yet deployed still show).
 *  - Saving: one commit with the gallery file and any new pictures. Render sees the commit and
 *    redeploys, so the site has the change a few minutes later, and every edit stays in the
 *    history (and can be undone there).
 * Without a token it can still show the gallery (read from this server's own copy), not save it.
 */
export const GALLERY_JSON = 'shared/src/gallery.json';
export const PICTURE_DIR = 'client/public/';
/** Biggest picture accepted from the manager page (already resized in the browser). */
export const MAX_PICTURE = 3 * 1024 * 1024;

export interface PictureUpload { path: string; data: string }
export interface Loaded { gallery: Gallery; version: string; canSave: boolean; source: 'github' | 'disk'; repo: string; branch: string }
export type Saved = { ok: true; commit: string; url: string } | { ok: false; status: number; error: string };

type Fetch = typeof fetch;
export interface StoreOptions { token?: string; repo?: string; branch?: string; fetch?: Fetch; localFile?: string; api?: string }

/** The file as the manager page should see it: checked and tidied, an older bare list given the original halls. */
function readGallery(text: string): Gallery {
  const raw = JSON.parse(text);
  const c = checkGallery(raw);
  if (c.ok) return c.gallery;
  return Array.isArray(raw) ? { halls: DEFAULT_HALLS, items: raw } : raw;
}
const sha = (s: string) => createHash('sha1').update(s).digest('hex').slice(0, 12);

export function createGalleryStore(o: StoreOptions = {}) {
  const token = o.token ?? '';
  const repo = o.repo || 'UjinJeong/clockout-party';
  const branch = o.branch || 'main';
  const f: Fetch = o.fetch ?? fetch;
  const api = (o.api || 'https://api.github.com').replace(/\/$/, '');
  const local = o.localFile ?? fileURLToPath(new URL('../../' + GALLERY_JSON, import.meta.url));

  async function gh<T>(path: string, init: RequestInit = {}): Promise<T> {
    const res = await f(`${api}/repos/${repo}${path}`, {
      ...init,
      headers: {
        Accept: 'application/vnd.github+json', 'X-GitHub-Api-Version': '2022-11-28', 'User-Agent': 'clockout-party-admin',
        Authorization: `Bearer ${token}`, ...(init.body ? { 'Content-Type': 'application/json' } : {}),
      },
    });
    if (!res.ok) {
      const why = res.status === 401 ? 'GitHub 토큰이 맞지 않거나 만료됐어요.'
        : res.status === 403 || res.status === 404 ? 'GitHub 토큰에 이 저장소의 "Contents: 읽기와 쓰기" 권한이 없어요.'
        : `GitHub가 응답하지 않아요 (${res.status}).`;
      throw Object.assign(new Error(why), { status: 502 });
    }
    return res.json() as Promise<T>;
  }

  async function readRemote(): Promise<{ text: string; blob: string }> {
    const r = await gh<{ content: string; sha: string }>(`/contents/${GALLERY_JSON}?ref=${encodeURIComponent(branch)}`);
    return { text: Buffer.from(r.content, 'base64').toString('utf8'), blob: r.sha };
  }

  return {
    canSave: !!token,
    repo, branch,

    /** The gallery as it is now, plus a version to send back when saving (so two edits can't overwrite each other). */
    async load(): Promise<Loaded> {
      if (token) {
        const { text, blob } = await readRemote();
        return { gallery: readGallery(text), version: blob, canSave: true, source: 'github', repo, branch };
      }
      const text = readFileSync(local, 'utf8');
      return { gallery: readGallery(text), version: sha(text), canSave: false, source: 'disk', repo, branch };
    },

    /** Check everything, then commit gallery.json and the new pictures together. */
    async save(raw: unknown, pictures: unknown, version: unknown, summary = ''): Promise<Saved> {
      if (!token) return { ok: false, status: 503, error: 'GitHub 토큰이 설정되지 않아서 저장할 수 없어요. (Render의 GITHUB_TOKEN)' };
      const checked = checkGallery(raw);
      if (!checked.ok) return { ok: false, status: 400, error: checked.error };
      const used = new Set(checked.gallery.items.flatMap(it => [it.image, it.wall, it.thumb, it.mask, it.depth]).filter(Boolean) as string[]);
      const files: { path: string; bytes: Buffer }[] = [];
      for (const p of Array.isArray(pictures) ? pictures : []) {
        const { path, data } = (p ?? {}) as PictureUpload;
        if (!isGalleryPath(path) || typeof data !== 'string' || !used.has(path)) return { ok: false, status: 400, error: '올린 그림 파일이 잘못됐어요. 다시 올려 주세요.' };
        const bytes = Buffer.from(data, 'base64');
        const jpeg = bytes[0] === 0xff && bytes[1] === 0xd8, png = bytes.subarray(0, 4).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47]));
        if (!(jpeg || png) || bytes.length > MAX_PICTURE) return { ok: false, status: 400, error: '그림은 3MB 이하의 JPG나 PNG만 올릴 수 있어요.' };
        files.push({ path, bytes });
      }
      try {
        const now = await readRemote();
        if (typeof version === 'string' && version && version !== now.blob) {
          return { ok: false, status: 409, error: '그사이 다른 곳에서 전시장이 바뀌었어요. 새로고침한 뒤 다시 고쳐 주세요.' };
        }
        const ref = await gh<{ object: { sha: string } }>(`/git/ref/heads/${encodeURIComponent(branch)}`);
        const head = await gh<{ tree: { sha: string } }>(`/git/commits/${ref.object.sha}`);
        const tree: { path: string; mode: '100644'; type: 'blob'; sha: string }[] = [];
        for (const file of files) {
          const b = await gh<{ sha: string }>('/git/blobs', { method: 'POST', body: JSON.stringify({ content: file.bytes.toString('base64'), encoding: 'base64' }) });
          tree.push({ path: PICTURE_DIR + file.path, mode: '100644', type: 'blob', sha: b.sha });
        }
        const json = JSON.stringify(checked.gallery, null, 1) + '\n';
        const jb = await gh<{ sha: string }>('/git/blobs', { method: 'POST', body: JSON.stringify({ content: json, encoding: 'utf-8' }) });
        tree.push({ path: GALLERY_JSON, mode: '100644', type: 'blob', sha: jb.sha });
        const t = await gh<{ sha: string }>('/git/trees', { method: 'POST', body: JSON.stringify({ base_tree: head.tree.sha, tree }) });
        const message = `Gallery: ${summary.trim().slice(0, 120) || 'edited on the manager page'}\n\nSaved from the manager page (/admin).`;
        const c = await gh<{ sha: string; html_url: string }>('/git/commits', { method: 'POST', body: JSON.stringify({ message, tree: t.sha, parents: [ref.object.sha] }) });
        await gh(`/git/refs/heads/${encodeURIComponent(branch)}`, { method: 'PATCH', body: JSON.stringify({ sha: c.sha }) });
        return { ok: true, commit: c.sha, url: c.html_url ?? `https://github.com/${repo}/commit/${c.sha}` };
      } catch (e) {
        const err = e as Error & { status?: number };
        return { ok: false, status: err.status ?? 502, error: err.message || '저장하지 못했어요.' };
      }
    },
  };
}
export type GalleryStore = ReturnType<typeof createGalleryStore>;
