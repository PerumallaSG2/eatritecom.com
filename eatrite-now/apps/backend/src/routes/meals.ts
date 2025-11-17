import express, { Router } from 'express'
import { db } from '../services/database'
import { FallbackDataService } from '../services/fallbackData'

const router: Router = express.Router()

// Check if database is available
const isDatabaseAvailable = async (): Promise<boolean> => {
  try {
    await db.query('SELECT 1')
    return true
  } catch {
    return false
  }
}

// ==================== READ OPERATIONS ====================

// @route   GET /api/meals
// @desc    Get all meals with nutrition info
// @access  Public
router.get('/', async (req, res) => {
  try {
    // Check if database is available
    const dbAvailable = await isDatabaseAvailable()

    if (!dbAvailable) {
      // Use fallback data
      const result = FallbackDataService.getMeals(req.query)
      return res.json(result)
    }

    const { category, popular, limit, search } = req.query

    let query = `
      SELECT 
        m.*,
        c.name as category_name,
        mn.calories, mn.protein, mn.carbohydrates, mn.fat, mn.fiber, mn.sugar, mn.sodium
      FROM Meals m
      LEFT JOIN Categories c ON m.category_id = c.id
      LEFT JOIN MealNutrition mn ON m.id = mn.meal_id
      WHERE m.is_available = 1
    `

    const params: any = {}

    if (category) {
      query += ' AND c.name = @category'
      params.category = category
    }

    if (search) {
      query +=
        ' AND (m.name LIKE @search OR m.description LIKE @search OR m.ingredients LIKE @search)'
      params.search = `%${search}%`
    }

    query += ' ORDER BY m.created_at DESC'

    if (limit) {
      query += ' OFFSET 0 ROWS FETCH NEXT @limit ROWS ONLY'
      params.limit = parseInt(limit as string)
    }

    const result = await db.query(query, params)

    return res.json({
      success: true,
      data: result.recordset,
      total: result.recordset.length,
    })
  } catch (error) {
    console.error('Error fetching meals:', error)
    // Fall back to mock data if database fails
    const fallbackResult = FallbackDataService.getMeals(req.query)
    return res.json(fallbackResult)
  }
})

// @route   GET /api/meals/:id
// @desc    Get meal by ID with full details
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const mealId = parseInt(id)

    // Check if database is available
    const dbAvailable = await isDatabaseAvailable()

    if (!dbAvailable) {
      // Use fallback data
      const result = FallbackDataService.getMealById(mealId)
      if (!result.success) {
        return res.status(404).json(result)
      }
      return res.json(result)
    }

    const query = `
      SELECT 
        m.*,
        c.name as category_name,
        mn.calories, mn.protein, mn.carbohydrates, mn.fat, mn.fiber, mn.sugar, mn.sodium,
        mn.cholesterol, mn.vitamin_a, mn.vitamin_c, mn.calcium, mn.iron
      FROM Meals m
      LEFT JOIN Categories c ON m.category_id = c.id
      LEFT JOIN MealNutrition mn ON m.id = mn.meal_id
      WHERE m.id = @id AND m.is_available = 1
    `

    const result = await db.query(query, { id: mealId })

    if (result.recordset.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Meal not found',
      })
    }

    return res.json({
      success: true,
      data: result.recordset[0],
    })
  } catch (error) {
    console.error('Error fetching meal:', error)
    // Fall back to mock data if database fails
    const fallbackResult = FallbackDataService.getMealById(
      parseInt(req.params.id)
    )
    if (!fallbackResult.success) {
      return res.status(404).json(fallbackResult)
    }
    return res.json(fallbackResult)
  }
})

// @route   GET /api/meals/category/:category
// @desc    Get meals by category
// @access  Public
router.get('/category/:category', async (req, res) => {
  try {
    const { category } = req.params
    const { limit } = req.query

    let query = `
      SELECT 
        m.*,
        c.name as category_name,
        mn.calories, mn.protein, mn.carbohydrates, mn.fat
      FROM Meals m
      JOIN Categories c ON m.category_id = c.id
      LEFT JOIN MealNutrition mn ON m.id = mn.meal_id
      WHERE c.name = @category AND m.is_available = 1
      ORDER BY m.created_at DESC
    `

    const params: any = { category }

    if (limit) {
      query += ' OFFSET 0 ROWS FETCH NEXT @limit ROWS ONLY'
      params.limit = parseInt(limit as string)
    }

    const result = await db.query(query, params)

    res.json({
      success: true,
      data: result.recordset,
      category,
      total: result.recordset.length,
    })
  } catch (error) {
    console.error('Error fetching meals by category:', error)
    res.status(500).json({
      success: false,
      message: 'Error fetching meals by category',
      error: error instanceof Error ? error.message : 'Unknown error',
    })
  }
})

export default router
