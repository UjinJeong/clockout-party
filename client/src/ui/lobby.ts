import { MAX_PLAYERS } from '@party/shared';
import { listRooms, type JoinRequest, type RoomListing } from '../net/colyseus';
import { $, esc } from './dom';

export type LobbyChoice = JoinRequest | { mode: 'demo' } | { mode: 'back' };

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
  const list = $('room-list');
  const errBox = $('lobby-error');
  let isPrivate = false;
  let alive = true;
  let reachable = true;

  const setError = (msg: string | null) => { errBox.hidden = !msg; errBox.textContent = msg ?? ''; };
  setError(error ?? null);

  const renderRooms = (rooms: RoomListing[]) => {
    if (!rooms.length) { list.innerHTML = '<li class="empty">지금 열린 파티가 없어요. 오른쪽에서 첫 파티를 열어 보세요.</li>'; return; }
    list.innerHTML = rooms.map(r => `<li class="room-row">
      <span><b>${esc(r.title)}</b></span>
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

  // privacy toggle
  const seg = screen.querySelector('.seg')!;
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
      seg.removeEventListener('click', onSeg);
      $('create-form').removeEventListener('submit', onCreate);
      $('code-form').removeEventListener('submit', onCode);
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
    const onCreate = (e: Event) => {
      e.preventDefault();
      const title = ($('create-title') as HTMLInputElement).value.trim();
      done({ mode: 'create', title: title || '오프닝 파티', private: isPrivate });
    };
    const onCode = (e: Event) => {
      e.preventDefault();
      const input = $('code') as HTMLInputElement;
      const id = parseCode(input.value);
      if (!id) { setError('초대 코드를 다시 확인해 주세요. 링크를 통째로 붙여 넣어도 돼요.'); input.focus(); return; }
      done({ mode: 'join', roomId: id });
    };
    const onDemo = () => done({ mode: 'demo' });
    const onBack = () => done({ mode: 'back' });
    list.addEventListener('click', onList);
    seg.addEventListener('click', onSeg);
    $('create-form').addEventListener('submit', onCreate);
    $('code-form').addEventListener('submit', onCode);
    $('demo-btn').addEventListener('click', onDemo);
    $('lobby-back').addEventListener('click', onBack);
  });
}
