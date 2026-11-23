import GALLERY from '../world/gallery.json';

/**
 * Fixed answers from the docent, keyed by artwork id, one per question in QUESTIONS
 * (shared DOCENT_QUESTIONS), in the same order. They live in gallery.json with the
 * rest of each painting's words, so the manager page can edit them.
 */
export const ANSWERS: Record<number, string[]> = Object.fromEntries(
  (GALLERY as { i: number; answers: string[] }[]).map(a => [a.i, a.answers]),
);
