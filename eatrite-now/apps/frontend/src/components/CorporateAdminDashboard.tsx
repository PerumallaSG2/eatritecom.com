import React, { useState, useEffect } from 'react'
import {
  Users,
  TrendingUp,
  DollarSign,
  Activity,
  Award,
  ChefHat,
  PieChart,
  Download,
  RefreshCw,
  Building2,
} from 'lucide-react'

interface DashboardStats {
  totalEmployees: number
  activeEmployees: number
  participationRate: number
  totalOrders: number
  totalSpend: number
  avgWellnessScore: number
  weeklyGrowth: number
  topMeals: Array<{
    id: string
    name: string
    orders: number
    percentage: number
  }>
}

// Future implementation:
// interface WeeklyData {
//   week: string
//   orders: number
//   spend: number
// }

const CorporateAdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [selectedPeriod, setSelectedPeriod] = useState('4weeks')
  const [loading, setLoading] = useState(true)
  
  // Future implementation: const [weeklyData, setWeeklyData] = useState<WeeklyData[]>([])

  useEffect(() => {
    fetchDashboardData()
  }, [selectedPeriod])

  const fetchDashboardData = async () => {
    setLoading(true)
    try {
      // Simulate API call - replace with actual API
      const response = await fetch(
        `/api/corporate/dashboard?period=${selectedPeriod}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )

      if (response.ok) {
        const data = await response.json()
        setStats(data.stats)
        // Future implementation: setWeeklyData(data.weeklyData)
      }
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const mockStats: DashboardStats = {
    totalEmployees: 156,
    activeEmployees: 142,
    participationRate: 91.0,
    totalOrders: 1247,
    totalSpend: 18705.5,
    avgWellnessScore: 84.2,
    weeklyGrowth: 12.5,
    topMeals: [
      { id: '1', name: 'Grilled Salmon Bowl', orders: 89, percentage: 7.1 },
      { id: '2', name: 'Mediterranean Quinoa', orders: 76, percentage: 6.1 },
      { id: '3', name: 'Chicken Teriyaki', orders: 68, percentage: 5.5 },
      { id: '4', name: 'Veggie Power Bowl', orders: 61, percentage: 4.9 },
      { id: '5', name: 'Turkey Meatballs', orders: 54, percentage: 4.3 },
    ],
  }

  const displayStats = stats || mockStats

  const StatCard: React.FC<{
    title: string
    value: string | number
    change?: number
    icon: React.ReactNode
    format?: 'number' | 'currency' | 'percentage'
  }> = ({ title, value, change, icon, format = 'number' }) => {
    const formatValue = () => {
      switch (format) {
        case 'currency':
          return `$${typeof value === 'number' ? value.toLocaleString() : value}`
        case 'percentage':
          return `${value}%`
        default:
          return typeof value === 'number' ? value.toLocaleString() : value
      }
    }

    return (
      <div className="bg-white rounded-xl p-6 shadow-lg border border-[#D4B46A]/20 hover:shadow-xl transition-all duration-300">
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 bg-gradient-to-r from-[#D4B46A]/10 to-[#B8935A]/10 rounded-lg">
            {icon}
          </div>
          {change !== undefined && (
            <div
              className={`flex items-center text-sm font-medium ${
                change >= 0 ? 'text-green-600' : 'text-red-600'
              }`}
            >
              <TrendingUp
                className={`w-4 h-4 mr-1 ${change < 0 ? 'rotate-180' : ''}`}
              />
              {Math.abs(change)}%
            </div>
          )}
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p
            className="text-3xl font-bold text-[#0F2B1E]"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            {formatValue()}
          </p>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F5F2E8] to-white flex items-center justify-center">
        <div className="flex items-center gap-3 text-[#0F2B1E]">
          <RefreshCw className="w-6 h-6 animate-spin" />
          <span className="text-lg font-medium">Loading dashboard...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F2E8] to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div className="flex items-center gap-4 mb-4 lg:mb-0">
            <div className="p-3 bg-gradient-to-r from-[#0F2B1E] to-[#0A2418] rounded-xl">
              <Building2 className="w-8 h-8 text-[#D4B46A]" />
            </div>
            <div>
              <h1
                className="text-3xl font-bold text-[#0F2B1E]"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                Corporate Dashboard
              </h1>
              <p className="text-gray-600">
                Monitor your team's wellness and engagement
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <select
              value={selectedPeriod}
              onChange={e => setSelectedPeriod(e.target.value)}
              className="px-4 py-2 border border-[#D4B46A]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4B46A]/50"
            >
              <option value="1week">Last Week</option>
              <option value="4weeks">Last 4 Weeks</option>
              <option value="3months">Last 3 Months</option>
              <option value="year">This Year</option>
            </select>

            <button
              onClick={fetchDashboardData}
              className="flex items-center gap-2 px-4 py-2 bg-[#D4B46A] hover:bg-[#B8935A] text-[#0F2B1E] font-medium rounded-lg transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>

            <button className="flex items-center gap-2 px-4 py-2 bg-[#0F2B1E] hover:bg-[#0A2418] text-white font-medium rounded-lg transition-colors">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Employees"
            value={displayStats.totalEmployees}
            icon={<Users className="w-6 h-6 text-[#D4B46A]" />}
          />
          <StatCard
            title="Participation Rate"
            value={displayStats.participationRate}
            change={displayStats.weeklyGrowth}
            icon={<Activity className="w-6 h-6 text-[#D4B46A]" />}
            format="percentage"
          />
          <StatCard
            title="Total Orders"
            value={displayStats.totalOrders}
            change={8.3}
            icon={<ChefHat className="w-6 h-6 text-[#D4B46A]" />}
          />
          <StatCard
            title="Total Spend"
            value={displayStats.totalSpend}
            change={15.2}
            icon={<DollarSign className="w-6 h-6 text-[#D4B46A]" />}
            format="currency"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Popular Meals */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl p-6 shadow-lg border border-[#D4B46A]/20">
              <div className="flex items-center justify-between mb-6">
                <h3
                  className="text-xl font-bold text-[#0F2B1E]"
                  style={{ fontFamily: 'Playfair Display, serif' }}
                >
                  Popular Meals This Week
                </h3>
                <PieChart className="w-5 h-5 text-[#D4B46A]" />
              </div>

              <div className="space-y-4">
                {displayStats.topMeals.map((meal, index) => (
                  <div
                    key={meal.id}
                    className="flex items-center justify-between p-4 bg-[#F5EEDC] rounded-lg"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 bg-gradient-to-r from-[#D4B46A] to-[#B8935A] rounded-full flex items-center justify-center text-white font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium text-[#0F2B1E]">
                          {meal.name}
                        </p>
                        <p className="text-sm text-gray-600">
                          {meal.orders} orders
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-[#0F2B1E]">
                        {meal.percentage}%
                      </p>
                      <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#D4B46A] to-[#B8935A]"
                          style={{ width: `${meal.percentage * 10}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Wellness Metrics */}
          <div>
            <div className="bg-white rounded-xl p-6 shadow-lg border border-[#D4B46A]/20 mb-6">
              <div className="flex items-center justify-between mb-6">
                <h3
                  className="text-xl font-bold text-[#0F2B1E]"
                  style={{ fontFamily: 'Playfair Display, serif' }}
                >
                  Team Wellness
                </h3>
                <Award className="w-5 h-5 text-[#D4B46A]" />
              </div>

              <div className="text-center mb-6">
                <div className="relative w-32 h-32 mx-auto mb-4">
                  <svg
                    className="w-full h-full transform -rotate-90"
                    viewBox="0 0 36 36"
                  >
                    <path
                      d="m18,2.0845 a 15.9155,15.9155 0 0,1 0,31.831 a 15.9155,15.9155 0 0,1 0,-31.831"
                      fill="none"
                      stroke="#F5EEDC"
                      strokeWidth="2"
                    />
                    <path
                      d="m18,2.0845 a 15.9155,15.9155 0 0,1 0,31.831 a 15.9155,15.9155 0 0,1 0,-31.831"
                      fill="none"
                      stroke="url(#gradient)"
                      strokeWidth="2"
                      strokeDasharray={`${displayStats.avgWellnessScore}, 100`}
                    />
                    <defs>
                      <linearGradient
                        id="gradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                      >
                        <stop offset="0%" stopColor="#D4B46A" />
                        <stop offset="100%" stopColor="#B8935A" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-3xl font-bold text-[#0F2B1E]">
                        {displayStats.avgWellnessScore}
                      </p>
                      <p className="text-sm text-gray-600">Avg Score</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Active Users</span>
                  <span className="font-medium text-[#0F2B1E]">
                    {displayStats.activeEmployees}/{displayStats.totalEmployees}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Weekly Growth</span>
                  <span className="font-medium text-green-600">
                    +{displayStats.weeklyGrowth}%
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-[#D4B46A]/20">
              <h3
                className="text-lg font-bold text-[#0F2B1E] mb-4"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button className="w-full text-left p-3 bg-[#F5EEDC] hover:bg-[#D4B46A]/20 rounded-lg transition-colors">
                  <p className="font-medium text-[#0F2B1E]">Place Bulk Order</p>
                  <p className="text-sm text-gray-600">
                    Order meals for the team
                  </p>
                </button>
                <button className="w-full text-left p-3 bg-[#F5EEDC] hover:bg-[#D4B46A]/20 rounded-lg transition-colors">
                  <p className="font-medium text-[#0F2B1E]">Manage Employees</p>
                  <p className="text-sm text-gray-600">
                    Add or remove team members
                  </p>
                </button>
                <button className="w-full text-left p-3 bg-[#F5EEDC] hover:bg-[#D4B46A]/20 rounded-lg transition-colors">
                  <p className="font-medium text-[#0F2B1E]">View Reports</p>
                  <p className="text-sm text-gray-600">
                    Detailed analytics & insights
                  </p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CorporateAdminDashboard
