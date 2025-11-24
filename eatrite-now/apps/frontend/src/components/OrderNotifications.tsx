import React, { useState, useEffect } from 'react'
import { X, Bell, Package, Truck, CheckCircle, Clock, AlertCircle } from 'lucide-react'
import { useOrderTracking, OrderUpdate } from '../context/OrderTrackingContext'
import { FadeIn, SlideIn } from './LoadingStates'

interface OrderNotificationProps {
  notification: OrderUpdate
  onDismiss: (id: string) => void
}

const OrderNotification: React.FC<OrderNotificationProps> = ({ notification, onDismiss }) => {
  const [isVisible, setIsVisible] = useState(true)
  
  useEffect(() => {
    // Auto-dismiss after 8 seconds
    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(() => onDismiss(notification.id), 300) // Wait for animation
    }, 8000)
    
    return () => clearTimeout(timer)
  }, [notification.id, onDismiss])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
      case 'preparing':
      case 'cooking':
      case 'quality_check':
      case 'packaging':
        return <Package className="w-5 h-5 text-blue-600 dark:text-blue-400" />
      case 'out_for_delivery':
        return <Truck className="w-5 h-5 text-purple-600 dark:text-purple-400" />
      case 'delivered':
        return <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
      default:
        return <Clock className="w-5 h-5 text-gray-600 dark:text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'border-l-green-500 bg-green-50 dark:bg-green-900/20'
      case 'preparing':
      case 'cooking':
      case 'quality_check':
      case 'packaging':
        return 'border-l-blue-500 bg-blue-50 dark:bg-blue-900/20'
      case 'out_for_delivery':
        return 'border-l-purple-500 bg-purple-50 dark:bg-purple-900/20'
      case 'delivered':
        return 'border-l-green-500 bg-green-50 dark:bg-green-900/20'
      default:
        return 'border-l-gray-500 bg-gray-50 dark:bg-gray-900/20'
    }
  }

  if (!isVisible) return null

  return (
    <SlideIn 
      direction="right" 
      className={`
        max-w-sm w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg pointer-events-auto 
        border-l-4 ${getStatusColor(notification.status)} border border-gray-200 dark:border-gray-700
      `}
    >
      <div className="p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0 mr-3 mt-0.5">
            {getStatusIcon(notification.status)}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              Order {notification.orderId}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
              {notification.message}
            </p>
            {notification.estimatedTime && (
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                Estimated delivery: {notification.estimatedTime} minutes
              </p>
            )}
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
              {notification.timestamp.toLocaleTimeString()}
            </p>
          </div>
          <button
            onClick={() => {
              setIsVisible(false)
              setTimeout(() => onDismiss(notification.id), 300)
            }}
            className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </SlideIn>
  )
}

export const OrderNotificationCenter: React.FC = () => {
  const { notifications, markNotificationAsRead } = useOrderTracking()
  const [displayedNotifications, setDisplayedNotifications] = useState<OrderUpdate[]>([])

  useEffect(() => {
    // Add new notifications to displayed list
    const newNotifications = notifications.filter(
      notif => !displayedNotifications.some(displayed => displayed.id === notif.id)
    )
    
    if (newNotifications.length > 0) {
      setDisplayedNotifications(prev => [...newNotifications.slice(0, 3), ...prev].slice(0, 5))
    }
  }, [notifications])

  const handleDismiss = (notificationId: string) => {
    setDisplayedNotifications(prev => prev.filter(notif => notif.id !== notificationId))
    markNotificationAsRead(notificationId)
  }

  if (displayedNotifications.length === 0) return null

  return (
    <div className="fixed top-4 right-4 z-50 space-y-3 pointer-events-none">
      {displayedNotifications.map(notification => (
        <OrderNotification
          key={notification.id}
          notification={notification}
          onDismiss={handleDismiss}
        />
      ))}
    </div>
  )
}

// Toast notification for quick updates
interface OrderToastProps {
  message: string
  type: 'success' | 'info' | 'warning' | 'error'
  isVisible: boolean
  onDismiss: () => void
}

export const OrderToast: React.FC<OrderToastProps> = ({ 
  message, 
  type, 
  isVisible, 
  onDismiss 
}) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(onDismiss, 4000)
      return () => clearTimeout(timer)
    }
  }, [isVisible, onDismiss])

  if (!isVisible) return null

  const getToastStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-green-500 text-white'
      case 'info':
        return 'bg-blue-500 text-white'
      case 'warning':
        return 'bg-yellow-500 text-white'
      case 'error':
        return 'bg-red-500 text-white'
      default:
        return 'bg-gray-500 text-white'
    }
  }

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5" />
      case 'info':
        return <Bell className="w-5 h-5" />
      case 'warning':
        return <AlertCircle className="w-5 h-5" />
      case 'error':
        return <AlertCircle className="w-5 h-5" />
      default:
        return <Bell className="w-5 h-5" />
    }
  }

  return (
    <FadeIn className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
      <div className={`
        flex items-center gap-3 px-6 py-3 rounded-lg shadow-lg ${getToastStyles()}
        max-w-md pointer-events-auto
      `}>
        {getIcon()}
        <span className="text-sm font-medium">{message}</span>
        <button
          onClick={onDismiss}
          className="ml-2 text-white/80 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </FadeIn>
  )
}

// Live order status indicator
export const LiveOrderStatusIndicator: React.FC = () => {
  const { activeOrder, isConnected } = useOrderTracking()
  const [pulse, setPulse] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse(prev => !prev)
    }, 2000)
    
    return () => clearInterval(interval)
  }, [])

  if (!activeOrder || activeOrder.status === 'delivered' || activeOrder.status === 'cancelled') {
    return null
  }

  return (
    <div className="fixed bottom-4 right-4 z-40">
      <FadeIn>
        <div className="bg-white dark:bg-gray-800 rounded-full shadow-lg border border-gray-200 dark:border-gray-700 p-3 flex items-center gap-3">
          <div className="relative">
            <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`} />
            {isConnected && (
              <div 
                className={`absolute inset-0 w-3 h-3 rounded-full bg-green-500 ${pulse ? 'animate-ping' : ''}`}
              />
            )}
          </div>
          <div className="text-sm">
            <div className="font-medium text-gray-900 dark:text-white">
              Order {activeOrder.id}
            </div>
            <div className="text-gray-500 dark:text-gray-400">
              {isConnected ? 'Live tracking' : 'Offline'}
            </div>
          </div>
        </div>
      </FadeIn>
    </div>
  )
}

export default OrderNotificationCenter