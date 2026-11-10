import type { Application, NextFunction, Request, Response } from 'express';
import { matchMaker } from '@colyseus/core';
import { monitor } from '@colyseus/monitor';
import { ROOM_NAME } from '@party/shared';
import { stats } from './stats';
import { ADMIN_PAGE } from './adminPage';
import { randomBytes, timingSafeEqual } from 'node:crypto';

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
  app.get('/admin/api/stats', requireAdmin, async (_req, res) => {
    const rooms = await matchMaker.query({ name: ROOM_NAME });
    res.set('Cache-Control', 'no-store').json({
      ...stats.snapshot(),
      rooms: rooms
        .map(r => ({ roomId: r.roomId, title: r.metadata?.title ?? '파티', theme: r.metadata?.theme ?? 'gallery', private: !!r.private, clients: r.clients, maxClients: r.maxClients }))
        .sort((a, b) => b.clients - a.clients),
    });
  });
  // Colyseus' own live monitor (rooms, connections, kicking a client) for deeper checks.
  app.use('/admin/monitor', requireAdmin, monitor() as unknown as (req: Request, res: Response, next: NextFunction) => void);
}
