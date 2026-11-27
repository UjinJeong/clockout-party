import { describe, expect, it } from 'vitest';
// @ts-expect-error plain JS module served to the manager page as-is
import { analyze, fxFor, howFor, isAutoHow, LEVELS } from '../src/autoMotion.js';
import { FX_KEYS, FX_RANGE } from '@party/shared';

const W = 120, H = 90;
/** A tiny picture painted by a function (r,g,b 0–255). */
function paint(f: (x: number, y: number) => [number, number, number]) {
  const px = new Uint8ClampedArray(W * H * 4);
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) { const [r, g, b] = f(x, y); const i = (y * W + x) * 4; px[i] = r; px[i + 1] = g; px[i + 2] = b; px[i + 3] = 255; }
  return px;
}
let seed = 1; const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
const meanIn = (mask: Uint8ClampedArray, ch: number, y0: number, y1: number) => { let s = 0, n = 0; for (let y = y0; y < y1; y++) for (let x = 0; x < W; x++) { s += mask[(y * W + x) * 4 + ch]; n++; } return s / n / 255; };

describe('auto motion: reading a picture', () => {
  it('a smooth blue sky flows and noisy green grass sways', () => {
    const px = paint((x, y) => y < H / 2 ? [110 + y, 160 + y, 235] : (rnd() < 0.5 ? [40, 120 + rnd() * 60, 30] : [120, 200, 60]));
    const r = analyze(px, W, H);
    expect(r.found).toContain('flow');
    expect(r.found).toContain('sway');
    expect(meanIn(r.mask, 0, 2, H / 2 - 6)).toBeGreaterThan(0.6);   // sky: flow
    expect(meanIn(r.mask, 0, H / 2 + 6, H - 2)).toBeLessThan(0.2);   // grass: no flow
    expect(meanIn(r.mask, 1, H / 2 + 6, H - 2)).toBeGreaterThan(0.5); // grass: sway
    expect(r.fx.flow).toBeGreaterThan(0);
    expect(r.fx.sway).toBeGreaterThan(0);
  });
  it('a single strong outline does not sway (only dense texture does)', () => {
    const blob = (x: number, y: number) => [[20, 22], [60, 22], [100, 22], [20, 66], [60, 66], [100, 66]].some(([cx, cy]) => (x - cx) ** 2 + (y - cy) ** 2 < 150);
    const r = analyze(paint((x, y) => blob(x, y) ? [230, 120, 140] : [20, 20, 25]), W, H);
    expect(r.areas.sway).toBeLessThan(0.08);
    expect(r.found).not.toContain('sway');
  });
  it('reflections inside the water ripple with it, and the water fades in (no hard line)', () => {
    const px = paint((x, y) => y > H * 0.55 ? ((x > 50 && x < 60) ? [220, 130, 150] : [30, 90 + (y % 3), 150]) : [90, 70, 50]);
    const r = analyze(px, W, H);
    const at = (x: number, y: number) => r.mask[(y * W + x) * 4] / 255;
    expect(at(55, Math.round(H * 0.8))).toBeGreaterThan(0.5);   // the pink stripe in the water flows too
    const top = Math.round(H * 0.56);
    expect(at(20, top)).toBeLessThan(at(20, Math.round(H * 0.8)));  // softer at the waterline than below
  });
  it('a beige paper background is not a sunset sky', () => {
    expect(analyze(paint(() => [200, 170, 115]), W, H).found).not.toContain('flow');
  });
  it('a flat yellow wall is not gold (gold needs brushwork)', () => {
    expect(analyze(paint(() => [245, 215, 40]), W, H).found).not.toContain('shimmer');
  });
  it('a blue patch in the middle is not water (water reaches the bottom edge)', () => {
    const r = analyze(paint((x, y) => y > H * 0.5 && y < H * 0.75 ? [30, 90, 150] : [90, 70, 50]), W, H);
    expect(r.found).not.toContain('flow');
  });
  it('a plain grey card: nothing to move, so it stays still', () => {
    const r = analyze(paint(() => [128, 128, 128]), W, H);
    expect(r.found).toEqual([]);
    expect(r.fx).toEqual({});
  });
  it('a pinkish paper background does not flow (only sky and water do)', () => {
    const r = analyze(paint(() => [235, 205, 210]), W, H);
    expect(r.found).not.toContain('flow');
  });
  it('bright white specks and gold sparkle', () => {
    const px = paint((x, y) => (x * 7 + y * 13) % 41 === 0 ? [255, 255, 250] : (x * 3 + y) % 53 === 0 ? [240, 190, 40] : [30, 25, 35]);
    const r = analyze(px, W, H);
    expect(r.found).toContain('shimmer');
    expect(r.fx.shimmer).toBeGreaterThan(0);
  });
  it('blue water at the bottom ripples when touched', () => {
    const px = paint((x, y) => y > H * 0.55 ? [30, 90 + (y % 3), 150] : [90, 70, 50]);
    const r = analyze(px, W, H);
    expect(r.found).toContain('flow');
    expect(r.fx.ripMask).toBe(1);
    expect(r.fx.ripple).toBeGreaterThan(0);
  });
  it('a depth map adds depth (a gentle 3D shift)', () => {
    const depth = new Float32Array(W * H).map((_, i) => (i % W) / W);
    const r = analyze(paint(() => [128, 128, 128]), W, H, depth);
    expect(r.found).toEqual(['depth']);
    expect(r.fx.para).toBeGreaterThan(0);
  });
  it('a flat depth map (AI gave nothing useful) adds nothing', () => {
    const r = analyze(paint(() => [128, 128, 128]), W, H, new Float32Array(W * H).fill(0.5));
    expect(r.found).toEqual([]);
  });
});

describe('auto motion: the manager turns effects up, down or off', () => {
  const areas = { flow: 0.3, sway: 0.4, shimmer: 0.02 };
  it('off removes an effect, strong is stronger than gentle', () => {
    const low = fxFor(areas, { flow: 'low', sway: 'low', shimmer: 'low', depth: 'off' }, true);
    const high = fxFor(areas, { flow: 'high', sway: 'high', shimmer: 'high', depth: 'high' }, true);
    const off = fxFor(areas, { flow: 'off', sway: 'mid', shimmer: 'off', depth: 'off' }, true);
    expect(high.flow).toBeGreaterThan(low.flow);
    expect(high.sway).toBeGreaterThan(low.sway);
    expect(off.flow).toBeUndefined();
    expect(off.shimmer).toBeUndefined();
    expect(off.para).toBeUndefined();
    expect(low.para).toBeUndefined();
    expect(high.para).toBeGreaterThan(0);
  });
  it('everything off = keep it still; values stay inside what the gallery accepts', () => {
    expect(fxFor(areas, { flow: 'off', sway: 'off', shimmer: 'off', depth: 'off' }, true)).toEqual({});
    const fx = fxFor({ flow: 1, sway: 1, shimmer: 1 }, { flow: 'high', sway: 'high', shimmer: 'high', depth: 'high' }, true);
    for (const [k, v] of Object.entries(fx)) {
      expect(FX_KEYS).toContain(k);
      const [lo, hi] = FX_RANGE[k as keyof typeof FX_RANGE];
      expect(v).toBeGreaterThanOrEqual(lo); expect(v).toBeLessThanOrEqual(hi);
    }
    expect(Object.keys(LEVELS)).toEqual(['off', 'low', 'mid', 'high']);
  });
  it('knows its own "해 보기" lines (so a new reading may rewrite them) but never the manager\'s', () => {
    expect(isAutoHow(howFor(['flow', 'sway', 'depth']).how)).toBe(true);
    expect(isAutoHow(howFor(['shimmer']).how)).toBe(true);
    expect(isAutoHow('고릴라의 눈을 따라가 보세요.')).toBe(false);
    expect(isAutoHow(howFor(['sway']).how + ' 그리고 제가 쓴 말')).toBe(false);
  });
  it('writes a "해 보기" line from what it found', () => {
    expect(howFor([]).how).toBe('');
    const t = howFor(['flow', 'sway']);
    expect(t.how.length).toBeGreaterThan(5);
    expect(t.hint.length).toBeLessThanOrEqual(30);
  });
});
