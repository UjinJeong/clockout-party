import * as THREE from 'three';
import { HOME, HOME_MAP } from '@party/shared';
import { SkyPainter, skyAt } from './sky';
import { canvasTexture, textPlate } from './textures';
import { glow } from './decor';
import { builder, bunting, flames, planks, pottedPlant, rnd, skylineTexture, std, stringLights, tiles } from './kit';
import type { WorldParts } from './world';
import { doorways, wallPieces } from './walls';

/**
 * 🏠 The home party: a city apartment cut open like a dollhouse.
 *   거실 living room (0–12): sofa, fireplace, rug, record player, a window on the city
 *   부엌 kitchen (12–24): counter and fridge, an island full of pizza, cake and party cups
 *   테라스 terrace (24–36): deck, bean bags, a grill, string lights, the sky and the skyline
 * Everything that blocks you is drawn over the shared HOME map, so the server agrees.
 */
const H = 3.3;   // wall height
const LOW = 1.0; // cut-away wall height toward the camera
const B = HOME_MAP.bounds;

export function buildHome(scene: THREE.Scene, renderer: THREE.WebGLRenderer): WorldParts {
  const maxAniso = renderer.capabilities.getMaxAnisotropy();
  const group = new THREE.Group();
  scene.add(group);
  const { add, box, block, cyl } = builder(group);
  const fx = flames(group);
  const lights = stringLights(group);
  let t = 0, night = 0;

  const M = {
    oak: new THREE.MeshStandardMaterial({ map: planks('#a8784a'), roughness: 0.6 }),
    tile: new THREE.MeshStandardMaterial({ map: tiles('#efe6d6', '#3b3a40', 4), roughness: 0.4 }),
    deck: new THREE.MeshStandardMaterial({ map: planks('#7f5f43', 6, 'rgba(0,0,0,.5)'), roughness: 0.85 }),
    paper: new THREE.MeshStandardMaterial({ map: wallpaper(), roughness: 0.95 }),
    kitchenWall: std('#e3d6bd', { roughness: 0.9 }),
    subway: new THREE.MeshStandardMaterial({ map: tiles('#f4f0e6', '#ebe5d8', 8, 'rgba(120,110,95,.45)'), roughness: 0.35 }),
    trim: std('#f3ece0', { roughness: 0.6 }),
    walnut: std('#4a2e1c', { roughness: 0.55 }),
    wood: std('#9a6a42', { roughness: 0.6 }),
    teal: std('#2f5d62', { roughness: 0.95 }),
    rust: std('#a8553a', { roughness: 0.95 }),
    mustard: std('#d9a441', { roughness: 0.95 }),
    coral: std('#e07a6a', { roughness: 0.95 }),
    rose: std('#c98f8f', { roughness: 0.95 }),
    cream: std('#efe6d2', { roughness: 0.7 }),
    black: std('#1d1a1c', { roughness: 0.5 }),
    steel: std('#b9bec4', { metalness: 0.6, roughness: 0.35 }),
    marble: std('#ece6db', { roughness: 0.3 }),
    sage: std('#5f7d8c', { roughness: 0.6 }),
    brick: std('#e8e1d4', { roughness: 0.9 }),
    glass: new THREE.MeshStandardMaterial({ color: 0xcfe3ec, transparent: true, opacity: 0.22, roughness: 0.05, metalness: 0.1, depthWrite: false }),
    frame: std('#2b2a2e', { metalness: 0.4, roughness: 0.5 }),
  };
  for (const m of [M.oak, M.tile, M.deck, M.subway]) (m.map as THREE.Texture).anisotropy = Math.min(8, maxAniso);
  (M.oak.map as THREE.Texture).repeat.set(6, 5);
  (M.tile.map as THREE.Texture).repeat.set(6, 5);
  (M.deck.map as THREE.Texture).repeat.set(6, 5);
  (M.subway.map as THREE.Texture).repeat.set(6, 0.6);
  (M.paper.map as THREE.Texture).repeat.set(6, 1.6);

  // ---- floors, and one invisible plane for taps ----
  const floorPlane = (x0: number, x1: number, mat: THREE.Material) => {
    const f = add(new THREE.PlaneGeometry(x1 - x0, B.z1 - B.z0), mat, (x0 + x1) / 2, 0, 0);
    f.rotation.x = -Math.PI / 2;
  };
  floorPlane(0, 12, M.oak); floorPlane(12, 24, M.tile); floorPlane(24, 36, M.deck);
  const floor = add(new THREE.PlaneGeometry(B.x1 - B.x0, B.z1 - B.z0), new THREE.MeshBasicMaterial(), (B.x0 + B.x1) / 2, 0, 0);
  floor.rotation.x = -Math.PI / 2; floor.visible = false; floor.name = 'floor';
  // a dark stage in front, and a plinth along the open edge
  const stage = add(new THREE.PlaneGeometry(400, 200), new THREE.MeshBasicMaterial({ color: 0x15100f }), 18, -0.3, B.z1 + 100);
  stage.rotation.x = -Math.PI / 2;
  box(B.x1 + 0.4, 0.3, 0.3, M.walnut, B.x1 / 2, -0.12, B.z1 + 0.15);
  lights.strand(new THREE.Vector3(0.2, 0.08, B.z1 - 0.1), new THREE.Vector3(B.x1 - 0.2, 0.08, B.z1 - 0.1), 0.4, 0.8, 0);

  // ---- walls ----
  // back walls of the two indoor rooms
  const back = (x0: number, x1: number, mat: THREE.Material) => add(new THREE.PlaneGeometry(x1 - x0, H), mat, (x0 + x1) / 2, H / 2, B.z0);
  back(0, 12, M.paper);
  back(12, 24, M.kitchenWall);
  box(12, 0.12, 0.04, M.trim, 6, 0.06, B.z0 + 0.02);         // skirting
  box(11.4, 0.9, 0.03, M.subway, 18, 1.35, B.z0 + 0.02);     // splashback tiles
  box(24, 0.14, 0.14, M.trim, 12, H - 0.07, B.z0 + 0.07);     // crown moulding
  // the closed outer wall on the left: tall at the back, low toward the camera
  const outerWall = (x: number, mat: THREE.Material) => {
    const tallTo = -1.5;
    box(0.14, H, tallTo - B.z0, mat, x, H / 2, (B.z0 + tallTo) / 2);
    box(0.14, LOW, B.z1 - tallTo, mat, x, LOW / 2, (tallTo + B.z1) / 2);
    box(0.2, 0.05, B.z1 - tallTo, M.trim, x, LOW, (tallTo + B.z1) / 2);
  };
  const paintSide = std('#cbbfa7', { roughness: 0.9 });
  outerWall(0, paintSide);
  // Inner walls come straight from the shared map, so every doorway you can
  // walk through is one you can see. The kitchen→terrace wall is glass.
  const pieces = wallPieces(HOME_MAP, H, LOW);
  const GLASS_X = HOME.partitions[1];
  for (const p of pieces) {
    const len = p.z1 - p.z0, mid = (p.z0 + p.z1) / 2;
    if (p.x === GLASS_X && p.h === H) {
      const pane = add(new THREE.PlaneGeometry(len, H - 0.1), M.glass, p.x, (H - 0.1) / 2, mid, Math.PI / 2);
      pane.renderOrder = 5;
      for (const z of [p.z0 + 0.04, mid]) box(0.1, H, 0.08, M.frame, p.x, H / 2, z);
      box(0.12, 0.1, len, M.frame, p.x, H - 0.05, mid);
      box(0.12, 0.08, len, M.frame, p.x, 0.04, mid);
      // the slid-open door panel, parked against the fixed one
      const slid = add(new THREE.PlaneGeometry(Math.min(1.8, len - 0.2), H - 0.2), M.glass, p.x + 0.12, (H - 0.2) / 2, p.z1 - 0.95, Math.PI / 2);
      slid.renderOrder = 5;
      continue;
    }
    box(0.14, p.h, len, paintSide, p.x, p.h / 2, mid);
    if (p.h === LOW) box(0.2, 0.05, len, M.trim, p.x, LOW, mid);
  }
  // Door frames: two posts and a header, so a doorway reads as a doorway.
  // The header fades when the camera is right behind it (see fadeOccluders).
  const DOOR_H = 2.35;
  const headers: { x: number; mats: THREE.MeshStandardMaterial[] }[] = [];
  for (const d of doorways(pieces)) {
    const glassDoor = d.x === GLASS_X;
    const post = glassDoor ? M.frame : M.trim;
    for (const z of [d.z0, d.z1]) box(0.2, DOOR_H, 0.12, post, d.x, DOOR_H / 2, z + (z === d.z0 ? 0.06 : -0.06));
    // over the glass slider the header is glass too, so it doesn't read as a black slab
    const wallM = (glassDoor ? M.glass : paintSide).clone() as THREE.MeshStandardMaterial;
    const trimM = (glassDoor ? M.frame : M.trim).clone() as THREE.MeshStandardMaterial;
    wallM.transparent = trimM.transparent = true;
    for (const m of [wallM, trimM]) m.userData.base = m.opacity;
    box(0.14, H - DOOR_H, d.z1 - d.z0, wallM, d.x, DOOR_H + (H - DOOR_H) / 2, (d.z0 + d.z1) / 2);
    box(0.22, 0.1, d.z1 - d.z0 + 0.24, trimM, d.x, DOOR_H, (d.z0 + d.z1) / 2);
    headers.push({ x: d.x, mats: [wallM, trimM] });
    // a threshold strip on the floor
    const sill = box(0.3, 0.012, d.z1 - d.z0, M.walnut, d.x, 0.006, (d.z0 + d.z1) / 2); void sill;
  }

  // ---- 거실: living room ----
  // window over the sofa with the visitor's own sky and the city
  const sky = new SkyPainter();
  const city = skylineTexture();
  {
    const wx = 5, wy = 2.25, ww = 4, wh = 1.5;
    add(new THREE.PlaneGeometry(ww, wh), new THREE.MeshBasicMaterial({ map: sky.texture }), wx, wy, B.z0 + 0.03);
    const cityTex = city.texture.clone(); cityTex.repeat.set(0.35, 0.8); cityTex.offset.set(0.1, 0); cityTex.needsUpdate = true;
    const cityWin = add(new THREE.PlaneGeometry(ww, wh * 0.8), new THREE.MeshBasicMaterial({ map: cityTex, transparent: true }), wx, wy - wh * 0.1, B.z0 + 0.04);
    cityWin.userData.city = true;
    for (const [w, h, x, y] of [[ww + 0.16, 0.1, wx, wy - wh / 2], [ww + 0.16, 0.1, wx, wy + wh / 2], [0.1, wh, wx - ww / 2, wy], [0.1, wh, wx + ww / 2, wy], [0.05, wh, wx, wy]] as const)
      box(w, h, 0.08, M.trim, x, y, B.z0 + 0.06);
    box(ww + 0.5, 0.06, 0.22, M.trim, wx, wy - wh / 2 - 0.07, B.z0 + 0.11); // sill
    // curtains
    for (const s of [-1, 1]) { const c = box(0.5, H - 0.6, 0.12, M.rose, wx + s * (ww / 2 + 0.35), (H - 0.6) / 2 + 0.3, B.z0 + 0.14); c.scale.x = 1; }
    box(ww + 1.8, 0.05, 0.05, M.steel, wx, H - 0.25, B.z0 + 0.14);
  }
  // sofa
  {
    const s = HOME.sofa, cx = (s.x0 + s.x1) / 2, w = s.x1 - s.x0;
    box(w, 0.42, 1.0, M.teal, cx, 0.21, -4.1);
    box(w, 0.66, 0.24, M.teal, cx, 0.72, -4.48);
    for (const sx of [-1, 1]) box(0.26, 0.62, 1.0, M.teal, cx + sx * (w / 2 - 0.13), 0.42, -4.1);
    for (let i = 0; i < 3; i++) { const c = box(1.36, 0.16, 0.78, M.teal, s.x0 + 0.29 + 0.68 + i * 1.42, 0.5, -4.02); c.scale.y = 1.05; }
    const pillow = (x: number, mat: THREE.Material, rz: number) => { const p = box(0.46, 0.42, 0.14, mat, x, 0.82, -4.24); p.rotation.set(-0.25, 0, rz); };
    pillow(s.x0 + 0.62, M.mustard, 0.12); pillow(s.x0 + 1.05, M.coral, -0.08); pillow(s.x1 - 0.7, M.mustard, -0.15);
    // a blanket thrown over one arm
    const throwB = box(0.7, 0.04, 0.9, std('#d8cbb3', { roughness: 1 }), s.x1 - 0.32, 0.76, -4.05); throwB.rotation.z = 0.5;
  }
  // rug under the coffee table
  const rug = add(new THREE.PlaneGeometry(4.8, 3.1), new THREE.MeshStandardMaterial({ map: rugTexture(), roughness: 1 }), 5, 0.006, -2.25);
  rug.rotation.x = -Math.PI / 2;
  // coffee table with snacks and candles
  {
    const c = HOME.coffeeTable, cx = (c.x0 + c.x1) / 2, cz = (c.z0 + c.z1) / 2, w = c.x1 - c.x0, d = c.z1 - c.z0;
    box(w, 0.07, d, M.walnut, cx, 0.42, cz);
    for (const sx of [-1, 1]) for (const sz of [-1, 1]) box(0.06, 0.4, 0.06, M.walnut, cx + sx * (w / 2 - 0.08), 0.2, cz + sz * (d / 2 - 0.08));
    const bowl = add(new THREE.SphereGeometry(0.17, 12, 6, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2), std('#f2efe8', { side: THREE.DoubleSide }), cx - 0.45, 0.6, cz);
    bowl.rotation.x = Math.PI;
    for (let i = 0; i < 9; i++) { const chip = add(new THREE.CircleGeometry(0.05, 5), std('#e8b54f', { side: THREE.DoubleSide }), cx - 0.45 + rnd(-0.1, 0.1), 0.6 + rnd(0, 0.03), cz + rnd(-0.1, 0.1)); chip.rotation.set(rnd(-1.4, -1), rnd(-0.5, 0.5), rnd(0, 3)); }
    cyl(0.05, 0.05, 0.3, std('#3e1a22', { roughness: 0.25 }), cx + 0.2, 0.61, cz - 0.1, 8);
    cyl(0.02, 0.03, 0.1, std('#3e1a22', { roughness: 0.25 }), cx + 0.2, 0.81, cz - 0.1, 6);
    for (const dx of [0.55, 0.72]) { cyl(0.03, 0.03, 0.1, M.cream, cx + dx, 0.51, cz + 0.12, 8); fx.add(cx + dx, 0.56, cz + 0.12, 1); }
    box(0.42, 0.06, 0.3, M.coral, cx - 0.05, 0.49, cz + 0.12); // a board game box
  }
  // armchair angled toward the table
  {
    const a = HOME.armchair, g = new THREE.Group(); g.position.set(a.x, 0, a.z); g.rotation.y = 0.85; group.add(g);
    const b = (w: number, h: number, d: number, x: number, y: number, z: number) => { const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), M.rust); m.position.set(x, y, z); g.add(m); };
    b(0.86, 0.42, 0.84, 0, 0.21, 0); b(0.86, 0.6, 0.2, 0, 0.72, -0.34); b(0.18, 0.56, 0.84, -0.4, 0.42, 0); b(0.18, 0.56, 0.84, 0.4, 0.42, 0);
    const cush = new THREE.Mesh(new THREE.BoxGeometry(0.58, 0.12, 0.62), M.rust); cush.position.set(0, 0.48, 0.06); g.add(cush);
  }
  // floor lamp
  {
    const l = HOME.lamp;
    cyl(0.2, 0.22, 0.04, M.black, l.x, 0.02, l.z);
    cyl(0.02, 0.02, 1.55, M.steel, l.x, 0.8, l.z, 6);
    const shade = add(new THREE.CylinderGeometry(0.16, 0.28, 0.3, 16, 1, true), std('#f4e6c8', { side: THREE.DoubleSide, emissive: 0xffd9a0, emissiveIntensity: 0.4 }), l.x, 1.62, l.z);
    shade.userData.lamp = true;
    lampGlow(group, l.x, 1.55, l.z, 1.4);
  }
  // fireplace with a crackling fire, photos on the mantel
  const fireLight = new THREE.PointLight(0xff9a4a, 1.2, 7, 1.6);
  {
    const f = HOME.fireplace, cx = (f.x0 + f.x1) / 2, w = f.x1 - f.x0;
    box(w, 1.25, 0.55, M.brick, cx, 0.625, B.z0 + 0.275);
    box(1.6, H - 1.3, 0.32, M.brick, cx, 1.3 + (H - 1.3) / 2, B.z0 + 0.16);
    // the opening: a black face just proud of the surround, with the fire burning in front of it
    add(new THREE.PlaneGeometry(1.2, 0.78), M.black, cx, 0.45, B.z0 + 0.556);
    box(w + 0.3, 0.08, 0.66, M.walnut, cx, 1.29, B.z0 + 0.33);
    for (const dx of [-0.25, 0.05, 0.3]) { const log = cyl(0.06, 0.06, 0.5, std('#4a2e1c'), cx + dx * 0.6, 0.12, B.z0 + 0.66, 6); log.rotation.z = Math.PI / 2; log.rotation.y = dx; }
    box(1.3, 0.06, 0.3, M.black, cx, 0.03, B.z0 + 0.7); // hearth
    for (const dx of [-0.22, 0, 0.22]) fx.add(cx + dx, 0.15, B.z0 + 0.68, 4.2, 0xff8a3a);
    fireLight.position.set(cx, 0.6, B.z0 + 1.2); group.add(fireLight);
    // a warm glow on the floor in front of it
    const pool = add(new THREE.CircleGeometry(1.5, 24), new THREE.MeshBasicMaterial({ map: glow(), color: 0xff9a4a, transparent: true, opacity: 0.35, depthWrite: false, blending: THREE.AdditiveBlending }), cx, 0.012, B.z0 + 1.4);
    pool.rotation.x = -Math.PI / 2; pool.scale.set(1.3, 0.8, 1);
    // photos and a little clock on the mantel
    const photoCols = ['#9fb4e0', '#f0c75e', '#8fb8a0'];
    photoCols.forEach((c, i) => {
      const x = cx - 0.75 + i * 0.5;
      box(0.3, 0.36, 0.04, M.walnut, x, 1.52, B.z0 + 0.22).rotation.x = -0.12;
      box(0.22, 0.27, 0.01, std(c, { roughness: 0.6 }), x, 1.52, B.z0 + 0.245).rotation.x = -0.12;
    });
    cyl(0.1, 0.1, 0.05, M.cream, cx + 0.75, 1.45, B.z0 + 0.25, 16).rotation.x = Math.PI / 2;
    // a round mirror above
    const mirror = add(new THREE.CircleGeometry(0.42, 24), std('#d6dde0', { metalness: 0.6, roughness: 0.15 }), cx, 2.35, B.z0 + 0.33);
    const rim = add(new THREE.TorusGeometry(0.43, 0.035, 6, 28), std('#c9a25e', { metalness: 0.7, roughness: 0.3 }), cx, 2.35, B.z0 + 0.34);
    void mirror; void rim;
  }
  // record player on a low cabinet, playing, little notes floating up
  let disc!: THREE.Mesh;
  const notes: { s: THREE.Sprite; phase: number }[] = [];
  {
    const r = HOME.record, cx = (r.x0 + r.x1) / 2, cz = (r.z0 + r.z1) / 2;
    block(r, 0.62, M.walnut);
    box(r.x1 - r.x0 - 0.1, 0.03, 0.02, M.steel, cx, 0.32, r.z1 + 0.005);
    box(0.52, 0.09, 0.44, M.cream, cx, 0.67, cz);
    disc = cyl(0.17, 0.17, 0.015, M.black, cx - 0.04, 0.72, cz, 24);
    const label = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.004, 12), std('#e85d75')); label.position.y = 0.01; disc.add(label);
    const arm = box(0.02, 0.02, 0.26, M.steel, cx + 0.17, 0.75, cz - 0.02); arm.rotation.y = 0.35;
    // a few records leaning against the cabinet
    for (let i = 0; i < 3; i++) { const rec = box(0.3, 0.3, 0.015, std(['#2f5d62', '#d9a441', '#a8553a'][i]), cx - 0.35 + i * 0.04, 0.15, r.z1 + 0.06 + i * 0.02); rec.rotation.x = -0.25; }
    const noteTex = canvasTexture(64, 64, (x, w, h) => { x.fillStyle = '#fff2d6'; x.font = '48px serif'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('♪', w / 2, h / 2); });
    for (let i = 0; i < 4; i++) {
      const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: noteTex, transparent: true, depthWrite: false }));
      s.scale.setScalar(0.22); group.add(s); notes.push({ s, phase: i / 4 });
      s.userData.base = new THREE.Vector3(cx, 0.85, cz);
    }
  }
  pottedPlant(group, HOME.plants[2], 0x7a4a3a);
  // a poster on the wall left of the window
  {
    const poster = canvasTexture(128, 170, (x, w, h) => {
      x.fillStyle = '#f2e6d0'; x.fillRect(0, 0, w, h);
      x.fillStyle = '#e07a6a'; x.beginPath(); x.arc(w * 0.5, h * 0.42, 34, 0, 7); x.fill();
      x.fillStyle = '#2f5d62'; x.fillRect(0, h * 0.62, w, h * 0.38);
      x.fillStyle = '#2a2024'; x.font = '600 16px "Gowun Batang", serif'; x.textAlign = 'center'; x.fillText('오늘도 수고했어', w / 2, h * 0.88);
    });
    box(0.94, 1.22, 0.04, M.walnut, 1.9, 2.15, B.z0 + 0.03);
    add(new THREE.PlaneGeometry(0.84, 1.12), new THREE.MeshBasicMaterial({ map: poster }), 1.9, 2.15, B.z0 + 0.06);
  }

  // ---- 부엌: kitchen ----
  {
    const c = HOME.counter, cz = (c.z0 + c.z1) / 2;
    block({ ...c, x1: 22.7 }, 0.88, M.sage);
    box(22.7 - c.x0 + 0.04, 0.05, c.z1 - c.z0 + 0.06, M.marble, (c.x0 + 22.7) / 2, 0.905, cz);
    for (let x = c.x0 + 0.6; x < 22.4; x += 0.9) box(0.02, 0.6, 0.01, M.steel, x, 0.55, c.z1 + 0.005); // handles
    // sink and tap
    box(0.7, 0.03, 0.42, M.steel, 14.3, 0.93, cz);
    const tap = cyl(0.02, 0.02, 0.32, M.steel, 14.3, 1.08, c.z0 + 0.12, 8); void tap;
    box(0.02, 0.02, 0.2, M.steel, 14.3, 1.23, c.z0 + 0.2);
    // stove with a pot
    box(0.75, 0.02, 0.5, M.black, 20.5, 0.935, cz);
    cyl(0.16, 0.15, 0.2, std('#c8553d', { roughness: 0.4 }), 20.35, 1.04, cz + 0.05);
    // fridge
    box(0.95, 2.05, c.z1 - c.z0, std('#dfe3e6', { roughness: 0.3 }), 23.2, 1.025, cz);
    box(0.02, 0.7, 0.03, M.steel, 22.8, 1.35, c.z1 + 0.01);
    box(0.02, 0.4, 0.03, M.steel, 22.8, 0.55, c.z1 + 0.01);
    box(0.9, 0.01, 0.02, std('#b9bec4'), 23.2, 0.85, c.z1 + 0.005);
    // magnets and a drawing on the fridge
    for (const [x, y, col] of [[23.0, 1.7, '#e85d75'], [23.35, 1.55, '#f0c75e'], [23.15, 1.25, '#6fb3c8']] as const) box(0.08, 0.08, 0.02, std(col), x, y, c.z1 + 0.012);
    // upper cabinets and a hood on the right
    box(3.3, 0.72, 0.36, M.sage, 20.9, 2.36, B.z0 + 0.18);
    box(0.9, 0.3, 0.5, M.steel, 20.5, 1.85, B.z0 + 0.25);
    // a banner and flags on the left
    const banner = textPlate([{ text: '🎉 퇴근 축하해요 🎉', font: '700 46px "Gowun Batang", serif', color: '#2a2024', y: 72 }], 512, 112, '#f6e7c8');
    add(new THREE.PlaneGeometry(3.4, 0.74), new THREE.MeshBasicMaterial({ map: banner }), 15.8, 2.35, B.z0 + 0.05);
    bunting(group, new THREE.Vector3(12.4, 3.05, B.z0 + 0.1), new THREE.Vector3(19.0, 3.05, B.z0 + 0.1));
  }
  // island full of party food
  {
    const i = HOME.island, cx = (i.x0 + i.x1) / 2, cz = (i.z0 + i.z1) / 2, w = i.x1 - i.x0, d = i.z1 - i.z0;
    block(i, 0.88, M.trim);
    box(w + 0.2, 0.06, d + 0.24, M.marble, cx, 0.91, cz);
    const top = 0.94;
    // pizza in its box
    box(0.62, 0.02, 0.62, std('#d9b98a'), cx - 1.6, top + 0.01, cz);
    const lid = box(0.62, 0.02, 0.62, std('#d9b98a'), cx - 1.6, top + 0.3, cz - 0.31); lid.rotation.x = -1.2; lid.position.z = cz - 0.42;
    cyl(0.27, 0.27, 0.025, std('#e9b45a'), cx - 1.6, top + 0.035, cz, 20);
    cyl(0.24, 0.24, 0.027, std('#d2553a'), cx - 1.6, top + 0.037, cz, 20);
    for (let k = 0; k < 8; k++) { const a = (k / 8) * Math.PI * 2; cyl(0.03, 0.03, 0.03, std('#8e2a22'), cx - 1.6 + Math.cos(a) * 0.14, top + 0.045, cz + Math.sin(a) * 0.14, 8); }
    // cake with candles
    cyl(0.24, 0.24, 0.16, std('#fbf3e6'), cx - 0.3, top + 0.08, cz, 20);
    cyl(0.245, 0.245, 0.04, std('#f2a7b8'), cx - 0.3, top + 0.15, cz, 20);
    cyl(0.17, 0.17, 0.12, std('#fbf3e6'), cx - 0.3, top + 0.22, cz, 20);
    for (let k = 0; k < 5; k++) {
      const a = (k / 5) * Math.PI * 2, x = cx - 0.3 + Math.cos(a) * 0.1, z = cz + Math.sin(a) * 0.1;
      cyl(0.01, 0.01, 0.08, std(['#6fb3c8', '#f0c75e', '#e85d75'][k % 3]), x, top + 0.32, z, 6);
      fx.add(x, top + 0.36, z, 0.8);
    }
    // chips, red party cups, bottles
    const bowl = add(new THREE.SphereGeometry(0.16, 12, 6, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2), std('#6fb3c8', { side: THREE.DoubleSide }), cx + 0.6, top + 0.16, cz + 0.05);
    bowl.rotation.x = Math.PI;
    for (let k = 0; k < 6; k++) { const ch = add(new THREE.CircleGeometry(0.045, 5), std('#e8b54f', { side: THREE.DoubleSide }), cx + 0.6 + rnd(-0.08, 0.08), top + 0.15 + rnd(0, 0.03), cz + 0.05 + rnd(-0.08, 0.08)); ch.rotation.set(rnd(-1.4, -1), 0, rnd(0, 3)); }
    const cup = new THREE.CylinderGeometry(0.05, 0.038, 0.13, 10);
    for (let k = 0; k < 6; k++) add(cup, std('#d8323f', { roughness: 0.4 }), cx + 1.15 + (k % 3) * 0.13, top + 0.065, cz - 0.1 + Math.floor(k / 3) * 0.16);
    for (const [k, col] of ['#2f6b3a', '#c88a2a', '#7c1d2c'].entries()) {
      cyl(0.045, 0.05, 0.26, std(col, { roughness: 0.2 }), cx + 1.9 + k * 0.13, top + 0.13, cz + 0.1, 8);
      cyl(0.016, 0.025, 0.09, std(col, { roughness: 0.2 }), cx + 1.9 + k * 0.13, top + 0.3, cz + 0.1, 6);
    }
  }
  // bar stools
  for (const s of HOME.stools) {
    cyl(0.2, 0.2, 0.06, M.mustard, s.x, 0.72, s.z, 16);
    cyl(0.025, 0.025, 0.7, M.steel, s.x, 0.35, s.z, 6);
    cyl(0.16, 0.18, 0.02, M.steel, s.x, 0.01, s.z, 14);
  }
  // pendant lamps over the island
  for (const x of [16.2, 18, 19.8]) {
    const z = (HOME.island.z0 + HOME.island.z1) / 2;
    group.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(x, H, z), new THREE.Vector3(x, 2.35, z)]), new THREE.LineBasicMaterial({ color: 0x2a2a2a })));
    add(new THREE.ConeGeometry(0.22, 0.24, 16, 1, true), std('#2f5d62', { side: THREE.DoubleSide }), x, 2.25, z);
    add(new THREE.SphereGeometry(0.06, 8, 6), new THREE.MeshBasicMaterial({ color: 0xfff1d0 }), x, 2.15, z);
    lampGlow(group, x, 2.12, z, 1.1);
  }
  const kitchenLight = new THREE.PointLight(0xffe2b0, 0.6, 9, 1.5);
  kitchenLight.position.set(18, 2.2, -1.4); group.add(kitchenLight);

  // ---- 테라스: terrace ----
  {
    // railing along the back and the far side
    const rail = (from: THREE.Vector3, to: THREE.Vector3) => {
      const len = from.distanceTo(to), mid = from.clone().lerp(to, 0.5), ry = Math.atan2(to.x - from.x, to.z - from.z) + Math.PI / 2;
      const top = add(new THREE.BoxGeometry(len, 0.06, 0.08), M.frame, mid.x, 1.05, mid.z, ry); void top;
      const pane = add(new THREE.PlaneGeometry(len, 0.9), M.glass, mid.x, 0.5, mid.z, ry); pane.renderOrder = 5;
      const n = Math.round(len / 1.5);
      for (let k = 0; k <= n; k++) { const p = from.clone().lerp(to, k / n); box(0.06, 1.05, 0.06, M.frame, p.x, 0.525, p.z); }
    };
    rail(new THREE.Vector3(24.1, 0, B.z0 + 0.05), new THREE.Vector3(B.x1 - 0.05, 0, B.z0 + 0.05));
    rail(new THREE.Vector3(B.x1 - 0.05, 0, B.z0 + 0.05), new THREE.Vector3(B.x1 - 0.05, 0, B.z1 - 0.1));
  }
  // The view from the terrace is a painted stage backdrop standing just past the
  // railing — sky and skyline, exactly as wide as the terrace, its top and edges
  // melting into the dark. Being close, it never peeks out above the indoor
  // rooms the way a far-away sky would; indoors stays indoors.
  const view = terraceBackdrop(sky.canvas, city.canvas);
  const VIEW = { x0: 24.2, x1: 44, z: -6.4, h: 6.2 };
  const backdrop = add(new THREE.PlaneGeometry(VIEW.x1 - VIEW.x0, VIEW.h), new THREE.MeshBasicMaterial({ map: view.texture, transparent: true, depthWrite: false, fog: false }),
    (VIEW.x0 + VIEW.x1) / 2, VIEW.h / 2 - 0.4, VIEW.z);
  backdrop.renderOrder = -1;
  // deck furniture
  for (const [k, b] of HOME.beanbags.entries()) {
    const bag = add(new THREE.SphereGeometry(b.r, 14, 10), std(k ? '#6fb3c8' : '#d9a441', { roughness: 1 }), b.x, 0.26, b.z);
    bag.scale.set(1, 0.58, 1); bag.rotation.z = 0.1;
    const dent = add(new THREE.SphereGeometry(b.r * 0.62, 12, 8), std(k ? '#5aa0b6' : '#c69236', { roughness: 1 }), b.x, 0.42, b.z + 0.05); dent.scale.set(1, 0.35, 1);
  }
  // grill with glowing coals
  {
    const g = HOME.grill;
    for (let k = 0; k < 3; k++) { const a = (k / 3) * Math.PI * 2; const leg = cyl(0.02, 0.02, 0.8, M.black, g.x + Math.cos(a) * 0.16, 0.4, g.z + Math.sin(a) * 0.16, 6); leg.rotation.set(Math.sin(a) * 0.2, 0, -Math.cos(a) * 0.2); }
    const bowl = add(new THREE.SphereGeometry(0.34, 16, 8, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2), std('#1d1a1c', { side: THREE.DoubleSide, roughness: 0.4 }), g.x, 0.86, g.z);
    void bowl;
    const lid = add(new THREE.SphereGeometry(0.34, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2), std('#1d1a1c', { roughness: 0.4 }), g.x, 0.9, g.z - 0.25);
    lid.rotation.x = -1.3;
    const coals = add(new THREE.CircleGeometry(0.3, 16), new THREE.MeshBasicMaterial({ color: 0xff5a1f }), g.x, 0.84, g.z);
    coals.rotation.x = -Math.PI / 2;
    for (let k = 0; k < 4; k++) { const s = box(0.28, 0.025, 0.08, std('#e9c49a'), g.x - 0.12 + (k % 2) * 0.22, 0.88, g.z - 0.08 + Math.floor(k / 2) * 0.16); s.rotation.y = 0.2; }
    lampGlow(group, g.x, 0.95, g.z, 0.9, 0xff6a2a);
  }
  // patio table with a lantern and drinks
  {
    const p = HOME.patioTable;
    cyl(p.r, p.r, 0.05, M.cream, p.x, 0.74, p.z, 22);
    cyl(0.04, 0.04, 0.72, M.frame, p.x, 0.36, p.z, 8);
    cyl(0.3, 0.32, 0.03, M.frame, p.x, 0.015, p.z, 16);
    box(0.16, 0.24, 0.16, M.frame, p.x, 0.89, p.z);
    fx.add(p.x, 0.86, p.z, 1.6);
    for (const [k, col] of ['#f0c75e', '#e85d75', '#8fb8a0'].entries()) {
      const a = k * 2.1; cyl(0.04, 0.035, 0.14, std('#eef3f4', { transparent: true, opacity: 0.5 }), p.x + Math.cos(a) * 0.32, 0.84, p.z + Math.sin(a) * 0.32, 10);
      cyl(0.035, 0.03, 0.09, std(col, { roughness: 0.2 }), p.x + Math.cos(a) * 0.32, 0.82, p.z + Math.sin(a) * 0.32, 10);
    }
  }
  pottedPlant(group, HOME.plants[0], 0x8a5a3c, 1.3);
  pottedPlant(group, HOME.plants[1], 0x8a5a3c, 1.2);
  // string lights zigzagging over the terrace on three posts
  for (const z of [-2.5, 1.0]) {
    cyl(0.05, 0.06, 2.9, M.frame, B.x1 - 0.25, 1.45, z, 8);
  }
  lights.strand(new THREE.Vector3(24.15, 3.0, -4.6), new THREE.Vector3(B.x1 - 0.25, 2.85, -2.5), 0.32, 12, 0.5);
  lights.strand(new THREE.Vector3(24.15, 3.0, -0.6), new THREE.Vector3(B.x1 - 0.25, 2.85, 1.0), 0.32, 12, 0.5);
  // indoor strands along the crown moulding
  for (const [x0, x1] of [[0.2, 11.8], [12.2, 23.8]]) lights.strand(new THREE.Vector3(x0, H - 0.18, B.z0 + 0.16), new THREE.Vector3(x1, H - 0.18, B.z0 + 0.16), 0.3, 1.5, 0.14);
  lights.done();

  // ---- lights ----
  const hemi = new THREE.HemisphereLight(0xfff1e0, 0x3a2a20, 1);
  const sun = new THREE.DirectionalLight(0xffffff, 1); sun.position.set(-6, 12, 9);
  const warm = new THREE.AmbientLight(0xffd9a8, 0.4);
  group.add(hemi, sun, warm);
  scene.background = new THREE.Color('#141012');

  const setTime = (date: Date) => {
    const s = skyAt(date);
    sky.paint(s);
    night = s.night;
    city.paint(s.night);
    view.paint();
    hemi.intensity = 0.55 + s.hemi * 0.5;
    sun.color.copy(s.sun); sun.intensity = 0.4 + s.sunI * 0.6;
    warm.intensity = 0.35 + 0.5 * s.night;
    fireLight.intensity = 0.8 + 1.4 * s.night;
    kitchenLight.intensity = 0.4 + 0.8 * s.night;
    return s;
  };

  return {
    paintings: [],
    floor,
    setTime,
    loadArt: async () => {},
    fadeOccluders(cam: THREE.Vector3) {
      for (const h of headers) {
        // fully there 3m+ to the side, almost gone when the camera is right behind it
        const o = Math.min(1, Math.max(0.08, (Math.abs(cam.x - h.x) - 0.6) / 2.4));
        for (const m of h.mats) { m.opacity = (m.userData.base as number) * o; m.depthWrite = o > 0.95 && m.userData.base === 1; }
      }
    },
    tick(dt: number) {
      t += dt;
      lights.tick(t, night);
      fx.tick(t, night);
      disc.rotation.y -= dt * 3.5;
      for (const n of notes) {
        const u = (t * 0.25 + n.phase) % 1;
        const base = n.s.userData.base as THREE.Vector3;
        n.s.position.set(base.x + Math.sin(u * 6 + n.phase * 9) * 0.25, base.y + u * 1.4, base.z + 0.1);
        (n.s.material as THREE.SpriteMaterial).opacity = Math.sin(u * Math.PI) * 0.9;
      }
      fireLight.intensity *= 0.97 + 0.06 * Math.random();
    },
  };
}

/** A soft additive halo around a lamp. */
function lampGlow(group: THREE.Group, x: number, y: number, z: number, size: number, color = 0xffd9a0) {
  const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: glow(), color, transparent: true, opacity: 0.85, depthWrite: false, blending: THREE.AdditiveBlending }));
  s.position.set(x, y, z); s.scale.setScalar(size); group.add(s);
  return s;
}

/** Soft sage wallpaper with a small repeating sprig. */
function wallpaper() {
  return canvasTexture(128, 128, (x, w, h) => {
    x.fillStyle = '#8a9a83'; x.fillRect(0, 0, w, h);
    x.fillStyle = 'rgba(255,248,230,.16)';
    for (let i = 0; i < 4; i++) x.fillRect(i * 32 + 15, 0, 2, h);
    x.fillStyle = 'rgba(255,248,230,.22)';
    for (const [cx, cy] of [[32, 32], [96, 96]]) {
      for (let k = 0; k < 5; k++) { const a = (k / 5) * Math.PI * 2; x.beginPath(); x.ellipse(cx + Math.cos(a) * 6, cy + Math.sin(a) * 6, 5, 2.5, a, 0, 7); x.fill(); }
    }
  }, [1, 1]);
}

/** A round-cornered woven rug: warm stripes and a diamond in the middle. */
function rugTexture() {
  return canvasTexture(256, 160, (x, w, h) => {
    x.fillStyle = '#d8c3a0'; x.fillRect(0, 0, w, h);
    x.fillStyle = '#a8553a'; x.fillRect(10, 10, w - 20, h - 20);
    x.fillStyle = '#e8d8b8'; x.fillRect(22, 22, w - 44, h - 44);
    x.fillStyle = '#2f5d62';
    x.beginPath(); x.moveTo(w / 2, 34); x.lineTo(w - 70, h / 2); x.lineTo(w / 2, h - 34); x.lineTo(70, h / 2); x.closePath(); x.fill();
    x.fillStyle = '#d9a441';
    x.beginPath(); x.moveTo(w / 2, 58); x.lineTo(w - 104, h / 2); x.lineTo(w / 2, h - 58); x.lineTo(104, h / 2); x.closePath(); x.fill();
    x.fillStyle = 'rgba(0,0,0,.06)';
    for (let i = 0; i < w; i += 3) x.fillRect(i, 0, 1, h);
  });
}

/**
 * The terrace view: the visitor's sky with the city in front, faded to clear at
 * the top and the sides so it blends into the dark around the dollhouse.
 */
function terraceBackdrop(skyCanvas: HTMLCanvasElement, cityCanvas: HTMLCanvasElement) {
  const c = document.createElement('canvas'); c.width = 512; c.height = 224;
  const texture = new THREE.CanvasTexture(c); texture.colorSpace = THREE.SRGBColorSpace;
  const paint = () => {
    const g = c.getContext('2d')!, w = c.width, h = c.height;
    g.globalCompositeOperation = 'source-over';
    g.clearRect(0, 0, w, h);
    g.drawImage(skyCanvas, 0, 0, w, h);
    // the skyline along the bottom, a slice of the wide city strip
    g.drawImage(cityCanvas, 0, 0, cityCanvas.width * 0.5, cityCanvas.height, 0, h * 0.42, w, h * 0.58);
    // fade: clear at the top, soft at the sides
    g.globalCompositeOperation = 'destination-in';
    const v = g.createLinearGradient(0, 0, 0, h);
    v.addColorStop(0, 'rgba(0,0,0,0)'); v.addColorStop(0.38, 'rgba(0,0,0,1)'); v.addColorStop(1, 'rgba(0,0,0,1)');
    g.fillStyle = v; g.fillRect(0, 0, w, h);
    const sides = g.createLinearGradient(0, 0, w, 0);
    sides.addColorStop(0, 'rgba(0,0,0,.25)'); sides.addColorStop(0.06, 'rgba(0,0,0,1)'); sides.addColorStop(0.9, 'rgba(0,0,0,1)'); sides.addColorStop(1, 'rgba(0,0,0,0)');
    g.fillStyle = sides; g.fillRect(0, 0, w, h);
    g.globalCompositeOperation = 'source-over';
    texture.needsUpdate = true;
  };
  return { texture, paint };
}
