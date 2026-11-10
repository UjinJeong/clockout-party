import { describe, it, expect, beforeAll } from 'vitest';
import * as THREE from 'three';

beforeAll(() => {
  const ctx = new Proxy({}, { get: () => () => ({ addColorStop() {} }) });
  (globalThis as any).document = { createElement: () => ({ width: 0, height: 0, getContext: () => ctx }) };
});

import { KINDS } from '@party/shared';
async function make(kind: (typeof KINDS)[number]) {
  const { buildAnimal } = await import('../src/avatar/animal');
  const { Animator } = await import('../src/avatar/animator');
  const r = buildAnimal({ kind, color: 1, hat: 'none', hand: 'wine', outfit: 'none' });
  return { r, anim: new Animator(r) };
}

describe('wine glass cup', () => {
  it('opens upward like a glass, not downward like an umbrella', async () => {
    const { r } = await make('bear');
    r.root.updateMatrixWorld(true);
    const bowl = r.held!.getObjectByName('bowl') as THREE.Mesh;
    expect(bowl).toBeTruthy();
    const pos = bowl.geometry.getAttribute('position');
    const center = bowl.getWorldPosition(new THREE.Vector3());
    let low = { y: Infinity, radial: 0 }, high = { y: -Infinity, radial: 0 };
    const v = new THREE.Vector3();
    for (let i = 0; i < pos.count; i++) {
      bowl.localToWorld(v.fromBufferAttribute(pos, i));
      const radial = Math.hypot(v.x - center.x, v.z - center.z);
      if (v.y < low.y) low = { y: v.y, radial };
      if (v.y > high.y) high = { y: v.y, radial };
    }
    expect(low.radial).toBeLessThan(0.02);   // closed at the bottom, sitting on the stem
    expect(high.radial).toBeGreaterThan(0.04); // open rim at the top
  });
});

describe('sleepy eyes', () => {
  for (const kind of KINDS) {
    it(`${kind} has solid black eyes that stay black under any light`, async () => {
      const { r } = await make(kind);
      expect(r.eyes.length).toBe(2);
      for (const e of r.eyes) for (const m of [e.pupil, e.lid]) {
        const mat = m.material as THREE.MeshBasicMaterial;
        expect(mat.type).toBe('MeshBasicMaterial');
        const c = mat.color;
        expect(Math.max(c.r, c.g, c.b)).toBeLessThan(0.08);
      }
    });
    it(`${kind} looks half-asleep, and sleepier with a low battery`, async () => {
      const { r, anim } = await make(kind);
      for (let i = 0; i < 10; i++) anim.update(1 / 30, false, 'charging');
      const awake = r.eyes[0].pupil.scale.y;
      for (let i = 0; i < 10; i++) anim.update(1 / 30, false, 'low');
      const low = r.eyes[0].pupil.scale.y;
      expect(awake).toBeLessThan(0.75);     // never wide open: these are tired animals
      expect(low).toBeLessThan(awake * 0.6);
    });
  }
});
