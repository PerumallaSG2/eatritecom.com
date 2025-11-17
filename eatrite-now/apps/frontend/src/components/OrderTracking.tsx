import React, { useState, useEffect } from 'react'
import {
  Package,
  Truck,
  CheckCircle,
  Clock,
  MapPin,
  Calendar,
  Filter,
  Search,
  RefreshCw,
  AlertTriangle,
  Phone,
  Mail,
} from 'lucide-react'
import { FadeIn, StaggeredAnimation } from './AnimationComponents'

interface OrderItem {
  id: string
  name: string
  image: string
  quantity: number
  price: number
}

interface Order {
  id: string
  orderNumber: string
  status:
    | 'preparing'
    | 'shipped'
    | 'out-for-delivery'
    | 'delivered'
    | 'cancelled'
  orderDate: string
  estimatedDelivery: string
  actualDelivery?: string
  items: OrderItem[]
  subtotal: number
  tax: number
  shipping: number
  total: number
  trackingNumber?: string
  carrier?: string
  deliveryAddress: string
  deliveryInstructions?: string
}

interface TrackingUpdate {
  id: string
  timestamp: string
  status: string
  location: string
  description: string
}

const mockOrders: Order[] = [
  {
    id: 'ord-1',
    orderNumber: 'ORD-2024-001',
    status: 'out-for-delivery',
    orderDate: '2024-01-20T10:00:00Z',
    estimatedDelivery: '2024-01-22T18:00:00Z',
    items: [
      {
        id: 'item-1',
        name: 'Grilled Chicken & Vegetables',
        image:
          'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=100&h=100&fit=crop',
        quantity: 2,
        price: 15.0,
      },
      {
        id: 'item-2',
        name: 'Salmon with Quinoa',
        image:
          'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=100&h=100&fit=crop',
        quantity: 2,
        price: 18.0,
      },
    ],
    subtotal: 66.0,
    tax: 5.28,
    shipping: 0.0,
    total: 71.28,
    trackingNumber: 'TRK123456789',
    carrier: 'FedEx',
    deliveryAddress: '123 Main Street, Apt 4B, New York, NY 10001',
    deliveryInstructions: 'Leave at front door',
  },
  {
    id: 'ord-2',
    orderNumber: 'ORD-2024-002',
    status: 'delivered',
    orderDate: '2024-01-13T10:00:00Z',
    estimatedDelivery: '2024-01-15T18:00:00Z',
    actualDelivery: '2024-01-15T16:30:00Z',
    items: [
      {
        id: 'item-3',
        name: 'Turkey Meatballs',
        image:
          'https://images.unsplash.com/photo-1529042410759-befb1204b468?w=100&h=100&fit=crop',
        quantity: 3,
        price: 14.0,
      },
    ],
    subtotal: 42.0,
    tax: 3.36,
    shipping: 0.0,
    total: 45.36,
    trackingNumber: 'TRK987654321',
    carrier: 'UPS',
    deliveryAddress: '123 Main Street, Apt 4B, New York, NY 10001',
  },
  {
    id: 'ord-3',
    orderNumber: 'ORD-2024-003',
    status: 'preparing',
    orderDate: '2024-01-22T14:00:00Z',
    estimatedDelivery: '2024-01-24T18:00:00Z',
    items: [
      {
        id: 'item-4',
        name: 'Beef Steak & Sweet Potato',
        image:
          'https://images.unsplash.com/photo-1558030006-450675393462?w=100&h=100&fit=crop',
        quantity: 2,
        price: 20.0,
      },
    ],
    subtotal: 40.0,
    tax: 3.2,
    shipping: 0.0,
    total: 43.2,
    deliveryAddress: '123 Main Street, Apt 4B, New York, NY 10001',
  },
]

const mockTrackingUpdates: Record<string, TrackingUpdate[]> = {
  TRK123456789: [
    {
      id: 'track-1',
      timestamp: '2024-01-22T08:00:00Z',
      status: 'Out for Delivery',
      location: 'New York, NY',
      description: 'Package is out for delivery and will be delivered today',
    },
    {
      id: 'track-2',
      timestamp: '2024-01-21T22:00:00Z',
      status: 'Arrived at Facility',
      location: 'New York Distribution Center',
      description: 'Package arrived at delivery facility',
    },
    {
      id: 'track-3',
      timestamp: '2024-01-21T15:00:00Z',
      status: 'In Transit',
      location: 'Philadelphia, PA',
      description: 'Package is in transit to next facility',
    },
    {
      id: 'track-4',
      timestamp: '2024-01-20T18:00:00Z',
      status: 'Shipped',
      location: 'Factor75 Kitchen',
      description: 'Package has been shipped',
    },
  ],
  TRK987654321: [
    {
      id: 'track-5',
      timestamp: '2024-01-15T16:30:00Z',
      status: 'Delivered',
      location: 'New York, NY',
      description: 'Package delivered to front door',
    },
    {
      id: 'track-6',
      timestamp: '2024-01-15T08:00:00Z',
      status: 'Out for Delivery',
      location: 'New York, NY',
      description: 'Package is out for delivery',
    },
  ],
}

export const OrderTracking: React.FC = () => {
  const [orders] = useState<Order[]>(mockOrders)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [trackingUpdates, setTrackingUpdates] = useState<TrackingUpdate[]>([])
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [isRefreshing, setIsRefreshing] = useState(false)

  useEffect(() => {
    if (
      selectedOrder?.trackingNumber &&
      mockTrackingUpdates[selectedOrder.trackingNumber]
    ) {
      setTrackingUpdates(mockTrackingUpdates[selectedOrder.trackingNumber])
    } else {
      setTrackingUpdates([])
    }
  }, [selectedOrder])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'text-green-600 bg-green-50 border-green-200'
      case 'out-for-delivery':
        return 'text-blue-600 bg-blue-50 border-blue-200'
      case 'shipped':
        return 'text-purple-600 bg-purple-50 border-purple-200'
      case 'preparing':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200'
      case 'cancelled':
        return 'text-red-600 bg-red-50 border-red-200'
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="w-5 h-5" />
      case 'out-for-delivery':
        return <Truck className="w-5 h-5" />
      case 'shipped':
        return <Package className="w-5 h-5" />
      case 'preparing':
        return <Clock className="w-5 h-5" />
      case 'cancelled':
        return <AlertTriangle className="w-5 h-5" />
      default:
        return <Package className="w-5 h-5" />
    }
  }

  const formatStatus = (status: string) => {
    return status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())
  }

  const filteredOrders = orders.filter(order => {
    const matchesStatus =
      filterStatus === 'all' || order.status === filterStatus
    const matchesSearch =
      searchQuery === '' ||
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.trackingNumber?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.items.some(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      )

    return matchesStatus && matchesSearch
  })

  const handleRefresh = async () => {
    setIsRefreshing(true)
    // Simulate API refresh
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsRefreshing(false)
  }

  const getProgressPercentage = (status: string) => {
    switch (status) {
      case 'preparing':
        return 25
      case 'shipped':
        return 50
      case 'out-for-delivery':
        return 75
      case 'delivered':
        return 100
      default:
        return 0
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <FadeIn>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Order Tracking
          </h1>
          <p className="text-gray-600">
            Track your meal deliveries and view order history
          </p>
        </div>
      </FadeIn>

      {/* Filters and Search */}
      <FadeIn delay={0.1}>
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search by order number, tracking number, or meal..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-80"
                />
              </div>

              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <select
                  value={filterStatus}
                  onChange={e => setFilterStatus(e.target.value)}
                  className="pl-10 pr-8 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
                >
                  <option value="all">All Orders</option>
                  <option value="preparing">Preparing</option>
                  <option value="shipped">Shipped</option>
                  <option value="out-for-delivery">Out for Delivery</option>
                  <option value="delivered">Delivered</option>
                </select>
              </div>
            </div>

            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="flex items-center space-x-2 px-4 py-2 text-blue-600 border border-blue-300 rounded-md hover:bg-blue-50 disabled:opacity-50"
            >
              <RefreshCw
                className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`}
              />
              <span>Refresh</span>
            </button>
          </div>
        </div>
      </FadeIn>

      {/* Orders List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Orders Column */}
        <div>
          <FadeIn delay={0.2}>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Your Orders
            </h2>
          </FadeIn>

          {filteredOrders.length === 0 ? (
            <FadeIn delay={0.3}>
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">
                  No orders found matching your criteria
                </p>
              </div>
            </FadeIn>
          ) : (
            <StaggeredAnimation className="space-y-4">
              {filteredOrders.map(order => (
                <div
                  key={order.id}
                  className={`bg-white rounded-lg shadow-md p-6 cursor-pointer transition-all hover:shadow-lg ${
                    selectedOrder?.id === order.id
                      ? 'ring-2 ring-blue-500 bg-blue-50'
                      : ''
                  }`}
                  onClick={() => setSelectedOrder(order)}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {order.orderNumber}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Ordered on{' '}
                        {new Date(order.orderDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div
                      className={`flex items-center space-x-2 px-3 py-1 rounded-full border ${getStatusColor(order.status)}`}
                    >
                      {getStatusIcon(order.status)}
                      <span className="text-sm font-medium">
                        {formatStatus(order.status)}
                      </span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>Order Progress</span>
                      <span>{getProgressPercentage(order.status)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all"
                        style={{
                          width: `${getProgressPercentage(order.status)}%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  {/* Order Items Preview */}
                  <div className="mb-4">
                    <div className="flex items-center space-x-2 mb-2">
                      {order.items.slice(0, 3).map(item => (
                        <img
                          key={item.id}
                          src={item.image}
                          alt={item.name}
                          className="w-8 h-8 rounded object-cover"
                        />
                      ))}
                      {order.items.length > 3 && (
                        <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-600">
                          +{order.items.length - 3}
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">
                      {order.items.length} item
                      {order.items.length !== 1 ? 's' : ''} • $
                      {order.total.toFixed(2)}
                    </p>
                  </div>

                  {/* Delivery Info */}
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {order.status === 'delivered' && order.actualDelivery
                          ? `Delivered ${new Date(order.actualDelivery).toLocaleDateString()}`
                          : `Expected ${new Date(order.estimatedDelivery).toLocaleDateString()}`}
                      </span>
                    </div>
                    {order.trackingNumber && (
                      <span className="text-blue-600 font-medium">
                        {order.trackingNumber}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </StaggeredAnimation>
          )}
        </div>

        {/* Order Details Column */}
        <div>
          {selectedOrder ? (
            <FadeIn key={selectedOrder.id}>
              <div className="sticky top-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Order Details
                </h2>

                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  {/* Order Header */}
                  <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {selectedOrder.orderNumber}
                      </h3>
                      <div
                        className={`flex items-center space-x-2 px-3 py-1 rounded-full border ${getStatusColor(selectedOrder.status)}`}
                      >
                        {getStatusIcon(selectedOrder.status)}
                        <span className="text-sm font-medium">
                          {formatStatus(selectedOrder.status)}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">Order Date</p>
                        <p className="font-medium">
                          {new Date(
                            selectedOrder.orderDate
                          ).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500">
                          {selectedOrder.status === 'delivered'
                            ? 'Delivered'
                            : 'Expected Delivery'}
                        </p>
                        <p className="font-medium">
                          {selectedOrder.status === 'delivered' &&
                          selectedOrder.actualDelivery
                            ? new Date(
                                selectedOrder.actualDelivery
                              ).toLocaleDateString()
                            : new Date(
                                selectedOrder.estimatedDelivery
                              ).toLocaleDateString()}
                        </p>
                      </div>
                      {selectedOrder.trackingNumber && (
                        <>
                          <div>
                            <p className="text-gray-500">Tracking Number</p>
                            <p className="font-medium">
                              {selectedOrder.trackingNumber}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-500">Carrier</p>
                            <p className="font-medium">
                              {selectedOrder.carrier || 'N/A'}
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="p-6 border-b border-gray-200">
                    <h4 className="font-medium text-gray-900 mb-4">Items</h4>
                    <div className="space-y-3">
                      {selectedOrder.items.map(item => (
                        <div
                          key={item.id}
                          className="flex items-center space-x-3"
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-12 h-12 rounded object-cover"
                          />
                          <div className="flex-1">
                            <p className="font-medium text-gray-900">
                              {item.name}
                            </p>
                            <p className="text-sm text-gray-500">
                              Qty: {item.quantity}
                            </p>
                          </div>
                          <p className="font-medium text-gray-900">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Order Total */}
                  <div className="p-6 border-b border-gray-200">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Subtotal</span>
                        <span>${selectedOrder.subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Tax</span>
                        <span>${selectedOrder.tax.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Shipping</span>
                        <span>
                          {selectedOrder.shipping === 0
                            ? 'FREE'
                            : `$${selectedOrder.shipping.toFixed(2)}`}
                        </span>
                      </div>
                      <div className="border-t pt-2">
                        <div className="flex justify-between font-semibold">
                          <span>Total</span>
                          <span>${selectedOrder.total.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Delivery Address */}
                  <div className="p-6 border-b border-gray-200">
                    <h4 className="font-medium text-gray-900 mb-2 flex items-center space-x-2">
                      <MapPin className="w-4 h-4" />
                      <span>Delivery Address</span>
                    </h4>
                    <p className="text-gray-600 text-sm">
                      {selectedOrder.deliveryAddress}
                    </p>
                    {selectedOrder.deliveryInstructions && (
                      <p className="text-gray-500 text-sm mt-1">
                        Instructions: {selectedOrder.deliveryInstructions}
                      </p>
                    )}
                  </div>

                  {/* Tracking Updates */}
                  {trackingUpdates.length > 0 && (
                    <div className="p-6">
                      <h4 className="font-medium text-gray-900 mb-4">
                        Tracking Updates
                      </h4>
                      <div className="space-y-4">
                        {trackingUpdates.map((update, index) => (
                          <div key={update.id} className="flex space-x-3">
                            <div className="flex-shrink-0">
                              <div
                                className={`w-3 h-3 rounded-full ${
                                  index === 0 ? 'bg-blue-500' : 'bg-gray-300'
                                }`}
                              ></div>
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <p className="font-medium text-gray-900">
                                  {update.status}
                                </p>
                                <p className="text-sm text-gray-500">
                                  {new Date(update.timestamp).toLocaleString()}
                                </p>
                              </div>
                              <p className="text-sm text-gray-600">
                                {update.description}
                              </p>
                              <p className="text-sm text-gray-500">
                                {update.location}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Contact Support */}
                  <div className="p-6 bg-gray-50">
                    <h4 className="font-medium text-gray-900 mb-3">
                      Need Help?
                    </h4>
                    <div className="flex space-x-4">
                      <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-800">
                        <Phone className="w-4 h-4" />
                        <span className="text-sm">Call Support</span>
                      </button>
                      <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-800">
                        <Mail className="w-4 h-4" />
                        <span className="text-sm">Email Support</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          ) : (
            <FadeIn delay={0.4}>
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Select an Order
                </h3>
                <p className="text-gray-500">
                  Click on any order from the list to view detailed tracking
                  information
                </p>
              </div>
            </FadeIn>
          )}
        </div>
      </div>
    </div>
  )
}

export default OrderTracking
