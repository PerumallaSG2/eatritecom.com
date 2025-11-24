import express, { Router } from 'express'
import { sqliteDB } from '../services/sqliteDatabase.js'
import { FallbackDataService } from '../services/fallbackData.js'

const router: Router = express.Router()

// Check if database is available
const isDatabaseAvailable = async (): Promise<boolean> => {
  try {
    sqliteDB.getDB()
    return true
  } catch {
    return false
  }
}

// @route   GET /api/plans
// @desc    Get all active plans
// @access  Public
router.get('/', async (req, res) => {
  try {
    // Check if database is available
    const dbAvailable = await isDatabaseAvailable()

    if (!dbAvailable) {
      // Use fallback data
      const result = FallbackDataService.getPlans()
      return res.json(result)
    }

    const plans = sqliteDB.getPlans()

    // Parse features from string to array
    const parsedPlans = plans.map((plan: any) => ({
      ...plan,
      features: plan.features
        ? plan.features.split(',').map((f: string) => f.trim())
        : [],
    }))

    return res.json({
      success: true,
      data: parsedPlans,
    })
  } catch (error) {
    console.error('Error fetching plans:', error)
    // Fall back to mock data if database fails
    const fallbackResult = FallbackDataService.getPlans()
    return res.json(fallbackResult)
  }
})

// @route   GET /api/plans/:id
// @desc    Get plan by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const planId = parseInt(id)

    // Check if database is available
    const dbAvailable = await isDatabaseAvailable()

    if (!dbAvailable) {
      // Use fallback data
      const result = FallbackDataService.getPlanById(planId)
      if (!result.success) {
        return res.status(404).json(result)
      }
      return res.json(result)
    }

    const planData = sqliteDB.getPlanById(planId)

    if (!planData) {
      return res.status(404).json({
        success: false,
        message: 'Plan not found',
      })
    }

    const plan = {
      ...planData,
      features: (planData as any).features
        ? (planData as any).features.split(',').map((f: string) => f.trim())
        : [],
    }

    return res.json({
      success: true,
      data: plan,
    })
  } catch (error) {
    console.error('Error fetching plan:', error)
    // Fall back to mock data if database fails
    const fallbackResult = FallbackDataService.getPlanById(
      parseInt(req.params.id)
    )
    if (!fallbackResult.success) {
      return res.status(404).json(fallbackResult)
    }
    return res.json(fallbackResult)
  }
})

// @route   POST /api/plans/subscribe
// @desc    Create user subscription to a plan
// @access  Public (will be protected with auth later)
router.post('/subscribe', async (req, res) => {
  try {
    const { userId, planId, paymentMethod, billingCycle } = req.body

    if (!planId) {
      return res.status(400).json({
        success: false,
        message: 'Plan ID is required',
      })
    }

    // Check if database is available
    const dbAvailable = await isDatabaseAvailable()

    if (!dbAvailable) {
      // Return mock subscription response
      const plan = FallbackDataService.getPlanById(planId)
      if (!plan.success) {
        return res.status(404).json({
          success: false,
          message: 'Plan not found',
        })
      }

      return res.json({
        success: true,
        message: 'Plan subscription created successfully (demo mode)',
        data: {
          id: Math.floor(Math.random() * 1000),
          user_id: userId || 1,
          plan_id: planId,
          start_date: new Date(),
          end_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
          status: 'active',
          payment_method: paymentMethod || 'credit_card',
          billing_cycle: billingCycle || 'monthly',
        },
        fallback: true,
      })
    }

    // Check if plan exists
    const plan = sqliteDB.getPlanById(planId)
    if (!plan) {
      return res.status(404).json({
        success: false,
        message: 'Plan not found',
      })
    }

    const startDate = new Date()
    const endDate = new Date()
    endDate.setDate(endDate.getDate() + (plan as any).duration_days)

    // For now, return a mock subscription (would be inserted into DB in production)
    return res.json({
      success: true,
      message: 'Plan subscription created successfully',
      data: {
        id: Math.floor(Math.random() * 1000),
        user_id: userId || 1,
        plan_id: planId,
        start_date: startDate,
        end_date: endDate,
        status: 'active',
        payment_method: paymentMethod || 'credit_card',
        billing_cycle: billingCycle || 'monthly',
        created_at: new Date()
      },
    })
  } catch (error) {
    console.error('Error creating subscription:', error)
    return res.status(500).json({
      success: false,
      message: 'Error creating subscription',
      error: error instanceof Error ? error.message : 'Unknown error',
    })
  }
})

export default router
