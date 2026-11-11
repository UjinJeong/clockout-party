/**
 * How the paintings are shown: moving ('live', the living-painting effects and the
 * gentle breathing on the gallery walls) or exactly as painted ('still').
 * One choice for the whole visit, remembered on this device. Devices set to
 * "reduce motion" start with the originals.
 */
export type ArtMotion = 'live' | 'still';
const KEY = 'party.artMotion';
const listeners = new Set<(m: ArtMotion) => void>();

function reduced() {
  try { return typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches; } catch { return false; }
}

export function artMotion(): ArtMotion {
  try {
    const v = localStorage.getItem(KEY);
    if (v === '"live"' || v === 'live') return 'live';
    if (v === '"still"' || v === 'still') return 'still';
  } catch { /* storage blocked: fall through */ }
  return reduced() ? 'still' : 'live';
}

export function setArtMotion(m: ArtMotion) {
  try { localStorage.setItem(KEY, m); } catch { /* not remembered, still applied */ }
  for (const f of listeners) f(m);
}

/** Be told whenever it changes (returns an unsubscribe). */
export function onArtMotion(f: (m: ArtMotion) => void) { listeners.add(f); return () => { listeners.delete(f); }; }
