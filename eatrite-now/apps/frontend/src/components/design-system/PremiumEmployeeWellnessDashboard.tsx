import React, { useState } from 'react'

// Premium Employee Wellness Dashboard
const PremiumEmployeeWellnessDashboard: React.FC = () => {
  const [activeGoal, setActiveGoal] = useState('nutrition')

  // Premium Components
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

  // Employee data
  const employeeData = {
    name: 'Sarah Chen',
    department: 'Product Design',
    wellnessScore: 87,
    streak: 12,
    totalMeals: 89,
    favoriteCategory: 'Mediterranean',
  }

  const wellnessMetrics = {
    energy: { current: 8.4, target: 8.0, trend: '+0.3' },
    sleep: { current: 7.2, target: 8.0, trend: '-0.1' },
    nutrition: { current: 92, target: 85, trend: '+7%' },
    activity: { current: 6, target: 7, trend: '-1 day' },
    hydration: { current: 85, target: 100, trend: '-15%' },
    stress: { current: 3.2, target: 4.0, trend: '+0.8' },
  }

  const weeklyGoals = [
    {
      id: 'nutrition',
      title: 'Balanced Nutrition',
      progress: 85,
      target: 100,
      icon: '🥗',
      description: '6/7 days this week',
    },
    {
      id: 'activity',
      title: 'Physical Activity',
      progress: 72,
      target: 100,
      icon: '🏃‍♀️',
      description: '5/7 workouts completed',
    },
    {
      id: 'hydration',
      title: 'Hydration Goal',
      progress: 60,
      target: 100,
      icon: '💧',
      description: '48/80 glasses this week',
    },
    {
      id: 'sleep',
      title: 'Sleep Quality',
      progress: 90,
      target: 100,
      icon: '😴',
      description: '7.2h average this week',
    },
  ]

  const recentMeals = [
    {
      name: 'Mediterranean Quinoa Bowl',
      date: 'Today',
      rating: 5,
      nutrition: { calories: 420, protein: 18, carbs: 52 },
      category: 'Bowls',
    },
    {
      name: 'Grilled Chicken & Vegetables',
      date: 'Yesterday',
      rating: 4,
      nutrition: { calories: 380, protein: 32, carbs: 28 },
      category: 'Mains',
    },
    {
      name: 'Superfood Smoothie',
      date: 'Tuesday',
      rating: 5,
      nutrition: { calories: 320, protein: 24, carbs: 38 },
      category: 'Drinks',
    },
    {
      name: 'Asian Lettuce Wraps',
      date: 'Monday',
      rating: 4,
      nutrition: { calories: 290, protein: 22, carbs: 18 },
      category: 'Light',
    },
  ]

  const achievements = [
    {
      title: '7-Day Streak Master',
      description: 'Ordered healthy meals for 7 days straight',
      earned: 'Yesterday',
      icon: '🔥',
    },
    {
      title: 'Nutrition Navigator',
      description: 'Hit your macro targets 5 times this month',
      earned: '3 days ago',
      icon: '🎯',
    },
    {
      title: 'Wellness Warrior',
      description: 'Maintained 85+ wellness score for 2 weeks',
      earned: '1 week ago',
      icon: '⚡',
    },
    {
      title: 'Hydration Hero',
      description: 'Met daily water intake for 10 consecutive days',
      earned: '2 weeks ago',
      icon: '💧',
    },
  ]

  const CircularProgress: React.FC<{
    percentage: number
    size?: number
    strokeWidth?: number
    color?: string
    children?: React.ReactNode
  }> = ({
    percentage,
    size = 120,
    strokeWidth = 8,
    color = '#0B4F3C',
    children,
  }) => {
    const radius = (size - strokeWidth) / 2
    const circumference = radius * 2 * Math.PI
    const strokeDasharray = `${(percentage / 100) * circumference} ${circumference}`

    return (
      <div className="relative inline-flex items-center justify-center">
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#F9FAFB"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={strokeDasharray}
            strokeLinecap="round"
            className="transition-all duration-500"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          {children}
        </div>
      </div>
    )
  }

  const ProgressBar: React.FC<{
    label: string
    value: number
    max: number
    color: string
    showValue?: boolean
  }> = ({ label, value, max, color, showValue = true }) => {
    const percentage = Math.min((value / max) * 100, 100)

    return (
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-[#4B5563]">{label}</span>
          {showValue && (
            <span className="text-sm text-[#6B7280]">
              {value}/{max}
            </span>
          )}
        </div>
        <div className="w-full bg-[#F9FAFB] rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-300 ${color}`}
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#111827] mb-2">
              Good morning, {employeeData.name}! 👋
            </h1>
            <p className="text-lg text-[#6B7280]">
              Your wellness score is{' '}
              <span className="font-semibold text-[#0B4F3C]">
                {employeeData.wellnessScore}%
              </span>{' '}
              - keep up the great work!
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <PremiumButton variant="outline" size="sm">
              📊 Weekly Report
            </PremiumButton>
            <PremiumButton variant="primary" size="sm">
              🍽️ Order Meal
            </PremiumButton>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Wellness Score Overview */}
            <PremiumCard>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-[#111827]">
                  Wellness Overview
                </h2>
                <div className="flex items-center space-x-2 text-sm text-[#6B7280]">
                  <span className="w-2 h-2 bg-[#34D399] rounded-full"></span>
                  <span>Above department average</span>
                </div>
              </div>

              <div className="flex items-center justify-center mb-8">
                <CircularProgress
                  percentage={employeeData.wellnessScore}
                  size={160}
                  color="#0B4F3C"
                >
                  <div className="text-center">
                    <div className="text-4xl font-bold text-[#0B4F3C]">
                      {employeeData.wellnessScore}
                    </div>
                    <div className="text-sm text-[#6B7280]">Wellness Score</div>
                  </div>
                </CircularProgress>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {Object.entries(wellnessMetrics).map(([key, metric]) => (
                  <div key={key} className="text-center">
                    <h4 className="text-sm font-medium text-[#6B7280] mb-1 capitalize">
                      {key}
                    </h4>
                    <p className="text-2xl font-bold text-[#111827] mb-1">
                      {typeof metric.current === 'number' &&
                      key !== 'nutrition' &&
                      key !== 'hydration'
                        ? metric.current.toFixed(1)
                        : metric.current}
                      {key === 'nutrition' || key === 'hydration' ? '%' : ''}
                    </p>
                    <p
                      className={`text-xs font-medium ${
                        metric.trend.includes('+')
                          ? 'text-[#34D399]'
                          : 'text-red-500'
                      }`}
                    >
                      {metric.trend} from last week
                    </p>
                  </div>
                ))}
              </div>
            </PremiumCard>

            {/* Weekly Goals */}
            <PremiumCard>
              <h2 className="text-xl font-bold text-[#111827] mb-6">
                This Week's Goals
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {weeklyGoals.map(goal => (
                  <div
                    key={goal.id}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer ${
                      activeGoal === goal.id
                        ? 'border-[#0B4F3C] bg-[#0B4F3C]/5'
                        : 'border-[#F9FAFB] hover:border-[#D1D5DB]'
                    }`}
                    onClick={() => setActiveGoal(goal.id)}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl">{goal.icon}</span>
                        <h3 className="font-medium text-[#111827]">
                          {goal.title}
                        </h3>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-[#0B4F3C]">
                          {goal.progress}%
                        </p>
                      </div>
                    </div>

                    <ProgressBar
                      label=""
                      value={goal.progress}
                      max={100}
                      color="bg-[#0B4F3C]"
                      showValue={false}
                    />

                    <p className="text-sm text-[#6B7280] mt-2">
                      {goal.description}
                    </p>
                  </div>
                ))}
              </div>
            </PremiumCard>

            {/* Recent Meals */}
            <PremiumCard>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-[#111827]">
                  Recent Meals
                </h2>
                <PremiumButton variant="outline" size="sm">
                  View All
                </PremiumButton>
              </div>

              <div className="space-y-4">
                {recentMeals.map((meal, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-[#F9FAFB] rounded-xl"
                  >
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-medium text-[#111827]">
                          {meal.name}
                        </h3>
                        <span className="text-xs bg-[#0B4F3C]/10 text-[#0B4F3C] px-2 py-1 rounded-full">
                          {meal.category}
                        </span>
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <span
                              key={i}
                              className={
                                i < meal.rating
                                  ? 'text-[#D4A857]'
                                  : 'text-[#D1D5DB]'
                              }
                            >
                              ⭐
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-[#6B7280]">
                        <span>{meal.date}</span>
                        <span>•</span>
                        <span>{meal.nutrition.calories} cal</span>
                        <span>•</span>
                        <span>{meal.nutrition.protein}g protein</span>
                        <span>•</span>
                        <span>{meal.nutrition.carbs}g carbs</span>
                      </div>
                    </div>
                    <PremiumButton variant="outline" size="sm">
                      Reorder
                    </PremiumButton>
                  </div>
                ))}
              </div>
            </PremiumCard>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Quick Stats */}
            <PremiumCard>
              <h3 className="text-lg font-bold text-[#111827] mb-4">
                Quick Stats
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#6B7280]">Current Streak</span>
                  <div className="flex items-center space-x-1">
                    <span className="text-lg font-bold text-[#0B4F3C]">
                      {employeeData.streak}
                    </span>
                    <span className="text-sm text-[#6B7280]">days</span>
                    <span>🔥</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#6B7280]">Total Meals</span>
                  <div className="flex items-center space-x-1">
                    <span className="text-lg font-bold text-[#0B4F3C]">
                      {employeeData.totalMeals}
                    </span>
                    <span>🍽️</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#6B7280]">
                    Favorite Category
                  </span>
                  <span className="text-sm font-medium text-[#111827]">
                    {employeeData.favoriteCategory}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#6B7280]">
                    Department Rank
                  </span>
                  <span className="text-sm font-bold text-[#0B4F3C]">
                    #3 of 47
                  </span>
                </div>
              </div>
            </PremiumCard>

            {/* Achievements */}
            <PremiumCard>
              <h3 className="text-lg font-bold text-[#111827] mb-4">
                Recent Achievements
              </h3>
              <div className="space-y-4">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-[#0B4F3C]/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-sm">{achievement.icon}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-[#111827] truncate">
                        {achievement.title}
                      </h4>
                      <p className="text-xs text-[#6B7280] mb-1">
                        {achievement.description}
                      </p>
                      <p className="text-xs text-[#0B4F3C]">
                        {achievement.earned}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <PremiumButton
                variant="outline"
                size="sm"
                className="w-full mt-4"
              >
                View All Achievements
              </PremiumButton>
            </PremiumCard>

            {/* Daily Challenge */}
            <PremiumCard className="bg-gradient-to-br from-[#0B4F3C]/5 to-[#34D399]/5">
              <h3 className="text-lg font-bold text-[#111827] mb-4">
                Today's Challenge
              </h3>
              <div className="text-center">
                <div className="text-4xl mb-3">🥤</div>
                <h4 className="font-medium text-[#111827] mb-2">
                  Hydration Hero
                </h4>
                <p className="text-sm text-[#6B7280] mb-4">
                  Drink 8 glasses of water today
                </p>
                <ProgressBar
                  label="Progress"
                  value={6}
                  max={8}
                  color="bg-[#34D399]"
                />
                <PremiumButton
                  variant="primary"
                  size="sm"
                  className="w-full mt-4"
                >
                  Log Water Intake
                </PremiumButton>
              </div>
            </PremiumCard>

            {/* Upcoming Events */}
            <PremiumCard>
              <h3 className="text-lg font-bold text-[#111827] mb-4">
                Upcoming Events
              </h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#0B4F3C] rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium text-[#111827]">
                      Nutrition Workshop
                    </p>
                    <p className="text-xs text-[#6B7280]">Tomorrow, 2:00 PM</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#34D399] rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium text-[#111827]">
                      Team Walking Challenge
                    </p>
                    <p className="text-xs text-[#6B7280]">Friday, 12:00 PM</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#D4A857] rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium text-[#111827]">
                      Monthly Wellness Checkup
                    </p>
                    <p className="text-xs text-[#6B7280]">
                      Next Monday, 10:00 AM
                    </p>
                  </div>
                </div>
              </div>
            </PremiumCard>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PremiumEmployeeWellnessDashboard
