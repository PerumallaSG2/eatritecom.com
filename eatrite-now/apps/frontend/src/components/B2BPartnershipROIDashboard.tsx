import { useState } from 'react'
import {
  Building2,
  DollarSign,
  Users,
  Target,
  Award,
  ArrowUpRight,
  CheckCircle,
  Download,
  RefreshCw,
  Calendar,
  Phone,
  Mail,
} from 'lucide-react'

const B2BPartnershipROIDashboard = () => {
  const [timeframe, setTimeframe] = useState('month')
  const [selectedMetric, setSelectedMetric] = useState('revenue')

  const timeframes = [
    { id: 'week', label: 'Last Week' },
    { id: 'month', label: 'Last Month' },
    { id: 'quarter', label: 'Last Quarter' },
    { id: 'year', label: 'Last Year' },
  ]

  const keyMetrics = [
    {
      id: 'revenue',
      title: 'Total Revenue',
      value: '$2.4M',
      change: 23.5,
      trend: 'up',
      icon: DollarSign,
      description: 'Revenue generated from B2B partnerships',
    },
    {
      id: 'partners',
      title: 'Active Partners',
      value: '156',
      change: 8.2,
      trend: 'up',
      icon: Building2,
      description: 'Current active business partnerships',
    },
    {
      id: 'employees',
      title: 'Employees Served',
      value: '12,340',
      change: 15.7,
      trend: 'up',
      icon: Users,
      description: 'Total employees receiving meal benefits',
    },
    {
      id: 'satisfaction',
      title: 'Satisfaction Rate',
      value: '94.2%',
      change: 2.1,
      trend: 'up',
      icon: Award,
      description: 'Average employee satisfaction score',
    },
  ]

  const recentPartnerships = [
    {
      id: 1,
      company: 'TechCorp Solutions',
      industry: 'Technology',
      employees: 450,
      startDate: '2024-11-01',
      monthlyValue: '$18,750',
      status: 'Active',
    },
    {
      id: 2,
      company: 'Green Energy Inc',
      industry: 'Clean Energy',
      employees: 280,
      startDate: '2024-10-15',
      monthlyValue: '$11,200',
      status: 'Active',
    },
    {
      id: 3,
      company: 'Healthcare Partners',
      industry: 'Healthcare',
      employees: 720,
      startDate: '2024-10-08',
      monthlyValue: '$28,800',
      status: 'Pending',
    },
    {
      id: 4,
      company: 'Financial Group LLC',
      industry: 'Finance',
      employees: 320,
      startDate: '2024-09-22',
      monthlyValue: '$12,800',
      status: 'Active',
    },
  ]

  const industryBreakdown = [
    { industry: 'Technology', partners: 45, percentage: 28.8 },
    { industry: 'Healthcare', partners: 32, percentage: 20.5 },
    { industry: 'Finance', partners: 28, percentage: 17.9 },
    { industry: 'Manufacturing', partners: 25, percentage: 16.0 },
    { industry: 'Other', partners: 26, percentage: 16.7 },
  ]

  const partnershipBenefits = [
    {
      title: 'Employee Wellness',
      description:
        'Improve employee health and satisfaction with premium meal options',
      icon: Award,
      metrics: [
        '94% satisfaction',
        '23% health improvement',
        '15% productivity boost',
      ],
    },
    {
      title: 'Cost Savings',
      description:
        'Reduce corporate food costs while providing better nutrition',
      icon: DollarSign,
      metrics: [
        '30% cost reduction',
        'Bulk pricing available',
        'Tax-deductible wellness benefit',
      ],
    },
    {
      title: 'Easy Management',
      description: 'Streamlined ordering and billing through our B2B portal',
      icon: Target,
      metrics: ['Automated billing', 'Usage analytics', '24/7 support'],
    },
  ]

  return (
    <div className="min-h-screen bg-[#F5EEDC]">
      {/* Enhanced Dashboard Header */}
      <section className="py-16 bg-gradient-to-br from-[#0F2B1E] to-[#1a4d33] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12">
            <div className="mb-8 lg:mb-0">
              <h1 className="text-4xl md:text-5xl font-semibold mb-6 text-white font-playfair">
                B2B Partnership Dashboard
              </h1>
              <p className="text-xl text-white/90 max-w-2xl leading-relaxed">
                Track ROI, monitor partnerships, and optimize corporate wellness
                programs with comprehensive analytics and insights.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <select
                value={timeframe}
                onChange={e => setTimeframe(e.target.value)}
                className="appearance-none bg-white/10 border border-white/30 rounded-lg px-4 py-3 pr-10 focus:outline-none focus:border-[#D4B46A] focus:bg-white/20 text-white backdrop-blur-sm"
              >
                {timeframes.map(tf => (
                  <option key={tf.id} value={tf.id} className="text-gray-800">
                    {tf.label}
                  </option>
                ))}
              </select>

              <div className="flex gap-3">
                <button className="border-2 border-white/30 hover:border-[#D4B46A] hover:bg-[#D4B46A] hover:text-[#0F2B1E] text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Export Report
                </button>
                <button className="bg-[#D4B46A] hover:bg-[#b8986b] text-[#0F2B1E] font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center gap-2">
                  <RefreshCw className="w-4 h-4" />
                  Refresh Data
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Key Metrics */}
      <section className="py-16 -mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {keyMetrics.map(metric => (
              <div
                key={metric.id}
                className={`bg-white rounded-xl border p-8 cursor-pointer transition-all duration-200 hover:shadow-lg ${
                  selectedMetric === metric.id
                    ? 'border-[#D4B46A] shadow-lg bg-[#F5F2E8]'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setSelectedMetric(metric.id)}
              >
                <div className="flex items-center justify-between mb-6">
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      selectedMetric === metric.id
                        ? 'bg-[#D4B46A]/20'
                        : 'bg-gray-50'
                    }`}
                  >
                    <metric.icon
                      className={`w-6 h-6 ${
                        selectedMetric === metric.id
                          ? 'text-[#D4B46A]'
                          : 'text-gray-600'
                      }`}
                    />
                  </div>
                  <div
                    className={`flex items-center text-sm font-medium px-3 py-1 rounded-full ${
                      metric.trend === 'up'
                        ? 'text-green-700 bg-green-50'
                        : 'text-red-700 bg-red-50'
                    }`}
                  >
                    <ArrowUpRight className="w-3 h-3 mr-1" />+{metric.change}%
                  </div>
                </div>

                <div className="mb-4">
                  <div className="text-3xl font-bold text-[#0F2B1E] mb-2">
                    {metric.value}
                  </div>
                  <div className="text-sm font-semibold text-gray-700">
                    {metric.title}
                  </div>
                </div>

                <p className="text-xs text-gray-600 leading-relaxed">
                  {metric.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Recent Partnerships */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
            <div>
              <h2 className="text-3xl font-semibold text-[#0F2B1E] font-playfair">
                Recent Partnerships
              </h2>
              <p className="text-gray-600 mt-2">
                Latest corporate partnerships and their performance metrics
              </p>
            </div>
            <button className="bg-[#0F2B1E] hover:bg-[#1a4d33] text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200">
              View All Partners
            </button>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#F5EEDC]">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-[#0F2B1E]">
                      Company
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-[#0F2B1E]">
                      Industry
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-[#0F2B1E]">
                      Employees
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-[#0F2B1E]">
                      Monthly Value
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-[#0F2B1E]">
                      Start Date
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-[#0F2B1E]">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {recentPartnerships.map(partnership => (
                    <tr
                      key={partnership.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center mr-3">
                            <Building2 className="w-5 h-5 text-gray-500" />
                          </div>
                          <div className="font-semibold text-[#0F2B1E]">
                            {partnership.company}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                          {partnership.industry}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-700 font-medium">
                        {partnership.employees.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 font-bold text-[#D4B46A]">
                        {partnership.monthlyValue}
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {new Date(partnership.startDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                            partnership.status === 'Active'
                              ? 'bg-green-50 text-green-700 border border-green-200'
                              : 'bg-yellow-50 text-yellow-700 border border-yellow-200'
                          }`}
                        >
                          <CheckCircle className="w-3 h-3 mr-1" />
                          {partnership.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Industry Breakdown & Partnership Benefits */}
      <section className="py-16 bg-[#F5EEDC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Enhanced Industry Breakdown */}
            <div>
              <h3 className="text-2xl font-semibold text-[#0F2B1E] mb-6 font-playfair">
                Partnership by Industry
              </h3>
              <div className="bg-white rounded-xl border border-gray-200 p-8">
                <div className="space-y-6">
                  {industryBreakdown.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center">
                        <div
                          className="w-4 h-4 rounded-full mr-4"
                          style={{
                            backgroundColor: `hsl(${120 + idx * 30}, 65%, 50%)`,
                          }}
                        ></div>
                        <span className="font-medium text-gray-700">
                          {item.industry}
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-[#0F2B1E] text-lg">
                          {item.partners}
                        </div>
                        <div className="text-sm text-gray-500 font-medium">
                          {item.percentage}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Total Partners</span>
                    <span className="font-bold text-[#0F2B1E]">
                      156 Companies
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Partnership Benefits */}
            <div>
              <h3 className="text-2xl font-semibold text-[#0F2B1E] mb-6 font-playfair">
                Partnership Benefits
              </h3>
              <div className="space-y-6">
                {partnershipBenefits.map((benefit, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-200"
                  >
                    <div className="flex items-start">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-50 to-green-100 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                        <benefit.icon className="w-6 h-6 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-[#0F2B1E] mb-2">
                          {benefit.title}
                        </h4>
                        <p className="text-gray-600 mb-4 leading-relaxed">
                          {benefit.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {benefit.metrics.map((metric, metricIdx) => (
                            <span
                              key={metricIdx}
                              className="bg-green-50 text-green-700 px-3 py-2 rounded-lg text-sm font-medium border border-green-200"
                            >
                              {metric}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Contact & CTA */}
      <section className="py-20 bg-gradient-to-br from-[#0F2B1E] to-[#1a4d33] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-semibold mb-6 text-white font-playfair">
            Ready to Partner with EatRite?
          </h2>
          <p className="text-xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
            Join 150+ companies providing premium wellness benefits to their
            employees. Let's discuss how we can customize a solution for your
            organization.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button className="bg-[#D4B46A] hover:bg-[#b8986b] text-[#0F2B1E] font-semibold py-4 px-8 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2">
              <Calendar className="w-5 h-5" />
              Schedule Demo
            </button>
            <button className="border-2 border-white/30 hover:border-[#D4B46A] hover:bg-[#D4B46A] hover:text-[#0F2B1E] text-white font-semibold py-4 px-8 rounded-lg transition-all duration-200 flex items-center justify-center gap-2">
              <Download className="w-5 h-5" />
              Download Partnership Guide
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="w-12 h-12 bg-[#D4B46A] rounded-lg flex items-center justify-center mx-auto mb-4">
                <Phone className="w-6 h-6 text-[#0F2B1E]" />
              </div>
              <div className="font-semibold text-white mb-2">
                Call Partnership Team
              </div>
              <div className="text-white/80 mb-2">1-800-EATRITE</div>
              <div className="text-sm text-white/60">
                Available Mon-Fri 9AM-6PM EST
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="w-12 h-12 bg-[#D4B46A] rounded-lg flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6 text-[#0F2B1E]" />
              </div>
              <div className="font-semibold text-white mb-2">
                Email Partnerships
              </div>
              <div className="text-white/80 mb-2">partnerships@eatrite.com</div>
              <div className="text-sm text-white/60">
                24-hour response guarantee
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default B2BPartnershipROIDashboard
