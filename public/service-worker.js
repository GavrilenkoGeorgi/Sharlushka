const cacheName = 'sharlushkaMk2'

const cacheAssets = [
  'index.html'
]

// Call install event
self.addEventListener('install', e => {
  console.log(`Service worker installed`)
  e.waitUntil(
    caches
    .open(cacheName)
    .then(cache => {
      console.log('Service worker caching files')
      cache.addAll(cacheAssets)
    })
    .then(() => self.skipWaiting())
  )
})

// Call activate event
self.addEventListener('activate', e => {
  console.log(`Service worker activated`)
  // remove unwanted caches
  e.waitUntil(
    caches.keys().then(cachesNames => {
      return Promise.all(
        cachesNames.map(cache => {
          if (cache !== cacheName) {
            console.log('Service worker clearing old cache')
            return caches.delete(cache)
          }
        })
      )
    })
  )
})

// Call fetch event
self.addEventListener('fetch', e => {
  console.log('Service worker fetching')
  e.respondWith(
    fetch(e.request)
    .then(res => {
      // Make a clone of response
      const resClone = res.clone()
      // Open cache
      caches
        .open(cacheName).then(cache => {
          // Add response to cache
          cache.put(e.request, resClone)
        })
      return res
    }).catch(err => caches.match(e.request)).then(res => res)
  )
})
