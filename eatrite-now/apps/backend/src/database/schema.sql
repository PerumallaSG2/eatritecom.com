-- EatRite Database Schema (Simplified Factor75-inspired structure)

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

-- ============================================================================
-- USER AUTHENTICATION AND PROFILES
-- ============================================================================

-- Main users table for authentication
CREATE TABLE users (
    id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    email NVARCHAR(255) NOT NULL UNIQUE,
    password_hash NVARCHAR(255) NOT NULL,
    first_name NVARCHAR(100) NOT NULL,
    last_name NVARCHAR(100) NOT NULL,
    phone NVARCHAR(20),
    is_active BIT DEFAULT 1,
    email_verified BIT DEFAULT 0,
    phone_verified BIT DEFAULT 0,
    email_verification_token NVARCHAR(255),
    email_verification_expires DATETIME2,
    email_verification_attempts INT DEFAULT 0,
    phone_verification_token NVARCHAR(255),
    phone_verification_expires DATETIME2,
    phone_verification_attempts INT DEFAULT 0,
    password_reset_token NVARCHAR(255),
    password_reset_expires DATETIME2,
    last_otp_request_times NVARCHAR(MAX), -- JSON array of timestamps for rate limiting
    created_at DATETIME2 DEFAULT GETDATE(),
    updated_at DATETIME2 DEFAULT GETDATE()
);

-- Detailed user profiles
CREATE TABLE user_profiles (
    user_id UNIQUEIDENTIFIER PRIMARY KEY,
    date_of_birth DATE,
    gender NVARCHAR(20) CHECK (gender IN ('male', 'female', 'other', 'prefer-not-to-say')),
    avatar_url NVARCHAR(500),
    bio NVARCHAR(1000),
    subscription_tier NVARCHAR(20) DEFAULT 'basic' CHECK (subscription_tier IN ('basic', 'premium', 'elite')),
    
    -- Health metrics
    height_cm INT,
    weight_kg DECIMAL(5,2),
    activity_level NVARCHAR(20) CHECK (activity_level IN ('sedentary', 'lightly-active', 'moderately-active', 'very-active', 'extremely-active')),
    fitness_level NVARCHAR(20) CHECK (fitness_level IN ('beginner', 'intermediate', 'advanced')),
    
    -- Goals and preferences
    health_goals NVARCHAR(MAX), -- JSON array: ["weight-loss", "muscle-gain", "maintenance", etc.]
    dietary_restrictions NVARCHAR(MAX), -- JSON array: ["vegetarian", "vegan", "keto", etc.]
    allergies NVARCHAR(MAX), -- JSON array: ["nuts", "dairy", "gluten", etc.]
    medical_conditions NVARCHAR(MAX), -- JSON array
    
    -- Nutrition goals
    daily_calories INT,
    protein_percentage DECIMAL(5,2),
    carbs_percentage DECIMAL(5,2),
    fat_percentage DECIMAL(5,2),
    water_intake_ml INT,
    meals_per_day INT DEFAULT 3,
    weight_goal NVARCHAR(20) CHECK (weight_goal IN ('lose', 'maintain', 'gain')),
    target_weight_kg DECIMAL(5,2),
    
    updated_at DATETIME2 DEFAULT GETDATE(),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- User notification and privacy settings
CREATE TABLE user_settings (
    user_id UNIQUEIDENTIFIER PRIMARY KEY,
    
    -- Notification preferences
    email_notifications BIT DEFAULT 1,
    push_notifications BIT DEFAULT 1,
    meal_reminders BIT DEFAULT 1,
    supplement_reminders BIT DEFAULT 0,
    progress_updates BIT DEFAULT 1,
    promotional_offers BIT DEFAULT 0,
    weekly_reports BIT DEFAULT 1,
    
    -- Privacy settings
    profile_visibility NVARCHAR(20) DEFAULT 'friends' CHECK (profile_visibility IN ('public', 'friends', 'private')),
    share_progress_data BIT DEFAULT 1,
    allow_data_analytics BIT DEFAULT 1,
    marketing_communications BIT DEFAULT 0,
    
    updated_at DATETIME2 DEFAULT GETDATE(),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- User addresses for delivery
CREATE TABLE user_addresses (
    id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    user_id UNIQUEIDENTIFIER NOT NULL,
    name NVARCHAR(100) NOT NULL, -- e.g., "Home", "Work", "Mom's House"
    street_address NVARCHAR(255) NOT NULL,
    apartment_unit NVARCHAR(50),
    city NVARCHAR(100) NOT NULL,
    state NVARCHAR(50) NOT NULL,
    postal_code NVARCHAR(20) NOT NULL,
    country NVARCHAR(50) DEFAULT 'United States',
    delivery_instructions NVARCHAR(500),
    is_default BIT DEFAULT 0,
    created_at DATETIME2 DEFAULT GETDATE(),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- ============================================================================
-- MEAL SYSTEM
-- ============================================================================

-- Dietary preference categories
CREATE TABLE dietary_preferences (
    id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    name NVARCHAR(100) NOT NULL UNIQUE,
    description NVARCHAR(500),
    icon NVARCHAR(100),
    sort_order INT DEFAULT 0,
    created_at DATETIME2 DEFAULT GETDATE()
);

-- Meal categories
CREATE TABLE meal_categories (
    id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    name NVARCHAR(100) NOT NULL UNIQUE,
    description NVARCHAR(500),
    image_url NVARCHAR(500),
    sort_order INT DEFAULT 0,
    created_at DATETIME2 DEFAULT GETDATE()
);

-- Main meals table
CREATE TABLE meals (
    id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    name NVARCHAR(200) NOT NULL,
    description NVARCHAR(1000),
    short_description NVARCHAR(300),
    image_url NVARCHAR(500),
    category_id UNIQUEIDENTIFIER,
    ingredients NVARCHAR(2000),
    allergens NVARCHAR(500),
    price DECIMAL(10,2) NOT NULL,
    calories INT,
    protein INT,
    carbs INT,
    fat INT,
    fiber INT,
    sodium INT,
    prep_time INT DEFAULT 2, -- minutes to heat
    is_popular BIT DEFAULT 0,
    is_new BIT DEFAULT 0,
    is_top_rated BIT DEFAULT 0,
    dietary_tags NVARCHAR(500), -- JSON array of dietary preference IDs
    created_at DATETIME2 DEFAULT GETDATE(),
    updated_at DATETIME2 DEFAULT GETDATE(),
    FOREIGN KEY (category_id) REFERENCES meal_categories(id)
);

-- Meal plans (6, 8, 10, 12, etc. meals per week)
CREATE TABLE meal_plans (
    id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    name NVARCHAR(100) NOT NULL,
    description NVARCHAR(500),
    meals_per_week INT NOT NULL,
    price_per_meal DECIMAL(10,2) NOT NULL,
    total_weekly_price DECIMAL(10,2) NOT NULL,
    discount_percentage DECIMAL(5,2) DEFAULT 0,
    is_popular BIT DEFAULT 0,
    features NVARCHAR(2000), -- JSON array of features
    min_weeks INT DEFAULT 1,
    created_at DATETIME2 DEFAULT GETDATE()
);

-- User orders
CREATE TABLE orders (
    id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    user_id UNIQUEIDENTIFIER NOT NULL,
    plan_id UNIQUEIDENTIFIER,
    delivery_address_id UNIQUEIDENTIFIER,
    delivery_date DATE,
    status NVARCHAR(50) DEFAULT 'pending', -- pending, confirmed, preparing, shipped, delivered, cancelled
    total_amount DECIMAL(10,2),
    discount_amount DECIMAL(10,2) DEFAULT 0,
    tax_amount DECIMAL(10,2) DEFAULT 0,
    delivery_fee DECIMAL(10,2) DEFAULT 0,
    order_notes NVARCHAR(1000),
    created_at DATETIME2 DEFAULT GETDATE(),
    updated_at DATETIME2 DEFAULT GETDATE(),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (plan_id) REFERENCES meal_plans(id),
    FOREIGN KEY (delivery_address_id) REFERENCES user_addresses(id)
);

-- Selected meals for each order
CREATE TABLE order_meals (
    id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    order_id UNIQUEIDENTIFIER NOT NULL,
    meal_id UNIQUEIDENTIFIER NOT NULL,
    quantity INT DEFAULT 1,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (meal_id) REFERENCES meals(id)
);

-- ============================================================================
-- INDEXES FOR PERFORMANCE
-- ============================================================================

-- User indexes
CREATE INDEX IX_users_email ON users(email);
CREATE INDEX IX_users_active ON users(is_active);
CREATE INDEX IX_user_addresses_user ON user_addresses(user_id);
CREATE INDEX IX_user_addresses_default ON user_addresses(is_default);

-- Meal indexes
CREATE INDEX IX_meals_category ON meals(category_id);
CREATE INDEX IX_meals_popular ON meals(is_popular);
CREATE INDEX IX_meals_dietary_tags ON meals(dietary_tags);

-- Order indexes
CREATE INDEX IX_orders_user ON orders(user_id);
CREATE INDEX IX_orders_status ON orders(status);
CREATE INDEX IX_orders_delivery_date ON orders(delivery_date);
CREATE INDEX IX_order_meals_order ON order_meals(order_id);
CREATE INDEX IX_order_meals_meal ON order_meals(meal_id);