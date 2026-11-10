import * as THREE from 'three';

/**
 * The sky outside follows the clock of whoever is looking, so a visitor in
 * Seoul sees night while a friend in New York sees morning in the same room.
 */
export type Phase = '새벽' | '아침' | '낮' | '노을' | '밤';

interface Key { h: number; top: string; bottom: string; sun: string; sunI: number; hemi: number; stars: number }

// Hours in local time; colours blend between neighbouring keys.
const KEYS: Key[] = [
  { h: 0, top: '#0b1026', bottom: '#2a2340', sun: '#7f8fd6', sunI: 0.25, hemi: 0.55, stars: 1 },
  { h: 5, top: '#141a3a', bottom: '#4a3550', sun: '#9a8fd0', sunI: 0.3, hemi: 0.6, stars: 0.8 },
  { h: 6.3, top: '#3c5a8c', bottom: '#f0a878', sun: '#ffc596', sunI: 0.9, hemi: 0.85, stars: 0.1 },
  { h: 8, top: '#6fa6d8', bottom: '#d9ecf5', sun: '#fff1dc', sunI: 1.3, hemi: 1.05, stars: 0 },
  { h: 16, top: '#5f9ad3', bottom: '#cfe6f2', sun: '#fff0d6', sunI: 1.3, hemi: 1.05, stars: 0 },
  { h: 18.2, top: '#40528f', bottom: '#f39a6b', sun: '#ffab73', sunI: 0.95, hemi: 0.85, stars: 0.15 },
  { h: 19.6, top: '#1a2050', bottom: '#5b3a5e', sun: '#a28bd8', sunI: 0.45, hemi: 0.65, stars: 0.7 },
  { h: 24, top: '#0b1026', bottom: '#2a2340', sun: '#7f8fd6', sunI: 0.25, hemi: 0.55, stars: 1 },
];

export interface SkyState {
  top: THREE.Color; bottom: THREE.Color; sun: THREE.Color; sunI: number; hemi: number; stars: number;
  hour: number; phase: Phase; night: number;
}

export function skyAt(date: Date): SkyState {
  const hour = date.getHours() + date.getMinutes() / 60;
  let i = 0;
  while (i < KEYS.length - 2 && hour >= KEYS[i + 1].h) i++;
  const a = KEYS[i], b = KEYS[i + 1];
  const t = (hour - a.h) / (b.h - a.h);
  const mix = (p: string, q: string) => new THREE.Color(p).lerp(new THREE.Color(q), t);
  const sunI = a.sunI + (b.sunI - a.sunI) * t;
  return {
    top: mix(a.top, b.top), bottom: mix(a.bottom, b.bottom), sun: mix(a.sun, b.sun),
    sunI, hemi: a.hemi + (b.hemi - a.hemi) * t, stars: a.stars + (b.stars - a.stars) * t,
    hour, phase: phaseOf(hour), night: Math.max(0, Math.min(1, (1.3 - sunI) / 1.05)),
  };
}

export function phaseOf(hour: number): Phase {
  if (hour < 5) return '밤';
  if (hour < 7) return '새벽';
  if (hour < 11) return '아침';
  if (hour < 17.5) return '낮';
  if (hour < 19.5) return '노을';
  return '밤';
}

export const PHASE_ICON: Record<Phase, string> = { 새벽: '🌅', 아침: '🌤️', 낮: '☀️', 노을: '🌇', 밤: '🌙' };

/** Paints the sky into a canvas used both as the scene background and the lobby window. */
export class SkyPainter {
  readonly canvas = document.createElement('canvas');
  readonly texture: THREE.CanvasTexture;
  private stars: { x: number; y: number; r: number }[] = [];

  constructor() {
    this.canvas.width = 64; this.canvas.height = 256;
    this.texture = new THREE.CanvasTexture(this.canvas);
    this.texture.colorSpace = THREE.SRGBColorSpace;
    for (let i = 0; i < 40; i++) this.stars.push({ x: Math.random() * 64, y: Math.random() * 150, r: Math.random() < 0.15 ? 1.2 : 0.6 });
  }

  paint(s: SkyState) {
    const x = this.canvas.getContext('2d')!, w = this.canvas.width, h = this.canvas.height;
    const g = x.createLinearGradient(0, 0, 0, h);
    g.addColorStop(0, '#' + s.top.getHexString());
    g.addColorStop(1, '#' + s.bottom.getHexString());
    x.fillStyle = g; x.fillRect(0, 0, w, h);
    if (s.stars > 0.02) {
      x.fillStyle = `rgba(255,248,230,${0.85 * s.stars})`;
      for (const st of this.stars) { x.beginPath(); x.arc(st.x, st.y, st.r, 0, 7); x.fill(); }
    }
    this.texture.needsUpdate = true;
  }
}
