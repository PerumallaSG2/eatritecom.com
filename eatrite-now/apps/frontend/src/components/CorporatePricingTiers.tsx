import React, { useState } from 'react'
import {
  Check,
  Crown,
  Building2,
  Users,
  Calculator,
  TrendingUp,
  Shield,
} from 'lucide-react'

interface PricingTier {
  id: string
  name: string
  displayName: string
  description: string
  icon: React.ReactNode
  price: {
    monthly: number
    annual: number
  }
  discounts: {
    mealDiscount: number
    deliveryDiscount: number
    bulkDiscount: number
  }
  features: string[]
  limits: {
    employees: string
    orders: string
    support: string
  }
  popular?: boolean
  enterprise?: boolean
}

interface CorporatePricingTiersProps {
  currentTier?: string
  employeeCount: number
  onTierSelect?: (tier: string) => void
  onContactSales?: () => void
}

const CorporatePricingTiers: React.FC<CorporatePricingTiersProps> = ({
  currentTier = 'TIER_A',
  employeeCount,
  onTierSelect,
  onContactSales,
}) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>(
    'annual'
  )
  const [showROICalculator, setShowROICalculator] = useState(false)
  const [roiInputs, setROIInputs] = useState({
    avgMealCost: 12,
    employeesUsing: Math.min(employeeCount, 50),
    mealsPerWeek: 3,
  })

  const pricingTiers: PricingTier[] = [
    {
      id: 'TIER_A',
      name: 'Starter',
      displayName: 'Team Starter',
      description:
        'Perfect for small teams getting started with corporate wellness',
      icon: <Users className="w-6 h-6" />,
      price: {
        monthly: 199,
        annual: 1990, // ~17% discount
      },
      discounts: {
        mealDiscount: 10,
        deliveryDiscount: 5,
        bulkDiscount: 5,
      },
      features: [
        'Basic employee meal program',
        'Team ordering dashboard',
        'Basic wellness tracking',
        'Standard customer support',
        'Monthly usage reports',
        'Basic dietary accommodations',
        'Team meal coordination',
      ],
      limits: {
        employees: 'Up to 25 employees',
        orders: '50 orders per month',
        support: 'Email support',
      },
    },
    {
      id: 'TIER_B',
      name: 'Professional',
      displayName: 'Business Pro',
      description:
        'Advanced features for growing companies focused on employee wellness',
      icon: <Building2 className="w-6 h-6" />,
      price: {
        monthly: 449,
        annual: 4490, // ~17% discount
      },
      discounts: {
        mealDiscount: 15,
        deliveryDiscount: 10,
        bulkDiscount: 12,
      },
      features: [
        'Advanced AI meal recommendations',
        'Corporate wellness dashboard',
        'Team challenges & gamification',
        'Priority customer support',
        'Detailed analytics & ROI tracking',
        'Custom dietary programs',
        'Bulk ordering with scheduling',
        'Employee health goal tracking',
        'Nutrition coaching access',
        'Integration with HR systems',
      ],
      limits: {
        employees: 'Up to 100 employees',
        orders: 'Unlimited orders',
        support: 'Phone & email support',
      },
      popular: true,
    },
    {
      id: 'TIER_C',
      name: 'Enterprise',
      displayName: 'Enterprise Elite',
      description:
        'Comprehensive corporate wellness platform for large organizations',
      icon: <Crown className="w-6 h-6" />,
      price: {
        monthly: 999,
        annual: 9990, // ~17% discount
      },
      discounts: {
        mealDiscount: 25,
        deliveryDiscount: 15,
        bulkDiscount: 20,
      },
      features: [
        'White-label wellness platform',
        'Dedicated account manager',
        'Custom integrations & API access',
        '24/7 premium support',
        'Advanced analytics & reporting',
        'Custom meal programs',
        'Multi-location support',
        'Executive wellness programs',
        'Corporate event catering',
        'Employee wellness seminars',
        'Compliance & security features',
        'Custom branding options',
      ],
      limits: {
        employees: 'Unlimited employees',
        orders: 'Unlimited orders',
        support: '24/7 dedicated support',
      },
      enterprise: true,
    },
  ]

  const calculateROI = () => {
    const { avgMealCost, employeesUsing, mealsPerWeek } = roiInputs
    const currentTierData = pricingTiers.find(tier => tier.id === currentTier)
    const monthlyCost = currentTierData
      ? currentTierData.price[billingCycle] /
        (billingCycle === 'annual' ? 12 : 1)
      : 0

    const weeksPerMonth = 4.33
    const totalMealsPerMonth = employeesUsing * mealsPerWeek * weeksPerMonth
    const mealDiscount = currentTierData?.discounts.mealDiscount || 0
    const monthlySavings =
      totalMealsPerMonth * avgMealCost * (mealDiscount / 100)
    const netROI = monthlySavings - monthlyCost
    const roiPercentage = ((monthlySavings - monthlyCost) / monthlyCost) * 100

    return {
      monthlyCost,
      monthlySavings,
      netROI,
      roiPercentage,
      totalMeals: Math.round(totalMealsPerMonth),
    }
  }

  const roiData = calculateROI()

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1
          className="text-4xl font-bold text-[#0F2B1E] mb-4"
          style={{ fontFamily: 'Playfair Display, serif' }}
        >
          Corporate Wellness Pricing
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Choose the perfect plan to nourish your team and boost productivity
        </p>

        {/* Billing Toggle */}
        <div className="inline-flex bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`px-6 py-2 rounded-md font-medium transition-colors ${
              billingCycle === 'monthly'
                ? 'bg-white text-[#0F2B1E] shadow-sm'
                : 'text-gray-600 hover:text-[#0F2B1E]'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingCycle('annual')}
            className={`px-6 py-2 rounded-md font-medium transition-colors relative ${
              billingCycle === 'annual'
                ? 'bg-white text-[#0F2B1E] shadow-sm'
                : 'text-gray-600 hover:text-[#0F2B1E]'
            }`}
          >
            Annual
            <span className="absolute -top-2 -right-2 bg-[#D4B46A] text-[#0F2B1E] text-xs px-2 py-1 rounded-full font-bold">
              Save 17%
            </span>
          </button>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {pricingTiers.map(tier => (
          <div
            key={tier.id}
            className={`relative bg-white rounded-2xl shadow-xl border-2 transition-all duration-300 hover:shadow-2xl ${
              tier.popular
                ? 'border-[#D4B46A] scale-105'
                : currentTier === tier.id
                  ? 'border-[#0F2B1E]'
                  : 'border-gray-200 hover:border-[#D4B46A]'
            }`}
          >
            {/* Popular Badge */}
            {tier.popular && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-gradient-to-r from-[#D4B46A] to-[#B8935A] text-[#0F2B1E] px-4 py-1 rounded-full font-bold text-sm">
                  Most Popular
                </div>
              </div>
            )}

            {/* Current Plan Badge */}
            {currentTier === tier.id && (
              <div className="absolute top-4 right-4">
                <div className="bg-[#0F2B1E] text-white px-3 py-1 rounded-full text-xs font-medium">
                  Current Plan
                </div>
              </div>
            )}

            <div className="p-8">
              {/* Header */}
              <div className="text-center mb-6">
                <div
                  className={`w-16 h-16 mx-auto mb-4 rounded-xl flex items-center justify-center ${
                    tier.popular
                      ? 'bg-gradient-to-br from-[#D4B46A] to-[#B8935A]'
                      : 'bg-gray-100'
                  } text-${tier.popular ? '[#0F2B1E]' : 'gray-600'}`}
                >
                  {tier.icon}
                </div>
                <h3 className="text-2xl font-bold text-[#0F2B1E]">
                  {tier.displayName}
                </h3>
                <p className="text-gray-600 mt-2">{tier.description}</p>
              </div>

              {/* Pricing */}
              <div className="text-center mb-6">
                <div className="flex items-baseline justify-center">
                  <span className="text-4xl font-bold text-[#0F2B1E]">
                    ${tier.price[billingCycle].toLocaleString()}
                  </span>
                  <span className="text-gray-500 ml-2">
                    /{billingCycle === 'annual' ? 'year' : 'month'}
                  </span>
                </div>
                {billingCycle === 'annual' && (
                  <div className="text-sm text-[#D4B46A] font-medium mt-1">
                    ${Math.round(tier.price.annual / 12).toLocaleString()}/month
                    billed annually
                  </div>
                )}
              </div>

              {/* Discounts */}
              <div className="bg-[#F5EEDC] rounded-lg p-4 mb-6">
                <h4 className="font-bold text-[#0F2B1E] mb-2">Your Savings</h4>
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <div className="text-center">
                    <div className="font-bold text-[#D4B46A]">
                      {tier.discounts.mealDiscount}%
                    </div>
                    <div className="text-gray-600">Meals</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-[#D4B46A]">
                      {tier.discounts.deliveryDiscount}%
                    </div>
                    <div className="text-gray-600">Delivery</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-[#D4B46A]">
                      {tier.discounts.bulkDiscount}%
                    </div>
                    <div className="text-gray-600">Bulk</div>
                  </div>
                </div>
              </div>

              {/* Limits */}
              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-sm">
                  <Users className="w-4 h-4 text-[#D4B46A]" />
                  <span className="text-gray-600">{tier.limits.employees}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <TrendingUp className="w-4 h-4 text-[#D4B46A]" />
                  <span className="text-gray-600">{tier.limits.orders}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Shield className="w-4 h-4 text-[#D4B46A]" />
                  <span className="text-gray-600">{tier.limits.support}</span>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-3 mb-8">
                {tier.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              {tier.enterprise ? (
                <button
                  onClick={onContactSales}
                  className="w-full bg-gradient-to-r from-[#0F2B1E] to-[#0A2418] hover:from-[#0A2418] hover:to-[#0F2B1E] text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 hover:scale-105"
                >
                  Contact Sales
                </button>
              ) : currentTier === tier.id ? (
                <button className="w-full bg-gray-200 text-gray-500 font-bold py-4 px-6 rounded-lg cursor-not-allowed">
                  Current Plan
                </button>
              ) : (
                <button
                  onClick={() => onTierSelect?.(tier.id)}
                  className={`w-full font-bold py-4 px-6 rounded-lg transition-all duration-300 hover:scale-105 ${
                    tier.popular
                      ? 'bg-gradient-to-r from-[#D4B46A] to-[#B8935A] text-[#0F2B1E] hover:from-[#B8935A] hover:to-[#D4B46A]'
                      : 'bg-[#0F2B1E] hover:bg-[#0A2418] text-white'
                  }`}
                >
                  Upgrade to {tier.name}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* ROI Calculator */}
      <div className="bg-white rounded-xl p-8 shadow-lg border border-[#D4B46A]/20">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Calculator className="w-6 h-6 text-[#D4B46A]" />
            <h3 className="text-xl font-bold text-[#0F2B1E]">ROI Calculator</h3>
          </div>
          <button
            onClick={() => setShowROICalculator(!showROICalculator)}
            className="text-[#D4B46A] hover:text-[#B8935A] font-medium"
          >
            {showROICalculator ? 'Hide Calculator' : 'Show Calculator'}
          </button>
        </div>

        {showROICalculator && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Inputs */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#0F2B1E] mb-2">
                  Average meal cost per employee
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                    $
                  </span>
                  <input
                    type="number"
                    value={roiInputs.avgMealCost}
                    onChange={e =>
                      setROIInputs(prev => ({
                        ...prev,
                        avgMealCost: Number(e.target.value),
                      }))
                    }
                    className="w-full pl-8 pr-4 py-2 border border-[#D4B46A]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4B46A]/50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#0F2B1E] mb-2">
                  Number of employees using program
                </label>
                <input
                  type="number"
                  value={roiInputs.employeesUsing}
                  onChange={e =>
                    setROIInputs(prev => ({
                      ...prev,
                      employeesUsing: Number(e.target.value),
                    }))
                  }
                  className="w-full px-4 py-2 border border-[#D4B46A]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4B46A]/50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#0F2B1E] mb-2">
                  Average meals per employee per week
                </label>
                <input
                  type="number"
                  value={roiInputs.mealsPerWeek}
                  onChange={e =>
                    setROIInputs(prev => ({
                      ...prev,
                      mealsPerWeek: Number(e.target.value),
                    }))
                  }
                  className="w-full px-4 py-2 border border-[#D4B46A]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4B46A]/50"
                />
              </div>
            </div>

            {/* Results */}
            <div className="bg-gradient-to-br from-[#F5EEDC] to-white p-6 rounded-xl">
              <h4 className="font-bold text-[#0F2B1E] mb-4">
                Monthly ROI Analysis
              </h4>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Platform Cost:</span>
                  <span className="font-bold text-red-600">
                    -${roiData.monthlyCost.toFixed(0)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Meal Savings:</span>
                  <span className="font-bold text-green-600">
                    +${roiData.monthlySavings.toFixed(0)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Meals:</span>
                  <span className="font-medium">
                    {roiData.totalMeals} meals/month
                  </span>
                </div>
                <hr className="border-[#D4B46A]/30" />
                <div className="flex justify-between text-lg">
                  <span className="font-bold text-[#0F2B1E]">Net ROI:</span>
                  <span
                    className={`font-bold ${roiData.netROI >= 0 ? 'text-green-600' : 'text-red-600'}`}
                  >
                    ${roiData.netROI.toFixed(0)}/month
                  </span>
                </div>
                <div className="text-center">
                  <span
                    className={`text-2xl font-bold ${roiData.roiPercentage >= 0 ? 'text-green-600' : 'text-red-600'}`}
                  >
                    {roiData.roiPercentage.toFixed(1)}% ROI
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* FAQ or Additional Info */}
      <div className="bg-[#F5EEDC] rounded-xl p-8">
        <h3 className="text-xl font-bold text-[#0F2B1E] mb-4">
          Why Choose EatRite Corporate?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
          <div>
            <h4 className="font-bold text-[#0F2B1E] mb-2">
              Boost Productivity
            </h4>
            <p className="text-gray-600">
              Nutritious meals lead to 25% increase in workplace productivity
              and focus
            </p>
          </div>
          <div>
            <h4 className="font-bold text-[#0F2B1E] mb-2">
              Reduce Healthcare Costs
            </h4>
            <p className="text-gray-600">
              Companies save an average of $3.27 for every $1 spent on wellness
              programs
            </p>
          </div>
          <div>
            <h4 className="font-bold text-[#0F2B1E] mb-2">Improve Retention</h4>
            <p className="text-gray-600">
              87% of employees consider wellness benefits when choosing
              employers
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CorporatePricingTiers
