// Core Meal Interface
export interface Meal {
  id: string
  name: string
  description: string
  calories: number
  protein: number
  carbs: number
  fat: number
  fiber: number
  sodium: number
  price: number
  image_url: string
  dietary_tags: string
  is_popular: boolean
  rating: number
  ingredients?: string[]
  allergens?: string[]
  category?: string
  cook_time?: number
  prep_time?: number
  servings?: number
}

// User Interfaces
export interface User {
  id: string
  email: string
  name: string
  profile?: UserProfile
  preferences?: UserPreferences
  subscriptions?: Subscription[]
}

export interface UserProfile {
  age?: number
  weight?: number
  height?: number
  activity_level?: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active'
  dietary_restrictions?: string[]
  health_goals?: string[]
  allergies?: string[]
}

export interface UserPreferences {
  preferred_cuisines: string[]
  disliked_ingredients: string[]
  portion_size: 'small' | 'regular' | 'large'
  spice_tolerance: 'mild' | 'medium' | 'hot'
  meal_frequency: number
  budget_range: [number, number]
}

// Cart & Order Interfaces
export interface CartItem {
  meal: Meal
  quantity: number
  customizations?: Record<string, string>
}

export interface Cart {
  items: CartItem[]
  total: number
  discount?: number
  tax?: number
  shipping?: number
}

export interface Order {
  id: string
  user_id: string
  items: CartItem[]
  status: 'pending' | 'confirmed' | 'preparing' | 'shipping' | 'delivered' | 'cancelled'
  total_amount: number
  order_date: string
  delivery_date?: string
  delivery_address: Address
  payment_method: PaymentMethod
  tracking_number?: string
}

// Address Interface
export interface Address {
  id?: string
  street: string
  city: string
  state: string
  zip_code: string
  country: string
  is_default?: boolean
  type?: 'home' | 'work' | 'other'
}

// Payment Interface
export interface PaymentMethod {
  id?: string
  type: 'credit_card' | 'debit_card' | 'paypal' | 'apple_pay' | 'google_pay'
  last_four?: string
  expiry_date?: string
  is_default?: boolean
}

// Subscription Interface
export interface Subscription {
  id: string
  user_id: string
  plan_id: string
  status: 'active' | 'paused' | 'cancelled' | 'expired'
  start_date: string
  end_date?: string
  meals_per_week: number
  delivery_day: string
  next_delivery: string
  billing_cycle: 'weekly' | 'monthly'
}

// Plan Interface
export interface Plan {
  id: string
  name: string
  description: string
  meals_per_week: number
  price_per_meal: number
  total_price: number
  features: string[]
  is_popular?: boolean
}

// Filter & Search Interfaces
export interface FilterState {
  categories: string[]
  dietary_tags: string[]
  price_range: [number, number]
  calorie_range: [number, number]
  protein_range: [number, number]
  sort_by: 'name' | 'price' | 'rating' | 'calories' | 'protein'
  sort_order: 'asc' | 'desc'
}

export interface SearchState {
  query: string
  filters: FilterState
  results: Meal[]
  loading: boolean
  total_count: number
  page: number
  per_page: number
}

// Nutrition Interface
export interface NutritionInfo {
  calories: number
  protein: number
  carbohydrates: number
  fat: number
  fiber: number
  sugar: number
  sodium: number
  saturated_fat?: number
  trans_fat?: number
  cholesterol?: number
  vitamin_a?: number
  vitamin_c?: number
  calcium?: number
  iron?: number
}

// API Response Interfaces
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  per_page: number
  total_pages: number
}

// Component Props Interfaces
export interface BaseComponentProps {
  className?: string
  children?: React.ReactNode
}

export interface ButtonProps extends BaseComponentProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  onClick?: () => void
}

export interface ModalProps extends BaseComponentProps {
  isOpen: boolean
  onClose: () => void
  title?: string
}

// Form Interfaces
export interface FormField {
  name: string
  label: string
  type: 'text' | 'email' | 'password' | 'number' | 'select' | 'textarea' | 'checkbox'
  required?: boolean
  placeholder?: string
  options?: { value: string; label: string }[]
  validation?: {
    min?: number
    max?: number
    pattern?: RegExp
    custom?: (value: string) => boolean | string
  }
}

export interface FormData {
  [key: string]: string | number | boolean | string[]
}

// Theme & Design System Interfaces
export interface ThemeColors {
  primary: string
  secondary: string
  accent: string
  background: string
  surface: string
  text: string
  border: string
  success: string
  warning: string
  error: string
}

export interface BreakPoints {
  xs: string
  sm: string
  md: string
  lg: string
  xl: string
  '2xl': string
}

// Analytics & Tracking Interfaces
export interface AnalyticsEvent {
  event_name: string
  properties: Record<string, string | number | boolean>
  timestamp: string
  user_id?: string
  session_id?: string
}

export interface Metrics {
  orders_count: number
  revenue: number
  avg_order_value: number
  customer_satisfaction: number
  retention_rate: number
}

// Error Interfaces
export interface AppError {
  code: string
  message: string
  details?: Record<string, unknown>
  timestamp: string
}