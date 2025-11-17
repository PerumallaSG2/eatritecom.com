import React, { useState, useEffect } from 'react'
import {
  Calculator,
  DollarSign,
  Clock,
  TrendingUp,
  ShoppingCart,
  CheckCircle,
  ArrowRight,
} from 'lucide-react'
import { FadeIn, StaggeredAnimation } from './AnimationComponents'

interface ROICalculation {
  weeklySavings: number
  monthlySavings: number
  yearlySavings: number
  timeSaved: number
  gasSavings: number
  totalValue: number
}

interface UserInputs {
  householdSize: number
  currentGrocerySpend: number
  restaurantVisits: number
  avgRestaurantCost: number
  cookingHoursPerWeek: number
  groceryTripsPerWeek: number
}

export const ROICalculator: React.FC = () => {
  const [inputs, setInputs] = useState<UserInputs>({
    householdSize: 2,
    currentGrocerySpend: 150,
    restaurantVisits: 3,
    avgRestaurantCost: 45,
    cookingHoursPerWeek: 6,
    groceryTripsPerWeek: 2,
  })

  const [results, setResults] = useState<ROICalculation>({
    weeklySavings: 0,
    monthlySavings: 0,
    yearlySavings: 0,
    timeSaved: 0,
    gasSavings: 0,
    totalValue: 0,
  })

  const [isCalculated, setIsCalculated] = useState(false)

  const factor75WeeklyCost =
    inputs.householdSize <= 2 ? 162 : inputs.householdSize * 81

  useEffect(() => {
    calculateROI()
  }, [inputs])

  const calculateROI = () => {
    const weeklyGroceryCost = inputs.currentGrocerySpend
    const weeklyRestaurantCost =
      inputs.restaurantVisits * inputs.avgRestaurantCost
    const currentWeeklySpend = weeklyGroceryCost + weeklyRestaurantCost

    const weeklySavings = Math.max(0, currentWeeklySpend - factor75WeeklyCost)
    const monthlySavings = weeklySavings * 4.33
    const yearlySavings = weeklySavings * 52

    // Time calculations (valued at $25/hour)
    const timeSaved =
      inputs.cookingHoursPerWeek + inputs.groceryTripsPerWeek * 1.5 // 1.5 hours per grocery trip
    const timeValue = timeSaved * 25 * 52 // Annual time value

    // Gas savings (estimated $5 per grocery trip)
    const gasSavings = inputs.groceryTripsPerWeek * 5 * 52

    const totalValue = yearlySavings + timeValue + gasSavings

    setResults({
      weeklySavings,
      monthlySavings,
      yearlySavings,
      timeSaved,
      gasSavings,
      totalValue,
    })
  }

  const handleCalculate = () => {
    calculateROI()
    setIsCalculated(true)
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-8 shadow-xl">
      <FadeIn>
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Calculator className="w-8 h-8 text-blue-600 mr-3" />
            <h2 className="text-3xl font-bold text-gray-900">
              Factor75 ROI Calculator
            </h2>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover how much you could save with Factor75 vs. your current
            grocery and restaurant spending
          </p>
        </div>
      </FadeIn>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <FadeIn delay={0.2}>
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              Tell us about your current spending
            </h3>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Household Size
                </label>
                <select
                  value={inputs.householdSize}
                  onChange={e =>
                    setInputs({
                      ...inputs,
                      householdSize: parseInt(e.target.value),
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value={1}>1 person</option>
                  <option value={2}>2 people</option>
                  <option value={3}>3 people</option>
                  <option value={4}>4 people</option>
                  <option value={5}>5+ people</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Weekly Grocery Spending
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="number"
                    value={inputs.currentGrocerySpend}
                    onChange={e =>
                      setInputs({
                        ...inputs,
                        currentGrocerySpend: parseInt(e.target.value) || 0,
                      })
                    }
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="150"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Restaurant Visits per Week
                </label>
                <input
                  type="number"
                  value={inputs.restaurantVisits}
                  onChange={e =>
                    setInputs({
                      ...inputs,
                      restaurantVisits: parseInt(e.target.value) || 0,
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="3"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Average Restaurant Cost per Visit
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="number"
                    value={inputs.avgRestaurantCost}
                    onChange={e =>
                      setInputs({
                        ...inputs,
                        avgRestaurantCost: parseInt(e.target.value) || 0,
                      })
                    }
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="45"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hours Cooking per Week
                </label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="number"
                    value={inputs.cookingHoursPerWeek}
                    onChange={e =>
                      setInputs({
                        ...inputs,
                        cookingHoursPerWeek: parseInt(e.target.value) || 0,
                      })
                    }
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="6"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Grocery Trips per Week
                </label>
                <div className="relative">
                  <ShoppingCart className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="number"
                    value={inputs.groceryTripsPerWeek}
                    onChange={e =>
                      setInputs({
                        ...inputs,
                        groceryTripsPerWeek: parseInt(e.target.value) || 0,
                      })
                    }
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="2"
                  />
                </div>
              </div>

              <button
                onClick={handleCalculate}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <Calculator className="w-5 h-5" />
                <span>Calculate My Savings</span>
              </button>
            </div>
          </div>
        </FadeIn>

        {/* Results Section */}
        <FadeIn delay={0.4}>
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Your Potential Savings
              </h3>
              <p className="text-sm text-gray-600">
                Factor75 Cost: {formatCurrency(factor75WeeklyCost)}/week
              </p>
            </div>

            {isCalculated ? (
              <StaggeredAnimation className="space-y-6">
                {/* Total Annual Value */}
                <div className="text-center p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border-2 border-green-200">
                  <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <div className="text-3xl font-bold text-green-700 mb-1">
                    {formatCurrency(results.totalValue)}
                  </div>
                  <div className="text-sm text-green-600 font-medium">
                    Total Annual Value
                  </div>
                </div>

                {/* Savings Breakdown */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <DollarSign className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                    <div className="text-xl font-bold text-blue-700">
                      {formatCurrency(results.monthlySavings)}
                    </div>
                    <div className="text-xs text-blue-600">Monthly Savings</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <Clock className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                    <div className="text-xl font-bold text-purple-700">
                      {results.timeSaved}h
                    </div>
                    <div className="text-xs text-purple-600">
                      Weekly Time Saved
                    </div>
                  </div>
                </div>

                {/* Benefits List */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-sm text-gray-700">
                      Save {formatCurrency(results.weeklySavings)} per week on
                      food costs
                    </span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-sm text-gray-700">
                      Reclaim {results.timeSaved} hours weekly for
                      family/hobbies
                    </span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-sm text-gray-700">
                      Save {formatCurrency(results.gasSavings)} annually on
                      gas/transportation
                    </span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-sm text-gray-700">
                      Chef-prepared, nutritionally balanced meals
                    </span>
                  </div>
                </div>

                {/* CTA */}
                <button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 flex items-center justify-center space-x-2">
                  <span>Start Saving Today</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </StaggeredAnimation>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <Calculator className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>Fill out the form to see your personalized savings</p>
              </div>
            )}
          </div>
        </FadeIn>
      </div>
    </div>
  )
}

export default ROICalculator
