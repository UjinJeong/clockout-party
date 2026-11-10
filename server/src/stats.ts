import { appendFileSync, existsSync, mkdirSync, readFileSync } from 'node:fs';
import { dirname } from 'node:path';

/**
 * Who is at the party, from where, and how busy it has been — for the manager page.
 * Privacy: no IP addresses are kept. "Where" comes from the visitor's own time zone
 * setting (the same one that paints their sky), so it is a region, never an address.
 */

export interface JoinInfo { id: string; name: string; roomId: string; roomTitle: string; isPrivate: boolean; tz?: unknown }
interface Live extends JoinInfo { tz: string | null; joinedAt: number }
interface Done { name: string; roomTitle: string; isPrivate: boolean; tz: string | null; joinedAt: number; leftAt: number }

const REGIONS: Record<string, [string, string]> = {
  'Asia/Seoul': ['대한민국', '서울'], 'Asia/Tokyo': ['일본', '도쿄'], 'Asia/Shanghai': ['중국', '상하이'],
  'Asia/Hong_Kong': ['홍콩', '홍콩'], 'Asia/Taipei': ['대만', '타이베이'], 'Asia/Singapore': ['싱가포르', '싱가포르'],
  'Asia/Bangkok': ['태국', '방콕'], 'Asia/Ho_Chi_Minh': ['베트남', '호찌민'], 'Asia/Manila': ['필리핀', '마닐라'],
  'Asia/Jakarta': ['인도네시아', '자카르타'], 'Asia/Kolkata': ['인도', '콜카타'], 'Asia/Dubai': ['아랍에미리트', '두바이'],
  'Europe/London': ['영국', '런던'], 'Europe/Paris': ['프랑스', '파리'], 'Europe/Berlin': ['독일', '베를린'],
  'Europe/Madrid': ['스페인', '마드리드'], 'Europe/Rome': ['이탈리아', '로마'], 'Europe/Amsterdam': ['네덜란드', '암스테르담'],
  'America/New_York': ['미국', '뉴욕'], 'America/Chicago': ['미국', '시카고'], 'America/Denver': ['미국', '덴버'],
  'America/Los_Angeles': ['미국', '로스앤젤레스'], 'America/Toronto': ['캐나다', '토론토'], 'America/Vancouver': ['캐나다', '밴쿠버'],
  'America/Sao_Paulo': ['브라질', '상파울루'], 'America/Mexico_City': ['멕시코', '멕시코시티'],
  'Australia/Sydney': ['호주', '시드니'], 'Australia/Melbourne': ['호주', '멜버른'], 'Pacific/Auckland': ['뉴질랜드', '오클랜드'],
};
const CONTINENT: Record<string, string> = {
  Asia: '아시아', Europe: '유럽', America: '아메리카', Africa: '아프리카', Australia: '오세아니아', Pacific: '태평양', Atlantic: '대서양', Indian: '인도양',
};
const TZ_RE = /^[A-Za-z]+(\/[A-Za-z0-9_+-]+){1,2}$/;

export function cleanTz(tz: unknown): string | null {
  return typeof tz === 'string' && tz.length <= 64 && TZ_RE.test(tz) ? tz : null;
}

export function regionOf(tz: unknown): { country: string; city: string } {
  const t = cleanTz(tz);
  if (!t) return { country: '알 수 없음', city: '알 수 없음' };
  const known = REGIONS[t];
  if (known) return { country: known[0], city: known[1] };
  const parts = t.split('/');
  return { country: CONTINENT[parts[0]] ?? parts[0], city: parts[parts.length - 1].replace(/_/g, ' ') };
}
const label = (tz: string | null) => { const r = regionOf(tz); return r.country === r.city ? r.country : `${r.country} · ${r.city}`; };

/** Days are counted in the manager's time zone (Korea unless ADMIN_TZ says otherwise). */
const REPORT_TZ = process.env.ADMIN_TZ ?? 'Asia/Seoul';
const dayFmt = new Intl.DateTimeFormat('en-CA', { timeZone: REPORT_TZ, year: 'numeric', month: '2-digit', day: '2-digit' });
const dayKey = (t: number) => dayFmt.format(t);
const DAY = 24 * 3600_000;

export class Stats {
  private live = new Map<string, Live>();
  private done: Done[] = [];
  private peak = { day: '', count: 0 };

  constructor(private file?: string) {
    if (!file || !existsSync(file)) return;
    const cutoff = Date.now() - 31 * DAY;
    for (const line of readFileSync(file, 'utf8').split('\n')) {
      if (!line.trim()) continue;
      try {
        const v = JSON.parse(line) as Done;
        if (typeof v.leftAt === 'number' && v.leftAt > cutoff) this.done.push(v);
      } catch { /* skip a damaged line */ }
    }
  }

  join(info: JoinInfo, now = Date.now()) {
    this.live.set(info.id, { ...info, tz: cleanTz(info.tz), joinedAt: now });
    const day = dayKey(now);
    if (this.peak.day !== day) this.peak = { day, count: 0 };
    this.peak.count = Math.max(this.peak.count, this.live.size);
  }

  leave(id: string, now = Date.now()) {
    const v = this.live.get(id);
    if (!v) return;
    this.live.delete(id);
    const rec: Done = { name: v.name, roomTitle: v.roomTitle, isPrivate: v.isPrivate, tz: v.tz, joinedAt: v.joinedAt, leftAt: now };
    this.done.push(rec);
    if (this.done.length > 20000) this.done.splice(0, this.done.length - 20000);
    if (this.file) {
      try { mkdirSync(dirname(this.file), { recursive: true }); appendFileSync(this.file, JSON.stringify(rec) + '\n'); }
      catch { /* stats are best-effort; the party goes on */ }
    }
  }

  snapshot(now = Date.now()) {
    const today = dayKey(now);
    const live = [...this.live.values()];
    const minutes = (from: number, to: number) => Math.max(0, Math.round((to - from) / 60_000));

    const regions = new Map<string, { country: string; city: string; online: number }>();
    for (const v of live) {
      const r = regionOf(v.tz);
      const k = r.country + r.city;
      regions.set(k, { ...r, online: (regions.get(k)?.online ?? 0) + 1 });
    }

    const doneToday = this.done.filter(d => dayKey(d.joinedAt) === today);
    const startedToday = doneToday.length + live.filter(v => dayKey(v.joinedAt) === today).length;
    const avg = doneToday.length ? doneToday.reduce((n, d) => n + (d.leftAt - d.joinedAt), 0) / doneToday.length / 60_000 : 0;

    const week = Array.from({ length: 7 }, (_, k) => {
      const t = now - (6 - k) * DAY;
      const key = dayKey(t);
      const n = this.done.filter(d => dayKey(d.joinedAt) === key).length + live.filter(v => dayKey(v.joinedAt) === key).length;
      return { day: key.slice(5).replace('-', '/'), visits: n };
    });

    return {
      online: live.length,
      people: live.sort((a, b) => a.joinedAt - b.joinedAt).map(v => ({
        name: v.name, room: v.roomTitle, private: v.isPrivate, region: label(v.tz), minutes: minutes(v.joinedAt, now),
      })),
      byRegion: [...regions.values()].sort((a, b) => b.online - a.online),
      today: {
        visits: startedToday,
        avgMinutes: Math.round(avg),
        peak: this.peak.day === today ? this.peak.count : live.length,
      },
      week,
      recent: this.done.slice(-15).reverse().map(d => ({
        name: d.name, room: d.roomTitle, region: label(d.tz), minutes: minutes(d.joinedAt, d.leftAt), leftAt: d.leftAt,
      })),
      reportTz: REPORT_TZ,
    };
  }
}

/** The one shared tracker. Tests run without a file; the real server keeps server/data/visits.jsonl. */
export const stats = new Stats(process.env.STATS_FILE ?? (process.env.VITEST ? undefined : 'data/visits.jsonl'));
