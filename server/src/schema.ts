import { schema, t, type SchemaType } from '@colyseus/schema';

/** One partygoer, synced to everyone in the room. */
export const Player = schema({
  name: t.string(),
  kind: t.string(),
  /** 0–7 a swatch, or 0x1000000 + 0xRRGGBB picked from the palette (see shared colorHex). */
  color: t.uint32(),
  hat: t.string(),
  hand: t.string(),
  outfit: t.string(),
  x: t.float32(),
  z: t.float32(),
  dir: t.float32(),
  moving: t.boolean(),
  battery: t.string(),
  /** 0–100. Everyone arrives tired and recharges at the party (see shared/energy). */
  energy: t.uint8(),
  /** The seat you're sitting on, or -1. */
  seat: t.int16(),
  /** Nodding off after a while doing nothing. */
  dozing: t.boolean(),
  /** How their day went ("오늘 하루 어땠어요?"), '' until they say. */
  mood: t.string(),
}, 'Player');
export type Player = SchemaType<typeof Player>;

export const PartyState = schema({
  title: t.string(),
  /** Which place the party is in: gallery, home or pool. Decides the map and the 3D world. */
  theme: t.string(),
  isPrivate: t.boolean(),
  players: t.map(Player),
}, 'PartyState');
export type PartyState = SchemaType<typeof PartyState>;
