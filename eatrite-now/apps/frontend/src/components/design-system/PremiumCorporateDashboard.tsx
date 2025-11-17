import React, { useState } from 'react'

// Premium Corporate Admin Dashboard
const PremiumCorporateDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview')
  const [timeRange, setTimeRange] = useState('7d')

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

  // Mock corporate data
  const corporateMetrics = {
    totalEmployees: 1247,
    activeUsers: 892,
    weeklyOrders: 3456,
    avgWellnessScore: 87,
    costSavings: 145000,
    engagementRate: 72,
  }

  const departments = [
    {
      name: 'Engineering',
      employees: 425,
      engagement: 89,
      wellnessScore: 91,
      orders: 1250,
    },
    {
      name: 'Sales',
      employees: 287,
      engagement: 76,
      wellnessScore: 83,
      orders: 856,
    },
    {
      name: 'Marketing',
      employees: 156,
      engagement: 82,
      wellnessScore: 88,
      orders: 542,
    },
    {
      name: 'Operations',
      employees: 198,
      engagement: 68,
      wellnessScore: 79,
      orders: 634,
    },
    {
      name: 'Finance',
      employees: 181,
      engagement: 74,
      wellnessScore: 85,
      orders: 578,
    },
  ]

  const topMeals = [
    {
      name: 'Mediterranean Power Bowl',
      orders: 342,
      rating: 4.8,
      category: 'Bowls',
    },
    {
      name: 'Grilled Salmon & Asparagus',
      orders: 298,
      rating: 4.9,
      category: 'Mains',
    },
    {
      name: 'Plant-Based Buddha Bowl',
      orders: 276,
      rating: 4.7,
      category: 'Vegan',
    },
    {
      name: 'Coconut Curry Chicken',
      orders: 234,
      rating: 4.8,
      category: 'Comfort',
    },
    {
      name: 'Superfood Smoothie Bowl',
      orders: 189,
      rating: 4.6,
      category: 'Breakfast',
    },
  ]

  const MetricCard: React.FC<{
    title: string
    value: string
    change?: string
    changeType?: 'positive' | 'negative' | 'neutral'
    icon: string
    description?: string
  }> = ({
    title,
    value,
    change,
    changeType = 'positive',
    icon,
    description,
  }) => (
    <PremiumCard className="text-center">
      <div className="w-14 h-14 bg-[#0B4F3C]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
        <span className="text-[#0B4F3C] text-2xl">{icon}</span>
      </div>
      <h3 className="text-3xl font-bold text-[#111827] mb-1">{value}</h3>
      <p className="text-sm text-[#6B7280] mb-2">{title}</p>
      {change && (
        <p
          className={`text-xs font-medium ${
            changeType === 'positive'
              ? 'text-[#34D399]'
              : changeType === 'negative'
                ? 'text-red-500'
                : 'text-[#6B7280]'
          }`}
        >
          {change}
        </p>
      )}
      {description && (
        <p className="text-xs text-[#6B7280] mt-1">{description}</p>
      )}
    </PremiumCard>
  )

  const ProgressBar: React.FC<{
    label: string
    value: number
    max: number
    color: string
    showPercentage?: boolean
  }> = ({ label, value, max, color, showPercentage = true }) => {
    const percentage = Math.min((value / max) * 100, 100)

    return (
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-[#4B5563]">{label}</span>
          <span className="text-sm text-[#6B7280]">
            {showPercentage ? `${percentage.toFixed(0)}%` : `${value}/${max}`}
          </span>
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
    <div className="min-h-screen bg-[#F9FAFB] flex">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-[#F9FAFB] p-6">
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-10 h-10 bg-gradient-to-br from-[#0B4F3C] to-[#34D399] rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-lg">E</span>
          </div>
          <div>
            <h1 className="text-lg font-bold text-[#111827]">EatRite</h1>
            <p className="text-xs text-[#6B7280]">Corporate Admin</p>
          </div>
        </div>

        <nav className="space-y-2">
          {[
            { key: 'overview', label: 'Overview', icon: '📊' },
            { key: 'employees', label: 'Employee Health', icon: '👥' },
            { key: 'orders', label: 'Order Management', icon: '🍽️' },
            { key: 'analytics', label: 'Advanced Analytics', icon: '📈' },
            { key: 'wellness', label: 'Wellness Programs', icon: '🎯' },
            { key: 'reports', label: 'Reports', icon: '📋' },
            { key: 'settings', label: 'Settings', icon: '⚙️' },
          ].map(item => (
            <button
              key={item.key}
              onClick={() => setActiveTab(item.key)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                activeTab === item.key
                  ? 'bg-[#0B4F3C]/10 text-[#0B4F3C] font-medium'
                  : 'text-[#6B7280] hover:text-[#4B5563] hover:bg-[#F9FAFB]'
              }`}
            >
              <span>{item.icon}</span>
              <span className="text-sm">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="mt-8 pt-8 border-t border-[#F9FAFB]">
          <div className="bg-gradient-to-br from-[#0B4F3C]/5 to-[#34D399]/5 rounded-xl p-4">
            <h3 className="font-medium text-[#111827] mb-2">Need Help?</h3>
            <p className="text-sm text-[#6B7280] mb-3">
              Contact your dedicated account manager
            </p>
            <PremiumButton variant="primary" size="sm" className="w-full">
              Get Support
            </PremiumButton>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#111827] mb-2">
              Corporate Wellness Dashboard
            </h1>
            <p className="text-lg text-[#6B7280]">
              Monitor your team's health and engagement across all departments
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <select
              value={timeRange}
              onChange={e => setTimeRange(e.target.value)}
              className="border border-[#D1D5DB] rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-[#0B4F3C] focus:border-transparent"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="1y">Last year</option>
            </select>

            <PremiumButton variant="outline" size="sm">
              📊 Export Report
            </PremiumButton>

            <PremiumButton variant="primary" size="sm">
              ➕ Add Employee
            </PremiumButton>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
          <MetricCard
            title="Total Employees"
            value={corporateMetrics.totalEmployees.toLocaleString()}
            change="+12 this month"
            icon="👥"
            description="Enrolled in program"
          />
          <MetricCard
            title="Active Users"
            value={corporateMetrics.activeUsers.toLocaleString()}
            change="+8% this week"
            icon="✅"
            description="72% engagement rate"
          />
          <MetricCard
            title="Weekly Orders"
            value={corporateMetrics.weeklyOrders.toLocaleString()}
            change="+15% from last week"
            icon="🍽️"
            description="2.8 meals per employee"
          />
          <MetricCard
            title="Wellness Score"
            value={`${corporateMetrics.avgWellnessScore}%`}
            change="+5 points this month"
            icon="🎯"
            description="Above industry average"
          />
          <MetricCard
            title="Cost Savings"
            value={`$${(corporateMetrics.costSavings / 1000).toFixed(0)}K`}
            change="+22% ROI"
            icon="💰"
            description="Healthcare & productivity"
          />
          <MetricCard
            title="Satisfaction"
            value="4.8/5"
            change="98% recommend"
            icon="⭐"
            description="Employee feedback"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Department Performance */}
          <div className="lg:col-span-2">
            <PremiumCard>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-[#111827]">
                  Department Performance
                </h3>
                <PremiumButton variant="outline" size="sm">
                  View Details
                </PremiumButton>
              </div>

              <div className="space-y-6">
                {departments.map((dept, index) => (
                  <div
                    key={index}
                    className="border border-[#F9FAFB] rounded-xl p-4"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="font-medium text-[#111827]">
                          {dept.name}
                        </h4>
                        <p className="text-sm text-[#6B7280]">
                          {dept.employees} employees • {dept.orders} orders this
                          month
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-[#0B4F3C]">
                          {dept.wellnessScore}%
                        </p>
                        <p className="text-xs text-[#6B7280]">wellness score</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <ProgressBar
                        label="Engagement Rate"
                        value={dept.engagement}
                        max={100}
                        color="bg-[#34D399]"
                      />
                      <ProgressBar
                        label="Wellness Score"
                        value={dept.wellnessScore}
                        max={100}
                        color="bg-[#0B4F3C]"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </PremiumCard>
          </div>

          {/* Sidebar Stats */}
          <div className="space-y-8">
            {/* Top Meals */}
            <PremiumCard>
              <h3 className="text-lg font-bold text-[#111827] mb-4">
                Most Popular Meals
              </h3>
              <div className="space-y-4">
                {topMeals.map((meal, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div>
                      <p className="font-medium text-[#111827] text-sm">
                        {meal.name}
                      </p>
                      <div className="flex items-center space-x-2 text-xs text-[#6B7280]">
                        <span>{meal.category}</span>
                        <span>•</span>
                        <span className="flex items-center">
                          ⭐ {meal.rating}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-[#0B4F3C]">{meal.orders}</p>
                      <p className="text-xs text-[#6B7280]">orders</p>
                    </div>
                  </div>
                ))}
              </div>
            </PremiumCard>

            {/* Health Goals Progress */}
            <PremiumCard>
              <h3 className="text-lg font-bold text-[#111827] mb-4">
                Company Health Goals
              </h3>
              <div className="space-y-4">
                <ProgressBar
                  label="Weight Management"
                  value={78}
                  max={100}
                  color="bg-[#34D399]"
                />
                <ProgressBar
                  label="Energy Levels"
                  value={92}
                  max={100}
                  color="bg-[#0B4F3C]"
                />
                <ProgressBar
                  label="Nutrition Awareness"
                  value={85}
                  max={100}
                  color="bg-[#D4A857]"
                />
                <ProgressBar
                  label="Activity Levels"
                  value={68}
                  max={100}
                  color="bg-[#10B981]"
                />
              </div>
            </PremiumCard>

            {/* Quick Actions */}
            <PremiumCard>
              <h3 className="text-lg font-bold text-[#111827] mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <PremiumButton
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                >
                  📧 Send Wellness Survey
                </PremiumButton>
                <PremiumButton
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                >
                  📊 Generate Report
                </PremiumButton>
                <PremiumButton
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                >
                  🎯 Set Department Goals
                </PremiumButton>
                <PremiumButton
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                >
                  📅 Schedule Nutrition Workshop
                </PremiumButton>
                <PremiumButton
                  variant="primary"
                  size="sm"
                  className="w-full justify-start"
                >
                  💬 Contact Account Manager
                </PremiumButton>
              </div>
            </PremiumCard>
          </div>
        </div>

        {/* Recent Activity */}
        <PremiumCard className="mt-8">
          <h3 className="text-lg font-bold text-[#111827] mb-4">
            Recent Activity
          </h3>
          <div className="space-y-4">
            {[
              {
                time: '2 hours ago',
                action: 'Engineering team completed wellness challenge',
                type: 'success',
              },
              {
                time: '4 hours ago',
                action: 'New batch of 127 meals delivered to Building A',
                type: 'info',
              },
              {
                time: '6 hours ago',
                action: 'Marketing department wellness score increased to 88%',
                type: 'success',
              },
              {
                time: '1 day ago',
                action: 'Monthly nutrition workshop scheduled for next week',
                type: 'info',
              },
              {
                time: '2 days ago',
                action: 'Q4 wellness report generated and sent to executives',
                type: 'neutral',
              },
            ].map((activity, index) => (
              <div
                key={index}
                className="flex items-start space-x-3 p-3 bg-[#F9FAFB] rounded-xl"
              >
                <div
                  className={`w-2 h-2 rounded-full mt-2 ${
                    activity.type === 'success'
                      ? 'bg-[#34D399]'
                      : activity.type === 'info'
                        ? 'bg-[#0B4F3C]'
                        : 'bg-[#6B7280]'
                  }`}
                ></div>
                <div>
                  <p className="text-sm text-[#111827]">{activity.action}</p>
                  <p className="text-xs text-[#6B7280]">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </PremiumCard>
      </div>
    </div>
  )
}

export default PremiumCorporateDashboard
