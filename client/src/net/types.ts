import type { Battery, Emote, Look, Mood, Theme } from '@party/shared';

/** Everything the game needs from "the party", whether it is a real server or the demo. */
export interface NetPlayer {
  id: string; name: string; look: Look;
  x: number; z: number; dir: number; moving: boolean; battery: Battery;
  /** 0–100, see shared/energy. */
  energy: number;
  /** Seat id, or -1 when on your feet. */
  seat: number;
  dozing: boolean;
  /** How their day went, '' until they say. */
  mood: Mood | '';
  /** Work hours over their head, '0900-1800+540' (see shared/hours), '' when not shared. */
  hours: string;
}

export interface PartyEvents {
  add(p: NetPlayer): void;
  change(p: NetPlayer): void;
  remove(id: string): void;
  chat(from: string, text: string): void;
  emote(from: string, kind: Emote): void;
  voice(from: string, blob: Blob, ms: number): void;
  snap(x: number, z: number): void;
  /** 🎆 someone launched fireworks from the DJ booth (`seed` makes every screen show the same volley). */
  firework(from: string, seed: number): void;
  closed(reason: string): void;
}

export interface PartyConnection {
  readonly selfId: string;
  readonly roomId: string;
  readonly title: string;
  readonly isPrivate: boolean;
  /** Which place the party is in; decides the map and the 3D world. */
  readonly theme: Theme;
  readonly demo: boolean;
  /** False where voice notes can't travel (the claude.ai preview). */
  readonly voiceOk: boolean;
  /** A line shown at the top of the party in demo-like modes. */
  readonly note?: string;
  on(handlers: Partial<PartyEvents>): void;
  move(x: number, z: number, dir: number, moving: boolean): void;
  chat(text: string): void;
  emote(kind: Emote): void;
  voice(blob: Blob, ms: number): Promise<void>;
  /** Sit on a seat you're standing next to (the party decides if you may). */
  sit(seatId: number): void;
  stand(): void;
  /** Answer "오늘 하루 어땠어요?" (the first answer sets how charged you arrive). */
  mood(m: Mood): void;
  /** Change (or hide, with '') the work hours over your head. */
  hours(h: string): void;
  /** Launch fireworks from the DJ booth (the party checks you're there and not too often). */
  firework(): void;
  leave(): void;
}

/** Helper: keep handler lists so `on()` can be called by several modules. */
export class Emitter {
  private hs: Partial<PartyEvents>[] = [];
  on(h: Partial<PartyEvents>) { this.hs.push(h); }
  emit<K extends keyof PartyEvents>(k: K, ...args: Parameters<PartyEvents[K]>) {
    for (const h of this.hs) (h[k] as ((...a: unknown[]) => void) | undefined)?.(...args);
  }
}
