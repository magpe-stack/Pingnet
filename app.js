import {mountCritical} from './critical-hours.js';
let refreshCritical=null;
import {mountComparisons} from './comparisons.js';
let refreshComparisons=null;
import {mountHistory} from './history.js';
let refreshHistory=null;
import {paintTimeline} from './timeline.js';
import {summarize,dayBounds} from './analytics.js';
import {list} from './database.js';
import {labels} from './states.js';
import {start,stop,snapshot,loadLatest,targets} from './monitor.js';
import {initializeDatabase,databaseStatus,get,put} from './database.js';
import {themes,validTheme} from './themes.js';
import {groups,current} from './navigation.js';import {getMode,saveMode,getTheme,saveTheme} from './preferences.js';import {render} from './views.js';
const main=document.querySelector('main'),nav=document.querySelector('nav'),menu=document.querySelector('#menu'),mode=document.querySelector('#mode');
nav.innerHTML=groups.map(([label,items])=>`<details><summary>${label}</summary>${items.map(([key,name])=>`<a href="#${key}">${name}</a>`).join('')}</details>`).join('')+`<details><summary>Exibição</summary><button id="fullscreen" type="button">Tela cheia</button><p id="fullscreen-status" role="status"></p><button id="pwa-install" type="button" hidden>Instalar Pingnet</button><button id="pwa-update" type="button" hidden>Aplicar atualização</button><button id="pwa-check" type="button">Verificar atualização</button><p id="pwa-status" role="status" aria-live="polite">Preparando funcionamento offline…</p></details>`;
function close(focus=false){nav.hidden=true;menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Abrir menu');if(focus)menu.focus()}
function show(focus=false){const key=current();refreshHistory=null;refreshComparisons=null;refreshCritical=null;main.innerHTML=render(key);if(key==='historico')refreshHistory=mountHistory(main);if(key==='comparativos')refreshComparisons=mountComparisons(main);if(key==='horarios-criticos')refreshCritical=mountCritical(main);main.dataset.page=key;main.scrollTop=0;for(const a of nav.querySelectorAll('a')){if(a.hash===`#${key}`)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current')}close();syncAppearance();if(key==='configuracoes')refreshDatabase();if(key==='inicio'){renderMonitor();refreshAnalytics();}if(key==='linha-do-tempo'){const input=main.querySelector('#timeline-date');const d=new Date();input.value=input.max=localDate(d);}if(key==='inicio'||key==='linha-do-tempo')refreshTimeline();if(focus)main.focus()}
function apply(m){document.documentElement.dataset.mode=m;mode.textContent=m==='dark'?'☀':'☾';mode.setAttribute('aria-pressed',String(m==='dark'));syncAppearance();mode.setAttribute('aria-label',m==='dark'?'Ativar modo claro':'Ativar modo escuro')}
function toggle(){const m=document.documentElement.dataset.mode==='dark'?'light':'dark';apply(m);saveMode(m);persistAppearance()}
menu.addEventListener('click',()=>{if(!nav.hidden){close(true);return}nav.hidden=false;menu.setAttribute('aria-expanded','true');menu.setAttribute('aria-label','Fechar menu');const active=nav.querySelector('[aria-current=page]');if(active){active.closest('details').open=true;active.focus()}else nav.querySelector('summary').focus()});mode.addEventListener('click',toggle);main.addEventListener('click',e=>{if(e.target.closest('[data-action=mode]'))toggle()});nav.addEventListener('click',e=>{if(e.target.closest('a')?.hash===location.hash){close();main.focus()}});document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!nav.hidden)close(true)});document.addEventListener('click',e=>{if(!nav.hidden&&!nav.contains(e.target)&&!menu.contains(e.target))close()});window.addEventListener('hashchange',()=>show(true));function syncAppearance(){const root=document.documentElement;const t=themes.find(t=>t.id===root.dataset.theme);document.querySelector('meta[name=theme-color]').content=getComputedStyle(root).getPropertyValue('--bg').trim();for(const radio of main.querySelectorAll('input[name=theme]'))radio.checked=radio.value===root.dataset.theme;const status=main.querySelector('#appearance-status');if(status)status.textContent=`Tema ${t?.name||'Café'} · modo ${root.dataset.mode==='dark'?'escuro':'claro'}.`}
main.addEventListener('change',e=>{if(e.target.matches('input[name=theme]')&&validTheme(e.target.value)){document.documentElement.dataset.theme=e.target.value;const saved=saveTheme(e.target.value);persistAppearance();syncAppearance();if(!saved)main.querySelector('#appearance-status').textContent+=' Não foi possível guardar a preferência.';document.dispatchEvent(new CustomEvent('pingnet:theme-selected',{detail:{theme:e.target.value}}))}});
const initial=getTheme();document.documentElement.dataset.theme=validTheme(initial)?initial:'cafe';apply(getMode());show();

const full=document.querySelector('#fullscreen'),fullStatus=document.querySelector('#fullscreen-status');
function syncFull(){full.textContent=document.fullscreenElement?'Sair da tela cheia':'Tela cheia';full.disabled=!document.fullscreenEnabled&&!document.fullscreenElement;fullStatus.textContent=full.disabled?'Tela cheia indisponível neste navegador.':'';}
full.addEventListener('click',async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else await document.documentElement.requestFullscreen();close(true)}catch{fullStatus.textContent='Não foi possível alterar a tela cheia.'}});document.addEventListener('fullscreenchange',syncFull);syncFull();

let appearanceRevision=0;
async function persistAppearance(){appearanceRevision++;try{await put('preferences',{id:'appearance',theme:document.documentElement.dataset.theme,mode:document.documentElement.dataset.mode});}catch(e){console.error('Pingnet: preferências IndexedDB',e);const el=document.querySelector('#database-status');if(el)el.textContent='Não foi possível guardar no banco local.'}}
async function refreshDatabase(){const el=document.querySelector('#database-status');if(!el)return;try{const c=await databaseStatus();el.textContent=`Banco disponível · ${c.profiles} perfil(is) · ${c.measurements} medições · ${c.sessions} sessões · ${c.events} acontecimentos · ${c.notes} anotações.`}catch(e){el.textContent='Banco indisponível: '+e.message}}
main.addEventListener('click',e=>{if(e.target.closest('[data-action=database]'))refreshDatabase()});
(async()=>{const revision=appearanceRevision;try{await initializeDatabase();const pref=await get('preferences','appearance');if(revision!==appearanceRevision)return;if(pref){document.documentElement.dataset.theme=validTheme(pref.theme)?pref.theme:'cafe';apply(pref.mode==='dark'?'dark':'light');saveTheme(document.documentElement.dataset.theme);saveMode(document.documentElement.dataset.mode)}else await persistAppearance();await refreshDatabase()}catch(e){console.error('Pingnet: banco local',e);await refreshDatabase()}})();

function renderMonitor(){
 const box=main.querySelector('#monitor-results');if(!box)return;
 const {running,latest,error}=snapshot();const valid=latest?.version===9&&Number.isFinite(latest.completedAt);const fresh=valid&&running&&Date.now()-latest.completedAt<90000;
 main.querySelector('#connection-state').textContent=fresh?(labels[latest.assessment?.state]||labels.unknown):running?labels.waiting:'Monitoramento inativo';
 main.querySelector('#monitor-status').textContent=error||(!fresh&&valid?'Última rodada registrada': '');
 const time=main.querySelector('#last-update');if(valid){const d=new Date(latest.completedAt);time.dateTime=d.toISOString();time.textContent=(d.toDateString()===new Date().toDateString()?'':d.toLocaleDateString('pt-BR')+' · ')+d.toLocaleTimeString('pt-BR',{hour12:false});}else{time.textContent='—';time.removeAttribute('datetime');}
 box.replaceChildren();for(const t of targets){const card=document.createElement('div');card.className='metric';const label=document.createElement('small'),value=document.createElement('strong');label.textContent=t.name;const r=valid?latest.results?.find(x=>x.target===t.id):null;value.textContent=r?.result==='verified'?r.ms+' ms':'—';card.title=r?.result==='verified'?'Resposta verificada na última rodada':r?'Resposta não verificada':'Aguardando coleta';card.setAttribute('aria-label',t.name+': '+(value.textContent==='—'?card.title:value.textContent));card.append(label,value);box.append(card)}
}
document.addEventListener('pingnet:monitor',renderMonitor);window.addEventListener('pagehide',stop);window.addEventListener('pageshow',()=>start());loadLatest().catch(console.error);start();setInterval(renderMonitor,10000);

async function refreshAnalytics(){
 const panel=main.querySelector('#analytics-status');if(!panel)return;
 try{const [from,to]=dayBounds();const rows=await list('measurements',{index:'profileTime',range:IDBKeyRange.bound(['default',from-90000],['default',to]),limit:Infinity});if(!panel.isConnected)return;
 const a=summarize(rows,from,Math.min(to,Date.now()+1));const fmt=n=>n.toLocaleString('pt-BR',{maximumFractionDigits:1});const pct=n=>n===null?'—':fmt(n)+'%';const duration=n=>Math.floor(n/60000)+' min '+Math.floor(n%60000/1000)+' s';
 const vals=[a.mean===null?'—':Math.round(a.mean)+' ms',pct(a.stability),a.total?fmt(a.falls):'—',a.observed?duration(a.down):'—',a.observed?duration(a.longest):'—',a.total?fmt(a.slow):'—'];
 vals.forEach((v,i)=>main.querySelector('#stat-'+i).textContent=v);
 [fmt(a.total),fmt(a.ok),fmt(a.failed),pct(a.valid)].forEach((v,i)=>main.querySelector('#collect-'+i).textContent=v);
 const bar=main.querySelector('#collection-bar');bar.children[0].style.width=(a.valid??0)+'%';bar.children[1].style.width=(a.total?100-a.valid:0)+'%';bar.setAttribute('aria-label',a.total?pct(a.valid)+' de respostas válidas':'Sem coletas');panel.textContent=a.observed?'Tempo classificado: '+duration(a.observed)+' (estimado).':'Sem intervalo classificado suficiente.';
 }catch(e){if(panel.isConnected)panel.textContent='Não foi possível calcular os indicadores locais.';console.error(e);}
}
document.addEventListener('pingnet:monitor',refreshAnalytics);setInterval(refreshAnalytics,60000);

function localDate(d){return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;}
async function refreshTimeline(){const el=main.querySelector('[data-timeline]');if(!el)return;const input=main.querySelector('#timeline-date');const value=input?.value;const date=value?new Date(value+'T00:00:00'):new Date();if(!Number.isFinite(+date))return;const [from,to]=dayBounds(date);try{const rows=await list('measurements',{index:'profileTime',range:IDBKeyRange.bound(['default',from-90000],['default',to+90000]),limit:Infinity});if(el.isConnected&&input?.value===value)paintTimeline(el,rows,from,to);}catch(e){if(el.isConnected)el.querySelector('.timeline-info').textContent='Não foi possível ler as medições.';}}
main.addEventListener('change',e=>{if(e.target.id==='timeline-date')refreshTimeline()});document.addEventListener('pingnet:monitor',refreshTimeline);setInterval(refreshTimeline,60000);

document.addEventListener('pingnet:monitor',()=>refreshHistory?.());

document.addEventListener('pingnet:monitor',()=>refreshComparisons?.());

document.addEventListener('pingnet:monitor',()=>refreshCritical?.());
