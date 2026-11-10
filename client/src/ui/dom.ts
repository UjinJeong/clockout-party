export const $ = (id: string) => document.getElementById(id)!;

export function load<T>(key: string): T | null {
  try { const v = localStorage.getItem(key); return v ? (JSON.parse(v) as T) : null; } catch { return null; }
}
export function save(key: string, v: unknown) {
  try { localStorage.setItem(key, JSON.stringify(v)); } catch { /* private mode: fine */ }
}

let toastTimer = 0;
export function toast(msg: string, ms = 2400) {
  const t = $('toast');
  t.textContent = msg;
  t.classList.add('on');
  clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => t.classList.remove('on'), ms);
}

export const esc = (s: string) => s.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!));

/**
 * Run `handler` when a form is "sent" — without relying on real form submission.
 *
 * claude.ai shows artifacts in a sandboxed frame without `allow-forms`, where the
 * browser silently drops form submission (no `submit` event at all). So we catch
 * the two things a person actually does: clicking the submit button, and pressing
 * Enter in a field. Both are cancelled so a normal page never submits twice.
 */
export function onSubmit(form: HTMLFormElement, handler: (e: Event) => void): () => void {
  const onClick = (e: MouseEvent) => {
    const b = (e.target as HTMLElement).closest('button, input[type=submit]') as HTMLButtonElement | null;
    if (!b || !form.contains(b) || (b.type !== 'submit')) return;
    e.preventDefault();
    handler(e);
  };
  const onKey = (e: KeyboardEvent) => {
    if (e.key !== 'Enter' || e.isComposing || e.keyCode === 229) return; // Korean IME: wait for the real Enter
    const t = e.target as HTMLElement;
    if (!(t instanceof HTMLInputElement) || t.type === 'button' || t.type === 'submit') return;
    e.preventDefault();
    handler(e);
  };
  const onSub = (e: Event) => { e.preventDefault(); handler(e); };
  form.addEventListener('click', onClick);
  form.addEventListener('keydown', onKey);
  form.addEventListener('submit', onSub);
  return () => {
    form.removeEventListener('click', onClick);
    form.removeEventListener('keydown', onKey);
    form.removeEventListener('submit', onSub);
  };
}
