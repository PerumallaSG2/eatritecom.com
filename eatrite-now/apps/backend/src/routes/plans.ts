import express, { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router: Router = express.Router();
const prisma = new PrismaClient();

// GET /api/plans - Get all active plans
router.get('/', async (req, res) => {
  try {
    const plans = await prisma.plan.findMany({
      where: { isActive: true },
      orderBy: { totalPriceCents: 'asc' }
    });

    res.json({ success: true, data: plans });
  } catch (error) {
    console.error('Error fetching plans:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch plans' });
  }
});

// GET /api/plans/:id - Get plan by ID
router.get('/:id', async (req, res) => {
  try {
    const plan = await prisma.plan.findUnique({
      where: { id: req.params.id }
    });

    if (!plan) {
      return res.status(404).json({ success: false, message: 'Plan not found' });
    }

    res.json({ success: true, data: plan });
  } catch (error) {
    console.error('Error fetching plan:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch plan' });
  }
});

export default router;
