import express, { type Application, type NextFunction, type Request, type Response } from 'express';
import { matchMaker } from '@colyseus/core';
import { monitor } from '@colyseus/monitor';
import { HALL_COLORS, HALL_LIMITS, HALL_MAX, HALL_MOTIONS, MAX_HALLS, ROOM_NAME } from '@party/shared';
import { stats } from './stats';
import { PartyRoom } from './PartyRoom';
import { createGalleryStore, type GalleryStore } from './galleryStore';

/** What the manager page's halls section can offer (the same rules the server checks). */
const HALL_OPTIONS = {
  colors: HALL_COLORS,
  motions: Object.fromEntries(Object.entries(HALL_MOTIONS).map(([k, m]) => [k, m.label])),
  hallMax: HALL_MAX, maxHalls: MAX_HALLS, nameMax: HALL_LIMITS.name, noteMax: HALL_LIMITS.note,
};

/** The gallery is saved to this project's GitHub repository (see galleryStore). */
let gallery: GalleryStore | null = null;
/** Made on first use, so the settings in the environment at that moment are the ones used. */
const store = () => (gallery ??= createGalleryStore({ token: process.env.GITHUB_TOKEN, repo: process.env.GITHUB_REPO, branch: process.env.GITHUB_BRANCH, api: process.env.GITHUB_API_URL }));
/** Tests swap in a store that talks to a pretend GitHub. */
export function useGalleryStore(s: GalleryStore) { gallery = s; }
import { ADMIN_PAGE } from './adminPage';
import { randomBytes, timingSafeEqual } from 'node:crypto';
import { fileURLToPath } from 'node:url';

/**
 * The manager page at /admin: who is in, where from, which parties are open,
 * and how busy the last week was. Guarded by a password (ADMIN_PASSWORD);
 * without one, a random password is made at start-up and printed in the console.
 */
export const adminPassword = process.env.ADMIN_PASSWORD || randomBytes(6).toString('base64url');
export const generatedPassword = !process.env.ADMIN_PASSWORD;

function same(a: string, b: string) {
  const x = Buffer.from(a), y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
}

export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization ?? '';
  const [scheme, value] = header.split(' ');
  if (scheme === 'Basic' && value) {
    const pass = Buffer.from(value, 'base64').toString().split(':').slice(1).join(':');
    if (same(pass, process.env.ADMIN_PASSWORD || adminPassword)) return next();
  }
  res.set('WWW-Authenticate', 'Basic realm="party-admin", charset="UTF-8"').status(401).send('관리자 비밀번호가 필요해요.');
}

export function mountAdmin(app: Application) {
  app.get('/admin', requireAdmin, (_req, res) => { res.type('html').send(ADMIN_PAGE); });
  app.get('/admin/gallery.js', requireAdmin, (_req, res) => { res.type('js').set('Cache-Control', 'no-store').sendFile(fileURLToPath(new URL('./adminGallery.js', import.meta.url))); });
  app.get('/admin/api/stats', requireAdmin, async (_req, res) => {
    const rooms = await matchMaker.query({ name: ROOM_NAME });
    res.set('Cache-Control', 'no-store').json({
      ...stats.snapshot(),
      rooms: rooms
        .map(r => ({ roomId: r.roomId, title: r.metadata?.title ?? '파티', theme: r.metadata?.theme ?? 'gallery', private: !!r.private, clients: r.clients, maxClients: r.maxClients, people: PartyRoom.open.get(r.roomId)?.roster() ?? [] }))
        .sort((a, b) => b.clients - a.clients),
    });
  });
  // 🖼️ the gallery: every painting and its words; save = one commit to GitHub, then Render redeploys
  app.get('/admin/api/gallery', requireAdmin, async (_req, res) => {
    try { res.set('Cache-Control', 'no-store').json({ ...(await store().load()), options: HALL_OPTIONS }); }
    catch (e) { res.status(502).json({ error: (e as Error).message || '전시장 정보를 불러오지 못했어요.' }); }
  });
  app.put('/admin/api/gallery', requireAdmin, express.json({ limit: '16mb' }), async (req, res) => {
    const b = (req.body ?? {}) as { gallery?: unknown; pictures?: unknown; version?: unknown; summary?: unknown };
    const r = await store().save(b.gallery, b.pictures, b.version, typeof b.summary === 'string' ? b.summary : '');
    if (r.ok) res.json(r); else res.status(r.status).json({ error: r.error });
  });
  // close a party, or walk one person out of it
  app.post('/admin/api/rooms/:roomId/close', requireAdmin, (req, res) => {
    const room = PartyRoom.open.get(String(req.params.roomId));
    if (!room) { res.status(404).json({ ok: false }); return; }
    room.closeAll();
    res.json({ ok: true });
  });
  app.post('/admin/api/rooms/:roomId/kick/:id', requireAdmin, (req, res) => {
    const room = PartyRoom.open.get(String(req.params.roomId));
    res.status(room ? 200 : 404).json({ ok: !!room && room.dismiss(String(req.params.id), 'kicked') });
  });
  // Colyseus' own live monitor (rooms, connections, kicking a client) for deeper checks.
  app.use('/admin/monitor', requireAdmin, monitor() as unknown as (req: Request, res: Response, next: NextFunction) => void);
}
