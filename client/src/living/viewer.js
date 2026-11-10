// @ts-nocheck
/*
 * 살아 움직이는 그림 — the living-painting viewer from 정유진's online exhibition
 * 「액자 밖으로」, brought into the party almost unchanged. Each painting has its own
 * behaviour (wind, butterflies, koi, day and night...) drawn with WebGL plus an
 * effects canvas. Assets live in public/a/.
 */
import { VIEWER_HTML } from './markup';
import './viewer.css';


let made = null;

/** Builds the viewer once and returns the same instance afterwards. */
export function createLivingViewer(opts = {}) {
  if (made) return made;
  document.body.insertAdjacentHTML('beforeend', VIEWER_HTML);
const REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- catalogue ---------- */
const ROOMS = [
  {id:'garden', name:'정원관', note:'바람과 숨결이 지나가는 방. 꽃과 나비, 씨앗이 액자 밖으로 날아갑니다.'},
  {id:'face', name:'얼굴관', note:'정면을 바라보는 얼굴들. 시선과 숨, 빛이 관람객에게 반응합니다.'},
  {id:'toy', name:'장난감관', note:'유리구와 가챠, 곰 인형 더미. 흔들고 누르면 쏟아집니다.'},
  {id:'pond', name:'연못관', note:'먹과 금박, 얼음 속 물고기들. 물결이 일고 빛이 스칩니다.'},
];
const D = (o)=>Object.assign({flow:0,flowScale:3,flowSpeed:.6,flowDir:[0,0],sway:0,swaySpeed:1.2,swayFreq:6,swayDir:[1,0],swayTop:1,
  shimmer:0,pulse:0,breath:0,breathC:[.5,.5],para:0,look:null,ripple:0,ripMask:0,glow:0,stream:0,gustK:.0,rain:0},o);
const ART = [
 {i:17,room:'garden',title:'민들레와 발',w:1800,h:1343,img:'a/dl_bald.jpg',kind:'dandelion',
  desc:'거대한 발 아래 핀 민들레. 솜털 공에서 새 홀씨가 하나씩 돋아나 바람을 타고 액자 밖으로 날아갑니다.',
  how:'그림을 꾹 누르고 있으면 그쪽에서 바람이 불어 홀씨가 한꺼번에 날아올라요. 길게 누를수록 세게 붑니다.',
  hint:'꾹 눌러서 후~ 불기', fx:D({sway:.0025,swayFreq:3,swaySpeed:1.1,gustK:1})},
 {i:1,room:'garden',title:'해바라기 밭',w:1400,h:1007,kind:'sunflower',
  desc:'바람이 지날 때마다 꽃과 잎이 함께 흔들리고 잎사귀가 바스락거리며, 하늘은 낮에서 노을, 밤, 새벽으로 바뀝니다. 밤에는 꽃가루가 반딧불처럼 빛나요.',
  how:'그림을 누르면 시간이 한 단계 흘러가요. 커서를 빠르게 휘저으면 바람이 불어요.',hint:'낮과 밤이 바뀌어요',
  fx:D({sway:.006,swaySpeed:1.6,swayFreq:6,swayTop:.45,gustK:1})},
 {i:2,room:'garden',title:'튤립을 든 고릴라',w:1400,h:1089,img:'a/b2_bald.jpg',kind:'butterflies',
  desc:'고릴라가 튤립을 내려다보는 사이, 나비들이 그림 밖으로 날아오릅니다.',
  how:'나비를 건드리거나 그림을 누르면 날아올라요. 잠시 뒤 제자리로 돌아와 앉아요.',hint:'나비를 건드려 보기',
  fx:D({sway:.0028,swayTop:0,swayFreq:9,swaySpeed:1.4})},
 {i:5,room:'garden',title:'세 마리 플라밍고',w:1088,h:1400,kind:'flamingo',
  desc:'검은 물 위 플라밍고. 수면이 출렁이며 물그림자가 흔들리고 잔물결에 빛이 반짝여요. 바람이 지나가면 대나무가 휘청이고, 잎이 떨어져 물 위에 떠다니며, 깃털이 부풀어요.',
  how:'물을 누르면 파문이 퍼져요. 「비 내리기」를 누르면 수면에 빗방울이 떨어져요.',hint:'바람, 낙엽, 비',
  fx:D({flow:.006,flowScale:4,flowSpeed:.8,flowDir:[1.2,0],sway:.004,swayTop:0,swayFreq:10,ripple:.008,ripMask:1,gustK:1.3})},
 {i:15,room:'garden',title:'녹아내리는 크레파스',w:1400,h:1061,kind:'wax',
  desc:'위에 붙은 크레파스 끝이 말랑하게 녹아 방울로 부풀고, 떨어져 화면을 타고 흘러내립니다.',
  how:'커서를 크레파스 가까이 대면 그 자리가 빨리 녹아요. 누르면 한꺼번에 녹아내려요.',hint:'대면 크레파스가 녹아요',
  fx:D({stream:.0055,shimmer:.25})},

 {i:0,room:'face',title:'노란 방의 침팬지',w:1400,h:1102,kind:'chimp',
  desc:'얼굴은 그린 그대로 두고 방이 움직여요. 구겨진 종이 주름 위로 빛이 지나가고, 털끝이 살랑이고, 노란 방이 팝아트처럼 다른 색으로 바뀝니다.',
  how:'커서가 조명이에요. 종이 주름에 빛이 비치는 걸 보세요. 누르면 그 자리에서부터 배경색이 바뀌어요.',hint:'누르면 배경색이 바뀌어요',
  fx:D({flow:.0015,flowScale:2,flowSpeed:.5,para:.02,breath:.006,breathC:[.5,1]})},
 {i:4,room:'face',title:'네온 고릴라',w:1392,h:1400,kind:'sparks',
  desc:'검은 바탕에 형광 선으로 그린 얼굴. 선들이 맥박처럼 빛납니다.',
  how:'커서가 있는 곳에서 빛의 파동이 퍼지고 불꽃이 튀어요.',hint:'빛의 파동',
  fx:D({flow:.004,flowScale:3,pulse:.6,breath:.006,breathC:[.5,.6]})},
 {i:6,room:'face',title:'먹 고릴라',w:1400,h:1391,kind:'splat',
  desc:'굵은 먹선의 얼굴 뒤로 물감이 흘러갑니다. 어두운 전시실, 커서가 조명이에요.',
  how:'커서로 얼굴을 비춰 보세요. 누르면 물감이 튀어요.',hint:'커서가 조명',
  fx:D({flow:.007,flowScale:2.5,flowSpeed:.45,breath:.007,breathC:[.5,.55],glow:1})},
 {i:7,room:'face',title:'눈',w:1400,h:1009,kind:'eye',
  desc:'오일파스텔로 그린 커다란 눈. 이 눈은 관람객을 따라봅니다.',
  how:'커서를 움직이면 눈동자가 따라와요. 누르고 있으면 동공이 커져요.',hint:'눈동자가 따라봐요',
  fx:D({flow:.003,flowScale:3,flowSpeed:.5,shimmer:.3,look:[.43,.44,.2]})},

 {i:8,room:'toy',title:'Got cha',w:1400,h:1211,kind:'gumballs',
  desc:'곰 탈을 쓴 아이와 가챠 기계. 오늘의 캡슐이 쏟아집니다.',
  how:'누를 때마다 껌볼이 액자 밖으로 쏟아져 바닥에 튕겨요.',hint:'누르면 쏟아져요',
  fx:D({shimmer:.5,sway:.002,swayDir:[0,1],swayFreq:14,swaySpeed:3,swayTop:0})},
 {i:3,room:'toy',title:'깨진 스노우볼',w:1111,h:1400,kind:'globe',
  desc:'금이 간 스노우볼 안에서 홀로그램 조각이 떠다닙니다.',
  how:'그림을 잡고 흔들듯 드래그하면 조각이 휘몰아쳐요.',hint:'드래그로 흔들기',
  fx:D({flow:.0022,flowScale:3,shimmer:.6})},
 {i:16,room:'toy',title:'곰 인형 더미',w:1201,h:1400,kind:'hearts',
  desc:'금빛 바탕 위에 쌓인 곰 인형들. 들썩이며 하트를 피워 올려요.',
  how:'누르면 그 자리에서 하트와 별이 터져요.',hint:'누르면 하트',
  fx:D({shimmer:.55,sway:.0025,swayDir:[0,1],swayFreq:7,swaySpeed:2,swayTop:0})},

 {i:9,room:'pond',title:'둥근 연못',w:1400,h:1400,kind:'pond',
  desc:'수십 마리 잉어가 모인 둥근 연못. 물빛이 일렁이고 가끔 빗방울이 떨어져요.',
  how:'연못을 누르면 파문이 퍼져요.',hint:'눌러서 파문',
  fx:D({flow:.004,flowScale:5,flowSpeed:.7,sway:.003,swayDir:[.7,.7],swayFreq:14,swayTop:0,shimmer:.35,ripple:.009,ripMask:1,rain:2.6})},
 {i:18,room:'pond',title:'먹빛 메기',w:1400,h:1391,kind:'ink',
  desc:'마름모 한지 위의 먹 메기. 먹이 물처럼 번지고 은빛 수염이 빛납니다.',
  how:'종이를 누르면 물결이 퍼져요. 커서를 대면 수염에 빛이 스쳐요.',hint:'눌러서 물결',
  fx:D({flow:.005,flowScale:3,flowSpeed:.5,sway:.004,swayDir:[0,1],swayFreq:9,swaySpeed:1.6,swayTop:0,shimmer:.8,ripple:.008,ripMask:1})},
 {i:10,room:'pond',title:'금빛 잉어 I',w:808,h:1400,kind:'koi',img:'a/k10_bald.jpg',dark:1,
  desc:'대리석 같은 검은 바탕 위 금박 잉어 두 마리. 각자 몸을 물결치며 헤엄치다 액자 밖으로 나갔다 돌아옵니다.',
  how:'두 마리가 따로 헤엄쳐요. 가끔 액자 아래로 빠져나갔다가 위에서 다시 들어와요. 잉어를 누르면 바로 헤엄쳐 나가요.',hint:'두 마리가 따로 헤엄쳐요',
  fx:D({flow:.0015,ripple:.004})},
 {i:12,room:'pond',title:'금빛 잉어 II',w:1400,h:1386,kind:'koi',img:'a/k12_bald.jpg',dark:1,
  desc:'구긴 종이 결 위를 헤엄치는 금박 잉어. 잉어가 꼬리를 흔들며 종이 위를 천천히 한 바퀴 돌아요.',
  how:'제자리에서 둥글게 돌다가, 가끔 액자 밖 벽으로 크게 한 바퀴 헤엄쳐 나갔다 돌아와요. 누르면 바로 나가요.',hint:'액자 밖으로 헤엄쳐요',
  fx:D({flow:.0015,ripple:.005,ripMask:0})},
 {i:13,room:'pond',title:'금빛 잉어 III',w:1389,h:1400,kind:'koi',img:'a/k13_bald.jpg',
  desc:'연둣빛 종이 위의 금박 잉어. 꼬리를 흔들며 종이 위를 둥글게 돌아요.',
  how:'제자리에서 둥글게 돌다가, 가끔 액자 밖 벽으로 크게 한 바퀴 헤엄쳐 나갔다 돌아와요. 누르면 바로 나가요.',hint:'액자 밖으로 헤엄쳐요',
  fx:D({flow:.003,ripple:.005,ripMask:1})},
 {i:11,room:'pond',title:'꿈꾸는 잉어',w:889,h:1400,kind:'bubbles',
  desc:'번진 색 속을 도는 하얀 잉어. 화면 전체가 물속처럼 흔들려요.',
  how:'누르면 물방울이 터지고 파문이 퍼져요.',hint:'누르면 물방울',
  fx:D({flow:.007,flowScale:2.5,flowSpeed:.6,sway:.004,swayDir:[1,.3],swayFreq:9,swayTop:0,shimmer:.2,ripple:.008})},
 {i:14,room:'pond',title:'녹는 얼음',w:1400,h:1189,kind:'ice',
  desc:'얼음에 갇힌 물고기. 얼음이 녹아 물방울이 웅덩이로 떨어집니다.',
  how:'커서를 얼음 가까이 대면 더 빨리 녹아요.',hint:'가까이 대면 녹아요',
  fx:D({flow:.003,flowScale:6,flowSpeed:.7,shimmer:.45,ripple:.004,ripMask:1})},
];
ART.forEach((a,k)=>{a.k=k;a.img=a.img||`a/a${String(a.i).padStart(2,'0')}.jpg`;a.thumb=`a/t${String(a.i).padStart(2,'0')}.jpg`;a.mask=`a/m${String(a.i).padStart(2,'0')}.png`;});

/* ---------- viewer DOM ---------- */
const $=id=>document.getElementById(id);
const viewer=$('viewer'),stage=$('stage'),scene=$('scene'),frame=$('frame'),glc=$('gl'),fxc=$('fx'),lamp=$('lamp');
const ctx=fxc.getContext('2d');

/* ---------- WebGL ---------- */
const gl=glc.getContext('webgl',{premultipliedAlpha:false,antialias:false,preserveDrawingBuffer:false});
const VS=`attribute vec2 p;varying vec2 vUv;void main(){vUv=vec2(p.x*.5+.5,.5-p.y*.5);gl_Position=vec4(p,0.,1.);}`;
const FS=`precision highp float;uniform sampler2D uDepth;uniform vec2 uPar;uniform vec4 uRect;uniform float uH,uDpr,uZ,uNight,uDusk,uSky,uBlink,uHaze;uniform vec4 uEyeA,uEyeB,uMouth;uniform float uTilt,uNod,uRuffle,uPaper,uWater;uniform vec3 uPopA,uPopB;uniform vec4 uWipe;
uniform sampler2D uImg,uMask;uniform float uT,uAsp,uIn;uniform vec2 uMouse;uniform vec4 uRip[8];
uniform float uFlow,uFlowScale,uFlowSpeed,uFlowBoost;uniform vec2 uFlowDir;
uniform float uSway,uSwaySpeed,uSwayFreq,uSwayTop,uGust;uniform vec2 uSwayDir;
uniform float uShimmer,uPulse,uBreath,uPara,uRipMask,uGlow,uStream,uDilate;uniform vec2 uBreathC,uLookOff;uniform vec4 uLook;
float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
void main(){
 vec2 vUv=(vec2(gl_FragCoord.x,uH-gl_FragCoord.y)/uDpr-uRect.xy)/uRect.zw;
 float outside=step(vUv.x,0.)+step(1.,vUv.x)+step(vUv.y,0.)+step(1.,vUv.y);
 if(vUv.x<-.12||vUv.y<-.12||vUv.x>1.12||vUv.y>1.12){gl_FragColor=vec4(0.);return;}
 vec2 puv=vUv;float dep=0.;
 for(int k=0;k<4;k++){dep=texture2D(uDepth,clamp(puv,0.,1.)).r;puv=vUv-uPar*(dep-.3);}
 float oa=1.;
 if(outside>0.){if(puv.x<0.||puv.y<0.||puv.x>1.||puv.y>1.){gl_FragColor=vec4(0.);return;}oa=smoothstep(.6,.72,dep);if(oa<=0.){gl_FragColor=vec4(0.);return;}}
 vec2 uv=puv; vec4 m0=texture2D(uMask,uv);
 uv-=(uMouse-.5)*uPara*(.3+.7*m0.g)*uIn;
 uv=uBreathC+(uv-uBreathC)*(1.-uBreath*m0.g*(.5+.5*sin(uT*1.25)));
 if(uLook.z>0.){vec2 d=(uv-uLook.xy)*vec2(uAsp,1.);float l=length(d);
  uv-=uLookOff*smoothstep(uLook.z,uLook.z*.3,l);
  uv=uLook.xy+(uv-uLook.xy)*(1.-uDilate*smoothstep(uLook.z*.5,0.,l));}
 if(uTilt!=0.||uNod>0.){vec2 pv=vec2(.47,.9);vec2 d=(uv-pv)*vec2(uAsp,1.);float r=length(d);float f=(1.-smoothstep(.45,.7,r))*smoothstep(.995,.84,vUv.y)*smoothstep(.005,.08,vUv.x)*smoothstep(.995,.92,vUv.x);float a=-uTilt*f;
   d=vec2(d.x*cos(a)-d.y*sin(a),d.x*sin(a)+d.y*cos(a));uv=pv+d/vec2(uAsp,1.);uv.y-=uNod*f*smoothstep(.95,.35,vUv.y);}
 vec4 m=texture2D(uMask,uv);
 float wdep=0.,wph=0.;
 if(uWater>0.){wdep=m.r*smoothstep(.55,.8,vUv.y);wph=uv.y*150.-uT*2.3+sin(uv.x*8.+uT*.6)*1.6;
  uv.x+=(sin(wph)*.0045+sin(uv.y*47.-uT*1.3+uv.x*5.)*.003)*wdep*uWater;uv.y+=sin(uv.y*62.-uT*1.5)*.0022*wdep*uWater;}
 if(uRuffle>0.){uv+=vec2(sin(uv.y*95.+uT*7.+sin(uv.x*41.)*2.),cos(uv.x*83.-uT*6.))*.0016*uRuffle*m.b;}
 float tt=uT*uFlowSpeed; vec2 p=uv*uFlowScale*vec2(uAsp,1.);
 vec2 fl=vec2(sin(p.y*2.7+tt)+.6*sin(p.x*1.9+p.y*3.3-tt*.8),cos(p.x*2.3-tt*.9)+.6*sin(p.y*1.7-p.x*2.9+tt*.7));
 fl+=uFlowDir*sin(p.x*5.+p.y*2.-tt*1.3);
 uv+=fl*(uFlow+uFlowBoost)*m.r*.5;
 if(uStream>0.){float c=.5*sin(uv.x*120.)+.5*sin(uv.x*47.+1.3);uv.y-=uStream*m.r*(.5+.5*sin(uv.y*18.-uT*1.6+c*3.))*(.6+.4*c);}
 float w=mix(1.,clamp(1.-vUv.y,0.,1.),uSwayTop);
 float s=sin(uT*uSwaySpeed+uv.x*uSwayFreq+uv.y*uSwayFreq*.5)*uSway+uGust*(.65+.35*sin(uT*6.+uv.y*18.));
 uv+=uSwayDir*s*m.g*w;
 float rm=mix(1.,m.r,uRipMask);
 for(int i=0;i<8;i++){vec4 r=uRip[i];float age=uT-r.z;if(r.w>0.&&age>0.&&age<5.){
  vec2 d=(uv-r.xy)*vec2(uAsp,1.);float l=length(d)+1e-4;float R=age*.2;
  float g=exp(-pow((l-R)*10.,2.));float wv=sin((l-R)*75.)*g*exp(-age*.85);
  uv+=(d/l)*vec2(1./uAsp,1.)*wv*r.w*rm;}}
 uv=vUv+(uv-vUv)/mix(1.,uZ,.8);
 float gap=0.,gdy=0.;
 if(uMouth.w>0.){float dx=(uv.x-uMouth.x)/uMouth.z;float fx=clamp(1.-dx*dx,0.,1.);float o=uMouth.w*fx;float up=o*.25;float dy=uv.y-uMouth.y;
  if(dy>-up&&dy<o){gap=smoothstep(-up,-up+.002,dy)*smoothstep(o,o-.002,dy)*smoothstep(0.,.25,fx);gdy=(dy+up)/(o+up+1e-5);}
  if(dy>=o)uv.y-=o*(1.-smoothstep(o,.09,dy));else if(dy<=-up)uv.y+=up*(1.-smoothstep(up,.05,-dy));}
 if(uHaze>0.){uv.x+=sin(uv.y*260.+uT*7.)*.0011*uHaze*m.b;uv.y-=.005*uHaze*m.b*smoothstep(.07,.15,vUv.y);}
 vec4 c=texture2D(uImg,clamp(uv,.001,.999));
 if(uBlink>0.){for(int k=0;k<2;k++){vec4 E=k==0?uEyeA:uEyeB;vec2 n=(uv-E.xy)/E.zw;float r=length(n);
   float edge=-1.15+2.3*uBlink+.22*n.x*n.x;float cov=smoothstep(edge+.06,edge-.06,n.y)*(1.-smoothstep(.95,1.15,r));
   if(cov>0.){vec2 su=vec2(uv.x,E.y-E.w*1.35-(edge-n.y)*E.w*.3);vec3 lid=texture2D(uImg,su).rgb*.82;
     float lash=exp(-pow((n.y-edge)*9.,2.))*(1.-smoothstep(.8,1.05,r));c.rgb=mix(c.rgb,lid,cov);c.rgb=mix(c.rgb,vec3(.07,.05,.05),lash*.85*uBlink);}}}
 if(uWater>0.&&wdep>0.){float gl=pow(max(0.,sin(wph*1.5+sin(uv.x*31.-uT*.8)*2.5)),60.)*smoothstep(.55,.95,sin(uv.x*11.+uT*.5+uv.y*17.)*sin(uv.x*5.-uv.y*9.+uT*.33))*step(.55,hash(floor(vec2(uv.x*40.,wph*.32))));
  c.rgb*=1.+.09*sin(uv.y*88.-uT*1.8)*wdep*uWater;c.rgb+=vec3(1.,.84,.92)*gl*.45*wdep*uWater;}
 if(uPaper>0.){float e=1./1400.;float l0=dot(texture2D(uImg,uv+vec2(e,0.)).rgb,vec3(.3,.59,.11))-dot(texture2D(uImg,uv-vec2(e,0.)).rgb,vec3(.3,.59,.11));
  float l1=dot(texture2D(uImg,uv+vec2(0.,e)).rgb,vec3(.3,.59,.11))-dot(texture2D(uImg,uv-vec2(0.,e)).rgb,vec3(.3,.59,.11));
  vec3 nrm=normalize(vec3(-l0*7.,-l1*7.,1.));vec2 lp=mix(vec2(.5+.45*cos(uT*.25),.2+.15*sin(uT*.31)),uMouse,uIn);vec3 L=normalize(vec3((lp-uv)*vec2(uAsp,1.),.45));
  float sh=dot(nrm,L)-L.z;float bg=m.r;
  float lum=dot(c.rgb,vec3(.3,.59,.11))/.80;
  vec3 ca=uPopA.x<0.?c.rgb:uPopA*lum,cb=uPopB.x<0.?c.rgb:uPopB*lum;float inW=1.-smoothstep(uWipe.z-.03,uWipe.z,length((vUv-uWipe.xy)*vec2(uAsp,1.)));
  vec3 pc=mix(ca,cb,inW*step(.001,uWipe.z));c.rgb=mix(c.rgb,pc,bg);
  c.rgb*=1.+bg*uPaper*(sh*2.2+.12*exp(-pow(length((uv-lp)*vec2(uAsp,1.)),2.)*6.));}
 if(gap>0.){vec3 inner=mix(vec3(.12,.04,.05),vec3(.6,.25,.3),smoothstep(.45,1.,gdy));c.rgb=mix(c.rgb,inner,gap);}
 if(uShimmer>0.){vec2 dir=normalize(vec2(1.,.55));float ph=mix(mod(uT*.2,1.9)-.4,dot(uMouse,dir),uIn);
  float band=exp(-pow((dot(uv,dir)-ph)*7.,2.));float lum=dot(c.rgb,vec3(.3,.59,.11));
  float sp=step(.993,hash(floor(uv*vec2(uAsp,1.)*240.*uZ)+floor(uT*4.)));
  c.rgb+=m.b*uShimmer*(band*(.3+.7*lum)*vec3(1.,.9,.66)+sp*.55);}
 if(uPulse>0.){float dm=length((uv-uMouse)*vec2(uAsp,1.));float wv=.5+.5*sin(uT*3.2-dm*16.);c.rgb*=1.+m.b*uPulse*(wv-.25);}
 if(uGlow>0.){float dm=length((vUv-uMouse)*vec2(uAsp,1.));float sp=exp(-dm*dm*6.);c.rgb*=mix(1.,.55+.8*sp,uGlow*uIn);}
 if(uSky>0.){float lum=dot(c.rgb,vec3(.3,.59,.11));float sky=m.r;
  vec3 dusk=mix(vec3(1.,.66,.42),vec3(.93,.42,.45),clamp(vUv.y*1.6,0.,1.));
  vec3 night=mix(vec3(.04,.06,.16),vec3(.13,.13,.27),clamp(vUv.y*1.5,0.,1.));
  vec3 col=c.rgb;
  col=mix(col,col*mix(vec3(1.),vec3(1.12,.86,.7),1.),uDusk*.6);
  col=mix(col,dusk*(.55+.5*lum),uDusk*sky*.75);
  col=mix(col,col*vec3(.3,.36,.6),uNight*.88);
  col=mix(col,night+lum*.05,uNight*sky*.92);
  c.rgb=col;}
 {float e=1./480.;float ddx=texture2D(uDepth,clamp(uv+vec2(e,0.),0.,1.)).r-texture2D(uDepth,clamp(uv-vec2(e,0.),0.,1.)).r;
  float ddy=texture2D(uDepth,clamp(uv+vec2(0.,e),0.,1.)).r-texture2D(uDepth,clamp(uv-vec2(0.,e),0.,1.)).r;
  vec2 L=normalize(vec2(-.6,-.8)-uPar*18.);float lit=(ddx*L.x+ddy*L.y)*-9.;
  c.rgb*=1.+clamp(lit,-.22,.28)*smoothstep(.2,.5,dep);
  c.rgb*=mix(.9,1.04,smoothstep(.0,.6,dep));}
 gl_FragColor=vec4(c.rgb,oa);
}`;
let prog,U={},texImg,texMask,texDepth;
function initGL(){
  if(!gl) return false;
  const sh=(t,src)=>{const s=gl.createShader(t);gl.shaderSource(s,src);gl.compileShader(s);if(!gl.getShaderParameter(s,gl.COMPILE_STATUS))throw gl.getShaderInfoLog(s);return s;};
  prog=gl.createProgram();gl.attachShader(prog,sh(gl.VERTEX_SHADER,VS));gl.attachShader(prog,sh(gl.FRAGMENT_SHADER,FS));gl.linkProgram(prog);gl.useProgram(prog);
  const b=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,b);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),gl.STATIC_DRAW);
  const loc=gl.getAttribLocation(prog,'p');gl.enableVertexAttribArray(loc);gl.vertexAttribPointer(loc,2,gl.FLOAT,false,0,0);
  'uDepth uPar uRect uH uDpr uZ uNight uDusk uSky uBlink uHaze uEyeA uEyeB uMouth uTilt uNod uRuffle uWater uPaper uPopA uPopB uWipe uImg uMask uT uAsp uIn uMouse uRip uFlow uFlowScale uFlowSpeed uFlowBoost uFlowDir uSway uSwaySpeed uSwayFreq uSwayTop uGust uSwayDir uShimmer uPulse uBreath uPara uRipMask uGlow uStream uDilate uBreathC uLookOff uLook'
    .split(' ').forEach(n=>U[n]=gl.getUniformLocation(prog,n==='uRip'?'uRip[0]':n));
  const mk=()=>{const t=gl.createTexture();gl.bindTexture(gl.TEXTURE_2D,t);
    [[gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE],[gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE],[gl.TEXTURE_MIN_FILTER,gl.LINEAR],[gl.TEXTURE_MAG_FILTER,gl.LINEAR]].forEach(([k,v])=>gl.texParameteri(gl.TEXTURE_2D,k,v));return t;};
  texImg=mk();texMask=mk();texDepth=mk();
  gl.uniform1i(U.uImg,0);gl.uniform1i(U.uMask,1);gl.uniform1i(U.uDepth,2);
  return true;
}
let glOK=false; try{glOK=initGL();}catch(e){console.warn(e);glOK=false;}
function upload(tex,unit,img){gl.activeTexture(gl.TEXTURE0+unit);gl.bindTexture(gl.TEXTURE_2D,tex);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGB,gl.RGB,gl.UNSIGNED_BYTE,img);}

/* ---------- assets ---------- */
const cache={};
function loadImg(src){if(cache[src])return cache[src];const p=new Promise((res,rej)=>{const im=new Image();im.decoding='async';im.onload=()=>res(im);im.onerror=rej;im.src=src;});cache[src]=p;return p;}
const DL={W:1800,H:1343,c:[908,806],R:185,puff:[717,616,382,381],seeds:[
 {box:[1316,128,121,90],a:[1333,205],p:[1415,150]},{box:[1401,193,129,48],a:[1420,232],p:[1508,215]},
 {box:[1478,156,44,127],a:[1502,265],p:[1500,178]},{box:[1364,246,136,59],a:[1383,295],p:[1478,268]},
 {box:[1144,461,130,51],a:[1163,503],p:[1252,483]},{box:[1014,546,54,112],a:[1025,640],p:[1046,568]},
 {box:[1054,538,63,115],a:[1066,635],p:[1095,560]},{box:[1054,556,116,85],a:[1072,628],p:[1148,578]}]};
const BF={W:1400,H:1089,flies:[[1098,25,147,142],[852,123,201,232],[852,280,168,122]]};

/* ---------- engine state ---------- */
const S={par:[0,0],art:null,t:0,last:0,run:false,mouse:{u:.5,v:.5},prev:null,inside:0,hover:0,down:false,downAt:0,
  gust:0,gustDir:[1,0],rips:new Float32Array(32),ripI:0,flowBoost:0,lookOff:[0,0],dilate:0,
  fr:{x:0,y:0,w:1,h:1},vw:1,vh:1,dpr:1,kind:null,ready:false};
const toX=u=>S.fr.x+u*S.fr.w, toY=v=>S.fr.y+v*S.fr.h;
function addRipple(u,v,amp){const i=(S.ripI++%8)*4;S.rips[i]=u;S.rips[i+1]=v;S.rips[i+2]=S.t;S.rips[i+3]=amp;}
const rnd=(a,b)=>a+Math.random()*(b-a), pick=a=>a[(Math.random()*a.length)|0];
const clamp=(x,a,b)=>Math.max(a,Math.min(b,x));
function wrapAng(a){while(a>Math.PI)a-=2*Math.PI;while(a<-Math.PI)a+=2*Math.PI;return a;}
let sampler=null; // pixel sampler for colors
function makeSampler(img){const c=document.createElement('canvas');const w=200,h=Math.round(200*img.naturalHeight/img.naturalWidth);c.width=w;c.height=h;
  const x=c.getContext('2d',{willReadFrequently:true});x.drawImage(img,0,0,w,h);let d;try{d=x.getImageData(0,0,w,h).data;}catch(e){d=null;}
  return (u,v)=>{if(!d)return 'rgb(200,120,80)';const px=clamp(Math.round(u*(w-1)),0,w-1),py=clamp(Math.round(v*(h-1)),0,h-1),i=(py*w+px)*4;return `rgb(${d[i]},${d[i+1]},${d[i+2]})`;};}
function heart(c,x,y,s){c.beginPath();c.moveTo(x,y+s*.3);c.bezierCurveTo(x,y-s*.1,x-s*.5,y-s*.1,x-s*.5,y+s*.25);c.bezierCurveTo(x-s*.5,y+s*.55,x-s*.1,y+s*.7,x,y+s*.95);
  c.bezierCurveTo(x+s*.1,y+s*.7,x+s*.5,y+s*.55,x+s*.5,y+s*.25);c.bezierCurveTo(x+s*.5,y-s*.1,x,y-s*.1,x,y+s*.3);c.fill();}
function star(c,x,y,r,rot){c.beginPath();for(let i=0;i<10;i++){const a=rot+i*Math.PI/5,rr=i%2?r*.45:r;c.lineTo(x+Math.cos(a)*rr,y+Math.sin(a)*rr);}c.closePath();c.fill();}
function glowDot(x,y,r,col,a){const g=ctx.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,`rgba(${col},${a})`);g.addColorStop(.35,`rgba(${col},${a*.45})`);g.addColorStop(1,`rgba(${col},0)`);ctx.fillStyle=g;ctx.fillRect(x-r,y-r,2*r,2*r);}

/* ---------- kinds (per-artwork behaviours) ---------- */
const KINDS={};
const spawnTimer=(rate,dt,fn)=>{let n=rate*dt;while(n>=1){fn();n--;}if(Math.random()<n)fn();};

/* sunflowers: a day → sunset → night → dawn cycle, gusts of wind, pollen that glows at night */
const smoothstep=(a,b,x)=>{const t=clamp((x-a)/(b-a),0,1);return t*t*(3-2*t);};
KINDS.sunflower=()=>{const P=[];for(let i=0;i<60;i++)P.push({u:rnd(0,1),v:rnd(0,1),s:rnd(1.2,3.4),ph:rnd(0,6.28),sp:rnd(.4,1)});
 const stars=[];{const mi=S.maskImg;const c=document.createElement('canvas');c.width=120;c.height=Math.round(120*mi.naturalHeight/mi.naturalWidth);const x=c.getContext('2d',{willReadFrequently:true});x.drawImage(mi,0,0,c.width,c.height);
   let d=null;try{d=x.getImageData(0,0,c.width,c.height).data;}catch(e){}
   for(let t=0;t<600&&stars.length<70;t++){const u=Math.random(),v=Math.random()*.55;if(d){const i=((Math.floor(v*c.height))*c.width+Math.floor(u*c.width))*4;if(d[i+2]<170)continue;}stars.push({u,v,s:rnd(.6,1.8),ph:rnd(0,6),w:rnd(.6,2)});}}
 const PERIOD=30,NAMES=['낮','노을','밤','새벽'];let off=0,offT=0,gustT=rnd(1,3),gust=null,lastName='';
 const phase=()=>((S.t/PERIOD+off)%1+1)%1;
 return {down(){offT=off+(.25-(phase()%.25))+.02;},
  update(dt){off+=(offT-off)*Math.min(1,dt*1.6);
   const p=phase(),alt=Math.cos(2*Math.PI*p);S.night=smoothstep(.1,-.55,alt);S.dusk=Math.exp(-Math.pow((alt-.02)/.3,2))*(1-S.night*.6);
   const name=S.night>.6?'밤':S.dusk>.45?(p<.5?'노을':'새벽'):'낮';if(name!==lastName){lastName=name;const n=$('v-note');n.textContent='지금은 '+name+' · 누르면 시간이 흘러가요';n.hidden=false;}
   gustT-=dt;if(gustT<0&&!gust){gust={t:0,d:rnd(2,3.2),a:rnd(.006,.011)};}S.ruffle=.55;if(gust){gust.t+=dt;const e=Math.pow(Math.sin(Math.PI*gust.t/gust.d),2);S.gust=Math.max(S.gust,e*gust.a);S.ruffle=.55+e*1.8;S.gustDir=[1,-.1];if(gust.t>gust.d){gust=null;gustT=rnd(2.5,5.5);}}
   const g=S.gust;P.forEach(p=>{p.u+=(.012+Math.sin(S.t*.7+p.ph)*.01+S.gustDir[0]*g*4)*p.sp*dt;p.v+=(-.006+Math.cos(S.t*.9+p.ph)*.012+S.gustDir[1]*g*3)*p.sp*dt;
     if(p.u>1.08)p.u=-.06;if(p.u<-.08)p.u=1.06;if(p.v<-.08)p.v=1.05;if(p.v>1.08)p.v=-.05;});},
  draw(){const n=S.night,dk=S.dusk,W=S.fr.w;
   if(dk>.02){ctx.save();ctx.globalCompositeOperation='lighter';glowDot(toX(.13),toY(.22),W*.35,'255,150,70',.22*dk);ctx.restore();}
   if(n>.02){ctx.save();ctx.globalCompositeOperation='lighter';stars.forEach(s=>{const a=n*(.45+.55*Math.pow(.5+.5*Math.sin(S.t*s.w+s.ph),2));glowDot(toX(s.u),toY(s.v),s.s*W/300,'230,236,255',a);});
     glowDot(toX(.86),toY(.13),W*.09,'190,205,255',.35*n);ctx.restore();
     ctx.fillStyle=`rgba(244,242,228,${.95*n})`;ctx.beginPath();ctx.arc(toX(.86),toY(.13),W*.022,0,7);ctx.fill();
     ctx.fillStyle=`rgba(200,200,190,${.35*n})`;ctx.beginPath();ctx.arc(toX(.866),toY(.125),W*.006,0,7);ctx.arc(toX(.852),toY(.137),W*.004,0,7);ctx.fill();}
   ctx.save();if(n>.3)ctx.globalCompositeOperation='lighter';
   P.forEach(p=>{const a=.55+.45*Math.sin(S.t*(2+n*1.5)+p.ph);const col=n>.3?'215,255,140':'255,214,110';glowDot(toX(p.u),toY(p.v),p.s*W/(260-n*120),col,(.85-n*.1)*a);});ctx.restore();}};};

KINDS.pollen=()=>{const P=[];for(let i=0;i<46;i++)P.push({u:rnd(0,1),v:rnd(0,1),s:rnd(1.2,3.2),ph:rnd(0,6.28),sp:rnd(.4,1)});
 return {update(dt){const g=S.gust;P.forEach(p=>{p.u+=(.012+Math.sin(S.t*.7+p.ph)*.01+S.gustDir[0]*g*3)*p.sp*dt;p.v+=(-.006+Math.cos(S.t*.9+p.ph)*.012+S.gustDir[1]*g*2)*p.sp*dt;
   if(p.u>1.08)p.u=-.06;if(p.u<-.08)p.u=1.06;if(p.v<-.08)p.v=1.05;if(p.v>1.08)p.v=-.05;});},
  draw(){P.forEach(p=>{const a=.55+.45*Math.sin(S.t*2+p.ph);glowDot(toX(p.u),toY(p.v),p.s*S.fr.w/260,'255,214,110',.85*a);});}};};

KINDS.fireflies=()=>{const P=[];for(let i=0;i<18;i++)P.push({u:rnd(.05,.95),v:rnd(.15,.9),ph:rnd(0,6.28),w:rnd(.6,1.6),vx:0,vy:0});
 return {comp:'lighter',update(dt){P.forEach(p=>{let ax=Math.sin(S.t*.5*p.w+p.ph)*.03,ay=Math.cos(S.t*.43*p.w+p.ph*2)*.03;
   if(S.hover>.5){const dx=S.mouse.u-p.u,dy=S.mouse.v-p.v,d=Math.hypot(dx,dy)+.01;if(d<.35){ax+=dx/d*.05;ay+=dy/d*.05;}}
   p.vx=(p.vx+ax*dt)*Math.exp(-dt*.8);p.vy=(p.vy+ay*dt)*Math.exp(-dt*.8);p.u=clamp(p.u+p.vx*dt,-.05,1.05);p.v=clamp(p.v+p.vy*dt,.05,1.02);});},
  draw(){P.forEach(p=>{const b=Math.pow(.5+.5*Math.sin(S.t*p.w*1.7+p.ph),3);glowDot(toX(p.u),toY(p.v),S.fr.w*.03,'214,255,140',.9*b+.05);});}};};

/* crayons: every crayon tip softens, swells into a drop, lets go and runs down the canvas */
KINDS.wax=()=>{const N=63,U0=.046,CW=.0144,TIP=.151;const C=[];const P=[];
 for(let i=0;i<N;i++){const u=U0+(i+.5)*CW;C.push({u,col:sampler(u,.095),hi:sampler(u,.085),L:rnd(0,.02),max:rnd(.028,.06),g:rnd(.0015,.005),ph:rnd(0,6)});}
 const drop=(c)=>P.push({u:c.u,v0:TIP+c.L*.5,v:TIP+c.L,sp:rnd(.01,.02),w:CW*rnd(.5,.75),col:c.col,life:1,len:rnd(.3,.75)});
 return {down(u,v){C.forEach(c=>{const d=Math.abs(c.u-u);if(d<.05)c.L+=.03*(1-d/.05);});},
  update(dt){let heatAll=0;
   C.forEach(c=>{const near=S.hover>.5&&S.mouse.v<.45?Math.exp(-Math.pow((c.u-S.mouse.u)/.05,2)):0;heatAll=Math.max(heatAll,near);
     c.L+=(c.g+near*.035)*dt;if(c.L>c.max){drop(c);c.L=.003;c.max=rnd(.028,.06);}});
   S.haze=.25+heatAll*.75;
   for(let i=P.length-1;i>=0;i--){const p=P[i];p.sp=Math.min(p.sp+.012*dt,.08);p.v+=p.sp*dt;if(p.v-p.v0>p.len||p.v>.97)p.life-=dt*.45;if(p.life<=0)P.splice(i,1);}},
  draw(){const fw=S.fr.w,ar=S.art.w/S.art.h;
   ctx.lineCap='round';P.forEach(p=>{ctx.globalAlpha=clamp(p.life,0,1)*.92;ctx.strokeStyle=p.col;ctx.fillStyle=p.col;const x=toX(p.u),w=p.w*fw;
     ctx.lineWidth=w*.75;ctx.beginPath();ctx.moveTo(x,toY(p.v0));ctx.lineTo(x,toY(p.v));ctx.stroke();ctx.beginPath();ctx.ellipse(x,toY(p.v),w*.55,w*.85,0,0,7);ctx.fill();
     ctx.fillStyle='rgba(255,255,255,.5)';ctx.beginPath();ctx.arc(x-w*.18,toY(p.v)-w*.25,w*.14,0,7);ctx.fill();});ctx.globalAlpha=1;
   C.forEach(c=>{const x=toX(c.u),y0=toY(TIP-.006),tw=CW*fw*.86,L=c.L*fw*(1+.04*Math.sin(S.t*3+c.ph)),r=Math.min(tw*.62,tw*.32+L*.22);const yb=y0+Math.max(L,r*.4);
     ctx.fillStyle=c.col;ctx.beginPath();ctx.moveTo(x-tw/2,y0);ctx.bezierCurveTo(x-tw/2,y0+L*.45,x-r*.85,yb-r*1.1,x-r,yb-r*.2);ctx.arc(x,yb-r*.2,r,Math.PI,0,true);
     ctx.bezierCurveTo(x+r*.85,yb-r*1.1,x+tw/2,y0+L*.45,x+tw/2,y0);ctx.closePath();ctx.fill();
     const g=ctx.createLinearGradient(x-tw/2,0,x+tw/2,0);g.addColorStop(0,'rgba(0,0,0,.22)');g.addColorStop(.35,'rgba(255,255,255,.0)');g.addColorStop(.7,'rgba(0,0,0,.0)');g.addColorStop(1,'rgba(0,0,0,.25)');ctx.fillStyle=g;ctx.fill();
     ctx.strokeStyle='rgba(255,255,255,.55)';ctx.lineWidth=Math.max(1,tw*.12);ctx.beginPath();ctx.moveTo(x-tw*.2,y0+2);ctx.lineTo(x-r*.45,yb-r*.4);ctx.stroke();
     ctx.fillStyle='rgba(255,255,255,.65)';ctx.beginPath();ctx.arc(x-r*.35,yb-r*.45,Math.max(.8,r*.18),0,7);ctx.fill();});}};};

/* chimp: the face stays as painted. Light rakes across the crumpled paper, fur tips stir,
   and the yellow room turns into other pop colours, wiping out from where you press. */
const CHIMP={eyeA:[.380,.296,.026,.022],eyeB:[.519,.268,.026,.022],mouth:[.477,.556,.075]};
const POP=[null,[.98,.42,.62],[.36,.8,.74],[.98,.55,.22],[.42,.56,.98],[.72,.86,.3]];
KINDS.chimp=()=>{let cur=0,nxt=0,wipe=null,auto=8;
 S.face={blink:0,open:0,tilt:0,nod:0};S.pop={a:-1,b:-1,cx:.5,cy:.5,r:0};S.ruffle=.6;
 const go=(u,v)=>{if(wipe)cur=nxt;nxt=(cur+1)%POP.length;wipe={u:u??rnd(.15,.85),v:v??rnd(.1,.9),t:0};auto=9;};
 return {down(u,v){go(u,v);},
  update(dt){auto-=dt;if(auto<0)go();
   if(wipe){wipe.t+=dt;if(wipe.t>1.6){cur=nxt;wipe=null;}}
   S.pop={a:cur,b:wipe?nxt:cur,cx:wipe?wipe.u:.5,cy:wipe?wipe.v:.5,r:wipe?Math.pow(wipe.t/1.6,.8)*1.6:0};
   S.ruffle=.6+.4*Math.sin(S.t*.8)**2;}};};

/* flamingos: wind gusts through the bamboo, leaves fall and float on the water, feathers ruffle; rain on demand */
KINDS.flamingo=()=>{const F=[];for(let i=0;i<14;i++)F.push({u:rnd(.05,.95),v:rnd(.15,.9),ph:rnd(0,6.28),w:rnd(.6,1.6),vx:0,vy:0});
 const leaves=[],rings=[],drops=[];let gust=null,gustT=rnd(1.5,3),rain=false,rainA=0,btn=null;S.ruffle=0;
 const leafCol=['46,104,64','58,122,74','70,110,60','40,90,62'];
 const ring=(u,v,big)=>rings.push({u,v,t:0,d:big?2.2:1.3,r:big?.07:.035});
 const api={
  controls:[{label:'비 내리기',on:(b)=>{rain=!rain;b.textContent=rain?'비 그치기':'비 내리기';b.setAttribute('aria-pressed',rain);}}],
  down(u,v){if(v>.58)ring(u,v,true);},
  update(dt){ // gusts
   gustT-=dt;if(gustT<0&&!gust)gust={t:0,d:rnd(2.2,3.4),a:rnd(.006,.01)};
   let env=0;if(gust){gust.t+=dt;env=Math.pow(Math.sin(Math.PI*gust.t/gust.d),2);if(gust.t>gust.d){gust=null;gustT=rnd(4,7);}}
   S.gust=Math.max(S.gust,env*(gust?gust.a:0)+(rain?.003:0));S.gustDir=[1,0];S.ruffle=Math.max(env,rain?.35:0);
   if(env>.35&&leaves.length<26)spawnTimer(env*2.2,dt,()=>leaves.push({u:rnd(.05,.95),v:rnd(.03,.3),vx:rnd(.03,.08),vy:0,rot:rnd(0,6),vr:rnd(-3,3),len:rnd(.035,.06),col:pick(leafCol),land:rnd(.62,.95),st:'fall',life:1,ph:rnd(0,6)}));
   leaves.forEach(l=>{if(l.st==='fall'){l.vy=Math.min(l.vy+.05*dt,.07);l.vx+=(env*.12-l.vx*.6)*dt;l.u+=(l.vx+Math.sin(S.t*2.4+l.ph)*.03)*dt;l.v+=l.vy*dt;l.rot+=l.vr*dt+Math.sin(S.t*3+l.ph)*.03;
     if(l.v>=l.land){l.st='float';ring(l.u,l.v,false);}}else{l.u+=.006*dt;l.rot+=(.2-l.rot%6.28*0)*0;l.life-=dt/9;}});
   for(let i=leaves.length-1;i>=0;i--)if(leaves[i].life<=0||leaves[i].u>1.1)leaves.splice(i,1);
   // rain
   rainA+=((rain?1:0)-rainA)*Math.min(1,dt*1.5);
   if(rainA>.05)spawnTimer(90*rainA,dt,()=>drops.push({u:rnd(-.08,.96),v:rnd(-.1,.2),land:Math.random()<.7?rnd(.6,.98):rnd(.2,.98),sp:rnd(1.3,1.9)}));
   for(let i=drops.length-1;i>=0;i--){const d=drops[i];d.v+=d.sp*dt;d.u+=d.sp*.12*dt;if(d.v>=d.land){if(d.land>.6&&d.u>.03&&d.u<.97&&Math.random()<.7)ring(d.u,d.v,false);drops.splice(i,1);}}
   for(let i=rings.length-1;i>=0;i--){rings[i].t+=dt;if(rings[i].t>rings[i].d)rings.splice(i,1);}
   if(rings.length>140)rings.splice(0,rings.length-140);
   // fireflies hide in the rain
   F.forEach(p=>{let ax=Math.sin(S.t*.5*p.w+p.ph)*.03,ay=Math.cos(S.t*.43*p.w+p.ph*2)*.03;
     if(S.hover>.5){const dx=S.mouse.u-p.u,dy=S.mouse.v-p.v,d=Math.hypot(dx,dy)+.01;if(d<.35){ax+=dx/d*.05;ay+=dy/d*.05;}}
     p.vx=(p.vx+ax*dt)*Math.exp(-dt*.8);p.vy=(p.vy+ay*dt)*Math.exp(-dt*.8);p.u=clamp(p.u+p.vx*dt,-.05,1.05);p.v=clamp(p.v+p.vy*dt,.05,1.02);});},
  draw(){const W=S.fr.w,H=S.fr.h;
   // rings on the water (kept inside the painting)
   ctx.save();ctx.beginPath();ctx.rect(S.fr.x,S.fr.y,S.fr.w,S.fr.h);ctx.clip();rings.forEach(r=>{const k=r.t/r.d,rad=r.r*W*(.2+k);ctx.strokeStyle=`rgba(240,200,215,${.45*(1-k)})`;ctx.lineWidth=1.3;ctx.beginPath();ctx.ellipse(toX(r.u),toY(r.v),rad,rad*.28,0,0,7);ctx.stroke();
     if(k<.5){ctx.strokeStyle=`rgba(240,200,215,${.3*(1-k*2)})`;ctx.beginPath();ctx.ellipse(toX(r.u),toY(r.v),rad*.55,rad*.55*.28,0,0,7);ctx.stroke();}});ctx.restore();
   // leaves
   leaves.forEach(l=>{const x=toX(l.u),y=toY(l.v),L=l.len*W;ctx.save();ctx.translate(x,y);ctx.rotate(l.st==='float'?.15:l.rot);ctx.globalAlpha=clamp(l.life*1.5,0,1);
     if(l.st==='float')ctx.scale(1,.45);ctx.fillStyle=`rgb(${l.col})`;ctx.beginPath();ctx.moveTo(-L/2,0);ctx.quadraticCurveTo(0,-L*.16,L/2,0);ctx.quadraticCurveTo(0,L*.12,-L/2,0);ctx.fill();
     ctx.strokeStyle='rgba(255,255,255,.18)';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(-L*.45,0);ctx.lineTo(L*.45,-L*.01);ctx.stroke();ctx.restore();});
   // rain streaks
   if(drops.length){ctx.save();ctx.beginPath();ctx.rect(S.fr.x,S.fr.y,S.fr.w,S.fr.h);ctx.clip();ctx.strokeStyle='rgba(220,225,240,.35)';ctx.lineWidth=1;ctx.beginPath();drops.forEach(d=>{const x=toX(d.u),y=toY(d.v);ctx.moveTo(x,y);ctx.lineTo(x-W*.004,y-H*.03);});ctx.stroke();ctx.restore();}
   // fireflies
   ctx.save();ctx.globalCompositeOperation='lighter';F.forEach(p=>{const b=Math.pow(.5+.5*Math.sin(S.t*p.w*1.7+p.ph),3)*(1-rainA*.85);glowDot(toX(p.u),toY(p.v),W*.03,'214,255,140',.9*b+.03);});ctx.restore();}};
 return api;};

KINDS.sparks=()=>{const P=[];const cols=['120,255,240','255,240,90','255,80,170','255,90,60','140,200,255'];
 const sp=(u,v,a,s)=>P.push({u,v,vx:Math.cos(a)*s,vy:Math.sin(a)*s,life:1,col:pick(cols),w:rnd(1,2.4)});
 return {comp:'lighter',update(dt){spawnTimer(REDUCED?3:9,dt,()=>{const a=rnd(0,6.28),r=rnd(.18,.38);sp(.5+Math.cos(a)*r,.5+Math.sin(a)*r,a,rnd(.04,.11));});
   if(S.hover>.5&&S.vel>.2)spawnTimer(30,dt,()=>sp(S.mouse.u,S.mouse.v,rnd(0,6.28),rnd(.05,.18)));
   for(let i=P.length-1;i>=0;i--){const p=P[i];p.u+=p.vx*dt;p.v+=p.vy*dt;p.life-=dt*.7;if(p.life<=0)P.splice(i,1);}},
  draw(){ctx.lineCap='round';P.forEach(p=>{ctx.strokeStyle=`rgba(${p.col},${p.life*.9})`;ctx.lineWidth=p.w;ctx.beginPath();ctx.moveTo(toX(p.u),toY(p.v));ctx.lineTo(toX(p.u-p.vx*.35),toY(p.v-p.vy*.35));ctx.stroke();});}};};

KINDS.splat=()=>{const P=[];const cols=['232,209,74','47,158,107','217,71,61','59,127,196','233,138,58','160,90,200'];
 return {down(u,v){const c=pick(cols);for(let i=0;i<12;i++){const a=rnd(0,6.28),d=Math.pow(Math.random(),1.6)*.09;P.push({u:u+Math.cos(a)*d,v:v+Math.sin(a)*d*1.0,r:rnd(.003,.02)*(1-d*6),col:Math.random()<.7?c:pick(cols),life:1,g:0});}},
  update(dt){for(let i=P.length-1;i>=0;i--){const p=P[i];p.g=Math.min(1,p.g+dt*6);p.v+=dt*.006*p.g;p.life-=dt*.22;if(p.life<=0)P.splice(i,1);}},
  draw(){P.forEach(p=>{ctx.fillStyle=`rgba(${p.col},${clamp(p.life*1.2,0,.95)})`;ctx.beginPath();ctx.arc(toX(p.u),toY(p.v),Math.max(.5,p.r*p.g*S.fr.w),0,7);ctx.fill();});}};};

KINDS.eye=()=>({update(dt){const L=S.art.fx.look;let tx,ty;
   if(S.hover>.5){tx=clamp((S.mouse.u-L[0])*.06,-.03,.03);ty=clamp((S.mouse.v-L[1])*.06,-.025,.025);}
   else{tx=Math.sin(S.t*.4)*.014;ty=Math.sin(S.t*.27+1)*.009;}
   S.lookOff[0]+=(tx-S.lookOff[0])*Math.min(1,dt*5);S.lookOff[1]+=(ty-S.lookOff[1])*Math.min(1,dt*5);
   const td=S.down?.28:.04*Math.sin(S.t*.8);S.dilate+=(td-S.dilate)*Math.min(1,dt*4);}});

KINDS.gumballs=()=>{const P=[];const cols=['#f4a9cb','#7fc4f2','#fbfbfb','#b9a1f2','#f7d36a','#3a5bd9','#ff8f7a'];
 const burst=(n)=>{for(let i=0;i<n;i++)P.push({u:.16+rnd(-.03,.03),v:.5+rnd(-.05,.05),vx:rnd(.15,.75),vy:rnd(-.9,-.25),r:rnd(.018,.032),col:pick(cols),life:9});};
 return {down(){burst(14);},update(dt){
   const floor=(S.vh-S.fr.y)/S.fr.h, L=-S.fr.x/S.fr.w, R=(S.vw-S.fr.x)/S.fr.w;
   for(let i=P.length-1;i>=0;i--){const p=P[i];p.vy+=1.5*dt;p.u+=p.vx*dt;p.v+=p.vy*dt*S.fr.w/S.fr.h;
     const rv=p.r*S.fr.w/S.fr.h;if(p.v+rv>floor){p.v=floor-rv;p.vy*=-.55;p.vx*=.86;}if(p.u-p.r<L){p.u=L+p.r;p.vx*=-.7;}if(p.u+p.r>R){p.u=R-p.r;p.vx*=-.7;}
     p.life-=dt;if(p.life<=0)P.splice(i,1);}
   if(P.length>160)P.splice(0,P.length-160);},
  draw(){P.forEach(p=>{const x=toX(p.u),y=toY(p.v),r=p.r*S.fr.w;ctx.globalAlpha=clamp(p.life,0,1);ctx.fillStyle='rgba(0,0,0,.25)';ctx.beginPath();ctx.ellipse(x+r*.15,y+r*.2,r,r,0,0,7);ctx.fill();
   ctx.fillStyle=p.col;ctx.beginPath();ctx.arc(x,y,r,0,7);ctx.fill();ctx.fillStyle='rgba(255,255,255,.7)';ctx.beginPath();ctx.arc(x-r*.35,y-r*.35,r*.28,0,7);ctx.fill();});ctx.globalAlpha=1;}};};

KINDS.globe=()=>{const E={cx:.5,cy:.31,rx:.43,ry:.285};const P=[];
 for(let i=0;i<110;i++){const a=rnd(0,6.28),r=Math.sqrt(Math.random())*.95;P.push({u:E.cx+Math.cos(a)*r*E.rx,v:E.cy+Math.sin(a)*r*E.ry,vx:0,vy:0,rot:rnd(0,6.28),vr:rnd(-2,2),s:rnd(.007,.016),h:rnd(0,1)});}
 let energy=0;
 const shake=(dx,dy)=>{P.forEach(p=>{p.vx+=dx*rnd(.6,1.4)+rnd(-.08,.08);p.vy+=dy*rnd(.6,1.4)+rnd(-.08,.08);p.vr+=rnd(-6,6);});energy=Math.min(2,energy+Math.hypot(dx,dy)*2);};
 return {down(u,v){shake(rnd(-.15,.15),-.35);},move(dx,dy){if(S.down)shake(dx*4,dy*4);},
  update(dt){energy*=Math.exp(-dt*.8);S.flowBoost=energy*.004;
   P.forEach(p=>{const sw=.03+energy*.05;p.vx+=(Math.sin(S.t*.6+p.v*9)*sw-(p.u-E.cx)*.02)*dt;p.vy+=(.045+Math.cos(S.t*.5+p.u*8)*sw*.6)*dt;
    p.vx*=Math.exp(-dt*1.2);p.vy*=Math.exp(-dt*1.2);p.u+=p.vx*dt;p.v+=p.vy*dt;p.rot+=p.vr*dt;p.vr*=Math.exp(-dt*.6);p.vr+=.4*dt*Math.sign(p.vr||1);
    let nx=(p.u-E.cx)/E.rx,ny=(p.v-E.cy)/E.ry,d=Math.hypot(nx,ny);if(d>.96){p.u=E.cx+nx/d*.96*E.rx;p.v=E.cy+ny/d*.96*E.ry;const vn=(p.vx*nx+p.vy*ny)/d;if(vn>0){p.vx-=1.6*vn*nx/d;p.vy-=1.6*vn*ny/d;}}});},
  draw(){ctx.save();ctx.beginPath();ctx.ellipse(toX(E.cx),toY(E.cy),E.rx*S.fr.w,E.ry*S.fr.h,0,0,7);ctx.clip();
   P.forEach(p=>{const s=p.s*S.fr.w,l=Math.abs(Math.sin(p.rot*1.3));ctx.save();ctx.translate(toX(p.u),toY(p.v));ctx.rotate(p.rot);ctx.scale(1,.35+.65*Math.abs(Math.cos(p.rot*.9)));
    ctx.fillStyle=`hsla(${140+50*Math.sin(p.h*6+S.t*.5)+l*60},80%,${42+40*l}%,.92)`;ctx.fillRect(-s/2,-s/2,s,s);ctx.restore();});ctx.restore();}};};

KINDS.hearts=()=>{const P=[];const cols=['#e84d6f','#f5b843','#5fbf6a','#4f8fe0','#a879e0','#ff8fb3','#f07f3c'];
 const sp=(u,v,burst)=>P.push({u,v,vx:burst?rnd(-.18,.18):rnd(-.02,.02),vy:burst?rnd(-.3,-.08):rnd(-.08,-.04),s:rnd(.022,.042),col:pick(cols),star:Math.random()<.35,rot:rnd(0,6),life:1,ph:rnd(0,6)});
 return {down(u,v){for(let i=0;i<18;i++)sp(u,v,true);},update(dt){spawnTimer(REDUCED?.6:1.6,dt,()=>sp(rnd(.15,.85),rnd(.25,.9),false));
   for(let i=P.length-1;i>=0;i--){const p=P[i];p.u+=(p.vx+Math.sin(S.t*2+p.ph)*.02)*dt;p.v+=p.vy*dt;p.vx*=Math.exp(-dt);p.vy=p.vy*Math.exp(-dt*.6)-.01*dt;p.rot+=dt;p.life-=dt*.3;if(p.life<=0)P.splice(i,1);}},
  draw(){P.forEach(p=>{ctx.globalAlpha=clamp(p.life*1.5,0,1);ctx.fillStyle=p.col;const s=p.s*S.fr.w;ctx.strokeStyle='rgba(255,255,255,.8)';
   if(p.star)star(ctx,toX(p.u),toY(p.v),s*.55,p.rot);else heart(ctx,toX(p.u),toY(p.v)-s/2,s);});ctx.globalAlpha=1;}};};

KINDS.pond=()=>{let tm=1;return {update(dt){tm-=dt;if(tm<0){tm=rnd(1.2,S.art.fx.rain*1.4);const a=rnd(0,6.28),r=Math.sqrt(Math.random())*.44;addRipple(.5+Math.cos(a)*r,.5+Math.sin(a)*r,.004);}}};};

KINDS.ink=()=>({});

KINDS.gold=()=>{const P=[];for(let i=0;i<34;i++)P.push({u:rnd(0,1),v:rnd(0,1),ph:rnd(0,6),s:rnd(.8,2.2),vx:rnd(-.01,.01),vy:rnd(-.015,-.004)});
 return {comp:null,update(dt){P.forEach(p=>{p.u+=(p.vx+Math.sin(S.t*.5+p.ph)*.006)*dt;p.v+=p.vy*dt;if(p.v<-.03){p.v=1.03;p.u=rnd(0,1);}});},
  draw(){const dark=S.art.dark;if(dark)ctx.globalCompositeOperation='lighter';P.forEach(p=>{const a=Math.pow(.5+.5*Math.sin(S.t*1.6+p.ph),2);glowDot(toX(p.u),toY(p.v),p.s*S.fr.w/200,'255,210,120',dark?.8*a:.7*a);});ctx.globalCompositeOperation='source-over';}};};

KINDS.bubbles=()=>{const P=[];const sp=(u,v,f)=>P.push({u,v,vy:rnd(-.12,-.05)*(f?1.6:1),vx:f?rnd(-.08,.08):0,r:rnd(.006,.018),ph:rnd(0,6),life:1});
 return {down(u,v){for(let i=0;i<12;i++)sp(u+rnd(-.02,.02),v+rnd(-.02,.02),true);},update(dt){spawnTimer(REDUCED?.6:1.5,dt,()=>sp(rnd(.05,.95),1.03,false));
   for(let i=P.length-1;i>=0;i--){const p=P[i];p.u+=(p.vx+Math.sin(S.t*2.2+p.ph)*.015)*dt;p.vx*=Math.exp(-dt*2);p.v+=p.vy*dt;if(p.v<-.04)P.splice(i,1);}},
  draw(){P.forEach(p=>{const x=toX(p.u),y=toY(p.v),r=p.r*S.fr.w;ctx.strokeStyle='rgba(255,255,255,.55)';ctx.lineWidth=Math.max(1,r*.12);ctx.beginPath();ctx.arc(x,y,r,0,7);ctx.stroke();
   ctx.fillStyle='rgba(255,255,255,.12)';ctx.fill();ctx.fillStyle='rgba(255,255,255,.75)';ctx.beginPath();ctx.arc(x-r*.35,y-r*.35,r*.22,0,7);ctx.fill();});}};};

KINDS.ice=()=>{const P=[];const edge=[[.27,.555],[.44,.655],[.62,.57]];
 const sp=()=>{const k=Math.random()<.5?0:1,t=Math.random(),a=edge[k],b=edge[k+1];const u=a[0]+(b[0]-a[0])*t,v=a[1]+(b[1]-a[1])*t;P.push({u,v,v0:v,vy:0,land:v+rnd(.05,.13),s:rnd(.006,.011),hang:rnd(.3,.9)});};
 return {update(dt){const d=Math.hypot(S.mouse.u-.44,S.mouse.v-.38);const heat=S.hover*Math.exp(-d*d*12);S.flowBoost=heat*.004;
   spawnTimer((REDUCED?.4:.9)+heat*5,dt,sp);
   for(let i=P.length-1;i>=0;i--){const p=P[i];if(p.hang>0){p.hang-=dt;continue;}p.vy+=.9*dt;p.v+=p.vy*dt;if(p.v>=p.land){addRipple(p.u,p.v,.0035);P.splice(i,1);}}},
  draw(){P.forEach(p=>{const x=toX(p.u),y=toY(p.v),s=p.s*S.fr.w*(p.hang>0?Math.min(1,1.2-p.hang):1);const st=1+Math.min(1.2,p.vy*3);
   ctx.fillStyle='rgba(170,215,240,.85)';ctx.beginPath();ctx.ellipse(x,y,s*.55,s*.55*st,0,0,7);ctx.fill();ctx.fillStyle='rgba(255,255,255,.85)';ctx.beginPath();ctx.arc(x-s*.18,y-s*.15*st,s*.14,0,7);ctx.fill();});}};};

/* butterflies: sprites leave the painting and fly over the wall.
   Each wing pair folds toward its own body line, so a butterfly painted at an angle flaps along that angle. */
const BFM=[{beta:-0.94,c:[92,105],side:true},{beta:-2.67,c:[101,101],side:false},{beta:-2.81,c:[92,91],side:true}];
KINDS.butterflies=(imgs)=>{const B=BF.flies.map((b,k)=>{const m=BFM[k];const home=[(b[0]+m.c[0])/BF.W,(b[1]+m.c[1])/BF.H];
   return {img:imgs[k],m,home,u:home[0],v:home[1],vx:0,vy:0,st:'perch',tm:0,ph:rnd(0,6),tx:0,ty:0,psi:m.beta,tilt:0,mir:1,flap:rnd(0,6),auto:rnd(2,5)};});
 const take=(b)=>{if(b.st!=='perch')return;b.st='fly';b.tm=rnd(6,10);b.vx=rnd(-.1,.3);b.vy=rnd(-.5,-.25);newT(b);};
 const newT=(b)=>{const L=-S.fr.x/S.fr.w,R=(S.vw-S.fr.x)/S.fr.w,T=-S.fr.y/S.fr.h,Bm=(S.vh-S.fr.y)/S.fr.h;b.tx=rnd(L+.05,R-.05);b.ty=rnd(T+.05,Math.min(Bm-.1,.8));};
 const near=(b,u,v,r)=>Math.hypot(u-b.u,(v-b.v)*BF.H/BF.W)<r;
 return {down(u,v){let hit=false;B.forEach(b=>{if(near(b,u,v,.09)){take(b);hit=true;}});if(!hit)B.forEach(b=>setTimeout(()=>take(b),rnd(0,400)));},
  update(dt){B.forEach(b=>{
    if(b.st==='perch'){b.auto-=dt;if(b.auto<0){b.auto=rnd(7,13);take(b);return;}b.flap+=dt*(1.6+Math.sin(S.t*.7+b.ph));
      b.psi+=wrapAng(b.m.beta-b.psi)*Math.min(1,dt*6);b.tilt*=Math.exp(-dt*6);b.mir=1;if(S.hover>.5&&near(b,S.mouse.u,S.mouse.v,.06))take(b);return;}
    if(b.st==='fly'){b.tm-=dt;if(b.tm<0)b.st='home';if(Math.hypot(b.tx-b.u,b.ty-b.v)<.08||Math.random()<dt*.3)newT(b);}
    const tx=b.st==='home'?b.home[0]:b.tx,ty=b.st==='home'?b.home[1]:b.ty;const dx=tx-b.u,dy=ty-b.v,d=Math.hypot(dx,dy)+1e-4;
    const acc=b.st==='home'?.9:.6;b.vx+=(dx/d*acc+Math.sin(S.t*3+b.ph)*.5)*dt;b.vy+=(dy/d*acc+Math.cos(S.t*4.3+b.ph)*.6)*dt;
    const sp=Math.hypot(b.vx,b.vy),mx=b.st==='home'?Math.max(.06,Math.min(.35,d*1.5)):.38;if(sp>mx){b.vx*=mx/sp;b.vy*=mx/sp;}
    b.u+=b.vx*dt;b.v+=b.vy*dt;b.flap+=dt*15;
    const landing=b.st==='home'?clamp(1-d/.12,0,1):0;
    if(b.m.side){ // side view: keep upright, tilt with the climb, face the way it flies
      const face=Math.sign(Math.cos(b.m.beta));if(landing<.5){if(b.vx*face<-.04)b.mir=-1;else if(b.vx*face>.04)b.mir=1;}else b.mir=1;
      b.tilt+=((clamp(-b.vy*1.2,-.45,.45)*(1-landing))-b.tilt)*Math.min(1,dt*4);b.psi=b.m.beta;}
    else{ // top view: head turns toward the flight direction
      const head=Math.atan2(b.vy*BF.H/BF.W,b.vx);const tgt=landing>0?b.m.beta+wrapAng(head-b.m.beta)*(1-landing):head;b.psi+=wrapAng(tgt-b.psi)*Math.min(1,dt*5);}
    if(b.st==='home'&&d<.006){b.st='perch';b.u=b.home[0];b.v=b.home[1];b.vx=b.vy=0;}});},
  draw(){const sc=S.fr.w/BF.W;B.forEach(b=>{const f=b.st==='perch'?.86+.14*Math.cos(b.flap):.18+.82*Math.abs(Math.cos(b.flap));
    ctx.save();ctx.translate(toX(b.u),toY(b.v));ctx.scale(b.mir,1);const ang=b.m.side?b.m.beta+b.tilt*b.mir:b.psi;ctx.rotate(ang);ctx.scale(1,f);ctx.rotate(-b.m.beta);
    if(b.st!=='perch'){ctx.shadowColor='rgba(0,0,0,.25)';ctx.shadowBlur=12;ctx.shadowOffsetY=10;}
    ctx.scale(sc,sc);ctx.drawImage(b.img,-b.m.c[0],-b.m.c[1]);ctx.restore();});}};};

/* gold koi: each fish is lifted off the painting and moves on its own.
   I has two koi that swim head-first out of the frame and come back in from the other side;
   II and III circle where they were painted, then now and then swim a wide loop out over the wall and return. */
const KOI={10:{fish:[{src:'a/k10_fishA.png',box:[149,48,400,1030],mode:'swim'},{src:'a/k10_fishB.png',box:[75,259,584,1039],mode:'swim'}]},
  12:{fish:[{src:'a/k12_fish.png',box:[249,0,1016,1386],c:[.5636,.5027],mode:'circle',dir:-1}]},
  13:{fish:[{src:'a/k13_fish.png',box:[220,76,980,1274],c:[.5345,.5132],mode:'circle',dir:-1}]}};
KINDS.koi=(imgs)=>{const a=S.art,AW=a.w,AH=a.h,M=40;const dust=KINDS.gold();
 const F=KOI[a.i].fish.map((d,n)=>({...d,img:imgs[n],off:document.createElement('canvas'),t:rnd(0,6),wave:1,ph:rnd(0,6),
   st:'home',wait:n===0?rnd(4,7):rnd(9,14),ox:0,oy:0,v:0,ang:0,trip:0,sx:Math.random()<.5?-1:1,sy:Math.random()<.5?-1:1}));
 const stageArt=()=>({top:-S.fr.y/S.fr.h*AH,bot:(S.vh-S.fr.y)/S.fr.h*AH,left:-S.fr.x/S.fr.w*AW,right:(S.vw-S.fr.x)/S.fr.w*AW});
 const go=f=>{if(f.st!=='home')return;if(f.mode==='swim'){f.st='out';f.v=AH*.05;}else{f.st='trip';f.trip=0;f.sx=Math.random()<.5?-1:1;f.sy=Math.random()<.5?-1:1;}};
 return {down(u,v){const x=u*AW,y=v*AH;let best=null,bd=1e9;F.forEach(f=>{if(f.st!=='home')return;const [bx,by,bw,bh]=f.box;const d=Math.hypot(x-(bx+bw/2+f.ox),y-(by+bh/2+f.oy));if(d<bd){bd=d;best=f;}});if(best)go(best);},
  update(dt){dust.update(dt);const SA=stageArt();
   F.forEach(f=>{const [bx,by,bw,bh]=f.box;
    if(f.st==='home'){f.wait-=dt;f.wave+=(1-f.wave)*dt*2;if(f.wait<0)go(f);}
    if(f.mode==='swim'){
      if(f.st==='out'){f.v=Math.min(f.v+AH*.18*dt,AH*.32);f.wave+=(2-f.wave)*dt*2;f.oy+=f.v*dt;f.ox=Math.sin(f.t*.5)*AW*.03;
        if(by+f.oy>SA.bot+30){f.oy=SA.top-(by+bh)-30;f.st='in';}}
      else if(f.st==='in'){const v=clamp(-f.oy*1.1,AH*.03,AH*.32);f.oy+=v*dt;f.ox*=Math.exp(-dt*1.5);if(f.oy>=0){f.oy=0;f.st='home';f.wait=rnd(8,16);}}
      f.t+=dt*f.wave;}
    else{const spin=(Math.PI*2/26)*(f.st==='trip'?2.2:1);f.ang+=f.dir*spin*dt;f.t+=dt*(f.st==='trip'?1.8:1);
      if(f.st==='trip'){f.trip+=dt/16;const e=f.trip<1?.5-.5*Math.cos(Math.PI*f.trip):1;const th=e*Math.PI*2,L=AW*.8;
        f.ox=f.sx*L*(1-Math.cos(th))/2*1.6;f.oy=f.sy*L*.45*Math.sin(th);if(f.trip>=1){f.ox=f.oy=0;f.st='home';f.wait=rnd(12,20);}}}});},
  draw(){const sc=S.fr.w/AW,k=sc*S.dpr;
   F.forEach(f=>{const [bx,by,bw,bh]=f.box,off=f.off,oc=off.getContext('2d');const ow=Math.ceil((bw+M*2)*k),oh=Math.ceil(bh*k);
    if(off.width!==ow||off.height!==oh){off.width=ow;off.height=oh;}oc.clearRect(0,0,ow,oh);
    const N=Math.min(160,Math.max(60,Math.round(bh*k/6))),rh=bh/N;
    for(let j=0;j<N;j++){const yN=j/N;let sh;
      if(f.mode==='swim'){const amp=(4+20*Math.pow(1-yN,1.4))*(f.st==='home'?1:1.3);sh=amp*Math.sin(f.t*3.1+yN*5.6+f.ph);}
      else{const amp=yN<.42?26*Math.pow(1-yN/.42,1.5):0;sh=amp*Math.sin(f.t*4.2+yN*7);}
      oc.drawImage(f.img,0,j*rh,bw,rh+1,(M+sh)*k,j*rh*k,bw*k,(rh+1)*k);}
    const lp=S.hover>.5?S.mouse.u:.5+.6*Math.sin(f.t*.35+f.ph);const gx=lp*ow;const g=oc.createLinearGradient(gx-ow*.12,0,gx+ow*.12,oh);
    g.addColorStop(0,'rgba(255,240,190,0)');g.addColorStop(.5,'rgba(255,236,180,.28)');g.addColorStop(1,'rgba(255,240,190,0)');
    oc.globalCompositeOperation='source-atop';oc.fillStyle=g;oc.fillRect(0,0,ow,oh);oc.globalCompositeOperation='source-over';
    ctx.save();
    const pk=f.st==='home'?.55:.9,x=toX((bx-M+f.ox)/AW)-S.par[0]*pk*S.fr.w,y=toY((by+f.oy)/AH)-S.par[1]*pk*S.fr.h;
    if(f.mode==='circle'){const cx=toX(f.c[0]+f.ox/AW)-S.par[0]*pk*S.fr.w,cy=toY(f.c[1]+f.oy/AH)-S.par[1]*pk*S.fr.h;ctx.translate(cx,cy);ctx.rotate(f.ang);ctx.translate(-cx,-cy);}
    else{const cx=x+ow/S.dpr/2,cy=y+oh/S.dpr/2;ctx.translate(cx,cy+Math.sin(f.t*.55+f.ph)*S.fr.h*.01);ctx.rotate(Math.sin(f.t*.42+f.ph)*.025+(f.st!=='home'?f.ox/AW*.6:0));ctx.translate(-cx,-cy);}
    const away=f.st!=='home';if(away||a.i===13){ctx.shadowColor=a.i===13&&!away?'rgba(40,50,20,.28)':'rgba(0,0,0,.45)';ctx.shadowBlur=away?18:10;ctx.shadowOffsetX=5;ctx.shadowOffsetY=away?14:8;}
    ctx.drawImage(off,x,y,ow/S.dpr,oh/S.dpr);ctx.restore();});
   dust.draw();}};};

/* dandelion: the puff stays whole; new seeds grow out of it and drift away across the wall */
KINDS.dandelion=(imgs)=>{const [puffImg,...seedImgs]=imgs;const W=DL.W,H=DL.H,cx=DL.c[0],cy=DL.c[1];
 const seeds=DL.seeds.map((s,k)=>{const mid=[(s.a[0]+s.p[0])/2,(s.a[1]+s.p[1])/2];return {k,img:seedImgs[k],th0:Math.atan2(s.p[1]-s.a[1],s.p[0]-s.a[0]),off:[mid[0]-s.box[0],mid[1]-s.box[1]],home:mid};});
 const flying=[];const painted=seeds.map(s=>({s,ox:0,oy:0,vx:0,vy:0}));
 let blow=0,wind=[.75,-.66],breeze=.6;
 const spawn=(strong)=>{const wa=Math.atan2(wind[1],wind[0]);const a=wa+rnd(-1.4,1.4)*(strong?1:.8),r=rnd(.55,.95)*DL.R,s=pick(seeds);
   flying.push({s,x:cx+Math.cos(a)*r,y:cy+Math.sin(a)*r,vx:Math.cos(a)*rnd(8,24),vy:Math.sin(a)*rnd(8,24),phi:a,sc:rnd(.8,1.1),ph:rnd(0,6),age:0});};
 return {
  update(dt){const target=S.down?1:0;blow+=(target-blow)*Math.min(1,dt*(S.down?2.2:4));
   if(S.down){const mx=S.mouse.u*W,my=S.mouse.v*H;let dx=cx-mx,dy=cy-my;const d=Math.hypot(dx,dy);if(d<DL.R*.8){dx=.75;dy=-.66;}else{dx/=d;dy/=d;}wind[0]+=(dx-wind[0])*Math.min(1,dt*6);wind[1]+=(dy-wind[1])*Math.min(1,dt*6);}
   else{wind[0]+=(.75-wind[0])*dt*.5;wind[1]+=(-.66-wind[1])*dt*.5;}
   S.gust=blow*.004;S.gustDir=wind;
   // new seeds: a gentle breeze lets one go now and then; blowing sends a stream
   breeze-=dt;if(!S.down&&breeze<0){breeze=rnd(.9,1.8);spawn(false);}
   if(blow>.12)spawnTimer(blow*blow*22,dt,()=>spawn(true));
   // painted seeds in the sky: pushed by the wind, then spring back to where they were painted
   painted.forEach(p=>{const fx=wind[0]*blow*900-p.ox*14,fy=wind[1]*blow*700-p.oy*14;p.vx=(p.vx+fx*dt)*Math.exp(-dt*3);p.vy=(p.vy+fy*dt)*Math.exp(-dt*3);p.ox+=p.vx*dt;p.oy+=p.vy*dt;});
   const Lx=-S.fr.x/S.fr.w*W-200,Rx=(S.vw-S.fr.x)/S.fr.w*W+200,Ty=-S.fr.y/S.fr.h*H-200,By=(S.vh-S.fr.y)/S.fr.h*H+200;
   for(let i=flying.length-1;i>=0;i--){const f=flying[i];f.age+=dt;
     if(f.age<.45){f.x+=f.vx*dt*.4;f.y+=f.vy*dt*.4;continue;} // still unfolding on the puff
     const turb=Math.sin(S.t*1.7+f.ph+f.y*.01)*30;
     f.vx+=(wind[0]*blow*520+18+turb)*dt;f.vy+=(wind[1]*blow*420-14+Math.cos(S.t*1.3+f.ph+f.x*.01)*30)*dt;
     f.vx*=Math.exp(-dt*1.1);f.vy*=Math.exp(-dt*1.1);f.x+=f.vx*dt;f.y+=f.vy*dt;
     const tgt=-Math.PI/2+.45*Math.sin(S.t*2.1+f.ph);f.phi+=wrapAng(tgt-f.phi)*Math.min(1,dt*1.1);
     if(f.x<Lx||f.x>Rx||f.y<Ty||f.y>By)flying.splice(i,1);}
   if(flying.length>220)flying.splice(0,flying.length-220);
  },
  draw(){const sc=S.fr.w/W;
   const near=S.hover>.5?Math.exp(-Math.pow(Math.hypot(S.mouse.u*W-cx,S.mouse.v*H-cy)/300,2)):0;
   const sway=Math.sin(S.t*1.1)*.03+Math.sin(S.t*2.7)*.008+Math.sin(S.t*9)*.004*near+blow*(.06+.015*Math.sin(S.t*13))*Math.sign(wind[0]||1);
   const X=toX(cx/W),Y=toY(cy/H);
   ctx.save();ctx.translate(X,Y);ctx.rotate(sway);ctx.drawImage(puffImg,(DL.puff[0]-cx)*sc,(DL.puff[1]-cy)*sc,DL.puff[2]*sc,DL.puff[3]*sc);ctx.restore();
   const drawSeed=(s,x,y,phi,k,al)=>{ctx.save();ctx.globalAlpha=al;ctx.translate(toX(x/W),toY(y/H));ctx.rotate(phi-s.th0);ctx.scale(k*sc,k*sc);ctx.drawImage(s.img,-s.off[0],-s.off[1]);ctx.restore();};
   painted.forEach(p=>{const bob=Math.sin(S.t*1.3+p.s.k)*9;drawSeed(p.s,p.s.home[0]+p.ox+bob*.6+Math.sin(S.t*.4+p.s.k*2)*6,p.s.home[1]+p.oy+bob,p.s.th0+Math.sin(S.t*.9+p.s.k)*.16+p.vx*.0015,1,1);});
   flying.forEach(f=>{const g=clamp(f.age/.45,0,1),e=g*g*(3-2*g);
     // while unfolding the seed rides the puff's sway
     let x=f.x,y=f.y;if(g<1){const dx=x-cx,dy=y-cy,c=Math.cos(sway),s2=Math.sin(sway);x=cx+dx*c-dy*s2;y=cy+dx*s2+dy*c;}
     drawSeed(f.s,x,y,f.phi,(f.sc||1)*(.55+.45*e),e);});
   ctx.globalAlpha=1;}};};

/* ---------- open / close ---------- */
let K=null, loadToken=0;
async function openViewer(k){
  if(viewer.hidden&&opts.onOpen)opts.onOpen();
  const a=ART[(k+ART.length)%ART.length];S.art=a;const tok=++loadToken;
  viewer.hidden=false;document.body.style.overflow='hidden';
  $('v-room').textContent=ROOMS.find(r=>r.id===a.room).name;$('v-title').textContent=a.title;$('v-desc').textContent=a.desc;$('v-how').textContent=a.how;
  $('v-count').textContent=`${String(a.k+1).padStart(2,'0')} / ${ART.length}`;$('v-no').textContent='No. '+String(a.k+1).padStart(2,'0');$('mm-img').src=a.thumb;S.hd=false;S.zt=1;stage.classList.remove('zoomed');$('zhint').style.opacity=1;clearTimeout(S.hintT);S.hintT=setTimeout(()=>{$('zhint').style.opacity=0;},3500);
  const ctl=$('v-ctl');ctl.innerHTML='';$('v-note').hidden=true;
    viewerDocent(a);
  if(a.kind==='dandelion'){
    const m=document.createElement('button');m.className='btn';m.textContent='마이크로 불기';m.onclick=startMic;ctl.appendChild(m);}
  
  $('v-loading').hidden=false;S.ready=false;
  layout();
  const extra=a.kind==='koi'?KOI[a.i].fish.map(f=>f.src):a.kind==='dandelion'?['a/dl_puff.png',...DL.seeds.map((_,i)=>`a/dl_seed${i}.png`)]:a.kind==='butterflies'?BF.flies.map((_,i)=>`a/b2_fly${i}.png`):[];
  try{
    const [img,mask,dimg,...ex]=await Promise.all([loadImg(a.img),loadImg(a.mask),loadImg(`a/d${String(a.i).padStart(2,'0')}.png`),...extra.map(loadImg)]);
    if(tok!==loadToken)return;
    if(glOK){upload(texImg,0,img);upload(texMask,1,mask);upload(texDepth,2,dimg);}
    sampler=makeSampler(img);
    {const c=document.createElement('canvas');c.width=c.height=12;const x=c.getContext('2d');x.drawImage(img,0,0,12,12);try{const d=x.getImageData(0,0,12,12).data;let r=0,g=0,b=0;for(let i=0;i<d.length;i+=4){r+=d[i];g+=d[i+1];b+=d[i+2];}const n=d.length/4;viewer.style.setProperty('--room',`rgb(${Math.round(r/n*.2+8)},${Math.round(g/n*.2+8)},${Math.round(b/n*.2+9)})`);}catch(e){}}
    S.rips.fill(0);S.flowBoost=0;S.lookOff=[0,0];S.dilate=0;S.gust=0;S.gustDir=[1,0];S.t=0;
    S.par=[0,0];S.tl=[0,0];    S.maskImg=mask;S.night=0;S.dusk=0;
    K=(KINDS[a.kind]||(()=>({})))(ex);
    if(K.controls)K.controls.forEach(c=>{const b=document.createElement('button');b.className='btn';b.type='button';b.textContent=c.label;b.setAttribute('aria-pressed','false');b.onclick=()=>c.on(b);ctl.appendChild(b);});
    S.ready=true;$('v-loading').hidden=true;
    if(!glOK){frame.style.background=`center/cover url(${a.img})`;const n=$('v-note');n.textContent='이 기기에서는 그래픽 가속(WebGL)을 쓸 수 없어 그림 자체의 일렁임이 꺼져 있어요. 날아다니는 효과만 보여요.';n.hidden=false;}
  }catch(e){$('v-loading').textContent='그림을 불러오지 못했어요. 다시 시도해 주세요.';}
  if(!S.run){S.run=true;S.last=performance.now();requestAnimationFrame(loop);}
  $('close').focus({preventScroll:true});
}
function closeViewer(){if(viewer.hidden)return;viewer.hidden=true;document.body.style.overflow='';S.run=false;stopMic();opts.onClose&&opts.onClose();}
$('close').onclick=closeViewer;$('prev').onclick=()=>openViewer(S.art.k-1);$('next').onclick=()=>openViewer(S.art.k+1);
addEventListener('keydown',e=>{if(viewer.hidden)return;if(e.key==='Escape')closeViewer();else if(e.key==='ArrowRight')openViewer(S.art.k+1);else if(e.key==='ArrowLeft')openViewer(S.art.k-1);
  else if(e.key===' '&&S.art.kind==='dandelion'){e.preventDefault();if(!S.down){S.down=true;}}});
addEventListener('keyup',e=>{if(e.key===' '&&!viewer.hidden&&S.art&&S.art.kind==='dandelion')S.down=false;});

/* ---------- layout + zoom ---------- */
S.zt=1;S.base={x:0,y:0,w:1,h:1};S.frT={x:0,y:0,w:1,h:1};S.hd=false;
const HD_OK=()=>false; // the party ships without the extra-large zoom images
const maxZoom=()=>S.art&&HD_OK(S.art)?5:3.5;
function layout(){if(viewer.hidden||!S.art)return;const r=stage.getBoundingClientRect();S.vw=r.width;S.vh=r.height;
  const narrow=r.width<600;const padX=Math.max(narrow?18:56,r.width*.07),padY=Math.max(narrow?62:64,r.height*.09);
  const aw=r.width-padX*2,ah=r.height-padY*2-(narrow?30:20);const asp=S.art.w/S.art.h;
  let w=aw,h=w/asp;if(h>ah){h=ah;w=h*asp;}const x=(r.width-w)/2,y=(r.height-h)/2-(narrow?8:10);S.base={x,y,w,h};
  S.zt=1;S.frT={...S.base};S.fr={...S.base};
  const dpr=Math.min(2,devicePixelRatio||1);S.dpr=dpr;S.dpr0=dpr;
  let gd=dpr;if(r.width*r.height*gd*gd>5.2e6)gd=Math.sqrt(5.2e6/(r.width*r.height));S.gdpr=gd;
  glc.width=Math.round(r.width*gd);glc.height=Math.round(r.height*gd);fxc.width=Math.round(r.width*dpr);fxc.height=Math.round(r.height*dpr);
  applyFrame(true);updZoomUI();}
addEventListener('resize',layout);
function clampRect(R){const m=40;
  if(R.w<=S.vw-2*m)R.x=S.base.x+(S.base.w-R.w)/2;else R.x=clamp(R.x,S.vw-R.w-m,m);
  if(R.h<=S.vh-2*m)R.y=S.base.y+(S.base.h-R.h)/2;else R.y=clamp(R.y,S.vh-R.h-m,m);return R;}
function setZoom(z,fx,fy,instant){z=clamp(z,1,maxZoom());if(fx==null){fx=S.vw/2;fy=S.vh/2;}
  const R=S.frT,k=(S.base.w*z)/R.w;R.x=fx-(fx-R.x)*k;R.y=fy-(fy-R.y)*k;R.w=S.base.w*z;R.h=S.base.h*z;S.zt=z;
  if(z<=1.001){S.zt=1;Object.assign(R,S.base);}clampRect(R);if(instant)Object.assign(S.fr,R);
  stage.classList.toggle('zoomed',S.zt>1.01);updZoomUI();$('zhint').style.opacity=0;
  if(S.zt>1.35&&!S.hd&&HD_OK(S.art))loadHD();}
function panBy(dx,dy){S.frT.x+=dx;S.frT.y+=dy;clampRect(S.frT);Object.assign(S.fr,S.frT);}
function updZoomUI(){$('z-pct').textContent=Math.round(S.zt*100)+'%';$('minimap').hidden=S.zt<=1.02;}
async function loadHD(){S.hd=true;const a=S.art;try{const im=await loadImg(`a/h${String(a.i).padStart(2,'0')}.jpg`);if(S.art===a&&glOK)upload(texImg,0,im);}catch(e){}}
let lastFr='';
function applyFrame(force){const f=S.fr,key=`${f.x.toFixed(1)},${f.y.toFixed(1)},${f.w.toFixed(1)}`;if(!force&&key===lastFr)return;lastFr=key;
  Object.assign(frame.style,{left:f.x+'px',top:f.y+'px',width:f.w+'px',height:f.h+'px'});
  if(S.zt>1.02||!$('minimap').hidden){const u0=clamp(-f.x/f.w,0,1),v0=clamp(-f.y/f.h,0,1),u1=clamp((S.vw-f.x)/f.w,0,1),v1=clamp((S.vh-f.y)/f.h,0,1);
    Object.assign($('mm-box').style,{left:u0*100+'%',top:v0*100+'%',width:(u1-u0)*100+'%',height:(v1-v0)*100+'%'});}}
$('z-in').onclick=()=>setZoom(S.zt*1.5);$('z-out').onclick=()=>setZoom(S.zt/1.5);$('z-pct').onclick=()=>setZoom(1);
$('minimap').addEventListener('click',e=>{const r=$('minimap').getBoundingClientRect();const u=(e.clientX-r.left)/r.width,v=(e.clientY-r.top)/r.height;
  S.frT.x=S.vw/2-u*S.frT.w;S.frT.y=S.vh/2-v*S.frT.h;clampRect(S.frT);});

/* ---------- input ---------- */
function localXY(e){const r=stage.getBoundingClientRect();return [e.clientX-r.left,e.clientY-r.top];}
function uvOf(e){const [x,y]=localXY(e);return {u:(x-S.fr.x)/S.fr.w,v:(y-S.fr.y)/S.fr.h};}
S.vel=0;
function artDown(e){const p=uvOf(e);S.mouse=p;S.down=true;S.inside=1;S.prev={u:p.u,v:p.v,t:performance.now()};
  if(S.art.fx.ripple&&p.u>=0&&p.u<=1&&p.v>=0&&p.v<=1)addRipple(p.u,p.v,S.art.fx.ripple);K&&K.down&&K.down(p.u,p.v);}
const ptrs=new Map();let pinch=null,pend=null;
stage.addEventListener('pointerdown',e=>{if(e.target.closest('button,.minimap')||!S.art||!S.ready)return;stage.setPointerCapture&&stage.setPointerCapture(e.pointerId);
  const xy=localXY(e);ptrs.set(e.pointerId,xy);
  if(ptrs.size===2){S.down=false;if(pend){clearTimeout(pend.timer);pend=null;}const [a,b]=[...ptrs.values()];pinch={d0:Math.hypot(a[0]-b[0],a[1]-b[1])||1,z0:S.zt,m:[(a[0]+b[0])/2,(a[1]+b[1])/2]};return;}
  if(ptrs.size>2)return;
  if(S.zt>1.01){pend={x:xy[0],y:xy[1],lx:xy[0],ly:xy[1],mode:'wait',ev:e};pend.timer=setTimeout(()=>{if(pend&&pend.mode==='wait'){pend.mode='press';artDown(pend.ev);}},230);}
  else artDown(e);});
stage.addEventListener('pointermove',e=>{if(!S.art)return;const xy=localXY(e);if(ptrs.has(e.pointerId))ptrs.set(e.pointerId,xy);
  if(pinch&&ptrs.size>=2){const [a,b]=[...ptrs.values()];const d=Math.hypot(a[0]-b[0],a[1]-b[1]),m=[(a[0]+b[0])/2,(a[1]+b[1])/2];
    setZoom(pinch.z0*d/pinch.d0,m[0],m[1],true);panBy(m[0]-pinch.m[0],m[1]-pinch.m[1]);pinch.m=m;return;}
  if(pend&&pend.mode==='wait'&&Math.hypot(xy[0]-pend.x,xy[1]-pend.y)>6){pend.mode='pan';clearTimeout(pend.timer);stage.classList.add('panning');}
  if(pend&&pend.mode==='pan'){panBy(xy[0]-pend.lx,xy[1]-pend.ly);pend.lx=xy[0];pend.ly=xy[1];return;}
  if(pend)pend.ev=e;
  const p=uvOf(e);const now=performance.now();
  if(S.prev){const dt=Math.max(.008,(now-S.prev.t)/1000);const dx=p.u-S.prev.u,dy=p.v-S.prev.v;const v=Math.hypot(dx,dy)/dt;S.vel=v;
    if(S.art.fx.gustK&&S.art.kind!=='dandelion'){S.gust=Math.min(.012,S.gust+v*.0009*S.art.fx.gustK);const d=Math.hypot(dx,dy)||1;S.gustDir=[dx/d,dy/d];}
    K&&K.move&&K.move(dx,dy);}
  S.prev={u:p.u,v:p.v,t:now};S.mouse=p;S.inside=(p.u>-.15&&p.u<1.15&&p.v>-.15&&p.v<1.15)?1:0;});
stage.addEventListener('pointerleave',()=>{S.inside=0;S.prev=null;});
const up=e=>{ptrs.delete(e.pointerId);if(ptrs.size<2)pinch=null;
  if(pend){clearTimeout(pend.timer);const was=pend.mode;pend=null;stage.classList.remove('panning');
    if(was==='wait'){artDown(e);setTimeout(()=>{S.down=false;},90);return;}}
  S.down=false;};
stage.addEventListener('pointerup',up);stage.addEventListener('pointercancel',up);
stage.addEventListener('wheel',e=>{if(viewer.hidden||!S.art)return;e.preventDefault();const [x,y]=localXY(e);const k=Math.exp(-e.deltaY*(e.ctrlKey?.012:.0016));setZoom(S.zt*k,x,y);},{passive:false});
stage.addEventListener('dblclick',e=>{if(e.target.closest('button,.minimap'))return;const [x,y]=localXY(e);setZoom(S.zt<1.5?2.5:1,x,y);});
addEventListener('keydown',e=>{if(viewer.hidden||e.target.closest('input'))return;if(e.key==='+'||e.key==='=')setZoom(S.zt*1.5);else if(e.key==='-')setZoom(S.zt/1.5);else if(e.key==='0')setZoom(1);});

/* microphone (works when the page is allowed to use it; otherwise press-and-hold) */
let mic=null;
async function startMic(){const note=$('v-note');try{const st=await navigator.mediaDevices.getUserMedia({audio:true});const ac=new (window.AudioContext||window.webkitAudioContext)();
  const src=ac.createMediaStreamSource(st),an=ac.createAnalyser();an.fftSize=1024;src.connect(an);const buf=new Float32Array(an.fftSize);let floor=.01;
  mic={st,ac,an,buf,floor,poll(){an.getFloatTimeDomainData(buf);let s=0;for(const x of buf)s+=x*x;const rms=Math.sqrt(s/buf.length);mic.floor=Math.min(mic.floor*1.002+.00002,Math.max(.004,rms<mic.floor*2?rms*.05+mic.floor*.95:mic.floor));
    const on=rms>Math.max(.05,mic.floor*4);if(on){S.down=true;S.mouse={u:.2,v:.85};mic.on=true;}else if(mic.on){S.down=false;mic.on=false;}}};
  note.textContent='마이크가 켜졌어요. 화면에 대고 후~ 불어 보세요.';note.hidden=false;}
 catch(e){note.textContent='이 화면에서는 마이크를 쓸 수 없어요. 그림을 꾹 눌러서 불어 주세요.';note.hidden=false;}}
function stopMic(){if(mic){mic.st.getTracks().forEach(t=>t.stop());mic.ac.close();mic=null;}}

/* ---------- loop ---------- */
function loop(now){if(!S.run)return;requestAnimationFrame(loop);let dt=Math.min(.05,(now-S.last)/1000);S.last=now;if(REDUCED)dt*=.55;S.t+=dt;
  if(!S.ready||!S.art)return;mic&&mic.poll();
  // ease the frame toward its zoom target
  const kz=1-Math.exp(-dt*14);for(const key of ['x','y','w','h'])S.fr[key]+=(S.frT[key]-S.fr[key])*kz;applyFrame();
  S.hover+=((S.inside?1:0)-S.hover)*Math.min(1,dt*4);S.vel*=Math.exp(-dt*6);
  {const z=S.zt>1.02||REDUCED;let tx=0,ty=0;if(!z){if(S.inside&&!S.down){tx=clamp(S.mouse.u-.5,-.6,.6);ty=clamp(S.mouse.v-.5,-.6,.6);}else{tx=.32*Math.sin(S.t*.31);ty=.22*Math.sin(S.t*.23+1);}}
   S.tl=S.tl||[0,0];S.tl[0]+=(tx-S.tl[0])*Math.min(1,dt*3);S.tl[1]+=(ty-S.tl[1])*Math.min(1,dt*3);
   S.par=[-S.tl[0]*.065,-S.tl[1]*.065];
   const cx=S.fr.x+S.fr.w/2,cy=S.fr.y+S.fr.h/2;scene.style.transformOrigin=`${cx}px ${cy}px`;
   scene.style.transform='';}
  if(S.art.kind!=='dandelion')S.gust*=Math.exp(-dt*1.8);
  K&&K.update&&K.update(dt);
  const f=S.art.fx;
  if(glOK){gl.viewport(0,0,glc.width,glc.height);gl.clearColor(0,0,0,0);gl.clear(gl.COLOR_BUFFER_BIT);
    gl.uniform4f(U.uRect,S.fr.x,S.fr.y,S.fr.w,S.fr.h);gl.uniform2f(U.uPar,S.par[0],S.par[1]);gl.uniform1f(U.uH,glc.height);gl.uniform1f(U.uDpr,S.gdpr);gl.uniform1f(U.uZ,S.fr.w/S.base.w);gl.uniform1f(U.uSky,S.art.kind==='sunflower'?1:0);{const fc=S.art.kind==='chimp'&&S.face;gl.uniform1f(U.uBlink,fc?fc.blink:0);gl.uniform4f(U.uEyeA,...CHIMP.eyeA);gl.uniform4f(U.uEyeB,...CHIMP.eyeB);gl.uniform4f(U.uMouth,CHIMP.mouth[0],CHIMP.mouth[1],CHIMP.mouth[2],fc?fc.open:0);gl.uniform1f(U.uHaze,S.art.kind==='wax'?(S.haze||0):0);gl.uniform1f(U.uTilt,fc?fc.tilt||0:0);gl.uniform1f(U.uNod,fc?fc.nod||0:0);gl.uniform1f(U.uRuffle,(S.art.kind==='flamingo'||S.art.kind==='sunflower'||S.art.kind==='chimp')?(S.ruffle||0):0);
    {const ch=S.art.kind==='chimp'&&S.pop;gl.uniform1f(U.uPaper,ch?1:0);gl.uniform1f(U.uWater,S.art.kind==='flamingo'?1:0);const col=i=>i<0||!POP[i]?[-1,-1,-1]:POP[i];gl.uniform3f(U.uPopA,...col(ch?S.pop.a:-1));gl.uniform3f(U.uPopB,...col(ch?S.pop.b:-1));gl.uniform4f(U.uWipe,ch?S.pop.cx:0,ch?S.pop.cy:0,ch?S.pop.r:0,0);}}gl.uniform1f(U.uNight,S.night||0);gl.uniform1f(U.uDusk,S.dusk||0);
    gl.uniform1f(U.uT,S.t);gl.uniform1f(U.uAsp,S.art.w/S.art.h);gl.uniform1f(U.uIn,S.hover);gl.uniform2f(U.uMouse,S.mouse.u,S.mouse.v);gl.uniform4fv(U.uRip,S.rips);
    gl.uniform1f(U.uFlow,f.flow*1.5);gl.uniform1f(U.uFlowScale,f.flowScale);gl.uniform1f(U.uFlowSpeed,f.flowSpeed);gl.uniform1f(U.uFlowBoost,S.flowBoost);gl.uniform2fv(U.uFlowDir,f.flowDir);
    gl.uniform1f(U.uSway,f.sway*1.5);gl.uniform1f(U.uSwaySpeed,f.swaySpeed);gl.uniform1f(U.uSwayFreq,f.swayFreq);gl.uniform1f(U.uSwayTop,f.swayTop);
    gl.uniform1f(U.uGust,S.gust*(f.gustK||0)*(S.gustDir[0]>=0?1:-1));gl.uniform2fv(U.uSwayDir,f.swayDir);
    gl.uniform1f(U.uShimmer,f.shimmer);gl.uniform1f(U.uPulse,f.pulse);gl.uniform1f(U.uBreath,f.breath);gl.uniform2fv(U.uBreathC,f.breathC);gl.uniform1f(U.uPara,f.para);
    gl.uniform1f(U.uRipMask,f.ripMask);gl.uniform1f(U.uGlow,f.glow);gl.uniform1f(U.uStream,f.stream);gl.uniform1f(U.uDilate,S.dilate);gl.uniform2fv(U.uLookOff,S.lookOff);
    gl.uniform4f(U.uLook,...(f.look?[f.look[0],f.look[1],f.look[2],1]:[0,0,0,0]));
    gl.drawArrays(gl.TRIANGLE_STRIP,0,4);}
  ctx.setTransform(S.dpr,0,0,S.dpr,0,0);ctx.clearRect(0,0,S.vw,S.vh);
  if(K&&K.draw){ctx.save();if(K.comp)ctx.globalCompositeOperation=K.comp;K.draw();ctx.restore();}
}

/* ---------- docent ---------- */
const DOC={
 17:'화면 대부분을 차지한 건 비늘이 겹겹이 그려진 거대한 초록 발이에요. 그런데 눈은 자꾸 발치의 작은 민들레로 갑니다. 크기 차이가 클수록 홀씨 하나하나가 또렷해지고, 오른쪽 위로 이어지는 씨앗들이 화면에 바람의 방향을 만들어 줘요.',
 1:'검은 선으로 잡은 꽃잎 위에 노란색이 번지듯 올라가 있어요. 활짝 핀 꽃과 고개 숙인 꽃, 시들어 가는 꽃이 한 화면에 섞여 있어서 밭 전체가 시간의 흐름처럼 보입니다. 아래쪽 회색 번짐은 꽃들이 안개 속에서 솟아오르는 느낌을 줘요.',
 2:'커다란 몸집과 달리 고릴라의 표정은 부드럽고, 시선은 품에 안은 빨간 튤립에 머물러요. 가는 선을 쌓아 올린 털과 가볍게 떠 있는 나비가 무게의 대비를 만듭니다. 분홍과 노랑이 은은하게 번진 배경이 장면을 조용히 감싸요.',
 5:'검은 배경 덕분에 분홍 깃털의 결이 더 밝게 떠오릅니다. 세 마리가 각자 다른 자세로 몸을 다듬고 있고, 물에 비친 그림자는 형태가 흐트러져 물의 움직임을 보여 줘요. 위쪽 대나무 잎의 초록이 분홍과 맞서며 화면을 붙잡아 줍니다.',
 15:'화면 위쪽에 크레파스가 나란히 붙어 있고, 그 아래로 녹은 색이 흘러내려 무지개 띠를 만들었어요. 그 위에 검은 난초 실루엣이 얹혀 있어 흐르는 색과 멈춘 선이 한 화면에서 부딪힙니다. 익숙한 난초 그림을 전혀 다른 재료로 다시 그린 셈이에요.',
 0:'새노란 배경이 검은 털을 더 진하게 보이게 하고, 시선은 자연스럽게 얼굴로 모여요. 주름을 따라간 붓질과 살짝 내민 입술이 표정에 장난기를 더합니다. 배경을 단순하게 비워 둬서 한 사람의 초상화처럼 읽히는 그림이에요.',
 4:'검은 바탕 위에 노랑, 하늘색, 흰색 선만으로 얼굴의 주름을 그려 냈어요. 빨간 붓 자국이 얼굴 둘레로 퍼져 털이면서 동시에 뿜어져 나오는 에너지처럼 보입니다. 정면을 똑바로 보는 눈이 관람객을 붙잡아요.',
 6:'굵고 검은 선이 얼굴의 주름과 근육을 조각하듯 깎아 냈어요. 얼굴 뒤로는 초록, 빨강, 노랑이 번지고 튀어 있어 먹빛의 무게감과 대비를 이룹니다. 콧등을 중심으로 좌우가 거의 대칭이라 정면성이 강하게 느껴져요.',
 7:'화면을 가득 채운 하나의 눈이에요. 파랑, 노랑, 분홍이 겹친 홍채에서 시작해 초록과 주황의 굵은 선이 비늘처럼 퍼져 나갑니다. 나무 결이 비치는 바탕 위에 짙은 색을 꾹꾹 눌러 올려서 손의 힘이 그대로 남아 있어요.',
 8:'만화 말풍선처럼 ‘Got cha’라는 글자가 화면 위아래를 가르고, 그 사이로 곰 탈을 쓴 아이와 가챠 기계가 대각선으로 놓여 있어요. 동그란 껌볼과 캡슐의 반복이 화면을 경쾌하게 만들고, 놀란 표정의 아이가 이야기의 순간을 붙잡아 줍니다.',
 3:'투명한 유리구 안에 캐릭터 인형들이 모여 있지만, 앞쪽 유리에는 금이 가 있어요. 홀로그램처럼 반짝이는 조각들이 유리구 안을 떠다니고, ‘JUST FOR YOU’ 리본 글씨와 깨진 유리가 묘한 긴장을 만듭니다. 선물인데 깨져 있다는 점을 오래 보게 돼요.',
 16:'금빛 바탕 위에 알록달록한 곰 인형들이 탑처럼 쌓여 있어요. 배에 그려진 무지개, 하트, 해 같은 무늬가 반복되며 리듬을 만들고, 뒤엉킨 자세들이 귀여우면서도 조금 쓸쓸한 더미로 보이기도 합니다.',
 9:'원 안을 수십 마리 잉어가 빽빽하게 채우고 있어요. 주황, 흰색, 노랑 잉어 사이로 검은 잉어 두 마리가 대각선 흐름을 만들어 시선을 이끕니다. 위에서 내려다본 구도라 둥근 화면 자체가 연못처럼 느껴져요.',
 18:'마름모로 놓인 종이 위에서 메기가 몸을 비틀며 솟아오르고 있어요. 먹의 짙고 옅음만으로 비늘과 지느러미의 투명함을 표현했고, 입가의 수염에는 은빛 선이 더해져 있습니다. 바깥의 얽힌 선 무늬가 그물처럼 화면을 감싸요.',
 10:'구겨진 듯한 흰 결이 있는 검은 바탕 위에 금빛 선으로 잉어를 그렸어요. 세로로 긴 화면을 따라 잉어가 몸을 S자로 휘며 내려옵니다. 금빛 선은 보는 각도에 따라 빛이 달라져서 같은 그림도 다르게 보여요.',
 12:'검은 바탕에 흰 균열 무늬가 퍼져 있어 깊은 물속이나 대리석처럼 보입니다. 그 위로 금빛 잉어가 크게 원을 그리며 헤엄쳐요. 비늘과 지느러미를 가는 선으로 촘촘히 새겨 넣어 장식적인 힘이 강해요.',
 13:'연둣빛이 번진 밝은 종이 위에 금빛 잉어가 있어요. 앞의 두 금빛 잉어와 같은 주제지만 바탕이 밝아 분위기가 훨씬 가볍습니다. 네 귀퉁이를 고정한 종이 한 장이 벽에 걸린 듯한 모습이에요.',
 11:'흐릿하게 번진 분홍, 보라, 초록 사이로 하얀 잉어가 돌아 나옵니다. 배경은 일부러 흐리게 두고 잉어만 또렷하게 그려서 물속 깊은 곳을 들여다보는 느낌이에요. 작은 물방울들이 고요한 움직임을 더합니다.',
 14:'각얼음 속에 물고기가 갇혀 있고, 아래로는 녹은 물이 웅덩이를 이뤄요. 파랑과 초록 붓질로 얼음의 굴절을 표현했고, 머리와 꼬리만 밖으로 나온 물고기가 상황의 아이러니를 만듭니다. 얼음이 다 녹으면 물고기는 자유로워질까요?'
};
const ASK_CHIPS=['먼저 어디를 보면 좋을까요?','색은 어떻게 쓰였나요?','아이에게 설명해 주세요','이 그림이 움직인다면?'];
let samplePromise=null,sampleImgOK=false;
function getSample(){if(!samplePromise){samplePromise=(window.claude&&window.claude.use?window.claude.use('sample'):Promise.resolve(null)).catch(()=>null)
  .then(async s=>{if(s){try{const l=await s.limits();sampleImgOK=!!(l&&l.images);}catch(e){sampleImgOK=false;}}return s;});}return samplePromise;}
getSample().then(s=>{if(s&&!viewer.hidden&&S.art)$('ask').hidden=false;});
async function thumbBlob(a){const im=await loadImg(a.thumb);const c=document.createElement('canvas');c.width=im.naturalWidth;c.height=im.naturalHeight;c.getContext('2d').drawImage(im,0,0);
  return await new Promise(r=>c.toBlob(r,'image/jpeg',.88));}
let askCtl=null;
async function ask(q){const a=S.art;if(!a||!q.trim())return;const out=$('ask-a'),go=$('ask-go');const sample=await getSample();if(!sample)return;
  askCtl&&askCtl.abort();askCtl=new AbortController();const my=askCtl;
  out.hidden=false;out.className='answer wait';out.textContent='도슨트가 그림을 보고 있어요…';go.disabled=true;
  const room=ROOMS.find(r=>r.id===a.room).name;
  const prompt=`너는 정유진 작가의 온라인 전시 「액자 밖으로」의 도슨트야.${sampleImgOK?' 첨부한 이미지는 관람객이 지금 보고 있는 작품이야.':''}
작품 정보
- 가제: ${a.title} (작가가 정한 제목이 아니라 전시용 가제)
- 전시실: ${room}
- 전시 설명: ${DOC[a.i]}
- 이 전시에서 그림이 움직이는 방식: ${a.desc} ${a.how}

관람객 질문: ${q}

답변 규칙
- 한국어 존댓말, 3~5문장, 마크다운 없이 평문.
- 그림에서 실제로 보이는 구도, 색, 선, 질감을 근거로 말할 것.
- 작가의 의도, 제작 연도, 정확한 재료처럼 확인할 수 없는 사실은 지어내지 말고, "그렇게 보인다"고 말하거나 작가에게 물어보길 권할 것.
- 관람객이 그림을 한 번 더 보게 만드는 문장으로 끝낼 것.`;
  try{let blob=null;if(sampleImgOK){try{blob=await thumbBlob(a);}catch(e){blob=null;}}
    const opts={signal:my.signal,modelTier:'quick',onText:({text})=>{out.className='answer';out.textContent=text;}};if(blob)opts.images=[blob];
    const r=await sample(prompt,opts);out.className='answer';out.textContent=r.text;}
  catch(e){if(e&&e.code==='cancelled')return;out.className='answer';
    const msg={not_granted:'도슨트를 쓰려면 Claude 사용을 허용해 주세요.',sampling_disabled:'이 계정에서는 도슨트를 쓸 수 없어요.',rate_limited:'질문이 많아요. 잠시 뒤에 다시 물어봐 주세요.',session_expired:'다시 로그인한 뒤 물어봐 주세요.',refused:'이 질문에는 답하기 어려워요. 다르게 물어봐 주세요.'}[e&&e.code];
    out.textContent=(e&&e.text?e.text+'\n\n':'')+(msg||'답을 받지 못했어요. 다시 물어봐 주세요.');
    if(e&&(e.code==='not_granted'||e.code==='sampling_disabled'))$('ask').hidden=true;}
  finally{if(askCtl===my)go.disabled=false;}}
$('ask-chips').innerHTML=ASK_CHIPS.map(c=>`<button type="button" class="chip">${c}</button>`).join('');
$('ask-chips').addEventListener('click',e=>{const b=e.target.closest('.chip');if(b){$('ask-q').value=b.textContent;ask(b.textContent);}});
$('ask-form').addEventListener('submit',e=>{e.preventDefault();ask($('ask-q').value);});
function viewerDocent(a){$('v-doc').textContent=DOC[a.i]||'';askCtl&&askCtl.abort();$('ask-a').hidden=true;$('ask-q').value='';$('ask-go').disabled=false;
  getSample().then(s=>{$('ask').hidden=!s;});}

  made = {
    open(artId) { const k = ART.findIndex(a => a.i === artId); if (k >= 0) openViewer(k); },
    close() { closeViewer(); },
    isOpen() { return !viewer.hidden; },
  };
  return made;
}
