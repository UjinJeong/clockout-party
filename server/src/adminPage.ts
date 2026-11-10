/** The manager page. Plain HTML that reads /admin/api/stats every 5 seconds. */
export const ADMIN_PAGE = `<!doctype html>
<html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>파티 관리</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Gowun+Batang:wght@700&family=IBM+Plex+Sans+KR:wght@400;500;600&display=swap">
<style>
:root{--night:#1e1519;--plate:#f1e7d3;--plate-2:#e5d7bc;--ink:#2a2024;--ink-2:#6d5f57;--gilt:#c9a25e;--wine:#8a2f3c;--sage:#5f7c69;
  --serif:"Gowun Batang",serif;--sans:"IBM Plex Sans KR","Apple SD Gothic Neo","Malgun Gothic",system-ui,sans-serif;color-scheme:light}
*{box-sizing:border-box}body{margin:0;background:var(--plate-2);color:var(--ink);font:15px/1.55 var(--sans)}
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
</style></head><body>
<header><h1>파티 관리</h1><p id="updated">불러오는 중</p></header>
<main>
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
  <section><h2>열려 있는 파티</h2><table><thead><tr><th>파티 이름</th><th>종류</th><th>인원</th><th>초대 코드</th></tr></thead><tbody id="rooms"></tbody></table></section>
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
    $('rooms').innerHTML=s.rooms.length?s.rooms.map(x=>row([esc(x.title),x.private?'<span class="badge">친구만</span>':'<span class="badge open">누구나</span>',x.clients+' / '+x.maxClients,'<code>'+esc(x.roomId)+'</code>'])).join(''):empty(4,'열린 파티가 없어요.');
    $('people').innerHTML=s.people.length?s.people.map(p=>row([esc(p.name),esc(p.room)+(p.private?' <span class="badge">친구만</span>':''),esc(p.region),mins(p.minutes)])).join(''):empty(4,'지금 파티에 있는 사람이 없어요.');
    $('recent').innerHTML=s.recent.length?s.recent.map(p=>row([esc(p.name),esc(p.room),esc(p.region),mins(p.minutes),new Date(p.leftAt).toLocaleString('ko-KR',{month:'numeric',day:'numeric',hour:'numeric',minute:'2-digit'})])).join(''):empty(5,'아직 기록이 없어요.');
    $('updated').textContent='5초마다 새로고침 · 마지막 '+new Date().toLocaleTimeString('ko-KR');
  }catch(e){$('error').textContent=e.message||'불러오지 못했어요.';$('error').hidden=false;}
}
load();setInterval(load,5000);
</script></body></html>`;
