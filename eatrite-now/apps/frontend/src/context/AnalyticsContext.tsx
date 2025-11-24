import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

// Analytics Event Types
export type AnalyticsEventType = 
  | 'page_view'
  | 'meal_view'
  | 'meal_customize'
  | 'order_placed'
  | 'search_performed'
  | 'filter_applied'
  | 'preference_updated'
  | 'goal_set'
  | 'milestone_reached'
  | 'recommendation_clicked'
  | 'theme_changed'
  | 'feature_used'

export interface AnalyticsEvent {
  id: string
  type: AnalyticsEventType
  timestamp: Date
  userId?: string
  sessionId: string
  data: Record<string, any>
  page?: string
  userAgent?: string
  location?: {
    latitude?: number
    longitude?: number
    city?: string
    country?: string
  }
}

export interface UserBehaviorPattern {
  userId: string
  mealPreferences: {
    mostViewedCategories: string[]
    favoriteIngredients: string[]
    dietaryRestrictions: string[]
    avgOrderValue: number
    orderFrequency: number
    preferredOrderTimes: number[] // hours of day
  }
  healthMetrics: {
    calorieGoal: number
    proteinGoal: number
    currentStreak: number
    longestStreak: number
    weeklyProgress: number[]
    monthlyTrends: {
      calories: number[]
      protein: number[]
      carbs: number[]
      fat: number[]
    }
  }
  engagement: {
    sessionCount: number
    totalTimeSpent: number // minutes
    averageSessionDuration: number
    featuresUsed: string[]
    lastActiveDate: Date
    retentionScore: number
  }
}

export interface NutritionalInsight {
  id: string
  type: 'achievement' | 'suggestion' | 'trend' | 'warning'
  title: string
  description: string
  category: 'nutrition' | 'habits' | 'goals' | 'performance'
  priority: 'low' | 'medium' | 'high'
  actionable: boolean
  data?: Record<string, any>
  generatedAt: Date
}

export interface PersonalizedRecommendation {
  id: string
  type: 'meal' | 'plan' | 'goal' | 'habit'
  title: string
  description: string
  confidence: number // 0-1
  reasoning: string[]
  targetData: {
    mealId?: string
    planId?: string
    goalType?: string
    habitId?: string
  }
  metadata: {
    nutritionalFit: number
    preferenceMatch: number
    goalAlignment: number
    novelty: number
  }
  createdAt: Date
  expiresAt?: Date
}

export interface HealthGoal {
  id: string
  userId: string
  type: 'weight_loss' | 'weight_gain' | 'muscle_gain' | 'maintenance' | 'specific_nutrition'
  title: string
  description: string
  targetValue: number
  currentValue: number
  unit: string
  deadline?: Date
  isActive: boolean
  progress: number // 0-1
  milestones: {
    id: string
    title: string
    targetValue: number
    achieved: boolean
    achievedAt?: Date
  }[]
  createdAt: Date
  updatedAt: Date
}

interface AnalyticsContextType {
  // Event Tracking
  trackEvent: (type: AnalyticsEventType, data?: Record<string, any>) => void
  events: AnalyticsEvent[]
  
  // User Behavior
  userBehavior: UserBehaviorPattern | null
  generateBehaviorInsights: () => NutritionalInsight[]
  
  // Recommendations
  recommendations: PersonalizedRecommendation[]
  generateRecommendations: () => void
  markRecommendationUsed: (recommendationId: string) => void
  
  // Health Goals
  healthGoals: HealthGoal[]
  createHealthGoal: (goal: Omit<HealthGoal, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => void
  updateGoalProgress: (goalId: string, newValue: number) => void
  
  // Analytics Data
  getAnalyticsSummary: () => {
    totalEvents: number
    uniqueSessions: number
    averageSessionTime: number
    topFeatures: string[]
    growthMetrics: {
      dailyActiveUsers: number[]
      weeklyRetention: number
      monthlyGrowth: number
    }
  }
  
  // Export & Reports
  exportUserData: () => Promise<Blob>
  generateWeeklyReport: () => Promise<string>
}

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined)

// Sample data for demonstration
const sampleBehaviorPattern: UserBehaviorPattern = {
  userId: 'user-123',
  mealPreferences: {
    mostViewedCategories: ['Mediterranean', 'High-Protein', 'Vegetarian'],
    favoriteIngredients: ['chicken', 'quinoa', 'avocado', 'spinach'],
    dietaryRestrictions: ['gluten-free'],
    avgOrderValue: 18.50,
    orderFrequency: 4.2, // per week
    preferredOrderTimes: [12, 13, 19] // noon, 1pm, 7pm
  },
  healthMetrics: {
    calorieGoal: 2000,
    proteinGoal: 120,
    currentStreak: 7,
    longestStreak: 23,
    weeklyProgress: [85, 92, 78, 95, 88, 91, 89], // percentage of goals met
    monthlyTrends: {
      calories: [1950, 2020, 1980, 2100, 2050, 1975, 2025, 1985, 2030, 1995, 2010, 1990],
      protein: [115, 125, 118, 130, 122, 117, 128, 119, 126, 120, 124, 121],
      carbs: [180, 195, 175, 210, 200, 185, 205, 190, 198, 188, 192, 186],
      fat: [65, 70, 62, 75, 68, 64, 72, 66, 71, 67, 69, 63]
    }
  },
  engagement: {
    sessionCount: 156,
    totalTimeSpent: 2340, // minutes
    averageSessionDuration: 15, // minutes
    featuresUsed: ['meal_customization', 'nutrition_tracking', 'order_tracking', 'theme_switching'],
    lastActiveDate: new Date(),
    retentionScore: 0.85
  }
}

const sampleHealthGoals: HealthGoal[] = [
  {
    id: 'goal-1',
    userId: 'user-123',
    type: 'weight_loss',
    title: 'Lose 15 pounds',
    description: 'Healthy weight loss through balanced nutrition',
    targetValue: 15,
    currentValue: 8.5,
    unit: 'lbs',
    deadline: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 days
    isActive: true,
    progress: 0.57,
    milestones: [
      { id: 'ms-1', title: 'First 5 pounds', targetValue: 5, achieved: true, achievedAt: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000) },
      { id: 'ms-2', title: 'Halfway point', targetValue: 7.5, achieved: true, achievedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
      { id: 'ms-3', title: 'Final stretch', targetValue: 12, achieved: false },
      { id: 'ms-4', title: 'Goal achieved!', targetValue: 15, achieved: false }
    ],
    createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000),
    updatedAt: new Date()
  },
  {
    id: 'goal-2',
    userId: 'user-123',
    type: 'muscle_gain',
    title: 'Increase daily protein to 150g',
    description: 'Build lean muscle with adequate protein intake',
    targetValue: 150,
    currentValue: 125,
    unit: 'g',
    isActive: true,
    progress: 0.83,
    milestones: [
      { id: 'ms-5', title: 'Reach 130g daily', targetValue: 130, achieved: true, achievedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000) },
      { id: 'ms-6', title: 'Reach 140g daily', targetValue: 140, achieved: false },
      { id: 'ms-7', title: 'Final goal', targetValue: 150, achieved: false }
    ],
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    updatedAt: new Date()
  }
]

export const AnalyticsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [events, setEvents] = useState<AnalyticsEvent[]>([])
  const [userBehavior] = useState<UserBehaviorPattern | null>(sampleBehaviorPattern)
  const [recommendations, setRecommendations] = useState<PersonalizedRecommendation[]>([])
  const [healthGoals, setHealthGoals] = useState<HealthGoal[]>(sampleHealthGoals)
  const [sessionId] = useState(() => `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`)

  // Track events
  const trackEvent = (type: AnalyticsEventType, data: Record<string, any> = {}) => {
    const event: AnalyticsEvent = {
      id: `event-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type,
      timestamp: new Date(),
      sessionId,
      data,
      page: window.location.pathname,
      userAgent: navigator.userAgent
    }
    
    setEvents(prev => [event, ...prev.slice(0, 999)]) // Keep last 1000 events
  }

  // Generate behavioral insights
  const generateBehaviorInsights = (): NutritionalInsight[] => {
    if (!userBehavior) return []
    
    const insights: NutritionalInsight[] = []
    
    // Calorie trend analysis
    const recentCalories = userBehavior.healthMetrics.monthlyTrends.calories.slice(-7)
    const avgCalories = recentCalories.reduce((a, b) => a + b, 0) / recentCalories.length
    
    if (avgCalories < userBehavior.healthMetrics.calorieGoal * 0.9) {
      insights.push({
        id: 'insight-calories-low',
        type: 'warning',
        title: 'Calorie Intake Below Target',
        description: `Your recent average of ${Math.round(avgCalories)} calories is below your ${userBehavior.healthMetrics.calorieGoal} calorie goal.`,
        category: 'nutrition',
        priority: 'high',
        actionable: true,
        data: { avgCalories, goal: userBehavior.healthMetrics.calorieGoal },
        generatedAt: new Date()
      })
    }
    
    // Protein achievement
    const recentProtein = userBehavior.healthMetrics.monthlyTrends.protein.slice(-7)
    const avgProtein = recentProtein.reduce((a, b) => a + b, 0) / recentProtein.length
    
    if (avgProtein >= userBehavior.healthMetrics.proteinGoal) {
      insights.push({
        id: 'insight-protein-good',
        type: 'achievement',
        title: 'Excellent Protein Intake!',
        description: `You've been consistently meeting your protein goals with an average of ${Math.round(avgProtein)}g daily.`,
        category: 'nutrition',
        priority: 'medium',
        actionable: false,
        data: { avgProtein, goal: userBehavior.healthMetrics.proteinGoal },
        generatedAt: new Date()
      })
    }
    
    // Streak insights
    if (userBehavior.healthMetrics.currentStreak >= 7) {
      insights.push({
        id: 'insight-streak',
        type: 'achievement',
        title: 'Amazing Consistency!',
        description: `You're on a ${userBehavior.healthMetrics.currentStreak}-day streak of meeting your nutrition goals!`,
        category: 'habits',
        priority: 'high',
        actionable: false,
        data: { streak: userBehavior.healthMetrics.currentStreak },
        generatedAt: new Date()
      })
    }
    
    return insights
  }

  // Generate personalized recommendations
  const generateRecommendations = () => {
    if (!userBehavior) return
    
    const newRecommendations: PersonalizedRecommendation[] = []
    
    // Meal recommendation based on preferences
    if (userBehavior.mealPreferences.mostViewedCategories.includes('Mediterranean')) {
      newRecommendations.push({
        id: 'rec-med-bowl',
        type: 'meal',
        title: 'Try our New Mediterranean Quinoa Bowl',
        description: 'Based on your love for Mediterranean cuisine and quinoa',
        confidence: 0.89,
        reasoning: [
          'You frequently view Mediterranean meals',
          'Quinoa is one of your favorite ingredients',
          'Matches your dietary preferences'
        ],
        targetData: { mealId: 'mediterranean-quinoa-bowl' },
        metadata: {
          nutritionalFit: 0.92,
          preferenceMatch: 0.89,
          goalAlignment: 0.85,
          novelty: 0.65
        },
        createdAt: new Date(),
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      })
    }
    
    // Goal-based recommendation
    const activeWeightGoal = healthGoals.find(g => g.type === 'weight_loss' && g.isActive)
    if (activeWeightGoal && activeWeightGoal.progress > 0.5) {
      newRecommendations.push({
        id: 'rec-weight-plan',
        type: 'plan',
        title: 'Accelerate Your Weight Loss',
        description: 'You\'re doing great! Consider our advanced weight loss meal plan',
        confidence: 0.78,
        reasoning: [
          'You\'ve made excellent progress on your weight loss goal',
          'Advanced plan matches your commitment level',
          'Nutritionally optimized for faster results'
        ],
        targetData: { planId: 'advanced-weight-loss' },
        metadata: {
          nutritionalFit: 0.95,
          preferenceMatch: 0.72,
          goalAlignment: 0.94,
          novelty: 0.80
        },
        createdAt: new Date(),
        expiresAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)
      })
    }
    
    setRecommendations(prev => [...newRecommendations, ...prev.slice(0, 19)]) // Keep last 20
  }

  // Mark recommendation as used
  const markRecommendationUsed = (recommendationId: string) => {
    trackEvent('recommendation_clicked', { recommendationId })
    setRecommendations(prev => prev.filter(rec => rec.id !== recommendationId))
  }

  // Create health goal
  const createHealthGoal = (goalData: Omit<HealthGoal, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => {
    const newGoal: HealthGoal = {
      ...goalData,
      id: `goal-${Date.now()}`,
      userId: 'user-123',
      createdAt: new Date(),
      updatedAt: new Date()
    }
    
    setHealthGoals(prev => [newGoal, ...prev])
    trackEvent('goal_set', { goalType: goalData.type, targetValue: goalData.targetValue })
  }

  // Update goal progress
  const updateGoalProgress = (goalId: string, newValue: number) => {
    setHealthGoals(prev => prev.map(goal => {
      if (goal.id === goalId) {
        const progress = Math.min(1, newValue / goal.targetValue)
        const updatedGoal = {
          ...goal,
          currentValue: newValue,
          progress,
          updatedAt: new Date()
        }
        
        // Check for milestone achievements
        updatedGoal.milestones = goal.milestones.map(milestone => {
          if (!milestone.achieved && newValue >= milestone.targetValue) {
            trackEvent('milestone_reached', { goalId, milestoneId: milestone.id })
            return { ...milestone, achieved: true, achievedAt: new Date() }
          }
          return milestone
        })
        
        return updatedGoal
      }
      return goal
    }))
  }

  // Get analytics summary
  const getAnalyticsSummary = () => {
    const uniqueSessions = new Set(events.map(e => e.sessionId)).size
    const sessionDurations = events.reduce((acc, event) => {
      if (!acc[event.sessionId]) acc[event.sessionId] = { first: event.timestamp, last: event.timestamp }
      if (event.timestamp < acc[event.sessionId].first) acc[event.sessionId].first = event.timestamp
      if (event.timestamp > acc[event.sessionId].last) acc[event.sessionId].last = event.timestamp
      return acc
    }, {} as Record<string, { first: Date; last: Date }>)
    
    const totalSessionTime = Object.values(sessionDurations)
      .reduce((total, { first, last }) => total + (last.getTime() - first.getTime()), 0)
    
    const averageSessionTime = totalSessionTime / uniqueSessions / (1000 * 60) // minutes
    
    const featureUsage = events.reduce((acc, event) => {
      const feature = event.type
      acc[feature] = (acc[feature] || 0) + 1
      return acc
    }, {} as Record<string, number>)
    
    const topFeatures = Object.entries(featureUsage)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([feature]) => feature)
    
    return {
      totalEvents: events.length,
      uniqueSessions,
      averageSessionTime: Math.round(averageSessionTime),
      topFeatures,
      growthMetrics: {
        dailyActiveUsers: [45, 52, 48, 61, 58, 55, 67], // last 7 days
        weeklyRetention: 0.73,
        monthlyGrowth: 0.15
      }
    }
  }

  // Export user data
  const exportUserData = async (): Promise<Blob> => {
    const data = {
      userBehavior,
      events: events.slice(0, 100), // Last 100 events
      healthGoals,
      recommendations,
      exportDate: new Date().toISOString()
    }
    
    return new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  }

  // Generate weekly report
  const generateWeeklyReport = async (): Promise<string> => {
    const insights = generateBehaviorInsights()
    const summary = getAnalyticsSummary()
    
    return `
# Your Weekly EatRite Report

## Highlights
- ${summary.totalEvents} interactions this week
- ${summary.averageSessionTime} minutes average session time
- ${userBehavior?.healthMetrics.currentStreak || 0} day current streak

## Health Progress
${healthGoals.map(goal => 
  `- ${goal.title}: ${(goal.progress * 100).toFixed(1)}% complete`
).join('\n')}

## Key Insights
${insights.map(insight => 
  `- ${insight.title}: ${insight.description}`
).join('\n')}

## Recommendations
${recommendations.slice(0, 3).map(rec => 
  `- ${rec.title}: ${rec.description}`
).join('\n')}

Generated on ${new Date().toLocaleDateString()}
    `.trim()
  }

  // Auto-generate recommendations on behavior change
  useEffect(() => {
    if (userBehavior && events.length % 10 === 0) { // Every 10 events
      generateRecommendations()
    }
  }, [events.length, userBehavior])

  // Track page views automatically
  useEffect(() => {
    const handlePageView = () => {
      trackEvent('page_view', { path: window.location.pathname })
    }
    
    handlePageView() // Initial page view
    window.addEventListener('popstate', handlePageView)
    
    return () => window.removeEventListener('popstate', handlePageView)
  }, [])

  const value: AnalyticsContextType = {
    trackEvent,
    events,
    userBehavior,
    generateBehaviorInsights,
    recommendations,
    generateRecommendations,
    markRecommendationUsed,
    healthGoals,
    createHealthGoal,
    updateGoalProgress,
    getAnalyticsSummary,
    exportUserData,
    generateWeeklyReport
  }

  return (
    <AnalyticsContext.Provider value={value}>
      {children}
    </AnalyticsContext.Provider>
  )
}

export const useAnalytics = () => {
  const context = useContext(AnalyticsContext)
  if (context === undefined) {
    throw new Error('useAnalytics must be used within an AnalyticsProvider')
  }
  return context
}

export default AnalyticsProvider