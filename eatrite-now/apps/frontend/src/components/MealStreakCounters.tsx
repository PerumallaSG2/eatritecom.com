import React, { useState, useEffect } from 'react'
import {
  Target,
  Clock,
  Flame,
  Trophy,
  Star,
  TrendingUp,
  Calendar,
  Zap,
  CheckCircle,
  Award,
} from 'lucide-react'
import { FadeIn, StaggeredAnimation } from './AnimationComponents'

// Crown icon component
const Crown: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M5 16L3 6l5.5 4L12 4l3.5 6L21 6l-2 10H5zm2.7-2h8.6l.9-4.4-2.5 2-2.7-4-2.7 4-2.5-2L7.7 14z" />
  </svg>
)

interface StreakData {
  currentStreak: number
  longestStreak: number
  totalDays: number
  streakType: 'daily' | 'weekly' | 'monthly'
  lastMealDate: Date
  nextMealDue: Date
  streakHistory: {
    date: Date
    completed: boolean
    mealCount: number
  }[]
}

interface StreakMilestone {
  days: number
  title: string
  reward: string
  icon: React.ComponentType<any>
  color: string
  isAchieved: boolean
}

const streakMilestones: StreakMilestone[] = [
  {
    days: 3,
    title: 'Getting Started',
    reward: '$5 credit',
    icon: Star,
    color: 'blue',
    isAchieved: true,
  },
  {
    days: 7,
    title: 'Week Warrior',
    reward: '10% off next order',
    icon: Award,
    color: 'green',
    isAchieved: true,
  },
  {
    days: 14,
    title: 'Two Week Champion',
    reward: 'Free dessert',
    icon: Trophy,
    color: 'purple',
    isAchieved: true,
  },
  {
    days: 30,
    title: 'Monthly Master',
    reward: '$25 credit + VIP status',
    icon: Crown,
    color: 'yellow',
    isAchieved: true,
  },
  {
    days: 60,
    title: 'Habit Hero',
    reward: 'Personal nutrition consultation',
    icon: Zap,
    color: 'orange',
    isAchieved: false,
  },
  {
    days: 90,
    title: 'Transformation Legend',
    reward: '$100 credit + Chef session',
    icon: Flame,
    color: 'red',
    isAchieved: false,
  },
]

export const MealStreakCounters: React.FC = () => {
  const [streakData] = useState<StreakData>({
    currentStreak: 42,
    longestStreak: 67,
    totalDays: 156,
    streakType: 'daily',
    lastMealDate: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
    nextMealDue: new Date(Date.now() + 4 * 60 * 60 * 1000), // in 4 hours
    streakHistory: generateStreakHistory(),
  })

  const [animatedStreak, setAnimatedStreak] = useState(0)
  const [timeUntilNext, setTimeUntilNext] = useState('')
  const [streakStatus, setStreakStatus] = useState<
    'active' | 'at-risk' | 'broken'
  >('active')

  useEffect(() => {
    // Animate streak counter
    let current = 0
    const target = streakData.currentStreak
    const increment = target / 60

    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        current = target
        clearInterval(timer)
      }
      setAnimatedStreak(Math.floor(current))
    }, 50)

    return () => clearInterval(timer)
  }, [streakData.currentStreak])

  useEffect(() => {
    // Update countdown timer
    const updateTimer = () => {
      const now = new Date()
      const timeDiff = streakData.nextMealDue.getTime() - now.getTime()

      if (timeDiff <= 0) {
        setStreakStatus('at-risk')
        setTimeUntilNext('Overdue!')
      } else if (timeDiff <= 2 * 60 * 60 * 1000) {
        // 2 hours
        setStreakStatus('at-risk')
        const hours = Math.floor(timeDiff / (1000 * 60 * 60))
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60))
        setTimeUntilNext(`${hours}h ${minutes}m`)
      } else {
        setStreakStatus('active')
        const hours = Math.floor(timeDiff / (1000 * 60 * 60))
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60))
        setTimeUntilNext(`${hours}h ${minutes}m`)
      }
    }

    updateTimer()
    const interval = setInterval(updateTimer, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [streakData.nextMealDue])

  const getNextMilestone = () => {
    return streakMilestones.find(
      m => !m.isAchieved && m.days > streakData.currentStreak
    )
  }

  const getStreakColor = () => {
    switch (streakStatus) {
      case 'active':
        return 'text-green-600 bg-green-100'
      case 'at-risk':
        return 'text-yellow-600 bg-yellow-100'
      case 'broken':
        return 'text-red-600 bg-red-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  const getFlameColor = () => {
    if (streakData.currentStreak >= 90) return 'text-red-500'
    if (streakData.currentStreak >= 60) return 'text-orange-500'
    if (streakData.currentStreak >= 30) return 'text-yellow-500'
    if (streakData.currentStreak >= 14) return 'text-blue-500'
    if (streakData.currentStreak >= 7) return 'text-green-500'
    return 'text-gray-400'
  }

  const nextMilestone = getNextMilestone()
  const progressToNext = nextMilestone
    ? (streakData.currentStreak / nextMilestone.days) * 100
    : 100

  return (
    <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl overflow-hidden shadow-2xl">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white p-8">
        <FadeIn>
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Flame className={`w-8 h-8 ${getFlameColor()}`} />
              <h2 className="text-3xl font-bold">Meal Streak Counter</h2>
              <Flame className={`w-8 h-8 ${getFlameColor()}`} />
            </div>
            <p className="text-orange-100 text-lg">
              Keep your healthy eating momentum going strong!
            </p>
          </div>
        </FadeIn>
      </div>

      <div className="p-8">
        {/* Main Streak Display */}
        <FadeIn delay={0.1}>
          <div className="bg-white rounded-2xl p-8 mb-8 shadow-xl text-center">
            <div className="flex items-center justify-center space-x-6 mb-6">
              <Flame className={`w-16 h-16 ${getFlameColor()}`} />
              <div>
                <div className={`text-6xl font-bold ${getFlameColor()}`}>
                  {animatedStreak}
                </div>
                <div className="text-lg text-gray-600 font-semibold">
                  Day Streak
                </div>
              </div>
              <Flame className={`w-16 h-16 ${getFlameColor()}`} />
            </div>

            <div
              className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full ${getStreakColor()}`}
            >
              <CheckCircle className="w-5 h-5" />
              <span className="font-semibold">
                {streakStatus === 'active'
                  ? 'Streak Active!'
                  : streakStatus === 'at-risk'
                    ? 'Streak at Risk!'
                    : 'Streak Broken'}
              </span>
            </div>
          </div>
        </FadeIn>

        {/* Stats Grid */}
        <FadeIn delay={0.2}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 text-center shadow-lg">
              <Trophy className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">
                {streakData.longestStreak}
              </div>
              <div className="text-sm text-gray-600">Longest Streak</div>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-lg">
              <Calendar className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">
                {streakData.totalDays}
              </div>
              <div className="text-sm text-gray-600">Total Days</div>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-lg">
              <Clock className="w-8 h-8 text-green-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">
                {timeUntilNext}
              </div>
              <div className="text-sm text-gray-600">Next Meal Due</div>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-lg">
              <TrendingUp className="w-8 h-8 text-purple-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">
                {Math.round(
                  (streakData.currentStreak / streakData.totalDays) * 100
                )}
                %
              </div>
              <div className="text-sm text-gray-600">Consistency Rate</div>
            </div>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Next Milestone */}
          <FadeIn delay={0.3}>
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold mb-4 text-gray-900 flex items-center">
                <Target className="w-6 h-6 text-purple-600 mr-2" />
                Next Milestone
              </h3>

              {nextMilestone ? (
                <div>
                  <div className="flex items-center space-x-4 mb-4">
                    <div
                      className={`w-12 h-12 bg-${nextMilestone.color}-100 rounded-xl flex items-center justify-center`}
                    >
                      <nextMilestone.icon
                        className={`w-6 h-6 text-${nextMilestone.color}-600`}
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">
                        {nextMilestone.title}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {nextMilestone.days} day streak
                      </p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">
                        {streakData.currentStreak} / {nextMilestone.days} days
                      </span>
                      <span className="text-sm font-bold text-purple-600">
                        {Math.round(progressToNext)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className={`bg-${nextMilestone.color}-500 h-3 rounded-full transition-all duration-1000`}
                        style={{ width: `${Math.min(progressToNext, 100)}%` }}
                      ></div>
                    </div>
                  </div>

                  <div
                    className={`p-3 bg-${nextMilestone.color}-50 rounded-lg`}
                  >
                    <div className="flex items-center space-x-2">
                      <Star
                        className={`w-4 h-4 text-${nextMilestone.color}-600`}
                      />
                      <span
                        className={`text-sm font-semibold text-${nextMilestone.color}-700`}
                      >
                        Reward: {nextMilestone.reward}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 text-center">
                    <span className="text-lg font-bold text-gray-900">
                      {nextMilestone.days - streakData.currentStreak} days to
                      go!
                    </span>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Crown className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
                  <h4 className="text-lg font-bold text-gray-900 mb-2">
                    🎉 All Milestones Completed!
                  </h4>
                  <p className="text-gray-600">
                    You're a true Factor75 champion! Keep up the amazing streak.
                  </p>
                </div>
              )}
            </div>
          </FadeIn>

          {/* Streak Milestones */}
          <FadeIn delay={0.4}>
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold mb-4 text-gray-900 flex items-center">
                <Award className="w-6 h-6 text-yellow-600 mr-2" />
                Streak Milestones
              </h3>

              <StaggeredAnimation className="space-y-4">
                {streakMilestones.map(milestone => {
                  const IconComponent = milestone.icon
                  return (
                    <div
                      key={milestone.days}
                      className={`flex items-center space-x-4 p-4 rounded-xl border-2 transition-all ${
                        milestone.isAchieved
                          ? `bg-${milestone.color}-50 border-${milestone.color}-200`
                          : 'bg-gray-50 border-gray-200'
                      }`}
                    >
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          milestone.isAchieved
                            ? `bg-${milestone.color}-100`
                            : 'bg-gray-100'
                        }`}
                      >
                        <IconComponent
                          className={`w-5 h-5 ${
                            milestone.isAchieved
                              ? `text-${milestone.color}-600`
                              : 'text-gray-400'
                          }`}
                        />
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h4
                            className={`font-semibold ${
                              milestone.isAchieved
                                ? 'text-gray-900'
                                : 'text-gray-500'
                            }`}
                          >
                            {milestone.title}
                          </h4>
                          {milestone.isAchieved && (
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          )}
                        </div>
                        <p className="text-sm text-gray-600">
                          {milestone.days} day milestone
                        </p>
                        <p
                          className={`text-xs ${
                            milestone.isAchieved
                              ? `text-${milestone.color}-700 font-semibold`
                              : 'text-gray-500'
                          }`}
                        >
                          {milestone.reward}
                        </p>
                      </div>

                      <div className="text-right">
                        <div
                          className={`text-lg font-bold ${
                            milestone.isAchieved
                              ? `text-${milestone.color}-600`
                              : 'text-gray-400'
                          }`}
                        >
                          {milestone.days}
                        </div>
                        <div className="text-xs text-gray-500">days</div>
                      </div>
                    </div>
                  )
                })}
              </StaggeredAnimation>
            </div>
          </FadeIn>
        </div>

        {/* Streak Calendar Preview */}
        <FadeIn delay={0.5}>
          <div className="mt-8 bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-gray-900 flex items-center">
              <Calendar className="w-6 h-6 text-blue-600 mr-2" />
              Recent Activity (Last 14 Days)
            </h3>

            <div className="grid grid-cols-7 gap-2">
              {streakData.streakHistory.slice(-14).map((day, index) => {
                const isToday = index === streakData.streakHistory.length - 1
                return (
                  <div
                    key={index}
                    className={`aspect-square rounded-lg flex flex-col items-center justify-center text-sm ${
                      day.completed
                        ? 'bg-green-100 border-2 border-green-300'
                        : 'bg-red-100 border-2 border-red-300'
                    } ${isToday ? 'ring-2 ring-blue-400' : ''}`}
                  >
                    <div
                      className={`font-semibold ${
                        day.completed ? 'text-green-700' : 'text-red-700'
                      }`}
                    >
                      {day.date.getDate()}
                    </div>
                    <div
                      className={`text-xs ${
                        day.completed ? 'text-green-600' : 'text-red-600'
                      }`}
                    >
                      {day.completed ? '✓' : '✗'}
                    </div>
                    {day.completed && (
                      <div className="text-xs text-green-600">
                        {day.mealCount}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            <div className="mt-4 flex items-center justify-center space-x-6 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-green-100 border border-green-300 rounded"></div>
                <span className="text-gray-600">Completed</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-red-100 border border-red-300 rounded"></div>
                <span className="text-gray-600">Missed</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-blue-400 rounded"></div>
                <span className="text-gray-600">Today</span>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Motivation Section */}
        <FadeIn delay={0.6}>
          <div className="mt-8 bg-gradient-to-r from-orange-100 to-red-100 rounded-2xl p-8 text-center">
            <Flame className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              {streakStatus === 'active'
                ? 'Keep the Fire Burning!'
                : "Don't Let the Streak Die!"}
            </h3>
            <p className="text-gray-700 mb-6">
              {streakStatus === 'active'
                ? `You're on an amazing ${streakData.currentStreak}-day streak! Every healthy meal brings you closer to your goals.`
                : `Your streak is at risk! Order your next meal to keep the momentum going.`}
            </p>
            <button className="bg-gradient-to-r from-orange-600 to-red-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-orange-700 hover:to-red-700 transition-all shadow-lg">
              {streakStatus === 'active'
                ? 'Order Next Meal'
                : 'Save My Streak!'}
            </button>
          </div>
        </FadeIn>
      </div>
    </div>
  )
}

// Helper function to generate streak history
function generateStreakHistory() {
  const history = []
  const today = new Date()

  for (let i = 29; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)

    const completed = i < 3 ? false : Math.random() > 0.15 // Recent 3 days might be incomplete, 85% completion rate otherwise
    const mealCount = completed ? Math.floor(Math.random() * 3) + 1 : 0

    history.push({
      date,
      completed,
      mealCount,
    })
  }

  return history
}

export default MealStreakCounters
