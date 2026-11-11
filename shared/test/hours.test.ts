import { describe, expect, it } from 'vitest';
import { duration, formatHours, hoursLabel, hoursStatus, parseHours, sanitizeHours } from '../src';

/** A moment that is hh:mm on a clock with this UTC offset (minutes). */
const at = (hh: number, mm: number, tz = 540) => Date.UTC(2026, 10, 11, 0, 0) + ((hh * 60 + mm - tz) * 60000);

describe('⏰ work hours', () => {
  it('reads and writes the short form, and refuses nonsense', () => {
    expect(parseHours('0900-1800+540')).toEqual({ start: 540, end: 1080, tz: 540 });
    expect(formatHours({ start: 600, end: 1170, tz: -300 })).toBe('1000-1930-300');
    for (const bad of ['', '9-18', '2500-1800+540', '0900-0900+540', '0900-1800+999', 42, null, '0900-1800+540<script>'])
      expect(parseHours(bad)).toBeNull();
    expect(sanitizeHours('0900-1800+540')).toBe('0900-1800+540');
    expect(sanitizeHours('hello')).toBe('');
  });

  it('shows as a friendly range', () => {
    expect(hoursLabel(parseHours('0900-1800+540')!)).toBe('9:00–18:00');
    expect(hoursLabel(parseHours('2200-0630+540')!)).toBe('22:00–6:30');
  });

  it('during the day: how long until you can go home', () => {
    const h = parseHours('0900-1800+540')!;
    expect(hoursStatus(h, at(17, 20))).toEqual({ state: 'working', text: '퇴근까지 40분 ⏳' });
    expect(hoursStatus(h, at(15, 40)).text).toBe('퇴근까지 2시간 20분 ⏳');
  });

  it('after work: how long you have been free; just before work: coffee time', () => {
    const h = parseHours('0900-1800+540')!;
    expect(hoursStatus(h, at(20, 0))).toEqual({ state: 'off', text: '퇴근 2시간째 🍻' });
    expect(hoursStatus(h, at(20, 5)).text).toBe('퇴근 2시간 5분째 🍻');
    expect(hoursStatus(h, at(18, 30)).text).toBe('퇴근 30분째 🍻');
    expect(hoursStatus(h, at(8, 0))).toEqual({ state: 'before', text: '출근 1시간 전 ☕' });
  });

  it('night shifts wrap around midnight', () => {
    const h = parseHours('2200-0630+540')!;
    expect(hoursStatus(h, at(2, 0)).state).toBe('working');
    expect(hoursStatus(h, at(23, 0)).state).toBe('working');
    expect(hoursStatus(h, at(9, 0)).state).toBe('off');
  });

  it('uses the owner’s clock, not the viewer’s', () => {
    const paris = parseHours('0900-1800+60')!;
    // 21:00 in Seoul is 13:00 in Paris: still at work there
    expect(hoursStatus(paris, at(21, 0, 540)).state).toBe('working');
  });

  it('durations read naturally', () => {
    expect(duration(40)).toBe('40분');
    expect(duration(80)).toBe('1시간 20분');
    expect(duration(120)).toBe('2시간');
    expect(duration(305)).toBe('5시간');
  });
});

import { parseClock, clockLabel, clockedOut } from '../src/hours';
describe('parseClock: a time as people type it', () => {
  it.each([
    ['9', 540], ['18', 1080], ['930', 570], ['0910', 550], ['9:10', 550], ['09:10', 550], ['9.10', 550],
    ['9시', 540], ['9시 30분', 570], ['오후 6시', 1080], ['오전 12시', 0], ['6pm', 1080], [' 18:05 ', 1085], ['0', 0], ['2359', 1439],
  ])('%s → %i', (text, want) => expect(parseClock(text)).toBe(want));
  it.each(['', 'abc', '24', '2460', '9:60', '12345', ':', '9:1:2'])('rejects "%s"', text => expect(parseClock(text)).toBeNull());
  it('labels round-trip', () => { for (const m of [0, 550, 1439]) expect(parseClock(clockLabel(m))).toBe(m); });
});

describe('clockedOut: the moment work ends', () => {
  const h = { start: 540, end: 1080, tz: 540 };
  it('true only across the end of the day', () => {
    expect(clockedOut(h, at(17, 59), at(18, 0))).toBe(true);
    expect(clockedOut(h, at(17, 58), at(17, 59))).toBe(false);
    expect(clockedOut(h, at(18, 0), at(18, 1))).toBe(false);
    expect(clockedOut(h, at(8, 59), at(9, 0))).toBe(false);
  });
  it('works for a night shift and for someone in another time zone', () => {
    expect(clockedOut({ start: 1320, end: 360, tz: 540 }, at(5, 59), at(6, 0))).toBe(true);
    expect(clockedOut({ start: 540, end: 1020, tz: 0 }, at(1, 59), at(2, 0))).toBe(true); // 17:00 in London is 02:00 in Seoul
  });
});
