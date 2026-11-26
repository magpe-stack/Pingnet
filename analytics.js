import {MAX_GAP} from './sessions.js';
// Somente registros reais; intervalos estimados entre observações consecutivas.
export function summarize(rows,from,to){
 const sorted=rows.filter(r=>Number.isFinite(r.at)&&Number.isFinite(r.completedAt)).sort((a,b)=>a.at-b.at);
 let total=0,ok=0,sum=0,n=0,observed=0,available=0,down=0,longest=0,streak=0,falls=0,slow=0;
 let previous=null;
 for(const r of sorted){
  const state=r.assessment?.state;
  if(r.completedAt>=from&&r.completedAt<to){for(const x of r.results||[]){total++;if(x.result==='verified'){ok++;if(Number.isFinite(x.ms)&&x.ms>=0){sum+=x.ms;n++;}}}
   if(state==='slow')slow++;
   if(state==='down'&&(!previous||previous.sessionId!==r.sessionId||previous.assessment?.state!=='down'||r.at-previous.at>MAX_GAP))falls++;
  }
  if(previous&&r.sessionId&&r.sessionId===previous.sessionId&&r.at>previous.at&&r.at-previous.at<=MAX_GAP){
   const d=Math.max(0,Math.min(to,r.at)-Math.max(from,previous.at));
   const p=previous.assessment?.state;
   if(['stable','slow','recovered','down'].includes(p)){observed+=d;if(p==='down'){down+=d;streak+=d;longest=Math.max(longest,streak);}else{available+=d;streak=0;}}else streak=0;
  }else streak=0;
  previous=r;
 }
 return {total,ok,failed:total-ok,valid:total?100*ok/total:null,mean:n?sum/n:null,observed,stability:observed?100*available/observed:null,down,longest,falls,slow};
}
export function dayBounds(now=new Date()){const start=new Date(now);start.setHours(0,0,0,0);const end=new Date(start);end.setDate(end.getDate()+1);return [start.getTime(),end.getTime()];}
