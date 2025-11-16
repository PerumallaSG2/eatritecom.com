/**
 * EatRite Database Service - SQL Server Connection
 * Handles all database operations and connection management
 */

import sql from 'mssql';
import dotenv from 'dotenv';

dotenv.config();

// Database configuration
const dbConfig: sql.config = {
  server: process.env.DB_SERVER || 'localhost',
  port: parseInt(process.env.DB_PORT || '1433'),
  database: process.env.DB_NAME || 'EATRITE',
  user: process.env.DB_USER || 'SA',
  password: process.env.DB_PASSWORD || '',
  options: {
    encrypt: process.env.DB_ENCRYPT === 'true',
    trustServerCertificate: process.env.DB_TRUST_CERTIFICATE === 'true',
    enableArithAbort: true,
    connectTimeout: 60000,
    requestTimeout: 60000,
  },
  pool: {
    max: 20,
    min: 5,
    idleTimeoutMillis: 30000,
  },
};

class DatabaseService {
  private static instance: DatabaseService;
  private pool: sql.ConnectionPool | null = null;
  private isConnecting = false;

  private constructor() {}

  public static getInstance(): DatabaseService {
    if (!DatabaseService.instance) {
      DatabaseService.instance = new DatabaseService();
    }
    return DatabaseService.instance;
  }

  /**
   * Initialize database connection
   */
  public async connect(): Promise<void> {
    if (this.pool?.connected) {
      return;
    }

    if (this.isConnecting) {
      // Wait for existing connection attempt
      while (this.isConnecting) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      return;
    }

    try {
      this.isConnecting = true;
      console.log('🔌 Connecting to SQL Server database...');
      
      this.pool = new sql.ConnectionPool(dbConfig);
      await this.pool.connect();
      
      console.log('✅ Database connected successfully');
      console.log(`📊 Database: ${dbConfig.database} on ${dbConfig.server}:${dbConfig.port}`);
    } catch (error) {
      console.error('❌ Database connection failed:', error);
      throw error;
    } finally {
      this.isConnecting = false;
    }
  }

  /**
   * Get database connection pool
   */
  public getPool(): sql.ConnectionPool {
    if (!this.pool?.connected) {
      throw new Error('Database not connected. Call connect() first.');
    }
    return this.pool;
  }

  /**
   * Execute a query with parameters
   */
  public async query(query: string, params?: any): Promise<sql.IResult<any>> {
    try {
      const pool = this.getPool();
      const request = pool.request();
      
      // Add parameters if provided
      if (params) {
        Object.keys(params).forEach(key => {
          request.input(key, params[key]);
        });
      }
      
      return await request.query(query);
    } catch (error) {
      console.error('❌ Database query error:', error);
      throw error;
    }
  }

  /**
   * Execute a stored procedure
   */
  public async executeProcedure(procedureName: string, params?: any): Promise<sql.IResult<any>> {
    try {
      const pool = this.getPool();
      const request = pool.request();
      
      // Add parameters if provided
      if (params) {
        Object.keys(params).forEach(key => {
          request.input(key, params[key]);
        });
      }
      
      return await request.execute(procedureName);
    } catch (error) {
      console.error('❌ Stored procedure execution error:', error);
      throw error;
    }
  }

  /**
   * Close database connection
   */
  public async disconnect(): Promise<void> {
    try {
      if (this.pool) {
        await this.pool.close();
        this.pool = null;
        console.log('🔌 Database disconnected');
      }
    } catch (error) {
      console.error('❌ Error disconnecting from database:', error);
    }
  }

  /**
   * Initialize database schema
   */
  public async initializeSchema(): Promise<void> {
    try {
      console.log('🏗️  Initializing database schema...');
      
      // Drop existing tables if they exist
      const dropQueries = [
        'IF OBJECT_ID(\'OrderItems\', \'U\') IS NOT NULL DROP TABLE OrderItems',
        'IF OBJECT_ID(\'Orders\', \'U\') IS NOT NULL DROP TABLE Orders',
        'IF OBJECT_ID(\'UserSubscriptions\', \'U\') IS NOT NULL DROP TABLE UserSubscriptions',
        'IF OBJECT_ID(\'MealNutrition\', \'U\') IS NOT NULL DROP TABLE MealNutrition',
        'IF OBJECT_ID(\'Meals\', \'U\') IS NOT NULL DROP TABLE Meals',
        'IF OBJECT_ID(\'Categories\', \'U\') IS NOT NULL DROP TABLE Categories',
        'IF OBJECT_ID(\'Plans\', \'U\') IS NOT NULL DROP TABLE Plans',
        'IF OBJECT_ID(\'Users\', \'U\') IS NOT NULL DROP TABLE Users',
      ];

      for (const dropQuery of dropQueries) {
        await this.query(dropQuery);
      }

      // Create tables
      await this.createTables();
      
      // Insert seed data
      await this.insertSeedData();
      
      console.log('✅ Database schema initialized successfully');
    } catch (error) {
      console.error('❌ Error initializing database schema:', error);
      throw error;
    }
  }

  /**
   * Create database tables
   */
  private async createTables(): Promise<void> {
    const queries = [
      // Users table
      `CREATE TABLE Users (
        id INT IDENTITY(1,1) PRIMARY KEY,
        email NVARCHAR(255) UNIQUE NOT NULL,
        password_hash NVARCHAR(255) NOT NULL,
        first_name NVARCHAR(100),
        last_name NVARCHAR(100),
        phone NVARCHAR(20),
        date_of_birth DATE,
        gender NVARCHAR(10),
        activity_level NVARCHAR(20),
        dietary_preferences NVARCHAR(MAX),
        allergies NVARCHAR(MAX),
        health_goals NVARCHAR(MAX),
        address NVARCHAR(MAX),
        city NVARCHAR(100),
        state NVARCHAR(50),
        zip_code NVARCHAR(20),
        country NVARCHAR(50),
        is_verified BIT DEFAULT 0,
        is_active BIT DEFAULT 1,
        created_at DATETIME2 DEFAULT GETDATE(),
        updated_at DATETIME2 DEFAULT GETDATE()
      )`,

      // Categories table
      `CREATE TABLE Categories (
        id INT IDENTITY(1,1) PRIMARY KEY,
        name NVARCHAR(100) NOT NULL,
        description NVARCHAR(MAX),
        image_url NVARCHAR(500),
        is_active BIT DEFAULT 1,
        created_at DATETIME2 DEFAULT GETDATE()
      )`,

      // Plans table
      `CREATE TABLE Plans (
        id INT IDENTITY(1,1) PRIMARY KEY,
        name NVARCHAR(100) NOT NULL,
        description NVARCHAR(MAX),
        price DECIMAL(10,2) NOT NULL,
        duration_days INT NOT NULL,
        meals_per_week INT NOT NULL,
        calories_per_day INT,
        features NVARCHAR(MAX),
        is_popular BIT DEFAULT 0,
        is_active BIT DEFAULT 1,
        created_at DATETIME2 DEFAULT GETDATE()
      )`,

      // Meals table
      `CREATE TABLE Meals (
        id INT IDENTITY(1,1) PRIMARY KEY,
        category_id INT FOREIGN KEY REFERENCES Categories(id),
        name NVARCHAR(200) NOT NULL,
        description NVARCHAR(MAX),
        ingredients NVARCHAR(MAX),
        preparation_time INT,
        cooking_instructions NVARCHAR(MAX),
        price DECIMAL(10,2) NOT NULL,
        image_url NVARCHAR(500),
        chef_name NVARCHAR(100),
        difficulty_level NVARCHAR(20),
        meal_type NVARCHAR(50),
        cuisine_type NVARCHAR(50),
        is_vegetarian BIT DEFAULT 0,
        is_vegan BIT DEFAULT 0,
        is_gluten_free BIT DEFAULT 0,
        is_dairy_free BIT DEFAULT 0,
        is_available BIT DEFAULT 1,
        created_at DATETIME2 DEFAULT GETDATE(),
        updated_at DATETIME2 DEFAULT GETDATE()
      )`,

      // Meal Nutrition table
      `CREATE TABLE MealNutrition (
        id INT IDENTITY(1,1) PRIMARY KEY,
        meal_id INT FOREIGN KEY REFERENCES Meals(id) ON DELETE CASCADE,
        calories INT,
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
        iron DECIMAL(5,2)
      )`,

      // User Subscriptions table
      `CREATE TABLE UserSubscriptions (
        id INT IDENTITY(1,1) PRIMARY KEY,
        user_id INT FOREIGN KEY REFERENCES Users(id),
        plan_id INT FOREIGN KEY REFERENCES Plans(id),
        start_date DATE NOT NULL,
        end_date DATE,
        status NVARCHAR(20) DEFAULT 'active',
        payment_method NVARCHAR(50),
        billing_cycle NVARCHAR(20),
        created_at DATETIME2 DEFAULT GETDATE()
      )`,

      // Orders table
      `CREATE TABLE Orders (
        id INT IDENTITY(1,1) PRIMARY KEY,
        user_id INT FOREIGN KEY REFERENCES Users(id),
        order_number NVARCHAR(50) UNIQUE NOT NULL,
        status NVARCHAR(20) DEFAULT 'pending',
        total_amount DECIMAL(10,2) NOT NULL,
        tax_amount DECIMAL(10,2) DEFAULT 0,
        shipping_fee DECIMAL(10,2) DEFAULT 0,
        discount_amount DECIMAL(10,2) DEFAULT 0,
        payment_method NVARCHAR(50),
        payment_status NVARCHAR(20) DEFAULT 'pending',
        shipping_address NVARCHAR(MAX),
        delivery_date DATE,
        special_instructions NVARCHAR(MAX),
        created_at DATETIME2 DEFAULT GETDATE(),
        updated_at DATETIME2 DEFAULT GETDATE()
      )`,

      // Order Items table
      `CREATE TABLE OrderItems (
        id INT IDENTITY(1,1) PRIMARY KEY,
        order_id INT FOREIGN KEY REFERENCES Orders(id) ON DELETE CASCADE,
        meal_id INT FOREIGN KEY REFERENCES Meals(id),
        quantity INT NOT NULL DEFAULT 1,
        unit_price DECIMAL(10,2) NOT NULL,
        total_price DECIMAL(10,2) NOT NULL,
        created_at DATETIME2 DEFAULT GETDATE()
      )`
    ];

    for (const query of queries) {
      await this.query(query);
    }
  }

  /**
   * Insert seed data
   */
  private async insertSeedData(): Promise<void> {
    // Insert categories
    await this.query(`
      INSERT INTO Categories (name, description, image_url) VALUES
      ('Breakfast', 'Nutritious morning meals to start your day right', '/images/categories/breakfast.jpg'),
      ('Lunch', 'Balanced midday meals for sustained energy', '/images/categories/lunch.jpg'),
      ('Dinner', 'Satisfying evening meals for optimal recovery', '/images/categories/dinner.jpg'),
      ('Snacks', 'Healthy snacks to keep you energized', '/images/categories/snacks.jpg'),
      ('Desserts', 'Guilt-free sweet treats', '/images/categories/desserts.jpg')
    `);

    // Insert plans
    await this.query(`
      INSERT INTO Plans (name, description, price, duration_days, meals_per_week, calories_per_day, features, is_popular) VALUES
      ('Basic Plan', 'Perfect for beginners looking to start their health journey', 299.99, 30, 10, 1800, '10 meals per week, Basic nutrition tracking, Email support', 0),
      ('Premium Plan', 'Our most popular choice for serious health enthusiasts', 499.99, 30, 16, 2000, '16 meals per week, Advanced nutrition tracking, Priority support, Custom meal plans', 1),
      ('Elite Plan', 'Ultimate nutrition experience with personalized coaching', 799.99, 30, 21, 2200, '21 meals per week, 1-on-1 nutrition coaching, Priority delivery, Custom recipes', 0)
    `);

    // Insert sample meals
    await this.query(`
      INSERT INTO Meals (category_id, name, description, ingredients, preparation_time, price, chef_name, difficulty_level, meal_type, cuisine_type, is_vegetarian, is_vegan, is_gluten_free) VALUES
      (1, 'Avocado Toast Deluxe', 'Creamy avocado on artisan sourdough with poached egg', 'Sourdough bread, avocado, free-range egg, cherry tomatoes, microgreens, olive oil', 15, 12.99, 'Chef Maria', 'Easy', 'Breakfast', 'Modern', 1, 0, 0),
      (1, 'Protein Power Bowl', 'Greek yogurt with berries, granola, and almond butter', 'Greek yogurt, mixed berries, granola, almond butter, chia seeds, honey', 5, 9.99, 'Chef David', 'Easy', 'Breakfast', 'Health', 1, 0, 1),
      (2, 'Grilled Salmon Salad', 'Fresh Atlantic salmon over mixed greens with quinoa', 'Atlantic salmon, mixed greens, quinoa, cucumber, cherry tomatoes, lemon vinaigrette', 25, 18.99, 'Chef Sarah', 'Medium', 'Lunch', 'Mediterranean', 0, 0, 1),
      (2, 'Buddha Bowl Supreme', 'Nutrient-packed bowl with roasted vegetables and tahini', 'Roasted sweet potato, chickpeas, kale, quinoa, tahini dressing, pumpkin seeds', 30, 15.99, 'Chef Alex', 'Medium', 'Lunch', 'Vegan', 1, 1, 1),
      (3, 'Herb-Crusted Chicken', 'Organic chicken breast with roasted vegetables', 'Organic chicken breast, herb crust, roasted vegetables, sweet potato mash', 35, 22.99, 'Chef Michael', 'Medium', 'Dinner', 'American', 0, 0, 1)
    `);

    // Insert nutrition data for meals
    await this.query(`
      INSERT INTO MealNutrition (meal_id, calories, protein, carbohydrates, fat, fiber, sugar, sodium) VALUES
      (1, 420, 18.5, 35.2, 22.1, 8.5, 4.2, 320),
      (2, 380, 25.0, 40.5, 15.2, 6.8, 18.5, 125),
      (3, 520, 35.8, 25.4, 28.2, 9.2, 8.1, 450),
      (4, 480, 18.2, 55.8, 20.1, 12.5, 12.2, 280),
      (5, 580, 42.5, 35.2, 22.8, 6.5, 5.8, 380)
    `);
  }
}

// Export singleton instance
export const db = DatabaseService.getInstance();

// Legacy exports for compatibility
export const initializeDatabase = async () => {
  await db.connect();
  await db.initializeSchema();
};

export const getPool = () => db.getPool();
export const closeDatabase = () => db.disconnect();

export default DatabaseService;