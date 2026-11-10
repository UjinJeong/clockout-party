import { describe, it, expect, beforeAll } from 'vitest';
import * as THREE from 'three';
import { HANDS, HATS, KINDS, OUTFITS, type Look } from '@party/shared';
import type { AnimalRig } from '../src/avatar/animal';

// buildAnimal draws its soft shadow on a canvas; a tiny stand-in is enough here.
beforeAll(() => {
  const ctx = new Proxy({}, { get: () => () => ({ addColorStop() {} }) });
  (globalThis as any).document = { createElement: () => ({ width: 0, height: 0, getContext: () => ctx }) };
});

const base: Look = { kind: 'bear', color: 0, hat: 'none', hand: 'none', outfit: 'none' };
const build = async (look: Partial<Look>) => (await import('../src/avatar/animal')).buildAnimal({ ...base, ...look });

function triangles(r: AnimalRig) {
  let n = 0;
  r.root.traverse(o => {
    const g = (o as THREE.Mesh).geometry as THREE.BufferGeometry | undefined;
    if (!(o as THREE.Mesh).isMesh || !g) return;
    n += (g.index ? g.index.count : g.getAttribute('position').count) / 3;
  });
  return n;
}
const meshes = (o: THREE.Object3D) => { let n = 0; o.traverse(c => { if ((c as THREE.Mesh).isMesh) n++; }); return n; };

describe('wardrobe', () => {
  it('every animal × hat × hand × outfit builds and stays light enough for phones', async () => {
    let worst = 0;
    for (const kind of KINDS) for (const hat of HATS) for (const hand of HANDS) for (const outfit of OUTFITS) {
      const r = await build({ kind, hat, hand, outfit });
      worst = Math.max(worst, triangles(r));
      expect(r.eyes).toHaveLength(2);
      r.dispose();
    }
    // twenty fully dressed guests must stay well under a phone's budget
    expect(worst).toBeLessThan(4000);
  });

  it.each(HATS.filter(h => h !== 'none'))('the %s actually shows on the head', async hat => {
    const plain = await build({}), dressed = await build({ hat });
    expect(meshes(dressed.head)).toBeGreaterThan(meshes(plain.head));
  });

  it.each(OUTFITS.filter(o => o !== 'none'))('the %s actually shows on the body', async outfit => {
    const plain = await build({}), dressed = await build({ outfit });
    expect(meshes(dressed.bodyPivot)).toBeGreaterThan(meshes(plain.bodyPivot));
  });

  it('only a paw holding something has a held item', async () => {
    expect((await build({ hand: 'none' })).held).toBeNull();
    for (const hand of HANDS.filter(h => h !== 'none')) expect((await build({ hand })).held).toBeTruthy();
  });

  it.each(['coffee', 'balloon'] as const)('the %s stays upright mid-cheers and while walking', async hand => {
    const { Animator } = await import('../src/avatar/animator');
    for (const kind of KINDS) {
      const r = await build({ kind, hand });
      const anim = new Animator(r);
      anim.play('cheers');
      for (let i = 0; i < 22; i++) anim.update(1 / 30, false, 'charging');
      r.root.updateMatrixWorld(true);
      const up = () => new THREE.Vector3(0, 1, 0).applyQuaternion(r.held!.getWorldQuaternion(new THREE.Quaternion())).y;
      expect(up()).toBeGreaterThan(0.95);
      for (let i = 0; i < 40; i++) anim.update(1 / 30, true, 'charging');
      r.root.updateMatrixWorld(true);
      expect(up()).toBeGreaterThan(0.95);
    }
  });

  it('the new animals each look like themselves', async () => {
    const parts = async (kind: Look['kind']) => {
      const names = new Set<string>();
      (await build({ kind })).root.traverse(o => { if (o.name) names.add(o.name); });
      return names;
    };
    expect(await parts('fox')).toContain('fox-tail');
    expect(await parts('dog')).toContain('dog-ear');
    expect(await parts('frog')).toContain('frog-mouth');
  });
});
