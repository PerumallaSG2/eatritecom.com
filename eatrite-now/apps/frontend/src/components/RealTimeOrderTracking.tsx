import React, { useState, useEffect } from 'react'
import {
  MapPin,
  Clock,
  Truck,
  CheckCircle,
  Package,
  ChefHat,
  Navigation,
  Phone,
  MessageSquare,
  Star,
  RefreshCw,
  AlertCircle,
} from 'lucide-react'

interface OrderStatus {
  id: string
  status:
    | 'preparing'
    | 'ready'
    | 'dispatched'
    | 'in_transit'
    | 'delivered'
    | 'cancelled'
  timestamp: string
  description: string
  location?: string
}

interface DeliveryDriver {
  id: string
  name: string
  phone: string
  rating: number
  photo: string
  vehicleType: string
  licensePlate: string
}

interface Order {
  id: string
  orderNumber: string
  customerName: string
  deliveryAddress: string
  items: Array<{
    id: string
    name: string
    quantity: number
    price: number
  }>
  total: number
  estimatedDelivery: string
  actualDelivery?: string
  currentStatus: OrderStatus
  statusHistory: OrderStatus[]
  driver?: DeliveryDriver
  trackingId: string
  specialInstructions?: string
}

interface RealTimeOrderTrackingProps {
  orderId: string
  onUpdateOrder?: (order: Order) => void
}

const RealTimeOrderTracking: React.FC<RealTimeOrderTrackingProps> = ({
  orderId,
}) => {
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [showMap, setShowMap] = useState(false)

  // Mock order data
  const mockOrder: Order = {
    id: orderId,
    orderNumber: 'ER-' + Date.now().toString().slice(-6),
    customerName: 'John Smith',
    deliveryAddress: '123 Business District, Suite 400, Downtown, NY 10001',
    items: [
      {
        id: 'meal_1',
        name: 'Mediterranean Salmon Bowl',
        quantity: 2,
        price: 17.99,
      },
      {
        id: 'meal_2',
        name: 'Grilled Chicken Quinoa',
        quantity: 1,
        price: 14.99,
      },
      {
        id: 'meal_3',
        name: 'Plant-Based Buddha Bowl',
        quantity: 3,
        price: 13.99,
      },
    ],
    total: 92.95,
    estimatedDelivery: new Date(Date.now() + 45 * 60000).toISOString(),
    currentStatus: {
      id: 'status_4',
      status: 'in_transit',
      timestamp: new Date().toISOString(),
      description:
        'Your order is on the way! Driver will arrive in 15-20 minutes',
      location: 'Main Street & 5th Avenue',
    },
    statusHistory: [
      {
        id: 'status_1',
        status: 'preparing',
        timestamp: new Date(Date.now() - 30 * 60000).toISOString(),
        description: 'Order received and being prepared by our chefs',
      },
      {
        id: 'status_2',
        status: 'ready',
        timestamp: new Date(Date.now() - 20 * 60000).toISOString(),
        description: 'Order is ready and waiting for pickup',
      },
      {
        id: 'status_3',
        status: 'dispatched',
        timestamp: new Date(Date.now() - 15 * 60000).toISOString(),
        description: 'Order picked up by delivery driver',
      },
      {
        id: 'status_4',
        status: 'in_transit',
        timestamp: new Date().toISOString(),
        description:
          'Your order is on the way! Driver will arrive in 15-20 minutes',
        location: 'Main Street & 5th Avenue',
      },
    ],
    driver: {
      id: 'driver_1',
      name: 'Mike Rodriguez',
      phone: '+1 (555) 123-4567',
      rating: 4.8,
      photo: '/api/placeholder/80/80',
      vehicleType: 'Honda Civic',
      licensePlate: 'NYC-789',
    },
    trackingId: 'TRK' + Date.now().toString().slice(-8),
    specialInstructions:
      'Please call when arriving. Office building entrance on 2nd floor.',
  }

  useEffect(() => {
    const loadOrder = async () => {
      setLoading(true)
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        setOrder(mockOrder)
      } catch (error) {
        console.error('Error loading order:', error)
      } finally {
        setLoading(false)
      }
    }

    loadOrder()
  }, [orderId])

  // Simulate real-time updates
  useEffect(() => {
    if (!order) return

    const interval = setInterval(() => {
      // Randomly update order status or location
      if (Math.random() < 0.3 && order.currentStatus.status === 'in_transit') {
        const locations = [
          'Broadway & 42nd Street',
          '7th Avenue & 34th Street',
          'Park Avenue & 28th Street',
          'Madison Avenue & 23rd Street',
        ]
        const newLocation =
          locations[Math.floor(Math.random() * locations.length)]

        setOrder(prev =>
          prev
            ? {
                ...prev,
                currentStatus: {
                  ...prev.currentStatus,
                  location: newLocation,
                  timestamp: new Date().toISOString(),
                },
              }
            : null
        )
      }
    }, 10000) // Update every 10 seconds

    return () => clearInterval(interval)
  }, [order])

  const refreshOrder = async () => {
    setRefreshing(true)
    try {
      // Simulate refresh
      await new Promise(resolve => setTimeout(resolve, 1000))
      // In real app, would fetch fresh data
    } catch (error) {
      console.error('Error refreshing order:', error)
    } finally {
      setRefreshing(false)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'preparing':
        return <ChefHat className="w-5 h-5" />
      case 'ready':
        return <Package className="w-5 h-5" />
      case 'dispatched':
        return <Truck className="w-5 h-5" />
      case 'in_transit':
        return <Navigation className="w-5 h-5" />
      case 'delivered':
        return <CheckCircle className="w-5 h-5" />
      case 'cancelled':
        return <AlertCircle className="w-5 h-5" />
      default:
        return <Clock className="w-5 h-5" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'preparing':
        return 'text-orange-600 bg-orange-100'
      case 'ready':
        return 'text-blue-600 bg-blue-100'
      case 'dispatched':
      case 'in_transit':
        return 'text-purple-600 bg-purple-100'
      case 'delivered':
        return 'text-green-600 bg-green-100'
      case 'cancelled':
        return 'text-red-600 bg-red-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const getEstimatedArrival = () => {
    if (!order?.estimatedDelivery) return 'Calculating...'
    const now = new Date()
    const estimated = new Date(order.estimatedDelivery)
    const diffMinutes = Math.max(
      0,
      Math.floor((estimated.getTime() - now.getTime()) / 60000)
    )

    if (diffMinutes === 0) return 'Arriving now!'
    if (diffMinutes < 60) return `${diffMinutes} minutes`
    const hours = Math.floor(diffMinutes / 60)
    const minutes = diffMinutes % 60
    return `${hours}h ${minutes}m`
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-xl p-8 shadow-lg border border-[#D4B46A]/20 text-center">
          <div className="w-12 h-12 bg-[#D4B46A] rounded-xl flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Package className="w-6 h-6 text-[#0F2B1E]" />
          </div>
          <h3 className="text-lg font-bold text-[#0F2B1E] mb-2">
            Loading Order Details...
          </h3>
          <p className="text-gray-600">Fetching your real-time order status</p>
        </div>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-xl p-8 shadow-lg border border-red-200 text-center">
          <AlertCircle className="w-12 h-12 text-red-600 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-[#0F2B1E] mb-2">
            Order Not Found
          </h3>
          <p className="text-gray-600">
            Unable to load order details. Please check your order ID.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-[#D4B46A]/20">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1
              className="text-2xl font-bold text-[#0F2B1E]"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Order Tracking
            </h1>
            <p className="text-gray-600">
              Order #{order.orderNumber} • Track ID: {order.trackingId}
            </p>
          </div>
          <button
            onClick={refreshOrder}
            disabled={refreshing}
            className="flex items-center gap-2 bg-[#D4B46A] hover:bg-[#B8935A] text-[#0F2B1E] font-medium py-2 px-4 rounded-lg transition-colors disabled:opacity-50"
          >
            <RefreshCw
              className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`}
            />
            Refresh
          </button>
        </div>

        {/* Current Status */}
        <div
          className={`flex items-center gap-4 p-4 rounded-lg ${getStatusColor(order.currentStatus.status)}`}
        >
          {getStatusIcon(order.currentStatus.status)}
          <div className="flex-1">
            <div className="font-bold capitalize">
              {order.currentStatus.status.replace('_', ' ')}
            </div>
            <div className="text-sm">{order.currentStatus.description}</div>
            {order.currentStatus.location && (
              <div className="text-xs mt-1 flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                Current location: {order.currentStatus.location}
              </div>
            )}
          </div>
          <div className="text-right">
            <div className="font-bold">ETA: {getEstimatedArrival()}</div>
            <div className="text-xs">
              {formatTime(order.currentStatus.timestamp)}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Order Details */}
        <div className="space-y-6">
          {/* Delivery Info */}
          <div className="bg-white rounded-xl p-6 shadow-lg border border-[#D4B46A]/20">
            <h3 className="font-bold text-[#0F2B1E] mb-4">
              Delivery Information
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#D4B46A] mt-0.5" />
                <div>
                  <div className="font-medium text-[#0F2B1E]">
                    Delivery Address
                  </div>
                  <div className="text-gray-600 text-sm">
                    {order.deliveryAddress}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#D4B46A] mt-0.5" />
                <div>
                  <div className="font-medium text-[#0F2B1E]">
                    Estimated Delivery
                  </div>
                  <div className="text-gray-600 text-sm">
                    {new Date(order.estimatedDelivery).toLocaleString()}
                  </div>
                </div>
              </div>

              {order.specialInstructions && (
                <div className="flex items-start gap-3">
                  <MessageSquare className="w-5 h-5 text-[#D4B46A] mt-0.5" />
                  <div>
                    <div className="font-medium text-[#0F2B1E]">
                      Special Instructions
                    </div>
                    <div className="text-gray-600 text-sm">
                      {order.specialInstructions}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Driver Info */}
          {order.driver &&
            order.currentStatus.status !== 'preparing' &&
            order.currentStatus.status !== 'ready' && (
              <div className="bg-white rounded-xl p-6 shadow-lg border border-[#D4B46A]/20">
                <h3 className="font-bold text-[#0F2B1E] mb-4">Your Driver</h3>
                <div className="flex items-center gap-4">
                  <img
                    src={order.driver.photo}
                    alt={order.driver.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-bold text-[#0F2B1E]">
                      {order.driver.name}
                    </h4>
                    <div className="flex items-center gap-1 text-sm text-yellow-600">
                      <Star className="w-4 h-4 fill-current" />
                      {order.driver.rating} rating
                    </div>
                    <div className="text-sm text-gray-600">
                      {order.driver.vehicleType} • {order.driver.licensePlate}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <a
                      href={`tel:${order.driver.phone}`}
                      className="flex items-center gap-2 bg-[#D4B46A] hover:bg-[#B8935A] text-[#0F2B1E] font-medium py-2 px-3 rounded-lg transition-colors"
                    >
                      <Phone className="w-4 h-4" />
                      Call
                    </a>
                    <button
                      onClick={() => setShowMap(!showMap)}
                      className="flex items-center gap-2 bg-[#0F2B1E] hover:bg-[#0A2418] text-white font-medium py-2 px-3 rounded-lg transition-colors"
                    >
                      <MapPin className="w-4 h-4" />
                      Map
                    </button>
                  </div>
                </div>
              </div>
            )}

          {/* Order Items */}
          <div className="bg-white rounded-xl p-6 shadow-lg border border-[#D4B46A]/20">
            <h3 className="font-bold text-[#0F2B1E] mb-4">Order Items</h3>
            <div className="space-y-3">
              {order.items.map(item => (
                <div
                  key={item.id}
                  className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
                >
                  <div className="flex-1">
                    <div className="font-medium text-[#0F2B1E]">
                      {item.name}
                    </div>
                    <div className="text-sm text-gray-600">
                      Quantity: {item.quantity}
                    </div>
                  </div>
                  <div className="font-bold text-[#0F2B1E]">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
              <div className="flex justify-between font-bold text-[#0F2B1E] text-lg pt-2 border-t border-[#D4B46A]/30">
                <span>Total:</span>
                <span>${order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Status Timeline */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-[#D4B46A]/20">
          <h3 className="font-bold text-[#0F2B1E] mb-4">Order Timeline</h3>
          <div className="space-y-4">
            {order.statusHistory.map((status, index) => (
              <div key={status.id} className="flex items-start gap-4">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${getStatusColor(status.status)}`}
                >
                  {getStatusIcon(status.status)}
                </div>
                <div className="flex-1">
                  <div className="font-medium text-[#0F2B1E] capitalize">
                    {status.status.replace('_', ' ')}
                  </div>
                  <div className="text-sm text-gray-600 mb-1">
                    {status.description}
                  </div>
                  <div className="text-xs text-gray-400">
                    {formatTime(status.timestamp)}
                  </div>
                </div>
                {index < order.statusHistory.length - 1 && (
                  <div className="absolute left-[1.25rem] mt-10 w-0.5 h-6 bg-gray-200" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Map View */}
      {showMap && order.driver && (
        <div className="bg-white rounded-xl p-6 shadow-lg border border-[#D4B46A]/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-[#0F2B1E]">Live Tracking</h3>
            <button
              onClick={() => setShowMap(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              Close Map
            </button>
          </div>
          <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500">
            <div className="text-center">
              <MapPin className="w-12 h-12 mx-auto mb-2 text-[#D4B46A]" />
              <p>Interactive map would appear here</p>
              <p className="text-sm">Showing real-time driver location</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default RealTimeOrderTracking
