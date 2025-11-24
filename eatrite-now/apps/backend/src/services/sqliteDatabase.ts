/**
 * SQLite Database Service - Simple, Reliable Local Database
 * Replaces SQL Server for local development with zero configuration
 */

import Database from 'better-sqlite3'
import path from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import fs from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

class SQLiteService {
  private static instance: SQLiteService
  private db: Database.Database | null = null
  private dbPath: string

  private constructor() {
    // Create database directory if it doesn't exist
    const dbDir = path.join(__dirname, '../../database')
    if (!fs.existsSync(dbDir)) {
      fs.mkdirSync(dbDir, { recursive: true })
    }
    this.dbPath = path.join(dbDir, 'eatrite.db')
  }

  public static getInstance(): SQLiteService {
    if (!SQLiteService.instance) {
      SQLiteService.instance = new SQLiteService()
    }
    return SQLiteService.instance
  }

  /**
   * Connect to SQLite database
   */
  public async connect(): Promise<void> {
    try {
      console.log('🔌 Connecting to SQLite database...')
      
      this.db = new Database(this.dbPath)
      this.db.pragma('journal_mode = WAL')
      this.db.pragma('foreign_keys = ON')
      
      console.log('✅ SQLite database connected successfully')
      console.log(`📊 Database file: ${this.dbPath}`)
      
      // Initialize schema
      await this.initializeSchema()
      
    } catch (error) {
      console.error('❌ SQLite connection failed:', error)
      throw error
    }
  }

  /**
   * Get database instance
   */
  public getDB(): Database.Database {
    if (!this.db) {
      throw new Error('Database not connected. Call connect() first.')
    }
    return this.db
  }

  /**
   * Execute a query
   */
  public query(sql: string, params: any[] = []): any {
    try {
      const db = this.getDB()
      
      if (sql.trim().toUpperCase().startsWith('SELECT')) {
        return db.prepare(sql).all(params)
      } else {
        return db.prepare(sql).run(params)
      }
    } catch (error) {
      console.error('❌ SQLite query error:', error)
      throw error
    }
  }

  /**
   * Initialize database schema
   */
  private async initializeSchema(): Promise<void> {
    try {
      console.log('🏗️  Initializing SQLite schema...')

      const db = this.getDB()

      // Drop existing tables if they exist (for fresh start)
      const dropTables = [
        'DROP TABLE IF EXISTS order_meals',
        'DROP TABLE IF EXISTS orders',
        'DROP TABLE IF EXISTS user_subscriptions',
        'DROP TABLE IF EXISTS meal_nutrition',
        'DROP TABLE IF EXISTS meals',
        'DROP TABLE IF EXISTS categories',
        'DROP TABLE IF EXISTS plans',
        'DROP TABLE IF EXISTS users'
      ]

      for (const dropSQL of dropTables) {
        db.exec(dropSQL)
      }

      // Create tables
      const createTables = [
        // Users table
        `CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          email TEXT UNIQUE NOT NULL,
          password_hash TEXT NOT NULL,
          first_name TEXT,
          last_name TEXT,
          phone TEXT,
          date_of_birth DATE,
          gender TEXT,
          activity_level TEXT,
          dietary_preferences TEXT,
          allergies TEXT,
          health_goals TEXT,
          address TEXT,
          city TEXT,
          state TEXT,
          zip_code TEXT,
          country TEXT,
          is_verified BOOLEAN DEFAULT 0,
          is_active BOOLEAN DEFAULT 1,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`,

        // Categories table
        `CREATE TABLE IF NOT EXISTS categories (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          description TEXT,
          image_url TEXT,
          is_active BOOLEAN DEFAULT 1,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`,

        // Plans table
        `CREATE TABLE IF NOT EXISTS plans (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          description TEXT,
          price DECIMAL(10,2) NOT NULL,
          duration_days INTEGER NOT NULL,
          meals_per_week INTEGER NOT NULL,
          calories_per_day INTEGER,
          features TEXT,
          is_popular BOOLEAN DEFAULT 0,
          is_active BOOLEAN DEFAULT 1,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`,

        // Meals table
        `CREATE TABLE IF NOT EXISTS meals (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          category_id INTEGER,
          name TEXT NOT NULL,
          description TEXT,
          ingredients TEXT,
          preparation_time INTEGER,
          cooking_instructions TEXT,
          price DECIMAL(10,2) NOT NULL,
          image_url TEXT,
          chef_name TEXT,
          difficulty_level TEXT,
          meal_type TEXT,
          cuisine_type TEXT,
          is_vegetarian BOOLEAN DEFAULT 0,
          is_vegan BOOLEAN DEFAULT 0,
          is_gluten_free BOOLEAN DEFAULT 0,
          is_dairy_free BOOLEAN DEFAULT 0,
          is_available BOOLEAN DEFAULT 1,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (category_id) REFERENCES categories (id)
        )`,

        // Meal Nutrition table
        `CREATE TABLE IF NOT EXISTS meal_nutrition (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          meal_id INTEGER,
          calories INTEGER,
          protein DECIMAL(5,2),
          carbohydrates DECIMAL(5,2),
          fat DECIMAL(5,2),
          fiber DECIMAL(5,2),
          sugar DECIMAL(5,2),
          sodium DECIMAL(8,2),
          cholesterol DECIMAL(5,2),
          vitamin_a DECIMAL(5,2),
          vitamin_c DECIMAL(5,2),
          calcium DECIMAL(5,2),
          iron DECIMAL(5,2),
          FOREIGN KEY (meal_id) REFERENCES meals (id) ON DELETE CASCADE
        )`,

        // User Subscriptions table
        `CREATE TABLE IF NOT EXISTS user_subscriptions (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          user_id INTEGER,
          plan_id INTEGER,
          start_date DATE NOT NULL,
          end_date DATE,
          status TEXT DEFAULT 'active',
          payment_method TEXT,
          billing_cycle TEXT,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (user_id) REFERENCES users (id),
          FOREIGN KEY (plan_id) REFERENCES plans (id)
        )`,

        // Orders table
        `CREATE TABLE IF NOT EXISTS orders (
          id TEXT PRIMARY KEY,
          user_id INTEGER,
          user_email TEXT,
          first_name TEXT,
          last_name TEXT,
          phone TEXT,
          delivery_address TEXT,
          delivery_city TEXT,
          delivery_state TEXT,
          delivery_zip TEXT,
          order_number TEXT UNIQUE,
          status TEXT DEFAULT 'pending',
          total_amount DECIMAL(10,2) NOT NULL,
          subtotal DECIMAL(10,2) DEFAULT 0,
          delivery_fee DECIMAL(10,2) DEFAULT 0,
          tax DECIMAL(10,2) DEFAULT 0,
          discount_amount DECIMAL(10,2) DEFAULT 0,
          payment_method TEXT,
          payment_status TEXT DEFAULT 'pending',
          delivery_date DATE,
          special_instructions TEXT,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (user_id) REFERENCES users (id)
        )`,

        // Order Meals table
        `CREATE TABLE IF NOT EXISTS order_meals (
          id TEXT PRIMARY KEY,
          order_id TEXT,
          meal_id INTEGER,
          quantity INTEGER NOT NULL DEFAULT 1,
          price_at_time DECIMAL(10,2) NOT NULL,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (order_id) REFERENCES orders (id) ON DELETE CASCADE,
          FOREIGN KEY (meal_id) REFERENCES meals (id)
        )`
      ]

      for (const createSQL of createTables) {
        db.exec(createSQL)
      }

      // Insert seed data
      await this.insertSeedData()

      console.log('✅ SQLite schema initialized successfully')
      
    } catch (error) {
      console.error('❌ Error initializing SQLite schema:', error)
      throw error
    }
  }

  /**
   * Insert seed data
   */
  private async insertSeedData(): Promise<void> {
    const db = this.getDB()

    // Check if data already exists
    const existingCategories = db.prepare('SELECT COUNT(*) as count FROM categories').get() as { count: number }
    if (existingCategories.count > 0) {
      console.log('📊 Seed data already exists, skipping...')
      return
    }

    console.log('🌱 Inserting seed data...')

    // Insert categories
    const insertCategory = db.prepare(`
      INSERT INTO categories (name, description, image_url) 
      VALUES (?, ?, ?)
    `)

    const categories = [
      ['Breakfast', 'Nutritious morning meals to start your day right', '/images/categories/breakfast.jpg'],
      ['Lunch', 'Balanced midday meals for sustained energy', '/images/categories/lunch.jpg'],
      ['Dinner', 'Satisfying evening meals for optimal recovery', '/images/categories/dinner.jpg'],
      ['Snacks', 'Healthy snacks to keep you energized', '/images/categories/snacks.jpg'],
      ['Desserts', 'Guilt-free sweet treats', '/images/categories/desserts.jpg']
    ]

    for (const category of categories) {
      insertCategory.run(category)
    }

    // Insert plans
    const insertPlan = db.prepare(`
      INSERT INTO plans (name, description, price, duration_days, meals_per_week, calories_per_day, features, is_popular) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `)

    const plans = [
      ['Basic Plan', 'Perfect for beginners looking to start their health journey', 299.99, 30, 10, 1800, '10 meals per week, Basic nutrition tracking, Email support', 0],
      ['Premium Plan', 'Our most popular choice for serious health enthusiasts', 499.99, 30, 16, 2000, '16 meals per week, Advanced nutrition tracking, Priority support, Custom meal plans', 1],
      ['Elite Plan', 'Ultimate nutrition experience with personalized coaching', 799.99, 30, 21, 2200, '21 meals per week, 1-on-1 nutrition coaching, Priority delivery, Custom recipes', 0]
    ]

    for (const plan of plans) {
      insertPlan.run(plan)
    }

    // Insert meals
    const insertMeal = db.prepare(`
      INSERT INTO meals (category_id, name, description, ingredients, preparation_time, price, chef_name, difficulty_level, meal_type, cuisine_type, is_vegetarian, is_vegan, is_gluten_free) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `)

    const meals = [
      [1, 'Avocado Toast Deluxe', 'Creamy avocado on artisan sourdough with poached egg', 'Sourdough bread, avocado, free-range egg, cherry tomatoes, microgreens, olive oil', 15, 12.99, 'Chef Maria', 'Easy', 'Breakfast', 'Modern', 1, 0, 0],
      [1, 'Protein Power Bowl', 'Greek yogurt with berries, granola, and almond butter', 'Greek yogurt, mixed berries, granola, almond butter, chia seeds, honey', 5, 9.99, 'Chef David', 'Easy', 'Breakfast', 'Health', 1, 0, 1],
      [2, 'Grilled Salmon Salad', 'Fresh Atlantic salmon over mixed greens with quinoa', 'Atlantic salmon, mixed greens, quinoa, cucumber, cherry tomatoes, lemon vinaigrette', 25, 18.99, 'Chef Sarah', 'Medium', 'Lunch', 'Mediterranean', 0, 0, 1],
      [2, 'Buddha Bowl Supreme', 'Nutrient-packed bowl with roasted vegetables and tahini', 'Roasted sweet potato, chickpeas, kale, quinoa, tahini dressing, pumpkin seeds', 30, 15.99, 'Chef Alex', 'Medium', 'Lunch', 'Vegan', 1, 1, 1],
      [3, 'Herb-Crusted Chicken', 'Organic chicken breast with roasted vegetables', 'Organic chicken breast, herb crust, roasted vegetables, sweet potato mash', 35, 22.99, 'Chef Michael', 'Medium', 'Dinner', 'American', 0, 0, 1]
    ]

    for (const meal of meals) {
      insertMeal.run(meal)
    }

    // Insert nutrition data
    const insertNutrition = db.prepare(`
      INSERT INTO meal_nutrition (meal_id, calories, protein, carbohydrates, fat, fiber, sugar, sodium) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `)

    const nutrition = [
      [1, 420, 18.5, 35.2, 22.1, 8.5, 4.2, 320],
      [2, 380, 25.0, 40.5, 15.2, 6.8, 18.5, 125],
      [3, 520, 35.8, 25.4, 28.2, 9.2, 8.1, 450],
      [4, 480, 18.2, 55.8, 20.1, 12.5, 12.2, 280],
      [5, 580, 42.5, 35.2, 22.8, 6.5, 5.8, 380]
    ]

    for (const nutri of nutrition) {
      insertNutrition.run(nutri)
    }

    console.log('✅ Seed data inserted successfully')
  }

  /**
   * Close database connection
   */
  public async disconnect(): Promise<void> {
    try {
      if (this.db) {
        this.db.close()
        this.db = null
        console.log('🔌 SQLite database disconnected')
      }
    } catch (error) {
      console.error('❌ Error disconnecting SQLite:', error)
    }
  }

  /**
   * Get meals with optional filters
   */
  public getMeals(filters: { category?: string; limit?: number; search?: string } = {}) {
    const db = this.getDB()
    
    let sql = `
      SELECT m.*, c.name as category_name,
             mn.calories, mn.protein, mn.carbohydrates, mn.fat
      FROM meals m
      LEFT JOIN categories c ON m.category_id = c.id
      LEFT JOIN meal_nutrition mn ON m.id = mn.meal_id
      WHERE m.is_available = 1
    `
    
    const params: any[] = []
    
    if (filters.category) {
      sql += ` AND c.name = ?`
      params.push(filters.category)
    }
    
    if (filters.search) {
      sql += ` AND (m.name LIKE ? OR m.description LIKE ?)`
      params.push(`%${filters.search}%`, `%${filters.search}%`)
    }
    
    sql += ` ORDER BY m.name`
    
    if (filters.limit) {
      sql += ` LIMIT ?`
      params.push(filters.limit)
    }
    
    return db.prepare(sql).all(params)
  }

  /**
   * Get meal by ID
   */
  public getMealById(id: number) {
    const db = this.getDB()
    
    const sql = `
      SELECT m.*, c.name as category_name,
             mn.calories, mn.protein, mn.carbohydrates, mn.fat, mn.fiber, mn.sugar, mn.sodium
      FROM meals m
      LEFT JOIN categories c ON m.category_id = c.id
      LEFT JOIN meal_nutrition mn ON m.id = mn.meal_id
      WHERE m.id = ?
    `
    
    return db.prepare(sql).get(id)
  }

  /**
   * Get categories
   */
  public getCategories() {
    const db = this.getDB()
    return db.prepare('SELECT * FROM categories WHERE is_active = 1 ORDER BY name').all()
  }

  /**
   * Get plans
   */
  public getPlans() {
    const db = this.getDB()
    return db.prepare('SELECT * FROM plans WHERE is_active = 1 ORDER BY price').all()
  }

  /**
   * Get plan by ID
   */
  public getPlanById(id: number) {
    const db = this.getDB()
    return db.prepare('SELECT * FROM plans WHERE id = ? AND is_active = 1').get(id)
  }

  /**
   * Create user
   */
  public createUser(userData: any) {
    const db = this.getDB()
    
    const sql = `
      INSERT INTO users (email, password_hash, first_name, last_name, phone, is_verified)
      VALUES (?, ?, ?, ?, ?, ?)
    `
    
    return db.prepare(sql).run([
      userData.email,
      userData.password_hash,
      userData.first_name || null,
      userData.last_name || null,
      userData.phone || null,
      userData.is_verified || 0
    ])
  }

  /**
   * Find user by email
   */
  public findUserByEmail(email: string) {
    const db = this.getDB()
    return db.prepare('SELECT * FROM users WHERE email = ?').get(email)
  }

  /**
   * Create order
   */
  public createOrder(orderData: any) {
    const db = this.getDB()
    
    const sql = `
      INSERT INTO orders (
        id, user_email, first_name, last_name, phone, delivery_address,
        delivery_city, delivery_state, delivery_zip, order_number, status,
        total_amount, subtotal, delivery_fee, tax, payment_method, payment_status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `
    
    return db.prepare(sql).run([
      orderData.id,
      orderData.user_email,
      orderData.first_name,
      orderData.last_name,
      orderData.phone,
      orderData.delivery_address,
      orderData.delivery_city,
      orderData.delivery_state,
      orderData.delivery_zip,
      orderData.order_number,
      orderData.status,
      orderData.total_amount,
      orderData.subtotal,
      orderData.delivery_fee,
      orderData.tax,
      orderData.payment_method,
      orderData.payment_status
    ])
  }
}

// Export singleton instance
export const sqliteDB = SQLiteService.getInstance()

// Compatibility functions
export const initializeDatabase = async () => {
  await sqliteDB.connect()
}

export const closeDatabase = () => sqliteDB.disconnect()

export default SQLiteService