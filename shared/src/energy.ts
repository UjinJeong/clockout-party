import type { Battery } from './constants';
import type { Vec2, WorldMap } from './world';

/**
 * 퇴근 → 충전. Everyone arrives tired (energy 20) and recharges just by being
 * at the party: slowly on your feet, much faster sitting down, fastest lying
 * on a lounger, and a little extra while you doze off. The server keeps the
 * real number; clients only draw it.
 */
export const ENERGY: { readonly start: number; readonly max: number; readonly low: number } = { start: 20, max: 100, low: 35 };
/** Standing still this long without doing anything and you start to nod off. */
export const DOZE_AFTER = 30;

export type Pose = 'walk' | 'stand' | 'sit' | 'lie';
const RATE: Record<Pose, number> = { walk: 0.15, stand: 0.35, sit: 2.2, lie: 3.0 };
const DOZE_BONUS = 0.8;

/** Energy per second for a pose. */
export function chargeRate(pose: Pose, dozing: boolean): number {
  return RATE[pose] + (dozing ? (pose === 'sit' || pose === 'lie' ? DOZE_BONUS * 0.4 : DOZE_BONUS) : 0);
}

export function stepEnergy(energy: number, rate: number, dt: number): number {
  return Math.min(ENERGY.max, Math.max(0, energy + rate * dt));
}

export const batteryOf = (energy: number): Battery => (energy < ENERGY.low ? 'low' : 'charging');

/** A place to sit (or lie). `dir` is the way you face; `stand` is open floor to get up onto. */
export interface Seat { id: number; x: number; z: number; y: number; dir: number; pose: 'sit' | 'lie'; stand: Vec2 }

export const seatsFor = (map: WorldMap): Seat[] => map.seats;

/** The seat whose standing spot is closest to p, if one is close enough to sit down from. */
export function nearSeat(seats: Seat[], p: Vec2, within = 1.4): Seat | null {
  let best: Seat | null = null, bestD = within;
  for (const s of seats) {
    const d = Math.min(Math.hypot(s.stand.x - p.x, s.stand.z - p.z), Math.hypot(s.x - p.x, s.z - p.z) - 0.2);
    if (d < bestD) { bestD = d; best = s; }
  }
  return best;
}

/** "오늘 하루 어땠어요?" — asked once on arrival; it decides how charged you walk in. */
export const MOODS = ['drained', 'meh', 'sleepy', 'hyped'] as const;
export type Mood = (typeof MOODS)[number];
export const MOOD_ICON: Record<Mood, string> = { drained: '😵', meh: '🙂', sleepy: '😴', hyped: '🥳' };
export const MOOD_LABEL: Record<Mood, string> = { drained: '녹초', meh: '그럭저럭', sleepy: '졸려', hyped: '신나!' };
export const MOOD_ENERGY: Record<Mood, number> = { drained: 10, meh: 25, sleepy: 15, hyped: 50 };
export const isMood = (v: unknown): v is Mood => (MOODS as readonly unknown[]).includes(v);
