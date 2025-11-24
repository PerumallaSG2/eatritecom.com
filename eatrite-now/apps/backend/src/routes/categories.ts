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

    const categories = sqliteDB.getCategories()

    return res.json({
      success: true,
      data: categories,
    })
  } catch (error) {
    console.error('Error fetching categories:', error)
    // Fall back to mock data if database fails
    const fallbackResult = FallbackDataService.getCategories()
    return res.json(fallbackResult)
  }
})

export default router
