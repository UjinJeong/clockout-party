import { describe, it, expect, beforeAll } from 'vitest';
import * as THREE from 'three';
import { EMOTES, KINDS, MOODS } from '@party/shared';
import { expressionFor } from '../src/avatar/face';

beforeAll(() => {
  const ctx = new Proxy({}, { get: () => () => ({ addColorStop() {} }) });
  (globalThis as any).document = { createElement: () => ({ width: 0, height: 0, getContext: () => ctx }) };
});

describe('resting face follows "오늘 하루 어땠어요?"', () => {
  const at = (mood: Parameters<typeof expressionFor>[0], t = 3, charge = 0.2) => expressionFor(mood, null, 0, t, charge);

  it('not answered yet: just tired, no strong feelings', () => {
    const e = at('');
    expect(e.eyes).toBe('sleepy');
    expect(Math.abs(e.smile)).toBeLessThan(0.3);
    expect(e.open).toBe(0);
  });

  it('😵 drained: brows sag, the corners of the mouth turn down', () => {
    const e = at('drained');
    expect(e.brow).toBeLessThan(-0.4);
    expect(e.smile).toBeLessThan(-0.3);
  });

  it('🙂 meh: a small smile', () => {
    const e = at('meh');
    expect(e.smile).toBeGreaterThan(0.1);
    expect(e.smile).toBeLessThan(0.6);
  });

  it('🥳 hyped: big grin, brows up, rosy cheeks', () => {
    const e = at('hyped');
    expect(e.smile).toBeGreaterThan(0.7);
    expect(e.brow).toBeGreaterThan(0.2);
    expect(e.blush).toBeGreaterThan(0.6);
  });

  it('😴 sleepy: yawns now and then — mouth wide open, eyes squeezed shut', () => {
    let yawning = 0, total = 0, widest = 0;
    for (let t = 0; t < 30; t += 0.05) {
      const e = at('sleepy', t);
      total++;
      if (e.open > 0.5) { yawning++; expect(e.eyes).toBe('shut'); }
      widest = Math.max(widest, e.open);
    }
    expect(widest).toBeGreaterThan(0.8);
    expect(yawning / total).toBeGreaterThan(0.05); // it happens…
    expect(yawning / total).toBeLessThan(0.3);     // …but not all the time
  });

  it('fully charged: everyone looks a bit more content', () => {
    for (const m of ['', ...MOODS] as const) {
      expect(at(m, 3, 1).smile).toBeGreaterThan(at(m, 3, 0.1).smile);
    }
  });
});

describe('reactions flash a face for a moment', () => {
  const mid = (g: Parameters<typeof expressionFor>[1], mood: Parameters<typeof expressionFor>[0] = 'drained') => expressionFor(mood, g, 0.5, 3, 0.2);

  it('every reaction has its own look', () => {
    for (const g of [...EMOTES, 'sigh'] as const) expect(mid(g)).not.toEqual(expressionFor('drained', null, 0, 3, 0.2));
  });

  it('🥂 cheers, 😂 laugh, 👏 clap: happy ^^ eyes and a smile — even when drained', () => {
    for (const g of ['cheers', 'laugh', 'clap'] as const) {
      expect(mid(g).eyes).toBe('happy');
      expect(mid(g).smile).toBeGreaterThan(0.6);
    }
    expect(mid('laugh').open).toBeGreaterThan(0.6); // laughing out loud
  });

  it('❤️ heart eyes and pink cheeks', () => {
    expect(mid('heart').eyes).toBe('heart');
    expect(mid('heart').blush).toBeGreaterThan(0.8);
  });

  it('😮 wow: round eyes, an O mouth, brows shoot up', () => {
    const e = mid('wow');
    expect(e.eyes).toBe('round');
    expect(e.open).toBeGreaterThan(0.4);
    expect(e.brow).toBeGreaterThan(0.6);
  });

  it('🫥 zoning out: dot eyes, flat mouth', () => {
    const e = mid('zone');
    expect(e.eyes).toBe('dot');
    expect(Math.abs(e.smile)).toBeLessThan(0.1);
  });

  it('😌 nod: eyes closed contentedly, small smile', () => {
    expect(mid('nod').eyes).toBe('happy');
    expect(mid('nod').smile).toBeGreaterThan(0.2);
  });

  it('the sigh stepping out of the lift: eyes shut, a little "huu" mouth', () => {
    const e = mid('sigh');
    expect(e.eyes).toBe('shut');
    expect(e.open).toBeGreaterThan(0.2);
  });

  it('when the reaction is over, the resting face comes back', () => {
    expect(expressionFor('hyped', 'wow', 0.99, 3, 0.2)).toEqual(expressionFor('hyped', null, 0, 3, 0.2));
  });
});

describe('every animal has a face that can show it', () => {
  async function make(kind: (typeof KINDS)[number]) {
    const { buildAnimal } = await import('../src/avatar/animal');
    const { Animator } = await import('../src/avatar/animator');
    const r = buildAnimal({ kind, color: 2, hat: 'none', hand: 'none', outfit: 'none' });
    return { r, anim: new Animator(r) };
  }
  const body = (mood: '' | 'hyped' | 'drained' = '') => ({ moving: false, energy: 30, pose: 'stand' as const, dozing: false, baseY: 0, mood });
  const shown = (o: THREE.Object3D) => { let v = true; for (let p: THREE.Object3D | null = o; p; p = p.parent) v &&= p.visible; return v; };

  for (const kind of KINDS) {
    it(`${kind}: a mouth and brows on the front of the head`, async () => {
      const { r } = await make(kind);
      expect(r.face.mouth.parent).toBeTruthy();
      expect(r.face.brows.length).toBe(2);
      r.root.updateMatrixWorld(true);
      const headZ = r.head.getWorldPosition(new THREE.Vector3()).z;
      expect(r.face.mouth.getWorldPosition(new THREE.Vector3()).z).toBeGreaterThan(headZ + 0.2);
    });

    it(`${kind}: heart eyes replace the sleepy eyes during ❤️, then go back`, async () => {
      const { r, anim } = await make(kind);
      anim.play('heart');
      for (let i = 0; i < 20; i++) anim.update(1 / 30, body());
      expect(r.face.eyes.every(e => shown(e.heart))).toBe(true);
      expect(r.eyes.every(e => !shown(e.pupil))).toBe(true);
      for (let i = 0; i < 60; i++) anim.update(1 / 30, body());
      expect(r.face.eyes.every(e => !shown(e.heart))).toBe(true);
      expect(r.eyes.every(e => shown(e.pupil))).toBe(true);
    });
  }

  it('a hyped guest smiles, a drained one frowns (the mouth arc flips)', async () => {
    const a = await make('bear'), b = await make('bear');
    for (let i = 0; i < 40; i++) { a.anim.update(1 / 30, body('hyped')); b.anim.update(1 / 30, body('drained')); }
    expect(a.r.face.smile).toBeGreaterThan(0.5);
    expect(b.r.face.smile).toBeLessThan(-0.2);
  });

  it('blushing never tints anyone else’s cheeks', async () => {
    const a = await make('cat'), b = await make('cat');
    for (let i = 0; i < 40; i++) { a.anim.update(1 / 30, body('hyped')); b.anim.update(1 / 30, body('drained')); }
    expect(a.r.face.cheeks[0].material).not.toBe(b.r.face.cheeks[0].material);
  });

  it('on very dark fur the eyes and brows turn light, so the face still shows', async () => {
    const { buildAnimal } = await import('../src/avatar/animal');
    const { customColor } = await import('@party/shared');
    const lum = (m: THREE.Material) => { const c = (m as THREE.MeshBasicMaterial).color; return 0.3 * c.r + 0.59 * c.g + 0.11 * c.b; };
    for (const color of [7, customColor('#101010')]) for (const kind of ['bear', 'cat', 'frog'] as const) {
      const r = buildAnimal({ kind, color, hat: 'none', hand: 'none', outfit: 'none' });
      expect(lum(r.eyes[0].pupil.material as THREE.Material), `${kind} eyes`).toBeGreaterThan(0.5);
      expect(lum((r.face.brows[0].children[0] as THREE.Mesh).material as THREE.Material), `${kind} brows`).toBeGreaterThan(0.25);
    }
    // the penguin's eyes sit on its white face: they stay black
    const p = buildAnimal({ kind: 'penguin', color: 7, hat: 'none', hand: 'none', outfit: 'none' });
    expect(lum(p.eyes[0].pupil.material as THREE.Material)).toBeLessThan(0.1);
  });
});
