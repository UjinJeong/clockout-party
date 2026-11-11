import { sound } from '../audio/sound';
import { MAX_PLAYERS, THEMES, THEME_ICON, THEME_LABEL, isTheme, type Theme } from '@party/shared';
import { listRooms, type JoinRequest, type RoomListing } from '../net/colyseus';
import { $, esc, onSubmit } from './dom';

export type LobbyChoice = JoinRequest | { mode: 'demo'; theme: Theme } | { mode: 'back' };

/** Pull a room id out of whatever was pasted: a bare code or a full invite link. */
export function parseCode(raw: string): string | null {
  const s = raw.trim();
  if (!s) return null;
  try { const u = new URL(s); const r = u.searchParams.get('room'); if (r) return r; } catch { /* not a URL */ }
  return /^[\w-]{4,40}$/.test(s) ? s : null;
}

export function showLobby(error?: string): Promise<LobbyChoice> {
  const screen = $('lobby');
  screen.hidden = false;
  const tick = (e: Event) => { const b = (e.target as HTMLElement).closest('button'); if (b && !b.closest('#theme-seg')) sound.play('tick'); };
  screen.addEventListener('click', tick);
  const list = $('room-list');
  const errBox = $('lobby-error');
  let isPrivate = false;
  let theme: Theme = 'gallery';
  let alive = true;
  let reachable = true;

  const setError = (msg: string | null) => { errBox.hidden = !msg; errBox.textContent = msg ?? ''; };
  setError(error ?? null);

  const renderRooms = (rooms: RoomListing[]) => {
    if (!rooms.length) { list.innerHTML = '<li class="empty">지금 열린 파티가 없어요. 오른쪽에서 첫 파티를 열어 보세요.</li>'; return; }
    list.innerHTML = rooms.map(r => `<li class="room-row">
      <span><b>${isTheme(r.theme) ? THEME_ICON[r.theme] + ' ' : ''}${esc(r.title)}</b>${isTheme(r.theme) ? `<em class="room-theme">${THEME_LABEL[r.theme]}</em>` : ''}</span>
      <small>${r.clients} / ${r.maxClients || MAX_PLAYERS}명</small>
      <button class="btn small primary" type="button" data-id="${esc(r.roomId)}" ${r.clients >= (r.maxClients || MAX_PLAYERS) ? 'disabled' : ''}>들어가기</button>
    </li>`).join('');
  };

  const refresh = async () => {
    try {
      const rooms = await listRooms(AbortSignal.timeout(4000));
      if (!alive) return;
      if (!reachable) setError(null);
      reachable = true;
      renderRooms(rooms);
    } catch {
      if (!alive) return;
      reachable = false;
      list.innerHTML = '';
      setError('파티 서버에 연결할 수 없어요. 서버가 켜져 있는지 확인하거나, 아래 "서버 없이 혼자 체험하기"로 먼저 둘러보세요.');
    }
  };
  void refresh();
  const timer = window.setInterval(refresh, 5000);

  // where the new party is: gallery, home, pool
  const themeSeg = $('theme-seg');
  themeSeg.innerHTML = THEMES.map(t => `<button type="button" role="radio" data-theme="${t}">${THEME_ICON[t]} ${THEME_LABEL[t]}</button>`).join('');
  const setTheme = (t: Theme) => {
    if (t !== theme) { sound.play('whoosh', { pitch: 0.8 }); sound.setMusic(t); }
    theme = t;
    themeSeg.querySelectorAll<HTMLButtonElement>('button').forEach(b => b.setAttribute('aria-checked', String(b.dataset.theme === t)));
  };
  setTheme('gallery');

  // privacy toggle
  const seg = $('privacy-seg');
  const segButtons = [...seg.querySelectorAll<HTMLButtonElement>('button')];
  const setPrivate = (v: boolean) => {
    isPrivate = v;
    segButtons.forEach(b => b.setAttribute('aria-checked', String(b.dataset.private === String(v))));
    $('create-hint').textContent = v ? '목록에 안 보여요. 초대 링크를 받은 친구만 들어와요.' : '열린 파티 목록에 보여요.';
  };
  setPrivate(false);

  return new Promise(resolve => {
    const done = (c: LobbyChoice) => {
      alive = false;
      clearInterval(timer);
      screen.hidden = true;
      list.removeEventListener('click', onList);
      screen.removeEventListener('click', tick);
      seg.removeEventListener('click', onSeg);
      themeSeg.removeEventListener('click', onTheme);
      offCreate(); offCode();
      $('demo-btn').removeEventListener('click', onDemo);
      $('lobby-back').removeEventListener('click', onBack);
      resolve(c);
    };
    const onList = (e: Event) => {
      const b = (e.target as HTMLElement).closest<HTMLButtonElement>('button[data-id]');
      if (b) done({ mode: 'join', roomId: b.dataset.id! });
    };
    const onSeg = (e: Event) => {
      const b = (e.target as HTMLElement).closest<HTMLButtonElement>('button');
      if (b) setPrivate(b.dataset.private === 'true');
    };
    const onTheme = (e: Event) => {
      const t = (e.target as HTMLElement).closest<HTMLButtonElement>('button')?.dataset.theme;
      if (isTheme(t)) setTheme(t);
    };
    const onCreate = (e: Event) => {
      e.preventDefault();
      const title = ($('create-title') as HTMLInputElement).value.trim();
      done({ mode: 'create', title: title || `${THEME_LABEL[theme]} 파티`, private: isPrivate, theme });
    };
    const onCode = (e: Event) => {
      e.preventDefault();
      const input = $('code') as HTMLInputElement;
      const id = parseCode(input.value);
      if (!id) { setError('초대 코드를 다시 확인해 주세요. 링크를 통째로 붙여 넣어도 돼요.'); input.focus(); return; }
      done({ mode: 'join', roomId: id });
    };
    const onDemo = () => done({ mode: 'demo', theme });
    const onBack = () => done({ mode: 'back' });
    list.addEventListener('click', onList);
    seg.addEventListener('click', onSeg);
    themeSeg.addEventListener('click', onTheme);
    const offCreate = onSubmit($('create-form') as HTMLFormElement, onCreate);
    const offCode = onSubmit($('code-form') as HTMLFormElement, onCode);
    $('demo-btn').addEventListener('click', onDemo);
    $('lobby-back').addEventListener('click', onBack);
  });
}
