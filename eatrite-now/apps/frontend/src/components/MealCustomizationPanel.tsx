import React, { useState, useMemo } from 'react'
import { Plus, Minus, Check, AlertCircle } from 'lucide-react'
import { FadeIn, SlideIn } from './LoadingStates'
import { useThemeColors } from '../context/ThemeContext'

// Types for meal customization
export interface NutritionalInfo {
  calories: number
  protein: number
  carbs: number
  fat: number
  fiber: number
  sugar: number
  sodium: number
}

export interface Ingredient {
  id: string
  name: string
  category: 'protein' | 'vegetable' | 'carb' | 'dairy' | 'sauce' | 'garnish'
  calories: number
  protein: number
  carbs: number
  fat: number
  allergens: string[]
  dietaryFlags: DietaryFlag[]
  description: string
  image?: string
  isOptional: boolean
  baseAmount: number // in grams
  maxAmount?: number
  minAmount?: number
  priceModifier: number // price change in dollars
}

export interface DietaryRestriction {
  id: string
  name: string
  description: string
  icon: string
  restrictedIngredients: string[]
  allowedSubstitutes?: string[]
}

export type DietaryFlag = 'vegan' | 'vegetarian' | 'gluten-free' | 'dairy-free' | 'keto' | 'paleo' | 'low-carb' | 'high-protein'

export interface MealCustomization {
  mealId: string
  ingredients: Array<{
    ingredientId: string
    amount: number
    isIncluded: boolean
  }>
  portionSize: 'small' | 'regular' | 'large' | 'xl'
  dietaryPreferences: DietaryFlag[]
  specialInstructions?: string
  estimatedNutrition: NutritionalInfo
  priceAdjustment: number
}

interface MealCustomizationPanelProps {
  meal: {
    id: string
    name: string
    description: string
    basePrice: number
    baseIngredients: Ingredient[]
    availableSubstitutes: Ingredient[]
    baseNutrition: NutritionalInfo
  }
  initialCustomization?: MealCustomization
  onCustomizationChange: (customization: MealCustomization) => void
  className?: string
}

const portionSizeMultipliers = {
  small: { multiplier: 0.75, label: 'Small', description: 'Perfect for light appetite' },
  regular: { multiplier: 1.0, label: 'Regular', description: 'Standard portion size' },
  large: { multiplier: 1.25, label: 'Large', description: 'Hearty portion' },
  xl: { multiplier: 1.5, label: 'Extra Large', description: 'Maximum satisfaction' }
}

const dietaryFlags: Array<{ flag: DietaryFlag; label: string; icon: string; color: string }> = [
  { flag: 'vegan', label: 'Vegan', icon: '🌱', color: '#10B981' },
  { flag: 'vegetarian', label: 'Vegetarian', icon: '🥬', color: '#34D399' },
  { flag: 'gluten-free', label: 'Gluten Free', icon: '🌾', color: '#F59E0B' },
  { flag: 'dairy-free', label: 'Dairy Free', icon: '🥛', color: '#3B82F6' },
  { flag: 'keto', label: 'Keto', icon: '🥑', color: '#8B5CF6' },
  { flag: 'paleo', label: 'Paleo', icon: '🍖', color: '#EF4444' },
  { flag: 'low-carb', label: 'Low Carb', icon: '🥗', color: '#06B6D4' },
  { flag: 'high-protein', label: 'High Protein', icon: '💪', color: '#F97316' }
]

export const MealCustomizationPanel: React.FC<MealCustomizationPanelProps> = ({
  meal,
  initialCustomization,
  onCustomizationChange,
  className = ''
}) => {
  const colors = useThemeColors()
  
  const [customization, setCustomization] = useState<MealCustomization>(() => ({
    mealId: meal.id,
    ingredients: meal.baseIngredients.map(ing => ({
      ingredientId: ing.id,
      amount: ing.baseAmount,
      isIncluded: true
    })),
    portionSize: 'regular',
    dietaryPreferences: [],
    estimatedNutrition: meal.baseNutrition,
    priceAdjustment: 0,
    ...initialCustomization
  }))

  // Calculate nutrition and price based on current customization
  const calculatedValues = useMemo(() => {
    const portionMultiplier = portionSizeMultipliers[customization.portionSize].multiplier
    let totalNutrition: NutritionalInfo = {
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
      fiber: 0,
      sugar: 0,
      sodium: 0
    }
    let priceAdjustment = 0

    // Calculate from included ingredients
    customization.ingredients.forEach(custIng => {
      if (!custIng.isIncluded) return
      
      const ingredient = [...meal.baseIngredients, ...meal.availableSubstitutes]
        .find(ing => ing.id === custIng.ingredientId)
      
      if (ingredient) {
        const amountRatio = custIng.amount / ingredient.baseAmount
        const portionAdjustedRatio = amountRatio * portionMultiplier
        
        totalNutrition.calories += ingredient.calories * portionAdjustedRatio
        totalNutrition.protein += ingredient.protein * portionAdjustedRatio
        totalNutrition.carbs += ingredient.carbs * portionAdjustedRatio
        totalNutrition.fat += ingredient.fat * portionAdjustedRatio
        
        priceAdjustment += ingredient.priceModifier * amountRatio
      }
    })

    // Apply portion size to price
    const portionPriceAdjustment = (portionMultiplier - 1) * meal.basePrice * 0.3 // 30% of base price per portion increase
    priceAdjustment += portionPriceAdjustment

    return {
      nutrition: totalNutrition,
      priceAdjustment: Math.round(priceAdjustment * 100) / 100,
      finalPrice: meal.basePrice + priceAdjustment
    }
  }, [customization, meal])

  const updateCustomization = (updates: Partial<MealCustomization>) => {
    const newCustomization = {
      ...customization,
      ...updates,
      estimatedNutrition: calculatedValues.nutrition,
      priceAdjustment: calculatedValues.priceAdjustment
    }
    setCustomization(newCustomization)
    onCustomizationChange(newCustomization)
  }

  const toggleIngredient = (ingredientId: string) => {
    const newIngredients = customization.ingredients.map(ing =>
      ing.ingredientId === ingredientId
        ? { ...ing, isIncluded: !ing.isIncluded }
        : ing
    )
    updateCustomization({ ingredients: newIngredients })
  }

  const adjustIngredientAmount = (ingredientId: string, newAmount: number) => {
    const ingredient = [...meal.baseIngredients, ...meal.availableSubstitutes]
      .find(ing => ing.id === ingredientId)
    
    if (!ingredient) return

    const minAmount = ingredient.minAmount || ingredient.baseAmount * 0.5
    const maxAmount = ingredient.maxAmount || ingredient.baseAmount * 2
    const clampedAmount = Math.max(minAmount, Math.min(maxAmount, newAmount))

    const newIngredients = customization.ingredients.map(ing =>
      ing.ingredientId === ingredientId
        ? { ...ing, amount: clampedAmount }
        : ing
    )
    updateCustomization({ ingredients: newIngredients })
  }

  const substituteIngredient = (originalId: string, substituteId: string) => {
    const substitute = meal.availableSubstitutes.find(sub => sub.id === substituteId)
    if (!substitute) return

    const newIngredients = customization.ingredients.map(ing =>
      ing.ingredientId === originalId
        ? { ...ing, ingredientId: substituteId, amount: substitute.baseAmount }
        : ing
    )
    updateCustomization({ ingredients: newIngredients })
  }

  const toggleDietaryPreference = (flag: DietaryFlag) => {
    const newPreferences = customization.dietaryPreferences.includes(flag)
      ? customization.dietaryPreferences.filter(pref => pref !== flag)
      : [...customization.dietaryPreferences, flag]
    
    updateCustomization({ dietaryPreferences: newPreferences })
  }

  const getIngredientDetails = (ingredientId: string) => {
    return [...meal.baseIngredients, ...meal.availableSubstitutes]
      .find(ing => ing.id === ingredientId)
  }

  const checkDietaryCompliance = () => {
    const violations: string[] = []
    
    customization.dietaryPreferences.forEach(preference => {
      customization.ingredients.forEach(custIng => {
        if (!custIng.isIncluded) return
        
        const ingredient = getIngredientDetails(custIng.ingredientId)
        if (ingredient && !ingredient.dietaryFlags.includes(preference)) {
          violations.push(`${ingredient.name} is not ${preference}`)
        }
      })
    })
    
    return violations
  }

  const dietaryViolations = checkDietaryCompliance()

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden ${className}`}>
      {/* Header */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <FadeIn>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Customize Your {meal.name}
          </h2>
          <p className="text-gray-600 dark:text-gray-300">{meal.description}</p>
          <div className="flex items-center justify-between mt-4">
            <div className="text-2xl font-bold" style={{ color: colors.primary }}>
              ${calculatedValues.finalPrice.toFixed(2)}
              {calculatedValues.priceAdjustment !== 0 && (
                <span className="text-sm ml-2 text-gray-500 dark:text-gray-400">
                  ({calculatedValues.priceAdjustment > 0 ? '+' : ''}${calculatedValues.priceAdjustment.toFixed(2)})
                </span>
              )}
            </div>
            {dietaryViolations.length > 0 && (
              <div className="flex items-center text-orange-600 dark:text-orange-400">
                <AlertCircle className="h-5 w-5 mr-1" />
                <span className="text-sm">{dietaryViolations.length} dietary concerns</span>
              </div>
            )}
          </div>
        </FadeIn>
      </div>

      <div className="p-6 space-y-8">
        {/* Portion Size Selection */}
        <SlideIn direction="up" delay={100}>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Portion Size</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {Object.entries(portionSizeMultipliers).map(([size, info]) => (
                <button
                  key={size}
                  onClick={() => updateCustomization({ portionSize: size as any })}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                    customization.portionSize === size
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                      : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <div className="text-center">
                    <div className="font-semibold">{info.label}</div>
                    <div className="text-xs mt-1 opacity-75">{info.description}</div>
                    <div className="text-sm mt-2 font-mono">
                      {Math.round(calculatedValues.nutrition.calories * info.multiplier)} cal
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </SlideIn>

        {/* Dietary Preferences */}
        <SlideIn direction="up" delay={200}>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Dietary Preferences</h3>
            <div className="flex flex-wrap gap-3">
              {dietaryFlags.map(({ flag, label, icon, color }) => (
                <button
                  key={flag}
                  onClick={() => toggleDietaryPreference(flag)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full border-2 transition-all duration-200 ${
                    customization.dietaryPreferences.includes(flag)
                      ? 'border-current bg-opacity-10'
                      : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                  }`}
                  style={{
                    color: customization.dietaryPreferences.includes(flag) ? color : undefined,
                    backgroundColor: customization.dietaryPreferences.includes(flag) ? `${color}20` : undefined
                  }}
                >
                  <span>{icon}</span>
                  <span className="text-sm font-medium">{label}</span>
                  {customization.dietaryPreferences.includes(flag) && (
                    <Check className="h-4 w-4" />
                  )}
                </button>
              ))}
            </div>
            
            {dietaryViolations.length > 0 && (
              <div className="mt-4 p-3 bg-orange-50 dark:bg-orange-900/30 border border-orange-200 dark:border-orange-700 rounded-lg">
                <div className="flex items-start space-x-2">
                  <AlertCircle className="h-5 w-5 text-orange-600 dark:text-orange-400 mt-0.5" />
                  <div>
                    <div className="font-medium text-orange-800 dark:text-orange-200 text-sm">
                      Dietary Restrictions Violated:
                    </div>
                    <ul className="text-sm text-orange-700 dark:text-orange-300 mt-1 space-y-1">
                      {dietaryViolations.map((violation, index) => (
                        <li key={index}>• {violation}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </SlideIn>

        {/* Ingredients Customization */}
        <SlideIn direction="up" delay={300}>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Ingredients</h3>
            <div className="space-y-4">
              {meal.baseIngredients.map((baseIngredient, index) => {
                const custIngredient = customization.ingredients.find(
                  ing => ing.ingredientId === baseIngredient.id
                )
                const currentIngredient = getIngredientDetails(custIngredient?.ingredientId || baseIngredient.id)
                
                if (!currentIngredient) return null

                const availableSubstitutes = meal.availableSubstitutes.filter(
                  sub => sub.category === baseIngredient.category
                )

                return (
                  <FadeIn key={baseIngredient.id} delay={index * 50}>
                    <div className="p-4 border border-gray-200 dark:border-gray-600 rounded-xl">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3">
                            <button
                              onClick={() => toggleIngredient(custIngredient?.ingredientId || baseIngredient.id)}
                              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                                custIngredient?.isIncluded !== false
                                  ? 'border-green-500 bg-green-500 text-white'
                                  : 'border-gray-300 dark:border-gray-600'
                              }`}
                            >
                              {custIngredient?.isIncluded !== false && (
                                <Check className="h-3 w-3" />
                              )}
                            </button>
                            <div>
                              <h4 className="font-semibold text-gray-900 dark:text-white">
                                {currentIngredient.name}
                              </h4>
                              <p className="text-sm text-gray-600 dark:text-gray-300">
                                {currentIngredient.description}
                              </p>
                            </div>
                          </div>
                          
                          {/* Dietary flags and allergens */}
                          <div className="flex flex-wrap gap-1 mt-2">
                            {currentIngredient.dietaryFlags.map(flag => {
                              const flagInfo = dietaryFlags.find(f => f.flag === flag)
                              return flagInfo ? (
                                <span
                                  key={flag}
                                  className="px-2 py-1 text-xs rounded-full"
                                  style={{ 
                                    backgroundColor: `${flagInfo.color}20`,
                                    color: flagInfo.color
                                  }}
                                >
                                  {flagInfo.icon} {flagInfo.label}
                                </span>
                              ) : null
                            })}
                            {currentIngredient.allergens.map(allergen => (
                              <span
                                key={allergen}
                                className="px-2 py-1 text-xs rounded-full bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300"
                              >
                                ⚠️ {allergen}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {custIngredient?.isIncluded !== false && (
                        <>
                          {/* Amount adjustment */}
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-sm text-gray-600 dark:text-gray-300">Amount</span>
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => adjustIngredientAmount(
                                  custIngredient?.ingredientId || baseIngredient.id,
                                  (custIngredient?.amount || baseIngredient.baseAmount) - 10
                                )}
                                className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                              >
                                <Minus className="h-4 w-4" />
                              </button>
                              <span className="w-16 text-center font-mono text-sm">
                                {custIngredient?.amount || baseIngredient.baseAmount}g
                              </span>
                              <button
                                onClick={() => adjustIngredientAmount(
                                  custIngredient?.ingredientId || baseIngredient.id,
                                  (custIngredient?.amount || baseIngredient.baseAmount) + 10
                                )}
                                className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                              >
                                <Plus className="h-4 w-4" />
                              </button>
                            </div>
                          </div>

                          {/* Substitutes */}
                          {availableSubstitutes.length > 0 && (
                            <div>
                              <div className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                                Available substitutes:
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {availableSubstitutes.map(substitute => (
                                  <button
                                    key={substitute.id}
                                    onClick={() => substituteIngredient(baseIngredient.id, substitute.id)}
                                    className={`px-3 py-1 text-sm rounded-full border transition-all duration-200 ${
                                      custIngredient?.ingredientId === substitute.id
                                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                                        : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 text-gray-700 dark:text-gray-300'
                                    }`}
                                  >
                                    {substitute.name}
                                    {substitute.priceModifier !== 0 && (
                                      <span className="ml-1 text-xs">
                                        ({substitute.priceModifier > 0 ? '+' : ''}${substitute.priceModifier.toFixed(2)})
                                      </span>
                                    )}
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </FadeIn>
                )
              })}
            </div>
          </div>
        </SlideIn>

        {/* Nutritional Summary */}
        <SlideIn direction="up" delay={400}>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Nutritional Information
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(calculatedValues.nutrition).map(([key, value]) => (
                <div key={key} className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="text-2xl font-bold" style={{ color: colors.primary }}>
                    {Math.round(value)}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300 capitalize">
                    {key === 'sodium' ? 'Sodium (mg)' : key === 'calories' ? 'Calories' : `${key} (g)`}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </SlideIn>

        {/* Special Instructions */}
        <SlideIn direction="up" delay={500}>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Special Instructions
            </h3>
            <textarea
              value={customization.specialInstructions || ''}
              onChange={(e) => updateCustomization({ specialInstructions: e.target.value })}
              placeholder="Any special preparation requests or allergies to note..."
              rows={3}
              className="w-full p-3 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          </div>
        </SlideIn>
      </div>
    </div>
  )
}

export default MealCustomizationPanel