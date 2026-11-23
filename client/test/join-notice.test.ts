import { describe, expect, it } from 'vitest';
import { joinNotice } from '../src/game/party';

describe('someone came in', () => {
  it('a guest who walks in after you is announced', () => {
    expect(joinNotice({ id: 'b', name: '토끼', bot: false }, 'a', true)).toBe('🛗 토끼님이 들어왔어요');
  });
  it('not you, not the people already here when you arrived, not the bots', () => {
    expect(joinNotice({ id: 'a', name: '나', bot: false }, 'a', true)).toBeNull();
    expect(joinNotice({ id: 'b', name: '토끼', bot: false }, 'a', false)).toBeNull();
    expect(joinNotice({ id: 'c', name: '여우 🤖', bot: true }, 'a', true)).toBeNull();
  });
});
