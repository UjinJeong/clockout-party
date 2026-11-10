import { describe, it, expect, beforeAll } from 'vitest';
import * as THREE from 'three';
import type { Look } from '@party/shared';

beforeAll(() => {
  const ctx = new Proxy({}, { get: () => () => ({ addColorStop() {} }) });
  (globalThis as any).document = { createElement: () => ({ width: 0, height: 0, getContext: () => ctx }) };
});

const look: Look = { kind: 'cat', color: 0, hat: 'none', hand: 'coffee', outfit: 'none' };
async function make() {
  const { buildAnimal } = await import('../src/avatar/animal');
  const { Animator } = await import('../src/avatar/animator');
  const r = buildAnimal(look);
  return { r, anim: new Animator(r) };
}
type Body = { moving: boolean; energy: number; pose: 'stand' | 'sit' | 'lie'; dozing: boolean; baseY: number };
const body = (o: Partial<Body> = {}): Body => ({ moving: false, energy: 60, pose: 'stand', dozing: false, baseY: 0, ...o });
const run = (anim: { update(dt: number, b: Body): void }, b: Body, frames = 45) => { for (let i = 0; i < frames; i++) anim.update(1 / 30, b); };
const eyes = (r: { eyes: { pupil: THREE.Mesh }[] }) => r.eyes[0].pupil.scale.y;
const up = (o: THREE.Object3D) => { o.updateWorldMatrix(true, false); return new THREE.Vector3(0, 1, 0).applyQuaternion(o.getWorldQuaternion(new THREE.Quaternion())).y; };

describe('charging up shows on your face', () => {
  it('eyes open a little more as you recharge, but never wide', async () => {
    const { r, anim } = await make();
    run(anim, body({ energy: 10 }));
    const drained = eyes(r);
    run(anim, body({ energy: 100 }));
    const full = eyes(r);
    expect(full).toBeGreaterThan(drained * 2);
    expect(full).toBeLessThan(0.75);
  });

  it('dozing off closes the eyes and drops the head', async () => {
    const { r, anim } = await make();
    run(anim, body({ energy: 60 }));
    const awakeHead = r.head.rotation.x;
    run(anim, body({ energy: 60, dozing: true }));
    expect(eyes(r)).toBeLessThan(0.1);
    expect(r.head.rotation.x).toBeGreaterThan(awakeHead);
  });
});

describe('sitting and lying down', () => {
  it('sits with the hips on the seat and the legs out front', async () => {
    const { r, anim } = await make();
    run(anim, body({ pose: 'sit', baseY: 0.3 }));
    expect(r.root.position.y).toBeCloseTo(0.3, 2);
    expect(r.legL.rotation.x).toBeLessThan(-1.2);
    expect(r.legR.rotation.x).toBeLessThan(-1.2);
  });

  it('lies back on a lounger, head behind the feet', async () => {
    const { r, anim } = await make();
    run(anim, body({ pose: 'lie', baseY: 0.3 }));
    r.root.updateMatrixWorld(true);
    const head = r.head.getWorldPosition(new THREE.Vector3());
    const feet = r.root.getWorldPosition(new THREE.Vector3());
    expect(head.z).toBeLessThan(feet.z - 0.8);
    expect(head.y).toBeLessThan(1.0);
  });

  it('the coffee stays upright sitting and lying', async () => {
    for (const pose of ['sit', 'lie'] as const) {
      const { r, anim } = await make();
      run(anim, body({ pose, baseY: 0.3 }));
      expect(up(r.held!)).toBeGreaterThan(0.95);
    }
  });

  it('gets back up when standing again', async () => {
    const { r, anim } = await make();
    run(anim, body({ pose: 'lie', baseY: 0.3 }));
    run(anim, body({ pose: 'stand' }), 60);
    expect(Math.abs(r.root.rotation.x)).toBeLessThan(0.02);
    expect(Math.abs(r.legL.rotation.x)).toBeLessThan(0.05);
  });
});

describe('low-energy reactions', () => {
  it('nod moves the head, zone out tilts it', async () => {
    for (const kind of ['nod', 'zone'] as const) {
      const { r, anim } = await make();
      run(anim, body(), 10);
      const before = r.head.rotation.clone();
      anim.play(kind);
      run(anim, body(), 12);
      const moved = Math.abs(r.head.rotation.x - before.x) + Math.abs(r.head.rotation.z - before.z);
      expect(moved).toBeGreaterThan(0.1);
    }
  });
});
