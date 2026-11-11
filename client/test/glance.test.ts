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
  it('already facing the camera or lying down → no glance', () => {
    const a = make(); a.anim.play('laugh'); run(a.anim, 0.5, body(0.4));
    expect(a.rig.head.rotation.y).toBe(0);
    const b = make(); b.anim.play('laugh'); run(b.anim, 0.5, body(Math.PI, { pose: 'lie' }));
    expect(b.rig.head.rotation.y).toBe(0);
  });
  it('zoning out shows only a profile: a smaller turn than a laugh', () => {
    const z = make(); z.anim.play('zone'); run(z.anim, 0.6, body(Math.PI));
    const l = make(); l.anim.play('laugh'); run(l.anim, 0.6, body(Math.PI));
    const total = (m: typeof z) => Math.abs(m.rig.head.rotation.y) + Math.abs(m.rig.bodyPivot.rotation.y);
    expect(total(z)).toBeGreaterThan(1.2);
    expect(total(z)).toBeLessThan(total(l) * 0.85);
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

describe('퇴근! the celebration', () => {
  it('jumps three times with the arms up, then lands', () => {
    const { rig, anim } = make();
    anim.play('hooray');
    let peaks = 0, up = false, top = 0, arm = 0;
    for (let i = 0; i < 2.7 * 60; i++) {
      anim.update(1 / 60, body());
      const y = rig.root.position.y;
      top = Math.max(top, y); arm = Math.max(arm, Math.abs(rig.armL.rotation.z));
      if (y > 0.2 && !up) { up = true; peaks++; } else if (y < 0.08) up = false;
    }
    expect(peaks).toBe(3);
    expect(top).toBeGreaterThan(0.35);
    expect(arm).toBeGreaterThan(2);
    run(anim, 0.3, body());
    expect(rig.root.position.y).toBeCloseTo(0, 3);
  });
  it('stays in the seat when sitting (arms still go up)', () => {
    const { rig, anim } = make();
    run(anim, 1, body(undefined, { pose: 'sit', baseY: 0.2 }));
    anim.play('hooray'); run(anim, 0.5, body(undefined, { pose: 'sit', baseY: 0.2 }));
    expect(rig.root.position.y).toBeCloseTo(0.2, 1);
    expect(Math.abs(rig.armL.rotation.z)).toBeGreaterThan(1.5);
  });
});
