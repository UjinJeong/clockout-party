/**
 * Developer-only viewer (served by `npm run dev` at /debug.html, never built):
 * renders one place from a given spot with the game camera, for checking walls,
 * doorways and what shows behind them.
 *   /debug.html?theme=home&x=12&z=0&zoom=0&hour=21
 */
import * as THREE from 'three';
import { isTheme, toWorld } from '@party/shared';
import { buildWorld } from './world/world';
import { cameraPose } from './game/camera';
import { buildAnimal } from './avatar/animal';

const q = new URLSearchParams(location.search);
const theme = isTheme(q.get('theme')) ? q.get('theme') as 'gallery' : 'gallery';
const x = Number(q.get('x') ?? 6), z = Number(q.get('z') ?? 1.5), zoom = Number(q.get('zoom') ?? 0);
const hour = Number(q.get('hour') ?? 14);

const canvas = document.getElementById('c') as HTMLCanvasElement;
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(innerWidth, innerHeight, false);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.05;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(40, innerWidth / innerHeight, 0.1, 160);
const world = buildWorld(theme, scene, renderer);
const d = new Date(); d.setHours(hour, 10, 0, 0);
world.setTime(d);
const me = buildAnimal({ kind: 'bear', color: 0, hat: 'none', hand: 'wine', outfit: 'none' });
// x, z are walking-map coordinates: upstairs in the house is drawn higher up
const w = toWorld(world.map, { x, z });
me.root.position.set(w.x, w.y, w.z);
me.root.rotation.y = Math.PI;
scene.add(me.root);
const pose = cameraPose(new THREE.Vector3(w.x, w.y, w.z), zoom, innerWidth / innerHeight);
camera.fov = pose.fov; camera.updateProjectionMatrix();
camera.position.copy(pose.position); camera.lookAt(pose.lookAt);
world.fadeOccluders(camera.position);
let last = performance.now();
renderer.setAnimationLoop(t => {
  world.tick(Math.min(0.1, (t - last) / 1000)); last = t;
  for (let i = 0; i < 10; i++) world.fadeOccluders(camera.position);
  renderer.render(scene, camera);
  (window as unknown as { ready: boolean }).ready = true;
});
