import React, { useState } from 'react'
import {
  ChevronRight,
  ChevronLeft,
  Brain,
  Heart,
  Utensils,
  Target,
  Check,
  Star,
  Clock,
  Award,
  Sparkles,
  ArrowRight,
} from 'lucide-react'

interface QuizQuestion {
  id: string
  type: 'single' | 'multiple' | 'scale' | 'image' | 'preference'
  category: 'dietary' | 'taste' | 'lifestyle' | 'health' | 'preferences'
  question: string
  description?: string
  options: Array<{
    id: string
    label: string
    value: any
    image?: string
    description?: string
  }>
  required?: boolean
  weight?: number
}

interface QuizResponse {
  questionId: string
  answer: any
  confidence?: number
}

interface TasteProfile {
  id: string
  name: string
  description: string
  characteristics: string[]
  recommendedCuisines: string[]
  avoidedIngredients: string[]
  nutritionFocus: string[]
  matchScore: number
}

interface TasteProfileAIQuizProps {
  onComplete?: (profile: TasteProfile, responses: QuizResponse[]) => void
  onSkip?: () => void
}

const TasteProfileAIQuiz: React.FC<TasteProfileAIQuizProps> = ({
  onComplete,
  onSkip,
}) => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [responses, setResponses] = useState<QuizResponse[]>([])
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, any>>(
    {}
  )
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<TasteProfile | null>(null)
  const [showResults, setShowResults] = useState(false)

  const questions: QuizQuestion[] = [
    {
      id: 'q1',
      type: 'single',
      category: 'dietary',
      question: 'What best describes your dietary preferences?',
      description: 'This helps us understand your primary dietary framework',
      options: [
        {
          id: 'omnivore',
          label: 'Omnivore',
          value: 'omnivore',
          description: 'I eat everything',
        },
        {
          id: 'vegetarian',
          label: 'Vegetarian',
          value: 'vegetarian',
          description: 'No meat, but dairy & eggs OK',
        },
        {
          id: 'vegan',
          label: 'Vegan',
          value: 'vegan',
          description: 'Plant-based only',
        },
        {
          id: 'pescatarian',
          label: 'Pescatarian',
          value: 'pescatarian',
          description: 'Fish OK, no other meat',
        },
        {
          id: 'keto',
          label: 'Keto',
          value: 'keto',
          description: 'Low carb, high fat',
        },
        {
          id: 'paleo',
          label: 'Paleo',
          value: 'paleo',
          description: 'Whole foods, no processed',
        },
      ],
      required: true,
      weight: 10,
    },
    {
      id: 'q2',
      type: 'multiple',
      category: 'taste',
      question: 'Which flavors do you gravitate towards?',
      description: 'Select all that appeal to you',
      options: [
        { id: 'spicy', label: 'Spicy & Hot', value: 'spicy' },
        { id: 'sweet', label: 'Sweet & Fruity', value: 'sweet' },
        { id: 'savory', label: 'Savory & Umami', value: 'savory' },
        { id: 'tangy', label: 'Tangy & Citrusy', value: 'tangy' },
        { id: 'smoky', label: 'Smoky & Grilled', value: 'smoky' },
        { id: 'fresh', label: 'Fresh & Herby', value: 'fresh' },
        { id: 'rich', label: 'Rich & Creamy', value: 'rich' },
        { id: 'mild', label: 'Mild & Gentle', value: 'mild' },
      ],
      weight: 8,
    },
    {
      id: 'q3',
      type: 'image',
      category: 'preferences',
      question: 'Which meal style appeals to you most?',
      description:
        'Visual preferences help us understand your ideal meal structure',
      options: [
        {
          id: 'bowl',
          label: 'Buddha Bowls',
          value: 'bowl',
          image: '/api/placeholder/200/150',
          description: 'Colorful, balanced bowls',
        },
        {
          id: 'plated',
          label: 'Plated Meals',
          value: 'plated',
          image: '/api/placeholder/200/150',
          description: 'Traditional restaurant style',
        },
        {
          id: 'sandwich',
          label: 'Wraps & Sandwiches',
          value: 'sandwich',
          image: '/api/placeholder/200/150',
          description: 'Handheld convenience',
        },
        {
          id: 'salad',
          label: 'Fresh Salads',
          value: 'salad',
          image: '/api/placeholder/200/150',
          description: 'Light and refreshing',
        },
      ],
      weight: 6,
    },
    {
      id: 'q4',
      type: 'scale',
      category: 'lifestyle',
      question: 'How adventurous are you with trying new foods?',
      description: 'Rate from 1 (very conservative) to 5 (love experimenting)',
      options: [
        { id: '1', label: 'Very Conservative', value: 1 },
        { id: '2', label: 'Somewhat Conservative', value: 2 },
        { id: '3', label: 'Moderately Adventurous', value: 3 },
        { id: '4', label: 'Very Adventurous', value: 4 },
        { id: '5', label: 'Extremely Adventurous', value: 5 },
      ],
      weight: 5,
    },
    {
      id: 'q5',
      type: 'multiple',
      category: 'health',
      question: 'What are your primary health goals?',
      description: 'Select all that apply to you',
      options: [
        { id: 'weight_loss', label: 'Weight Loss', value: 'weight_loss' },
        { id: 'muscle_gain', label: 'Muscle Building', value: 'muscle_gain' },
        { id: 'energy', label: 'More Energy', value: 'energy' },
        { id: 'digestion', label: 'Better Digestion', value: 'digestion' },
        { id: 'heart_health', label: 'Heart Health', value: 'heart_health' },
        {
          id: 'general_wellness',
          label: 'General Wellness',
          value: 'general_wellness',
        },
        {
          id: 'stress_reduction',
          label: 'Stress Reduction',
          value: 'stress_reduction',
        },
        { id: 'none', label: 'No Specific Goals', value: 'none' },
      ],
      weight: 7,
    },
    {
      id: 'q6',
      type: 'multiple',
      category: 'preferences',
      question: 'Which cuisines do you enjoy most?',
      description: 'Help us understand your cultural taste preferences',
      options: [
        { id: 'italian', label: 'Italian', value: 'italian' },
        {
          id: 'asian',
          label: 'Asian (Chinese, Thai, Japanese)',
          value: 'asian',
        },
        { id: 'mediterranean', label: 'Mediterranean', value: 'mediterranean' },
        { id: 'mexican', label: 'Mexican', value: 'mexican' },
        { id: 'indian', label: 'Indian', value: 'indian' },
        { id: 'american', label: 'American', value: 'american' },
        {
          id: 'middle_eastern',
          label: 'Middle Eastern',
          value: 'middle_eastern',
        },
        { id: 'french', label: 'French', value: 'french' },
      ],
      weight: 6,
    },
    {
      id: 'q7',
      type: 'single',
      category: 'lifestyle',
      question: 'How much time do you typically have for meals?',
      description: 'This helps us recommend appropriately portioned meals',
      options: [
        { id: 'quick', label: 'Quick bite (5-10 min)', value: 'quick' },
        { id: 'normal', label: 'Normal meal (15-20 min)', value: 'normal' },
        {
          id: 'leisurely',
          label: 'Leisurely dining (30+ min)',
          value: 'leisurely',
        },
      ],
      weight: 4,
    },
  ]

  const tasteProfiles: TasteProfile[] = [
    {
      id: 'adventurous_gourmet',
      name: 'The Adventurous Gourmet',
      description:
        'You love exploring new flavors and sophisticated combinations. Complex, restaurant-quality meals are your preference.',
      characteristics: [
        'Enjoys complex flavor profiles',
        'Loves trying new cuisines',
        'Appreciates high-quality ingredients',
        'Prefers expertly balanced meals',
      ],
      recommendedCuisines: [
        'Mediterranean',
        'Asian Fusion',
        'French',
        'Middle Eastern',
      ],
      avoidedIngredients: ['Processed foods', 'Artificial flavors'],
      nutritionFocus: ['High protein', 'Fresh vegetables', 'Healthy fats'],
      matchScore: 0,
    },
    {
      id: 'health_conscious_explorer',
      name: 'The Health-Conscious Explorer',
      description:
        'You prioritize nutrition while still enjoying diverse, flavorful meals. Balance is key to your approach.',
      characteristics: [
        'Nutrition-focused decisions',
        'Enjoys variety in healthy foods',
        'Values fresh ingredients',
        'Balances taste and wellness',
      ],
      recommendedCuisines: ['Mediterranean', 'Asian', 'Plant-based'],
      avoidedIngredients: ['Excessive sugar', 'Heavy cream', 'Fried foods'],
      nutritionFocus: ['Lean proteins', 'Whole grains', 'Antioxidants'],
      matchScore: 0,
    },
    {
      id: 'comfort_food_lover',
      name: 'The Comfort Food Enthusiast',
      description:
        'You appreciate hearty, familiar flavors that provide satisfaction and comfort. Classic dishes are your go-to.',
      characteristics: [
        'Prefers familiar flavors',
        'Enjoys hearty portions',
        'Values comfort and satisfaction',
        'Likes classic preparations',
      ],
      recommendedCuisines: ['American', 'Italian', 'Mexican'],
      avoidedIngredients: ['Unusual spices', 'Exotic ingredients'],
      nutritionFocus: [
        'Satisfying portions',
        'Balanced macros',
        'Familiar proteins',
      ],
      matchScore: 0,
    },
    {
      id: 'fresh_minimalist',
      name: 'The Fresh Minimalist',
      description:
        'You prefer clean, simple flavors that highlight the natural taste of quality ingredients.',
      characteristics: [
        'Enjoys simple preparations',
        'Values ingredient quality',
        'Prefers fresh flavors',
        'Likes clean eating',
      ],
      recommendedCuisines: ['Mediterranean', 'Nordic', 'Japanese'],
      avoidedIngredients: ['Heavy sauces', 'Excessive seasoning'],
      nutritionFocus: [
        'Fresh vegetables',
        'Clean proteins',
        'Minimal processing',
      ],
      matchScore: 0,
    },
  ]

  const handleAnswer = (questionId: string, answer: any) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answer,
    }))

    const existingResponseIndex = responses.findIndex(
      r => r.questionId === questionId
    )
    const newResponse: QuizResponse = {
      questionId,
      answer,
      confidence: 1.0,
    }

    if (existingResponseIndex >= 0) {
      setResponses(prev =>
        prev.map((r, i) => (i === existingResponseIndex ? newResponse : r))
      )
    } else {
      setResponses(prev => [...prev, newResponse])
    }
  }

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
    } else {
      analyzeProfile()
    }
  }

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1)
    }
  }

  const analyzeProfile = async () => {
    setIsAnalyzing(true)

    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 3000))

    // Simple scoring algorithm
    const profileScores = tasteProfiles.map(profile => {
      let score = 0

      responses.forEach(response => {
        const question = questions.find(q => q.id === response.questionId)
        const weight = question?.weight || 1

        // Scoring logic based on responses
        if (response.questionId === 'q1') {
          // Dietary preferences
          if (response.answer === 'vegan' || response.answer === 'vegetarian') {
            if (
              profile.id === 'health_conscious_explorer' ||
              profile.id === 'fresh_minimalist'
            ) {
              score += weight * 2
            }
          }
        }

        if (response.questionId === 'q4') {
          // Adventurousness
          if (response.answer >= 4) {
            if (profile.id === 'adventurous_gourmet') score += weight * 2
          } else if (response.answer <= 2) {
            if (profile.id === 'comfort_food_lover') score += weight * 2
          }
        }

        // Add more scoring logic here...
      })

      return {
        ...profile,
        matchScore: Math.min(100, Math.max(0, score)),
      }
    })

    // Sort by highest score
    profileScores.sort((a, b) => b.matchScore - a.matchScore)
    const bestMatch = profileScores[0]

    setResult(bestMatch)
    setIsAnalyzing(false)
    setShowResults(true)
  }

  const currentQ = questions[currentQuestion]
  const canProceed = selectedAnswers[currentQ?.id] !== undefined
  const progress = ((currentQuestion + 1) / questions.length) * 100

  if (isAnalyzing) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-white rounded-xl p-8 shadow-lg border border-[#D4B46A]/20 text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-[#0F2B1E] to-[#D4B46A] rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
            <Brain className="w-8 h-8 text-white" />
          </div>
          <h2
            className="text-2xl font-bold text-[#0F2B1E] mb-4"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            AI is Analyzing Your Taste Profile...
          </h2>
          <p className="text-gray-600 mb-6">
            Our artificial intelligence is processing your responses to create a
            personalized taste profile
          </p>
          <div className="flex justify-center space-x-2">
            <div
              className="w-2 h-2 bg-[#D4B46A] rounded-full animate-bounce"
              style={{ animationDelay: '0ms' }}
            />
            <div
              className="w-2 h-2 bg-[#D4B46A] rounded-full animate-bounce"
              style={{ animationDelay: '150ms' }}
            />
            <div
              className="w-2 h-2 bg-[#D4B46A] rounded-full animate-bounce"
              style={{ animationDelay: '300ms' }}
            />
          </div>
        </div>
      </div>
    )
  }

  if (showResults && result) {
    return (
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {/* Results Header */}
        <div className="bg-gradient-to-r from-[#0F2B1E] to-[#0A2418] rounded-xl p-8 text-white text-center">
          <div className="w-20 h-20 bg-[#D4B46A] rounded-full flex items-center justify-center mx-auto mb-6">
            <Sparkles className="w-10 h-10 text-[#0F2B1E]" />
          </div>
          <h1
            className="text-3xl font-bold mb-4"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Your Taste Profile is Ready!
          </h1>
          <p className="text-[#F5F2E8]/80 text-lg">
            Based on your responses, we've identified your unique culinary
            personality
          </p>
        </div>

        {/* Profile Results */}
        <div className="bg-white rounded-xl p-8 shadow-lg border border-[#D4B46A]/20">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Award className="w-8 h-8 text-[#D4B46A]" />
              <h2 className="text-2xl font-bold text-[#0F2B1E]">
                {result.name}
              </h2>
            </div>
            <div className="text-4xl font-bold text-[#D4B46A] mb-2">
              {result.matchScore}% Match
            </div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {result.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Characteristics */}
            <div className="bg-[#F5EEDC] rounded-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <Heart className="w-5 h-5 text-[#D4B46A]" />
                <h3 className="font-bold text-[#0F2B1E]">
                  Your Characteristics
                </h3>
              </div>
              <ul className="space-y-2">
                {result.characteristics.map((char, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-sm text-gray-700"
                  >
                    <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    {char}
                  </li>
                ))}
              </ul>
            </div>

            {/* Recommended Cuisines */}
            <div className="bg-[#F5EEDC] rounded-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <Utensils className="w-5 h-5 text-[#D4B46A]" />
                <h3 className="font-bold text-[#0F2B1E]">Perfect Cuisines</h3>
              </div>
              <div className="space-y-2">
                {result.recommendedCuisines.map((cuisine, index) => (
                  <div
                    key={index}
                    className="bg-[#D4B46A]/20 text-[#0F2B1E] text-sm px-3 py-1 rounded-full"
                  >
                    {cuisine}
                  </div>
                ))}
              </div>
            </div>

            {/* Nutrition Focus */}
            <div className="bg-[#F5EEDC] rounded-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <Target className="w-5 h-5 text-[#D4B46A]" />
                <h3 className="font-bold text-[#0F2B1E]">Nutrition Focus</h3>
              </div>
              <ul className="space-y-2">
                {result.nutritionFocus.map((focus, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-2 text-sm text-gray-700"
                  >
                    <Star className="w-3 h-3 text-[#D4B46A]" />
                    {focus}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => onComplete?.(result, responses)}
            className="bg-gradient-to-r from-[#0F2B1E] to-[#0A2418] hover:from-[#0A2418] hover:to-[#0F2B1E] text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
          >
            <ArrowRight className="w-5 h-5" />
            Start Personalized Meal Journey
          </button>
          <button
            onClick={() => setShowResults(false)}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-4 px-8 rounded-lg transition-colors"
          >
            Retake Quiz
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      {/* Quiz Header */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-[#D4B46A]/20 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Brain className="w-6 h-6 text-[#D4B46A]" />
            <h1 className="text-xl font-bold text-[#0F2B1E]">
              Taste Profile AI Quiz
            </h1>
          </div>
          <button
            onClick={onSkip}
            className="text-gray-500 hover:text-gray-700 text-sm"
          >
            Skip Quiz
          </button>
        </div>

        {/* Progress Bar */}
        <div className="mb-2">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-[#D4B46A] to-[#B8935A] h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-xl p-8 shadow-lg border border-[#D4B46A]/20">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-[#0F2B1E] mb-2">
            {currentQ.question}
          </h2>
          {currentQ.description && (
            <p className="text-gray-600">{currentQ.description}</p>
          )}
        </div>

        {/* Question Options */}
        <div className="space-y-3 mb-8">
          {currentQ.type === 'single' && (
            <div className="space-y-3">
              {currentQ.options.map(option => (
                <label
                  key={option.id}
                  className={`block p-4 border rounded-lg cursor-pointer transition-all ${
                    selectedAnswers[currentQ.id] === option.value
                      ? 'border-[#D4B46A] bg-[#F5EEDC]'
                      : 'border-gray-200 hover:border-[#D4B46A]/50 hover:bg-gray-50'
                  }`}
                >
                  <input
                    type="radio"
                    name={currentQ.id}
                    value={option.value}
                    checked={selectedAnswers[currentQ.id] === option.value}
                    onChange={() => handleAnswer(currentQ.id, option.value)}
                    className="sr-only"
                  />
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-4 h-4 border-2 rounded-full ${
                        selectedAnswers[currentQ.id] === option.value
                          ? 'border-[#D4B46A] bg-[#D4B46A]'
                          : 'border-gray-300'
                      }`}
                    >
                      {selectedAnswers[currentQ.id] === option.value && (
                        <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-[#0F2B1E]">
                        {option.label}
                      </div>
                      {option.description && (
                        <div className="text-sm text-gray-600">
                          {option.description}
                        </div>
                      )}
                    </div>
                  </div>
                </label>
              ))}
            </div>
          )}

          {currentQ.type === 'multiple' && (
            <div className="grid grid-cols-2 gap-3">
              {currentQ.options.map(option => (
                <label
                  key={option.id}
                  className={`block p-4 border rounded-lg cursor-pointer transition-all ${
                    selectedAnswers[currentQ.id]?.includes(option.value)
                      ? 'border-[#D4B46A] bg-[#F5EEDC]'
                      : 'border-gray-200 hover:border-[#D4B46A]/50 hover:bg-gray-50'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={
                      selectedAnswers[currentQ.id]?.includes(option.value) ||
                      false
                    }
                    onChange={e => {
                      const current = selectedAnswers[currentQ.id] || []
                      if (e.target.checked) {
                        handleAnswer(currentQ.id, [...current, option.value])
                      } else {
                        handleAnswer(
                          currentQ.id,
                          current.filter((v: any) => v !== option.value)
                        )
                      }
                    }}
                    className="sr-only"
                  />
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-4 h-4 border-2 rounded ${
                        selectedAnswers[currentQ.id]?.includes(option.value)
                          ? 'border-[#D4B46A] bg-[#D4B46A]'
                          : 'border-gray-300'
                      }`}
                    >
                      {selectedAnswers[currentQ.id]?.includes(option.value) && (
                        <Check className="w-3 h-3 text-white" />
                      )}
                    </div>
                    <span className="font-medium text-[#0F2B1E]">
                      {option.label}
                    </span>
                  </div>
                </label>
              ))}
            </div>
          )}

          {currentQ.type === 'image' && (
            <div className="grid grid-cols-2 gap-4">
              {currentQ.options.map(option => (
                <div
                  key={option.id}
                  className={`border-2 rounded-lg overflow-hidden cursor-pointer transition-all ${
                    selectedAnswers[currentQ.id] === option.value
                      ? 'border-[#D4B46A] ring-2 ring-[#D4B46A]/30'
                      : 'border-gray-200 hover:border-[#D4B46A]/50'
                  }`}
                  onClick={() => handleAnswer(currentQ.id, option.value)}
                >
                  <img
                    src={option.image}
                    alt={option.label}
                    className="w-full h-32 object-cover"
                  />
                  <div className="p-3">
                    <h4 className="font-medium text-[#0F2B1E]">
                      {option.label}
                    </h4>
                    {option.description && (
                      <p className="text-sm text-gray-600">
                        {option.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {currentQ.type === 'scale' && (
            <div className="space-y-2">
              {currentQ.options.map(option => (
                <label
                  key={option.id}
                  className={`block p-3 border rounded-lg cursor-pointer transition-all ${
                    selectedAnswers[currentQ.id] === option.value
                      ? 'border-[#D4B46A] bg-[#F5EEDC]'
                      : 'border-gray-200 hover:border-[#D4B46A]/50'
                  }`}
                  onClick={() => handleAnswer(currentQ.id, option.value)}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < option.value
                              ? 'text-[#D4B46A] fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="font-medium text-[#0F2B1E]">
                      {option.label}
                    </span>
                  </div>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={prevQuestion}
            disabled={currentQuestion === 0}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-[#0F2B1E] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </button>

          <button
            onClick={nextQuestion}
            disabled={!canProceed}
            className="flex items-center gap-2 bg-[#D4B46A] hover:bg-[#B8935A] text-[#0F2B1E] font-bold px-6 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {currentQuestion === questions.length - 1
              ? 'Analyze Profile'
              : 'Next'}
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Time Estimate */}
      <div className="text-center mt-4 text-gray-500 text-sm">
        <div className="flex items-center justify-center gap-2">
          <Clock className="w-4 h-4" />
          <span>
            About {Math.max(1, questions.length - currentQuestion)} minute
            {questions.length - currentQuestion !== 1 ? 's' : ''} remaining
          </span>
        </div>
      </div>
    </div>
  )
}

export default TasteProfileAIQuiz
