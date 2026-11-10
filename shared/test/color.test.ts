import { describe, expect, it } from 'vitest';
import { PALETTE, colorHex, customColor, isCustomColor, parseLook } from '../src';

describe('character colour: a preset swatch or any colour from the palette', () => {
  it('presets stay small numbers, so older saves and players still work', () => {
    PALETTE.forEach((hex, i) => {
      expect(isCustomColor(i)).toBe(false);
      expect(colorHex(i)).toBe(hex);
    });
  });

  it('a palette colour packs into one number and comes back the same', () => {
    for (const hex of ['#12a4ff', '#ffffff', '#ff0000', '#7f3c99']) {
      const c = customColor(hex);
      expect(isCustomColor(c)).toBe(true);
      expect(c).toBeGreaterThan(PALETTE.length);   // never mistaken for a preset
      expect(colorHex(c)).toBe(hex);
    }
    expect(customColor('#ABCDEF')).toBe(customColor('#abcdef'));
  });

  it('too dark to see a face? lifted up a little', () => {
    const lifted = colorHex(customColor('#000000'));
    const lum = (h: string) => Math.max(...[1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16)));
    expect(lum(lifted)).toBeGreaterThanOrEqual(0x30);
    expect(colorHex(customColor('#05000a'))).not.toBe('#05000a');
  });

  it('nonsense becomes the default colour', () => {
    expect(colorHex(-1)).toBe(PALETTE[0]);
    expect(colorHex(99)).toBe(PALETTE[0]);
    expect(colorHex(0x2000000)).toBe(PALETTE[0]);
    expect(customColor('red')).toBe(0);
  });

  it('parseLook keeps a palette colour and drops garbage', () => {
    const c = customColor('#3388cc');
    expect(parseLook({ kind: 'cat', color: c }).color).toBe(c);
    expect(parseLook({ kind: 'cat', color: 0x1ffffff + 1 }).color).toBe(0);
    expect(parseLook({ kind: 'cat', color: 1.5 }).color).toBe(0);
    expect(parseLook({ kind: 'cat', color: 'blue' }).color).toBe(0);
  });

  it('a pitch-black colour sent straight to the server is lifted too', () => {
    expect(parseLook({ kind: 'cat', color: 0x1000000 }).color).toBe(customColor('#000000'));
  });
});
