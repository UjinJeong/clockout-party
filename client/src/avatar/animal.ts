import * as THREE from 'three';
import { colorHex, type Look } from '@party/shared';
import { blobShadow } from '../world/textures';

/**
 * Low-poly animals built from a handful of shared primitives: no model files,
 * no skeleton — about 1,500 triangles each, so twenty of them run fine on a phone.
 */
export interface AnimalRig {
  root: THREE.Group;     // placed on the floor, rotated to face the walking direction
  bodyPivot: THREE.Group; // bobs and leans
  head: THREE.Group;
  armL: THREE.Group; armR: THREE.Group;
  legL: THREE.Group; legR: THREE.Group;
  /** Sleepy eyes: a black half-moon under a heavy black lid line. Squash `pupil.scale.y` to close them. */
  eyes: { pupil: THREE.Mesh; lid: THREE.Mesh }[];
  /** Something held in the right paw (the wine glass); the animator keeps it upright. */
  held: THREE.Group | null;
  look: Look;
  dispose(): void;
}

const G = {
  body: new THREE.SphereGeometry(0.4, 10, 8),
  head: new THREE.SphereGeometry(0.34, 12, 9),
  limb: new THREE.CapsuleGeometry(0.085, 0.22, 3, 6),
  leg: new THREE.CapsuleGeometry(0.1, 0.14, 3, 6),
  roundEar: new THREE.SphereGeometry(0.11, 8, 6),
  coneEar: new THREE.ConeGeometry(0.12, 0.22, 4),
  longEar: new THREE.CapsuleGeometry(0.07, 0.32, 3, 6),
  // lower half of a sphere: flat on top, round underneath — a half-shut eye
  pupil: new THREE.SphereGeometry(0.05, 14, 6, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2),
  lidLine: new THREE.CapsuleGeometry(0.013, 0.09, 2, 8),
  muzzle: new THREE.SphereGeometry(0.13, 8, 6),
  nose: new THREE.SphereGeometry(0.035, 6, 5),
  beak: new THREE.ConeGeometry(0.07, 0.16, 6),
  tail: new THREE.SphereGeometry(0.09, 6, 5),
  catTail: new THREE.CapsuleGeometry(0.045, 0.42, 3, 5),
  cheek: new THREE.CircleGeometry(0.045, 10),
  foxTail: new THREE.CapsuleGeometry(0.1, 0.34, 3, 6),
  floppyEar: new THREE.CapsuleGeometry(0.08, 0.2, 3, 6),
  eyeBump: new THREE.SphereGeometry(0.11, 8, 6),
  mouth: new THREE.CapsuleGeometry(0.012, 0.2, 2, 6),
  shadow: new THREE.PlaneGeometry(1.1, 1.1),
};

const matCache = new Map<string, THREE.MeshStandardMaterial>();
function mat(color: string, opts: Partial<THREE.MeshStandardMaterialParameters> = {}) {
  const key = color + JSON.stringify(opts);
  let m = matCache.get(key);
  if (!m) {
    m = new THREE.MeshStandardMaterial({ color, roughness: 0.75, flatShading: true, ...opts });
    matCache.set(key, m);
    // dragging across the palette makes a new colour every frame: forget the oldest
    // (meshes still using one keep it; it's just no longer shared)
    if (matCache.size > 160) matCache.delete(matCache.keys().next().value!);
  }
  return m;
}
const EYE_BLACK = new THREE.MeshBasicMaterial({ color: '#141012' });
const tint = (hex: string, k: number) => '#' + new THREE.Color(hex).lerp(new THREE.Color(k > 0 ? '#ffffff' : '#000000'), Math.abs(k)).getHexString();

export function buildAnimal(look: Look): AnimalRig {
  const base = colorHex(look.color);
  const isPenguin = look.kind === 'penguin';
  const isFrog = look.kind === 'frog';
  const fur = mat(isPenguin ? tint(base, -0.35) : base);
  const light = mat(isPenguin ? '#f6f1e6' : tint(base, 0.55));
  const dark = mat('#231a1c', { roughness: 0.4 });
  const pink = mat('#f19aa8', { roughness: 0.9 });

  const root = new THREE.Group();
  const shadow = new THREE.Mesh(G.shadow, new THREE.MeshBasicMaterial({ map: blobShadow(), transparent: true, depthWrite: false }));
  shadow.rotation.x = -Math.PI / 2; shadow.position.y = 0.01; shadow.renderOrder = 2;
  root.add(shadow);

  const bodyPivot = new THREE.Group();
  root.add(bodyPivot);

  const add = (parent: THREE.Object3D, geo: THREE.BufferGeometry, m: THREE.Material, x: number, y: number, z: number, s?: [number, number, number]) => {
    const mesh = new THREE.Mesh(geo, m); mesh.position.set(x, y, z); if (s) mesh.scale.set(...s); parent.add(mesh); return mesh;
  };

  // legs (pivot at the hip so they can swing)
  const leg = (side: number) => {
    const g = new THREE.Group(); g.position.set(side * 0.16, 0.3, 0); root.add(g);
    add(g, G.leg, fur, 0, -0.17, 0);
    return g;
  };
  const legL = leg(-1), legR = leg(1);

  // body + belly
  add(bodyPivot, G.body, fur, 0, 0.62, 0, [1, isPenguin ? 1.2 : 1.05, 0.92]);
  add(bodyPivot, G.body, light, 0, 0.6, 0.12, [0.72, isPenguin ? 1.02 : 0.8, 0.7]);

  // arms (pivot at the shoulder)
  const arm = (side: number) => {
    const g = new THREE.Group(); g.position.set(side * 0.36, 0.86, 0); bodyPivot.add(g);
    const a = add(g, G.limb, fur, 0, -0.17, 0);
    if (isPenguin) a.scale.set(0.7, 1.1, 1.4);
    g.rotation.z = side * 0.18;
    return g;
  };
  const armL = arm(-1), armR = arm(1);

  // head
  const head = new THREE.Group(); head.position.set(0, 1.22, 0.02); bodyPivot.add(head);
  add(head, G.head, fur, 0, 0, 0, isFrog ? [1.15, 0.85, 1] : [1.05, 0.96, 1]);
  if (isPenguin) add(head, G.head, light, 0, -0.04, 0.1, [0.78, 0.72, 0.82]);

  // Sleepy eyes. Unlit black so lighting can never wash them out to grey;
  // the outer corners droop a little, like someone who just got off work.
  const eyes: AnimalRig['eyes'] = [];
  const eyeZ = isPenguin ? 0.33 : 0.312;
  for (const side of [-1, 1]) {
    const eye = new THREE.Group();
    // a frog's eyes sit up on two bumps on top of its head
    if (isFrog) eye.position.set(side * 0.15, 0.27, 0.225);
    else eye.position.set(side * 0.13, 0.045, eyeZ);
    eye.rotation.set(0, side * (isFrog ? 0.22 : 0.38), -side * 0.2, 'YXZ');
    head.add(eye);
    const pupil = new THREE.Mesh(G.pupil, EYE_BLACK);
    pupil.scale.set(1.15, 0.55, 0.45);
    const lid = new THREE.Mesh(G.lidLine, EYE_BLACK);
    lid.rotation.z = Math.PI / 2;
    lid.position.set(0, 0.002, 0.008);
    eye.add(pupil, lid);
    eyes.push({ pupil, lid });
    const ch = add(head, G.cheek, pink, side * 0.2, -0.07, 0.29);
    ch.lookAt(head.position.clone().add(new THREE.Vector3(side * 0.6, -0.2, 2)));
    (ch.material as THREE.Material).transparent = true;
  }

  switch (look.kind) {
    case 'bear':
      for (const s of [-1, 1]) { add(head, G.roundEar, fur, s * 0.24, 0.25, -0.02); add(head, G.roundEar, light, s * 0.24, 0.25, 0.04, [0.55, 0.55, 0.3]); }
      add(head, G.muzzle, light, 0, -0.1, 0.27, [1, 0.78, 0.8]);
      add(head, G.nose, dark, 0, -0.05, 0.37);
      add(bodyPivot, G.tail, fur, 0, 0.45, -0.38);
      break;
    case 'cat': {
      for (const s of [-1, 1]) { const e = add(head, G.coneEar, fur, s * 0.2, 0.3, 0); e.rotation.z = -s * 0.25; }
      add(head, G.muzzle, light, 0, -0.1, 0.26, [0.8, 0.6, 0.7]);
      add(head, G.nose, pink, 0, -0.06, 0.35);
      const t = add(bodyPivot, G.catTail, fur, 0, 0.62, -0.42); t.rotation.x = -0.9;
      break;
    }
    case 'rabbit':
      for (const s of [-1, 1]) {
        const e = add(head, G.longEar, fur, s * 0.12, 0.42, -0.04); e.rotation.z = -s * 0.15;
        if (s > 0) e.rotation.x = 0.5; // one floppy, tired ear
        const inner = add(e, G.longEar, pink, 0, 0, 0.03, [0.5, 0.82, 0.4]); void inner;
      }
      add(head, G.muzzle, light, 0, -0.1, 0.26, [0.75, 0.6, 0.7]);
      add(head, G.nose, pink, 0, -0.06, 0.35);
      add(bodyPivot, G.tail, light, 0, 0.42, -0.38, [1.3, 1.3, 1.3]);
      break;
    case 'fox': {
      for (const s of [-1, 1]) {
        const e = add(head, G.coneEar, fur, s * 0.19, 0.34, 0, [1.05, 1.4, 1]); e.rotation.z = -s * 0.22;
        const inner = add(head, G.coneEar, light, s * 0.185, 0.32, 0.04, [0.55, 0.9, 0.4]); inner.rotation.z = -s * 0.22;
        const tip = add(head, G.coneEar, dark, s * 0.21, 0.45, 0.005, [0.45, 0.45, 0.45]); tip.rotation.z = -s * 0.22;
        // pale cheek fluff
        add(head, G.muzzle, light, s * 0.12, -0.1, 0.22, [0.85, 0.6, 0.6]);
      }
      // a long pointed snout, pale underneath, with the nose at the very tip
      const snout = new THREE.Mesh(new THREE.ConeGeometry(0.11, 0.24, 8), light);
      snout.rotation.x = Math.PI / 2; snout.position.set(0, -0.08, 0.36); snout.scale.set(1.15, 1, 0.85); head.add(snout);
      add(head, G.nose, dark, 0, -0.075, 0.48);
      // the big bushy tail swings out to one side, so you see it from the front too
      const tail = add(bodyPivot, G.foxTail, fur, 0.22, 0.48, -0.32, [1.3, 1, 1.3]);
      tail.rotation.set(-0.5, 0, -1.0); tail.name = 'fox-tail';
      add(tail, G.tail, light, 0, 0.27, 0, [1.05, 1.05, 1.05]);
      break;
    }
    case 'dog': {
      for (const s of [-1, 1]) {
        // long, tired ears hanging down the sides
        const e = add(head, G.floppyEar, mat(tint(base, -0.3)), s * 0.3, 0.02, -0.01, [1, 1, 0.45]);
        e.rotation.z = s * 0.28; e.name = 'dog-ear';
      }
      add(head, G.muzzle, light, 0, -0.1, 0.27, [1.1, 0.85, 0.95]);
      add(head, G.nose, dark, 0, -0.04, 0.39, [1.4, 1.1, 1.1]);
      const t = add(bodyPivot, G.catTail, fur, 0, 0.6, -0.42, [1.3, 0.55, 1.3]); t.rotation.x = -0.6;
      break;
    }
    case 'frog': {
      for (const s of [-1, 1]) add(head, G.eyeBump, fur, s * 0.15, 0.24, 0.12);
      // a wide, flat, slightly tired mouth
      const m = add(head, G.mouth, dark, 0, -0.1, 0.31); m.rotation.z = Math.PI / 2; m.name = 'frog-mouth';
      break;
    }
    case 'penguin': {
      const b = add(head, G.beak, mat('#f0a43a'), 0, -0.06, 0.36); b.rotation.x = Math.PI / 2;
      legL.children[0].scale.set(1.2, 0.5, 1.6); legR.children[0].scale.set(1.2, 0.5, 1.6);
      (legL.children[0] as THREE.Mesh).material = mat('#f0a43a'); (legR.children[0] as THREE.Mesh).material = mat('#f0a43a');
      break;
    }
  }

  addHat(look, head);
  addOutfit(look, bodyPivot, isPenguin);
  const held = addHand(look, armR, isPenguin ? mat(tint(base, -0.35)) : fur);

  root.traverse(o => { if ((o as THREE.Mesh).isMesh) o.castShadow = false; });
  return {
    root, bodyPivot, head, armL, armR, legL, legR, eyes, held, look,
    dispose() { root.removeFromParent(); (shadow.material as THREE.Material).dispose(); },
  };
}

/** Something held in the right paw. Returns its group so the animator can keep it upright. */
function addHand(look: Look, armR: THREE.Group, paw: THREE.Material): THREE.Group | null {
  if (look.hand === 'none') return null;
  // Pivot at the paw; the item stands just in front of it.
  const g = new THREE.Group(); g.position.set(0, -0.33, 0); armR.add(g);
  const z = 0.12;
  // a curled paw wrapped around whatever it holds
  const grip = new THREE.Mesh(new THREE.SphereGeometry(0.05, 8, 6), paw); grip.position.set(0, -0.005, z - 0.035); grip.scale.set(1.1, 0.9, 0.9);
  switch (look.hand) {
    case 'wine': {
      const glass = mat('#e6eef0', { transparent: true, opacity: 0.45, roughness: 0.05, flatShading: false, side: THREE.DoubleSide, depthWrite: false });
      const foot = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.012, 10), glass); foot.position.set(0, -0.075, z);
      const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.15, 6), glass); stem.position.set(0, 0, z);
      // The cup is the lower part of a sphere, cut a little above its widest
      // point so the rim narrows like a real wine glass. It already opens upward.
      const R = 0.075, cy = 0.075 + R; // sits right on top of the stem
      const bowl = new THREE.Mesh(new THREE.SphereGeometry(R, 14, 8, 0, Math.PI * 2, Math.PI * 0.3, Math.PI * 0.7), glass);
      bowl.name = 'bowl';
      bowl.position.set(0, cy, z);
      // wine fills the bottom of the cup, with a flat surface on top
      const wr = R * 0.92, fill = Math.PI * 0.62;
      const red = mat('#7c1d2c', { roughness: 0.3, flatShading: false, side: THREE.DoubleSide });
      const wine = new THREE.Mesh(new THREE.SphereGeometry(wr, 14, 6, 0, Math.PI * 2, fill, Math.PI - fill), red);
      wine.position.set(0, cy, z);
      const surface = new THREE.Mesh(new THREE.CircleGeometry(wr * Math.sin(fill), 14), mat('#5e1220', { roughness: 0.2, flatShading: false }));
      surface.rotation.x = -Math.PI / 2;
      surface.position.set(0, cy + wr * Math.cos(fill) + 0.001, z);
      g.add(foot, stem, bowl, wine, surface, grip);
      break;
    }
    case 'coffee': {
      // 아아: a clear takeaway cup of iced americano, lid and straw
      const cup = mat('#eef3f4', { transparent: true, opacity: 0.4, roughness: 0.1, flatShading: false, depthWrite: false });
      const shell = new THREE.Mesh(new THREE.CylinderGeometry(0.068, 0.052, 0.2, 12, 1, true), cup); shell.position.set(0, 0.06, z);
      const coffee = new THREE.Mesh(new THREE.CylinderGeometry(0.062, 0.05, 0.15, 12), mat('#3b2216', { roughness: 0.3, flatShading: false }));
      coffee.position.set(0, 0.035, z);
      const ice = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.04, 0.04), mat('#dfeef2', { transparent: true, opacity: 0.7 }));
      ice.position.set(0.015, 0.1, z + 0.01); ice.rotation.set(0.4, 0.6, 0);
      const lid = new THREE.Mesh(new THREE.CylinderGeometry(0.072, 0.07, 0.018, 12), mat('#f4f1ea')); lid.position.set(0, 0.165, z);
      const straw = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.008, 0.2, 6), mat('#2e8b57')); straw.position.set(0.02, 0.24, z); straw.rotation.z = -0.15;
      g.add(shell, coffee, ice, lid, straw, grip);
      break;
    }
    case 'balloon': {
      // A balloon on a string, floating up and a little out to the side.
      const top = new THREE.Vector3(0.14, 0.62, z - 0.06);
      const from = new THREE.Vector3(0, 0.02, z);
      const len = from.distanceTo(top);
      const string = new THREE.Mesh(new THREE.CylinderGeometry(0.004, 0.004, len, 4), mat('#e9e2d6'));
      string.position.copy(from).lerp(top, 0.5);
      string.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), top.clone().sub(from).normalize());
      const red = mat('#e8556b', { roughness: 0.35, flatShading: false });
      const ball = new THREE.Mesh(new THREE.SphereGeometry(0.15, 14, 10), red); ball.scale.set(1, 1.15, 1);
      ball.position.copy(top).add(new THREE.Vector3(0, 0.17, 0)); ball.name = 'balloon';
      const knot = new THREE.Mesh(new THREE.ConeGeometry(0.03, 0.04, 6), red); knot.position.copy(top).add(new THREE.Vector3(0, 0.005, 0));
      g.add(string, ball, knot, grip);
      break;
    }
  }
  return g;
}

function addHat(look: Look, head: THREE.Group) {
  switch (look.hat) {
    case 'beret': {
      const b = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.27, 0.09, 12), mat('#7a2232'));
      b.position.set(0.04, 0.3, -0.02); b.rotation.z = -0.22;
      const nub = new THREE.Mesh(new THREE.SphereGeometry(0.03, 6, 4), mat('#7a2232'));
      nub.position.set(0.02, 0.06, 0); b.add(nub);
      head.add(b);
      break;
    }
    case 'ribbon': {
      const r = new THREE.Group(); r.position.set(0.18, 0.28, 0.08); r.rotation.z = -0.4; head.add(r);
      const m = mat('#e85d75');
      for (const s of [-1, 1]) { const c = new THREE.Mesh(new THREE.ConeGeometry(0.07, 0.14, 4), m); c.rotation.z = s * Math.PI / 2; c.position.x = s * 0.07; r.add(c); }
      r.add(new THREE.Mesh(new THREE.SphereGeometry(0.035, 6, 4), m));
      break;
    }
    case 'party': {
      // a paper party cone, a little crooked, with a pompom
      const h = new THREE.Group(); h.position.set(-0.07, 0.32, 0.02); h.rotation.z = 0.25; head.add(h);
      const cone = new THREE.Mesh(new THREE.ConeGeometry(0.13, 0.34, 10), mat('#f0c75e'));
      cone.position.y = 0.17;
      const band = new THREE.Mesh(new THREE.CylinderGeometry(0.085, 0.1, 0.06, 10), mat('#5aa6c8')); band.position.y = 0.09;
      const pom = new THREE.Mesh(new THREE.SphereGeometry(0.045, 8, 6), mat('#e85d75')); pom.position.y = 0.35;
      h.add(cone, band, pom);
      break;
    }
    case 'headphones': {
      const m = mat('#2b2a33', { roughness: 0.5 });
      const band = new THREE.Mesh(new THREE.TorusGeometry(0.35, 0.028, 6, 18, Math.PI), m);
      band.position.set(0, 0.0, -0.02);
      head.add(band);
      for (const s of [-1, 1]) {
        const cup = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.07, 12), m);
        cup.rotation.z = Math.PI / 2; cup.position.set(s * 0.35, 0.0, -0.02);
        const pad = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.075, 0.075, 12), mat('#e85d75'));
        pad.rotation.z = Math.PI / 2; pad.position.set(s * 0.375, 0.0, -0.02);
        head.add(cup, pad);
      }
      break;
    }
    case 'eyemask': {
      // a sleep mask pushed up on the forehead: ready for a nap at any moment
      const m = mat('#b9a7d8', { roughness: 0.9 });
      const strap = new THREE.Mesh(new THREE.TorusGeometry(0.33, 0.018, 4, 20), mat('#8a77ad'));
      strap.rotation.x = Math.PI / 2 - 0.25; strap.position.set(0, 0.16, -0.01);
      head.add(strap);
      for (const s of [-1, 1]) {
        const pad = new THREE.Mesh(new THREE.SphereGeometry(0.09, 10, 6), m);
        pad.scale.set(1.1, 0.62, 0.35); pad.position.set(s * 0.085, 0.2, 0.27); pad.rotation.y = s * 0.3;
        // a little stitched closed eye on each pad
        const lash = new THREE.Mesh(G.lidLine, EYE_BLACK); lash.rotation.z = Math.PI / 2; lash.scale.set(0.8, 0.8, 0.8);
        lash.position.set(s * 0.085, 0.2, 0.305); lash.rotation.y = s * 0.3;
        head.add(pad, lash);
      }
      break;
    }
  }
}

function addOutfit(look: Look, body: THREE.Group, isPenguin: boolean) {
  const front = isPenguin ? 0.02 : 0; // the penguin's belly sticks out a touch more
  switch (look.outfit) {
    case 'tie': {
      // loosened after work: the knot pulled down and a little crooked
      const m = mat('#2f3e6e', { roughness: 0.6 });
      const t = new THREE.Group(); t.position.set(0.015, 0, 0); t.rotation.z = 0.12; body.add(t);
      const knot = new THREE.Mesh(new THREE.BoxGeometry(0.075, 0.06, 0.04), m); knot.position.set(0, 0.92, 0.27 + front);
      const blade = new THREE.Mesh(new THREE.BoxGeometry(0.085, 0.27, 0.02), m); blade.position.set(0, 0.76, 0.37 + front); blade.rotation.x = -0.35;
      const stripe = new THREE.Mesh(new THREE.BoxGeometry(0.087, 0.025, 0.022), mat('#c9a25e')); stripe.position.set(0, 0.8, 0.364 + front); stripe.rotation.x = -0.35;
      t.add(knot, blade, stripe);
      break;
    }
    case 'scarf': {
      const m = mat('#c8553d', { roughness: 0.95 });
      const ring = new THREE.Mesh(new THREE.TorusGeometry(0.25, 0.075, 6, 14), m);
      ring.rotation.x = Math.PI / 2; ring.position.set(0, 1.0, 0.02);
      const tail = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.24, 0.05), m);
      tail.position.set(0.12, 0.86, 0.27 + front); tail.rotation.set(-0.3, 0, 0.12);
      body.add(ring, tail);
      break;
    }
    case 'badge': {
      // 사원증: the work ID still hanging on its lanyard
      const cord = mat('#3d6fb4');
      const card = new THREE.Vector3(0, 0.72, 0.4 + front);
      for (const s of [-1, 1]) {
        const from = new THREE.Vector3(s * 0.15, 1.0, 0.12);
        const to = card.clone().add(new THREE.Vector3(0, 0.08, -0.01));
        const len = from.distanceTo(to);
        const c = new THREE.Mesh(new THREE.CylinderGeometry(0.01, 0.01, len, 4), cord);
        c.position.copy(from).lerp(to, 0.5);
        c.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), to.clone().sub(from).normalize());
        body.add(c);
      }
      const id = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.16, 0.012), mat('#f6f3ec'));
      id.position.copy(card); id.rotation.x = -0.25;
      const stripe = new THREE.Mesh(new THREE.BoxGeometry(0.122, 0.035, 0.014), cord);
      stripe.position.copy(card).add(new THREE.Vector3(0, 0.06, 0.016)); stripe.rotation.x = -0.25;
      const photo = new THREE.Mesh(new THREE.BoxGeometry(0.045, 0.05, 0.014), mat('#c9b8a6'));
      photo.position.copy(card).add(new THREE.Vector3(-0.025, -0.01, 0.006)); photo.rotation.x = -0.25;
      body.add(id, stripe, photo);
      break;
    }
  }
}
