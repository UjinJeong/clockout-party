import * as THREE from 'three';
import {
  HANDS, HAND_LABEL, HATS, HAT_LABEL, KINDS, KIND_LABEL, OUTFITS, OUTFIT_LABEL, PALETTE, parseLook, sanitizeName, type Look,
} from '@party/shared';
import { buildAnimal, type AnimalRig } from '../avatar/animal';
import { Animator } from '../avatar/animator';
import { $, load, onSubmit, save } from './dom';

/** The invitation card: write a name, dress up your animal (colour, hat, paw, outfit), with a turning 3D preview. */
export function showStart(): Promise<{ name: string; look: Look }> {
  const screen = $('start');
  screen.hidden = false;
  const saved = load<{ name?: string; look?: Look }>('party.me') ?? {};
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
    anim.update(dt, false, 'charging');
    renderer.render(scene, cam);
    raf = requestAnimationFrame(loop);
  };
  raf = requestAnimationFrame(loop);
  const rebuild = (emote = true) => {
    rig.dispose(); rig = buildAnimal(look); anim = new Animator(rig); scene.add(rig.root);
    if (emote) anim.play('wave');
  };

  // ---- pickers ----
  const kindBox = $('pick-kind'), colorBox = $('pick-color');
  const hatBox = $('pick-hat'), handBox = $('pick-hand'), outfitBox = $('pick-outfit'), dice = $('pick-random');
  const chips = <T extends string>(list: readonly T[], label: Record<T, string>, slot: 'hat' | 'hand' | 'outfit') =>
    list.map(v => `<button type="button" data-slot="${slot}" data-v="${v}" aria-pressed="${look[slot] === v}">${label[v]}</button>`).join('');
  const render = () => {
    kindBox.innerHTML = KINDS.map(k => `<button type="button" data-k="${k}" aria-pressed="${look.kind === k}">${KIND_LABEL[k]}</button>`).join('');
    colorBox.innerHTML = PALETTE.map((c, i) => `<button type="button" data-c="${i}" aria-pressed="${look.color === i}" aria-label="색 ${i + 1}" style="background:${c}"></button>`).join('');
    hatBox.innerHTML = chips(HATS, HAT_LABEL, 'hat');
    handBox.innerHTML = chips(HANDS, HAND_LABEL, 'hand');
    outfitBox.innerHTML = chips(OUTFITS, OUTFIT_LABEL, 'outfit');
  };
  render();
  const onPick = (e: Event) => {
    const b = (e.target as HTMLElement).closest('button');
    if (!b) return;
    if (b.dataset.k) look = { ...look, kind: b.dataset.k as Look['kind'] };
    else if (b.dataset.c) look = { ...look, color: Number(b.dataset.c) };
    else if (b.dataset.slot && b.dataset.v) look = parseLook({ ...look, [b.dataset.slot]: b.dataset.v });
    else return;
    render(); rebuild();
  };
  const boxes = [kindBox, colorBox, hatBox, handBox, outfitBox];
  boxes.forEach(el => el.addEventListener('click', onPick));
  const onDice = () => { look = randomLook(); render(); rebuild(); };
  dice.addEventListener('click', onDice);
  rebuild(true);

  return new Promise(resolve => {
    const form = $('start-form') as HTMLFormElement;
    const submit = (e: Event) => {
      e.preventDefault();
      const name = sanitizeName(nameInput.value);
      if (!name) { nameInput.focus(); nameInput.setCustomValidity('이름을 적어 주세요'); nameInput.reportValidity(); return; }
      save('party.me', { name, look });
      cancelAnimationFrame(raf);
      rig.dispose(); renderer.dispose();
      offSubmit();
      boxes.forEach(el => el.removeEventListener('click', onPick));
      dice.removeEventListener('click', onDice);
      screen.hidden = true;
      resolve({ name, look });
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
