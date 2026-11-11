import { clockLabel, formatHours, localOffset, parseClock, parseHours, sanitizeHours } from '@party/shared';
import { load, save } from './dom';

/**
 * ⏰ "출퇴근 시간" picker: two plain text boxes you type a time into ("9", "930",
 * "09:10" — a real caret, unlike the native time control), and ↑↓ to nudge, and a show/hide switch. Used on the invitation card and again in the party, from your own
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

const label = clockLabel;
/** A typed time → minutes. Forgiving: "9", "930", "9:30", "18시" (see shared parseClock). */
export const parseTime = parseClock;

export interface HoursPicker { value(): string; saved(): Saved; dispose(): void }

export function hoursPicker(host: HTMLElement, onChange?: (s: Saved) => void): HoursPicker {
  let s = savedHours();
  const box = (cls: string, name: string, v: number) =>
    `<input type="text" class="${cls}" aria-label="${name} 시간" value="${label(v)}" inputmode="numeric" maxlength="8" placeholder="${label(v)}" autocomplete="off" spellcheck="false" enterkeyhint="done" />`;
  host.innerHTML = `${box('hp-start', '출근', s.start)}
    <span class="hp-dash" aria-hidden="true">~</span>
    ${box('hp-end', '퇴근', s.end)}
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
    if (a === b) { b = (b + 30) % 1440; if (document.activeElement !== end) end.value = label(b); } // can't start and finish at the same time
    s = { start: a, end: b, show: s.show };
    save(KEY, s); paint(); onChange?.(s);
  };
  const toggle = () => { s = { ...s, show: !s.show }; save(KEY, s); paint(); onChange?.(s); };
  const tidy = () => { start.value = label(s.start); end.value = label(s.end); };  // "930" → "09:30"; nonsense → the last good time
  const keys = (e: KeyboardEvent) => {
    const el = e.target as HTMLInputElement;
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      const now = parseTime(el.value); if (now === null) return;
      e.preventDefault();
      el.value = label((now + (e.key === 'ArrowUp' ? 10 : 1430)) % 1440); changed();
    } else if (e.key === 'Enter') { e.preventDefault(); el.blur(); }  // finish this box, don't send the whole form
  };
  const pickAll = (e: Event) => (e.target as HTMLInputElement).select();
  for (const el of [start, end]) { el.addEventListener('change', changed); el.addEventListener('input', changed); el.addEventListener('blur', tidy); el.addEventListener('keydown', keys); el.addEventListener('focus', pickAll); }
  show.addEventListener('click', toggle);
  paint();
  return {
    value: () => hoursValue(s),
    saved: () => s,
    dispose() { for (const el of [start, end]) { el.removeEventListener('change', changed); el.removeEventListener('input', changed); el.removeEventListener('blur', tidy); el.removeEventListener('keydown', keys); el.removeEventListener('focus', pickAll); } show.removeEventListener('click', toggle); },
  };
}

/** For showing someone's hours: '' → null. */
export const readHours = (v: string) => parseHours(v);
