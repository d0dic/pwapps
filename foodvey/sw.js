const staticCacheName = 'food-vey-static-v1'
const dynamicCacheName = 'food-vey-dynamic-v1'
const fallbackPage = '/pages/fallback.html'

const assets = [
    '/',
    fallbackPage,
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

const cacheSizeLimiter = (name, size) => {
    caches.open(name).then(cache => {
        cache.keys().then(keys => {
            if (keys.length > size)
                cache.delete(keys[0])
                    .then(limitCacheSize(name, size))
        })
    })
}

// handle fetch failure with fallback
const fallbackHandler = (request) => fetch(request)
    .then(fetchResponse => {
        return caches.open(dynamicCacheName)
            .then(cache => {
                cache.put(request.url, fetchResponse.clone())
                cacheSizeLimiter(dynamicCacheName, 5)
                return fetchResponse
            })
    })
    .catch(() => {
        if (request.url.indexOf('.html'))
            return caches.match(fallbackPage)
    })

self.addEventListener('install', evt => {
    // console.log('service worker installed', evt)
    evt.waitUntil(
        caches.open(staticCacheName).then(cache => {
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
                    .filter(key => ![staticCacheName, dynamicCacheName].includes(key))
                    .map(key => caches.delete(key))
            )
        )
    )
})

self.addEventListener(
    'fetch',
    evt => {
        // console.log('service worker fetch triggered', evt.request)
        evt.respondWith(
            caches.match(evt.request)
                .then(cachedAsset => cachedAsset || fallbackHandler(evt.request))
        )
    },
)

// self.addEventListener('push', evt => console.log('service worker push registered', evt))