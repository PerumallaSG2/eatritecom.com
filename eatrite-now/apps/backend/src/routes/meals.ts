import express, { Router } from 'express';
import { dataAccessService } from '../services/dataAccess';

const router: Router = express.Router();

// ==================== READ OPERATIONS (from catalog_meals) ====================

// @route   GET /api/meals
// @desc    Get all meals from catalog (READ ONLY)
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { category, popular, limit } = req.query;
    
    const filters = {
      category: category as string,
      popular: popular === 'true',
      limit: limit ? parseInt(limit as string) : undefined
    };
    
    const meals = await dataAccessService.getCatalogMeals(filters);
    res.json(meals);
  } catch (error) {
    console.error('Error fetching meals:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching meals', 
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
  }
});

// ==================== WRITE OPERATIONS (to user interaction tables) ====================

// @route   POST /api/meals/select
// @desc    Save user meal selection (WRITE to user_meal_selections)
// @access  Public
router.post('/select', async (req, res) => {
  try {
    const { userId, mealId, quantity = 1, selectedDate } = req.body;
    
    if (!mealId) {
      return res.status(400).json({
        success: false,
        message: 'Meal ID is required'
      });
    }
    
    const result = await dataAccessService.saveUserMealSelection({
      userId,
      mealId,
      quantity: parseInt(quantity),
      selectedDate
    });
    
    res.json({
      success: true,
      message: 'Meal selection saved successfully',
      data: result
    });
  } catch (error) {
    console.error('Error saving meal selection:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error saving meal selection', 
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
  }
});

export default router;
