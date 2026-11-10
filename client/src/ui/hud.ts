import { BATTERY_LABEL, EMOTES, EMOTE_ICON, VOICE_MAX_MS, type Battery, type RoomId } from '@party/shared';
import type { Party } from '../game/party';
import type { PartyConnection } from '../net/types';
import { ROOM_INFO, type Artwork } from '../world/art';
import { createLivingViewer } from '../living/viewer';
import type { Painting } from '../world/gallery';
import { PHASE_ICON, phaseOf } from '../world/sky';
import { VoiceRecorder } from '../audio/recorder';
import type { Controls } from '../game/controls';
import { isTyping } from '../game/controls';
import { $, esc, load, onSubmit, save, toast } from './dom';

const EMOTE_LABEL = { cheers: '건배', laugh: '웃음', clap: '박수', heart: '좋아요', wow: '놀람', wave: '손 흔들기' } as const;

/**
 * Everything on screen during the party. Returns hooks for the Party and a
 * promise that settles when you leave or the connection drops.
 */
export function createHud(conn: PartyConnection, controls: Controls) {
  const hud = $('hud');
  hud.hidden = false;
  $('party-title').textContent = conn.title;
  $('party-private').hidden = !conn.isPrivate;
  $('demo-banner').hidden = !conn.demo;
  if (conn.note) $('demo-banner').textContent = conn.note;
  $('invite-btn').hidden = conn.demo;
  let party: Party | null = null;
  let current: Painting | null = null;
  let battery: Battery = 'charging';
  const cleanups: (() => void)[] = [];
  const on = <K extends keyof HTMLElementEventMap>(el: EventTarget, ev: K, fn: (e: HTMLElementEventMap[K]) => void) => {
    el.addEventListener(ev, fn as EventListener);
    cleanups.push(() => el.removeEventListener(ev, fn as EventListener));
  };

  // ---- first-time help ----
  if (!load('party.helped')) {
    const help = $('help');
    help.textContent = matchMedia('(pointer: coarse)').matches
      ? '바닥을 누르거나 조이스틱으로 걸어요. 빛나는 원 안의 사람에게만 말이 들려요.'
      : '방향키나 바닥 클릭으로 걸어요. 발밑의 빛나는 원 안에 있는 사람에게만 말이 들려요.';
    help.hidden = false;
    const hide = () => { help.hidden = true; save('party.helped', 1); };
    setTimeout(hide, 9000);
    on(help, 'click', hide);
  }

  // ---- clock: the sky follows this ----
  const tickClock = () => {
    const d = new Date();
    const h = d.getHours(), m = d.getMinutes();
    const phase = phaseOf(h + m / 60);
    const ampm = h < 12 ? '오전' : '오후';
    const hh = h % 12 === 0 ? 12 : h % 12;
    $('clock').textContent = `${PHASE_ICON[phase]} 내 시각 ${ampm} ${hh}:${String(m).padStart(2, '0')}`;
  };
  tickClock();
  const clockT = setInterval(tickClock, 20_000);
  cleanups.push(() => clearInterval(clockT));

  // ---- camera view: close behind you, or the overview ----
  const viewBtn = $('view-btn');
  const toggleView = () => {
    if (!party) return;
    const far = party.toggleView() > 0.5;
    viewBtn.textContent = far ? '가까이 보기' : '멀리 보기';
  };
  viewBtn.textContent = '멀리 보기';
  on(viewBtn, 'click', toggleView);
  on(window, 'keydown', e => { if ((e.key === 'v' || e.key === 'V') && !isTyping(e) && !living.isOpen()) toggleView(); });

  // ---- chat ----
  const input = $('chat-input') as HTMLInputElement;
  cleanups.push(onSubmit($('chat-form') as HTMLFormElement, () => {
    const text = input.value.trim();
    if (!text) return;
    conn.chat(text);
    input.value = '';
  }));
  on(window, 'keydown', e => {
    if (living.isOpen()) return; // the painting room handles its own keys
    if (e.key === 'Enter' && !isTyping(e)) { input.focus(); e.preventDefault(); }
    if (e.key === 'Escape' && document.activeElement === input) input.blur();
  });
  on(input, 'focus', () => { controls.enabled = false; });
  on(input, 'blur', () => { controls.enabled = true; });

  // ---- emotes ----
  const emotes = $('emotes');
  emotes.innerHTML = EMOTES.map(k => `<button type="button" data-e="${k}" title="${EMOTE_LABEL[k]}" aria-label="${EMOTE_LABEL[k]}">${EMOTE_ICON[k]}</button>`).join('');
  on(emotes, 'click', e => {
    const b = (e.target as HTMLElement).closest<HTMLButtonElement>('button[data-e]');
    if (b && party) party.emote(b.dataset.e as (typeof EMOTES)[number]);
  });

  // ---- battery ----
  const batBtn = $('battery-btn');
  const setBattery = (b: Battery) => {
    battery = b;
    batBtn.setAttribute('aria-pressed', String(b === 'low'));
    batBtn.querySelector('.bi')!.textContent = b === 'low' ? '🪫' : '🔋';
    batBtn.querySelector('.bl')!.textContent = b === 'low' ? '방전' : '충전 중';
    batBtn.title = `${BATTERY_LABEL[b]} (눌러서 바꾸기)`;
  };
  setBattery('charging');
  on(batBtn, 'click', () => {
    setBattery(battery === 'charging' ? 'low' : 'charging');
    conn.battery(battery);
    toast(battery === 'low' ? '방전 상태로 바꿨어요. 다들 구경만 하고 싶은 걸 알 수 있어요.' : '충전 중으로 바꿨어요. 말 걸어도 된다는 표시예요.');
  });

  // ---- voice notes ----
  const mic = $('mic-btn'), dock = $('dock'), recbar = $('recbar'), recTime = $('rec-time');
  const rec = new VoiceRecorder();
  let recTimer = 0;
  mic.hidden = !conn.voiceOk || !VoiceRecorder.supported();
  const fmt = (ms: number) => `${Math.floor(ms / 60000)}:${String(Math.floor(ms / 1000) % 60).padStart(2, '0')}`;
  const endRec = () => { clearInterval(recTimer); recbar.hidden = true; dock.hidden = false; };
  on(mic, 'click', async () => {
    try {
      await rec.start();
    } catch {
      toast('마이크를 쓸 수 없어요. 브라우저 주소창 옆에서 마이크 권한을 허용해 주세요.', 4000);
      if (conn.demo) mic.hidden = true;
      return;
    }
    dock.hidden = true; recbar.hidden = false; recTime.textContent = '0:00';
    recTimer = window.setInterval(() => {
      const el = rec.elapsed();
      recTime.textContent = fmt(el);
      if (el >= VOICE_MAX_MS - 100) void send();
    }, 200);
  });
  const send = async () => {
    endRec();
    const note = await rec.stop();
    if (!note) { toast('너무 짧거나 커서 보내지 못했어요. 다시 녹음해 주세요.'); return; }
    try { await conn.voice(note.blob, note.ms); } catch { toast('음성 메시지를 보내지 못했어요.'); }
  };
  on($('rec-send'), 'click', () => void send());
  on($('rec-cancel'), 'click', () => { endRec(); rec.cancel(); });
  cleanups.push(() => { rec.cancel(); endRec(); });

  // ---- people panel ----
  const peopleBtn = $('people-btn'), people = $('people'), plist = $('people-list');
  on(peopleBtn, 'click', () => {
    people.hidden = !people.hidden;
    peopleBtn.setAttribute('aria-expanded', String(!people.hidden));
  });
  on(plist, 'click', e => {
    const b = (e.target as HTMLElement).closest<HTMLButtonElement>('button[data-mute]');
    if (!b || !party) return;
    const on = b.getAttribute('aria-pressed') !== 'true';
    party.mute(b.dataset.mute!, on);
    toast(on ? '이 사람의 말과 음성이 이제 안 보여요.' : '다시 보이게 했어요.');
  });

  // ---- invite ----
  on($('invite-btn'), 'click', async () => {
    const url = new URL(location.href);
    url.search = ''; url.searchParams.set('room', conn.roomId);
    const link = url.toString();
    try { await navigator.clipboard.writeText(link); toast('초대 링크를 복사했어요. 친구에게 보내 주세요.'); }
    catch { prompt('이 링크를 친구에게 보내 주세요', link); }
  });

  // ---- living painting (the exhibition's moving-painting room) ----
  const chip = $('art-chip');
  const living = createLivingViewer({
    onOpen: () => { controls.enabled = false; },
    onClose: () => { controls.enabled = true; },
  });
  const openArt = (a: Artwork) => living.open(a.i);
  on(chip, 'click', () => { if (current) openArt(current.art); });

  const hooks = {
    room: (id: RoomId) => { $('where').textContent = ROOM_INFO[id].name; },
    painting: (p: Painting | null) => {
      current = p;
      chip.hidden = !p;
      if (p) chip.textContent = `「${p.art.title}」 살아난 그림 보기`;
    },
    arrived: (p: Painting) => openArt(p.art),
    guests: (list: { id: string; name: string; battery: Battery; near: boolean; self: boolean; muted: boolean }[]) => {
      const near = list.filter(g => g.near).length;
      $('who').textContent = near ? `${list.length}명 있어요, 근처에 ${near}명` : `${list.length}명 있어요`;
      if (people.hidden) return;
      plist.innerHTML = list.sort((a, b) => Number(b.self) - Number(a.self) || Number(b.near) - Number(a.near))
        .map(g => `<li><span>${g.battery === 'low' ? '🪫' : '🔋'}</span>
          <span>${esc(g.name)}${g.self ? '<span class="me">나</span>' : g.near ? '<span class="near">근처</span>' : ''}</span>
          ${g.self ? '<span></span>' : `<button type="button" data-mute="${esc(g.id)}" aria-pressed="${g.muted}">${g.muted ? '다시 보기' : '안 보기'}</button>`}</li>`).join('');
    },
  };

  const closed = new Promise<'left' | 'lost'>(resolve => {
    on($('leave-btn'), 'click', () => { conn.leave(); resolve('left'); });
    conn.on({ closed: r => resolve(r === 'left' ? 'left' : 'lost') });
  });

  return {
    hooks,
    attach(p: Party) { party = p; },
    closed,
    dispose() {
      cleanups.forEach(f => f());
      living.close();
      hud.hidden = true; people.hidden = true; chip.hidden = true;
      $('help').hidden = true;
    },
  };
}
