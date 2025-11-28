import express, { Router } from 'express'
import { db } from '../services/database.js'
import { FallbackDataService } from '../services/fallbackData.js'

const router: Router = express.Router()

// Check if database is available
const isDatabaseAvailable = async (): Promise<boolean> => {
  try {
    db.getPool()
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

    const { category, limit, search } = req.query
    const filters: any = {}

    if (category) {
      filters.category = category as string
    }

    if (search) {
      filters.search = search as string
    }

    if (limit) {
      filters.limit = parseInt(limit as string)
    }

    let query = `
      SELECT m.*, c.name as category_name, n.*
      FROM meals m
      LEFT JOIN categories c ON m.category_id = c.id  
      LEFT JOIN nutrition n ON m.id = n.meal_id
    `
    let whereConditions = []
    
    if (filters.category) {
      whereConditions.push(`c.name = '${filters.category}'`)
    }
    
    if (whereConditions.length > 0) {
      query += ` WHERE ${whereConditions.join(' AND ')}`
    }
    
    if (filters.limit) {
      query += ` ORDER BY m.name OFFSET 0 ROWS FETCH NEXT ${filters.limit} ROWS ONLY`
    }

    const result = await db.query(query)
    const meals = result.recordset

    return res.json({
      success: true,
      data: meals,
      total: meals.length,
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

    const result = await db.query(`
      SELECT m.*, c.name as category_name, n.*
      FROM meals m
      LEFT JOIN categories c ON m.category_id = c.id  
      LEFT JOIN nutrition n ON m.id = n.meal_id
      WHERE m.id = ${mealId}
    `)
    
    const meal = result.recordset[0]

    if (!meal) {
      return res.status(404).json({
        success: false,
        message: 'Meal not found',
      })
    }

    return res.json({
      success: true,
      data: meal,
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

    const filters: any = { category }

    if (limit) {
      filters.limit = parseInt(limit as string)
    }

    // Check if database is available
    const dbAvailable = await isDatabaseAvailable()

    if (!dbAvailable) {
      // Use fallback data
      const result = FallbackDataService.getMeals(filters)
      return res.json({
        success: true,
        data: result.data,
        category,
        total: result.data.length,
      })
    }

    let query = `
      SELECT m.*, c.name as category_name, n.*
      FROM meals m
      LEFT JOIN categories c ON m.category_id = c.id  
      LEFT JOIN nutrition n ON m.id = n.meal_id
      WHERE c.name = '${category}'
    `
    
    const result = await db.query(query)
    const meals = result.recordset

    res.json({
      success: true,
      data: meals,
      category,
      total: meals.length,
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
