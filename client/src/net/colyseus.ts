import { Client, Callbacks, type Room } from '@colyseus/sdk';
import { visitorKey } from './visitor';
import { leaveReason, sanitizeHours, ROOM_NAME, isMood, isTheme, parseLook, type Act, type Battery, type BoardSnapshot, type Note, type Emote, type Look, type Mood, type Theme } from '@party/shared';
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

export async function connectParty(req: JoinRequest, name: string, look: Look, hours = ''): Promise<PartyConnection> {
  const client = new Client(serverUrl());
  // The time zone paints the visitor's sky and tells the manager page roughly where they are.
  const tz = (() => { try { return Intl.DateTimeFormat().resolvedOptions().timeZone; } catch { return undefined; } })();
  // 👑 the room you make is yours: a key kept on this device makes you its host, also when you come back
  const room = req.mode === 'create'
    ? await client.create(ROOM_NAME, { title: req.title, private: req.private, theme: req.theme, name, look, tz, hours, ownerKey: newKey(), visitor: visitorKey() })
    : await client.joinById(req.roomId, { name, look, tz, hours, ownerKey: ownedRooms()[req.roomId], visitor: visitorKey() });
  if (req.mode === 'create') keepOwner(room.roomId, pendingKey);
  const conn = new ColyseusConnection(room);
  // Wait for the first full state so the room title and the guest list are ready.
  await new Promise<void>(res => { room.onStateChange.once(() => res()); setTimeout(res, 3000); });
  return conn;
}

/** Rooms this device made, roomId → host key (the latest few). */
const OWNED = 'party.owned';
let pendingKey = '';
function newKey() {
  const b = new Uint8Array(18); crypto.getRandomValues(b);
  pendingKey = btoa(String.fromCharCode(...b)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  return pendingKey;
}
function ownedRooms(): Record<string, string> {
  try { const v = JSON.parse(localStorage.getItem(OWNED) || '{}'); return v && typeof v === 'object' ? v : {}; } catch { return {}; }
}
function keepOwner(roomId: string, key: string) {
  try {
    const all = Object.entries(ownedRooms()).filter(([id]) => id !== roomId).slice(-19);
    localStorage.setItem(OWNED, JSON.stringify(Object.fromEntries([...all, [roomId, key]])));
  } catch { /* private mode: host only for this visit */ }
}

interface ServerPlayer {
  name: string; kind: string; color: number; hat: string; hand: string; outfit: string;
  x: number; z: number; dir: number; moving: boolean; battery: string;
  energy: number; seat: number; dozing: boolean; mood: string; hours?: string; away?: boolean;
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
      energy: p.energy ?? 0, seat: p.seat ?? -1, dozing: !!p.dozing, mood: isMood(p.mood) ? p.mood : '', hours: sanitizeHours(p.hours), away: !!p.away,
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
    room.onMessage('board', (b: BoardSnapshot) => this.ev.emit('board', b));
    room.onMessage('note', (n: Note) => this.ev.emit('note', n));
    room.onMessage('unnote', (m: { id: string }) => this.ev.emit('unnote', m));
    room.onMessage('likes', (m: { art: string; n: number }) => this.ev.emit('likes', m.art, m.n));
    room.onMessage('act', (m: { from: string; kind: Act }) => this.ev.emit('act', m.from, m.kind));
    room.onMessage('clink', (m: { a: string; b: string }) => this.ev.emit('clink', m.a, m.b));
    room.onMessage('bye', (m: { from: string }) => this.ev.emit('bye', m.from));
    room.onMessage('firework', (m: { from: string; seed: number }) => this.ev.emit('firework', m.from, m.seed));
    room.onMessage('snap', (m: { x: number; z: number }) => this.ev.emit('snap', m.x, m.z));
    room.onMessage('dismissed', (m: { reason: string }) => this.ev.emit('dismissed', m.reason));
    cb.listen('owner', (v: string) => { this.owner = v || ''; this.ev.emit('owner', this.owner); });
    cb.listen('title', (v: string) => this.ev.emit('title', v || '퇴근 파티'));
    // 💤 tell the others when this tab is out of sight (phone locked, another tab)
    const away = () => { try { room.send('away', { on: document.hidden }); } catch { /* closing */ } };
    document.addEventListener('visibilitychange', away);
    room.onLeave((code: number) => {
      document.removeEventListener('visibilitychange', away);
      this.ev.emit('closed', leaveReason(code) ?? (code === 1000 ? 'left' : 'lost'));
    });
  }

  private owner = '';
  get selfId() { return this.room.sessionId; }
  get hostId() { return this.owner; }
  get isHost() { return this.owner !== '' && this.owner === this.room.sessionId; }
  rename(title: string) { this.room.send('rename', { title }); }
  kick(id: string) { this.room.send('kick', { id }); }
  closeRoom() { this.room.send('closeRoom', {}); }
  get roomId() { return this.room.roomId; }
  get title() { return (this.room.state as { title?: string }).title || '퇴근 파티'; }
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
  firework() { this.room.send('firework', {}); }
  bye() { this.room.send('bye', {}); }
  act(kind: Act) { this.room.send('act', { kind }); }
  setLook(l: Look) { this.room.send('look', { look: l }); }
  askBoard() { this.room.send('board', {}); }
  writeNote(text: string) { this.room.send('note', { text }); }
  like(art: string) { this.room.send('like', { art }); }
  hours(h: string) { this.room.send('hours', { hours: h }); }
  leave() { void this.room.leave(true); }
}

export type { ColyseusConnection };
