import { describe, it, expect } from 'vitest';
import { parseTime } from '../src/ui/hoursPicker';

describe('typing your work hours', () => {
  it('any minute works, not just half hours', () => {
    expect(parseTime('09:10')).toBe(550);
    expect(parseTime('9:05')).toBe(545);
    expect(parseTime('23:59')).toBe(1439);
    expect(parseTime('00:00')).toBe(0);
  });
  it('half-typed or impossible times are not accepted', () => {
    for (const bad of ['', '9', '25:00', '12:60', 'abc', '12:3']) expect(parseTime(bad)).toBeNull();
  });
});
