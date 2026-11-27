import { isOwnerKey } from '@party/shared';

/** ❤️ A random key kept on this device, so a heart on a painting counts once per visitor, also on a later visit. */
const VISITOR = 'party.visitor';
type Store = Pick<Storage, 'getItem' | 'setItem'> | null;

export function visitorKey(store: Store = typeof localStorage === 'undefined' ? null : localStorage): string {
  try {
    const kept = store?.getItem(VISITOR);
    if (isOwnerKey(kept)) return kept;
  } catch { /* storage blocked: a key for this visit only */ }
  const b = new Uint8Array(18); crypto.getRandomValues(b);
  const key = btoa(String.fromCharCode(...b)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  try { store?.setItem(VISITOR, key); } catch { /* same */ }
  return key;
}
