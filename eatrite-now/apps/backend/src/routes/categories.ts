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

// @route   GET /api/categories
// @desc    Get all active categories
// @access  Public
router.get('/', async (req, res) => {
  try {
    // Check if database is available
    const dbAvailable = await isDatabaseAvailable()

    if (!dbAvailable) {
      // Use fallback data
      const result = FallbackDataService.getCategories()
      return res.json(result)
    }

    const query = `
      SELECT 
        c.*,
        COUNT(m.id) as meal_count
      FROM Categories c
      LEFT JOIN Meals m ON c.id = m.category_id AND m.is_available = 1
      WHERE c.is_active = 1
      GROUP BY c.id, c.name, c.description, c.image_url, c.is_active, c.created_at
      ORDER BY c.name
    `

    const result = await db.query(query)

    return res.json({
      success: true,
      data: result.recordset,
    })
  } catch (error) {
    console.error('Error fetching categories:', error)
    // Fall back to mock data if database fails
    const fallbackResult = FallbackDataService.getCategories()
    return res.json(fallbackResult)
  }
})

export default router
