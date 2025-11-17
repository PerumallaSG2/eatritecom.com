import React, { useState, useEffect } from 'react'
import {
  BarChart3,
  TrendingUp,
  DollarSign,
  Users,
  ShoppingCart,
  Target,
  Zap,
  Award,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Heart,
  Clock,
  Star,
  Download,
  RefreshCw,
} from 'lucide-react'
import { FadeIn, StaggeredAnimation } from './AnimationComponents'

interface ExecutiveMetric {
  id: string
  title: string
  value: number | string
  unit: string
  change: number
  trend: 'up' | 'down' | 'stable'
  period: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly'
  icon: React.ComponentType<any>
  color: string
  benchmark?: {
    value: number
    label: string
  }
  insights: string[]
}

interface SalesData {
  period: string
  revenue: number
  orders: number
  avgOrderValue: number
  newCustomers: number
  retentionRate: number
}

interface CustomerHealthImpact {
  id: string
  metric: string
  value: number
  unit: string
  improvement: number
  timeframe: string
  category: 'weight' | 'nutrition' | 'wellness' | 'habits'
  testimonials: number
}

interface ROIMetric {
  category: string
  investment: number
  return: number
  roi: number
  paybackPeriod: string
  confidence: number
}

interface PartnershipData {
  partner: string
  type: 'corporate' | 'healthcare' | 'fitness' | 'technology'
  revenue: number
  customers: number
  satisfaction: number
  renewalRate: number
  logo: string
}

const generateExecutiveMetrics = (): ExecutiveMetric[] => [
  {
    id: 'total-revenue',
    title: 'Monthly Revenue',
    value: 2847000,
    unit: '$',
    change: 18.5,
    trend: 'up',
    period: 'monthly',
    icon: DollarSign,
    color: 'green',
    benchmark: { value: 2500000, label: 'Target' },
    insights: [
      'Exceeded monthly target by $347K',
      'Premium plans driving 34% of revenue',
      'Corporate partnerships up 45%',
    ],
  },
  {
    id: 'active-subscribers',
    title: 'Active Subscribers',
    value: 148750,
    unit: '',
    change: 12.3,
    trend: 'up',
    period: 'monthly',
    icon: Users,
    color: 'blue',
    benchmark: { value: 150000, label: 'Q4 Goal' },
    insights: [
      '98.3% within Q4 target',
      'Churn rate decreased to 3.2%',
      'Family plans growing fastest',
    ],
  },
  {
    id: 'avg-order-value',
    title: 'Avg Order Value',
    value: 89.5,
    unit: '$',
    change: 8.7,
    trend: 'up',
    period: 'weekly',
    icon: ShoppingCart,
    color: 'purple',
    benchmark: { value: 85, label: 'Industry Avg' },
    insights: [
      '5.3% above industry average',
      'Premium add-ons increasing AOV',
      'Upsell campaigns effective',
    ],
  },
  {
    id: 'customer-satisfaction',
    title: 'Satisfaction Score',
    value: 4.8,
    unit: '/5',
    change: 6.7,
    trend: 'up',
    period: 'monthly',
    icon: Heart,
    color: 'red',
    benchmark: { value: 4.5, label: 'Excellence' },
    insights: [
      'Highest score in company history',
      'Meal quality improvements recognized',
      'Customer service excellence',
    ],
  },
  {
    id: 'market-share',
    title: 'Market Share',
    value: 23.4,
    unit: '%',
    change: 2.8,
    trend: 'up',
    period: 'quarterly',
    icon: Target,
    color: 'indigo',
    benchmark: { value: 25, label: '2025 Goal' },
    insights: [
      '93.6% of annual goal achieved',
      'Leading in premium segment',
      'Expanding into new markets',
    ],
  },
  {
    id: 'customer-lifetime-value',
    title: 'Customer LTV',
    value: 1847,
    unit: '$',
    change: 15.2,
    trend: 'up',
    period: 'quarterly',
    icon: Award,
    color: 'yellow',
    benchmark: { value: 1500, label: 'Previous' },
    insights: [
      '23% increase from Q3',
      'Retention programs working',
      'Premium tier adoption growing',
    ],
  },
]

const generateSalesData = (): SalesData[] => [
  {
    period: 'Q1 2024',
    revenue: 7200000,
    orders: 92000,
    avgOrderValue: 78.26,
    newCustomers: 18500,
    retentionRate: 84.2,
  },
  {
    period: 'Q2 2024',
    revenue: 8100000,
    orders: 98500,
    avgOrderValue: 82.23,
    newCustomers: 21200,
    retentionRate: 86.7,
  },
  {
    period: 'Q3 2024',
    revenue: 8650000,
    orders: 103200,
    avgOrderValue: 83.85,
    newCustomers: 19800,
    retentionRate: 88.1,
  },
  {
    period: 'Q4 2024',
    revenue: 9200000,
    orders: 108700,
    avgOrderValue: 84.65,
    newCustomers: 22100,
    retentionRate: 89.3,
  },
]

const generateHealthImpacts = (): CustomerHealthImpact[] => [
  {
    id: 'weight-loss',
    metric: 'Average Weight Loss',
    value: 12.4,
    unit: 'lbs',
    improvement: 8.3,
    timeframe: '3 months',
    category: 'weight',
    testimonials: 2847,
  },
  {
    id: 'energy-increase',
    metric: 'Energy Level Improvement',
    value: 73,
    unit: '%',
    improvement: 12.1,
    timeframe: '6 weeks',
    category: 'wellness',
    testimonials: 3291,
  },
  {
    id: 'nutrition-compliance',
    metric: 'Nutrition Goal Achievement',
    value: 87,
    unit: '%',
    improvement: 15.7,
    timeframe: '2 months',
    category: 'nutrition',
    testimonials: 4156,
  },
  {
    id: 'habit-formation',
    metric: 'Healthy Habit Adoption',
    value: 91,
    unit: '%',
    improvement: 22.4,
    timeframe: '90 days',
    category: 'habits',
    testimonials: 2638,
  },
]

const generateROIMetrics = (): ROIMetric[] => [
  {
    category: 'Customer Acquisition',
    investment: 1200000,
    return: 3840000,
    roi: 220,
    paybackPeriod: '4.2 months',
    confidence: 94,
  },
  {
    category: 'Technology Infrastructure',
    investment: 850000,
    return: 2125000,
    roi: 150,
    paybackPeriod: '6.8 months',
    confidence: 87,
  },
  {
    category: 'Corporate Partnerships',
    investment: 450000,
    return: 1890000,
    roi: 320,
    paybackPeriod: '2.1 months',
    confidence: 96,
  },
  {
    category: 'Product Development',
    investment: 680000,
    return: 1564000,
    roi: 130,
    paybackPeriod: '8.5 months',
    confidence: 82,
  },
]

const generatePartnershipData = (): PartnershipData[] => [
  {
    partner: 'Google Health',
    type: 'technology',
    revenue: 485000,
    customers: 12400,
    satisfaction: 4.7,
    renewalRate: 94,
    logo: '🌐',
  },
  {
    partner: 'Peloton',
    type: 'fitness',
    revenue: 387000,
    customers: 8900,
    satisfaction: 4.9,
    renewalRate: 96,
    logo: '🚴',
  },
  {
    partner: 'Kaiser Permanente',
    type: 'healthcare',
    revenue: 724000,
    customers: 15600,
    satisfaction: 4.6,
    renewalRate: 88,
    logo: '🏥',
  },
  {
    partner: 'Microsoft',
    type: 'corporate',
    revenue: 892000,
    customers: 18200,
    satisfaction: 4.8,
    renewalRate: 92,
    logo: '🏢',
  },
]

export const ExecutiveSummaryDashboard: React.FC = () => {
  const [metrics, setMetrics] = useState<ExecutiveMetric[]>([])
  const [salesData, setSalesData] = useState<SalesData[]>([])
  const [healthImpacts, setHealthImpacts] = useState<CustomerHealthImpact[]>([])
  const [roiMetrics, setROIMetrics] = useState<ROIMetric[]>([])
  const [partnerships, setPartnerships] = useState<PartnershipData[]>([])
  const [selectedTimeframe, setSelectedTimeframe] = useState<
    'week' | 'month' | 'quarter' | 'year'
  >('month')
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date())

  useEffect(() => {
    setMetrics(generateExecutiveMetrics())
    setSalesData(generateSalesData())
    setHealthImpacts(generateHealthImpacts())
    setROIMetrics(generateROIMetrics())
    setPartnerships(generatePartnershipData())
  }, [])

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

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

  const getHealthCategoryIcon = (category: string) => {
    switch (category) {
      case 'weight':
        return '⚖️'
      case 'nutrition':
        return '🥗'
      case 'wellness':
        return '💪'
      case 'habits':
        return '✅'
      default:
        return '📊'
    }
  }

  const getPartnerTypeColor = (type: string) => {
    switch (type) {
      case 'corporate':
        return 'bg-blue-100 text-blue-700'
      case 'healthcare':
        return 'bg-green-100 text-green-700'
      case 'fitness':
        return 'bg-purple-100 text-purple-700'
      case 'technology':
        return 'bg-indigo-100 text-indigo-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl overflow-hidden shadow-2xl">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-800 to-blue-900 text-white p-8">
        <FadeIn>
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <BarChart3 className="w-8 h-8" />
                <h2 className="text-3xl font-bold">
                  Executive Summary Dashboard
                </h2>
                <TrendingUp className="w-8 h-8" />
              </div>
              <p className="text-slate-200 text-lg">
                Real-time business intelligence and performance metrics
              </p>
            </div>

            <div className="flex items-center space-x-4">
              <select
                value={selectedTimeframe}
                onChange={e => setSelectedTimeframe(e.target.value as any)}
                className="bg-white/10 border border-white/20 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
              >
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="quarter">This Quarter</option>
                <option value="year">This Year</option>
              </select>

              <button className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-4 py-2 rounded-lg transition-colors">
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>

              <button
                onClick={() => setLastUpdated(new Date())}
                className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Refresh</span>
              </button>
            </div>
          </div>

          <div className="mt-4 text-sm text-slate-300">
            Last updated: {lastUpdated.toLocaleString()}
          </div>
        </FadeIn>
      </div>

      <div className="p-8">
        {/* Key Metrics Grid */}
        <FadeIn delay={0.1}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <StaggeredAnimation>
              {metrics.map(metric => {
                const IconComponent = metric.icon
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
                      {metric.unit === '$'
                        ? formatCurrency(Number(metric.value))
                        : typeof metric.value === 'number'
                          ? formatNumber(metric.value)
                          : metric.value}
                      {metric.unit !== '$' && metric.unit}
                    </div>

                    {metric.benchmark && (
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                        <span>vs {metric.benchmark.label}</span>
                        <span className="font-semibold">
                          {metric.unit === '$'
                            ? formatCurrency(metric.benchmark.value)
                            : `${formatNumber(metric.benchmark.value)}${metric.unit}`}
                        </span>
                      </div>
                    )}

                    <div className="border-t border-gray-100 pt-3">
                      <ul className="space-y-1">
                        {metric.insights.slice(0, 2).map((insight, index) => (
                          <li
                            key={index}
                            className="text-xs text-gray-600 flex items-start"
                          >
                            <Zap className="w-3 h-3 text-yellow-500 mt-0.5 mr-1 flex-shrink-0" />
                            {insight}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )
              })}
            </StaggeredAnimation>
          </div>
        </FadeIn>

        {/* Sales Performance & Health Impact */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Sales Trend */}
          <FadeIn delay={0.2}>
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                  <BarChart3 className="w-5 h-5 text-blue-600 mr-2" />
                  Quarterly Sales Performance
                </h3>
                <span className="text-sm text-gray-500">
                  {selectedTimeframe} view
                </span>
              </div>

              <div className="space-y-4">
                {salesData.map((data, index) => {
                  const isLatest = index === salesData.length - 1
                  return (
                    <div
                      key={data.period}
                      className={`p-4 rounded-lg ${isLatest ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50'}`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span
                          className={`font-semibold ${isLatest ? 'text-blue-900' : 'text-gray-900'}`}
                        >
                          {data.period}
                        </span>
                        <span
                          className={`text-sm ${isLatest ? 'text-blue-600' : 'text-gray-600'}`}
                        >
                          {formatCurrency(data.revenue)}
                        </span>
                      </div>

                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <div className="text-gray-600">Orders</div>
                          <div className="font-semibold">
                            {formatNumber(data.orders)}
                          </div>
                        </div>
                        <div>
                          <div className="text-gray-600">AOV</div>
                          <div className="font-semibold">
                            {formatCurrency(data.avgOrderValue)}
                          </div>
                        </div>
                        <div>
                          <div className="text-gray-600">Retention</div>
                          <div className="font-semibold">
                            {data.retentionRate}%
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="mt-4 p-4 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-2 text-green-800">
                  <TrendingUp className="w-4 h-4" />
                  <span className="font-semibold">28% YoY Growth</span>
                </div>
                <div className="text-sm text-green-700 mt-1">
                  Exceeding industry benchmarks across all key metrics
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Customer Health Impact */}
          <FadeIn delay={0.3}>
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <Heart className="w-5 h-5 text-red-600 mr-2" />
                Customer Health Impact
              </h3>

              <div className="space-y-4">
                {healthImpacts.map(impact => (
                  <div
                    key={impact.id}
                    className="p-4 bg-gradient-to-r from-red-50 to-pink-50 rounded-lg border border-red-100"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl">
                          {getHealthCategoryIcon(impact.category)}
                        </span>
                        <span className="font-semibold text-gray-900">
                          {impact.metric}
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-red-600">
                          {impact.value}
                          {impact.unit}
                        </div>
                        <div className="text-xs text-gray-600">
                          {impact.timeframe}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2">
                        <ArrowUpRight className="w-4 h-4 text-green-500" />
                        <span className="text-green-600 font-semibold">
                          +{impact.improvement}% improvement
                        </span>
                      </div>
                      <div className="flex items-center space-x-1 text-gray-600">
                        <Star className="w-3 h-3" />
                        <span>
                          {formatNumber(impact.testimonials)} testimonials
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 mb-1">
                    94.2%
                  </div>
                  <div className="text-sm text-gray-700">
                    Customer Health Goal Achievement Rate
                  </div>
                  <div className="text-xs text-gray-600 mt-1">
                    Highest in the industry
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* ROI Analysis & Partnership Performance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* ROI Analysis */}
          <FadeIn delay={0.4}>
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <Target className="w-5 h-5 text-purple-600 mr-2" />
                ROI Analysis by Category
              </h3>

              <div className="space-y-4">
                {roiMetrics.map((roi, index) => (
                  <div
                    key={index}
                    className="p-4 bg-purple-50 rounded-lg border border-purple-100"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-gray-900">
                        {roi.category}
                      </h4>
                      <span className="text-sm bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                        {roi.confidence}% confidence
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-3">
                      <div>
                        <div className="text-sm text-gray-600">Investment</div>
                        <div className="font-semibold text-red-600">
                          {formatCurrency(roi.investment)}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Return</div>
                        <div className="font-semibold text-green-600">
                          {formatCurrency(roi.return)}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-bold text-purple-600">
                          {roi.roi}% ROI
                        </span>
                      </div>
                      <div className="text-sm text-gray-600 flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{roi.paybackPeriod}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* B2B Partnership Performance */}
          <FadeIn delay={0.5}>
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <Users className="w-5 h-5 text-indigo-600 mr-2" />
                B2B Partnership Performance
              </h3>

              <div className="space-y-4">
                {partnerships.map((partner, index) => (
                  <div
                    key={index}
                    className="p-4 bg-indigo-50 rounded-lg border border-indigo-100"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{partner.logo}</span>
                        <div>
                          <h4 className="font-semibold text-gray-900">
                            {partner.partner}
                          </h4>
                          <span
                            className={`text-xs px-2 py-1 rounded-full ${getPartnerTypeColor(partner.type)}`}
                          >
                            {partner.type}
                          </span>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="font-semibold text-indigo-600">
                          {formatCurrency(partner.revenue)}
                        </div>
                        <div className="text-xs text-gray-600">
                          {formatNumber(partner.customers)} customers
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <Star className="w-3 h-3 text-yellow-500" />
                          <span>{partner.satisfaction}/5</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <RefreshCw className="w-3 h-3 text-green-500" />
                          <span>{partner.renewalRate}%</span>
                        </div>
                      </div>

                      <div className="text-indigo-600 font-semibold">
                        ${Math.round(partner.revenue / partner.customers)} per
                        customer
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg border border-indigo-200">
                <div className="text-center">
                  <div className="text-2xl font-bold text-indigo-600 mb-1">
                    {formatCurrency(
                      partnerships.reduce((sum, p) => sum + p.revenue, 0)
                    )}
                  </div>
                  <div className="text-sm text-gray-700">
                    Total Partnership Revenue
                  </div>
                  <div className="text-xs text-gray-600 mt-1">
                    {formatNumber(
                      partnerships.reduce((sum, p) => sum + p.customers, 0)
                    )}{' '}
                    total B2B customers
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  )
}

export default ExecutiveSummaryDashboard
