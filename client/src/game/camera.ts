import * as THREE from 'three';

/**
 * Where the camera sits for a given player position.
 *
 * zoom 0 = "동물의 숲" view: close behind the player, always facing the back
 *          wall, looking across the room at a shallow angle so the paintings
 *          read almost head-on and the player stands in the lower third.
 * zoom 1 = the overview: high up, looking down over the whole room.
 * Anything in between blends the two (mouse wheel / pinch).
 */
export interface CameraPose { position: THREE.Vector3; lookAt: THREE.Vector3; fov: number }

const NEAR = { offset: new THREE.Vector3(0, 3.9, 6.8), ahead: 2.2, lookY: 1.15, fov: 45 };
const FAR = { offset: new THREE.Vector3(0, 9.4, 11), ahead: 0.6, lookY: 0.6, fov: 40 };
/** Tall phone screens: a little higher and steeper, so the room fills the screen instead of the sky. */
const NEAR_PORTRAIT = { offset: new THREE.Vector3(0, 6.2, 7.6), ahead: 1.4, lookY: 0.55, fov: 56 };

export function cameraPose(target: THREE.Vector3, zoom: number, aspect: number): CameraPose {
  const z = Math.min(1, Math.max(0, zoom));
  const ease = z * z * (3 - 2 * z);
  const portrait = aspect < 1;
  const near = portrait ? NEAR_PORTRAIT : NEAR;
  // Portrait phones see much less width: pull back a little more in the overview.
  const offset = near.offset.clone().lerp(FAR.offset.clone().multiplyScalar(portrait ? 1.2 : 1), ease);
  let fov = near.fov + (FAR.fov - near.fov) * ease;
  if (portrait) fov = Math.min(68, Math.max(fov, 40 + (1 - aspect) * 40 * ease));

  // Standing close to the back wall? Tilt up a little toward the paintings.
  const nearWall = Math.min(1, Math.max(0, (-target.z - 1) / 2.5));
  const lookY = near.lookY + (FAR.lookY - near.lookY) * ease + (portrait ? 0.35 : 0.6) * nearWall * (1 - ease);
  const ahead = near.ahead + (FAR.ahead - near.ahead) * ease;

  return {
    position: target.clone().add(offset),
    lookAt: new THREE.Vector3(target.x, lookY, target.z - ahead),
    fov,
  };
}
