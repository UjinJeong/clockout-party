import * as THREE from 'three';
import {
  HANDS, HAND_LABEL, HATS, HAT_LABEL, KINDS, KIND_LABEL, OUTFITS, OUTFIT_LABEL, PALETTE, THEMES, THEME_ICON, THEME_LABEL,
  colorHex, customColor, isCustomColor, isTheme, parseLook, sanitizeName, type Look, type Theme,
} from '@party/shared';
import { buildAnimal, type AnimalRig } from '../avatar/animal';
import { Animator } from '../avatar/animator';
import { $, load, onSubmit, save } from './dom';
import { Palette } from './palette';

/** The invitation card: write a name, dress up your animal (colour, hat, paw, outfit), with a turning 3D preview. */
export interface StartOptions {
  /** Let the visitor pick the place here (pages without a lobby, like the claude.ai one). */
  places?: boolean;
  /** Called whenever the picked place changes, so the world behind the card can follow. */
  onPlace?: (theme: Theme) => void;
}

export function showStart(opts: StartOptions = {}): Promise<{ name: string; look: Look; theme: Theme }> {
  const screen = $('start');
  screen.hidden = false;
  const saved = load<{ name?: string; look?: Look; theme?: Theme }>('party.me') ?? {};
  let theme: Theme = isTheme(saved.theme) ? saved.theme : 'gallery';
  let look: Look = parseLook(saved.look ?? { ...randomLook(), hand: 'wine' });
  const nameInput = $('name') as HTMLInputElement;
  nameInput.value = saved.name ?? '';

  // ---- preview ----
  const canvas = $('preview') as HTMLCanvasElement;
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(2, devicePixelRatio));
  renderer.setSize(190, 209, false);
  const scene = new THREE.Scene();
  scene.add(new THREE.HemisphereLight(0xfff3e0, 0x6b5440, 1.6));
  const sun = new THREE.DirectionalLight(0xffffff, 1.4); sun.position.set(2, 4, 3); scene.add(sun);
  const cam = new THREE.PerspectiveCamera(30, 190 / 209, 0.1, 20);
  cam.position.set(0, 1.25, 4.4); cam.lookAt(0, 0.8, 0);
  let rig: AnimalRig = buildAnimal(look);
  let anim = new Animator(rig);
  scene.add(rig.root);
  let raf = 0, last = performance.now(), spin = 0.4;
  const loop = (t: number) => {
    const dt = Math.min(0.05, (t - last) / 1000); last = t;
    spin += dt * 0.6;
    rig.root.rotation.y = Math.sin(spin) * 0.6;
    anim.update(dt, { moving: false, energy: 55, pose: 'stand', dozing: false, baseY: 0 });
    renderer.render(scene, cam);
    raf = requestAnimationFrame(loop);
  };
  raf = requestAnimationFrame(loop);
  const rebuild = (emote = true) => {
    rig.dispose(); rig = buildAnimal(look); anim = new Animator(rig); scene.add(rig.root);
    if (emote) anim.play('wave');
  };

  // ---- pickers ----
  const kindBox = $('pick-kind'), colorBox = $('pick-color'), palBox = $('pick-palette');
  const hatBox = $('pick-hat'), handBox = $('pick-hand'), outfitBox = $('pick-outfit'), dice = $('pick-random');
  const chips = <T extends string>(list: readonly T[], label: Record<T, string>, slot: 'hat' | 'hand' | 'outfit') =>
    list.map(v => `<button type="button" data-slot="${slot}" data-v="${v}" aria-pressed="${look[slot] === v}">${label[v]}</button>`).join('');
  const render = () => {
    kindBox.innerHTML = KINDS.map(k => `<button type="button" data-k="${k}" aria-pressed="${look.kind === k}">${KIND_LABEL[k]}</button>`).join('');
    const own = isCustomColor(look.color);
    colorBox.innerHTML = PALETTE.map((c, i) => `<button type="button" data-c="${i}" aria-pressed="${look.color === i}" aria-label="색 ${i + 1}" style="background:${c}"></button>`).join('')
      + `<button type="button" class="pal-open" data-pal="1" aria-pressed="${own}" aria-expanded="${!palBox.hidden}" aria-label="팔레트에서 고르기"`
      + (own ? ` style="--own:${colorHex(look.color)}"` : '') + '></button>';
    hatBox.innerHTML = chips(HATS, HAT_LABEL, 'hat');
    handBox.innerHTML = chips(HANDS, HAND_LABEL, 'hand');
    outfitBox.innerHTML = chips(OUTFITS, OUTFIT_LABEL, 'outfit');
  };
  // the palette: any colour at all; the preview follows the finger (one rebuild per frame at most)
  let redraw = 0;
  const palette = new Palette(palBox, colorHex(look.color), hex => {
    look = { ...look, color: customColor(hex) };
    if (!redraw) redraw = requestAnimationFrame(() => { redraw = 0; render(); rebuild(false); });
  });
  const showPalette = (open: boolean) => {
    if (open) palette.set(colorHex(look.color));
    palBox.hidden = !open;
  };
  render();
  const onPick = (e: Event) => {
    const b = (e.target as HTMLElement).closest('button');
    if (!b) return;
    if (b.dataset.k) look = { ...look, kind: b.dataset.k as Look['kind'] };
    else if (b.dataset.pal) { showPalette(palBox.hidden); render(); return; }
    else if (b.dataset.c) { look = { ...look, color: Number(b.dataset.c) }; showPalette(false); }
    else if (b.dataset.slot && b.dataset.v) look = parseLook({ ...look, [b.dataset.slot]: b.dataset.v });
    else return;
    render(); rebuild();
  };
  const boxes = [kindBox, colorBox, hatBox, handBox, outfitBox];
  boxes.forEach(el => el.addEventListener('click', onPick));
  const onDice = () => { look = randomLook(); showPalette(false); render(); rebuild(); };
  dice.addEventListener('click', onDice);
  rebuild(true);

  // ---- where the party is ----
  const placeRow = $('place-row'), placeBox = $('pick-place');
  placeRow.hidden = !opts.places;
  const inviteLine = screen.querySelector<HTMLElement>('.invite-line');
  const INVITE: Record<Theme, string> = { gallery: '오프닝 파티에 초대합니다', home: '홈파티에 초대합니다', pool: '풀파티에 초대합니다' };
  const renderPlaces = () => {
    if (inviteLine) inviteLine.textContent = INVITE[theme];
    placeBox.innerHTML = THEMES.map(t => `<button type="button" role="radio" data-place="${t}" aria-checked="${theme === t}">`
      + `<span class="pi" aria-hidden="true">${THEME_ICON[t]}</span>${THEME_LABEL[t]}</button>`).join('');
  };
  const onPlacePick = (e: Event) => {
    const t = (e.target as HTMLElement).closest<HTMLButtonElement>('button')?.dataset.place;
    if (!isTheme(t) || t === theme) return;
    theme = t; renderPlaces(); opts.onPlace?.(t);
  };
  if (opts.places) { renderPlaces(); placeBox.addEventListener('click', onPlacePick); opts.onPlace?.(theme); }

  return new Promise(resolve => {
    const form = $('start-form') as HTMLFormElement;
    const submit = (e: Event) => {
      e.preventDefault();
      const name = sanitizeName(nameInput.value);
      if (!name) { nameInput.focus(); nameInput.setCustomValidity('이름을 적어 주세요'); nameInput.reportValidity(); return; }
      save('party.me', { name, look, theme });
      cancelAnimationFrame(raf);
      rig.dispose(); renderer.dispose(); // the canvas keeps its one context for next time
      placeBox.removeEventListener('click', onPlacePick);
      offSubmit();
      boxes.forEach(el => el.removeEventListener('click', onPick));
      dice.removeEventListener('click', onDice);
      cancelAnimationFrame(redraw); palette.dispose(); palBox.hidden = true;
      screen.hidden = true;
      resolve({ name, look, theme });
    };
    nameInput.addEventListener('input', () => nameInput.setCustomValidity(''));
    const offSubmit = onSubmit(form, submit);
    if (!nameInput.value) setTimeout(() => nameInput.focus(), 300);
  });
}

const any = <T>(list: readonly T[]) => list[(Math.random() * list.length) | 0];
/** A whole outfit at random — for "🎲 아무거나". */
export function randomLook(): Look {
  return { kind: any(KINDS), color: (Math.random() * PALETTE.length) | 0, hat: any(HATS), hand: any(HANDS), outfit: any(OUTFITS) };
}
