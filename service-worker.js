
const CACHE_NAME = ['spd/v1'];
const URLS_TO_CACHE = [
  '/smartphone-project/',
  '/smartphone-project/db.json',
  '/smartphone-project/favicon.ico',
  '/smartphone-project/manifest.json',
  '/smartphone-project/threeD/001.glb',
  '/smartphone-project/threeD/002.glb',
  '/smartphone-project/threeD/003.glb',
  '/smartphone-project/icons/iconX48.png',
  '/smartphone-project/icons/iconX72.png',
  '/smartphone-project/icons/iconX96.png',
  '/smartphone-project/icons/iconX144.png',
  '/smartphone-project/icons/iconX192.png',
  '/smartphone-project/icons/iconX512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME[0]).then((cache) => {
      return cache.addAll(URLS_TO_CACHE);
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