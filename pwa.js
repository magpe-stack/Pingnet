const install=document.querySelector('#pwa-install'),update=document.querySelector('#pwa-update'),check=document.querySelector('#pwa-check'),status=document.querySelector('#pwa-status');
let promptEvent,registration,reloading=false,applying=false;
const say=s=>status.textContent=s;
window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();promptEvent=e;install.hidden=false});
window.addEventListener('appinstalled',()=>{promptEvent=null;install.hidden=true;say('Pingnet instalado.')});
install.addEventListener('click',async()=>{if(!promptEvent)return;const p=promptEvent;promptEvent=null;install.hidden=true;try{await p.prompt();const result=await p.userChoice;say(result.outcome==='accepted'?'Instalação aceita.':'Instalação dispensada.')}catch{say('Use a opção de instalação do navegador, se disponível.')}});
function ready(){if(registration?.waiting){update.hidden=false;say('Nova versão disponível. Aplique quando desejar.')}else say('Recursos offline preparados. Para instalar, use o menu do navegador se a opção estiver disponível.')}
if('serviceWorker' in navigator && window.isSecureContext){
 navigator.serviceWorker.addEventListener('controllerchange',()=>{if(applying&&!reloading){reloading=true;location.reload()}});
 navigator.serviceWorker.register('./sw.js',{updateViaCache:'none'}).then(r=>{registration=r;if(r.waiting)ready();r.addEventListener('updatefound',()=>{const w=r.installing;w?.addEventListener('statechange',()=>{if(w.state==='installed')ready();if(w.state==='redundant'&&!r.active)say('Não foi possível preparar o cache offline.')})});navigator.serviceWorker.ready.then(ready)}).catch(()=>say('Não foi possível preparar o funcionamento offline.'));
}else{check.disabled=true;say('Instalação offline requer HTTPS ou localhost e navegador compatível.')}
check.addEventListener('click',async()=>{if(!registration){say('Service Worker ainda indisponível.');return}try{await registration.update();if(registration.waiting)ready();else if(registration.installing)say('Preparando atualização…');else say('Nenhuma atualização encontrada.')}catch{say('Não foi possível verificar atualização. Confira a conexão.')}});
update.addEventListener('click',()=>{if(!registration?.waiting)return;applying=true;update.hidden=true;say('Aplicando atualização…');registration.waiting.postMessage({type:'SKIP_WAITING'})});
