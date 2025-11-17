import React, { useState, useEffect } from 'react'
import {
  Brain,
  Star,
  TrendingUp,
  Target,
  Zap,
  Clock,
  Award,
  ChefHat,
} from 'lucide-react'

interface PersonalizationData {
  userId: string
  preferences: {
    dietaryRestrictions: string[]
    cuisinePreferences: string[]
    allergies: string[]
    healthGoals: string[]
    mealTiming: string[]
  }
  behaviorData: {
    orderHistory: string[]
    ratingsHistory: { mealId: string; rating: number; date: string }[]
    clickPatterns: string[]
    searchHistory: string[]
  }
  healthMetrics: {
    bmi?: number
    activityLevel: string
    targetCalories?: number
    weightGoal?: string
  }
}

interface MealRecommendation {
  id: string
  name: string
  description: string
  imageUrl: string
  price: number
  confidence: number
  reasons: string[]
  nutritionMatch: number
  tasteMatch: number
  healthGoalAlignment: number
  category: string
  calories: number
  protein: number
}

interface AIPersonalizationEngineProps {
  userId: string
  onRecommendationClick?: (mealId: string) => void
}

const AIPersonalizationEngine: React.FC<AIPersonalizationEngineProps> = ({
  userId,
  onRecommendationClick,
}) => {
  const [personalizationData, setPersonalizationData] =
    useState<PersonalizationData | null>(null)
  const [recommendations, setRecommendations] = useState<MealRecommendation[]>(
    []
  )
  const [insightType, setInsightType] = useState<
    'recommendations' | 'insights' | 'trends'
  >('recommendations')
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  // Mock personalization data
  const mockPersonalizationData: PersonalizationData = {
    userId: userId,
    preferences: {
      dietaryRestrictions: ['Gluten Free', 'Low Sodium'],
      cuisinePreferences: ['Mediterranean', 'Asian Fusion', 'Italian'],
      allergies: ['Nuts'],
      healthGoals: ['Weight Loss', 'Muscle Building', 'Better Energy'],
      mealTiming: ['Lunch', 'Dinner'],
    },
    behaviorData: {
      orderHistory: ['meal_1', 'meal_3', 'meal_7', 'meal_12'],
      ratingsHistory: [
        { mealId: 'meal_1', rating: 5, date: '2024-01-15' },
        { mealId: 'meal_3', rating: 4, date: '2024-01-18' },
        { mealId: 'meal_7', rating: 5, date: '2024-01-22' },
      ],
      clickPatterns: ['high-protein', 'mediterranean', 'quinoa-bowls'],
      searchHistory: ['salmon', 'quinoa', 'mediterranean', 'high protein'],
    },
    healthMetrics: {
      bmi: 24.5,
      activityLevel: 'Moderate',
      targetCalories: 1800,
      weightGoal: 'Maintain',
    },
  }

  // Mock AI-generated recommendations
  const mockRecommendations: MealRecommendation[] = [
    {
      id: 'rec_1',
      name: 'Mediterranean Salmon with Quinoa',
      description: 'Perfectly matches your taste profile and health goals',
      imageUrl: '/api/placeholder/300/200',
      price: 17.99,
      confidence: 94,
      reasons: [
        'High protein content aligns with muscle building goal',
        'Mediterranean cuisine preference match',
        'Similar to your 5-star rated meals',
        'Gluten-free and nut-free',
      ],
      nutritionMatch: 96,
      tasteMatch: 91,
      healthGoalAlignment: 98,
      category: 'Seafood',
      calories: 520,
      protein: 42,
    },
    {
      id: 'rec_2',
      name: 'Asian Fusion Chicken Bowl',
      description: 'New flavor profile based on your evolving tastes',
      imageUrl: '/api/placeholder/300/200',
      price: 15.99,
      confidence: 89,
      reasons: [
        'Asian fusion matches your cuisine preferences',
        'Optimal calorie count for your goals',
        'High protein, low sodium preparation',
        'Trending among similar users',
      ],
      nutritionMatch: 87,
      tasteMatch: 94,
      healthGoalAlignment: 85,
      category: 'Asian',
      calories: 460,
      protein: 38,
    },
    {
      id: 'rec_3',
      name: 'Italian Herb-Crusted Chicken',
      description: 'Comfort food reimagined for your dietary needs',
      imageUrl: '/api/placeholder/300/200',
      price: 16.99,
      confidence: 82,
      reasons: [
        'Italian cuisine in your preference list',
        'Gluten-free preparation available',
        'Balanced macros for energy goals',
        'Highly rated by users with similar profiles',
      ],
      nutritionMatch: 89,
      tasteMatch: 78,
      healthGoalAlignment: 88,
      category: 'Italian',
      calories: 485,
      protein: 40,
    },
  ]

  useEffect(() => {
    const loadPersonalizationData = async () => {
      setLoading(true)
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        setPersonalizationData(mockPersonalizationData)
        setRecommendations(mockRecommendations)
      } catch (error) {
        console.error('Error loading personalization data:', error)
      } finally {
        setLoading(false)
      }
    }

    loadPersonalizationData()
  }, [userId])

  const refreshRecommendations = async () => {
    setRefreshing(true)
    try {
      // Simulate AI recalculation
      await new Promise(resolve => setTimeout(resolve, 2000))
      // Shuffle recommendations to simulate new AI insights
      const shuffled = [...mockRecommendations].sort(() => Math.random() - 0.5)
      setRecommendations(shuffled)
    } catch (error) {
      console.error('Error refreshing recommendations:', error)
    } finally {
      setRefreshing(false)
    }
  }

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-green-600'
    if (confidence >= 80) return 'text-yellow-600'
    return 'text-orange-600'
  }

  const getConfidenceBg = (confidence: number) => {
    if (confidence >= 90) return 'bg-green-100'
    if (confidence >= 80) return 'bg-yellow-100'
    return 'bg-orange-100'
  }

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="bg-white rounded-xl p-8 shadow-lg border border-[#D4B46A]/20 text-center">
          <div className="w-12 h-12 bg-gradient-to-r from-[#0F2B1E] to-[#D4B46A] rounded-xl flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-lg font-bold text-[#0F2B1E] mb-2">
            AI is Learning Your Preferences...
          </h3>
          <p className="text-gray-600">
            Analyzing your taste profile and generating personalized
            recommendations
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0F2B1E] to-[#0A2418] rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#D4B46A] rounded-xl flex items-center justify-center">
              <Brain className="w-6 h-6 text-[#0F2B1E]" />
            </div>
            <div>
              <h1
                className="text-2xl font-bold"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                AI Personalization Engine
              </h1>
              <p className="text-[#F5F2E8]/80">
                Tailored meal recommendations just for you
              </p>
            </div>
          </div>
          <button
            onClick={refreshRecommendations}
            disabled={refreshing}
            className="bg-[#D4B46A] hover:bg-[#B8935A] text-[#0F2B1E] font-bold py-2 px-4 rounded-lg transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            <Zap className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
            {refreshing ? 'Refreshing...' : 'Refresh AI'}
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-xl shadow-lg border border-[#D4B46A]/20">
        <div className="flex">
          {[
            { id: 'recommendations', label: 'Recommendations', icon: Target },
            { id: 'insights', label: 'Personal Insights', icon: TrendingUp },
            { id: 'trends', label: 'Taste Trends', icon: Star },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setInsightType(tab.id as any)}
              className={`flex-1 flex items-center justify-center gap-2 py-4 px-6 font-medium transition-colors ${
                insightType === tab.id
                  ? 'bg-[#D4B46A] text-[#0F2B1E] border-b-2 border-[#0F2B1E]'
                  : 'text-gray-600 hover:text-[#0F2B1E] hover:bg-[#F5EEDC]'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {insightType === 'recommendations' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {recommendations.map(recommendation => (
            <div
              key={recommendation.id}
              className="bg-white rounded-xl shadow-lg border border-[#D4B46A]/20 overflow-hidden group hover:shadow-xl transition-shadow"
            >
              {/* Confidence Badge */}
              <div className="relative">
                <img
                  src={recommendation.imageUrl}
                  alt={recommendation.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div
                  className={`absolute top-3 right-3 ${getConfidenceBg(recommendation.confidence)} px-3 py-1 rounded-full`}
                >
                  <span
                    className={`font-bold text-sm ${getConfidenceColor(recommendation.confidence)}`}
                  >
                    {recommendation.confidence}% match
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-bold text-[#0F2B1E] text-lg">
                    {recommendation.name}
                  </h3>
                  <div className="text-right">
                    <div className="font-bold text-[#0F2B1E]">
                      ${recommendation.price}
                    </div>
                    <div className="text-xs text-gray-500">
                      {recommendation.calories} cal
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4">
                  {recommendation.description}
                </p>

                {/* Match Scores */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                  <div className="text-center">
                    <div className="text-xs text-gray-500">Nutrition</div>
                    <div className="font-bold text-[#D4B46A] text-sm">
                      {recommendation.nutritionMatch}%
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-gray-500">Taste</div>
                    <div className="font-bold text-[#D4B46A] text-sm">
                      {recommendation.tasteMatch}%
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-gray-500">Goals</div>
                    <div className="font-bold text-[#D4B46A] text-sm">
                      {recommendation.healthGoalAlignment}%
                    </div>
                  </div>
                </div>

                {/* AI Reasons */}
                <div className="space-y-1 mb-4">
                  <div className="text-xs font-medium text-[#0F2B1E] mb-2">
                    Why we recommend this:
                  </div>
                  {recommendation.reasons.slice(0, 2).map((reason, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-2 text-xs text-gray-600"
                    >
                      <div className="w-1.5 h-1.5 bg-[#D4B46A] rounded-full mt-1.5 flex-shrink-0" />
                      {reason}
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => onRecommendationClick?.(recommendation.id)}
                  className="w-full bg-gradient-to-r from-[#0F2B1E] to-[#0A2418] hover:from-[#0A2418] hover:to-[#0F2B1E] text-[#F5F2E8] font-bold py-3 px-4 rounded-lg transition-all duration-300 hover:scale-105"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {insightType === 'insights' && personalizationData && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Taste Profile */}
          <div className="bg-white rounded-xl p-6 shadow-lg border border-[#D4B46A]/20">
            <div className="flex items-center gap-3 mb-4">
              <ChefHat className="w-6 h-6 text-[#D4B46A]" />
              <h3 className="font-bold text-[#0F2B1E]">Your Taste Profile</h3>
            </div>
            <div className="space-y-3">
              <div>
                <div className="text-sm font-medium text-gray-600 mb-2">
                  Favorite Cuisines
                </div>
                <div className="flex flex-wrap gap-1">
                  {personalizationData.preferences.cuisinePreferences.map(
                    cuisine => (
                      <span
                        key={cuisine}
                        className="bg-[#D4B46A]/20 text-[#0F2B1E] text-xs px-2 py-1 rounded-full"
                      >
                        {cuisine}
                      </span>
                    )
                  )}
                </div>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-600 mb-2">
                  Health Goals
                </div>
                <div className="flex flex-wrap gap-1">
                  {personalizationData.preferences.healthGoals.map(goal => (
                    <span
                      key={goal}
                      className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full"
                    >
                      {goal}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Eating Patterns */}
          <div className="bg-white rounded-xl p-6 shadow-lg border border-[#D4B46A]/20">
            <div className="flex items-center gap-3 mb-4">
              <Clock className="w-6 h-6 text-[#D4B46A]" />
              <h3 className="font-bold text-[#0F2B1E]">Eating Patterns</h3>
            </div>
            <div className="space-y-3">
              <div>
                <div className="text-sm font-medium text-gray-600">
                  Target Calories
                </div>
                <div className="text-2xl font-bold text-[#0F2B1E]">
                  {personalizationData.healthMetrics.targetCalories}
                </div>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-600">
                  Activity Level
                </div>
                <div className="font-medium text-[#D4B46A]">
                  {personalizationData.healthMetrics.activityLevel}
                </div>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-600">
                  Preferred Meal Times
                </div>
                <div className="flex gap-1">
                  {personalizationData.preferences.mealTiming.map(time => (
                    <span
                      key={time}
                      className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full"
                    >
                      {time}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-white rounded-xl p-6 shadow-lg border border-[#D4B46A]/20">
            <div className="flex items-center gap-3 mb-4">
              <Award className="w-6 h-6 text-[#D4B46A]" />
              <h3 className="font-bold text-[#0F2B1E]">AI Learning Progress</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">
                  Taste Preferences Learned
                </span>
                <span className="font-bold text-[#D4B46A]">87%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-[#D4B46A] h-2 rounded-full"
                  style={{ width: '87%' }}
                />
              </div>
              <div className="text-xs text-gray-500">
                Based on{' '}
                {personalizationData.behaviorData.ratingsHistory.length} meal
                ratings and order history
              </div>
            </div>
          </div>
        </div>
      )}

      {insightType === 'trends' && (
        <div className="bg-white rounded-xl p-6 shadow-lg border border-[#D4B46A]/20">
          <h3 className="font-bold text-[#0F2B1E] text-xl mb-6">
            Your Taste Evolution
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-medium text-[#0F2B1E] mb-4">
                Recent Search Trends
              </h4>
              <div className="space-y-2">
                {personalizationData?.behaviorData.searchHistory.map(
                  (search, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 bg-[#F5EEDC] rounded-lg"
                    >
                      <span className="text-sm">{search}</span>
                      <span className="text-xs text-[#D4B46A] font-medium">
                        Trending ↗
                      </span>
                    </div>
                  )
                )}
              </div>
            </div>
            <div>
              <h4 className="font-medium text-[#0F2B1E] mb-4">
                Rating History
              </h4>
              <div className="space-y-2">
                {personalizationData?.behaviorData.ratingsHistory.map(
                  (rating, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 bg-[#F5EEDC] rounded-lg"
                    >
                      <span className="text-sm">
                        Meal #{rating.mealId.split('_')[1]}
                      </span>
                      <div className="flex items-center gap-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${i < rating.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-gray-500">
                          {rating.date}
                        </span>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AIPersonalizationEngine
