/**
 * Input from three places, merged into one "where do I want to go" answer:
 *  - arrow keys / WASD (desktop)
 *  - an on-screen joystick (touch screens)
 *  - clicking or tapping the floor to walk there (everyone)
 */
export class Controls {
  private keys = new Set<string>();
  private joy = { x: 0, z: 0, active: false };
  target: { x: number; z: number } | null = null;
  enabled = true;

  constructor(private joystickEl: HTMLElement) {
    addEventListener('keydown', e => {
      if (isTyping(e)) return;
      const k = norm(e.key);
      if (k) { this.keys.add(k); this.target = null; e.preventDefault(); }
    });
    addEventListener('keyup', e => { const k = norm(e.key); if (k) this.keys.delete(k); });
    addEventListener('blur', () => this.keys.clear());
    this.setupJoystick();
  }

  /** Direction on the floor this frame (x right, z toward the camera), length 0..1. */
  direction(): { x: number; z: number } {
    if (!this.enabled) return { x: 0, z: 0 };
    let x = 0, z = 0;
    if (this.keys.has('left')) x -= 1;
    if (this.keys.has('right')) x += 1;
    if (this.keys.has('up')) z -= 1;
    if (this.keys.has('down')) z += 1;
    if (this.joy.active) { x = this.joy.x; z = this.joy.z; }
    const l = Math.hypot(x, z);
    if (l > 1) { x /= l; z /= l; }
    return { x, z };
  }

  private setupJoystick() {
    const el = this.joystickEl, knob = el.querySelector<HTMLElement>('.knob')!;
    let id: number | null = null;
    const R = 46;
    const set = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      let dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2);
      const l = Math.hypot(dx, dy);
      if (l > R) { dx = dx / l * R; dy = dy / l * R; }
      knob.style.transform = `translate(${dx}px, ${dy}px)`;
      const m = Math.hypot(dx, dy) / R;
      this.joy = { x: m < 0.15 ? 0 : dx / R, z: m < 0.15 ? 0 : dy / R, active: true };
    };
    el.addEventListener('pointerdown', e => { id = e.pointerId; el.setPointerCapture(id); this.target = null; set(e); el.classList.add('on'); });
    el.addEventListener('pointermove', e => { if (e.pointerId === id) set(e); });
    const end = (e: PointerEvent) => {
      if (e.pointerId !== id) return;
      id = null; this.joy = { x: 0, z: 0, active: false };
      knob.style.transform = ''; el.classList.remove('on');
    };
    el.addEventListener('pointerup', end);
    el.addEventListener('pointercancel', end);
  }
}

function norm(k: string): 'up' | 'down' | 'left' | 'right' | null {
  switch (k) {
    case 'ArrowUp': case 'w': case 'W': return 'up';
    case 'ArrowDown': case 's': case 'S': return 'down';
    case 'ArrowLeft': case 'a': case 'A': return 'left';
    case 'ArrowRight': case 'd': case 'D': return 'right';
    default: return null;
  }
}

export function isTyping(e: Event) {
  const t = e.target as HTMLElement | null;
  return !!t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable);
}
