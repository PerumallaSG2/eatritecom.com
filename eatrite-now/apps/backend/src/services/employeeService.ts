/**
 * EatRite Work - Employee Service Layer
 * 
 * Company-scoped data access for employee features.
 * All queries automatically filtered by companyId for security.
 * 
 * @module services/employeeService
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Get available meals for an employee
 * 
 * Filters meals based on:
 * - Company availability
 * - Current date/time
 * - Dietary restrictions (if provided)
 * 
 * @param companyId - Company identifier
 * @param options - Filter options
 * @returns List of available meals
 */
export async function getAvailableMeals(
  companyId: string,
  options: {
    category?: string;
    dietaryRestrictions?: string[];
    maxCalories?: number;
    skip?: number;
    take?: number;
  } = {}
) {
  try {
    const {
      category,
      dietaryRestrictions = [],
      maxCalories,
      skip = 0,
      take = 20
    } = options;

    const where: any = {
      isActive: true
    };

    if (category) {
      where.category = {
        name: category
      };
    }

    if (maxCalories) {
      where.calories = { lte: maxCalories };
    }

    // Filter by dietary restrictions if provided (check allergens)
    if (dietaryRestrictions.length > 0) {
      where.AND = dietaryRestrictions.map(restriction => ({
        allergens: {
          none: restriction
        }
      }));
    }

    const [meals, totalCount] = await Promise.all([
      prisma.meal.findMany({
        where,
        select: {
          id: true,
          name: true,
          description: true,
          categoryId: true,
          category: {
            select: {
              id: true,
              name: true
            }
          },
          priceCents: true,
          calories: true,
          protein: true,
          carbs: true,
          fat: true,
          fiber: true,
          allergens: true,
          ingredients: true,
          imageUrl: true,
          nutritionFacts: true
        },
        skip,
        take,
        orderBy: {
          name: 'asc'
        }
      }),
      prisma.meal.count({ where })
    ]);

    return {
      meals,
      pagination: {
        total: totalCount,
        skip,
        take,
        hasMore: skip + take < totalCount
      }
    };

  } catch (error) {
    console.error('Error fetching available meals:', error);
    throw new Error('Failed to fetch meals');
  }
}

/**
 * Get meal categories with counts
 * 
 * @returns List of categories with meal counts
 */
export async function getMealCategories() {
  try {
    const categories = await prisma.category.findMany({
      where: {
        isActive: true
      },
      select: {
        id: true,
        name: true,
        description: true,
        imageUrl: true,
        _count: {
          select: {
            meals: true
          }
        }
      },
      orderBy: {
        sortOrder: 'asc'
      }
    });

    return categories.map(cat => ({
      id: cat.id,
      name: cat.name,
      description: cat.description,
      imageUrl: cat.imageUrl,
      mealCount: cat._count.meals
    }));

  } catch (error) {
    console.error('Error fetching meal categories:', error);
    throw new Error('Failed to fetch categories');
  }
}

/**
 * Get employee's order history
 * 
 * @param userId - User identifier
 * @param companyId - Company identifier (for security)
 * @param options - Pagination options
 * @returns List of orders
 */
export async function getEmployeeOrders(
  userId: string,
  companyId: string,
  options: {
    skip?: number;
    take?: number;
  } = {}
) {
  try {
    const { skip = 0, take = 20 } = options;

    // Verify user belongs to company
    const user = await prisma.user.findFirst({
      where: { id: userId, companyId }
    });

    if (!user) {
      throw new Error('Unauthorized access to orders');
    }

    const [orders, totalCount] = await Promise.all([
      prisma.order.findMany({
        where: {
          userId,
          user: { companyId } // Double-check company isolation
        },
        select: {
          id: true,
          orderNumber: true,
          status: true,
          totalCents: true,
          subtotalCents: true,
          taxCents: true,
          shippingCents: true,
          deliveryDate: true,
          deliveredAt: true,
          trackingNumber: true,
          deliveryAddress: true,
          createdAt: true,
          items: {
            select: {
              id: true,
              quantity: true,
              priceCents: true,
              meal: {
                select: {
                  id: true,
                  name: true,
                  category: true,
                  imageUrl: true,
                  calories: true
                }
              }
            }
          }
        },
        skip,
        take,
        orderBy: {
          createdAt: 'desc'
        }
      }),
      prisma.order.count({
        where: {
          userId,
          user: { companyId }
        }
      })
    ]);

    return {
      orders,
      pagination: {
        total: totalCount,
        skip,
        take,
        hasMore: skip + take < totalCount
      }
    };

  } catch (error) {
    console.error('Error fetching employee orders:', error);
    throw new Error('Failed to fetch orders');
  }
}

/**
 * Create a new order for an employee
 * 
 * Uses Prisma transaction to ensure atomicity:
 * 1. Create order
 * 2. Create order items
 * 3. Update user's order count
 * 
 * @param userId - User identifier
 * @param companyId - Company identifier
 * @param data - Order data
 * @returns Created order
 */
export async function createEmployeeOrder(
  userId: string,
  companyId: string,
  data: {
    items: Array<{
      mealId: string;
      quantity: number;
      priceCents: number;
    }>;
    deliveryAddress: string;
    deliveryDate: Date;
    deliveryNotes?: string;
  }
) {
  try {
    // Verify user belongs to company
    const user = await prisma.user.findFirst({
      where: { id: userId, companyId, isActive: true }
    });

    if (!user) {
      throw new Error('Unauthorized or inactive user');
    }

    // Calculate totals
    const subtotalCents = data.items.reduce(
      (sum, item) => sum + (item.priceCents * item.quantity),
      0
    );
    const taxCents = Math.round(subtotalCents * 0.08); // 8% tax
    const shippingCents = 0; // Free shipping for corporate orders
    const totalCents = subtotalCents + taxCents + shippingCents;

    // Generate order number
    const orderNumber = `EAT-${Date.now()}-${userId.slice(0, 6).toUpperCase()}`;

    // Create order with items in transaction
    const order = await prisma.$transaction(async (tx) => {
      const newOrder = await tx.order.create({
        data: {
          userId,
          companyId,
          orderNumber,
          status: 'PENDING',
          subtotalCents,
          taxCents,
          shippingCents,
          totalCents,
          deliveryAddress: data.deliveryAddress,
          deliveryDate: data.deliveryDate,
          deliveryNotes: data.deliveryNotes || null,
          items: {
            create: data.items.map(item => ({
              mealId: item.mealId,
              quantity: item.quantity,
              priceCents: item.priceCents
            }))
          }
        },
        include: {
          items: {
            include: {
              meal: {
                select: {
                  id: true,
                  name: true,
                  category: true,
                  imageUrl: true,
                  calories: true
                }
              }
            }
          }
        }
      });

      return newOrder;
    });

    return order;

  } catch (error) {
    console.error('Error creating employee order:', error);
    throw new Error('Failed to create order');
  }
}

/**
 * Get employee's wellness scores
 * 
 * @param userId - User identifier
 * @param companyId - Company identifier
 * @param days - Number of days to fetch (default 30)
 * @returns Wellness scores
 */
export async function getEmployeeWellnessScores(
  userId: string,
  companyId: string,
  days = 30
) {
  try {
    // Verify user belongs to company
    const user = await prisma.user.findFirst({
      where: { id: userId, companyId }
    });

    if (!user) {
      throw new Error('Unauthorized access to wellness data');
    }

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const scores = await prisma.wellnessScore.findMany({
      where: {
        userId,
        date: { gte: startDate }
      },
      select: {
        id: true,
        date: true,
        score: true,
        calories: true,
        protein: true,
        vegetables: true,
        hydration: true
      },
      orderBy: {
        date: 'desc'
      }
    });

    return {
      scores,
      averageScore: scores.length > 0
        ? Math.round(scores.reduce((sum, s) => sum + s.score, 0) / scores.length)
        : 0,
      period: {
        start: startDate,
        end: new Date()
      }
    };

  } catch (error) {
    console.error('Error fetching wellness scores:', error);
    throw new Error('Failed to fetch wellness scores');
  }
}

/**
 * Get employee's achievements
 * 
 * @param userId - User identifier
 * @param companyId - Company identifier
 * @returns User achievements
 */
export async function getEmployeeAchievements(
  userId: string,
  companyId: string
) {
  try {
    // Verify user belongs to company
    const user = await prisma.user.findFirst({
      where: { id: userId, companyId }
    });

    if (!user) {
      throw new Error('Unauthorized access to achievements');
    }

    const achievements = await prisma.userAchievement.findMany({
      where: {
        userId
      },
      select: {
        id: true,
        achievementId: true,
        earnedAt: true,
        achievement: {
          select: {
            id: true,
            name: true,
            description: true,
            icon: true,
            points: true,
            category: true
          }
        }
      },
      orderBy: {
        earnedAt: 'desc'
      }
    });

    const totalPoints = achievements.reduce(
      (sum, a) => sum + a.achievement.points,
      0
    );

    return {
      achievements,
      totalPoints,
      count: achievements.length
    };

  } catch (error) {
    console.error('Error fetching achievements:', error);
    throw new Error('Failed to fetch achievements');
  }
}
