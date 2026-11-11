/**
 * ⏰ Work hours over your head: "9:00–18:00 · 퇴근 2시간째 🍻".
 * Sent as one short string, "0900-1800+540" — start and end on the owner's own
 * clock, plus their UTC offset in minutes — so everyone sees the status as it
 * is where *they* are (it's after work in Seoul even if you're in Paris).
 * An empty string means "not sharing".
 */
export interface WorkHours { start: number; end: number; tz: number } // minutes after midnight; offset in minutes

const RE = /^(\d{2})(\d{2})-(\d{2})(\d{2})([+-]\d{1,3})$/;

export function parseHours(v: unknown): WorkHours | null {
  if (typeof v !== 'string' || v.length > 16) return null;
  const m = RE.exec(v);
  if (!m) return null;
  const [sh, sm, eh, em] = [m[1], m[2], m[3], m[4]].map(Number);
  const tz = Number(m[5]);
  if (sh > 23 || eh > 23 || sm > 59 || em > 59 || tz < -720 || tz > 840) return null;
  const start = sh * 60 + sm, end = eh * 60 + em;
  if (start === end) return null;
  return { start, end, tz };
}

const two = (n: number) => String(n).padStart(2, '0');
export function formatHours(h: WorkHours): string {
  return `${two(Math.floor(h.start / 60))}${two(h.start % 60)}-${two(Math.floor(h.end / 60))}${two(h.end % 60)}${h.tz >= 0 ? '+' : '-'}${Math.abs(h.tz)}`;
}

/** Anything → a clean hours string, or '' (not sharing). */
export const sanitizeHours = (v: unknown): string => { const h = parseHours(v); return h ? formatHours(h) : ''; };

const clock = (m: number) => `${Math.floor(m / 60)}:${two(m % 60)}`;
/** "9:00–18:00" */
export const hoursLabel = (h: WorkHours) => `${clock(h.start)}–${clock(h.end)}`;

/** "40분", "1시간 20분", "5시간" */
export function duration(min: number): string {
  if (min < 60) return `${Math.max(1, min)}분`;
  const h = Math.floor(min / 60), m = min % 60;
  return h < 3 && m ? `${h}시간 ${m}분` : `${h}시간`;
}

export type WorkState = 'before' | 'working' | 'off';

/** Where the owner is in their day right now (by their own clock). */
export function hoursStatus(h: WorkHours, nowMs: number): { state: WorkState; text: string } {
  const local = ((Math.floor(nowMs / 60000) + h.tz) % 1440 + 1440) % 1440;
  const mod = (n: number) => ((n % 1440) + 1440) % 1440;
  const working = h.start < h.end ? local >= h.start && local < h.end : local >= h.start || local < h.end;
  if (working) return { state: 'working', text: `퇴근까지 ${duration(mod(h.end - local))} ⏳` };
  const toStart = mod(h.start - local);
  if (toStart <= 90) return { state: 'before', text: `출근 ${duration(toStart)} 전 ☕` };
  return { state: 'off', text: `퇴근 ${duration(mod(local - h.end))}째 🍻` };
}

/** This device's UTC offset in minutes (Seoul: +540). */
export const localOffset = (d = new Date()) => -d.getTimezoneOffset();

/**
 * A time as people type it → minutes since midnight, or null.
 * "9", "18", "930", "0910", "9:10", "9.10", "9시 30분", "오후 6시", "6pm" all work.
 */
export function parseClock(text: string): number | null {
  let v = text.trim().toLowerCase();
  if (!v) return null;
  const pm = /오후|pm|p\.m\./.test(v), am = /오전|am|a\.m\./.test(v);
  v = v.replace(/오전|오후|[ap]\.?m\.?/g, '').replace(/시/g, ':').replace(/분/g, '').replace(/[.:\s]+/g, ':').replace(/^:+|:+$/g, '');
  let h: number, min: number;
  let m = /^(\d{1,2}):(\d{1,2})$/.exec(v);
  if (m) { h = Number(m[1]); min = Number(m[2]); }
  else if ((m = /^(\d{1,2})$/.exec(v))) { h = Number(m[1]); min = 0; }
  else if ((m = /^(\d{1,2})(\d{2})$/.exec(v))) { h = Number(m[1]); min = Number(m[2]); }
  else return null;
  if (pm && h < 12) h += 12;
  if (am && h === 12) h = 0;
  return h < 24 && min < 60 ? h * 60 + min : null;
}

/** Minutes since midnight → "09:10". */
export const clockLabel = (m: number) => `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`;
