import {ready,effectiveSettings as settings} from './settings.js';
const overlay=document.querySelector('#startup');
const started=performance.now();let done=false,ctx,played=false,loaded=false;const blocked=[];
function finish(){if(done)return;done=true;overlay.hidden=true;for(const el of blocked)el.inert=false;document.documentElement.removeAttribute('data-starting');document.removeEventListener('pointerdown',sound,true);document.removeEventListener('keydown',sound,true);if(ctx)ctx.close().catch(()=>{});document.dispatchEvent(new Event('pingnet:startup-end'));}
async function sound(){if(!loaded||settings().silent||done||played||document.hidden||!settings().voice||!settings().volume)return;try{const Audio=window.AudioContext||window.webkitAudioContext;if(!Audio)return;ctx??=new Audio();await ctx.resume();if(settings().silent||done||played||ctx.state!=='running')return;played=true;const t=ctx.currentTime+.015, remaining=Math.max(.1,4-(performance.now()-started)/1000), scale=Math.min(1,remaining/3.75), volume=settings().volume/100;
// Original electronic signature: fixed pitches, warm chord bed and crystalline attacks.
const master=ctx.createGain();master.gain.value=volume*.55;master.connect(ctx.destination);
function note(offset,f,duration,level,bright=true){const at=t+offset*scale,d=duration*scale;for(const [ratio,amp] of (bright?[[1,1],[2,.19],[3,.045]]:[[1,1],[2,.08]])){const o=ctx.createOscillator(),g=ctx.createGain();o.type='sine';o.frequency.value=f*ratio;g.gain.setValueAtTime(.0001,at);g.gain.exponentialRampToValueAtTime(level*amp,at+Math.min(.045,d*.2));g.gain.exponentialRampToValueAtTime(Math.max(.0002,level*amp*.32),at+d*.45);g.gain.exponentialRampToValueAtTime(.0001,at+d);o.connect(g);g.connect(master);o.start(at);o.stop(at+d+.005);o.onended=()=>{o.disconnect();g.disconnect()};}}
for(const f of [146.83,220,293.66])note(0,f,2.1,.065,false);
for(const [offset,f,d] of [[.18,587.33,.8],[.65,739.99,.85],[1.12,880,.9],[1.68,659.25,.9],[2.18,1174.66,1.48]]){note(offset,f,d,.23);note(offset+.14,f,d*.7,.035);}
for(const f of [146.83,293.66,369.99,440,659.25])note(2.18,f,1.48,.085,false);
}catch{}}
if(overlay){for(const el of document.querySelectorAll('body > header,body > main,body > footer,body > .skip')){if(!el.inert){el.inert=true;blocked.push(el)}}document.addEventListener('pointerdown',sound,true);document.addEventListener('keydown',sound,true);ready.then(()=>{loaded=true;overlay.dataset.motion=settings().animations?'on':'off';overlay.querySelector('.startup-ping').hidden=!settings().visible;sound();});setTimeout(finish,Math.max(0,4000-(performance.now()-started)));}

document.addEventListener('pingnet:settings',()=>{if(settings().silent&&ctx){ctx.close().catch(()=>{});ctx=undefined;}});
