import React, { useState } from 'react'
import { useServiceWorker } from '../utils/serviceWorker'

interface UpdateNotificationProps {
  onUpdate?: () => void
  onDismiss?: () => void
}

const UpdateNotification: React.FC<UpdateNotificationProps> = ({
  onUpdate,
  onDismiss
}) => {
  const [isVisible, setIsVisible] = useState(true)
  const { skipWaiting } = useServiceWorker()

  const handleUpdate = async () => {
    try {
      await skipWaiting()
      onUpdate?.()
    } catch (error) {
      console.error('Failed to update app:', error)
    }
  }

  const handleDismiss = () => {
    setIsVisible(false)
    onDismiss?.()
  }

  if (!isVisible) {
    return null
  }

  return (
    <div className="fixed top-4 left-4 right-4 md:left-auto md:right-4 md:max-w-sm bg-blue-600 text-white rounded-lg shadow-lg p-4 z-50 animate-slide-down">
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
            <span className="text-lg">🔄</span>
          </div>
        </div>
        
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold mb-1">
            App Update Available
          </h4>
          <p className="text-xs text-blue-100 mb-3">
            A new version of EatRite is ready. Update now for the latest features and improvements.
          </p>
          
          <div className="flex space-x-2">
            <button
              onClick={handleUpdate}
              className="flex-1 bg-white text-blue-600 text-xs font-medium px-3 py-2 rounded-md hover:bg-blue-50 transition-colors"
            >
              Update Now
            </button>
            <button
              onClick={handleDismiss}
              className="flex-shrink-0 text-blue-200 hover:text-white text-xs px-2"
            >
              ✕
            </button>
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes slide-down {
            from {
              transform: translateY(-100%);
              opacity: 0;
            }
            to {
              transform: translateY(0);
              opacity: 1;
            }
          }
          
          .animate-slide-down {
            animation: slide-down 0.3s ease-out;
          }
        `}
      </style>
    </div>
  )
}

export default UpdateNotification