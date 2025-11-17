import React from 'react'
import {
  Heart,
  Star,
  Clock,
  Flame,
  Zap,
  Plus,
  Minus,
  ShoppingCart,
  TrendingUp,
  Users,
  Award,
} from 'lucide-react'
import { Card, Button, Badge, ProgressBar } from './CoreComponents'

// MealCard Component - Premium meal display
interface Meal {
  id: string
  name: string
  description: string
  imageUrl: string
  price: number
  originalPrice?: number
  rating: number
  reviewCount: number
  prepTime: number
  difficulty: 'Easy' | 'Medium' | 'Hard'
  nutrition: {
    calories: number
    protein: number
    carbs: number
    fat: number
  }
  tags: string[]
  isPopular?: boolean
  isNew?: boolean
}

interface MealCardProps {
  meal: Meal
  onAddToCart?: (mealId: string) => void
  onFavorite?: (mealId: string) => void
  isFavorited?: boolean
  showQuantityControls?: boolean
  quantity?: number
  onQuantityChange?: (mealId: string, quantity: number) => void
  variant?: 'default' | 'compact' | 'featured'
}

export const MealCard: React.FC<MealCardProps> = ({
  meal,
  onAddToCart,
  onFavorite,
  isFavorited = false,
  showQuantityControls = false,
  quantity = 0,
  onQuantityChange,
  variant = 'default',
}) => {
  const isCompact = variant === 'compact'
  const isFeatured = variant === 'featured'

  return (
    <Card
      hover={true}
      variant={isFeatured ? 'premium' : 'default'}
      padding="sm"
      className={`group relative overflow-hidden ${
        isFeatured ? 'ring-2 ring-gold-200' : ''
      }`}
    >
      {/* Image Section */}
      <div className="relative">
        <div
          className={`relative overflow-hidden rounded-xl ${
            isCompact ? 'aspect-[4/3]' : 'aspect-[3/2]'
          }`}
        >
          <img
            src={meal.imageUrl}
            alt={meal.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />

          {/* Overlay Badges */}
          <div className="absolute top-3 left-3 flex gap-2">
            {meal.isNew && (
              <Badge variant="primary" size="sm">
                New
              </Badge>
            )}
            {meal.isPopular && (
              <Badge variant="gold" size="sm">
                Popular
              </Badge>
            )}
          </div>

          {/* Favorite Button */}
          <button
            onClick={() => onFavorite?.(meal.id)}
            className={`
              absolute top-3 right-3 w-8 h-8 rounded-full 
              backdrop-blur-sm transition-all duration-200
              flex items-center justify-center
              ${
                isFavorited
                  ? 'bg-red-500 text-white'
                  : 'bg-white/80 text-gray-600 hover:bg-white hover:text-red-500'
              }
            `}
          >
            <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
          </button>

          {/* Quick Info Overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <div className="flex items-center gap-4 text-white text-sm">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {meal.prepTime} min
              </div>
              <div className="flex items-center gap-1">
                <Flame className="w-4 h-4" />
                {meal.nutrition.calories} cal
              </div>
              <div className="flex items-center gap-1">
                <Zap className="w-4 h-4" />
                {meal.nutrition.protein}g protein
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 space-y-3">
        {/* Rating & Price Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="font-medium text-sm text-gray-900">
              {meal.rating}
            </span>
            <span className="text-xs text-gray-500">({meal.reviewCount})</span>
          </div>
          <div className="text-right">
            {meal.originalPrice && meal.originalPrice > meal.price && (
              <div className="text-xs text-gray-400 line-through">
                ${meal.originalPrice.toFixed(2)}
              </div>
            )}
            <div className="font-bold text-lg text-gray-900">
              ${meal.price.toFixed(2)}
            </div>
          </div>
        </div>

        {/* Title & Description */}
        <div>
          <h3 className="font-bold text-gray-900 mb-1 line-clamp-2">
            {meal.name}
          </h3>
          {!isCompact && (
            <p className="text-sm text-gray-600 line-clamp-2 mb-3">
              {meal.description}
            </p>
          )}
        </div>

        {/* Tags */}
        {!isCompact && (
          <div className="flex flex-wrap gap-1">
            {meal.tags.slice(0, 3).map(tag => (
              <Badge key={tag} variant="secondary" size="sm">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {/* Nutrition Summary */}
        {!isCompact && (
          <div className="grid grid-cols-4 gap-2 py-2 border-t border-gray-100">
            <div className="text-center">
              <div className="text-xs text-gray-500">Calories</div>
              <div className="font-medium text-sm">
                {meal.nutrition.calories}
              </div>
            </div>
            <div className="text-center">
              <div className="text-xs text-gray-500">Protein</div>
              <div className="font-medium text-sm">
                {meal.nutrition.protein}g
              </div>
            </div>
            <div className="text-center">
              <div className="text-xs text-gray-500">Carbs</div>
              <div className="font-medium text-sm">{meal.nutrition.carbs}g</div>
            </div>
            <div className="text-center">
              <div className="text-xs text-gray-500">Fat</div>
              <div className="font-medium text-sm">{meal.nutrition.fat}g</div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center gap-2 pt-2">
          {showQuantityControls && quantity > 0 ? (
            <div className="flex items-center gap-3 flex-1">
              <button
                onClick={() => onQuantityChange?.(meal.id, quantity - 1)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="font-medium min-w-[2rem] text-center">
                {quantity}
              </span>
              <button
                onClick={() => onQuantityChange?.(meal.id, quantity + 1)}
                className="w-8 h-8 rounded-full bg-primary-100 hover:bg-primary-200 text-primary-600 flex items-center justify-center transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <Button
              variant="primary"
              size="sm"
              onClick={() => onAddToCart?.(meal.id)}
              leftIcon={ShoppingCart}
              className="flex-1"
            >
              Add to Cart
            </Button>
          )}
        </div>
      </div>
    </Card>
  )
}

// StatCard Component - Dashboard statistics
interface StatCardProps {
  title: string
  value: string | number
  change?: {
    value: number
    trend: 'up' | 'down' | 'neutral'
    label: string
  }
  icon?: React.ComponentType<{ className?: string }>
  variant?: 'default' | 'success' | 'warning' | 'gold'
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  icon: Icon,
  variant = 'default',
}) => {
  const variantClasses = {
    default: 'border-gray-200',
    success: 'border-green-200 bg-green-50',
    warning: 'border-yellow-200 bg-yellow-50',
    gold: 'border-gold-200 bg-gold-50',
  }

  return (
    <Card className={`${variantClasses[variant]}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <div className="flex items-baseline gap-2">
            <p className="text-3xl font-bold text-gray-900">{value}</p>
            {change && (
              <div
                className={`flex items-center gap-1 text-sm ${
                  change.trend === 'up'
                    ? 'text-green-600'
                    : change.trend === 'down'
                      ? 'text-red-600'
                      : 'text-gray-600'
                }`}
              >
                <TrendingUp
                  className={`w-4 h-4 ${
                    change.trend === 'down' ? 'rotate-180' : ''
                  }`}
                />
                <span>
                  {Math.abs(change.value)}% {change.label}
                </span>
              </div>
            )}
          </div>
        </div>
        {Icon && (
          <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
            <Icon className="w-6 h-6 text-primary-600" />
          </div>
        )}
      </div>
    </Card>
  )
}

// RecommendationCard Component - AI recommendations
interface RecommendationCardProps {
  meal: Meal
  confidence: number
  reason: string
  onSelect?: (mealId: string) => void
}

export const RecommendationCard: React.FC<RecommendationCardProps> = ({
  meal,
  confidence,
  reason,
  onSelect,
}) => {
  return (
    <Card
      hover={true}
      className="cursor-pointer"
      onClick={() => onSelect?.(meal.id)}
    >
      <div className="flex gap-4">
        <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
          <img
            src={meal.imageUrl}
            alt={meal.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <h4 className="font-semibold text-gray-900">{meal.name}</h4>
            <Badge variant="gold" size="sm">
              {confidence}% match
            </Badge>
          </div>
          <p className="text-sm text-gray-600 mb-3">{reason}</p>
          <div className="flex items-center justify-between">
            <div className="text-lg font-bold text-gray-900">
              ${meal.price.toFixed(2)}
            </div>
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <Star className="w-3 h-3 text-yellow-400 fill-current" />
              {meal.rating}
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}

// ChartCard Component - Analytics visualization
interface ChartCardProps {
  title: string
  subtitle?: string
  children: React.ReactNode
  actions?: React.ReactNode
}

export const ChartCard: React.FC<ChartCardProps> = ({
  title,
  subtitle,
  children,
  actions,
}) => {
  return (
    <Card className="h-full">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          {subtitle && <p className="text-sm text-gray-600 mt-1">{subtitle}</p>}
        </div>
        {actions}
      </div>
      {children}
    </Card>
  )
}

// Corporate Analytics Card
interface CorporateAnalyticsCardProps {
  title: string
  employeeCount: number
  participationRate: number
  topMeals: Array<{ name: string; orders: number; image: string }>
  wellnessScore: number
}

export const CorporateAnalyticsCard: React.FC<CorporateAnalyticsCardProps> = ({
  title,
  employeeCount,
  participationRate,
  topMeals,
  wellnessScore,
}) => {
  return (
    <Card variant="premium" className="h-full">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-gold-400 to-gold-600 rounded-xl flex items-center justify-center">
          <Users className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">{title}</h3>
          <p className="text-sm text-gray-600">{employeeCount} employees</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Participation Rate */}
        <div>
          <ProgressBar
            label="Participation Rate"
            value={participationRate}
            variant="primary"
            showValue={true}
          />
        </div>

        {/* Wellness Score */}
        <div>
          <ProgressBar
            label="Wellness Score"
            value={wellnessScore}
            variant="gold"
            showValue={true}
          />
        </div>

        {/* Top Meals */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Popular Meals</h4>
          <div className="space-y-2">
            {topMeals.map((meal, index) => (
              <div key={meal.name} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={meal.image}
                    alt={meal.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {meal.name}
                  </p>
                  <p className="text-xs text-gray-500">{meal.orders} orders</p>
                </div>
                <div className="flex items-center gap-1">
                  <Award className="w-3 h-3 text-gold-500" />
                  <span className="text-xs font-medium text-gold-600">
                    #{index + 1}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  )
}

// Subscription Plan Card
interface SubscriptionPlan {
  id: string
  name: string
  mealCount: number
  price: {
    monthly: number
    weekly: number
  }
  originalPrice?: number
  features: string[]
  isPopular?: boolean
  savings?: number
}

interface SubscriptionPlanCardProps {
  plan: SubscriptionPlan
  billingCycle: 'weekly' | 'monthly'
  isSelected?: boolean
  onSelect?: (planId: string) => void
}

export const SubscriptionPlanCard: React.FC<SubscriptionPlanCardProps> = ({
  plan,
  billingCycle,
  isSelected = false,
  onSelect,
}) => {
  const currentPrice = plan.price[billingCycle]
  const pricePerMeal = currentPrice / plan.mealCount

  return (
    <Card
      variant={plan.isPopular ? 'premium' : 'default'}
      className={`cursor-pointer relative ${
        isSelected ? 'ring-2 ring-primary-500 ring-offset-2' : ''
      } ${plan.isPopular ? 'scale-105' : ''}`}
      onClick={() => onSelect?.(plan.id)}
    >
      {plan.isPopular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <Badge variant="gold" size="sm">
            Most Popular
          </Badge>
        </div>
      )}

      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
        <div className="space-y-1">
          <div className="text-3xl font-bold text-gray-900">
            ${currentPrice}
            <span className="text-base font-normal text-gray-500">
              /{billingCycle}
            </span>
          </div>
          <div className="text-sm text-gray-600">
            ${pricePerMeal.toFixed(2)} per meal
          </div>
          {plan.savings && (
            <div className="text-sm text-green-600 font-medium">
              Save ${plan.savings}
            </div>
          )}
        </div>
      </div>

      <div className="text-center mb-6">
        <div className="text-2xl font-bold text-primary-600 mb-1">
          {plan.mealCount} Meals
        </div>
        <div className="text-sm text-gray-500">
          Perfect for {plan.mealCount <= 4 ? 'individuals' : 'families'}
        </div>
      </div>

      <div className="space-y-3 mb-6">
        {plan.features.map(feature => (
          <div key={feature} className="flex items-center gap-2 text-sm">
            <div className="w-4 h-4 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
              <div className="w-2 h-2 bg-green-600 rounded-full" />
            </div>
            {feature}
          </div>
        ))}
      </div>

      <Button
        variant={plan.isPopular ? 'gold' : 'primary'}
        size="md"
        className="w-full"
      >
        {isSelected ? 'Selected' : 'Choose Plan'}
      </Button>
    </Card>
  )
}
