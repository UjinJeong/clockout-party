import * as THREE from 'three';
import type { Kind, Mood } from '@party/shared';
import type { Gesture } from './animator';

/**
 * Faces. Each animal has brows, a mouth and a few spare eye shapes that the
 * animator swaps in. What the face shows is decided in one place,
 * `expressionFor`: a resting face from "오늘 하루 어땠어요?" (plus a contented
 * smile once recharged), and a quick flash of feeling during a reaction.
 */
export type EyeShape = 'sleepy' | 'shut' | 'happy' | 'round' | 'heart' | 'dot';

export interface Expression {
  eyes: EyeShape;
  /** −1 frown … 0 flat … 1 grin */
  smile: number;
  /** 0 closed … 1 wide open (laugh, yawn, "O") */
  open: number;
  /** −1 sagging, worried … 1 raised high */
  brow: number;
  /** 0 … 1 how pink the cheeks are */
  blush: number;
}

const REST: Record<Mood | '', Expression> = {
  '':      { eyes: 'sleepy', smile: 0.05, open: 0, brow: -0.15, blush: 0.35 },
  drained: { eyes: 'sleepy', smile: -0.55, open: 0, brow: -0.7, blush: 0.2 },
  meh:     { eyes: 'sleepy', smile: 0.3, open: 0, brow: 0, blush: 0.4 },
  sleepy:  { eyes: 'sleepy', smile: 0, open: 0, brow: -0.3, blush: 0.3 },
  hyped:   { eyes: 'sleepy', smile: 0.9, open: 0, brow: 0.45, blush: 0.8 },
};

const FLASH: Record<Gesture, Expression> = {
  cheers: { eyes: 'happy', smile: 0.9, open: 0.15, brow: 0.4, blush: 0.7 },
  laugh:  { eyes: 'happy', smile: 1, open: 0.85, brow: 0.5, blush: 0.8 },
  clap:   { eyes: 'happy', smile: 0.8, open: 0.2, brow: 0.3, blush: 0.6 },
  heart:  { eyes: 'heart', smile: 0.7, open: 0, brow: 0.3, blush: 1 },
  wow:    { eyes: 'round', smile: 0, open: 0.6, brow: 1, blush: 0.3 },
  wave:   { eyes: 'sleepy', smile: 0.7, open: 0.1, brow: 0.5, blush: 0.5 },
  nod:    { eyes: 'happy', smile: 0.35, open: 0, brow: 0, blush: 0.4 },
  zone:   { eyes: 'dot', smile: 0, open: 0, brow: 0, blush: 0.1 },
  dive:   { eyes: 'round', smile: 0.6, open: 0.7, brow: 0.9, blush: 0.6 },
  squirt: { eyes: 'happy', smile: 0.9, open: 0.3, brow: 0.5, blush: 0.6 },
  hooray: { eyes: 'happy', smile: 1, open: 0.9, brow: 0.7, blush: 0.9 },
  sigh:   { eyes: 'shut', smile: -0.1, open: 0.35, brow: -0.4, blush: 0.2 },
};

const YAWN_EVERY = 9, YAWN_LEN = 1.8;

/**
 * The face to show right now.
 * @param gesture the reaction playing (or null), `p` how far through it (0..1)
 * @param t a running clock (for the sleepy yawns), `charge` energy 0..1
 */
export function expressionFor(mood: Mood | '', gesture: Gesture | null, p: number, t: number, charge: number): Expression {
  if (gesture && p < 0.9) return { ...FLASH[gesture] };
  const e = { ...REST[mood] };
  // The charge gauge shows on the face. Running low (under 35%): the mouth and
  // brows sag. Filling up (over 60%): a smile grows, the brows lift, cheeks glow.
  const low = Math.max(0, 1 - charge / 0.35), high = Math.max(0, (charge - 0.6) / 0.4);
  e.smile = Math.max(-1, Math.min(1, e.smile - 0.35 * low + 0.5 * high));
  e.brow = Math.max(-1, Math.min(1, e.brow - 0.4 * low + 0.3 * high));
  e.blush = Math.min(1, e.blush + 0.3 * high);
  // fully charged: beaming, whatever kind of day it was
  if (charge >= 0.98) e.smile = Math.max(e.smile, 0.8);
  if (mood === 'sleepy') {
    const phase = t % YAWN_EVERY;
    if (phase < YAWN_LEN) {
      e.open = Math.sin(Math.PI * phase / YAWN_LEN);
      if (e.open > 0.3) { e.eyes = 'shut'; e.brow = 0.2; }
    }
  }
  return e;
}

// ---------------------------------------------------------------- the parts

const G = {
  arc: new THREE.TorusGeometry(0.05, 0.013, 4, 10, Math.PI),     // ∩ ; flipped it's ∪
  hole: new THREE.SphereGeometry(0.05, 10, 6),
  brow: new THREE.CapsuleGeometry(0.014, 0.07, 2, 6),
  happy: new THREE.TorusGeometry(0.04, 0.013, 4, 10, Math.PI),     // ^ closed, smiling eye
  round: new THREE.SphereGeometry(0.05, 10, 6),
  spark: new THREE.SphereGeometry(0.012, 6, 4),
  dot: new THREE.SphereGeometry(0.022, 8, 6),
  heart: (() => {
    const s = new THREE.Shape();
    s.moveTo(0, -0.05);
    s.bezierCurveTo(-0.07, -0.005, -0.06, 0.05, -0.028, 0.05);
    s.bezierCurveTo(-0.01, 0.05, 0, 0.035, 0, 0.022);
    s.bezierCurveTo(0, 0.035, 0.01, 0.05, 0.028, 0.05);
    s.bezierCurveTo(0.06, 0.05, 0.07, -0.005, 0, -0.05);
    return new THREE.ShapeGeometry(s, 8);
  })(),
};
const M = {
  mouth: new THREE.MeshBasicMaterial({ color: '#4a1820' }),
  heart: new THREE.MeshBasicMaterial({ color: '#e8455f', side: THREE.DoubleSide }),
  spark: new THREE.MeshBasicMaterial({ color: '#ffffff' }),
  pupil: new THREE.MeshBasicMaterial({ color: '#141012' }),
};

/** Where the mouth sits on each animal: under the nose, on the muzzle. */
const MOUTH: Record<Kind, { y: number; z: number; tilt: number; w: number }> = {
  bear:    { y: -0.152, z: 0.362, tilt: 0.45, w: 1 },
  cat:     { y: -0.138, z: 0.338, tilt: 0.4, w: 0.85 },
  rabbit:  { y: -0.138, z: 0.338, tilt: 0.4, w: 0.8 },
  dog:     { y: -0.158, z: 0.378, tilt: 0.45, w: 1.05 },
  fox:     { y: -0.155, z: 0.335, tilt: 0.35, w: 0.85 },
  penguin: { y: -0.125, z: 0.362, tilt: 0.3, w: 0.8 },
  frog:    { y: -0.1, z: 0.322, tilt: 0.15, w: 2.1 },
};

/** Brows above each eye: where, and which way they face. */
const BROW: Record<'frog' | 'other', { x: number; y: number; z: number; yaw: number }> = {
  other: { x: 0.135, y: 0.118, z: 0.298, yaw: 0.38 },
  frog: { x: 0.15, y: 0.335, z: 0.215, yaw: 0.22 },
};

export interface EyeExtras { happy: THREE.Mesh; round: THREE.Group; heart: THREE.Mesh; dot: THREE.Mesh }

const ease = (v: number, to: number, k: number, dt: number) => v + (to - v) * Math.min(1, dt * k);

export class Face {
  readonly mouth = new THREE.Group();
  readonly brows: THREE.Group[] = [];
  readonly eyes: EyeExtras[] = [];
  readonly cheeks: THREE.Mesh[];
  /** Current (eased) values, readable for tests and the preview. */
  smile = 0; open = 0; brow = 0; blush = 0.35;
  shape: EyeShape = 'sleepy';
  private arc: THREE.Mesh;
  private hole: THREE.Mesh;
  private browY: number;
  private pop = 1;
  private t = 0;
  private blushMat: THREE.MeshStandardMaterial;
  private browMat: THREE.MeshStandardMaterial;

  constructor(
    head: THREE.Group, kind: Kind,
    private eyeParts: { pupil: THREE.Mesh; lid: THREE.Mesh }[],
    cheeks: THREE.Mesh[],
    colors: { ink: THREE.Material; mouthInk: THREE.Material; brow: THREE.ColorRepresentation },
  ) {
    // mouth: a line that bends into a smile or a frown, and an opening for laughs and yawns
    const at = MOUTH[kind];
    this.mouth.position.set(0, at.y, at.z);
    this.mouth.rotation.x = at.tilt;
    this.mouth.scale.set(at.w, 1, 1);
    if (kind === 'frog') this.mouth.name = 'frog-mouth';
    this.arc = new THREE.Mesh(G.arc, colors.mouthInk);
    this.hole = new THREE.Mesh(G.hole, M.mouth);
    this.hole.visible = false;
    this.mouth.add(this.arc, this.hole);
    head.add(this.mouth);

    // brows: darker than the fur
    this.browMat = new THREE.MeshStandardMaterial({ color: colors.brow, roughness: 0.8, flatShading: true });
    const b = BROW[kind === 'frog' ? 'frog' : 'other'];
    this.browY = b.y;
    for (const side of [-1, 1]) {
      const g = new THREE.Group();
      g.position.set(side * b.x, b.y, b.z);
      g.rotation.set(0, side * b.yaw, 0, 'YXZ');
      const line = new THREE.Mesh(G.brow, this.browMat);
      line.rotation.z = Math.PI / 2;
      g.add(line);
      g.userData.side = side;
      head.add(g);
      this.brows.push(g);
    }

    // spare eye shapes, hidden until needed, in the same spot as each sleepy eye
    for (const { pupil } of eyeParts) {
      const eye = pupil.parent!;
      const happy = new THREE.Mesh(G.happy, colors.ink); happy.position.y = -0.012;
      const round = new THREE.Group();
      const ball = new THREE.Mesh(G.round, colors.ink); ball.scale.set(1, 1.15, 0.45);
      // a white glint on dark eyes; light (dark-fur) eyes get a dark pupil instead
      const lightEyes = (colors.ink as THREE.MeshBasicMaterial).color.getHSL({ h: 0, s: 0, l: 0 }).l > 0.5;
      const spark = new THREE.Mesh(G.spark, lightEyes ? M.pupil : M.spark);
      if (lightEyes) { spark.position.set(0, -0.006, 0.022); spark.scale.set(2.3, 2.6, 1); }
      else spark.position.set(0.016, 0.022, 0.022);
      round.add(ball, spark);
      const heart = new THREE.Mesh(G.heart, M.heart); heart.position.z = 0.012; heart.scale.setScalar(1.15);
      const dot = new THREE.Mesh(G.dot, colors.ink); dot.scale.z = 0.5;
      for (const o of [happy, round, heart, dot]) { o.visible = false; eye.add(o); }
      this.eyes.push({ happy, round, heart, dot });
    }

    // cheeks get their own material, so one guest blushing doesn't tint everyone
    this.blushMat = (cheeks[0]?.material as THREE.MeshStandardMaterial).clone();
    this.blushMat.transparent = true;
    for (const c of cheeks) c.material = this.blushMat;
    this.cheeks = cheeks;
  }

  /** Carry on from another face mid-expression (the animal was rebuilt, e.g. recoloured). */
  adopt(o: Face) { this.smile = o.smile; this.open = o.open; this.brow = o.brow; this.blush = o.blush; this.shape = o.shape; this.pop = o.pop; this.t = o.t; }

  /**
   * Ease towards an expression.
   * @param open how far open the sleepy eyes are right now (energy, blinking)
   */
  update(dt: number, e: Expression, open: number) {
    this.t += dt;
    this.smile = ease(this.smile, e.smile, 10, dt);
    this.open = ease(this.open, e.open, 12, dt);
    this.brow = ease(this.brow, e.brow, 10, dt);
    this.blush = ease(this.blush, e.blush, 4, dt);
    if (e.eyes !== this.shape) { this.shape = e.eyes; this.pop = 0; }
    this.pop = Math.min(1, this.pop + dt / 0.14);

    // eyes: the sleepy half-moons (open/shut), or one of the spare shapes popping in
    const sleepy = this.shape === 'sleepy' || this.shape === 'shut';
    const target = this.shape === 'shut' ? 0.04 : open;
    const s = 0.55 + 0.45 * (1 - (1 - this.pop) ** 3);
    this.eyeParts.forEach(({ pupil, lid }, i) => {
      pupil.visible = lid.visible = sleepy;
      if (sleepy) pupil.scale.y += (target - pupil.scale.y) * Math.min(1, dt * 15);
      const x = this.eyes[i];
      x.happy.visible = this.shape === 'happy';
      x.round.visible = this.shape === 'round';
      x.heart.visible = this.shape === 'heart';
      x.dot.visible = this.shape === 'dot';
      for (const o of [x.happy, x.round, x.dot]) o.scale.x = o.scale.y = s;
      x.heart.scale.setScalar(1.15 * s * (1 + 0.08 * Math.sin(this.t * 8))); // a little heartbeat
    });

    // mouth: ∪ for a smile, ∩ for a frown, flat in between; an opening when laughing or yawning
    const bend = Math.abs(this.smile);
    this.arc.rotation.z = this.smile >= 0 ? Math.PI : 0;
    const sy = 0.12 + 0.9 * bend;
    this.arc.scale.set(1 + 0.25 * bend, sy, 1);
    this.arc.position.y = (this.smile >= 0 ? 1 : -1) * 0.05 * sy * 0.5;
    this.arc.visible = this.open < 0.3;
    this.hole.visible = this.open > 0.04;
    this.hole.scale.set(0.75 + 0.35 * Math.max(0, this.smile), 0.25 + 0.95 * this.open, 0.35);

    // brows: worried ones tilt up in the middle, happy/surprised ones lift
    const worry = Math.max(0, -this.brow), lift = Math.max(0, this.brow);
    for (const g of this.brows) {
      const side = g.userData.side as number;
      g.rotation.z = -side * 0.42 * worry;
      g.position.y = this.browY + 0.035 * lift - 0.01 * worry;
    }

    // cheeks
    this.blushMat.opacity = 0.45 + 0.55 * this.blush;
    const cs = 0.85 + 0.45 * this.blush;
    for (const c of this.cheeks) c.scale.set(cs, cs, 1);
  }

  dispose() { this.blushMat.dispose(); this.browMat.dispose(); }
}
