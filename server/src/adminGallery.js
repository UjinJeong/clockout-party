// 🖼️ The manager page's 전시장 tab: the halls (make, rename, restyle, reorder, remove) and the
// paintings (replace, edit their words, hang or take down, move between halls).
// Saving sends the whole list (and any new pictures) to the server, which commits it to GitHub;
// Render then redeploys, so the site shows it a few minutes later.
(() => {
  let OPT = { colors: {}, motions: {}, hallMax: 8, maxHalls: 12, nameMax: 12, noteMax: 80 };   // from the server (shared rules)
  const ROMAN = ['', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ', 'Ⅵ', 'Ⅶ', 'Ⅷ', 'Ⅸ', 'Ⅹ'];
  const QUESTIONS = ['먼저 어디를 보면 좋을까요?', '색은 어떻게 쓰였나요?', '아이에게 설명해 주세요', '이 그림이 움직인다면?'];
  const $ = id => document.getElementById(id);
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const pad = n => String(n).padStart(2, '0');
  const box = $('gallery');

  let base = [], items = [], baseHalls = [], halls = [], version = '', canSave = false, repo = '', branch = 'main';
  const pics = new Map();     // path → { data (base64), url (preview) }
  const motion = new Map();   // painting id → what the 🪄 auto motion found (this visit only)
  let open = null;            // the id being edited
  let loaded = false, busy = false;

  const changed = () => JSON.stringify(items) !== JSON.stringify(base) || JSON.stringify(halls) !== JSON.stringify(baseHalls);
  /** [id, name, most paintings] for each hall, in building order */
  const rooms = () => halls.map(h => [h.id, h.name, OPT.hallMax]);
  const holds = id => items.filter(x => x.room === id).length;   // every painting, taken down ones too
  let openHall = null;        // the hall being edited
  const shown = room => items.filter(x => x.room === room && !x.hidden).length;
  const slots = () => OPT.hallMax;
  const thumbOf = it => {
    if (it.thumb && pics.has(it.thumb)) return pics.get(it.thumb).url;
    if (it.thumb) return '/' + it.thumb;
    return '/a/t' + pad(it.i) + '.jpg';
  };
  // a picture saved but not deployed yet is not on this server: show it from GitHub instead
  const fallback = it => it.thumb ? 'https://raw.githubusercontent.com/' + repo + '/' + branch + '/client/public/' + it.thumb : '';

  async function load() {
    box.innerHTML = '<p class="empty">불러오는 중…</p>';
    try {
      const r = await fetch('/admin/api/gallery', { cache: 'no-store' });
      const g = await r.json();
      if (!r.ok) throw new Error(g.error || '불러오지 못했어요.');
      base = g.gallery.items; items = structuredClone(base); baseHalls = g.gallery.halls; halls = structuredClone(baseHalls); if (g.options) OPT = g.options; openHall = null; version = g.version; canSave = g.canSave; repo = g.repo; branch = g.branch;
      pics.clear(); motion.clear(); open = null; loaded = true;
      render();
    } catch (e) { box.innerHTML = '<div class="err">' + esc(e.message) + '</div>'; }
  }

  function render() {
    const parts = [];
    if (!canSave) parts.push('<div class="err">지금은 <b>보기만</b> 할 수 있어요. 저장하려면 Render의 환경 변수에 <code>GITHUB_TOKEN</code>을 넣어 주세요.</div>');
    parts.push('<p class="note">저장하면 GitHub에 기록되고, 2~5분 뒤 사이트에 반영돼요. 새로 올린 그림은 🪄 자동으로 읽어서 움직일 곳(하늘·물의 흐름, 잎의 살랑임, 반짝임, 입체)을 찾아요. 찾지 못하면 움직임 없이 걸려요.</p>');
    parts.push(hallsSection());
    for (const [room, name, max] of rooms()) {
      const list = items.filter(x => x.room === room);
      parts.push('<section class="groom"><h2>' + name + ' <small>걸린 그림 ' + shown(room) + ' / ' + max + '</small></h2>');
      parts.push(list.map(card).join('') || '<p class="empty">이 전시실에는 그림이 없어요.</p>');
      parts.push('<button class="add" data-add="' + room + '"' + (shown(room) >= max ? ' disabled title="벽이 꽉 찼어요. 다른 그림을 내리면 걸 수 있어요."' : '') + '>＋ 새 그림 걸기</button></section>');
    }
    box.innerHTML = parts.join('');
    for (const c of box.querySelectorAll('canvas[data-brush]')) drawPreview(c, motion.get(+c.dataset.brush));
    for (const img of box.querySelectorAll('img[data-fb]')) img.addEventListener('error', () => { if (img.dataset.fb && img.src !== img.dataset.fb) img.src = img.dataset.fb; }, { once: true });
    bar();
  }

  // ---- 🏛️ the halls ----
  function hallsSection() {
    const out = ['<section class="ghalls"><h2>🏛️ 관 <small>' + halls.length + ' / ' + OPT.maxHalls + '개 · 관마다 그림 ' + OPT.hallMax + '점까지</small></h2>',
      '<p class="note">관은 그림 분위기의 묶음이에요. 이름 · 벽 색 · 그림 움직임 · 소개 한 줄로 분위기를 정해요. 순서대로 로비 뒤에 이어져요. 그림이 6점 이상이면 관이 조금 넓어져요.</p>'];
    for (const h of halls) {
      const was = baseHalls.find(b => b.id === h.id), n = shown(h.id), all = holds(h.id), full = n >= OPT.hallMax;
      const badge = !was ? '<span class="badge open">새 관</span>' : JSON.stringify(was) !== JSON.stringify(h) ? '<span class="badge gold">고침</span>' : '';
      out.push('<div class="ghall">'
        + '<span class="sw" style="background:' + esc(OPT.colors[h.color] || '#444') + '"></span>'
        + '<div class="gtext"><b>' + esc(h.name) + '</b> ' + badge + '<span class="gdesc">걸린 그림 ' + n + ' / ' + OPT.hallMax + (all > n ? ' · 내린 그림 ' + (all - n) : '') + (h.note ? ' · ' + esc(h.note) : '') + '</span></div>'
        + '<div class="gbtns">'
        + '<button class="mini" data-hup="' + h.id + '" title="앞으로">↑</button><button class="mini" data-hdown="' + h.id + '" title="뒤로">↓</button>'
        + (full ? '<button class="mini" data-hcopy="' + h.id + '" title="같은 분위기의 관을 바로 뒤에 만들어요"' + (halls.length >= OPT.maxHalls ? ' disabled' : '') + '>' + esc(nextName(h.name)) + ' 만들기</button>' : '')
        + '<button class="mini edit" data-hedit="' + h.id + '">' + (openHall === h.id ? '닫기' : '고치기') + '</button>'
        + '<button class="mini danger-lite" data-hdel="' + h.id + '"' + (all || halls.length <= 1 ? ' disabled title="' + (all ? '그림 ' + all + '점을 다른 관으로 옮기거나 지운 뒤 지울 수 있어요' : '관이 하나는 있어야 해요') + '"' : '') + '>지우기</button>'
        + '</div></div>');
      if (openHall === h.id) out.push(hallEditor(h));
    }
    out.push('<button class="add" data-hnew="1"' + (halls.length >= OPT.maxHalls ? ' disabled title="관은 ' + OPT.maxHalls + '개까지예요"' : '') + '>＋ 새 관</button></section>');
    return out.join('');
  }
  function hallEditor(h) {
    return '<div class="geditor hedit" data-hall="' + h.id + '"><div class="gfields">'
      + '<label><span>관 이름</span><input data-h="name" maxlength="' + OPT.nameMax + '" value="' + esc(h.name) + '"></label>'
      // not a <label>: a label would pass every click on to its first colour button
      + '<div class="lab"><span>벽 색</span><span class="swatches">' + Object.entries(OPT.colors).map(([k, c]) => '<button type="button" class="swatch' + (k === h.color ? ' on' : '') + '" data-hcolor="' + k + '" title="' + k + '" style="background:' + esc(c) + '"></button>').join('') + '</span></div>'
      + '<label><span>벽에 걸린 그림의 움직임</span><select data-h="motion">' + Object.entries(OPT.motions).map(([k, l]) => '<option value="' + k + '"' + (k === h.motion ? ' selected' : '') + '>' + esc(l) + '</option>').join('') + '</select></label>'
      + '<label><span>소개 한 줄 (관 입구와 살아난 그림 화면에 나와요)</span><input data-h="note" maxlength="' + OPT.noteMax + '" value="' + esc(h.note) + '"></label>'
      + '</div></div>';
  }
  /** "연못관" → "연못관 Ⅱ", "연못관 Ⅱ" → "연못관 Ⅲ" (the first free one). */
  function nextName(name) {
    const stem = name.replace(/\s*[ⅡⅢⅣⅤⅥⅦⅧⅨⅩ]$/, '');
    for (const r of ROMAN.slice(1)) {
      const cand = (stem.slice(0, OPT.nameMax - 2) + ' ' + r);
      if (!halls.some(h => h.name === cand)) return cand;
    }
    return stem.slice(0, OPT.nameMax - 3) + ' 새';
  }
  const newId = () => { let id; do { id = 'h' + Array.from({ length: 6 }, () => 'abcdefghijklmnopqrstuvwxyz0123456789'[Math.floor(Math.random() * 36)]).join(''); } while (halls.some(h => h.id === id)); return id; };
  const hallBy = id => halls.find(h => h.id === id);
  function moveHall(id, dir) {
    const a = halls.findIndex(h => h.id === id), b = a + dir;
    if (b < 0 || b >= halls.length) return;
    [halls[a], halls[b]] = [halls[b], halls[a]];
  }
  /** What changed in the halls, in words (for the save bar and the GitHub record). */
  function hallChanges() {
    const out = [];
    for (const h of halls) {
      const b = baseHalls.find(x => x.id === h.id);
      if (!b) out.push('새 관 "' + h.name + '"');
      else if (b.name !== h.name) out.push('"' + b.name + '" → "' + h.name + '"');
      else if (JSON.stringify(b) !== JSON.stringify(h)) out.push('"' + h.name + '" 분위기');
    }
    for (const b of baseHalls) if (!halls.some(h => h.id === b.id)) out.push('"' + b.name + '" 지움');
    if (!out.length && halls.map(h => h.id).join() !== baseHalls.map(h => h.id).join()) out.push('관 순서');
    return out;
  }

  function card(it) {
    const was = base.find(b => b.i === it.i);
    const badges = [
      it.hidden ? '<span class="badge">내림</span>' : '',
      !was ? '<span class="badge open">새 그림</span>' : JSON.stringify(was) !== JSON.stringify(it) ? '<span class="badge gold">고침</span>' : '',
      it.image ? '<span class="badge plain">바꾼 그림</span>' : '',
    ].join('');
    const row = '<div class="gcard' + (it.hidden ? ' off' : '') + '">'
      + '<img alt="" src="' + esc(thumbOf(it)) + '" data-fb="' + esc(fallback(it)) + '">'
      + '<div class="gtext"><b>' + esc(it.title) + '</b> ' + badges + '<span class="gdesc">' + esc(it.desc) + '</span></div>'
      + '<div class="gbtns">'
      + '<button class="mini" data-up="' + it.i + '" title="앞으로">↑</button><button class="mini" data-down="' + it.i + '" title="뒤로">↓</button>'
      + '<button class="mini" data-hide="' + it.i + '">' + (it.hidden ? '다시 걸기' : '내리기') + '</button>'
      + '<button class="mini edit" data-edit="' + it.i + '">' + (open === it.i ? '닫기' : '고치기') + '</button>'
      + '</div></div>';
    return row + (open === it.i ? editor(it) : '');
  }

  function editor(it) {
    const f = (k, label, rows, max) => '<label><span>' + label + '</span>' + (rows
      ? '<textarea data-f="' + k + '" rows="' + rows + '" maxlength="' + max + '">' + esc(it[k]) + '</textarea>'
      : '<input data-f="' + k + '" maxlength="' + max + '" value="' + esc(it[k]) + '">') + '</label>';
    const isOriginal = it.i < 100;
    return '<div class="geditor" data-for="' + it.i + '">'
      + '<div class="gpic"><img alt="" src="' + esc(thumbOf(it)) + '" data-fb="' + esc(fallback(it)) + '">'
      + '<label class="btnlike">그림 바꾸기<input type="file" accept="image/jpeg,image/png,image/webp" data-file="' + it.i + '" hidden></label>'
      + (it.image && isOriginal ? '<button class="mini" data-restore="' + it.i + '">원래 그림으로</button>' : '')
      + (!isOriginal ? '<button class="mini danger-lite" data-remove="' + it.i + '">이 그림 지우기</button>' : '')
      + '<small>' + it.w + ' × ' + it.h + ' px</small>'
      + '</div>'
      + '<div class="gfields">'
      + f('title', '제목', 0, 40)
      + '<label><span>전시실</span><select data-f="room">' + rooms().map(r => '<option value="' + r[0] + '"' + (r[0] === it.room ? ' selected' : !it.hidden && shown(r[0]) >= r[2] ? ' disabled' : '') + '>' + esc(r[1]) + (r[0] !== it.room && shown(r[0]) >= r[2] ? ' (꽉 참)' : '') + '</option>').join('') + '</select></label>'
      + f('desc', '그림 옆 짧은 설명', 2, 300)
      + f('doc', '도슨트 해설', 4, 800)
      + '<div class="two">' + f('how', '해 보기 (살아난 그림에서 할 수 있는 것)', 0, 200) + f('hint', '짧은 힌트', 0, 30) + '</div>'
      + '<details><summary>도슨트에게 물어보기 답변 4개</summary>'
      + QUESTIONS.map((q, k) => '<label><span>' + esc(q) + '</span><textarea data-a="' + k + '" rows="3" maxlength="800">' + esc(it.answers[k] ?? '') + '</textarea></label>').join('')
      + '</details></div>'
      + (it.image ? motionBox(it) : '') + '</div>';
  }

  function bar() {
    const n = items.filter(it => { const b = base.find(x => x.i === it.i); return !b || JSON.stringify(b) !== JSON.stringify(it); }).length + base.filter(b => !items.some(x => x.i === b.i)).length;
    $('gbar').hidden = !loaded;
    const moved = !n && changed(); // only the hanging order changed
    const hc = hallChanges().length;
    $('gcount').textContent = [hc ? '관 ' + hc + '곳' : '', n ? '그림 ' + n + '점' : ''].filter(Boolean).join(' · ') + (n || hc ? ' 바뀜' : moved ? '거는 순서가 바뀌었어요' : '바뀐 내용 없음');
    $('gsave').disabled = !changed() || !canSave || busy || busyMotion();
    $('gundo').disabled = !changed() || busy;
  }

  const byId = i => items.find(x => x.i === +i);
  function move(i, dir) {
    const it = byId(i), same = items.map((x, k) => [x, k]).filter(([x]) => x.room === it.room);
    const at = same.findIndex(([x]) => x === it), to = same[at + dir];
    if (!to) return;
    const a = items.indexOf(it);
    [items[a], items[to[1]]] = [items[to[1]], items[a]];
  }

  // ---- shrink a picture in the browser: full (≤1800px), wall (≤640px), thumb (≤560px) ----
  async function shrink(file) {
    const url = URL.createObjectURL(file);
    try {
      const img = await new Promise((ok, no) => { const im = new Image(); im.onload = () => ok(im); im.onerror = () => no(new Error('그림 파일을 열 수 없어요.')); im.src = url; });
      const out = (max, q) => {
        const k = Math.min(1, max / Math.max(img.naturalWidth, img.naturalHeight));
        const c = document.createElement('canvas');
        c.width = Math.round(img.naturalWidth * k); c.height = Math.round(img.naturalHeight * k);
        const g = c.getContext('2d'); g.fillStyle = '#fff'; g.fillRect(0, 0, c.width, c.height); g.drawImage(img, 0, 0, c.width, c.height);
        let d = c.toDataURL('image/jpeg', q);
        while (d.length * 0.75 > 2.8e6 && q > 0.5) { q -= 0.08; d = c.toDataURL('image/jpeg', q); }
        return { data: d.slice(d.indexOf(',') + 1), url: d, w: c.width, h: c.height };
      };
      if (Math.min(img.naturalWidth, img.naturalHeight) < 300) throw new Error('그림이 너무 작아요. 가로세로 300px 이상이면 좋아요.');
      return { full: out(1800, 0.88), wall: out(640, 0.85), thumb: out(560, 0.82) };
    } finally { URL.revokeObjectURL(url); }
  }
  async function putPicture(it, file) {
    const s = await shrink(file);
    const tag = Math.random().toString(36).slice(2, 8);
    const name = 'gallery/' + it.i + '-' + tag;
    pics.set(name + '.jpg', s.full); pics.set(name + '-wall.jpg', s.wall); pics.set(name + '-t.jpg', s.thumb);
    // the original's hand-made motion (and its "해 보기") does not fit a new picture
    if (!it.image && base.some(b => b.i === it.i)) { it.how = ''; it.hint = ''; }
    Object.assign(it, { image: name + '.jpg', wall: name + '-wall.jpg', thumb: name + '-t.jpg', w: s.full.w, h: s.full.h });
    delete it.mask; delete it.depth; delete it.fx; motion.delete(it.i);
  }

  // ---- 🪄 auto motion: read a picture for what could move (in this browser; nothing is sent anywhere) ----
  const TRANSFORMERS = 'https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.7.1';
  const DEPTH_MODEL = 'onnx-community/depth-anything-v2-small';
  const LV = [['off', '끄기'], ['low', '약하게'], ['mid', '보통'], ['high', '강하게']];
  const FX_LABEL = { flow: '🌊 흐름 (하늘·물)', sway: '🌿 살랑임 (잎·결)', shimmer: '✨ 반짝임', depth: '🧊 입체 (깊이)' };
  let autoMod = null, depthPipe = null;
  const auto = () => (autoMod ??= import('/admin/auto-motion.js').catch(e => { autoMod = null; throw e; }));
  const busyMotion = () => [...motion.values()].some(m => m.state === 'busy');
  const within = (p, ms) => Promise.race([p, new Promise((_, no) => setTimeout(() => no(new Error('시간 초과')), ms))]);
  const picUrl = it => pics.has(it.image) ? pics.get(it.image).url : '/' + it.image;
  function loadImg(src, fb) {
    return new Promise((ok, no) => {
      const im = new Image(); im.crossOrigin = 'anonymous';
      im.onload = () => ok(im);
      im.onerror = () => { if (fb && im.src !== fb) { im.src = fb; fb = ''; } else no(new Error('그림을 불러오지 못했어요.')); };
      im.src = src;
    });
  }
  /** Depth from a small model run right here (downloaded once, about 25MB). Near = 1. */
  async function depthOf(img, w, h) {
    if (!depthPipe) depthPipe = (async () => {
      const T = await import(TRANSFORMERS);
      try { if (navigator.gpu && await navigator.gpu.requestAdapter()) return await T.pipeline('depth-estimation', DEPTH_MODEL, { device: 'webgpu' }); } catch { /* fall back to the CPU */ }
      return T.pipeline('depth-estimation', DEPTH_MODEL, { dtype: 'q8' });
    })().catch(e => { depthPipe = null; throw e; });
    const pipe = await depthPipe;
    const k = Math.min(1, 640 / Math.max(img.naturalWidth, img.naturalHeight));
    const c = document.createElement('canvas'); c.width = Math.round(img.naturalWidth * k); c.height = Math.round(img.naturalHeight * k);
    c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
    const out = await pipe(c.toDataURL('image/jpeg', 0.9));
    const dc = out.depth.toCanvas(), s = document.createElement('canvas'); s.width = w; s.height = h;
    const g = s.getContext('2d'); g.drawImage(dc, 0, 0, w, h);
    const d = g.getImageData(0, 0, w, h).data, depth = new Float32Array(w * h);
    for (let i = 0; i < w * h; i++) depth[i] = d[i * 4] / 255;
    return depth;
  }
  /** RGBA pixels → a PNG, drawn twice as big (smoothly) so the motion fades between pixels. */
  function png(rgba, w, h) {
    const a = document.createElement('canvas'); a.width = w; a.height = h; a.getContext('2d').putImageData(new ImageData(rgba, w, h), 0, 0);
    const b = document.createElement('canvas'); b.width = w * 2; b.height = h * 2;
    const g = b.getContext('2d'); g.imageSmoothingQuality = 'high'; g.drawImage(a, 0, 0, b.width, b.height);
    const url = b.toDataURL('image/png');
    return { data: url.slice(url.indexOf(',') + 1), url };
  }
  const grey = (v, w, h) => { const o = new Uint8ClampedArray(w * h * 4); for (let i = 0; i < w * h; i++) { o[i * 4] = o[i * 4 + 1] = o[i * 4 + 2] = Math.round(v[i] * 255); o[i * 4 + 3] = 255; } return o; };
  /** The picture, dimmed, with what moves painted over it: blue flows, green sways, gold shimmers. */
  function drawPreview(c, m) {
    if (!m?.img) return;
    const { img, mask, w, h } = m;
    const W = Math.min(520, img.naturalWidth), H = Math.round(W * h / w);
    if (c.width !== W) { c.width = W; c.height = H; }
    const o = new Uint8ClampedArray(w * h * 4);
    for (let i = 0; i < w * h; i++) {
      const f = mask[i * 4] / 255, s = mask[i * 4 + 1] / 255, m = mask[i * 4 + 2] / 255, t = f + s + m || 1;
      o[i * 4] = (90 * f + 120 * s + 255 * m) / t; o[i * 4 + 1] = (180 * f + 225 * s + 215 * m) / t; o[i * 4 + 2] = (255 * f + 110 * s + 70 * m) / t;
      o[i * 4 + 3] = Math.min(1, Math.max(f, s, m)) * 190;
    }
    const g = c.getContext('2d'); g.drawImage(img, 0, 0, c.width, c.height); g.fillStyle = 'rgba(0,0,0,.35)'; g.fillRect(0, 0, c.width, c.height);
    const a = document.createElement('canvas'); a.width = w; a.height = h; a.getContext('2d').putImageData(new ImageData(o, w, h), 0, 0);
    g.imageSmoothingQuality = 'high'; g.drawImage(a, 0, 0, c.width, c.height);
  }
  /** Read the picture: motion map, depth, strengths, "해 보기". Anything going wrong = it hangs still. */
  async function makeMotion(it) {
    const id = it.i;
    motion.set(id, { state: 'busy' }); render();
    try {
      const M = await auto();
      const img = await loadImg(picUrl(it), fallback({ thumb: it.image }));
      const c = M.shrinkTo(img, M.READ_SIZE), w = c.width, h = c.height;
      const px = c.getContext('2d', { willReadFrequently: true }).getImageData(0, 0, w, h).data;
      let depth;
      try { depth = M.normalizeDepth(await within(depthOf(img, w, h), 180000)); } catch (e) { console.warn('입체 분석은 건너뛰어요:', e); }
      const hints = M.parsePrompt(it.prompt);
      const r = M.analyze(px, w, h, depth, hints);
      const stem = it.image.replace(/\.[a-z]+$/, '');
      delete it.mask; delete it.depth;
      if (r.found.some(f => f !== 'depth')) { it.mask = stem + '-m.png'; pics.set(it.mask, png(r.mask, w, h)); }
      if (r.hasDepth) { it.depth = stem + '-d.png'; pics.set(it.depth, png(grey(depth, w, h), w, h)); }
      it.fx = r.fx;
      if (r.drift) it.drift = r.drift;
      if (!it.how.trim() || M.isAutoHow(it.how)) { const t = M.howFor(r.found, it.drift); it.how = t.how; it.hint = t.hint; }
      motion.set(id, { state: r.found.length ? 'done' : 'none', still: !!hints.still, words: hints.words, areas: r.areas, found: r.found, hasDepth: r.hasDepth, levels: r.levels, min: r.min,
        img, mask: r.mask, w, h, stem, tool: 'flow', size: 'mid' });
    } catch (e) {
      console.warn('움직임 분석 실패:', e);
      it.fx = {}; delete it.mask; delete it.depth;
      motion.set(id, { state: 'fail' });
    }
    if (byId(id)) render();
  }
  const DRIFT_LABEL = [['', '없음'], ['petals', '🌸 꽃잎'], ['snow', '❄️ 눈'], ['fireflies', '✨ 반딧불'], ['rain', '🌧️ 비']];
  const TOOLS = [['flow', '🌊 흐름'], ['sway', '🌿 살랑임'], ['shimmer', '✨ 반짝임'], ['erase', '🧽 지우개']];
  const SIZES = [['thin', '가늘게', 0.035], ['mid', '보통', 0.065], ['thick', '굵게', 0.11]];
  function motionBox(it) {
    const m = motion.get(it.i), btn = (label) => '<button class="mini" data-auto="' + it.i + '">🪄 ' + label + '</button>';
    const words = '<div class="mprompt"><input data-prompt="' + it.i + '" maxlength="60" value="' + esc(it.prompt ?? '') + '" placeholder="몇 단어로 알려 주세요: 회색 하늘, 바다, 바람, 꽃잎 날림">'
      + '<button class="mini" data-auto="' + it.i + '">이 말로 다시 읽기</button></div>'
      + '<small class="mhelp">알아듣는 말: 하늘·구름·노을 / 바다·물·강·호수 / 바람·잎·풀·털 / 반짝·빛·별·금 / 입체 / 고요 · 날리는 것: 꽃잎·벚꽃, 눈 내림, 반딧불, 비</small>';
    const drift = '<label class="mdrift"><span>날리는 것</span><select data-drift="' + it.i + '">' + DRIFT_LABEL.map(([v, t]) => '<option value="' + v + '"' + ((it.drift ?? '') === v ? ' selected' : '') + '>' + t + '</option>').join('') + '</select></label>';
    let body;
    if (m?.state === 'busy') body = '<p class="mbusy">그림을 읽는 중이에요… 처음 한 번은 입체 분석 AI를 내려받느라 30초~1분쯤 걸려요.</p>';
    else if (m?.state === 'done' || m?.state === 'none') {
      const keys = ['flow', 'sway', 'shimmer'].filter(k => m.found.includes(k) || m.areas[k] > 0.0005).concat(m.hasDepth ? ['depth'] : []);
      body = (m.words?.length ? '<p class="mwords">알아들은 말: ' + m.words.map(w => '<span class="chip">' + esc(w) + '</span>').join(' ') + '</p>' : '')
        + (m.state === 'none' ? '<p>' + (m.still ? '고요하게, <b>움직임 없이</b> 걸어요.' : '움직일 곳을 찾지 못해서 <b>움직임 없이</b> 걸어요. 아래 그림에 붓으로 칠하면 그곳이 움직여요.') + '</p>' : '')
        + '<div class="mrow"><div><canvas class="mprev" data-brush="' + it.i + '" title="붓으로 칠해서 고치기"></canvas>'
        + '<div class="mtools">' + TOOLS.map(([v, t]) => '<button class="mini' + (m.tool === v ? ' on' : '') + '" data-tool="' + v + '" data-for-tool="' + it.i + '">' + t + '</button>').join('')
        + '<span class="msep"></span>' + SIZES.map(([v, t]) => '<button class="mini' + (m.size === v ? ' on' : '') + '" data-size="' + v + '" data-for-tool="' + it.i + '">' + t + '</button>').join('') + '</div>'
        + '<small>그림 위를 붓으로 칠해서 움직일 곳을 고쳐요. 파랑 = 흐름, 초록 = 살랑임, 노랑 = 반짝임</small></div>'
        + '<div class="mlist">' + keys.map(k => '<label><span>' + FX_LABEL[k] + (k !== 'depth' ? ' <small>' + (Math.round(m.areas[k] * 1000) / 10) + '%</small>' : '') + '</span><select data-lv="' + k + '" data-for-lv="' + it.i + '">'
          + LV.map(([v, t]) => '<option value="' + v + '"' + (m.levels[k] === v ? ' selected' : '') + '>' + t + '</option>').join('') + '</select></label>').join('')
        + drift + '</div></div>';
    }
    else if (m?.state === 'fail') body = '<p>그림을 읽지 못해서 <b>움직임 없이</b> 걸어요.</p>' + drift;
    else if (it.fx) {
      const on = [it.fx.flow && 'flow', it.fx.sway && 'sway', it.fx.shimmer && 'shimmer', it.fx.para && 'depth'].filter(Boolean);
      body = '<p>' + (on.length ? '저장된 움직임: ' + on.map(k => FX_LABEL[k]).join(', ') : '움직임 없이 걸려 있어요.') + ' <small>(붓으로 고치려면 "다시 만들기")</small></p>' + btn('다시 만들기') + drift;
    } else body = '<p>아직 자동 움직임이 없어요 (빛만 은은하게 스쳐요).</p>' + btn('움직임 자동 만들기');
    return '<div class="gmotion"><b>🪄 자동 움직임</b>' + words + body + '</div>';
  }
  /** After the brush or a level change: strengths, what's found, "해 보기", and the motion map file. */
  async function motionChanged(it, m, painted) {
    const M = await auto();
    if (painted) {
      m.areas = M.areasOf(m.mask); m.min = M.MANUAL_AREA;
      for (const k of ['flow', 'sway', 'shimmer']) if (m.areas[k] >= m.min[k] && m.levels[k] === 'off' && !m.found.includes(k)) m.levels[k] = 'mid';
      m.found = ['flow', 'sway', 'shimmer'].filter(k => m.areas[k] >= m.min[k]).concat(m.hasDepth ? ['depth'] : []);
      m.state = m.found.length ? 'done' : 'none'; m.still = false;
      it.mask = m.stem + '-m.png'; pics.set(it.mask, png(new Uint8ClampedArray(m.mask), m.w, m.h));
    }
    it.fx = M.fxFor(m.areas, m.levels, m.hasDepth, m.min);
    if (!it.how.trim() || M.isAutoHow(it.how)) { const t = M.howFor(m.found.filter(k => m.levels[k] !== 'off'), it.drift); it.how = t.how; it.hint = t.hint; }
  }


  // ---- clicks and typing ----
  box.addEventListener('click', async e => {
    const b = e.target.closest('button'); if (!b || busy) return;
    const d = b.dataset;
    if (d.hup) moveHall(d.hup, -1);
    else if (d.hdown) moveHall(d.hdown, 1);
    else if (d.hedit) openHall = openHall === d.hedit ? null : d.hedit;
    else if (d.hcolor) { hallBy(b.closest('.hedit').dataset.hall).color = d.hcolor; }
    else if (d.hnew) {
      const used = new Set(halls.map(h => h.color)), color = Object.keys(OPT.colors).find(k => !used.has(k)) || Object.keys(OPT.colors)[0];
      let name = '새 관', k = 2; while (halls.some(h => h.name === name)) name = '새 관 ' + k++;
      const h = { id: newId(), name, color, motion: 'still', note: '' };
      halls.push(h); openHall = h.id;
    } else if (d.hcopy) {
      const src = hallBy(d.hcopy), h = { ...src, id: newId(), name: nextName(src.name) };
      halls.splice(halls.indexOf(src) + 1, 0, h); openHall = h.id;
    } else if (d.hdel) {
      if (holds(d.hdel) || halls.length <= 1) return;
      if (b.dataset.armed !== '1') { b.dataset.armed = '1'; b.textContent = '정말 지울까요?'; setTimeout(() => { if (b.isConnected) { b.dataset.armed = ''; b.textContent = '지우기'; } }, 3000); return; }
      halls = halls.filter(h => h.id !== d.hdel); if (openHall === d.hdel) openHall = null;
    }
    else if (d.up) move(d.up, -1);
    else if (d.down) move(d.down, 1);
    else if (d.edit) open = open === +d.edit ? null : +d.edit;
    else if (d.hide) {
      const it = byId(d.hide);
      if (it.hidden && shown(it.room) >= slots(it.room)) { alertIn(b, '벽이 꽉 찼어요'); return; }
      it.hidden = !it.hidden;
    } else if (d.auto) { makeMotion(byId(d.auto)); return; }
    else if (d.forTool) { const m = motion.get(+d.forTool); if (d.tool) m.tool = d.tool; if (d.size) m.size = d.size; }
    else if (d.restore) { const it = byId(d.restore), was = base.find(x => x.i === it.i); delete it.image; delete it.wall; delete it.thumb; delete it.mask; delete it.depth; delete it.fx; delete it.prompt; delete it.drift; motion.delete(it.i); if (was && !was.image) Object.assign(it, { w: was.w, h: was.h, how: was.how, hint: was.hint }); }
    else if (d.remove) {
      if (b.dataset.armed !== '1') { b.dataset.armed = '1'; b.textContent = '정말 지울까요?'; return; }
      items = items.filter(x => x.i !== +d.remove); open = null;
    } else if (d.add) {
      const i = Math.max(99, ...items.map(x => x.i), ...base.map(x => x.i)) + 1;
      // a new painting needs its picture first
      const input = document.createElement('input'); input.type = 'file'; input.accept = 'image/jpeg,image/png,image/webp';
      input.onchange = async () => {
        const file = input.files && input.files[0]; if (!file) return;
        const it = { i, room: d.add, title: '새 그림', w: 1000, h: 1000, desc: '', doc: '', how: '', hint: '', answers: ['', '', '', ''] };
        try { await putPicture(it, file); } catch (err) { alert(err.message); return; }
        items.push(it); open = i; render(); makeMotion(it);
      };
      input.click();
      return;
    } else return;
    render();
  });
  box.addEventListener('change', async e => {
    const t = e.target;
    if (t.dataset.file) {
      const it = byId(t.dataset.file), file = t.files && t.files[0];
      if (!file) return;
      try { await putPicture(it, file); } catch (err) { alert(err.message); render(); return; }
      render(); makeMotion(it); return;
    }
    if (t.dataset.lv) {
      const it = byId(t.dataset.forLv), m = motion.get(it.i);
      m.levels[t.dataset.lv] = t.value;
      await motionChanged(it, m, false);
      render(); return;
    }
    if (t.dataset.drift !== undefined) {
      const it = byId(t.dataset.drift);
      if (t.value) it.drift = t.value; else delete it.drift;
      const m = motion.get(it.i), M = await auto();
      if (!it.how.trim() || M.isAutoHow(it.how)) { const on = m?.found ? m.found.filter(k => m.levels[k] !== 'off') : []; const x = M.howFor(on, it.drift); it.how = x.how; it.hint = x.hint; }
      render(); return;
    }
    // (hall fields are kept as they are typed; no redraw here, or a click right after typing a name would land on a redrawn page)
    if (t.dataset.h) return;
    if (t.dataset.f === 'room') {
      const it = byId(t.closest('.geditor').dataset.for);
      if (!it.hidden && shown(t.value) >= slots(t.value)) { alert(rooms().find(r => r[0] === t.value)[1] + '은 벽이 꽉 찼어요. 먼저 그림을 하나 내려 주세요.'); render(); return; }
      it.room = t.value; items = items.filter(x => x !== it).concat(it); render();
    }
  });
  box.addEventListener('input', e => {
    const t = e.target, hed = t.closest('.hedit');
    if (hed) {
      const h = hallBy(hed.dataset.hall);
      if (t.dataset.h === 'name' || t.dataset.h === 'note') h[t.dataset.h] = t.value;
      if (t.dataset.h === 'motion') h.motion = t.value;
      // the name shows in the row above and in every room picker
      if (t.dataset.h === 'name') { const row = hed.previousElementSibling.querySelector('.gtext b'); if (row) row.textContent = t.value; }
      bar(); return;
    }
    if (t.dataset.prompt) { byId(t.dataset.prompt).prompt = t.value; bar(); return; }
    const ed = t.closest('.geditor'); if (!ed) return;
    const it = byId(ed.dataset.for);
    if (t.dataset.f && t.dataset.f !== 'room') it[t.dataset.f] = t.value;
    if (t.dataset.a) it.answers[+t.dataset.a] = t.value;
    bar();
  });
  // ---- the brush: paint on the preview to fix what moves ----
  let stroke = null;
  box.addEventListener('pointerdown', async e => {
    const c = e.target.closest('canvas[data-brush]'); if (!c) return;
    const it = byId(c.dataset.brush), m = motion.get(it.i); if (!m?.mask) return;
    e.preventDefault(); c.setPointerCapture?.(e.pointerId);
    stroke = { c, it, m, M: await auto() }; dab(e);
  });
  box.addEventListener('pointermove', e => { if (stroke) dab(e); });
  const endStroke = async () => { if (!stroke) return; const { it, m } = stroke; stroke = null; await motionChanged(it, m, true); render(); };
  box.addEventListener('pointerup', endStroke); box.addEventListener('pointercancel', endStroke);
  function dab(e) {
    const { c, m, M } = stroke, r = c.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width * m.w, y = (e.clientY - r.top) / r.height * m.h;
    M.brush(m.mask, m.w, m.h, x, y, Math.max(1.5, SIZES.find(s => s[0] === m.size)[2] * Math.max(m.w, m.h)), m.tool);
    drawPreview(c, m);
  }
  function alertIn(b, msg) { const old = b.textContent; b.textContent = msg; setTimeout(() => { b.textContent = old; }, 1800); }

  $('gundo').addEventListener('click', () => {
    if ($('gundo').dataset.armed !== '1') { $('gundo').dataset.armed = '1'; $('gundo').textContent = '정말 모두 되돌릴까요?'; setTimeout(() => { $('gundo').dataset.armed = ''; $('gundo').textContent = '모두 되돌리기'; }, 3000); return; }
    items = structuredClone(base); halls = structuredClone(baseHalls); pics.clear(); motion.clear(); open = null; $('gundo').dataset.armed = ''; $('gundo').textContent = '모두 되돌리기'; render();
  });
  $('gsave').addEventListener('click', async () => {
    if (busy) return;
    const bad = halls.find(h => !h.name.trim());
    if (bad) { $('gmsg').textContent = '이름이 빈 관이 있어요.'; $('gmsg').className = 'bad'; return; }
    const titles = hallChanges().concat(items.filter(it => { const b = base.find(x => x.i === it.i); return !b || JSON.stringify(b) !== JSON.stringify(it); }).map(it => it.title));
    if (busyMotion()) { $('gmsg').textContent = '그림을 읽는 중이에요. 끝나면 저장해 주세요.'; $('gmsg').className = 'bad'; return; }
    const used = new Set(items.flatMap(it => [it.image, it.wall, it.thumb, it.mask, it.depth]).filter(Boolean));
    const pictures = [...pics.entries()].filter(([p]) => used.has(p)).map(([path, v]) => ({ path, data: v.data }));
    busy = true; bar(); $('gmsg').textContent = '저장하는 중…'; $('gmsg').className = '';
    try {
      const r = await fetch('/admin/api/gallery', { method: 'PUT', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ gallery: { halls, items }, pictures, version, summary: titles.join(', ') }) });
      const g = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(g.error || '저장하지 못했어요.');
      $('gmsg').innerHTML = '저장했어요. 2~5분 뒤 사이트에 반영돼요. <a href="' + esc(g.url) + '" target="_blank" rel="noopener">GitHub에서 보기</a>';
      $('gmsg').className = 'ok';
      busy = false; await load();
    } catch (err) { $('gmsg').textContent = err.message; $('gmsg').className = 'bad'; busy = false; bar(); }
  });
  window.addEventListener('beforeunload', e => { if (loaded && changed()) { e.preventDefault(); e.returnValue = ''; } });

  window.showGallery = () => { if (!loaded) load(); };
})();
