import {chooseAct} from './ping-entertainment.js';
import {personalities,personalityFor} from './ping-personalities.js';
import {mountChoreography} from './ping-choreography.js';
import {nextJoke} from './ping-jokes.js';
import {unlockComedy,stopComedy,playEffect} from './ping-comedy.js';
import {rating,ratingText} from './ping-rating.js';
import {settings,expressivityLevels} from './settings.js';
import {mountSync} from './ping-sync.js';
import {mountVoice,playVoice,stopVoice,configureVoice} from './ping-voice.js';
import {mountOpinions} from './ping-opinions.js';
import {mountBrain} from './ping-brain.js';
import {mountMotion} from './ping-motion.js';
import {snapshot} from './monitor.js';
import {activeId} from './profiles.js';
import {get,put,list} from './database.js';
export function clampPosition(x,y,w,h,vw,vh){return {x:Math.max(0,Math.min(Math.max(0,vw-w),Number.isFinite(x)?x:0)),y:Math.max(0,Math.min(Math.max(0,vh-h),Number.isFinite(y)?y:0))};}
const root=document.createElement('aside');root.id='ping';root.setAttribute('aria-label','Ping');root.innerHTML='<div class="ping-bubble" role="status" hidden></div><button type="button" class="ping-face" aria-label="Ping: toque para conversar; arraste ou use as setas para mover"><img src="assets/emoji_u1f604_3d.webp" alt="" draggable="false"><img class="ping-hand" src="assets/emoji_u1f44b_3d.webp" alt="" draggable="false"></button>';document.body.append(root);
const face=root.querySelector('button'),bubble=root.querySelector('.ping-bubble');let pos,drag,timer,revision=0,phrase=0,suppress=false,opinionUntil=0;

function place(x,y){pos=clampPosition(x,y,root.offsetWidth,root.offsetHeight,document.documentElement.clientWidth,document.documentElement.clientHeight);root.style.left=pos.x+'px';root.style.top=pos.y+'px';bubble.classList.toggle('below',pos.y<100);bubble.classList.toggle('left',pos.x>document.documentElement.clientWidth/2);}
function save(){revision++;put('pingState',{id:'position',...pos}).catch(console.error);}
mountVoice();
const motion=mountMotion(root,snapshot,activeId);
const sync=mountSync(root,bubble,motion,playVoice,stopVoice);
const speak=(text,emotion,image,reading=false)=>{if(!settings().visible||document.documentElement.hasAttribute("data-starting"))return;sync.speak(reading&&!image?`${ratingText(snapshot(),activeId())} ${text}`:text,emotion,image,image?()=>effect(image.includes("4a9")?"fart":emotion==="celebração"?"ovation":"rimshot"):undefined);if(reading&&!showing)choreography.show(snapshot().latest?.assessment?.state,{level:1});if(!image&&['surpresa','celebração'].includes(emotion))vibrateEffect([90,60,120]);};
const choreography=mountChoreography(root,face,()=>settings().visible&&!document.documentElement.hasAttribute('data-starting'));

let showCount=0,manualShow=false,showIds=[],completedShows=0;
let scheduled=false, nextShow=Date.now()+7200000, announced=new Set(), scheduleBusy=false;
let entertainmentActive=false,lastAct=null,lastActAt=Date.now();
let reminderUntil=0;let showing=false,showToken=0,showTimer=0,taps=0,lastShow=Date.now();
let previousExpressivity;
function applySettings(){const s=settings();if(previousExpressivity!==s.expressivity){choreography.clear();previousExpressivity=s.expressivity;}root.dataset.expressivity=s.expressivity;root.dataset.instantText=String(s.instantText||s.expressivity==='minimal');root.hidden=!s.visible;root.dataset.animations=String(s.animations);root.dataset.size=s.size;configureVoice({enabled:s.voice&&s.visible&&!s.silent,volume:s.volume/100});if(!s.visible){sync.cancel();cancelShow();}if(!s.comedy||s.silent)stopComedy();if(s.silent&&navigator.vibrate)navigator.vibrate(0);if(!s.jokes||(!s.fullShow&&scheduled&&!manualShow))cancelShow();if(pos&&s.visible)place(pos.x,pos.y);}
document.addEventListener('pingnet:settings',applySettings);applySettings();
place(innerWidth-root.offsetWidth-12,innerHeight-root.offsetHeight-56);get('pingState','position').then(p=>{if(p&&!revision&&!drag)place(p.x,p.y)}).catch(console.error);
face.addEventListener('pointerdown',e=>{if(!e.isPrimary||e.button!==0)return;suppress=false;drag={id:e.pointerId,x:e.clientX,y:e.clientY,start:{...pos},moved:false};face.setPointerCapture(e.pointerId)});
face.addEventListener('pointermove',e=>{if(drag?.id!==e.pointerId)return;const dx=e.clientX-drag.x,dy=e.clientY-drag.y;if(Math.hypot(dx,dy)>5)drag.moved=true;if(drag.moved){root.dataset.dragging='true';face.dataset.motion='';cancelShow();sync.cancel();place(drag.start.x+dx,drag.start.y+dy)}});
function finish(e){if(drag?.id!==e.pointerId)return;suppress=drag.moved;if(drag.moved)save();drag=null;root.dataset.dragging='false';}
face.addEventListener('pointerup',finish);face.addEventListener('pointercancel',finish);face.addEventListener('lostpointercapture',finish);
face.addEventListener('click',e=>{if(suppress&&e.detail!==0){suppress=false;return;}if(showing){cancelShow();sync.cancel();return;}if(settings().jokes&&++taps%6===0)showJoke();else talk()});
face.addEventListener('keydown',e=>{const delta={ArrowLeft:[-16,0],ArrowRight:[16,0],ArrowUp:[0,-16],ArrowDown:[0,16]}[e.key];if(delta){e.preventDefault();place(pos.x+delta[0],pos.y+delta[1]);save()}});
window.addEventListener('resize',()=>place(pos.x,pos.y));



function vibrateEffect(pattern){const s=settings();if(s.silent||!s.vibration||!s.vibrationLevel||document.hidden||!navigator.vibrate)return false;return navigator.vibrate(pattern.map((n,i)=>i%2?n:Math.max(1,Math.round(n*s.vibrationLevel/60))));}
document.addEventListener("click",e=>{if(e.target.closest("#test-vibration")){const ok=vibrateEffect([180,80,220]);const status=document.querySelector("#settings-status");if(status)status.textContent=ok?"Comando de vibração aceito.":"Vibração desativada ou indisponível.";}});
const effect=(kind)=>{choreography.show(kind,{level:3,duration:kind==="intro"||kind==="outro"?7000:3500});if(kind==="drumroll"||kind==="rimshot")vibrateEffect(kind==="drumroll"?[60,50,60,50,100]:[140,60,180]);const s=settings();if(!s.silent&&s.comedy&&s.visible)return playEffect(kind,s.comedyVolume);};
function cancelShow(){if(entertainmentActive){entertainmentActive=false;sync.cancel();}choreography.clear();manualShow=false;showToken++;scheduled=false;showing=false;clearTimeout(showTimer);stopComedy();}
async function showJoke(inShow=false){if((showing&&!inShow)||!settings().visible||!settings().jokes||document.hidden||drag)return;showing=true;lastShow=Date.now();const token=++showToken;try{const old=await get("pingState","comedy-jokes");if(token!==showToken)return;const next=nextJoke(old?.used||[],Math.random,{...old,excluded:inShow?showIds:[]});if(inShow)showIds.push(next.joke.id);const steps=next.joke.sequencia;const valid=()=>token===showToken&&showing&&!document.hidden&&settings().visible&&settings().jokes;
 function later(fn,ms){showTimer=setTimeout(()=>{if(valid())fn();},ms);}
 async function finale(){try{await Promise.race([Promise.resolve(effect(/\b(peido|pum|flatulência|gases)\b/i.test(steps.map(s=>s.texto||"").join(" "))?"fart":Math.random()<.60?"rimshot":"comic")),new Promise(r=>setTimeout(r,8000))]);if(!valid())return;await Promise.race([Promise.resolve(effect("laugh")),new Promise(r=>setTimeout(r,8000))]);if(!valid())return;effect("clap");await put("pingState",{id:"comedy-jokes",used:next.used,generalUsed:next.generalUsed,nextGroup:next.nextGroup});if(valid())later(()=>{if(inShow)advanceShow();else showing=false;},3000);}catch(e){cancelShow();console.error(e);}}
 function step(i){if(!valid())return;if(i>=steps.length){finale();return;}const part=steps[i];if(part.acao!=="espera_usuario")choreography.show("joke",{level:3,duration:5000});if(part.acao==='espera_usuario'){effect('drumroll');later(()=>step(i+1),part.duracao_ms);return;}const final=i===steps.length-1;const emotion=part.expressao==='rindo'?'celebração':part.expressao==='narrando'?'reflexão':'brincadeira';const image=part.expressao==='rindo'?'assets/emoji_u1f606_3d.webp':part.expressao==='curioso'?'assets/emoji_u1f921_3d.webp':undefined;sync.speak(part.texto,emotion,image,()=>{if(!valid())return;if(final)finale();else if(steps[i+1].acao==='espera_usuario')step(i+1);else later(()=>step(i+1),Math.max(1800,Math.min(4500,part.texto.length*40)));},final?5000:steps[i+1]?.duracao_ms||4500);}
 step(0);}catch(e){cancelShow();console.error(e);}}

for(const event of ["pointerdown","pointerup","touchend","keydown","click"])document.addEventListener(event,()=>{if(settings().comedy&&!settings().silent)unlockComedy();},true);
document.addEventListener("click",e=>{if(e.target.closest("#comedy-joke"))showJoke();});
document.addEventListener("visibilitychange",()=>{if(document.hidden)cancelShow();});
setInterval(()=>{if(Date.now()>reminderUntil&&Date.now()-lastShow>480000&&Date.now()>opinionUntil&&!showing&&settings().jokes&&settings().visible&&!document.hidden&&!drag)showJoke();},30000);
const talk=mountBrain({read:snapshot,profile:activeId,speak,blocked:()=>document.documentElement.hasAttribute("data-starting")||!settings().visible||!!drag||showing||Date.now()<reminderUntil||Date.now()<opinionUntil});

mountOpinions({speak:(text,emotion)=>{cancelShow();opinionUntil=Date.now()+8500;speak(text,emotion)},blocked:()=>!settings().visible||!!drag||scheduled});

// Persistent rating, independent of mascot visibility and speech.

function refreshHeaderRating(){const ratingValue=document.getElementById("ping-rating-value");if(!ratingValue)return;const n=rating(snapshot(),activeId());const value=n===null?'—':n.toLocaleString('pt-BR',{maximumFractionDigits:1});if(ratingValue.textContent!==value)ratingValue.textContent=value;}
document.addEventListener('pingnet:monitor',refreshHeaderRating);document.addEventListener('visibilitychange',refreshHeaderRating);setInterval(refreshHeaderRating,1000);refreshHeaderRating();

// Backup reminders: at most once per two hours, only if no successful save in two hours.
let checkingBackup=false;
const backupLines=['Seus registros ficam neste navegador. Faça um backup em Arquivo → Salvar para protegê-los.','Que tal guardar uma cópia do histórico? Use Arquivo → Salvar.','Não deixe suas medições sem uma cópia de segurança. Abra Arquivo → Salvar.'];
async function remindBackup(){if(checkingBackup||!settings().backupReminder||!settings().visible||document.hidden||showing||drag||Date.now()<opinionUntil||document.documentElement.hasAttribute('data-starting')||!bubble.hidden)return;checkingBackup=true;try{const work=async()=>{const [saved,last]=await Promise.all([get('pingState','backup-last-success'),get('pingState','backup-last-reminder')]);const now=Date.now(),day=new Date(now).toLocaleDateString('pt-BR');if(now-(saved?.at||0)<7200000||now-(last?.at||0)<7200000||!settings().backupReminder||!settings().visible||document.hidden||showing||drag||now<opinionUntil||!bubble.hidden)return;reminderUntil=now+15000;speak(backupLines[Math.floor(Math.random()*backupLines.length)],'preocupação');choreography.show('backup',{level:2,duration:6500});await put('pingState',{id:'backup-last-reminder',day,at:now});};if(navigator.locks)await navigator.locks.request('pingnet-backup-reminder',work);else await work();}catch(e){console.error(e)}finally{checkingBackup=false;}}
setTimeout(remindBackup,60000);setInterval(remindBackup,60000);

// Scheduled show shares the same repertoire and presentation lock as spontaneous jokes.

window.pingComedyStatus=()=>({next:nextShow,scheduled,count:showCount,completed:completedShows});
const calls=[m=>`Daqui a ${m} minutos, tem Ping Comedy Club! Não perca!`,m=>`O melhor show de piadas da internet começa em ${m} minutos!`,m=>`Prepare a pipoca! Nosso espetáculo começa em ${m} minutos.`,m=>`Já reservou seu lugar? Faltam ${m} minutos!`,m=>`O humor está carregando... Faltam ${m} minutos!`,m=>`Oito piadas e um comediante! Em ${m} minutos!`,m=>`A bateria está pronta! O show começa em ${m} minutos.`,m=>`Atenção, respeitável público! Faltam ${m} minutos!`];
function stageLine(text,done){const token=showToken;sync.speak(text,'celebração',undefined,()=>{if(token===showToken&&scheduled)showTimer=setTimeout(()=>{if(token===showToken&&scheduled)done();},3500);},4000);}
function advanceShow(){if(!scheduled)return;if(showCount<8){showCount++;showJoke(true);return;}effect('ovation');stageLine('Obrigado, respeitável público! Foram oito piadas. O Ping Comedy Club volta de duas em duas horas. Até o próximo show! Continuo monitorando sua conexão.',async()=>{const token=showToken;await Promise.race([Promise.resolve(effect("outro")),new Promise(r=>setTimeout(r,9000))]);if(token!==showToken)return;completedShows++;scheduled=false;showing=false;lastShow=Date.now();});}
async function startFullShow(manual=false){manualShow=manual;scheduled=true;showing=true;showCount=0;showIds=[];const token=++showToken;await Promise.race([Promise.resolve(effect('intro')),new Promise(r=>setTimeout(r,9000))]);if(token!==showToken||!scheduled)return;effect('ovation');stageLine('Senhoras e senhores, bem-vindos ao Ping Comedy Club! Hoje teremos oito piadas, suspense, bateria, risadas e aplausos. A conexão continua sendo monitorada. Vamos começar!',advanceShow);}
const scheduleReady=get('pingState','comedy-schedule').then(r=>{if(Number.isFinite(r?.next)){nextShow=r.next;announced=new Set(r.announced||[]);}}).catch(console.error);
async function scheduleTick(){if(scheduleBusy)return;scheduleBusy=true;try{await scheduleReady;const now=Date.now();if(!settings().fullShow||!settings().jokes||!settings().visible||document.hidden||drag||document.documentElement.hasAttribute('data-starting'))return;if(showing||now<reminderUntil||now<opinionUntil)return;const work=async()=>{const saved=await get('pingState','comedy-schedule');if(Number.isFinite(saved?.next)&&saved.next>=nextShow){if(saved.next>nextShow){nextShow=saved.next;announced.clear();}for(const mark of saved.announced||[])announced.add(mark);}if(!settings().fullShow||!settings().jokes||!settings().visible||document.hidden||drag||showing||Date.now()<Math.max(reminderUntil,opinionUntil))return;if(now>=nextShow){nextShow=now+7200000;announced.clear();await put('pingState',{id:'comedy-schedule',next:nextShow,announced:[]});startFullShow();return;}const minutes=Math.ceil((nextShow-now)/60000);const mark=[1,5,15,30,60].find(x=>minutes<=x);if(!mark||announced.has(mark)||!bubble.hidden)return;for(const x of [1,5,15,30,60])if(x>=mark)announced.add(x);await put('pingState',{id:'comedy-schedule',next:nextShow,announced:[...announced]});opinionUntil=now+12000;speak(minutes===1?'Última chamada! O Ping Comedy Club começa em um minuto!':calls[Math.floor(Math.random()*calls.length)](minutes),'entusiasmo');choreography.show('announcement',{level:2,duration:5000});};if(navigator.locks)await navigator.locks.request('pingnet-comedy-schedule',work);else await work();}catch(e){console.error(e)}finally{scheduleBusy=false;}}
scheduleReady.then(async()=>{if(!await get('pingState','comedy-schedule'))await put('pingState',{id:'comedy-schedule',next:nextShow,announced:[]});}).catch(console.error);
setInterval(scheduleTick,5000);

document.addEventListener("click",e=>{if(!e.target.closest("#comedy-full-now"))return;const status=document.querySelector("#comedy-now-status");if(showing||drag||document.hidden||!settings().visible||!settings().jokes){if(status)status.textContent=showing?"Já existe uma apresentação em andamento.":"Ative o Ping e as piadas para iniciar o show.";return;}sync.cancel();startFullShow(true);if(status)status.textContent="Show iniciado!";});

// Lembrete local de prazos, sem interromper apresentações.
let protocolReminderBusy=false;
async function remindProtocols(){if(protocolReminderBusy||!settings().visible||document.hidden||showing||drag||Date.now()<Math.max(opinionUntil,reminderUntil)||!bubble.hidden||document.documentElement.hasAttribute('data-starting'))return;protocolReminderBusy=true;try{const work=async()=>{const profile=activeId(),now=Date.now(),day=new Date(now).toLocaleDateString('pt-BR'),id='protocol-reminder-'+profile;const last=await get('pingState',id);if(last?.day===day)return;const rows=await list('protocols',{index:'profileTime',range:IDBKeyRange.bound([profile,-8640000000000000],[profile,8640000000000000]),limit:Infinity});const due=rows.filter(r=>['Aberto','Aguardando solução'].includes(r.status)&&Number.isFinite(r.deadline)&&r.deadline<=now+86400000);if(!due.length||profile!==activeId()||!settings().visible||document.hidden||showing||drag||!bubble.hidden||Date.now()<Math.max(opinionUntil,reminderUntil))return;reminderUntil=Date.now()+15000;speak('Você tem '+due.length+' protocolo(s) com prazo vencido ou nas próximas 24 horas. Consulte o Diário de protocolos.','preocupação');choreography.show('protocol',{level:2,duration:6500});await put('pingState',{id,day,at:now});};if(navigator.locks)await navigator.locks.request('pingnet-protocol-reminder',work);else await work();}catch(e){console.error(e)}finally{protocolReminderBusy=false;}}
setInterval(remindProtocols,60000);

// Contextual roles: explicit invitation, never interrupts a show or reminder.
let lastRoleAt=0;
document.addEventListener('click',e=>{const b=e.target.closest('[data-ping-role]');if(!b)return;const id=b.dataset.pingRole,r=personalities[id],status=document.querySelector('#ping-role-status');if(!r)return;const now=Date.now();if(!settings().visible||document.hidden||drag||showing||now<Math.max(reminderUntil,opinionUntil)||!bubble.hidden||document.documentElement.hasAttribute('data-starting')||now-lastRoleAt<1500){if(status)status.textContent='Ping ocupado ou oculto. Tente novamente quando estiver disponível.';return;}lastRoleAt=now;opinionUntil=now+12000;sync.speak(r.line,r.emotion,undefined,()=>{const s=settings();if(r.sound&&s.visible&&s.comedy&&!s.silent&&!document.hidden&&!showing)playEffect(r.sound,s.comedyVolume);});choreography.show(id,{level:2,duration:11000});if(status)status.textContent='Ping '+r.name+' em cena.';});

document.addEventListener('pingnet:museum-try',e=>{const d=e.detail;if(!d||!Array.isArray(d.codes)||!d.codes.length||d.codes.some(c=>!/^([0-9a-f]+_)*[0-9a-f]+$/.test(c)))return;const now=Date.now();d.accepted=!!(!showing&&!drag&&bubble.hidden&&now>=Math.max(reminderUntil,opinionUntil)&&choreography.show(d.codes,{level:1,duration:7000}));});

// Shared show lock prevents overlapping Comedy Club and fictional acts.
function startAct(id){const status=document.querySelector('#entertainment-status'),now=Date.now(),s=settings();if(id==='stop'){if(entertainmentActive)cancelShow();if(status)status.textContent='Apresentação encerrada.';return;}if(!s.visible||!s.jokes||showing||drag||document.hidden||!bubble.hidden||now<Math.max(reminderUntil,opinionUntil)||document.documentElement.hasAttribute('data-starting')||nextShow-now<60000){if(status)status.textContent='Ping indisponível. Aguarde ou confira as configurações de piadas.';return;}const act=chooseAct(id,lastAct);if(!act)return;lastAct=act.id;lastActAt=now;showing=true;entertainmentActive=true;const token=++showToken;const valid=()=>entertainmentActive&&token===showToken&&settings().visible&&settings().jokes&&!document.hidden&&!drag;const later=(fn,ms)=>{showTimer=setTimeout(()=>{if(valid())fn();},ms);};function step(i){if(!valid())return;if(i>=act.frames.length){entertainmentActive=false;showing=false;choreography.clear();lastShow=Date.now();if(status?.isConnected)status.textContent='Apresentação concluída.';return;}const f=act.frames[i];choreography.show(f.props,{level:3,duration:12000});sync.speak(f.line,f.emotion,undefined,async()=>{if(!valid())return;const prefs=settings();if(f.sound&&prefs.comedy&&!prefs.silent)await Promise.race([Promise.resolve(playEffect(f.sound,prefs.comedyVolume)),new Promise(r=>setTimeout(r,8000))]);if(valid())later(()=>step(i+1),2500);},9000);}
if(status)status.textContent='Ping em cena!';step(0);}
document.addEventListener('click',e=>{const b=e.target.closest('[data-ping-act]');if(b)startAct(b.dataset.pingAct);});
// Rare voluntary-style interlude, only while idle and visible; no catch-up.
setInterval(()=>{if(Date.now()-lastActAt>=expressivityLevels[settings().expressivity].interval&&Date.now()-lastShow>=120000&&Math.random()<0.15)startAct('random');},60000);
