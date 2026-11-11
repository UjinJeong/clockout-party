import { describe, it, expect } from 'vitest';
import * as THREE from 'three';
import { Fireworks, SHAPES, burstDirections, planVolley, rng } from '../src/world/fireworks';

describe('🎆 fireworks', () => {
  it('the same seed plans the same volley on every screen', () => {
    expect(planVolley(42, 20)).toEqual(planVolley(42, 20));
    expect(planVolley(42, 20)).not.toEqual(planVolley(43, 20));
  });

  it('rockets go up over the sea, beyond the hedge, low enough to be in view', () => {
    for (let seed = 0; seed < 50; seed++) for (const r of planVolley(seed, 20)) {
      expect(r.z).toBeLessThan(-20);            // well past the back of the party
      expect(r.height).toBeGreaterThan(4);
      expect(r.height).toBeLessThan(8);         // the near camera only sees a strip of sky (it looks up a little during a show)
      expect(Math.abs(r.x - 20)).toBeLessThan(12);
      expect(SHAPES).toContain(r.shape);
    }
  });

  it('a heart burst really is heart shaped: two lobes on top, a point at the bottom', () => {
    const d = burstDirections('heart', 120, rng(1));
    const bottom = d.reduce((a, b) => (b.y < a.y ? b : a));
    expect(Math.abs(bottom.x)).toBeLessThan(0.1);            // the point is in the middle
    const topLeft = Math.max(...d.filter(v => v.x < -0.2).map(v => v.y));
    const middleTop = Math.max(...d.filter(v => Math.abs(v.x) < 0.05).map(v => v.y));
    expect(topLeft).toBeGreaterThan(middleTop);               // the dip between the lobes
  });

  it('a volley goes up, bursts with a sound, glows and fades away', () => {
    const scene = new THREE.Scene();
    const heard: string[] = [];
    const fw = new Fireworks(scene, { launch: () => heard.push('launch'), burst: (_, s) => heard.push('burst:' + s) });
    fw.volley(7, 20, 3);
    let most = 0;
    for (let i = 0; i < 60 * 4; i++) { fw.tick(1 / 60); most = Math.max(most, fw.live); }
    expect(heard.filter(h => h === 'launch')).toHaveLength(3);
    expect(heard.filter(h => h.startsWith('burst:'))).toHaveLength(3);
    expect(most).toBeGreaterThan(150);
    for (let i = 0; i < 60 * 6; i++) fw.tick(1 / 60);
    expect(fw.live).toBe(0);
    expect(fw.busy).toBe(false);
    fw.dispose();
    expect(fw.points.parent).toBeNull();
  });

  it('never more sparks than the pool holds, however many volleys at once', () => {
    const fw = new Fireworks(new THREE.Scene());
    for (let k = 0; k < 12; k++) fw.volley(k, 20, 6);
    for (let i = 0; i < 60 * 5; i++) fw.tick(1 / 60);
    expect(fw.live).toBeLessThanOrEqual(2600);
  });
});
