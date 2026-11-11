/**
 * Things guests leave behind at a party, for whoever comes next:
 *  - 📝 방명록: one short line each (a post-it on the wall)
 *  - ❤️ a heart on a painting (the gallery), one per guest per painting
 * Kept by the party while it is open. Same rules on the server and in the demo.
 */
export const NOTE_MAX = 60;
export const NOTES_KEPT = 30;
/** Seconds between two notes from the same guest. */
export const NOTE_EVERY = 20;

export interface Note { name: string; text: string; ts: number }
export interface BoardSnapshot { notes: Note[]; likes: Record<string, number> }

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
    const n = { name, text: t, ts };
    this.notes.push(n);
    if (this.notes.length > NOTES_KEPT) this.notes.shift();
    return n;
  }

  /** Heart a painting (or take it back). Returns the new count, or null for a bad key. */
  like(from: string, art: unknown): number | null {
    if (typeof art !== 'string' || !/^[\w-]{1,24}$/.test(art)) return null;
    let s = this.likes.get(art);
    if (!s) this.likes.set(art, s = new Set());
    if (!s.delete(from)) s.add(from);
    return s.size;
  }

  snapshot(): BoardSnapshot {
    const likes: Record<string, number> = {};
    for (const [k, s] of this.likes) if (s.size) likes[k] = s.size;
    return { notes: [...this.notes], likes };
  }
}
