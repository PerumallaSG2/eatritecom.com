import React, { useState, useEffect } from 'react'
import { useServiceWorker } from '../utils/serviceWorker'

const OfflineIndicator: React.FC = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine)
  const [showOfflineToast, setShowOfflineToast] = useState(false)
  const { onNetworkChange } = useServiceWorker()

  useEffect(() => {
    const unsubscribe = onNetworkChange((online) => {
      setIsOnline(online)
      
      if (!online) {
        setShowOfflineToast(true)
      } else {
        // Hide toast when back online
        setTimeout(() => {
          setShowOfflineToast(false)
        }, 3000)
      }
    })

    return unsubscribe
  }, [onNetworkChange])

  // Auto-hide offline toast after 10 seconds
  useEffect(() => {
    if (showOfflineToast) {
      const timer = setTimeout(() => {
        setShowOfflineToast(false)
      }, 10000)

      return () => clearTimeout(timer)
    }
  }, [showOfflineToast])

  if (!showOfflineToast && isOnline) {
    return null
  }

  return (
    <>
      {/* Offline Toast */}
      {showOfflineToast && (
        <div className={`fixed bottom-20 left-4 right-4 md:left-auto md:right-4 md:max-w-sm rounded-lg shadow-lg p-4 z-40 transition-all duration-300 ${
          isOnline 
            ? 'bg-green-600 text-white animate-slide-up' 
            : 'bg-yellow-600 text-white animate-slide-up'
        }`}>
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                isOnline ? 'bg-green-500' : 'bg-yellow-500'
              }`}>
                <span className="text-lg">
                  {isOnline ? '📶' : '📵'}
                </span>
              </div>
            </div>
            
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold mb-1">
                {isOnline ? 'Back Online!' : 'You\'re Offline'}
              </h4>
              <p className="text-xs opacity-90">
                {isOnline 
                  ? 'Your connection has been restored. All features are now available.'
                  : 'You can still browse cached content and place orders. They will sync when you\'re back online.'
                }
              </p>
            </div>
            
            <button
              onClick={() => setShowOfflineToast(false)}
              className="flex-shrink-0 text-white opacity-70 hover:opacity-100 text-xs px-2"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Persistent Offline Indicator */}
      {!isOnline && !showOfflineToast && (
        <div className="fixed top-0 left-0 right-0 bg-yellow-500 text-yellow-900 px-4 py-2 z-50">
          <div className="flex items-center justify-center space-x-2 text-sm font-medium">
            <span>📵</span>
            <span>Offline Mode</span>
            <span className="hidden sm:inline">- Limited functionality available</span>
          </div>
        </div>
      )}

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
    </>
  )
}

export default OfflineIndicator