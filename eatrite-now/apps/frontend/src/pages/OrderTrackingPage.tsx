import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { 
  ArrowLeft, 
  Bell, 
  MapPin, 
  Clock, 
  Package, 
  Truck, 
  CheckCircle,
  AlertCircle,
  Phone,
  MessageCircle,
  Navigation
} from 'lucide-react'
import { useOrderTracking, getOrderStatusColor, getOrderStatusLabel, calculateEstimatedDeliveryTime } from '../context/OrderTrackingContext'

import OrderTrackingCard from '../components/OrderTrackingCard'
import { FadeIn, SlideIn } from '../components/LoadingStates'

export const OrderTrackingPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>()
  const navigate = useNavigate()
  const { 
    orders, 
    activeOrder, 
    notifications, 
    isConnected, 
    markNotificationAsRead, 
    clearNotifications,
    setActiveOrder 
  } = useOrderTracking()

  
  const [showMap, setShowMap] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null)

  useEffect(() => {
    if (orderId) {
      setActiveOrder(orderId)
      setSelectedOrder(orderId)
    }
  }, [orderId, setActiveOrder])

  const order = selectedOrder 
    ? orders.find(o => o.id === selectedOrder) 
    : activeOrder

  const handleOrderSelect = (orderIdToSelect: string) => {
    setSelectedOrder(orderIdToSelect)
    setActiveOrder(orderIdToSelect)
    navigate(`/track/${orderIdToSelect}`)
  }

  const orderStatuses = [
    { key: 'pending', label: 'Order Received', icon: Clock },
    { key: 'confirmed', label: 'Confirmed', icon: CheckCircle },
    { key: 'preparing', label: 'Preparing', icon: Package },
    { key: 'cooking', label: 'Cooking', icon: Package },
    { key: 'quality_check', label: 'Quality Check', icon: CheckCircle },
    { key: 'packaging', label: 'Packaging', icon: Package },
    { key: 'ready_for_pickup', label: 'Ready', icon: Package },
    { key: 'out_for_delivery', label: 'Out for Delivery', icon: Truck },
    { key: 'delivered', label: 'Delivered', icon: CheckCircle }
  ]

  const getStepStatus = (stepKey: string, orderStatus: string) => {
    const stepIndex = orderStatuses.findIndex(s => s.key === stepKey)
    const currentIndex = orderStatuses.findIndex(s => s.key === orderStatus)
    
    if (stepIndex < currentIndex) return 'completed'
    if (stepIndex === currentIndex) return 'current'
    return 'pending'
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back</span>
              </button>
              <div>
                <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Order Tracking
                </h1>
                {order && (
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {order.id} • {calculateEstimatedDeliveryTime(order)}
                  </p>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              {/* Connection Status */}
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`} />
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {isConnected ? 'Live' : 'Offline'}
                </span>
              </div>
              
              {/* Notifications */}
              <div className="relative">
                <button 
                  onClick={clearNotifications}
                  className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors relative"
                >
                  <Bell className="w-5 h-5" />
                  {notifications.length > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {notifications.length}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Order List */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Your Orders
                </h2>
              </div>
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {orders.map((orderItem) => (
                  <FadeIn key={orderItem.id}>
                    <button
                      onClick={() => handleOrderSelect(orderItem.id)}
                      className={`w-full p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                        selectedOrder === orderItem.id ? 'bg-green-50 dark:bg-green-900/20' : ''
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium text-gray-900 dark:text-white">
                          {orderItem.id}
                        </div>
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${getOrderStatusColor(orderItem.status)}`}>
                          {getOrderStatusLabel(orderItem.status)}
                        </div>
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                        {orderItem.items.length} item{orderItem.items.length > 1 ? 's' : ''} • ${orderItem.totalAmount.toFixed(2)}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {calculateEstimatedDeliveryTime(orderItem)}
                      </div>
                    </button>
                  </FadeIn>
                ))}
                
                {orders.length === 0 && (
                  <div className="p-8 text-center">
                    <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                      No orders yet
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-4">
                      Start by placing your first order
                    </p>
                    <button
                      onClick={() => navigate('/meals')}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Browse Meals
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Order Details */}
          <div className="lg:col-span-2 space-y-6">
            {order ? (
              <>
                {/* Order Status Timeline */}
                <SlideIn direction="up" className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                    Order Progress
                  </h3>
                  
                  <div className="space-y-4">
                    {orderStatuses.map((status, index) => {
                      const stepStatus = getStepStatus(status.key, order.status)
                      const Icon = status.icon
                      
                      return (
                        <div key={status.key} className="flex items-center gap-4">
                          {/* Icon */}
                          <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                            stepStatus === 'completed' 
                              ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                              : stepStatus === 'current'
                              ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                              : 'bg-gray-100 dark:bg-gray-700 text-gray-400'
                          }`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          
                          {/* Label */}
                          <div className="flex-1">
                            <div className={`font-medium ${
                              stepStatus === 'completed' || stepStatus === 'current'
                                ? 'text-gray-900 dark:text-white'
                                : 'text-gray-400 dark:text-gray-500'
                            }`}>
                              {status.label}
                            </div>
                            {stepStatus === 'current' && (
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                Current status
                              </div>
                            )}
                          </div>
                          
                          {/* Connecting Line */}
                          {index < orderStatuses.length - 1 && (
                            <div className={`absolute ml-5 mt-10 w-0.5 h-4 ${
                              stepStatus === 'completed' 
                                ? 'bg-green-300 dark:bg-green-600' 
                                : 'bg-gray-200 dark:bg-gray-700'
                            }`} />
                          )}
                        </div>
                      )
                    })}
                  </div>
                </SlideIn>

                {/* Map Toggle */}
                {order.status === 'out_for_delivery' && (
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Live Tracking
                      </h3>
                      <button
                        onClick={() => setShowMap(!showMap)}
                        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        <Navigation className="w-4 h-4" />
                        {showMap ? 'Hide Map' : 'View on Map'}
                      </button>
                    </div>
                    
                    {showMap && (
                      <div className="bg-gray-100 dark:bg-gray-700 rounded-lg h-64 flex items-center justify-center">
                        <div className="text-center">
                          <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                          <p className="text-gray-600 dark:text-gray-300">
                            Interactive map would be integrated here
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                            Showing real-time delivery location
                          </p>
                        </div>
                      </div>
                    )}
                    
                    {/* Driver Actions */}
                    {order.driver && (
                      <div className="mt-4 flex gap-3">
                        <button className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-lg hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors">
                          <Phone className="w-4 h-4" />
                          Call {order.driver.name}
                        </button>
                        <button className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors">
                          <MessageCircle className="w-4 h-4" />
                          Message Driver
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* Order Details Card */}
                <OrderTrackingCard orderId={order.id} />

                {/* Notifications Panel */}
                {notifications.length > 0 && (
                  <SlideIn direction="up" className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Recent Updates
                      </h3>
                      <button
                        onClick={clearNotifications}
                        className="text-sm text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300"
                      >
                        Clear all
                      </button>
                    </div>
                    
                    <div className="space-y-3">
                      {notifications.slice(0, 3).map((notification) => (
                        <div
                          key={notification.id}
                          className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg"
                        >
                          <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                          <div className="flex-1">
                            <p className="text-sm text-gray-900 dark:text-white">
                              {notification.message}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                              {notification.timestamp.toLocaleTimeString()}
                            </p>
                          </div>
                          <button
                            onClick={() => markNotificationAsRead(notification.id)}
                            className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                          >
                            Dismiss
                          </button>
                        </div>
                      ))}
                    </div>
                  </SlideIn>
                )}
              </>
            ) : (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8 text-center">
                <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Select an order to track
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Choose an order from the list to see its tracking details
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderTrackingPage