import { describe, expect, it } from 'vitest';
import { forTouch } from '../src/living/touchWords';

describe('painting tips on a touch screen say finger, not cursor', () => {
  it('swaps the word and fixes the particle after it', () => {
    expect(forTouch('커서를 얼음 가까이 대면 더 빨리 녹아요.')).toBe('손가락을 얼음 가까이 대면 더 빨리 녹아요.');
    expect(forTouch('커서가 조명이에요.')).toBe('손가락이 조명이에요.');
    expect(forTouch('커서로 얼굴을 비춰 보세요.')).toBe('손가락으로 얼굴을 비춰 보세요.');
    expect(forTouch('커서가 있는 곳에서 빛의 파동이 퍼져요.')).toBe('손가락이 있는 곳에서 빛의 파동이 퍼져요.');
    expect(forTouch('커서는 조명')).toBe('손가락은 조명');
    expect(forTouch('커서와 함께')).toBe('손가락과 함께');
  });
  it('"move the cursor" becomes "drag your finger"', () => {
    expect(forTouch('커서를 움직이면 눈동자가 따라와요.')).toBe('손가락으로 그림을 쓸면 눈동자가 따라와요.');
    expect(forTouch('커서를 빠르게 휘저으면 바람이 불어요.')).toBe('손가락으로 빠르게 휘저으면 바람이 불어요.');
  });
  it('leaves other text alone', () => {
    expect(forTouch('그림을 누르면 시간이 흘러가요.')).toBe('그림을 누르면 시간이 흘러가요.');
  });
});
