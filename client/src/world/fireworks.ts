import * as THREE from 'three';

/**
 * 🎆 Fireworks over the sea. One pool of glowing points (a single draw call)
 * shared by rockets, their sparkly trails and the bursts. Everything comes
 * from a seed, so the same volley looks the same on every guest's screen.
 *
 * Burst shapes: peony (a round ball), ring, willow (long gold drips),
 * heart (it's a party) and glitter (crackling sparkles).
 */
export type Shape = 'peony' | 'ring' | 'willow' | 'heart' | 'glitter';
export const SHAPES: Shape[] = ['peony', 'ring', 'willow', 'heart', 'glitter'];

const PALETTES = [
  ['#ff5d8f', '#ffc2d4'], ['#ffd27a', '#fff1c4'], ['#7ad7ff', '#e6f7ff'], ['#9dff9a', '#f0ffe8'],
  ['#c49bff', '#f2e6ff'], ['#ff8a3a', '#ffe0b0'], ['#ffffff', '#ffe9a8'],
];

/** Small, fast, seedable random numbers (mulberry32). */
export function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export interface Rocket { at: number; x: number; z: number; height: number; shape: Shape; colors: [string, string]; size: number }

/** The rockets of one volley: when each goes up (s after start), where, what it becomes. Pure, so it can be tested. */
export function planVolley(seed: number, centerX: number, count = 4): Rocket[] {
  const r = rng(seed);
  const out: Rocket[] = [];
  for (let i = 0; i < count; i++) {
    const shape = SHAPES[Math.floor(r() * SHAPES.length)];
    const pal = PALETTES[Math.floor(r() * PALETTES.length)] as [string, string];
    out.push({
      at: i * (0.35 + r() * 0.5),
      x: centerX + (r() - 0.5) * 22,
      z: -24 - r() * 8,
      height: 5 + r() * 2.6,
      shape,
      colors: shape === 'willow' ? ['#ffcf6a', '#fff1c4'] : pal,
      size: 3.4 + r() * 2.2,
    });
  }
  return out;
}

/** Directions for a burst's sparks (unit-ish vectors; heart and ring lie in the plane facing the camera). */
export function burstDirections(shape: Shape, n: number, r: () => number): THREE.Vector3[] {
  const out: THREE.Vector3[] = [];
  for (let i = 0; i < n; i++) {
    const u = i / n;
    switch (shape) {
      case 'ring': { const a = u * Math.PI * 2; out.push(new THREE.Vector3(Math.cos(a), Math.sin(a), (r() - 0.5) * 0.15)); break; }
      case 'heart': {
        // the classic heart curve, scaled to about unit size
        const a = u * Math.PI * 2;
        const x = 16 * Math.sin(a) ** 3, y = 13 * Math.cos(a) - 5 * Math.cos(2 * a) - 2 * Math.cos(3 * a) - Math.cos(4 * a);
        out.push(new THREE.Vector3(x / 17, y / 17 + 0.15, (r() - 0.5) * 0.12));
        break;
      }
      default: {
        // evenly spread over a sphere (golden spiral), a touch of jitter
        const y = 1 - 2 * (i + 0.5) / n, rad = Math.sqrt(1 - y * y), a = i * 2.399963;
        const j = shape === 'glitter' ? 0.75 + r() * 0.35 : 0.92 + r() * 0.12;
        out.push(new THREE.Vector3(Math.cos(a) * rad * j, y * j, Math.sin(a) * rad * j));
      }
    }
  }
  return out;
}

const MAX = 2600;
const GRAVITY = 2.2;

interface Spark { alive: boolean; p: THREE.Vector3; v: THREE.Vector3; age: number; life: number; c0: THREE.Color; c1: THREE.Color; size: number; drag: number; grav: number; twinkle: number; trail: boolean }

const VERT = /* glsl */ `
attribute float aSize;
attribute vec3 aColor;
varying vec3 vColor;
void main() {
  vColor = aColor;
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  gl_PointSize = aSize * (260.0 / -mv.z);
  gl_Position = projectionMatrix * mv;
}`;
const FRAG = /* glsl */ `
varying vec3 vColor;
void main() {
  vec2 d = gl_PointCoord - 0.5;
  float r = length(d);
  float a = smoothstep(0.5, 0.0, r);
  gl_FragColor = vec4(vColor * a * (0.6 + 0.8 * smoothstep(0.25, 0.0, r)), 1.0);
}`;

export interface FireworkSounds {
  launch(at: THREE.Vector3): void;
  burst(at: THREE.Vector3, shape: Shape): void;
}

export class Fireworks {
  readonly points: THREE.Points;
  /** Light from the bursts this frame, to tint the scene (0–1+). */
  readonly flash = new THREE.Color(0, 0, 0);
  private sparks: Spark[] = [];
  private pos = new Float32Array(MAX * 3);
  private col = new Float32Array(MAX * 3);
  private size = new Float32Array(MAX);
  private pending: { t: number; rocket: Rocket; seed: number }[] = [];
  private rockets: { s: Spark; rocket: Rocket; r: () => number; burstAt: number }[] = [];
  private t = 0;
  private lastActivity = -999;

  constructor(scene: THREE.Object3D, private sounds?: FireworkSounds) {
    for (let i = 0; i < MAX; i++) this.sparks.push({ alive: false, p: new THREE.Vector3(), v: new THREE.Vector3(), age: 0, life: 1, c0: new THREE.Color(), c1: new THREE.Color(), size: 1, drag: 0, grav: 0, twinkle: 0, trail: false });
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(this.pos, 3).setUsage(THREE.DynamicDrawUsage));
    g.setAttribute('aColor', new THREE.BufferAttribute(this.col, 3).setUsage(THREE.DynamicDrawUsage));
    g.setAttribute('aSize', new THREE.BufferAttribute(this.size, 1).setUsage(THREE.DynamicDrawUsage));
    g.boundingSphere = new THREE.Sphere(new THREE.Vector3(20, 8, -28), 80);
    const m = new THREE.ShaderMaterial({ vertexShader: VERT, fragmentShader: FRAG, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, fog: false });
    this.points = new THREE.Points(g, m);
    this.points.frustumCulled = false;
    this.points.renderOrder = 3;
    scene.add(this.points);
  }

  /** Is anything in the air (or about to be)? */
  get busy() { return this.pending.length > 0 || this.rockets.length > 0 || this.t - this.lastActivity < 2.5; }

  /** Seconds since the last rocket went up (for the camera's look up). */
  sinceActive() { return this.t - this.lastActivity; }

  /** Send up a volley, centred over `centerX`. */
  volley(seed: number, centerX: number, count = 4) {
    for (const rocket of planVolley(seed, centerX, count)) this.pending.push({ t: this.t + rocket.at, rocket, seed: seed + Math.round(rocket.x * 997) });
  }

  private spawn(): Spark | null {
    for (const s of this.sparks) if (!s.alive) { s.alive = true; s.age = 0; return s; }
    return null; // too many at once: just skip this one
  }

  private launch(rocket: Rocket, seed: number) {
    const s = this.spawn();
    if (!s) return;
    const r = rng(seed);
    const rise = 1.05 + r() * 0.3;
    s.p.set(rocket.x, -0.3, rocket.z);
    s.v.set((r() - 0.5) * 0.6, (rocket.height + 0.3) / rise + GRAVITY * rise / 2, 0);
    s.life = rise + 0.2; s.size = 1.6; s.drag = 0; s.grav = GRAVITY; s.twinkle = 0; s.trail = true;
    s.c0.set('#fff2cf'); s.c1.set('#ffb35c');
    this.rockets.push({ s, rocket, r, burstAt: this.t + rise });
    this.lastActivity = this.t;
    this.sounds?.launch(s.p.clone());
  }

  private burst(at: THREE.Vector3, rocket: Rocket, r: () => number) {
    const shape = rocket.shape;
    const n = shape === 'willow' ? 110 : shape === 'heart' ? 90 : shape === 'ring' ? 80 : shape === 'glitter' ? 140 : 150;
    const speed = rocket.size * (shape === 'willow' ? 1.0 : 1.35);
    const c0 = new THREE.Color(rocket.colors[0]), c1 = new THREE.Color(rocket.colors[1]);
    // tilt flat shapes a little so they don't all face the same way
    const tilt = new THREE.Euler((r() - 0.5) * 0.5, (r() - 0.5) * 0.6, (r() - 0.5) * 0.5);
    for (const d of burstDirections(shape, n, r)) {
      const s = this.spawn();
      if (!s) break;
      d.applyEuler(tilt);
      s.p.copy(at);
      s.v.copy(d).multiplyScalar(speed * (0.85 + r() * 0.3));
      s.life = shape === 'willow' ? 2.6 + r() * 0.8 : shape === 'glitter' ? 1.3 + r() * 0.9 : 1.5 + r() * 0.5;
      s.size = shape === 'glitter' ? 0.9 : 1.25;
      s.drag = shape === 'willow' ? 1.6 : 1.1;
      s.grav = shape === 'willow' ? 1.3 : 0.75;
      s.twinkle = shape === 'glitter' ? 1 : shape === 'peony' ? 0.25 : 0;
      s.trail = shape === 'willow';
      s.c0.copy(c0).lerp(c1, r() * 0.3); s.c1.copy(c1);
    }
    // a white flash in the middle
    for (let k = 0; k < 6; k++) {
      const s = this.spawn(); if (!s) break;
      s.p.copy(at); s.v.set((r() - 0.5) * 0.4, (r() - 0.5) * 0.4, 0);
      s.life = 0.22; s.size = 5; s.drag = 4; s.grav = 0; s.twinkle = 0; s.trail = false; s.c0.set('#ffffff'); s.c1.copy(c0);
    }
    this.flash.add(c0.clone().multiplyScalar(0.9));
    this.lastActivity = this.t;
    this.sounds?.burst(at.clone(), shape);
  }

  tick(dt: number) {
    this.t += dt;
    // rockets due to go up
    for (let i = this.pending.length - 1; i >= 0; i--) {
      if (this.pending[i].t <= this.t) { const p = this.pending[i]; this.pending.splice(i, 1); this.launch(p.rocket, p.seed); }
    }
    // rockets reaching the top burst
    for (let i = this.rockets.length - 1; i >= 0; i--) {
      const k = this.rockets[i];
      if (this.t >= k.burstAt) { this.rockets.splice(i, 1); k.s.alive = false; this.burst(k.s.p.clone(), k.rocket, k.r); }
    }
    this.flash.multiplyScalar(Math.exp(-dt * 5));

    const trailFrom: Spark[] = [];
    let n = 0;
    for (const s of this.sparks) {
      if (!s.alive) continue;
      s.age += dt;
      if (s.age >= s.life) { s.alive = false; continue; }
      s.v.multiplyScalar(Math.exp(-s.drag * dt));
      s.v.y -= s.grav * dt;
      s.p.addScaledVector(s.v, dt);
      if (s.trail && Math.random() < dt * 30) trailFrom.push(s);
      const u = s.age / s.life;
      const fade = (1 - u) * (1 - u);
      const tw = s.twinkle ? (Math.random() < 0.5 ? 0.25 : 1) : 1;
      const i3 = n * 3;
      this.pos[i3] = s.p.x; this.pos[i3 + 1] = s.p.y; this.pos[i3 + 2] = s.p.z;
      const c = TMP.copy(s.c0).lerp(s.c1, u).multiplyScalar(fade * tw * (s.twinkle ? 1.3 : 1));
      this.col[i3] = c.r; this.col[i3 + 1] = c.g; this.col[i3 + 2] = c.b;
      this.size[n] = s.size * (1 - u * 0.4);
      n++;
    }
    // sparkly trails behind rockets and willow drips
    for (const from of trailFrom) {
      const s = this.spawn(); if (!s) break;
      s.p.copy(from.p); s.v.set((Math.random() - 0.5) * 0.3, -0.2, 0);
      s.life = 0.5; s.size = 0.7; s.drag = 2; s.grav = 0.6; s.twinkle = 0.5; s.trail = false;
      s.c0.copy(from.c0).multiplyScalar(0.7); s.c1.set('#3a2010');
    }
    const g = this.points.geometry;
    g.setDrawRange(0, n);
    (g.attributes.position as THREE.BufferAttribute).needsUpdate = true;
    (g.attributes.aColor as THREE.BufferAttribute).needsUpdate = true;
    (g.attributes.aSize as THREE.BufferAttribute).needsUpdate = true;
  }

  /** How many sparks are glowing right now (for tests). */
  get live() { let n = 0; for (const s of this.sparks) if (s.alive) n++; return n; }

  dispose() {
    this.points.removeFromParent();
    this.points.geometry.dispose();
    (this.points.material as THREE.Material).dispose();
  }
}

const TMP = new THREE.Color();
