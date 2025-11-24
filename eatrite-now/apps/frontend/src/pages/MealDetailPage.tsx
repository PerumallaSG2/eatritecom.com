import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Star, Clock, Users, ChefHat, Heart, Share2, Plus, Minus } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { MealCustomizationPanel, MealCustomization, Ingredient } from '../components/MealCustomizationPanel'
import { sampleMeals, generateCustomizationSummary } from '../data/mealData'

interface MealDetails {
  id: string
  name: string
  description: string
  longDescription: string
  basePrice: number
  image: string
  images: string[]
  rating: number
  reviews: number
  prepTime: number
  servings: number
  difficulty: 'Easy' | 'Medium' | 'Hard'
  tags: string[]
  baseIngredients: Ingredient[]
  availableSubstitutes: Ingredient[]
  baseNutrition: {
    calories: number
    protein: number
    carbs: number
    fat: number
    fiber: number
    sugar: number
    sodium: number
  }
  allergens: string[]
  chef?: {
    name: string
    avatar: string
    speciality: string
  }
}

export const MealDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  
  const [meal, setMeal] = useState<MealDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [showCustomization, setShowCustomization] = useState(false)
  const [customization, setCustomization] = useState<MealCustomization | null>(null)
  const [finalPrice, setFinalPrice] = useState(0)

  useEffect(() => {
    // Simulate API call to fetch meal details
    const fetchMeal = async () => {
      setLoading(true)
      
      // Find meal in sample data
      const sampleMeal = sampleMeals.find(m => m.id === id)
      if (sampleMeal) {
        const mealDetails: MealDetails = {
          ...sampleMeal,
          longDescription: `${sampleMeal.description} This carefully crafted meal combines premium ingredients with expert preparation techniques to deliver exceptional flavor and nutrition. Perfect for those who appreciate quality ingredients and balanced nutrition.`,
          image: `/api/placeholder/600/400`,
          images: [
            `/api/placeholder/600/400`,
            `/api/placeholder/600/400?meal=${id}&view=1`,
            `/api/placeholder/600/400?meal=${id}&view=2`,
            `/api/placeholder/600/400?meal=${id}&view=3`
          ],
          rating: 4.7,
          reviews: 128 + Math.floor(Math.random() * 200),
          prepTime: 15 + Math.floor(Math.random() * 20),
          servings: 1,
          difficulty: ['Easy', 'Medium', 'Hard'][Math.floor(Math.random() * 3)] as 'Easy' | 'Medium' | 'Hard',
          tags: ['Healthy', 'Fresh', 'Protein Rich'],
          allergens: [],
          chef: {
            name: 'Chef Maria Rodriguez',
            avatar: `/api/placeholder/40/40`,
            speciality: 'Mediterranean Cuisine'
          }
        }
        
        // Extract allergens from ingredients
        mealDetails.allergens = Array.from(new Set(
          mealDetails.baseIngredients.flatMap(ing => ing.allergens)
        ))
        
        setMeal(mealDetails)
        setFinalPrice(mealDetails.basePrice)
        
        // Initialize customization
        const initialCustomization: MealCustomization = {
          mealId: mealDetails.id,
          portionSize: 'regular',
          dietaryPreferences: [],
          ingredients: mealDetails.baseIngredients.map(ing => ({
            ingredientId: ing.id,
            amount: ing.baseAmount,
            isIncluded: true
          })),
          specialInstructions: '',
          estimatedNutrition: mealDetails.baseNutrition,
          priceAdjustment: 0
        }
        setCustomization(initialCustomization)
      }
      
      setLoading(false)
    }
    
    fetchMeal()
  }, [id])

  const handleCustomizationChange = (newCustomization: MealCustomization) => {
    setCustomization(newCustomization)
    
    if (meal) {
      // Calculate price based on customization
      let price = meal.basePrice
      
      // Portion size multipliers
      const portionMultipliers = {
        small: 0.8,
        regular: 1.0,
        large: 1.3,
        xl: 1.6
      }
      price *= portionMultipliers[newCustomization.portionSize]
      
      // Add ingredient price modifications
      newCustomization.ingredients.forEach(custIng => {
        if (custIng.isIncluded) {
          const ingredient = meal.baseIngredients.find(ing => ing.id === custIng.ingredientId) ||
                           meal.availableSubstitutes.find(ing => ing.id === custIng.ingredientId)
          if (ingredient) {
            price += ingredient.priceModifier * (custIng.amount / ingredient.baseAmount)
          }
        }
      })
      
      setFinalPrice(Math.max(0, price))
    }
  }

  const handleAddToCart = () => {
    if (!meal || !customization) return
    
    const cartItem = {
      id: `${meal.id}-${Date.now()}`,
      name: meal.name,
      description: meal.description,
      calories: customization.estimatedNutrition.calories,
      protein: customization.estimatedNutrition.protein,
      price: finalPrice,
      image_url: meal.image,
      dietary_tags: customization.dietaryPreferences.join(', ')
    }
    
    addToCart(cartItem)
    navigate('/cart')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="animate-pulse">
          <div className="h-64 bg-gray-300 dark:bg-gray-700"></div>
          <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
                <div className="h-20 bg-gray-300 dark:bg-gray-700 rounded"></div>
              </div>
              <div className="h-96 bg-gray-300 dark:bg-gray-700 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!meal) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Meal not found</h2>
          <button
            onClick={() => navigate('/meals')}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Back to Meals
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back</span>
            </button>
            <div className="flex items-center gap-3">
              <button className="p-2 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors">
                <Heart className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Images and Info */}
          <div className="space-y-6">
            {/* Main Image */}
            <div className="relative rounded-xl overflow-hidden bg-gray-200 dark:bg-gray-700">
              <img
                src={meal.images[activeImageIndex]}
                alt={meal.name}
                className="w-full h-80 object-cover"
              />
              
              {/* Image Navigation */}
              {meal.images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                  <div className="flex gap-2">
                    {meal.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveImageIndex(index)}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          index === activeImageIndex
                            ? 'bg-white'
                            : 'bg-white/50 hover:bg-white/75'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Thumbnail Images */}
            {meal.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {meal.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImageIndex(index)}
                    className={`relative rounded-lg overflow-hidden ${
                      index === activeImageIndex
                        ? 'ring-2 ring-green-500'
                        : 'hover:opacity-75'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${meal.name} view ${index + 1}`}
                      className="w-full h-16 object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Meal Info */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {meal.name}
              </h1>
              
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {meal.rating}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    ({meal.reviews} reviews)
                  </span>
                </div>
                
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    {meal.prepTime} mins
                  </span>
                </div>
                
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    {meal.servings} serving{meal.servings > 1 ? 's' : ''}
                  </span>
                </div>
              </div>

              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {meal.longDescription}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {meal.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-sm rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Chef Info */}
              {meal.chef && (
                <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <img
                    src={meal.chef.avatar}
                    alt={meal.chef.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">
                      {meal.chef.name}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {meal.chef.speciality}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Allergens */}
            {meal.allergens.length > 0 && (
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-xl p-4">
                <h3 className="font-medium text-yellow-800 dark:text-yellow-300 mb-2">
                  Allergen Information
                </h3>
                <p className="text-sm text-yellow-700 dark:text-yellow-400">
                  Contains: {meal.allergens.join(', ')}
                </p>
              </div>
            )}
          </div>

          {/* Right Column - Customization and Order */}
          <div className="space-y-6">
            {/* Price and Basic Options */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">
                    ${finalPrice.toFixed(2)}
                  </div>
                  {finalPrice !== meal.basePrice && (
                    <div className="text-sm text-gray-500 dark:text-gray-400 line-through">
                      ${meal.basePrice.toFixed(2)}
                    </div>
                  )}
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500 dark:text-gray-400">per serving</div>
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Quantity:
                </span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="text-lg font-medium text-gray-900 dark:text-white w-8 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Customization Toggle */}
              <button
                onClick={() => setShowCustomization(!showCustomization)}
                className="w-full flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors mb-4"
              >
                <div className="flex items-center gap-2">
                  <ChefHat className="w-5 h-5 text-green-600 dark:text-green-400" />
                  <span className="font-medium text-green-800 dark:text-green-300">
                    Customize Your Meal
                  </span>
                </div>
                <div className="text-green-600 dark:text-green-400">
                  {showCustomization ? '▼' : '▶'}
                </div>
              </button>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-4 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Add to Cart - ${(finalPrice * quantity).toFixed(2)}
              </button>

              {/* Customization Summary */}
              {customization && (
                <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {generateCustomizationSummary(customization)}
                  </div>
                </div>
              )}
            </div>

            {/* Customization Panel */}
            {showCustomization && customization && (
              <MealCustomizationPanel
                meal={{
                  id: meal.id,
                  name: meal.name,
                  description: meal.description,
                  basePrice: meal.basePrice,
                  baseIngredients: meal.baseIngredients,
                  availableSubstitutes: meal.availableSubstitutes,
                  baseNutrition: meal.baseNutrition
                }}
                onCustomizationChange={handleCustomizationChange}
                initialCustomization={customization}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MealDetailPage