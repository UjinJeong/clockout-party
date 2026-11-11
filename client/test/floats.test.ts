import { describe, it, expect } from 'vitest';
import { stepFloats, type FloatBody } from '../src/world/floatPhysics';

const pool = { x0: 14.5, x1: 27.5, z0: -2.8, z1: 1.6 };
const toy = (x: number, z: number, r = 0.5): FloatBody => ({ x, z, vx: 0, vz: 0, r, spin: 0, turn: 0 });
const run = (b: FloatBody[], secs: number, pushers: { x: number; z: number }[] = []) => { for (let i = 0; i < secs * 60; i++) stepFloats(b, pushers, pool, 1 / 60, i / 60); };

describe('pool toys float for real', () => {
  it('wading into a toy shoves it away from you', () => {
    const b = [toy(20, 0)];
    const hit = stepFloats(b, [{ x: 19.4, z: 0 }], pool, 1 / 60);
    expect(hit).toBeGreaterThan(0.5);
    expect(b[0].vx).toBeGreaterThan(0.8);       // off to the right, away from the guest on its left
    run(b, 1.5);
    expect(b[0].x).toBeGreaterThan(20.6);
  });

  it('the water slows it back down to a lazy drift', () => {
    const b = [toy(20, 0)];
    b[0].vx = 3;
    run(b, 8);
    expect(Math.hypot(b[0].vx, b[0].vz)).toBeLessThan(0.15);
  });

  it('never leaves the pool, however hard it is pushed', () => {
    const b = [toy(26.5, 1)];
    b[0].vx = 9; b[0].vz = 7;
    for (let i = 0; i < 600; i++) {
      stepFloats(b, [], pool, 1 / 60, i / 60);
      expect(b[0].x).toBeLessThanOrEqual(pool.x1 - b[0].r + 1e-9);
      expect(b[0].z).toBeLessThanOrEqual(pool.z1 - b[0].r + 1e-9);
      expect(b[0].x).toBeGreaterThanOrEqual(pool.x0 + b[0].r - 1e-9);
    }
  });

  it('toys bump off each other instead of passing through', () => {
    const b = [toy(19, 0), toy(21, 0)];
    b[0].vx = 2.5;
    run(b, 2);
    expect(b[1].vx + (b[1].x - 21)).toBeGreaterThan(0.2);        // the second one got knocked along
    expect(Math.hypot(b[1].x - b[0].x, b[1].z - b[0].z)).toBeGreaterThanOrEqual(0.999);
  });

  it('left alone they keep drifting gently, and stay apart', () => {
    const b = [toy(17, -1), toy(21, 0.5), toy(25, -0.5, 0.3)];
    const start = b.map(t => ({ x: t.x, z: t.z }));
    run(b, 40);
    expect(b.some((t, i) => Math.hypot(t.x - start[i].x, t.z - start[i].z) > 0.3)).toBe(true);
    for (const t of b) expect(Math.hypot(t.vx, t.vz)).toBeLessThan(0.5);
  });

  it('a bump turns a toy lazily: no spinning top, however long you push', () => {
    const b = [toy(20, 0)];
    let fastest = 0;
    for (let i = 0; i < 240; i++) {
      stepFloats(b, [{ x: b[0].x - 0.6, z: b[0].z + 0.3 }], pool, 1 / 60, i / 60); // keep wading into it for 4 s
      fastest = Math.max(fastest, Math.abs(b[0].turn));
    }
    expect(fastest).toBeLessThanOrEqual(0.7);
    expect(Math.abs(b[0].spin)).toBeLessThan(Math.PI); // not even half a turn in all that time
    run(b, 4);
    expect(Math.abs(b[0].turn)).toBeLessThan(0.02);    // and it settles
  });
});
