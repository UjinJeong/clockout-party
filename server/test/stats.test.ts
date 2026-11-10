import { describe, it, expect } from 'vitest';
import { mkdtempSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { Stats, regionOf } from '../src/stats';

const H = 3600_000;

describe('regionOf', () => {
  it('names common time zones in Korean', () => {
    expect(regionOf('Asia/Seoul')).toEqual({ country: '대한민국', city: '서울' });
    expect(regionOf('America/New_York').country).toBe('미국');
  });
  it('falls back to the city part, and to 알 수 없음', () => {
    expect(regionOf('Europe/Lisbon').city).toBe('Lisbon');
    expect(regionOf(undefined).country).toBe('알 수 없음');
    expect(regionOf('<script>').country).toBe('알 수 없음');
  });
});

describe('Stats', () => {
  const base = Date.UTC(2026, 10, 10, 3); // 12:00 in Seoul
  it('counts who is online, by region and room', () => {
    const s = new Stats();
    s.join({ id: 'a', name: '유진', roomId: 'r1', roomTitle: '금요일', isPrivate: false, tz: 'Asia/Seoul' }, base);
    s.join({ id: 'b', name: '민지', roomId: 'r1', roomTitle: '금요일', isPrivate: false, tz: 'America/New_York' }, base);
    s.join({ id: 'c', name: '하루', roomId: 'r2', roomTitle: '비밀', isPrivate: true, tz: 'Asia/Seoul' }, base);
    const snap = s.snapshot(base + 60_000);
    expect(snap.online).toBe(3);
    expect(snap.byRegion[0]).toEqual({ country: '대한민국', city: '서울', online: 2 });
    expect(snap.people.find(p => p.name === '민지')!.region).toBe('미국 · 뉴욕');
  });
  it('records a finished visit with its length', () => {
    const s = new Stats();
    s.join({ id: 'a', name: '유진', roomId: 'r1', roomTitle: 'x', isPrivate: false, tz: 'Asia/Seoul' }, base);
    s.leave('a', base + 30 * 60_000);
    const snap = s.snapshot(base + H);
    expect(snap.online).toBe(0);
    expect(snap.today.visits).toBe(1);
    expect(snap.today.avgMinutes).toBe(30);
  });
  it('remembers the busiest moment today', () => {
    const s = new Stats();
    for (const id of ['a', 'b', 'c']) s.join({ id, name: id, roomId: 'r', roomTitle: 'x', isPrivate: false, tz: 'Asia/Seoul' }, base);
    s.leave('a', base + 1000); s.leave('b', base + 2000);
    expect(s.snapshot(base + 3000).today.peak).toBe(3);
  });
  it('keeps the last 7 days of visits per day', () => {
    const s = new Stats();
    s.join({ id: 'old', name: 'x', roomId: 'r', roomTitle: 'x', isPrivate: false, tz: 'Asia/Seoul' }, base - 2 * 24 * H);
    s.leave('old', base - 2 * 24 * H + 1000);
    const days = s.snapshot(base).week;
    expect(days).toHaveLength(7);
    expect(days.reduce((n, d) => n + d.visits, 0)).toBe(1);
  });
  it('saves finished visits to a file and reads them back after a restart', () => {
    const file = join(mkdtempSync(join(tmpdir(), 'party-')), 'visits.jsonl');
    const s = new Stats(file);
    s.join({ id: 'a', name: '유진', roomId: 'r', roomTitle: 'x', isPrivate: false, tz: 'Asia/Seoul' }, base);
    s.leave('a', base + 60_000);
    expect(readFileSync(file, 'utf8')).toContain('"name":"유진"');
    expect(new Stats(file).snapshot(base + 120_000).today.visits).toBe(1);
  });
});
