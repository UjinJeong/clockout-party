import { describe, it, expect } from 'vitest';
import * as THREE from 'three';
import { cameraPose } from '../src/game/camera';

function onScreen(pose: ReturnType<typeof cameraPose>, p: THREE.Vector3, aspect = 16 / 10) {
  const cam = new THREE.PerspectiveCamera(pose.fov, aspect, 0.1, 200);
  cam.position.copy(pose.position); cam.lookAt(pose.lookAt); cam.updateMatrixWorld();
  return p.clone().project(cam);
}

describe('animal-crossing style camera', () => {
  const player = new THREE.Vector3(18, 0, 0);
  const near = cameraPose(player, 0, 1.6);
  const far = cameraPose(player, 1, 1.6);

  it('sits behind the player (toward the open front) and above', () => {
    expect(near.position.z).toBeGreaterThan(player.z + 3);
    expect(near.position.y).toBeGreaterThan(2.5);
    expect(near.position.x).toBeCloseTo(player.x);
  });
  it('looks across the room at a shallow angle, not straight down', () => {
    const dir = near.lookAt.clone().sub(near.position).normalize();
    const pitch = Math.asin(-dir.y) * 180 / Math.PI;
    expect(pitch).toBeGreaterThan(15);
    expect(pitch).toBeLessThan(32);
  });
  it('keeps the player in the lower part of the screen with the room ahead', () => {
    const s = onScreen(near, player.clone().setY(0.8));
    expect(s.y).toBeLessThan(0);      // below the middle
    expect(s.y).toBeGreaterThan(-0.8); // but not cut off
    expect(Math.abs(s.x)).toBeLessThan(0.05);
  });
  it('shows the paintings on the back wall in the near view', () => {
    const painting = new THREE.Vector3(player.x, 2.2, -4.9);
    const s = onScreen(near, painting);
    expect(s.y).toBeLessThan(1);
    expect(s.y).toBeGreaterThan(-1);
  });
  it('the far view is the old overview: higher and further away', () => {
    expect(far.position.distanceTo(player)).toBeGreaterThan(near.position.distanceTo(player) * 1.5);
    expect(far.position.y).toBeGreaterThan(near.position.y);
  });
  it('tilts up a little when you stand close to a painting', () => {
    const atWall = cameraPose(new THREE.Vector3(18, 0, -3.3), 0, 1.6);
    expect(atWall.lookAt.y).toBeGreaterThan(near.lookAt.y);
  });
});

describe('on a tall phone screen', () => {
  const aspect = 390 / 844;
  const p = cameraPose(new THREE.Vector3(18, 0, 0), 0, aspect);
  it('fills the screen with the room instead of sky', () => {
    const wallTop = onScreen(p, new THREE.Vector3(18, 4.2, -5), aspect).y;
    expect(wallTop).toBeGreaterThan(0.65);
    expect(wallTop).toBeLessThan(0.95);
  });
  it('keeps the player above the on-screen controls', () => {
    const y = onScreen(p, new THREE.Vector3(18, 0.8, 0), aspect).y;
    expect(y).toBeGreaterThan(-0.45);
    expect(y).toBeLessThan(0.1);
  });
});
