// Informal opinion of Ping, not an ISP or bandwidth measurement.
export function rating(snapshot,profile,now=Date.now()){
 const r=snapshot.latest;
 if(!r||r.profileId!==profile||!Number.isFinite(r.completedAt)||now-r.completedAt>90000||now<r.completedAt)return null;
 const state=r.assessment?.state;
 if(!Array.isArray(r.results)||r.results.length!==2||!['stable','slow','recovered','down'].includes(state))return null;
 if(r.results.some(x=>['restricted','unexpected'].includes(x.result)))return null;
 const good=r.results.filter(x=>x.result==='verified');
 if(state==='down')return good.length===0&&r.assessment.failures>=3?0:null;
 if(!good.length||good.some(x=>!Number.isFinite(x.ms)||x.ms<0))return null;
 const points=ms=>ms<=100?10:ms<=200?9:ms<=350?8:ms<=700?6:4;
 return Math.round(good.reduce((sum,x)=>sum+points(x.ms),0)/2*10)/10;
}
export function ratingText(snapshot,profile,now=Date.now()){
 const n=rating(snapshot,profile,now);
 if(n===null)return 'Nota: ainda sem dados suficientes.';
 return `Nota do Ping: ${n.toLocaleString('pt-BR',{maximumFractionDigits:1})}/10${snapshot.running?' nesta rodada':' na última rodada; coletas pausadas'}.`;
}
