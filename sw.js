const CACHE_NAME = "v2_cache_app_2_vue"
const urlsToCache = [
    "./",
    "./img/favicon.png",
    "./img/icon32.png",
    "./img/icon64.png",
    "./img/icon128.png",
    "./img/icon256.png",
    "./img/icon512.png",
    "./img/icon1024.png",
    "./resources/js/archive01.js",
    "./resources/css/archive01.css",
    "https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css",
    "https://use.fontawesome.com/releases/v5.14.0/js/all.js",
    "https://cdn.jsdelivr.net/npm/sweetalert2@10",
    "https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.js",
    "https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js",
];

self.addEventListener("install", e => {
    e.waitUntil(
        caches.open(CACHE_NAME).then((cache) =>
            cache
            .addAll(urlsToCache)
            .then(() => self.skipWaiting())
            .catch((err) => console.log(err))
        )
    );
});

self.addEventListener("activate", (e) => {
    const cacheWhitelist = [CACHE_NAME];

    e.waitUntil(
        caches
        .keys()
        .then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
        .then(() => self.clients.claim())
    );
});

self.addEventListener("fetch", (e) => {
    e.respondWith(
        caches.match(e.request).then((res) => {
            if (res) {
                return res;
            }

            return fetch(e.request);
        })
    );
});