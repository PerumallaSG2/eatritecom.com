import sql from 'mssql';
// import { seedDatabaseWithPool } from './seedData';

const config = {
  server: process.env.DB_SERVER || 'localhost',
  port: parseInt(process.env.DB_PORT || '1433'),
  database: process.env.DB_NAME || 'EATRITE',
  user: process.env.DB_USER || 'SA',
  password: process.env.DB_PASSWORD || '#SAIRAM9440336090',
  options: {
    encrypt: process.env.DB_ENCRYPT === 'true',
    trustServerCertificate: process.env.DB_TRUST_CERTIFICATE === 'true'
  }
};

let pool: sql.ConnectionPool;

export const initializeDatabase = async (): Promise<void> => {
  try {
    pool = new sql.ConnectionPool(config);
    await pool.connect();
    console.log('📊 Connected to SQL Server database');
    
    // Check if database needs seeding
    try {
      const mealCount = await pool.request().query('SELECT COUNT(*) as count FROM meals');
      if (mealCount.recordset[0].count === 0) {
        console.log('🌱 Database is empty, would need seeding...');
        // await seedDatabaseWithPool(pool);
      } else {
        console.log('📊 Database already has data, skipping seeding');
      }
    } catch (error) {
      console.error('❌ Error checking meal count or seeding:', error);
    }
  } catch (error) {
    console.error('❌ Database connection error:', error);
    throw error;
  }
};

export const getPool = (): sql.ConnectionPool => {
  if (!pool) {
    throw new Error('Database not initialized');
  }
  return pool;
};

export const closeDatabase = async (): Promise<void> => {
  if (pool) {
    await pool.close();
    console.log('📊 Database connection closed');
  }
};

export default {
  initializeDatabase,
  getPool,
  closeDatabase
};