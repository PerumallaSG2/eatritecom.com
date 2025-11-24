/**
 * Payment Routes for EatRite
 * Handles Stripe payments, subscriptions, and billing
 */

import express, { Router, Request, Response } from 'express'
import { StripeService } from '../services/stripeService.js'
import Stripe from 'stripe'

const router: Router = express.Router()

// ============================================================================
// PAYMENT INTENT ROUTES
// ============================================================================

/**
 * Create payment intent for one-time order
 * POST /api/payments/create-intent
 */
router.post('/create-intent', async (req: Request, res: Response) => {
  try {
    const { amount, currency = 'usd', customerId, orderId, description } = req.body

    if (!amount || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Valid amount is required',
      })
    }

    // Convert dollars to cents
    const amountInCents = StripeService.dollarsToCents(amount)

    const paymentIntent = await StripeService.createPaymentIntent({
      amount: amountInCents,
      currency,
      customerId,
      description: description || `EatRite Order Payment`,
      metadata: {
        order_id: orderId || '',
        platform: 'eatrite-web',
      },
    })

    res.json({
      success: true,
      data: {
        client_secret: paymentIntent.client_secret,
        payment_intent_id: paymentIntent.id,
      },
    })
  } catch (error) {
    console.error('Error creating payment intent:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to create payment intent',
      error: error instanceof Error ? error.message : 'Unknown error',
    })
  }
})

/**
 * Confirm payment intent
 * POST /api/payments/confirm-intent
 */
router.post('/confirm-intent', async (req: Request, res: Response) => {
  try {
    const { payment_intent_id, payment_method_id } = req.body

    if (!payment_intent_id) {
      return res.status(400).json({
        success: false,
        message: 'Payment intent ID is required',
      })
    }

    const paymentIntent = await StripeService.confirmPaymentIntent(
      payment_intent_id,
      payment_method_id
    )

    res.json({
      success: true,
      data: {
        status: paymentIntent.status,
        payment_intent_id: paymentIntent.id,
        amount: paymentIntent.amount,
        currency: paymentIntent.currency,
      },
    })
  } catch (error) {
    console.error('Error confirming payment intent:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to confirm payment',
      error: error instanceof Error ? error.message : 'Unknown error',
    })
  }
})

// ============================================================================
// CUSTOMER MANAGEMENT ROUTES
// ============================================================================

/**
 * Create or get Stripe customer
 * POST /api/payments/customer
 */
router.post('/customer', async (req: Request, res: Response) => {
  try {
    const { email, name, phone, address } = req.body

    if (!email || !name) {
      return res.status(400).json({
        success: false,
        message: 'Email and name are required',
      })
    }

    // Check if customer already exists
    let customer = await StripeService.getCustomerByEmail(email)

    if (!customer) {
      // Create new customer
      customer = await StripeService.createCustomer({
        email,
        name,
        phone,
        address,
      })
    }

    res.json({
      success: true,
      data: {
        customer_id: customer.id,
        email: customer.email,
        name: customer.name,
      },
    })
  } catch (error) {
    console.error('Error managing customer:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to create/retrieve customer',
      error: error instanceof Error ? error.message : 'Unknown error',
    })
  }
})

// ============================================================================
// SUBSCRIPTION ROUTES
// ============================================================================

/**
 * Create subscription for meal plan
 * POST /api/payments/subscription
 */
router.post('/subscription', async (req: Request, res: Response) => {
  try {
    const { customer_id, price_id, plan_name } = req.body

    if (!customer_id || !price_id) {
      return res.status(400).json({
        success: false,
        message: 'Customer ID and price ID are required',
      })
    }

    const subscription = await StripeService.createSubscription({
      customerId: customer_id,
      priceId: price_id,
      metadata: {
        plan_name: plan_name || '',
        source: 'eatrite-web',
      },
    })

    // Get the payment intent from the latest invoice
    const latestInvoice = subscription.latest_invoice as Stripe.Invoice
    const paymentIntent = latestInvoice?.payment_intent as Stripe.PaymentIntent

    res.json({
      success: true,
      data: {
        subscription_id: subscription.id,
        client_secret: paymentIntent?.client_secret,
        status: subscription.status,
      },
    })
  } catch (error) {
    console.error('Error creating subscription:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to create subscription',
      error: error instanceof Error ? error.message : 'Unknown error',
    })
  }
})

/**
 * Cancel subscription
 * POST /api/payments/subscription/:id/cancel
 */
router.post('/subscription/:id/cancel', async (req: Request, res: Response) => {
  try {
    const { id: subscriptionId } = req.params

    if (!subscriptionId) {
      return res.status(400).json({
        success: false,
        message: 'Subscription ID is required',
      })
    }

    const subscription = await StripeService.cancelSubscription(subscriptionId)

    res.json({
      success: true,
      data: {
        subscription_id: subscription.id,
        cancel_at_period_end: subscription.cancel_at_period_end,
        current_period_end: subscription.current_period_end,
      },
    })
  } catch (error) {
    console.error('Error canceling subscription:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to cancel subscription',
      error: error instanceof Error ? error.message : 'Unknown error',
    })
  }
})

/**
 * Update subscription
 * PUT /api/payments/subscription/:id
 */
router.put('/subscription/:id', async (req: Request, res: Response) => {
  try {
    const { id: subscriptionId } = req.params
    const { price_id } = req.body

    if (!subscriptionId) {
      return res.status(400).json({
        success: false,
        message: 'Subscription ID is required',
      })
    }

    if (!price_id) {
      return res.status(400).json({
        success: false,
        message: 'Price ID is required',
      })
    }

    const subscription = await StripeService.updateSubscription(
      subscriptionId,
      price_id
    )

    res.json({
      success: true,
      data: {
        subscription_id: subscription.id,
        status: subscription.status,
        current_period_end: subscription.current_period_end,
      },
    })
  } catch (error) {
    console.error('Error updating subscription:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to update subscription',
      error: error instanceof Error ? error.message : 'Unknown error',
    })
  }
})

// ============================================================================
// WEBHOOK ROUTES
// ============================================================================

/**
 * Handle Stripe webhooks
 * POST /api/payments/webhook
 */
router.post(
  '/webhook',
  express.raw({ type: 'application/json' }),
  async (req: Request, res: Response) => {
    try {
      const signature = req.headers['stripe-signature'] as string

      if (!signature) {
        return res.status(400).json({
          success: false,
          message: 'Missing Stripe signature',
        })
      }

      const event = await StripeService.handleWebhook(req.body, signature)

      // Handle different event types
      switch (event.type) {
        case 'payment_intent.succeeded':
          const paymentIntent = event.data.object as Stripe.PaymentIntent
          console.log('💰 Payment succeeded:', paymentIntent.id)
          
          // TODO: Update order status in database
          // await updateOrderStatus(paymentIntent.metadata.order_id, 'paid')
          
          break

        case 'payment_intent.payment_failed':
          const failedPayment = event.data.object as Stripe.PaymentIntent
          console.log('❌ Payment failed:', failedPayment.id)
          
          // TODO: Handle failed payment
          // await handleFailedPayment(failedPayment.metadata.order_id)
          
          break

        case 'invoice.payment_succeeded':
          const invoice = event.data.object as Stripe.Invoice
          console.log('📄 Invoice payment succeeded:', invoice.id)
          
          // TODO: Handle successful subscription payment
          // await handleSubscriptionPayment(invoice.subscription)
          
          break

        case 'customer.subscription.deleted':
          const subscription = event.data.object as Stripe.Subscription
          console.log('🚫 Subscription canceled:', subscription.id)
          
          // TODO: Handle subscription cancellation
          // await handleSubscriptionCancellation(subscription.id)
          
          break

        default:
          console.log('📩 Unhandled event type:', event.type)
      }

      res.json({ received: true })
    } catch (error) {
      console.error('Webhook error:', error)
      res.status(400).json({
        success: false,
        message: 'Webhook validation failed',
        error: error instanceof Error ? error.message : 'Unknown error',
      })
    }
  }
)

// ============================================================================
// PRICING ROUTES
// ============================================================================

/**
 * Get pricing information
 * GET /api/payments/pricing
 */
router.get('/pricing', async (req: Request, res: Response) => {
  try {
    // For now, return static pricing
    // TODO: Fetch from Stripe prices API when products are set up
    
    const pricing = [
      {
        id: 'basic-plan',
        name: 'Basic Plan',
        description: '4 meals per week',
        price: 59.99,
        price_cents: 5999,
        interval: 'week',
        features: ['4 meals per week', 'Free delivery', 'Cancel anytime'],
      },
      {
        id: 'premium-plan',
        name: 'Premium Plan',
        description: '8 meals per week',
        price: 99.99,
        price_cents: 9999,
        interval: 'week',
        features: ['8 meals per week', 'Free delivery', 'Priority support', 'Cancel anytime'],
      },
      {
        id: 'family-plan',
        name: 'Family Plan',
        description: '12 meals per week',
        price: 139.99,
        price_cents: 13999,
        interval: 'week',
        features: ['12 meals per week', 'Free delivery', 'Priority support', 'Family portions', 'Cancel anytime'],
      },
    ]

    res.json({
      success: true,
      data: pricing,
    })
  } catch (error) {
    console.error('Error fetching pricing:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch pricing',
    })
  }
})

// ============================================================================
// PAYMENT METHODS ROUTES
// ============================================================================

/**
 * Save payment method for customer
 * POST /api/payments/payment-method
 */
router.post('/payment-method', async (req: Request, res: Response) => {
  try {
    const { customer_id, payment_method_id } = req.body

    if (!customer_id || !payment_method_id) {
      return res.status(400).json({
        success: false,
        message: 'Customer ID and payment method ID are required',
      })
    }

    // Note: In a real implementation, you'd attach the payment method to the customer
    // This is a simplified response
    
    res.json({
      success: true,
      data: {
        customer_id,
        payment_method_id,
        message: 'Payment method saved successfully',
      },
    })
  } catch (error) {
    console.error('Error saving payment method:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to save payment method',
      error: error instanceof Error ? error.message : 'Unknown error',
    })
  }
})

export default router