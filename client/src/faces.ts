/**
 * Developer-only sheet (served by `npm run dev` at /faces.html, never built):
 * every animal (rows) with every expression (columns), close up, to check
 * the faces read well on all of them.  /faces.html?color=3
 */
import * as THREE from 'three';
import { KINDS, type Mood } from '@party/shared';
import { buildAnimal } from './avatar/animal';
import { expressionFor } from './avatar/face';
import type { Gesture } from './avatar/animator';

const q = new URLSearchParams(location.search);
const color = Number(q.get('color') ?? 0);
const COLS: { label: string; mood: Mood | ''; g: Gesture | null; t?: number }[] = [
  { label: '(없음)', mood: '', g: null }, { label: '😵 녹초', mood: 'drained', g: null }, { label: '🙂 그럭저럭', mood: 'meh', g: null },
  { label: '🥳 신나', mood: 'hyped', g: null }, { label: '😴 하품', mood: 'sleepy', g: null, t: 0.9 },
  { label: '🥂', mood: '', g: 'cheers' }, { label: '😂', mood: '', g: 'laugh' }, { label: '❤️', mood: '', g: 'heart' },
  { label: '😮', mood: '', g: 'wow' }, { label: '🫥', mood: '', g: 'zone' }, { label: '😌', mood: '', g: 'nod' }, { label: '한숨', mood: '', g: 'sigh' },
];

const canvas = document.getElementById('c') as HTMLCanvasElement;
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setPixelRatio(1);
renderer.setSize(innerWidth, innerHeight, false);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.setScissorTest(true);
const W = innerWidth / COLS.length, H = innerHeight / KINDS.length;
const cam = new THREE.PerspectiveCamera(24, W / H, 0.1, 20);
cam.position.set(0, 1.55, 2.3); cam.lookAt(0, 1.18, 0);

KINDS.forEach((kind, row) => COLS.forEach((c, col) => {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(row % 2 ? '#e9dcc4' : '#f1e6d2');
  scene.add(new THREE.HemisphereLight(0xfff3e0, 0x6b5440, 1.6));
  const sun = new THREE.DirectionalLight(0xffffff, 1.4); sun.position.set(2, 4, 3); scene.add(sun);
  const r = buildAnimal({ kind, color, hat: 'none', hand: 'none', outfit: 'none' });
  scene.add(r.root);
  const e = expressionFor(c.mood, c.g, 0.5, c.t ?? 3, 0.3);
  for (let i = 0; i < 30; i++) r.face.update(0.1, e, 0.32);
  r.root.updateMatrixWorld(true);
  const x = col * W, y = innerHeight - (row + 1) * H;
  renderer.setViewport(x, y, W, H); renderer.setScissor(x, y, W, H);
  renderer.render(scene, cam);
}));
(window as unknown as { done: boolean }).done = true;
