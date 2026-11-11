import * as THREE from 'three';
import { ENERGY, type Emote, type Mood } from '@party/shared';
import type { AnimalRig } from './animal';
import { expressionFor } from './face';

/** How a guest is doing right now, as the animator needs it. */
export interface BodyState {
  moving: boolean;
  /** 0–100: drained → recharged. Shows in the eyes and the posture. */
  energy: number;
  pose: 'stand' | 'sit' | 'lie';
  dozing: boolean;
  /** Height of the root: a seat (minus hip height), or below the waterline in the pool. */
  baseY: number;
  /** How their day went: sets the resting face. */
  mood?: Mood | '';
  /** On the dance floor: beats since the music started (leave out when not dancing). */
  dance?: number;
}

/** Emotes anyone can send, plus a few moves the party plays by itself. */
export type Gesture = Emote | 'sigh';

/** Code-driven motion: walking, idle breathing, sitting, lying, dozing, and a short gesture per emote. */
export class Animator {
  private t = Math.random() * 3; // first blink comes after a second or so
  private walk = 0;            // 0..1 blend between idle and walk
  private sit = 0;             // 0..1 blend into sitting
  private lie = 0;             // 0..1 blend into lying back
  private doze = 0;            // 0..1 blend into nodding off
  private groove = 0;          // 0..1 blend into dancing
  private style = Math.floor(Math.random() * 3); // everyone has their own move
  private emote: Gesture | null = null;
  private emoteT = 0;
  static readonly EMOTE_TIME = 1.5;

  constructor(private rig: AnimalRig) {
    rig.root.rotation.order = 'YXZ'; // turn first, then lean back (lying on a lounger)
  }

  play(kind: Gesture) { this.emote = kind; this.emoteT = 0; }

  update(dt: number, b: BodyState) {
    const r = this.rig;
    this.t += dt;
    const ease = (v: number, to: number, k: number) => v + (to - v) * Math.min(1, dt * k);
    this.walk = ease(this.walk, b.moving ? 1 : 0, 8);
    this.sit = ease(this.sit, b.pose === 'sit' ? 1 : 0, 7);
    this.lie = ease(this.lie, b.pose === 'lie' ? 1 : 0, 5);
    this.doze = ease(this.doze, b.dozing ? 1 : 0, 2);
    const w = this.walk, t = this.t, seated = Math.max(this.sit, this.lie);
    const charge = Math.min(1, Math.max(0, b.energy / ENERGY.max));
    const tired = 1 - charge;

    // walk cycle (folded away while seated)
    const step = Math.sin(t * 9) * (1 - seated);
    r.legL.rotation.x = step * 0.6 * w - 1.5 * seated;
    r.legR.rotation.x = -step * 0.6 * w - 1.5 * seated;
    r.armL.rotation.x = -step * 0.5 * w - 0.45 * this.sit;
    // holding a drink: elbow forward, and only a small swing so it doesn't slosh
    r.armR.rotation.x = r.held ? -0.55 + step * 0.18 * w : step * 0.5 * w - 0.45 * this.sit;
    r.armL.rotation.z = -0.18 - 0.5 * this.lie;
    r.armR.rotation.z = 0.18 + (r.held ? 0 : 0.5 * this.lie);
    r.bodyPivot.position.y = Math.abs(Math.cos(t * 9)) * 0.05 * w;

    // idle: slow breathing and a tired sway; drained guests slump, recharged ones sit up
    const breath = Math.sin(t * (1.6 - 0.5 * this.doze)) * (0.012 + 0.01 * this.doze) * (1 - w);
    r.bodyPivot.scale.set(1, 1 + breath, 1);
    r.bodyPivot.rotation.x = (0.05 + 0.13 * tired) * (1 - w) * (1 - this.lie);
    r.bodyPivot.rotation.z = 0;
    r.bodyPivot.rotation.y = 0;
    r.head.rotation.z = Math.sin(t * 0.7) * 0.06 * (0.35 + 0.65 * tired) * (1 - w);
    // nodding off: the head sinks and bobs back up now and then
    const nod = this.doze * (0.38 + Math.max(0, Math.sin(t * 0.9)) * 0.14);
    r.head.rotation.x = (0.04 + 0.16 * tired) * (1 - w) + nod;

    // lying back on a lounger (around the feet), sitting on a seat
    r.root.rotation.x = -1.2 * this.lie;
    r.root.position.y = b.baseY;

    // the face: resting expression from their mood, a flash of feeling during a reaction.
    // Sleepy eyes: barely open when drained, a little more as you recharge; shut when dozing; a slow blink.
    const blink = (t % 4.3) > 4.1;
    const open = blink ? 0.06 : 0.14 + 0.48 * charge;
    const face = expressionFor(b.mood ?? '', this.emote, this.emoteT / Animator.EMOTE_TIME, t, charge);
    if (this.doze > 0.5 && !this.emote) { face.eyes = 'shut'; face.open = 0; face.smile = Math.min(face.smile, 0.1); }
    this.groove = ease(this.groove, b.dance !== undefined && !b.moving && b.pose === 'stand' ? 1 : 0, 5);
    if (this.groove > 0.5 && !this.emote) { face.eyes = 'happy'; face.smile = Math.max(face.smile, 0.85); face.blush = Math.max(face.blush, 0.7); face.brow = Math.max(face.brow, 0.3); }
    r.face.update(dt, face, open);

    if (this.groove > 0.01 && b.dance !== undefined) this.dance(b.dance, this.groove);
    this.gesture(dt);
    this.keepUpright();
  }

  /** Dancing to the beat: a bounce everyone shares, and one of three moves on top. */
  private dance(beats: number, k: number) {
    const r = this.rig, s = Math.sin(beats * Math.PI), bounce = Math.abs(s);
    r.root.position.y += bounce * 0.09 * k;
    r.bodyPivot.rotation.z += s * 0.12 * k;
    r.head.rotation.z += -s * 0.1 * k;
    r.head.rotation.x += bounce * 0.12 * k;
    r.legL.rotation.x += Math.max(0, s) * 0.35 * k; r.legR.rotation.x += Math.max(0, -s) * 0.35 * k;
    const hold = !!r.held; // a drink in the right paw stays up and steady
    if (this.style === 0) {            // hands in the air, pumping
      r.armL.rotation.z += (-2.3 - bounce * 0.4) * k;
      if (!hold) r.armR.rotation.z += (2.3 + bounce * 0.4) * k;
    } else if (this.style === 1) {     // side to side, arms swinging across
      r.bodyPivot.rotation.y = s * 0.45 * k;
      r.armL.rotation.x += (-0.9 + s * 0.6) * k; r.armL.rotation.z += -0.5 * k;
      if (!hold) { r.armR.rotation.x += (-0.9 - s * 0.6) * k; r.armR.rotation.z += 0.5 * k; }
    } else {                           // the point: one arm up, then the other
      r.armL.rotation.z += -2.4 * Math.max(0, s) * k - 0.3 * k;
      if (!hold) r.armR.rotation.z += 2.4 * Math.max(0, -s) * k + 0.3 * k;
      r.bodyPivot.rotation.y = s * 0.2 * k;
    }
    if (hold) r.armR.rotation.x += -0.5 * bounce * k;
  }

  /**
   * Whatever the arm and body do (cheers, walking, lying back), the held item
   * stays level with the floor, turned the way you face. No spilled drinks.
   */
  private keepUpright() {
    const r = this.rig;
    if (!r.held) return;
    const q = Animator.q1.setFromEuler(r.root.rotation)
      .multiply(Animator.q2.setFromEuler(r.bodyPivot.rotation))
      .multiply(Animator.q3.setFromEuler(r.armR.rotation));
    const facing = Animator.q2.setFromAxisAngle(Animator.Y, r.root.rotation.y);
    r.held.quaternion.copy(q.invert().multiply(facing));
  }
  private static q1 = new THREE.Quaternion();
  private static q2 = new THREE.Quaternion();
  private static q3 = new THREE.Quaternion();
  private static Y = new THREE.Vector3(0, 1, 0);

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
        r.root.position.y += Math.max(0, Math.sin(p * Math.PI * 2)) * 0.35 * (1 - this.sit - this.lie);
        r.armL.rotation.z = -2.2 * env; r.armR.rotation.z = 2.2 * env;
        break;
      case 'wow':
        r.bodyPivot.rotation.x = -0.3 * env;
        r.head.rotation.x = -0.25 * env;
        r.armL.rotation.z = -1.1 * env; r.armR.rotation.z = 1.1 * env;
        break;
      case 'nod':
        // slow, agreeable nods: "mm, mm"
        r.head.rotation.x += Math.abs(Math.sin(this.emoteT * 6.5)) * 0.32 * env;
        break;
      case 'sigh': {
        // stepping out of the lift after work: hand to the collar, tug the tie loose, shoulders drop
        const up = Math.min(1, p * 2.4), down = Math.max(0, (p - 0.55) / 0.45);
        const hand = up * (1 - down);
        r.armR.rotation.x = -2.1 * hand;
        r.armR.rotation.z = 0.18 + 0.65 * hand;
        r.head.rotation.x += -0.22 * hand + 0.25 * down * (1 - down) * 4;
        r.bodyPivot.position.y -= 0.03 * Math.sin(Math.PI * down);
        break;
      }
      case 'zone':
        // staring into the middle distance, head tipped, a slow sway
        r.head.rotation.z += 0.28 * env;
        r.head.rotation.x -= 0.1 * env;
        r.bodyPivot.rotation.z = Math.sin(this.emoteT * 2) * 0.04 * env;
        break;
    }
    // keep the held item level through the gesture too
    this.keepUpright();
  }
}
