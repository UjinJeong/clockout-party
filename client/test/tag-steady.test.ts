import { describe, it, expect, beforeAll } from 'vitest';

// buildAnimal draws its soft shadow on a canvas; a tiny stand-in is enough here.
beforeAll(() => {
  const ctx = new Proxy({}, { get: () => () => ({ addColorStop() {} }) });
  (globalThis as any).document = { createElement: () => ({ width: 0, height: 0, getContext: () => ctx }) };
});

async function rig() {
  const { buildAnimal } = await import('../src/avatar/animal');
  const { Animator } = await import('../src/avatar/animator');
  const r = buildAnimal({ kind: 'bear', color: 0, hat: 'none', hand: 'wine', outfit: 'none' });
  return { r, anim: new Animator(r) };
}

const body = (o: Record<string, unknown> = {}) => ({ moving: false, energy: 50, pose: 'stand' as const, dozing: false, baseY: 0, camYaw: 0, ...o });

/** Run for `secs` at 30 frames a second; the name tag's height and the body's height, every frame. */
function run(anim: any, r: any, secs: number, state: (t: number) => Record<string, unknown> = () => ({})) {
  const tag: number[] = [], root: number[] = [];
  for (let t = 0; t < secs; t += 1 / 30) {
    anim.update(1 / 30, body(state(t)));
    tag.push(anim.tagY); root.push(r.root.position.y);
  }
  const swing = (a: number[]) => Math.max(...a) - Math.min(...a);
  return { tag: swing(tag), root: swing(root), tagMax: Math.max(...tag) };
}

describe('the name tag and speech bubbles stay steady over a moving body', () => {
  it('퇴근 jumps: the body hops, the bubble does not', async () => {
    const { r, anim } = await rig();
    anim.play('hooray');
    const s = run(anim, r, 2.7);
    expect(s.root).toBeGreaterThan(0.3);
    expect(s.tag).toBeLessThan(0.001);
  });

  it('a heart reaction hop: the bubble does not hop with it', async () => {
    const { r, anim } = await rig();
    anim.play('heart');
    const s = run(anim, r, 1.5);
    expect(s.root).toBeGreaterThan(0.2);
    expect(s.tag).toBeLessThan(0.001);
  });

  it('dancing: the bounce on every beat does not shake the bubble', async () => {
    const { r, anim } = await rig();
    const s = run(anim, r, 3, t => ({ dance: t * 2 }));
    expect(s.root).toBeGreaterThan(0.05);
    expect(s.tag).toBeLessThan(0.001);
  });

  it('it still follows real height changes: up the stairs, onto a seat', async () => {
    const { r, anim } = await rig();
    run(anim, r, 0.5, () => ({ baseY: 3.2 }));
    expect(anim.tagY).toBeCloseTo(3.2, 5);
  });

  it('a dive off the board is one big arc, and the bubble goes along with the diver', async () => {
    const { r, anim } = await rig();
    anim.play('dive');
    const s = run(anim, r, 1.2);
    expect(s.tagMax).toBeGreaterThan(0.8);
  });
});
