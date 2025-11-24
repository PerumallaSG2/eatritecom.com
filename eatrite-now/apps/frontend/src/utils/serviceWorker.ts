// Service Worker Registration Utility
export interface ServiceWorkerRegistrationResult {
  registration: ServiceWorkerRegistration | null
  error: Error | null
}

export interface ServiceWorkerUpdateEvent {
  type: 'update-available' | 'update-installed' | 'offline-ready'
  registration?: ServiceWorkerRegistration
}

class ServiceWorkerManager {
  private registration: ServiceWorkerRegistration | null = null
  private updateCallbacks: ((event: ServiceWorkerUpdateEvent) => void)[] = []

  async register(): Promise<ServiceWorkerRegistrationResult> {
    if (!('serviceWorker' in navigator)) {
      const error = new Error('Service Workers not supported')
      console.warn('[SW] Service Workers not supported')
      return { registration: null, error }
    }

    try {
      console.log('[SW] Registering service worker...')
      
      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/'
      })

      this.registration = registration
      
      console.log('[SW] Service worker registered:', registration.scope)

      // Handle updates
      this.handleServiceWorkerUpdates(registration)
      
      // Handle installation states
      this.handleInstallationStates(registration)

      return { registration, error: null }
    } catch (error) {
      console.error('[SW] Service worker registration failed:', error)
      return { registration: null, error: error as Error }
    }
  }

  private handleServiceWorkerUpdates(registration: ServiceWorkerRegistration) {
    // Check for updates
    registration.addEventListener('updatefound', () => {
      console.log('[SW] New service worker found, installing...')
      
      const newWorker = registration.installing
      if (!newWorker) return

      newWorker.addEventListener('statechange', () => {
        console.log('[SW] Service worker state changed:', newWorker.state)
        
        switch (newWorker.state) {
          case 'installed':
            if (navigator.serviceWorker.controller) {
              // New update available
              console.log('[SW] New content is available, refresh needed')
              this.notifyUpdateCallbacks({
                type: 'update-available',
                registration
              })
            } else {
              // Content is cached for offline use
              console.log('[SW] Content is now cached for offline use')
              this.notifyUpdateCallbacks({
                type: 'offline-ready',
                registration
              })
            }
            break

          case 'activated':
            console.log('[SW] New service worker activated')
            this.notifyUpdateCallbacks({
              type: 'update-installed',
              registration
            })
            break
        }
      })
    })

    // Listen for controller change (when new SW takes over)
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      console.log('[SW] Controller changed, reloading page...')
      window.location.reload()
    })
  }

  private handleInstallationStates(registration: ServiceWorkerRegistration) {
    if (registration.waiting) {
      // SW is waiting to activate
      console.log('[SW] Service worker waiting to activate')
      this.notifyUpdateCallbacks({
        type: 'update-available',
        registration
      })
    }

    if (registration.active && !navigator.serviceWorker.controller) {
      // First time installation
      console.log('[SW] Service worker active, content cached for offline use')
      this.notifyUpdateCallbacks({
        type: 'offline-ready',
        registration
      })
    }
  }

  private notifyUpdateCallbacks(event: ServiceWorkerUpdateEvent) {
    this.updateCallbacks.forEach(callback => {
      try {
        callback(event)
      } catch (error) {
        console.error('[SW] Update callback error:', error)
      }
    })
  }

  onUpdate(callback: (event: ServiceWorkerUpdateEvent) => void) {
    this.updateCallbacks.push(callback)
    
    // Return unsubscribe function
    return () => {
      const index = this.updateCallbacks.indexOf(callback)
      if (index > -1) {
        this.updateCallbacks.splice(index, 1)
      }
    }
  }

  async skipWaiting() {
    if (!this.registration?.waiting) {
      console.warn('[SW] No waiting service worker to skip')
      return
    }

    console.log('[SW] Skipping waiting service worker...')
    
    // Send skip waiting message
    this.registration.waiting.postMessage({ type: 'SKIP_WAITING' })
  }

  async checkForUpdates() {
    if (!this.registration) {
      console.warn('[SW] No registration available for update check')
      return
    }

    try {
      console.log('[SW] Checking for service worker updates...')
      await this.registration.update()
    } catch (error) {
      console.error('[SW] Update check failed:', error)
    }
  }

  async unregister() {
    if (!this.registration) {
      console.warn('[SW] No registration to unregister')
      return false
    }

    try {
      console.log('[SW] Unregistering service worker...')
      const result = await this.registration.unregister()
      this.registration = null
      console.log('[SW] Service worker unregistered:', result)
      return result
    } catch (error) {
      console.error('[SW] Unregister failed:', error)
      return false
    }
  }

  // Cache management methods
  async clearCache(cacheName?: string) {
    if (!this.registration?.active) {
      console.warn('[SW] No active service worker for cache clearing')
      return
    }

    console.log('[SW] Clearing cache:', cacheName || 'all')
    this.registration.active.postMessage({
      type: 'CLEAR_CACHE',
      data: { cacheName }
    })
  }

  async getCacheStatus(): Promise<Record<string, number>> {
    return new Promise((resolve, reject) => {
      if (!this.registration?.active) {
        reject(new Error('No active service worker'))
        return
      }

      const messageChannel = new MessageChannel()
      
      messageChannel.port1.onmessage = (event) => {
        if (event.data.type === 'CACHE_STATUS') {
          resolve(event.data.data)
        } else {
          reject(new Error('Unexpected message type'))
        }
      }

      this.registration.active.postMessage(
        { type: 'GET_CACHE_STATUS' },
        [messageChannel.port2]
      )

      // Timeout after 5 seconds
      setTimeout(() => {
        reject(new Error('Cache status request timeout'))
      }, 5000)
    })
  }

  async cacheMealData(meals: any[]) {
    if (!this.registration?.active) {
      console.warn('[SW] No active service worker for meal caching')
      return
    }

    console.log('[SW] Caching meal data:', meals.length, 'meals')
    this.registration.active.postMessage({
      type: 'CACHE_MEAL_DATA',
      data: { meals }
    })
  }

  // Push notification methods
  async subscribeToPushNotifications(): Promise<PushSubscription | null> {
    if (!this.registration) {
      throw new Error('No service worker registration')
    }

    if (!('PushManager' in window)) {
      throw new Error('Push notifications not supported')
    }

    try {
      // Check current permission
      const permission = await Notification.requestPermission()
      
      if (permission !== 'granted') {
        throw new Error('Push notification permission denied')
      }

      // Get existing subscription or create new one
      let subscription = await this.registration.pushManager.getSubscription()
      
      if (!subscription) {
        // Create new subscription
        const vapidKey = import.meta.env.VITE_VAPID_PUBLIC_KEY
        subscription = await this.registration.pushManager.subscribe({
          userVisibleOnly: true,
          ...(vapidKey && { applicationServerKey: this.urlBase64ToUint8Array(vapidKey) })
        })
        
        console.log('[SW] New push subscription created')
      }

      // Send subscription to service worker
      if (this.registration.active) {
        this.registration.active.postMessage({
          type: 'SUBSCRIBE_PUSH',
          data: subscription.toJSON()
        })
      }

      return subscription
    } catch (error) {
      console.error('[SW] Push subscription failed:', error)
      throw error
    }
  }

  async unsubscribeFromPushNotifications(): Promise<boolean> {
    if (!this.registration) {
      return false
    }

    try {
      const subscription = await this.registration.pushManager.getSubscription()
      
      if (subscription) {
        const result = await subscription.unsubscribe()
        console.log('[SW] Push subscription removed:', result)
        return result
      }
      
      return true
    } catch (error) {
      console.error('[SW] Push unsubscription failed:', error)
      return false
    }
  }

  private urlBase64ToUint8Array(base64String: string): Uint8Array {
    if (!base64String) {
      return new Uint8Array(0)
    }
    
    const padding = '='.repeat((4 - base64String.length % 4) % 4)
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/')

    const rawData = window.atob(base64)
    const outputArray = new Uint8Array(rawData.length)

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i)
    }
    
    return outputArray
  }

  // Network status monitoring
  isOnline(): boolean {
    return navigator.onLine
  }

  onNetworkChange(callback: (online: boolean) => void) {
    const handleOnline = () => callback(true)
    const handleOffline = () => callback(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    // Return cleanup function
    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }
}

// Create singleton instance
export const serviceWorkerManager = new ServiceWorkerManager()

// Helper hook for React components
export const useServiceWorker = () => {
  return {
    register: () => serviceWorkerManager.register(),
    checkForUpdates: () => serviceWorkerManager.checkForUpdates(),
    skipWaiting: () => serviceWorkerManager.skipWaiting(),
    clearCache: (cacheName?: string) => serviceWorkerManager.clearCache(cacheName),
    getCacheStatus: () => serviceWorkerManager.getCacheStatus(),
    cacheMealData: (meals: any[]) => serviceWorkerManager.cacheMealData(meals),
    subscribeToPush: () => serviceWorkerManager.subscribeToPushNotifications(),
    unsubscribeFromPush: () => serviceWorkerManager.unsubscribeFromPushNotifications(),
    onUpdate: (callback: (event: ServiceWorkerUpdateEvent) => void) => 
      serviceWorkerManager.onUpdate(callback),
    isOnline: () => serviceWorkerManager.isOnline(),
    onNetworkChange: (callback: (online: boolean) => void) =>
      serviceWorkerManager.onNetworkChange(callback)
  }
}