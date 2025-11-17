import React, { useState, useEffect } from 'react'
import {
  Plus,
  Flame,
  Zap,
  Heart,
  Clock,
  ChefHat,
  Star,
  ShoppingCart,
} from 'lucide-react'
import { FadeIn, StaggeredAnimation } from './AnimationComponents'

interface MealComponent {
  id: string
  name: string
  type: 'protein' | 'vegetable' | 'carb' | 'sauce'
  calories: number
  protein: number
  carbs: number
  fat: number
  price: number
  image: string
  popular?: boolean
}

interface CustomMeal {
  protein?: MealComponent
  vegetables: MealComponent[]
  carb?: MealComponent
  sauce?: MealComponent
}

const mealComponents: Record<string, MealComponent[]> = {
  protein: [
    {
      id: 'grilled-chicken',
      name: 'Grilled Chicken Breast',
      type: 'protein',
      calories: 250,
      protein: 45,
      carbs: 0,
      fat: 6,
      price: 8.5,
      image:
        'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=200&h=150&fit=crop',
      popular: true,
    },
    {
      id: 'salmon-fillet',
      name: 'Atlantic Salmon Fillet',
      type: 'protein',
      calories: 280,
      protein: 40,
      carbs: 0,
      fat: 12,
      price: 12.0,
      image:
        'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=200&h=150&fit=crop',
    },
    {
      id: 'grass-fed-beef',
      name: 'Grass-Fed Beef Sirloin',
      type: 'protein',
      calories: 320,
      protein: 42,
      carbs: 0,
      fat: 15,
      price: 14.5,
      image:
        'https://images.unsplash.com/photo-1558030006-450675393462?w=200&h=150&fit=crop',
    },
    {
      id: 'turkey-meatballs',
      name: 'Turkey Meatballs',
      type: 'protein',
      calories: 220,
      protein: 35,
      carbs: 5,
      fat: 8,
      price: 9.0,
      image:
        'https://images.unsplash.com/photo-1529042410759-befb1204b468?w=200&h=150&fit=crop',
    },
  ],
  vegetables: [
    {
      id: 'roasted-broccoli',
      name: 'Roasted Broccoli',
      type: 'vegetable',
      calories: 55,
      protein: 4,
      carbs: 8,
      fat: 1,
      price: 2.5,
      image:
        'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=200&h=150&fit=crop',
      popular: true,
    },
    {
      id: 'grilled-asparagus',
      name: 'Grilled Asparagus',
      type: 'vegetable',
      calories: 40,
      protein: 3,
      carbs: 6,
      fat: 0.5,
      price: 3.0,
      image:
        'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=200&h=150&fit=crop',
    },
    {
      id: 'sauteed-spinach',
      name: 'Sautéed Spinach',
      type: 'vegetable',
      calories: 35,
      protein: 3,
      carbs: 4,
      fat: 1,
      price: 2.25,
      image:
        'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=200&h=150&fit=crop',
    },
    {
      id: 'roasted-brussels',
      name: 'Roasted Brussels Sprouts',
      type: 'vegetable',
      calories: 60,
      protein: 4,
      carbs: 10,
      fat: 1,
      price: 2.75,
      image:
        'https://images.unsplash.com/photo-1618194191127-84ec363bc2ee?w=200&h=150&fit=crop',
    },
  ],
  carb: [
    {
      id: 'quinoa-pilaf',
      name: 'Quinoa Pilaf',
      type: 'carb',
      calories: 180,
      protein: 6,
      carbs: 32,
      fat: 3,
      price: 3.5,
      image:
        'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=200&h=150&fit=crop',
      popular: true,
    },
    {
      id: 'sweet-potato',
      name: 'Roasted Sweet Potato',
      type: 'carb',
      calories: 160,
      protein: 2,
      carbs: 37,
      fat: 0.5,
      price: 2.75,
      image:
        'https://images.unsplash.com/photo-1557909114-4415da9d37cb?w=200&h=150&fit=crop',
    },
    {
      id: 'cauliflower-rice',
      name: 'Cauliflower Rice',
      type: 'carb',
      calories: 50,
      protein: 4,
      carbs: 8,
      fat: 1,
      price: 2.5,
      image:
        'https://images.unsplash.com/photo-1568584711271-3e32c2ca2824?w=200&h=150&fit=crop',
    },
    {
      id: 'wild-rice',
      name: 'Wild Rice Blend',
      type: 'carb',
      calories: 200,
      protein: 7,
      carbs: 40,
      fat: 2,
      price: 3.25,
      image:
        'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=200&h=150&fit=crop',
    },
  ],
  sauce: [
    {
      id: 'herb-chimichurri',
      name: 'Herb Chimichurri',
      type: 'sauce',
      calories: 45,
      protein: 0.5,
      carbs: 2,
      fat: 4,
      price: 1.5,
      image:
        'https://images.unsplash.com/photo-1472476443507-c7a5948772fc?w=200&h=150&fit=crop',
      popular: true,
    },
    {
      id: 'lemon-garlic',
      name: 'Lemon Garlic Sauce',
      type: 'sauce',
      calories: 35,
      protein: 0,
      carbs: 3,
      fat: 3,
      price: 1.25,
      image:
        'https://images.unsplash.com/photo-1563379091339-03246963d527?w=200&h=150&fit=crop',
    },
    {
      id: 'tahini-dressing',
      name: 'Tahini Dressing',
      type: 'sauce',
      calories: 60,
      protein: 2,
      carbs: 4,
      fat: 5,
      price: 1.75,
      image:
        'https://images.unsplash.com/photo-1609501676725-7186f932e2ea?w=200&h=150&fit=crop',
    },
  ],
}

export const InteractiveMealBuilder: React.FC = () => {
  const [customMeal, setCustomMeal] = useState<CustomMeal>({
    vegetables: [],
  })
  const [activeCategory, setActiveCategory] = useState<string>('protein')
  const [totalNutrition, setTotalNutrition] = useState({
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    price: 0,
  })

  useEffect(() => {
    calculateTotalNutrition()
  }, [customMeal])

  const calculateTotalNutrition = () => {
    let calories = 0,
      protein = 0,
      carbs = 0,
      fat = 0,
      price = 0

    if (customMeal.protein) {
      calories += customMeal.protein.calories
      protein += customMeal.protein.protein
      carbs += customMeal.protein.carbs
      fat += customMeal.protein.fat
      price += customMeal.protein.price
    }

    customMeal.vegetables.forEach(veg => {
      calories += veg.calories
      protein += veg.protein
      carbs += veg.carbs
      fat += veg.fat
      price += veg.price
    })

    if (customMeal.carb) {
      calories += customMeal.carb.calories
      protein += customMeal.carb.protein
      carbs += customMeal.carb.carbs
      fat += customMeal.carb.fat
      price += customMeal.carb.price
    }

    if (customMeal.sauce) {
      calories += customMeal.sauce.calories
      protein += customMeal.sauce.protein
      carbs += customMeal.sauce.carbs
      fat += customMeal.sauce.fat
      price += customMeal.sauce.price
    }

    setTotalNutrition({ calories, protein, carbs, fat, price })
  }

  const selectComponent = (component: MealComponent) => {
    if (component.type === 'protein') {
      setCustomMeal({ ...customMeal, protein: component })
    } else if (component.type === 'vegetable') {
      if (customMeal.vegetables.find(v => v.id === component.id)) {
        setCustomMeal({
          ...customMeal,
          vegetables: customMeal.vegetables.filter(v => v.id !== component.id),
        })
      } else if (customMeal.vegetables.length < 2) {
        setCustomMeal({
          ...customMeal,
          vegetables: [...customMeal.vegetables, component],
        })
      }
    } else if (component.type === 'carb') {
      setCustomMeal({
        ...customMeal,
        carb: customMeal.carb?.id === component.id ? undefined : component,
      })
    } else if (component.type === 'sauce') {
      setCustomMeal({
        ...customMeal,
        sauce: customMeal.sauce?.id === component.id ? undefined : component,
      })
    }
  }

  const isSelected = (component: MealComponent) => {
    if (component.type === 'protein') {
      return customMeal.protein?.id === component.id
    } else if (component.type === 'vegetable') {
      return customMeal.vegetables.some(v => v.id === component.id)
    } else if (component.type === 'carb') {
      return customMeal.carb?.id === component.id
    } else if (component.type === 'sauce') {
      return customMeal.sauce?.id === component.id
    }
    return false
  }

  const categories = [
    { key: 'protein', label: 'Protein', icon: Zap, required: true },
    { key: 'vegetables', label: 'Vegetables', icon: Heart, required: false },
    { key: 'carb', label: 'Carbs', icon: Flame, required: false },
    { key: 'sauce', label: 'Sauce', icon: ChefHat, required: false },
  ]

  const getMealCompleteness = () => {
    let score = 0
    let maxScore = 4

    if (customMeal.protein) score += 2 // Protein is most important
    if (customMeal.vegetables.length > 0) score += 1
    if (customMeal.carb) score += 0.5
    if (customMeal.sauce) score += 0.5

    return Math.round((score / maxScore) * 100)
  }

  return (
    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
      <FadeIn>
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-8">
          <div className="text-center">
            <ChefHat className="w-12 h-12 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-2">
              Interactive Meal Builder
            </h2>
            <p className="text-green-100 text-lg">
              Customize your perfect Factor75 meal and see instant pricing
            </p>
          </div>
        </div>
      </FadeIn>

      <div className="p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Meal Builder */}
          <div className="lg:col-span-2">
            {/* Category Tabs */}
            <FadeIn delay={0.1}>
              <div className="flex flex-wrap gap-2 mb-6">
                {categories.map(({ key, label, icon: Icon, required }) => (
                  <button
                    key={key}
                    onClick={() => setActiveCategory(key)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                      activeCategory === key
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="font-medium">{label}</span>
                    {required && (
                      <span className="text-xs bg-red-500 text-white px-1 rounded">
                        Required
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </FadeIn>

            {/* Component Selection */}
            <FadeIn delay={0.2}>
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4 capitalize">
                  Choose Your {activeCategory}
                  {activeCategory === 'vegetables' && ' (up to 2)'}
                </h3>

                <StaggeredAnimation className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {mealComponents[activeCategory]?.map(component => (
                    <div
                      key={component.id}
                      onClick={() => selectComponent(component)}
                      className={`relative cursor-pointer rounded-lg border-2 transition-all hover:shadow-md ${
                        isSelected(component)
                          ? 'border-green-500 bg-green-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="p-4">
                        <div className="flex items-center space-x-4">
                          <img
                            src={component.image}
                            alt={component.name}
                            className="w-16 h-12 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <h4 className="font-semibold text-gray-900">
                                {component.name}
                              </h4>
                              {component.popular && (
                                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                              )}
                            </div>
                            <div className="text-sm text-gray-600">
                              {component.calories} cal • {component.protein}g
                              protein
                            </div>
                            <div className="font-semibold text-green-600">
                              ${component.price.toFixed(2)}
                            </div>
                          </div>
                        </div>
                      </div>

                      {isSelected(component) && (
                        <div className="absolute top-2 right-2 bg-green-500 text-white rounded-full p-1">
                          <Plus className="w-4 h-4" />
                        </div>
                      )}
                    </div>
                  ))}
                </StaggeredAnimation>
              </div>
            </FadeIn>

            {/* Selected Components Summary */}
            <FadeIn delay={0.3}>
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Your Custom Meal</h3>
                <div className="space-y-3">
                  {customMeal.protein && (
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">
                        Protein: {customMeal.protein.name}
                      </span>
                      <span className="font-semibold">
                        ${customMeal.protein.price.toFixed(2)}
                      </span>
                    </div>
                  )}
                  {customMeal.vegetables.map(veg => (
                    <div
                      key={veg.id}
                      className="flex items-center justify-between"
                    >
                      <span className="text-gray-700">
                        Vegetable: {veg.name}
                      </span>
                      <span className="font-semibold">
                        ${veg.price.toFixed(2)}
                      </span>
                    </div>
                  ))}
                  {customMeal.carb && (
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">
                        Carb: {customMeal.carb.name}
                      </span>
                      <span className="font-semibold">
                        ${customMeal.carb.price.toFixed(2)}
                      </span>
                    </div>
                  )}
                  {customMeal.sauce && (
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">
                        Sauce: {customMeal.sauce.name}
                      </span>
                      <span className="font-semibold">
                        ${customMeal.sauce.price.toFixed(2)}
                      </span>
                    </div>
                  )}

                  {Object.values(customMeal).every(
                    v => !v || (Array.isArray(v) && v.length === 0)
                  ) && (
                    <p className="text-gray-500 text-center py-4">
                      Start building your meal by selecting components above
                    </p>
                  )}
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Nutrition & Pricing Summary */}
          <div className="lg:col-span-1">
            <FadeIn delay={0.4}>
              <div className="sticky top-8">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-6 mb-6">
                  <h3 className="text-xl font-semibold mb-4">
                    Nutrition Summary
                  </h3>

                  {/* Meal Completeness */}
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">
                        Meal Completeness
                      </span>
                      <span className="text-sm font-semibold">
                        {getMealCompleteness()}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all"
                        style={{ width: `${getMealCompleteness()}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Nutrition Facts */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center p-3 bg-white rounded-lg">
                      <Flame className="w-5 h-5 text-orange-500 mx-auto mb-1" />
                      <div className="text-lg font-bold text-gray-900">
                        {totalNutrition.calories}
                      </div>
                      <div className="text-xs text-gray-600">Calories</div>
                    </div>
                    <div className="text-center p-3 bg-white rounded-lg">
                      <Zap className="w-5 h-5 text-blue-500 mx-auto mb-1" />
                      <div className="text-lg font-bold text-gray-900">
                        {totalNutrition.protein}g
                      </div>
                      <div className="text-xs text-gray-600">Protein</div>
                    </div>
                    <div className="text-center p-3 bg-white rounded-lg">
                      <div className="w-5 h-5 bg-yellow-500 rounded mx-auto mb-1"></div>
                      <div className="text-lg font-bold text-gray-900">
                        {totalNutrition.carbs}g
                      </div>
                      <div className="text-xs text-gray-600">Carbs</div>
                    </div>
                    <div className="text-center p-3 bg-white rounded-lg">
                      <Heart className="w-5 h-5 text-red-500 mx-auto mb-1" />
                      <div className="text-lg font-bold text-gray-900">
                        {totalNutrition.fat}g
                      </div>
                      <div className="text-xs text-gray-600">Fat</div>
                    </div>
                  </div>

                  {/* Total Price */}
                  <div className="bg-white rounded-lg p-4 mb-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600 mb-1">
                        ${totalNutrition.price.toFixed(2)}
                      </div>
                      <div className="text-sm text-gray-600">Total Price</div>
                    </div>
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    disabled={!customMeal.protein}
                    className={`w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-semibold transition-all ${
                      customMeal.protein
                        ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700'
                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    <ShoppingCart className="w-5 h-5" />
                    <span>Add Custom Meal to Cart</span>
                  </button>

                  {!customMeal.protein && (
                    <p className="text-sm text-gray-500 text-center mt-2">
                      Select a protein to continue
                    </p>
                  )}
                </div>

                {/* Quick Actions */}
                <div className="space-y-3">
                  <button className="w-full flex items-center justify-center space-x-2 py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <Clock className="w-4 h-4" />
                    <span>Save for Later</span>
                  </button>
                  <button className="w-full flex items-center justify-center space-x-2 py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <Star className="w-4 h-4" />
                    <span>View Similar Meals</span>
                  </button>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InteractiveMealBuilder
