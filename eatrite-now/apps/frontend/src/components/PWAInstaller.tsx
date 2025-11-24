import React, { useState, useEffect } from 'react'

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[]
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed'
    platform: string
  }>
  prompt(): Promise<void>
}

declare global {
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent
  }
  
  interface Window {
    gtag?: (command: string, action: string, parameters?: any) => void
  }
}

const PWAInstaller: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [showInstallBanner, setShowInstallBanner] = useState(false)
  const [isIOS, setIsIOS] = useState(false)
  const [isStandalone, setIsStandalone] = useState(false)
  const [showIOSInstructions, setShowIOSInstructions] = useState(false)

  useEffect(() => {
    // Check if device is iOS
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent)
    setIsIOS(iOS)

    // Check if app is already installed (standalone mode)
    const standalone = 
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone ||
      document.referrer.includes('android-app://')
    setIsStandalone(standalone)

    // Don't show install prompt if already installed
    if (standalone) {
      return
    }

    // Listen for beforeinstallprompt event (Android/Desktop)
    const handleBeforeInstallPrompt = (e: BeforeInstallPromptEvent) => {
      console.log('PWA: beforeinstallprompt event fired')
      e.preventDefault()
      setDeferredPrompt(e)
      
      // Show install banner after a delay (better UX)
      setTimeout(() => {
        setShowInstallBanner(true)
      }, 3000)
    }

    // Listen for app installed event
    const handleAppInstalled = () => {
      console.log('PWA: App was installed')
      setShowInstallBanner(false)
      setDeferredPrompt(null)
      
      // Track installation
      if (window.gtag) {
        window.gtag('event', 'pwa_install', {
          event_category: 'engagement',
          event_label: 'app_installed'
        })
      }
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    window.addEventListener('appinstalled', handleAppInstalled)

    // For iOS, show install instructions after user interaction
    if (iOS && !standalone) {
      setTimeout(() => {
        setShowInstallBanner(true)
      }, 5000)
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      window.removeEventListener('appinstalled', handleAppInstalled)
    }
  }, [])

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      if (isIOS) {
        setShowIOSInstructions(true)
        return
      }
      return
    }

    try {
      // Show the install prompt
      await deferredPrompt.prompt()
      
      // Wait for user choice
      const choiceResult = await deferredPrompt.userChoice
      
      console.log('PWA: User choice:', choiceResult.outcome)
      
      if (choiceResult.outcome === 'accepted') {
        console.log('PWA: User accepted installation')
        
        // Track acceptance
        if (window.gtag) {
          window.gtag('event', 'pwa_install_prompt_accepted', {
            event_category: 'engagement'
          })
        }
      } else {
        console.log('PWA: User dismissed installation')
        
        // Track dismissal
        if (window.gtag) {
          window.gtag('event', 'pwa_install_prompt_dismissed', {
            event_category: 'engagement'
          })
        }
      }
    } catch (error) {
      console.error('PWA: Installation failed:', error)
    }

    setDeferredPrompt(null)
    setShowInstallBanner(false)
  }

  const handleDismiss = () => {
    setShowInstallBanner(false)
    
    // Don't show again for this session
    sessionStorage.setItem('pwa-install-dismissed', 'true')
    
    // Track dismissal
    if (window.gtag) {
      window.gtag('event', 'pwa_install_banner_dismissed', {
        event_category: 'engagement'
      })
    }
  }

  const handleIOSInstructionsClose = () => {
    setShowIOSInstructions(false)
  }

  // Don't show anything if app is already installed
  if (isStandalone) {
    return null
  }

  // Don't show if user dismissed in this session
  if (sessionStorage.getItem('pwa-install-dismissed')) {
    return null
  }

  // iOS Instructions Modal
  if (showIOSInstructions) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg p-6 max-w-sm w-full">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Install EatRite</h3>
            <button
              onClick={handleIOSInstructionsClose}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>
          
          <div className="space-y-4 text-sm text-gray-600">
            <div className="flex items-center space-x-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold">1</span>
              <span>Tap the Share button</span>
              <span className="text-xl">⬆️</span>
            </div>
            
            <div className="flex items-center space-x-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold">2</span>
              <span>Scroll down and tap "Add to Home Screen"</span>
              <span className="text-xl">📱</span>
            </div>
            
            <div className="flex items-center space-x-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold">3</span>
              <span>Tap "Add" to install the app</span>
              <span className="text-xl">✅</span>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={handleIOSInstructionsClose}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              Got it!
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Install Banner
  if (!showInstallBanner) {
    return null
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-sm bg-white rounded-lg shadow-lg border border-gray-200 p-4 z-40 animate-slide-up">
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
            <span className="text-2xl">🥗</span>
          </div>
        </div>
        
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold text-gray-900 mb-1">
            Install EatRite App
          </h4>
          <p className="text-xs text-gray-600 mb-3">
            {isIOS 
              ? "Add to your home screen for quick access and offline support!"
              : "Install our app for faster access, offline support, and push notifications!"
            }
          </p>
          
          <div className="flex space-x-2">
            <button
              onClick={handleInstallClick}
              className="flex-1 bg-green-600 text-white text-xs font-medium px-3 py-2 rounded-md hover:bg-green-700 transition-colors"
            >
              {isIOS ? "Install Instructions" : "Install App"}
            </button>
            <button
              onClick={handleDismiss}
              className="flex-shrink-0 text-gray-400 hover:text-gray-600 text-xs px-2"
            >
              ✕
            </button>
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes slide-up {
            from {
              transform: translateY(100%);
              opacity: 0;
            }
            to {
              transform: translateY(0);
              opacity: 1;
            }
          }
          
          .animate-slide-up {
            animation: slide-up 0.3s ease-out;
          }
        `}
      </style>
    </div>
  )
}

export default PWAInstaller