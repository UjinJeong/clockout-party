import { describe, expect, it } from 'vitest';
import { byeLines } from '../src/ui/hud';

describe('the goodbye card', () => {
  it('says how long, how charged, and how many reactions', () => {
    expect(byeLines({ ms: 23 * 60000, from: 20, to: 87, sent: 3, got: 5 })).toEqual(['⏱ 머문 시간 23분', '🔋 충전 20% → 87%', '🥂 받은 반응 5번 · 보낸 반응 3번']);
  });
  it('short, quiet visits read kindly too', () => {
    expect(byeLines({ ms: 5000, from: -1, to: 0, sent: 0, got: 0 })).toEqual(['⏱ 머문 시간 1분', '🫥 조용히 쉬다 가요']);
    expect(byeLines({ ms: 125 * 60000, from: 90, to: 90, sent: 0, got: 1 })[0]).toBe('⏱ 머문 시간 2시간 5분');
  });
});
