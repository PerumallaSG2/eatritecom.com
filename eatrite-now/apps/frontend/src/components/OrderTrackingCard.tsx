import React from 'react'
import { 
  MapPin, 
  Clock, 
  Phone, 
  MessageCircle, 
  Truck, 
  Package, 
  CheckCircle, 
  Star,
  Navigation,
  RefreshCw
} from 'lucide-react'
import { useOrderTracking, getOrderStatusColor, getOrderStatusLabel, calculateEstimatedDeliveryTime } from '../context/OrderTrackingContext'
import { useThemeColors } from '../context/ThemeContext'
import { FadeIn } from './LoadingStates'

interface OrderTrackingCardProps {
  orderId?: string
  className?: string
}

export const OrderTrackingCard: React.FC<OrderTrackingCardProps> = ({ 
  orderId, 
  className = '' 
}) => {
  const { orders, activeOrder, simulateOrderProgress } = useOrderTracking()
  const colors = useThemeColors()
  
  const order = orderId ? orders.find(o => o.id === orderId) : activeOrder
  
  if (!order) {
    return (
      <div className={`bg-white dark:bg-gray-800 rounded-xl p-6 ${className}`}>
        <div className="text-center py-8">
          <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No active orders
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            Place an order to track its progress here
          </p>
        </div>
      </div>
    )
  }

  const latestUpdate = order.updates[order.updates.length - 1]
  const progress = getOrderProgress(order.status)

  return (
    <FadeIn className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden ${className}`}>
      {/* Header */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Order {order.id}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {order.createdAt.toLocaleString()}
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold" style={{ color: colors.primary }}>
              ${order.totalAmount.toFixed(2)}
            </div>
            <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getOrderStatusColor(order.status)}`}>
              {getOrderStatusLabel(order.status)}
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Order Progress
            </span>
            <span className="text-sm font-medium" style={{ color: colors.primary }}>
              {progress}%
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div 
              className="h-2 rounded-full transition-all duration-500 ease-out"
              style={{ 
                width: `${progress}%`,
                backgroundColor: colors.primary 
              }}
            />
          </div>
        </div>

        {/* Estimated Delivery Time */}
        <div className="flex items-center gap-2 text-sm">
          <Clock className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          <span className="text-gray-600 dark:text-gray-300">
            Estimated delivery: {calculateEstimatedDeliveryTime(order)}
          </span>
        </div>
      </div>

      {/* Driver Info (if out for delivery) */}
      {order.driver && order.status === 'out_for_delivery' && (
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h4 className="font-medium text-gray-900 dark:text-white mb-3">
            Your Delivery Driver
          </h4>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img 
                src={order.driver.avatar} 
                alt={order.driver.name}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <div className="font-medium text-gray-900 dark:text-white">
                  {order.driver.name}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <Star className="w-3 h-3 text-yellow-400 fill-current" />
                  <span>{order.driver.rating}</span>
                  <span>•</span>
                  <span className="capitalize">{order.driver.vehicleType}</span>
                  {order.driver.licensePlate && (
                    <>
                      <span>•</span>
                      <span>{order.driver.licensePlate}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button 
                className="p-2 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors"
                title="Call driver"
              >
                <Phone className="w-4 h-4" />
              </button>
              <button 
                className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
                title="Message driver"
              >
                <MessageCircle className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Latest Update */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h4 className="font-medium text-gray-900 dark:text-white mb-3">
          Latest Update
        </h4>
        <div className="flex items-start gap-3">
          <div className={`p-2 rounded-lg ${getOrderStatusColor(latestUpdate.status)}`}>
            <StatusIcon status={latestUpdate.status} className="w-4 h-4" />
          </div>
          <div className="flex-1">
            <p className="text-gray-900 dark:text-white font-medium">
              {latestUpdate.message}
            </p>
            <div className="flex items-center gap-4 mt-2 text-sm text-gray-500 dark:text-gray-400">
              <span>{latestUpdate.timestamp.toLocaleTimeString()}</span>
              {latestUpdate.location && (
                <div className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  <span>{latestUpdate.location.address}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Order Items */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h4 className="font-medium text-gray-900 dark:text-white mb-3">
          Order Items
        </h4>
        <div className="space-y-3">
          {order.items.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-900 dark:text-white">
                  {item.quantity}x {item.name}
                </div>
                {item.customization && (
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {item.customization}
                  </div>
                )}
              </div>
              <div className="font-medium text-gray-900 dark:text-white">
                ${item.price.toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="p-6">
        <div className="flex gap-3">
          {order.status !== 'delivered' && order.status !== 'cancelled' && (
            <button 
              onClick={() => simulateOrderProgress(order.id)}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Simulate Progress
            </button>
          )}
          {order.status === 'out_for_delivery' && (
            <button className="flex-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2">
              <Navigation className="w-4 h-4" />
              Track on Map
            </button>
          )}
        </div>
      </div>
    </FadeIn>
  )
}

// Status icon component
const StatusIcon: React.FC<{ status: string; className?: string }> = ({ status, className }) => {
  const icons: Record<string, React.ReactNode> = {
    pending: <Clock className={className} />,
    confirmed: <CheckCircle className={className} />,
    preparing: <Package className={className} />,
    cooking: <Package className={className} />,
    quality_check: <CheckCircle className={className} />,
    packaging: <Package className={className} />,
    ready_for_pickup: <Package className={className} />,
    out_for_delivery: <Truck className={className} />,
    delivered: <CheckCircle className={className} />,
    cancelled: <Clock className={className} />
  }
  return <>{icons[status] || <Clock className={className} />}</>
}

// Helper function to calculate order progress percentage
const getOrderProgress = (status: string): number => {
  const progressMap: Record<string, number> = {
    pending: 10,
    confirmed: 20,
    preparing: 35,
    cooking: 50,
    quality_check: 65,
    packaging: 75,
    ready_for_pickup: 85,
    out_for_delivery: 90,
    delivered: 100,
    cancelled: 0
  }
  return progressMap[status] || 0
}

export default OrderTrackingCard