import React, { useState, useEffect } from 'react'
import {
  ShoppingCart,
  Plus,
  Minus,
  X,
  Star,
  Zap,
  Target,
  Heart,
  Sparkles,
  TrendingUp,
  Gift,
  AlertCircle,
  Check,
  Lightbulb,
  Shield,
  Truck,
  CreditCard,
  Save,
  RotateCcw,
} from 'lucide-react'
import { FadeIn, StaggeredAnimation, Floating } from './AnimationComponents'

interface CartItem {
  id: string
  name: string
  image: string
  price: number
  originalPrice?: number
  quantity: number
  category: string
  dietType: 'keto' | 'paleo' | 'vegan' | 'protein' | 'balanced'
  calories: number
  protein: number
  carbs: number
  fat: number
  fiber: number
  prepTime: string
  popularity: number
  rating: number
  reviews: number
  tags: string[]
}

interface SmartSuggestion {
  id: string
  type:
    | 'upsell'
    | 'cross-sell'
    | 'bundle'
    | 'nutrition'
    | 'popular'
    | 'seasonal'
  title: string
  subtitle: string
  item: CartItem
  reason: string
  savings?: number
  confidence: number
  urgency?: string
  icon: React.ComponentType<any>
}

interface NutritionGoal {
  name: string
  current: number
  target: number
  unit: string
  status: 'exceeded' | 'met' | 'close' | 'low'
  recommendation?: string
}

interface CartOptimization {
  totalSavings: number
  nutritionScore: number
  varietyScore: number
  convenienceScore: number
  recommendations: string[]
  warnings: string[]
}

const generateCartItems = (): CartItem[] => [
  {
    id: 'keto-power-bowl',
    name: 'Keto Power Bowl',
    image: '🥗',
    price: 14.99,
    originalPrice: 16.99,
    quantity: 2,
    category: 'Bowls',
    dietType: 'keto',
    calories: 520,
    protein: 28,
    carbs: 12,
    fat: 42,
    fiber: 8,
    prepTime: '2 mins',
    popularity: 95,
    rating: 4.8,
    reviews: 1247,
    tags: ['High Protein', 'Low Carb', 'Gluten-Free'],
  },
  {
    id: 'protein-salmon-plate',
    name: 'Grilled Salmon Plate',
    image: '🐟',
    price: 18.99,
    quantity: 1,
    category: 'Seafood',
    dietType: 'protein',
    calories: 480,
    protein: 35,
    carbs: 15,
    fat: 28,
    fiber: 6,
    prepTime: '3 mins',
    popularity: 88,
    rating: 4.7,
    reviews: 892,
    tags: ['High Protein', 'Omega-3', 'Heart Healthy'],
  },
  {
    id: 'vegan-burrito-bowl',
    name: 'Vegan Burrito Bowl',
    image: '🌯',
    price: 12.99,
    quantity: 1,
    category: 'Bowls',
    dietType: 'vegan',
    calories: 420,
    protein: 15,
    carbs: 58,
    fat: 14,
    fiber: 12,
    prepTime: '2 mins',
    popularity: 82,
    rating: 4.6,
    reviews: 634,
    tags: ['Plant-Based', 'High Fiber', 'Whole Grains'],
  },
]

const generateSmartSuggestions = (
  _cartItems: CartItem[]
): SmartSuggestion[] => [
  {
    id: 'bundle-suggestion',
    type: 'bundle',
    title: 'Complete Keto Week Bundle',
    subtitle: 'Add 5 more keto meals and save $18',
    item: {
      id: 'keto-week-bundle',
      name: 'Keto Week Bundle (7 meals)',
      image: '📦',
      price: 89.99,
      originalPrice: 107.99,
      quantity: 1,
      category: 'Bundles',
      dietType: 'keto',
      calories: 510,
      protein: 30,
      carbs: 10,
      fat: 40,
      fiber: 7,
      prepTime: '2-3 mins',
      popularity: 92,
      rating: 4.9,
      reviews: 456,
      tags: ['Bundle Deal', 'Weekly Plan', 'Keto Certified'],
    },
    reason: 'Based on your Keto Power Bowl selection',
    savings: 18,
    confidence: 94,
    urgency: 'Limited time: 20% off bundles',
    icon: Gift,
  },
  {
    id: 'nutrition-balance',
    type: 'nutrition',
    title: 'Balance Your Nutrition',
    subtitle: 'Add fiber-rich vegetables to complete your profile',
    item: {
      id: 'roasted-veggie-medley',
      name: 'Roasted Vegetable Medley',
      image: '🥕',
      price: 9.99,
      quantity: 1,
      category: 'Sides',
      dietType: 'vegan',
      calories: 180,
      protein: 6,
      carbs: 24,
      fat: 8,
      fiber: 9,
      prepTime: '2 mins',
      popularity: 76,
      rating: 4.4,
      reviews: 289,
      tags: ['High Fiber', 'Antioxidants', 'Colorful'],
    },
    reason: 'Increase daily fiber intake by 15g',
    confidence: 87,
    icon: Target,
  },
  {
    id: 'popular-choice',
    type: 'popular',
    title: "Today's Most Ordered",
    subtitle: '847 customers added this in the last 24h',
    item: {
      id: 'chicken-teriyaki-bowl',
      name: 'Chicken Teriyaki Bowl',
      image: '🍗',
      price: 15.99,
      quantity: 1,
      category: 'Bowls',
      dietType: 'balanced',
      calories: 465,
      protein: 32,
      carbs: 34,
      fat: 22,
      fiber: 5,
      prepTime: '3 mins',
      popularity: 97,
      rating: 4.8,
      reviews: 1834,
      tags: ['Customer Favorite', 'Balanced', 'Asian Fusion'],
    },
    reason: 'Trending choice among similar customers',
    confidence: 91,
    urgency: 'While supplies last',
    icon: TrendingUp,
  },
  {
    id: 'protein-booster',
    type: 'upsell',
    title: 'Protein Upgrade Available',
    subtitle: 'Double protein for peak performance',
    item: {
      id: 'double-protein-salmon',
      name: 'Double Protein Salmon Plate',
      image: '🐟🐟',
      price: 23.99,
      originalPrice: 26.99,
      quantity: 1,
      category: 'Seafood',
      dietType: 'protein',
      calories: 680,
      protein: 55,
      carbs: 15,
      fat: 42,
      fiber: 6,
      prepTime: '3 mins',
      popularity: 84,
      rating: 4.7,
      reviews: 423,
      tags: ['Extra Protein', 'Muscle Building', 'Premium'],
    },
    reason: 'Upgrade your salmon plate for better results',
    savings: 3,
    confidence: 89,
    icon: Zap,
  },
  {
    id: 'dessert-suggestion',
    type: 'cross-sell',
    title: 'Complete Your Meal',
    subtitle: 'Guilt-free dessert to finish strong',
    item: {
      id: 'keto-chocolate-mousse',
      name: 'Keto Chocolate Mousse',
      image: '🍫',
      price: 6.99,
      quantity: 1,
      category: 'Desserts',
      dietType: 'keto',
      calories: 220,
      protein: 8,
      carbs: 6,
      fat: 18,
      fiber: 4,
      prepTime: 'Ready to eat',
      popularity: 79,
      rating: 4.5,
      reviews: 312,
      tags: ['Keto Friendly', 'Sugar-Free', 'Indulgent'],
    },
    reason: 'Pairs perfectly with your keto selections',
    confidence: 82,
    icon: Heart,
  },
]

export const SmartCartOptimization: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [suggestions, setSuggestions] = useState<SmartSuggestion[]>([])
  const [nutritionGoals, setNutritionGoals] = useState<NutritionGoal[]>([])
  const [optimization, setOptimization] = useState<CartOptimization | null>(
    null
  )
  const [expandedSuggestion, setExpandedSuggestion] = useState<string | null>(
    null
  )
  const [isOptimizing, setIsOptimizing] = useState(false)

  useEffect(() => {
    const items = generateCartItems()
    setCartItems(items)
    setSuggestions(generateSmartSuggestions(items))
    calculateNutritionGoals(items)
    optimizeCart(items)
  }, [])

  const calculateNutritionGoals = (items: CartItem[]) => {
    const totalCalories = items.reduce(
      (sum, item) => sum + item.calories * item.quantity,
      0
    )
    const totalProtein = items.reduce(
      (sum, item) => sum + item.protein * item.quantity,
      0
    )
    const totalCarbs = items.reduce(
      (sum, item) => sum + item.carbs * item.quantity,
      0
    )
    const totalFiber = items.reduce(
      (sum, item) => sum + item.fiber * item.quantity,
      0
    )

    const goals: NutritionGoal[] = [
      {
        name: 'Calories',
        current: totalCalories,
        target: 1800,
        unit: 'kcal',
        status:
          totalCalories > 1800
            ? 'exceeded'
            : totalCalories > 1600
              ? 'met'
              : totalCalories > 1400
                ? 'close'
                : 'low',
      },
      {
        name: 'Protein',
        current: totalProtein,
        target: 120,
        unit: 'g',
        status:
          totalProtein > 120
            ? 'exceeded'
            : totalProtein > 100
              ? 'met'
              : totalProtein > 80
                ? 'close'
                : 'low',
        recommendation:
          totalProtein < 100
            ? 'Consider adding a protein-rich meal'
            : undefined,
      },
      {
        name: 'Carbs',
        current: totalCarbs,
        target: 150,
        unit: 'g',
        status:
          totalCarbs > 150
            ? 'exceeded'
            : totalCarbs > 120
              ? 'met'
              : totalCarbs > 100
                ? 'close'
                : 'low',
      },
      {
        name: 'Fiber',
        current: totalFiber,
        target: 25,
        unit: 'g',
        status:
          totalFiber > 25
            ? 'exceeded'
            : totalFiber > 20
              ? 'met'
              : totalFiber > 15
                ? 'close'
                : 'low',
        recommendation:
          totalFiber < 20
            ? 'Add vegetables or whole grains for more fiber'
            : undefined,
      },
    ]

    setNutritionGoals(goals)
  }

  const optimizeCart = (items: CartItem[]) => {
    setIsOptimizing(true)

    // Simulate AI optimization process
    setTimeout(() => {
      const totalOriginalPrice = items.reduce((sum, item) => {
        const price = item.originalPrice || item.price
        return sum + price * item.quantity
      }, 0)

      const totalCurrentPrice = items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      )

      const nutritionScore = Math.min(
        100,
        Math.round(
          (nutritionGoals.filter(
            goal => goal.status === 'met' || goal.status === 'exceeded'
          ).length /
            nutritionGoals.length) *
            100
        )
      )

      const varietyScore = Math.min(
        100,
        (new Set(items.map(item => item.category)).size / 5) * 100
      )
      const convenienceScore = Math.round(
        (items.filter(item => item.prepTime.includes('2')).length /
          items.length) *
          100
      )

      const optimization: CartOptimization = {
        totalSavings: totalOriginalPrice - totalCurrentPrice,
        nutritionScore,
        varietyScore,
        convenienceScore,
        recommendations: [
          'Consider the Keto Week Bundle for additional 20% savings',
          'Add a fiber-rich side to balance your nutrition profile',
          'Your current selection provides excellent protein variety',
        ],
        warnings: nutritionGoals.some(goal => goal.status === 'low')
          ? ['Some nutritional targets are not met - see suggestions below']
          : [],
      }

      setOptimization(optimization)
      setIsOptimizing(false)
    }, 1500)
  }

  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity === 0) {
      setCartItems(items => items.filter(item => item.id !== itemId))
    } else {
      setCartItems(items =>
        items.map(item =>
          item.id === itemId ? { ...item, quantity: newQuantity } : item
        )
      )
    }

    const updatedItems = cartItems
      .map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
      .filter(item => item.quantity > 0)

    calculateNutritionGoals(updatedItems)
    optimizeCart(updatedItems)
  }

  const addSuggestionToCart = (suggestion: SmartSuggestion) => {
    const existingItem = cartItems.find(item => item.id === suggestion.item.id)

    if (existingItem) {
      updateQuantity(suggestion.item.id, existingItem.quantity + 1)
    } else {
      const newItems = [...cartItems, suggestion.item]
      setCartItems(newItems)
      calculateNutritionGoals(newItems)
      optimizeCart(newItems)
    }

    // Remove suggestion after adding
    setSuggestions(prev => prev.filter(s => s.id !== suggestion.id))
  }

  const getSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  }

  const getOriginalTotal = () => {
    return cartItems.reduce((sum, item) => {
      const price = item.originalPrice || item.price
      return sum + price * item.quantity
    }, 0)
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount)
  }

  const getNutritionStatusColor = (status: string) => {
    switch (status) {
      case 'exceeded':
        return 'text-purple-600 bg-purple-50'
      case 'met':
        return 'text-green-600 bg-green-50'
      case 'close':
        return 'text-yellow-600 bg-yellow-50'
      case 'low':
        return 'text-red-600 bg-red-50'
      default:
        return 'text-gray-600 bg-gray-50'
    }
  }

  const getSuggestionIcon = (type: string) => {
    switch (type) {
      case 'bundle':
        return Gift
      case 'nutrition':
        return Target
      case 'popular':
        return TrendingUp
      case 'upsell':
        return Zap
      case 'cross-sell':
        return Heart
      case 'seasonal':
        return Sparkles
      default:
        return Lightbulb
    }
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl overflow-hidden shadow-2xl">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
        <FadeIn>
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <ShoppingCart className="w-7 h-7" />
                <h2 className="text-2xl font-bold">Smart Cart Optimization</h2>
                <Sparkles className="w-6 h-6" />
              </div>
              <p className="text-blue-100">
                AI-powered suggestions to optimize nutrition, savings, and
                satisfaction
              </p>
            </div>

            {isOptimizing && (
              <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-lg">
                <RotateCcw className="w-4 h-4 animate-spin" />
                <span>Optimizing...</span>
              </div>
            )}
          </div>
        </FadeIn>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <FadeIn delay={0.1}>
              <div className="bg-white rounded-2xl p-6 shadow-lg mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <ShoppingCart className="w-5 h-5 text-blue-600 mr-2" />
                  Your Cart ({cartItems.length} items)
                </h3>

                <div className="space-y-4">
                  <StaggeredAnimation>
                    {cartItems.map(item => (
                      <div
                        key={item.id}
                        className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <span className="text-3xl">{item.image}</span>

                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">
                            {item.name}
                          </h4>
                          <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                            <span className="flex items-center">
                              <Star className="w-3 h-3 text-yellow-500 mr-1" />
                              {item.rating} ({item.reviews})
                            </span>
                            <span>{item.calories} cal</span>
                            <span>{item.protein}g protein</span>
                            <span className="text-blue-600">
                              {item.prepTime}
                            </span>
                          </div>
                          <div className="flex space-x-1 mt-2">
                            {item.tags.slice(0, 2).map((tag, index) => (
                              <span
                                key={index}
                                className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center space-x-3">
                          <div className="flex items-center space-x-2 bg-white border border-gray-300 rounded-lg">
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              className="p-2 hover:bg-gray-100 rounded-l-lg transition-colors"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="px-3 py-1 font-semibold">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              className="p-2 hover:bg-gray-100 rounded-r-lg transition-colors"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="text-right">
                            <div className="font-semibold text-gray-900">
                              {formatCurrency(item.price * item.quantity)}
                            </div>
                            {item.originalPrice && (
                              <div className="text-sm text-gray-500 line-through">
                                {formatCurrency(
                                  item.originalPrice * item.quantity
                                )}
                              </div>
                            )}
                          </div>

                          <button
                            onClick={() => updateQuantity(item.id, 0)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </StaggeredAnimation>
                </div>
              </div>
            </FadeIn>

            {/* Smart Suggestions */}
            <FadeIn delay={0.2}>
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <Lightbulb className="w-5 h-5 text-yellow-600 mr-2" />
                  Smart Suggestions
                  <span className="ml-2 text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">
                    AI Powered
                  </span>
                </h3>

                <div className="space-y-4">
                  <StaggeredAnimation>
                    {suggestions.map(suggestion => {
                      const IconComponent = getSuggestionIcon(suggestion.type)
                      const isExpanded = expandedSuggestion === suggestion.id

                      return (
                        <div
                          key={suggestion.id}
                          className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                        >
                          <div className="p-4">
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex items-start space-x-3">
                                <div
                                  className={`w-10 h-10 bg-gradient-to-r ${
                                    suggestion.type === 'bundle'
                                      ? 'from-green-500 to-emerald-500'
                                      : suggestion.type === 'nutrition'
                                        ? 'from-blue-500 to-cyan-500'
                                        : suggestion.type === 'popular'
                                          ? 'from-purple-500 to-pink-500'
                                          : suggestion.type === 'upsell'
                                            ? 'from-orange-500 to-red-500'
                                            : 'from-indigo-500 to-purple-500'
                                  } rounded-lg flex items-center justify-center`}
                                >
                                  <IconComponent className="w-5 h-5 text-white" />
                                </div>

                                <div>
                                  <h4 className="font-semibold text-gray-900">
                                    {suggestion.title}
                                  </h4>
                                  <p className="text-sm text-gray-600">
                                    {suggestion.subtitle}
                                  </p>
                                  <div className="flex items-center space-x-4 mt-2">
                                    <span className="text-xs text-gray-500">
                                      {suggestion.confidence}% confidence
                                    </span>
                                    {suggestion.savings && (
                                      <span className="text-xs text-green-600 font-semibold">
                                        Save{' '}
                                        {formatCurrency(suggestion.savings)}
                                      </span>
                                    )}
                                    {suggestion.urgency && (
                                      <span className="text-xs text-red-600 font-semibold">
                                        {suggestion.urgency}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>

                              <button
                                onClick={() =>
                                  setExpandedSuggestion(
                                    isExpanded ? null : suggestion.id
                                  )
                                }
                                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                              >
                                {isExpanded ? 'Less' : 'Details'}
                              </button>
                            </div>

                            {isExpanded && (
                              <Floating>
                                <div className="bg-gray-50 rounded-lg p-4 mt-3">
                                  <div className="flex items-center space-x-3 mb-3">
                                    <span className="text-2xl">
                                      {suggestion.item.image}
                                    </span>
                                    <div>
                                      <h5 className="font-semibold text-gray-900">
                                        {suggestion.item.name}
                                      </h5>
                                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                                        <span>
                                          {suggestion.item.calories} cal
                                        </span>
                                        <span>
                                          {suggestion.item.protein}g protein
                                        </span>
                                        <span className="flex items-center">
                                          <Star className="w-3 h-3 text-yellow-500 mr-1" />
                                          {suggestion.item.rating}
                                        </span>
                                      </div>
                                    </div>
                                  </div>

                                  <p className="text-sm text-gray-700 mb-3">
                                    <strong>Why this works:</strong>{' '}
                                    {suggestion.reason}
                                  </p>

                                  <div className="flex space-x-2">
                                    {suggestion.item.tags.map((tag, index) => (
                                      <span
                                        key={index}
                                        className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full"
                                      >
                                        {tag}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              </Floating>
                            )}

                            <div className="flex items-center justify-between mt-4">
                              <div className="flex items-center space-x-2">
                                <span className="font-semibold text-gray-900">
                                  {formatCurrency(suggestion.item.price)}
                                </span>
                                {suggestion.item.originalPrice && (
                                  <span className="text-sm text-gray-500 line-through">
                                    {formatCurrency(
                                      suggestion.item.originalPrice
                                    )}
                                  </span>
                                )}
                              </div>

                              <button
                                onClick={() => addSuggestionToCart(suggestion)}
                                className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                              >
                                <Plus className="w-4 h-4" />
                                <span>Add to Cart</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </StaggeredAnimation>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Sidebar: Optimization & Summary */}
          <div className="space-y-6">
            {/* Cart Optimization */}
            {optimization && (
              <FadeIn delay={0.3}>
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <Target className="w-5 h-5 text-green-600 mr-2" />
                    Cart Optimization
                  </h3>

                  {/* Optimization Scores */}
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <div className="text-xl font-bold text-green-600">
                        {optimization.nutritionScore}%
                      </div>
                      <div className="text-xs text-gray-600">Nutrition</div>
                    </div>
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <div className="text-xl font-bold text-blue-600">
                        {optimization.varietyScore}%
                      </div>
                      <div className="text-xs text-gray-600">Variety</div>
                    </div>
                    <div className="text-center p-3 bg-purple-50 rounded-lg">
                      <div className="text-xl font-bold text-purple-600">
                        {optimization.convenienceScore}%
                      </div>
                      <div className="text-xs text-gray-600">Convenience</div>
                    </div>
                  </div>

                  {/* Savings */}
                  {optimization.totalSavings > 0 && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                      <div className="flex items-center space-x-2">
                        <Save className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-semibold text-green-700">
                          You're saving{' '}
                          {formatCurrency(optimization.totalSavings)}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Recommendations */}
                  <div className="space-y-2 mb-4">
                    {optimization.recommendations.map((rec, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{rec}</span>
                      </div>
                    ))}
                  </div>

                  {/* Warnings */}
                  {optimization.warnings.length > 0 && (
                    <div className="space-y-2">
                      {optimization.warnings.map((warning, index) => (
                        <div
                          key={index}
                          className="flex items-start space-x-2 bg-yellow-50 border border-yellow-200 rounded-lg p-2"
                        >
                          <AlertCircle className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-yellow-700">
                            {warning}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </FadeIn>
            )}

            {/* Nutrition Goals */}
            <FadeIn delay={0.4}>
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <Target className="w-5 h-5 text-blue-600 mr-2" />
                  Nutrition Goals
                </h3>

                <div className="space-y-3">
                  {nutritionGoals.map(goal => {
                    const percentage = Math.min(
                      100,
                      (goal.current / goal.target) * 100
                    )

                    return (
                      <div key={goal.name} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-gray-700">
                            {goal.name}
                          </span>
                          <span
                            className={`text-xs px-2 py-1 rounded-full ${getNutritionStatusColor(goal.status)}`}
                          >
                            {goal.status}
                          </span>
                        </div>

                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full transition-all duration-1000 ${
                              goal.status === 'exceeded'
                                ? 'bg-purple-500'
                                : goal.status === 'met'
                                  ? 'bg-green-500'
                                  : goal.status === 'close'
                                    ? 'bg-yellow-500'
                                    : 'bg-red-500'
                            }`}
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>

                        <div className="flex justify-between text-xs text-gray-600">
                          <span>
                            {goal.current}
                            {goal.unit}
                          </span>
                          <span>
                            {goal.target}
                            {goal.unit} target
                          </span>
                        </div>

                        {goal.recommendation && (
                          <p className="text-xs text-blue-600 italic">
                            {goal.recommendation}
                          </p>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            </FadeIn>

            {/* Cart Summary */}
            <FadeIn delay={0.5}>
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <CreditCard className="w-5 h-5 text-green-600 mr-2" />
                  Order Summary
                </h3>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-semibold">
                      {formatCurrency(getSubtotal())}
                    </span>
                  </div>

                  {getOriginalTotal() > getSubtotal() && (
                    <div className="flex justify-between text-green-600">
                      <span>Savings</span>
                      <span className="font-semibold">
                        -{formatCurrency(getOriginalTotal() - getSubtotal())}
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between text-gray-600">
                    <span>Delivery</span>
                    <span className="text-green-600 font-semibold">FREE</span>
                  </div>

                  <div className="border-t border-gray-200 pt-3">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span>{formatCurrency(getSubtotal())}</span>
                    </div>

                    {getOriginalTotal() > getSubtotal() && (
                      <div className="text-sm text-gray-500">
                        Original:{' '}
                        <span className="line-through">
                          {formatCurrency(getOriginalTotal())}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-3 pt-4">
                    <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-colors flex items-center justify-center space-x-2">
                      <CreditCard className="w-5 h-5" />
                      <span>Proceed to Checkout</span>
                    </button>

                    <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                      <Shield className="w-4 h-4 text-green-600" />
                      <span>Secure checkout with 256-bit SSL</span>
                    </div>

                    <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                      <Truck className="w-4 h-4 text-blue-600" />
                      <span>Free delivery in 2-3 business days</span>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SmartCartOptimization
