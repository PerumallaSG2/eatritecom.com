import { useState } from 'react'
import { ChevronRight, Check, Calendar } from 'lucide-react'

const PlansPage = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [selectedSize, setSelectedSize] = useState<number>(8)
  const [selectedPreferences, setSelectedPreferences] = useState<string[]>([])
  const [currentStep, setCurrentStep] = useState(1)

  const mealPlans = [
    {
      id: 'chef-signature',
      name: "Chef's Signature",
      description: 'Artfully crafted meals featuring diverse global flavors and premium seasonal ingredients',
      pricePerMeal: 14.95,
      features: ['Chef-curated weekly selections', 'Premium organic ingredients', 'Global cuisine variety', 'Seasonal specialties'],
      popular: true,
      badge: 'Most Popular',
      icon: '👨‍🍳'
    },
    {
      id: 'wellness-focused',
      name: 'Wellness Focused',
      description: 'Nutritionally optimized meals designed to support your health and wellness goals',
      pricePerMeal: 13.95,
      features: ['Nutritionist approved', 'Balanced macronutrients', 'Anti-inflammatory ingredients', 'Portion controlled'],
      popular: false,
      badge: null,
      icon: '🥗'
    },
    {
      id: 'performance',
      name: 'Performance',
      description: 'High-protein meals engineered for active lifestyles and fitness enthusiasts',
      pricePerMeal: 15.95,
      features: ['30g+ protein per meal', 'Pre/post workout options', 'Clean energy sources', 'Recovery nutrients'],
      popular: false,
      badge: 'High Protein',
      icon: '💪'
    },
    {
      id: 'plant-forward',
      name: 'Plant Forward',
      description: 'Vibrant plant-based meals that celebrate fresh vegetables and innovative preparations',
      pricePerMeal: 12.95,
      features: ['Plant-based proteins', 'Locally sourced produce', 'Innovative preparations', 'Nutrient dense'],
      popular: false,
      badge: 'Plant Based',
      icon: '🌱'
    }
  ]

  const planSizes = [
    { meals: 4, frequency: 'per week', price: 60.00, savings: 0, mostPopular: false },
    { meals: 6, frequency: 'per week', price: 78.00, savings: 12, mostPopular: false },
    { meals: 8, frequency: 'per week', price: 96.00, savings: 24, mostPopular: true },
    { meals: 10, frequency: 'per week', price: 110.00, savings: 40, mostPopular: false },
    { meals: 12, frequency: 'per week', price: 120.00, savings: 60, mostPopular: false }
  ]

  const dietaryPreferences = [
    { id: 'everything', name: 'I eat everything', icon: '🍽️', description: 'No dietary restrictions' },
    { id: 'calorie-smart', name: 'Calorie smart', icon: '🥗', description: '~550kcal or less per serving' },
    { id: 'keto', name: 'Keto', icon: '🥑', description: 'Low carb, high fat' },
    { id: 'high-protein', name: 'High protein', icon: '💪', description: '30g+ protein per meal' },
    { id: 'low-carb', name: 'Low carb', icon: '🚫🍞', description: 'Reduced carbohydrates' },
    { id: 'vegetarian', name: 'Vegetarian', icon: '🌿', description: 'Plant-based options' },
    { id: 'vegan', name: 'Vegan', icon: '🌱', description: '100% plant-based' },
    { id: 'gluten-free', name: 'Gluten free', icon: '🚫🌾', description: 'No gluten ingredients' }
  ]

  const togglePreference = (preferenceId: string) => {
    setSelectedPreferences(prev => 
      prev.includes(preferenceId) 
        ? prev.filter(id => id !== preferenceId)
        : [...prev, preferenceId]
    )
  }

  const getAccentColor = (color: string) => {
    const colors = {
      blue: 'border-blue-200 bg-blue-50 text-blue-700',
      green: 'border-green-200 bg-green-50 text-green-700',
      purple: 'border-purple-200 bg-purple-50 text-purple-700',
      orange: 'border-orange-200 bg-orange-50 text-orange-700'
    }
    return colors[color as keyof typeof colors] || colors.blue
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-[#0F2B1E] font-playfair">
              Choose Your Plan
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Personalized meal plans crafted to support your lifestyle, dietary preferences, 
              and wellness journey. Fresh, chef-prepared meals delivered weekly.
            </p>
          </div>
        </div>
      </section>

      {/* Dietary Preferences */}
      <section className="pb-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold mb-4 text-[#0F2B1E] font-playfair">
              Your Dietary Preferences
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Help us personalize your meal selections by choosing your dietary preferences and goals
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {dietaryPreferences.map((preference) => (
              <button
                key={preference.id}
                onClick={() => togglePreference(preference.id)}
                className={`relative p-4 rounded-lg border transition-all duration-200 text-left hover:shadow-sm ${
                  selectedPreferences.includes(preference.id)
                    ? 'border-[#D4B46A] bg-[#F5F2E8] shadow-sm'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <div className="text-xl mb-3">{preference.icon}</div>
                <div className="font-medium text-[#0F2B1E] mb-1 text-sm">{preference.name}</div>
                <div className="text-xs text-gray-500 leading-relaxed">{preference.description}</div>
                {selectedPreferences.includes(preference.id) && (
                  <div className="absolute top-3 right-3">
                    <div className="w-5 h-5 bg-[#D4B46A] rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Meal Plans */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold mb-4 text-[#0F2B1E] font-playfair">
              Select Your Meal Plan
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choose the culinary experience that best aligns with your taste preferences and nutritional goals
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {mealPlans.map((plan) => (
              <div 
                key={plan.id} 
                className={`relative bg-white rounded-xl border transition-all duration-300 hover:shadow-lg ${
                  plan.popular ? 'border-[#D4B46A] shadow-md' : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <div className={`px-4 py-1 rounded-full text-sm font-medium ${
                      plan.popular 
                        ? 'bg-[#D4B46A] text-white' 
                        : 'bg-gray-600 text-white'
                    }`}>
                      {plan.badge}
                    </div>
                  </div>
                )}
                
                <div className="p-8">
                  <div className="flex items-start mb-6">
                    <div className="text-3xl mr-4 mt-1">{plan.icon}</div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-[#0F2B1E] mb-2 font-playfair">
                        {plan.name}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {plan.description}
                      </p>
                    </div>
                  </div>

                  <div className="mb-8 pb-6 border-b border-gray-100">
                    <div className="text-2xl font-bold text-[#0F2B1E]">
                      ${plan.pricePerMeal}
                      <span className="text-base font-normal text-gray-500"> per meal</span>
                    </div>
                  </div>

                  <div className="space-y-3 mb-8">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center">
                        <div className="flex-shrink-0 w-4 h-4 rounded-full bg-green-50 flex items-center justify-center mr-3">
                          <Check className="w-2.5 h-2.5 text-green-600" />
                        </div>
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <button 
                    onClick={() => setSelectedPlan(plan.id)}
                    className={`w-full py-3 px-4 rounded-lg font-medium transition-colors duration-200 ${
                      selectedPlan === plan.id
                        ? 'bg-[#0F2B1E] text-white'
                        : plan.popular
                        ? 'bg-[#0F2B1E] hover:bg-[#1a4d33] text-white'
                        : 'bg-gray-50 hover:bg-gray-100 text-[#0F2B1E] border border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {selectedPlan === plan.id ? 'Selected' : 'Choose Plan'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Plan Sizes */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold mb-4 text-[#0F2B1E] font-playfair">
              Choose Your Frequency
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Select the number of meals that best fits your weekly routine and dining preferences
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
            {planSizes.map((size) => (
              <button
                key={size.meals}
                onClick={() => setSelectedSize(size.meals)}
                className={`relative text-center p-6 rounded-lg border transition-all duration-200 ${
                  selectedSize === size.meals
                    ? 'border-[#D4B46A] bg-[#F5F2E8] shadow-sm'
                    : size.mostPopular 
                    ? 'border-[#D4B46A] bg-white shadow-md' 
                    : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
                }`}
              >
                {size.mostPopular && selectedSize !== size.meals && (
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                    <div className="bg-[#D4B46A] text-white px-3 py-1 rounded-full text-xs font-medium">
                      Popular
                    </div>
                  </div>
                )}
                
                <div className="text-2xl font-bold text-[#0F2B1E] mb-1">
                  {size.meals}
                </div>
                <div className="text-gray-600 mb-4 text-sm">meals {size.frequency}</div>
                
                <div className="text-lg font-semibold text-[#0F2B1E] mb-2">
                  ${size.price}
                </div>
                
                {size.savings > 0 && (
                  <div className="text-xs text-green-600 font-medium">
                    Save ${size.savings}
                  </div>
                )}

                {selectedSize === size.meals && (
                  <div className="absolute top-3 right-3">
                    <div className="w-5 h-5 bg-[#D4B46A] rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                  </div>
                )}
              </button>
            ))}
          </div>

          <div className="text-center">
            <button className="bg-[#0F2B1E] hover:bg-[#1a4d33] text-white font-medium py-4 px-8 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 mx-auto">
              Continue to Checkout
              <ChevronRight className="w-4 h-4" />
            </button>
            <p className="text-sm text-gray-500 mt-4">
              Free delivery • Cancel anytime • No commitment
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default PlansPage