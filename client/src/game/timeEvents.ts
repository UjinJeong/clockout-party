/**
 * The party follows the clock on your own device:
 *  - 18:00 sharp: the 퇴근 bell
 *  - Friday 18:00 → Saturday 04:00: 불금 (confetti drifts down now and then)
 *  - 00:00 → 05:00: the lights go low, and a reminder about the last train
 */
export interface TimeMood { friday: boolean; late: boolean }

export function timeMood(d: Date): TimeMood {
  const day = d.getDay(), h = d.getHours();
  return { friday: (day === 5 && h >= 18) || (day === 6 && h < 4), late: h < 5 };
}

/** Did the clock pass hh:00 between these two moments (same day, less than a few minutes apart)? */
export function struck(prev: Date, now: Date, hour: number): boolean {
  if (now.getTime() - prev.getTime() > 5 * 60000 || now <= prev) return false;
  const at = new Date(now); at.setHours(hour, 0, 0, 0);
  return prev < at && now >= at;
}
