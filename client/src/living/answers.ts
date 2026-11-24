import { GALLERY } from '@party/shared';

/**
 * Fixed answers from the docent, keyed by artwork id, one per question in QUESTIONS
 * (shared DOCENT_QUESTIONS), in the same order. They live in the gallery file (shared/src/gallery.json) with the
 * rest of each painting's words, so the manager page can edit them.
 */
export const ANSWERS: Record<number, string[]> = Object.fromEntries(
  GALLERY.items.map(a => [a.i, a.answers]),
);
