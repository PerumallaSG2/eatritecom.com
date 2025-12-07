/**
 * EatRite Enterprise Type Definitions
 * Shared across all features
 */

// ============================================================================
// USER & RBAC
// ============================================================================

export type UserRole =
  | 'SUPER_ADMIN'
  | 'COMPANY_ADMIN'
  | 'FINANCE_USER'
  | 'OPERATIONS_USER'
  | 'EMPLOYEE'

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  phone?: string
  role: UserRole
  companyId: string
  isActive: boolean
  lastLogin?: string
  createdAt: string
  updatedAt: string
}

// ============================================================================
// COMPANY
// ============================================================================

export type CompanyTier = 'TIER_A' | 'TIER_B' | 'TIER_C' | 'TIER_D'

export interface Company {
  id: string
  name: string
  code: string
  email: string
  phone?: string
  billingAddress?: string
  tier: CompanyTier
  isActive: boolean
  billingContact?: string
  billingEmail?: string
  employeeLimit?: number
  contractStart?: string
  contractEnd?: string
  paymentTerms: string
  createdAt: string
  updatedAt: string
}

// ============================================================================
// BILLING & INVOICES
// ============================================================================

export type InvoiceStatus = 'DRAFT' | 'ISSUED' | 'PAID' | 'OVERDUE' | 'CANCELLED'

export type InvoiceLineItemType =
  | 'MEAL'
  | 'SUBSCRIPTION'
  | 'DISCOUNT'
  | 'CREDIT'
  | 'ADJUSTMENT'

export type PaymentStatus = 'PENDING' | 'SUCCEEDED' | 'FAILED' | 'REFUNDED' | 'CANCELLED'

export type PaymentMethod = 'CREDIT_CARD' | 'ACH' | 'WIRE_TRANSFER' | 'NET_30' | 'NET_60'

export interface Invoice {
  id: string
  companyId: string
  invoiceNumber: string
  periodStart: string
  periodEnd: string
  status: InvoiceStatus
  subtotalCents: number
  taxCents: number
  totalCents: number
  currency: string
  dueDate: string
  issuedAt?: string
  paidAt?: string
  createdAt: string
  updatedAt: string
  lineItems?: InvoiceLineItem[]
  payments?: PaymentRecord[]
}

export interface InvoiceLineItem {
  id: string
  invoiceId: string
  type: InvoiceLineItemType
  description: string
  quantity: number
  unitPriceCents: number
  totalCents: number
  metadata?: Record<string, unknown>
  createdAt: string
}

export interface PaymentRecord {
  id: string
  invoiceId?: string
  companyId: string
  stripePaymentIntentId?: string
  amountCents: number
  status: PaymentStatus
  paymentMethod: PaymentMethod
  failureReason?: string
  metadata?: Record<string, unknown>
  createdAt: string
  updatedAt: string
}

// ============================================================================
// ORDERS
// ============================================================================

export type OrderStatus =
  | 'PENDING'
  | 'CONFIRMED'
  | 'PREPARING'
  | 'SHIPPED'
  | 'DELIVERED'
  | 'CANCELLED'

export interface Order {
  id: string
  userId: string
  companyId: string
  orderNumber: string
  status: OrderStatus
  subtotalCents: number
  taxCents: number
  shippingCents: number
  totalCents: number
  deliveryDate?: string
  deliveredAt?: string
  trackingNumber?: string
  deliveryAddress: string
  deliveryNotes?: string
  createdAt: string
  updatedAt: string
  items?: OrderItem[]
}

export interface OrderItem {
  id: string
  orderId: string
  mealId: string
  quantity: number
  priceCents: number
  meal?: Meal
}

// ============================================================================
// MEALS
// ============================================================================

export interface Meal {
  id: string
  name: string
  description: string
  shortDescription?: string
  imageUrl?: string
  categoryId: string
  ingredients: string[]
  allergens: string[]
  nutritionFacts: NutritionFacts
  priceCents: number
  calories: number
  protein: number
  carbs: number
  fat: number
  fiber?: number
  sugar?: number
  sodium?: number
  isActive: boolean
  prepTime?: number
  spiceLevel?: number
  cuisineType?: string
  wellnessScore?: number
  createdAt: string
  updatedAt: string
}

export interface NutritionFacts {
  servingSize: string
  calories: number
  totalFat: number
  saturatedFat: number
  transFat: number
  cholesterol: number
  sodium: number
  totalCarbohydrate: number
  dietaryFiber: number
  totalSugars: number
  protein: number
  vitaminD?: number
  calcium?: number
  iron?: number
  potassium?: number
}

// ============================================================================
// ANALYTICS & METRICS
// ============================================================================

export interface DashboardMetrics {
  monthlySpendCents: number
  costPerEmployeeCents: number
  employeeAdoptionPercent: number
  onTimeDeliveryPercent: number
  wellnessTrend: WellnessTrendPoint[]
}

export interface WellnessTrendPoint {
  date: string
  averageScore: number
}

export interface CorporateAnalytics {
  id: string
  companyId: string
  weekStarting: string
  totalOrders: number
  totalEmployees: number
  activeEmployees: number
  participationRate: number
  avgWellnessScore?: number
  totalSpendCents: number
  topMeals?: Record<string, number>
  createdAt: string
}

// ============================================================================
// API RESPONSE TYPES
// ============================================================================

export interface ApiResponse<T> {
  data: T
  message?: string
  success: boolean
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface ApiError {
  message: string
  code?: string
  details?: unknown
}
