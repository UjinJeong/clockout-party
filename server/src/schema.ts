import { schema, t, type SchemaType } from '@colyseus/schema';

/** One partygoer, synced to everyone in the room. */
export const Player = schema({
  name: t.string(),
  kind: t.string(),
  color: t.uint8(),
  hat: t.string(),
  hand: t.string(),
  outfit: t.string(),
  x: t.float32(),
  z: t.float32(),
  dir: t.float32(),
  moving: t.boolean(),
  battery: t.string(),
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
