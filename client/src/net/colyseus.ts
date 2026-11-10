import { Client, Callbacks, type Room } from '@colyseus/sdk';
import { ROOM_NAME, isMood, isTheme, parseLook, type Battery, type Emote, type Look, type Mood, type Theme } from '@party/shared';
import { Emitter, type NetPlayer, type PartyConnection, type PartyEvents } from './types';

/**
 * Where the party server lives.
 * - VITE_SERVER_URL wins when set (e.g. https://party.example.com).
 * - While developing (vite on :5173) the server runs beside it on :2567.
 * - In a real deploy the server hands out this page itself, so it's the same address.
 */
export function serverUrl(): string {
  const env = import.meta.env.VITE_SERVER_URL as string | undefined;
  if (env) return env.replace(/\/$/, '');
  if (import.meta.env.DEV) return `${location.protocol}//${location.hostname || 'localhost'}:2567`;
  return location.origin;
}

export interface RoomListing { roomId: string; title: string; theme?: Theme; clients: number; maxClients: number }

export async function listRooms(signal?: AbortSignal): Promise<RoomListing[]> {
  const res = await fetch(`${serverUrl()}/rooms`, { signal });
  if (!res.ok) throw new Error(`rooms ${res.status}`);
  return res.json();
}

export type JoinRequest =
  | { mode: 'create'; title: string; private: boolean; theme: Theme }
  | { mode: 'join'; roomId: string };

export async function connectParty(req: JoinRequest, name: string, look: Look): Promise<PartyConnection> {
  const client = new Client(serverUrl());
  // The time zone paints the visitor's sky and tells the manager page roughly where they are.
  const tz = (() => { try { return Intl.DateTimeFormat().resolvedOptions().timeZone; } catch { return undefined; } })();
  const room = req.mode === 'create'
    ? await client.create(ROOM_NAME, { title: req.title, private: req.private, theme: req.theme, name, look, tz })
    : await client.joinById(req.roomId, { name, look, tz });
  const conn = new ColyseusConnection(room);
  // Wait for the first full state so the room title and the guest list are ready.
  await new Promise<void>(res => { room.onStateChange.once(() => res()); setTimeout(res, 3000); });
  return conn;
}

interface ServerPlayer {
  name: string; kind: string; color: number; hat: string; hand: string; outfit: string;
  x: number; z: number; dir: number; moving: boolean; battery: string;
  energy: number; seat: number; dozing: boolean; mood: string;
}

class ColyseusConnection implements PartyConnection {
  readonly demo = false;
  readonly voiceOk = true;
  private ev = new Emitter();
  private known = new Map<string, NetPlayer>();

  constructor(private room: Room) {
    const cb = Callbacks.get(room as never) as any;
    const toNet = (id: string, p: ServerPlayer): NetPlayer => ({
      id, name: p.name, look: parseLook({ kind: p.kind, color: p.color, hat: p.hat, hand: p.hand, outfit: p.outfit }),
      x: p.x, z: p.z, dir: p.dir, moving: p.moving, battery: p.battery as Battery,
      energy: p.energy ?? 0, seat: p.seat ?? -1, dozing: !!p.dozing, mood: isMood(p.mood) ? p.mood : '',
    });
    cb.onAdd('players', (p: ServerPlayer, id: string) => {
      const np = toNet(id, p);
      this.known.set(id, np);
      this.ev.emit('add', np);
      cb.onChange(p, () => { const n = toNet(id, p); this.known.set(id, n); this.ev.emit('change', n); });
    });
    cb.onRemove('players', (_p: ServerPlayer, id: string) => { this.known.delete(id); this.ev.emit('remove', id); });
    room.onMessage('chat', (m: { from: string; text: string }) => this.ev.emit('chat', m.from, m.text));
    room.onMessage('emote', (m: { from: string; kind: Emote }) => this.ev.emit('emote', m.from, m.kind));
    room.onMessage('voice', (m: { from: string; mime: string; ms: number; data: Uint8Array }) => {
      this.ev.emit('voice', m.from, new Blob([new Uint8Array(m.data)], { type: m.mime }), m.ms);
    });
    room.onMessage('snap', (m: { x: number; z: number }) => this.ev.emit('snap', m.x, m.z));
    room.onLeave((code: number) => this.ev.emit('closed', code === 1000 ? 'left' : 'lost'));
  }

  get selfId() { return this.room.sessionId; }
  get roomId() { return this.room.roomId; }
  get title() { return (this.room.state as { title?: string }).title || '오프닝 파티'; }
  get isPrivate() { return (this.room.state as { isPrivate?: boolean }).isPrivate ?? false; }
  get theme(): Theme { const t = (this.room.state as { theme?: string }).theme; return isTheme(t) ? t : 'gallery'; }

  on(h: Partial<PartyEvents>) {
    this.ev.on(h);
    // replay players that arrived before this listener was attached
    for (const p of this.known.values()) h.add?.(p);
  }
  move(x: number, z: number, dir: number, moving: boolean) { this.room.send('move', { x, z, dir, moving }); }
  chat(text: string) { this.room.send('chat', { text }); }
  emote(kind: Emote) { this.room.send('emote', { kind }); }
  async voice(blob: Blob, ms: number) {
    const data = new Uint8Array(await blob.arrayBuffer());
    this.room.send('voice', { mime: blob.type || 'audio/webm', ms, data });
    // The server doesn't echo voice notes back to the sender, so show ours right away.
    this.ev.emit('voice', this.selfId, blob, ms);
  }
  sit(seatId: number) { this.room.send('sit', { seat: seatId }); }
  stand() { this.room.send('stand', {}); }
  mood(m: Mood) { this.room.send('mood', { mood: m }); }
  leave() { void this.room.leave(true); }
}

export type { ColyseusConnection };
