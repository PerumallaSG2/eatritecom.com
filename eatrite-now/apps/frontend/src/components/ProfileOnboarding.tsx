/**
 * EatRite Profile Onboarding Flow
 * Multi-step profile creation with health metrics, preferences, and goals
 */

import React, { useState } from 'react'
import { 
  User, 
  Scale, 
  Target, 
  Utensils, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft
} from 'lucide-react'

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

interface PersonalInfo {
  firstName: string
  lastName: string
  dateOfBirth: string
  gender: 'male' | 'female' | 'other' | 'prefer-not-to-say'
  phone: string
  avatar?: string
}

interface HealthMetrics {
  heightCm: number
  weightKg: number
  activityLevel: 'sedentary' | 'lightly-active' | 'moderately-active' | 'very-active' | 'extremely-active'
  fitnessLevel: 'beginner' | 'intermediate' | 'advanced'
}

interface GoalsAndPreferences {
  healthGoals: string[]
  dietaryRestrictions: string[]
  allergies: string[]
  medicalConditions: string[]
  weightGoal: 'lose' | 'maintain' | 'gain'
  targetWeightKg: number
}

interface NutritionTargets {
  dailyCalories: number
  proteinPercentage: number
  carbsPercentage: number
  fatPercentage: number
  waterIntakeMl: number
  mealsPerDay: number
}

interface ProfileOnboardingProps {
  userId: string
  onComplete: (profileData: {
    personalInfo: PersonalInfo
    healthMetrics: HealthMetrics
    goalsAndPreferences: GoalsAndPreferences
    nutritionTargets: NutritionTargets
  }) => void
  onSkip?: () => void
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

const ProfileOnboarding: React.FC<ProfileOnboardingProps> = ({
  onComplete,
  onSkip
}) => {
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

  // Form state
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: 'prefer-not-to-say',
    phone: ''
  })

  const [healthMetrics, setHealthMetrics] = useState<HealthMetrics>({
    heightCm: 170,
    weightKg: 70,
    activityLevel: 'moderately-active',
    fitnessLevel: 'intermediate'
  })

  const [goalsAndPreferences, setGoalsAndPreferences] = useState<GoalsAndPreferences>({
    healthGoals: [],
    dietaryRestrictions: [],
    allergies: [],
    medicalConditions: [],
    weightGoal: 'maintain',
    targetWeightKg: 70
  })

  const [nutritionTargets, setNutritionTargets] = useState<NutritionTargets>({
    dailyCalories: 2000,
    proteinPercentage: 25,
    carbsPercentage: 45,
    fatPercentage: 30,
    waterIntakeMl: 2000,
    mealsPerDay: 3
  })

  const totalSteps = 4

  // ============================================================================
  // HANDLERS
  // ============================================================================

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleComplete = async () => {
    setIsLoading(true)
    
    try {
      await onComplete({
        personalInfo,
        healthMetrics,
        goalsAndPreferences,
        nutritionTargets
      })
    } catch (error) {
      console.error('Profile completion error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleArrayToggle = (
    array: string[], 
    setArray: (arr: string[]) => void, 
    value: string
  ) => {
    if (array.includes(value)) {
      setArray(array.filter(item => item !== value))
    } else {
      setArray([...array, value])
    }
  }

  // ============================================================================
  // STEP COMPONENTS
  // ============================================================================

  const renderPersonalInfoStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-gradient-to-br from-[#D4B46A] to-[#B8935A] rounded-full flex items-center justify-center mx-auto mb-4">
          <User className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-[#0F2B1E] mb-2">Welcome to EatRite!</h2>
        <p className="text-gray-600 text-lg">Let's start by getting to know you better</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-[#0F2B1E] mb-2">
            First Name *
          </label>
          <input
            type="text"
            value={personalInfo.firstName}
            onChange={(e) => setPersonalInfo({...personalInfo, firstName: e.target.value})}
            className="w-full px-4 py-3 border border-[#D4B46A]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D4B46A]/50 focus:border-[#D4B46A]"
            placeholder="Enter your first name"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-[#0F2B1E] mb-2">
            Last Name *
          </label>
          <input
            type="text"
            value={personalInfo.lastName}
            onChange={(e) => setPersonalInfo({...personalInfo, lastName: e.target.value})}
            className="w-full px-4 py-3 border border-[#D4B46A]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D4B46A]/50 focus:border-[#D4B46A]"
            placeholder="Enter your last name"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-[#0F2B1E] mb-2">
            Date of Birth
          </label>
          <input
            type="date"
            value={personalInfo.dateOfBirth}
            onChange={(e) => setPersonalInfo({...personalInfo, dateOfBirth: e.target.value})}
            className="w-full px-4 py-3 border border-[#D4B46A]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D4B46A]/50 focus:border-[#D4B46A]"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-[#0F2B1E] mb-2">
            Gender
          </label>
          <select
            value={personalInfo.gender}
            onChange={(e) => setPersonalInfo({...personalInfo, gender: e.target.value as PersonalInfo['gender']})}
            className="w-full px-4 py-3 border border-[#D4B46A]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D4B46A]/50 focus:border-[#D4B46A]"
          >
            <option value="prefer-not-to-say">Prefer not to say</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-[#0F2B1E] mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            value={personalInfo.phone}
            onChange={(e) => setPersonalInfo({...personalInfo, phone: e.target.value})}
            className="w-full px-4 py-3 border border-[#D4B46A]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D4B46A]/50 focus:border-[#D4B46A]"
            placeholder="+1 (555) 123-4567"
          />
        </div>
      </div>
    </div>
  )

  const renderHealthMetricsStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-gradient-to-br from-[#D4B46A] to-[#B8935A] rounded-full flex items-center justify-center mx-auto mb-4">
          <Scale className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-[#0F2B1E] mb-2">Health Metrics</h2>
        <p className="text-gray-600 text-lg">Help us personalize your nutrition plan</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-[#0F2B1E] mb-2">
            Height (cm)
          </label>
          <input
            type="number"
            value={healthMetrics.heightCm}
            onChange={(e) => setHealthMetrics({...healthMetrics, heightCm: parseInt(e.target.value) || 0})}
            className="w-full px-4 py-3 border border-[#D4B46A]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D4B46A]/50 focus:border-[#D4B46A]"
            placeholder="170"
            min="50"
            max="250"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-[#0F2B1E] mb-2">
            Weight (kg)
          </label>
          <input
            type="number"
            step="0.1"
            value={healthMetrics.weightKg}
            onChange={(e) => setHealthMetrics({...healthMetrics, weightKg: parseFloat(e.target.value) || 0})}
            className="w-full px-4 py-3 border border-[#D4B46A]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D4B46A]/50 focus:border-[#D4B46A]"
            placeholder="70.0"
            min="20"
            max="300"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-[#0F2B1E] mb-2">
            Activity Level
          </label>
          <select
            value={healthMetrics.activityLevel}
            onChange={(e) => setHealthMetrics({...healthMetrics, activityLevel: e.target.value as HealthMetrics['activityLevel']})}
            className="w-full px-4 py-3 border border-[#D4B46A]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D4B46A]/50 focus:border-[#D4B46A]"
          >
            <option value="sedentary">Sedentary (Little to no exercise)</option>
            <option value="lightly-active">Lightly Active (Light exercise 1-3 days/week)</option>
            <option value="moderately-active">Moderately Active (Moderate exercise 3-5 days/week)</option>
            <option value="very-active">Very Active (Hard exercise 6-7 days/week)</option>
            <option value="extremely-active">Extremely Active (Very hard exercise/training)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-[#0F2B1E] mb-2">
            Fitness Level
          </label>
          <select
            value={healthMetrics.fitnessLevel}
            onChange={(e) => setHealthMetrics({...healthMetrics, fitnessLevel: e.target.value as HealthMetrics['fitnessLevel']})}
            className="w-full px-4 py-3 border border-[#D4B46A]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D4B46A]/50 focus:border-[#D4B46A]"
          >
            <option value="beginner">Beginner (New to fitness)</option>
            <option value="intermediate">Intermediate (Regular exercise routine)</option>
            <option value="advanced">Advanced (Experienced athlete/trainer)</option>
          </select>
        </div>
      </div>
    </div>
  )

  const renderGoalsStep = () => {
    const healthGoalOptions = [
      'weight-loss', 'weight-gain', 'muscle-gain', 'fat-loss', 'endurance', 'strength',
      'general-health', 'disease-prevention', 'energy-boost', 'better-sleep'
    ]

    const dietaryOptions = [
      'vegetarian', 'vegan', 'pescatarian', 'keto', 'paleo', 'mediterranean',
      'low-carb', 'low-fat', 'gluten-free', 'dairy-free'
    ]

    const allergyOptions = [
      'nuts', 'peanuts', 'shellfish', 'fish', 'eggs', 'dairy', 'soy', 'gluten', 'sesame'
    ]

    return (
      <div className="space-y-8">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-[#D4B46A] to-[#B8935A] rounded-full flex items-center justify-center mx-auto mb-4">
            <Target className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-[#0F2B1E] mb-2">Goals & Preferences</h2>
          <p className="text-gray-600 text-lg">Let us know your health goals and dietary needs</p>
        </div>

        <div>
          <label className="block text-sm font-semibold text-[#0F2B1E] mb-4">
            Health Goals (Select all that apply)
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {healthGoalOptions.map((goal) => (
              <button
                key={goal}
                type="button"
                onClick={() => handleArrayToggle(
                  goalsAndPreferences.healthGoals,
                  (arr) => setGoalsAndPreferences({...goalsAndPreferences, healthGoals: arr}),
                  goal
                )}
                className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all ${
                  goalsAndPreferences.healthGoals.includes(goal)
                    ? 'bg-[#D4B46A] text-white border-[#D4B46A]'
                    : 'bg-white text-[#0F2B1E] border-[#D4B46A]/30 hover:border-[#D4B46A]/60'
                }`}
              >
                {goal.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-[#0F2B1E] mb-4">
            Dietary Restrictions
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {dietaryOptions.map((diet) => (
              <button
                key={diet}
                type="button"
                onClick={() => handleArrayToggle(
                  goalsAndPreferences.dietaryRestrictions,
                  (arr) => setGoalsAndPreferences({...goalsAndPreferences, dietaryRestrictions: arr}),
                  diet
                )}
                className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all ${
                  goalsAndPreferences.dietaryRestrictions.includes(diet)
                    ? 'bg-[#D4B46A] text-white border-[#D4B46A]'
                    : 'bg-white text-[#0F2B1E] border-[#D4B46A]/30 hover:border-[#D4B46A]/60'
                }`}
              >
                {diet.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-[#0F2B1E] mb-4">
            Allergies & Intolerances
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {allergyOptions.map((allergy) => (
              <button
                key={allergy}
                type="button"
                onClick={() => handleArrayToggle(
                  goalsAndPreferences.allergies,
                  (arr) => setGoalsAndPreferences({...goalsAndPreferences, allergies: arr}),
                  allergy
                )}
                className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all ${
                  goalsAndPreferences.allergies.includes(allergy)
                    ? 'bg-red-500 text-white border-red-500'
                    : 'bg-white text-[#0F2B1E] border-red-200 hover:border-red-300'
                }`}
              >
                {allergy.replace(/\b\w/g, l => l.toUpperCase())}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-[#0F2B1E] mb-2">
              Weight Goal
            </label>
            <select
              value={goalsAndPreferences.weightGoal}
              onChange={(e) => setGoalsAndPreferences({...goalsAndPreferences, weightGoal: e.target.value as GoalsAndPreferences['weightGoal']})}
              className="w-full px-4 py-3 border border-[#D4B46A]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D4B46A]/50 focus:border-[#D4B46A]"
            >
              <option value="lose">Lose Weight</option>
              <option value="maintain">Maintain Weight</option>
              <option value="gain">Gain Weight</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#0F2B1E] mb-2">
              Target Weight (kg)
            </label>
            <input
              type="number"
              step="0.1"
              value={goalsAndPreferences.targetWeightKg}
              onChange={(e) => setGoalsAndPreferences({...goalsAndPreferences, targetWeightKg: parseFloat(e.target.value) || 0})}
              className="w-full px-4 py-3 border border-[#D4B46A]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D4B46A]/50 focus:border-[#D4B46A]"
              placeholder="70.0"
            />
          </div>
        </div>
      </div>
    )
  }

  const renderNutritionStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-gradient-to-br from-[#D4B46A] to-[#B8935A] rounded-full flex items-center justify-center mx-auto mb-4">
          <Utensils className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-[#0F2B1E] mb-2">Nutrition Targets</h2>
        <p className="text-gray-600 text-lg">Fine-tune your daily nutrition goals</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-[#0F2B1E] mb-2">
            Daily Calories
          </label>
          <input
            type="number"
            value={nutritionTargets.dailyCalories}
            onChange={(e) => setNutritionTargets({...nutritionTargets, dailyCalories: parseInt(e.target.value) || 0})}
            className="w-full px-4 py-3 border border-[#D4B46A]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D4B46A]/50 focus:border-[#D4B46A]"
            min="1000"
            max="5000"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-[#0F2B1E] mb-2">
            Meals Per Day
          </label>
          <select
            value={nutritionTargets.mealsPerDay}
            onChange={(e) => setNutritionTargets({...nutritionTargets, mealsPerDay: parseInt(e.target.value)})}
            className="w-full px-4 py-3 border border-[#D4B46A]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D4B46A]/50 focus:border-[#D4B46A]"
          >
            <option value={2}>2 Meals</option>
            <option value={3}>3 Meals</option>
            <option value={4}>4 Meals</option>
            <option value={5}>5 Meals</option>
            <option value={6}>6 Meals</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-[#0F2B1E] mb-2">
            Protein ({nutritionTargets.proteinPercentage}%)
          </label>
          <input
            type="range"
            min="10"
            max="40"
            value={nutritionTargets.proteinPercentage}
            onChange={(e) => setNutritionTargets({...nutritionTargets, proteinPercentage: parseInt(e.target.value)})}
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-[#0F2B1E] mb-2">
            Carbs ({nutritionTargets.carbsPercentage}%)
          </label>
          <input
            type="range"
            min="20"
            max="70"
            value={nutritionTargets.carbsPercentage}
            onChange={(e) => setNutritionTargets({...nutritionTargets, carbsPercentage: parseInt(e.target.value)})}
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-[#0F2B1E] mb-2">
            Fat ({nutritionTargets.fatPercentage}%)
          </label>
          <input
            type="range"
            min="10"
            max="50"
            value={nutritionTargets.fatPercentage}
            onChange={(e) => setNutritionTargets({...nutritionTargets, fatPercentage: parseInt(e.target.value)})}
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-[#0F2B1E] mb-2">
            Daily Water Intake (ml)
          </label>
          <input
            type="number"
            value={nutritionTargets.waterIntakeMl}
            onChange={(e) => setNutritionTargets({...nutritionTargets, waterIntakeMl: parseInt(e.target.value) || 0})}
            className="w-full px-4 py-3 border border-[#D4B46A]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D4B46A]/50 focus:border-[#D4B46A]"
            min="500"
            max="5000"
            step="250"
          />
        </div>
      </div>

      <div className="bg-[#F5EEDC] border border-[#D4B46A]/30 rounded-xl p-6">
        <h4 className="font-semibold text-[#0F2B1E] mb-2">Macronutrient Breakdown</h4>
        <div className="text-sm text-gray-600">
          <p>Protein: {nutritionTargets.proteinPercentage}% ({Math.round(nutritionTargets.dailyCalories * nutritionTargets.proteinPercentage / 400)}g)</p>
          <p>Carbs: {nutritionTargets.carbsPercentage}% ({Math.round(nutritionTargets.dailyCalories * nutritionTargets.carbsPercentage / 400)}g)</p>
          <p>Fat: {nutritionTargets.fatPercentage}% ({Math.round(nutritionTargets.dailyCalories * nutritionTargets.fatPercentage / 900)}g)</p>
        </div>
      </div>
    </div>
  )

  // ============================================================================
  // RENDER
  // ============================================================================

  const isLastStep = currentStep === totalSteps
  const isFirstStep = currentStep === 1

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5EEDC] to-white flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-medium text-[#0F2B1E]">
              Step {currentStep} of {totalSteps}
            </span>
            <span className="text-sm text-gray-500">
              {Math.round((currentStep / totalSteps) * 100)}% Complete
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-[#D4B46A] to-[#B8935A] h-3 rounded-full transition-all duration-500"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          {currentStep === 1 && renderPersonalInfoStep()}
          {currentStep === 2 && renderHealthMetricsStep()}
          {currentStep === 3 && renderGoalsStep()}
          {currentStep === 4 && renderNutritionStep()}

          {/* Navigation */}
          <div className="flex justify-between items-center mt-12 pt-8 border-t border-gray-200">
            <div>
              {!isFirstStep && (
                <button
                  onClick={handlePrevious}
                  className="flex items-center gap-2 px-6 py-3 text-gray-600 hover:text-[#0F2B1E] transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                  Previous
                </button>
              )}
            </div>

            <div className="flex gap-4">
              {onSkip && (
                <button
                  onClick={onSkip}
                  className="px-6 py-3 text-gray-600 hover:text-[#0F2B1E] transition-colors"
                >
                  Skip for now
                </button>
              )}

              {!isLastStep ? (
                <button
                  onClick={handleNext}
                  disabled={!personalInfo.firstName || !personalInfo.lastName}
                  className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-[#D4B46A] to-[#B8935A] text-white rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continue
                  <ArrowRight className="w-5 h-5" />
                </button>
              ) : (
                <button
                  onClick={handleComplete}
                  disabled={isLoading}
                  className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-[#D4B46A] to-[#B8935A] text-white rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Creating Profile...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-5 h-5" />
                      Complete Setup
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileOnboarding