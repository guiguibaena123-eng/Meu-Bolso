/* Meu Bolso: guarda o app no aparelho para abrir sem internet. Ao publicar uma versão nova, troque o número em VERSAO. */
const VERSAO='meu-bolso-v17';
const ARQUIVOS=['./','./index.html','./manifest.webmanifest','./icon-v2-192.png','./icon-v2-512.png','./apple-touch-icon-v2.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(VERSAO).then(c=>c.addAll(ARQUIVOS.map(u=>new Request(u,{cache:'reload'})))).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==VERSAO).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  const req=e.request;
  if(req.method!=='GET')return;
  e.respondWith(
    caches.match(req,{ignoreSearch:true}).then(hit=>hit||fetch(req).then(res=>{
      if(res&&res.ok&&new URL(req.url).origin===location.origin){const copia=res.clone();caches.open(VERSAO).then(c=>c.put(req,copia))}
      return res;
    }).catch(()=>req.mode==='navigate'?caches.match('./index.html'):Response.error()))
  );
});
/* dica diária de investimento (notificação enviada pelo GitHub Actions) */
self.addEventListener('push',e=>{
  let d={};
  try{d=e.data?e.data.json():{}}catch(x){d={body:e.data?e.data.text():''}}
  e.waitUntil(self.registration.showNotification(d.title||'Dica de investimento',{
    body:d.body||'Abra o Meu Bolso para ver a dica de hoje.',icon:'icon-v2-192.png',badge:'icon-v2-192.png',tag:'dica-diaria',data:{url:d.url||'./'}
  }));
});
self.addEventListener('notificationclick',e=>{
  e.notification.close();
  e.waitUntil(self.clients.matchAll({type:'window',includeUncontrolled:true}).then(cs=>{
    for(const c of cs){if('focus' in c)return c.focus()}
    return self.clients.openWindow((e.notification.data&&e.notification.data.url)||'./');
  }));
});
