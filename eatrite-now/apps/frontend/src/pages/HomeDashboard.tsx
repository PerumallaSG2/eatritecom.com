import React, { useState, useEffect } from 'react'
import {
  Bell,
  Calendar,
  Target,
  Award,
  Users,
  ChevronRight,
  Sparkles,
  Heart,
  Zap,
} from 'lucide-react'
import {
  Container,
  Card,
  Button,
  Badge,
  ProgressBar,
  Avatar,
} from '../components/ui/CoreComponents'
import {
  StatCard,
  RecommendationCard,
} from '../components/ui/SpecializedComponents'

interface DashboardData {
  user: {
    name: string
    avatar: string
    memberSince: string
    currentStreak: number
  }
  stats: {
    mealsThisWeek: number
    caloriesSaved: number
    wellnessScore: number
    teamRanking: number
  }
  recommendations: Array<{
    id: string
    name: string
    description: string
    imageUrl: string
    price: number
    rating: number
    reviewCount: number
    prepTime: number
    difficulty: 'Easy' | 'Medium' | 'Hard'
    nutrition: {
      calories: number
      protein: number
      carbs: number
      fat: number
    }
    tags: string[]
    confidence: number
    reason: string
  }>
  upcomingMeals: Array<{
    id: string
    name: string
    imageUrl: string
    scheduledFor: string
    status: 'preparing' | 'ready' | 'delivered'
  }>
  achievements: Array<{
    id: string
    title: string
    description: string
    progress: number
    maxProgress: number
    icon: string
    isCompleted: boolean
  }>
  corporateAnnouncements?: Array<{
    id: string
    title: string
    message: string
    type: 'info' | 'success' | 'warning'
    date: string
  }>
}

const HomeDashboard: React.FC = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)

  // Mock data
  const mockData: DashboardData = {
    user: {
      name: 'Sarah Johnson',
      avatar: '/api/placeholder/80/80',
      memberSince: '2024-01-15',
      currentStreak: 12,
    },
    stats: {
      mealsThisWeek: 4,
      caloriesSaved: 1250,
      wellnessScore: 87,
      teamRanking: 3,
    },
    recommendations: [
      {
        id: 'rec1',
        name: 'Mediterranean Salmon Bowl',
        description:
          'Fresh salmon with quinoa, roasted vegetables, and tahini dressing',
        imageUrl: '/api/placeholder/300/200',
        price: 17.99,
        rating: 4.8,
        reviewCount: 124,
        prepTime: 25,
        difficulty: 'Easy',
        nutrition: { calories: 520, protein: 42, carbs: 35, fat: 24 },
        tags: ['High Protein', 'Omega-3', 'Gluten Free'],
        confidence: 94,
        reason: 'Perfect match for your taste profile and health goals',
      },
      {
        id: 'rec2',
        name: 'Asian Fusion Chicken Bowl',
        description:
          'Marinated chicken with fresh vegetables and sesame ginger sauce',
        imageUrl: '/api/placeholder/300/200',
        price: 15.99,
        rating: 4.6,
        reviewCount: 89,
        prepTime: 20,
        difficulty: 'Easy',
        nutrition: { calories: 460, protein: 38, carbs: 42, fat: 18 },
        tags: ['High Protein', 'Low Sodium', 'Balanced'],
        confidence: 89,
        reason: 'Similar to your recent favorites with Asian flavors you love',
      },
    ],
    upcomingMeals: [
      {
        id: 'meal1',
        name: 'Grilled Chicken Quinoa',
        imageUrl: '/api/placeholder/150/150',
        scheduledFor: '2024-11-16T12:00:00Z',
        status: 'preparing',
      },
      {
        id: 'meal2',
        name: 'Plant-Based Buddha Bowl',
        imageUrl: '/api/placeholder/150/150',
        scheduledFor: '2024-11-17T12:00:00Z',
        status: 'ready',
      },
    ],
    achievements: [
      {
        id: 'ach1',
        title: 'Wellness Warrior',
        description: 'Complete 30 healthy meals',
        progress: 24,
        maxProgress: 30,
        icon: '🏆',
        isCompleted: false,
      },
      {
        id: 'ach2',
        title: 'Consistency Champion',
        description: '14-day meal streak',
        progress: 12,
        maxProgress: 14,
        icon: '🔥',
        isCompleted: false,
      },
    ],
    corporateAnnouncements: [
      {
        id: 'ann1',
        title: 'New Wellness Challenge',
        message: 'Join our 30-day team wellness challenge starting Monday!',
        type: 'info',
        date: '2024-11-15',
      },
    ],
  }

  useEffect(() => {
    // Simulate API call
    const loadDashboard = async () => {
      setLoading(true)
      await new Promise(resolve => setTimeout(resolve, 1000))
      setDashboardData(mockData)
      setLoading(false)
    }

    loadDashboard()
  }, [])

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good morning'
    if (hour < 17) return 'Good afternoon'
    return 'Good evening'
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
    })
  }

  if (loading || !dashboardData) {
    return (
      <div className="min-h-screen bg-gray-25 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Sparkles className="w-6 h-6 text-primary-600" />
          </div>
          <p className="text-gray-600">Loading your wellness dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-25">
      <Container size="xl" className="py-8 space-y-8">
        {/* Welcome Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Avatar
              src={dashboardData.user.avatar}
              name={dashboardData.user.name}
              size="lg"
            />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {getGreeting()}, {dashboardData.user.name.split(' ')[0]}!
              </h1>
              <p className="text-gray-600">
                You're on a {dashboardData.user.currentStreak}-day wellness
                streak 🔥
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" leftIcon={Bell}>
              <span className="sr-only">Notifications</span>
            </Button>
            <Button variant="outline" size="sm" leftIcon={Calendar}>
              Schedule
            </Button>
          </div>
        </div>

        {/* Corporate Announcements */}
        {dashboardData.corporateAnnouncements &&
          dashboardData.corporateAnnouncements.length > 0 && (
            <Card
              variant="premium"
              className="border-gold-200 bg-gradient-to-r from-gold-50 to-yellow-50"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-gold-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Bell className="w-5 h-5 text-gold-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {dashboardData.corporateAnnouncements[0].title}
                  </h3>
                  <p className="text-gray-700 mb-3">
                    {dashboardData.corporateAnnouncements[0].message}
                  </p>
                  <Button variant="gold" size="sm">
                    Learn More
                  </Button>
                </div>
              </div>
            </Card>
          )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Meals This Week"
            value={dashboardData.stats.mealsThisWeek}
            change={{ value: 25, trend: 'up', label: 'vs last week' }}
            icon={Zap}
          />
          <StatCard
            title="Calories Optimized"
            value={`${dashboardData.stats.caloriesSaved.toLocaleString()}`}
            change={{ value: 12, trend: 'up', label: 'this month' }}
            icon={Target}
            variant="success"
          />
          <StatCard
            title="Wellness Score"
            value={`${dashboardData.stats.wellnessScore}/100`}
            change={{ value: 5, trend: 'up', label: 'this week' }}
            icon={Heart}
            variant="gold"
          />
          <StatCard
            title="Team Ranking"
            value={`#${dashboardData.stats.teamRanking}`}
            change={{ value: 1, trend: 'up', label: 'positions' }}
            icon={Users}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Left Column - Recommendations & Upcoming */}
          <div className="xl:col-span-2 space-y-8">
            {/* AI Recommendations */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Recommended For You
                  </h2>
                </div>
                <Button variant="ghost" size="sm" rightIcon={ChevronRight}>
                  View All
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {dashboardData.recommendations.map(meal => (
                  <RecommendationCard
                    key={meal.id}
                    meal={meal}
                    confidence={meal.confidence}
                    reason={meal.reason}
                    onSelect={id => console.log('Selected meal:', id)}
                  />
                ))}
              </div>
            </section>

            {/* Upcoming Meals */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  Upcoming Deliveries
                </h2>
                <Button variant="ghost" size="sm" rightIcon={ChevronRight}>
                  Track All
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {dashboardData.upcomingMeals.map(meal => (
                  <Card key={meal.id} hover className="cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                        <img
                          src={meal.imageUrl}
                          alt={meal.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 truncate">
                          {meal.name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {formatDate(meal.scheduledFor)}
                        </p>
                        <Badge
                          variant={
                            meal.status === 'ready' ? 'success' : 'secondary'
                          }
                          size="sm"
                        >
                          {meal.status === 'preparing' && 'Preparing'}
                          {meal.status === 'ready' && 'Ready'}
                          {meal.status === 'delivered' && 'Delivered'}
                        </Badge>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column - Achievements & Quick Actions */}
          <div className="space-y-8">
            {/* Achievements Progress */}
            <Card>
              <div className="flex items-center gap-3 mb-6">
                <Award className="w-6 h-6 text-gold-500" />
                <h3 className="text-lg font-semibold text-gray-900">
                  Your Progress
                </h3>
              </div>

              <div className="space-y-6">
                {dashboardData.achievements.map(achievement => (
                  <div key={achievement.id}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{achievement.icon}</span>
                        <div>
                          <h4 className="font-medium text-gray-900 text-sm">
                            {achievement.title}
                          </h4>
                          <p className="text-xs text-gray-600">
                            {achievement.description}
                          </p>
                        </div>
                      </div>
                      <span className="text-xs text-gray-500">
                        {achievement.progress}/{achievement.maxProgress}
                      </span>
                    </div>
                    <ProgressBar
                      value={achievement.progress}
                      max={achievement.maxProgress}
                      variant={achievement.isCompleted ? 'success' : 'gold'}
                    />
                  </div>
                ))}
              </div>
            </Card>

            {/* Quick Navigation */}
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <Button
                  variant="primary"
                  size="md"
                  className="w-full justify-start"
                >
                  Browse Menu
                </Button>
                <Button
                  variant="outline"
                  size="md"
                  className="w-full justify-start"
                >
                  Manage Subscription
                </Button>
                <Button
                  variant="ghost"
                  size="md"
                  className="w-full justify-start"
                >
                  Track Orders
                </Button>
                <Button
                  variant="ghost"
                  size="md"
                  className="w-full justify-start"
                >
                  Account Settings
                </Button>
              </div>
            </Card>

            {/* Wellness Tip */}
            <Card
              variant="subtle"
              className="bg-gradient-to-br from-primary-50 to-green-50 border-primary-100"
            >
              <div className="text-center">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Heart className="w-6 h-6 text-primary-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  Today's Wellness Tip
                </h4>
                <p className="text-sm text-gray-700 mb-4">
                  Stay hydrated! Aim for 8 glasses of water throughout your day
                  to boost energy and focus.
                </p>
                <Button variant="primary" size="sm">
                  More Tips
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default HomeDashboard
