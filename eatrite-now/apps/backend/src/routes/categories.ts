import express, { Router } from 'express';
import { dataAccessService } from '../services/dataAccess';

const router: Router = express.Router();

// ==================== READ OPERATIONS (from catalog_categories) ====================

// @route   GET /api/categories  
// @desc    Get all categories from catalog (READ ONLY)
// @access  Public
router.get('/', async (req, res) => {
  try {
    const categories = await dataAccessService.getCatalogCategories();
    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching categories', 
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
  }
});

export default router;
