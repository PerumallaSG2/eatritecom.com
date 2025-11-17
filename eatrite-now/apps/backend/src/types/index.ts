// Backend Type Definitions

// Database Models
export interface Meal {
  id: string
  name: string
  description: string
  price: number
  image_url: string
  category_id?: string
  ingredients?: string
  allergens?: string
  is_available: boolean
  is_popular: boolean
  created_at: Date
  updated_at: Date
}

export interface MealNutrition {
  meal_id: string
  calories: number
  protein: number
  carbohydrates: number
  fat: number
  fiber: number
  sugar: number
  sodium: number
  cholesterol?: number
  vitamin_a?: number
  vitamin_c?: number
  calcium?: number
  iron?: number
}

export interface Category {
  id: string
  name: string
  description?: string
  image_url?: string
  is_active: boolean
  created_at: Date
}

export interface User {
  id: string
  email: string
  password_hash: string
  first_name: string
  last_name: string
  phone?: string
  is_active: boolean
  email_verified: boolean
  created_at: Date
  updated_at: Date
}

export interface UserProfile {
  user_id: string
  date_of_birth?: Date
  gender?: 'male' | 'female' | 'other'
  height?: number
  weight?: number
  activity_level?: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active'
  dietary_restrictions?: string
  health_goals?: string
  allergies?: string
  updated_at: Date
}

export interface Order {
  id: string
  user_email: string
  first_name: string
  last_name: string
  phone: string
  delivery_address: string
  delivery_city: string
  delivery_state: string
  delivery_zip: string
  total_amount: number
  subtotal: number
  delivery_fee: number
  tax: number
  status: 'pending' | 'confirmed' | 'preparing' | 'shipped' | 'delivered' | 'cancelled'
  payment_method?: string
  payment_status?: 'pending' | 'completed' | 'failed' | 'refunded'
  tracking_number?: string
  estimated_delivery?: Date
  created_at: Date
  updated_at: Date
}

export interface OrderMeal {
  order_id: string
  meal_id: string
  quantity: number
  price_at_time: number
}

export interface Plan {
  id: string
  name: string
  description: string
  meals_per_week: number
  price_per_meal: number
  total_price: number
  features: string
  is_active: boolean
  created_at: Date
}

export interface Subscription {
  id: string
  user_id: string
  plan_id: string
  status: 'active' | 'paused' | 'cancelled' | 'expired'
  start_date: Date
  end_date?: Date
  next_delivery_date: Date
  delivery_day: string
  delivery_frequency: 'weekly' | 'bi-weekly' | 'monthly'
  created_at: Date
  updated_at: Date
}

// API Request/Response Types
export interface OrderRequest {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  zipCode: string
  items: Array<{
    id: string
    name: string
    price: number
    quantity: number
  }>
  subtotal: number
  deliveryFee: number
  tax: number
  totalAmount: number
  cardNumber?: string
  expiryDate?: string
  cvv?: string
  cardName?: string
}

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  total: number
  page: number
  limit: number
  totalPages: number
}

// Query Parameters
export interface MealQueryParams {
  category?: string
  popular?: boolean
  limit?: number
  offset?: number
  search?: string
  sort?: 'name' | 'price' | 'rating' | 'created_at'
  order?: 'asc' | 'desc'
}

export interface OrderQueryParams {
  user_email?: string
  status?: string
  start_date?: string
  end_date?: string
  limit?: number
  offset?: number
}

// Validation Schemas
export interface ValidationError {
  field: string
  message: string
  value?: any
}

export interface RequestValidationResult {
  isValid: boolean
  errors: ValidationError[]
}

// Database Connection Types
export interface DatabaseConfig {
  server: string
  database: string
  user: string
  password: string
  port: number
  options: {
    encrypt: boolean
    trustServerCertificate: boolean
  }
}

// Service Layer Types
export interface ServiceResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  statusCode?: number
}

// Middleware Types
export interface AuthenticatedRequest extends Request {
  user?: {
    id: string
    email: string
    role: string
  }
}

// Error Types
export class AppError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public isOperational: boolean = true
  ) {
    super(message)
    this.name = 'AppError'
    Error.captureStackTrace(this, this.constructor)
  }
}

export class ValidationError extends AppError {
  constructor(message: string, public errors: ValidationError[]) {
    super(message, 400)
    this.name = 'ValidationError'
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string) {
    super(`${resource} not found`, 404)
    this.name = 'NotFoundError'
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = 'Unauthorized access') {
    super(message, 401)
    this.name = 'UnauthorizedError'
  }
}

// Configuration Types
export interface ServerConfig {
  port: number
  cors: {
    origin: string | string[]
    credentials: boolean
  }
  database: DatabaseConfig
  jwt: {
    secret: string
    expiresIn: string
  }
  email: {
    service: string
    user: string
    password: string
  }
}

// Logging Types
export interface LogEntry {
  level: 'debug' | 'info' | 'warn' | 'error'
  message: string
  timestamp: Date
  metadata?: Record<string, any>
}

// Health Check Types
export interface HealthCheckResult {
  status: 'healthy' | 'unhealthy'
  timestamp: Date
  services: {
    database: 'connected' | 'disconnected'
    email: 'available' | 'unavailable'
    storage: 'available' | 'unavailable'
  }
  uptime: number
  memory: {
    used: number
    total: number
    percentage: number
  }
}