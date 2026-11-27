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
