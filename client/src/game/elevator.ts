import * as THREE from 'three';
import { glow } from '../world/decor';
import { textPlate } from '../world/textures';

/**
 * 퇴근 엘리베이터: how everyone arrives at the party. A lift comes up through
 * the floor, dings, the doors slide open, you step out (and loosen your tie
 * with a sigh — see the animator), the doors close and it sinks away again.
 * Pure decoration: the guest's real position never changes; we only tell the
 * party where to draw them while they're stepping out.
 */
export const ARRIVAL = {
  rise: 0.7,  // coming up through the floor
  open: 1.5,  // ding at `rise`, doors fully open by here
  out: 2.5,   // stepped out by here
  close: 3.2, // doors shut again
  end: 4.0,   // sunk away
} as const;

/** Going home: the same lift, the other way round. You walk in, turn, wave; the doors close on you. */
export const DEPARTURE = {
  rise: 0.7,  // coming up through the floor
  open: 1.4,  // doors open
  inside: 2.5, // walked in and turned round by here
  close: 3.4, // doors shut on a wave
  end: 4.2,   // sunk away
} as const;

const W = 1.36, H = 2.3, DEPTH = 0.9;
/** Going home you stand a little further back, so no nose or raised paw pokes through the closing doors. */
const DEEPER = 0.2;
/** How far inside the lift a guest stands before stepping out. */
const INSIDE = 0.62;

const M = {
  frame: new THREE.MeshStandardMaterial({ color: 0xb9a37a, metalness: 0.75, roughness: 0.3 }),
  door: new THREE.MeshStandardMaterial({ color: 0xc9ccd0, metalness: 0.85, roughness: 0.22 }),
  cabin: new THREE.MeshStandardMaterial({ color: 0x5a4636, roughness: 0.7 }),
  light: new THREE.MeshBasicMaterial({ color: 0xffe6b8 }),
};

export class Elevator {
  readonly group = new THREE.Group();
  t = 0;
  done = false;
  private doors: THREE.Mesh[] = [];
  private halo: THREE.Sprite;
  private dinged = false;
  private baseY = 0; // the floor it comes up through (upstairs is higher)

  constructor(private scene: THREE.Scene, at: THREE.Vector3, dir: number, private onDing?: () => void, readonly leaving = false) {
    // The lift stands just behind where the guest will be, facing the way they face.
    const g = this.group;
    g.rotation.y = dir;
    const back = new THREE.Vector3(0, 0, -INSIDE).applyAxisAngle(new THREE.Vector3(0, 1, 0), dir);
    this.baseY = at.y;
    g.position.set(at.x + back.x, at.y - H - 0.2, at.z + back.z);
    const add = (geo: THREE.BufferGeometry, mat: THREE.Material, x: number, y: number, z: number) => {
      const m = new THREE.Mesh(geo, mat); m.position.set(x, y, z); g.add(m); return m;
    };
    // cabin: back and sides, a warm ceiling light
    add(new THREE.BoxGeometry(W, H, 0.06), M.cabin, 0, H / 2, -DEPTH / 2);
    for (const s of [-1, 1]) add(new THREE.BoxGeometry(0.06, H, DEPTH), M.cabin, s * W / 2, H / 2, 0);
    add(new THREE.BoxGeometry(W, 0.06, DEPTH), M.cabin, 0, H, 0);
    add(new THREE.BoxGeometry(W * 0.6, 0.03, DEPTH * 0.5), M.light, 0, H - 0.04, 0);
    // a brass frame around the opening, with a little display on top
    const fz = DEPTH / 2;
    for (const s of [-1, 1]) add(new THREE.BoxGeometry(0.12, H + 0.1, 0.12), M.frame, s * (W / 2 + 0.03), (H + 0.1) / 2, fz);
    add(new THREE.BoxGeometry(W + 0.2, 0.34, 0.12), M.frame, 0, H + 0.17, fz);
    const sign = textPlate([{ text: '▼ 퇴근', font: '700 44px "IBM Plex Sans KR", sans-serif', color: '#ffb35c', y: 60 }], 256, 96, '#1c1416');
    add(new THREE.PlaneGeometry(0.62, 0.24), new THREE.MeshBasicMaterial({ map: sign }), 0, H + 0.17, fz + 0.065);
    // two sliding doors
    for (const s of [-1, 1]) {
      const d = add(new THREE.BoxGeometry(W / 2, H, 0.04), M.door, s * W / 4, H / 2, fz - 0.02);
      d.userData.side = s;
      this.doors.push(d);
    }
    // warm light spilling out when the doors open
    this.halo = new THREE.Sprite(new THREE.SpriteMaterial({ map: glow(), color: 0xffd9a0, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending }));
    this.halo.position.set(0, H * 0.55, fz + 0.1);
    this.halo.scale.set(2.2, 2.8, 1);
    g.add(this.halo);
    scene.add(g);
  }

  /** Door opening, 0 (shut) to 1 (wide open), at the current time. */
  private openness() {
    const t = this.t;
    if (this.leaving) {
      const D = DEPARTURE;
      if (t < D.rise) return 0;
      if (t < D.open) return smooth((t - D.rise) / (D.open - D.rise));
      if (t < D.inside + 0.25) return 1;
      return 1 - smooth((t - D.inside - 0.25) / (D.close - D.inside - 0.25));
    }
    if (t < ARRIVAL.rise) return 0;
    if (t < ARRIVAL.open) return smooth((t - ARRIVAL.rise) / (ARRIVAL.open - ARRIVAL.rise));
    if (t < ARRIVAL.out) return 1;
    if (t < ARRIVAL.close) return 1 - smooth((t - ARRIVAL.out) / (ARRIVAL.close - ARRIVAL.out));
    return 0;
  }

  /** The gap between the doors, in metres. */
  doorGap() { return Math.abs(this.doors[1].position.x - this.doors[0].position.x) - W / 2; }

  /** Should the arriving guest be drawn yet? (Not while the doors are still shut on the way up.) */
  guestVisible() { return this.leaving ? this.t < DEPARTURE.inside || this.openness() > 0.18 : this.t >= ARRIVAL.rise + 0.15; }

  /** How far back inside the lift the guest is right now (0 = out on the floor). */
  guestOffset() {
    const t = this.t;
    if (this.leaving) return (INSIDE + DEEPER) * smooth((t - DEPARTURE.open) / (DEPARTURE.inside - 0.35 - DEPARTURE.open));
    if (t < ARRIVAL.open - 0.3) return INSIDE;
    if (t >= ARRIVAL.out) return 0;
    return INSIDE * (1 - smooth((t - (ARRIVAL.open - 0.3)) / (ARRIVAL.out - (ARRIVAL.open - 0.3))));
  }

  /** Is the guest walking out right now? (for the walk cycle) */
  stepping() { return this.leaving ? this.t > DEPARTURE.open && this.t < DEPARTURE.inside - 0.35 : this.t > ARRIVAL.open - 0.3 && this.t < ARRIVAL.out; }

  /** Leaving: walked in and turned to face the room (time to wave)? */
  turned() { return this.leaving && this.t >= DEPARTURE.inside - 0.35; }

  update(dt: number) {
    if (this.done) return;
    this.t += dt;
    const t = this.t;
    // up through the floor, and back down at the end
    const T = this.leaving ? DEPARTURE : ARRIVAL;
    const y = t < T.rise ? -(H + 0.2) * (1 - smooth(t / T.rise))
      : t > T.close ? -(H + 0.2) * smooth((t - T.close) / (T.end - T.close)) : 0;
    this.group.position.y = this.baseY + y;
    if (!this.dinged && t >= T.rise) { this.dinged = true; this.onDing?.(); }
    const o = this.openness();
    for (const d of this.doors) d.position.x = (d.userData.side as number) * (W / 4 + o * W * 0.47);
    (this.halo.material as THREE.SpriteMaterial).opacity = o * 0.75;
    if (t >= T.end) this.dispose();
  }

  dispose() {
    if (this.done) return;
    this.done = true;
    this.group.removeFromParent();
    this.group.traverse(o => { const m = o as THREE.Mesh; if (m.geometry) m.geometry.dispose(); });
    void this.scene;
  }
}

const smooth = (x: number) => { const t = Math.min(1, Math.max(0, x)); return t * t * (3 - 2 * t); };
