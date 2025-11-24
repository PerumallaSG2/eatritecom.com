import React, { useState, useMemo } from 'react'
import { 
  BarChart3, 
  TrendingUp, 
  Target, 
  Award, 
  Calendar, 
  Download, 
  Share2,
  RefreshCw,
  Filter,
  Eye,
  Heart,
  Activity,
  Zap
} from 'lucide-react'
import { useAnalytics } from '../context/AnalyticsContext'
import { useThemeColors } from '../context/ThemeContext'
import { FadeIn, SlideIn } from './LoadingStates'

interface MetricCardProps {
  title: string
  value: string | number
  change?: number
  changeLabel?: string
  icon: React.ReactNode
  color: string
  onClick?: () => void
}

const MetricCard: React.FC<MetricCardProps> = ({ 
  title, 
  value, 
  change, 
  changeLabel, 
  icon, 
  color,
  onClick 
}) => {
  return (
    <FadeIn>
      <div 
        className={`bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 ${
          onClick ? 'cursor-pointer hover:shadow-md transition-shadow' : ''
        }`}
        onClick={onClick}
      >
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 rounded-lg`} style={{ backgroundColor: `${color}20` }}>
            <div style={{ color }}>{icon}</div>
          </div>
          {change !== undefined && (
            <div className={`flex items-center gap-1 text-sm ${
              change >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
            }`}>
              <TrendingUp className={`w-4 h-4 ${change < 0 ? 'rotate-180' : ''}`} />
              <span>{Math.abs(change)}%</span>
            </div>
          )}
        </div>
        
        <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
          {value}
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-400">
          {title}
        </div>
        {changeLabel && (
          <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
            {changeLabel}
          </div>
        )}
      </div>
    </FadeIn>
  )
}

interface ProgressRingProps {
  progress: number
  size?: number
  strokeWidth?: number
  color?: string
  children?: React.ReactNode
}

const ProgressRing: React.FC<ProgressRingProps> = ({ 
  progress, 
  size = 120, 
  strokeWidth = 8, 
  color = '#10B981',
  children 
}) => {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const strokeDasharray = `${circumference} ${circumference}`
  const strokeDashoffset = circumference - (progress * circumference)
  
  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#E5E7EB"
          strokeWidth={strokeWidth}
          fill="transparent"
          className="dark:stroke-gray-600"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-500 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        {children}
      </div>
    </div>
  )
}

interface ChartDataPoint {
  label: string
  value: number
  color?: string
}

interface SimpleBarChartProps {
  data: ChartDataPoint[]
  height?: number
  color?: string
}

const SimpleBarChart: React.FC<SimpleBarChartProps> = ({ 
  data, 
  height = 200, 
  color = '#10B981' 
}) => {
  const maxValue = Math.max(...data.map(d => d.value))
  
  return (
    <div className="space-y-3">
      <div className="flex items-end justify-between gap-2" style={{ height }}>
        {data.map((item, index) => (
          <div key={index} className="flex-1 flex flex-col items-center">
            <div 
              className="w-full bg-gray-200 dark:bg-gray-700 rounded-t flex items-end justify-center relative group cursor-pointer transition-all hover:opacity-80"
              style={{ 
                height: `${(item.value / maxValue) * height * 0.8}px`,
                backgroundColor: item.color || color,
                minHeight: '4px'
              }}
            >
              {/* Tooltip */}
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {item.value}
              </div>
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400 mt-2 text-center truncate w-full">
              {item.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export const AnalyticsDashboard: React.FC = () => {
  const { 
    userBehavior, 
    healthGoals, 
    recommendations, 
    generateBehaviorInsights,
    getAnalyticsSummary,
    exportUserData,
    generateWeeklyReport,
    trackEvent
  } = useAnalytics()
  
  const colors = useThemeColors()
  const [activeTab, setActiveTab] = useState<'overview' | 'nutrition' | 'goals' | 'insights'>('overview')
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('week')
  
  const insights = useMemo(() => generateBehaviorInsights(), [generateBehaviorInsights])
  const summary = useMemo(() => getAnalyticsSummary(), [getAnalyticsSummary])
  
  const handleExportData = async () => {
    trackEvent('feature_used', { feature: 'export_data' })
    const blob = await exportUserData()
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `eatrite-data-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }
  
  const handleGenerateReport = async () => {
    trackEvent('feature_used', { feature: 'weekly_report' })
    const report = await generateWeeklyReport()
    const blob = new Blob([report], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `weekly-report-${new Date().toISOString().split('T')[0]}.md`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }
  
  if (!userBehavior) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Activity className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Building Your Analytics
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Start using EatRite to see your personalized insights
          </p>
        </div>
      </div>
    )
  }
  
  const nutritionData = [
    { label: 'Calories', value: userBehavior.healthMetrics.monthlyTrends.calories.slice(-7).reduce((a, b) => a + b, 0) / 7, color: colors.primary },
    { label: 'Protein', value: userBehavior.healthMetrics.monthlyTrends.protein.slice(-7).reduce((a, b) => a + b, 0) / 7, color: '#F59E0B' },
    { label: 'Carbs', value: userBehavior.healthMetrics.monthlyTrends.carbs.slice(-7).reduce((a, b) => a + b, 0) / 7, color: '#EF4444' },
    { label: 'Fat', value: userBehavior.healthMetrics.monthlyTrends.fat.slice(-7).reduce((a, b) => a + b, 0) / 7, color: '#8B5CF6' }
  ]
  
  const engagementData = [
    { label: 'Mon', value: 85 },
    { label: 'Tue', value: 92 },
    { label: 'Wed', value: 78 },
    { label: 'Thu', value: 95 },
    { label: 'Fri', value: 88 },
    { label: 'Sat', value: 91 },
    { label: 'Sun', value: 89 }
  ]
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Analytics Dashboard
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Track your nutrition journey and health insights
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              {/* Time Range Selector */}
              <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                {(['week', 'month', 'year'] as const).map((range) => (
                  <button
                    key={range}
                    onClick={() => setTimeRange(range)}
                    className={`px-3 py-1 text-sm font-medium rounded-md transition-colors capitalize ${
                      timeRange === range
                        ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
              
              {/* Action Buttons */}
              <button
                onClick={handleGenerateReport}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Download className="w-4 h-4" />
                Report
              </button>
              
              <button
                onClick={handleExportData}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <Share2 className="w-4 h-4" />
                Export
              </button>
            </div>
          </div>
          
          {/* Tab Navigation */}
          <div className="flex space-x-8 border-b border-gray-200 dark:border-gray-700">
            {[
              { key: 'overview', label: 'Overview', icon: BarChart3 },
              { key: 'nutrition', label: 'Nutrition', icon: Activity },
              { key: 'goals', label: 'Goals', icon: Target },
              { key: 'insights', label: 'Insights', icon: Zap }
            ].map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.key}
                  onClick={() => {
                    setActiveTab(tab.key as any)
                    trackEvent('feature_used', { feature: `analytics_tab_${tab.key}` })
                  }}
                  className={`flex items-center gap-2 py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.key
                      ? 'border-green-500 text-green-600 dark:text-green-400'
                      : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              )
            })}
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <MetricCard
                title="Current Streak"
                value={`${userBehavior.healthMetrics.currentStreak} days`}
                change={15}
                changeLabel="vs last week"
                icon={<Award className="w-6 h-6" />}
                color={colors.primary}
              />
              <MetricCard
                title="Weekly Goal Achievement"
                value={`${Math.round(userBehavior.healthMetrics.weeklyProgress.slice(-1)[0])}%`}
                change={5}
                changeLabel="vs last week"
                icon={<Target className="w-6 h-6" />}
                color="#F59E0B"
              />
              <MetricCard
                title="Active Goals"
                value={healthGoals.filter(g => g.isActive).length}
                icon={<TrendingUp className="w-6 h-6" />}
                color="#EF4444"
              />
              <MetricCard
                title="Avg Session Time"
                value={`${summary.averageSessionTime}min`}
                change={8}
                changeLabel="vs last week"
                icon={<Eye className="w-6 h-6" />}
                color="#8B5CF6"
              />
            </div>
            
            {/* Charts Row */}
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Weekly Progress */}
              <SlideIn direction="left" className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Weekly Progress
                  </h3>
                  <Filter className="w-5 h-5 text-gray-400" />
                </div>
                <SimpleBarChart data={engagementData} color={colors.primary} />
              </SlideIn>
              
              {/* Nutrition Breakdown */}
              <SlideIn direction="right" className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Average Daily Nutrition
                  </h3>
                  <RefreshCw className="w-5 h-5 text-gray-400" />
                </div>
                <SimpleBarChart data={nutritionData} height={160} />
              </SlideIn>
            </div>
          </div>
        )}
        
        {/* Nutrition Tab */}
        {activeTab === 'nutrition' && (
          <div className="space-y-8">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Calorie Goal Progress */}
              <FadeIn className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 text-center">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                  Daily Calorie Goal
                </h3>
                <ProgressRing 
                  progress={0.85} 
                  color={colors.primary}
                  size={140}
                >
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      85%
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      1,700 / 2,000 cal
                    </div>
                  </div>
                </ProgressRing>
              </FadeIn>
              
              {/* Protein Goal Progress */}
              <FadeIn className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 text-center" delay={100}>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                  Protein Goal
                </h3>
                <ProgressRing 
                  progress={0.92} 
                  color="#F59E0B"
                  size={140}
                >
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      92%
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      110 / 120g
                    </div>
                  </div>
                </ProgressRing>
              </FadeIn>
              
              {/* Macro Balance */}
              <FadeIn className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700" delay={200}>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                  Macro Balance
                </h3>
                <div className="space-y-4">
                  {[
                    { label: 'Carbs', value: 45, color: '#EF4444' },
                    { label: 'Protein', value: 30, color: '#F59E0B' },
                    { label: 'Fat', value: 25, color: '#8B5CF6' }
                  ].map((macro) => (
                    <div key={macro.label} className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {macro.label}
                      </span>
                      <div className="flex items-center gap-3">
                        <div className="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div 
                            className="h-2 rounded-full"
                            style={{ 
                              width: `${macro.value}%`,
                              backgroundColor: macro.color 
                            }}
                          />
                        </div>
                        <span className="text-sm text-gray-600 dark:text-gray-400 w-8">
                          {macro.value}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </FadeIn>
            </div>
          </div>
        )}
        
        {/* Goals Tab */}
        {activeTab === 'goals' && (
          <div className="space-y-6">
            {healthGoals.filter(g => g.isActive).map((goal, index) => (
              <SlideIn key={goal.id} direction="up" delay={index * 100}>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {goal.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {goal.description}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">
                        {(goal.progress * 100).toFixed(1)}%
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {goal.currentValue} / {goal.targetValue} {goal.unit}
                      </div>
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-4">
                    <div 
                      className="bg-green-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${goal.progress * 100}%` }}
                    />
                  </div>
                  
                  {/* Milestones */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {goal.milestones.map((milestone) => (
                      <div 
                        key={milestone.id}
                        className={`p-3 rounded-lg border ${
                          milestone.achieved 
                            ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700' 
                            : 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600'
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          {milestone.achieved ? (
                            <Award className="w-4 h-4 text-green-600 dark:text-green-400" />
                          ) : (
                            <Calendar className="w-4 h-4 text-gray-400" />
                          )}
                          <span className={`text-sm font-medium ${
                            milestone.achieved 
                              ? 'text-green-800 dark:text-green-300' 
                              : 'text-gray-700 dark:text-gray-300'
                          }`}>
                            {milestone.title}
                          </span>
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">
                          {milestone.targetValue} {goal.unit}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </SlideIn>
            ))}
          </div>
        )}
        
        {/* Insights Tab */}
        {activeTab === 'insights' && (
          <div className="space-y-6">
            {/* Recommendations */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Personalized Recommendations
              </h3>
              <div className="space-y-4">
                {recommendations.slice(0, 3).map((rec, index) => (
                  <SlideIn key={rec.id} direction="up" delay={index * 100}>
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-blue-900 dark:text-blue-300">
                          {rec.title}
                        </h4>
                        <span className="text-xs bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-full">
                          {Math.round(rec.confidence * 100)}% match
                        </span>
                      </div>
                      <p className="text-sm text-blue-800 dark:text-blue-400 mb-3">
                        {rec.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="text-xs text-blue-600 dark:text-blue-400">
                          {rec.reasoning[0]}
                        </div>
                        <button className="text-xs bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors">
                          Try Now
                        </button>
                      </div>
                    </div>
                  </SlideIn>
                ))}
              </div>
            </div>
            
            {/* Behavioral Insights */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Health Insights
              </h3>
              <div className="space-y-4">
                {insights.map((insight, index) => (
                  <SlideIn key={insight.id} direction="up" delay={index * 100}>
                    <div className={`p-4 rounded-lg border ${
                      insight.type === 'achievement' 
                        ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700'
                        : insight.type === 'warning'
                        ? 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-700'
                        : 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600'
                    }`}>
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-lg ${
                          insight.type === 'achievement' 
                            ? 'bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400'
                            : insight.type === 'warning'
                            ? 'bg-yellow-100 dark:bg-yellow-900/40 text-yellow-600 dark:text-yellow-400'
                            : 'bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-400'
                        }`}>
                          {insight.type === 'achievement' ? (
                            <Award className="w-4 h-4" />
                          ) : insight.type === 'warning' ? (
                            <Heart className="w-4 h-4" />
                          ) : (
                            <TrendingUp className="w-4 h-4" />
                          )}
                        </div>
                        <div className="flex-1">
                          <h4 className={`font-medium mb-1 ${
                            insight.type === 'achievement' 
                              ? 'text-green-900 dark:text-green-300'
                              : insight.type === 'warning'
                              ? 'text-yellow-900 dark:text-yellow-300'
                              : 'text-gray-900 dark:text-white'
                          }`}>
                            {insight.title}
                          </h4>
                          <p className={`text-sm ${
                            insight.type === 'achievement' 
                              ? 'text-green-800 dark:text-green-400'
                              : insight.type === 'warning'
                              ? 'text-yellow-800 dark:text-yellow-400'
                              : 'text-gray-600 dark:text-gray-300'
                          }`}>
                            {insight.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </SlideIn>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AnalyticsDashboard