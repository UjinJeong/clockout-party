import {
  isEmote, isNear, parseLook, sanitizeChat, sanitizeName, type Battery, type Emote, type Look,
} from '@party/shared';
import { DemoConnection } from './demo';
import { Emitter, type NetPlayer, type PartyConnection, type PartyEvents } from './types';

/**
 * For the shareable claude.ai preview: everyone who has the page open meets in
 * the same gallery through the page's live "room" (no game server needed),
 * and a few bot guests keep you company while it is quiet.
 * Voice notes need the real server, so they are off here.
 */

interface RoomPeer { peer: string; isMe: boolean; sameTab: boolean; presence: Readonly<Record<string, unknown>> }
interface RoomMsg { peer: string; sameTab: boolean; data?: unknown }
interface RoomApi {
  presence(patch: Record<string, unknown>): Promise<void>;
  emit(topic: string, data?: unknown): Promise<void>;
  on(topic: string, fn: (m: RoomMsg) => void, onError?: (e: unknown) => void): () => void;
  onPeers(fn: (c: { joined: readonly RoomPeer[]; updated: readonly RoomPeer[]; left: readonly RoomPeer[] }) => void, onError?: (e: unknown) => void): () => void;
}

declare global { interface Window { claude?: { use(name: string): Promise<unknown> } } }

/** The page's live room when it runs inside a claude.ai artifact, otherwise null. */
export async function getRoom(): Promise<RoomApi | null> {
  try {
    if (!window.claude?.use) return null;
    return (await window.claude.use('room')) as RoomApi | null;
  } catch { return null; }
}

export class LiveRoomConnection implements PartyConnection {
  readonly selfId = 'me';
  readonly roomId = 'live';
  readonly title = '같이 둘러보기';
  readonly isPrivate = false;
  readonly demo = true;
  readonly voiceOk = false;
  readonly note = '이 페이지를 연 사람들과 같은 전시장에 있어요. 🤖 표시는 봇 손님이에요.';
  private ev = new Emitter();
  private bots: DemoConnection;
  private peers = new Map<string, NetPlayer>();
  private me = { x: 0, z: 0 };
  private offs: (() => void)[] = [];

  constructor(private room: RoomApi, private name: string, private look: Look) {
    this.bots = new DemoConnection(name, look, { botSuffix: ' 🤖' });
    this.offs.push(room.onPeers(c => {
      for (const p of [...c.joined, ...c.updated]) {
        if (p.isMe && p.sameTab) continue;
        const np = toPlayer(p);
        if (!np) continue;
        const had = this.peers.has(np.id);
        this.peers.set(np.id, np);
        this.ev.emit(had ? 'change' : 'add', np);
      }
      for (const p of c.left) {
        const id = 'peer:' + p.peer;
        if (this.peers.delete(id)) this.ev.emit('remove', id);
      }
    }, () => { /* room unavailable: the bots still keep the party going */ }));
    const heard = (topic: 'chat' | 'emote') => room.on(topic, m => {
      if (m.sameTab) return;
      const from = this.peers.get('peer:' + m.peer);
      if (!from || !isNear(from, this.me)) return; // only people near you are heard
      const d = (m.data ?? {}) as Record<string, unknown>;
      if (topic === 'chat') { const t = sanitizeChat(d.text); if (t) this.ev.emit('chat', from.id, t); }
      else if (isEmote(d.kind)) this.ev.emit('emote', from.id, d.kind);
    });
    this.offs.push(heard('chat'), heard('emote'));
    void room.presence(this.presence({ battery: 'charging' })).catch(() => {});
  }

  private presence(extra: Record<string, unknown>) {
    return { n: this.name, k: this.look.kind, c: this.look.color, h: this.look.hat, a: this.look.hand, o: this.look.outfit, ...extra };
  }

  on(h: Partial<PartyEvents>) {
    this.ev.on(h);
    this.bots.on(h); // you and the bots
    for (const p of this.peers.values()) h.add?.(p);
  }

  move(x: number, z: number, dir: number, moving: boolean) {
    this.bots.move(x, z, dir, moving);
    this.me = { x, z };
    void this.room.presence({ x: round(x), z: round(z), d: round(dir), m: moving }).catch(() => {});
  }
  chat(text: string) { this.bots.chat(text); void this.room.emit('chat', { text }).catch(() => {}); }
  emote(kind: Emote) { this.bots.emote(kind); void this.room.emit('emote', { kind }).catch(() => {}); }
  async voice() { /* not available in the preview */ }
  battery(level: Battery) { this.bots.battery(level); void this.room.presence({ b: level }).catch(() => {}); }
  leave() {
    this.offs.forEach(f => f());
    void this.room.presence({ x: null, z: null, n: null }).catch(() => {});
    this.bots.leave();
  }
}

const round = (v: number) => Math.round(v * 100) / 100;

function toPlayer(p: RoomPeer): NetPlayer | null {
  const s = p.presence;
  if (typeof s.x !== 'number' || typeof s.z !== 'number' || !Number.isFinite(s.x) || !Number.isFinite(s.z)) return null;
  // `p` is the old single prop slot, from pages opened before the split
  const look = parseLook({ kind: s.k, color: s.c, hat: s.h, hand: s.a, outfit: s.o, prop: s.p });
  return {
    id: 'peer:' + p.peer,
    name: sanitizeName(s.n) ?? '손님',
    look,
    x: s.x, z: s.z, dir: typeof s.d === 'number' ? s.d : 0, moving: s.m === true,
    battery: s.b === 'low' ? 'low' : 'charging',
  };
}
