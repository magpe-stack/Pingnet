// Informal opinion of Ping, not an ISP or bandwidth measurement.
export function rating(snapshot,profile,now=Date.now()){
 const r=snapshot.latest;
 if(!r||r.profileId!==profile||!Number.isFinite(r.completedAt)||now-r.completedAt>90000||now<r.completedAt)return null;
 const state=r.assessment?.state;
 if(!Array.isArray(r.results)||!r.results.length||!['stable','slow','recovered','down'].includes(state))return null;
 if(r.results.some(x=>['restricted','unexpected'].includes(x.result)))return null;
 const sample=[32,33].includes(r.version)?(snapshot.recent||[]).filter(x=>now-x.at<=90000&&x.result==='verified'):r.results;
 if([32,33].includes(r.version)&&state!=='down'&&sample.length<2)return null;
 const good=sample.filter(x=>x.result==='verified');
 if(state==='down')return r.assessment.failures>=3?0:null;
 if(!good.length||good.some(x=>!Number.isFinite(x.ms)||x.ms<0))return null;
 // Continuous interpolation between latency anchors; no extrapolation below zero.
 const anchors=[[0,10],[100,10],[200,9],[350,8],[700,6],[1000,4],[5000,0]];
 const points=ms=>{for(let i=1;i<anchors.length;i++){const [b,y]=anchors[i], [a,x]=anchors[i-1];if(ms<=b)return x+(y-x)*(ms-a)/(b-a);}return 0;};
 return Math.round(good.reduce((sum,x)=>sum+points(x.ms),0)/([32,33].includes(r.version)?good.length:2)*10)/10;
}
export function ratingText(snapshot,profile,now=Date.now()){
 const n=rating(snapshot,profile,now);
 if(n===null)return 'Nota: ainda sem dados suficientes.';
 return `Nota ${n.toLocaleString('pt-BR',{maximumFractionDigits:1})}${snapshot.running?'':' (última rodada; coletas pausadas)'}.`;
}

// Reconstruct each eligible observation using only its own session and past data.
export function ratingPeriods(now){const d=new Date(now);d.setHours(0,0,0,0);const w=new Date(d);w.setDate(w.getDate()-((w.getDay()+6)%7));const m=new Date(d);m.setDate(1);const y=new Date(d);y.setMonth(0,1);return [+d,+w,+m,+y];}
export function historicalRatings(rows,profile,end,starts=ratingPeriods(end-1)){
 const sums=starts.map(()=>0),counts=starts.map(()=>0),recent=new Map();let session;
 for(const r of rows.filter(r=>r.profileId===profile&&[9,32,33].includes(r.version)&&Number.isFinite(r.completedAt)&&r.completedAt<end).sort((a,b)=>a.completedAt-b.completedAt)){
  if(session!==r.sessionId){recent.clear();session=r.sessionId;}
  for(const x of r.results||[])recent.set(x.target,{...x,at:r.completedAt});
  const n=rating({latest:r,recent:[...recent.values()]},profile,r.completedAt);if(n===null)continue;
  starts.forEach((start,i)=>{if(r.completedAt>=start){sums[i]+=Math.round(n*10);counts[i]++;}});
 }
 return counts.map((count,i)=>({count,value:count?sums[i]/count/10:null}));
}
export const formatRating=n=>n===null?'—':n.toLocaleString('pt-BR',{maximumFractionDigits:1});

export function ratingLabels(now){
 const d=new Date(now),w=new Date(ratingPeriods(now)[1]),e=new Date(w);e.setDate(e.getDate()+6);
 const th=new Date(w);th.setDate(th.getDate()+3);const year=th.getFullYear();
 const utc=Date.UTC(year,th.getMonth(),th.getDate());const week=Math.ceil(((utc-Date.UTC(year,0,1))/86400000+1)/7);
 const fmt=x=>x.toLocaleDateString('pt-BR');const month=d.toLocaleDateString('pt-BR',{month:'long'});
 return ['Dia '+fmt(d),'Semana '+String(week).padStart(2,'0')+'/'+year+' ('+fmt(w)+' a '+fmt(e)+')',month[0].toUpperCase()+month.slice(1)+'/'+d.getFullYear(),'Ano '+d.getFullYear()];
}
