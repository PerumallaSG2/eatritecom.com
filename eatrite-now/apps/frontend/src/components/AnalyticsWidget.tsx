import React from 'react'
import { Link } from 'react-router-dom'
import { TrendingUp, Target, Award, BarChart3, ArrowRight } from 'lucide-react'
import { useAnalytics } from '../context/AnalyticsContext'
import { useThemeColors } from '../context/ThemeContext'
import { FadeIn } from './LoadingStates'

interface AnalyticsWidgetProps {
  className?: string
  compact?: boolean
}

export const AnalyticsWidget: React.FC<AnalyticsWidgetProps> = ({ 
  className = '', 
  compact = false 
}) => {
  const { userBehavior, healthGoals, trackEvent } = useAnalytics()
  const colors = useThemeColors()
  
  if (!userBehavior) {
    return (
      <div className={`bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 ${className}`}>
        <div className="text-center">
          <BarChart3 className="w-8 h-8 text-gray-400 mx-auto mb-3" />
          <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-1">
            Start Your Journey
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Complete your first order to see analytics
          </p>
        </div>
      </div>
    )
  }
  
  const activeGoals = healthGoals.filter(g => g.isActive)
  const avgProgress = activeGoals.length > 0 
    ? activeGoals.reduce((acc, goal) => acc + goal.progress, 0) / activeGoals.length 
    : 0
  
  const handleViewAnalytics = () => {
    trackEvent('feature_used', { feature: 'analytics_widget_clicked' })
  }
  
  if (compact) {
    return (
      <FadeIn className={`bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 ${className}`}>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium text-gray-900 dark:text-white">
            Quick Stats
          </h3>
          <Link 
            to="/analytics"
            onClick={handleViewAnalytics}
            className="text-xs text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 flex items-center gap-1"
          >
            View All <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <div className="text-center">
            <div className="text-lg font-bold text-gray-900 dark:text-white">
              {userBehavior.healthMetrics.currentStreak}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Day Streak
            </div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-gray-900 dark:text-white">
              {Math.round(avgProgress * 100)}%
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Goal Progress
            </div>
          </div>
        </div>
      </FadeIn>
    )
  }
  
  return (
    <FadeIn className={`bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Your Progress
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Track your health journey
          </p>
        </div>
        <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
          <BarChart3 className="w-5 h-5 text-green-600 dark:text-green-400" />
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-4 mb-6">
        {/* Current Streak */}
        <div className="text-center">
          <div className="flex items-center justify-center w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-lg mb-2">
            <Award className="w-5 h-5 text-orange-600 dark:text-orange-400" />
          </div>
          <div className="text-xl font-bold text-gray-900 dark:text-white">
            {userBehavior.healthMetrics.currentStreak}
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400">
            Day Streak
          </div>
        </div>
        
        {/* Active Goals */}
        <div className="text-center">
          <div className="flex items-center justify-center w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg mb-2">
            <Target className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="text-xl font-bold text-gray-900 dark:text-white">
            {activeGoals.length}
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400">
            Active Goals
          </div>
        </div>
        
        {/* Weekly Progress */}
        <div className="text-center">
          <div className="flex items-center justify-center w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg mb-2">
            <TrendingUp className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          </div>
          <div className="text-xl font-bold text-gray-900 dark:text-white">
            {Math.round(userBehavior.healthMetrics.weeklyProgress.slice(-1)[0])}%
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400">
            This Week
          </div>
        </div>
      </div>
      
      {/* Progress Bars */}
      <div className="space-y-3 mb-6">
        <div>
          <div className="flex items-center justify-between text-sm mb-1">
            <span className="text-gray-700 dark:text-gray-300">Overall Goal Progress</span>
            <span className="text-gray-600 dark:text-gray-400">{Math.round(avgProgress * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div 
              className="h-2 rounded-full transition-all duration-500"
              style={{ 
                width: `${avgProgress * 100}%`,
                backgroundColor: colors.primary 
              }}
            />
          </div>
        </div>
        
        <div>
          <div className="flex items-center justify-between text-sm mb-1">
            <span className="text-gray-700 dark:text-gray-300">Weekly Achievement</span>
            <span className="text-gray-600 dark:text-gray-400">
              {Math.round(userBehavior.healthMetrics.weeklyProgress.slice(-1)[0])}%
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div 
              className="bg-green-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${userBehavior.healthMetrics.weeklyProgress.slice(-1)[0]}%` }}
            />
          </div>
        </div>
      </div>
      
      {/* Action Button */}
      <Link 
        to="/analytics"
        onClick={handleViewAnalytics}
        className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
      >
        <BarChart3 className="w-4 h-4" />
        View Full Analytics
        <ArrowRight className="w-4 h-4" />
      </Link>
    </FadeIn>
  )
}

// Mini analytics summary for mobile navigation or quick widgets
export const AnalyticsSummary: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { userBehavior, healthGoals } = useAnalytics()
  
  if (!userBehavior) return null
  
  const activeGoals = healthGoals.filter(g => g.isActive)
  const completedMilestones = activeGoals.reduce(
    (acc, goal) => acc + goal.milestones.filter(m => m.achieved).length, 
    0
  )
  
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <div className="flex items-center gap-1 text-xs">
        <Award className="w-3 h-3 text-orange-500" />
        <span className="text-gray-600 dark:text-gray-400">
          {userBehavior.healthMetrics.currentStreak}d streak
        </span>
      </div>
      
      <div className="flex items-center gap-1 text-xs">
        <Target className="w-3 h-3 text-blue-500" />
        <span className="text-gray-600 dark:text-gray-400">
          {completedMilestones} milestones
        </span>
      </div>
      
      <div className="flex items-center gap-1 text-xs">
        <TrendingUp className="w-3 h-3 text-green-500" />
        <span className="text-gray-600 dark:text-gray-400">
          {Math.round(userBehavior.healthMetrics.weeklyProgress.slice(-1)[0])}% this week
        </span>
      </div>
    </div>
  )
}

export default AnalyticsWidget