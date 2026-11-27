import { createClient } from 'redis';
import { NOTES_KEPT, type BoardSaved, type Note } from '@party/shared';

/**
 * Where the guest book and the hearts on paintings are kept between restarts.
 *  - With REDIS_URL (Render Key Value): saved there, so a redeploy or a sleep doesn't wipe them.
 *  - Without it (development, tests, the demo): only in memory, as before.
 * Saving never holds up a party: a failure is logged once and the party goes on from memory.
 *
 * Keys (prefix "party:"):
 *   notes:{theme}          the newest NOTES_KEPT notes, newest first (JSON)
 *   likes:{theme}          the paintings that have hearts
 *   likes:{theme}:{art}    who hearted that painting (visitor ids)
 */
export interface BoardStore {
  kind: 'memory' | 'redis';
  load(theme: string): Promise<BoardSaved>;
  addNote(theme: string, note: Note): Promise<void>;
  setLike(theme: string, art: string, voter: string, on: boolean): Promise<void>;
  close(): Promise<void>;
}
export interface StoreOptions { url?: string; prefix?: string }

const empty = (): BoardSaved => ({ notes: [], voters: {} });

function memoryStore(): BoardStore {
  const notes = new Map<string, Note[]>(), likes = new Map<string, Map<string, Set<string>>>();
  return {
    kind: 'memory',
    async load(theme) {
      const voters: Record<string, string[]> = {};
      for (const [art, who] of likes.get(theme) ?? []) if (who.size) voters[art] = [...who];
      return { notes: [...(notes.get(theme) ?? [])], voters };
    },
    async addNote(theme, note) {
      const list = notes.get(theme) ?? [];
      list.push(note);
      notes.set(theme, list.slice(-NOTES_KEPT));
    },
    async setLike(theme, art, voter, on) {
      let t = likes.get(theme);
      if (!t) likes.set(theme, t = new Map());
      let who = t.get(art);
      if (!who) t.set(art, who = new Set());
      if (on) who.add(voter); else who.delete(voter);
    },
    async close() {},
  };
}

function redisStore(url: string, prefix: string): BoardStore {
  const client = createClient({ url, disableOfflineQueue: true, socket: { connectTimeout: 3000, reconnectStrategy: n => Math.min(n * 500, 10_000) } });
  let warned = false;
  const warn = (what: string, e: unknown) => {
    if (warned) return;
    warned = true;
    console.error(`[board] Key Value ${what} failed (${(e as Error)?.message ?? e}); the party keeps going from memory.`);
  };
  client.on('error', e => warn('connection', e));
  // connect in the background; it keeps retrying on its own if the store is down
  client.connect().catch(e => warn('connection', e));
  /** Wait a little for the store to come up (saving is fire-and-forget, so a short wait holds nobody up). */
  const whenReady = (ms: number) => client.isReady ? Promise.resolve(true) : new Promise<boolean>(res => {
    const t = setTimeout(() => { client.off('ready', on); res(false); }, ms);
    const on = () => { clearTimeout(t); res(true); };
    client.once('ready', on);
  });
  const k = (...parts: string[]) => prefix + parts.join(':');
  /** Run a command, never letting a broken store stop the party. */
  async function safe<T>(what: string, fallback: T, run: () => Promise<T>, wait = 0): Promise<T> {
    try {
      if (!(await whenReady(wait))) throw new Error('not connected');
      return await run();
    } catch (e) { warn(what, e); return fallback; }
  }
  return {
    kind: 'redis',
    load: theme => safe('reading', empty(), async () => {
      const raw = await client.lRange(k('notes', theme), 0, NOTES_KEPT - 1);
      const notes = raw.map(s => { try { return JSON.parse(s) as Note; } catch { return null; } }).filter((n): n is Note => !!n).reverse();
      const voters: Record<string, string[]> = {};
      for (const art of await client.sMembers(k('likes', theme))) {
        const who = await client.sMembers(k('likes', theme, art));
        if (who.length) voters[art] = who;
      }
      return { notes, voters };
    }, 3000),
    addNote: (theme, note) => safe('saving a note', undefined, async () => {
      await client.multi().lPush(k('notes', theme), JSON.stringify(note)).lTrim(k('notes', theme), 0, NOTES_KEPT - 1).exec();
    }, 1500),
    setLike: (theme, art, voter, on) => safe('saving a heart', undefined, async () => {
      if (on) await client.multi().sAdd(k('likes', theme, art), voter).sAdd(k('likes', theme), art).exec();
      else await client.sRem(k('likes', theme, art), voter);
    }, 1500),
    async close() { try { client.destroy(); } catch { /* already gone */ } },
  };
}

export function createBoardStore(o: StoreOptions = {}): BoardStore {
  return o.url ? redisStore(o.url, o.prefix ?? 'party:') : memoryStore();
}
