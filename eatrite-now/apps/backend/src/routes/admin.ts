/**
 * EatRite Work - Admin Routes
 * 
 * Protected routes for company administrators.
 * Requires COMPANY_ADMIN or SUPER_ADMIN role.
 * All queries are company-scoped for security.
 */

import express, { Router, Response } from 'express';
import { authenticateToken, requireCompanyAdmin, AuthRequest } from '../middleware/auth.js';
import {
  getAdminDashboardStats,
  getOrderAnalytics,
  getCompanyImpactMetrics,
  getCompanyEmployees
} from '../services/adminService.js';

const router: Router = express.Router();

// Apply authentication to all admin routes
router.use(authenticateToken);
router.use(requireCompanyAdmin);

/**
 * GET /api/admin/dashboard
 * 
 * Get dashboard statistics for admin home page
 * Returns: totalEmployees, activeOrders, revenue, avgOrderValue
 */
router.get('/dashboard', async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
    }

    const stats = await getAdminDashboardStats(req.user.companyId);

    res.json({
      success: true,
      data: stats
    });

  } catch (error) {
    console.error('Error fetching admin dashboard:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch dashboard statistics'
    });
  }
});

/**
 * GET /api/admin/analytics
 * 
 * Get order analytics for admin analytics page
 * Query params: days (default 30)
 * Returns: orderTrends, popularMeals, activeEmployees
 */
router.get('/analytics', async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
    }

    const days = parseInt(req.query.days as string) || 30;
    const analytics = await getOrderAnalytics(req.user.companyId, days);

    res.json({
      success: true,
      data: analytics
    });

  } catch (error) {
    console.error('Error fetching analytics:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch analytics'
    });
  }
});

/**
 * GET /api/admin/impact
 * 
 * Get company impact metrics for admin impact page
 * Returns: wellness scores, healthy choices, achievements
 */
router.get('/impact', async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
    }

    const metrics = await getCompanyImpactMetrics(req.user.companyId);

    res.json({
      success: true,
      data: metrics
    });

  } catch (error) {
    console.error('Error fetching impact metrics:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch impact metrics'
    });
  }
});

/**
 * GET /api/admin/employees
 * 
 * Get list of company employees
 * Query params: skip, take, includeInactive
 */
router.get('/employees', async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
    }

    const skip = parseInt(req.query.skip as string) || 0;
    const take = parseInt(req.query.take as string) || 50;
    const includeInactive = req.query.includeInactive === 'true';

    const result = await getCompanyEmployees(req.user.companyId, {
      skip,
      take,
      includeInactive
    });

    res.json({
      success: true,
      data: result
    });

  } catch (error) {
    console.error('Error fetching employees:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch employees'
    });
  }
});

export default router;
