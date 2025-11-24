/**
 * Stripe Payment Service
 * Handles all payment processing for EatRite
 */

import Stripe from 'stripe'

// ============================================================================
// STRIPE CONFIGURATION
// ============================================================================

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16',
})

export interface PaymentIntentData {
  amount: number // in cents
  currency: string
  customerId?: string
  metadata?: Record<string, string>
  description?: string
}

export interface SubscriptionData {
  customerId: string
  priceId: string
  metadata?: Record<string, string>
}

export interface CustomerData {
  email: string
  name: string
  phone?: string
  address?: {
    line1: string
    line2?: string
    city: string
    state: string
    postal_code: string
    country: string
  }
}

// ============================================================================
// CUSTOMER MANAGEMENT
// ============================================================================

/**
 * Create a new Stripe customer
 */
export async function createCustomer(customerData: CustomerData): Promise<Stripe.Customer> {
  try {
    const customer = await stripe.customers.create({
      email: customerData.email,
      name: customerData.name,
      phone: customerData.phone,
      address: customerData.address,
      metadata: {
        source: 'eatrite-app',
        created_at: new Date().toISOString(),
      },
    })

    return customer
  } catch (error) {
    console.error('Error creating Stripe customer:', error)
    throw error
  }
}

/**
 * Get customer by email
 */
export async function getCustomerByEmail(email: string): Promise<Stripe.Customer | null> {
  try {
    const customers = await stripe.customers.list({
      email,
      limit: 1,
    })

    return customers.data[0] || null
  } catch (error) {
    console.error('Error fetching Stripe customer:', error)
    throw error
  }
}

// ============================================================================
// PAYMENT INTENTS
// ============================================================================

/**
 * Create payment intent for one-time purchases
 */
export async function createPaymentIntent(data: PaymentIntentData): Promise<Stripe.PaymentIntent> {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: data.amount,
      currency: data.currency,
      customer: data.customerId,
      description: data.description,
      metadata: {
        ...data.metadata,
        created_via: 'eatrite-api',
      },
      automatic_payment_methods: {
        enabled: true,
      },
    })

    return paymentIntent
  } catch (error) {
    console.error('Error creating payment intent:', error)
    throw error
  }
}

/**
 * Confirm payment intent
 */
export async function confirmPaymentIntent(
  paymentIntentId: string,
  paymentMethodId?: string
): Promise<Stripe.PaymentIntent> {
  try {
    const confirmData: any = {}
    
    if (paymentMethodId) {
      confirmData.payment_method = paymentMethodId
    }

    const paymentIntent = await stripe.paymentIntents.confirm(
      paymentIntentId,
      confirmData
    )

    return paymentIntent
  } catch (error) {
    console.error('Error confirming payment intent:', error)
    throw error
  }
}

// ============================================================================
// SUBSCRIPTION MANAGEMENT
// ============================================================================

/**
 * Create subscription for meal plans
 */
export async function createSubscription(data: SubscriptionData): Promise<Stripe.Subscription> {
  try {
    const subscription = await stripe.subscriptions.create({
      customer: data.customerId,
      items: [{ price: data.priceId }],
      payment_behavior: 'default_incomplete',
      payment_settings: { save_default_payment_method: 'on_subscription' },
      expand: ['latest_invoice.payment_intent'],
      metadata: {
        ...data.metadata,
        created_via: 'eatrite-api',
      },
    })

    return subscription
  } catch (error) {
    console.error('Error creating subscription:', error)
    throw error
  }
}

/**
 * Cancel subscription
 */
export async function cancelSubscription(subscriptionId: string): Promise<Stripe.Subscription> {
  try {
    const subscription = await stripe.subscriptions.update(subscriptionId, {
      cancel_at_period_end: true,
    })

    return subscription
  } catch (error) {
    console.error('Error canceling subscription:', error)
    throw error
  }
}

/**
 * Update subscription
 */
export async function updateSubscription(
  subscriptionId: string,
  priceId: string
): Promise<Stripe.Subscription> {
  try {
    const subscription = await stripe.subscriptions.retrieve(subscriptionId)
    
    if (!subscription.items.data[0]) {
      throw new Error('No subscription items found')
    }
    
    const updatedSubscription = await stripe.subscriptions.update(subscriptionId, {
      items: [
        {
          id: subscription.items.data[0].id,
          price: priceId,
        },
      ],
    })

    return updatedSubscription
  } catch (error) {
    console.error('Error updating subscription:', error)
    throw error
  }
}

// ============================================================================
// PRICE MANAGEMENT
// ============================================================================

/**
 * Create prices for meal plans
 */
export async function createPrice(
  productId: string,
  unitAmount: number,
  currency: string = 'usd',
  recurring?: { interval: 'week' | 'month'; interval_count?: number }
): Promise<Stripe.Price> {
  try {
    const priceData: any = {
      product: productId,
      unit_amount: unitAmount,
      currency,
    }

    if (recurring) {
      priceData.recurring = recurring
    }

    const price = await stripe.prices.create(priceData)
    return price
  } catch (error) {
    console.error('Error creating price:', error)
    throw error
  }
}

// ============================================================================
// PRODUCT MANAGEMENT
// ============================================================================

/**
 * Create products for meal plans
 */
export async function createProduct(
  name: string,
  description: string,
  images?: string[]
): Promise<Stripe.Product> {
  try {
    const product = await stripe.products.create({
      name,
      description,
      images,
      metadata: {
        created_via: 'eatrite-api',
      },
    })

    return product
  } catch (error) {
    console.error('Error creating product:', error)
    throw error
  }
}

// ============================================================================
// WEBHOOKS
// ============================================================================

/**
 * Handle Stripe webhooks
 */
export async function handleWebhook(
  payload: string | Buffer,
  signature: string
): Promise<Stripe.Event> {
  try {
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || ''
    
    const event = stripe.webhooks.constructEvent(
      payload,
      signature,
      webhookSecret
    )

    return event
  } catch (error) {
    console.error('Error handling webhook:', error)
    throw error
  }
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Convert dollars to cents
 */
export function dollarsToCents(dollars: number): number {
  return Math.round(dollars * 100)
}

/**
 * Convert cents to dollars
 */
export function centsToDollars(cents: number): number {
  return cents / 100
}

/**
 * Format price for display
 */
export function formatPrice(cents: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(centsToDollars(cents))
}

// ============================================================================
// EXPORTS
// ============================================================================

export const StripeService = {
  // Customer management
  createCustomer,
  getCustomerByEmail,
  
  // Payment intents
  createPaymentIntent,
  confirmPaymentIntent,
  
  // Subscriptions
  createSubscription,
  cancelSubscription,
  updateSubscription,
  
  // Products and prices
  createProduct,
  createPrice,
  
  // Webhooks
  handleWebhook,
  
  // Utilities
  dollarsToCents,
  centsToDollars,
  formatPrice,
}

export default StripeService