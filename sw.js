const C='toji-v95';
self.addEventListener('install',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.map(k=>caches.delete(k)))).then(()=>caches.open(C).then(c=>c.add('./'))));self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{const fp=fetch(e.request).then(resp=>{const cl=resp.clone();caches.open(C).then(c=>c.put(e.request,cl));return resp;});e.respondWith(Promise.race([fp,new Promise((_,rej)=>setTimeout(rej,3000))]).catch(()=>caches.match(e.request).then(c=>c||fp)));});
