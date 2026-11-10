/**
 * The docent's question chips. Answers are written ahead of time (answers.ts),
 * so nothing is sent to Claude and nobody's usage is spent — but they are shown
 * the way a live AI reply is: a short "looking at the painting" pause, then the
 * words arriving a few characters at a time.
 */

export const QUESTIONS = [
  '먼저 어디를 보면 좋을까요?',
  '색은 어떻게 쓰였나요?',
  '아이에게 설명해 주세요',
  '이 그림이 움직인다면?',
] as const;

export interface TypingStep { chunk: string; wait: number }

/** Small deterministic noise so the rhythm feels human but never changes between visits. */
function jitter(seed: number) {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

/** Split an answer into 1–3 character pieces with a pause after each. */
export function typingSteps(text: string): TypingStep[] {
  const chars = Array.from(text);
  const steps: TypingStep[] = [];
  let i = 0;
  while (i < chars.length) {
    const r = jitter(i + chars.length);
    let n = r < 0.35 ? 1 : r < 0.8 ? 2 : 3;
    // end a piece right after punctuation so the pause lands in the right place
    const piece: string[] = [];
    while (n-- > 0 && i < chars.length) {
      const c = chars[i++];
      piece.push(c);
      if (/[.?!,。…]/.test(c)) break;
    }
    const last = piece[piece.length - 1];
    let wait = 28 + Math.round(jitter(i * 7 + 3) * 34);
    if (/[.?!…]/.test(last)) wait = 320 + Math.round(jitter(i) * 140);
    else if (last === ',') wait = 150 + Math.round(jitter(i) * 60);
    else if (last === ' ') wait = 18;
    steps.push({ chunk: piece.join(''), wait });
  }
  return steps;
}

const reduced = () => typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;
const sleep = (ms: number, signal: AbortSignal) => new Promise<void>((res, rej) => {
  const t = setTimeout(res, ms);
  signal.addEventListener('abort', () => { clearTimeout(t); rej(new DOMException('aborted', 'AbortError')); }, { once: true });
});

/**
 * Show `text` in `el` like a reply being written. Clicking the answer finishes it at once.
 * Resolves when the whole text is shown; rejects with AbortError if `signal` aborts.
 */
export async function playAnswer(el: HTMLElement, text: string, signal: AbortSignal) {
  el.hidden = false;
  el.className = 'answer wait';
  el.innerHTML = '<span class="think">도슨트가 그림을 보고 있어요<i>.</i><i>.</i><i>.</i></span>';
  if (reduced()) { el.className = 'answer'; el.textContent = text; return; }

  let skip = false;
  const onClick = () => { skip = true; };
  el.addEventListener('click', onClick);
  try {
    await sleep(650 + Math.round(jitter(text.length) * 550), signal);
    el.className = 'answer typing';
    el.textContent = '';
    const out = document.createTextNode('');
    const caret = document.createElement('span');
    caret.className = 'caret';
    caret.setAttribute('aria-hidden', 'true');
    el.append(out, caret);
    for (const s of typingSteps(text)) {
      if (skip) break;
      out.data += s.chunk;
      await sleep(s.wait, signal);
    }
    out.data = text;
    caret.remove();
    el.className = 'answer';
  } finally {
    el.removeEventListener('click', onClick);
  }
}
