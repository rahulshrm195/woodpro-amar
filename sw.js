// ══════════════════════════════════════════════
//  WoodPro Service Worker — sw.js
//  Version: 1.1.0
//  Cache name is bumped with every release so a
//  new version never serves a stale shell.
// ══════════════════════════════════════════════

const CACHE_NAME = 'woodpro-v1.1.0';

const PRECACHE = [
  './',
  './index.html',
  './manifest.json',
  './offline.html',
  './icon-192x192.png',
  './icon-512x512.png',
  './logo-white.png'
];

// ── INSTALL ──
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(PRECACHE.map(u => new Request(u, { cache: 'reload' }))))
      .then(() => self.skipWaiting())
      .catch(err => console.warn('[SW] precache failed', err))
  );
});

// ── ACTIVATE ──
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// ── FETCH: network-first, cache fallback ──
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  const url = event.request.url;
  // Always live — never cache Firebase / Google traffic
  if (url.includes('firestore.googleapis.com') ||
      url.includes('firebaseapp.com') ||
      url.includes('firebaseio.com') ||
      url.includes('identitytoolkit') ||
      url.includes('googleapis.com') ||
      url.includes('gstatic.com')) return;

  event.respondWith(
    fetch(event.request)
      .then(res => {
        if (res && res.status === 200 && res.type === 'basic') {
          const clone = res.clone();
          caches.open(CACHE_NAME).then(c => c.put(event.request, clone));
        }
        return res;
      })
      .catch(() =>
        caches.match(event.request).then(hit =>
          hit || caches.match('./index.html').then(idx => idx || caches.match('./offline.html'))
        )
      )
  );
});

// ── MESSAGES ──
self.addEventListener('message', event => {
  if (event.data === 'SKIP_WAITING') self.skipWaiting();
  if (event.data === 'GET_VERSION' && event.source) {
    event.source.postMessage({ version: CACHE_NAME });
  }
});
