import { Room, type Client } from '@colyseus/core';
import {
  MAX_PLAYERS, MAX_SPEED, SPAWN, THEME, finite, isBattery, isEmote, moveWithCollision, nearbyIds,
  nearestWalkable, parseLook, sanitizeChat, sanitizeName, sanitizeTitle, validateVoice,
} from '@party/shared';
import { PartyState, Player } from './schema';
import { stats } from './stats';

export interface PartyMetadata { title: string; theme: string; private: boolean }

interface Track { at: number; voiceAt: number }

/**
 * A party in the gallery. The server is the referee: it keeps everyone's
 * position honest and decides who is close enough to receive each chat line,
 * emote or voice note. Voice notes are relayed and never stored.
 */
export class PartyRoom extends Room<{ state: PartyState; metadata: PartyMetadata }> {
  maxClients = MAX_PLAYERS;
  patchRate = 50;
  maxMessagesPerSecond = 40;
  state = new PartyState();

  private tracks = new Map<string, Track>();
  private guestNo = 0;

  messages = {
    move: (client: Client, m: unknown) => this.onMove(client, m),
    chat: (client: Client, m: unknown) => {
      const text = sanitizeChat((m as { text?: unknown } | null)?.text);
      if (text) this.toNearby(client, 'chat', { from: client.sessionId, text, ts: Date.now() });
    },
    emote: (client: Client, m: unknown) => {
      const kind = (m as { kind?: unknown } | null)?.kind;
      if (isEmote(kind)) this.toNearby(client, 'emote', { from: client.sessionId, kind });
    },
    voice: (client: Client, m: unknown) => {
      const note = validateVoice(m);
      const track = this.tracks.get(client.sessionId);
      if (!note || !track) return;
      const now = Date.now();
      if (now - track.voiceAt < 1500) return; // no voice-note spam
      track.voiceAt = now;
      this.toNearby(client, 'voice', { from: client.sessionId, ...note }, true);
    },
    battery: (client: Client, m: unknown) => {
      const level = (m as { level?: unknown } | null)?.level;
      const p = this.state.players.get(client.sessionId);
      if (p && isBattery(level)) p.battery = level;
    },
  };

  async onCreate(options: Record<string, unknown> = {}) {
    const isPrivate = options.private === true;
    const title = sanitizeTitle(options.title);
    this.state.title = title;
    this.state.isPrivate = isPrivate;
    await this.setMatchmaking({
      metadata: { title, theme: THEME, private: isPrivate },
      private: isPrivate,
    });
  }

  onJoin(client: Client, options: Record<string, unknown> = {}) {
    const look = parseLook(options.look);
    const name = sanitizeName(options.name) ?? `손님${++this.guestNo}`;
    // Spread newcomers out a little so they don't stack on one spot.
    const spot = nearestWalkable({ x: SPAWN.x + (Math.random() - 0.5) * 3, z: SPAWN.z + (Math.random() - 0.5) * 1.5 });
    this.state.players.set(client.sessionId, new Player({
      name, kind: look.kind, color: look.color, hat: look.hat, hand: look.hand, outfit: look.outfit,
      x: spot.x, z: spot.z, dir: 0, moving: false, battery: 'charging',
    }));
    this.tracks.set(client.sessionId, { at: Date.now(), voiceAt: 0 });
    stats.join({ id: client.sessionId, name, roomId: this.roomId, roomTitle: this.state.title, isPrivate: this.state.isPrivate, tz: options.tz });
  }

  onLeave(client: Client) {
    this.state.players.delete(client.sessionId);
    this.tracks.delete(client.sessionId);
    stats.leave(client.sessionId);
  }

  private onMove(client: Client, m: unknown) {
    const p = this.state.players.get(client.sessionId);
    const track = this.tracks.get(client.sessionId);
    if (!p || !track || !m || typeof m !== 'object') return;
    const { x, z, dir, moving } = m as Record<string, unknown>;
    if (!finite(x) || !finite(z)) return;

    const now = Date.now();
    const dt = Math.min(1, Math.max(0.05, (now - track.at) / 1000));
    track.at = now;
    const dist = Math.hypot(x - p.x, z - p.z);
    if (dist > MAX_SPEED * dt * 1.5 + 0.4) {
      client.send('snap', { x: p.x, z: p.z });
      return;
    }
    const pos = moveWithCollision({ x: p.x, z: p.z }, { x, z });
    p.x = pos.x;
    p.z = pos.z;
    if (finite(dir)) p.dir = dir;
    p.moving = moving === true;
    if (Math.abs(pos.x - x) > 0.3 || Math.abs(pos.z - z) > 0.3) client.send('snap', { x: pos.x, z: pos.z });
  }

  /** Send to everyone near the sender (sender included, so their own bubble is confirmed). */
  private toNearby(client: Client, type: string, payload: unknown, skipSelf = false) {
    const me = this.state.players.get(client.sessionId);
    if (!me) return;
    const all = [...this.state.players.entries()].map(([id, p]) => ({ id, x: p.x, z: p.z }));
    const ids = new Set(nearbyIds({ id: client.sessionId, x: me.x, z: me.z }, all));
    if (skipSelf) ids.delete(client.sessionId);
    for (const c of this.clients) if (ids.has(c.sessionId)) c.send(type, payload);
  }
}
