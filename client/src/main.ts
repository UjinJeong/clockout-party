import './style.css';
import * as THREE from 'three';
import type { Look, Theme } from '@party/shared';
import { buildWorld, type World } from './world/world';
import { Controls } from './game/controls';
import { Party } from './game/party';
import { DemoConnection } from './net/demo';
import { LiveRoomConnection, getRoom, themeRoom } from './net/room';
import { connectParty, type JoinRequest } from './net/colyseus';
import type { PartyConnection } from './net/types';
import { showStart } from './ui/start';
import { showLobby, parseCode } from './ui/lobby';
import { createHud } from './ui/hud';
import { $, toast } from './ui/dom';
import { sound } from './audio/sound';

/** Demo builds (e.g. the shareable preview) skip the server entirely. */
const DEMO_ONLY = import.meta.env.MODE === 'demo';

if (matchMedia('(pointer: coarse)').matches) document.documentElement.classList.add('touch');

// ---- one renderer and one gallery for the whole visit ----
const canvas = $('view') as HTMLCanvasElement;
const mobile = matchMedia('(pointer: coarse)').matches;
const renderer = new THREE.WebGLRenderer({ canvas, antialias: !mobile, powerPreference: 'high-performance' });
renderer.setPixelRatio(Math.min(devicePixelRatio, mobile ? 1.5 : 2));
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.05;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 120);
// The place on screen. It changes when you join a party somewhere else.
let world: World = buildWorld('gallery', scene, renderer);
world.setTime(new Date());
setInterval(() => world.setTime(new Date()), 60_000);
let artLoaded = false;

function useWorld(theme: Theme) {
  if (world.map.theme === theme) return;
  world.dispose();
  world = buildWorld(theme, scene, renderer);
  world.setTime(new Date());
  idleT = 0;
  if (artLoaded) void world.loadArt();
}

const resize = () => {
  const w = innerWidth, h = innerHeight;
  renderer.setSize(w, h, false);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
};
addEventListener('resize', resize);
resize();

const controls = new Controls($('joystick'));
let party: Party | null = null;
let idleT = 0;

// Behind the invitation and lobby the camera drifts slowly along the place.
function idleCamera(dt: number) {
  idleT += dt * 0.05;
  const b = world.map.bounds;
  const mid = (b.x0 + b.x1) / 2, reach = Math.max(0, (b.x1 - b.x0) / 2 - 6);
  const x = mid + Math.sin(idleT) * reach;
  camera.position.set(x, 7.5, 9.5);
  camera.lookAt(x, 1.4, -2);
}

let last = performance.now();
renderer.setAnimationLoop((t) => {
  const dt = Math.min(0.1, (t - last) / 1000);
  last = t;
  world.tick(dt);
  if (party) party.update(dt);
  else idleCamera(dt);
  renderer.render(scene, camera);
});

// Fonts are drawn into canvas textures, so wait for them before the first look.
void (document.fonts?.ready ?? Promise.resolve()).then(() => {
  artLoaded = true;
  void world.loadArt().then(() => $('loading').classList.add('done'));
  setTimeout(() => $('loading').classList.add('done'), 4000);
});

// ---- the visit: invitation → lobby → party → back to lobby ----
async function run() {
  // Without a lobby (the claude.ai page) the invitation card also asks where to party,
  // and the world behind it changes as you pick.
  const startOpts = DEMO_ONLY ? { places: true, onPlace: useWorld } : {};
  let me = await showStart(startOpts);
  const invited = parseCode(new URLSearchParams(location.search).get('room') ?? '');
  let firstJoin: JoinRequest | null = invited ? { mode: 'join', roomId: invited } : null;
  let lobbyError: string | undefined;

  for (;;) {
    let conn: PartyConnection;
    if (DEMO_ONLY) {
      // Inside a claude.ai artifact, everyone with the page open who picked the
      // same place shares one live party there.
      const theme = me.theme;
      const lobby = await getRoom();
      const room = lobby ? await themeRoom(lobby, theme) : null;
      try {
        conn = room ? new LiveRoomConnection(room, me.name, me.look, theme) : new DemoConnection(me.name, me.look, { theme });
      } catch (err) {
        // The shared room failed: still let them in, just with the bot guests.
        console.error(err);
        toast(`같이 둘러보기 연결이 안 돼서 혼자 체험으로 들어가요.\n[같이 둘러보기] ${describe(err)}`, 12000);
        conn = new DemoConnection(me.name, me.look, { theme });
      }
    } else {
      const choice = firstJoin ?? await showLobby(lobbyError);
      firstJoin = null;
      lobbyError = undefined;
      if (choice.mode === 'back') { me = await showStart(); continue; }
      if (choice.mode === 'demo') conn = new DemoConnection(me.name, me.look, { theme: choice.theme });
      else {
        try {
          conn = await join(choice, me.name, me.look);
        } catch (err) {
          lobbyError = describeJoinError(err, choice);
          continue;
        }
      }
    }

    let hud: ReturnType<typeof createHud> | null = null;
    let how: string;
    let step = '장소 준비';
    try {
      step = '장소 준비';
      useWorld(conn.theme);
      step = '화면 준비';
      hud = createHud(conn, controls);
      step = '파티장 만들기';
      party = new Party(scene, camera, canvas, world, conn, controls, $('tags'), hud.hooks);
      step = '화면 연결';
      hud.attach(party);
      sound.setMusic(conn.theme);
      step = '입장 완료';
      if (!conn.demo && conn.isPrivate) toast('친구만 들어오는 파티예요. 위의 "초대하기"로 링크를 보내 주세요.', 4000);
      setUrl(conn.demo ? location.pathname : `?room=${encodeURIComponent(conn.roomId)}`);
      how = await hud.closed;
    } catch (err) {
      // Never leave someone stuck behind a half-built party: clean up and go back.
      console.error(err);
      // Say where and why, so a screenshot of this message is enough to fix it.
      toast(`파티장에 들어가다 문제가 생겼어요. 다시 시도해 주세요.\n[${step}] ${describe(err)}`, 12000);
      try { conn.leave(); } catch { /* already gone */ }
      how = 'lost';
    }
    sound.setMusic(null);
    try { party?.dispose(); } catch (err) { console.error(err); }
    party = null;
    try { hud?.dispose(); } catch (err) { console.error(err); }
    $('hud').hidden = true; // even if the HUD broke halfway through being built
    setUrl(location.pathname);
    if (how === 'lost') lobbyError = '파티 연결이 끊겼어요. 다시 들어가 보세요.';
    if (DEMO_ONLY) { me = await showStart(startOpts); }
  }
}

/** A short, readable "what went wrong" for on-screen error notes. */
function describe(err: unknown): string {
  const e = err as { name?: string; message?: string; stack?: string } | null;
  const where = e?.stack?.split('\n').find(l => /at /.test(l))?.trim().replace(/\(?https?:\/\/[^)]*\//, '(').slice(0, 80) ?? '';
  return `${e?.name ?? 'Error'}: ${String(e?.message ?? err).slice(0, 140)}${where ? ' · ' + where : ''}`;
}

/** Sandboxed frames (claude.ai artifacts) may refuse URL changes; that must never stop the party. */
function setUrl(url: string) {
  try { history.replaceState(null, '', url); } catch { /* not allowed here: fine */ }
}

// Browsers only allow sound after a click or a key: wake it on the first one (and every one after, cheaply).
// (iPhones only count the finger lifting or a click, so listen for those too)
for (const ev of ['pointerdown', 'pointerup', 'touchend', 'click', 'keydown'] as const) addEventListener(ev, () => sound.unlock(), { capture: true, passive: true });

// Anything unexpected shows up as a toast instead of a silently frozen screen.
addEventListener('error', e => { console.error(e.error ?? e.message); });
addEventListener('unhandledrejection', e => {
  console.error(e.reason);
  toast(`문제가 생겼어요. 새로고침하면 대부분 해결돼요.\n${describe(e.reason)}`, 8000);
});

async function join(req: JoinRequest, name: string, look: Look) {
  return connectParty(req, name, look);
}

function describeJoinError(err: unknown, req: JoinRequest): string {
  const msg = String((err as { message?: string })?.message ?? err);
  if (/locked|full/i.test(msg)) return '그 파티는 꽉 찼어요. 다른 파티에 가거나 새 파티를 열어 보세요.';
  if (req.mode === 'join' && /not found|invalid|expired/i.test(msg)) return '초대 코드에 맞는 파티를 찾지 못했어요. 파티가 끝났을 수도 있어요.';
  return '파티 서버에 연결하지 못했어요. 잠시 후 다시 시도하거나 혼자 체험하기로 둘러보세요.';
}

void run().catch(err => {
  console.error(err);
  toast(`문제가 생겼어요. 새로고침해 주세요.\n${describe(err)}`, 12000);
});
