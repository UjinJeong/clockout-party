import type { Battery, Emote, Look } from '@party/shared';

/** Everything the game needs from "the party", whether it is a real server or the demo. */
export interface NetPlayer {
  id: string; name: string; look: Look;
  x: number; z: number; dir: number; moving: boolean; battery: Battery;
}

export interface PartyEvents {
  add(p: NetPlayer): void;
  change(p: NetPlayer): void;
  remove(id: string): void;
  chat(from: string, text: string): void;
  emote(from: string, kind: Emote): void;
  voice(from: string, blob: Blob, ms: number): void;
  snap(x: number, z: number): void;
  closed(reason: string): void;
}

export interface PartyConnection {
  readonly selfId: string;
  readonly roomId: string;
  readonly title: string;
  readonly isPrivate: boolean;
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
  battery(level: Battery): void;
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
