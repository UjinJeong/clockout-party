import './style.css';
import * as THREE from 'three';
import type { Look } from '@party/shared';
import { buildGallery } from './world/gallery';
import { Controls } from './game/controls';
import { Party } from './game/party';
import { DemoConnection } from './net/demo';
import { LiveRoomConnection, getRoom } from './net/room';
import { connectParty, type JoinRequest } from './net/colyseus';
import type { PartyConnection } from './net/types';
import { showStart } from './ui/start';
import { showLobby, parseCode } from './ui/lobby';
import { createHud } from './ui/hud';
import { $, toast } from './ui/dom';

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
const gallery = buildGallery(scene, renderer);
gallery.setTime(new Date());
setInterval(() => gallery.setTime(new Date()), 60_000);

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

// Behind the invitation and lobby the camera drifts slowly past the paintings.
function idleCamera(dt: number) {
  idleT += dt * 0.05;
  const x = 30 + Math.sin(idleT) * 24;
  camera.position.set(x, 7.5, 9.5);
  camera.lookAt(x, 1.4, -2);
}

let last = performance.now();
renderer.setAnimationLoop((t) => {
  const dt = Math.min(0.1, (t - last) / 1000);
  last = t;
  gallery.tick(dt);
  if (party) party.update(dt);
  else idleCamera(dt);
  renderer.render(scene, camera);
});

// Fonts are drawn into canvas textures, so wait for them before the first look.
void (document.fonts?.ready ?? Promise.resolve()).then(() => {
  void gallery.loadArt().then(() => $('loading').classList.add('done'));
  setTimeout(() => $('loading').classList.add('done'), 4000);
});

// ---- the visit: invitation → lobby → party → back to lobby ----
async function run() {
  let me = await showStart();
  const invited = parseCode(new URLSearchParams(location.search).get('room') ?? '');
  let firstJoin: JoinRequest | null = invited ? { mode: 'join', roomId: invited } : null;
  let lobbyError: string | undefined;

  for (;;) {
    let conn: PartyConnection;
    if (DEMO_ONLY) {
      // Inside a claude.ai artifact, everyone with the page open shares one live gallery.
      const room = await getRoom();
      conn = room ? new LiveRoomConnection(room, me.name, me.look) : new DemoConnection(me.name, me.look);
    } else {
      const choice = firstJoin ?? await showLobby(lobbyError);
      firstJoin = null;
      lobbyError = undefined;
      if (choice.mode === 'back') { me = await showStart(); continue; }
      if (choice.mode === 'demo') conn = new DemoConnection(me.name, me.look);
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
    try {
      hud = createHud(conn, controls);
      party = new Party(scene, camera, canvas, gallery, conn, controls, $('tags'), hud.hooks);
      hud.attach(party);
      if (!conn.demo && conn.isPrivate) toast('친구만 들어오는 파티예요. 위의 "초대하기"로 링크를 보내 주세요.', 4000);
      setUrl(conn.demo ? location.pathname : `?room=${encodeURIComponent(conn.roomId)}`);
      how = await hud.closed;
    } catch (err) {
      // Never leave someone stuck behind a half-built party: clean up and go back.
      console.error(err);
      toast('파티장에 들어가다 문제가 생겼어요. 다시 시도해 주세요.', 4000);
      try { conn.leave(); } catch { /* already gone */ }
      how = 'lost';
    }
    try { party?.dispose(); } catch (err) { console.error(err); }
    party = null;
    try { hud?.dispose(); } catch (err) { console.error(err); }
    setUrl(location.pathname);
    if (how === 'lost') lobbyError = '파티 연결이 끊겼어요. 다시 들어가 보세요.';
    if (DEMO_ONLY) { me = await showStart(); }
  }
}

/** Sandboxed frames (claude.ai artifacts) may refuse URL changes; that must never stop the party. */
function setUrl(url: string) {
  try { history.replaceState(null, '', url); } catch { /* not allowed here: fine */ }
}

// Anything unexpected shows up as a toast instead of a silently frozen screen.
addEventListener('error', e => { console.error(e.error ?? e.message); });
addEventListener('unhandledrejection', e => {
  console.error(e.reason);
  toast('문제가 생겼어요. 새로고침하면 대부분 해결돼요.', 4000);
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
  toast('문제가 생겼어요. 새로고침해 주세요.', 6000);
});
