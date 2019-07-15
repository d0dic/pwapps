const cacheName = 'food-vey-v5'
const assets = [
    '/',
    '/index.html',
    '/js/materialize.min.js',
    '/css/materialize.min.css',
    '/css/styles.css',
    '/js/app.js',
    '/js/ui.js',
    '/images/icons/foodvey-256x256.png',
    'https://fonts.googleapis.com/icon?family=Material+Icons',
    'https://fonts.gstatic.com/s/materialicons/v47/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2',
]

self.addEventListener('install', evt => {
    // console.log('service worker installed', evt)
    evt.waitUntil(
        caches.open(cacheName).then(cache => {
            cache.addAll(assets)
        })
    )
})

self.addEventListener('activate', evt => {
    // console.log('service worker activated', evt)
    evt.waitUntil(
        caches.keys().then(
            keys => Promise.all(
                keys
                    .filter(key => key !== cacheName)
                    .map(key => caches.delete(key))
            )
        )
    )
})

// self.addEventListener('push', evt => console.log('service worker push registered', evt))

self.addEventListener(
    'fetch',
    evt => {
        // console.log('service worker fetch triggered', evt.request)
        evt.respondWith(
            caches.match(evt.request)
                .then(cachedAsset => cachedAsset || fetch(evt.request))
        )
    },
)