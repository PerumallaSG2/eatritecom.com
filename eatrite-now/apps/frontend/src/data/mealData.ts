import { Ingredient, NutritionalInfo, MealCustomization } from '../components/MealCustomizationPanel'

// Sample ingredients database
export const ingredientsDatabase: Ingredient[] = [
  // Proteins
  {
    id: 'grilled-chicken',
    name: 'Grilled Chicken Breast',
    category: 'protein',
    calories: 165,
    protein: 31,
    carbs: 0,
    fat: 3.6,
    allergens: [],
    dietaryFlags: ['high-protein', 'keto', 'paleo'],
    description: 'Tender, perfectly seasoned chicken breast',
    baseAmount: 150,
    minAmount: 100,
    maxAmount: 250,
    priceModifier: 0,
    isOptional: false
  },
  {
    id: 'salmon-fillet',
    name: 'Atlantic Salmon',
    category: 'protein',
    calories: 208,
    protein: 22,
    carbs: 0,
    fat: 12,
    allergens: ['fish'],
    dietaryFlags: ['high-protein', 'keto', 'paleo'],
    description: 'Fresh, wild-caught salmon with omega-3s',
    baseAmount: 150,
    minAmount: 100,
    maxAmount: 200,
    priceModifier: 3.50,
    isOptional: false
  },
  {
    id: 'tofu-block',
    name: 'Organic Tofu',
    category: 'protein',
    calories: 76,
    protein: 8,
    carbs: 2,
    fat: 4.8,
    allergens: ['soy'],
    dietaryFlags: ['vegan', 'vegetarian'],
    description: 'Firm organic tofu, perfect protein alternative',
    baseAmount: 150,
    minAmount: 100,
    maxAmount: 200,
    priceModifier: -1.00,
    isOptional: false
  },
  {
    id: 'black-beans',
    name: 'Black Beans',
    category: 'protein',
    calories: 132,
    protein: 8.9,
    carbs: 23,
    fat: 0.5,
    allergens: [],
    dietaryFlags: ['vegan', 'vegetarian', 'high-protein'],
    description: 'Protein-rich legumes with fiber',
    baseAmount: 100,
    minAmount: 75,
    maxAmount: 150,
    priceModifier: -0.75,
    isOptional: false
  },

  // Vegetables
  {
    id: 'broccoli',
    name: 'Steamed Broccoli',
    category: 'vegetable',
    calories: 34,
    protein: 2.8,
    carbs: 7,
    fat: 0.4,
    allergens: [],
    dietaryFlags: ['vegan', 'vegetarian', 'keto', 'paleo', 'low-carb'],
    description: 'Fresh steamed broccoli florets',
    baseAmount: 100,
    minAmount: 50,
    maxAmount: 200,
    priceModifier: 0,
    isOptional: true
  },
  {
    id: 'roasted-asparagus',
    name: 'Roasted Asparagus',
    category: 'vegetable',
    calories: 20,
    protein: 2.2,
    carbs: 4,
    fat: 0.1,
    allergens: [],
    dietaryFlags: ['vegan', 'vegetarian', 'keto', 'paleo', 'low-carb'],
    description: 'Tender roasted asparagus spears',
    baseAmount: 100,
    minAmount: 75,
    maxAmount: 150,
    priceModifier: 1.25,
    isOptional: true
  },
  {
    id: 'sauteed-spinach',
    name: 'Sautéed Spinach',
    category: 'vegetable',
    calories: 23,
    protein: 2.9,
    carbs: 3.6,
    fat: 0.4,
    allergens: [],
    dietaryFlags: ['vegan', 'vegetarian', 'keto', 'paleo', 'low-carb'],
    description: 'Fresh spinach sautéed with garlic',
    baseAmount: 80,
    minAmount: 50,
    maxAmount: 120,
    priceModifier: 0.50,
    isOptional: true
  },

  // Carbs
  {
    id: 'brown-rice',
    name: 'Brown Rice',
    category: 'carb',
    calories: 111,
    protein: 2.6,
    carbs: 23,
    fat: 0.9,
    allergens: [],
    dietaryFlags: ['vegan', 'vegetarian', 'gluten-free'],
    description: 'Nutty whole grain brown rice',
    baseAmount: 100,
    minAmount: 75,
    maxAmount: 150,
    priceModifier: 0,
    isOptional: false
  },
  {
    id: 'quinoa',
    name: 'Quinoa',
    category: 'carb',
    calories: 120,
    protein: 4.4,
    carbs: 22,
    fat: 1.9,
    allergens: [],
    dietaryFlags: ['vegan', 'vegetarian', 'gluten-free', 'high-protein'],
    description: 'Complete protein superfood grain',
    baseAmount: 100,
    minAmount: 75,
    maxAmount: 125,
    priceModifier: 1.75,
    isOptional: false
  },
  {
    id: 'cauliflower-rice',
    name: 'Cauliflower Rice',
    category: 'carb',
    calories: 25,
    protein: 2,
    carbs: 5,
    fat: 0.3,
    allergens: [],
    dietaryFlags: ['vegan', 'vegetarian', 'keto', 'paleo', 'low-carb'],
    description: 'Low-carb cauliflower rice alternative',
    baseAmount: 100,
    minAmount: 75,
    maxAmount: 150,
    priceModifier: 0.75,
    isOptional: false
  },
  {
    id: 'sweet-potato',
    name: 'Roasted Sweet Potato',
    category: 'carb',
    calories: 86,
    protein: 1.6,
    carbs: 20,
    fat: 0.1,
    allergens: [],
    dietaryFlags: ['vegan', 'vegetarian', 'paleo'],
    description: 'Naturally sweet roasted sweet potato',
    baseAmount: 120,
    minAmount: 100,
    maxAmount: 180,
    priceModifier: 0.50,
    isOptional: false
  },

  // Sauces
  {
    id: 'teriyaki-sauce',
    name: 'Teriyaki Glaze',
    category: 'sauce',
    calories: 60,
    protein: 1,
    carbs: 14,
    fat: 0,
    allergens: ['soy', 'gluten'],
    dietaryFlags: [],
    description: 'Sweet and savory teriyaki glaze',
    baseAmount: 30,
    minAmount: 15,
    maxAmount: 45,
    priceModifier: 0,
    isOptional: true
  },
  {
    id: 'lemon-herb-sauce',
    name: 'Lemon Herb Sauce',
    category: 'sauce',
    calories: 45,
    protein: 0.2,
    carbs: 2,
    fat: 4.5,
    allergens: [],
    dietaryFlags: ['vegan', 'vegetarian', 'keto', 'paleo'],
    description: 'Fresh lemon and herb infused sauce',
    baseAmount: 25,
    minAmount: 15,
    maxAmount: 40,
    priceModifier: 0.50,
    isOptional: true
  },
  {
    id: 'tahini-dressing',
    name: 'Tahini Dressing',
    category: 'sauce',
    calories: 89,
    protein: 2.6,
    carbs: 3.2,
    fat: 8,
    allergens: ['sesame'],
    dietaryFlags: ['vegan', 'vegetarian', 'keto'],
    description: 'Creamy sesame tahini dressing',
    baseAmount: 25,
    minAmount: 15,
    maxAmount: 35,
    priceModifier: 1.00,
    isOptional: true
  }
]

// Sample meal definitions
export const sampleMeals = [
  {
    id: 'power-bowl',
    name: 'Mediterranean Power Bowl',
    description: 'A nutrient-dense bowl with grilled chicken, quinoa, and fresh vegetables',
    basePrice: 14.95,
    baseIngredients: [
      ingredientsDatabase.find(i => i.id === 'grilled-chicken')!,
      ingredientsDatabase.find(i => i.id === 'quinoa')!,
      ingredientsDatabase.find(i => i.id === 'broccoli')!,
      ingredientsDatabase.find(i => i.id === 'lemon-herb-sauce')!
    ],
    availableSubstitutes: [
      ingredientsDatabase.find(i => i.id === 'salmon-fillet')!,
      ingredientsDatabase.find(i => i.id === 'tofu-block')!,
      ingredientsDatabase.find(i => i.id === 'black-beans')!,
      ingredientsDatabase.find(i => i.id === 'brown-rice')!,
      ingredientsDatabase.find(i => i.id === 'cauliflower-rice')!,
      ingredientsDatabase.find(i => i.id === 'roasted-asparagus')!,
      ingredientsDatabase.find(i => i.id === 'sauteed-spinach')!,
      ingredientsDatabase.find(i => i.id === 'teriyaki-sauce')!,
      ingredientsDatabase.find(i => i.id === 'tahini-dressing')!
    ],
    baseNutrition: {
      calories: 485,
      protein: 42,
      carbs: 52,
      fat: 12,
      fiber: 8,
      sugar: 6,
      sodium: 380
    }
  },
  {
    id: 'keto-salmon',
    name: 'Keto Salmon & Vegetables',
    description: 'Low-carb, high-fat meal with salmon and nutrient-rich vegetables',
    basePrice: 18.95,
    baseIngredients: [
      ingredientsDatabase.find(i => i.id === 'salmon-fillet')!,
      ingredientsDatabase.find(i => i.id === 'roasted-asparagus')!,
      ingredientsDatabase.find(i => i.id === 'sauteed-spinach')!,
      ingredientsDatabase.find(i => i.id === 'lemon-herb-sauce')!
    ],
    availableSubstitutes: [
      ingredientsDatabase.find(i => i.id === 'grilled-chicken')!,
      ingredientsDatabase.find(i => i.id === 'broccoli')!,
      ingredientsDatabase.find(i => i.id === 'cauliflower-rice')!,
      ingredientsDatabase.find(i => i.id === 'tahini-dressing')!
    ],
    baseNutrition: {
      calories: 318,
      protein: 28,
      carbs: 8,
      fat: 20,
      fiber: 4,
      sugar: 4,
      sodium: 145
    }
  },
  {
    id: 'vegan-bowl',
    name: 'Plant-Powered Buddha Bowl',
    description: 'Complete vegan meal with tofu, quinoa, and seasonal vegetables',
    basePrice: 12.95,
    baseIngredients: [
      ingredientsDatabase.find(i => i.id === 'tofu-block')!,
      ingredientsDatabase.find(i => i.id === 'quinoa')!,
      ingredientsDatabase.find(i => i.id === 'sauteed-spinach')!,
      ingredientsDatabase.find(i => i.id === 'sweet-potato')!,
      ingredientsDatabase.find(i => i.id === 'tahini-dressing')!
    ],
    availableSubstitutes: [
      ingredientsDatabase.find(i => i.id === 'black-beans')!,
      ingredientsDatabase.find(i => i.id === 'brown-rice')!,
      ingredientsDatabase.find(i => i.id === 'cauliflower-rice')!,
      ingredientsDatabase.find(i => i.id === 'broccoli')!,
      ingredientsDatabase.find(i => i.id === 'lemon-herb-sauce')!
    ],
    baseNutrition: {
      calories: 456,
      protein: 18,
      carbs: 62,
      fat: 16,
      fiber: 10,
      sugar: 12,
      sodium: 280
    }
  }
]

// Utility functions for meal customization
export const calculateNutritionalImpact = (
  baseNutrition: NutritionalInfo,
  _customization: MealCustomization
): NutritionalInfo => {
  // This would calculate the nutritional impact of customizations
  // Implementation would be similar to what's in MealCustomizationPanel
  return baseNutrition
}

export const generateCustomizationSummary = (customization: MealCustomization): string => {
  const changes: string[] = []
  
  if (customization.portionSize !== 'regular') {
    changes.push(`${customization.portionSize} portion`)
  }
  
  if (customization.dietaryPreferences.length > 0) {
    changes.push(`${customization.dietaryPreferences.join(', ')} friendly`)
  }
  
  // Count ingredient modifications
  const removedIngredients = customization.ingredients.filter(ing => !ing.isIncluded).length
  const modifiedIngredients = customization.ingredients.filter(ing => ing.amount !== 100).length // assuming 100g base
  
  if (removedIngredients > 0) {
    changes.push(`${removedIngredients} ingredient${removedIngredients > 1 ? 's' : ''} removed`)
  }
  
  if (modifiedIngredients > 0) {
    changes.push(`${modifiedIngredients} portion${modifiedIngredients > 1 ? 's' : ''} adjusted`)
  }
  
  return changes.length > 0 
    ? `Customized: ${changes.join(', ')}`
    : 'Standard preparation'
}

export const validateDietaryCompliance = (
  customization: MealCustomization,
  availableIngredients: Ingredient[]
): { isCompliant: boolean; violations: string[] } => {
  const violations: string[] = []
  
  customization.dietaryPreferences.forEach(preference => {
    customization.ingredients.forEach(custIng => {
      if (!custIng.isIncluded) return
      
      const ingredient = availableIngredients.find(ing => ing.id === custIng.ingredientId)
      if (ingredient && !ingredient.dietaryFlags.includes(preference)) {
        violations.push(`${ingredient.name} does not meet ${preference} requirements`)
      }
    })
  })
  
  return {
    isCompliant: violations.length === 0,
    violations
  }
}

export const estimatePreparationTime = (customization: MealCustomization): number => {
  // Base preparation time in minutes
  let baseTime = 15
  
  // Add time for complex customizations
  const customIngredients = customization.ingredients.filter(ing => ing.isIncluded).length
  const additionalTime = Math.max(0, (customIngredients - 4) * 2) // 2 mins per extra ingredient
  
  return baseTime + additionalTime
}