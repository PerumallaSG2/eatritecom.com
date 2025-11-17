import React, { useState, useEffect } from 'react'
import {
  Award,
  Zap,
  Heart,
  Leaf,
  Shield,
  Flame,
  Target,
  BarChart3,
  CheckCircle2,
} from 'lucide-react'
import { FadeIn, StaggeredAnimation } from './AnimationComponents'

interface NutritionMetric {
  name: string
  factor75Score: number
  fastFoodScore: number
  restaurantScore: number
  icon: React.ComponentType<any>
  color: string
  unit: string
  description: string
}

interface ComparisonData {
  category: string
  factor75: number
  fastFood: number
  restaurant: number
  homeCooking: number
}

const nutritionMetrics: NutritionMetric[] = [
  {
    name: 'Protein Quality',
    factor75Score: 95,
    fastFoodScore: 45,
    restaurantScore: 70,
    icon: Zap,
    color: 'blue',
    unit: 'score',
    description:
      'High-quality, complete proteins with optimal amino acid profiles',
  },
  {
    name: 'Nutrient Density',
    factor75Score: 92,
    fastFoodScore: 25,
    restaurantScore: 55,
    icon: Award,
    color: 'purple',
    unit: 'score',
    description:
      'Maximum nutrients per calorie with vitamins, minerals, and antioxidants',
  },
  {
    name: 'Sodium Control',
    factor75Score: 88,
    fastFoodScore: 15,
    restaurantScore: 35,
    icon: Heart,
    color: 'red',
    unit: 'score',
    description: 'Heart-healthy sodium levels without compromising taste',
  },
  {
    name: 'Clean Ingredients',
    factor75Score: 98,
    fastFoodScore: 20,
    restaurantScore: 60,
    icon: Leaf,
    color: 'green',
    unit: 'score',
    description: 'No artificial preservatives, colors, or processed additives',
  },
  {
    name: 'Calorie Balance',
    factor75Score: 90,
    fastFoodScore: 30,
    restaurantScore: 50,
    icon: Flame,
    color: 'orange',
    unit: 'score',
    description: 'Portion-controlled meals designed for optimal energy balance',
  },
  {
    name: 'Micronutrient Profile',
    factor75Score: 94,
    fastFoodScore: 35,
    restaurantScore: 65,
    icon: Shield,
    color: 'indigo',
    unit: 'score',
    description: 'Rich in essential vitamins and minerals for optimal health',
  },
]

const comparisonData: ComparisonData[] = [
  {
    category: 'Daily Vegetables',
    factor75: 5.2,
    fastFood: 0.8,
    restaurant: 2.1,
    homeCooking: 3.4,
  },
  {
    category: 'Fiber (g)',
    factor75: 28,
    fastFood: 8,
    restaurant: 12,
    homeCooking: 18,
  },
  {
    category: 'Added Sugar (g)',
    factor75: 6,
    fastFood: 35,
    restaurant: 22,
    homeCooking: 15,
  },
  {
    category: 'Omega-3 (mg)',
    factor75: 1200,
    fastFood: 150,
    restaurant: 400,
    homeCooking: 600,
  },
  {
    category: 'Antioxidants (ORAC)',
    factor75: 8500,
    fastFood: 1200,
    restaurant: 3200,
    homeCooking: 4800,
  },
]

export const LiveNutritionScore: React.FC = () => {
  const [selectedMetric, setSelectedMetric] = useState<NutritionMetric>(
    nutritionMetrics[0]
  )
  const [animatedScores, setAnimatedScores] = useState({
    factor75: 0,
    fastFood: 0,
    restaurant: 0,
  })
  const [overallScore, setOverallScore] = useState(0)

  useEffect(() => {
    // Calculate overall Factor75 score
    const total = nutritionMetrics.reduce(
      (sum, metric) => sum + metric.factor75Score,
      0
    )
    const avgScore = Math.round(total / nutritionMetrics.length)

    // Animate scores
    const animateScore = (target: number, setter: (value: number) => void) => {
      let current = 0
      const increment = target / 50
      const timer = setInterval(() => {
        current += increment
        if (current >= target) {
          current = target
          clearInterval(timer)
        }
        setter(Math.round(current))
      }, 20)
    }

    setTimeout(() => {
      animateScore(avgScore, setOverallScore)
      animateScore(selectedMetric.factor75Score, val =>
        setAnimatedScores(prev => ({ ...prev, factor75: val }))
      )
      animateScore(selectedMetric.fastFoodScore, val =>
        setAnimatedScores(prev => ({ ...prev, fastFood: val }))
      )
      animateScore(selectedMetric.restaurantScore, val =>
        setAnimatedScores(prev => ({ ...prev, restaurant: val }))
      )
    }, 500)
  }, [selectedMetric])

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
    if (score >= 40) return 'text-orange-600'
    return 'text-red-600'
  }

  const getScoreBg = (score: number) => {
    if (score >= 80) return 'bg-green-100 border-green-200'
    if (score >= 60) return 'bg-yellow-100 border-yellow-200'
    if (score >= 40) return 'bg-orange-100 border-orange-200'
    return 'bg-red-100 border-red-200'
  }

  return (
    <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-2xl overflow-hidden shadow-2xl">
      <FadeIn>
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-8">
          <div className="text-center">
            <BarChart3 className="w-12 h-12 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-2">Live Nutrition Score</h2>
            <p className="text-green-100 text-lg">
              Real-time comparison: Factor75 vs Fast Food vs Restaurant meals
            </p>
          </div>
        </div>
      </FadeIn>

      <div className="p-8">
        {/* Overall Score */}
        <FadeIn delay={0.1}>
          <div className="text-center mb-8">
            <div className="inline-block bg-white rounded-2xl p-8 shadow-xl">
              <div className="flex items-center justify-center space-x-4">
                <Target className="w-12 h-12 text-green-600" />
                <div>
                  <div className="text-4xl font-bold text-green-600">
                    {overallScore}/100
                  </div>
                  <div className="text-lg text-gray-700 font-semibold">
                    Factor75 Nutrition Score
                  </div>
                  <div className="text-sm text-gray-500">
                    Industry-leading nutritional quality
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Metric Selection */}
          <div>
            <FadeIn delay={0.2}>
              <h3 className="text-xl font-semibold mb-6 text-gray-900">
                Select a Nutrition Metric
              </h3>
              <StaggeredAnimation className="space-y-3">
                {nutritionMetrics.map(metric => {
                  const IconComponent = metric.icon
                  return (
                    <button
                      key={metric.name}
                      onClick={() => setSelectedMetric(metric)}
                      className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                        selectedMetric.name === metric.name
                          ? `border-${metric.color}-500 bg-${metric.color}-50`
                          : 'border-gray-200 hover:border-gray-300 bg-white'
                      }`}
                    >
                      <div className="flex items-center space-x-4">
                        <IconComponent
                          className={`w-8 h-8 ${
                            selectedMetric.name === metric.name
                              ? `text-${metric.color}-600`
                              : 'text-gray-400'
                          }`}
                        />
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">
                            {metric.name}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {metric.description}
                          </p>
                        </div>
                        <div
                          className={`text-right ${getScoreColor(metric.factor75Score)}`}
                        >
                          <div className="text-2xl font-bold">
                            {metric.factor75Score}
                          </div>
                          <div className="text-xs">Factor75</div>
                        </div>
                      </div>
                    </button>
                  )
                })}
              </StaggeredAnimation>
            </FadeIn>
          </div>

          {/* Score Comparison */}
          <div>
            <FadeIn delay={0.3}>
              <h3 className="text-xl font-semibold mb-6 text-gray-900">
                {selectedMetric.name} Comparison
              </h3>

              <div className="space-y-6">
                {/* Factor75 Score */}
                <div
                  className={`p-6 rounded-xl border-2 ${getScoreBg(selectedMetric.factor75Score)}`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-bold text-lg text-gray-900">
                      Factor75
                    </h4>
                    <div
                      className={`text-3xl font-bold ${getScoreColor(selectedMetric.factor75Score)}`}
                    >
                      {animatedScores.factor75}
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                    <div
                      className="bg-green-500 h-3 rounded-full transition-all duration-1000"
                      style={{ width: `${animatedScores.factor75}%` }}
                    ></div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                    <span className="text-sm text-gray-700">
                      Professionally optimized
                    </span>
                  </div>
                </div>

                {/* Restaurant Score */}
                <div
                  className={`p-6 rounded-xl border-2 ${getScoreBg(selectedMetric.restaurantScore)}`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-bold text-lg text-gray-900">
                      Restaurant Meals
                    </h4>
                    <div
                      className={`text-3xl font-bold ${getScoreColor(selectedMetric.restaurantScore)}`}
                    >
                      {animatedScores.restaurant}
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                    <div
                      className="bg-yellow-500 h-3 rounded-full transition-all duration-1000"
                      style={{ width: `${animatedScores.restaurant}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600">
                    Inconsistent quality
                  </span>
                </div>

                {/* Fast Food Score */}
                <div
                  className={`p-6 rounded-xl border-2 ${getScoreBg(selectedMetric.fastFoodScore)}`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-bold text-lg text-gray-900">
                      Fast Food
                    </h4>
                    <div
                      className={`text-3xl font-bold ${getScoreColor(selectedMetric.fastFoodScore)}`}
                    >
                      {animatedScores.fastFood}
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                    <div
                      className="bg-red-500 h-3 rounded-full transition-all duration-1000"
                      style={{ width: `${animatedScores.fastFood}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600">
                    Highly processed
                  </span>
                </div>
              </div>
            </FadeIn>

            {/* Detailed Comparison Chart */}
            <FadeIn delay={0.4}>
              <div className="mt-8 bg-white rounded-xl p-6 shadow-lg">
                <h4 className="font-semibold text-gray-900 mb-4">
                  Nutritional Breakdown
                </h4>
                <div className="space-y-4">
                  {comparisonData.map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-700">
                          {item.category}
                        </span>
                        <div className="flex space-x-4 text-sm">
                          <span className="text-green-600 font-semibold">
                            Factor75: {item.factor75}
                            {item.category.includes('Daily')
                              ? ''
                              : item.category.includes('ORAC')
                                ? ''
                                : item.category.includes('(g)')
                                  ? 'g'
                                  : item.category.includes('(mg)')
                                    ? 'mg'
                                    : ''}
                          </span>
                          <span className="text-red-600">
                            Fast Food: {item.fastFood}
                            {item.category.includes('Daily')
                              ? ''
                              : item.category.includes('ORAC')
                                ? ''
                                : item.category.includes('(g)')
                                  ? 'g'
                                  : item.category.includes('(mg)')
                                    ? 'mg'
                                    : ''}
                          </span>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-2 h-2">
                        <div className="bg-green-500 rounded-full"></div>
                        <div className="bg-yellow-400 rounded-full opacity-60"></div>
                        <div className="bg-red-500 rounded-full opacity-40"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>

        {/* Key Benefits */}
        <FadeIn delay={0.5}>
          <div className="mt-8 bg-white rounded-xl p-6 shadow-lg">
            <h4 className="font-semibold text-gray-900 mb-6 text-center">
              Why Factor75 Scores Higher
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Award className="w-6 h-6 text-blue-600" />
                </div>
                <h5 className="font-semibold text-gray-900 mb-2">
                  Chef-Crafted
                </h5>
                <p className="text-sm text-gray-600">
                  Designed by nutritionists and prepared by professional chefs
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Leaf className="w-6 h-6 text-green-600" />
                </div>
                <h5 className="font-semibold text-gray-900 mb-2">
                  Premium Ingredients
                </h5>
                <p className="text-sm text-gray-600">
                  Sourced from trusted suppliers with no artificial additives
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Target className="w-6 h-6 text-purple-600" />
                </div>
                <h5 className="font-semibold text-gray-900 mb-2">
                  Precision Nutrition
                </h5>
                <p className="text-sm text-gray-600">
                  Macros and micros perfectly balanced for your health goals
                </p>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  )
}

export default LiveNutritionScore
