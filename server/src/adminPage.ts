/** The manager page. Plain HTML that reads /admin/api/stats every 5 seconds. */
export const ADMIN_PAGE = `<!doctype html>
<html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>파티 관리</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Gowun+Batang:wght@700&family=IBM+Plex+Sans+KR:wght@400;500;600&display=swap">
<style>
:root{--night:#1e1519;--plate:#f1e7d3;--plate-2:#e5d7bc;--ink:#2a2024;--ink-2:#6d5f57;--gilt:#c9a25e;--wine:#8a2f3c;--sage:#5f7c69;
  --serif:"Gowun Batang",serif;--sans:"IBM Plex Sans KR","Apple SD Gothic Neo","Malgun Gothic",system-ui,sans-serif;color-scheme:light}
[hidden]{display:none!important}*{box-sizing:border-box}body{margin:0;background:var(--plate-2);color:var(--ink);font:15px/1.55 var(--sans)}
header{background:var(--night);color:var(--plate);padding:18px max(18px,env(safe-area-inset-left)) 16px;display:flex;justify-content:space-between;align-items:baseline;gap:12px;flex-wrap:wrap}
header h1{margin:0;font:700 24px/1.2 var(--serif)}header p{margin:0;font-size:13px;color:#c9b9a3}
main{max-width:1100px;margin:0 auto;padding:18px max(16px,env(safe-area-inset-left)) 40px;display:grid;gap:16px}
.row{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}
.stat{background:var(--plate);padding:14px 16px;border-bottom:2px solid var(--gilt)}
.stat b{display:block;font:700 34px/1.1 var(--serif);font-variant-numeric:tabular-nums}
.stat span{font-size:13px;color:var(--ink-2)}
.stat.live b{color:var(--wine)}
section{background:var(--plate);padding:16px 18px}
section h2{margin:0 0 10px;font:700 17px/1.3 var(--serif)}
.cols{display:grid;grid-template-columns:1fr 1fr;gap:16px}
table{width:100%;border-collapse:collapse;font-size:14px}
th{text-align:left;font-weight:500;color:var(--ink-2);font-size:12.5px;padding:4px 6px;border-bottom:1px solid #d6c7aa}
td{padding:7px 6px;border-bottom:1px solid #e3d6bd;font-variant-numeric:tabular-nums}
.badge{font-size:11.5px;padding:2px 6px;border-radius:2px;background:var(--wine);color:#fbefe0}
.badge.open{background:var(--sage)}
.bars{display:grid;gap:6px}
.bar{display:grid;grid-template-columns:120px 1fr 36px;gap:8px;align-items:center;font-size:14px}
.bar i{display:block;height:12px;background:var(--gilt);border-radius:1px}
.week{display:grid;grid-template-columns:repeat(7,1fr);gap:8px;align-items:end;height:130px;padding-top:6px}
.week div{display:flex;flex-direction:column;align-items:center;justify-content:flex-end;height:100%;gap:4px;font-size:12px;color:var(--ink-2)}
.week i{width:100%;max-width:46px;background:var(--wine);border-radius:1px 1px 0 0;min-height:2px}
.week b{color:var(--ink);font-weight:600;font-variant-numeric:tabular-nums}
.empty{color:var(--ink-2);font-size:14px;margin:4px 0}
.note{font-size:13px;color:var(--ink-2);margin:0}
a{color:var(--wine)}
.err{background:#f6d9d9;border-left:3px solid var(--wine);padding:10px 14px}
@media (max-width:760px){.row{grid-template-columns:1fr 1fr}.cols{grid-template-columns:1fr}.bar{grid-template-columns:96px 1fr 30px}}
button.danger{background:#a33a2c;color:#fff;border:0;border-radius:3px;padding:5px 10px;font:inherit;font-size:12.5px;cursor:pointer}
button.mini{background:none;border:1px solid #cdbd9e;border-radius:3px;padding:1px 6px;font:inherit;font-size:11px;cursor:pointer;color:#7a6a55}
button[data-armed="1"]{background:#e2552f;color:#fff;border-color:#e2552f}
.who{display:flex;flex-wrap:wrap;gap:4px 10px;margin-top:4px;font-size:12.5px;color:#6d5f4f}
nav.tabs{display:flex;gap:6px}nav.tabs button{background:none;border:1px solid #5a4a44;color:#c9b9a3;border-radius:3px;padding:5px 12px;font:inherit;font-size:13.5px;cursor:pointer}
nav.tabs button[aria-selected="true"]{background:var(--plate);color:var(--ink);border-color:var(--plate)}
#tab-gallery{padding-bottom:90px}
.groom h2 small{font:500 13px var(--sans);color:var(--ink-2);margin-left:6px}
.gcard{display:grid;grid-template-columns:72px 1fr auto;gap:12px;align-items:center;padding:8px 0;border-bottom:1px solid #e3d6bd}
.gcard.off{opacity:.55}.gcard img{width:72px;height:56px;object-fit:cover;background:#d9ccb2;border-radius:2px}
.gtext{min-width:0}.gtext .badge{margin-left:4px}.gtext .gdesc{display:block;font-size:13px;color:var(--ink-2);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.gbtns{display:flex;gap:4px;flex-wrap:wrap;justify-content:flex-end}.gbtns .mini{font-size:12.5px;padding:3px 8px}.gbtns .edit{background:var(--ink);color:var(--plate);border-color:var(--ink)}
.badge.gold{background:var(--gilt);color:var(--ink)}.badge.plain{background:#d6c7aa;color:var(--ink)}
.geditor{display:grid;grid-template-columns:220px 1fr;gap:16px;padding:12px;margin:6px 0 10px;background:#faf4e8;border:1px solid #e3d6bd}
.gpic{display:flex;flex-direction:column;gap:8px}.gpic img{width:100%;max-height:220px;object-fit:contain;background:#efe5d2}.gpic small{color:var(--ink-2)}
.btnlike{display:inline-block;text-align:center;background:var(--wine);color:#fff;border-radius:3px;padding:6px 10px;font-size:13px;cursor:pointer}
.gfields{display:grid;gap:8px}.gfields label{display:grid;gap:3px;font-size:13px}.gfields label span{color:var(--ink-2)}
.gfields input,.gfields textarea,.gfields select{font:inherit;font-size:14px;padding:6px 8px;border:1px solid #cdbd9e;border-radius:2px;background:#fff;width:100%}
.gfields .two{display:grid;grid-template-columns:2fr 1fr;gap:8px}.gfields details{border-top:1px dashed #d6c7aa;padding-top:6px}.gfields summary{cursor:pointer;font-size:13.5px}
button.add{margin-top:10px;background:none;border:1px dashed #b9a682;color:var(--ink);border-radius:3px;padding:7px 12px;font:inherit;font-size:13.5px;cursor:pointer}button.add:disabled{opacity:.45;cursor:default}
.danger-lite{color:#a33a2c;border-color:#d9a79f}
.gbar{position:fixed;left:0;right:0;bottom:0;background:var(--night);color:var(--plate);display:flex;gap:10px;align-items:center;justify-content:flex-end;padding:10px max(16px,env(safe-area-inset-left));flex-wrap:wrap;z-index:5}
.gbar #gcount{margin-right:auto;font-size:14px}.gbar #gmsg{font-size:13px}.gbar #gmsg.ok{color:#bfe3c4}.gbar #gmsg.bad{color:#ffb4a8}.gbar a{color:#ffd98a}
.gbar button{font:inherit;font-size:14px;border-radius:3px;padding:7px 14px;cursor:pointer;border:1px solid #6b5a52}
.gbar .save{background:var(--gilt);color:var(--ink);border-color:var(--gilt);font-weight:600}.gbar .ghost{background:none;color:var(--plate)}.gbar button:disabled{opacity:.4;cursor:default}
@media (max-width:760px){.geditor{grid-template-columns:1fr}.gcard{grid-template-columns:56px 1fr}.gbtns{grid-column:1/-1;justify-content:flex-start}.gfields .two{grid-template-columns:1fr}}
</style></head><body>
<header><h1>파티 관리</h1><nav class="tabs"><button type="button" data-tab="stats" aria-selected="true">📊 현황</button><button type="button" data-tab="gallery" aria-selected="false">🖼️ 전시장</button></nav><p id="updated">불러오는 중</p></header>
<main id="tab-gallery" hidden><div id="gallery"></div></main>
<div id="gbar" class="gbar" hidden><span id="gcount"></span><span id="gmsg"></span><button type="button" id="gundo" class="ghost">모두 되돌리기</button><button type="button" id="gsave" class="save">저장하기</button></div>
<main id="tab-stats">
  <div id="error" class="err" hidden></div>
  <div class="row">
    <div class="stat live"><b id="online">0</b><span>지금 접속 중</span></div>
    <div class="stat"><b id="visits">0</b><span>오늘 들어온 횟수</span></div>
    <div class="stat"><b id="peak">0</b><span>오늘 가장 많았던 동시 접속</span></div>
    <div class="stat"><b id="avg">0분</b><span>오늘 평균 머문 시간</span></div>
  </div>
  <div class="cols">
    <section><h2>지금 어디서 들어와 있나요</h2><div id="regions" class="bars"></div></section>
    <section><h2>최근 7일 방문</h2><div id="week" class="week"></div></section>
  </div>
  <section><h2>열려 있는 파티</h2><table><thead><tr><th>파티 이름</th><th>종류</th><th>인원</th><th>초대 코드</th><th></th></tr></thead><tbody id="rooms"></tbody></table></section>
  <section><h2>지금 파티에 있는 사람</h2><table><thead><tr><th>이름표</th><th>파티</th><th>지역</th><th>머문 시간</th></tr></thead><tbody id="people"></tbody></table></section>
  <section><h2>최근에 나간 사람</h2><table><thead><tr><th>이름표</th><th>파티</th><th>지역</th><th>머문 시간</th><th>나간 시각</th></tr></thead><tbody id="recent"></tbody></table></section>
  <p class="note">지역은 방문자의 IP가 아니라 기기의 시간대 설정으로 알아낸 대략적인 곳이에요. 날짜는 <span id="tz"></span> 기준이에요. 방과 연결을 더 자세히 보려면 <a href="/admin/monitor/">Colyseus 모니터</a>를 여세요.</p>
</main>
<script>
const $=id=>document.getElementById(id);
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const row=(cells)=>'<tr>'+cells.map(c=>'<td>'+c+'</td>').join('')+'</tr>';
const empty=(n,msg)=>'<tr><td colspan="'+n+'" class="empty">'+msg+'</td></tr>';
const mins=m=>m<60?m+'분':Math.floor(m/60)+'시간 '+(m%60)+'분';
async function load(){
  try{
    const r=await fetch('/admin/api/stats',{cache:'no-store'});
    if(!r.ok)throw new Error(r.status===401?'비밀번호가 맞지 않아요. 새로고침해서 다시 입력해 주세요.':'서버가 응답하지 않아요 ('+r.status+').');
    const s=await r.json();$('error').hidden=true;
    $('online').textContent=s.online;$('visits').textContent=s.today.visits;$('peak').textContent=s.today.peak;$('avg').textContent=mins(s.today.avgMinutes);
    $('tz').textContent=s.reportTz;
    const max=Math.max(1,...s.byRegion.map(x=>x.online));
    $('regions').innerHTML=s.byRegion.length?s.byRegion.map(x=>'<div class="bar"><span>'+esc(x.country===x.city?x.country:x.country+' '+x.city)+'</span><i style="width:'+(x.online/max*100)+'%"></i><b>'+x.online+'</b></div>').join(''):'<p class="empty">지금 들어와 있는 사람이 없어요.</p>';
    const wmax=Math.max(1,...s.week.map(d=>d.visits));
    $('week').innerHTML=s.week.map(d=>'<div><b>'+d.visits+'</b><i style="height:'+(d.visits/wmax*90)+'px"></i><span>'+d.day+'</span></div>').join('');
    $('rooms').innerHTML=s.rooms.length?s.rooms.map(x=>row([({gallery:'🖼️ ',home:'🏠 ',pool:'🏖️ '}[x.theme]||'')+esc(x.title)
      +(x.people.length?'<div class="who">'+x.people.map(p=>'<span>'+(p.host?'👑 ':'')+esc(p.name)+(p.away?' 💤':'')+' <button class="mini" data-kick="'+esc(x.roomId)+'/'+esc(p.id)+'" title="이 사람을 파티에서 내보내요">내보내기</button></span>').join('')+'</div>':''),
      x.private?'<span class="badge">친구만</span>':'<span class="badge open">누구나</span>',x.clients+' / '+x.maxClients,'<code>'+esc(x.roomId)+'</code>',
      '<button class="danger" data-close="'+esc(x.roomId)+'">방 닫기</button>'])).join(''):empty(5,'열린 파티가 없어요.');
    $('people').innerHTML=s.people.length?s.people.map(p=>row([esc(p.name),esc(p.room)+(p.private?' <span class="badge">친구만</span>':''),esc(p.region),mins(p.minutes)])).join(''):empty(4,'지금 파티에 있는 사람이 없어요.');
    $('recent').innerHTML=s.recent.length?s.recent.map(p=>row([esc(p.name),esc(p.room),esc(p.region),mins(p.minutes),new Date(p.leftAt).toLocaleString('ko-KR',{month:'numeric',day:'numeric',hour:'numeric',minute:'2-digit'})])).join(''):empty(5,'아직 기록이 없어요.');
    $('updated').textContent='5초마다 새로고침 · 마지막 '+new Date().toLocaleTimeString('ko-KR');
  }catch(e){$('error').textContent=e.message||'불러오지 못했어요.';$('error').hidden=false;}
}
// close a party / walk someone out (asks once, right on the button: no pop-ups)
document.addEventListener('click',async e=>{
  const b=e.target.closest('button[data-close],button[data-kick]');if(!b)return;
  if(b.dataset.armed!=='1'){b.dataset.armed='1';b.dataset.label=b.textContent;b.textContent=b.dataset.close?'정말 닫을까요?':'정말요?';setTimeout(()=>{if(b.isConnected){b.dataset.armed='';b.textContent=b.dataset.label;}},3000);return;}
  b.disabled=true;
  const url=b.dataset.close?'/admin/api/rooms/'+encodeURIComponent(b.dataset.close)+'/close':'/admin/api/rooms/'+b.dataset.kick.split('/').map(encodeURIComponent).join('/kick/');
  const r=await fetch(url,{method:'POST'}).catch(()=>null);
  b.textContent=r&&r.ok?'처리했어요':'실패했어요';setTimeout(load,1200);
});
load();setInterval(load,5000);
// tabs: 현황 / 전시장 (the address remembers which: /admin#gallery)
function tab(name){for(const b of document.querySelectorAll('.tabs button'))b.setAttribute('aria-selected',String(b.dataset.tab===name));
  $('tab-stats').hidden=name!=='stats';$('tab-gallery').hidden=name!=='gallery';$('gbar').hidden=name!=='gallery'||$('gbar').dataset.ready!=='1';
  if(name==='gallery'&&window.showGallery)window.showGallery();history.replaceState(null,'',name==='gallery'?'#gallery':'#');}
document.querySelector('.tabs').addEventListener('click',e=>{const b=e.target.closest('button[data-tab]');if(b)tab(b.dataset.tab);});
</script>
<script src="/admin/gallery.js"></script>
<script>new MutationObserver(()=>{$('gbar').dataset.ready='1';}).observe($('gallery'),{childList:true});tab(location.hash==='#gallery'?'gallery':'stats');</script></body></html>`;
