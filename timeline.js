import {MAX_GAP} from './sessions.js';
export const kinds={stable:['Estável','#22C55E'],slow:['Engasgos','#EAB308'],suspect:['Possível sinal enganoso','#9333EA'],down:['Interrupção','#EF4444'],gap:['Sem monitoramento','#E9EDF2'],unknown:['Inconclusivo','#94A3B8']};
export function segments(rows,from,to,now=Date.now()){
 const end=Math.min(to,now), out=[];let cursor=from;
 const add=(a,b,k)=>{if(b<=a)return;const last=out.at(-1);if(last?.kind===k&&last.end===a)last.end=b;else out.push({start:a,end:b,kind:k});};
 const sorted=rows.filter(r=>Number.isFinite(r.at)&&Number.isFinite(r.completedAt)).sort((a,b)=>a.at-b.at);
 for(let i=1;i<sorted.length;i++){const p=sorted[i-1],r=sorted[i];if(!p.sessionId||p.sessionId!==r.sessionId||r.at-p.at>MAX_GAP||r.at<=p.at||r.completedAt>now)continue;
 const a=Math.max(from,p.at,cursor),b=Math.min(end,r.at);if(b<=a)continue;add(cursor,a,'gap');const s=p.assessment?.state;add(a,b,s==='recovered'?'stable':s==='checking'?'unknown':s&&s!=='gap'&&kinds[s]?s:'unknown');cursor=b;}
 add(cursor,to,'gap');return out;
}
export function timelineMarkup(full=false){return `<div class="timeline-widget" data-timeline><div class="timeline-track" role="img" aria-label="Sem dados"></div><div class="timeline-axis"><span>00:00</span><span>06:00</span><span>12:00</span><span>18:00</span><span>24:00</span></div><div class="timeline-legend">${Object.entries(kinds).map(([k,[label,color]])=>`<span><i style="background:${color}"></i>${label}${full?` <b data-duration="${k}">—</b>`:''}</span>`).join('')}</div><small class="timeline-info" role="status"></small></div>`;}
export function paintTimeline(el,rows,from,to,now=Date.now()){
 const parts=segments(rows,from,to,now),track=el.querySelector('.timeline-track'), totals={};track.replaceChildren();
 for(const p of parts){const d=p.end-p.start;totals[p.kind]=(totals[p.kind]||0)+d;const span=document.createElement('span');span.style.flexBasis=100*d/(to-from)+'%';span.style.background=kinds[p.kind][1];span.title=`${kinds[p.kind][0]}: ${new Date(p.start).toLocaleTimeString('pt-BR')} – ${new Date(p.end).toLocaleTimeString('pt-BR')}`;track.append(span);}
 const fmt=d=>`${Math.floor(d/3600000)}h ${Math.floor(d%3600000/60000)}min ${Math.floor(d%60000/1000)}s`;track.setAttribute('aria-label',Object.entries(totals).map(([k,d])=>`${kinds[k][0]}: ${fmt(d)}`).join('; '));
 for(const b of el.querySelectorAll('[data-duration]'))b.textContent=fmt(totals[b.dataset.duration]||0);
 el.querySelector('.timeline-info').textContent='Intervalos estimados entre coletas; cinza inclui períodos futuros.';
}
