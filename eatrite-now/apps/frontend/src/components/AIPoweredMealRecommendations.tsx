import React, { useState, useEffect } from 'react'
import {
  Brain,
  Star,
  ChefHat,
  TrendingUp,
  Clock,
  Zap,
  Target,
  User,
  Settings,
  Sparkles,
  RefreshCw,
  ThumbsUp,
  ThumbsDown,
  ShoppingCart,
} from 'lucide-react'
import { FadeIn, StaggeredAnimation } from './AnimationComponents'

interface UserProfile {
  id: string
  name: string
  dietaryPreferences: string[]
  allergies: string[]
  healthGoals: string[]
  activityLevel: 'low' | 'moderate' | 'high'
  mealHistory: string[]
  favoriteIngredients: string[]
  dislikedIngredients: string[]
  budget: 'economy' | 'standard' | 'premium'
  familySize: number
}

interface MealRecommendation {
  id: string
  name: string
  description: string
  image: string
  cuisine: string
  prepTime: number
  calories: number
  protein: number
  carbs: number
  fat: number
  price: number
  confidence: number // AI confidence score 0-100
  reasonTags: string[]
  nutritionScore: number
  ingredients: string[]
  allergens: string[]
  dietaryTags: string[]
  matchReasons: string[]
  similarMeals: string[]
}

interface AIInsight {
  type: 'preference' | 'nutrition' | 'budget' | 'variety' | 'seasonal'
  title: string
  description: string
  confidence: number
  actionable: boolean
}

const generateUserProfile = (): UserProfile => ({
  id: 'user-123',
  name: 'Sarah Johnson',
  dietaryPreferences: ['Mediterranean', 'Low-Carb', 'Organic'],
  allergies: ['Nuts', 'Shellfish'],
  healthGoals: ['Weight Loss', 'Muscle Building', 'Energy Boost'],
  activityLevel: 'high',
  mealHistory: [
    'keto-salmon',
    'mediterranean-bowl',
    'protein-power-plate',
    'veggie-stir-fry',
  ],
  favoriteIngredients: [
    'Salmon',
    'Avocado',
    'Quinoa',
    'Broccoli',
    'Sweet Potato',
  ],
  dislikedIngredients: ['Brussels Sprouts', 'Liver'],
  budget: 'standard',
  familySize: 2,
})

const generateAIRecommendations = (
  _profile: UserProfile
): MealRecommendation[] => [
  {
    id: 'ai-rec-1',
    name: 'Mediterranean Salmon Power Bowl',
    description:
      'Herb-crusted salmon with quinoa, roasted vegetables, and tahini dressing - perfect for your muscle-building goals.',
    image: '🐟',
    cuisine: 'Mediterranean',
    prepTime: 25,
    calories: 485,
    protein: 34,
    carbs: 28,
    fat: 24,
    price: 16.99,
    confidence: 94,
    reasonTags: ['High Protein', 'Mediterranean', 'Favorite Ingredient'],
    nutritionScore: 92,
    ingredients: [
      'Wild Salmon',
      'Quinoa',
      'Broccoli',
      'Avocado',
      'Tahini',
      'Lemon',
    ],
    allergens: [],
    dietaryTags: ['High-Protein', 'Mediterranean', 'Gluten-Free'],
    matchReasons: [
      'Contains your favorite salmon and avocado',
      'Matches Mediterranean preference',
      'High protein supports muscle building goals',
      'Similar to your recent Mediterranean bowl order',
    ],
    similarMeals: ['Greek Chicken Bowl', 'Moroccan Spiced Salmon'],
  },
  {
    id: 'ai-rec-2',
    name: 'Keto Avocado Chicken Skillet',
    description:
      'Creamy avocado and herb-seasoned chicken with cauliflower rice - ideal for low-carb lifestyle.',
    image: '🥑',
    cuisine: 'American',
    prepTime: 20,
    calories: 420,
    protein: 32,
    carbs: 8,
    fat: 28,
    price: 15.49,
    confidence: 89,
    reasonTags: ['Low-Carb', 'High Fat', 'Quick Prep'],
    nutritionScore: 88,
    ingredients: [
      'Organic Chicken',
      'Avocado',
      'Cauliflower Rice',
      'Herbs',
      'Olive Oil',
    ],
    allergens: [],
    dietaryTags: ['Keto', 'Low-Carb', 'Paleo'],
    matchReasons: [
      'Perfect for low-carb dietary preference',
      'Features your favorite avocado',
      'Supports weight loss goals',
      'Similar prep time to preferred meals',
    ],
    similarMeals: ['Keto Beef Stir-Fry', 'Low-Carb Turkey Bowl'],
  },
  {
    id: 'ai-rec-3',
    name: 'Quinoa Power Protein Plate',
    description:
      'Seasoned lean beef with quinoa pilaf, roasted sweet potato, and green vegetables.',
    image: '🥩',
    cuisine: 'American',
    prepTime: 30,
    calories: 520,
    protein: 38,
    carbs: 35,
    fat: 22,
    price: 17.99,
    confidence: 87,
    reasonTags: ['High Protein', 'Complex Carbs', 'Post-Workout'],
    nutritionScore: 90,
    ingredients: [
      'Grass-Fed Beef',
      'Quinoa',
      'Sweet Potato',
      'Broccoli',
      'Herbs',
    ],
    allergens: [],
    dietaryTags: ['High-Protein', 'Whole Foods', 'Gluten-Free'],
    matchReasons: [
      'Contains favorite quinoa and sweet potato',
      'High protein for muscle building',
      'Perfect for high activity level',
      'Matches your power plate preferences',
    ],
    similarMeals: ['Turkey Power Bowl', 'Beef & Quinoa Skillet'],
  },
  {
    id: 'ai-rec-4',
    name: 'Energy Boost Breakfast Bowl',
    description:
      'Organic eggs with quinoa hash, avocado, and seasonal vegetables for sustained energy.',
    image: '🍳',
    cuisine: 'American',
    prepTime: 15,
    calories: 380,
    protein: 22,
    carbs: 24,
    fat: 20,
    price: 13.99,
    confidence: 82,
    reasonTags: ['Energy Boost', 'Breakfast', 'Quick'],
    nutritionScore: 85,
    ingredients: [
      'Organic Eggs',
      'Quinoa Hash',
      'Avocado',
      'Spinach',
      'Bell Peppers',
    ],
    allergens: ['Eggs'],
    dietaryTags: ['Vegetarian', 'High-Protein', 'Whole Foods'],
    matchReasons: [
      'Designed for energy boost goals',
      'Quick 15-minute prep time',
      'Contains favorite quinoa and avocado',
      'Perfect for active lifestyle',
    ],
    similarMeals: ['Veggie Scramble Bowl', 'Protein Breakfast Plate'],
  },
]

const generateAIInsights = (_profile: UserProfile): AIInsight[] => [
  {
    type: 'preference',
    title: 'Mediterranean Pattern Detected',
    description:
      'You order Mediterranean meals 40% more often than average. Consider our new Greek collection.',
    confidence: 87,
    actionable: true,
  },
  {
    type: 'nutrition',
    title: 'Protein Goal Optimization',
    description:
      'Your recent meals average 28g protein. Increase to 35g for better muscle building results.',
    confidence: 92,
    actionable: true,
  },
  {
    type: 'variety',
    title: 'Ingredient Diversity',
    description:
      'Try adding more colorful vegetables to increase micronutrient variety.',
    confidence: 78,
    actionable: true,
  },
  {
    type: 'seasonal',
    title: 'Fall Seasonal Alignment',
    description:
      'Root vegetables and warming spices align well with your current preferences.',
    confidence: 71,
    actionable: false,
  },
]

export const AIPoweredMealRecommendations: React.FC = () => {
  const [userProfile] = useState<UserProfile>(generateUserProfile())
  const [recommendations, setRecommendations] = useState<MealRecommendation[]>(
    []
  )
  const [insights, setInsights] = useState<AIInsight[]>([])
  const [selectedMeal, setSelectedMeal] = useState<MealRecommendation | null>(
    null
  )
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [feedbackGiven, setFeedbackGiven] = useState<
    Record<string, 'like' | 'dislike'>
  >({})

  useEffect(() => {
    const recs = generateAIRecommendations(userProfile)
    const aiInsights = generateAIInsights(userProfile)

    setRecommendations(recs)
    setInsights(aiInsights)
    setSelectedMeal(recs[0])
  }, [userProfile])

  const refreshRecommendations = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      const newRecs = generateAIRecommendations(userProfile)
      setRecommendations(newRecs)
      setIsRefreshing(false)
    }, 1500)
  }

  const giveFeedback = (mealId: string, feedback: 'like' | 'dislike') => {
    setFeedbackGiven(prev => ({ ...prev, [mealId]: feedback }))
  }

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-green-600 bg-green-100'
    if (confidence >= 80) return 'text-blue-600 bg-blue-100'
    if (confidence >= 70) return 'text-yellow-600 bg-yellow-100'
    return 'text-red-600 bg-red-100'
  }

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'preference':
        return User
      case 'nutrition':
        return Target
      case 'budget':
        return TrendingUp
      case 'variety':
        return Sparkles
      case 'seasonal':
        return Clock
      default:
        return Brain
    }
  }

  return (
    <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl overflow-hidden shadow-2xl">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-8">
        <FadeIn>
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Brain className="w-8 h-8" />
              <h2 className="text-3xl font-bold">
                AI-Powered Meal Recommendations
              </h2>
              <Sparkles className="w-8 h-8" />
            </div>
            <p className="text-purple-100 text-lg">
              Personalized meal suggestions powered by machine learning
            </p>
          </div>
        </FadeIn>
      </div>

      <div className="p-8">
        {/* User Profile Summary */}
        <FadeIn delay={0.1}>
          <div className="bg-white rounded-2xl p-6 mb-8 shadow-lg">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Welcome back, {userProfile.name}!
                </h3>
                <p className="text-gray-600">
                  Here are your personalized recommendations
                </p>
              </div>
              <button
                onClick={refreshRecommendations}
                disabled={isRefreshing}
                className="ml-auto flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
              >
                <RefreshCw
                  className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`}
                />
                <span>Refresh</span>
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-sm text-gray-600">Activity Level</div>
                <div className="font-semibold text-purple-600 capitalize">
                  {userProfile.activityLevel}
                </div>
              </div>
              <div className="text-center">
                <div className="text-sm text-gray-600">Diet Focus</div>
                <div className="font-semibold text-blue-600">
                  {userProfile.dietaryPreferences[0]}
                </div>
              </div>
              <div className="text-center">
                <div className="text-sm text-gray-600">Primary Goal</div>
                <div className="font-semibold text-green-600">
                  {userProfile.healthGoals[0]}
                </div>
              </div>
              <div className="text-center">
                <div className="text-sm text-gray-600">Budget</div>
                <div className="font-semibold text-orange-600 capitalize">
                  {userProfile.budget}
                </div>
              </div>
            </div>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recommendations List */}
          <div className="lg:col-span-2">
            <FadeIn delay={0.2}>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">
                  Recommended for You
                </h3>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Brain className="w-4 h-4" />
                  <span>AI Confidence Scores</span>
                </div>
              </div>

              <StaggeredAnimation className="space-y-6">
                {recommendations.map(meal => (
                  <div
                    key={meal.id}
                    onClick={() => setSelectedMeal(meal)}
                    className={`bg-white rounded-2xl p-6 shadow-lg cursor-pointer transition-all hover:shadow-xl ${
                      selectedMeal?.id === meal.id
                        ? 'ring-2 ring-purple-500'
                        : ''
                    }`}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="text-4xl">{meal.image}</div>

                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="font-bold text-lg text-gray-900">
                              {meal.name}
                            </h4>
                            <p className="text-gray-600 text-sm">
                              {meal.description}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-gray-900">
                              ${meal.price}
                            </div>
                            <div
                              className={`text-xs px-2 py-1 rounded-full ${getConfidenceColor(meal.confidence)}`}
                            >
                              {meal.confidence}% match
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-4 mb-3">
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4 text-gray-500" />
                            <span className="text-sm text-gray-600">
                              {meal.prepTime} min
                            </span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Zap className="w-4 h-4 text-gray-500" />
                            <span className="text-sm text-gray-600">
                              {meal.calories} cal
                            </span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Target className="w-4 h-4 text-gray-500" />
                            <span className="text-sm text-gray-600">
                              {meal.protein}g protein
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {meal.reasonTags.map((tag, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Star className="w-4 h-4 text-yellow-500" />
                            <span className="text-sm text-gray-600">
                              Nutrition Score: {meal.nutritionScore}/100
                            </span>
                          </div>

                          <div className="flex items-center space-x-2">
                            <button
                              onClick={e => {
                                e.stopPropagation()
                                giveFeedback(meal.id, 'like')
                              }}
                              className={`p-2 rounded-full transition-colors ${
                                feedbackGiven[meal.id] === 'like'
                                  ? 'bg-green-100 text-green-600'
                                  : 'bg-gray-100 text-gray-500 hover:bg-green-100 hover:text-green-600'
                              }`}
                            >
                              <ThumbsUp className="w-4 h-4" />
                            </button>
                            <button
                              onClick={e => {
                                e.stopPropagation()
                                giveFeedback(meal.id, 'dislike')
                              }}
                              className={`p-2 rounded-full transition-colors ${
                                feedbackGiven[meal.id] === 'dislike'
                                  ? 'bg-red-100 text-red-600'
                                  : 'bg-gray-100 text-gray-500 hover:bg-red-100 hover:text-red-600'
                              }`}
                            >
                              <ThumbsDown className="w-4 h-4" />
                            </button>
                            <button className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                              <ShoppingCart className="w-4 h-4" />
                              <span>Add to Cart</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </StaggeredAnimation>
            </FadeIn>
          </div>

          {/* Selected Meal Details & AI Insights */}
          <div className="space-y-6">
            {/* Selected Meal Details */}
            {selectedMeal && (
              <FadeIn delay={0.3}>
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <h3 className="text-lg font-semibold mb-4 text-gray-900 flex items-center">
                    <ChefHat className="w-5 h-5 text-purple-600 mr-2" />
                    Why This Match?
                  </h3>

                  <ul className="space-y-3">
                    {selectedMeal.matchReasons.map((reason, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm text-gray-700">{reason}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Similar Options
                    </h4>
                    <div className="space-y-2">
                      {selectedMeal.similarMeals.map((meal, index) => (
                        <div
                          key={index}
                          className="text-sm text-purple-600 hover:text-purple-800 cursor-pointer"
                        >
                          • {meal}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </FadeIn>
            )}

            {/* AI Insights */}
            <FadeIn delay={0.4}>
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-lg font-semibold mb-4 text-gray-900 flex items-center">
                  <Brain className="w-5 h-5 text-blue-600 mr-2" />
                  AI Insights
                </h3>

                <div className="space-y-4">
                  {insights.map((insight, index) => {
                    const IconComponent = getInsightIcon(insight.type)
                    return (
                      <div key={index} className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-start space-x-3">
                          <IconComponent className="w-5 h-5 text-blue-600 mt-0.5" />
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 mb-1">
                              {insight.title}
                            </h4>
                            <p className="text-sm text-gray-600 mb-2">
                              {insight.description}
                            </p>
                            <div className="flex items-center justify-between">
                              <div
                                className={`text-xs px-2 py-1 rounded-full ${getConfidenceColor(insight.confidence)}`}
                              >
                                {insight.confidence}% confidence
                              </div>
                              {insight.actionable && (
                                <button className="text-xs text-purple-600 hover:text-purple-800 font-semibold">
                                  Take Action →
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </FadeIn>

            {/* Learning Status */}
            <FadeIn delay={0.5}>
              <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-2xl p-6">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <Settings className="w-5 h-5 text-purple-600 mr-2" />
                  AI Learning Status
                </h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Preference Learning</span>
                      <span className="font-semibold">87%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-500 h-2 rounded-full w-[87%]"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Nutrition Analysis</span>
                      <span className="font-semibold">92%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full w-[92%]"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Seasonal Patterns</span>
                      <span className="font-semibold">74%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full w-[74%]"></div>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-gray-600 mt-3">
                  The more you interact, the better our recommendations become!
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AIPoweredMealRecommendations
