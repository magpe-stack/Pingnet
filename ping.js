import {nextJoke} from './ping-jokes.js';
import {unlockComedy,stopComedy,playEffect} from './ping-comedy.js';
import {rating,ratingText} from './ping-rating.js';
import {settings} from './settings.js';
import {mountSync} from './ping-sync.js';
import {mountVoice,playVoice,stopVoice,configureVoice} from './ping-voice.js';
import {mountOpinions} from './ping-opinions.js';
import {mountBrain} from './ping-brain.js';
import {mountMotion} from './ping-motion.js';
import {snapshot} from './monitor.js';
import {activeId} from './profiles.js';
import {get,put} from './database.js';
export function clampPosition(x,y,w,h,vw,vh){return {x:Math.max(0,Math.min(Math.max(0,vw-w),Number.isFinite(x)?x:0)),y:Math.max(0,Math.min(Math.max(0,vh-h),Number.isFinite(y)?y:0))};}
const root=document.createElement('aside');root.id='ping';root.setAttribute('aria-label','Ping');root.innerHTML='<div class="ping-bubble" role="status" hidden></div><button type="button" class="ping-face" aria-label="Ping: toque para conversar; arraste ou use as setas para mover"><img src="assets/emoji_u1f604_3d.webp" alt="" draggable="false"><img class="ping-hand" src="assets/emoji_u1f44b_3d.webp" alt="" draggable="false"></button>';document.body.append(root);
const face=root.querySelector('button'),bubble=root.querySelector('.ping-bubble');let pos,drag,timer,revision=0,phrase=0,suppress=false,opinionUntil=0;

function place(x,y){pos=clampPosition(x,y,root.offsetWidth,root.offsetHeight,document.documentElement.clientWidth,document.documentElement.clientHeight);root.style.left=pos.x+'px';root.style.top=pos.y+'px';bubble.classList.toggle('below',pos.y<100);bubble.classList.toggle('left',pos.x>document.documentElement.clientWidth/2);}
function save(){revision++;put('pingState',{id:'position',...pos}).catch(console.error);}
mountVoice();
const motion=mountMotion(root,snapshot,activeId);
const sync=mountSync(root,bubble,motion,playVoice,stopVoice);
const speak=(text,emotion,image)=>{if(!settings().visible)return;sync.speak(image?text:`${ratingText(snapshot(),activeId())} ${text}`,emotion,image,image?()=>effect(image.includes("4a9")?"fart":emotion==="celebração"?"ovation":"rimshot"):undefined);if(settings().vibration&&!document.hidden&&navigator.vibrate)navigator.vibrate(emotion==='irritação'?[70,40,70,40,100]:emotion==='impaciência'?[35,40,35]:emotion==='tristeza'?[80,60,80]:35);};
let showing=false,showToken=0,showTimer=0,taps=0,lastShow=Date.now();
function applySettings(){const s=settings();root.hidden=!s.visible;root.dataset.animations=String(s.animations);root.dataset.size=s.size;configureVoice({enabled:s.voice&&s.visible,volume:s.volume/100});if(!s.visible){sync.cancel();cancelShow();}if(!s.comedy)stopComedy();if(!s.jokes)cancelShow();if(pos&&s.visible)place(pos.x,pos.y);}
document.addEventListener('pingnet:settings',applySettings);applySettings();
place(innerWidth-root.offsetWidth-12,innerHeight-root.offsetHeight-56);get('pingState','position').then(p=>{if(p&&!revision&&!drag)place(p.x,p.y)}).catch(console.error);
face.addEventListener('pointerdown',e=>{if(!e.isPrimary||e.button!==0)return;suppress=false;drag={id:e.pointerId,x:e.clientX,y:e.clientY,start:{...pos},moved:false};face.setPointerCapture(e.pointerId)});
face.addEventListener('pointermove',e=>{if(drag?.id!==e.pointerId)return;const dx=e.clientX-drag.x,dy=e.clientY-drag.y;if(Math.hypot(dx,dy)>5)drag.moved=true;if(drag.moved){root.dataset.dragging='true';face.dataset.motion='';cancelShow();sync.cancel();place(drag.start.x+dx,drag.start.y+dy)}});
function finish(e){if(drag?.id!==e.pointerId)return;suppress=drag.moved;if(drag.moved)save();drag=null;root.dataset.dragging='false';}
face.addEventListener('pointerup',finish);face.addEventListener('pointercancel',finish);face.addEventListener('lostpointercapture',finish);
face.addEventListener('click',e=>{if(suppress&&e.detail!==0){suppress=false;return;}if(showing){cancelShow();sync.cancel();return;}if(settings().jokes&&++taps%6===0)showJoke();else talk()});
face.addEventListener('keydown',e=>{const delta={ArrowLeft:[-16,0],ArrowRight:[16,0],ArrowUp:[0,-16],ArrowDown:[0,16]}[e.key];if(delta){e.preventDefault();place(pos.x+delta[0],pos.y+delta[1]);save()}});
window.addEventListener('resize',()=>place(pos.x,pos.y));



const effect=(kind)=>{const s=settings();if(s.comedy&&s.visible)return playEffect(kind,s.comedyVolume);};
function cancelShow(){showToken++;showing=false;clearTimeout(showTimer);stopComedy();}
async function showJoke(){if(showing||!settings().visible||!settings().jokes||document.hidden||drag)return;showing=true;lastShow=Date.now();const token=++showToken;try{const old=await get("pingState","comedy-jokes");if(token!==showToken)return;const next=nextJoke(old?.used||[]);const [q,a]=next.pair;sync.speak(q,"brincadeira","assets/emoji_u1f921_3d.webp",()=>{effect("drumroll");showTimer=setTimeout(()=>{if(token!==showToken)return;sync.speak(a,"celebração","assets/emoji_u1f606_3d.webp",async()=>{await effect("rimshot");if(token!==showToken)return;const laughter=effect("laugh");await laughter;if(token!==showToken)return;effect("clap");put("pingState",{id:"comedy-jokes",used:next.used}).catch(console.error);showTimer=setTimeout(()=>{if(token===showToken)showing=false;},3000);},5000);},5000);},5500);}catch(e){cancelShow();console.error(e);}}
for(const event of ["pointerdown","pointerup","touchend","keydown","click"])document.addEventListener(event,()=>{if(settings().comedy)unlockComedy();},true);
document.addEventListener("click",e=>{if(e.target.closest("#comedy-joke"))showJoke();});
document.addEventListener("visibilitychange",()=>{if(document.hidden)cancelShow();});
setInterval(()=>{if(Date.now()-lastShow>480000&&Date.now()>opinionUntil&&!showing&&settings().jokes&&settings().visible&&!document.hidden&&!drag)showJoke();},30000);
const talk=mountBrain({read:snapshot,profile:activeId,speak,blocked:()=>!settings().visible||!!drag||showing||Date.now()<opinionUntil});

mountOpinions({speak:(text,emotion)=>{cancelShow();opinionUntil=Date.now()+8500;speak(text,emotion)},blocked:()=>!settings().visible||!!drag});

// Persistent rating, independent of mascot visibility and speech.
const ratingValue=document.getElementById('ping-rating-value'),ratingDetail=document.getElementById('ping-rating-detail');
function refreshHeaderRating(){const snap=snapshot(),n=rating(snap,activeId());const value=n===null?'—':n.toLocaleString('pt-BR',{maximumFractionDigits:1});const detail=n===null?'Sem dados recentes suficientes':snap.running?'Nota da conexão':'Última rodada; coletas pausadas';if(ratingValue.textContent!==value)ratingValue.textContent=value;if(ratingDetail.textContent!==detail)ratingDetail.textContent=detail;ratingValue.closest('.header-rating').title=detail;}
document.addEventListener('pingnet:monitor',refreshHeaderRating);document.addEventListener('visibilitychange',refreshHeaderRating);setInterval(refreshHeaderRating,1000);refreshHeaderRating();
