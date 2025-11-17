import React, { useState, useEffect } from 'react'
import {
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Star,
  Zap,
  ArrowRight,
  Filter,
  Search,
  Heart,
  Shield,
  Lightbulb,
  TrendingUp,
  Users,
  Clock,
} from 'lucide-react'
import { FadeIn, StaggeredAnimation } from './AnimationComponents'

interface Ingredient {
  id: string
  name: string
  category: string
  allergens: string[]
  nutritionPer100g: {
    calories: number
    protein: number
    carbs: number
    fat: number
    fiber: number
    sugar: number
  }
  tags: string[]
  commonUses: string[]
}

interface SubstitutionSuggestion {
  id: string
  originalIngredient: Ingredient
  substitutes: Array<{
    ingredient: Ingredient
    confidence: number
    reason: string
    nutritionComparison: {
      calories: 'better' | 'similar' | 'worse'
      protein: 'better' | 'similar' | 'worse'
      healthScore: number
    }
    substitutionRatio: string
    cookingAdjustments?: string
    flavorImpact: 'minimal' | 'slight' | 'noticeable' | 'significant'
    availability: 'common' | 'specialty' | 'rare'
    cost: 'lower' | 'similar' | 'higher'
  }>
  mealContext: string
  allergensAvoided: string[]
  dietaryBenefits: string[]
}

interface UserPreferences {
  allergies: string[]
  dietaryRestrictions: string[]
  nutritionGoals: string[]
  flavorPreferences: string[]
  budgetConstraints: 'low' | 'medium' | 'high'
  cookingSkill: 'beginner' | 'intermediate' | 'advanced'
}

const generateIngredients = (): Ingredient[] => [
  {
    id: 'chicken-breast',
    name: 'Chicken Breast',
    category: 'protein',
    allergens: [],
    nutritionPer100g: {
      calories: 165,
      protein: 31,
      carbs: 0,
      fat: 3.6,
      fiber: 0,
      sugar: 0,
    },
    tags: ['lean', 'versatile', 'complete-protein'],
    commonUses: ['grilling', 'baking', 'stir-frying'],
  },
  {
    id: 'white-rice',
    name: 'White Rice',
    category: 'grain',
    allergens: [],
    nutritionPer100g: {
      calories: 130,
      protein: 2.7,
      carbs: 28,
      fat: 0.3,
      fiber: 0.4,
      sugar: 0.1,
    },
    tags: ['gluten-free', 'refined'],
    commonUses: ['side-dish', 'base', 'stuffing'],
  },
  {
    id: 'butter',
    name: 'Butter',
    category: 'fat',
    allergens: ['dairy'],
    nutritionPer100g: {
      calories: 717,
      protein: 0.9,
      carbs: 0.1,
      fat: 81,
      fiber: 0,
      sugar: 0.1,
    },
    tags: ['saturated-fat', 'flavor-enhancer'],
    commonUses: ['cooking', 'baking', 'spreading'],
  },
  {
    id: 'wheat-flour',
    name: 'All-Purpose Flour',
    category: 'grain',
    allergens: ['gluten'],
    nutritionPer100g: {
      calories: 364,
      protein: 10,
      carbs: 76,
      fat: 1,
      fiber: 2.7,
      sugar: 0.3,
    },
    tags: ['refined', 'baking-essential'],
    commonUses: ['baking', 'coating', 'thickening'],
  },
  {
    id: 'sugar',
    name: 'White Sugar',
    category: 'sweetener',
    allergens: [],
    nutritionPer100g: {
      calories: 387,
      protein: 0,
      carbs: 100,
      fat: 0,
      fiber: 0,
      sugar: 99.8,
    },
    tags: ['refined', 'high-glycemic'],
    commonUses: ['baking', 'sweetening', 'preserving'],
  },
]

const generateSubstitutes = (): Ingredient[] => [
  {
    id: 'tofu',
    name: 'Extra-Firm Tofu',
    category: 'protein',
    allergens: ['soy'],
    nutritionPer100g: {
      calories: 144,
      protein: 15.8,
      carbs: 2.8,
      fat: 8.7,
      fiber: 2.3,
      sugar: 0.6,
    },
    tags: ['plant-based', 'versatile', 'complete-protein'],
    commonUses: ['stir-frying', 'baking', 'grilling'],
  },
  {
    id: 'quinoa',
    name: 'Quinoa',
    category: 'grain',
    allergens: [],
    nutritionPer100g: {
      calories: 120,
      protein: 4.4,
      carbs: 22,
      fat: 1.9,
      fiber: 2.8,
      sugar: 0.9,
    },
    tags: ['gluten-free', 'complete-protein', 'ancient-grain'],
    commonUses: ['side-dish', 'salads', 'stuffing'],
  },
  {
    id: 'coconut-oil',
    name: 'Coconut Oil',
    category: 'fat',
    allergens: [],
    nutritionPer100g: {
      calories: 862,
      protein: 0,
      carbs: 0,
      fat: 100,
      fiber: 0,
      sugar: 0,
    },
    tags: ['plant-based', 'medium-chain-fats'],
    commonUses: ['cooking', 'baking', 'high-heat'],
  },
  {
    id: 'almond-flour',
    name: 'Almond Flour',
    category: 'grain',
    allergens: ['nuts'],
    nutritionPer100g: {
      calories: 571,
      protein: 21,
      carbs: 22,
      fat: 50,
      fiber: 12,
      sugar: 4.4,
    },
    tags: ['gluten-free', 'high-protein', 'keto-friendly'],
    commonUses: ['baking', 'coating', 'low-carb'],
  },
  {
    id: 'honey',
    name: 'Raw Honey',
    category: 'sweetener',
    allergens: [],
    nutritionPer100g: {
      calories: 304,
      protein: 0.3,
      carbs: 82,
      fat: 0,
      fiber: 0.2,
      sugar: 82,
    },
    tags: ['natural', 'antioxidants', 'antimicrobial'],
    commonUses: ['sweetening', 'baking', 'natural-remedy'],
  },
  {
    id: 'tempeh',
    name: 'Tempeh',
    category: 'protein',
    allergens: ['soy'],
    nutritionPer100g: {
      calories: 192,
      protein: 19,
      carbs: 7.6,
      fat: 11,
      fiber: 9,
      sugar: 2.3,
    },
    tags: ['fermented', 'probiotic', 'plant-based'],
    commonUses: ['grilling', 'stir-frying', 'crumbling'],
  },
]

const generateSubstitutionSuggestions = (
  _userPreferences: UserPreferences
): SubstitutionSuggestion[] => {
  const ingredients = generateIngredients()
  const substitutes = generateSubstitutes()

  return [
    {
      id: 'chicken-substitution',
      originalIngredient: ingredients[0],
      substitutes: [
        {
          ingredient: substitutes[0], // Tofu
          confidence: 92,
          reason:
            'High protein, versatile cooking methods, similar texture when pressed',
          nutritionComparison: {
            calories: 'better',
            protein: 'similar',
            healthScore: 8.5,
          },
          substitutionRatio: '1:1 by weight',
          cookingAdjustments:
            'Press tofu for 30 min, marinate longer for flavor',
          flavorImpact: 'minimal',
          availability: 'common',
          cost: 'similar',
        },
        {
          ingredient: substitutes[5], // Tempeh
          confidence: 88,
          reason:
            'Fermented protein with probiotics, firm texture, nutty flavor',
          nutritionComparison: {
            calories: 'similar',
            protein: 'similar',
            healthScore: 9.2,
          },
          substitutionRatio: '1:1 by weight',
          cookingAdjustments:
            'Steam for 10 min before cooking to reduce bitterness',
          flavorImpact: 'noticeable',
          availability: 'specialty',
          cost: 'similar',
        },
      ],
      mealContext: 'Mediterranean Grilled Bowl',
      allergensAvoided: [],
      dietaryBenefits: [
        'Plant-based protein',
        'Lower environmental impact',
        'Cholesterol-free',
      ],
    },
    {
      id: 'rice-substitution',
      originalIngredient: ingredients[1],
      substitutes: [
        {
          ingredient: substitutes[1], // Quinoa
          confidence: 95,
          reason: 'Complete protein, higher fiber, similar cooking method',
          nutritionComparison: {
            calories: 'better',
            protein: 'better',
            healthScore: 9.5,
          },
          substitutionRatio: '1:1 by volume',
          cookingAdjustments: 'Rinse quinoa thoroughly, use 2:1 water ratio',
          flavorImpact: 'slight',
          availability: 'common',
          cost: 'higher',
        },
      ],
      mealContext: 'Power Bowl Base',
      allergensAvoided: [],
      dietaryBenefits: [
        'Complete amino acid profile',
        'Higher fiber',
        'Gluten-free',
      ],
    },
    {
      id: 'flour-substitution',
      originalIngredient: ingredients[3],
      substitutes: [
        {
          ingredient: substitutes[3], // Almond Flour
          confidence: 85,
          reason: 'Gluten-free, high protein, keto-friendly baking alternative',
          nutritionComparison: {
            calories: 'worse',
            protein: 'better',
            healthScore: 8.8,
          },
          substitutionRatio: '1:1 for most recipes (may need binding agent)',
          cookingAdjustments:
            'Add xanthan gum or egg for binding in baked goods',
          flavorImpact: 'noticeable',
          availability: 'common',
          cost: 'higher',
        },
      ],
      mealContext: 'Protein Pancakes',
      allergensAvoided: ['gluten'],
      dietaryBenefits: [
        'Gluten-free',
        'High protein',
        'Low carb',
        'Healthy fats',
      ],
    },
  ]
}

export const SmartSubstitutionSuggestions: React.FC = () => {
  const [userPreferences] = useState<UserPreferences>({
    allergies: ['gluten'],
    dietaryRestrictions: ['vegetarian'],
    nutritionGoals: ['high-protein', 'low-carb'],
    flavorPreferences: ['savory', 'umami'],
    budgetConstraints: 'medium',
    cookingSkill: 'intermediate',
  })

  const [substitutions, setSubstitutions] = useState<SubstitutionSuggestion[]>(
    []
  )
  const [selectedSubstitution, setSelectedSubstitution] =
    useState<SubstitutionSuggestion | null>(null)
  const [filterBy, setFilterBy] = useState<
    'all' | 'allergen-friendly' | 'diet-specific' | 'nutrition-focused'
  >('all')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const suggestions = generateSubstitutionSuggestions(userPreferences)
    setSubstitutions(suggestions)
    setSelectedSubstitution(suggestions[0])
  }, [userPreferences])

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-green-600 bg-green-100'
    if (confidence >= 80) return 'text-blue-600 bg-blue-100'
    if (confidence >= 70) return 'text-yellow-600 bg-yellow-100'
    return 'text-red-600 bg-red-100'
  }

  const getNutritionComparisonIcon = (comparison: string) => {
    switch (comparison) {
      case 'better':
        return <TrendingUp className="w-4 h-4 text-green-500" />
      case 'similar':
        return <RefreshCw className="w-4 h-4 text-blue-500" />
      case 'worse':
        return <TrendingUp className="w-4 h-4 text-red-500 rotate-180" />
      default:
        return null
    }
  }

  const getFlavorImpactColor = (impact: string) => {
    switch (impact) {
      case 'minimal':
        return 'text-green-600 bg-green-50'
      case 'slight':
        return 'text-blue-600 bg-blue-50'
      case 'noticeable':
        return 'text-yellow-600 bg-yellow-50'
      case 'significant':
        return 'text-red-600 bg-red-50'
      default:
        return 'text-gray-600 bg-gray-50'
    }
  }

  const getCostColor = (cost: string) => {
    switch (cost) {
      case 'lower':
        return 'text-green-600'
      case 'similar':
        return 'text-blue-600'
      case 'higher':
        return 'text-red-600'
      default:
        return 'text-gray-600'
    }
  }

  const filteredSubstitutions = substitutions.filter(sub => {
    const matchesSearch =
      searchTerm === '' ||
      sub.originalIngredient.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      sub.substitutes.some(s =>
        s.ingredient.name.toLowerCase().includes(searchTerm.toLowerCase())
      )

    const matchesFilter =
      filterBy === 'all' ||
      (filterBy === 'allergen-friendly' && sub.allergensAvoided.length > 0) ||
      (filterBy === 'diet-specific' && sub.dietaryBenefits.length > 0) ||
      (filterBy === 'nutrition-focused' &&
        sub.substitutes.some(s => s.nutritionComparison.healthScore > 8))

    return matchesSearch && matchesFilter
  })

  return (
    <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl overflow-hidden shadow-2xl">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-8">
        <FadeIn>
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <RefreshCw className="w-8 h-8" />
              <h2 className="text-3xl font-bold">
                Smart Substitution Suggestions
              </h2>
              <Lightbulb className="w-8 h-8" />
            </div>
            <p className="text-green-100 text-lg">
              AI-powered ingredient alternatives tailored to your preferences
            </p>
          </div>
        </FadeIn>
      </div>

      <div className="p-8">
        {/* Controls */}
        <FadeIn delay={0.1}>
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1 relative">
              <Search className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search ingredients..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-600" />
              <select
                value={filterBy}
                onChange={e => setFilterBy(e.target.value as any)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="all">All Substitutions</option>
                <option value="allergen-friendly">Allergen-Friendly</option>
                <option value="diet-specific">Diet-Specific</option>
                <option value="nutrition-focused">Nutrition-Focused</option>
              </select>
            </div>
          </div>
        </FadeIn>

        {/* User Preferences Summary */}
        <FadeIn delay={0.2}>
          <div className="bg-white rounded-xl p-6 mb-8 shadow-lg">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 flex items-center">
              <Users className="w-5 h-5 text-green-600 mr-2" />
              Your Dietary Profile
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <div className="text-sm text-gray-600 mb-2">Allergies</div>
                <div className="flex flex-wrap gap-1">
                  {userPreferences.allergies.map((allergy, index) => (
                    <span
                      key={index}
                      className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs"
                    >
                      {allergy}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-sm text-gray-600 mb-2">Diet Type</div>
                <div className="flex flex-wrap gap-1">
                  {userPreferences.dietaryRestrictions.map((diet, index) => (
                    <span
                      key={index}
                      className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs"
                    >
                      {diet}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-sm text-gray-600 mb-2">
                  Nutrition Goals
                </div>
                <div className="flex flex-wrap gap-1">
                  {userPreferences.nutritionGoals.map((goal, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs"
                    >
                      {goal}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-sm text-gray-600 mb-2">Cooking Level</div>
                <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs">
                  {userPreferences.cookingSkill}
                </span>
              </div>
            </div>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Substitution List */}
          <div className="lg:col-span-2">
            <FadeIn delay={0.3}>
              <h3 className="text-xl font-semibold mb-6 text-gray-900">
                Smart Substitutions ({filteredSubstitutions.length})
              </h3>

              <StaggeredAnimation className="space-y-6">
                {filteredSubstitutions.map(substitution => (
                  <div
                    key={substitution.id}
                    onClick={() => setSelectedSubstitution(substitution)}
                    className={`bg-white rounded-2xl p-6 shadow-lg cursor-pointer transition-all hover:shadow-xl ${
                      selectedSubstitution?.id === substitution.id
                        ? 'ring-2 ring-green-500'
                        : ''
                    }`}
                  >
                    {/* Original Ingredient */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                          <span className="text-2xl">🍽️</span>
                        </div>
                        <div>
                          <h4 className="font-bold text-lg text-gray-900">
                            {substitution.originalIngredient.name}
                          </h4>
                          <p className="text-gray-600 text-sm">
                            in {substitution.mealContext}
                          </p>
                        </div>
                      </div>

                      {substitution.allergensAvoided.length > 0 && (
                        <div className="flex items-center space-x-2">
                          <Shield className="w-4 h-4 text-red-500" />
                          <span className="text-xs text-red-600">
                            Allergen-Free
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Best Substitute Preview */}
                    <div className="border-l-4 border-green-500 pl-4 mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <ArrowRight className="w-4 h-4 text-green-600" />
                          <span className="font-semibold text-gray-900">
                            {substitution.substitutes[0].ingredient.name}
                          </span>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-semibold ${getConfidenceColor(substitution.substitutes[0].confidence)}`}
                          >
                            {substitution.substitutes[0].confidence}% match
                          </span>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Heart className="w-4 h-4 text-red-500" />
                          <span className="text-sm font-semibold text-gray-700">
                            Health Score:{' '}
                            {
                              substitution.substitutes[0].nutritionComparison
                                .healthScore
                            }
                            /10
                          </span>
                        </div>
                      </div>

                      <p className="text-sm text-gray-600 mb-2">
                        {substitution.substitutes[0].reason}
                      </p>

                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <div className="flex items-center space-x-1">
                          {getNutritionComparisonIcon(
                            substitution.substitutes[0].nutritionComparison
                              .calories
                          )}
                          <span>Calories</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          {getNutritionComparisonIcon(
                            substitution.substitutes[0].nutritionComparison
                              .protein
                          )}
                          <span>Protein</span>
                        </div>
                        <div
                          className={`px-2 py-1 rounded ${getFlavorImpactColor(substitution.substitutes[0].flavorImpact)}`}
                        >
                          {substitution.substitutes[0].flavorImpact} flavor
                          change
                        </div>
                      </div>
                    </div>

                    {/* Benefits */}
                    {substitution.dietaryBenefits.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {substitution.dietaryBenefits
                          .slice(0, 3)
                          .map((benefit, index) => (
                            <span
                              key={index}
                              className="bg-green-50 text-green-700 px-2 py-1 rounded-full text-xs"
                            >
                              • {benefit}
                            </span>
                          ))}
                        {substitution.dietaryBenefits.length > 3 && (
                          <span className="text-xs text-gray-500">
                            +{substitution.dietaryBenefits.length - 3} more
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </StaggeredAnimation>
            </FadeIn>
          </div>

          {/* Selected Substitution Details */}
          <div className="space-y-6">
            {selectedSubstitution && (
              <>
                {/* Detailed Comparison */}
                <FadeIn delay={0.4}>
                  <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <h3 className="text-lg font-semibold mb-4 text-gray-900 flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                      Substitution Details
                    </h3>

                    <div className="space-y-4">
                      {selectedSubstitution.substitutes.map(
                        (substitute, index) => (
                          <div
                            key={index}
                            className="border border-gray-200 rounded-lg p-4"
                          >
                            <div className="flex items-center justify-between mb-3">
                              <h4 className="font-semibold text-gray-900">
                                {substitute.ingredient.name}
                              </h4>
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-semibold ${getConfidenceColor(substitute.confidence)}`}
                              >
                                {substitute.confidence}%
                              </span>
                            </div>

                            <p className="text-sm text-gray-600 mb-3">
                              {substitute.reason}
                            </p>

                            <div className="space-y-2">
                              <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-600">
                                  Substitution Ratio
                                </span>
                                <span className="font-semibold">
                                  {substitute.substitutionRatio}
                                </span>
                              </div>

                              <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-600">
                                  Cost Impact
                                </span>
                                <span
                                  className={`font-semibold ${getCostColor(substitute.cost)}`}
                                >
                                  {substitute.cost}
                                </span>
                              </div>

                              <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-600">
                                  Availability
                                </span>
                                <span className="font-semibold capitalize">
                                  {substitute.availability}
                                </span>
                              </div>
                            </div>

                            {substitute.cookingAdjustments && (
                              <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                                <div className="flex items-start space-x-2">
                                  <Clock className="w-4 h-4 text-blue-600 mt-0.5" />
                                  <div>
                                    <div className="text-sm font-semibold text-blue-900">
                                      Cooking Tips
                                    </div>
                                    <div className="text-xs text-blue-700">
                                      {substitute.cookingAdjustments}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </FadeIn>

                {/* Nutrition Comparison */}
                <FadeIn delay={0.5}>
                  <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <h3 className="text-lg font-semibold mb-4 text-gray-900">
                      Nutrition Comparison
                    </h3>

                    <div className="space-y-3">
                      {[
                        {
                          label: 'Calories',
                          original:
                            selectedSubstitution.originalIngredient
                              .nutritionPer100g.calories,
                          substitute:
                            selectedSubstitution.substitutes[0].ingredient
                              .nutritionPer100g.calories,
                          unit: 'kcal',
                        },
                        {
                          label: 'Protein',
                          original:
                            selectedSubstitution.originalIngredient
                              .nutritionPer100g.protein,
                          substitute:
                            selectedSubstitution.substitutes[0].ingredient
                              .nutritionPer100g.protein,
                          unit: 'g',
                        },
                        {
                          label: 'Carbs',
                          original:
                            selectedSubstitution.originalIngredient
                              .nutritionPer100g.carbs,
                          substitute:
                            selectedSubstitution.substitutes[0].ingredient
                              .nutritionPer100g.carbs,
                          unit: 'g',
                        },
                        {
                          label: 'Fat',
                          original:
                            selectedSubstitution.originalIngredient
                              .nutritionPer100g.fat,
                          substitute:
                            selectedSubstitution.substitutes[0].ingredient
                              .nutritionPer100g.fat,
                          unit: 'g',
                        },
                      ].map((nutrient, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between"
                        >
                          <span className="text-sm text-gray-600">
                            {nutrient.label}
                          </span>
                          <div className="flex items-center space-x-2 text-sm">
                            <span className="text-gray-400">
                              {nutrient.original}
                              {nutrient.unit}
                            </span>
                            <ArrowRight className="w-3 h-3 text-gray-400" />
                            <span
                              className={`font-semibold ${
                                nutrient.substitute < nutrient.original
                                  ? 'text-green-600'
                                  : nutrient.substitute > nutrient.original
                                    ? 'text-red-600'
                                    : 'text-blue-600'
                              }`}
                            >
                              {nutrient.substitute}
                              {nutrient.unit}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </FadeIn>

                {/* Allergens & Benefits */}
                <FadeIn delay={0.6}>
                  <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <h3 className="text-lg font-semibold mb-4 text-gray-900">
                      Health Benefits
                    </h3>

                    {selectedSubstitution.allergensAvoided.length > 0 && (
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-red-700 mb-2 flex items-center">
                          <AlertTriangle className="w-4 h-4 mr-1" />
                          Allergens Avoided
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedSubstitution.allergensAvoided.map(
                            (allergen, index) => (
                              <span
                                key={index}
                                className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs"
                              >
                                {allergen}
                              </span>
                            )
                          )}
                        </div>
                      </div>
                    )}

                    <div>
                      <h4 className="text-sm font-semibold text-green-700 mb-2 flex items-center">
                        <Star className="w-4 h-4 mr-1" />
                        Dietary Benefits
                      </h4>
                      <ul className="space-y-1">
                        {selectedSubstitution.dietaryBenefits.map(
                          (benefit, index) => (
                            <li
                              key={index}
                              className="text-sm text-gray-600 flex items-start"
                            >
                              <Zap className="w-3 h-3 text-green-500 mt-0.5 mr-2" />
                              {benefit}
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  </div>
                </FadeIn>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SmartSubstitutionSuggestions
