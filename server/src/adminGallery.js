// 🖼️ The manager page's 전시장 tab: replace paintings, edit their words, hang or take down.
// Saving sends the whole list (and any new pictures) to the server, which commits it to GitHub;
// Render then redeploys, so the site shows it a few minutes later.
(() => {
  const HALL_MAX = 8;          // paintings one hall can show (shared HALL_MAX)
  const QUESTIONS = ['먼저 어디를 보면 좋을까요?', '색은 어떻게 쓰였나요?', '아이에게 설명해 주세요', '이 그림이 움직인다면?'];
  const $ = id => document.getElementById(id);
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const pad = n => String(n).padStart(2, '0');
  const box = $('gallery');

  let base = [], items = [], baseHalls = [], halls = [], version = '', canSave = false, repo = '', branch = 'main';
  const pics = new Map();     // path → { data (base64), url (preview) }
  let open = null;            // the id being edited
  let loaded = false, busy = false;

  const changed = () => JSON.stringify(items) !== JSON.stringify(base) || JSON.stringify(halls) !== JSON.stringify(baseHalls);
  /** [id, name, most paintings] for each hall, in building order */
  const rooms = () => halls.map(h => [h.id, h.name, HALL_MAX]);
  const shown = room => items.filter(x => x.room === room && !x.hidden).length;
  const slots = () => HALL_MAX;
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
      base = g.gallery.items; items = structuredClone(base); baseHalls = g.gallery.halls; halls = structuredClone(baseHalls); version = g.version; canSave = g.canSave; repo = g.repo; branch = g.branch;
      pics.clear(); open = null; loaded = true;
      render();
    } catch (e) { box.innerHTML = '<div class="err">' + esc(e.message) + '</div>'; }
  }

  function render() {
    const parts = [];
    if (!canSave) parts.push('<div class="err">지금은 <b>보기만</b> 할 수 있어요. 저장하려면 Render의 환경 변수에 <code>GITHUB_TOKEN</code>을 넣어 주세요.</div>');
    parts.push('<p class="note">저장하면 GitHub에 기록되고, 2~5분 뒤 사이트에 반영돼요. 새로 올린 그림은 빛이 은은하게 스치는 기본 움직임만 있어요 (원래 그림의 움직임은 그 그림에 맞춰 만든 것이라서요).</p>');
    for (const [room, name, max] of rooms()) {
      const list = items.filter(x => x.room === room);
      parts.push('<section class="groom"><h2>' + name + ' <small>걸린 그림 ' + shown(room) + ' / ' + max + '</small></h2>');
      parts.push(list.map(card).join('') || '<p class="empty">이 전시실에는 그림이 없어요.</p>');
      parts.push('<button class="add" data-add="' + room + '"' + (shown(room) >= max ? ' disabled title="벽이 꽉 찼어요. 다른 그림을 내리면 걸 수 있어요."' : '') + '>＋ 새 그림 걸기</button></section>');
    }
    box.innerHTML = parts.join('');
    for (const img of box.querySelectorAll('img[data-fb]')) img.addEventListener('error', () => { if (img.dataset.fb && img.src !== img.dataset.fb) img.src = img.dataset.fb; }, { once: true });
    bar();
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
      + (it.image ? '<small>바꾼 그림은 빛이 은은하게 스치는 기본 움직임만 있어요. "해 보기"가 비어 있으면 "천천히 보기"로 나와요.</small>' : '')
      + '</div>'
      + '<div class="gfields">'
      + f('title', '제목', 0, 40)
      + '<label><span>전시실</span><select data-f="room">' + rooms().map(r => '<option value="' + r[0] + '"' + (r[0] === it.room ? ' selected' : '') + '>' + r[1] + '</option>').join('') + '</select></label>'
      + f('desc', '그림 옆 짧은 설명', 2, 300)
      + f('doc', '도슨트 해설', 4, 800)
      + '<div class="two">' + f('how', '해 보기 (살아난 그림에서 할 수 있는 것)', 0, 200) + f('hint', '짧은 힌트', 0, 30) + '</div>'
      + '<details><summary>도슨트에게 물어보기 답변 4개</summary>'
      + QUESTIONS.map((q, k) => '<label><span>' + esc(q) + '</span><textarea data-a="' + k + '" rows="3" maxlength="800">' + esc(it.answers[k] ?? '') + '</textarea></label>').join('')
      + '</details></div></div>';
  }

  function bar() {
    const n = items.filter(it => { const b = base.find(x => x.i === it.i); return !b || JSON.stringify(b) !== JSON.stringify(it); }).length + base.filter(b => !items.some(x => x.i === b.i)).length;
    $('gbar').hidden = !loaded;
    const moved = !n && changed(); // only the hanging order changed
    $('gcount').textContent = n ? '바뀐 그림 ' + n + '점' : moved ? '거는 순서가 바뀌었어요' : '바뀐 내용 없음';
    $('gsave').disabled = !changed() || !canSave || busy;
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
  }

  // ---- clicks and typing ----
  box.addEventListener('click', async e => {
    const b = e.target.closest('button'); if (!b || busy) return;
    const d = b.dataset;
    if (d.up) move(d.up, -1);
    else if (d.down) move(d.down, 1);
    else if (d.edit) open = open === +d.edit ? null : +d.edit;
    else if (d.hide) {
      const it = byId(d.hide);
      if (it.hidden && shown(it.room) >= slots(it.room)) { alertIn(b, '벽이 꽉 찼어요'); return; }
      it.hidden = !it.hidden;
    } else if (d.restore) { const it = byId(d.restore), was = base.find(x => x.i === it.i); delete it.image; delete it.wall; delete it.thumb; if (was && !was.image) Object.assign(it, { w: was.w, h: was.h, how: was.how, hint: was.hint }); }
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
        items.push(it); open = i; render();
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
      try { await putPicture(it, file); } catch (err) { alert(err.message); }
      render(); return;
    }
    if (t.dataset.f === 'room') {
      const it = byId(t.closest('.geditor').dataset.for);
      if (!it.hidden && shown(t.value) >= slots(t.value)) { alert(rooms().find(r => r[0] === t.value)[1] + '은 벽이 꽉 찼어요. 먼저 그림을 하나 내려 주세요.'); render(); return; }
      it.room = t.value; items = items.filter(x => x !== it).concat(it); render();
    }
  });
  box.addEventListener('input', e => {
    const t = e.target, ed = t.closest('.geditor'); if (!ed) return;
    const it = byId(ed.dataset.for);
    if (t.dataset.f && t.dataset.f !== 'room') it[t.dataset.f] = t.value;
    if (t.dataset.a) it.answers[+t.dataset.a] = t.value;
    bar();
  });
  function alertIn(b, msg) { const old = b.textContent; b.textContent = msg; setTimeout(() => { b.textContent = old; }, 1800); }

  $('gundo').addEventListener('click', () => {
    if ($('gundo').dataset.armed !== '1') { $('gundo').dataset.armed = '1'; $('gundo').textContent = '정말 모두 되돌릴까요?'; setTimeout(() => { $('gundo').dataset.armed = ''; $('gundo').textContent = '모두 되돌리기'; }, 3000); return; }
    items = structuredClone(base); halls = structuredClone(baseHalls); pics.clear(); open = null; $('gundo').dataset.armed = ''; $('gundo').textContent = '모두 되돌리기'; render();
  });
  $('gsave').addEventListener('click', async () => {
    if (busy) return;
    const titles = items.filter(it => { const b = base.find(x => x.i === it.i); return !b || JSON.stringify(b) !== JSON.stringify(it); }).map(it => it.title);
    const used = new Set(items.flatMap(it => [it.image, it.wall, it.thumb]).filter(Boolean));
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
