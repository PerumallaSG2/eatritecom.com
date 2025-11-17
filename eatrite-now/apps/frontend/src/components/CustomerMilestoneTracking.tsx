import React, { useState, useEffect } from 'react'
import {
  Heart,
  Star,
  Target,
  TrendingUp,
  Award,
  Trophy,
  Zap,
  Calendar,
  Flame,
  CheckCircle,
  Utensils,
  Weight,
} from 'lucide-react'
import { FadeIn, StaggeredAnimation } from './AnimationComponents'

interface Milestone {
  id: string
  title: string
  description: string
  category: 'meals' | 'health' | 'streak' | 'social' | 'savings'
  target: number
  current: number
  unit: string
  icon: React.ComponentType<any>
  color: string
  reward: string
  isCompleted: boolean
  completedDate?: Date
  nextMilestone?: {
    title: string
    target: number
  }
}

interface UserProgress {
  totalMeals: number
  currentStreak: number
  longestStreak: number
  weightLost: number
  moneySaved: number
  daysActive: number
  referrals: number
  favoritesMade: number
}

const generateMilestones = (progress: UserProgress): Milestone[] => [
  {
    id: '1',
    title: 'First Taste',
    description: 'Complete your first Factor75 meal',
    category: 'meals',
    target: 1,
    current: Math.min(progress.totalMeals, 1),
    unit: 'meal',
    icon: Utensils,
    color: 'green',
    reward: '$5 credit',
    isCompleted: progress.totalMeals >= 1,
    completedDate:
      progress.totalMeals >= 1
        ? new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
        : undefined,
    nextMilestone: { title: 'Meal Explorer', target: 10 },
  },
  {
    id: '2',
    title: 'Meal Explorer',
    description: 'Enjoy 10 delicious meals',
    category: 'meals',
    target: 10,
    current: Math.min(progress.totalMeals, 10),
    unit: 'meals',
    icon: Target,
    color: 'blue',
    reward: 'Free dessert',
    isCompleted: progress.totalMeals >= 10,
    completedDate:
      progress.totalMeals >= 10
        ? new Date(Date.now() - 25 * 24 * 60 * 60 * 1000)
        : undefined,
    nextMilestone: { title: 'Dedicated Diner', target: 25 },
  },
  {
    id: '3',
    title: 'Dedicated Diner',
    description: 'Reach 25 meals milestone',
    category: 'meals',
    target: 25,
    current: Math.min(progress.totalMeals, 25),
    unit: 'meals',
    icon: Award,
    color: 'purple',
    reward: "$25 credit + Chef's Choice Box",
    isCompleted: progress.totalMeals >= 25,
    completedDate:
      progress.totalMeals >= 25
        ? new Date(Date.now() - 20 * 24 * 60 * 60 * 1000)
        : undefined,
    nextMilestone: { title: 'Half Century', target: 50 },
  },
  {
    id: '4',
    title: 'Half Century',
    description: 'Complete 50 amazing meals',
    category: 'meals',
    target: 50,
    current: Math.min(progress.totalMeals, 50),
    unit: 'meals',
    icon: Trophy,
    color: 'yellow',
    reward: '$50 credit + VIP status',
    isCompleted: progress.totalMeals >= 50,
    completedDate:
      progress.totalMeals >= 50
        ? new Date(Date.now() - 15 * 24 * 60 * 60 * 1000)
        : undefined,
    nextMilestone: { title: 'Century Club', target: 100 },
  },
  {
    id: '5',
    title: 'Week Warrior',
    description: 'Maintain 7-day meal streak',
    category: 'streak',
    target: 7,
    current: Math.min(progress.currentStreak, 7),
    unit: 'days',
    icon: Flame,
    color: 'red',
    reward: '10% off next order',
    isCompleted: progress.currentStreak >= 7,
    completedDate:
      progress.currentStreak >= 7
        ? new Date(Date.now() - 10 * 24 * 60 * 60 * 1000)
        : undefined,
    nextMilestone: { title: 'Monthly Master', target: 30 },
  },
  {
    id: '6',
    title: 'Health Hero',
    description: 'Lose 10 pounds with Factor75',
    category: 'health',
    target: 10,
    current: Math.min(progress.weightLost, 10),
    unit: 'lbs',
    icon: Weight,
    color: 'pink',
    reward: 'Personal nutrition consultation',
    isCompleted: progress.weightLost >= 10,
    completedDate:
      progress.weightLost >= 10
        ? new Date(Date.now() - 12 * 24 * 60 * 60 * 1000)
        : undefined,
    nextMilestone: { title: 'Transformation Champion', target: 25 },
  },
  {
    id: '7',
    title: 'Money Saver',
    description: 'Save $100 vs restaurant dining',
    category: 'savings',
    target: 100,
    current: Math.min(progress.moneySaved, 100),
    unit: '$',
    icon: TrendingUp,
    color: 'emerald',
    reward: '$20 bonus credit',
    isCompleted: progress.moneySaved >= 100,
    completedDate:
      progress.moneySaved >= 100
        ? new Date(Date.now() - 8 * 24 * 60 * 60 * 1000)
        : undefined,
    nextMilestone: { title: 'Budget Boss', target: 500 },
  },
  {
    id: '8',
    title: 'Social Sharer',
    description: 'Refer 3 friends to Factor75',
    category: 'social',
    target: 3,
    current: Math.min(progress.referrals, 3),
    unit: 'friends',
    icon: Heart,
    color: 'rose',
    reward: '$75 credit ($25 per referral)',
    isCompleted: progress.referrals >= 3,
    completedDate:
      progress.referrals >= 3
        ? new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
        : undefined,
    nextMilestone: { title: 'Community Builder', target: 10 },
  },
]

export const CustomerMilestoneTracking: React.FC = () => {
  const [userProgress] = useState<UserProgress>({
    totalMeals: 47,
    currentStreak: 12,
    longestStreak: 23,
    weightLost: 18,
    moneySaved: 340,
    daysActive: 85,
    referrals: 5,
    favoritesMade: 8,
  })

  const [milestones, setMilestones] = useState<Milestone[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [animatedProgress, setAnimatedProgress] = useState<
    Record<string, number>
  >({})

  useEffect(() => {
    const generatedMilestones = generateMilestones(userProgress)
    setMilestones(generatedMilestones)

    // Animate progress bars
    generatedMilestones.forEach(milestone => {
      setTimeout(() => {
        setAnimatedProgress(prev => ({
          ...prev,
          [milestone.id]: milestone.current,
        }))
      }, 200)
    })
  }, [userProgress])

  const filteredMilestones =
    selectedCategory === 'all'
      ? milestones
      : milestones.filter(m => m.category === selectedCategory)

  const completedCount = milestones.filter(m => m.isCompleted).length
  const totalRewardsEarned = milestones
    .filter(m => m.isCompleted)
    .reduce((total, m) => {
      const match = m.reward.match(/\$(\d+)/)
      return total + (match ? parseInt(match[1]) : 0)
    }, 0)

  const getProgressPercentage = (milestone: Milestone) => {
    const animated = animatedProgress[milestone.id] || 0
    return Math.min((animated / milestone.target) * 100, 100)
  }

  const getCategoryIcon = (category: string) => {
    const icons = {
      meals: Utensils,
      health: Heart,
      streak: Flame,
      social: Heart,
      savings: TrendingUp,
    }
    return icons[category as keyof typeof icons] || Target
  }

  const categories = [
    { value: 'all', label: 'All Milestones', count: milestones.length },
    {
      value: 'meals',
      label: 'Meal Goals',
      count: milestones.filter(m => m.category === 'meals').length,
    },
    {
      value: 'health',
      label: 'Health Goals',
      count: milestones.filter(m => m.category === 'health').length,
    },
    {
      value: 'streak',
      label: 'Streak Goals',
      count: milestones.filter(m => m.category === 'streak').length,
    },
    {
      value: 'social',
      label: 'Social Goals',
      count: milestones.filter(m => m.category === 'social').length,
    },
    {
      value: 'savings',
      label: 'Savings Goals',
      count: milestones.filter(m => m.category === 'savings').length,
    },
  ]

  return (
    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl overflow-hidden shadow-2xl">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-8">
        <FadeIn>
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Trophy className="w-8 h-8" />
              <h2 className="text-3xl font-bold">Achievement Milestones</h2>
              <Star className="w-8 h-8" />
            </div>
            <p className="text-purple-100 text-lg">
              Track your progress and earn rewards on your wellness journey
            </p>
          </div>
        </FadeIn>
      </div>

      <div className="p-8">
        {/* Progress Overview */}
        <FadeIn delay={0.1}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 text-center shadow-lg">
              <Zap className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">
                {completedCount}
              </div>
              <div className="text-sm text-gray-600">Milestones Achieved</div>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-lg">
              <Award className="w-8 h-8 text-purple-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">
                ${totalRewardsEarned}
              </div>
              <div className="text-sm text-gray-600">Rewards Earned</div>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-lg">
              <Flame className="w-8 h-8 text-red-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">
                {userProgress.currentStreak}
              </div>
              <div className="text-sm text-gray-600">Current Streak</div>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-lg">
              <TrendingUp className="w-8 h-8 text-green-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">
                {Math.round((completedCount / milestones.length) * 100)}%
              </div>
              <div className="text-sm text-gray-600">Completion Rate</div>
            </div>
          </div>
        </FadeIn>

        {/* Category Filters */}
        <FadeIn delay={0.2}>
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {categories.map(category => {
              const IconComponent = getCategoryIcon(category.value)
              return (
                <button
                  key={category.value}
                  onClick={() => setSelectedCategory(category.value)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full font-semibold transition-all ${
                    selectedCategory === category.value
                      ? 'bg-purple-600 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-gray-100 shadow'
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  <span>
                    {category.label} ({category.count})
                  </span>
                </button>
              )
            })}
          </div>
        </FadeIn>

        {/* Milestones Grid */}
        <StaggeredAnimation className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredMilestones.map(milestone => {
            const IconComponent = milestone.icon
            const progressPercentage = getProgressPercentage(milestone)

            return (
              <div
                key={milestone.id}
                className={`relative bg-white rounded-2xl p-6 shadow-lg border-2 transition-all hover:shadow-xl ${
                  milestone.isCompleted
                    ? `border-${milestone.color}-500 bg-gradient-to-br from-${milestone.color}-50 to-white`
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {/* Completion Badge */}
                {milestone.isCompleted && (
                  <div
                    className={`absolute -top-2 -right-2 w-8 h-8 bg-${milestone.color}-500 rounded-full flex items-center justify-center`}
                  >
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                )}

                {/* Header */}
                <div className="flex items-center space-x-4 mb-4">
                  <div
                    className={`w-12 h-12 bg-${milestone.color}-100 rounded-xl flex items-center justify-center`}
                  >
                    <IconComponent
                      className={`w-6 h-6 text-${milestone.color}-600`}
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 text-lg">
                      {milestone.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {milestone.description}
                    </p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      {milestone.current} / {milestone.target} {milestone.unit}
                    </span>
                    <span
                      className={`text-sm font-bold text-${milestone.color}-600`}
                    >
                      {Math.round(progressPercentage)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className={`bg-${milestone.color}-500 h-3 rounded-full transition-all duration-1000 ease-out`}
                      style={{ width: `${progressPercentage}%` }}
                    ></div>
                  </div>
                </div>

                {/* Reward */}
                <div className={`p-3 bg-${milestone.color}-50 rounded-lg mb-4`}>
                  <div className="flex items-center space-x-2">
                    <Star className={`w-4 h-4 text-${milestone.color}-600`} />
                    <span
                      className={`text-sm font-semibold text-${milestone.color}-700`}
                    >
                      Reward: {milestone.reward}
                    </span>
                  </div>
                </div>

                {/* Completion Date or Next Milestone */}
                {milestone.isCompleted ? (
                  <div className="flex items-center space-x-2 text-gray-500">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">
                      Completed {milestone.completedDate?.toLocaleDateString()}
                    </span>
                  </div>
                ) : milestone.nextMilestone ? (
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Next: </span>
                    {milestone.nextMilestone.title} (
                    {milestone.nextMilestone.target} {milestone.unit})
                  </div>
                ) : null}
              </div>
            )
          })}
        </StaggeredAnimation>

        {/* Motivational Section */}
        <FadeIn delay={0.5}>
          <div className="mt-8 bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-8 text-center">
            <Trophy className="w-16 h-16 text-purple-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Keep Going! You're Doing Amazing!
            </h3>
            <p className="text-gray-700 mb-6">
              Every meal brings you closer to your health goals. Stay consistent
              and watch the rewards add up!
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <div className="text-xl font-bold text-purple-600">
                  {userProgress.longestStreak}
                </div>
                <div className="text-sm text-gray-600">Longest Streak</div>
              </div>
              <div>
                <div className="text-xl font-bold text-green-600">
                  {userProgress.weightLost} lbs
                </div>
                <div className="text-sm text-gray-600">Weight Lost</div>
              </div>
              <div>
                <div className="text-xl font-bold text-blue-600">
                  ${userProgress.moneySaved}
                </div>
                <div className="text-sm text-gray-600">Money Saved</div>
              </div>
              <div>
                <div className="text-xl font-bold text-orange-600">
                  {userProgress.daysActive}
                </div>
                <div className="text-sm text-gray-600">Days Active</div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  )
}

export default CustomerMilestoneTracking
