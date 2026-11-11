import * as THREE from 'three';
import type { RoomId } from '@party/shared';
import { artMotion, onArtMotion } from '../ui/artMotion';

/**
 * The paintings on the gallery walls breathe a little, each room in its own way:
 *   정원관 garden — wind: the top of the picture sways more than the bottom
 *   얼굴관 face   — breath: the whole picture slowly swells and settles
 *   장난감관 toy  — glint: a soft band of light slides across, like on glass
 *   연못관 pond   — water: ripples along the lower part
 *
 * It is done in the painting's own shader (no extra textures or meshes), and is
 * kept subtle — something you notice after a moment rather than straight away.
 * `warpUv` below is the same math as the GLSL, so tests can check it never
 * reaches past the painting's edge.
 */
export interface Motion { sway: number; breath: number; ripple: number; sheen: number }

/** The picture is shown slightly inset, so moving it never pulls in pixels from outside. */
export const MARGIN = 0.012;

export const MOTION: Record<RoomId, Motion> = {
  lobby: { sway: 0, breath: 0, ripple: 0, sheen: 0.02 },
  garden: { sway: 0.007, breath: 0, ripple: 0, sheen: 0.02 },
  face: { sway: 0, breath: 0.016, ripple: 0, sheen: 0.02 },
  toy: { sway: 0, breath: 0.006, ripple: 0, sheen: 0.09 },
  pond: { sway: 0.002, breath: 0, ripple: 0.0045, sheen: 0.03 },
};

const smoothstep = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

/** Where the painting is sampled for canvas point (u, v) at time t. Mirrors `livingWarp` in GLSL. */
export function warpUv(m: Motion, u: number, v: number, t: number, phase: number, strength = 1): [number, number] {
  let x = MARGIN + u * (1 - 2 * MARGIN);
  let y = MARGIN + v * (1 - 2 * MARGIN);
  const s = 1 - m.breath * strength * (0.5 + 0.5 * Math.sin(t * 1.25 + phase));
  x = 0.5 + (x - 0.5) * s;
  y = 0.5 + (y - 0.5) * s;
  x += m.sway * strength * y * y * Math.sin(t * 1.3 + phase + y * 5);
  const w = 1 - smoothstep(0.25, 0.6, y);
  const dx = m.ripple * strength * w * Math.sin(y * 38 + t * 1.6 + phase);
  const dy = m.ripple * strength * w * Math.cos(x * 30 + t * 1.2 + phase);
  return [x + dx, y + dy];
}

const GLSL = /* glsl */ `
uniform float uLT;
uniform float uLPhase;
uniform float uLStrength;
uniform vec4 uLMotion; // sway, breath, ripple, sheen
vec2 livingWarp(vec2 uv) {
  float t = uLT, ph = uLPhase, k = uLStrength;
  uv = ${MARGIN.toFixed(4)} + uv * (1.0 - 2.0 * ${MARGIN.toFixed(4)});
  float s = 1.0 - uLMotion.y * k * (0.5 + 0.5 * sin(t * 1.25 + ph));
  uv = 0.5 + (uv - 0.5) * s;
  uv.x += uLMotion.x * k * uv.y * uv.y * sin(t * 1.3 + ph + uv.y * 5.0);
  float w = 1.0 - smoothstep(0.25, 0.6, uv.y);
  uv += uLMotion.z * k * w * vec2(sin(uv.y * 38.0 + t * 1.6 + ph), cos(uv.x * 30.0 + t * 1.2 + ph));
  return uv;
}
`;

const MAP_CHUNK = /* glsl */ `
#ifdef USE_MAP
  vec4 sampledDiffuseColor = texture2D(map, livingWarp(vMapUv));
  diffuseColor *= sampledDiffuseColor;
  // a soft band of light drifting across now and then, and the lamp's faint flicker
  float lband = (vMapUv.x + vMapUv.y * 0.6) - (fract(uLT / 16.0 + uLPhase * 0.1) * 2.4 - 0.4);
  diffuseColor.rgb += uLMotion.w * uLStrength * exp(-lband * lband * 60.0);
  diffuseColor.rgb *= 1.0 + 0.012 * uLStrength * sin(uLT * 0.8 + uLPhase);
#endif
`;

const clock = { value: 0 };
/** 1 = breathing, 0 = exactly as painted. Eases toward `goal` so switching is a soft settle, not a jump. */
const strength = { value: artMotion() === 'live' ? 1 : 0 };
let goal = strength.value;
onArtMotion(m => { goal = m === 'live' ? 1 : 0; });

/** A painting canvas material for `room`; `seed` keeps neighbouring paintings out of step. */
export function livingCanvas(room: RoomId, seed: number): THREE.MeshBasicMaterial {
  const mat = new THREE.MeshBasicMaterial({ color: 0x3a3430 });
  const m = MOTION[room];
  const uniforms = {
    uLT: clock,
    uLStrength: strength,
    uLPhase: { value: (seed * 2.399) % (Math.PI * 2) }, // golden-angle spread
    uLMotion: { value: new THREE.Vector4(m.sway, m.breath, m.ripple, m.sheen) },
  };
  mat.onBeforeCompile = shader => {
    Object.assign(shader.uniforms, uniforms);
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>', `#include <common>\n${GLSL}`)
      .replace('#include <map_fragment>', MAP_CHUNK);
  };
  mat.customProgramCacheKey = () => 'living-wall-1';
  return mat;
}

/** Advance the paintings' shared clock. */
export function tickLivingWall(dt: number) {
  clock.value += dt;
  strength.value += (goal - strength.value) * Math.min(1, dt * 4);
}

/** How much the wall paintings move right now (0–1). */
export const wallStrength = () => strength.value;
