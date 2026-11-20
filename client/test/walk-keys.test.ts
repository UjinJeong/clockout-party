import { describe, expect, it, vi } from 'vitest';

vi.stubGlobal('addEventListener', () => {});
const { walkKey } = await import('../src/game/controls');

describe('walking keys', () => {
  it('arrows and W A S D', () => {
    expect(['ArrowUp', 'KeyW', 'ArrowLeft', 'KeyA', 'ArrowDown', 'KeyS', 'ArrowRight', 'KeyD'].map(code => walkKey({ code })))
      .toEqual(['up', 'up', 'left', 'left', 'down', 'down', 'right', 'right']);
  });
  it('W A S D still walk with Korean input on (the letters arrive as ㅈ ㅁ ㄴ ㅇ, or as "Process")', () => {
    expect(walkKey({ code: 'KeyW', key: 'ㅈ' })).toBe('up');
    expect(walkKey({ code: 'KeyA', key: 'Process' })).toBe('left');
    expect(walkKey({ code: '', key: 'ㄴ' })).toBe('down');
    expect(walkKey({ key: 'ㅇ' })).toBe('right');
  });
  it('other keys do nothing', () => {
    expect(walkKey({ code: 'KeyQ', key: 'q' })).toBeNull();
    expect(walkKey({ code: 'Enter', key: 'Enter' })).toBeNull();
  });
});
