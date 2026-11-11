import * as THREE from 'three';
import { POOL, POOL_MAP, showAt } from '@party/shared';
import { SkyPainter, skyAt } from './sky';
import { canvasTexture, textPlate } from './textures';
import { glow } from './decor';
import { builder, flames, rnd, std, stringLights, tiles } from './kit';
import { buildStage } from './djStage';
import { stepFloats, type FloatBody, type Pusher } from './floatPhysics';
import { Fireworks } from './fireworks';
import { sound } from '../audio/sound';
import type { WorldParts } from './world';

/**
 * 🏖️ The pool party, outdoors under the visitor's own sky:
 *   바 오두막 cabana bar (0–12): thatched roof, cocktails, tiki torches
 *   수영장 pool (12–30): loungers, palms, floats drifting on the water — walk in and you get a swim ring
 *   모래사장 sand (30–40): umbrellas, a DJ booth, and a bonfire that comes alive at night
 * The sea stretches to the horizon behind it all.
 */
const B = POOL_MAP.bounds;
const P = POOL.pool;
const WATER_Y = -0.08;
const DEPTH = 1.1;

export function buildPool(scene: THREE.Scene, renderer: THREE.WebGLRenderer): WorldParts {
  const maxAniso = renderer.capabilities.getMaxAnisotropy();
  const group = new THREE.Group();
  scene.add(group);
  const { add, box, block, cyl } = builder(group);
  const fx = flames(group);
  const lights = stringLights(group, ['#ffd9a0', '#ff9fb5', '#9fe0ff', '#ffe88a', '#b6f5c9'].map(c => new THREE.Color(c)));
  let t = 0, night = 0;

  const M = {
    deck: new THREE.MeshStandardMaterial({ map: tiles('#e9dcc4', '#e2d3b8', 4, 'rgba(150,130,100,.35)'), roughness: 0.85 }),
    sand: new THREE.MeshStandardMaterial({ map: sandTexture(), roughness: 1 }),
    coping: std('#f6f1e6', { roughness: 0.7 }),
    poolTile: new THREE.MeshStandardMaterial({ map: tiles('#7fd0e6', '#6cc4dc', 8, 'rgba(255,255,255,.35)'), roughness: 0.4 }),
    bamboo: new THREE.MeshStandardMaterial({ map: bambooTexture(), roughness: 0.8 }),
    wood: std('#8a5a32', { roughness: 0.7 }),
    straw: std('#d8b46a', { roughness: 1, flatShading: true }),
    white: std('#f7f4ee', { roughness: 0.6 }),
    trunk: std('#8a6a48', { roughness: 0.9, flatShading: true }),
    frond: std('#3f8a4a', { roughness: 0.8, flatShading: true, side: THREE.DoubleSide }),
    frond2: std('#58a35a', { roughness: 0.8, flatShading: true, side: THREE.DoubleSide }),
    black: std('#1d1a1c', { roughness: 0.5 }),
    rock: std('#8c8378', { roughness: 1, flatShading: true }),
    hedge: std('#3d6b3f', { roughness: 1, flatShading: true }),
  };
  for (const m of [M.deck, M.sand, M.poolTile]) (m.map as THREE.Texture).anisotropy = Math.min(8, maxAniso);
  (M.deck.map as THREE.Texture).repeat.set(8, 5);
  (M.sand.map as THREE.Texture).repeat.set(4, 4);
  (M.poolTile.map as THREE.Texture).repeat.set(6, 2);

  // ---- ground: stone deck around the pool, sand at the end, lawn in front ----
  const ground = (x0: number, x1: number, z0: number, z1: number, mat: THREE.Material, y = 0) => {
    const g = add(new THREE.PlaneGeometry(x1 - x0, z1 - z0), mat, (x0 + x1) / 2, y, (z0 + z1) / 2);
    g.rotation.x = -Math.PI / 2;
    const tex = (mat as THREE.MeshStandardMaterial).map;
    if (tex) { const own = tex.clone(); own.repeat.set((x1 - x0) / 2.5, (z1 - z0) / 2.5); own.needsUpdate = true; g.material = (mat as THREE.MeshStandardMaterial).clone(); (g.material as THREE.MeshStandardMaterial).map = own; }
    return g;
  };
  ground(B.x0, P.x0, B.z0, B.z1, M.deck);
  ground(P.x1, 30, B.z0, B.z1, M.deck);
  ground(P.x0, P.x1, B.z0, P.z0, M.deck);
  ground(P.x0, P.x1, P.z1, B.z1, M.deck);
  ground(30, B.x1, B.z0, B.z1, M.sand, 0.002);
  const lawn = add(new THREE.PlaneGeometry(400, 60), std('#5d8a4a', { roughness: 1 }), 20, -0.02, B.z1 + 30);
  lawn.rotation.x = -Math.PI / 2;
  box(B.x1 + 0.4, 0.16, 0.24, M.coping, B.x1 / 2, 0.04, B.z1 + 0.1);
  const floor = add(new THREE.PlaneGeometry(B.x1 - B.x0, B.z1 - B.z0), new THREE.MeshBasicMaterial(), (B.x0 + B.x1) / 2, 0, 0);
  floor.rotation.x = -Math.PI / 2; floor.visible = false; floor.name = 'floor';

  // ---- the pool: tiled basin, coping, and moving water ----
  const pw = P.x1 - P.x0, pd = P.z1 - P.z0, pcx = (P.x0 + P.x1) / 2, pcz = (P.z0 + P.z1) / 2;
  const basinFloor = add(new THREE.PlaneGeometry(pw, pd), M.poolTile, pcx, -DEPTH, pcz);
  basinFloor.rotation.x = -Math.PI / 2;
  const wallMat = M.poolTile.clone(); (wallMat.map as THREE.Texture) = (M.poolTile.map as THREE.Texture).clone(); (wallMat.map as THREE.Texture).repeat.set(6, 0.5); wallMat.map!.needsUpdate = true;
  const inner = (w: number, x: number, z: number, ry: number) => add(new THREE.PlaneGeometry(w, DEPTH), wallMat, x, -DEPTH / 2, z, ry);
  inner(pw, pcx, P.z0, 0); inner(pw, pcx, P.z1, Math.PI); inner(pd, P.x0, pcz, Math.PI / 2); inner(pd, P.x1, pcz, -Math.PI / 2);
  const cw = 0.32;
  box(pw + cw * 2, 0.07, cw, M.coping, pcx, 0.03, P.z0 - cw / 2 + 0.02);
  box(pw + cw * 2, 0.07, cw, M.coping, pcx, 0.03, P.z1 + cw / 2 - 0.02);
  box(cw, 0.07, pd, M.coping, P.x0 - cw / 2 + 0.02, 0.03, pcz);
  box(cw, 0.07, pd, M.coping, P.x1 + cw / 2 - 0.02, 0.03, pcz);
  // a ladder on the front edge
  for (const dx of [-0.25, 0.25]) {
    const rail = add(new THREE.TorusGeometry(0.28, 0.025, 6, 12, Math.PI), std('#d6dde0', { metalness: 0.7, roughness: 0.25 }), pcx + 4 + dx, 0.0, P.z1 - 0.05, Math.PI / 2);
    rail.rotation.z = Math.PI / 2;
  }
  // light dancing on the pool floor, and the water surface over it
  const caustic = causticTexture();
  caustic.repeat.set(pw / 3, pd / 3);
  const causticMat = new THREE.MeshBasicMaterial({ map: caustic, transparent: true, opacity: 0.55, blending: THREE.AdditiveBlending, depthWrite: false });
  const causticPlane = add(new THREE.PlaneGeometry(pw, pd), causticMat, pcx, -DEPTH + 0.01, pcz);
  causticPlane.rotation.x = -Math.PI / 2;
  const ripple = rippleTexture();
  ripple.repeat.set(pw / 4, pd / 4);
  const waterMat = new THREE.MeshStandardMaterial({ color: 0x3fb5d8, map: ripple, transparent: true, opacity: 0.68, roughness: 0.08, metalness: 0.15, depthWrite: false });
  const water = add(new THREE.PlaneGeometry(pw, pd), waterMat, pcx, WATER_Y, pcz);
  water.rotation.x = -Math.PI / 2; water.renderOrder = 4;
  // underwater lights that glow at night
  const poolGlow: THREE.Sprite[] = [];
  for (let k = 0; k < 4; k++) {
    const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: glow(), color: 0x6fe3ff, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }));
    s.position.set(P.x0 + pw * (k + 0.5) / 4, -0.55, P.z0 + 0.15); s.scale.setScalar(2.2); group.add(s); poolGlow.push(s);
  }

  // ---- floats drifting on the water ----
  // They really float: wade into one and it's shoved away, they bump off each
  // other and the pool's edge (see floatPhysics).
  const floats: { obj: THREE.Object3D; body: FloatBody; phase: number }[] = [];
  const drift = (obj: THREE.Object3D, x: number, z: number, r: number) => {
    group.add(obj); floats.push({ obj, body: { x, z, vx: rnd(-0.1, 0.1), vz: rnd(-0.1, 0.1), r, spin: rnd(0, 6), turn: 0 }, phase: rnd(0, 6) });
  };
  drift(flamingo(), pcx - pw * 0.28, pcz + 0.4, 0.62);
  drift(donut(), pcx + pw * 0.05, pcz - 0.7, 0.55);
  drift(beachBall(), pcx + pw * 0.3, pcz + 0.6, 0.3);
  let waders: Pusher[] = [];
  let lastBump = 0;

  // ---- 바 오두막: the cabana bar ----
  const roofMats: THREE.Material[] = [];
  {
    const b = POOL.bar, cx = (b.x0 + b.x1) / 2, cz = (b.z0 + b.z1) / 2, w = b.x1 - b.x0;
    block(b, 1.05, M.bamboo);
    box(w + 0.2, 0.08, b.z1 - b.z0 + 0.2, M.wood, cx, 1.09, cz);
    // back shelf with bottles and coconuts
    box(w, 1.6, 0.3, M.wood, cx, 0.8, B.z0 + 0.2);
    for (let k = 0; k < 9; k++) {
      const col = ['#f0c75e', '#e85d75', '#6fd3c7', '#2f6b3a', '#ff9f68'][k % 5];
      cyl(0.05, 0.06, 0.3, std(col, { roughness: 0.2, transparent: true, opacity: 0.85 }), b.x0 + 0.4 + k * 0.62, 1.75, B.z0 + 0.25, 8);
    }
    for (let k = 0; k < 3; k++) add(new THREE.SphereGeometry(0.11, 8, 6), std('#6b4a2e', { flatShading: true }), b.x0 + 0.9 + k * 2, 1.71, B.z0 + 0.25);
    // cocktails with tiny umbrellas
    for (let k = 0; k < 6; k++) {
      const x = b.x0 + 0.45 + k * 0.95, z = cz + 0.15;
      const col = ['#ff9f68', '#6fd3c7', '#e85d75', '#f0c75e', '#9fe0ff', '#b6f5c9'][k];
      cyl(0.055, 0.035, 0.18, std('#eef3f4', { transparent: true, opacity: 0.45, roughness: 0.05 }), x, 1.22, z, 10);
      cyl(0.05, 0.034, 0.13, std(col, { roughness: 0.2 }), x, 1.2, z, 10);
      const u = add(new THREE.ConeGeometry(0.07, 0.04, 8), std(['#e85d75', '#f0c75e', '#6fb3c8'][k % 3]), x + 0.03, 1.38, z); u.rotation.z = -0.4;
      add(new THREE.SphereGeometry(0.025, 6, 4), std('#ffd166'), x - 0.04, 1.32, z);
    }
    // a pineapple and a sign
    const pine = add(new THREE.SphereGeometry(0.12, 8, 6), std('#e0a83a', { flatShading: true }), b.x1 - 0.35, 1.24, cz - 0.15); pine.scale.y = 1.3;
    for (let k = 0; k < 5; k++) { const l = add(new THREE.ConeGeometry(0.03, 0.18, 4), M.frond2, b.x1 - 0.35, 1.45, cz - 0.15); l.rotation.set(rnd(-0.5, 0.5), 0, rnd(-0.5, 0.5)); }
    // thatched roof on two back posts
    for (const x of [b.x0 - 0.3, b.x1 + 0.3]) cyl(0.09, 0.11, 3.0, M.trunk, x, 1.5, B.z0 + 0.35, 8);
    const roofM = M.straw.clone(); roofMats.push(roofM);
    const roof = add(new THREE.ConeGeometry(4.6, 1.3, 4, 1), roofM, cx, 3.45, cz - 0.3);
    roof.rotation.y = Math.PI / 4; roof.scale.set(1.05, 1, 0.55);
    const fringeM = std('#c79e52', { roughness: 1, flatShading: true }).clone(); roofMats.push(fringeM);
    const fringe = add(new THREE.CylinderGeometry(3.3, 3.4, 0.25, 4, 1, true), fringeM, cx, 2.8, cz - 0.3);
    fringe.rotation.y = Math.PI / 4; fringe.scale.set(1.05, 1, 0.55);
    const sign = textPlate([{ text: '🍹 퇴근 바', font: '700 52px "Gowun Batang", serif', color: '#3a2412', y: 70 }], 384, 112, '#f2dca6');
    const signM = new THREE.MeshBasicMaterial({ map: sign, transparent: true }); roofMats.push(signM);
    add(new THREE.PlaneGeometry(1.8, 0.52), signM, cx, 2.6, -2.25);
    // tiki torches on the counter ends
    for (const x of [b.x0 + 0.15, b.x1 - 0.15]) {
      cyl(0.03, 0.03, 0.9, M.trunk, x, 1.55, b.z1 - 0.12, 6);
      cyl(0.07, 0.05, 0.16, M.straw, x, 2.05, b.z1 - 0.12, 8);
      fx.add(x, 2.13, b.z1 - 0.12, 3.2, 0xff8a3a);
    }
    lights.strand(new THREE.Vector3(b.x0 - 1.2, 2.75, -2.4), new THREE.Vector3(b.x1 + 1.2, 2.75, -2.4), 0.3, 1.0, 0.12);
  }
  for (const s of POOL.barStools) {
    cyl(0.2, 0.2, 0.06, M.bamboo, s.x, 0.74, s.z, 16);
    cyl(0.03, 0.03, 0.72, M.wood, s.x, 0.36, s.z, 6);
  }

  // ---- loungers along the back of the pool ----
  POOL.loungers.forEach((l, k) => {
    const cx = (l.x0 + l.x1) / 2, w = l.x1 - l.x0;
    box(w, 0.08, 1.15, M.white, cx, 0.3, -3.9);
    const backrest = box(w, 0.08, 0.6, M.white, cx, 0.52, -4.62); backrest.rotation.x = -0.75;
    for (const sz of [-3.4, -4.6]) for (const sx of [-1, 1]) box(0.05, 0.3, 0.05, M.white, cx + sx * (w / 2 - 0.05), 0.15, sz);
    const towel = ['#e85d75', '#6fb3c8', '#f0c75e', '#8fb8a0', '#ff9f68'][k];
    box(w - 0.08, 0.02, 1.0, std(towel, { roughness: 1 }), cx, 0.35, -3.9);
    const tb = box(w - 0.08, 0.02, 0.5, std(towel, { roughness: 1 }), cx, 0.58, -4.6); tb.rotation.x = -0.75;
  });

  // ---- palms ----
  for (const p of POOL.palms) palm(group, p.x, p.z, M);

  // ---- 모래사장: umbrellas, a DJ booth and a bonfire ----
  POOL.umbrellas.forEach((u, k) => {
    cyl(0.025, 0.025, 2.3, M.white, u.x, 1.15, u.z, 6);
    const canopy = add(new THREE.ConeGeometry(1.2, 0.45, 12, 1, true), new THREE.MeshStandardMaterial({ map: stripes(k ? '#6fb3c8' : '#e85d75'), side: THREE.DoubleSide, roughness: 0.8 }), u.x, 2.25, u.z);
    void canopy;
    const towel = add(new THREE.PlaneGeometry(0.9, 1.7), std(k ? '#f0c75e' : '#8fb8a0', { roughness: 1 }), u.x + 0.75, 0.01, u.z + 0.3);
    towel.rotation.x = -Math.PI / 2; towel.rotation.z = 0.2;
  });
  // the DJ stage, and fireworks over the sea
  const stage = buildStage(group, POOL.dj, B.x1, POOL.dance);
  const fireworks = new Fireworks(group, {
    launch: at => sound.play('launch', { at: { x: at.x, z: -12 }, volume: 0.55, pitch: 0.9 + Math.random() * 0.25 }),
    burst: (at, shape) => {
      // sound travels: the bang arrives a moment after the flash
      const delay = Math.min(0.25, Math.abs(at.z) / 343);
      sound.play('boom', { at: { x: at.x, z: -9 }, delay, volume: 0.8, pitch: 0.85 + Math.random() * 0.3 });
      if (shape === 'glitter' || shape === 'willow') sound.play('crackle', { at: { x: at.x, z: -9 }, delay: delay + 0.2, volume: 0.6 });
    },
  });
  let showSlot = -1, showCheck = 0, camX = 20;
  const fireLight = new THREE.PointLight(0xff8a3a, 0, 9, 1.5);
  const sparks: { s: THREE.Sprite; phase: number }[] = [];
  {
    const f = POOL.bonfire;
    for (let k = 0; k < 9; k++) {
      const a = (k / 9) * Math.PI * 2;
      const r = add(new THREE.DodecahedronGeometry(0.13, 0), M.rock, f.x + Math.cos(a) * 0.5, 0.08, f.z + Math.sin(a) * 0.5);
      r.rotation.set(rnd(0, 3), rnd(0, 3), 0);
    }
    for (let k = 0; k < 4; k++) {
      const log = cyl(0.05, 0.06, 0.7, M.trunk, f.x, 0.25, f.z, 6);
      log.rotation.set(0.5, (k / 4) * Math.PI * 2, 0); log.position.add(new THREE.Vector3(Math.cos(k * 1.57) * 0.12, 0, Math.sin(k * 1.57) * 0.12));
    }
    for (const [dx, dz, s] of [[0, 0, 7], [0.12, 0.05, 5], [-0.1, -0.06, 5.5]] as const) fx.add(f.x + dx, 0.12, f.z + dz, s, 0xff7a2a);
    fireLight.position.set(f.x, 1.0, f.z); group.add(fireLight);
    const sparkMat = new THREE.SpriteMaterial({ map: glow(), color: 0xffb060, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending });
    for (let k = 0; k < 10; k++) { const s = new THREE.Sprite(sparkMat.clone()); s.scale.setScalar(0.08); group.add(s); sparks.push({ s, phase: k / 10 }); }
  }

  // ---- the back: a low hedge, then the sea to the horizon ----
  for (let x = 0.4; x < B.x1; x += 0.9) {
    const h = add(new THREE.IcosahedronGeometry(0.5, 0), M.hedge, x, 0.32, B.z0 - 0.25);
    h.scale.set(1, 0.7, 0.6); h.rotation.y = rnd(0, 3);
  }
  const seaMat = new THREE.MeshStandardMaterial({ color: 0x2f7fa8, roughness: 0.2, metalness: 0.2, map: rippleTexture(), transparent: false });
  (seaMat.map as THREE.Texture).repeat.set(40, 12);
  const sea = add(new THREE.PlaneGeometry(500, 150), seaMat, 20, -0.4, B.z0 - 76);
  sea.rotation.x = -Math.PI / 2;
  for (const [x, z, s] of [[-14, -70, 9], [52, -85, 13], [70, -60, 6]] as const) {
    const isl = add(new THREE.ConeGeometry(s, s * 0.35, 7), std('#3e5f4a', { flatShading: true, roughness: 1 }), x, s * 0.15 - 0.4, z);
    isl.scale.z = 0.5;
  }
  // string lights from palm to palm along the back
  lights.strand(new THREE.Vector3(12.9, 3.4, -4.3), new THREE.Vector3(29.1, 3.4, -4.3), 0.32, 4, 0.5);
  lights.strand(new THREE.Vector3(29.1, 3.4, -4.3), new THREE.Vector3(B.x1 - 0.3, 2.6, -4.6), 0.32, 5.5, 0.5);
  lights.done();

  // ---- sky, sun and light ----
  const sky = new SkyPainter();
  scene.background = sky.texture;
  scene.fog = new THREE.Fog(0xbfd8e6, 40, 140);
  const hemi = new THREE.HemisphereLight(0xe8f4ff, 0x8a7a5a, 1);
  const sun = new THREE.DirectionalLight(0xffffff, 1.2); sun.position.set(-10, 16, 8);
  const ambient = new THREE.AmbientLight(0xffe2c0, 0.25);
  group.add(hemi, sun, ambient);

  const setTime = (date: Date) => {
    const s = skyAt(date);
    sky.paint(s);
    night = s.night;
    (scene.fog as THREE.Fog).color.copy(s.bottom);
    hemi.color.copy(s.top).lerp(new THREE.Color('#ffffff'), 0.5);
    hemi.intensity = 0.25 + s.hemi * 0.75;
    sun.color.copy(s.sun); sun.intensity = 0.25 + s.sunI * 0.9;
    ambient.intensity = 0.18 + 0.15 * s.night;
    seaMat.color.copy(new THREE.Color('#2f7fa8').lerp(s.bottom, 0.35).multiplyScalar(1 - 0.55 * s.night));
    waterMat.color.copy(new THREE.Color('#3fb5d8').lerp(new THREE.Color('#1d6fa0'), s.night));
    waterMat.emissive = new THREE.Color('#1aa3d6').multiplyScalar(0.35 * s.night);
    causticMat.opacity = 0.55 - 0.25 * s.night;
    for (const g of poolGlow) (g.material as THREE.SpriteMaterial).opacity = 0.15 + 0.85 * s.night;
    fireLight.intensity = 0.2 + 2.2 * s.night;
    return s;
  };

  // ---- the diving board, out over the left end of the pool ----
  {
    const d = { x: POOL.board.x, z: POOL.board.z - 0.62 }; // just behind where you stand, so you're beside it, not in it
    box(0.5, 0.5, 0.5, M.white, d.x - 0.35, 0.25, d.z);                       // the stand
    for (const sx of [-0.2, 0.2]) cyl(0.03, 0.03, 0.75, M.coping, d.x - 0.35 + sx, 0.85, d.z - 0.2);
    box(2.2, 0.07, 0.5, std('#7fc8dc', { roughness: 0.5 }), d.x + 0.55, 0.56, d.z);
    box(0.5, 0.012, 0.52, std('#f6f1e6'), d.x + 1.35, 0.6, d.z);              // the grippy end
  }

  return {
    paintings: [],
    floor,
    setTime,
    loadArt: async () => {},
    nudge(guests: { x: number; z: number }[]) { waders = guests.filter(g => g.x > P.x0 && g.x < P.x1 && g.z > P.z0 && g.z < P.z1); },
    celebrate(seed: number) { fireworks.volley(seed, camX, 5); stage.cheer(); },
    lookUp() { return fireworks.busy ? 1 : 0; },
    fadeOccluders(cam: THREE.Vector3) {
      camX = cam.x;
      // fade the bar's thatched roof when the camera is right behind it
      const b = POOL.bar;
      const over = cam.x > b.x0 - 2.5 && cam.x < b.x1 + 2.5 && cam.z < 5.2 ? 1 : 0;
      for (const m of roofMats) {
        const target = over ? 0.25 : 1;
        m.transparent = true;
        m.opacity += (target - m.opacity) * 0.15;
        m.depthWrite = m.opacity > 0.95;
      }
    },
    tick(dt: number) {
      t += dt;
      lights.tick(t, night);
      fx.tick(t, night);
      ripple.offset.set(t * 0.02, t * 0.013);
      caustic.offset.set(-t * 0.015, t * 0.02);
      caustic.rotation = Math.sin(t * 0.05) * 0.1;
      (seaMat.map as THREE.Texture).offset.set(t * 0.004, t * 0.002);
      const bump = stepFloats(floats.map(f => f.body), waders, P, Math.min(dt, 0.05), t);
      if (bump > 0.6 && t - lastBump > 0.25) {
        // a rubbery boing, and a splash if it was a good shove
        lastBump = t;
        const at = floats.reduce((a, f) => (Math.hypot(f.body.vx, f.body.vz) > Math.hypot(a.body.vx, a.body.vz) ? f : a)).body;
        sound.play('bubble', { at, pitch: 0.55, volume: Math.min(1, 0.4 + bump * 0.3) });
        if (bump > 1.2) sound.play('step-water', { at, volume: 0.8 });
      }
      for (const f of floats) {
        const b = f.body, speed = Math.hypot(b.vx, b.vz);
        f.obj.position.set(b.x, WATER_Y + 0.02 + Math.sin(t * 1.6 + f.phase) * 0.03, b.z);
        f.obj.rotation.y = b.spin;
        // rocks more the faster it's going
        f.obj.rotation.z = Math.sin(t * 1.3 + f.phase) * (0.05 + Math.min(0.2, speed * 0.12));
        f.obj.rotation.x = Math.cos(t * 1.7 + f.phase) * Math.min(0.15, speed * 0.1);
      }
      stage.tick(dt, night, sound.beats());
      // the evening show: every guest works out the same volleys from the clock
      if ((showCheck -= dt) <= 0) {
        showCheck = 0.25;
        const now = new Date();
        if (showAt(now)) {
          const slot = Math.floor(now.getTime() / 1600);
          if (slot !== showSlot) { showSlot = slot; fireworks.volley(slot % 2 ** 31, camX, 2 + (slot % 2)); }
        }
      }
      fireworks.tick(dt);
      // the bursts light up the party a little
      ambient.color.setRGB(1, 0.886, 0.753).add(fireworks.flash);
      fireLight.intensity *= 0.95 + 0.1 * Math.random();
      const f = POOL.bonfire;
      for (const sp of sparks) {
        const u = (t * 0.5 + sp.phase) % 1;
        sp.s.position.set(f.x + Math.sin(u * 9 + sp.phase * 20) * 0.25, 0.4 + u * 2.2, f.z + Math.cos(u * 7 + sp.phase * 13) * 0.2);
        (sp.s.material as THREE.SpriteMaterial).opacity = (1 - u) * (0.3 + 0.7 * night);
      }
    },
  };
}

function palm(group: THREE.Group, x: number, z: number, M: Record<string, THREE.Material>) {
  const pot = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.36, 0.5, 10), std('#c9b8a0', { roughness: 0.9 }));
  pot.position.set(x, 0.25, z); group.add(pot);
  // a gently curved trunk made of short segments
  let p = new THREE.Vector3(x, 0.45, z);
  const lean = new THREE.Vector3(rnd(-0.06, 0.06), 0, 0.05);
  for (let k = 0; k < 8; k++) {
    const seg = new THREE.Mesh(new THREE.CylinderGeometry(0.11 - k * 0.006, 0.13 - k * 0.006, 0.42, 7), M.trunk);
    seg.position.copy(p).add(new THREE.Vector3(0, 0.2, 0));
    seg.rotation.set(lean.z * k * 0.6, 0, -lean.x * k * 0.6);
    group.add(seg);
    p = p.clone().add(new THREE.Vector3(lean.x * k * 0.25, 0.4, lean.z * k * 0.25));
  }
  const top = p.clone().add(new THREE.Vector3(0, 0.15, 0));
  for (let k = 0; k < 8; k++) {
    const a = (k / 8) * Math.PI * 2 + rnd(-0.2, 0.2);
    const leaf = new THREE.Mesh(new THREE.ConeGeometry(0.2, 1.7, 3), k % 2 ? M.frond : M.frond2);
    leaf.scale.set(1, 1, 0.18);
    leaf.position.copy(top).add(new THREE.Vector3(Math.cos(a) * 0.7, -0.15, Math.sin(a) * 0.7));
    leaf.rotation.set(0, -a, 0, 'YXZ');
    leaf.rotateZ(Math.PI / 2 + 0.35);
    group.add(leaf);
  }
  for (let k = 0; k < 3; k++) {
    const c = new THREE.Mesh(new THREE.SphereGeometry(0.1, 8, 6), std('#6b4a2e', { flatShading: true }));
    c.position.copy(top).add(new THREE.Vector3(Math.cos(k * 2.1) * 0.15, -0.2, Math.sin(k * 2.1) * 0.15)); group.add(c);
  }
}

/** A pink flamingo pool float. */
function flamingo() {
  const g = new THREE.Group();
  const pink = std('#ff8fb1', { roughness: 0.35 });
  const body = new THREE.Mesh(new THREE.TorusGeometry(0.5, 0.2, 10, 20), pink); body.rotation.x = Math.PI / 2; body.scale.set(1.25, 1, 1); g.add(body);
  const curve = new THREE.CatmullRomCurve3([new THREE.Vector3(0.55, 0.05, 0), new THREE.Vector3(0.75, 0.6, 0), new THREE.Vector3(0.6, 1.05, 0), new THREE.Vector3(0.85, 1.2, 0)]);
  g.add(new THREE.Mesh(new THREE.TubeGeometry(curve, 16, 0.08, 8), pink));
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.13, 10, 8), pink); head.position.set(0.88, 1.22, 0); g.add(head);
  const beak = new THREE.Mesh(new THREE.ConeGeometry(0.05, 0.18, 8), std('#2a2024')); beak.position.set(1.04, 1.16, 0); beak.rotation.z = -2.2; g.add(beak);
  for (const s of [-1, 1]) { const eye = new THREE.Mesh(new THREE.SphereGeometry(0.022, 6, 4), new THREE.MeshBasicMaterial({ color: 0x141012 })); eye.position.set(0.92, 1.27, s * 0.1); g.add(eye); }
  const tail = new THREE.Mesh(new THREE.ConeGeometry(0.16, 0.3, 6), pink); tail.position.set(-0.68, 0.1, 0); tail.rotation.z = 1.2; g.add(tail);
  return g;
}

/** A frosted donut ring with sprinkles. */
function donut() {
  const g = new THREE.Group();
  const base = new THREE.Mesh(new THREE.TorusGeometry(0.5, 0.2, 10, 22), std('#e2b071', { roughness: 0.6 })); base.rotation.x = Math.PI / 2; g.add(base);
  const icing = new THREE.Mesh(new THREE.TorusGeometry(0.5, 0.17, 10, 22, Math.PI * 2), std('#ff9fc8', { roughness: 0.3 }));
  icing.rotation.x = Math.PI / 2; icing.position.y = 0.06; icing.scale.set(1, 1, 0.8); g.add(icing);
  const cols = ['#ffffff', '#6fd3c7', '#ffd166', '#8a6cff'];
  for (let k = 0; k < 24; k++) {
    const a = rnd(0, Math.PI * 2), r = 0.5 + rnd(-0.1, 0.1);
    const s = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.015, 0.015), new THREE.MeshBasicMaterial({ color: cols[k % 4] }));
    s.position.set(Math.cos(a) * r, 0.2, Math.sin(a) * r); s.rotation.y = rnd(0, 3); g.add(s);
  }
  return g;
}

function beachBall() {
  const tex = canvasTexture(128, 64, (x, w, h) => {
    const cols = ['#ffffff', '#e85d75', '#ffffff', '#6fb3c8', '#ffffff', '#f0c75e'];
    cols.forEach((c, i) => { x.fillStyle = c; x.fillRect((i * w) / cols.length, 0, w / cols.length + 1, h); });
  });
  const b = new THREE.Mesh(new THREE.SphereGeometry(0.3, 16, 12), new THREE.MeshStandardMaterial({ map: tex, roughness: 0.4 }));
  b.position.y = 0.2;
  const g = new THREE.Group(); g.add(b); return g;
}

function stripes(color: string) {
  return canvasTexture(256, 32, (x, w, h) => {
    for (let i = 0; i < 12; i++) { x.fillStyle = i % 2 ? '#fbf6ec' : color; x.fillRect((i * w) / 12, 0, w / 12 + 1, h); }
  });
}

function sandTexture() {
  return canvasTexture(256, 256, (x, w, h) => {
    x.fillStyle = '#e6d2a6'; x.fillRect(0, 0, w, h);
    for (let i = 0; i < 2600; i++) { x.fillStyle = Math.random() < 0.5 ? 'rgba(120,90,50,.12)' : 'rgba(255,250,235,.25)'; x.fillRect(rnd(0, w), rnd(0, h), 1.5, 1.5); }
    x.strokeStyle = 'rgba(160,125,80,.12)'; x.lineWidth = 3;
    for (let i = 0; i < 9; i++) { x.beginPath(); const y = rnd(0, h); x.moveTo(0, y); x.bezierCurveTo(w * 0.3, y + rnd(-20, 20), w * 0.6, y + rnd(-20, 20), w, y); x.stroke(); }
  }, [1, 1]);
}

function bambooTexture() {
  return canvasTexture(256, 128, (x, w, h) => {
    for (let i = 0; i < 16; i++) {
      const c = new THREE.Color('#c9a35e').multiplyScalar(rnd(0.85, 1.08));
      x.fillStyle = '#' + c.getHexString(); x.fillRect((i * w) / 16, 0, w / 16, h);
      x.fillStyle = 'rgba(80,50,20,.35)'; x.fillRect((i * w) / 16, 0, 2, h);
      x.fillRect((i * w) / 16, rnd(20, 60), w / 16, 3); x.fillRect((i * w) / 16, rnd(70, 110), w / 16, 3);
    }
  }, [3, 1]);
}

/** Soft light lines, like sun through moving water. */
function causticTexture() {
  return canvasTexture(256, 256, (x, w, h) => {
    x.fillStyle = 'rgba(0,0,0,0)'; x.clearRect(0, 0, w, h);
    x.strokeStyle = 'rgba(220,250,255,.75)'; x.lineWidth = 2.5; x.lineCap = 'round';
    for (let i = 0; i < 26; i++) {
      x.beginPath();
      let px = rnd(0, w), py = rnd(0, h);
      x.moveTo(px, py);
      for (let k = 0; k < 4; k++) { const nx = px + rnd(-50, 50), ny = py + rnd(-50, 50); x.quadraticCurveTo(px + rnd(-30, 30), py + rnd(-30, 30), nx, ny); px = nx; py = ny; }
      x.stroke();
    }
  }, [1, 1]);
}

/** Gentle ripples for the water surface. */
function rippleTexture() {
  return canvasTexture(256, 256, (x, w, h) => {
    x.fillStyle = '#d8f2fa'; x.fillRect(0, 0, w, h);
    for (let i = 0; i < 70; i++) {
      x.strokeStyle = `rgba(255,255,255,${rnd(0.3, 0.8)})`; x.lineWidth = rnd(1, 3);
      x.beginPath(); const cx = rnd(0, w), cy = rnd(0, h), r = rnd(6, 26);
      x.ellipse(cx, cy, r, r * 0.35, 0, rnd(0, 3), rnd(3, 6)); x.stroke();
    }
    x.fillStyle = 'rgba(80,170,210,.18)';
    for (let i = 0; i < 40; i++) x.fillRect(rnd(0, w), rnd(0, h), rnd(10, 40), 2);
  }, [1, 1]);
}
