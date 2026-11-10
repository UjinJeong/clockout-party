import config from '@colyseus/tools';
import { defineRoom, matchMaker } from '@colyseus/core';
import { WebSocketTransport } from '@colyseus/ws-transport';
import cors from 'cors';
import { ROOM_NAME, VOICE_MAX_BYTES } from '@party/shared';
import { PartyRoom } from './PartyRoom';
import { mountAdmin } from './admin';

export default config({
  rooms: {
    [ROOM_NAME]: defineRoom(PartyRoom),
  },
  // Voice notes travel over the socket, so allow frames a bit larger than the biggest note.
  initializeTransport: (options) => new WebSocketTransport({ ...options, maxPayload: VOICE_MAX_BYTES + 32 * 1024 }),
  initializeExpress: (app) => {
    app.use(cors());
    app.get('/health', (_req, res) => { res.json({ ok: true }); });
    mountAdmin(app);
    /** Public rooms for the lobby list. Private (friends-only) rooms never show up here. */
    app.get('/rooms', async (_req, res) => {
      const rooms = await matchMaker.query({ name: ROOM_NAME });
      res.json(rooms
        .filter(r => !r.private && !r.unlisted && !r.locked)
        .map(r => ({ roomId: r.roomId, title: r.metadata?.title ?? '파티', clients: r.clients, maxClients: r.maxClients }))
        .sort((a, b) => b.clients - a.clients));
    });
  },
});
