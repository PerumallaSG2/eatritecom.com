import React, { useState, useEffect } from 'react'

// UI Components
const Button: React.FC<{
  children: React.ReactNode
  className?: string
  size?: 'sm' | 'md' | 'lg'
  variant?: 'solid' | 'outline'
  onClick?: () => void
}> = ({
  children,
  className = '',
  size = 'md',
  variant = 'solid',
  onClick,
}) => {
  const baseClass =
    'inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2'
  const sizeClass = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  }
  const variantClass =
    variant === 'outline'
      ? 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-gray-500'
      : 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500'

  return (
    <button
      className={`${baseClass} ${sizeClass[size]} ${variantClass} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => (
  <div
    className={`bg-white rounded-lg shadow-sm border border-gray-200 ${className}`}
  >
    {children}
  </div>
)

const Container: React.FC<{
  children: React.ReactNode
  className?: string
}> = ({ children, className = '' }) => (
  <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
    {children}
  </div>
)

interface CompanyInputs {
  employeeCount: number
  averageSalary: number
  currentFoodBudget: number
  healthcareCosts: number
  absenteeismRate: number
  turnoverRate: number
  industryType:
    | 'technology'
    | 'finance'
    | 'healthcare'
    | 'manufacturing'
    | 'retail'
    | 'other'
  currentWellnessPrograms: string[]
}

interface ROIResults {
  totalSavings: number
  productivityGains: number
  healthcareSavings: number
  retentionSavings: number
  absenteeismReduction: number
  eatRiteCosts: number
  netROI: number
  roiPercentage: number
  paybackPeriod: number
  monthlyBenefit: number
}

const CorporateROICalculator: React.FC = () => {
  const [inputs, setInputs] = useState<CompanyInputs>({
    employeeCount: 100,
    averageSalary: 75000,
    currentFoodBudget: 0,
    healthcareCosts: 12000,
    absenteeismRate: 3.2,
    turnoverRate: 15,
    industryType: 'technology',
    currentWellnessPrograms: [],
  })

  const [results, setResults] = useState<ROIResults | null>(null)
  const [activeTab, setActiveTab] = useState<
    'calculator' | 'results' | 'comparison' | 'case_studies'
  >('calculator')
  const [showAdvanced, setShowAdvanced] = useState(false)

  // Calculate ROI when inputs change
  useEffect(() => {
    calculateROI()
  }, [inputs])

  const calculateROI = () => {
    const {
      employeeCount,
      averageSalary,
      healthcareCosts,
      absenteeismRate,
      turnoverRate,
      industryType,
    } = inputs

    // Industry multipliers for different benefits
    const industryMultipliers = {
      technology: { productivity: 1.2, healthcare: 1.1, retention: 1.3 },
      finance: { productivity: 1.1, healthcare: 1.0, retention: 1.2 },
      healthcare: { productivity: 1.0, healthcare: 1.3, retention: 1.1 },
      manufacturing: { productivity: 1.3, healthcare: 1.2, retention: 1.0 },
      retail: { productivity: 1.1, healthcare: 1.0, retention: 1.4 },
      other: { productivity: 1.0, healthcare: 1.0, retention: 1.0 },
    }

    const multiplier = industryMultipliers[industryType]

    // EatRite costs calculation
    const monthlyMealCost = 18 // Average cost per meal per employee
    const mealsPerEmployeePerMonth = 20 // Assuming work days
    const eatRiteCosts =
      employeeCount * monthlyMealCost * mealsPerEmployeePerMonth * 12

    // Productivity gains (estimated 8-15% improvement)
    const productivityImprovement = 0.12 * multiplier.productivity
    const productivityGains =
      employeeCount * averageSalary * productivityImprovement

    // Healthcare cost savings (estimated 15-25% reduction)
    const healthcareReduction = 0.2 * multiplier.healthcare
    const healthcareSavings =
      employeeCount * healthcareCosts * healthcareReduction

    // Retention improvements (reduce turnover by 30-40%)
    const turnoverReduction = 0.35 * multiplier.retention
    const costPerTurnover = averageSalary * 0.75 // 75% of salary is typical cost
    const currentTurnoverCost =
      ((employeeCount * turnoverRate) / 100) * costPerTurnover
    const retentionSavings = currentTurnoverCost * turnoverReduction

    // Absenteeism reduction (reduce by 25-35%)
    const absenteeismReductionRate = 0.3
    const dailyCostPerEmployee = averageSalary / 252 // 252 work days per year
    const currentAbsenteeismCost =
      employeeCount * (absenteeismRate / 100) * 252 * dailyCostPerEmployee
    const absenteeismReduction =
      currentAbsenteeismCost * absenteeismReductionRate

    // Total savings
    const totalSavings =
      productivityGains +
      healthcareSavings +
      retentionSavings +
      absenteeismReduction

    // Net ROI
    const netROI = totalSavings - eatRiteCosts
    const roiPercentage = (netROI / eatRiteCosts) * 100

    // Payback period in months
    const monthlyBenefit = totalSavings / 12
    const monthlyEatRiteCost = eatRiteCosts / 12
    const paybackPeriod =
      monthlyEatRiteCost / (monthlyBenefit - monthlyEatRiteCost)

    setResults({
      totalSavings,
      productivityGains,
      healthcareSavings,
      retentionSavings,
      absenteeismReduction,
      eatRiteCosts,
      netROI,
      roiPercentage,
      paybackPeriod: Math.max(0, paybackPeriod),
      monthlyBenefit,
    })
  }

  const handleInputChange = (field: keyof CompanyInputs, value: any) => {
    setInputs(prev => ({ ...prev, [field]: value }))
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const industryBenchmarks = {
    technology: {
      avgEmployees: 250,
      avgSalary: 95000,
      healthcareCosts: 15000,
      absenteeism: 2.8,
      turnover: 12,
    },
    finance: {
      avgEmployees: 180,
      avgSalary: 85000,
      healthcareCosts: 13500,
      absenteeism: 3.1,
      turnover: 10,
    },
    healthcare: {
      avgEmployees: 300,
      avgSalary: 70000,
      healthcareCosts: 16000,
      absenteeism: 4.2,
      turnover: 18,
    },
    manufacturing: {
      avgEmployees: 420,
      avgSalary: 55000,
      healthcareCosts: 11000,
      absenteeism: 4.8,
      turnover: 20,
    },
    retail: {
      avgEmployees: 150,
      avgSalary: 35000,
      healthcareCosts: 8500,
      absenteeism: 5.2,
      turnover: 35,
    },
    other: {
      avgEmployees: 200,
      avgSalary: 65000,
      healthcareCosts: 12000,
      absenteeism: 3.5,
      turnover: 15,
    },
  }

  const applyIndustryDefaults = () => {
    const benchmark = industryBenchmarks[inputs.industryType]
    setInputs(prev => ({
      ...prev,
      averageSalary: benchmark.avgSalary,
      healthcareCosts: benchmark.healthcareCosts,
      absenteeismRate: benchmark.absenteeism,
      turnoverRate: benchmark.turnover,
    }))
  }

  const renderCalculator = () => (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Corporate Wellness ROI Calculator
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Discover the financial impact of implementing EatRite's corporate
          wellness program. Our calculator uses industry benchmarks and proven
          data to estimate your potential return on investment.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-6">Company Information</h3>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Industry Type
              </label>
              <select
                value={inputs.industryType}
                onChange={e =>
                  handleInputChange('industryType', e.target.value as any)
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="technology">Technology</option>
                <option value="finance">Finance & Banking</option>
                <option value="healthcare">Healthcare</option>
                <option value="manufacturing">Manufacturing</option>
                <option value="retail">Retail</option>
                <option value="other">Other</option>
              </select>
              <Button
                size="sm"
                variant="outline"
                className="mt-2"
                onClick={applyIndustryDefaults}
              >
                Apply Industry Defaults
              </Button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of Employees
              </label>
              <input
                type="number"
                value={inputs.employeeCount}
                onChange={e =>
                  handleInputChange(
                    'employeeCount',
                    parseInt(e.target.value) || 0
                  )
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                min="1"
                max="10000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Average Annual Salary ($)
              </label>
              <input
                type="number"
                value={inputs.averageSalary}
                onChange={e =>
                  handleInputChange(
                    'averageSalary',
                    parseInt(e.target.value) || 0
                  )
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                min="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Annual Healthcare Costs per Employee ($)
              </label>
              <input
                type="number"
                value={inputs.healthcareCosts}
                onChange={e =>
                  handleInputChange(
                    'healthcareCosts',
                    parseInt(e.target.value) || 0
                  )
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                min="0"
              />
            </div>

            {/* Advanced Options */}
            <div>
              <button
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="text-green-600 hover:text-green-700 font-medium text-sm flex items-center gap-2"
              >
                <span>{showAdvanced ? '▼' : '▶'}</span>
                Advanced Options
              </button>

              {showAdvanced && (
                <div className="mt-4 space-y-4 border-t pt-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Absenteeism Rate (%)
                    </label>
                    <input
                      type="number"
                      value={inputs.absenteeismRate}
                      onChange={e =>
                        handleInputChange(
                          'absenteeismRate',
                          parseFloat(e.target.value) || 0
                        )
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      min="0"
                      max="50"
                      step="0.1"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Annual Turnover Rate (%)
                    </label>
                    <input
                      type="number"
                      value={inputs.turnoverRate}
                      onChange={e =>
                        handleInputChange(
                          'turnoverRate',
                          parseFloat(e.target.value) || 0
                        )
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      min="0"
                      max="100"
                      step="0.1"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Annual Food Budget ($)
                    </label>
                    <input
                      type="number"
                      value={inputs.currentFoodBudget}
                      onChange={e =>
                        handleInputChange(
                          'currentFoodBudget',
                          parseInt(e.target.value) || 0
                        )
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      min="0"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* Quick Results Section */}
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-6">ROI Summary</h3>

          {results && (
            <div className="space-y-6">
              <div className="text-center bg-green-50 border border-green-200 rounded-lg p-6">
                <p className="text-sm text-green-800 mb-2">
                  Annual Return on Investment
                </p>
                <p className="text-4xl font-bold text-green-600">
                  {results.roiPercentage > 0 ? '+' : ''}
                  {results.roiPercentage.toFixed(0)}%
                </p>
                <p className="text-sm text-green-700 mt-2">
                  {formatCurrency(results.netROI)} net benefit
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">
                    {formatCurrency(results.totalSavings)}
                  </p>
                  <p className="text-sm text-gray-600">Total Annual Savings</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-600">
                    {results.paybackPeriod.toFixed(1)} mo
                  </p>
                  <p className="text-sm text-gray-600">Payback Period</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Productivity Gains</span>
                  <span className="font-semibold text-green-600">
                    {formatCurrency(results.productivityGains)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Healthcare Savings</span>
                  <span className="font-semibold text-blue-600">
                    {formatCurrency(results.healthcareSavings)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Retention Savings</span>
                  <span className="font-semibold text-purple-600">
                    {formatCurrency(results.retentionSavings)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Reduced Absenteeism</span>
                  <span className="font-semibold text-orange-600">
                    {formatCurrency(results.absenteeismReduction)}
                  </span>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">EatRite Investment</span>
                  <span className="font-semibold text-gray-900">
                    {formatCurrency(results.eatRiteCosts)}
                  </span>
                </div>
              </div>

              <Button
                className="w-full bg-green-600 hover:bg-green-700"
                onClick={() => setActiveTab('results')}
              >
                View Detailed Analysis
              </Button>
            </div>
          )}
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Industry Benchmarks</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {Object.entries(industryBenchmarks).map(([industry, data]) => (
            <div
              key={industry}
              className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                inputs.industryType === industry
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-200 hover:bg-gray-50'
              }`}
              onClick={() => handleInputChange('industryType', industry as any)}
            >
              <h4 className="font-medium text-sm capitalize mb-2">
                {industry.replace('_', ' ')}
              </h4>
              <div className="text-xs text-gray-600 space-y-1">
                <div>Avg Employees: {data.avgEmployees}</div>
                <div>Avg Salary: {formatCurrency(data.avgSalary)}</div>
                <div>Turnover: {data.turnover}%</div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )

  const renderResults = () => (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Detailed ROI Analysis
        </h2>
        <p className="text-lg text-gray-600">
          Comprehensive breakdown of your potential return on investment
        </p>
      </div>

      {results && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 text-center">
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-green-600 text-xl">💰</span>
              </div>
              <p className="text-2xl font-bold text-green-600">
                {results.roiPercentage.toFixed(0)}%
              </p>
              <p className="text-sm text-gray-600">Annual ROI</p>
            </Card>

            <Card className="p-6 text-center">
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 text-xl">📈</span>
              </div>
              <p className="text-2xl font-bold text-blue-600">
                {formatCurrency(results.totalSavings)}
              </p>
              <p className="text-sm text-gray-600">Total Savings</p>
            </Card>

            <Card className="p-6 text-center">
              <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-purple-600 text-xl">⏱️</span>
              </div>
              <p className="text-2xl font-bold text-purple-600">
                {results.paybackPeriod.toFixed(1)}
              </p>
              <p className="text-sm text-gray-600">Payback (months)</p>
            </Card>

            <Card className="p-6 text-center">
              <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-orange-600 text-xl">📊</span>
              </div>
              <p className="text-2xl font-bold text-orange-600">
                {formatCurrency(results.monthlyBenefit)}
              </p>
              <p className="text-sm text-gray-600">Monthly Benefit</p>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Cost-Benefit Breakdown
              </h3>
              <div className="space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-medium text-green-900 mb-3">
                    💪 Benefits (Annual)
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Productivity Improvements</span>
                      <span className="font-semibold">
                        {formatCurrency(results.productivityGains)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Healthcare Cost Reduction</span>
                      <span className="font-semibold">
                        {formatCurrency(results.healthcareSavings)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Employee Retention Savings</span>
                      <span className="font-semibold">
                        {formatCurrency(results.retentionSavings)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Reduced Absenteeism</span>
                      <span className="font-semibold">
                        {formatCurrency(results.absenteeismReduction)}
                      </span>
                    </div>
                    <hr className="my-2" />
                    <div className="flex justify-between font-semibold text-green-700">
                      <span>Total Benefits</span>
                      <span>{formatCurrency(results.totalSavings)}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-3">
                    💳 Investment
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>EatRite Program Cost</span>
                      <span className="font-semibold">
                        {formatCurrency(results.eatRiteCosts)}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs text-gray-600">
                      <span>
                        ({inputs.employeeCount} employees × $18/meal × 20
                        meals/month)
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-medium text-blue-900 mb-3">
                    🎯 Net Result
                  </h4>
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Annual Net Benefit</span>
                    <span
                      className={
                        results.netROI > 0 ? 'text-green-600' : 'text-red-600'
                      }
                    >
                      {formatCurrency(results.netROI)}
                    </span>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                ROI Timeline Projection
              </h3>
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map(year => {
                  const yearlyBenefit =
                    results.totalSavings - results.eatRiteCosts
                  const cumulativeBenefit = yearlyBenefit * year
                  const cumulativeROI =
                    (cumulativeBenefit / (results.eatRiteCosts * year)) * 100

                  return (
                    <div
                      key={year}
                      className="border border-gray-200 rounded-lg p-4"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">Year {year}</h4>
                        <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
                          {cumulativeROI.toFixed(0)}% ROI
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Annual Benefit</p>
                          <p className="font-semibold">
                            {formatCurrency(yearlyBenefit)}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-600">Cumulative</p>
                          <p className="font-semibold">
                            {formatCurrency(cumulativeBenefit)}
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                📈 Productivity Impact
              </h3>
              <div className="space-y-3 text-sm">
                <div className="bg-blue-50 border border-blue-200 rounded p-3">
                  <p className="font-medium text-blue-900">
                    Expected Improvements
                  </p>
                  <ul className="mt-2 text-blue-800 space-y-1">
                    <li>• 12% increase in daily productivity</li>
                    <li>• 35% reduction in afternoon fatigue</li>
                    <li>• 28% improvement in focus</li>
                    <li>• Better team collaboration</li>
                  </ul>
                </div>
                <p className="text-gray-600">
                  Based on studies with over 500 corporate clients
                </p>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">🏥 Health Benefits</h3>
              <div className="space-y-3 text-sm">
                <div className="bg-green-50 border border-green-200 rounded p-3">
                  <p className="font-medium text-green-900">
                    Wellness Improvements
                  </p>
                  <ul className="mt-2 text-green-800 space-y-1">
                    <li>• 20% reduction in healthcare costs</li>
                    <li>• 45% fewer sick days</li>
                    <li>• Improved biomarkers</li>
                    <li>• Better mental health</li>
                  </ul>
                </div>
                <p className="text-gray-600">
                  Measured over 12-month implementation periods
                </p>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                👥 Retention Impact
              </h3>
              <div className="space-y-3 text-sm">
                <div className="bg-purple-50 border border-purple-200 rounded p-3">
                  <p className="font-medium text-purple-900">
                    Employee Benefits
                  </p>
                  <ul className="mt-2 text-purple-800 space-y-1">
                    <li>• 35% reduction in turnover</li>
                    <li>• Higher job satisfaction</li>
                    <li>• Improved work-life balance</li>
                    <li>• Enhanced company culture</li>
                  </ul>
                </div>
                <p className="text-gray-600">
                  Consistent results across all company sizes
                </p>
              </div>
            </Card>
          </div>
        </>
      )}
    </div>
  )

  const tabs = [
    { key: 'calculator', label: 'ROI Calculator', icon: '🧮' },
    { key: 'results', label: 'Detailed Results', icon: '📊' },
    { key: 'comparison', label: 'Industry Comparison', icon: '⚖️' },
    { key: 'case_studies', label: 'Case Studies', icon: '📋' },
  ]

  return (
    <Container className="py-8">
      <div className="max-w-7xl mx-auto">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-gray-200">
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-t-lg font-medium transition-colors ${
                activeTab === tab.key
                  ? 'bg-green-50 text-green-700 border-b-2 border-green-600'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === 'calculator' && renderCalculator()}
          {activeTab === 'results' && renderResults()}
          {activeTab === 'comparison' && (
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold mb-4">Industry Comparison</h2>
              <p className="text-gray-600">
                Compare your ROI with industry benchmarks and peer companies
              </p>
            </div>
          )}
          {activeTab === 'case_studies' && (
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold mb-4">Success Case Studies</h2>
              <p className="text-gray-600">
                Real examples from companies similar to yours
              </p>
            </div>
          )}
        </div>

        {/* CTA Section */}
        {results && results.roiPercentage > 0 && (
          <Card className="p-8 mt-12 bg-gradient-to-r from-green-50 to-blue-50 border border-green-200">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Ready to achieve {results.roiPercentage.toFixed(0)}% ROI?
              </h3>
              <p className="text-lg text-gray-600 mb-6">
                Join over 500+ companies already transforming their workplace
                wellness
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-green-600 hover:bg-green-700">
                  Schedule a Demo
                </Button>
                <Button size="lg" variant="outline">
                  Download Full Report
                </Button>
              </div>
            </div>
          </Card>
        )}
      </div>
    </Container>
  )
}

export default CorporateROICalculator
