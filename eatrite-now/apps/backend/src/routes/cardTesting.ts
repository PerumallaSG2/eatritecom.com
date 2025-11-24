/**
 * Card Existence Testing Routes
 * Demonstrates different card validation scenarios
 */

import express, { Router, Request, Response } from 'express'
import { validateCreditCard, isTestCard } from '../services/cardValidation.js'

const router: Router = express.Router()

/**
 * Test different card existence scenarios
 * POST /api/payments/test/card-scenarios
 */
router.post('/card-scenarios', (req: Request, res: Response) => {
  const testScenarios = [
    {
      name: "Valid Test Card (Exists)",
      description: "Stripe test card - will work in test mode",
      card: {
        number: "4242424242424242",
        expiryMonth: "12",
        expiryYear: "2025", 
        cvv: "123"
      },
      expectedResult: "Passes format validation AND works with Stripe",
      stripeResult: "✅ Payment Successful"
    },
    {
      name: "Mathematically Valid But Fake",
      description: "Passes Luhn but doesn't exist in real world",
      card: {
        number: "4000000000000002", 
        expiryMonth: "12",
        expiryYear: "2025",
        cvv: "123"
      },
      expectedResult: "Passes format validation BUT fails at Stripe",
      stripeResult: "❌ 'Your card number is incorrect'"
    },
    {
      name: "Stripe Decline Test Card", 
      description: "Real test card designed to be declined",
      card: {
        number: "4000000000000341",
        expiryMonth: "12", 
        expiryYear: "2025",
        cvv: "123"
      },
      expectedResult: "Passes format validation BUT declined by bank",
      stripeResult: "❌ 'Your card was declined'"
    },
    {
      name: "Insufficient Funds Test Card",
      description: "Real test card with no money",
      card: {
        number: "4000000000000119",
        expiryMonth: "12",
        expiryYear: "2025", 
        cvv: "123"
      },
      expectedResult: "Passes format validation BUT insufficient funds", 
      stripeResult: "❌ 'Your card has insufficient funds'"
    },
    {
      name: "Completely Invalid Number",
      description: "Fails basic math validation",
      card: {
        number: "1234567890123456",
        expiryMonth: "12",
        expiryYear: "2025",
        cvv: "123" 
      },
      expectedResult: "Fails format validation immediately",
      stripeResult: "❌ Never reaches Stripe (caught by our validation)"
    }
  ]

  const results = testScenarios.map(scenario => {
    const validation = validateCreditCard(scenario.card)
    
    return {
      scenario: scenario.name,
      description: scenario.description,
      card: {
        ...scenario.card,
        number: scenario.card.number.slice(0, 4) + '****' + scenario.card.number.slice(-4) // Mask for security
      },
      ourValidation: {
        isValid: validation.isValid,
        cardType: validation.cardType,
        errors: validation.errors,
        isTestCard: isTestCard(scenario.card.number)
      },
      expectedResult: scenario.expectedResult,
      stripeResult: scenario.stripeResult,
      stage1Pass: validation.isValid, // Our validation
      stage2Expected: scenario.stripeResult.includes('✅') // Would pass Stripe
    }
  })

  res.json({
    success: true,
    message: "Card existence test scenarios",
    explanation: {
      stage1: "Our format validation (mathematical + format checks)",
      stage2: "Real card verification (Stripe + bank checks)", 
      flow: "Stage 1 → Stage 2 → Final Result"
    },
    scenarios: results,
    summary: {
      total: results.length,
      passStage1: results.filter(r => r.stage1Pass).length,
      passStage2: results.filter(r => r.stage2Expected).length,
      bothStages: results.filter(r => r.stage1Pass && r.stage2Expected).length
    }
  })
})

/**
 * Simulate real payment processing flow
 * POST /api/payments/test/simulate-payment
 */
router.post('/simulate-payment', (req: Request, res: Response) => {
  const { cardDetails, amount = 10.00 } = req.body

  if (!cardDetails) {
    return res.status(400).json({
      success: false,
      message: "Card details required",
      stage: "input_validation"
    })
  }

  // Stage 1: Our format validation
  const formatValidation = validateCreditCard(cardDetails)
  
  if (!formatValidation.isValid) {
    return res.status(400).json({
      success: false,
      message: "Invalid card format - caught before reaching payment processor",
      errors: formatValidation.errors,
      stage: "format_validation",
      savings: "Saved API call to Stripe ✅"
    })
  }

  // Stage 2: Simulate Stripe validation based on card number
  const cardNumber = cardDetails.number.replace(/\D/g, '')
  let stripeSimulation

  if (cardNumber === '4242424242424242') {
    // Valid Stripe test card
    stripeSimulation = {
      success: true,
      message: "Payment successful",
      paymentId: "pi_test_" + Date.now(),
      stage: "payment_complete"
    }
  } else if (cardNumber === '4000000000000002') {
    // Mathematically valid but doesn't exist
    stripeSimulation = {
      success: false,
      message: "Your card number is incorrect.",
      errorCode: "incorrect_number",
      stage: "card_verification"
    }
  } else if (cardNumber === '4000000000000341') {
    // Decline test card
    stripeSimulation = {
      success: false, 
      message: "Your card was declined.",
      errorCode: "card_declined",
      stage: "bank_decline"
    }
  } else if (cardNumber === '4000000000000119') {
    // Insufficient funds
    stripeSimulation = {
      success: false,
      message: "Your card has insufficient funds.", 
      errorCode: "insufficient_funds",
      stage: "insufficient_funds"
    }
  } else if (isTestCard(cardNumber)) {
    // Other Stripe test cards
    stripeSimulation = {
      success: true,
      message: "Payment successful (test card)",
      paymentId: "pi_test_" + Date.now(),
      stage: "payment_complete"
    }
  } else {
    // Unknown card - likely doesn't exist
    stripeSimulation = {
      success: false,
      message: "Your card number is incorrect.",
      errorCode: "incorrect_number", 
      stage: "card_verification"
    }
  }

  return res.json({
    success: stripeSimulation.success,
    message: stripeSimulation.success ? 
      `✅ Payment of $${amount} processed successfully` :
      `❌ ${stripeSimulation.message}`,
    validationFlow: {
      stage1: {
        name: "Format Validation", 
        result: "✅ Passed",
        cardType: formatValidation.cardType,
        checks: ["Luhn algorithm", "Card pattern", "Expiry date", "CVV format"]
      },
      stage2: {
        name: "Real Card Verification",
        result: stripeSimulation.success ? "✅ Passed" : "❌ Failed",
        ...stripeSimulation
      }
    },
    amount: amount,
    cardInfo: {
      type: formatValidation.cardType,
      lastFour: cardNumber.slice(-4),
      isTestCard: isTestCard(cardNumber)
    }
  })
})

export default router