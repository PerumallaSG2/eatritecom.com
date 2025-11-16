import express, { Router } from 'express';
import { db } from '../services/database';
import { FallbackDataService } from '../services/fallbackData';

const router: Router = express.Router();

// Check if database is available
const isDatabaseAvailable = async (): Promise<boolean> => {
  try {
    await db.query('SELECT 1');
    return true;
  } catch {
    return false;
  }
};

// @route   GET /api/plans
// @desc    Get all active plans
// @access  Public
router.get('/', async (req, res) => {
  try {
    // Check if database is available
    const dbAvailable = await isDatabaseAvailable();
    
    if (!dbAvailable) {
      // Use fallback data
      const result = FallbackDataService.getPlans();
      return res.json(result);
    }

    const query = `
      SELECT * FROM Plans 
      WHERE is_active = 1 
      ORDER BY price ASC
    `;
    
    const result = await db.query(query);
    
    // Parse features from string to array
    const plans = result.recordset.map(plan => ({
      ...plan,
      features: plan.features ? plan.features.split(',').map((f: string) => f.trim()) : []
    }));
    
    return res.json({
      success: true,
      data: plans
    });
  } catch (error) {
    console.error('Error fetching plans:', error);
    // Fall back to mock data if database fails
    const fallbackResult = FallbackDataService.getPlans();
    return res.json(fallbackResult);
  }
});

// @route   GET /api/plans/:id
// @desc    Get plan by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const planId = parseInt(id);
    
    // Check if database is available
    const dbAvailable = await isDatabaseAvailable();
    
    if (!dbAvailable) {
      // Use fallback data
      const result = FallbackDataService.getPlanById(planId);
      if (!result.success) {
        return res.status(404).json(result);
      }
      return res.json(result);
    }
    
    const query = 'SELECT * FROM Plans WHERE id = @id AND is_active = 1';
    const result = await db.query(query, { id: planId });
    
    if (result.recordset.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Plan not found'
      });
    }
    
    const plan = {
      ...result.recordset[0],
      features: result.recordset[0].features ? result.recordset[0].features.split(',').map((f: string) => f.trim()) : []
    };
    
    return res.json({
      success: true,
      data: plan
    });
  } catch (error) {
    console.error('Error fetching plan:', error);
    // Fall back to mock data if database fails
    const fallbackResult = FallbackDataService.getPlanById(parseInt(req.params.id));
    if (!fallbackResult.success) {
      return res.status(404).json(fallbackResult);
    }
    return res.json(fallbackResult);
  }
});

// @route   POST /api/plans/subscribe
// @desc    Create user subscription to a plan
// @access  Public (will be protected with auth later)
router.post('/subscribe', async (req, res) => {
  try {
    const { userId, planId, paymentMethod, billingCycle } = req.body;
    
    if (!planId) {
      return res.status(400).json({
        success: false,
        message: 'Plan ID is required'
      });
    }

    // Check if database is available
    const dbAvailable = await isDatabaseAvailable();
    
    if (!dbAvailable) {
      // Return mock subscription response
      const plan = FallbackDataService.getPlanById(planId);
      if (!plan.success) {
        return res.status(404).json({
          success: false,
          message: 'Plan not found'
        });
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
          billing_cycle: billingCycle || 'monthly'
        },
        fallback: true
      });
    }
    
    // Check if plan exists
    const planCheck = await db.query('SELECT * FROM Plans WHERE id = @planId AND is_active = 1', { planId });
    if (planCheck.recordset.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Plan not found'
      });
    }
    
    const plan = planCheck.recordset[0];
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + plan.duration_days);
    
    const insertQuery = `
      INSERT INTO UserSubscriptions (user_id, plan_id, start_date, end_date, payment_method, billing_cycle)
      OUTPUT INSERTED.*
      VALUES (@userId, @planId, @startDate, @endDate, @paymentMethod, @billingCycle)
    `;
    
    const params = {
      userId: userId || 1, // Default user for now
      planId,
      startDate,
      endDate,
      paymentMethod: paymentMethod || 'credit_card',
      billingCycle: billingCycle || 'monthly'
    };
    
    const result = await db.query(insertQuery, params);
    
    return res.json({
      success: true,
      message: 'Plan subscription created successfully',
      data: result.recordset[0]
    });
  } catch (error) {
    console.error('Error creating subscription:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Error creating subscription', 
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
  }
});

export default router;
