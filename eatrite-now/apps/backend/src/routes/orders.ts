import express, { Router } from 'express'
import { Request, Response } from 'express'
import { db, getPool } from '../services/database.js'
import { FallbackDataService } from '../services/fallbackData.js'
import { OrderProcessor, OrderData as ProcessorOrderData } from '../services/orderProcessor.js'
import sql from 'mssql'

const router: Router = express.Router()

// In-memory storage for demo mode when database is unavailable
const demoOrders: any[] = []

interface OrderItem {
  id: string
  name: string
  price: number
  quantity: number
  image_url?: string
  description?: string
}

interface OrderData {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  zipCode: string
  items: OrderItem[]
  subtotal: number
  deliveryFee: number
  tax: number
  totalAmount: number
  cardNumber?: string // We won't store this in production
  expiryDate?: string // We won't store this in production
  cvv?: string // We won't store this in production
  cardName?: string
}

// Create a new order using enhanced OrderProcessor
router.post('/process', async (req: Request, res: Response) => {
  try {
    // Transform request body to OrderProcessor format
    const orderData: ProcessorOrderData = {
      customer: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone,
      },
      delivery_address: {
        street: req.body.address,
        apartment: req.body.apartment,
        city: req.body.city,
        state: req.body.state,
        zipCode: req.body.zipCode,
        deliveryInstructions: req.body.deliveryInstructions,
      },
      items: req.body.items.map((item: any) => ({
        meal_id: item.id || item.meal_id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        customizations: item.customizations,
        dietary_notes: item.dietary_notes,
      })),
      subtotal: req.body.subtotal || 0,
      tax: req.body.tax || 0,
      delivery_fee: req.body.delivery_fee || 0,
      tip: req.body.tip || 0,
      total: req.body.totalAmount || req.body.total,
      delivery_date: req.body.delivery_date,
      delivery_time_slot: req.body.delivery_time_slot,
      special_instructions: req.body.special_instructions,
    }

    // Process the order using OrderProcessor
    const processedOrder = await OrderProcessor.processOrder(orderData)

    res.status(201).json({
      success: true,
      order: {
        id: processedOrder.id,
        order_number: processedOrder.order_number,
        status: processedOrder.status,
        total: processedOrder.pricing.total,
        estimated_delivery: processedOrder.delivery.estimated_date,
        payment_intent_id: processedOrder.payment.payment_intent_id,
      },
      message: 'Order processed successfully',
    })

  } catch (error) {
    console.error('Error processing order:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to process order',
      error: error instanceof Error ? error.message : 'Unknown error',
    })
  }
})

// Legacy create order route (for backward compatibility)
router.post('/', async (req: Request, res: Response) => {
  try {
    const orderData: OrderData = req.body

    // Validate required fields
    const requiredFields = [
      'firstName',
      'lastName',
      'email',
      'phone',
      'address',
      'city',
      'state',
      'zipCode',
      'items',
      'totalAmount',
    ]
    const missingFields = requiredFields.filter(
      field => !orderData[field as keyof OrderData]
    )

    if (missingFields.length > 0) {
      return res.status(400).json({
        error: 'Missing required fields',
        missingFields,
      })
    }

    if (!orderData.items || orderData.items.length === 0) {
      return res.status(400).json({
        error: 'Order must contain at least one item',
      })
    }

    try {
      const pool = getPool()

      // Start transaction
      const transaction = new sql.Transaction(pool)
      await transaction.begin()

      try {
        // Insert order
        const orderResult = await transaction
          .request()
          .input('userEmail', sql.NVarChar, orderData.email)
          .input('firstName', sql.NVarChar, orderData.firstName)
          .input('lastName', sql.NVarChar, orderData.lastName)
          .input('phone', sql.NVarChar, orderData.phone)
          .input('address', sql.NVarChar, orderData.address)
          .input('city', sql.NVarChar, orderData.city)
          .input('state', sql.NVarChar, orderData.state)
          .input('zipCode', sql.NVarChar, orderData.zipCode)
          .input('totalAmount', sql.Decimal(10, 2), orderData.totalAmount)
          .input('subtotal', sql.Decimal(10, 2), orderData.subtotal)
          .input('deliveryFee', sql.Decimal(10, 2), orderData.deliveryFee)
          .input('tax', sql.Decimal(10, 2), orderData.tax).query(`
          INSERT INTO orders (
            user_email, first_name, last_name, phone, 
            delivery_address, delivery_city, delivery_state, delivery_zip,
            total_amount, subtotal, delivery_fee, tax, status
          ) 
          OUTPUT INSERTED.id
          VALUES (
            @userEmail, @firstName, @lastName, @phone,
            @address, @city, @state, @zipCode,
            @totalAmount, @subtotal, @deliveryFee, @tax, 'confirmed'
          )
        `)

        const orderId = orderResult.recordset[0].id

        // Insert order items
        for (const item of orderData.items) {
          await transaction
            .request()
            .input('orderId', sql.UniqueIdentifier, orderId)
            .input('mealId', sql.UniqueIdentifier, item.id)
            .input('quantity', sql.Int, item.quantity)
            .input('priceAtTime', sql.Decimal(10, 2), item.price).query(`
            INSERT INTO order_meals (order_id, meal_id, quantity, price_at_time)
            VALUES (@orderId, @mealId, @quantity, @priceAtTime)
          `)
        }

        await transaction.commit()

        // Generate order confirmation number
        const orderNumber = `EAT-${orderId.toString().substring(0, 8).toUpperCase()}`

        return res.status(201).json({
          success: true,
          order: {
            id: orderId,
            orderNumber,
            email: orderData.email,
            totalAmount: orderData.totalAmount,
            status: 'confirmed',
            estimatedDelivery: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)
              .toISOString()
              .split('T')[0], // 2 days from now
          },
          message: 'Order created successfully',
        })
      } catch (error) {
        await transaction.rollback()
        throw error
      }
    } catch (dbError) {
      // Database unavailable - provide demo mode response
      console.warn('Database unavailable, using demo mode:', dbError)

      const mockOrderId = `demo-${Date.now()}`
      const orderNumber = `EAT-${mockOrderId.substring(0, 8).toUpperCase()}`

      // Store in demo storage
      const demoOrder = {
        id: mockOrderId,
        orderNumber,
        customerName: `${orderData.firstName} ${orderData.lastName}`,
        email: orderData.email,
        phone: orderData.phone,
        address: `${orderData.address}, ${orderData.city}, ${orderData.state} ${orderData.zipCode}`,
        items: orderData.items,
        totalAmount: orderData.totalAmount,
        status: 'confirmed',
        createdAt: new Date(),
        estimatedDelivery: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split('T')[0],
      }

      demoOrders.push(demoOrder)

      // Log the order data for demo purposes
      console.log('Demo Order Created:', {
        orderNumber,
        customerName: demoOrder.customerName,
        email: orderData.email,
        items: orderData.items.map(item => `${item.name} (${item.quantity}x)`),
        total: orderData.totalAmount,
        address: demoOrder.address,
      })

      return res.status(201).json({
        success: true,
        order: {
          id: mockOrderId,
          orderNumber,
          email: orderData.email,
          totalAmount: orderData.totalAmount,
          status: 'confirmed',
          estimatedDelivery: demoOrder.estimatedDelivery,
        },
        message: 'Order created successfully (Demo Mode)',
        demo: true,
      })
    }
  } catch (error) {
    console.error('Error creating order:', error)
    return res.status(500).json({
      error: 'Failed to create order',
      message: error instanceof Error ? error.message : 'Unknown error',
    })
  }
})

// Get all orders (for testing/admin)
router.get('/', async (req: Request, res: Response) => {
  try {
    const { email } = req.query

    try {
      const pool = getPool()

      let query = `
      SELECT 
        o.id, o.user_email, o.first_name, o.last_name, 
        o.total_amount, o.status, o.created_at,
        om.meal_id, om.quantity, om.price_at_time,
        m.name as meal_name, m.image_url as meal_image
      FROM orders o
      LEFT JOIN order_meals om ON o.id = om.order_id
      LEFT JOIN meals m ON om.meal_id = m.id
    `

      const request = pool.request()

      if (email) {
        query += ' WHERE o.user_email = @email'
        request.input('email', sql.NVarChar, email as string)
      }

      query += ' ORDER BY o.created_at DESC'

      const result = await request.query(query)

      // Group orders by order ID
      const ordersMap = new Map()

      result.recordset.forEach((row: any) => {
        if (!ordersMap.has(row.id)) {
          ordersMap.set(row.id, {
            id: row.id,
            userEmail: row.user_email,
            firstName: row.first_name,
            lastName: row.last_name,
            totalAmount: row.total_amount,
            status: row.status,
            createdAt: row.created_at,
            items: [],
          })
        }

        if (row.meal_id) {
          ordersMap.get(row.id).items.push({
            mealId: row.meal_id,
            mealName: row.meal_name,
            mealImage: row.meal_image,
            quantity: row.quantity,
            priceAtTime: row.price_at_time,
          })
        }
      })

      const orders = Array.from(ordersMap.values())

      return res.json({
        success: true,
        orders,
        count: orders.length,
      })
    } catch (dbError) {
      console.warn('Database unavailable, returning demo orders:', dbError)
      const filteredOrders = email
        ? demoOrders.filter(order => order.email === email)
        : demoOrders
      return res.json({
        success: true,
        orders: filteredOrders,
        count: filteredOrders.length,
        message: 'Database unavailable - demo mode',
        demo: true,
      })
    }
  } catch (error) {
    console.error('Error fetching orders:', error)
    return res.status(500).json({
      error: 'Failed to fetch orders',
      message: error instanceof Error ? error.message : 'Unknown error',
    })
  }
})

// Get specific order by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    try {
      const pool = getPool()

      const result = await pool
        .request()
        .input('orderId', sql.UniqueIdentifier, id).query(`
        SELECT 
          o.*, 
          om.meal_id, om.quantity, om.price_at_time,
          m.name as meal_name, m.image_url as meal_image
        FROM orders o
        LEFT JOIN order_meals om ON o.id = om.order_id
        LEFT JOIN meals m ON om.meal_id = m.id
        WHERE o.id = @orderId
      `)

      if (result.recordset.length === 0) {
        return res.status(404).json({
          error: 'Order not found',
        })
      }

      const orderData = result.recordset[0]
      const order = {
        id: orderData.id,
        userEmail: orderData.user_email,
        firstName: orderData.first_name,
        lastName: orderData.last_name,
        phone: orderData.phone,
        deliveryAddress: orderData.delivery_address,
        deliveryCity: orderData.delivery_city,
        deliveryState: orderData.delivery_state,
        deliveryZip: orderData.delivery_zip,
        totalAmount: orderData.total_amount,
        subtotal: orderData.subtotal,
        deliveryFee: orderData.delivery_fee,
        tax: orderData.tax,
        status: orderData.status,
        createdAt: orderData.created_at,
        items: result.recordset
          .map((row: any) => ({
            mealId: row.meal_id,
            mealName: row.meal_name,
            mealImage: row.meal_image,
            quantity: row.quantity,
            priceAtTime: row.price_at_time,
          }))
          .filter((item: any) => item.mealId),
      }

      return res.json({
        success: true,
        order,
      })
    } catch (dbError) {
      console.warn('Database unavailable for order lookup:', dbError)
      return res.status(404).json({
        error: 'Order not found',
        message: 'Database unavailable - demo mode',
        demo: true,
      })
    }
  } catch (error) {
    console.error('Error fetching order:', error)
    return res.status(500).json({
      error: 'Failed to fetch order',
      message: error instanceof Error ? error.message : 'Unknown error',
    })
  }
})

// Confirm order after payment success
router.post('/confirm/:orderId', async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params
    const { payment_intent_id } = req.body

    if (!orderId || !payment_intent_id) {
      return res.status(400).json({
        success: false,
        message: 'Order ID and payment intent ID are required',
      })
    }

    const confirmedOrder = await OrderProcessor.confirmOrder(orderId, payment_intent_id)

    res.json({
      success: true,
      order: {
        id: confirmedOrder.id,
        order_number: confirmedOrder.order_number,
        status: confirmedOrder.status,
        payment_status: confirmedOrder.payment.status,
        tracking_number: confirmedOrder.delivery.tracking_number,
        estimated_delivery: confirmedOrder.delivery.estimated_date,
      },
      message: 'Order confirmed successfully',
    })

  } catch (error) {
    console.error('Error confirming order:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to confirm order',
      error: error instanceof Error ? error.message : 'Unknown error',
    })
  }
})

// Update order status
router.patch('/:orderId/status', async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params
    const { status } = req.body

    if (!orderId || !status) {
      return res.status(400).json({
        success: false,
        message: 'Order ID and status are required',
      })
    }

    const updatedOrder = await OrderProcessor.updateOrderStatus(orderId, status)

    res.json({
      success: true,
      order: {
        id: updatedOrder.id,
        order_number: updatedOrder.order_number,
        status: updatedOrder.status,
        delivery_status: updatedOrder.delivery.status,
        updated_at: new Date(),
      },
      message: 'Order status updated successfully',
    })

  } catch (error) {
    console.error('Error updating order status:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to update order status',
      error: error instanceof Error ? error.message : 'Unknown error',
    })
  }
})

// Track order by order number
router.get('/track/:orderNumber', async (req: Request, res: Response) => {
  try {
    const { orderNumber } = req.params

    if (!orderNumber) {
      return res.status(400).json({
        success: false,
        message: 'Order number is required',
      })
    }

    const order = await OrderProcessor.getOrderByNumber(orderNumber)

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      })
    }

    res.json({
      success: true,
      tracking: {
        order_number: order.order_number,
        status: order.status,
        delivery_status: order.delivery.status,
        estimated_delivery: order.delivery.estimated_date,
        estimated_time_slot: order.delivery.estimated_time_slot,
        tracking_number: order.delivery.tracking_number,
        timeline: {
          ordered: order.timestamps.created_at,
          confirmed: order.timestamps.confirmed_at,
          prepared: order.timestamps.prepared_at,
          dispatched: order.timestamps.dispatched_at,
          delivered: order.timestamps.delivered_at,
        },
        delivery_address: {
          street: order.delivery_address.street,
          city: order.delivery_address.city,
          state: order.delivery_address.state,
          zipCode: order.delivery_address.zipCode,
        },
        items: order.items.map(item => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price,
        })),
        total: order.pricing.total,
      },
    })

  } catch (error) {
    console.error('Error tracking order:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to track order',
      error: error instanceof Error ? error.message : 'Unknown error',
    })
  }
})

// Get customer orders by email
router.get('/customer/:email', async (req: Request, res: Response) => {
  try {
    const { email } = req.params

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required',
      })
    }

    const orders = await OrderProcessor.getOrdersByCustomerEmail(email)

    res.json({
      success: true,
      orders: orders.map(order => ({
        id: order.id,
        order_number: order.order_number,
        status: order.status,
        total: order.pricing.total,
        created_at: order.timestamps.created_at,
        estimated_delivery: order.delivery.estimated_date,
        items_count: order.items.length,
      })),
    })

  } catch (error) {
    console.error('Error fetching customer orders:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch orders',
      error: error instanceof Error ? error.message : 'Unknown error',
    })
  }
})

export default router
