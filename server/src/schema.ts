import { schema, t, type SchemaType } from '@colyseus/schema';

/** One partygoer, synced to everyone in the room. */
export const Player = schema({
  name: t.string(),
  kind: t.string(),
  color: t.uint8(),
  prop: t.string(),
  x: t.float32(),
  z: t.float32(),
  dir: t.float32(),
  moving: t.boolean(),
  battery: t.string(),
}, 'Player');
export type Player = SchemaType<typeof Player>;

export const PartyState = schema({
  players: t.map(Player),
}, 'PartyState');
export type PartyState = SchemaType<typeof PartyState>;
