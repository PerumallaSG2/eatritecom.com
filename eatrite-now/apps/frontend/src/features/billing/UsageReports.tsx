/**
 * Usage Reports Page
 * Detailed consumption metrics and breakdown
 * 
 * Features:
 * - Period selection
 * - Usage by department/employee
 * - Meal type breakdown
 * - Export to CSV
 * - Cost analysis
 */

import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Download, Calendar, TrendingUp } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

const formatCurrency = (cents: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(cents / 100)
}

interface UsageData {
  period: string
  totalOrdersCents: number
  totalMeals: number
  activeEmployees: number
  avgCostPerMealCents: number
  mealsByCategory: { name: string; count: number; totalCents: number }[]
  usageByWeek: { week: string; meals: number; costCents: number }[]
}

const COLORS = ['#3d8f6a', '#5aa885', '#88c5a8', '#b6dcc9', '#d9ede3']

export const UsageReports: React.FC = () => {
  const [period, setPeriod] = useState('current-month')

  const { data: usage, isLoading } = useQuery<UsageData>({
    queryKey: ['usage-reports', period],
    queryFn: async () => {
      // TODO: Replace with actual API call to /api/v1/billing/usage
      return {
        period: 'November 2025',
        totalOrdersCents: 2450000,
        totalMeals: 200,
        activeEmployees: 150,
        avgCostPerMealCents: 12250,
        mealsByCategory: [
          { name: 'Protein Bowls', count: 75, totalCents: 900000 },
          { name: 'Salads', count: 50, totalCents: 550000 },
          { name: 'Sandwiches', count: 40, totalCents: 480000 },
          { name: 'Vegetarian', count: 25, totalCents: 300000 },
          { name: 'Breakfast', count: 10, totalCents: 120000 },
        ],
        usageByWeek: [
          { week: 'Week 1', meals: 45, costCents: 551250 },
          { week: 'Week 2', meals: 52, costCents: 637000 },
          { week: 'Week 3', meals: 48, costCents: 588000 },
          { week: 'Week 4', meals: 55, costCents: 673750 },
        ],
      }
    },
  })

  const handleExport = () => {
    console.log('Exporting usage data...')
    // TODO: Implement CSV export
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary-600 border-r-transparent"></div>
          <p className="mt-4 text-sm text-gray-600">Loading usage data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">Usage Reports</h1>
          <p className="mt-2 text-sm text-gray-600">
            Detailed consumption metrics and cost analysis
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="appearance-none pl-10 pr-10 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
            >
              <option value="current-month">Current Month</option>
              <option value="last-month">Last Month</option>
              <option value="last-3-months">Last 3 Months</option>
              <option value="year-to-date">Year to Date</option>
            </select>
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
          </div>
          <button
            onClick={handleExport}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="text-sm font-medium text-gray-600 mb-2">Total Spend</div>
          <div className="text-2xl font-semibold text-gray-900">
            {formatCurrency(usage?.totalOrdersCents || 0)}
          </div>
          <div className="mt-2 text-xs text-gray-500">{usage?.period}</div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="text-sm font-medium text-gray-600 mb-2">Total Meals</div>
          <div className="text-2xl font-semibold text-gray-900">{usage?.totalMeals || 0}</div>
          <div className="mt-2 text-xs text-gray-500">Meals ordered</div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="text-sm font-medium text-gray-600 mb-2">Active Employees</div>
          <div className="text-2xl font-semibold text-gray-900">{usage?.activeEmployees || 0}</div>
          <div className="mt-2 text-xs text-gray-500">Participated this period</div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="text-sm font-medium text-gray-600 mb-2">Avg Cost/Meal</div>
          <div className="text-2xl font-semibold text-gray-900">
            {formatCurrency(usage?.avgCostPerMealCents || 0)}
          </div>
          <div className="mt-2 flex items-center text-xs text-green-600">
            <TrendingUp className="mr-1 h-3 w-3" />
            3% lower than target
          </div>
        </div>
      </div>

      {/* Weekly Usage Chart */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Weekly Usage Trend</h2>
          <p className="mt-1 text-sm text-gray-600">Meals ordered and cost by week</p>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={usage?.usageByWeek || []}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="week" stroke="#6b7280" tick={{ fill: '#6b7280', fontSize: 12 }} />
            <YAxis stroke="#6b7280" tick={{ fill: '#6b7280', fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '6px',
                padding: '12px',
              }}
              formatter={(value: number, name: string) => {
                if (name === 'meals') return [value, 'Meals']
                return [formatCurrency(value), 'Cost']
              }}
            />
            <Bar dataKey="meals" fill="#3d8f6a" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Category Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Meals by Category</h2>
            <p className="mt-1 text-sm text-gray-600">Distribution of meal types</p>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={usage?.mealsByCategory || []}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="count"
              >
                {usage?.mealsByCategory.map((_entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Category Table */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Category Details</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Count
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Cost
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {usage?.mealsByCategory.map((category, index) => (
                  <tr key={category.name}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div
                          className="w-3 h-3 rounded-full mr-2"
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        />
                        <span className="text-sm font-medium text-gray-900">{category.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                      {category.count}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-right">
                      {formatCurrency(category.totalCents)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Info Box */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
        <h3 className="text-sm font-medium text-gray-900 mb-2">Usage Report Notes</h3>
        <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
          <li>All costs include applicable taxes and fees</li>
          <li>Active employees are those who placed at least one order in the period</li>
          <li>Data is updated daily and reflects completed orders only</li>
          <li>Export functionality includes detailed line-item breakdowns</li>
        </ul>
      </div>
    </div>
  )
}
