// 🪄 Auto motion for a new picture, worked out in the manager's browser (no server, no AI service).
// Reads a small copy of the picture and paints a motion map in the living-painting viewer's own
// channels: R = flow (smooth sky or water), G = sway (fine texture: leaves, grass, fur),
// B = shimmer (highlights, gold). An optional depth map (from a depth model run in the same
// browser) adds a gentle 3D shift. Nothing found = the picture stays still.
// Served as-is to the manager page (/admin/auto-motion.js), so: plain JS, no imports.

/** How strong each effect is, as the manager picks it. */
export const LEVELS = { off: 0, low: 0.6, mid: 1, high: 1.6 };
/** Smallest share of the picture worth moving. */
export const MIN_AREA = { flow: 0.08, sway: 0.08, shimmer: 0.003 };
/** The long side of the copy that gets read (and of the motion map that gets saved). */
export const READ_SIZE = 160;

const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

/** Mean and spread of values in a (2r+1)² square around each pixel, via summed tables. */
function local(L, w, h, r) {
  const S = new Float64Array((w + 1) * (h + 1)), Q = new Float64Array((w + 1) * (h + 1));
  for (let y = 0; y < h; y++) {
    let rs = 0, rq = 0;
    for (let x = 0; x < w; x++) {
      const v = L[y * w + x]; rs += v; rq += v * v;
      S[(y + 1) * (w + 1) + x + 1] = S[y * (w + 1) + x + 1] + rs;
      Q[(y + 1) * (w + 1) + x + 1] = Q[y * (w + 1) + x + 1] + rq;
    }
  }
  const mean = new Float32Array(w * h), sd = new Float32Array(w * h);
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    const x0 = Math.max(0, x - r), x1 = Math.min(w, x + r + 1), y0 = Math.max(0, y - r), y1 = Math.min(h, y + r + 1);
    const n = (x1 - x0) * (y1 - y0);
    const at = (T) => T[y1 * (w + 1) + x1] - T[y0 * (w + 1) + x1] - T[y1 * (w + 1) + x0] + T[y0 * (w + 1) + x0];
    const m = at(S) / n;
    mean[y * w + x] = m; sd[y * w + x] = Math.sqrt(Math.max(0, at(Q) / n - m * m));
  }
  return { mean, sd };
}

/** Keep only the parts of `cand` that touch one of the given rows (sky reaches the top edge). */
function touching(cand, w, h, rows) {
  const keep = new Uint8Array(w * h), q = [];
  for (const y of rows) for (let x = 0; x < w; x++) { const i = y * w + x; if (cand[i] && !keep[i]) { keep[i] = 1; q.push(i); } }
  while (q.length) {
    const i = q.pop(), x = i % w, y = (i / w) | 0;
    for (const j of [x > 0 ? i - 1 : -1, x < w - 1 ? i + 1 : -1, y > 0 ? i - w : -1, y < h - 1 ? i + w : -1]) if (j >= 0 && cand[j] && !keep[j]) { keep[j] = 1; q.push(j); }
  }
  return keep;
}

/** Soften a 0–1 map so motion fades in and out instead of tearing at an edge. */
function soften(m, w, h, r = 2) {
  let a = m;
  for (let pass = 0; pass < 2; pass++) {
    const b = new Float32Array(w * h), c = new Float32Array(w * h);
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) { let s = 0, n = 0; for (let k = -r; k <= r; k++) { const xx = x + k; if (xx >= 0 && xx < w) { s += a[y * w + xx]; n++; } } b[y * w + x] = s / n; }
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) { let s = 0, n = 0; for (let k = -r; k <= r; k++) { const yy = y + k; if (yy >= 0 && yy < h) { s += b[yy * w + x]; n++; } } c[y * w + x] = s / n; }
    a = c;
  }
  return a;
}

const mean = (m) => { let s = 0; for (const v of m) s += v; return m.length ? s / m.length : 0; };

/** How much a depth map actually varies (2nd to 98th percentile). */
export function depthSpread(depth) {
  if (!depth || !depth.length) return 0;
  const s = Float32Array.from(depth).sort();
  return s[Math.floor(s.length * 0.98)] - s[Math.floor(s.length * 0.02)];
}

/** A raw depth result → 0–1 (near = bright), stretched between its 2nd and 98th percentile. */
export function normalizeDepth(raw) {
  const s = Float32Array.from(raw).sort();
  const lo = s[Math.floor(s.length * 0.02)], hi = s[Math.floor(s.length * 0.98)], span = hi - lo || 1;
  return Float32Array.from(raw, v => clamp((v - lo) / span, 0, 1));
}

/**
 * Read a picture.
 * @param px RGBA pixels (Uint8ClampedArray, w*h*4)
 * @param depth optional 0–1 depth for the same w×h (near = 1)
 * @returns { mask: RGBA Uint8ClampedArray, areas, found: ('flow'|'sway'|'shimmer'|'depth')[], hasDepth, fx }
 */
export function analyze(px, w, h, depth) {
  const n = w * h;
  const L = new Float32Array(n), Hu = new Float32Array(n), Sa = new Float32Array(n), Va = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const r = px[i * 4] / 255, g = px[i * 4 + 1] / 255, b = px[i * 4 + 2] / 255;
    const mx = Math.max(r, g, b), mn = Math.min(r, g, b), d = mx - mn;
    let hue = 0;
    if (d > 1e-6) hue = mx === r ? 60 * (((g - b) / d) % 6) : mx === g ? 60 * ((b - r) / d + 2) : 60 * ((r - g) / d + 4);
    Hu[i] = (hue + 360) % 360; Sa[i] = mx ? d / mx : 0; Va[i] = mx; L[i] = 0.3 * r + 0.59 * g + 0.11 * b;
  }
  const { mean: lm, sd } = local(L, w, h, 2);
  // how busy each spot is: the share of nearby pixels sitting on an edge. Leaves, grass and fur are
  // edges everywhere; a single outline is a thin line, so its neighbourhood stays mostly quiet.
  const edge = new Float32Array(n);
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    const i = y * w + x, gx = L[y * w + Math.min(w - 1, x + 1)] - L[y * w + Math.max(0, x - 1)], gy = L[Math.min(h - 1, y + 1) * w + x] - L[Math.max(0, y - 1) * w + x];
    edge[i] = Math.hypot(gx, gy) > 0.08 ? 1 : 0;
  }
  const busy = local(edge, w, h, 3).mean;
  const skyC = new Float32Array(n), waterC = new Float32Array(n);
  const sway = new Float32Array(n), shim = new Float32Array(n);
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    const i = y * w + x, yy = y / h, H = Hu[i], S = Sa[i], V = Va[i], t = sd[i];
    const blue = H >= 175 && H <= 255 && S > 0.12 && V > 0.35;
    const sunset = (H <= 40 || H > 330) && S > 0.5 && V > 0.6;
    if (yy < 0.62 && t < 0.035 && (blue || sunset)) skyC[i] = 1;
    if (yy > 0.45 && t < 0.07 && H >= 150 && H <= 250 && S > 0.12 && V > 0.08) waterC[i] = 1;   // dark navy water counts too
    if (t > 0.04 && busy[i] > 0.5) sway[i] = H >= 60 && H <= 170 && S > 0.18 ? 1 : 0.55;
    if ((V > 0.8 && L[i] - lm[i] > 0.12) || (H >= 38 && H <= 58 && S > 0.5 && V > 0.6 && t > 0.03)) shim[i] = 1;
  }
  // sky and water are whole areas: fill the small gaps in them (a cloud, a reflection)
  const skyD = local(skyC, w, h, 5).mean, waterD = local(waterC, w, h, 5).mean;
  // a reflection or a leg standing in the water: water on both sides of it, along the row
  const gap = Math.round(w * 0.3);
  for (let y = 0; y < h; y++) {
    let last = -1;
    for (let x = 0; x < w; x++) {
      if (!waterC[y * w + x]) continue;
      if (last >= 0 && x - last > 1 && x - last <= gap) for (let k = last + 1; k < x; k++) waterD[y * w + k] = 1;
      last = x;
    }
  }
  const sky = new Uint8Array(n);
  for (let i = 0; i < n; i++) sky[i] = skyC[i] || skyD[i] > 0.6 ? 1 : 0;
  const skyKept = touching(sky, w, h, [0, 1, 2]);
  // water is a body you could stand in: it reaches the bottom edge
  const wet = new Uint8Array(n);
  for (let i = 0; i < n; i++) wet[i] = waterC[i] || waterD[i] > 0.55 ? 1 : 0;
  const waterKept = touching(wet, w, h, Array.from({ length: Math.max(3, Math.round(h * 0.08)) }, (_, k) => h - 1 - k));
  const flowRaw = new Float32Array(n);
  let waterArea = 0;
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    const i = y * w + x, yy = y / h;
    // water fades in below its top line instead of starting at a hard edge
    const wv = waterKept[i] ? clamp((yy - 0.45) / 0.15, 0, 1) : 0;
    if (wv > 0) waterArea++;
    flowRaw[i] = Math.max(skyKept[i], wv);
  }
  waterArea /= n;
  for (let i = 0; i < n; i++) sway[i] *= 1 - flowRaw[i];
  const areas = { flow: mean(flowRaw), sway: mean(sway), shimmer: mean(shim), water: waterArea };
  const hasDepth = depthSpread(depth) > 0.15;
  const found = ['flow', 'sway', 'shimmer'].filter(k => areas[k] >= MIN_AREA[k]);
  if (hasDepth) found.push('depth');
  const F = soften(flowRaw, w, h), G = soften(sway, w, h), B = soften(shim, w, h, 1);
  const mask = new Uint8ClampedArray(n * 4);
  for (let i = 0; i < n; i++) {
    mask[i * 4] = found.includes('flow') ? F[i] * 255 : 0;
    mask[i * 4 + 1] = found.includes('sway') ? G[i] * 255 : 0;
    mask[i * 4 + 2] = found.includes('shimmer') ? Math.min(1, B[i] * 2) * 255 : 0;
    mask[i * 4 + 3] = 255;
  }
  const levels = Object.fromEntries(['flow', 'sway', 'shimmer', 'depth'].map(k => [k, found.includes(k) ? 'mid' : 'off']));
  return { mask, areas, found, hasDepth, levels, fx: fxFor(areas, levels, hasDepth) };
}

/** Effect strengths for the viewer from what was found and the levels the manager picked. */
export function fxFor(areas, levels, hasDepth) {
  const k = (name) => LEVELS[levels?.[name] ?? 'mid'] ?? 1;
  const fx = {};
  if (k('flow') > 0 && areas.flow >= MIN_AREA.flow) Object.assign(fx, { flow: +(0.0045 * k('flow')).toFixed(5), flowScale: 3, flowSpeed: 0.55, ripple: +(0.006 * k('flow')).toFixed(4), ripMask: 1 });
  if (k('sway') > 0 && areas.sway >= MIN_AREA.sway) Object.assign(fx, { sway: +(0.0032 * k('sway')).toFixed(5), swayFreq: 7, swaySpeed: 1.3, swayTop: 0 });
  if (k('shimmer') > 0 && areas.shimmer >= MIN_AREA.shimmer) fx.shimmer = +(0.22 * k('shimmer')).toFixed(3);
  if (hasDepth && k('depth') > 0) fx.para = +(0.012 * k('depth')).toFixed(4);
  return fx;
}

const SAY = {
  flow: ['하늘과 물이 천천히 흘러요.', '누르면 물결이 퍼져요'],
  sway: ['잎과 결이 바람에 살랑여요.', '바람에 살랑살랑'],
  shimmer: ['빛이 군데군데 반짝여요.', '반짝이는 빛'],
  depth: ['그림 위를 움직이면 앞뒤가 입체로 들썩여요.', '움직여서 입체 보기'],
};
/** "해 보기" and its short hint, from what moves. Empty when nothing does. */
export function howFor(found) {
  const on = ['flow', 'sway', 'shimmer', 'depth'].filter(k => found.includes(k));
  if (!on.length) return { how: '', hint: '' };
  return { how: on.map(k => SAY[k][0]).join(' ') + (on.includes('flow') ? ' 그림을 누르면 물결이 퍼져요.' : ''), hint: SAY[on[0]][1] };
}

/** Was this "해 보기" written by howFor (so a new reading may replace it)? The manager's own words: never. */
export function isAutoHow(how) {
  let rest = String(how ?? '').trim();
  if (!rest) return false;
  for (const line of [' 그림을 누르면 물결이 퍼져요.', ...Object.values(SAY).map(v => v[0])]) rest = rest.split(line.trim()).join('');
  return rest.trim() === '';
}

/** A big picture → a small, smooth copy (halving step by step, so fine detail averages out instead of turning to grain). */
export function shrinkTo(img, max) {
  let c = img, w = img.naturalWidth ?? img.width, h = img.naturalHeight ?? img.height;
  const k = max / Math.max(w, h);
  const tw = Math.max(8, Math.round(w * k)), th = Math.max(8, Math.round(h * k));
  while (w / 2 > tw) {
    const n = document.createElement('canvas'); n.width = Math.round(w / 2); n.height = Math.round(h / 2);
    const g = n.getContext('2d'); g.imageSmoothingQuality = 'high'; g.drawImage(c, 0, 0, n.width, n.height);
    c = n; w = n.width; h = n.height;
  }
  const out = document.createElement('canvas'); out.width = tw; out.height = th;
  const g = out.getContext('2d', { willReadFrequently: true }); g.imageSmoothingQuality = 'high'; g.drawImage(c, 0, 0, tw, th);
  return out;
}
