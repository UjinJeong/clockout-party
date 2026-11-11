import { describe, expect, it } from 'vitest';
import { addColor, removeColor, MY_COLORS_MAX } from '../src/ui/myColors';

describe('내 색: saved colours', () => {
  it('newest first, no repeats', () => {
    let l = addColor([], '#112233'); l = addColor(l, '#AABBCC'); l = addColor(l, '#112233');
    expect(l).toEqual(['#112233', '#aabbcc']);
  });
  it('keeps at most the limit, dropping the oldest', () => {
    let l: string[] = [];
    for (let i = 0; i < MY_COLORS_MAX + 3; i++) l = addColor(l, '#0000' + i.toString(16).padStart(2, '0'));
    expect(l).toHaveLength(MY_COLORS_MAX);
    expect(l).not.toContain('#000000');
  });
  it('ignores things that are not colours, and removes', () => {
    expect(addColor(['#112233'], 'red')).toEqual(['#112233']);
    expect(removeColor(['#112233', '#aabbcc'], '#AABBCC')).toEqual(['#112233']);
  });
});
