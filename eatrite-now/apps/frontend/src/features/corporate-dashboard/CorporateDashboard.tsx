/**
 * Corporate Dashboard
 * THE PRIMARY PRODUCT PAGE
 * 
 * Purpose: Executive decision-making in under 10 seconds
 * Audience: CFO, CHRO, Operations Leadership
 * 
 * Must show ONLY:
 * 1. Monthly Spend
 * 2. Cost per Employee  
 * 3. Employee Adoption %
 * 4. On-time Delivery %
 * 5. Wellness Trend (30-90 days)
 */

import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { TrendingUp, TrendingDown, Users, DollarSign, Package, Activity } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import type { DashboardMetrics } from '../../shared/types'

// Utility to format cents to dollars
const formatCurrency = (cents: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(cents / 100)
}

const formatPercent = (value: number): string => {
  return `${value.toFixed(1)}%`
}

interface MetricCardProps {
  title: string
  value: string
  change?: number
  icon: React.ComponentType<{ className?: string }>
  trend?: 'up' | 'down' | 'neutral'
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, change, icon: Icon, trend = 'neutral' }) => {
  const getTrendColor = () => {
    if (trend === 'up') return 'text-green-600'
    if (trend === 'down') return 'text-red-600'
    return 'text-gray-500'
  }

  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : null

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="mt-2 text-3xl font-semibold text-gray-900">{value}</p>
          {change !== undefined && (
            <div className={`mt-2 flex items-center text-sm ${getTrendColor()}`}>
              {TrendIcon && <TrendIcon className="mr-1 h-4 w-4" />}
              <span>{change > 0 ? '+' : ''}{change}% vs last period</span>
            </div>
          )}
        </div>
        <div className="ml-4">
          <div className="p-3 bg-gray-50 rounded-lg">
            <Icon className="h-8 w-8 text-gray-600" />
          </div>
        </div>
      </div>
    </div>
  )
}

export const CorporateDashboard: React.FC = () => {
  // Fetch dashboard metrics
  const { data: metrics, isLoading } = useQuery<DashboardMetrics>({
    queryKey: ['dashboard-metrics'],
    queryFn: async () => {
      // TODO: Replace with actual API call
      return {
        monthlySpendCents: 2450000, // $24,500
        costPerEmployeeCents: 12250, // $122.50
        employeeAdoptionPercent: 68.5,
        onTimeDeliveryPercent: 97.2,
        wellnessTrend: [
          { date: '2025-11-01', averageScore: 72 },
          { date: '2025-11-08', averageScore: 74 },
          { date: '2025-11-15', averageScore: 76 },
          { date: '2025-11-22', averageScore: 75 },
          { date: '2025-11-29', averageScore: 78 },
        ],
      }
    },
  })

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary-600 border-r-transparent"></div>
          <p className="mt-4 text-sm text-gray-600">Loading metrics...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-semibold text-gray-900">Corporate Dashboard</h1>
        <p className="mt-2 text-sm text-gray-600">
          Real-time operational metrics for {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </p>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Monthly Spend"
          value={formatCurrency(metrics?.monthlySpendCents || 0)}
          change={-3.2}
          trend="down"
          icon={DollarSign}
        />
        <MetricCard
          title="Cost per Employee"
          value={formatCurrency(metrics?.costPerEmployeeCents || 0)}
          change={-1.8}
          trend="down"
          icon={Users}
        />
        <MetricCard
          title="Employee Adoption"
          value={formatPercent(metrics?.employeeAdoptionPercent || 0)}
          change={4.2}
          trend="up"
          icon={Users}
        />
        <MetricCard
          title="On-Time Delivery"
          value={formatPercent(metrics?.onTimeDeliveryPercent || 0)}
          change={0.5}
          trend="up"
          icon={Package}
        />
      </div>

      {/* Wellness Trend Chart */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Wellness Trend</h2>
            <p className="mt-1 text-sm text-gray-600">
              30-day average employee wellness score
            </p>
          </div>
          <div className="flex items-center px-3 py-1 bg-primary-50 text-primary-700 rounded-md">
            <Activity className="mr-2 h-4 w-4" />
            <span className="text-sm font-medium">Trending Up</span>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={metrics?.wellnessTrend || []}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              dataKey="date" 
              stroke="#6b7280"
              tick={{ fill: '#6b7280', fontSize: 12 }}
              tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            />
            <YAxis 
              stroke="#6b7280"
              tick={{ fill: '#6b7280', fontSize: 12 }}
              domain={[0, 100]}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#fff', 
                border: '1px solid #e5e7eb', 
                borderRadius: '6px',
                padding: '12px'
              }}
              labelFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              formatter={(value: number) => [`${value}`, 'Wellness Score']}
            />
            <Line 
              type="monotone" 
              dataKey="averageScore" 
              stroke="#3d8f6a" 
              strokeWidth={3}
              dot={{ fill: '#3d8f6a', r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Action Items */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors">
            View Invoices
          </button>
          <button className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors">
            Download Report
          </button>
          <button className="flex items-center justify-center px-4 py-3 border border-primary-600 bg-primary-600 rounded-md text-sm font-medium text-white hover:bg-primary-700 transition-colors">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  )
}
