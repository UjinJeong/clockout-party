import { describe, expect, it } from 'vitest';
import {
  ENERGY, EMOTES, EMOTE_ICON, MAPS, THEMES, batteryOf, chargeRate, isWalkable, nearSeat, seatsFor, stepEnergy,
} from '../src';

describe('energy', () => {
  it('you arrive tired and it caps at full', () => {
    expect(ENERGY.start).toBeLessThan(ENERGY.low);
    expect(stepEnergy(99, 10, 5)).toBe(ENERGY.max);
    expect(stepEnergy(ENERGY.start, chargeRate('stand', false), 1)).toBeGreaterThan(ENERGY.start);
  });

  it('sitting charges faster than standing, lying faster still, dozing helps', () => {
    expect(chargeRate('sit', false)).toBeGreaterThan(chargeRate('stand', false) * 4);
    expect(chargeRate('lie', false)).toBeGreaterThan(chargeRate('sit', false));
    expect(chargeRate('stand', true)).toBeGreaterThan(chargeRate('stand', false));
    expect(chargeRate('walk', false)).toBeLessThan(chargeRate('stand', false));
  });

  it('a seat fills you up in well under a minute, standing takes minutes', () => {
    const secs = (pose: 'sit' | 'stand') => {
      let e = ENERGY.start, t = 0;
      while (e < ENERGY.max && t < 1000) { e = stepEnergy(e, chargeRate(pose, false), 1); t++; }
      return t;
    };
    expect(secs('sit')).toBeLessThan(60);
    expect(secs('sit')).toBeGreaterThan(20);
    expect(secs('stand')).toBeGreaterThan(150);
  });

  it('battery icon follows the energy', () => {
    expect(batteryOf(10)).toBe('low');
    expect(batteryOf(80)).toBe('charging');
  });
});

describe.each(THEMES)('%s seats', theme => {
  const map = MAPS[theme];
  const seats = seatsFor(map);

  it('has somewhere to sit', () => expect(seats.length).toBeGreaterThanOrEqual(3));

  it('every seat has an open spot to stand up to, right next to it', () => {
    for (const s of seats) {
      expect(isWalkable(s.stand, map), `${theme} seat ${s.id} stand ${JSON.stringify(s.stand)}`).toBe(true);
      expect(Math.hypot(s.stand.x - s.x, s.stand.z - s.z)).toBeLessThan(1.6);
    }
  });

  it('seats are found from where you stand, and not from across the room', () => {
    for (const s of seats) {
      expect(nearSeat(seats, s.stand)?.id).toBeDefined();
      expect(nearSeat(seats, { x: s.x + 6, z: s.z + 6 })?.id).not.toBe(s.id);
    }
  });

  it('seat ids are unique', () => expect(new Set(seats.map(s => s.id)).size).toBe(seats.length));
});

describe('low-energy reactions', () => {
  it('can nod along or zone out together', () => {
    expect(EMOTES).toContain('nod');
    expect(EMOTES).toContain('zone');
    expect(EMOTE_ICON.nod).toBeTruthy();
    expect(EMOTE_ICON.zone).toBeTruthy();
  });
});

describe('오늘 하루 어땠어요?', () => {
  it('four moods, each with a face, a word, and how much energy you arrive with', async () => {
    const { MOODS, MOOD_ICON, MOOD_LABEL, MOOD_ENERGY, isMood } = await import('../src');
    expect(MOODS).toEqual(['drained', 'meh', 'sleepy', 'hyped']);
    for (const m of MOODS) { expect(MOOD_ICON[m]).toBeTruthy(); expect(MOOD_LABEL[m]).toBeTruthy(); }
    expect(MOOD_ENERGY.drained).toBeLessThan(MOOD_ENERGY.meh);
    expect(MOOD_ENERGY.hyped).toBeGreaterThan(ENERGY.low);
    expect(isMood('hyped')).toBe(true);
    expect(isMood('angry')).toBe(false);
  });
});
