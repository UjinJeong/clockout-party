import { describe, expect, it } from 'vitest';
import { struck, timeMood } from '../src/game/timeEvents';

const at = (day: number, h: number, m = 0, s = 0) => new Date(2026, 10, 8 + day, h, m, s); // 2026-11-08 is a Sunday

describe('the party follows the clock', () => {
  it('불금 runs from Friday 6pm to Saturday 4am', () => {
    expect(timeMood(at(5, 17, 59)).friday).toBe(false);
    expect(timeMood(at(5, 18)).friday).toBe(true);
    expect(timeMood(at(6, 3, 59)).friday).toBe(true);
    expect(timeMood(at(6, 4)).friday).toBe(false);
    expect(timeMood(at(4, 20)).friday).toBe(false);
  });
  it('late night is midnight to 5am', () => {
    expect(timeMood(at(2, 23, 59)).late).toBe(false);
    expect(timeMood(at(3, 0)).late).toBe(true);
    expect(timeMood(at(3, 5)).late).toBe(false);
  });
  it('the 6pm bell rings once, as the clock passes it', () => {
    expect(struck(at(3, 17, 59, 59), at(3, 18, 0, 0), 18)).toBe(true);
    expect(struck(at(3, 18, 0, 0), at(3, 18, 0, 1), 18)).toBe(false);
    expect(struck(at(3, 17, 0), at(3, 17, 30), 18)).toBe(false);
    expect(struck(at(3, 9, 0), at(3, 19, 0), 18)).toBe(false); // the laptop was asleep: no late bell
  });
});
