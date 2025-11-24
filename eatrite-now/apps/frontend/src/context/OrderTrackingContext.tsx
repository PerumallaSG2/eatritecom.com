import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

// Order status types
export type OrderStatus = 
  | 'pending' 
  | 'confirmed' 
  | 'preparing' 
  | 'cooking' 
  | 'quality_check' 
  | 'packaging' 
  | 'ready_for_pickup' 
  | 'out_for_delivery' 
  | 'delivered' 
  | 'cancelled'

export interface OrderLocation {
  latitude: number
  longitude: number
  address: string
  timestamp: Date
}

export interface DeliveryDriver {
  id: string
  name: string
  phone: string
  avatar: string
  rating: number
  vehicleType: 'bike' | 'car' | 'scooter'
  licensePlate?: string
}

export interface OrderUpdate {
  id: string
  orderId: string
  status: OrderStatus
  message: string
  timestamp: Date
  estimatedTime?: number // minutes
  location?: OrderLocation
  image?: string
}

export interface Order {
  id: string
  customerName: string
  items: Array<{
    id: string
    name: string
    quantity: number
    price: number
    customization?: string
  }>
  totalAmount: number
  status: OrderStatus
  createdAt: Date
  estimatedDeliveryTime: Date
  actualDeliveryTime?: Date
  deliveryAddress: {
    street: string
    city: string
    state: string
    zipCode: string
    coordinates: {
      latitude: number
      longitude: number
    }
  }
  driver?: DeliveryDriver
  updates: OrderUpdate[]
  trackingUrl?: string
  specialInstructions?: string
}

interface OrderTrackingContextType {
  orders: Order[]
  activeOrder: Order | null
  notifications: OrderUpdate[]
  isConnected: boolean
  setActiveOrder: (orderId: string) => void
  markNotificationAsRead: (updateId: string) => void
  clearNotifications: () => void
  simulateOrderProgress: (orderId: string) => void
  createOrder: (orderData: Partial<Order>) => Order
}

const OrderTrackingContext = createContext<OrderTrackingContextType | undefined>(undefined)

// Sample order data for demonstration
const sampleOrders: Order[] = [
  {
    id: 'ORD-2024-001',
    customerName: 'John Smith',
    items: [
      {
        id: '1',
        name: 'Mediterranean Power Bowl',
        quantity: 1,
        price: 14.95,
        customization: 'Large portion, extra protein'
      },
      {
        id: '2',
        name: 'Green Goddess Salad',
        quantity: 1,
        price: 11.95
      }
    ],
    totalAmount: 26.90,
    status: 'out_for_delivery',
    createdAt: new Date(Date.now() - 45 * 60 * 1000), // 45 minutes ago
    estimatedDeliveryTime: new Date(Date.now() + 15 * 60 * 1000), // 15 minutes from now
    deliveryAddress: {
      street: '123 Main St, Apt 4B',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94102',
      coordinates: {
        latitude: 37.7749,
        longitude: -122.4194
      }
    },
    driver: {
      id: 'DRV-001',
      name: 'Maria Rodriguez',
      phone: '+1 (555) 123-4567',
      avatar: '/api/placeholder/40/40',
      rating: 4.9,
      vehicleType: 'bike',
      licensePlate: 'EATRITE1'
    },
    updates: [
      {
        id: 'UPD-001',
        orderId: 'ORD-2024-001',
        status: 'confirmed',
        message: 'Your order has been confirmed and is being prepared',
        timestamp: new Date(Date.now() - 45 * 60 * 1000)
      },
      {
        id: 'UPD-002',
        orderId: 'ORD-2024-001',
        status: 'cooking',
        message: 'Our chefs are preparing your meal with fresh ingredients',
        timestamp: new Date(Date.now() - 30 * 60 * 1000)
      },
      {
        id: 'UPD-003',
        orderId: 'ORD-2024-001',
        status: 'out_for_delivery',
        message: 'Your order is on its way! Maria is delivering your food.',
        timestamp: new Date(Date.now() - 10 * 60 * 1000),
        location: {
          latitude: 37.7849,
          longitude: -122.4094,
          address: 'Near Union Square',
          timestamp: new Date(Date.now() - 2 * 60 * 1000)
        }
      }
    ],
    specialInstructions: 'Please call when you arrive. Apartment buzzer is broken.'
  }
]

export const OrderTrackingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>(sampleOrders)
  const [activeOrder, setActiveOrderState] = useState<Order | null>(sampleOrders[0] || null)
  const [notifications, setNotifications] = useState<OrderUpdate[]>([])
  const [isConnected, setIsConnected] = useState(false)

  // Simulate WebSocket connection
  useEffect(() => {
    const connectToOrderTracking = () => {
      setIsConnected(true)
      
      // Simulate receiving real-time updates
      const interval = setInterval(() => {
        if (activeOrder && activeOrder.status !== 'delivered' && activeOrder.status !== 'cancelled') {
          // Simulate location updates for active orders
          simulateLocationUpdate(activeOrder.id)
        }
      }, 30000) // Update every 30 seconds

      return () => {
        clearInterval(interval)
        setIsConnected(false)
      }
    }

    const cleanup = connectToOrderTracking()
    return cleanup
  }, [activeOrder])

  const simulateLocationUpdate = (orderId: string) => {
    const order = orders.find(o => o.id === orderId)
    if (!order || !order.driver) return

    const lastUpdate = order.updates[order.updates.length - 1]
    if (!lastUpdate.location) return

    // Simulate driver moving closer to destination
    const newLocation: OrderLocation = {
      latitude: lastUpdate.location.latitude + (Math.random() - 0.5) * 0.001,
      longitude: lastUpdate.location.longitude + (Math.random() - 0.5) * 0.001,
      address: 'Moving towards destination',
      timestamp: new Date()
    }

    const newUpdate: OrderUpdate = {
      id: `UPD-${Date.now()}`,
      orderId: orderId,
      status: order.status,
      message: `${order.driver.name} is getting closer to your location`,
      timestamp: new Date(),
      location: newLocation
    }

    addOrderUpdate(orderId, newUpdate)
  }

  const addOrderUpdate = (orderId: string, update: OrderUpdate) => {
    setOrders(prevOrders => 
      prevOrders.map(order => 
        order.id === orderId 
          ? { ...order, updates: [...order.updates, update] }
          : order
      )
    )

    // Add to notifications
    setNotifications(prevNotifications => [update, ...prevNotifications])

    // Update active order if it matches
    if (activeOrder && activeOrder.id === orderId) {
      setActiveOrderState(prevActiveOrder => 
        prevActiveOrder ? { ...prevActiveOrder, updates: [...prevActiveOrder.updates, update] } : null
      )
    }
  }

  const setActiveOrder = (orderId: string) => {
    const order = orders.find(o => o.id === orderId)
    setActiveOrderState(order || null)
  }

  const markNotificationAsRead = (updateId: string) => {
    setNotifications(prevNotifications => 
      prevNotifications.filter(notification => notification.id !== updateId)
    )
  }

  const clearNotifications = () => {
    setNotifications([])
  }

  const simulateOrderProgress = (orderId: string) => {
    const order = orders.find(o => o.id === orderId)
    if (!order) return

    const statusProgression: OrderStatus[] = [
      'pending',
      'confirmed', 
      'preparing',
      'cooking',
      'quality_check',
      'packaging',
      'ready_for_pickup',
      'out_for_delivery',
      'delivered'
    ]

    const currentIndex = statusProgression.indexOf(order.status)
    if (currentIndex === -1 || currentIndex >= statusProgression.length - 1) return

    const nextStatus = statusProgression[currentIndex + 1]
    const statusMessages: Record<OrderStatus, string> = {
      pending: 'Your order is being processed',
      confirmed: 'Your order has been confirmed and is being prepared',
      preparing: 'Our chefs are gathering fresh ingredients for your meal',
      cooking: 'Your meal is being freshly prepared by our expert chefs',
      quality_check: 'Final quality check to ensure perfection',
      packaging: 'Your meal is being carefully packaged for delivery',
      ready_for_pickup: 'Your order is ready and waiting for pickup',
      out_for_delivery: 'Your order is on its way to you!',
      delivered: 'Your order has been delivered. Enjoy your meal!',
      cancelled: 'Your order has been cancelled'
    }

    const newUpdate: OrderUpdate = {
      id: `UPD-${Date.now()}`,
      orderId: orderId,
      status: nextStatus,
      message: statusMessages[nextStatus],
      timestamp: new Date(),
      estimatedTime: nextStatus === 'out_for_delivery' ? 15 : undefined
    }

    // Update order status
    setOrders(prevOrders =>
      prevOrders.map(o =>
        o.id === orderId
          ? { ...o, status: nextStatus, updates: [...o.updates, newUpdate] }
          : o
      )
    )

    // Add notification
    setNotifications(prevNotifications => [newUpdate, ...prevNotifications])
  }

  const createOrder = (orderData: Partial<Order>): Order => {
    const newOrder: Order = {
      id: `ORD-${Date.now()}`,
      customerName: orderData.customerName || 'Customer',
      items: orderData.items || [],
      totalAmount: orderData.totalAmount || 0,
      status: 'pending',
      createdAt: new Date(),
      estimatedDeliveryTime: new Date(Date.now() + 60 * 60 * 1000), // 1 hour from now
      deliveryAddress: orderData.deliveryAddress || {
        street: '',
        city: '',
        state: '',
        zipCode: '',
        coordinates: { latitude: 0, longitude: 0 }
      },
      updates: [{
        id: `UPD-${Date.now()}`,
        orderId: `ORD-${Date.now()}`,
        status: 'pending',
        message: 'Your order has been received and is being processed',
        timestamp: new Date()
      }],
      ...orderData
    }

    setOrders(prevOrders => [newOrder, ...prevOrders])
    return newOrder
  }

  const value: OrderTrackingContextType = {
    orders,
    activeOrder,
    notifications,
    isConnected,
    setActiveOrder,
    markNotificationAsRead,
    clearNotifications,
    simulateOrderProgress,
    createOrder
  }

  return (
    <OrderTrackingContext.Provider value={value}>
      {children}
    </OrderTrackingContext.Provider>
  )
}

export const useOrderTracking = () => {
  const context = useContext(OrderTrackingContext)
  if (context === undefined) {
    throw new Error('useOrderTracking must be used within an OrderTrackingProvider')
  }
  return context
}

// Utility functions
export const getOrderStatusColor = (status: OrderStatus): string => {
  const colors: Record<OrderStatus, string> = {
    pending: 'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/20',
    confirmed: 'text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/20',
    preparing: 'text-purple-600 bg-purple-100 dark:text-purple-400 dark:bg-purple-900/20',
    cooking: 'text-orange-600 bg-orange-100 dark:text-orange-400 dark:bg-orange-900/20',
    quality_check: 'text-indigo-600 bg-indigo-100 dark:text-indigo-400 dark:bg-indigo-900/20',
    packaging: 'text-cyan-600 bg-cyan-100 dark:text-cyan-400 dark:bg-cyan-900/20',
    ready_for_pickup: 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/20',
    out_for_delivery: 'text-emerald-600 bg-emerald-100 dark:text-emerald-400 dark:bg-emerald-900/20',
    delivered: 'text-green-800 bg-green-200 dark:text-green-300 dark:bg-green-800/20',
    cancelled: 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/20'
  }
  return colors[status] || colors.pending
}

export const getOrderStatusLabel = (status: OrderStatus): string => {
  const labels: Record<OrderStatus, string> = {
    pending: 'Order Received',
    confirmed: 'Confirmed',
    preparing: 'Preparing',
    cooking: 'Cooking',
    quality_check: 'Quality Check',
    packaging: 'Packaging',
    ready_for_pickup: 'Ready for Pickup',
    out_for_delivery: 'Out for Delivery',
    delivered: 'Delivered',
    cancelled: 'Cancelled'
  }
  return labels[status] || 'Unknown'
}

export const calculateEstimatedDeliveryTime = (order: Order): string => {
  if (order.status === 'delivered') {
    return 'Delivered'
  }
  
  const now = new Date()
  const estimated = order.estimatedDeliveryTime
  const diffMinutes = Math.max(0, Math.floor((estimated.getTime() - now.getTime()) / (1000 * 60)))
  
  if (diffMinutes < 1) {
    return 'Any moment now'
  } else if (diffMinutes < 60) {
    return `${diffMinutes} min${diffMinutes > 1 ? 's' : ''}`
  } else {
    const hours = Math.floor(diffMinutes / 60)
    const minutes = diffMinutes % 60
    return `${hours}h ${minutes > 0 ? `${minutes}m` : ''}`
  }
}