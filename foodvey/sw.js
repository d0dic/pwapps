self.addEventListener('install', evt => console.log('service worker installed', evt))

self.addEventListener('activate', evt => console.log('service worker activated', evt))

// self.addEventListener('push', evt => console.log('service worker push registered', evt))

self.addEventListener(
    'fetch',
    evt => console.log('service worker fetch triggered', evt.request),
)