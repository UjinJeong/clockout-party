import { describe, it, expect, beforeAll } from 'vitest';
import * as THREE from 'three';

beforeAll(() => {
  const ctx = new Proxy({}, { get: () => () => ({ addColorStop() {} }) });
  (globalThis as any).document = { createElement: () => ({ width: 0, height: 0, getContext: () => ctx }) };
});

describe('퇴근 엘리베이터', () => {
  it('rises, opens, lets you out, closes and sinks away', async () => {
    const { Elevator, ARRIVAL } = await import('../src/game/elevator');
    const scene = new THREE.Scene();
    const e = new Elevator(scene, new THREE.Vector3(6, 0, 1.5), 0);
    const gap = () => e.doorGap();
    const step = (to: number) => { while (e.t < to && !e.done) e.update(1 / 30); };

    step(ARRIVAL.rise * 0.5);
    expect(e.group.position.y).toBeLessThan(0);   // still coming up through the floor
    expect(gap()).toBeLessThan(0.05);              // doors shut
    expect(e.guestVisible()).toBe(false);          // you're inside

    step(ARRIVAL.open + 0.05);
    expect(e.group.position.y).toBeCloseTo(0, 2);
    expect(gap()).toBeGreaterThan(0.6);            // doors wide open
    expect(e.guestVisible()).toBe(true);
    expect(e.guestOffset()).toBeGreaterThan(0.3);  // still standing inside

    step(ARRIVAL.out);
    expect(e.guestOffset()).toBeCloseTo(0, 2);     // out on the floor

    step(ARRIVAL.end + 0.1);
    expect(e.done).toBe(true);
    expect(e.group.parent).toBeNull();             // cleaned up
  });

  it('dings once when the doors open', async () => {
    const { Elevator, ARRIVAL } = await import('../src/game/elevator');
    let dings = 0;
    const e = new Elevator(new THREE.Scene(), new THREE.Vector3(), 0, () => dings++);
    while (e.t < ARRIVAL.end && !e.done) e.update(1 / 30);
    expect(dings).toBe(1);
  });
});

describe('the sigh on stepping out', () => {
  it('puts a hand up to loosen the collar, then lets it drop', async () => {
    const { buildAnimal } = await import('../src/avatar/animal');
    const { Animator } = await import('../src/avatar/animator');
    const r = buildAnimal({ kind: 'bear', color: 0, hat: 'none', hand: 'none', outfit: 'tie' });
    const anim = new Animator(r);
    const body = { moving: false, energy: 20, pose: 'stand' as const, dozing: false, baseY: 0 };
    anim.play('sigh');
    let lowest = 0;
    for (let i = 0; i < 30; i++) { anim.update(1 / 30, body); lowest = Math.min(lowest, r.armR.rotation.x); }
    expect(lowest).toBeLessThan(-1.6); // hand up at the neck
    for (let i = 0; i < 60; i++) anim.update(1 / 30, body);
    expect(r.armR.rotation.x).toBeGreaterThan(-0.3); // and back down
  });
});
