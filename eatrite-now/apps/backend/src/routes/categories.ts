import express, { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router: Router = express.Router();
const prisma = new PrismaClient();

// GET /api/categories - Get all active categories
router.get('/', async (req, res) => {
  try {
    const categories = await prisma.category.findMany({
      where: { isActive: true },
      select: {
        id: true,
        name: true,
        description: true,
        imageUrl: true,
        sortOrder: true,
        _count: { select: { meals: true } }
      },
      orderBy: { sortOrder: 'asc' }
    });

    res.json({ success: true, data: categories, total: categories.length });
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch categories' });
  }
});

export default router;
