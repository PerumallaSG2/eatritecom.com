/**
 * Money Flow Calculator Routes
 * Shows exactly where transaction money goes
 */

import express, { Router, Request, Response } from 'express'

const router: Router = express.Router()

// Stripe fee structure (as of 2024)
const STRIPE_FEES = {
  PERCENTAGE: 0.029, // 2.9%
  FIXED_FEE: 0.30,   // $0.30 per transaction
  INTERNATIONAL_EXTRA: 0.015, // +1.5% for international cards
}

/**
 * Calculate money flow for a transaction
 * POST /api/payments/money-flow/calculate
 */
router.post('/calculate', (req: Request, res: Response) => {
  const { 
    orderAmount, 
    isInternationalCard = false,
    includeBreakdown = true 
  } = req.body

  if (!orderAmount || orderAmount <= 0) {
    return res.status(400).json({
      success: false,
      message: 'Valid order amount is required'
    })
  }

  // Calculate Stripe fees
  const percentageFee = isInternationalCard ? 
    STRIPE_FEES.PERCENTAGE + STRIPE_FEES.INTERNATIONAL_EXTRA : 
    STRIPE_FEES.PERCENTAGE

  const stripeFeePercentage = orderAmount * percentageFee
  const stripeFeeFixed = STRIPE_FEES.FIXED_FEE
  const totalStripeFee = stripeFeePercentage + stripeFeeFixed
  const netAmount = orderAmount - totalStripeFee

  const breakdown = {
    customerPays: orderAmount,
    stripeProcessing: {
      percentageFee: Math.round(stripeFeePercentage * 100) / 100,
      fixedFee: stripeFeeFixed,
      totalFee: Math.round(totalStripeFee * 100) / 100,
      feePercentage: Math.round((totalStripeFee / orderAmount) * 10000) / 100
    },
    businessReceives: Math.round(netAmount * 100) / 100,
    flow: [
      {
        step: 1,
        location: "Customer's Bank Account",
        amount: -orderAmount,
        description: `Customer charged $${orderAmount}`
      },
      {
        step: 2, 
        location: "Stripe Processing",
        amount: -totalStripeFee,
        description: `Stripe fee: ${(percentageFee * 100).toFixed(1)}% + $${stripeFeeFixed}`
      },
      {
        step: 3,
        location: "Your Stripe Balance", 
        amount: netAmount,
        description: `Available immediately in Stripe dashboard`
      },
      {
        step: 4,
        location: "Your Business Bank Account",
        amount: netAmount,
        description: `Transferred in 1-2 business days`
      }
    ]
  }

  res.json({
    success: true,
    message: `Money flow calculation for $${orderAmount} transaction`,
    summary: {
      orderAmount: orderAmount,
      stripeFee: breakdown.stripeProcessing.totalFee,
      netRevenue: breakdown.businessReceives,
      feePercentage: `${breakdown.stripeProcessing.feePercentage}%`
    },
    ...(includeBreakdown && { breakdown }),
    timeline: {
      immediate: `$${breakdown.businessReceives} appears in Stripe dashboard`,
      next12Days: `$${breakdown.businessReceives} transferred to your bank`,
      availability: "Funds available for business use"
    }
  })
})

/**
 * Calculate revenue projections
 * POST /api/payments/money-flow/projections
 */
router.post('/projections', (req: Request, res: Response) => {
  const {
    averageOrderValue = 30.00,
    ordersPerDay = 50,
    daysPerMonth = 30,
    monthsPerYear = 12
  } = req.body

  // Calculate daily revenue
  const dailyGross = averageOrderValue * ordersPerDay
  const dailyStripeFees = ordersPerDay * (averageOrderValue * STRIPE_FEES.PERCENTAGE + STRIPE_FEES.FIXED_FEE)
  const dailyNet = dailyGross - dailyStripeFees

  // Calculate monthly revenue
  const monthlyGross = dailyGross * daysPerMonth
  const monthlyStripeFees = dailyStripeFees * daysPerMonth
  const monthlyNet = dailyNet * daysPerMonth

  // Calculate yearly revenue
  const yearlyGross = monthlyGross * monthsPerYear
  const yearlyStripeFees = monthlyStripeFees * monthsPerYear
  const yearlyNet = monthlyNet * monthsPerYear

  res.json({
    success: true,
    message: 'Revenue projections for EatRite business',
    assumptions: {
      averageOrderValue,
      ordersPerDay,
      daysPerMonth,
      monthsPerYear
    },
    projections: {
      daily: {
        grossRevenue: Math.round(dailyGross * 100) / 100,
        stripeFees: Math.round(dailyStripeFees * 100) / 100,
        netRevenue: Math.round(dailyNet * 100) / 100,
        toBankAccount: Math.round(dailyNet * 100) / 100
      },
      monthly: {
        grossRevenue: Math.round(monthlyGross * 100) / 100,
        stripeFees: Math.round(monthlyStripeFees * 100) / 100,
        netRevenue: Math.round(monthlyNet * 100) / 100,
        toBankAccount: Math.round(monthlyNet * 100) / 100
      },
      yearly: {
        grossRevenue: Math.round(yearlyGross * 100) / 100,
        stripeFees: Math.round(yearlyStripeFees * 100) / 100,
        netRevenue: Math.round(yearlyNet * 100) / 100,
        toBankAccount: Math.round(yearlyNet * 100) / 100
      }
    },
    bankingSchedule: {
      frequency: "Daily automatic transfers",
      timing: "1-2 business days after transaction",
      minimum: "$1.00 (configurable)",
      weekends: "Transfers process on next business day"
    }
  })
})

/**
 * Stripe setup guide
 * GET /api/payments/money-flow/setup-guide
 */
router.get('/setup-guide', (req: Request, res: Response) => {
  res.json({
    success: true,
    message: 'Complete Stripe setup guide for receiving real money',
    currentStatus: {
      apiKeys: process.env.STRIPE_SECRET_KEY?.startsWith('sk_live_') ? 
        '✅ Live keys configured' : 
        '⚠️ Test keys only - no real money',
      webhook: process.env.STRIPE_WEBHOOK_SECRET ? 
        '✅ Webhook configured' : 
        '❌ Webhook not configured'
    },
    setupSteps: [
      {
        step: 1,
        title: "Create Stripe Account",
        description: "Sign up at https://stripe.com with your business details",
        status: "Required",
        timeRequired: "10 minutes"
      },
      {
        step: 2,
        title: "Verify Your Identity", 
        description: "Provide business documents and bank account details",
        status: "Required for live payments",
        timeRequired: "1-2 business days"
      },
      {
        step: 3,
        title: "Get Live API Keys",
        description: "Copy live keys from Stripe Dashboard → Developers → API Keys",
        status: "Critical - replace test keys",
        timeRequired: "2 minutes"
      },
      {
        step: 4,
        title: "Update Environment Variables",
        description: "Replace STRIPE_SECRET_KEY and STRIPE_PUBLISHABLE_KEY in .env",
        status: "Required for real transactions", 
        timeRequired: "1 minute"
      },
      {
        step: 5,
        title: "Test Real Payment",
        description: "Process a small test transaction with real card",
        status: "Recommended",
        timeRequired: "5 minutes"
      },
      {
        step: 6,
        title: "Verify Bank Transfer",
        description: "Confirm money appears in your business bank account",
        status: "Final verification",
        timeRequired: "1-2 business days"
      }
    ],
    businessBankRequirements: {
      accountType: "Business checking account (recommended)",
      supportedBanks: "All major US banks and credit unions",
      requiredInfo: [
        "Bank routing number",
        "Account number", 
        "Business legal name",
        "EIN (Tax ID) number"
      ],
      transferSchedule: "Daily automatic transfers (1-2 day settlement)"
    }
  })
})

export default router