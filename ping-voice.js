// Pinglish: original procedural, nonverbal voice. No network or speech service.
export const emotions=Object.freeze({
 entusiasmo:[540,.085,[0,5,9,7],.32], alegria:[480,.105,[0,4,7,4],.24], satisfação:[390,.14,[0,3,5,2],.16], orgulho:[440,.16,[0,5,7,12],.18], reflexão:[330,.19,[0,-2,3,-1],.12], confusão:[410,.14,[0,6,-3,5],.35], surpresa:[500,.09,[0,12,7,10],.4], preocupação:[310,.16,[0,-3,2,-4],.2], impaciência:[420,.075,[0,-2,0,-5],.35], irritação:[260,.11,[0,-5,-2,-7],.48], tristeza:[240,.23,[0,-3,-5,-7],.12], alívio:[350,.17,[0,2,7,4],.14], celebração:[520,.095,[0,7,12,16],.3], brincadeira:[460,.11,[0,7,-2,9],.42], sonolência:[220,.25,[0,-2,-4,-5],.08]});
// Electronic whistles, chirps and glissandi; no sampled character audio.
export function voicePlan(text,emotion='reflexão',random=Math.random){
 const [base,beat,pattern,bend]=emotions[emotion]||emotions.reflexão;
 const words=String(text).trim().split(/\s+/).filter(Boolean);let t=0;const notes=[];
 for(const word of words.slice(0,40)){
  const count=1+(word.length>5?1:0)+(word.length>10?1:0);
  for(let i=0;i<count;i++){
   const duration=Math.max(.065,beat*(.7+random()*1.4));
   const hz=base*1.85*2**(pattern[notes.length%pattern.length]/12)*(.85+random()*.3);
   const direction=pattern[(notes.length+1)%pattern.length]>=pattern[notes.length%pattern.length]?1:-1;
   const kind=random()<.28?'beep':random()<.55?'sweep':'warble';
   notes.push({at:t,duration,hz,bend,kind,direction,span:.22+bend+random()*.55});
   t+=duration+.018+random()*.035;
  }
  t+=/[.!?]$/.test(word)?.16:.045;if(t>6)break;
 }return notes;
}
let ctx,master,active=[],enabled=true,volume=.28,serial=0;
export function stopVoice(){serial++;for(const n of active){try{n.stop()}catch{}}active=[];}
export function configureVoice(options={}){if(typeof options.enabled==='boolean')enabled=options.enabled;if(Number.isFinite(options.volume))volume=Math.max(0,Math.min(1,options.volume));if(master)master.gain.value=volume;if(!enabled)stopVoice();}
export async function unlockVoice(){try{const Audio=window.AudioContext||window.webkitAudioContext;if(!Audio)return false;if(!ctx){ctx=new Audio();master=ctx.createGain();master.gain.value=volume;const limiter=ctx.createDynamicsCompressor();master.connect(limiter);limiter.connect(ctx.destination);}if(ctx.state!=='running')await ctx.resume();return ctx.state==='running';}catch{return false;}}
export function playVoice(text,emotion){
 stopVoice();if(!enabled||!ctx||ctx.state!=='running'||document.hidden)return 0;
 const token=serial,start=ctx.currentTime+.025,plan=voicePlan(text,emotion);
 for(const n of plan){
  const at=start+n.at,end=at+n.duration,osc=ctx.createOscillator(),gain=ctx.createGain(),lfo=ctx.createOscillator(),depth=ctx.createGain();
  osc.type='sine';lfo.type='sine';lfo.frequency.value=n.kind==='warble'?19:8;
  depth.gain.value=n.kind==='warble'?n.hz*.065:n.kind==='sweep'?n.hz*.012:0;
  lfo.connect(depth);depth.connect(osc.frequency);
  const f=n.hz, peak=Math.min(3200,Math.max(180,f*2**(n.direction*n.span)));
  osc.frequency.setValueAtTime(f,at);
  if(n.kind==='beep'){osc.frequency.setValueAtTime(f,at+n.duration*.7);osc.frequency.exponentialRampToValueAtTime(f*.97,end);}
  else {osc.frequency.exponentialRampToValueAtTime(peak,at+n.duration*.55);osc.frequency.exponentialRampToValueAtTime(n.kind==='warble'?f:peak*.91,end);}
  gain.gain.setValueAtTime(.0001,at);gain.gain.exponentialRampToValueAtTime(.19,at+Math.min(.012,n.duration*.2));gain.gain.setValueAtTime(.15,at+n.duration*.72);gain.gain.exponentialRampToValueAtTime(.0001,end);
  osc.connect(gain);gain.connect(master);active.push(osc,lfo);
  osc.onended=()=>{osc.disconnect();lfo.disconnect();depth.disconnect();gain.disconnect();if(token===serial)active=active.filter(x=>x!==osc&&x!==lfo);};
  osc.start(at);lfo.start(at);osc.stop(end+.005);lfo.stop(end+.005);
 }return plan.length?plan.at(-1).at+plan.at(-1).duration:0;
}
export function mountVoice(){const unlock=()=>{unlockVoice().then(ok=>{if(ok){document.removeEventListener('pointerdown',unlock,true);document.removeEventListener('keydown',unlock,true);}})};document.addEventListener('pointerdown',unlock,true);document.addEventListener('keydown',unlock,true);document.addEventListener('visibilitychange',()=>{if(document.hidden)stopVoice()});}
