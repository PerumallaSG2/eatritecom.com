import express, { Router } from 'express';
import { dataAccessService } from '../services/dataAccess';

const router: Router = express.Router();

// ==================== READ OPERATIONS (from catalog_plans) ====================

// @route   GET /api/plans
// @desc    Get all plans from catalog (READ ONLY)
// @access  Public
router.get('/', async (req, res) => {
  try {
    const plans = await dataAccessService.getCatalogPlans();
    res.json(plans);
  } catch (error) {
    console.error('Error fetching plans:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching plans', 
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
  }
});

// ==================== WRITE OPERATIONS (to user interaction tables) ====================

// @route   POST /api/plans/subscribe
// @desc    Save user plan subscription (WRITE to user_plan_subscriptions)
// @access  Public
router.post('/subscribe', async (req, res) => {
  try {
    const { userId, planId, startDate, endDate } = req.body;
    
    if (!planId) {
      return res.status(400).json({
        success: false,
        message: 'Plan ID is required'
      });
    }
    
    const result = await dataAccessService.saveUserPlanSubscription({
      userId,
      planId,
      startDate,
      endDate
    });
    
    res.json({
      success: true,
      message: 'Plan subscription saved successfully',
      data: result
    });
  } catch (error) {
    console.error('Error saving plan subscription:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error saving plan subscription', 
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
  }
});

export default router;
