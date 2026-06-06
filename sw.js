const CACHE = 'dedo-v1-' + Date.now();
const ASSETS = ['./index.html', './manifest.json'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS))); self.skipWaiting(); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(keys => Promise.all(keys.map(k => caches.delete(k))))); self.clients.claim(); });
self.addEventListener('fetch', e => {
  e.respondWith(fetch(e.request).then(res => {
    if(res && res.status === 200){ const c = res.clone(); caches.open(CACHE).then(ca => ca.put(e.request, c)); }
    return res;
  }).catch(() => caches.match(e.request)));
});
