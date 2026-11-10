import * as THREE from 'three';
import type { Battery, Emote } from '@party/shared';
import type { AnimalRig } from './animal';

/** Code-driven motion: walking, idle breathing, and a short gesture for each emote. */
export class Animator {
  private t = Math.random() * 3; // first blink comes after a second or so
  private walk = 0;            // 0..1 blend between idle and walk
  private emote: Emote | null = null;
  private emoteT = 0;
  static readonly EMOTE_TIME = 1.5;

  constructor(private rig: AnimalRig) {}

  play(kind: Emote) { this.emote = kind; this.emoteT = 0; }

  update(dt: number, moving: boolean, battery: Battery) {
    const r = this.rig;
    this.t += dt;
    this.walk += ((moving ? 1 : 0) - this.walk) * Math.min(1, dt * 8);
    const w = this.walk, t = this.t;

    // walk cycle
    const step = Math.sin(t * 9);
    r.legL.rotation.x = step * 0.6 * w;
    r.legR.rotation.x = -step * 0.6 * w;
    r.armL.rotation.x = -step * 0.5 * w;
    // holding a drink: elbow forward, and only a small swing so it doesn't slosh
    r.armR.rotation.x = r.held ? -0.55 + step * 0.18 * w : step * 0.5 * w;
    r.armL.rotation.z = -0.18;
    r.armR.rotation.z = 0.18;
    r.bodyPivot.position.y = Math.abs(Math.cos(t * 9)) * 0.05 * w;

    // idle: slow breathing, a tired sway; low battery slumps a little more
    const tired = battery === 'low' ? 1 : 0.35;
    const breath = Math.sin(t * 1.6) * 0.012 * (1 - w);
    r.bodyPivot.scale.set(1, 1 + breath, 1);
    r.head.rotation.z = Math.sin(t * 0.7) * 0.06 * tired * (1 - w);
    r.head.rotation.x = 0.12 * tired * (1 - w);
    r.bodyPivot.rotation.x = 0;
    r.bodyPivot.rotation.z = 0;
    r.root.position.y = 0;

    // half-shut eyes, nearly shut when the battery is low, with a slow blink now and then
    const blink = (t % 4.3) > 4.1;
    const target = blink ? 0.06 : battery === 'low' ? 0.2 : 0.55;
    for (const e of r.eyes) e.pupil.scale.y += (target - e.pupil.scale.y) * Math.min(1, dt * 15);

    this.gesture(dt);
    this.keepUpright();
  }

  /** Whatever the arm does, the glass stays level with the body (no spilled wine). */
  private keepUpright() {
    const r = this.rig;
    if (!r.held) return;
    r.armR.updateMatrix();
    r.held.quaternion.copy(Animator.tmp.setFromRotationMatrix(r.armR.matrix)).invert();
  }
  private static tmp = new THREE.Quaternion();

  private gesture(dt: number) {
    const r = this.rig;
    if (!this.emote) return;
    this.emoteT += dt;
    const p = this.emoteT / Animator.EMOTE_TIME;
    if (p >= 1) { this.emote = null; return; }
    const env = Math.sin(Math.PI * Math.min(1, p * 1.15)); // ease in/out
    switch (this.emote) {
      case 'cheers':
        r.armR.rotation.x = -2.3 * env;
        r.armR.rotation.z = 0.1;
        break;
      case 'wave':
        r.armR.rotation.x = -0.3 * env;
        r.armR.rotation.z = 2.6 * env + Math.sin(this.emoteT * 16) * 0.35 * env;
        break;
      case 'clap': {
        const c = Math.abs(Math.sin(this.emoteT * 14)) * env;
        r.armL.rotation.x = -1.2 * env; r.armR.rotation.x = -1.2 * env;
        r.armL.rotation.z = -0.5 * c; r.armR.rotation.z = 0.5 * c;
        break;
      }
      case 'laugh':
        r.bodyPivot.rotation.z = Math.sin(this.emoteT * 22) * 0.08 * env;
        r.head.rotation.x = -0.35 * env;
        r.bodyPivot.position.y += Math.abs(Math.sin(this.emoteT * 22)) * 0.04 * env;
        break;
      case 'heart':
        r.root.position.y = Math.max(0, Math.sin(p * Math.PI * 2)) * 0.35;
        r.armL.rotation.z = -2.2 * env; r.armR.rotation.z = 2.2 * env;
        break;
      case 'wow':
        r.bodyPivot.rotation.x = -0.3 * env;
        r.head.rotation.x = -0.25 * env;
        r.armL.rotation.z = -1.1 * env; r.armR.rotation.z = 1.1 * env;
        break;
    }
  }
}
