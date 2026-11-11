import { Room, type Client } from '@colyseus/core';
import {
  DOZE_AFTER, ENERGY, FIREWORK_COOLDOWN, nearStage, sanitizeHours, MAX_PLAYERS, MAX_SPEED, MOOD_ENERGY, batteryOf, chargeRate, finite, isEmote, isMood, isTheme, mapFor,
  moveWithCollision, nearbyIds, nearestWalkable, stepEnergy, type WorldMap, parseLook, sanitizeChat, sanitizeName, sanitizeTitle, validateVoice,
} from '@party/shared';
import { PartyState, Player } from './schema';
import { stats } from './stats';

export interface PartyMetadata { title: string; theme: string; private: boolean }

interface Track {
  at: number; voiceAt: number;
  /** Exact energy; the synced field is whole numbers. */
  energy: number;
  /** Seconds since the player last did anything. */
  idle: number;
  /** Only the first answer to "how was your day" sets your arrival energy. */
  moodSet: boolean;
}

/**
 * A party in one of the places (gallery, home, pool). The server is the referee: it keeps everyone's
 * position honest and decides who is close enough to receive each chat line,
 * emote or voice note. Voice notes are relayed and never stored.
 */
export class PartyRoom extends Room<{ state: PartyState; metadata: PartyMetadata }> {
  maxClients = MAX_PLAYERS;
  patchRate = 50;
  maxMessagesPerSecond = 40;
  state = new PartyState();

  private tracks = new Map<string, Track>();
  private map: WorldMap = mapFor('gallery');
  private guestNo = 0;
  private lastFirework = 0;

  messages = {
    move: (client: Client, m: unknown) => this.onMove(client, m),
    chat: (client: Client, m: unknown) => {
      const text = sanitizeChat((m as { text?: unknown } | null)?.text);
      if (!text) return;
      this.active(client.sessionId);
      this.toNearby(client, 'chat', { from: client.sessionId, text, ts: Date.now() });
    },
    emote: (client: Client, m: unknown) => {
      const kind = (m as { kind?: unknown } | null)?.kind;
      if (!isEmote(kind)) return;
      this.active(client.sessionId);
      this.toNearby(client, 'emote', { from: client.sessionId, kind });
    },
    /** ⏰ change (or hide, with '') the work hours over your head */
    hours: (client: Client, m: unknown) => {
      const p = this.state.players.get(client.sessionId);
      if (!p) return;
      p.hours = sanitizeHours((m as { hours?: unknown } | null)?.hours);
    },
    /** 🎆 from the DJ booth: a volley for the whole party (one every few seconds per room). */
    firework: (client: Client) => {
      const p = this.state.players.get(client.sessionId);
      if (!p || !nearStage(this.map, { x: p.x, z: p.z })) return;
      const now = Date.now();
      if (now - this.lastFirework < FIREWORK_COOLDOWN * 1000) return;
      this.lastFirework = now;
      this.active(client.sessionId);
      this.broadcast('firework', { from: client.sessionId, seed: Math.floor(Math.random() * 2 ** 31) });
    },
    sit: (client: Client, m: unknown) => this.onSit(client, (m as { seat?: unknown } | null)?.seat),
    stand: (client: Client) => { this.standUp(client.sessionId); this.active(client.sessionId); },
    mood: (client: Client, m: unknown) => {
      const mood = (m as { mood?: unknown } | null)?.mood;
      const p = this.state.players.get(client.sessionId), t = this.tracks.get(client.sessionId);
      if (!p || !t || !isMood(mood)) return;
      p.mood = mood;
      if (!t.moodSet) {
        t.moodSet = true;
        t.energy = MOOD_ENERGY[mood];
        p.energy = Math.floor(t.energy); p.battery = batteryOf(t.energy);
      }
      this.active(client.sessionId);
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
  };

  async onCreate(options: Record<string, unknown> = {}) {
    const isPrivate = options.private === true;
    const title = sanitizeTitle(options.title);
    const theme = isTheme(options.theme) ? options.theme : 'gallery';
    this.map = mapFor(theme);
    this.state.title = title;
    this.state.theme = theme;
    this.state.isPrivate = isPrivate;
    this.clock.setInterval(() => this.advance(0.5), 500);
    await this.setMatchmaking({
      metadata: { title, theme, private: isPrivate },
      private: isPrivate,
    });
  }

  onJoin(client: Client, options: Record<string, unknown> = {}) {
    const look = parseLook(options.look);
    const name = sanitizeName(options.name) ?? `손님${++this.guestNo}`;
    // Spread newcomers out a little so they don't stack on one spot.
    const s = this.map.spawn;
    const spot = nearestWalkable({ x: s.x + (Math.random() - 0.5) * 3, z: s.z + (Math.random() - 0.5) * 1.5 }, this.map);
    this.state.players.set(client.sessionId, new Player({
      name, kind: look.kind, color: look.color, hat: look.hat, hand: look.hand, outfit: look.outfit,
      x: spot.x, z: spot.z, dir: 0, moving: false,
      energy: ENERGY.start, battery: batteryOf(ENERGY.start), seat: -1, dozing: false, mood: '', hours: sanitizeHours(options.hours),
    }));
    this.tracks.set(client.sessionId, { at: Date.now(), voiceAt: 0, energy: ENERGY.start, idle: 0, moodSet: false });
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

    // walking off a seat: stand up first, then take the step from the floor in front of it
    if (p.seat >= 0) this.standUp(client.sessionId);

    const now = Date.now();
    const dt = Math.min(1, Math.max(0.05, (now - track.at) / 1000));
    track.at = now;
    const dist = Math.hypot(x - p.x, z - p.z);
    if (dist > MAX_SPEED * dt * 1.5 + 0.4) {
      client.send('snap', { x: p.x, z: p.z });
      return;
    }
    const pos = moveWithCollision({ x: p.x, z: p.z }, { x, z }, this.map);
    p.x = pos.x;
    p.z = pos.z;
    if (finite(dir)) p.dir = dir;
    p.moving = moving === true;
    if (p.moving || dist > 0.01) this.active(client.sessionId);
    if (Math.abs(pos.x - x) > 0.3 || Math.abs(pos.z - z) > 0.3) client.send('snap', { x: pos.x, z: pos.z });
  }

  /** Sit on a seat you're standing next to, if nobody else is on it. */
  private onSit(client: Client, seatId: unknown) {
    const p = this.state.players.get(client.sessionId);
    const seat = this.map.seats.find(s => s.id === seatId);
    if (!p || !seat || p.seat === seat.id) return;
    const close = Math.min(Math.hypot(seat.stand.x - p.x, seat.stand.z - p.z), Math.hypot(seat.x - p.x, seat.z - p.z));
    if (close > 1.8) return;
    for (const [id, other] of this.state.players) if (id !== client.sessionId && other.seat === seat.id) return;
    p.seat = seat.id;
    p.x = seat.x; p.z = seat.z; p.dir = seat.dir; p.moving = false;
    this.active(client.sessionId);
  }

  private standUp(id: string) {
    const p = this.state.players.get(id);
    if (!p || p.seat < 0) return;
    const seat = this.map.seats.find(s => s.id === p.seat);
    p.seat = -1;
    if (seat) { p.x = seat.stand.x; p.z = seat.stand.z; }
  }

  /** The player did something: they're awake. */
  private active(id: string) {
    const t = this.tracks.get(id);
    if (t) t.idle = 0;
    const p = this.state.players.get(id);
    if (p) p.dozing = false;
  }

  /**
   * Time passes at the party: everyone recharges (faster sitting or lying
   * down), and anyone who has done nothing for a while nods off. Runs twice a
   * second; tests call it directly to fast-forward.
   */
  advance(dt: number) {
    for (const [id, p] of this.state.players) {
      const t = this.tracks.get(id);
      if (!t) continue;
      t.idle += dt;
      const dozing = t.idle >= DOZE_AFTER;
      if (p.dozing !== dozing) p.dozing = dozing;
      const seat = p.seat >= 0 ? this.map.seats.find(s => s.id === p.seat) : undefined;
      const pose = seat ? seat.pose : p.moving ? 'walk' : 'stand';
      t.energy = stepEnergy(t.energy, chargeRate(pose, dozing), dt);
      const whole = Math.floor(t.energy);
      if (p.energy !== whole) p.energy = whole;
      const battery = batteryOf(t.energy);
      if (p.battery !== battery) p.battery = battery;
    }
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
