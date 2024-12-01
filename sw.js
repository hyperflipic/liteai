const CACHE_NAME = 'ai-nav-cache-v1';
const ASSETS = [
    '/',
    '/index.html',
    '/styles.css',
    '/main.js'
];

self.addEventListener('install', e => e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
));

self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request).then(response => response || fetch(e.request))
    );
});
