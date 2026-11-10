import { EMOTE_ICON, type Battery, type Emote } from '@party/shared';

/**
 * The little gallery-label name tag that floats above each guest, plus the
 * speech bubbles, voice bubbles and floating emoji stacked above it.
 */
export class Tag {
  readonly el = document.createElement('div');
  private stack = document.createElement('div');
  private plate = document.createElement('div');
  private nameEl = document.createElement('b');
  private batEl = document.createElement('span');
  private moodEl = document.createElement('span');

  constructor(layer: HTMLElement, name: string, isSelf: boolean) {
    this.el.className = 'tag' + (isSelf ? ' self' : '');
    this.stack.className = 'stack';
    this.plate.className = 'plate';
    this.batEl.className = 'bat';
    this.moodEl.className = 'mood';
    this.nameEl.textContent = name;
    this.plate.append(this.batEl, this.nameEl, this.moodEl);
    this.el.append(this.stack, this.plate);
    layer.append(this.el);
  }

  setName(n: string) { if (this.nameEl.textContent !== n) this.nameEl.textContent = n; }

  setBattery(b: Battery) {
    const icon = b === 'low' ? '🪫' : '🔋';
    if (this.batEl.textContent !== icon) {
      this.batEl.textContent = icon;
      this.batEl.title = b === 'low' ? '방전 · 구경만 할래요' : '충전 중 · 말 걸어도 돼요';
      this.el.classList.toggle('low', b === 'low');
    }
  }

  /** How their day went, as a little face after the name. */
  setMood(icon: string, label: string) {
    if (this.moodEl.textContent === icon) return;
    this.moodEl.textContent = icon;
    this.moodEl.title = label;
    this.moodEl.hidden = !icon;
  }

  setNear(near: boolean) { this.el.classList.toggle('near', near); }

  place(x: number, y: number, visible: boolean, depth: number) {
    this.el.style.display = visible ? '' : 'none';
    if (!visible) return;
    this.el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
    this.el.style.zIndex = String(1000 - Math.round(depth * 10));
  }

  /** Size of the bubble stack on screen, or null when nobody is talking. */
  stackBox(): { w: number; h: number } | null {
    if (!this.stack.childElementCount) { if (this.lifted) { this.lifted = 0; this.stack.style.bottom = ''; } return null; }
    return { w: this.stack.offsetWidth, h: this.stack.offsetHeight };
  }

  private lifted = 0;
  lift(px: number) {
    const v = Math.round(px);
    if (v === this.lifted) return;
    this.lifted = v;
    this.stack.style.bottom = `${26 + v}px`;
  }

  say(text: string) {
    const b = document.createElement('div');
    b.className = 'bubble say';
    b.textContent = text;
    this.push(b, 6500);
  }

  voice(blob: Blob, ms: number, isSelf: boolean) {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'bubble voice';
    const secs = Math.max(1, Math.round(ms / 1000));
    b.innerHTML = `<span class="play" aria-hidden="true">▶</span><span class="wave" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></span><span class="len">${secs}초</span>`;
    b.setAttribute('aria-label', `음성 메시지 ${secs}초 듣기`);
    const url = URL.createObjectURL(blob);
    const audio = new Audio(url);
    audio.preload = 'auto';
    b.addEventListener('click', e => {
      e.stopPropagation();
      if (!audio.paused) { audio.pause(); audio.currentTime = 0; return; }
      void audio.play().catch(() => b.classList.add('err'));
    });
    audio.addEventListener('play', () => { b.classList.add('playing'); b.querySelector('.play')!.textContent = '■'; });
    const stop = () => { b.classList.remove('playing'); b.querySelector('.play')!.textContent = '▶'; };
    audio.addEventListener('pause', stop);
    audio.addEventListener('ended', stop);
    if (isSelf) b.classList.add('mine');
    this.push(b, 20000, () => { audio.pause(); URL.revokeObjectURL(url); });
  }

  emote(kind: Emote) {
    const f = document.createElement('span');
    f.className = 'float';
    f.textContent = EMOTE_ICON[kind];
    f.style.setProperty('--dx', `${(Math.random() - 0.5) * 30}px`);
    this.el.append(f);
    setTimeout(() => f.remove(), 1800);
  }

  private push(el: HTMLElement, life: number, onGone?: () => void) {
    this.stack.append(el);
    while (this.stack.children.length > 3) {
      const first = this.stack.firstElementChild as HTMLElement & { _gone?: () => void };
      first._gone?.(); first.remove();
    }
    (el as HTMLElement & { _gone?: () => void })._gone = onGone;
    setTimeout(() => {
      el.classList.add('out');
      setTimeout(() => { if (el.isConnected) { onGone?.(); el.remove(); } }, 400);
    }, life);
  }

  dispose() { this.el.remove(); }
}
