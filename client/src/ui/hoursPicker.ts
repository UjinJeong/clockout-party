import { formatHours, localOffset, parseHours, sanitizeHours } from '@party/shared';
import { load, save } from './dom';

/**
 * ⏰ "출퇴근 시간" picker: two time boxes you can type into (any minute, e.g.
 * 09:10) or pick from, and a show/hide switch. Used on the invitation card and again in the party, from your own
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
/** "09:10" → 550. Anything that isn't a time → null. */
export function parseTime(v: string): number | null {
  const m = /^(\d{1,2}):(\d{2})$/.exec(v.trim());
  if (!m) return null;
  const h = Number(m[1]), min = Number(m[2]);
  return h < 24 && min < 60 ? h * 60 + min : null;
}

export interface HoursPicker { value(): string; saved(): Saved; dispose(): void }

export function hoursPicker(host: HTMLElement, onChange?: (s: Saved) => void): HoursPicker {
  let s = savedHours();
  host.innerHTML = `<input type="time" class="hp-start" aria-label="출근 시간" value="${label(s.start)}" required />
    <span class="hp-dash" aria-hidden="true">~</span>
    <input type="time" class="hp-end" aria-label="퇴근 시간" value="${label(s.end)}" required />
    <button type="button" class="hp-show" aria-pressed="${s.show}"></button>`;
  const start = host.querySelector<HTMLInputElement>('.hp-start')!, end = host.querySelector<HTMLInputElement>('.hp-end')!;
  const show = host.querySelector<HTMLButtonElement>('.hp-show')!;
  const paint = () => {
    show.textContent = s.show ? '👀 보여주기' : '🙈 숨기기';
    show.setAttribute('aria-pressed', String(s.show));
    host.classList.toggle('hidden-hours', !s.show);
  };
  const changed = () => {
    const a = parseTime(start.value);
    let b = parseTime(end.value);
    if (a === null || b === null) return;               // half-typed: wait for a whole time
    if (a === b) { b = (b + 30) % 1440; end.value = label(b); } // can't start and finish at the same time
    s = { start: a, end: b, show: s.show };
    save(KEY, s); paint(); onChange?.(s);
  };
  const toggle = () => { s = { ...s, show: !s.show }; save(KEY, s); paint(); onChange?.(s); };
  const tidy = () => { if (parseTime(start.value) === null) start.value = label(s.start); if (parseTime(end.value) === null) end.value = label(s.end); };
  for (const el of [start, end]) { el.addEventListener('change', changed); el.addEventListener('input', changed); el.addEventListener('blur', tidy); }
  show.addEventListener('click', toggle);
  paint();
  return {
    value: () => hoursValue(s),
    saved: () => s,
    dispose() { for (const el of [start, end]) { el.removeEventListener('change', changed); el.removeEventListener('input', changed); el.removeEventListener('blur', tidy); } show.removeEventListener('click', toggle); },
  };
}

/** For showing someone's hours: '' → null. */
export const readHours = (v: string) => parseHours(v);
