import {mountDetective} from './detective.js';
import {mountProfileComparison} from './profile-comparison.js';
import {mountProtocols} from './protocols.js';
import {mountCoverage} from './coverage.js';
import {mountRecords} from './records.js';
import {mountCalendar} from './calendar.js';
import {historicalRatings,ratingPeriods,formatRating,ratingLabels} from './ping-rating.js';
import {mountReport} from './reports.js';
import {bindFiles} from './files.js';
import {settings,ready,mountSettings,bindSettings} from './settings.js';
import {initProfiles,activeProfile,selectProfile,mountProfiles,deleteProfile} from './profiles.js';
import {resetProfile} from './monitor.js';
import {activeId} from './profiles.js';
import {mountNotes} from './notes.js';
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
nav.innerHTML=groups.map(([label,items])=>`<details><summary>${label}</summary>${items.map(([key,name])=>`<a href="#${key}">${name}</a>`).join('')}${label==='Configurações'?`<button id="pwa-check" type="button">Atualizações</button><button id="pwa-install" type="button" hidden>Instalar Pingnet</button><button id="pwa-update" type="button" hidden>Aplicar atualização</button><p id="pwa-status" role="status" aria-live="polite">Preparando funcionamento offline…</p>`:''}</details>`).join('');
nav.insertAdjacentHTML('beforeend',`<details><summary>Arquivo</summary><button id="file-save" type="button">Salvar</button><button id="file-open" type="button">Abrir</button><a href="#imprimir">Imprimir</a><input id="file-input" type="file" accept=".json,application/json" hidden><p id="file-status" role="status"></p></details>`);bindFiles(nav);
function close(focus=false){nav.hidden=true;menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Abrir menu');if(focus)menu.focus()}
function show(focus=false){const key=current();refreshHistory=null;refreshComparisons=null;refreshCritical=null;main.innerHTML=render(key);const heading=main.querySelector("h1");if(heading&&key!=="minha-conexao"&&!["manual","sobre","configuracoes","comparar-perfis"].includes(key)){const badge=document.createElement("small");badge.className="active-profile";badge.textContent=activeProfile().name;heading.append(badge);}if(key==='minha-conexao')mountProfiles(main,async id=>{await stop("profile-switch");await selectProfile(id);show();await resetProfile();},async id=>{await stop("profile-delete");try{await deleteProfile(id);}finally{show();await resetProfile();}});if(key==='anotacoes')mountNotes(main);if(key==='imprimir'||key==='dossie')mountReport(main,key==='dossie');if(key==='calendario')mountCalendar(main);if(key==='recordes')mountRecords(main);if(key==='cobertura')mountCoverage(main);if(key==='protocolos')mountProtocols(main);if(key==='comparar-perfis')mountProfileComparison(main);if(key==='detective')mountDetective(main);if(key==='historico')refreshHistory=mountHistory(main);if(key==='comparativos')refreshComparisons=mountComparisons(main);if(key==='horarios-criticos')refreshCritical=mountCritical(main);main.dataset.page=key;main.scrollTop=0;for(const a of nav.querySelectorAll('a')){if(a.hash===`#${key}`)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current')}close();syncAppearance();if(key==='configuracoes'){refreshDatabase();syncFull();mountSettings(main);syncMonitorSettings();}if(key==='inicio'){renderMonitor();refreshAnalytics();refreshRatingAverages();}if(key==='linha-do-tempo'){const input=main.querySelector('#timeline-date');const d=new Date();input.value=input.max=localDate(d);}if(key==='inicio'||key==='linha-do-tempo')refreshTimeline();if(focus)main.focus()}
function apply(m){document.documentElement.dataset.mode=m;mode.textContent=m==='dark'?'☀':'☾';mode.setAttribute('aria-pressed',String(m==='dark'));syncAppearance();mode.setAttribute('aria-label',m==='dark'?'Ativar modo claro':'Ativar modo escuro')}
function toggle(){const m=document.documentElement.dataset.mode==='dark'?'light':'dark';apply(m);saveMode(m);persistAppearance()}
menu.addEventListener('click',()=>{if(!nav.hidden){close(true);return}nav.hidden=false;menu.setAttribute('aria-expanded','true');menu.setAttribute('aria-label','Fechar menu');const active=nav.querySelector('[aria-current=page]');if(active){active.closest('details').open=true;active.focus()}else nav.querySelector('summary').focus()});mode.addEventListener('click',toggle);main.addEventListener('click',e=>{if(e.target.closest('[data-action=mode]'))toggle()});nav.addEventListener('click',e=>{if(e.target.closest('a')?.hash===location.hash){close();main.focus()}});document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!nav.hidden)close(true)});document.addEventListener('click',e=>{if(!nav.hidden&&!nav.contains(e.target)&&!menu.contains(e.target))close()});window.addEventListener('hashchange',()=>show(true));function syncAppearance(){const root=document.documentElement;const t=themes.find(t=>t.id===root.dataset.theme);document.querySelector('meta[name=theme-color]').content=getComputedStyle(root).getPropertyValue('--bg').trim();for(const radio of main.querySelectorAll('input[name=theme]'))radio.checked=radio.value===root.dataset.theme;const status=main.querySelector('#appearance-status');if(status)status.textContent=`Tema ${t?.name||'Café'} · modo ${root.dataset.mode==='dark'?'escuro':'claro'}.`}
main.addEventListener('change',e=>{if(e.target.matches('input[name=theme]')&&validTheme(e.target.value)){document.documentElement.dataset.theme=e.target.value;const saved=saveTheme(e.target.value);persistAppearance();syncAppearance();if(!saved)main.querySelector('#appearance-status').textContent+=' Não foi possível guardar a preferência.';}});
const initial=getTheme();document.documentElement.dataset.theme=validTheme(initial)?initial:'cafe';apply(getMode());

const full=document.querySelector('#fullscreen'),fullStatus=document.querySelector('#pwa-status');
function syncFull(){full.textContent=document.fullscreenElement?'⤢':'⛶';full.title=document.fullscreenElement?'Sair da tela cheia':'Tela cheia';full.setAttribute('aria-label',full.title);full.disabled=!document.fullscreenEnabled&&!document.fullscreenElement;for(const b of main.querySelectorAll('[data-action=fullscreen]')){b.disabled=full.disabled;b.textContent=full.title;}}
full.addEventListener('click',async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else await document.documentElement.requestFullscreen();close(true)}catch{fullStatus.textContent='Não foi possível alterar a tela cheia.'}});main.addEventListener('click',e=>{if(e.target.closest('[data-action=fullscreen]'))full.click()});document.addEventListener('fullscreenchange',syncFull);syncFull();

let appearanceRevision=0;
async function persistAppearance(){appearanceRevision++;try{await put('preferences',{id:'appearance',theme:document.documentElement.dataset.theme,mode:document.documentElement.dataset.mode});}catch(e){console.error('Pingnet: preferências IndexedDB',e);const el=document.querySelector('#database-status');if(el)el.textContent='Não foi possível guardar no banco local.'}}
async function refreshDatabase(){const el=document.querySelector('#database-status');if(!el)return;try{const c=await databaseStatus();el.textContent=`Banco disponível · ${c.profiles} perfil(is) · ${c.measurements} medições · ${c.sessions} sessões · ${c.events} acontecimentos · ${c.notes} anotações.`}catch(e){el.textContent='Banco indisponível: '+e.message}}
main.addEventListener('click',e=>{if(e.target.closest('[data-action=database]'))refreshDatabase()});
(async()=>{const revision=appearanceRevision;try{await initializeDatabase();const pref=await get('preferences','appearance');if(revision!==appearanceRevision)return;if(pref){document.documentElement.dataset.theme=validTheme(pref.theme)?pref.theme:'cafe';apply(pref.mode==='dark'?'dark':'light');saveTheme(document.documentElement.dataset.theme);saveMode(document.documentElement.dataset.mode)}else await persistAppearance();await refreshDatabase()}catch(e){console.error('Pingnet: banco local',e);await refreshDatabase()}})();

function renderMonitor(){
 const box=main.querySelector('#monitor-results');if(!box)return;
 const {running,latest,error,recent}=snapshot();const valid=[9,32,33].includes(latest?.version)&&Number.isFinite(latest.completedAt);const fresh=valid&&running&&Date.now()-latest.completedAt<90000;
 main.querySelector('#connection-state').textContent=fresh?(labels[latest.assessment?.state]||labels.unknown):running?labels.waiting:'Monitoramento inativo';
 main.querySelector('#monitor-status').textContent=error||(!fresh&&valid?'Última rodada registrada': '');
 const time=main.querySelector('#last-update');if(valid){const d=new Date(latest.completedAt);time.dateTime=d.toISOString();time.textContent=(d.toDateString()===new Date().toDateString()?'':d.toLocaleDateString('pt-BR')+' · ')+d.toLocaleTimeString('pt-BR',{hour12:false});}else{time.textContent='—';time.removeAttribute('datetime');}
 box.replaceChildren();for(const t of targets){const card=document.createElement('div');card.className='metric';const label=document.createElement('small'),value=document.createElement('strong');label.textContent=t.name;const r=recent.find(x=>x.target===t.id);value.textContent=r?.result==='verified'?r.ms+' ms':'—';card.title=r?.result==='verified'?'Resposta verificada na última rodada':r?'Resposta não verificada':'Aguardando coleta';card.setAttribute('aria-label',t.name+': '+(value.textContent==='—'?card.title:value.textContent));const stamp=document.createElement('small');stamp.textContent=r?new Date(r.at).toLocaleTimeString('pt-BR')+(Date.now()-r.at>90000?' · anterior':''):'Aguardando';card.append(label,value,stamp);box.append(card)}
}
document.addEventListener('pingnet:monitor',renderMonitor);window.addEventListener('pagehide',stop);window.addEventListener('pageshow',e=>{if(e.persisted&&settings().autoCollect)start()});initProfiles().then(()=>{show();return loadLatest()}).then(()=>ready).then(()=>{if(settings().autoCollect)start()}).catch(e=>{main.textContent="Não foi possível iniciar os perfis: "+e.message;});setInterval(renderMonitor,10000);

async function refreshAnalytics(){
 const panel=main.querySelector('#analytics-status');if(!panel)return;
 try{const [from,to]=dayBounds();const rows=await list('measurements',{index:'profileTime',range:IDBKeyRange.bound([activeId(),from-90000],[activeId(),to]),limit:Infinity});if(!panel.isConnected)return;
 const a=summarize(rows,from,Math.min(to,Date.now()+1));const fmt=n=>n.toLocaleString('pt-BR',{maximumFractionDigits:1});const pct=n=>n===null?'—':fmt(n)+'%';const duration=n=>Math.floor(n/60000)+' min '+Math.floor(n%60000/1000)+' s';
 const vals=[a.mean===null?'—':Math.round(a.mean)+' ms',pct(a.stability),a.total?fmt(a.falls):'—',a.observed?duration(a.down):'—',a.observed?duration(a.longest):'—',a.total?fmt(a.slow):'—'];
 vals.forEach((v,i)=>main.querySelector('#stat-'+i).textContent=v);
 [fmt(a.total),fmt(a.ok),fmt(a.failed),pct(a.valid)].forEach((v,i)=>main.querySelector('#collect-'+i).textContent=v);
 const bar=main.querySelector('#collection-bar');bar.children[0].style.width=(a.valid??0)+'%';bar.children[1].style.width=(a.total?100-a.valid:0)+'%';bar.setAttribute('aria-label',a.total?pct(a.valid)+' de respostas válidas':'Sem coletas');panel.textContent=a.observed?'Tempo classificado: '+duration(a.observed)+' (estimado).':'Sem intervalo classificado suficiente.';
 }catch(e){if(panel.isConnected)panel.textContent='Não foi possível calcular os indicadores locais.';console.error(e);}
}
document.addEventListener('pingnet:monitor',refreshAnalytics);setInterval(refreshAnalytics,60000);

function localDate(d){return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;}
async function refreshTimeline(){const el=main.querySelector('[data-timeline]');if(!el)return;const input=main.querySelector('#timeline-date');const value=input?.value;const date=value?new Date(value+'T00:00:00'):new Date();if(!Number.isFinite(+date))return;const [from,to]=dayBounds(date);try{const rows=await list('measurements',{index:'profileTime',range:IDBKeyRange.bound([activeId(),from-90000],[activeId(),to+90000]),limit:Infinity});if(el.isConnected&&input?.value===value)paintTimeline(el,rows,from,to);}catch(e){if(el.isConnected)el.querySelector('.timeline-info').textContent='Não foi possível ler as medições.';}}
main.addEventListener('change',e=>{if(e.target.id==='timeline-date')refreshTimeline()});document.addEventListener('pingnet:monitor',refreshTimeline);setInterval(refreshTimeline,60000);

document.addEventListener('pingnet:monitor',()=>refreshHistory?.());

document.addEventListener('pingnet:monitor',()=>refreshComparisons?.());

document.addEventListener('pingnet:monitor',()=>refreshCritical?.());

main.addEventListener('click',e=>{if(e.target.matches('input[name=theme]')&&validTheme(e.target.value))document.dispatchEvent(new CustomEvent('pingnet:theme-selected',{detail:{theme:e.target.value}}));});

bindSettings(main);function syncMonitorSettings(){const el=main.querySelector('#settings-monitor');if(el){const s=snapshot();el.textContent=s.error||(s.running?'Monitoramento ativo':'Monitoramento pausado ou encerrado');}}document.addEventListener('pingnet:monitor',syncMonitorSettings);main.addEventListener('click',e=>{if(e.target.closest('[data-action=start-monitor]'))start();if(e.target.closest('[data-action=stop-monitor]'))stop('manual');});

main.addEventListener("click",e=>{const a=e.target.closest("[data-manual-anchor]");if(!a)return;e.preventDefault();const h=document.getElementById(a.dataset.manualAnchor);if(h){h.focus({preventScroll:true});h.scrollIntoView({block:"start"});}});

var ratingBusy=false;
async function refreshRatingAverages(){const el=main.querySelector('.rating-averages');if(!el||ratingBusy)return;ratingBusy=true;const profile=activeId(),now=Date.now(),starts=ratingPeriods(now);const labels=ratingLabels(now);const d=new Date(now);const month=d.toLocaleDateString('pt-BR',{month:'long'});const tags=['Hoje',labels[1].split(' (')[0],month[0].toUpperCase()+month.slice(1),String(d.getFullYear())];const details=[d.toLocaleDateString('pt-BR'),labels[1].split(' (')[1].replace(/\)$/,'').replace(/\/\d{4}/g,''),String(d.getFullYear()),''];el.querySelectorAll('.rating-card').forEach((card,i)=>{card.querySelector('.rating-tag').textContent=tags[i];card.querySelector('.rating-period').textContent=details[i];card.setAttribute('aria-label',labels[i]);});try{const rows=await list('measurements',{index:'profileTime',range:IDBKeyRange.bound([profile,Math.min(...starts)-90000],[profile,now]),limit:Infinity});if(!el.isConnected||profile!==activeId())return;historicalRatings(rows,profile,now+1,starts).forEach(({value,count},i)=>{const node=el.querySelector('#rating-average-'+i);node.textContent=formatRating(value);node.title=count+' notas válidas';});}catch(e){console.error(e);if(el.isConnected)el.querySelectorAll('strong').forEach(n=>n.textContent='—');}finally{ratingBusy=false;}}
setInterval(refreshRatingAverages,60000);
