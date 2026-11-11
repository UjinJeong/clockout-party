import { formatHours, localOffset, parseHours, sanitizeHours } from '@party/shared';
import { load, save } from './dom';

/**
 * ⏰ "출퇴근 시간" picker: two time lists (every 30 minutes) and a show/hide
 * switch. Used on the invitation card and again in the party, from your own
 * name tag. The choice is remembered on this device.
 */
const KEY = 'party.hours';
interface Saved { start: number; end: number; show: boolean }

export function savedHours(): Saved {
  const s = load<Saved>(KEY);
  if (s && Number.isInteger(s.start) && Number.isInteger(s.end) && s.start !== s.end) return { start: s.start, end: s.end, show: s.show !== false };
  return { start: 9 * 60, end: 18 * 60, show: true };
}

/** What gets sent: '0900-1800+540' with this device's offset, or '' when hidden. */
export function hoursValue(s: Saved = savedHours()): string {
  return s.show ? sanitizeHours(formatHours({ start: s.start, end: s.end, tz: localOffset() })) : '';
}

const label = (m: number) => `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`;
const options = (sel: number) => Array.from({ length: 48 }, (_, i) => i * 30)
  .map(m => `<option value="${m}"${m === sel ? ' selected' : ''}>${label(m)}</option>`).join('');

export interface HoursPicker { value(): string; saved(): Saved; dispose(): void }

export function hoursPicker(host: HTMLElement, onChange?: (s: Saved) => void): HoursPicker {
  let s = savedHours();
  host.innerHTML = `<select class="hp-start" aria-label="출근 시간">${options(s.start)}</select>
    <span class="hp-dash" aria-hidden="true">~</span>
    <select class="hp-end" aria-label="퇴근 시간">${options(s.end)}</select>
    <button type="button" class="hp-show" aria-pressed="${s.show}"></button>`;
  const start = host.querySelector<HTMLSelectElement>('.hp-start')!, end = host.querySelector<HTMLSelectElement>('.hp-end')!;
  const show = host.querySelector<HTMLButtonElement>('.hp-show')!;
  const paint = () => {
    show.textContent = s.show ? '👀 보여주기' : '🙈 숨기기';
    show.setAttribute('aria-pressed', String(s.show));
    host.classList.toggle('hidden-hours', !s.show);
  };
  const changed = () => {
    let a = Number(start.value), b = Number(end.value);
    if (a === b) { b = (b + 30) % 1440; end.value = String(b); } // can't start and finish at the same time
    s = { start: a, end: b, show: s.show };
    save(KEY, s); paint(); onChange?.(s);
  };
  const toggle = () => { s = { ...s, show: !s.show }; save(KEY, s); paint(); onChange?.(s); };
  start.addEventListener('change', changed); end.addEventListener('change', changed); show.addEventListener('click', toggle);
  paint();
  return {
    value: () => hoursValue(s),
    saved: () => s,
    dispose() { start.removeEventListener('change', changed); end.removeEventListener('change', changed); show.removeEventListener('click', toggle); },
  };
}

/** For showing someone's hours: '' → null. */
export const readHours = (v: string) => parseHours(v);
