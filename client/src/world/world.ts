import * as THREE from 'three';
import { mapFor, type Theme, type WorldMap } from '@party/shared';
import type { Painting } from './gallery';
import type { SkyState } from './sky';
import { buildGallery } from './gallery';
import { buildHome } from './home';
import { buildPool } from './pool';

/**
 * One party place drawn in 3D. Each theme builds its own, from the same map
 * the server walks people around on.
 */
export interface World {
  map: WorldMap;
  /** Paintings you can walk up to and open (only the gallery has them). */
  paintings: Painting[];
  /** What a tap on the ground hits. */
  floor: THREE.Object3D;
  setTime(date: Date): SkyState;
  /** Animate lights, water, flames… */
  tick(dt: number): void;
  /** Fade anything that would block the view from right behind the camera. */
  fadeOccluders(camera: THREE.Vector3): void;
  /** Load the heavier images once the first frame is up. */
  loadArt(onProgress?: (done: number, total: number) => void): Promise<void>;
  /** Where everyone is standing right now: things in the world can react (pool toys get shoved). */
  nudge?(guests: { x: number; z: number }[]): void;
  /** Fireworks for everyone (pool party): `seed` makes every screen show the same volley. */
  celebrate?(seed: number): void;
  /** 0–1: something worth looking up at (fireworks) — the close camera tilts up a little. */
  lookUp?(): number;
  /** Take everything off the scene and free it. */
  dispose(): void;
}

export type WorldParts = Omit<World, 'dispose' | 'map'>;

export function buildWorld(theme: Theme, scene: THREE.Scene, renderer: THREE.WebGLRenderer): World {
  const before = new Set(scene.children);
  const parts = theme === 'home' ? buildHome(scene, renderer) : theme === 'pool' ? buildPool(scene, renderer) : buildGallery(scene, renderer);
  // Whatever the builder put on the scene belongs to this world.
  const added = scene.children.filter(c => !before.has(c));
  return {
    ...parts,
    map: mapFor(theme),
    dispose() {
      for (const o of added) { o.removeFromParent(); freeDeep(o); }
      if (scene.background instanceof THREE.Texture) scene.background.dispose();
      scene.background = null;
      scene.fog = null;
    },
  };
}

function freeDeep(root: THREE.Object3D) {
  root.traverse(o => {
    const m = o as THREE.Mesh;
    m.geometry?.dispose?.();
    const mats = Array.isArray(m.material) ? m.material : m.material ? [m.material] : [];
    for (const mat of mats) {
      for (const v of Object.values(mat)) if (v instanceof THREE.Texture) v.dispose();
      mat.dispose();
    }
  });
}
