import React, { useState } from 'react'
import { Button, Card, Container } from '../components/ui/CoreComponents'

// Types for gamification system
interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  points: number
  category: 'nutrition' | 'streak' | 'social' | 'wellness' | 'team'
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  progress: number
  maxProgress: number
  isUnlocked: boolean
  unlockedAt?: string
  reward?: string
}

interface Challenge {
  id: string
  title: string
  description: string
  type: 'daily' | 'weekly' | 'monthly' | 'special'
  category: 'nutrition' | 'variety' | 'social' | 'wellness'
  startDate: string
  endDate: string
  progress: number
  target: number
  points: number
  participants: number
  isActive: boolean
  isCompleted: boolean
  difficulty: 'easy' | 'medium' | 'hard'
}

interface LeaderboardEntry {
  id: string
  name: string
  avatar: string
  department: string
  points: number
  level: number
  streak: number
  achievements: number
  rank: number
  weeklyPoints: number
  monthlyPoints: number
}

interface WellnessStreak {
  id: string
  type: 'healthy_meals' | 'hydration' | 'exercise' | 'sleep'
  title: string
  icon: string
  currentStreak: number
  longestStreak: number
  target: number
  points: number
  isActive: boolean
}

interface TeamCompetition {
  id: string
  title: string
  description: string
  startDate: string
  endDate: string
  teams: Array<{
    id: string
    name: string
    members: number
    points: number
    avatar: string
  }>
  myTeam?: string
  prize: string
  status: 'upcoming' | 'active' | 'completed'
}

const EmployeeWellnessGamification: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    | 'overview'
    | 'achievements'
    | 'challenges'
    | 'leaderboard'
    | 'streaks'
    | 'teams'
  >('overview')
  const [selectedPeriod, setSelectedPeriod] = useState<
    'daily' | 'weekly' | 'monthly' | 'all'
  >('weekly')

  // Mock user data
  const currentUser = {
    name: 'Alex Johnson',
    avatar: '/api/placeholder/80/80',
    level: 12,
    points: 2850,
    weeklyPoints: 420,
    monthlyPoints: 1680,
    rank: 8,
    department: 'Engineering',
    joinedDate: '2024-08-15',
  }

  // Mock achievements data
  const achievements: Achievement[] = [
    {
      id: 'streak_7',
      title: 'Week Warrior',
      description: 'Maintain a 7-day healthy eating streak',
      icon: '🔥',
      points: 100,
      category: 'streak',
      rarity: 'common',
      progress: 7,
      maxProgress: 7,
      isUnlocked: true,
      unlockedAt: '2024-11-10',
      reward: '50 bonus points',
    },
    {
      id: 'nutrition_master',
      title: 'Nutrition Master',
      description: 'Hit your daily nutrition goals 30 times',
      icon: '🥗',
      points: 500,
      category: 'nutrition',
      rarity: 'epic',
      progress: 23,
      maxProgress: 30,
      isUnlocked: false,
    },
    {
      id: 'social_butterfly',
      title: 'Social Butterfly',
      description: 'Share 10 meal photos with colleagues',
      icon: '🦋',
      points: 200,
      category: 'social',
      rarity: 'rare',
      progress: 10,
      maxProgress: 10,
      isUnlocked: true,
      unlockedAt: '2024-11-12',
      reward: 'Custom badge',
    },
    {
      id: 'team_player',
      title: 'Team Player',
      description: 'Complete 5 team challenges',
      icon: '🤝',
      points: 300,
      category: 'team',
      rarity: 'rare',
      progress: 3,
      maxProgress: 5,
      isUnlocked: false,
    },
    {
      id: 'wellness_legend',
      title: 'Wellness Legend',
      description: 'Reach level 20 and maintain 95% wellness score',
      icon: '👑',
      points: 1000,
      category: 'wellness',
      rarity: 'legendary',
      progress: 12,
      maxProgress: 20,
      isUnlocked: false,
      reward: 'Exclusive company merchandise',
    },
  ]

  // Mock challenges data
  const challenges: Challenge[] = [
    {
      id: 'daily_veggie',
      title: 'Daily Veggie Power',
      description: 'Include vegetables in every meal today',
      type: 'daily',
      category: 'nutrition',
      startDate: '2024-11-16',
      endDate: '2024-11-16',
      progress: 2,
      target: 3,
      points: 50,
      participants: 47,
      isActive: true,
      isCompleted: false,
      difficulty: 'easy',
    },
    {
      id: 'weekly_variety',
      title: 'Cuisine Explorer',
      description: 'Try 5 different cuisine types this week',
      type: 'weekly',
      category: 'variety',
      startDate: '2024-11-11',
      endDate: '2024-11-17',
      progress: 3,
      target: 5,
      points: 150,
      participants: 34,
      isActive: true,
      isCompleted: false,
      difficulty: 'medium',
    },
    {
      id: 'monthly_wellness',
      title: 'Wellness Champion',
      description: 'Achieve 90% wellness score for the month',
      type: 'monthly',
      category: 'wellness',
      startDate: '2024-11-01',
      endDate: '2024-11-30',
      progress: 16,
      target: 27,
      points: 500,
      participants: 89,
      isActive: true,
      isCompleted: false,
      difficulty: 'hard',
    },
  ]

  // Mock leaderboard data
  const leaderboard: LeaderboardEntry[] = [
    {
      id: 'user1',
      name: 'Sarah Chen',
      avatar: '/api/placeholder/50/50',
      department: 'Marketing',
      points: 3450,
      level: 15,
      streak: 21,
      achievements: 12,
      rank: 1,
      weeklyPoints: 520,
      monthlyPoints: 2100,
    },
    {
      id: 'user2',
      name: 'Mike Rodriguez',
      avatar: '/api/placeholder/50/50',
      department: 'Sales',
      points: 3200,
      level: 14,
      streak: 18,
      achievements: 10,
      rank: 2,
      weeklyPoints: 480,
      monthlyPoints: 1950,
    },
    {
      id: 'user3',
      name: 'Emma Wilson',
      avatar: '/api/placeholder/50/50',
      department: 'Design',
      points: 3050,
      level: 13,
      streak: 15,
      achievements: 11,
      rank: 3,
      weeklyPoints: 465,
      monthlyPoints: 1850,
    },
    {
      id: 'current',
      name: currentUser.name,
      avatar: currentUser.avatar,
      department: currentUser.department,
      points: currentUser.points,
      level: currentUser.level,
      streak: 14,
      achievements: 8,
      rank: currentUser.rank,
      weeklyPoints: currentUser.weeklyPoints,
      monthlyPoints: currentUser.monthlyPoints,
    },
  ]

  // Mock wellness streaks
  const wellnessStreaks: WellnessStreak[] = [
    {
      id: 'healthy_meals',
      type: 'healthy_meals',
      title: 'Healthy Meals',
      icon: '🥗',
      currentStreak: 14,
      longestStreak: 28,
      target: 30,
      points: 10,
      isActive: true,
    },
    {
      id: 'hydration',
      type: 'hydration',
      title: 'Hydration Goal',
      icon: '💧',
      currentStreak: 7,
      longestStreak: 21,
      target: 14,
      points: 5,
      isActive: true,
    },
    {
      id: 'exercise',
      type: 'exercise',
      title: 'Daily Movement',
      icon: '🏃‍♂️',
      currentStreak: 0,
      longestStreak: 12,
      target: 7,
      points: 15,
      isActive: false,
    },
  ]

  // Mock team competitions
  const teamCompetitions: TeamCompetition[] = [
    {
      id: 'wellness_week',
      title: 'Wellness Week Challenge',
      description: 'Team up to achieve the highest collective wellness score',
      startDate: '2024-11-18',
      endDate: '2024-11-25',
      teams: [
        {
          id: 'team1',
          name: 'Green Guardians',
          members: 8,
          points: 2850,
          avatar: '/api/placeholder/60/60',
        },
        {
          id: 'team2',
          name: 'Nutrition Ninjas',
          members: 7,
          points: 2650,
          avatar: '/api/placeholder/60/60',
        },
        {
          id: 'team3',
          name: 'Wellness Warriors',
          members: 9,
          points: 2400,
          avatar: '/api/placeholder/60/60',
        },
      ],
      myTeam: 'team2',
      prize: '$500 team lunch budget',
      status: 'upcoming',
    },
  ]

  const getRarityColor = (rarity: Achievement['rarity']) => {
    switch (rarity) {
      case 'common':
        return 'bg-gray-100 border-gray-300'
      case 'rare':
        return 'bg-blue-50 border-blue-300'
      case 'epic':
        return 'bg-purple-50 border-purple-300'
      case 'legendary':
        return 'bg-yellow-50 border-yellow-300'
      default:
        return 'bg-gray-100 border-gray-300'
    }
  }

  const getDifficultyColor = (difficulty: Challenge['difficulty']) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-100 text-green-800'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800'
      case 'hard':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Container className="py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Wellness Gamification
              </h1>
              <p className="text-gray-600">
                Track your progress, earn achievements, and compete with
                colleagues
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-2xl font-bold text-emerald-600">
                  {currentUser.points.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">Total Points</div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-blue-600">
                  Level {currentUser.level}
                </div>
                <div className="text-sm text-gray-600">Current Level</div>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
            {[
              { key: 'overview', label: 'Overview', icon: '📊' },
              { key: 'achievements', label: 'Achievements', icon: '🏆' },
              { key: 'challenges', label: 'Challenges', icon: '🎯' },
              { key: 'leaderboard', label: 'Leaderboard', icon: '🏅' },
              { key: 'streaks', label: 'Streaks', icon: '🔥' },
              { key: 'teams', label: 'Teams', icon: '👥' },
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md font-medium transition-all ${
                  activeTab === tab.key
                    ? 'bg-white text-emerald-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card variant="premium" className="p-6 text-center">
                <div className="text-3xl mb-2">🏅</div>
                <div className="text-2xl font-bold text-gray-900">
                  #{currentUser.rank}
                </div>
                <div className="text-sm text-gray-600">Company Rank</div>
              </Card>
              <Card variant="premium" className="p-6 text-center">
                <div className="text-3xl mb-2">🔥</div>
                <div className="text-2xl font-bold text-orange-600">14</div>
                <div className="text-sm text-gray-600">Day Streak</div>
              </Card>
              <Card variant="premium" className="p-6 text-center">
                <div className="text-3xl mb-2">🏆</div>
                <div className="text-2xl font-bold text-yellow-600">8</div>
                <div className="text-sm text-gray-600">Achievements</div>
              </Card>
              <Card variant="premium" className="p-6 text-center">
                <div className="text-3xl mb-2">👥</div>
                <div className="text-2xl font-bold text-blue-600">
                  Nutrition Ninjas
                </div>
                <div className="text-sm text-gray-600">Current Team</div>
              </Card>
            </div>

            {/* Recent Achievements */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Recent Achievements
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {achievements
                  .filter(a => a.isUnlocked)
                  .slice(0, 3)
                  .map(achievement => (
                    <Card
                      key={achievement.id}
                      variant="premium"
                      className="p-4"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl">{achievement.icon}</div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">
                            {achievement.title}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {achievement.description}
                          </p>
                          <div className="text-xs text-emerald-600 font-medium">
                            +{achievement.points} points
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
              </div>
            </div>

            {/* Active Challenges */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Active Challenges
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {challenges
                  .filter(c => c.isActive)
                  .map(challenge => (
                    <Card key={challenge.id} variant="premium" className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(challenge.difficulty)}`}
                        >
                          {challenge.difficulty}
                        </span>
                        <span className="text-sm text-gray-500">
                          {challenge.participants} participating
                        </span>
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-1">
                        {challenge.title}
                      </h4>
                      <p className="text-sm text-gray-600 mb-3">
                        {challenge.description}
                      </p>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>
                            {challenge.progress}/{challenge.target}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-emerald-600 h-2 rounded-full"
                            style={{
                              width: `${(challenge.progress / challenge.target) * 100}%`,
                            }}
                          ></div>
                        </div>
                        <div className="text-xs text-emerald-600 font-medium">
                          +{challenge.points} points
                        </div>
                      </div>
                    </Card>
                  ))}
              </div>
            </div>
          </div>
        )}

        {/* Achievements Tab */}
        {activeTab === 'achievements' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Achievements</h2>
              <div className="text-sm text-gray-600">
                {achievements.filter(a => a.isUnlocked).length} of{' '}
                {achievements.length} unlocked
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {achievements.map(achievement => (
                <Card
                  key={achievement.id}
                  variant="premium"
                  className={`p-6 ${getRarityColor(achievement.rarity)} ${
                    achievement.isUnlocked ? 'opacity-100' : 'opacity-60'
                  }`}
                >
                  <div className="text-center">
                    <div className="text-4xl mb-3">{achievement.icon}</div>
                    <h3 className="font-bold text-gray-900 mb-2">
                      {achievement.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      {achievement.description}
                    </p>

                    {!achievement.isUnlocked && (
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>
                            {achievement.progress}/{achievement.maxProgress}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-emerald-600 h-2 rounded-full"
                            style={{
                              width: `${(achievement.progress / achievement.maxProgress) * 100}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-emerald-600">
                        +{achievement.points} points
                      </span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          achievement.rarity === 'legendary'
                            ? 'bg-yellow-100 text-yellow-800'
                            : achievement.rarity === 'epic'
                              ? 'bg-purple-100 text-purple-800'
                              : achievement.rarity === 'rare'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {achievement.rarity}
                      </span>
                    </div>

                    {achievement.isUnlocked && achievement.unlockedAt && (
                      <div className="mt-3 text-xs text-gray-500">
                        Unlocked on{' '}
                        {new Date(achievement.unlockedAt).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Challenges Tab */}
        {activeTab === 'challenges' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Challenges</h2>
              <div className="flex space-x-2">
                {['daily', 'weekly', 'monthly', 'all'].map(period => (
                  <button
                    key={period}
                    onClick={() => setSelectedPeriod(period as any)}
                    className={`px-3 py-1 rounded-md text-sm font-medium ${
                      selectedPeriod === period
                        ? 'bg-emerald-600 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {period.charAt(0).toUpperCase() + period.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {challenges
                .filter(
                  c => selectedPeriod === 'all' || c.type === selectedPeriod
                )
                .map(challenge => (
                  <Card key={challenge.id} variant="premium" className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(challenge.difficulty)}`}
                        >
                          {challenge.difficulty}
                        </span>
                        <span className="text-xs text-gray-500">
                          {challenge.type}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600">
                        {challenge.participants} participating
                      </div>
                    </div>

                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {challenge.title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {challenge.description}
                    </p>

                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span className="font-medium">
                          {challenge.progress}/{challenge.target}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className="bg-emerald-600 h-3 rounded-full"
                          style={{
                            width: `${(challenge.progress / challenge.target) * 100}%`,
                          }}
                        ></div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm text-emerald-600 font-medium">
                          +{challenge.points} points
                        </span>
                        <div className="text-xs text-gray-500">
                          Ends{' '}
                          {new Date(challenge.endDate).toLocaleDateString()}
                        </div>
                      </div>

                      {challenge.isCompleted ? (
                        <div className="text-center py-2 bg-green-100 text-green-800 rounded-md font-medium">
                          ✅ Completed!
                        </div>
                      ) : (
                        <Button variant="primary" className="w-full">
                          Join Challenge
                        </Button>
                      )}
                    </div>
                  </Card>
                ))}
            </div>
          </div>
        )}

        {/* Leaderboard Tab */}
        {activeTab === 'leaderboard' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Leaderboard</h2>
              <div className="flex space-x-2">
                {['weekly', 'monthly', 'all'].map(period => (
                  <button
                    key={period}
                    onClick={() => setSelectedPeriod(period as any)}
                    className={`px-3 py-1 rounded-md text-sm font-medium ${
                      selectedPeriod === period
                        ? 'bg-emerald-600 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {period.charAt(0).toUpperCase() + period.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <Card variant="premium" className="overflow-hidden">
              <div className="space-y-0">
                {leaderboard.map(user => (
                  <div
                    key={user.id}
                    className={`flex items-center p-4 border-b last:border-b-0 ${
                      user.id === 'current'
                        ? 'bg-emerald-50 border-emerald-200'
                        : 'border-gray-200'
                    }`}
                  >
                    <div className="flex items-center space-x-4 flex-1">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                          user.rank === 1
                            ? 'bg-yellow-100 text-yellow-800'
                            : user.rank === 2
                              ? 'bg-gray-100 text-gray-700'
                              : user.rank === 3
                                ? 'bg-orange-100 text-orange-800'
                                : 'bg-gray-50 text-gray-600'
                        }`}
                      >
                        {user.rank === 1
                          ? '🥇'
                          : user.rank === 2
                            ? '🥈'
                            : user.rank === 3
                              ? '🥉'
                              : user.rank}
                      </div>

                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-10 h-10 rounded-full"
                      />

                      <div className="flex-1">
                        <div className="font-semibold text-gray-900">
                          {user.name}
                        </div>
                        <div className="text-sm text-gray-600">
                          {user.department}
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="font-bold text-gray-900">
                          {selectedPeriod === 'weekly'
                            ? user.weeklyPoints
                            : selectedPeriod === 'monthly'
                              ? user.monthlyPoints
                              : user.points}{' '}
                          pts
                        </div>
                        <div className="text-sm text-gray-600">
                          Level {user.level}
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-sm text-orange-600 font-medium">
                          {user.streak}🔥
                        </div>
                        <div className="text-xs text-gray-500">
                          {user.achievements} badges
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* Streaks Tab */}
        {activeTab === 'streaks' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Wellness Streaks
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {wellnessStreaks.map(streak => (
                <Card key={streak.id} variant="premium" className="p-6">
                  <div className="text-center">
                    <div className="text-4xl mb-3">{streak.icon}</div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {streak.title}
                    </h3>

                    <div className="space-y-4">
                      <div>
                        <div
                          className={`text-3xl font-bold mb-1 ${streak.isActive ? 'text-orange-600' : 'text-gray-400'}`}
                        >
                          {streak.currentStreak}
                        </div>
                        <div className="text-sm text-gray-600">
                          Current Streak
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Target</span>
                          <span>{streak.target} days</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${streak.isActive ? 'bg-orange-500' : 'bg-gray-400'}`}
                            style={{
                              width: `${Math.min((streak.currentStreak / streak.target) * 100, 100)}%`,
                            }}
                          ></div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <span className="text-emerald-600 font-medium">
                          +{streak.points} pts/day
                        </span>
                        <span className="text-gray-500">
                          Best: {streak.longestStreak}
                        </span>
                      </div>

                      <div
                        className={`px-3 py-2 rounded-md text-sm font-medium ${
                          streak.isActive
                            ? 'bg-orange-100 text-orange-800'
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {streak.isActive ? '🔥 Active' : '💤 Inactive'}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Teams Tab */}
        {activeTab === 'teams' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Team Competitions
            </h2>

            {teamCompetitions.map(competition => (
              <Card key={competition.id} variant="premium" className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {competition.title}
                  </h3>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      competition.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : competition.status === 'upcoming'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {competition.status}
                  </span>
                </div>

                <p className="text-gray-600 mb-4">{competition.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  {competition.teams.map((team, index) => (
                    <div
                      key={team.id}
                      className={`p-4 rounded-lg border ${
                        team.id === competition.myTeam
                          ? 'border-emerald-300 bg-emerald-50'
                          : 'border-gray-200'
                      }`}
                    >
                      <div className="flex items-center space-x-3 mb-2">
                        <img
                          src={team.avatar}
                          alt={team.name}
                          className="w-8 h-8 rounded-full"
                        />
                        <div className="flex-1">
                          <div className="font-semibold text-gray-900">
                            {team.name}
                          </div>
                          <div className="text-sm text-gray-600">
                            {team.members} members
                          </div>
                        </div>
                        {index < 3 && (
                          <div className="text-lg">
                            {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
                          </div>
                        )}
                      </div>
                      <div className="text-lg font-bold text-emerald-600">
                        {team.points.toLocaleString()} pts
                      </div>
                      {team.id === competition.myTeam && (
                        <div className="mt-2 text-xs text-emerald-600 font-medium">
                          Your Team
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    Prize:{' '}
                    <span className="font-medium text-yellow-600">
                      {competition.prize}
                    </span>
                  </div>
                  <div className="text-sm text-gray-500">
                    {new Date(competition.startDate).toLocaleDateString()} -{' '}
                    {new Date(competition.endDate).toLocaleDateString()}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </Container>
    </div>
  )
}

export default EmployeeWellnessGamification
