import { getPool } from './database';
import sql from 'mssql';

/**
 * Data Access Service implementing Read/Write Separation Pattern
 * - READ operations from catalog tables (source of truth for display)
 * - WRITE operations to user interaction tables (transactions, preferences)
 */
export class DataAccessService {
  
  // ==================== READ OPERATIONS (from catalog tables) ====================
  
  /**
   * Get meals for display (from catalog_meals)
   */
  async getCatalogMeals(filters: { popular?: boolean; limit?: number; category?: string } = {}) {
    try {
      const pool = getPool();
      let query = `
        SELECT m.*, c.name as category_name 
        FROM meals m
        LEFT JOIN meal_categories c ON m.category_id = c.id
        WHERE 1=1
      `;
      
      const params: any[] = [];
      
      if (filters.popular) {
        query += ` AND m.is_popular = 1`;
      }
      
      if (filters.category) {
        query += ` AND c.name = @category`;
        params.push({ name: 'category', type: sql.NVarChar, value: filters.category });
      }
      
      query += ` ORDER BY m.name`;
      
      if (filters.limit) {
        query += ` OFFSET 0 ROWS FETCH NEXT @limit ROWS ONLY`;
        params.push({ name: 'limit', type: sql.Int, value: filters.limit });
      }
      
      const request = pool.request();
      params.forEach(param => {
        request.input(param.name, param.type, param.value);
      });
      
      const result = await request.query(query);
      
      // Remove duplicates based on name and price
      const uniqueMeals = result.recordset.reduce((acc: any[], current: any) => {
        const existingMeal = acc.find(meal => 
          meal.name?.trim().toLowerCase() === current.name?.trim().toLowerCase() &&
          Math.abs((meal.price || 0) - (current.price || 0)) < 0.01
        );
        if (!existingMeal) {
          acc.push(current);
        }
        return acc;
      }, []);
      
      return uniqueMeals;
    } catch (error) {
      console.error('Error fetching catalog meals:', error);
      throw error;
    }
  }

  /**
   * Get categories for display (from catalog_categories)
   */
  async getCatalogCategories() {
    try {
      const pool = getPool();
      const result = await pool.request().query(`
        SELECT * FROM meal_categories 
        ORDER BY sort_order, name
      `);
      
      // Remove duplicates based on name
      const uniqueCategories = result.recordset.reduce((acc: any[], current: any) => {
        const existingCategory = acc.find(category => 
          category.name?.trim().toLowerCase() === current.name?.trim().toLowerCase()
        );
        if (!existingCategory) {
          acc.push(current);
        }
        return acc;
      }, []);
      
      return uniqueCategories;
    } catch (error) {
      console.error('Error fetching catalog categories:', error);
      throw error;
    }
  }

  /**
   * Get plans for display (from catalog_plans)
   */
  async getCatalogPlans() {
    try {
      const pool = getPool();
      const result = await pool.request().query(`
        SELECT * FROM meal_plans 
        ORDER BY total_weekly_price
      `);
      
      // Remove duplicates based on name and meals_per_week
      const uniquePlans = result.recordset.reduce((acc: any[], current: any) => {
        const existingPlan = acc.find(plan => 
          plan.name?.trim().toLowerCase() === current.name?.trim().toLowerCase() &&
          plan.meals_per_week === current.meals_per_week
        );
        if (!existingPlan) {
          acc.push(current);
        }
        return acc;
      }, []);
      
      return uniquePlans;
    } catch (error) {
      console.error('Error fetching catalog plans:', error);
      throw error;
    }
  }

  // ==================== WRITE OPERATIONS (to user interaction tables) ====================

  /**
   * Save user meal selection (to user_meal_selections)
   */
  async saveUserMealSelection(data: {
    userId?: string;
    mealId: string;
    quantity: number;
    selectedDate?: string;
  }) {
    try {
      const pool = getPool();
      const result = await pool.request()
        .input('userId', sql.NVarChar, data.userId || null)
        .input('mealId', sql.NVarChar, data.mealId)
        .input('quantity', sql.Int, data.quantity)
        .input('selectedDate', sql.Date, data.selectedDate || new Date())
        .query(`
          INSERT INTO user_meal_selections (user_id, meal_id, quantity, selected_date)
          OUTPUT INSERTED.id
          VALUES (@userId, @mealId, @quantity, @selectedDate)
        `);
      
      return { success: true, id: result.recordset[0].id };
    } catch (error) {
      console.error('Error saving user meal selection:', error);
      throw error;
    }
  }

  /**
   * Save user plan subscription (to user_plan_subscriptions)
   */
  async saveUserPlanSubscription(data: {
    userId?: string;
    planId: string;
    startDate?: string;
    endDate?: string;
  }) {
    try {
      const pool = getPool();
      const result = await pool.request()
        .input('userId', sql.NVarChar, data.userId || null)
        .input('planId', sql.NVarChar, data.planId)
        .input('startDate', sql.Date, data.startDate || new Date())
        .input('endDate', sql.Date, data.endDate || null)
        .query(`
          INSERT INTO user_plan_subscriptions (user_id, plan_id, start_date, end_date)
          OUTPUT INSERTED.id
          VALUES (@userId, @planId, @startDate, @endDate)
        `);
      
      return { success: true, id: result.recordset[0].id };
    } catch (error) {
      console.error('Error saving user plan subscription:', error);
      throw error;
    }
  }

  /**
   * Save user quiz response (to user_quiz_responses)
   */
  async saveUserQuizResponse(data: any) {
    try {
      const pool = getPool();
      const sessionId = `QUIZ_${Date.now()}_${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
      
      const result = await pool.request()
        .input('userId', sql.NVarChar, data.userId || null)
        .input('sessionId', sql.NVarChar, sessionId)
        .input('age', sql.Int, data.age || null)
        .input('gender', sql.NVarChar, data.gender || null)
        .input('height', sql.Float, data.height || null)
        .input('weight', sql.Float, data.weight || null)
        .input('activityLevel', sql.NVarChar, data.activityLevel || null)
        .input('healthGoals', sql.NVarChar, data.healthGoals || null)
        .input('dietaryRestrictions', sql.NVarChar, data.dietaryRestrictions || null)
        .input('allergies', sql.NVarChar, data.allergies || null)
        .input('mealsPerDay', sql.Int, data.mealsPerDay || 3)
        .input('weeklyBudget', sql.NVarChar, data.weeklyBudget || null)
        .query(`
          INSERT INTO user_quiz_responses (
            user_id, session_id, age, gender, height, weight, 
            activity_level, health_goals, dietary_restrictions, 
            allergies, meals_per_day, weekly_budget
          )
          OUTPUT INSERTED.id, INSERTED.session_id
          VALUES (
            @userId, @sessionId, @age, @gender, @height, @weight,
            @activityLevel, @healthGoals, @dietaryRestrictions,
            @allergies, @mealsPerDay, @weeklyBudget
          )
        `);
      
      return { 
        success: true, 
        id: result.recordset[0].id,
        sessionId: result.recordset[0].session_id 
      };
    } catch (error) {
      console.error('Error saving user quiz response:', error);
      throw error;
    }
  }

  /**
   * Save user contact message (to user_contact_messages)
   */
  async saveUserContactMessage(data: {
    userId?: string;
    name: string;
    email: string;
    subject?: string;
    message: string;
  }) {
    try {
      const pool = getPool();
      const result = await pool.request()
        .input('userId', sql.NVarChar, data.userId || null)
        .input('name', sql.NVarChar, data.name)
        .input('email', sql.NVarChar, data.email)
        .input('subject', sql.NVarChar, data.subject || null)
        .input('message', sql.NVarChar, data.message)
        .query(`
          INSERT INTO user_contact_messages (user_id, name, email, subject, message)
          OUTPUT INSERTED.id
          VALUES (@userId, @name, @email, @subject, @message)
        `);
      
      return { success: true, id: result.recordset[0].id };
    } catch (error) {
      console.error('Error saving user contact message:', error);
      throw error;
    }
  }

  // ==================== ANALYTICS / REPORTING ====================

  /**
   * Get user interaction statistics
   */
  async getUserInteractionStats() {
    try {
      const pool = getPool();
      const result = await pool.request().query(`
        SELECT 
          (SELECT COUNT(*) FROM user_meal_selections) as total_meal_selections,
          (SELECT COUNT(*) FROM user_plan_subscriptions) as total_subscriptions,
          (SELECT COUNT(*) FROM user_quiz_responses) as total_quiz_responses,
          (SELECT COUNT(*) FROM user_contact_messages) as total_messages
      `);
      return result.recordset[0];
    } catch (error) {
      console.error('Error fetching user interaction stats:', error);
      throw error;
    }
  }
}

export const dataAccessService = new DataAccessService();