import {mountMotion} from './ping-motion.js';
import {snapshot} from './monitor.js';
import {activeId} from './profiles.js';
import {get,put} from './database.js';
export function clampPosition(x,y,w,h,vw,vh){return {x:Math.max(0,Math.min(Math.max(0,vw-w),Number.isFinite(x)?x:0)),y:Math.max(0,Math.min(Math.max(0,vh-h),Number.isFinite(y)?y:0))};}
const root=document.createElement('aside');root.id='ping';root.setAttribute('aria-label','Ping');root.innerHTML='<div class="ping-bubble" role="status" hidden></div><button type="button" class="ping-face" aria-label="Ping: toque para conversar; arraste ou use as setas para mover"><img src="assets/emoji_u1f604_3d.webp" alt="" draggable="false"><img class="ping-hand" src="assets/emoji_u1f44b_3d.webp" alt="" draggable="false"></button>';document.body.append(root);
const face=root.querySelector('button'),bubble=root.querySelector('.ping-bubble');let pos,drag,timer,revision=0,phrase=0,suppress=false;
const phrases=['Olá! Eu sou o Ping.','Você pode me arrastar para outro canto.','Estou aqui para acompanhar sua conexão.'];
function place(x,y){pos=clampPosition(x,y,root.offsetWidth,root.offsetHeight,document.documentElement.clientWidth,document.documentElement.clientHeight);root.style.left=pos.x+'px';root.style.top=pos.y+'px';bubble.classList.toggle('below',pos.y<100);bubble.classList.toggle('left',pos.x>document.documentElement.clientWidth/2);}
function save(){revision++;put('pingState',{id:'position',...pos}).catch(console.error);}
function speak(){bubble.textContent=phrases[phrase++%phrases.length];bubble.hidden=false;clearTimeout(timer);timer=setTimeout(()=>bubble.hidden=true,5000);}
place(innerWidth-root.offsetWidth-12,innerHeight-root.offsetHeight-56);get('pingState','position').then(p=>{if(p&&!revision&&!drag)place(p.x,p.y)}).catch(console.error);
face.addEventListener('pointerdown',e=>{if(!e.isPrimary||e.button!==0)return;suppress=false;drag={id:e.pointerId,x:e.clientX,y:e.clientY,start:{...pos},moved:false};face.setPointerCapture(e.pointerId)});
face.addEventListener('pointermove',e=>{if(drag?.id!==e.pointerId)return;const dx=e.clientX-drag.x,dy=e.clientY-drag.y;if(Math.hypot(dx,dy)>5)drag.moved=true;if(drag.moved){root.dataset.dragging='true';face.dataset.motion='';bubble.hidden=true;place(drag.start.x+dx,drag.start.y+dy)}});
function finish(e){if(drag?.id!==e.pointerId)return;suppress=drag.moved;if(drag.moved)save();drag=null;root.dataset.dragging='false';}
face.addEventListener('pointerup',finish);face.addEventListener('pointercancel',finish);face.addEventListener('lostpointercapture',finish);
face.addEventListener('click',e=>{if(suppress&&e.detail!==0){suppress=false;return;}speak()});
face.addEventListener('keydown',e=>{const delta={ArrowLeft:[-16,0],ArrowRight:[16,0],ArrowUp:[0,-16],ArrowDown:[0,16]}[e.key];if(delta){e.preventDefault();place(pos.x+delta[0],pos.y+delta[1]);save()}});
window.addEventListener('resize',()=>place(pos.x,pos.y));

mountMotion(root,snapshot,activeId);
