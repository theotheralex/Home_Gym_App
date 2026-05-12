const C='toji-v37';
self.addEventListener('install',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.map(k=>caches.delete(k)))).then(()=>caches.open(C).then(c=>c.add('./'))));self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{e.respondWith(fetch(e.request).then(resp=>{const cl=resp.clone();caches.open(C).then(c=>c.put(e.request,cl));return resp;}).catch(()=>caches.match(e.request)));});
