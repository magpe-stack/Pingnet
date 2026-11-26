export const labels={waiting:'Aguardando coleta',stable:'Conexão estável',slow:'Engasgos',suspect:'Possível sinal enganoso',checking:'Verificando interrupção',down:'Interrupção observada',recovered:'Conexão recuperada',unknown:'Observação inconclusiva'};
export function classify(results,online,previous={}){
 const good=results.filter(r=>r.result==='verified');
 if(results.length!==2||results.some(r=>['restricted','unexpected'].includes(r.result)))return {state:'unknown',failures:0};
 if(good.length){return {state:previous.state==='down'?'recovered':good.length<2||good.some(r=>r.ms>350)?'slow':'stable',failures:0};}
 const failures=(previous.failures||0)+1;
 return {state:failures>=3?'down':online?'suspect':'checking',failures};
}
