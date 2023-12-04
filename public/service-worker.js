const CACHE_NAME=['spd/v1'];
const URLS_TO_CACHE = [
    '/',
    '/db.json',
    '/favicon.ico',
    '/manifest.webmanifest',
    '/assets/001.glb',
    '/assets/002.glb',
    '/assets/003.glb',
    '/icons/iconX48.png',
    '/icons/iconX72.png',
    '/icons/iconX96.png',
    '/icons/iconX144.png',
    '/icons/iconX192.png',
    '/icons/iconX512.png'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME[0]).then((cache) => {
            return cache.addAll(URLS_TO_CACHE);
        }).catch((error) => {
            if (error instanceof Error) throw new Error(error.message);
        })
    )
});

self.addEventListener('activate', (event) => {
    const cacheCleanup = caches.keys().then((cacheNames) => {
        return Promise.all(cacheNames.map((cache) => {
            if (!CACHE_NAME.includes(cache))
                return caches.delete(cache)
        }))
    });
    event.waitUntil(cacheCleanup);
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request)
        })
    )
});