import React, { useState } from 'react'

// Premium Taste Profile Quiz
const PremiumTasteProfileQuiz: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, any>>({})
  const [isComplete, setIsComplete] = useState(false)

  // Premium Components
  const PremiumCard: React.FC<{
    children: React.ReactNode
    className?: string
    hover?: boolean
  }> = ({ children, className = '', hover = false }) => {
    return (
      <div
        className={`
        bg-white rounded-2xl shadow-sm border border-[#F9FAFB] p-8
        ${hover ? 'hover:shadow-lg transition-all duration-200 cursor-pointer' : ''}
        ${className}
      `}
      >
        {children}
      </div>
    )
  }

  const PremiumButton: React.FC<{
    children: React.ReactNode
    variant?: 'primary' | 'secondary' | 'outline'
    size?: 'sm' | 'md' | 'lg'
    className?: string
    onClick?: () => void
    disabled?: boolean
  }> = ({
    children,
    variant = 'primary',
    size = 'md',
    className = '',
    onClick,
    disabled = false,
  }) => {
    const baseClass =
      'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'

    const variants = {
      primary:
        'bg-[#0B4F3C] text-white hover:bg-[#083d2f] shadow-sm hover:shadow-md focus:ring-[#0B4F3C]',
      secondary:
        'bg-[#34D399] text-white hover:bg-[#10B981] shadow-sm hover:shadow-md focus:ring-[#34D399]',
      outline:
        'border border-[#D1D5DB] bg-white text-[#4B5563] hover:bg-[#F9FAFB] hover:border-[#6B7280] focus:ring-[#D1D5DB]',
    }

    const sizes = {
      sm: 'px-4 py-2 text-sm rounded-full',
      md: 'px-8 py-3 text-base rounded-xl',
      lg: 'px-10 py-4 text-lg rounded-xl',
    }

    return (
      <button
        className={`${baseClass} ${variants[variant]} ${sizes[size]} ${className}`}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </button>
    )
  }

  // Quiz questions
  const quizQuestions = [
    {
      id: 'dietary_preferences',
      title: 'What are your dietary preferences?',
      type: 'multiple',
      options: [
        {
          id: 'omnivore',
          label: 'Omnivore',
          description: 'I eat everything',
          icon: '🍽️',
        },
        {
          id: 'vegetarian',
          label: 'Vegetarian',
          description: 'No meat, but dairy and eggs are okay',
          icon: '🥬',
        },
        {
          id: 'vegan',
          label: 'Vegan',
          description: 'Plant-based only',
          icon: '🌱',
        },
        {
          id: 'pescatarian',
          label: 'Pescatarian',
          description: 'Fish and seafood, no other meat',
          icon: '🐟',
        },
        {
          id: 'keto',
          label: 'Keto',
          description: 'Low-carb, high-fat',
          icon: '🥑',
        },
        {
          id: 'paleo',
          label: 'Paleo',
          description: 'Whole foods, no processed ingredients',
          icon: '🥩',
        },
      ],
    },
    {
      id: 'allergies',
      title: 'Do you have any food allergies or intolerances?',
      type: 'multiple',
      options: [
        {
          id: 'none',
          label: 'None',
          description: 'No allergies or intolerances',
          icon: '✅',
        },
        {
          id: 'gluten',
          label: 'Gluten',
          description: 'Celiac disease or gluten sensitivity',
          icon: '🌾',
        },
        {
          id: 'dairy',
          label: 'Dairy',
          description: 'Lactose intolerant or dairy allergy',
          icon: '🥛',
        },
        {
          id: 'nuts',
          label: 'Tree Nuts',
          description: 'Nut allergies',
          icon: '🥜',
        },
        {
          id: 'shellfish',
          label: 'Shellfish',
          description: 'Shellfish allergy',
          icon: '🦐',
        },
        { id: 'eggs', label: 'Eggs', description: 'Egg allergy', icon: '🥚' },
        {
          id: 'soy',
          label: 'Soy',
          description: 'Soy allergy or intolerance',
          icon: '🫘',
        },
      ],
    },
    {
      id: 'cuisines',
      title: 'Which cuisines do you enjoy most?',
      type: 'multiple',
      maxSelections: 4,
      options: [
        { id: 'italian', label: 'Italian', icon: '🍝' },
        { id: 'asian', label: 'Asian', icon: '🍜' },
        { id: 'mediterranean', label: 'Mediterranean', icon: '🫒' },
        { id: 'mexican', label: 'Mexican', icon: '🌮' },
        { id: 'indian', label: 'Indian', icon: '🍛' },
        { id: 'american', label: 'American', icon: '🍔' },
        { id: 'middle_eastern', label: 'Middle Eastern', icon: '🥙' },
        { id: 'thai', label: 'Thai', icon: '🍲' },
        { id: 'french', label: 'French', icon: '🥐' },
        { id: 'japanese', label: 'Japanese', icon: '🍣' },
      ],
    },
    {
      id: 'spice_level',
      title: 'How spicy do you like your food?',
      type: 'single',
      options: [
        {
          id: 'mild',
          label: 'Mild',
          description: 'Little to no heat',
          icon: '🟢',
        },
        {
          id: 'medium',
          label: 'Medium',
          description: 'Some warmth and flavor',
          icon: '🟡',
        },
        {
          id: 'hot',
          label: 'Hot',
          description: 'Bring on the heat!',
          icon: '🟠',
        },
        {
          id: 'extra_hot',
          label: 'Extra Hot',
          description: 'The spicier the better',
          icon: '🔴',
        },
      ],
    },
    {
      id: 'portion_size',
      title: 'What portion size works best for you?',
      type: 'single',
      options: [
        {
          id: 'small',
          label: 'Small',
          description: '300-450 calories',
          icon: '🥗',
        },
        {
          id: 'regular',
          label: 'Regular',
          description: '450-650 calories',
          icon: '🍽️',
        },
        {
          id: 'large',
          label: 'Large',
          description: '650-850 calories',
          icon: '🍖',
        },
        {
          id: 'extra_large',
          label: 'Extra Large',
          description: '850+ calories',
          icon: '🥩',
        },
      ],
    },
    {
      id: 'meal_timing',
      title: 'When do you typically order meals?',
      type: 'multiple',
      options: [
        {
          id: 'breakfast',
          label: 'Breakfast',
          description: '6:00 AM - 10:00 AM',
          icon: '🌅',
        },
        {
          id: 'lunch',
          label: 'Lunch',
          description: '11:00 AM - 2:00 PM',
          icon: '☀️',
        },
        {
          id: 'snack',
          label: 'Afternoon Snack',
          description: '2:00 PM - 5:00 PM',
          icon: '🍎',
        },
        {
          id: 'dinner',
          label: 'Dinner',
          description: '5:00 PM - 8:00 PM',
          icon: '🌙',
        },
        {
          id: 'late_night',
          label: 'Late Night',
          description: '8:00 PM - 11:00 PM',
          icon: '🌃',
        },
      ],
    },
    {
      id: 'health_goals',
      title: 'What are your primary health goals?',
      type: 'multiple',
      maxSelections: 3,
      options: [
        {
          id: 'weight_loss',
          label: 'Weight Loss',
          description: 'Reduce body weight',
          icon: '📉',
        },
        {
          id: 'muscle_gain',
          label: 'Muscle Gain',
          description: 'Build lean muscle mass',
          icon: '💪',
        },
        {
          id: 'energy',
          label: 'More Energy',
          description: 'Increase daily energy levels',
          icon: '⚡',
        },
        {
          id: 'general_health',
          label: 'General Health',
          description: 'Overall wellness',
          icon: '❤️',
        },
        {
          id: 'digestion',
          label: 'Better Digestion',
          description: 'Improve gut health',
          icon: '🌿',
        },
        {
          id: 'performance',
          label: 'Athletic Performance',
          description: 'Enhance workout results',
          icon: '🏃‍♀️',
        },
      ],
    },
  ]

  const handleAnswer = (
    questionId: string,
    answerId: string,
    isMultiple: boolean = false
  ) => {
    setAnswers(prev => {
      if (isMultiple) {
        const current = prev[questionId] || []
        const question = quizQuestions.find(q => q.id === questionId)
        const maxSelections = question?.maxSelections

        if (current.includes(answerId)) {
          return {
            ...prev,
            [questionId]: current.filter((id: string) => id !== answerId),
          }
        } else {
          if (maxSelections && current.length >= maxSelections) {
            return prev // Don't allow more selections
          }
          return { ...prev, [questionId]: [...current, answerId] }
        }
      } else {
        return { ...prev, [questionId]: answerId }
      }
    })
  }

  const canProceed = () => {
    const currentQuestion = quizQuestions[currentStep]
    const answer = answers[currentQuestion.id]

    if (!answer) return false
    if (Array.isArray(answer)) return answer.length > 0
    return true
  }

  const nextStep = () => {
    if (currentStep < quizQuestions.length - 1) {
      setCurrentStep(prev => prev + 1)
    } else {
      setIsComplete(true)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1)
    }
  }

  const progress = ((currentStep + 1) / quizQuestions.length) * 100

  if (isComplete) {
    return (
      <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center p-6">
        <div className="max-w-2xl w-full">
          <PremiumCard className="text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-[#0B4F3C] to-[#34D399] rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl text-white">✨</span>
            </div>

            <h1 className="text-3xl font-bold text-[#111827] mb-4">
              Your Taste Profile is Ready!
            </h1>

            <p className="text-lg text-[#6B7280] mb-8">
              We've created a personalized meal plan based on your preferences.
              Get ready to discover amazing meals tailored just for you!
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#0B4F3C]/10 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="font-medium text-[#111827] mb-1">
                  Personalized
                </h3>
                <p className="text-sm text-[#6B7280]">
                  Meals matched to your taste
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-[#34D399]/10 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">💚</span>
                </div>
                <h3 className="font-medium text-[#111827] mb-1">Healthy</h3>
                <p className="text-sm text-[#6B7280]">
                  Nutrition goals aligned
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-[#D4A857]/10 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">🍽️</span>
                </div>
                <h3 className="font-medium text-[#111827] mb-1">Delicious</h3>
                <p className="text-sm text-[#6B7280]">Flavors you'll love</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <PremiumButton variant="primary" size="lg" className="min-w-48">
                🍽️ Browse Recommended Meals
              </PremiumButton>
              <PremiumButton variant="outline" size="lg" className="min-w-48">
                📊 View My Profile
              </PremiumButton>
            </div>
          </PremiumCard>
        </div>
      </div>
    )
  }

  const currentQuestion = quizQuestions[currentStep]

  return (
    <div className="min-h-screen bg-[#F9FAFB] p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-[#0B4F3C] to-[#34D399] rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">E</span>
            </div>
            <h1 className="text-2xl font-bold text-[#111827]">
              EatRite Taste Profile
            </h1>
          </div>

          <p className="text-lg text-[#6B7280] mb-6">
            Let's personalize your meal experience in just a few quick questions
          </p>

          {/* Progress Bar */}
          <div className="max-w-md mx-auto mb-4">
            <div className="flex items-center justify-between text-sm text-[#6B7280] mb-2">
              <span>
                Question {currentStep + 1} of {quizQuestions.length}
              </span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-[#F9FAFB] rounded-full h-2 border border-[#E5E7EB]">
              <div
                className="h-2 bg-gradient-to-r from-[#0B4F3C] to-[#34D399] rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Question Card */}
        <PremiumCard className="mb-8">
          <h2 className="text-2xl font-bold text-[#111827] mb-8 text-center">
            {currentQuestion.title}
          </h2>

          <div
            className={`grid gap-4 ${
              currentQuestion.options.length > 6
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                : 'grid-cols-1 sm:grid-cols-2'
            }`}
          >
            {currentQuestion.options.map(option => {
              const isSelected =
                currentQuestion.type === 'multiple'
                  ? (answers[currentQuestion.id] || []).includes(option.id)
                  : answers[currentQuestion.id] === option.id

              const isDisabled = !!(
                currentQuestion.type === 'multiple' &&
                currentQuestion.maxSelections &&
                (answers[currentQuestion.id] || []).length >=
                  currentQuestion.maxSelections &&
                !isSelected
              )

              return (
                <button
                  key={option.id}
                  onClick={() =>
                    handleAnswer(
                      currentQuestion.id,
                      option.id,
                      currentQuestion.type === 'multiple'
                    )
                  }
                  disabled={isDisabled}
                  className={`p-6 rounded-xl border-2 text-left transition-all duration-200 ${
                    isSelected
                      ? 'border-[#0B4F3C] bg-[#0B4F3C]/5 shadow-md'
                      : isDisabled
                        ? 'border-[#E5E7EB] bg-[#F9FAFB] opacity-50 cursor-not-allowed'
                        : 'border-[#E5E7EB] bg-white hover:border-[#0B4F3C] hover:shadow-md cursor-pointer'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className="text-3xl">{option.icon}</div>
                    <div className="flex-1">
                      <h3
                        className={`font-medium mb-1 ${
                          isSelected ? 'text-[#0B4F3C]' : 'text-[#111827]'
                        }`}
                      >
                        {option.label}
                      </h3>
                      {'description' in option && option.description && (
                        <p className="text-sm text-[#6B7280]">
                          {option.description}
                        </p>
                      )}
                    </div>
                    {isSelected && (
                      <div className="w-6 h-6 bg-[#0B4F3C] rounded-full flex items-center justify-center">
                        <span className="text-white text-sm">✓</span>
                      </div>
                    )}
                  </div>
                </button>
              )
            })}
          </div>

          {currentQuestion.maxSelections && (
            <p className="text-sm text-[#6B7280] mt-4 text-center">
              Select up to {currentQuestion.maxSelections} options
              {answers[currentQuestion.id] && (
                <span className="ml-2 text-[#0B4F3C] font-medium">
                  ({(answers[currentQuestion.id] || []).length}/
                  {currentQuestion.maxSelections} selected)
                </span>
              )}
            </p>
          )}
        </PremiumCard>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <PremiumButton
            variant="outline"
            size="lg"
            onClick={prevStep}
            disabled={currentStep === 0}
            className="min-w-32"
          >
            ← Previous
          </PremiumButton>

          <div className="flex items-center space-x-2 text-sm text-[#6B7280]">
            {quizQuestions.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  index === currentStep
                    ? 'bg-[#0B4F3C]'
                    : index < currentStep
                      ? 'bg-[#34D399]'
                      : 'bg-[#E5E7EB]'
                }`}
              />
            ))}
          </div>

          <PremiumButton
            variant="primary"
            size="lg"
            onClick={nextStep}
            disabled={!canProceed()}
            className="min-w-32"
          >
            {currentStep === quizQuestions.length - 1 ? 'Complete →' : 'Next →'}
          </PremiumButton>
        </div>
      </div>
    </div>
  )
}

export default PremiumTasteProfileQuiz
