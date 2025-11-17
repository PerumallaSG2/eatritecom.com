import React, { useState } from 'react'
import { Button, Card, Container } from '../components/ui/CoreComponents'

// Types for analytics data
interface KPIMetric {
  id: string
  title: string
  value: number | string
  change: number
  changeType: 'increase' | 'decrease' | 'neutral'
  icon: string
  format: 'number' | 'percentage' | 'currency' | 'days'
  target?: number
}

interface DepartmentData {
  id: string
  name: string
  employees: number
  participation: number
  wellnessScore: number
  avgMealsPerWeek: number
  satisfaction: number
  costPerEmployee: number
  savings: number
}

interface EngagementData {
  date: string
  activeUsers: number
  mealsOrdered: number
  challengeParticipation: number
  wellnessGoalsHit: number
}

interface WellnessImpact {
  category: string
  baseline: number
  current: number
  improvement: number
  unit: string
}

const CorporateAnalyticsDashboard: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<
    '7d' | '30d' | '90d' | '1y'
  >('30d')
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all')
  const [activeTab, setActiveTab] = useState<
    'overview' | 'engagement' | 'wellness' | 'financial' | 'reports'
  >('overview')

  // Mock KPI data
  const kpiMetrics: KPIMetric[] = [
    {
      id: 'participation',
      title: 'Employee Participation',
      value: 87,
      change: 12,
      changeType: 'increase',
      icon: '👥',
      format: 'percentage',
      target: 90,
    },
    {
      id: 'wellness_score',
      title: 'Average Wellness Score',
      value: 8.4,
      change: 0.8,
      changeType: 'increase',
      icon: '💚',
      format: 'number',
    },
    {
      id: 'cost_savings',
      title: 'Monthly Cost Savings',
      value: 45000,
      change: 15,
      changeType: 'increase',
      icon: '💰',
      format: 'currency',
    },
    {
      id: 'sick_days',
      title: 'Avg Sick Days Reduced',
      value: 2.3,
      change: -0.5,
      changeType: 'increase',
      icon: '🏥',
      format: 'days',
    },
    {
      id: 'satisfaction',
      title: 'Employee Satisfaction',
      value: 94,
      change: 8,
      changeType: 'increase',
      icon: '😊',
      format: 'percentage',
    },
    {
      id: 'roi',
      title: 'Return on Investment',
      value: 285,
      change: 45,
      changeType: 'increase',
      icon: '📈',
      format: 'percentage',
    },
  ]

  // Mock department data
  const departmentData: DepartmentData[] = [
    {
      id: 'engineering',
      name: 'Engineering',
      employees: 45,
      participation: 92,
      wellnessScore: 8.7,
      avgMealsPerWeek: 4.2,
      satisfaction: 96,
      costPerEmployee: 18,
      savings: 12600,
    },
    {
      id: 'marketing',
      name: 'Marketing',
      employees: 28,
      participation: 89,
      wellnessScore: 8.3,
      avgMealsPerWeek: 3.8,
      satisfaction: 94,
      costPerEmployee: 18,
      savings: 7840,
    },
    {
      id: 'sales',
      name: 'Sales',
      employees: 32,
      participation: 85,
      wellnessScore: 8.1,
      avgMealsPerWeek: 3.5,
      satisfaction: 91,
      costPerEmployee: 18,
      savings: 8960,
    },
    {
      id: 'design',
      name: 'Design',
      employees: 15,
      participation: 93,
      wellnessScore: 8.9,
      avgMealsPerWeek: 4.5,
      satisfaction: 98,
      costPerEmployee: 18,
      savings: 4200,
    },
    {
      id: 'operations',
      name: 'Operations',
      employees: 22,
      participation: 81,
      wellnessScore: 7.8,
      avgMealsPerWeek: 3.2,
      satisfaction: 88,
      costPerEmployee: 18,
      savings: 6160,
    },
  ]

  // Mock engagement trend data
  const engagementTrend: EngagementData[] = [
    {
      date: '2024-10-01',
      activeUsers: 95,
      mealsOrdered: 380,
      challengeParticipation: 68,
      wellnessGoalsHit: 142,
    },
    {
      date: '2024-10-08',
      activeUsers: 108,
      mealsOrdered: 425,
      challengeParticipation: 72,
      wellnessGoalsHit: 156,
    },
    {
      date: '2024-10-15',
      activeUsers: 118,
      mealsOrdered: 468,
      challengeParticipation: 89,
      wellnessGoalsHit: 175,
    },
    {
      date: '2024-10-22',
      activeUsers: 125,
      mealsOrdered: 495,
      challengeParticipation: 94,
      wellnessGoalsHit: 188,
    },
    {
      date: '2024-10-29',
      activeUsers: 132,
      mealsOrdered: 520,
      challengeParticipation: 101,
      wellnessGoalsHit: 201,
    },
    {
      date: '2024-11-05',
      activeUsers: 128,
      mealsOrdered: 512,
      challengeParticipation: 97,
      wellnessGoalsHit: 195,
    },
    {
      date: '2024-11-12',
      activeUsers: 135,
      mealsOrdered: 540,
      challengeParticipation: 105,
      wellnessGoalsHit: 210,
    },
  ]

  // Mock wellness impact data
  const wellnessImpact: WellnessImpact[] = [
    {
      category: 'Sick Days per Employee',
      baseline: 7.2,
      current: 4.9,
      improvement: -32,
      unit: 'days/year',
    },
    {
      category: 'Healthcare Costs',
      baseline: 8500,
      current: 6800,
      improvement: -20,
      unit: '$/employee/year',
    },
    {
      category: 'Employee Energy Levels',
      baseline: 6.4,
      current: 8.1,
      improvement: 27,
      unit: 'score (1-10)',
    },
    {
      category: 'Work Productivity',
      baseline: 100,
      current: 118,
      improvement: 18,
      unit: 'index',
    },
    {
      category: 'Employee Retention',
      baseline: 85,
      current: 92,
      improvement: 8,
      unit: '%',
    },
  ]

  const formatValue = (value: number | string, format: KPIMetric['format']) => {
    if (typeof value === 'string') return value

    switch (format) {
      case 'percentage':
        return `${value}%`
      case 'currency':
        return `$${value.toLocaleString()}`
      case 'days':
        return `${value} days`
      default:
        return value.toLocaleString()
    }
  }

  const getChangeColor = (changeType: KPIMetric['changeType']) => {
    switch (changeType) {
      case 'increase':
        return 'text-green-600'
      case 'decrease':
        return 'text-red-600'
      default:
        return 'text-gray-600'
    }
  }

  const getChangeIcon = (changeType: KPIMetric['changeType']) => {
    switch (changeType) {
      case 'increase':
        return '↗️'
      case 'decrease':
        return '↘️'
      default:
        return '→'
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
                Corporate Analytics Dashboard
              </h1>
              <p className="text-gray-600">
                Comprehensive wellness program insights and ROI analysis
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <select
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                value={selectedPeriod}
                onChange={e => setSelectedPeriod(e.target.value as any)}
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
                <option value="1y">Last year</option>
              </select>
              <select
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                value={selectedDepartment}
                onChange={e => setSelectedDepartment(e.target.value)}
              >
                <option value="all">All Departments</option>
                {departmentData.map(dept => (
                  <option key={dept.id} value={dept.id}>
                    {dept.name}
                  </option>
                ))}
              </select>
              <Button variant="primary">Export Report</Button>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
            {[
              { key: 'overview', label: 'Overview', icon: '📊' },
              { key: 'engagement', label: 'Engagement', icon: '👥' },
              { key: 'wellness', label: 'Wellness Impact', icon: '💚' },
              { key: 'financial', label: 'Financial', icon: '💰' },
              { key: 'reports', label: 'Reports', icon: '📋' },
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
            {/* KPI Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {kpiMetrics.map(metric => (
                <Card key={metric.id} variant="premium" className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-3xl">{metric.icon}</div>
                    <div
                      className={`text-sm font-medium ${getChangeColor(metric.changeType)}`}
                    >
                      {getChangeIcon(metric.changeType)}{' '}
                      {Math.abs(metric.change)}
                      {metric.format === 'percentage' ? 'pp' : '%'}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-gray-600">
                      {metric.title}
                    </h3>
                    <div className="text-2xl font-bold text-gray-900">
                      {formatValue(metric.value, metric.format)}
                    </div>
                    {metric.target && (
                      <div className="text-xs text-gray-500">
                        Target: {formatValue(metric.target, metric.format)}
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Engagement Trend Chart */}
              <Card variant="premium" className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Employee Engagement Trend
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                      <span>Active Users</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span>Meals Ordered</span>
                    </div>
                  </div>
                  <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-4xl mb-2">📈</div>
                      <div className="text-sm text-gray-600">
                        Interactive Chart Visualization
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        Showing engagement growth:{' '}
                        {engagementTrend[0].activeUsers} →{' '}
                        {
                          engagementTrend[engagementTrend.length - 1]
                            .activeUsers
                        }{' '}
                        active users
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Department Performance */}
              <Card variant="premium" className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Department Performance
                </h3>
                <div className="space-y-3">
                  {departmentData.slice(0, 4).map(dept => (
                    <div
                      key={dept.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <div className="font-medium text-gray-900">
                          {dept.name}
                        </div>
                        <div className="text-sm text-gray-600">
                          {dept.employees} employees
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-emerald-600">
                          {dept.participation}%
                        </div>
                        <div className="text-xs text-gray-500">
                          participation
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-blue-600">
                          {dept.wellnessScore}/10
                        </div>
                        <div className="text-xs text-gray-500">
                          wellness score
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Quick Insights */}
            <Card variant="premium" className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Key Insights
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl mb-2">🎯</div>
                  <div className="font-semibold text-gray-900">
                    Top Performing Department
                  </div>
                  <div className="text-sm text-gray-600">
                    Design (93% participation)
                  </div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl mb-2">📊</div>
                  <div className="font-semibold text-gray-900">
                    Biggest Improvement
                  </div>
                  <div className="text-sm text-gray-600">
                    Sick days reduced by 32%
                  </div>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <div className="text-2xl mb-2">💡</div>
                  <div className="font-semibold text-gray-900">
                    Optimization Opportunity
                  </div>
                  <div className="text-sm text-gray-600">
                    Operations dept needs engagement boost
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Engagement Tab */}
        {activeTab === 'engagement' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* User Activity */}
              <Card variant="premium" className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  User Activity Metrics
                </h3>
                <div className="space-y-4">
                  {[
                    {
                      label: 'Daily Active Users',
                      value: 135,
                      change: '+12%',
                      color: 'emerald',
                    },
                    {
                      label: 'Weekly Active Users',
                      value: 142,
                      change: '+8%',
                      color: 'blue',
                    },
                    {
                      label: 'Challenge Participation',
                      value: 105,
                      change: '+23%',
                      color: 'purple',
                    },
                    {
                      label: 'Social Interactions',
                      value: 89,
                      change: '+45%',
                      color: 'pink',
                    },
                  ].map(metric => (
                    <div
                      key={metric.label}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <div className="font-medium text-gray-900">
                          {metric.label}
                        </div>
                        <div className="text-2xl font-bold text-gray-900">
                          {metric.value}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-green-600">
                          {metric.change}
                        </div>
                        <div className="text-xs text-gray-500">
                          vs last period
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Feature Usage */}
              <Card variant="premium" className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Feature Usage
                </h3>
                <div className="space-y-4">
                  {[
                    { feature: 'Meal Ordering', usage: 92, sessions: 1240 },
                    { feature: 'Wellness Tracking', usage: 78, sessions: 890 },
                    { feature: 'Achievement System', usage: 65, sessions: 445 },
                    { feature: 'Team Challenges', usage: 58, sessions: 312 },
                    { feature: 'Social Sharing', usage: 34, sessions: 156 },
                  ].map(item => (
                    <div key={item.feature} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-900">
                          {item.feature}
                        </span>
                        <span className="text-sm text-gray-600">
                          {item.usage}% ({item.sessions} sessions)
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-emerald-600 h-2 rounded-full"
                          style={{ width: `${item.usage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Engagement Timeline */}
            <Card variant="premium" className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Engagement Timeline
              </h3>
              <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl mb-2">📊</div>
                  <div className="text-sm text-gray-600">
                    7-Week Engagement Trend Visualization
                  </div>
                  <div className="text-xs text-gray-500 mt-2">
                    Peak engagement: Week of Nov 12 (135 active users, 540 meals
                    ordered)
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Wellness Impact Tab */}
        {activeTab === 'wellness' && (
          <div className="space-y-8">
            <Card variant="premium" className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                Health & Wellness Impact Analysis
              </h3>
              <div className="space-y-6">
                {wellnessImpact.map(impact => (
                  <div
                    key={impact.category}
                    className="p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-gray-900">
                        {impact.category}
                      </h4>
                      <div
                        className={`text-sm font-semibold ${
                          impact.improvement > 0
                            ? 'text-green-600'
                            : 'text-red-600'
                        }`}
                      >
                        {impact.improvement > 0 ? '+' : ''}
                        {impact.improvement}%
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-sm text-gray-600">Baseline</div>
                        <div className="text-lg font-semibold text-gray-900">
                          {impact.baseline} {impact.unit}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Current</div>
                        <div className="text-lg font-semibold text-emerald-600">
                          {impact.current} {impact.unit}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Improvement</div>
                        <div className="text-lg font-semibold text-green-600">
                          {Math.abs(impact.improvement)}% better
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Wellness Scores by Department */}
            <Card variant="premium" className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Wellness Scores by Department
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {departmentData.map(dept => (
                  <div
                    key={dept.id}
                    className="p-4 border border-gray-200 rounded-lg"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900">{dept.name}</h4>
                      <div className="text-2xl font-bold text-emerald-600">
                        {dept.wellnessScore}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Satisfaction:</span>
                        <span className="font-medium">
                          {dept.satisfaction}%
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Avg Meals/Week:</span>
                        <span className="font-medium">
                          {dept.avgMealsPerWeek}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* Financial Tab */}
        {activeTab === 'financial' && (
          <div className="space-y-8">
            {/* ROI Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card variant="premium" className="p-6 text-center">
                <div className="text-3xl mb-2">💰</div>
                <div className="text-2xl font-bold text-green-600">$45,000</div>
                <div className="text-sm text-gray-600">Monthly Savings</div>
              </Card>
              <Card variant="premium" className="p-6 text-center">
                <div className="text-3xl mb-2">📈</div>
                <div className="text-2xl font-bold text-blue-600">285%</div>
                <div className="text-sm text-gray-600">ROI</div>
              </Card>
              <Card variant="premium" className="p-6 text-center">
                <div className="text-3xl mb-2">⏰</div>
                <div className="text-2xl font-bold text-purple-600">
                  8 months
                </div>
                <div className="text-sm text-gray-600">Payback Period</div>
              </Card>
            </div>

            {/* Cost Breakdown */}
            <Card variant="premium" className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Cost Analysis
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">
                    Program Costs
                  </h4>
                  <div className="space-y-3">
                    {[
                      {
                        item: 'EatRite Subscription',
                        cost: 2556,
                        type: 'monthly',
                      },
                      { item: 'Implementation', cost: 5000, type: 'one-time' },
                      {
                        item: 'Training & Onboarding',
                        cost: 2000,
                        type: 'one-time',
                      },
                      { item: 'Ongoing Support', cost: 500, type: 'monthly' },
                    ].map(cost => (
                      <div
                        key={cost.item}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <span className="text-gray-900">{cost.item}</span>
                        <div className="text-right">
                          <div className="font-semibold">
                            ${cost.cost.toLocaleString()}
                          </div>
                          <div className="text-xs text-gray-500">
                            {cost.type}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">
                    Cost Savings
                  </h4>
                  <div className="space-y-3">
                    {[
                      {
                        item: 'Reduced Healthcare Costs',
                        savings: 28000,
                        percentage: 62,
                      },
                      {
                        item: 'Lower Absenteeism',
                        savings: 12000,
                        percentage: 27,
                      },
                      {
                        item: 'Increased Productivity',
                        savings: 5000,
                        percentage: 11,
                      },
                    ].map(saving => (
                      <div
                        key={saving.item}
                        className="flex items-center justify-between p-3 bg-green-50 rounded-lg"
                      >
                        <span className="text-gray-900">{saving.item}</span>
                        <div className="text-right">
                          <div className="font-semibold text-green-600">
                            ${saving.savings.toLocaleString()}
                          </div>
                          <div className="text-xs text-gray-500">
                            {saving.percentage}% of total
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            {/* Department Cost Analysis */}
            <Card variant="premium" className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Department Cost Efficiency
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-2">Department</th>
                      <th className="text-right py-2">Employees</th>
                      <th className="text-right py-2">Cost/Employee</th>
                      <th className="text-right py-2">Monthly Savings</th>
                      <th className="text-right py-2">ROI</th>
                    </tr>
                  </thead>
                  <tbody>
                    {departmentData.map(dept => (
                      <tr key={dept.id} className="border-b border-gray-100">
                        <td className="py-3 font-medium">{dept.name}</td>
                        <td className="py-3 text-right">{dept.employees}</td>
                        <td className="py-3 text-right">
                          ${dept.costPerEmployee}
                        </td>
                        <td className="py-3 text-right text-green-600">
                          ${dept.savings.toLocaleString()}
                        </td>
                        <td className="py-3 text-right font-semibold">
                          {Math.round(
                            ((dept.savings * 12) /
                              (dept.employees * dept.costPerEmployee * 12)) *
                              100
                          )}
                          %
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        )}

        {/* Reports Tab */}
        {activeTab === 'reports' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: 'Executive Summary',
                  description: 'High-level overview for C-suite presentation',
                  icon: '📊',
                  format: 'PDF',
                  lastGenerated: '2024-11-15',
                },
                {
                  title: 'Employee Wellness Report',
                  description:
                    'Detailed wellness metrics and health impact analysis',
                  icon: '💚',
                  format: 'PDF',
                  lastGenerated: '2024-11-14',
                },
                {
                  title: 'Financial ROI Analysis',
                  description:
                    'Comprehensive cost-benefit analysis with projections',
                  icon: '💰',
                  format: 'Excel',
                  lastGenerated: '2024-11-13',
                },
                {
                  title: 'Department Comparison',
                  description:
                    'Cross-department performance and engagement metrics',
                  icon: '🏢',
                  format: 'PDF',
                  lastGenerated: '2024-11-12',
                },
                {
                  title: 'Engagement Analytics',
                  description:
                    'User behavior patterns and feature adoption rates',
                  icon: '👥',
                  format: 'Excel',
                  lastGenerated: '2024-11-11',
                },
                {
                  title: 'Custom Data Export',
                  description: 'Raw data export for further analysis',
                  icon: '📋',
                  format: 'CSV',
                  lastGenerated: '2024-11-10',
                },
              ].map(report => (
                <Card key={report.title} variant="premium" className="p-6">
                  <div className="text-3xl mb-3">{report.icon}</div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {report.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {report.description}
                  </p>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs text-gray-500">
                      Format: {report.format}
                    </span>
                    <span className="text-xs text-gray-500">
                      Last: {report.lastGenerated}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <Button variant="primary" className="w-full">
                      Generate Report
                    </Button>
                    <Button variant="outline" className="w-full">
                      Schedule Auto-Report
                    </Button>
                  </div>
                </Card>
              ))}
            </div>

            {/* Report Schedule */}
            <Card variant="premium" className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Scheduled Reports
              </h3>
              <div className="space-y-4">
                {[
                  {
                    report: 'Executive Summary',
                    frequency: 'Weekly',
                    nextDate: '2024-11-18',
                    recipients: 'C-Suite Team',
                  },
                  {
                    report: 'Employee Wellness Report',
                    frequency: 'Monthly',
                    nextDate: '2024-12-01',
                    recipients: 'HR Team',
                  },
                  {
                    report: 'Financial ROI Analysis',
                    frequency: 'Quarterly',
                    nextDate: '2025-01-15',
                    recipients: 'Finance Team',
                  },
                ].map(schedule => (
                  <div
                    key={schedule.report}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <div className="font-medium text-gray-900">
                        {schedule.report}
                      </div>
                      <div className="text-sm text-gray-600">
                        To: {schedule.recipients}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900">
                        {schedule.frequency}
                      </div>
                      <div className="text-xs text-gray-500">
                        Next: {schedule.nextDate}
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}
      </Container>
    </div>
  )
}

export default CorporateAnalyticsDashboard
