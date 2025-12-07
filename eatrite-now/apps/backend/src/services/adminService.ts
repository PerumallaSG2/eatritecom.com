/**
 * EatRite Work - Admin Service Layer
 * 
 * Company-scoped data access for admin dashboards.
 * All queries automatically filtered by companyId for security.
 * 
 * @module services/adminService
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Get admin dashboard statistics for a company
 * 
 * Returns real-time metrics:
 * - Total active employees
 * - Active orders this month
 * - Total revenue this month
 * - Average order value
 * 
 * @param companyId - Company identifier
 * @returns Dashboard statistics
 */
export async function getAdminDashboardStats(companyId: string) {
  try {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    // Get total active employees
    const totalEmployees = await prisma.user.count({
      where: {
        companyId,
        isActive: true,
        deletedAt: null
      }
    });

    // Get active orders this month
    const activeOrdersCount = await prisma.order.count({
      where: {
        user: { companyId },
        createdAt: { gte: startOfMonth },
        status: { in: ['PENDING', 'CONFIRMED', 'PREPARING'] }
      }
    });

    // Get total revenue this month (in cents)
    const revenueData = await prisma.order.aggregate({
      where: {
        user: { companyId },
        createdAt: { gte: startOfMonth },
        status: 'DELIVERED'
      },
      _sum: {
        totalCents: true
      }
    });

    const totalRevenueCents = revenueData._sum?.totalCents || 0;

    // Get average order value
    const avgOrderValue = await prisma.order.aggregate({
      where: {
        user: { companyId },
        createdAt: { gte: startOfMonth }
      },
      _avg: {
        totalCents: true
      }
    });

    const avgOrderValueCents = avgOrderValue._avg?.totalCents || 0;

    return {
      totalEmployees,
      activeOrders: activeOrdersCount,
      totalRevenueCents,
      avgOrderValueCents,
      period: {
        start: startOfMonth,
        end: now
      }
    };

  } catch (error) {
    console.error('Error fetching admin dashboard stats:', error);
    throw new Error('Failed to fetch dashboard statistics');
  }
}

/**
 * Get order analytics for a company
 * 
 * Returns:
 * - Order trends (daily/weekly/monthly)
 * - Popular meals
 * - Employee engagement metrics
 * 
 * @param companyId - Company identifier
 * @param days - Number of days to analyze (default 30)
 * @returns Analytics data
 */
export async function getOrderAnalytics(companyId: string, days = 30) {
  try {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    // Get order trends by day
    const orders = await prisma.order.findMany({
      where: {
        user: { companyId },
        createdAt: { gte: startDate }
      },
      select: {
        id: true,
        createdAt: true,
        totalCents: true,
        status: true
      },
      orderBy: {
        createdAt: 'asc'
      }
    });

    // Group by date
    const ordersByDate = orders.reduce((acc, order) => {
      const dateKey = order.createdAt.toISOString().split('T')[0];
      if (!dateKey) return acc;
      
      if (!acc[dateKey]) {
        acc[dateKey] = { count: 0, totalCents: 0 };
      }
      acc[dateKey]!.count++;
      acc[dateKey]!.totalCents += order.totalCents;
      return acc;
    }, {} as Record<string, { count: number; totalCents: number }>);

    // Get popular meals
    const popularMeals = await prisma.orderItem.groupBy({
      by: ['mealId'],
      where: {
        order: {
          user: { companyId },
          createdAt: { gte: startDate }
        }
      },
      _sum: {
        quantity: true
      },
      _count: {
        mealId: true
      },
      orderBy: {
        _sum: {
          quantity: 'desc'
        }
      },
      take: 10
    });

    // Enrich with meal details
    const popularMealsWithDetails = await Promise.all(
      popularMeals.map(async (item) => {
        const meal = await prisma.meal.findUnique({
          where: { id: item.mealId },
          select: {
            id: true,
            name: true,
            category: true,
            priceCents: true,
            imageUrl: true
          }
        });
        return {
          meal,
          totalOrders: item._sum.quantity || 0,
          orderCount: item._count.mealId
        };
      })
    );

    // Get employee engagement (unique users who ordered)
    const activeEmployees = await prisma.order.groupBy({
      by: ['userId'],
      where: {
        user: { companyId },
        createdAt: { gte: startDate }
      },
      _count: {
        userId: true
      }
    });

    return {
      orderTrends: ordersByDate,
      popularMeals: popularMealsWithDetails,
      activeEmployeeCount: activeEmployees.length,
      totalOrders: orders.length,
      period: {
        start: startDate,
        end: new Date()
      }
    };

  } catch (error) {
    console.error('Error fetching order analytics:', error);
    throw new Error('Failed to fetch order analytics');
  }
}

/**
 * Get company impact metrics
 * 
 * Returns wellness and sustainability metrics:
 * - Average wellness scores
 * - Healthy meal choices
 * - Carbon footprint reduction
 * 
 * @param companyId - Company identifier
 * @returns Impact metrics
 */
export async function getCompanyImpactMetrics(companyId: string) {
  try {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    // Get average wellness scores
    const wellnessScores = await prisma.wellnessScore.findMany({
      where: {
        user: { companyId },
        date: { gte: startOfMonth }
      },
      select: {
        score: true,
        calories: true,
        protein: true,
        vegetables: true,
        hydration: true
      }
    });

    const avgWellnessScore = wellnessScores.length > 0
      ? wellnessScores.reduce((sum, s) => sum + s.score, 0) / wellnessScores.length
      : 0;

    const avgCalories = wellnessScores.length > 0
      ? wellnessScores.reduce((sum, s) => sum + (s.calories || 0), 0) / wellnessScores.length
      : 0;

    const avgProtein = wellnessScores.length > 0
      ? wellnessScores.reduce((sum, s) => sum + (s.protein || 0), 0) / wellnessScores.length
      : 0;

    // Get healthy meal choices (calories < 600)
    const healthyMealCount = await prisma.orderItem.count({
      where: {
        order: {
          user: { companyId },
          createdAt: { gte: startOfMonth }
        },
        meal: {
          calories: { lt: 600 }
        }
      }
    });

    // Get total achievements earned
    const achievementsCount = await prisma.userAchievement.count({
      where: {
        user: { companyId },
        earnedAt: { gte: startOfMonth }
      }
    });

    // Get total meals ordered this month
    const totalMealsOrdered = await prisma.orderItem.aggregate({
      where: {
        order: {
          user: { companyId },
          createdAt: { gte: startOfMonth }
        }
      },
      _sum: {
        quantity: true
      }
    });

    const mealsOrdered = totalMealsOrdered._sum.quantity || 0;

    return {
      wellness: {
        averageScore: Math.round(avgWellnessScore),
        caloriesAvg: Math.round(avgCalories),
        proteinAvg: Math.round(avgProtein),
        participants: wellnessScores.length
      },
      healthyChoices: {
        count: healthyMealCount,
        percentage: mealsOrdered > 0 ? Math.round((healthyMealCount / mealsOrdered) * 100) : 0
      },
      achievements: {
        totalEarned: achievementsCount
      },
      totalMealsOrdered: mealsOrdered,
      period: {
        start: startOfMonth,
        end: now
      }
    };

  } catch (error) {
    console.error('Error fetching company impact metrics:', error);
    throw new Error('Failed to fetch impact metrics');
  }
}

/**
 * Get employee list for a company
 * 
 * @param companyId - Company identifier
 * @param options - Pagination and filter options
 * @returns List of employees
 */
export async function getCompanyEmployees(
  companyId: string,
  options: {
    skip?: number;
    take?: number;
    includeInactive?: boolean;
  } = {}
) {
  try {
    const { skip = 0, take = 50, includeInactive = false } = options;

    const where = {
      companyId,
      deletedAt: null,
      ...(includeInactive ? {} : { isActive: true })
    };

    const [employees, totalCount] = await Promise.all([
      prisma.user.findMany({
        where,
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          role: true,
          isActive: true,
          lastLogin: true,
          createdAt: true
        },
        skip,
        take,
        orderBy: {
          createdAt: 'desc'
        }
      }),
      prisma.user.count({ where })
    ]);

    return {
      employees,
      pagination: {
        total: totalCount,
        skip,
        take,
        hasMore: skip + take < totalCount
      }
    };

  } catch (error) {
    console.error('Error fetching company employees:', error);
    throw new Error('Failed to fetch employees');
  }
}
