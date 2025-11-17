import React, { useState } from 'react'

// TypeScript Interfaces
interface User {
  name: string
  wellnessScore: number
  currentStreak: number
  totalMeals: number
  weeklyGoal: string
}

interface MacroData {
  current: number
  target: number
  unit: string
}

interface Meal {
  id: number
  name: string
  description: string
  calories: number
  protein: number
  prepTime: string
  rating: number
  image: string
  tags: string[]
}

interface Goal {
  goal: string
  label: string
  progress: number
}

// Premium Home Dashboard with EatRite Design System
const PremiumHomeDashboard: React.FC = () => {
  const [selectedGoal, setSelectedGoal] = useState<string>('weight_loss')

  // Premium Components from Design System
  const PremiumCard: React.FC<{
    children: React.ReactNode
    className?: string
    hover?: boolean
  }> = ({ children, className = '', hover = false }) => {
    return (
      <div
        className={`
          bg-white rounded-2xl shadow-sm border border-[#F9FAFB] p-6
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
  }> = ({
    children,
    variant = 'primary',
    size = 'md',
    className = '',
    onClick,
  }) => {
    const baseClass =
      'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2'

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
      md: 'px-6 py-3 text-base rounded-xl',
      lg: 'px-8 py-4 text-lg rounded-xl',
    }

    return (
      <button
        className={`${baseClass} ${variants[variant]} ${sizes[size]} ${className}`}
        onClick={onClick}
      >
        {children}
      </button>
    )
  }

  // Mock user data
  const user: User = {
    name: 'Sarah',
    wellnessScore: 87,
    currentStreak: 12,
    totalMeals: 245,
    weeklyGoal: 'Maintain Energy',
  }

  const weeklyMacros: Record<string, MacroData> = {
    protein: { current: 156, target: 175, unit: 'g' },
    carbs: { current: 220, target: 250, unit: 'g' },
    fat: { current: 78, target: 85, unit: 'g' },
    fiber: { current: 32, target: 35, unit: 'g' },
  }

  const recommendedMeals: Meal[] = [
    {
      id: 1,
      name: 'Mediterranean Power Bowl',
      description: 'Quinoa, grilled chicken, fresh vegetables',
      calories: 420,
      protein: 28,
      prepTime: '15 min',
      rating: 4.8,
      image: '🥗',
      tags: ['High Protein', 'Gluten Free'],
    },
    {
      id: 2,
      name: 'Grilled Salmon & Asparagus',
      description: 'Atlantic salmon with roasted vegetables',
      calories: 380,
      protein: 35,
      prepTime: '12 min',
      rating: 4.9,
      image: '🐟',
      tags: ['Omega-3', 'Keto Friendly'],
    },
    {
      id: 3,
      name: 'Plant-Based Buddha Bowl',
      description: 'Tofu, sweet potato, quinoa, tahini',
      calories: 450,
      protein: 24,
      prepTime: '18 min',
      rating: 4.7,
      image: '🥙',
      tags: ['Vegan', 'Fiber Rich'],
    },
  ]

  const MacroBar: React.FC<{
    label: string
    current: number
    target: number
    unit: string
    color: string
  }> = ({ label, current, target, unit, color }) => {
    const percentage = Math.min((current / target) * 100, 100)

    return (
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-[#4B5563] capitalize">
            {label}
          </span>
          <span className="text-sm text-[#6B7280]">
            {current}/{target}
            {unit}
          </span>
        </div>
        <div className="w-full bg-[#F9FAFB] rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-300 ${color}`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      {/* Premium Navigation */}
      <nav className="bg-white border-b border-[#F9FAFB] px-6 py-4 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#0B4F3C] to-[#34D399] rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">E</span>
              </div>
              <h1 className="text-xl font-bold text-[#111827]">EatRite</h1>
            </div>

            <div className="hidden md:flex space-x-6">
              {['Dashboard', 'Meals', 'Plans', 'Progress', 'Corporate'].map(
                item => (
                  <button
                    key={item}
                    className={`text-sm font-medium transition-colors ${
                      item === 'Dashboard'
                        ? 'text-[#0B4F3C]'
                        : 'text-[#6B7280] hover:text-[#4B5563]'
                    }`}
                  >
                    {item}
                  </button>
                )
              )}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-[#F9FAFB] rounded-full flex items-center justify-center">
              <span className="text-[#6B7280]">🔔</span>
            </div>
            <div className="w-10 h-10 bg-gradient-to-br from-[#34D399] to-[#10B981] rounded-full flex items-center justify-center">
              <span className="text-white font-medium text-sm">S</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#111827] mb-2">
            Good morning, {user.name} 👋
          </h1>
          <p className="text-lg text-[#6B7280]">
            You're on a {user.currentStreak}-day wellness streak. Keep it up!
          </p>
        </div>

        {/* Key Metrics Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <PremiumCard className="text-center">
            <div className="w-12 h-12 bg-[#34D399]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-[#0B4F3C] text-xl">🎯</span>
            </div>
            <h3 className="text-3xl font-bold text-[#111827] mb-1">
              {user.wellnessScore}%
            </h3>
            <p className="text-sm text-[#6B7280]">Wellness Score</p>
            <p className="text-xs text-[#34D399] font-medium mt-1">
              +5% this week
            </p>
          </PremiumCard>

          <PremiumCard className="text-center">
            <div className="w-12 h-12 bg-[#D4A857]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-[#D4A857] text-xl">🔥</span>
            </div>
            <h3 className="text-3xl font-bold text-[#111827] mb-1">
              {user.currentStreak}
            </h3>
            <p className="text-sm text-[#6B7280]">Day Streak</p>
            <p className="text-xs text-[#34D399] font-medium mt-1">
              Personal best
            </p>
          </PremiumCard>

          <PremiumCard className="text-center">
            <div className="w-12 h-12 bg-[#0B4F3C]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-[#0B4F3C] text-xl">🍽️</span>
            </div>
            <h3 className="text-3xl font-bold text-[#111827] mb-1">
              {user.totalMeals}
            </h3>
            <p className="text-sm text-[#6B7280]">Meals Delivered</p>
            <p className="text-xs text-[#34D399] font-medium mt-1">
              This month: 18
            </p>
          </PremiumCard>

          <PremiumCard className="text-center">
            <div className="w-12 h-12 bg-[#10B981]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-[#10B981] text-xl">⚡</span>
            </div>
            <h3 className="text-lg font-bold text-[#111827] mb-1">
              {user.weeklyGoal}
            </h3>
            <p className="text-sm text-[#6B7280]">Current Goal</p>
            <p className="text-xs text-[#34D399] font-medium mt-1">On track</p>
          </PremiumCard>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Recommended Meals */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-[#111827]">
                  Recommended for You
                </h2>
                <PremiumButton variant="outline" size="sm">
                  View All
                </PremiumButton>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {recommendedMeals.map(meal => (
                  <PremiumCard
                    key={meal.id}
                    hover={true}
                    className="overflow-hidden p-0"
                  >
                    <div className="h-48 bg-gradient-to-br from-[#F9FAFB] via-[#34D399]/5 to-[#0B4F3C]/5 flex items-center justify-center text-6xl">
                      {meal.image}
                    </div>
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="text-lg font-semibold text-[#111827] leading-tight">
                          {meal.name}
                        </h4>
                        <div className="flex items-center text-xs text-[#D4A857]">
                          <span>⭐</span>
                          <span className="ml-1">{meal.rating}</span>
                        </div>
                      </div>

                      <p className="text-sm text-[#6B7280] mb-4 line-clamp-2">
                        {meal.description}
                      </p>

                      <div className="flex items-center justify-between text-sm text-[#4B5563] mb-4">
                        <span className="flex items-center">
                          <span className="text-[#0B4F3C]">🔥</span>
                          <span className="ml-1">{meal.calories} cal</span>
                        </span>
                        <span className="flex items-center">
                          <span className="text-[#34D399]">💪</span>
                          <span className="ml-1">{meal.protein}g protein</span>
                        </span>
                        <span className="flex items-center">
                          <span className="text-[#D4A857]">⏱️</span>
                          <span className="ml-1">{meal.prepTime}</span>
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {meal.tags.map(tag => (
                          <span
                            key={tag}
                            className="text-xs bg-[#34D399]/10 text-[#0B4F3C] px-2 py-1 rounded-full font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <PremiumButton
                        variant="primary"
                        size="sm"
                        className="w-full"
                      >
                        Add to Plan
                      </PremiumButton>
                    </div>
                  </PremiumCard>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <PremiumCard>
              <h3 className="text-lg font-semibold text-[#111827] mb-6">
                Quick Actions
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  {
                    icon: '📊',
                    label: 'View Progress',
                    color: 'bg-[#0B4F3C]/10 text-[#0B4F3C]',
                  },
                  {
                    icon: '🎯',
                    label: 'Update Goals',
                    color: 'bg-[#34D399]/10 text-[#34D399]',
                  },
                  {
                    icon: '📅',
                    label: 'Plan Meals',
                    color: 'bg-[#D4A857]/10 text-[#D4A857]',
                  },
                  {
                    icon: '💬',
                    label: 'Get Support',
                    color: 'bg-[#10B981]/10 text-[#10B981]',
                  },
                ].map((action, index) => (
                  <button
                    key={index}
                    className="flex flex-col items-center p-4 rounded-xl border border-[#F9FAFB] hover:border-[#D1D5DB] hover:shadow-sm transition-all duration-200"
                  >
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 ${action.color}`}
                    >
                      <span className="text-xl">{action.icon}</span>
                    </div>
                    <span className="text-sm font-medium text-[#4B5563]">
                      {action.label}
                    </span>
                  </button>
                ))}
              </div>
            </PremiumCard>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Weekly Macros */}
            <PremiumCard>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-[#111827]">
                  Weekly Macros
                </h3>
                <span className="text-sm text-[#6B7280]">5 days left</span>
              </div>

              <div className="space-y-6">
                <MacroBar
                  label="protein"
                  current={weeklyMacros.protein.current}
                  target={weeklyMacros.protein.target}
                  unit={weeklyMacros.protein.unit}
                  color="bg-[#0B4F3C]"
                />
                <MacroBar
                  label="carbs"
                  current={weeklyMacros.carbs.current}
                  target={weeklyMacros.carbs.target}
                  unit={weeklyMacros.carbs.unit}
                  color="bg-[#34D399]"
                />
                <MacroBar
                  label="fats"
                  current={weeklyMacros.fat.current}
                  target={weeklyMacros.fat.target}
                  unit={weeklyMacros.fat.unit}
                  color="bg-[#D4A857]"
                />
                <MacroBar
                  label="fiber"
                  current={weeklyMacros.fiber.current}
                  target={weeklyMacros.fiber.target}
                  unit={weeklyMacros.fiber.unit}
                  color="bg-[#10B981]"
                />
              </div>
            </PremiumCard>

            {/* This Week's Goal */}
            <PremiumCard>
              <h3 className="text-lg font-semibold text-[#111827] mb-4">
                This Week's Focus
              </h3>

              <div className="space-y-4">
                {(
                  [
                    {
                      goal: 'weight_loss',
                      label: 'Weight Management',
                      progress: 78,
                    },
                    { goal: 'energy', label: 'Sustained Energy', progress: 92 },
                    {
                      goal: 'muscle_gain',
                      label: 'Muscle Building',
                      progress: 65,
                    },
                  ] as Goal[]
                ).map(goal => (
                  <button
                    key={goal.goal}
                    onClick={() => setSelectedGoal(goal.goal)}
                    className={`w-full p-4 rounded-xl border text-left transition-all duration-200 ${
                      selectedGoal === goal.goal
                        ? 'border-[#0B4F3C] bg-[#0B4F3C]/5'
                        : 'border-[#F9FAFB] hover:border-[#D1D5DB]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-[#111827]">
                        {goal.label}
                      </span>
                      <span className="text-sm text-[#6B7280]">
                        {goal.progress}%
                      </span>
                    </div>
                    <div className="w-full bg-[#F9FAFB] rounded-full h-2">
                      <div
                        className="h-2 rounded-full bg-[#34D399] transition-all duration-300"
                        style={{ width: `${goal.progress}%` }}
                      />
                    </div>
                  </button>
                ))}
              </div>
            </PremiumCard>

            {/* Upcoming Deliveries */}
            <PremiumCard>
              <h3 className="text-lg font-semibold text-[#111827] mb-4">
                Next Delivery
              </h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-[#F9FAFB] rounded-xl">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-[#34D399]/20 rounded-lg flex items-center justify-center">
                      <span className="text-[#0B4F3C]">📦</span>
                    </div>
                    <div>
                      <p className="font-medium text-[#111827]">
                        Tomorrow, 2:00 PM
                      </p>
                      <p className="text-sm text-[#6B7280]">
                        5 meals • Week of Nov 18
                      </p>
                    </div>
                  </div>
                  <PremiumButton variant="outline" size="sm">
                    Track
                  </PremiumButton>
                </div>

                <div className="text-center">
                  <PremiumButton
                    variant="secondary"
                    size="sm"
                    className="w-full"
                  >
                    Modify Order
                  </PremiumButton>
                </div>
              </div>
            </PremiumCard>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PremiumHomeDashboard
