// Nutrition-related utility functions

// Calculate BMI
export const calculateBMI = (weight: number, height: number): number => {
  // weight in kg, height in cm
  const heightInMeters = height / 100
  return Math.round((weight / (heightInMeters * heightInMeters)) * 10) / 10
}

// Get BMI category
export const getBMICategory = (bmi: number): string => {
  if (bmi < 18.5) return 'Underweight'
  if (bmi < 25) return 'Normal weight'
  if (bmi < 30) return 'Overweight'
  return 'Obese'
}

// Calculate daily calorie needs (Harris-Benedict Equation)
export const calculateDailyCalories = (
  weight: number, // kg
  height: number, // cm
  age: number,
  gender: 'male' | 'female',
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active'
): number => {
  let bmr: number

  // Calculate Basal Metabolic Rate
  if (gender === 'male') {
    bmr = 88.362 + 13.397 * weight + 4.799 * height - 5.677 * age
  } else {
    bmr = 447.593 + 9.247 * weight + 3.098 * height - 4.330 * age
  }

  // Apply activity factor
  const activityFactors = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    very_active: 1.9,
  }

  return Math.round(bmr * activityFactors[activityLevel])
}

// Calculate protein needs
export const calculateProteinNeeds = (
  weight: number, // kg
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active',
  goal: 'maintenance' | 'weight_loss' | 'muscle_gain'
): number => {
  let proteinPerKg: number

  switch (goal) {
    case 'weight_loss':
      proteinPerKg = activityLevel === 'sedentary' ? 1.2 : 1.6
      break
    case 'muscle_gain':
      proteinPerKg = activityLevel === 'very_active' ? 2.2 : 1.8
      break
    default: // maintenance
      proteinPerKg = activityLevel === 'sedentary' ? 0.8 : 1.2
  }

  return Math.round(weight * proteinPerKg)
}

// Calculate macronutrient distribution
export interface MacroDistribution {
  calories: number
  protein: { grams: number; calories: number; percentage: number }
  carbs: { grams: number; calories: number; percentage: number }
  fat: { grams: number; calories: number; percentage: number }
}

export const calculateMacros = (
  totalCalories: number,
  proteinGrams: number,
  _carbPercentage = 45, // 45-65% recommended (calculated automatically)
  fatPercentage = 25 // 20-35% recommended
): MacroDistribution => {
  const proteinCalories = proteinGrams * 4
  const proteinPercentage = (proteinCalories / totalCalories) * 100

  const fatCalories = (totalCalories * fatPercentage) / 100
  const fatGrams = fatCalories / 9

  const carbCalories = totalCalories - proteinCalories - fatCalories
  const carbGrams = carbCalories / 4

  return {
    calories: totalCalories,
    protein: {
      grams: Math.round(proteinGrams),
      calories: Math.round(proteinCalories),
      percentage: Math.round(proteinPercentage),
    },
    carbs: {
      grams: Math.round(carbGrams),
      calories: Math.round(carbCalories),
      percentage: Math.round((carbCalories / totalCalories) * 100),
    },
    fat: {
      grams: Math.round(fatGrams),
      calories: Math.round(fatCalories),
      percentage: fatPercentage,
    },
  }
}

// Calculate meal nutrition totals
export interface NutritionTotals {
  calories: number
  protein: number
  carbs: number
  fat: number
  fiber: number
  sugar: number
  sodium: number
}

export const calculateNutritionTotals = (meals: any[]): NutritionTotals => {
  return meals.reduce(
    (totals, meal) => ({
      calories: totals.calories + (meal.calories || 0),
      protein: totals.protein + (meal.protein || 0),
      carbs: totals.carbs + (meal.carbs || meal.carbohydrates || 0),
      fat: totals.fat + (meal.fat || 0),
      fiber: totals.fiber + (meal.fiber || 0),
      sugar: totals.sugar + (meal.sugar || 0),
      sodium: totals.sodium + (meal.sodium || 0),
    }),
    {
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
      fiber: 0,
      sugar: 0,
      sodium: 0,
    }
  )
}

// Get nutrition score (0-100)
export const getNutritionScore = (meal: any): number => {
  let score = 50 // base score

  // High protein bonus
  if (meal.protein >= 25) score += 15
  else if (meal.protein >= 20) score += 10
  else if (meal.protein >= 15) score += 5

  // High fiber bonus
  if (meal.fiber >= 8) score += 10
  else if (meal.fiber >= 5) score += 5

  // Low sodium bonus
  if (meal.sodium <= 400) score += 10
  else if (meal.sodium <= 600) score += 5

  // Low sugar bonus
  if (meal.sugar <= 5) score += 10
  else if (meal.sugar <= 10) score += 5

  // Calorie appropriateness
  if (meal.calories >= 300 && meal.calories <= 600) score += 10

  return Math.min(100, Math.max(0, score))
}

// Check if meal fits dietary restrictions
export const checkDietaryCompliance = (
  meal: any,
  restrictions: string[]
): { compliant: boolean; violations: string[] } => {
  const violations: string[] = []
  const tags = (meal.dietary_tags || meal.tags || '').toLowerCase()

  restrictions.forEach(restriction => {
    const r = restriction.toLowerCase()
    switch (r) {
      case 'vegetarian':
        if (!tags.includes('vegetarian') && !tags.includes('vegan')) {
          violations.push('Not vegetarian')
        }
        break
      case 'vegan':
        if (!tags.includes('vegan')) {
          violations.push('Not vegan')
        }
        break
      case 'gluten-free':
        if (!tags.includes('gluten-free')) {
          violations.push('Contains gluten')
        }
        break
      case 'dairy-free':
        if (!tags.includes('dairy-free')) {
          violations.push('Contains dairy')
        }
        break
      case 'keto':
        if (meal.carbs > 10) {
          violations.push('Too many carbs for keto')
        }
        break
      case 'low-sodium':
        if (meal.sodium > 600) {
          violations.push('High sodium content')
        }
        break
    }
  })

  return {
    compliant: violations.length === 0,
    violations,
  }
}

// Generate nutrition label data
export const generateNutritionLabel = (meal: any) => {
  const servings = meal.servings || 1
  
  return {
    servingsPerContainer: servings,
    servingSize: '1 meal',
    calories: meal.calories || 0,
    totalFat: {
      value: meal.fat || 0,
      dailyValue: Math.round(((meal.fat || 0) / 65) * 100),
    },
    saturatedFat: {
      value: meal.saturated_fat || 0,
      dailyValue: Math.round(((meal.saturated_fat || 0) / 20) * 100),
    },
    cholesterol: {
      value: meal.cholesterol || 0,
      dailyValue: Math.round(((meal.cholesterol || 0) / 300) * 100),
    },
    sodium: {
      value: meal.sodium || 0,
      dailyValue: Math.round(((meal.sodium || 0) / 2300) * 100),
    },
    totalCarbohydrates: {
      value: meal.carbs || meal.carbohydrates || 0,
      dailyValue: Math.round(((meal.carbs || meal.carbohydrates || 0) / 300) * 100),
    },
    dietaryFiber: {
      value: meal.fiber || 0,
      dailyValue: Math.round(((meal.fiber || 0) / 25) * 100),
    },
    totalSugars: meal.sugar || 0,
    protein: meal.protein || 0,
    vitaminA: {
      value: meal.vitamin_a || 0,
      dailyValue: Math.round(((meal.vitamin_a || 0) / 900) * 100),
    },
    vitaminC: {
      value: meal.vitamin_c || 0,
      dailyValue: Math.round(((meal.vitamin_c || 0) / 90) * 100),
    },
    calcium: {
      value: meal.calcium || 0,
      dailyValue: Math.round(((meal.calcium || 0) / 1000) * 100),
    },
    iron: {
      value: meal.iron || 0,
      dailyValue: Math.round(((meal.iron || 0) / 18) * 100),
    },
  }
}

// Convert units
export const convertWeight = (weight: number, from: 'kg' | 'lbs', to: 'kg' | 'lbs'): number => {
  if (from === to) return weight
  if (from === 'lbs' && to === 'kg') return Math.round((weight / 2.205) * 10) / 10
  if (from === 'kg' && to === 'lbs') return Math.round((weight * 2.205) * 10) / 10
  return weight
}

export const convertHeight = (height: number, from: 'cm' | 'ft', to: 'cm' | 'ft'): number => {
  if (from === to) return height
  if (from === 'ft' && to === 'cm') return Math.round(height * 30.48)
  if (from === 'cm' && to === 'ft') return Math.round((height / 30.48) * 10) / 10
  return height
}