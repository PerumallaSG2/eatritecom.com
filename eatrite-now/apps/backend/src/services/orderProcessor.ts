/**
 * Order Processing Service
 * Handles complete order lifecycle from cart to delivery
 */

import { StripeService } from './stripeService.js'

// ============================================================================
// TYPES AND INTERFACES
// ============================================================================

export interface OrderItem {
  meal_id: string
  name: string
  price: number
  quantity: number
  customizations?: Record<string, any>
  dietary_notes?: string
}

export interface CustomerInfo {
  firstName: string
  lastName: string
  email: string
  phone: string
}

export interface DeliveryAddress {
  street: string
  apartment?: string
  city: string
  state: string
  zipCode: string
  deliveryInstructions?: string
}

export interface OrderData {
  customer: CustomerInfo
  delivery_address: DeliveryAddress
  items: OrderItem[]
  subtotal: number
  tax: number
  delivery_fee: number
  tip?: number
  total: number
  delivery_date?: string
  delivery_time_slot?: string
  special_instructions?: string
}

export interface ProcessedOrder {
  id: string
  order_number: string
  status: OrderStatus
  customer: CustomerInfo
  delivery_address: DeliveryAddress
  items: OrderItem[]
  pricing: {
    subtotal: number
    tax: number
    delivery_fee: number
    tip: number
    total: number
  }
  payment: {
    status: PaymentStatus
    payment_intent_id?: string
    payment_method?: string
  }
  delivery: {
    estimated_date: Date
    estimated_time_slot: string
    tracking_number?: string
    status: DeliveryStatus
  }
  timestamps: {
    created_at: Date
    confirmed_at?: Date
    prepared_at?: Date
    dispatched_at?: Date
    delivered_at?: Date
  }
}

export enum OrderStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  PREPARING = 'preparing',
  PREPARED = 'prepared',
  DISPATCHED = 'dispatched',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
}

export enum PaymentStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  SUCCEEDED = 'succeeded',
  FAILED = 'failed',
  REFUNDED = 'refunded',
}

export enum DeliveryStatus {
  SCHEDULED = 'scheduled',
  PREPARING = 'preparing',
  ON_ROUTE = 'on_route',
  DELIVERED = 'delivered',
  FAILED = 'failed',
}

// ============================================================================
// ORDER PROCESSING CLASS
// ============================================================================

export class OrderProcessor {
  
  /**
   * Process a new order through the complete pipeline
   */
  static async processOrder(orderData: OrderData): Promise<ProcessedOrder> {
    try {
      // 1. Validate order data
      const validation = this.validateOrderData(orderData)
      if (!validation.isValid) {
        throw new Error(`Order validation failed: ${validation.errors.join(', ')}`)
      }

      // 2. Calculate final pricing
      const pricing = this.calculatePricing(orderData)

      // 3. Create order record
      const orderId = this.generateOrderId()
      const orderNumber = this.generateOrderNumber()

      // 4. Check meal availability
      await this.checkMealAvailability(orderData.items)

      // 5. Reserve inventory
      await this.reserveInventory(orderData.items, orderId)

      // 6. Create payment intent
      const paymentIntent = await StripeService.createPaymentIntent({
        amount: StripeService.dollarsToCents(pricing.total),
        currency: 'usd',
        description: `EatRite Order #${orderNumber}`,
        metadata: {
          order_id: orderId,
          order_number: orderNumber,
          customer_email: orderData.customer.email,
        },
      })

      // 7. Calculate delivery scheduling
      const deliverySchedule = this.calculateDeliverySchedule(
        orderData.delivery_date,
        orderData.delivery_time_slot
      )

      // 8. Create complete order object
      const processedOrder: ProcessedOrder = {
        id: orderId,
        order_number: orderNumber,
        status: OrderStatus.PENDING,
        customer: orderData.customer,
        delivery_address: orderData.delivery_address,
        items: orderData.items,
        pricing,
        payment: {
          status: PaymentStatus.PENDING,
          payment_intent_id: paymentIntent.id,
        },
        delivery: {
          estimated_date: deliverySchedule.date,
          estimated_time_slot: deliverySchedule.timeSlot,
          status: DeliveryStatus.SCHEDULED,
        },
        timestamps: {
          created_at: new Date(),
        },
      }

      // 9. Save to database (or in-memory store for demo)
      await this.saveOrder(processedOrder)

      // 10. Send confirmation notifications
      await this.sendOrderConfirmation(processedOrder)

      console.log(`✅ Order processed successfully: ${orderNumber}`)
      
      return processedOrder

    } catch (error) {
      console.error('❌ Order processing failed:', error)
      throw error
    }
  }

  /**
   * Confirm order after successful payment
   */
  static async confirmOrder(orderId: string, paymentIntentId: string): Promise<ProcessedOrder> {
    try {
      // 1. Retrieve order
      const order = await this.getOrderById(orderId)
      if (!order) {
        throw new Error('Order not found')
      }

      // 2. Update order status
      order.status = OrderStatus.CONFIRMED
      order.payment.status = PaymentStatus.SUCCEEDED
      order.payment.payment_intent_id = paymentIntentId
      order.timestamps.confirmed_at = new Date()

      // 3. Confirm inventory reservation
      await this.confirmInventoryReservation(orderId)

      // 4. Schedule meal preparation
      await this.scheduleMealPreparation(order)

      // 5. Update delivery tracking
      order.delivery.tracking_number = this.generateTrackingNumber()

      // 6. Save updated order
      await this.saveOrder(order)

      // 7. Send confirmation notifications
      await this.sendPaymentConfirmation(order)

      console.log(`🎉 Order confirmed: ${order.order_number}`)
      
      return order

    } catch (error) {
      console.error('❌ Order confirmation failed:', error)
      throw error
    }
  }

  /**
   * Update order status through the fulfillment pipeline
   */
  static async updateOrderStatus(orderId: string, newStatus: OrderStatus): Promise<ProcessedOrder> {
    try {
      const order = await this.getOrderById(orderId)
      if (!order) {
        throw new Error('Order not found')
      }

      const oldStatus = order.status
      order.status = newStatus

      // Update timestamps based on status
      switch (newStatus) {
        case OrderStatus.PREPARING:
          order.timestamps.prepared_at = new Date()
          order.delivery.status = DeliveryStatus.PREPARING
          break
        case OrderStatus.DISPATCHED:
          order.timestamps.dispatched_at = new Date()
          order.delivery.status = DeliveryStatus.ON_ROUTE
          break
        case OrderStatus.DELIVERED:
          order.timestamps.delivered_at = new Date()
          order.delivery.status = DeliveryStatus.DELIVERED
          break
      }

      await this.saveOrder(order)

      // Send status update notifications
      await this.sendStatusUpdateNotification(order, oldStatus, newStatus)

      console.log(`📋 Order ${order.order_number} status updated: ${oldStatus} → ${newStatus}`)
      
      return order

    } catch (error) {
      console.error('❌ Status update failed:', error)
      throw error
    }
  }

  // ============================================================================
  // VALIDATION METHODS
  // ============================================================================

  private static validateOrderData(orderData: OrderData): { isValid: boolean; errors: string[] } {
    const errors: string[] = []

    // Validate customer info
    if (!orderData.customer.firstName) errors.push('Customer first name is required')
    if (!orderData.customer.lastName) errors.push('Customer last name is required')
    if (!orderData.customer.email) errors.push('Customer email is required')
    if (!orderData.customer.phone) errors.push('Customer phone is required')

    // Validate delivery address
    if (!orderData.delivery_address.street) errors.push('Delivery street is required')
    if (!orderData.delivery_address.city) errors.push('Delivery city is required')
    if (!orderData.delivery_address.state) errors.push('Delivery state is required')
    if (!orderData.delivery_address.zipCode) errors.push('Delivery zip code is required')

    // Validate items
    if (!orderData.items || orderData.items.length === 0) {
      errors.push('Order must contain at least one item')
    } else {
      orderData.items.forEach((item, index) => {
        if (!item.meal_id) errors.push(`Item ${index + 1}: meal_id is required`)
        if (!item.name) errors.push(`Item ${index + 1}: name is required`)
        if (!item.price || item.price <= 0) errors.push(`Item ${index + 1}: valid price is required`)
        if (!item.quantity || item.quantity <= 0) errors.push(`Item ${index + 1}: valid quantity is required`)
      })
    }

    // Validate pricing
    if (!orderData.total || orderData.total <= 0) errors.push('Valid total amount is required')

    return {
      isValid: errors.length === 0,
      errors,
    }
  }

  // ============================================================================
  // PRICING METHODS
  // ============================================================================

  private static calculatePricing(orderData: OrderData): ProcessedOrder['pricing'] {
    const subtotal = orderData.items.reduce(
      (sum, item) => sum + (item.price * item.quantity), 
      0
    )
    
    // Calculate tax (8.5% example)
    const tax = subtotal * 0.085
    
    // Calculate delivery fee (free over $50, otherwise $5.99)
    const delivery_fee = subtotal >= 50 ? 0 : 5.99
    
    const tip = orderData.tip || 0
    const total = subtotal + tax + delivery_fee + tip

    return {
      subtotal: Math.round(subtotal * 100) / 100,
      tax: Math.round(tax * 100) / 100,
      delivery_fee,
      tip,
      total: Math.round(total * 100) / 100,
    }
  }

  // ============================================================================
  // INVENTORY METHODS
  // ============================================================================

  private static async checkMealAvailability(items: OrderItem[]): Promise<void> {
    // In a real implementation, check against inventory database
    // For demo, assume all meals are available
    console.log(`✅ Checked availability for ${items.length} items`)
  }

  private static async reserveInventory(items: OrderItem[], orderId: string): Promise<void> {
    // In a real implementation, reserve inventory in database
    console.log(`🔒 Reserved inventory for order ${orderId}`)
  }

  private static async confirmInventoryReservation(orderId: string): Promise<void> {
    // In a real implementation, confirm the reservation
    console.log(`✅ Confirmed inventory reservation for order ${orderId}`)
  }

  // ============================================================================
  // SCHEDULING METHODS
  // ============================================================================

  private static calculateDeliverySchedule(
    requestedDate?: string,
    requestedTimeSlot?: string
  ): { date: Date; timeSlot: string } {
    let deliveryDate = new Date()
    
    // If specific date requested, use it (validate it's not in the past)
    if (requestedDate) {
      const requested = new Date(requestedDate)
      if (requested > deliveryDate) {
        deliveryDate = requested
      }
    } else {
      // Default to tomorrow for new orders
      deliveryDate.setDate(deliveryDate.getDate() + 1)
    }

    // Default time slots
    const timeSlots = [
      '8:00 AM - 12:00 PM',
      '12:00 PM - 4:00 PM',
      '4:00 PM - 8:00 PM',
    ]

    const timeSlot = requestedTimeSlot || timeSlots[0]

    return { date: deliveryDate, timeSlot: timeSlot! }
  }

  private static async scheduleMealPreparation(order: ProcessedOrder): Promise<void> {
    // In a real implementation, integrate with kitchen management system
    console.log(`👨‍🍳 Scheduled meal preparation for order ${order.order_number}`)
  }

  // ============================================================================
  // ID GENERATION METHODS
  // ============================================================================

  private static generateOrderId(): string {
    return `ord_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  private static generateOrderNumber(): string {
    const date = new Date()
    const year = date.getFullYear().toString().substr(-2)
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0')
    
    return `EAT${year}${month}${day}${random}`
  }

  private static generateTrackingNumber(): string {
    return `TRK${Date.now().toString().substr(-8)}`
  }

  // ============================================================================
  // DATABASE METHODS (Mock for demo)
  // ============================================================================

  private static orders: Map<string, ProcessedOrder> = new Map()

  private static async saveOrder(order: ProcessedOrder): Promise<void> {
    // In production, save to SQL Server database
    this.orders.set(order.id, order)
    console.log(`💾 Saved order ${order.order_number} to database`)
  }

  private static async getOrderById(orderId: string): Promise<ProcessedOrder | null> {
    // In production, fetch from SQL Server database
    return this.orders.get(orderId) || null
  }

  static async getOrderByNumber(orderNumber: string): Promise<ProcessedOrder | null> {
    // In production, fetch from SQL Server database
    for (const order of this.orders.values()) {
      if (order.order_number === orderNumber) {
        return order
      }
    }
    return null
  }

  static async getOrdersByCustomerEmail(email: string): Promise<ProcessedOrder[]> {
    // In production, fetch from SQL Server database
    const customerOrders: ProcessedOrder[] = []
    for (const order of this.orders.values()) {
      if (order.customer.email === email) {
        customerOrders.push(order)
      }
    }
    return customerOrders.sort((a, b) => 
      b.timestamps.created_at.getTime() - a.timestamps.created_at.getTime()
    )
  }

  // ============================================================================
  // NOTIFICATION METHODS
  // ============================================================================

  private static async sendOrderConfirmation(order: ProcessedOrder): Promise<void> {
    console.log(`📧 Sent order confirmation to ${order.customer.email}`)
    // In production, integrate with EmailService
  }

  private static async sendPaymentConfirmation(order: ProcessedOrder): Promise<void> {
    console.log(`💳 Sent payment confirmation to ${order.customer.email}`)
    // In production, integrate with EmailService
  }

  private static async sendStatusUpdateNotification(
    order: ProcessedOrder,
    oldStatus: OrderStatus,
    newStatus: OrderStatus
  ): Promise<void> {
    console.log(`🔔 Sent status update notification: ${oldStatus} → ${newStatus}`)
    // In production, integrate with EmailService and SMS Service
  }
}

export default OrderProcessor