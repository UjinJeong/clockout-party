import { createHash } from 'node:crypto';
import { Board, GALLERY, THEMES, isOwnerKey, isTheme, type BoardSnapshot } from '@party/shared';
import { createBoardStore, type BoardStore } from './boardStore';

/**
 * 📝❤️ The guest book and the hearts every public party of a theme shares, kept in the store
 * (Render Key Value when REDIS_URL is set) so they outlive the party, a redeploy and a sleep.
 * A friends-only party keeps its own guest book in the room and saves nothing of it.
 */
let store: BoardStore | null = null;
const shared = new Map<string, Promise<Board>>();
const theStore = () => (store ??= createBoardStore({ url: process.env.REDIS_URL || undefined }));

/** The theme's shared board, loaded from the store the first time it is asked for. */
export function sharedBoard(theme: string): Promise<Board> {
  let b = shared.get(theme);
  if (!b) {
    b = theStore().load(theme).then(saved => { const board = new Board(); board.restore(saved); return board; });
    shared.set(theme, b);
  }
  return b;
}
/** 'redis' when the guest book is saved in Key Value, 'memory' when it lives only as long as the server. */
export const keptIn = (): BoardStore['kind'] => theStore().kind;
export const saveNote: BoardStore['addNote'] = (theme, note) => theStore().addNote(theme, note);
export const saveLike: BoardStore['setLike'] = (theme, art, voter, on) => theStore().setLike(theme, art, voter, on);

/** Who a heart belongs to: the browser's own visitor key (hashed), else this connection. */
export function voterOf(visitor: unknown, sessionId: string): string {
  return isOwnerKey(visitor) ? 'v' + createHash('sha256').update(visitor).digest('hex').slice(0, 20) : 's' + sessionId;
}

/** 🛠️ Manager page: every theme's shared wall, and the paintings' titles for the hearts. */
export async function allBoards(): Promise<{ themes: Record<string, BoardSnapshot>; paintings: Record<string, string> }> {
  const themes: Record<string, BoardSnapshot> = {};
  for (const t of THEMES) themes[t] = (await sharedBoard(t)).snapshot();
  return { themes, paintings: Object.fromEntries(GALLERY.items.map(it => [String(it.i), it.title])) };
}
/** 🛠️ Manager page: take a note off a theme's wall, here and in the store. False if there was none. */
export async function takeDown(theme: string, id: string): Promise<boolean> {
  if (!isTheme(theme)) return false;
  const here = (await sharedBoard(theme)).removeNote(id);
  const saved = await theStore().removeNote(theme, id);
  return here || saved;
}

/** Start over as a freshly started server would (tests): forget the loaded boards, maybe use another store. */
export function resetBoards(next?: BoardStore) {
  shared.clear();
  store = next ?? createBoardStore({});
}
