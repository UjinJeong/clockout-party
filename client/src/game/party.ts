import * as THREE from 'three';
import {
  MOVE_HZ, NEAR_RADIUS, WALK_SPEED, inWater, isNear, moveWithCollision, roomAt,
  type Battery, type Emote, type MapRoom,
} from '@party/shared';
import { buildAnimal, type AnimalRig } from '../avatar/animal';
import { Animator } from '../avatar/animator';
import type { NetPlayer, PartyConnection } from '../net/types';
import type { Painting } from '../world/gallery';
import type { World } from '../world/world';
import { Tag } from '../ui/bubbles';
import type { Controls } from './controls';
import { Sparkles } from './effects';
import { cameraPose } from './camera';

interface Guest {
  net: NetPlayer;
  rig: AnimalRig;
  anim: Animator;
  tag: Tag;
  pos: THREE.Vector2; // rendered position (smoothed for others, exact for self)
  dir: number;
  lookKey: string;
  /** 0 on dry land, 1 bobbing in the pool on a swim ring. */
  wet: number;
  floatie: THREE.Mesh | null;
}

/** How far a guest sinks when standing in the pool (the ring keeps them up). */
const WADE_DEPTH = 0.5;
const FLOATIE_COLORS = ['#ff7aa2', '#ffd166', '#6fd3c7', '#ff9f68'];
const floatieGeo = new THREE.TorusGeometry(0.46, 0.14, 10, 22);

export interface PartyHooks {
  room(room: MapRoom): void;
  painting(p: Painting | null): void;
  guests(list: { id: string; name: string; battery: Battery; near: boolean; self: boolean; muted: boolean }[]): void;
  arrived(p: Painting): void;
}


/**
 * Runs the party: owns every guest's avatar, moves you, follows you with the
 * camera, and turns network events into bubbles and gestures.
 */
export class Party {
  private guests = new Map<string, Guest>();
  private muted = new Set<string>();
  private sendT = 0;
  private lastSent = { x: 0, z: 0, dir: 0, moving: false };
  private room: MapRoom | null = null;
  private painting: Painting | null = null;
  private walkTo: Painting | null = null;
  private ring: THREE.Mesh;
  private targetMark: THREE.Mesh;
  /** 0 = close behind you (동물의 숲), 1 = overview. `zoomGoal` is where the wheel/button want it. */
  private zoom = 0;
  private zoomGoal = 0;
  private pinch: { d: number; zoom: number } | null = null;
  private touches = new Map<number, { x: number; y: number }>();
  private afterPinch = false; // the fingers of a pinch lifting one by one are not taps
  private camTarget = new THREE.Vector3();
  private ray = new THREE.Raycaster();
  private listDirty = true;
  private listT = 0;
  private disposed = false;
  private sparkles: Sparkles;

  constructor(
    private scene: THREE.Scene,
    private camera: THREE.PerspectiveCamera,
    private dom: HTMLCanvasElement,
    private world: World,
    private conn: PartyConnection,
    private controls: Controls,
    private tagLayer: HTMLElement,
    private hooks: PartyHooks,
  ) {
    // hearing range: a faint gilt ring on the floor around you
    const ringGeo = new THREE.RingGeometry(NEAR_RADIUS - 0.04, NEAR_RADIUS, 64);
    this.ring = new THREE.Mesh(ringGeo, new THREE.MeshBasicMaterial({ color: 0xe0bd7a, transparent: true, opacity: 0.28, depthWrite: false }));
    this.ring.rotation.x = -Math.PI / 2; this.ring.position.y = 0.015; this.ring.renderOrder = 3;
    scene.add(this.ring);
    this.targetMark = new THREE.Mesh(new THREE.RingGeometry(0.16, 0.24, 24),
      new THREE.MeshBasicMaterial({ color: 0xf1e2bd, transparent: true, opacity: 0.8, depthWrite: false }));
    this.targetMark.rotation.x = -Math.PI / 2; this.targetMark.position.y = 0.02; this.targetMark.visible = false;
    scene.add(this.targetMark);
    this.sparkles = new Sparkles(scene);

    conn.on({
      add: p => this.addGuest(p),
      change: p => this.updateGuest(p),
      remove: id => this.removeGuest(id),
      chat: (from, text) => { if (!this.muted.has(from)) this.guests.get(from)?.tag.say(text); },
      emote: (from, kind) => { if (!this.muted.has(from)) this.playEmote(from, kind); },
      voice: (from, blob, ms) => { if (!this.muted.has(from)) this.guests.get(from)?.tag.voice(blob, ms, from === conn.selfId); },
      snap: (x, z) => { const me = this.self(); if (me) { me.pos.set(x, z); me.net.x = x; me.net.z = z; } },
    });

    dom.addEventListener('pointerup', this.onTap);
    dom.addEventListener('wheel', this.onWheel, { passive: true });
    dom.addEventListener('pointerdown', this.onPointerDown);
    dom.addEventListener('pointermove', this.onPointerMove);
    dom.addEventListener('pointercancel', this.onPointerEnd);
  }

  self() { return this.guests.get(this.conn.selfId); }

  mute(id: string, on: boolean) { if (on) this.muted.add(id); else this.muted.delete(id); this.listDirty = true; }

  emote(kind: Emote) { this.conn.emote(kind); }

  /** Walk to a painting and tell the UI once we are standing in front of it. */
  goTo(p: Painting) { this.walkTo = p; this.controls.target = { ...p.stand }; }

  private addGuest(p: NetPlayer) {
    if (this.guests.has(p.id)) { this.updateGuest(p); return; }
    const rig = buildAnimal(p.look);
    rig.root.position.set(p.x, 0, p.z);
    rig.root.rotation.y = p.dir;
    this.scene.add(rig.root);
    const isSelf = p.id === this.conn.selfId;
    const tag = new Tag(this.tagLayer, p.name, isSelf);
    tag.setBattery(p.battery);
    this.guests.set(p.id, {
      net: { ...p }, rig, anim: new Animator(rig), tag, pos: new THREE.Vector2(p.x, p.z), dir: p.dir,
      lookKey: JSON.stringify(p.look), wet: 0, floatie: null,
    });
    if (isSelf) { this.camTarget.set(p.x, 0, p.z); this.snapCamera(); }
    this.listDirty = true;
  }

  private updateGuest(p: NetPlayer) {
    const g = this.guests.get(p.id);
    if (!g) { this.addGuest(p); return; }
    const isSelf = p.id === this.conn.selfId;
    // our own position is driven locally; only take the rest from the network
    if (isSelf) g.net = { ...p, x: g.net.x, z: g.net.z, dir: g.net.dir, moving: g.net.moving };
    else g.net = { ...p };
    g.tag.setName(p.name);
    g.tag.setBattery(p.battery);
    const key = JSON.stringify(p.look);
    if (key !== g.lookKey) {
      const rig = buildAnimal(p.look);
      rig.root.position.copy(g.rig.root.position); rig.root.rotation.y = g.rig.root.rotation.y;
      g.rig.dispose(); this.scene.add(rig.root);
      g.rig = rig; g.anim = new Animator(rig); g.lookKey = key; g.floatie = null;
    }
    this.listDirty = true;
  }

  private removeGuest(id: string) {
    const g = this.guests.get(id);
    if (!g) return;
    g.rig.dispose(); g.tag.dispose();
    this.guests.delete(id);
    this.listDirty = true;
  }

  private playEmote(from: string, kind: Emote) {
    const g = this.guests.get(from);
    if (!g) return;
    g.anim.play(kind);
    g.tag.emote(kind);
    // a little burst of light in the room, from the raised glass or above the head
    if (kind === 'cheers' || kind === 'heart' || kind === 'clap') {
      const at = new THREE.Vector3(g.pos.x, 1.75, g.pos.y);
      const delay = kind === 'cheers' ? 520 : 200; // when the arm is at its highest
      setTimeout(() => {
        if (this.disposed) return;
        if (kind === 'cheers' && g.rig.held) g.rig.held.getWorldPosition(at).add(new THREE.Vector3(0, 0.18, 0));
        this.sparkles.burst(at, kind === 'heart' ? ['#ff8fb1', '#ffc2d4', '#ff5d8f'] : ['#ffd27a', '#fff1c4', '#f0b04a'], kind === 'clap' ? 18 : 40);
      }, delay);
    }
  }

  private onTap = (e: PointerEvent) => {
    const wasPinch = this.touches.size > 1 || !!this.pinch || this.afterPinch;
    this.onPointerEnd(e);
    if (this.touches.size === 0) this.afterPinch = false;
    if (wasPinch) return;
    if (e.button !== 0 && e.pointerType === 'mouse') return;
    const r = this.dom.getBoundingClientRect();
    const ndc = new THREE.Vector2(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    this.ray.setFromCamera(ndc, this.camera);
    const paintingHit = this.ray.intersectObjects(this.world.paintings.map(p => p.mesh), false)[0];
    if (paintingHit) {
      const p = this.world.paintings.find(q => q.mesh === paintingHit.object);
      if (p) { this.goTo(p); return; }
    }
    const hit = this.ray.intersectObject(this.world.floor, false)[0];
    if (hit) {
      this.walkTo = null;
      this.controls.target = { x: hit.point.x, z: hit.point.z };
      this.targetMark.position.set(hit.point.x, 0.02, hit.point.z);
      this.targetMark.visible = true;
    }
  };

  private onWheel = (e: WheelEvent) => {
    this.zoomGoal = Math.min(1, Math.max(0, this.zoomGoal + (e.deltaY > 0 ? 0.12 : -0.12)));
  };

  // two fingers: pinch to zoom between the close view and the overview
  private onPointerDown = (e: PointerEvent) => {
    if (e.pointerType !== 'touch') return;
    this.touches.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (this.touches.size === 2) { this.pinch = { d: this.touchSpread(), zoom: this.zoomGoal }; this.controls.target = null; }
  };
  private onPointerMove = (e: PointerEvent) => {
    if (!this.touches.has(e.pointerId)) return;
    this.touches.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (this.pinch && this.touches.size === 2) {
      this.zoomGoal = Math.min(1, Math.max(0, this.pinch.zoom + (this.pinch.d - this.touchSpread()) / 300));
    }
  };
  private onPointerEnd = (e: PointerEvent) => {
    this.touches.delete(e.pointerId);
    if (this.pinch) this.afterPinch = true;
    if (this.touches.size < 2) this.pinch = null;
  };
  private touchSpread() {
    const [a, b] = [...this.touches.values()];
    return Math.hypot(a.x - b.x, a.y - b.y);
  }

  /** Switch between the close view and the overview (the HUD's view button). */
  toggleView() { this.zoomGoal = this.zoomGoal < 0.5 ? 1 : 0; return this.zoomGoal; }

  private snapCamera() {
    const aspect = this.dom.clientWidth / Math.max(1, this.dom.clientHeight);
    const pose = cameraPose(this.camTarget, this.zoom, aspect);
    if (Math.abs(this.camera.fov - pose.fov) > 0.05) { this.camera.fov = pose.fov; this.camera.updateProjectionMatrix(); }
    this.camera.position.copy(pose.position);
    this.camera.lookAt(pose.lookAt);
  }

  update(dt: number) {
    if (this.disposed) return;
    const me = this.self();
    if (me) this.moveSelf(me, dt);

    for (const [id, g] of this.guests) {
      if (id !== this.conn.selfId) {
        // smooth toward the latest network position
        const k = 1 - Math.exp(-dt * 10);
        g.pos.x += (g.net.x - g.pos.x) * k;
        g.pos.y += (g.net.z - g.pos.y) * k;
        g.dir = turn(g.dir, g.net.dir, dt * 10);
      }
      g.rig.root.position.x = g.pos.x;
      g.rig.root.position.z = g.pos.y;
      g.rig.root.rotation.y = g.dir;
      this.wade(g, dt);
      const moving = id === this.conn.selfId ? g.net.moving : g.net.moving || Math.hypot(g.net.x - g.pos.x, g.net.z - g.pos.y) > 0.05;
      g.anim.update(dt, moving, g.net.battery);
    }

    // camera follows you
    if (me) {
      // close view follows you fully; the overview keeps the old gentle framing
      const edge = 3.5 + this.zoom * 1;
      const b = this.world.map.bounds;
      const tx = Math.min(b.x1 - edge, Math.max(b.x0 + edge, me.pos.x));
      const tz = me.pos.y * (1 - this.zoom) + Math.max(-1.5, Math.min(1.5, me.pos.y * 0.5)) * this.zoom;
      const k = 1 - Math.exp(-dt * 5);
      this.camTarget.x += (tx - this.camTarget.x) * k;
      this.camTarget.z += (tz - this.camTarget.z) * k;
      this.zoom += (this.zoomGoal - this.zoom) * (1 - Math.exp(-dt * 6));
      this.snapCamera();
      this.world.fadeOccluders(this.camera.position);
      this.ring.position.set(me.pos.x, 0.015, me.pos.y);
    }

    this.sparkles.tick(dt);
    this.placeTags();
    this.listT -= dt;
    if (this.listDirty || this.listT <= 0) this.emitList();
  }

  private moveSelf(me: Guest, dt: number) {
    let { x: dx, z: dz } = this.controls.direction();
    const tgt = this.controls.target;
    if (dx === 0 && dz === 0 && tgt) {
      const ox = tgt.x - me.pos.x, oz = tgt.z - me.pos.y, d = Math.hypot(ox, oz);
      if (d < 0.12) {
        this.controls.target = null;
        this.targetMark.visible = false;
        if (this.walkTo) {
          me.dir = Math.atan2(-this.walkTo.slot.face.x, -this.walkTo.slot.face.z);
          this.hooks.arrived(this.walkTo);
          this.walkTo = null;
        }
      } else { dx = ox / d; dz = oz / d; if (d < 0.5) { dx *= d / 0.5 + 0.3; dz *= d / 0.5 + 0.3; } }
    } else if (dx !== 0 || dz !== 0) {
      this.targetMark.visible = false;
      this.walkTo = null;
    }
    const moving = dx !== 0 || dz !== 0;
    if (moving) {
      const step = WALK_SPEED * dt;
      const wading = me.wet > 0.5 ? 0.7 : 1; // the water slows you down a little
      const next = moveWithCollision({ x: me.pos.x, z: me.pos.y }, { x: me.pos.x + dx * step * wading, z: me.pos.y + dz * step * wading }, this.world.map);
      const moved = Math.hypot(next.x - me.pos.x, next.z - me.pos.y);
      if (moved < step * 0.1 && this.controls.target) { this.controls.target = null; this.targetMark.visible = false; this.walkTo = null; }
      me.pos.set(next.x, next.z);
      me.dir = turn(me.dir, Math.atan2(dx, dz), dt * 12);
    }
    me.net.x = me.pos.x; me.net.z = me.pos.y; me.net.dir = me.dir; me.net.moving = moving;

    // send at MOVE_HZ while moving, plus one final "stopped"
    this.sendT -= dt;
    const changed = moving !== this.lastSent.moving
      || Math.abs(me.pos.x - this.lastSent.x) > 0.01 || Math.abs(me.pos.y - this.lastSent.z) > 0.01;
    if (changed && this.sendT <= 0) {
      this.sendT = 1 / MOVE_HZ;
      this.conn.move(me.pos.x, me.pos.y, me.dir, moving);
      this.lastSent = { x: me.pos.x, z: me.pos.y, dir: me.dir, moving };
    }

    const room = roomAt(me.pos.x, this.world.map);
    if (room.id !== this.room?.id) { this.room = room; this.hooks.room(room); }

    // the painting you are standing in front of
    let best: Painting | null = null, bestD = 2.3;
    for (const p of this.world.paintings) {
      const d = Math.hypot(p.stand.x - me.pos.x, p.stand.z - me.pos.y);
      if (d < bestD) { bestD = d; best = p; }
    }
    if (best !== this.painting) { this.painting = best; this.hooks.painting(best); }
  }

  /** In the pool, sink to the waist on a swim ring and bob gently; climb out on land. */
  private wade(g: Guest, dt: number) {
    const wet = inWater({ x: g.pos.x, z: g.pos.y }, this.world.map) ? 1 : 0;
    g.wet += (wet - g.wet) * (1 - Math.exp(-dt * 6));
    if (g.wet < 0.01 && !g.floatie) { g.rig.root.position.y = 0; return; }
    if (!g.floatie) {
      const color = FLOATIE_COLORS[[...g.net.id].reduce((a, c) => a + c.charCodeAt(0), 0) % FLOATIE_COLORS.length];
      g.floatie = new THREE.Mesh(floatieGeo, new THREE.MeshStandardMaterial({ color, roughness: 0.35 }));
      g.floatie.rotation.x = Math.PI / 2;
      g.floatie.position.y = 0.48;
      g.rig.root.add(g.floatie);
    }
    const t = performance.now() / 1000 + g.pos.x;
    g.rig.root.position.y = -WADE_DEPTH * g.wet + Math.sin(t * 2.2) * 0.025 * g.wet;
    g.floatie.visible = g.wet > 0.15;
    g.floatie.scale.setScalar(0.6 + 0.4 * g.wet);
  }

  private placeTags() {
    const w = this.dom.clientWidth, h = this.dom.clientHeight;
    const v = new THREE.Vector3();
    const me = this.self();
    const talking: { tag: Tag; x: number; y: number; bw: number; bh: number }[] = [];
    const plates: { l: number; r: number; t: number; b: number }[] = [];
    for (const [id, g] of this.guests) {
      v.set(g.pos.x, 1.85 + g.rig.root.position.y, g.pos.y).project(this.camera);
      const vis = v.z < 1 && v.x > -1.2 && v.x < 1.2 && v.y > -1.2 && v.y < 1.3;
      const sx = (v.x * 0.5 + 0.5) * w, sy = (-v.y * 0.5 + 0.5) * h;
      g.tag.place(sx, sy, vis, v.z);
      if (me && id !== this.conn.selfId) g.tag.setNear(isNear(me.net, g.net));
      if (vis) {
        plates.push({ l: sx - 45, r: sx + 45, t: sy - 22, b: sy });
        const box = g.tag.stackBox();
        if (box) talking.push({ tag: g.tag, x: sx, y: sy, bw: box.w, bh: box.h });
      }
    }
    // Keep speech bubbles from piling on top of each other: guests nearer the
    // camera (lower on screen) keep their spot, others lift above them.
    talking.sort((a, b) => b.y - a.y);
    const placed: { l: number; r: number; t: number; b: number }[] = [];
    for (const s of talking) {
      // other people's name plates count as obstacles too (but not your own plate)
      const others = plates.filter(p => Math.abs(p.b - s.y) > 1 || Math.abs((p.l + p.r) / 2 - s.x) > 1);
      let lift = 0;
      for (let pass = 0; pass < 6; pass++) {
        const bottom = s.y - 26 - lift, top = bottom - s.bh, l = s.x - s.bw / 2, r = s.x + s.bw / 2;
        const hit = placed.find(p => l < p.r && r > p.l && top < p.b && bottom > p.t)
          ?? others.find(p => l < p.r && r > p.l && top < p.b && bottom > p.t);
        if (!hit) break;
        lift += bottom - hit.t + 4;
      }
      s.tag.lift(lift);
      const bottom = s.y - 26 - lift;
      placed.push({ l: s.x - s.bw / 2, r: s.x + s.bw / 2, t: bottom - s.bh, b: bottom });
    }
  }

  private emitList() {
    this.listDirty = false; this.listT = 1;
    const me = this.self();
    this.hooks.guests([...this.guests.values()].map(g => ({
      id: g.net.id, name: g.net.name, battery: g.net.battery, self: g.net.id === this.conn.selfId,
      near: !!me && g.net.id !== me.net.id && isNear(me.net, g.net), muted: this.muted.has(g.net.id),
    })));
  }

  dispose() {
    this.disposed = true;
    this.dom.removeEventListener('pointerup', this.onTap);
    this.dom.removeEventListener('wheel', this.onWheel);
    this.dom.removeEventListener('pointerdown', this.onPointerDown);
    this.dom.removeEventListener('pointermove', this.onPointerMove);
    this.dom.removeEventListener('pointercancel', this.onPointerEnd);
    for (const id of [...this.guests.keys()]) this.removeGuest(id);
    this.ring.removeFromParent(); this.targetMark.removeFromParent();
    this.sparkles.dispose();
  }
}

function turn(a: number, b: number, k: number) {
  let d = b - a;
  while (d > Math.PI) d -= Math.PI * 2;
  while (d < -Math.PI) d += Math.PI * 2;
  return a + d * Math.min(1, k);
}
