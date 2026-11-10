// The room the living painting is shown in (from 「액자 밖으로」).
export const VIEWER_HTML = `
<div id="viewer" role="dialog" aria-modal="true" aria-labelledby="v-title" hidden>
  <div id="stage">
    <div id="lamp"></div>
    <div id="scene"><div id="frame"></div>
    <canvas id="gl"></canvas>
    <canvas id="fx"></canvas></div>
    <div class="vloading" id="v-loading" hidden>그림을 걸고 있어요…</div>
    <button class="ibtn" id="close" type="button" aria-label="전시실 나가기">✕</button>
    <p class="zhint" id="zhint">스크롤하거나 두 손가락으로 벌리면 확대돼요</p>
    <div class="zoombar" role="toolbar" aria-label="보기 도구">
      <button type="button" id="z-out" aria-label="축소">−</button>
      <button type="button" id="z-pct" aria-label="화면에 맞추기">100%</button>
      <button type="button" id="z-in" aria-label="확대">+</button>
      <span class="sep"></span>
      <button type="button" id="prev" aria-label="이전 작품">←</button>
      <span id="v-count"></span>
      <button type="button" id="next" aria-label="다음 작품">→</button>
    </div>
    <div class="minimap" id="minimap" hidden aria-hidden="true"><img id="mm-img" alt=""><span id="mm-box"></span></div>
  </div>
  <aside class="label">
    <div class="lab-top"><span id="v-no"></span><span id="v-room"></span></div>
    <div>
      <h3 id="v-title"></h3>
    </div>
    <p class="desc" id="v-desc"></p>
    <div class="sect"><span class="lbl">해 보기</span><span class="how" id="v-how"></span></div>
    <div class="ctl" id="v-ctl"></div>
    <div class="note" id="v-note" hidden></div>
    <div class="sect docent">
      <span class="lbl">도슨트</span>
      <p class="doc" id="v-doc"></p>
      <div id="ask" hidden>
        <span class="lbl ask-lbl">도슨트에게 물어보기</span>
        <div class="chips" id="ask-chips"></div>
        <div class="answer" id="ask-a" aria-live="polite" hidden style="margin-top:10px" title="누르면 바로 끝까지 보여요"></div>
      </div>
    </div>
  </aside>
</div>
`;
