/* Meu Bolso: guarda o app no aparelho para abrir sem internet. Ao publicar uma versão nova, troque o número em VERSAO. */
const VERSAO='meu-bolso-v36';
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
