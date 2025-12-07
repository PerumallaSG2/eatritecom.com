import express, { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router: Router = express.Router();
const prisma = new PrismaClient();

// GET /api/meals - Get all meals
router.get('/', async (req, res) => {
  try {
    const { category, limit, search } = req.query;
    const where: any = { isActive: true };

    if (category) {
      where.category = { name: category as string };
    }

    if (search) {
      where.OR = [
        { name: { contains: search as string, mode: 'insensitive' } },
        { description: { contains: search as string, mode: 'insensitive' } }
      ];
    }

    const take = limit ? parseInt(limit as string) : undefined;

    const meals = await prisma.meal.findMany({
      where,
      include: { category: { select: { id: true, name: true, description: true } } },
      take,
      orderBy: { name: 'asc' }
    });

    return res.json({ success: true, data: meals, total: meals.length });
  } catch (error) {
    console.error('Error fetching meals:', error);
    return res.status(500).json({ success: false, message: 'Failed to fetch meals' });
  }
});

// GET /api/meals/:id - Get meal by ID
router.get('/:id', async (req, res) => {
  try {
    const meal = await prisma.meal.findUnique({
      where: { id: req.params.id },
      include: { category: true }
    });

    if (!meal) {
      return res.status(404).json({ success: false, message: 'Meal not found' });
    }

    return res.json({ success: true, data: meal });
  } catch (error) {
    console.error('Error fetching meal:', error);
    return res.status(500).json({ success: false, message: 'Failed to fetch meal' });
  }
});

export default router;
