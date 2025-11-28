/**
 * Database Migration Script - Creates Visitor Analytics Tables
 * Run this script to create the visitor tracking tables in your database
 */

import { initializeDatabase, getPool } from '../services/database.js';
import fs from 'fs';
import path from 'path';

async function createAnalyticsTables() {
  try {
    console.log('🔧 Creating visitor analytics tables...');
    
    // Initialize database connection
    await initializeDatabase();
    const pool = getPool();
    
    // Read the schema SQL file
    const schemaPath = path.join(process.cwd(), 'src/database/schema.sql');
    const schemaSQL = fs.readFileSync(schemaPath, 'utf8');
    
    // Extract only the visitor analytics tables from schema
    const analyticsSQL = `
-- ============================================================================
-- VISITOR ANALYTICS AND TRACKING
-- ============================================================================

-- Visitor tracking table for website analytics
CREATE TABLE visitor_logs (
    id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    session_id NVARCHAR(100) NOT NULL,
    ip_address NVARCHAR(45), -- IPv6 support
    user_agent NVARCHAR(500),
    referrer NVARCHAR(500),
    page_url NVARCHAR(500) NOT NULL,
    page_title NVARCHAR(200),
    screen_resolution NVARCHAR(20),
    device_type NVARCHAR(20), -- Mobile, Desktop, Tablet
    browser_name NVARCHAR(50),
    browser_version NVARCHAR(20),
    operating_system NVARCHAR(50),
    language NVARCHAR(10),
    timezone NVARCHAR(50),
    country NVARCHAR(2), -- ISO country code
    city NVARCHAR(100),
    visit_duration INT, -- seconds on page
    is_bounce BIT DEFAULT 0, -- single page visit
    is_new_visitor BIT DEFAULT 1,
    utm_source NVARCHAR(100), -- Marketing campaign tracking
    utm_medium NVARCHAR(100),
    utm_campaign NVARCHAR(100),
    created_at DATETIME2 DEFAULT GETDATE(),
    updated_at DATETIME2 DEFAULT GETDATE()
);

-- Indexes for performance
CREATE INDEX IX_visitor_logs_session_id ON visitor_logs(session_id);
CREATE INDEX IX_visitor_logs_created_at ON visitor_logs(created_at);
CREATE INDEX IX_visitor_logs_ip_address ON visitor_logs(ip_address);
CREATE INDEX IX_visitor_logs_device_type ON visitor_logs(device_type);

-- Daily visitor summary table for quick analytics
CREATE TABLE visitor_analytics (
    id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    analytics_date DATE NOT NULL,
    total_visitors INT DEFAULT 0,
    unique_visitors INT DEFAULT 0,
    page_views INT DEFAULT 0,
    bounce_rate DECIMAL(5,2) DEFAULT 0, -- percentage
    avg_session_duration INT DEFAULT 0, -- seconds
    mobile_visitors INT DEFAULT 0,
    desktop_visitors INT DEFAULT 0,
    tablet_visitors INT DEFAULT 0,
    top_referrer NVARCHAR(500),
    top_page NVARCHAR(500),
    created_at DATETIME2 DEFAULT GETDATE(),
    updated_at DATETIME2 DEFAULT GETDATE()
);

-- Unique constraint for daily analytics
CREATE UNIQUE INDEX IX_visitor_analytics_date ON visitor_analytics(analytics_date);
`;

    // Check if tables already exist
    const checkTablesQuery = `
      SELECT TABLE_NAME 
      FROM INFORMATION_SCHEMA.TABLES 
      WHERE TABLE_NAME IN ('visitor_logs', 'visitor_analytics')
    `;
    
    const existingTables = await pool.request().query(checkTablesQuery);
    
    if (existingTables.recordset.length > 0) {
      console.log('⚠️  Analytics tables already exist:');
      existingTables.recordset.forEach((table: any) => {
        console.log(`   - ${table.TABLE_NAME}`);
      });
      
      const shouldRecreate = process.argv.includes('--force');
      if (!shouldRecreate) {
        console.log('   Use --force flag to recreate tables');
        return;
      }
      
      console.log('🗑️  Dropping existing tables...');
      await pool.request().query('DROP TABLE IF EXISTS visitor_logs');
      await pool.request().query('DROP TABLE IF EXISTS visitor_analytics');
    }
    
    // Split SQL into individual statements and execute
    const statements = analyticsSQL
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0 && !stmt.startsWith('--'));
    
    for (const statement of statements) {
      if (statement.trim()) {
        console.log(`   Executing: ${statement.substring(0, 50)}...`);
        await pool.request().query(statement);
      }
    }
    
    console.log('✅ Visitor analytics tables created successfully!');
    
    // Verify tables were created
    const verifyQuery = `
      SELECT 
        t.TABLE_NAME,
        COUNT(c.COLUMN_NAME) as COLUMN_COUNT
      FROM INFORMATION_SCHEMA.TABLES t
      LEFT JOIN INFORMATION_SCHEMA.COLUMNS c ON t.TABLE_NAME = c.TABLE_NAME
      WHERE t.TABLE_NAME IN ('visitor_logs', 'visitor_analytics')
      GROUP BY t.TABLE_NAME
    `;
    
    const verification = await pool.request().query(verifyQuery);
    console.log('📊 Table verification:');
    verification.recordset.forEach((table: any) => {
      console.log(`   - ${table.TABLE_NAME}: ${table.COLUMN_COUNT} columns`);
    });
    
  } catch (error) {
    console.error('❌ Error creating analytics tables:', error);
    process.exit(1);
  }
}

// Run the migration
createAnalyticsTables()
  .then(() => {
    console.log('🎉 Database migration completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Migration failed:', error);
    process.exit(1);
  });