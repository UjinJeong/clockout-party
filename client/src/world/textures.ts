import * as THREE from 'three';

/** Small canvas-drawn textures, so the gallery needs no image downloads except the paintings. */

const rnd = (a: number, b: number) => a + Math.random() * (b - a);

export function canvasTexture(w: number, h: number, draw: (x: CanvasRenderingContext2D, w: number, h: number) => void, repeat?: [number, number]) {
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  draw(c.getContext('2d')!, w, h);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  if (repeat) { t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(repeat[0], repeat[1]); }
  return t;
}

function grain(x: CanvasRenderingContext2D, w: number, h: number, a: number) {
  const d = x.getImageData(0, 0, w, h), p = d.data;
  for (let i = 0; i < p.length; i += 4) { const n = (Math.random() - 0.5) * a; p[i] += n; p[i + 1] += n; p[i + 2] += n; }
  x.putImageData(d, 0, 0);
}

function shade(hex: string, k: number) {
  const c = new THREE.Color(hex).multiplyScalar(k);
  return '#' + c.getHexString();
}

/** Herringbone-ish parquet, like the exhibition floor. One tile = 2m. */
export function parquet() {
  return canvasTexture(512, 512, (x, w, h) => {
    const L = 128, W = 24;
    for (let r = 0; r < h / W; r++) for (let c = -1; c < w / L + 1; c++) {
      const ox = c * L + (r % 2 ? L / 2 : 0), oy = r * W;
      const base = [[96, 62, 38], [108, 70, 42], [88, 56, 33], [114, 76, 46], [100, 65, 40]][(Math.random() * 5) | 0];
      x.fillStyle = `rgb(${base})`; x.fillRect(ox, oy, L, W);
      x.strokeStyle = 'rgba(40,24,12,.22)';
      for (let k = 0; k < 4; k++) {
        x.lineWidth = Math.random() + 0.4; x.beginPath();
        const yy = oy + Math.random() * W;
        x.moveTo(ox, yy); x.bezierCurveTo(ox + L * 0.3, yy + rnd(-3, 3), ox + L * 0.7, yy + rnd(-3, 3), ox + L, yy + rnd(-2, 2)); x.stroke();
      }
      x.fillStyle = 'rgba(25,14,6,.7)'; x.fillRect(ox, oy, L, 1.5); x.fillRect(ox, oy, 1.5, W);
    }
    grain(x, w, h, 12);
  }, [1, 1]);
}

/** Damask-like wall fabric in a room colour. */
export function fabric(col: string) {
  return canvasTexture(256, 256, (x, w, h) => {
    x.fillStyle = col; x.fillRect(0, 0, w, h);
    const motif = (cx: number, cy: number, s: number) => {
      x.save(); x.translate(cx, cy); x.scale(s, s); x.beginPath();
      x.moveTo(0, -55); x.bezierCurveTo(30, -40, 35, -10, 15, 5); x.bezierCurveTo(35, 15, 30, 45, 0, 55);
      x.bezierCurveTo(-30, 45, -35, 15, -15, 5); x.bezierCurveTo(-35, -10, -30, -40, 0, -55); x.restore();
    };
    x.globalAlpha = 0.08; x.fillStyle = shade(col, 1.6);
    for (const [a, b] of [[64, 64], [192, 192], [192, -64], [64, 320], [-64, 192], [320, 64]]) { motif(a, b, 1); x.fill(); }
    x.globalAlpha = 0.04; x.fillStyle = '#000';
    for (let i = 0; i < w; i += 3) x.fillRect(i, 0, 1, h);
    x.globalAlpha = 1; grain(x, w, h, 8);
  }, [1, 1]);
}

export function runner() {
  return canvasTexture(512, 128, (x, w, h) => {
    x.fillStyle = '#5c1c22'; x.fillRect(0, 0, w, h);
    x.strokeStyle = '#b8893f'; x.lineWidth = 6; x.strokeRect(10, 10, w - 20, h - 20);
    x.lineWidth = 2; x.strokeRect(22, 22, w - 44, h - 44);
    x.globalAlpha = 0.22; x.fillStyle = '#d9a85a';
    for (let i = 0; i < 6; i++) { x.beginPath(); x.ellipse(52 + i * 82, h / 2, 12, 22, 0, 0, 7); x.fill(); }
    x.globalAlpha = 1; grain(x, w, h, 14);
  });
}

/** Text drawn onto a canvas: the lobby title wall and the little caption plates. */
export function textPlate(lines: { text: string; font: string; color: string; y: number }[], w: number, h: number, bg?: string) {
  return canvasTexture(w, h, (x) => {
    if (bg) { x.fillStyle = bg; x.fillRect(0, 0, w, h); }
    x.textAlign = 'center'; x.textBaseline = 'middle';
    for (const l of lines) { x.font = l.font; x.fillStyle = l.color; x.fillText(l.text, w / 2, l.y); }
  });
}

/** A soft round shadow that sits under each avatar (much cheaper than shadow maps). */
let blob: THREE.Texture | null = null;
export function blobShadow() {
  if (blob) return blob;
  blob = canvasTexture(64, 64, (x, w, h) => {
    const g = x.createRadialGradient(w / 2, h / 2, 2, w / 2, h / 2, w / 2);
    g.addColorStop(0, 'rgba(0,0,0,.55)'); g.addColorStop(1, 'rgba(0,0,0,0)');
    x.fillStyle = g; x.fillRect(0, 0, w, h);
  });
  return blob;
}
