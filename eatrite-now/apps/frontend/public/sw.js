// Eatrite Service Worker for Offline Caching
// Cache Version - increment when making breaking changes
const CACHE_VERSION = 'eatrite-v1.0.0'
const STATIC_CACHE = `${CACHE_VERSION}-static`
const DYNAMIC_CACHE = `${CACHE_VERSION}-dynamic`
const MEAL_DATA_CACHE = `${CACHE_VERSION}-meal-data`

// Files to cache on install
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/src/main.tsx',
  '/src/App.tsx',
  '/src/index.css',
  // Add other critical static assets
]

// Network-first resources (always try network first)
const NETWORK_FIRST = ['/api/', '/auth/', '/orders/', '/subscriptions/']

// Cache-first resources (serve from cache if available)
const CACHE_FIRST = ['/images/', '/assets/', 'https://images.unsplash.com/']

// Stale-while-revalidate resources
const STALE_WHILE_REVALIDATE = ['/menu', '/meals', '/categories']

// Maximum cache size (number of entries)
const MAX_CACHE_SIZE = {
  [DYNAMIC_CACHE]: 100,
  [MEAL_DATA_CACHE]: 500,
}

// Cache duration in milliseconds
const CACHE_DURATION = {
  MEAL_DATA: 24 * 60 * 60 * 1000, // 24 hours
  IMAGES: 7 * 24 * 60 * 60 * 1000, // 7 days
  API: 5 * 60 * 1000, // 5 minutes
}

// Install Event - Cache static assets
self.addEventListener('install', event => {
  console.log('[SW] Installing Service Worker')

  event.waitUntil(
    caches
      .open(STATIC_CACHE)
      .then(cache => {
        console.log('[SW] Caching static assets')
        return cache.addAll(STATIC_ASSETS)
      })
      .then(() => {
        console.log('[SW] Static assets cached')
        return self.skipWaiting()
      })
      .catch(error => {
        console.error('[SW] Failed to cache static assets:', error)
      })
  )
})

// Activate Event - Clean up old caches
self.addEventListener('activate', event => {
  console.log('[SW] Activating Service Worker')

  event.waitUntil(
    caches
      .keys()
      .then(cacheNames => {
        const deletePromises = cacheNames
          .filter(cacheName => {
            // Delete old versions of our caches
            return (
              cacheName.startsWith('eatrite-') &&
              !cacheName.startsWith(CACHE_VERSION)
            )
          })
          .map(cacheName => {
            console.log('[SW] Deleting old cache:', cacheName)
            return caches.delete(cacheName)
          })

        return Promise.all(deletePromises)
      })
      .then(() => {
        console.log('[SW] Old caches cleaned up')
        return self.clients.claim()
      })
      .catch(error => {
        console.error('[SW] Failed to clean up caches:', error)
      })
  )
})

// Fetch Event - Handle all network requests
self.addEventListener('fetch', event => {
  const { request } = event
  const url = new URL(request.url)

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return
  }

  // Skip chrome-extension and other non-http requests
  if (!url.protocol.startsWith('http')) {
    return
  }

  event.respondWith(handleRequest(request))
})

// Main request handler
async function handleRequest(request) {
  const url = new URL(request.url)
  const pathname = url.pathname

  try {
    // Network-first strategy
    if (NETWORK_FIRST.some(path => pathname.startsWith(path))) {
      return await networkFirst(request)
    }

    // Cache-first strategy
    if (
      CACHE_FIRST.some(
        path =>
          pathname.startsWith(path) ||
          url.origin.includes(path.replace('/', ''))
      )
    ) {
      return await cacheFirst(request)
    }

    // Stale-while-revalidate strategy
    if (STALE_WHILE_REVALIDATE.some(path => pathname.includes(path))) {
      return await staleWhileRevalidate(request)
    }

    // Default: Network with cache fallback
    return await networkWithCacheFallback(request)
  } catch (error) {
    console.error('[SW] Request handling failed:', error)
    return (await getCachedResponse(request)) || createOfflineResponse(request)
  }
}

// Network-first strategy
async function networkFirst(request) {
  try {
    const networkResponse = await fetch(request)

    if (networkResponse.ok) {
      // Cache successful responses
      const cache = await caches.open(DYNAMIC_CACHE)
      cache.put(request, networkResponse.clone())
      limitCacheSize(DYNAMIC_CACHE, MAX_CACHE_SIZE[DYNAMIC_CACHE])
    }

    return networkResponse
  } catch (error) {
    console.log('[SW] Network failed, trying cache:', request.url)
    return (await getCachedResponse(request)) || createOfflineResponse(request)
  }
}

// Cache-first strategy
async function cacheFirst(request) {
  const cachedResponse = await getCachedResponse(request)

  if (cachedResponse) {
    // Check if cached response is still fresh
    if (await isCacheFresh(request, cachedResponse)) {
      return cachedResponse
    }
  }

  try {
    const networkResponse = await fetch(request)

    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE)
      cache.put(request, networkResponse.clone())
      limitCacheSize(DYNAMIC_CACHE, MAX_CACHE_SIZE[DYNAMIC_CACHE])
    }

    return networkResponse
  } catch (error) {
    return cachedResponse || createOfflineResponse(request)
  }
}

// Stale-while-revalidate strategy
async function staleWhileRevalidate(request) {
  const cachedResponse = await getCachedResponse(request)

  // Start network request in background
  const networkPromise = fetch(request)
    .then(async networkResponse => {
      if (networkResponse.ok) {
        const cache = await caches.open(MEAL_DATA_CACHE)
        cache.put(request, networkResponse.clone())
        limitCacheSize(MEAL_DATA_CACHE, MAX_CACHE_SIZE[MEAL_DATA_CACHE])
      }
      return networkResponse
    })
    .catch(error => {
      console.log('[SW] Background update failed:', error.message)
    })

  // Return cached response immediately, or wait for network if no cache
  return (
    cachedResponse || (await networkPromise) || createOfflineResponse(request)
  )
}

// Network with cache fallback
async function networkWithCacheFallback(request) {
  try {
    const networkResponse = await fetch(request)

    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE)
      cache.put(request, networkResponse.clone())
      limitCacheSize(DYNAMIC_CACHE, MAX_CACHE_SIZE[DYNAMIC_CACHE])
    }

    return networkResponse
  } catch (error) {
    return (await getCachedResponse(request)) || createOfflineResponse(request)
  }
}

// Helper: Get cached response
async function getCachedResponse(request) {
  const cacheNames = [STATIC_CACHE, DYNAMIC_CACHE, MEAL_DATA_CACHE]

  for (const cacheName of cacheNames) {
    const cache = await caches.open(cacheName)
    const response = await cache.match(request)
    if (response) {
      return response
    }
  }

  return null
}

// Helper: Check if cache is fresh
async function isCacheFresh(request, cachedResponse) {
  const cacheDate = cachedResponse.headers.get('sw-cache-date')
  if (!cacheDate) return false

  const cacheTime = new Date(cacheDate).getTime()
  const now = Date.now()
  const url = new URL(request.url)

  let maxAge = CACHE_DURATION.API // Default

  if (url.pathname.includes('/meals') || url.pathname.includes('/menu')) {
    maxAge = CACHE_DURATION.MEAL_DATA
  } else if (
    url.pathname.includes('/images/') ||
    url.hostname.includes('unsplash')
  ) {
    maxAge = CACHE_DURATION.IMAGES
  }

  return now - cacheTime < maxAge
}

// Helper: Limit cache size
async function limitCacheSize(cacheName, maxSize) {
  const cache = await caches.open(cacheName)
  const keys = await cache.keys()

  if (keys.length > maxSize) {
    // Remove oldest entries (FIFO)
    const keysToDelete = keys.slice(0, keys.length - maxSize)
    await Promise.all(keysToDelete.map(key => cache.delete(key)))
    console.log(
      `[SW] Cleaned up ${keysToDelete.length} entries from ${cacheName}`
    )
  }
}

// Helper: Create offline response
function createOfflineResponse(request) {
  const url = new URL(request.url)

  // For HTML pages, return offline page
  if (request.destination === 'document') {
    return new Response(
      `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Eatrite - You're Offline</title>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <style>
            body { 
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              min-height: 100vh;
              margin: 0;
              background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
              text-align: center;
              padding: 20px;
            }
            .container { 
              max-width: 400px;
              background: white;
              padding: 40px;
              border-radius: 12px;
              box-shadow: 0 8px 32px rgba(0,0,0,0.1);
            }
            h1 { color: #206B19; margin-bottom: 16px; }
            p { color: #666; line-height: 1.6; margin-bottom: 24px; }
            .emoji { font-size: 48px; margin-bottom: 16px; }
            .retry-btn {
              background: #206B19;
              color: white;
              border: none;
              padding: 12px 24px;
              border-radius: 6px;
              cursor: pointer;
              font-size: 16px;
            }
            .retry-btn:hover { background: #1a5814; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="emoji">🥗</div>
            <h1>You're Offline</h1>
            <p>No internet connection detected. Please check your connection and try again.</p>
            <button class="retry-btn" onclick="window.location.reload()">
              Try Again
            </button>
          </div>
        </body>
      </html>
    `,
      {
        status: 200,
        statusText: 'OK',
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
        },
      }
    )
  }

  // For API requests, return JSON error
  if (url.pathname.startsWith('/api/')) {
    return new Response(
      JSON.stringify({
        error: 'Offline',
        message: 'This request requires an internet connection',
      }),
      {
        status: 503,
        statusText: 'Service Unavailable',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
  }

  // For other resources, return 404
  return new Response('Not Found', {
    status: 404,
    statusText: 'Not Found',
  })
}

// Push Notification Event Handler
self.addEventListener('push', event => {
  console.log('[SW] Push message received')
  
  const options = {
    body: 'Your EatRite order is ready!',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/icon-96x96.png',
    vibrate: [200, 100, 200],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'View Order',
        icon: '/icons/checkmark.png'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/icons/close.png'
      }
    ]
  }

  let title = 'EatRite Notification'
  
  if (event.data) {
    const payload = event.data.json()
    title = payload.title || title
    options.body = payload.body || options.body
    options.icon = payload.icon || options.icon
    options.data = { ...options.data, ...payload.data }
  }

  event.waitUntil(
    self.registration.showNotification(title, options)
  )
})

// Notification Click Event Handler
self.addEventListener('notificationclick', event => {
  console.log('[SW] Notification clicked')
  
  event.notification.close()

  if (event.action === 'explore') {
    // Open the app to orders page
    event.waitUntil(
      clients.openWindow('/orders')
    )
  } else if (event.action === 'close') {
    // Just close the notification
    return
  } else {
    // Default action - open the app
    event.waitUntil(
      clients.matchAll().then(clientList => {
        if (clientList.length > 0) {
          return clientList[0].focus()
        }
        return clients.openWindow('/')
      })
    )
  }
})

// Background Sync Event Handler
self.addEventListener('sync', event => {
  console.log('[SW] Background sync:', event.tag)
  
  if (event.tag === 'background-sync-orders') {
    event.waitUntil(syncOrders())
  }
})

// Helper: Sync orders when back online
async function syncOrders() {
  try {
    // Get pending orders from IndexedDB or localStorage
    const pendingOrders = await getPendingOrders()
    
    for (const order of pendingOrders) {
      try {
        const response = await fetch('/api/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(order)
        })
        
        if (response.ok) {
          await removePendingOrder(order.id)
          console.log('[SW] Order synced:', order.id)
        }
      } catch (error) {
        console.log('[SW] Failed to sync order:', order.id, error)
      }
    }
  } catch (error) {
    console.error('[SW] Background sync failed:', error)
  }
}

// Helper: Get pending orders (implement based on your storage)
async function getPendingOrders() {
  // Implement based on your offline storage strategy
  return []
}

// Helper: Remove synced order (implement based on your storage)
async function removePendingOrder(orderId) {
  // Implement based on your offline storage strategy
  console.log('[SW] Removing synced order:', orderId)
}

// Message handler for communication with main thread
self.addEventListener('message', event => {
  const { type, data } = event.data

  switch (type) {
    case 'SKIP_WAITING':
      self.skipWaiting()
      break

    case 'CLEAR_CACHE':
      clearCache(data.cacheName)
      break

    case 'CACHE_MEAL_DATA':
      cacheMealData(data.meals)
      break

    case 'GET_CACHE_STATUS':
      getCacheStatus().then(status => {
        event.ports[0].postMessage({ type: 'CACHE_STATUS', data: status })
      })
      break

    case 'SUBSCRIBE_PUSH':
      subscribePushNotifications(data)
      break

    default:
      console.log('[SW] Unknown message type:', type)
  }
})

// Helper: Subscribe to push notifications
async function subscribePushNotifications(subscription) {
  try {
    // Send subscription to your server
    const response = await fetch('/api/push/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(subscription)
    })
    
    if (response.ok) {
      console.log('[SW] Push subscription sent to server')
    }
  } catch (error) {
    console.error('[SW] Failed to send push subscription:', error)
  }
}

// Helper: Clear specific cache
async function clearCache(cacheName) {
  try {
    await caches.delete(cacheName || DYNAMIC_CACHE)
    console.log('[SW] Cache cleared:', cacheName)
  } catch (error) {
    console.error('[SW] Failed to clear cache:', error)
  }
}

// Helper: Cache meal data proactively
async function cacheMealData(meals) {
  try {
    const cache = await caches.open(MEAL_DATA_CACHE)

    const cachePromises = meals.map(async meal => {
      // Cache meal image
      if (meal.image) {
        try {
          const imageRequest = new Request(meal.image)
          const imageResponse = await fetch(imageRequest)
          if (imageResponse.ok) {
            cache.put(imageRequest, imageResponse)
          }
        } catch (error) {
          console.log('[SW] Failed to cache meal image:', meal.image)
        }
      }
    })

    await Promise.all(cachePromises)
    console.log('[SW] Meal data cached successfully')
  } catch (error) {
    console.error('[SW] Failed to cache meal data:', error)
  }
}

// Helper: Get cache status
async function getCacheStatus() {
  const cacheNames = await caches.keys()
  const status = {}

  for (const cacheName of cacheNames) {
    const cache = await caches.open(cacheName)
    const keys = await cache.keys()
    status[cacheName] = keys.length
  }

  return status
}
