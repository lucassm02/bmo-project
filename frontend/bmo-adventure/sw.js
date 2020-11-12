const version = "1.0.2";
const cacheName = "phaser3";
const precacheResources = [
  "./",
  "./main.css",
  "./assets/bomb.png",
  "./assets/bmo.png",
  "./assets/fullscreen.png",
  "./assets/platform.png",
  "./assets/sky.png",
  "./assets/batery.png",
  "./assets/esquerda.png",
  "./assets/direita.png",
  "./assets/cima.png",
  "./assets/baixo.png",
  "./js/cena1.js",
  "./js/cena2.js",
  "./js/index.js",
  "./js/phaser.min.js"
];

self.addEventListener("install", event => {
  console.log("Service worker install event!");
  event.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll(precacheResources).then(() => self.skipWaiting());
    })
  );
});

self.addEventListener("activate", event => {
  console.log("Service worker activate event!");
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", event => {
  console.log("Fetch intercepted for: ", event.request.url);
  event.respondWith(
    caches
      .open(cacheName)
      .then(cache => cache.match(event.request, { ignoreSearch: true }))
      .then(response => {
        return response || fetch(event.request);
      })
  );
});
