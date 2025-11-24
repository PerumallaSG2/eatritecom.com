/**
 * Enhanced Payment Routes with Card Validation
 * Comprehensive credit card validation and processing
 */

import express, { Router, Request, Response } from 'express'
import { validateCreditCard, detectCardType, isTestCard, CreditCardData } from '../services/cardValidation.js'
import { StripeService } from '../services/stripeService.js'
import Stripe from 'stripe'

const router: Router = express.Router()

// ============================================================================
// CARD VALIDATION ROUTES
// ============================================================================

/**
 * Validate credit card details
 * POST /api/payments/validate-card
 */
router.post('/validate-card', async (req: Request, res: Response) => {
  try {
    const { number, expiryMonth, expiryYear, cvv, name }: CreditCardData = req.body

    // Validate required fields
    if (!number || !expiryMonth || !expiryYear || !cvv) {
      return res.status(400).json({
        success: false,
        message: 'Card number, expiry date, and CVV are required',
        errors: ['Missing required card details'],
      })
    }

    // Validate card details
    const validation = validateCreditCard({
      number,
      expiryMonth,
      expiryYear,
      cvv,
      name,
    })

    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        message: 'Invalid card details',
        errors: validation.errors,
        cardType: validation.cardType,
      })
    }

    // Check if it's a test card
    const isTest = isTestCard(number)

    res.json({
      success: true,
      message: 'Card is valid',
      data: {
        cardType: validation.cardType,
        isTestCard: isTest,
        lastFour: number.replace(/\D/g, '').slice(-4),
      },
    })
  } catch (error) {
    console.error('Error validating card:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to validate card',
      error: error instanceof Error ? error.message : 'Unknown error',
    })
  }
})

/**
 * Create payment intent with card validation
 * POST /api/payments/create-payment
 */
router.post('/create-payment', async (req: Request, res: Response) => {
  try {
    const {
      amount,
      currency = 'usd',
      cardDetails,
      customerId,
      orderId,
      description,
      billing_details,
    } = req.body

    // Validate amount
    if (!amount || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Valid amount is required',
      })
    }

    // Validate card details if provided
    if (cardDetails) {
      const validation = validateCreditCard(cardDetails)
      
      if (!validation.isValid) {
        return res.status(400).json({
          success: false,
          message: 'Invalid card details',
          errors: validation.errors,
          cardType: validation.cardType,
        })
      }

      // Check if test card is allowed in production
      if (!isTestCard(cardDetails.number) && process.env.NODE_ENV === 'production') {
        // In production, you might want additional fraud checks here
        console.log('🔒 Production payment with real card detected')
      }
    }

    // Convert dollars to cents
    const amountInCents = StripeService.dollarsToCents(amount)

    // Create payment intent
    const paymentIntent = await StripeService.createPaymentIntent({
      amount: amountInCents,
      currency,
      customerId,
      description: description || `EatRite Order Payment`,
      metadata: {
        order_id: orderId || '',
        platform: 'eatrite-web',
        card_type: cardDetails ? detectCardType(cardDetails.number) : 'unknown',
      },
    })

    res.json({
      success: true,
      data: {
        client_secret: paymentIntent.client_secret,
        payment_intent_id: paymentIntent.id,
        amount: amountInCents,
        currency: paymentIntent.currency,
        cardType: cardDetails ? detectCardType(cardDetails.number) : null,
      },
    })
  } catch (error) {
    console.error('Error creating payment:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to create payment',
      error: error instanceof Error ? error.message : 'Unknown error',
    })
  }
})

/**
 * Process payment with full validation
 * POST /api/payments/process-payment
 */
router.post('/process-payment', async (req: Request, res: Response) => {
  try {
    const {
      amount,
      cardDetails,
      customerInfo,
      orderDetails,
      currency = 'usd',
    } = req.body

    // Validate required fields
    if (!amount || !cardDetails || !customerInfo) {
      return res.status(400).json({
        success: false,
        message: 'Amount, card details, and customer info are required',
      })
    }

    // 1. Validate card details
    const cardValidation = validateCreditCard(cardDetails)
    
    if (!cardValidation.isValid) {
      return res.status(400).json({
        success: false,
        message: 'Invalid card details',
        errors: cardValidation.errors,
        step: 'card_validation',
      })
    }

    // 2. Create or get customer
    let customer
    try {
      customer = await StripeService.getCustomerByEmail(customerInfo.email)
      
      if (!customer) {
        customer = await StripeService.createCustomer({
          email: customerInfo.email,
          name: `${customerInfo.firstName} ${customerInfo.lastName}`,
          phone: customerInfo.phone,
          address: customerInfo.address,
        })
      }
    } catch (customerError) {
      return res.status(400).json({
        success: false,
        message: 'Failed to create customer',
        error: customerError instanceof Error ? customerError.message : 'Unknown error',
        step: 'customer_creation',
      })
    }

    // 3. Create payment intent
    const amountInCents = StripeService.dollarsToCents(amount)
    
    const paymentIntent = await StripeService.createPaymentIntent({
      amount: amountInCents,
      currency,
      customerId: customer.id,
      description: `EatRite Order - ${orderDetails?.items?.length || 0} items`,
      metadata: {
        order_id: orderDetails?.orderId || '',
        customer_email: customerInfo.email,
        card_type: cardValidation.cardType,
        item_count: orderDetails?.items?.length?.toString() || '0',
      },
    })

    // 4. Return payment details for frontend processing
    res.json({
      success: true,
      message: 'Payment prepared successfully',
      data: {
        payment_intent_id: paymentIntent.id,
        client_secret: paymentIntent.client_secret,
        customer_id: customer.id,
        amount: amountInCents,
        currency: paymentIntent.currency,
        cardValidation: {
          cardType: cardValidation.cardType,
          isTestCard: isTestCard(cardDetails.number),
          lastFour: cardDetails.number.replace(/\D/g, '').slice(-4),
        },
        requiresAction: paymentIntent.status === 'requires_action',
        nextAction: paymentIntent.next_action,
      },
    })
  } catch (error) {
    console.error('Error processing payment:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to process payment',
      error: error instanceof Error ? error.message : 'Unknown error',
      step: 'payment_processing',
    })
  }
})

/**
 * Get supported card types
 * GET /api/payments/supported-cards
 */
router.get('/supported-cards', (req: Request, res: Response) => {
  const supportedCards = [
    {
      type: 'visa',
      name: 'Visa',
      icon: '💳',
      pattern: '4*** **** **** ****',
      cvvLength: 3,
    },
    {
      type: 'mastercard',
      name: 'Mastercard',
      icon: '💳',
      pattern: '5*** **** **** ****',
      cvvLength: 3,
    },
    {
      type: 'amex',
      name: 'American Express',
      icon: '💎',
      pattern: '3*** ****** *****',
      cvvLength: 4,
    },
    {
      type: 'discover',
      name: 'Discover',
      icon: '🔍',
      pattern: '6*** **** **** ****',
      cvvLength: 3,
    },
  ]

  res.json({
    success: true,
    data: supportedCards,
  })
})

/**
 * Test card validation with sample data
 * POST /api/payments/test-validation
 */
router.post('/test-validation', (req: Request, res: Response) => {
  // Sample test cards for validation testing
  const testCards = [
    {
      name: 'Valid Visa',
      number: '4242424242424242',
      expiryMonth: '12',
      expiryYear: '2025',
      cvv: '123',
      expected: true,
    },
    {
      name: 'Valid Mastercard',
      number: '5555555555554444',
      expiryMonth: '11',
      expiryYear: '2026',
      cvv: '456',
      expected: true,
    },
    {
      name: 'Invalid Card (Luhn)',
      number: '4242424242424241',
      expiryMonth: '12',
      expiryYear: '2025',
      cvv: '123',
      expected: false,
    },
    {
      name: 'Expired Card',
      number: '4242424242424242',
      expiryMonth: '01',
      expiryYear: '2020',
      cvv: '123',
      expected: false,
    },
  ]

  const results = testCards.map(card => {
    const validation = validateCreditCard({
      number: card.number,
      expiryMonth: card.expiryMonth,
      expiryYear: card.expiryYear,
      cvv: card.cvv,
    })

    return {
      ...card,
      result: validation,
      testPassed: validation.isValid === card.expected,
    }
  })

  res.json({
    success: true,
    message: 'Card validation test results',
    data: results,
    summary: {
      total: results.length,
      passed: results.filter(r => r.testPassed).length,
      failed: results.filter(r => !r.testPassed).length,
    },
  })
})

export default router