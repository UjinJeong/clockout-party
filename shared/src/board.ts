/**
 * Things guests leave behind at a party, for whoever comes next:
 *  - 📝 방명록: one short line each (a post-it on the wall)
 *  - ❤️ a heart on a painting (the gallery), one per guest per painting
 * The server keeps one per theme for its public parties (saved, so it outlives restarts) and
 * one per friends-only party. Same rules on the server and in the demo.
 */
export const NOTE_MAX = 60;
export const NOTES_KEPT = 30;
/** Seconds between two notes from the same guest. */
export const NOTE_EVERY = 20;

export interface Note { name: string; text: string; ts: number; /** so the manager page can take one down */ id?: string }
/** A note's id: worked out from the note itself, so a note saved before ids existed gets the same one. */
export function noteId(n: Pick<Note, 'name' | 'text' | 'ts'>): string {
  let h = 2166136261;
  for (const ch of `${n.ts}|${n.name}|${n.text}`) { h ^= ch.codePointAt(0)!; h = Math.imul(h, 16777619) >>> 0; }
  return n.ts.toString(36) + h.toString(36);
}
export interface BoardSnapshot { notes: Note[]; likes: Record<string, number> }
/** What is saved: the notes, and who hearted each painting (visitor ids, not counts). */
export interface BoardSaved { notes: Note[]; voters: Record<string, string[]> }
const ART_KEY = /^[\w-]{1,24}$/;

export const sanitizeNote = (v: unknown): string =>
  typeof v === 'string' ? v.replace(/[\u0000-\u001f\u007f]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, NOTE_MAX) : '';

export class Board {
  private notes: Note[] = [];
  private likes = new Map<string, Set<string>>();
  private lastNote = new Map<string, number>();

  /** Leave a line. Returns it, or null (empty, or too soon after your last one). `ts` in ms. */
  note(from: string, name: string, text: unknown, ts: number): Note | null {
    const t = sanitizeNote(text);
    if (!t || ts - (this.lastNote.get(from) ?? -Infinity) < NOTE_EVERY * 1000) return null;
    this.lastNote.set(from, ts);
    const n: Note = { name, text: t, ts };
    n.id = noteId(n);
    this.notes.push(n);
    if (this.notes.length > NOTES_KEPT) this.notes.shift();
    return n;
  }

  /** Heart a painting (or take it back). Returns the new count and whether it is now on, or null for a bad key. */
  toggleLike(from: string, art: unknown): { n: number; on: boolean } | null {
    if (typeof art !== 'string' || !ART_KEY.test(art)) return null;
    let s = this.likes.get(art);
    if (!s) this.likes.set(art, s = new Set());
    const on = !s.delete(from);
    if (on) s.add(from);
    return { n: s.size, on };
  }
  /** Heart a painting (or take it back). Returns the new count, or null for a bad key. */
  like(from: string, art: unknown): number | null {
    return this.toggleLike(from, art)?.n ?? null;
  }

  /** Put back what was saved (anything malformed is left out). */
  restore(saved: BoardSaved) {
    const ok = (n: unknown): n is Note => !!n && typeof (n as Note).name === 'string' && typeof (n as Note).text === 'string' && typeof (n as Note).ts === 'number';
    this.notes = (Array.isArray(saved.notes) ? saved.notes.filter(ok) : []).slice(-NOTES_KEPT).map(n => ({ name: n.name, text: n.text, ts: n.ts, id: noteId(n) }));
    this.likes.clear();
    for (const [art, who] of Object.entries(saved.voters ?? {})) {
      if (ART_KEY.test(art) && Array.isArray(who)) this.likes.set(art, new Set(who.filter(w => typeof w === 'string')));
    }
  }

  /** Take a note down (the manager page). True if it was there. */
  removeNote(id: string): boolean {
    const k = this.notes.findIndex(n => n.id === id);
    if (k < 0) return false;
    this.notes.splice(k, 1);
    return true;
  }

  snapshot(): BoardSnapshot {
    const likes: Record<string, number> = {};
    for (const [k, s] of this.likes) if (s.size) likes[k] = s.size;
    return { notes: [...this.notes], likes };
  }
}
