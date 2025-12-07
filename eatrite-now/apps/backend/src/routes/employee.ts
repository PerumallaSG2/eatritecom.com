/**
 * EatRite Work - Employee Routes
 * 
 * Protected routes for employees.
 * Requires EMPLOYEE, COMPANY_ADMIN, or SUPER_ADMIN role.
 * All queries are company-scoped for security.
 */

import express, { Router, Response } from 'express';
import { authenticateToken, AuthRequest } from '../middleware/auth.js';
import {
  getAvailableMeals,
  getMealCategories,
  getEmployeeOrders,
  createEmployeeOrder,
  getEmployeeWellnessScores,
  getEmployeeAchievements
} from '../services/employeeService.js';

const router: Router = express.Router();

// Apply authentication to all employee routes
router.use(authenticateToken);

/**
 * GET /api/employee/meals
 * 
 * Get available meals for employee
 * Query params: category, maxCalories, dietaryRestrictions[], skip, take
 */
router.get('/meals', async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
    }

    const category = req.query.category as string | undefined;
    const maxCalories = req.query.maxCalories ? parseInt(req.query.maxCalories as string) : undefined;
    const dietaryRestrictions = req.query.dietaryRestrictions 
      ? (Array.isArray(req.query.dietaryRestrictions) 
        ? req.query.dietaryRestrictions 
        : [req.query.dietaryRestrictions]) as string[]
      : [];
    const skip = parseInt(req.query.skip as string) || 0;
    const take = parseInt(req.query.take as string) || 20;

    const result = await getAvailableMeals(req.user.companyId, {
      category,
      maxCalories,
      dietaryRestrictions,
      skip,
      take
    });

    res.json({
      success: true,
      data: result
    });

  } catch (error) {
    console.error('Error fetching meals:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch meals'
    });
  }
});

/**
 * GET /api/employee/categories
 * 
 * Get meal categories with counts
 */
router.get('/categories', async (req: AuthRequest, res: Response) => {
  try {
    const categories = await getMealCategories();

    res.json({
      success: true,
      data: categories
    });

  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch categories'
    });
  }
});

/**
 * GET /api/employee/orders
 * 
 * Get employee's order history
 * Query params: skip, take
 */
router.get('/orders', async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
    }

    const skip = parseInt(req.query.skip as string) || 0;
    const take = parseInt(req.query.take as string) || 20;

    const result = await getEmployeeOrders(req.user.id, req.user.companyId, {
      skip,
      take
    });

    res.json({
      success: true,
      data: result
    });

  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch orders'
    });
  }
});

/**
 * POST /api/employee/orders
 * 
 * Create a new order
 * Body: { items: [{ mealId, quantity, priceCents }], deliveryAddress, deliveryDate, deliveryNotes? }
 */
router.post('/orders', async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
    }

    const { items, deliveryAddress, deliveryDate, deliveryNotes } = req.body;

    // Validate required fields
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Order must contain at least one item'
      });
    }

    if (!deliveryAddress) {
      return res.status(400).json({
        success: false,
        message: 'Delivery address is required'
      });
    }

    if (!deliveryDate) {
      return res.status(400).json({
        success: false,
        message: 'Delivery date is required'
      });
    }

    // Validate items structure
    for (const item of items) {
      if (!item.mealId || !item.quantity || !item.priceCents) {
        return res.status(400).json({
          success: false,
          message: 'Each item must have mealId, quantity, and priceCents'
        });
      }
    }

    const order = await createEmployeeOrder(req.user.id, req.user.companyId, {
      items,
      deliveryAddress,
      deliveryDate: new Date(deliveryDate),
      deliveryNotes
    });

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      data: order
    });

  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create order'
    });
  }
});

/**
 * GET /api/employee/wellness
 * 
 * Get employee's wellness scores
 * Query params: days (default 30)
 */
router.get('/wellness', async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
    }

    const days = parseInt(req.query.days as string) || 30;

    const result = await getEmployeeWellnessScores(req.user.id, req.user.companyId, days);

    res.json({
      success: true,
      data: result
    });

  } catch (error) {
    console.error('Error fetching wellness scores:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch wellness scores'
    });
  }
});

/**
 * GET /api/employee/achievements
 * 
 * Get employee's achievements
 */
router.get('/achievements', async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
    }

    const result = await getEmployeeAchievements(req.user.id, req.user.companyId);

    res.json({
      success: true,
      data: result
    });

  } catch (error) {
    console.error('Error fetching achievements:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch achievements'
    });
  }
});

export default router;
