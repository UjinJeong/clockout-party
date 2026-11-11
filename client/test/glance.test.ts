import { beforeAll, describe, expect, it } from 'vitest';
import { DEFAULT_LOOK } from '@party/shared';
import { buildAnimal } from '../src/avatar/animal';
import { Animator, GLANCE, type BodyState } from '../src/avatar/animator';

beforeAll(() => {
  const ctx = new Proxy({}, { get: () => () => ({ addColorStop() {} }) });
  (globalThis as any).document = { createElement: () => ({ width: 0, height: 0, getContext: () => ctx }) };
});

const body = (camYaw?: number, extra: Partial<BodyState> = {}): BodyState => ({ moving: false, energy: 50, pose: 'stand', dozing: false, baseY: 0, mood: '', camYaw, ...extra });
const run = (a: Animator, s: number, b: BodyState) => { for (let i = 0; i < s * 60; i++) a.update(1 / 60, b); };
const make = () => { const rig = buildAnimal(DEFAULT_LOOK); return { rig, anim: new Animator(rig) }; };

describe('a glance over the shoulder', () => {
  it('back to the camera + a reaction → the head comes round, but not all the way', () => {
    const { rig, anim } = make();
    run(anim, 0.2, body(Math.PI));
    expect(rig.head.rotation.y).toBe(0);
    anim.play('laugh');
    run(anim, 0.6, body(Math.PI));
    const turned = Math.abs(rig.head.rotation.y) + Math.abs(rig.bodyPivot.rotation.y);
    expect(Math.abs(rig.head.rotation.y)).toBeGreaterThan(1);
    expect(turned).toBeLessThanOrEqual(GLANCE.head + GLANCE.body + 1e-6);
    run(anim, 2.5, body(Math.PI));
    expect(Math.abs(rig.head.rotation.y)).toBeLessThan(0.02); // and back again
  });
  it('turns towards the side the camera is on', () => {
    for (const side of [1, -1]) {
      const { rig, anim } = make();
      anim.update(1 / 60, body(side * 2.4)); anim.play('heart'); run(anim, 0.5, body(side * 2.4));
      expect(Math.sign(rig.head.rotation.y)).toBe(side);
    }
  });
  it('already facing the camera, lying down, or zoning out → no glance', () => {
    const a = make(); a.anim.play('laugh'); run(a.anim, 0.5, body(0.4));
    expect(a.rig.head.rotation.y).toBe(0);
    const b = make(); b.anim.play('laugh'); run(b.anim, 0.5, body(Math.PI, { pose: 'lie' }));
    expect(b.rig.head.rotation.y).toBe(0);
    const c = make(); c.anim.play('zone'); run(c.anim, 0.5, body(Math.PI));
    expect(c.rig.head.rotation.y).toBe(0);
  });
  it('a new mood is worth a glance too (but not the first one seen)', () => {
    const { rig, anim } = make();
    run(anim, 0.3, body(Math.PI, { mood: 'drained' }));
    expect(rig.head.rotation.y).toBe(0);
    run(anim, 0.5, body(Math.PI, { mood: 'hyped' }));
    expect(Math.abs(rig.head.rotation.y)).toBeGreaterThan(1);
  });
});

describe('recolouring keeps the motion going', () => {
  it('an adopted animator is mid-breath exactly where the old one was', () => {
    const a = make(); a.anim.play('wave'); run(a.anim, 0.7, body());
    const b = make(); b.anim.adopt(a.anim);
    a.anim.update(1 / 60, body()); b.anim.update(1 / 60, body());
    expect(b.rig.bodyPivot.scale.y).toBeCloseTo(a.rig.bodyPivot.scale.y, 6);
    expect(b.rig.armR.rotation.z).toBeCloseTo(a.rig.armR.rotation.z, 6);
    expect(b.rig.face.smile).toBeCloseTo(a.rig.face.smile, 6);
  });
});
