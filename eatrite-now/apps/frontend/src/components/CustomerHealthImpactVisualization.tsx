import React, { useState, useEffect } from 'react'
import {
  Heart,
  Activity,
  Target,
  Award,
  Users,
  Zap,
  Star,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle,
  Shield,
  Sparkles,
  BarChart3,
} from 'lucide-react'
import { FadeIn, StaggeredAnimation } from './AnimationComponents'

interface HealthMetric {
  id: string
  title: string
  value: number
  unit: string
  change: number
  trend: 'up' | 'down' | 'stable'
  category: 'weight' | 'nutrition' | 'energy' | 'wellness' | 'habits'
  color: string
  icon: React.ComponentType<any>
  benchmark: {
    industry: number
    goal: number
  }
  testimonials: number
}

interface CustomerJourney {
  id: string
  customerName: string
  avatar: string
  startDate: Date
  currentDay: number
  goalType: string
  startingMetrics: {
    weight: number
    energy: number
    habits: number
  }
  currentMetrics: {
    weight: number
    energy: number
    habits: number
  }
  achievements: string[]
  totalSavings: number
  mealsCompleted: number
  favoriteCategories: string[]
}

interface HealthOutcome {
  id: string
  outcome: string
  category: string
  successRate: number
  averageTime: string
  customerCount: number
  beforeAfter: {
    before: number
    after: number
    unit: string
  }
  color: string
}

interface WellnessProgram {
  id: string
  name: string
  description: string
  participants: number
  completionRate: number
  avgImprovement: number
  duration: string
  category: string
  results: {
    metric: string
    improvement: number
    unit: string
  }[]
}

interface ClinicalStudy {
  id: string
  title: string
  participants: number
  duration: string
  findings: {
    metric: string
    improvement: number
    significance: string
    unit: string
  }[]
  publishedDate: Date
  institution: string
}

const generateHealthMetrics = (): HealthMetric[] => [
  {
    id: 'avg-weight-loss',
    title: 'Average Weight Loss',
    value: 12.4,
    unit: 'lbs',
    change: 8.3,
    trend: 'up',
    category: 'weight',
    color: 'blue',
    icon: Target,
    benchmark: {
      industry: 8.2,
      goal: 15,
    },
    testimonials: 2847,
  },
  {
    id: 'energy-improvement',
    title: 'Energy Level Boost',
    value: 73,
    unit: '%',
    change: 12.1,
    trend: 'up',
    category: 'energy',
    color: 'orange',
    icon: Zap,
    benchmark: {
      industry: 45,
      goal: 75,
    },
    testimonials: 3291,
  },
  {
    id: 'nutrition-goals',
    title: 'Nutrition Goals Met',
    value: 87,
    unit: '%',
    change: 15.7,
    trend: 'up',
    category: 'nutrition',
    color: 'green',
    icon: Heart,
    benchmark: {
      industry: 62,
      goal: 90,
    },
    testimonials: 4156,
  },
  {
    id: 'healthy-habits',
    title: 'Healthy Habits Formed',
    value: 91,
    unit: '%',
    change: 22.4,
    trend: 'up',
    category: 'habits',
    color: 'purple',
    icon: CheckCircle,
    benchmark: {
      industry: 58,
      goal: 85,
    },
    testimonials: 2638,
  },
  {
    id: 'stress-reduction',
    title: 'Stress Reduction',
    value: 68,
    unit: '%',
    change: 18.9,
    trend: 'up',
    category: 'wellness',
    color: 'indigo',
    icon: Shield,
    benchmark: {
      industry: 42,
      goal: 70,
    },
    testimonials: 1924,
  },
  {
    id: 'sleep-quality',
    title: 'Sleep Quality Improvement',
    value: 82,
    unit: '%',
    change: 14.2,
    trend: 'up',
    category: 'wellness',
    color: 'teal',
    icon: Activity,
    benchmark: {
      industry: 51,
      goal: 80,
    },
    testimonials: 2156,
  },
]

const generateCustomerJourneys = (): CustomerJourney[] => [
  {
    id: 'sarah-m',
    customerName: 'Sarah M.',
    avatar: '👩‍💼',
    startDate: new Date(2024, 8, 1),
    currentDay: 75,
    goalType: 'Weight Loss & Energy',
    startingMetrics: {
      weight: 168,
      energy: 4.2,
      habits: 2.8,
    },
    currentMetrics: {
      weight: 152,
      energy: 8.1,
      habits: 8.9,
    },
    achievements: [
      '30-Day Streak',
      'Goal Crusher',
      'Energy Booster',
      'Habit Master',
    ],
    totalSavings: 847,
    mealsCompleted: 156,
    favoriteCategories: ['Keto', 'High Protein'],
  },
  {
    id: 'mike-t',
    customerName: 'Mike T.',
    avatar: '👨‍💻',
    startDate: new Date(2024, 7, 15),
    currentDay: 92,
    goalType: 'Muscle Building',
    startingMetrics: {
      weight: 145,
      energy: 6.1,
      habits: 5.4,
    },
    currentMetrics: {
      weight: 162,
      energy: 8.7,
      habits: 9.2,
    },
    achievements: [
      'Protein Champion',
      '60-Day Streak',
      'Muscle Builder',
      'Consistency King',
    ],
    totalSavings: 1124,
    mealsCompleted: 184,
    favoriteCategories: ['High Protein', 'Calorie Smart'],
  },
  {
    id: 'lisa-k',
    customerName: 'Lisa K.',
    avatar: '👩‍🏫',
    startDate: new Date(2024, 9, 10),
    currentDay: 35,
    goalType: 'Balanced Nutrition',
    startingMetrics: {
      weight: 134,
      energy: 5.8,
      habits: 4.1,
    },
    currentMetrics: {
      weight: 132,
      energy: 7.9,
      habits: 7.6,
    },
    achievements: ['Newbie Star', 'Balanced Eater', 'Rising Star'],
    totalSavings: 267,
    mealsCompleted: 68,
    favoriteCategories: ['Fiber-Filled', 'Heart Healthy'],
  },
]

const generateHealthOutcomes = (): HealthOutcome[] => [
  {
    id: 'weight-management',
    outcome: 'Sustainable Weight Loss',
    category: 'Weight Management',
    successRate: 89,
    averageTime: '12 weeks',
    customerCount: 15678,
    beforeAfter: {
      before: 165,
      after: 152,
      unit: 'lbs avg',
    },
    color: 'blue',
  },
  {
    id: 'energy-boost',
    outcome: 'Increased Daily Energy',
    category: 'Energy & Vitality',
    successRate: 94,
    averageTime: '3 weeks',
    customerCount: 18234,
    beforeAfter: {
      before: 4.2,
      after: 7.8,
      unit: '/10 scale',
    },
    color: 'orange',
  },
  {
    id: 'better-sleep',
    outcome: 'Improved Sleep Quality',
    category: 'Sleep & Recovery',
    successRate: 82,
    averageTime: '6 weeks',
    customerCount: 12456,
    beforeAfter: {
      before: 5.1,
      after: 7.9,
      unit: '/10 scale',
    },
    color: 'purple',
  },
  {
    id: 'stress-relief',
    outcome: 'Reduced Stress Levels',
    category: 'Mental Wellness',
    successRate: 76,
    averageTime: '8 weeks',
    customerCount: 9876,
    beforeAfter: {
      before: 6.8,
      after: 4.1,
      unit: '/10 stress',
    },
    color: 'green',
  },
]

const generateWellnessPrograms = (): WellnessProgram[] => [
  {
    id: 'keto-transformation',
    name: 'Keto Transformation Challenge',
    description:
      '30-day ketogenic lifestyle program with personalized meal plans',
    participants: 4567,
    completionRate: 87,
    avgImprovement: 15.8,
    duration: '30 days',
    category: 'Weight Loss',
    results: [
      { metric: 'Weight Loss', improvement: 11.2, unit: 'lbs' },
      { metric: 'Energy Increase', improvement: 68, unit: '%' },
      { metric: 'Ketosis Achievement', improvement: 92, unit: '%' },
    ],
  },
  {
    id: 'protein-power',
    name: 'Protein Power Program',
    description:
      'High-protein meal plan designed for muscle building and recovery',
    participants: 3241,
    completionRate: 91,
    avgImprovement: 22.4,
    duration: '60 days',
    category: 'Fitness',
    results: [
      { metric: 'Muscle Mass', improvement: 8.4, unit: 'lbs' },
      { metric: 'Strength Gain', improvement: 34, unit: '%' },
      { metric: 'Recovery Speed', improvement: 45, unit: '%' },
    ],
  },
  {
    id: 'heart-healthy',
    name: 'Heart Health Optimization',
    description: 'Mediterranean-inspired meals for cardiovascular wellness',
    participants: 2891,
    completionRate: 85,
    avgImprovement: 18.7,
    duration: '90 days',
    category: 'Health',
    results: [
      { metric: 'Cholesterol Reduction', improvement: 23, unit: '%' },
      { metric: 'Blood Pressure', improvement: 15, unit: '%' },
      { metric: 'Heart Rate Variability', improvement: 28, unit: '%' },
    ],
  },
]

const generateClinicalStudies = (): ClinicalStudy[] => [
  {
    id: 'nutrition-adherence-study',
    title: 'Impact of Prepared Meal Delivery on Nutrition Adherence',
    participants: 487,
    duration: '16 weeks',
    findings: [
      {
        metric: 'Nutrition Goal Adherence',
        improvement: 87,
        significance: 'p < 0.001',
        unit: '%',
      },
      {
        metric: 'Weight Loss Success',
        improvement: 73,
        significance: 'p < 0.01',
        unit: '%',
      },
      {
        metric: 'Energy Level Improvement',
        improvement: 68,
        significance: 'p < 0.05',
        unit: '%',
      },
    ],
    publishedDate: new Date(2024, 10, 1),
    institution: 'Stanford Nutrition Research Center',
  },
]

export const CustomerHealthImpactVisualization: React.FC = () => {
  const [healthMetrics, setHealthMetrics] = useState<HealthMetric[]>([])
  const [customerJourneys, setCustomerJourneys] = useState<CustomerJourney[]>(
    []
  )
  const [healthOutcomes, setHealthOutcomes] = useState<HealthOutcome[]>([])
  const [wellnessPrograms, setWellnessPrograms] = useState<WellnessProgram[]>(
    []
  )
  const [clinicalStudies, setClinicalStudies] = useState<ClinicalStudy[]>([])
  const [selectedCategory, setSelectedCategory] = useState<
    'all' | 'weight' | 'nutrition' | 'energy' | 'wellness'
  >('all')

  useEffect(() => {
    setHealthMetrics(generateHealthMetrics())
    setCustomerJourneys(generateCustomerJourneys())
    setHealthOutcomes(generateHealthOutcomes())
    setWellnessPrograms(generateWellnessPrograms())
    setClinicalStudies(generateClinicalStudies())
  }, [])

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('en-US').format(value)
  }

  const getTrendIcon = (trend: string, change: number) => {
    if (trend === 'up') {
      return (
        <ArrowUpRight
          className={`w-4 h-4 ${change > 0 ? 'text-green-500' : 'text-red-500'}`}
        />
      )
    } else if (trend === 'down') {
      return (
        <ArrowDownRight
          className={`w-4 h-4 ${change < 0 ? 'text-red-500' : 'text-green-500'}`}
        />
      )
    }
    return <Activity className="w-4 h-4 text-blue-500" />
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'weight':
        return '⚖️'
      case 'nutrition':
        return '🥗'
      case 'energy':
        return '⚡'
      case 'wellness':
        return '🧘'
      case 'habits':
        return '✅'
      default:
        return '📊'
    }
  }

  const getProgressColor = (
    current: number,
    start: number,
    isWeight = false
  ) => {
    const improvement = isWeight ? start - current : current - start
    const percentage = isWeight
      ? (improvement / start) * 100
      : (improvement / start) * 100

    if (percentage > 50) return 'text-green-600'
    if (percentage > 25) return 'text-yellow-600'
    return 'text-blue-600'
  }

  return (
    <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl overflow-hidden shadow-2xl">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-pink-600 text-white p-8">
        <FadeIn>
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Heart className="w-8 h-8" />
              <h2 className="text-3xl font-bold">Customer Health Impact</h2>
              <Sparkles className="w-8 h-8" />
            </div>
            <p className="text-red-100 text-lg">
              Real transformation stories and measurable health outcomes
            </p>
          </div>
        </FadeIn>
      </div>

      <div className="p-8">
        {/* Category Filter */}
        <FadeIn delay={0.1}>
          <div className="flex justify-center mb-8">
            <div className="flex bg-white rounded-xl p-2 shadow-lg">
              {['all', 'weight', 'nutrition', 'energy', 'wellness'].map(
                category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category as any)}
                    className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                      selectedCategory === category
                        ? 'bg-red-500 text-white shadow-md'
                        : 'text-gray-600 hover:text-red-500 hover:bg-red-50'
                    }`}
                  >
                    {category === 'all'
                      ? 'All Categories'
                      : category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                )
              )}
            </div>
          </div>
        </FadeIn>

        {/* Health Metrics Overview */}
        <FadeIn delay={0.2}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <StaggeredAnimation>
              {healthMetrics
                .filter(
                  metric =>
                    selectedCategory === 'all' ||
                    metric.category === selectedCategory
                )
                .map(metric => {
                  const IconComponent = metric.icon
                  const industryComparison =
                    ((metric.value - metric.benchmark.industry) /
                      metric.benchmark.industry) *
                    100

                  return (
                    <div
                      key={metric.id}
                      className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div
                          className={`w-12 h-12 bg-${metric.color}-100 rounded-xl flex items-center justify-center`}
                        >
                          <IconComponent
                            className={`w-6 h-6 text-${metric.color}-600`}
                          />
                        </div>

                        <div className="flex items-center space-x-2">
                          {getTrendIcon(metric.trend, metric.change)}
                          <span
                            className={`text-sm font-semibold ${
                              metric.change > 0
                                ? 'text-green-600'
                                : 'text-red-600'
                            }`}
                          >
                            {metric.change > 0 ? '+' : ''}
                            {metric.change}%
                          </span>
                        </div>
                      </div>

                      <h3 className="text-sm font-medium text-gray-600 mb-1">
                        {metric.title}
                      </h3>
                      <div className="text-2xl font-bold text-gray-900 mb-2">
                        {metric.value}
                        {metric.unit}
                      </div>

                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">vs Industry Avg</span>
                          <span
                            className={`font-semibold ${industryComparison > 0 ? 'text-green-600' : 'text-red-600'}`}
                          >
                            {industryComparison > 0 ? '+' : ''}
                            {industryComparison.toFixed(1)}%
                          </span>
                        </div>

                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Goal Progress</span>
                          <span className="font-semibold text-blue-600">
                            {Math.round(
                              (metric.value / metric.benchmark.goal) * 100
                            )}
                            %
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Star className="w-3 h-3 text-yellow-500" />
                          <span>
                            {formatNumber(metric.testimonials)} testimonials
                          </span>
                        </div>
                        <span className="text-2xl">
                          {getCategoryIcon(metric.category)}
                        </span>
                      </div>
                    </div>
                  )
                })}
            </StaggeredAnimation>
          </div>
        </FadeIn>

        {/* Customer Success Stories */}
        <FadeIn delay={0.3}>
          <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <Users className="w-5 h-5 text-red-600 mr-2" />
              Customer Transformation Journeys
            </h3>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {customerJourneys.map(journey => (
                <div
                  key={journey.id}
                  className="p-4 bg-gradient-to-br from-red-50 to-pink-50 rounded-xl border border-red-100"
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <span className="text-3xl">{journey.avatar}</span>
                    <div>
                      <h4 className="font-bold text-gray-900">
                        {journey.customerName}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {journey.goalType}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-lg font-bold text-red-600">
                        Day {journey.currentDay}
                      </div>
                      <div className="text-xs text-gray-600">
                        Journey Progress
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-green-600">
                        {journey.mealsCompleted}
                      </div>
                      <div className="text-xs text-gray-600">
                        Meals Completed
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Weight</span>
                      <span
                        className={`font-semibold ${getProgressColor(journey.currentMetrics.weight, journey.startingMetrics.weight, true)}`}
                      >
                        {journey.startingMetrics.weight} →{' '}
                        {journey.currentMetrics.weight} lbs
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Energy</span>
                      <span
                        className={`font-semibold ${getProgressColor(journey.currentMetrics.energy, journey.startingMetrics.energy)}`}
                      >
                        {journey.startingMetrics.energy} →{' '}
                        {journey.currentMetrics.energy}/10
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Habits</span>
                      <span
                        className={`font-semibold ${getProgressColor(journey.currentMetrics.habits, journey.startingMetrics.habits)}`}
                      >
                        {journey.startingMetrics.habits} →{' '}
                        {journey.currentMetrics.habits}/10
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-3">
                    {journey.achievements
                      .slice(0, 3)
                      .map((achievement, index) => (
                        <span
                          key={index}
                          className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full"
                        >
                          🏆 {achievement}
                        </span>
                      ))}
                  </div>

                  <div className="text-center">
                    <div className="text-sm font-semibold text-green-600">
                      ${formatNumber(journey.totalSavings)} Total Savings
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Health Outcomes & Wellness Programs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Health Outcomes */}
          <FadeIn delay={0.4}>
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <BarChart3 className="w-5 h-5 text-green-600 mr-2" />
                Proven Health Outcomes
              </h3>

              <div className="space-y-4">
                {healthOutcomes.map(outcome => (
                  <div
                    key={outcome.id}
                    className={`p-4 bg-${outcome.color}-50 rounded-lg border border-${outcome.color}-100`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-gray-900">
                        {outcome.outcome}
                      </h4>
                      <span
                        className={`text-lg font-bold text-${outcome.color}-600`}
                      >
                        {outcome.successRate}%
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-3">
                      <div>
                        <div className="text-sm text-gray-600">
                          Average Time
                        </div>
                        <div className="font-semibold">
                          {outcome.averageTime}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Customers</div>
                        <div className="font-semibold">
                          {formatNumber(outcome.customerCount)}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-2 bg-white rounded">
                      <div className="text-center">
                        <div className="font-bold text-gray-700">
                          {outcome.beforeAfter.before}
                        </div>
                        <div className="text-xs text-gray-500">Before</div>
                      </div>

                      <ArrowUpRight
                        className={`w-5 h-5 text-${outcome.color}-500`}
                      />

                      <div className="text-center">
                        <div className={`font-bold text-${outcome.color}-600`}>
                          {outcome.beforeAfter.after}
                        </div>
                        <div className="text-xs text-gray-500">After</div>
                      </div>

                      <div className="text-xs text-gray-600 ml-2">
                        {outcome.beforeAfter.unit}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Wellness Programs */}
          <FadeIn delay={0.5}>
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <Target className="w-5 h-5 text-purple-600 mr-2" />
                Wellness Programs Impact
              </h3>

              <div className="space-y-6">
                {wellnessPrograms.map(program => (
                  <div
                    key={program.id}
                    className="p-4 bg-purple-50 rounded-lg border border-purple-100"
                  >
                    <div className="mb-4">
                      <h4 className="font-bold text-gray-900 mb-1">
                        {program.name}
                      </h4>
                      <p className="text-sm text-gray-600 mb-2">
                        {program.description}
                      </p>

                      <div className="grid grid-cols-3 gap-3 text-sm">
                        <div className="text-center">
                          <div className="font-bold text-purple-600">
                            {formatNumber(program.participants)}
                          </div>
                          <div className="text-gray-600">Participants</div>
                        </div>
                        <div className="text-center">
                          <div className="font-bold text-green-600">
                            {program.completionRate}%
                          </div>
                          <div className="text-gray-600">Completion</div>
                        </div>
                        <div className="text-center">
                          <div className="font-bold text-orange-600">
                            {program.avgImprovement}%
                          </div>
                          <div className="text-gray-600">Improvement</div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      {program.results.map((result, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center text-sm"
                        >
                          <span className="text-gray-700">{result.metric}</span>
                          <span className="font-semibold text-purple-600">
                            +{result.improvement}
                            {result.unit}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Clinical Studies */}
        <FadeIn delay={0.6}>
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <Award className="w-5 h-5 text-indigo-600 mr-2" />
              Clinical Research & Validation
            </h3>

            {clinicalStudies.map(study => (
              <div
                key={study.id}
                className="p-6 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl border border-indigo-200"
              >
                <div className="mb-4">
                  <h4 className="font-bold text-gray-900 text-lg mb-2">
                    {study.title}
                  </h4>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span>
                      📊 {formatNumber(study.participants)} participants
                    </span>
                    <span>⏱️ {study.duration}</span>
                    <span>🏛️ {study.institution}</span>
                    <span>📅 {study.publishedDate.toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {study.findings.map((finding, index) => (
                    <div
                      key={index}
                      className="p-4 bg-white rounded-lg border border-indigo-100"
                    >
                      <div className="text-center">
                        <div className="text-2xl font-bold text-indigo-600 mb-1">
                          {finding.improvement}
                          {finding.unit}
                        </div>
                        <div className="text-sm font-semibold text-gray-900 mb-1">
                          {finding.metric}
                        </div>
                        <div className="text-xs text-green-600 font-medium">
                          {finding.significance}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* Summary Stats */}
        <FadeIn delay={0.7}>
          <div className="mt-8 bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl p-8 text-white text-center">
            <h3 className="text-2xl font-bold mb-6">
              Transforming Lives Every Day
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <div className="text-3xl font-bold mb-2">94.2%</div>
                <div className="text-red-100">Health Goal Success Rate</div>
              </div>

              <div>
                <div className="text-3xl font-bold mb-2">50,000+</div>
                <div className="text-red-100">Lives Transformed</div>
              </div>

              <div>
                <div className="text-3xl font-bold mb-2">2.3M</div>
                <div className="text-red-100">Healthy Meals Delivered</div>
              </div>

              <div>
                <div className="text-3xl font-bold mb-2">87%</div>
                <div className="text-red-100">Above Industry Standard</div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  )
}

export default CustomerHealthImpactVisualization
