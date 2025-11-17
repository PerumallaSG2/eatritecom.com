import React, { useState } from 'react'
import { User, Target, AlertTriangle, Utensils, Calendar } from 'lucide-react'
import { useUserPreferences } from '../context/UserPreferencesContext'

interface DietaryProfileSetupProps {
  onComplete?: () => void
  isModal?: boolean
}

const DietaryProfileSetup: React.FC<DietaryProfileSetupProps> = ({
  onComplete,
  isModal = false,
}) => {
  const { preferences, updatePreferences, updateDietaryProfile } =
    useUserPreferences()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: preferences?.name || '',
    email: preferences?.email || '',
    dietaryProfile: {
      restrictions: preferences?.dietaryProfile?.restrictions || [],
      preferences: preferences?.dietaryProfile?.preferences || [],
      allergies: preferences?.dietaryProfile?.allergies || [],
      calorieGoal: preferences?.dietaryProfile?.calorieGoal || 2000,
      proteinGoal: preferences?.dietaryProfile?.proteinGoal || 150,
      carbPreference:
        preferences?.dietaryProfile?.carbPreference || ('moderate' as const),
      goals: preferences?.dietaryProfile?.goals || [],
    },
    mealPlanPreferences: {
      mealsPerWeek: preferences?.mealPlanPreferences?.mealsPerWeek || 8,
      deliveryDay: preferences?.mealPlanPreferences?.deliveryDay || 'Tuesday',
      portion:
        preferences?.mealPlanPreferences?.portion || ('regular' as const),
      variety:
        preferences?.mealPlanPreferences?.variety || ('adventurous' as const),
    },
  })

  const dietaryOptions = [
    { id: 'keto', label: 'Keto', description: 'Low carb, high fat' },
    { id: 'paleo', label: 'Paleo', description: 'Whole foods, no grains' },
    { id: 'vegetarian', label: 'Vegetarian', description: 'No meat or fish' },
    { id: 'vegan', label: 'Vegan', description: 'Plant-based only' },
    {
      id: 'high-protein',
      label: 'High Protein',
      description: '30g+ protein per meal',
    },
    { id: 'low-carb', label: 'Low Carb', description: 'Under 30g carbs' },
    {
      id: 'calorie-smart',
      label: 'Calorie Smart',
      description: 'Under 550 calories',
    },
    {
      id: 'mediterranean',
      label: 'Mediterranean',
      description: 'Heart-healthy fats',
    },
  ]

  const allergyOptions = [
    'Dairy',
    'Gluten',
    'Nuts',
    'Shellfish',
    'Eggs',
    'Soy',
    'Fish',
    'Sesame',
  ]

  const goalOptions = [
    'Weight Loss',
    'Muscle Gain',
    'Maintain Weight',
    'Improve Energy',
    'Better Sleep',
    'Reduce Inflammation',
    'Heart Health',
    'Performance',
  ]

  const handleToggleOption = (
    category: 'restrictions' | 'preferences' | 'allergies' | 'goals',
    option: string
  ) => {
    setFormData(prev => ({
      ...prev,
      dietaryProfile: {
        ...prev.dietaryProfile,
        [category]: (prev.dietaryProfile[category] as string[]).includes(option)
          ? (prev.dietaryProfile[category] as string[]).filter(
              (item: string) => item !== option
            )
          : [...(prev.dietaryProfile[category] as string[]), option],
      },
    }))
  }

  const handleSave = () => {
    // Update user preferences
    updatePreferences({
      name: formData.name,
      email: formData.email,
      mealPlanPreferences: formData.mealPlanPreferences,
    })

    // Update dietary profile
    updateDietaryProfile(formData.dietaryProfile)

    onComplete?.()
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <User className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900">
                Welcome to Eatrite!
              </h2>
              <p className="text-gray-600">
                Let's personalize your meal experience
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={e =>
                    setFormData(prev => ({ ...prev, name: e.target.value }))
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={e =>
                    setFormData(prev => ({ ...prev, email: e.target.value }))
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter your email"
                />
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Utensils className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900">
                Dietary Preferences
              </h2>
              <p className="text-gray-600">Select all that apply to you</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {dietaryOptions.map(option => (
                <button
                  key={option.id}
                  onClick={() => handleToggleOption('restrictions', option.id)}
                  className={`p-4 border-2 rounded-lg text-left transition-colors ${
                    formData.dietaryProfile.restrictions.includes(option.id)
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 hover:border-green-300'
                  }`}
                >
                  <div className="font-semibold text-gray-900">
                    {option.label}
                  </div>
                  <div className="text-sm text-gray-600">
                    {option.description}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <AlertTriangle className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900">
                Food Allergies
              </h2>
              <p className="text-gray-600">Help us keep you safe</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {allergyOptions.map(allergy => (
                <button
                  key={allergy}
                  onClick={() => handleToggleOption('allergies', allergy)}
                  className={`p-3 border-2 rounded-lg text-center transition-colors ${
                    formData.dietaryProfile.allergies.includes(allergy)
                      ? 'border-red-500 bg-red-50 text-red-700'
                      : 'border-gray-200 hover:border-red-300'
                  }`}
                >
                  {allergy}
                </button>
              ))}
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Target className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900">Your Goals</h2>
              <p className="text-gray-600">What are you trying to achieve?</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {goalOptions.map(goal => (
                <button
                  key={goal}
                  onClick={() => handleToggleOption('goals', goal)}
                  className={`p-4 border-2 rounded-lg text-center transition-colors ${
                    formData.dietaryProfile.goals.includes(goal)
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 hover:border-green-300'
                  }`}
                >
                  {goal}
                </button>
              ))}
            </div>

            <div className="mt-8 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Daily Calorie Goal
                  </label>
                  <input
                    type="number"
                    min="1200"
                    max="4000"
                    step="50"
                    value={formData.dietaryProfile.calorieGoal}
                    onChange={e =>
                      setFormData(prev => ({
                        ...prev,
                        dietaryProfile: {
                          ...prev.dietaryProfile,
                          calorieGoal: parseInt(e.target.value),
                        },
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Daily Protein Goal (g)
                  </label>
                  <input
                    type="number"
                    min="50"
                    max="300"
                    step="5"
                    value={formData.dietaryProfile.proteinGoal}
                    onChange={e =>
                      setFormData(prev => ({
                        ...prev,
                        dietaryProfile: {
                          ...prev.dietaryProfile,
                          proteinGoal: parseInt(e.target.value),
                        },
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>
        )

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Calendar className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900">
                Meal Plan Preferences
              </h2>
              <p className="text-gray-600">Customize your delivery</p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Meals per week
                </label>
                <div className="grid grid-cols-4 gap-3">
                  {[4, 6, 8, 10].map(count => (
                    <button
                      key={count}
                      onClick={() =>
                        setFormData(prev => ({
                          ...prev,
                          mealPlanPreferences: {
                            ...prev.mealPlanPreferences,
                            mealsPerWeek: count,
                          },
                        }))
                      }
                      className={`p-3 border-2 rounded-lg text-center transition-colors ${
                        formData.mealPlanPreferences.mealsPerWeek === count
                          ? 'border-green-500 bg-green-50'
                          : 'border-gray-200 hover:border-green-300'
                      }`}
                    >
                      {count} meals
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Preferred delivery day
                </label>
                <select
                  value={formData.mealPlanPreferences.deliveryDay}
                  onChange={e =>
                    setFormData(prev => ({
                      ...prev,
                      mealPlanPreferences: {
                        ...prev.mealPlanPreferences,
                        deliveryDay: e.target.value,
                      },
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="Monday">Monday</option>
                  <option value="Tuesday">Tuesday</option>
                  <option value="Wednesday">Wednesday</option>
                  <option value="Thursday">Thursday</option>
                  <option value="Friday">Friday</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Portion size
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    {
                      value: 'regular',
                      label: 'Regular',
                      description: 'Standard portions',
                    },
                    {
                      value: 'large',
                      label: 'Large',
                      description: '25% more food',
                    },
                  ].map(option => (
                    <button
                      key={option.value}
                      onClick={() =>
                        setFormData(prev => ({
                          ...prev,
                          mealPlanPreferences: {
                            ...prev.mealPlanPreferences,
                            portion: option.value as 'regular' | 'large',
                          },
                        }))
                      }
                      className={`p-3 border-2 rounded-lg text-center transition-colors ${
                        formData.mealPlanPreferences.portion === option.value
                          ? 'border-green-500 bg-green-50'
                          : 'border-gray-200 hover:border-green-300'
                      }`}
                    >
                      <div className="font-semibold">{option.label}</div>
                      <div className="text-sm text-gray-600">
                        {option.description}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  const containerClasses = isModal
    ? 'bg-white rounded-xl shadow-xl p-6 max-w-2xl mx-auto max-h-[90vh] overflow-y-auto'
    : 'max-w-2xl mx-auto py-12 px-4'

  return (
    <div className={containerClasses}>
      {/* Progress indicator */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-500">
            Step {step} of 5
          </span>
          <span className="text-sm font-medium text-gray-500">
            {Math.round((step / 5) * 100)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-green-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(step / 5) * 100}%` }}
          />
        </div>
      </div>

      {renderStep()}

      {/* Navigation buttons */}
      <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
        {step > 1 ? (
          <button
            onClick={() => setStep(step - 1)}
            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Back
          </button>
        ) : (
          <div />
        )}

        {step < 5 ? (
          <button
            onClick={() => setStep(step + 1)}
            disabled={step === 1 && (!formData.name || !formData.email)}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Continue
          </button>
        ) : (
          <button
            onClick={handleSave}
            className="px-8 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Complete Setup
          </button>
        )}
      </div>
    </div>
  )
}

export default DietaryProfileSetup
