import * as THREE from 'three';
import { PALETTE, type Look } from '@party/shared';
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
  lids: THREE.Mesh[];    // eyelids: lower = sleepier
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
  eye: new THREE.SphereGeometry(0.045, 8, 6),
  lid: new THREE.SphereGeometry(0.052, 8, 6, 0, Math.PI * 2, 0, Math.PI / 2),
  muzzle: new THREE.SphereGeometry(0.13, 8, 6),
  nose: new THREE.SphereGeometry(0.035, 6, 5),
  beak: new THREE.ConeGeometry(0.07, 0.16, 6),
  tail: new THREE.SphereGeometry(0.09, 6, 5),
  catTail: new THREE.CapsuleGeometry(0.045, 0.42, 3, 5),
  cheek: new THREE.CircleGeometry(0.045, 10),
  shadow: new THREE.PlaneGeometry(1.1, 1.1),
};

const matCache = new Map<string, THREE.MeshStandardMaterial>();
function mat(color: string, opts: Partial<THREE.MeshStandardMaterialParameters> = {}) {
  const key = color + JSON.stringify(opts);
  let m = matCache.get(key);
  if (!m) { m = new THREE.MeshStandardMaterial({ color, roughness: 0.75, flatShading: true, ...opts }); matCache.set(key, m); }
  return m;
}
const tint = (hex: string, k: number) => '#' + new THREE.Color(hex).lerp(new THREE.Color(k > 0 ? '#ffffff' : '#000000'), Math.abs(k)).getHexString();

export function buildAnimal(look: Look): AnimalRig {
  const base = PALETTE[look.color] ?? PALETTE[0];
  const isPenguin = look.kind === 'penguin';
  const fur = mat(isPenguin ? tint(base, -0.35) : base);
  const light = mat(isPenguin ? '#f6f1e6' : tint(base, 0.55));
  const dark = mat('#231a1c', { roughness: 0.4 });
  const lidMat = mat(tint(base, isPenguin ? -0.25 : -0.12));
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
  add(head, G.head, fur, 0, 0, 0, [1.05, 0.96, 1]);
  if (isPenguin) add(head, G.head, light, 0, -0.04, 0.1, [0.78, 0.72, 0.82]);

  // sleepy eyes: dark eyes with heavy lids
  const lids: THREE.Mesh[] = [];
  for (const side of [-1, 1]) {
    add(head, G.eye, dark, side * 0.13, 0.03, 0.3);
    const lid = add(head, G.lid, lidMat, side * 0.13, 0.03, 0.302);
    lid.rotation.x = -0.2;
    lids.push(lid);
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
    case 'penguin': {
      const b = add(head, G.beak, mat('#f0a43a'), 0, -0.06, 0.36); b.rotation.x = Math.PI / 2;
      legL.children[0].scale.set(1.2, 0.5, 1.6); legR.children[0].scale.set(1.2, 0.5, 1.6);
      (legL.children[0] as THREE.Mesh).material = mat('#f0a43a'); (legR.children[0] as THREE.Mesh).material = mat('#f0a43a');
      break;
    }
  }

  addProp(look, head, armR);

  root.traverse(o => { if ((o as THREE.Mesh).isMesh) o.castShadow = false; });
  return {
    root, bodyPivot, head, armL, armR, legL, legR, lids, look,
    dispose() { root.removeFromParent(); (shadow.material as THREE.Material).dispose(); },
  };
}

function addProp(look: Look, head: THREE.Group, armR: THREE.Group) {
  switch (look.prop) {
    case 'wine': {
      const g = new THREE.Group(); g.position.set(0, -0.36, 0.08); armR.add(g);
      const glass = mat('#e6eef0', { transparent: true, opacity: 0.5, roughness: 0.05, flatShading: false });
      const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.14, 5), glass); stem.position.y = 0.07;
      const foot = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.01, 8), glass);
      const bowl = new THREE.Mesh(new THREE.SphereGeometry(0.075, 10, 7, 0, Math.PI * 2, Math.PI / 2.4, Math.PI / 1.7), glass);
      bowl.position.y = 0.2; bowl.rotation.x = Math.PI;
      const wine = new THREE.Mesh(new THREE.SphereGeometry(0.06, 10, 6, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2), mat('#7c1d2c', { roughness: 0.3, flatShading: false }));
      wine.position.y = 0.19; wine.rotation.x = Math.PI;
      g.add(stem, foot, bowl, wine);
      break;
    }
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
  }
}
