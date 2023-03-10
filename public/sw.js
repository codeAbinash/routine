const cacheData = {
    showCacheThenFetch: {
        name: 'routine-show-cache-then-fetch-v17',
        valid: 'routine-show-cache-then-fetch',
    },
    emojiCache: {
        name: 'emoji-cache-v1',
        valid: 'emoji-cache',
    },
    fontCache: {
        name: 'routine-font-cache-v1',
        valid: 'routine-font-cache',
    },
    static: {
        name: 'routine-static-files-routine-v1',
        valid: 'routine-static-files-routine',
        urls: [],
    },
}

function existCacheName(cacheName) {
    for (let key in cacheData)
        if (cacheName.startsWith(cacheData[key].valid) && cacheName !== cacheData[key].name)
            return true
    return false
}

self.addEventListener('install', event => {
    console.log('Caching Shell Assets')
    event.waitUntil(
        caches.open(cacheData.static.name).then(cache => {
            console.log('Caching Shell Assets Done')
            cache.addAll(cacheData.static.urls)
        })
    )
})

self.addEventListener('activate', event => {
    console.log('Service Worker Activated')
    event.waitUntil(
        caches.keys().then(keys => Promise.all(
            keys.map(key => {
                if (!existCacheName(key)) return
                console.log('Deleting old cache', key)
                return caches.delete(key)
            }
            )
        )
        ))
})

self.addEventListener('fetch', event => {
    const url = event.request.url
    // If the request includes the start link then clear the cache
    // console.log(url);
    if (url.includes('routine/icons/reset.svg')) {
        console.log('Deleting all cache')
        caches.keys().then(cacheNames => {
            console.log(cacheNames)
            return Promise.all(
                cacheNames.map(cacheName => {
                    return caches.delete(cacheName)
                })
            )
        })
    }
    // Emoji or fonts
    if (url.startsWith('https://dataabinash.github.io/emoji')) {
        // Never load emojis again
        event.respondWith(
            caches.match(event.request).then(cacheResponse => {
                const fetchUrl = fetch(event.request).then(fetchResponse => {
                    return caches.open(cacheData.emojiCache.name).then(cache => {
                        cache.put(event.request, fetchResponse.clone())
                        return fetchResponse
                    })
                })
                return cacheResponse || fetchUrl
            })
        )
    }

    else if (url.endsWith('.ttf') || url.endsWith('.woff2') || url.endsWith('.woff')) {
        event.respondWith(
            caches.match(event.request).then(cacheResponse => {
                const fetchUrl = fetch(event.request).then(fetchResponse => {
                    return caches.open(cacheData.fontCache.name).then(cache => {
                        cache.put(event.request, fetchResponse.clone())
                        return fetchResponse
                    })
                })
                return cacheResponse || fetchUrl
            })
        )
    }

    else if (event.request.url.startsWith('https://dataabinash.github.io/routine')) {
        // Always load from internet 
        event.respondWith(fetch(event.request))
    }
    else {
        // Load from cache if available and after loading from internet and cache it
        event.respondWith(
            caches.match(event.request).then(cacheResponse => {
                const fetchUrl = fetch(event.request).then(fetchResponse => {
                    return caches.open(cacheData.showCacheThenFetch.name).then(cache => {
                        cache.put(event.request, fetchResponse.clone())
                        return fetchResponse
                    })
                })
                return cacheResponse || fetchUrl
            }))
        // event.respondWith(fetch(event.request))
    }
})
