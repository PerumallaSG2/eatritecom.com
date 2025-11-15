-- EatRite Database Schema (Simplified Factor75-inspired structure)

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
    user_email NVARCHAR(255),
    plan_id UNIQUEIDENTIFIER,
    delivery_date DATE,
    status NVARCHAR(50) DEFAULT 'pending', -- pending, confirmed, preparing, shipped, delivered
    total_amount DECIMAL(10,2),
    created_at DATETIME2 DEFAULT GETDATE(),
    FOREIGN KEY (plan_id) REFERENCES meal_plans(id)
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

-- Indexes for performance
CREATE INDEX IX_meals_category ON meals(category_id);
CREATE INDEX IX_meals_popular ON meals(is_popular);
CREATE INDEX IX_meals_dietary_tags ON meals(dietary_tags);
CREATE INDEX IX_orders_status ON orders(status);
CREATE INDEX IX_orders_delivery_date ON orders(delivery_date);