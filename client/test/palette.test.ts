import { describe, expect, it } from 'vitest';
import { hexToHsv, hsvToHex } from '../src/ui/palette';

describe('palette maths', () => {
  it('hue, colourfulness and brightness turn into the right colour', () => {
    expect(hsvToHex(0, 1, 1)).toBe('#ff0000');
    expect(hsvToHex(120, 1, 1)).toBe('#00ff00');
    expect(hsvToHex(240, 1, 1)).toBe('#0000ff');
    expect(hsvToHex(0, 0, 1)).toBe('#ffffff');
    expect(hsvToHex(200, 0, 0.5)).toBe('#808080');
    expect(hsvToHex(360, 1, 1)).toBe('#ff0000');
  });

  it('and back again, so reopening the palette starts where you left off', () => {
    for (const hex of ['#2a9d8f', '#e76f51', '#f4a261', '#264653', '#c98b5a', '#ffffff']) {
      const { h, s, v } = hexToHsv(hex);
      expect(hsvToHex(h, s, v)).toBe(hex);
    }
  });
});

describe('the palette panel', () => {
  it('dragging across the square and the hue bar picks colours', async () => {
    const { Palette } = await import('../src/ui/palette');
    const host = fakeEl();
    const picked: string[] = [];
    const p = new Palette(host as any, '#ff0000', hex => picked.push(hex));
    p.pickSV(1, 0);          // top right: full colour, full brightness
    expect(picked.at(-1)).toBe('#ff0000');
    p.pickSV(0, 0);          // top left: no colour → white
    expect(picked.at(-1)).toBe('#ffffff');
    p.pickSV(1, 0);
    p.pickHue(1 / 3);        // a third along the bar → green
    expect(picked.at(-1)).toBe('#00ff00');
    p.pickSV(1, 1);          // bottom: darkest allowed, never pitch black
    expect(picked.at(-1)).not.toBe('#000000');
  });
});

function fakeEl(): any {
  const el: any = {
    style: { setProperty() {} }, dataset: {}, innerHTML: '', hidden: true,
    querySelector: () => fakeChild(), addEventListener() {}, removeEventListener() {},
  };
  return el;
}
function fakeChild(): any {
  return { style: { setProperty() {}, left: '', top: '' }, textContent: '', addEventListener() {}, getBoundingClientRect: () => ({ left: 0, top: 0, width: 100, height: 100 }) };
}
