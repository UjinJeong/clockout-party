import { describe, it, expect, beforeAll } from 'vitest';
import * as THREE from 'three';
import type { AnimalRig } from '../src/avatar/animal';
import { KINDS, type Kind } from '@party/shared';

// buildAnimal draws its soft shadow on a canvas; a tiny stand-in is enough here.
beforeAll(() => {
  const ctx = new Proxy({}, { get: () => () => ({ addColorStop() {} }) });
  (globalThis as any).document = { createElement: () => ({ width: 0, height: 0, getContext: () => ctx }) };
});

async function rig(kind: Kind) {
  const { buildAnimal } = await import('../src/avatar/animal');
  const { Animator } = await import('../src/avatar/animator');
  const r = buildAnimal({ kind, color: 0, hat: 'none', hand: 'wine', outfit: 'none' });
  return { r, anim: new Animator(r) };
}

/** Closest distance from point p to the arm's capsule axis, in world space. */
function distToArm(r: AnimalRig, p: THREE.Vector3) {
  const a = r.armR.localToWorld(new THREE.Vector3(0, -0.17 + 0.11, 0));
  const b = r.armR.localToWorld(new THREE.Vector3(0, -0.17 - 0.11, 0));
  return new THREE.Line3(a, b).closestPointToPoint(p, true, new THREE.Vector3()).distanceTo(p);
}

function check(r: AnimalRig) {
  r.root.updateMatrixWorld(true);
  const held = r.held!;
  expect(held).toBeTruthy();
  // the bowl is the highest part of the glass
  const top = [...held.children].sort((a, b) => b.position.y - a.position.y)[0];
  const bowl = top.getWorldPosition(new THREE.Vector3());
  const up = new THREE.Vector3(0, 1, 0).applyQuaternion(held.getWorldQuaternion(new THREE.Quaternion()));
  // the bowl sits outside the arm (arm radius 0.085 + bowl radius 0.075)
  expect(distToArm(r, bowl)).toBeGreaterThan(0.16);
  // and the glass stays upright so the wine doesn't spill
  expect(up.y).toBeGreaterThan(0.95);
}

describe('wine glass', () => {
  for (const kind of KINDS) {
    it(`${kind} holds it in front of the paw, upright, while idle`, async () => {
      const { r, anim } = await rig(kind);
      for (let i = 0; i < 30; i++) anim.update(1 / 30, false, 'charging');
      check(r);
    });
    it(`${kind} keeps it upright mid-cheers`, async () => {
      const { r, anim } = await rig(kind);
      anim.play('cheers');
      for (let i = 0; i < 22; i++) anim.update(1 / 30, false, 'charging'); // ~0.7s, arm at its highest
      check(r);
    });
    it(`${kind} keeps it upright while walking`, async () => {
      const { r, anim } = await rig(kind);
      for (let i = 0; i < 40; i++) anim.update(1 / 30, true, 'charging');
      check(r);
    });
  }
});
