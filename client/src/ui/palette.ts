/**
 * The colour palette on the invitation card: a square (left→right: pale→vivid,
 * top→bottom: bright→dark) and a rainbow bar for the hue. Works with a mouse
 * or a finger. Brightness bottoms out at 20% so nobody ends up a black blob
 * with invisible eyes (the server lifts near-black too, see shared customColor).
 */
const V_MIN = 0.2;

export function hsvToHex(h: number, s: number, v: number): string {
  const f = (n: number) => {
    const k = (n + h / 60) % 6;
    return v - v * s * Math.max(0, Math.min(k, 4 - k, 1));
  };
  return '#' + [f(5), f(3), f(1)].map(x => Math.round(x * 255).toString(16).padStart(2, '0')).join('');
}

export function hexToHsv(hex: string): { h: number; s: number; v: number } {
  const [r, g, b] = [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16) / 255);
  const max = Math.max(r, g, b), d = max - Math.min(r, g, b);
  let h = 0;
  if (d) h = max === r ? ((g - b) / d) % 6 : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
  return { h: (h * 60 + 360) % 360, s: max ? d / max : 0, v: max };
}

const clamp01 = (x: number) => Math.min(1, Math.max(0, x));

export class Palette {
  private h = 0; private s = 1; private v = 1;
  private sv: HTMLElement; private dot: HTMLElement;
  private hue: HTMLElement; private knob: HTMLElement;
  private chip: HTMLElement; private code: HTMLElement;
  private offs: (() => void)[] = [];

  constructor(private host: HTMLElement, hex: string, private onPick: (hex: string) => void) {
    host.innerHTML = '<div class="pal-sv" role="slider" aria-label="연하게↔진하게, 밝게↔어둡게"><i class="pal-dot"></i></div>'
      + '<div class="pal-hue" role="slider" aria-label="색깔"><i class="pal-knob"></i></div>'
      + '<p class="pal-hex"><span class="pal-chip"></span><code></code></p>';
    const q = (sel: string) => host.querySelector(sel) as HTMLElement;
    this.sv = q('.pal-sv'); this.dot = q('.pal-dot');
    this.hue = q('.pal-hue'); this.knob = q('.pal-knob');
    this.chip = q('.pal-chip'); this.code = q('.pal-hex code');
    this.drag(this.sv, (x, y) => this.pickSV(x, y));
    this.drag(this.hue, x => this.pickHue(x));
    this.set(hex);
  }

  /** Start from this colour (without reporting it back). */
  set(hex: string) {
    const c = hexToHsv(hex);
    if (c.s > 0.01 && c.v > 0.01) this.h = c.h; // greys keep whatever hue the bar was on
    this.s = c.s; this.v = Math.max(V_MIN, c.v);
    this.paint();
  }

  /** x: 0 pale → 1 vivid; y: 0 bright → 1 dark. */
  pickSV(x: number, y: number) {
    this.s = clamp01(x);
    this.v = 1 - clamp01(y) * (1 - V_MIN);
    this.changed();
  }

  /** x: 0 → 1 along the rainbow. */
  pickHue(x: number) {
    this.h = clamp01(x) * 360;
    this.changed();
  }

  get hex() { return hsvToHex(this.h, this.s, this.v); }

  dispose() { this.offs.forEach(f => f()); this.offs = []; }

  private changed() { this.paint(); this.onPick(this.hex); }

  private paint() {
    this.sv.style.setProperty('--hue', `hsl(${this.h.toFixed(0)} 100% 50%)`);
    this.dot.style.left = `${this.s * 100}%`;
    this.dot.style.top = `${(1 - this.v) / (1 - V_MIN) * 100}%`;
    this.knob.style.left = `${this.h / 360 * 100}%`;
    this.knob.style.setProperty('--c', `hsl(${this.h.toFixed(0)} 100% 50%)`);
    this.chip.style.setProperty('--c', this.hex);
    this.code.textContent = this.hex;
  }

  /** Press and drag anywhere on the element; reports the position as 0..1 fractions. */
  private drag(el: HTMLElement, to: (x: number, y: number) => void) {
    const at = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      to((e.clientX - r.left) / r.width, (e.clientY - r.top) / r.height);
    };
    const down = (e: PointerEvent) => {
      e.preventDefault();
      el.setPointerCapture?.(e.pointerId);
      at(e);
      const move = (m: PointerEvent) => at(m);
      const up = () => { el.removeEventListener('pointermove', move); el.removeEventListener('pointerup', up); el.removeEventListener('pointercancel', up); };
      el.addEventListener('pointermove', move);
      el.addEventListener('pointerup', up);
      el.addEventListener('pointercancel', up);
    };
    el.addEventListener('pointerdown', down);
    this.offs.push(() => el.removeEventListener('pointerdown', down));
  }
}
