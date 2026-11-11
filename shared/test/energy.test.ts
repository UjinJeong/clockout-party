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

import { Clinks, CLINK, hasCompany, TOGETHER } from '../src/energy';
describe('짠! clinking glasses', () => {
  const all = () => true;
  it('two cheers close in time clink once; the pair then waits', () => {
    const c = new Clinks();
    expect(c.cheer('a', 0, all)).toEqual([]);
    expect(c.cheer('b', 1, all)).toEqual(['a']);
    expect(c.cheer('a', 2, all)).toEqual([]);               // same pair, too soon
    expect(c.cheer('b', 2 + CLINK.cooldown, all)).toEqual([]); // a's cheer is stale by now
    c.cheer('a', 30, all);
    expect(c.cheer('b', 31, all)).toEqual(['a']);
  });
  it('too late or too far: no clink', () => {
    const c = new Clinks();
    c.cheer('a', 0, all);
    expect(c.cheer('b', CLINK.window + 0.5, all)).toEqual([]);
    c.cheer('a', 10, all);
    expect(c.cheer('b', 11, () => false)).toEqual([]);
  });
  it('a round of three: the third clinks with both', () => {
    const c = new Clinks();
    c.cheer('a', 0, all); c.cheer('b', 0.5, all);
    expect(c.cheer('c', 1, all).sort()).toEqual(['a', 'b']);
  });
});
describe('company on the sofa', () => {
  it('counts someone seated close by, on another seat', () => {
    const me = { x: 0, z: 0, seat: 1 };
    expect(hasCompany(me, [me, { x: 1, z: 0, seat: 2 }])).toBe(true);
    expect(hasCompany(me, [me, { x: 1, z: 0, seat: -1 }])).toBe(false);
    expect(hasCompany(me, [me, { x: TOGETHER.radius + 1, z: 0, seat: 2 }])).toBe(false);
    expect(hasCompany({ x: 0, z: 0, seat: -1 }, [{ x: 1, z: 0, seat: 2 }])).toBe(false);
  });
});
