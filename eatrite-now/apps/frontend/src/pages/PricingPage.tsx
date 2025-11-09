import { Link } from 'react-router-dom'
import { Check, Star } from 'lucide-react'
import { useEffect, useState } from 'react'
import { buildApiUrl } from '../config/api'

interface Plan {
  id: string
  name: string
  description: string
  meals_per_week: number
  price_per_meal: number
  total_price: number
  discount: number
  is_popular: boolean
  features: string[]
}

const PricingPage = () => {
  const [plans, setPlans] = useState<Plan[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await fetch(buildApiUrl('/api/plans'))
        if (response.ok) {
          const plansData = await response.json()
          // Remove duplicates and get unique plans by name
          const uniquePlans = plansData.reduce((acc: Plan[], current: Plan) => {
            const existingPlan = acc.find(plan => plan.name === current.name)
            if (!existingPlan) {
              acc.push(current)
            }
            return acc
          }, [])
          setPlans(uniquePlans)
        }
      } catch (error) {
        console.error('Error fetching plans:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPlans()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Flexible meal plans that fit your lifestyle. No long-term commitments.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {loading ? (
            // Loading skeleton
            Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="card animate-pulse">
                <div className="p-8">
                  <div className="h-8 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded mb-4"></div>
                  <div className="h-12 bg-gray-300 rounded mb-6"></div>
                  <div className="space-y-3 mb-8">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div key={i} className="h-4 bg-gray-300 rounded"></div>
                    ))}
                  </div>
                  <div className="h-12 bg-gray-300 rounded"></div>
                </div>
              </div>
            ))
          ) : (
            plans.map((plan) => (
              <div
                key={plan.id}
                className={`card relative overflow-hidden ${
                  plan.is_popular ? 'ring-2 ring-green-500 transform scale-105' : ''
                }`}
              >
                {plan.is_popular && (
                  <div className="absolute top-0 left-0 right-0 bg-green-500 text-white text-center py-2 text-sm font-semibold">
                    <Star className="w-4 h-4 inline mr-1" />
                    Most Popular
                  </div>
                )}
                
                <div className={`p-8 ${plan.is_popular ? 'pt-16' : ''}`}>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-gray-600 mb-4">{plan.description}</p>
                  
                  <div className="mb-6">
                    <div className="text-4xl font-bold text-gray-900 mb-1">
                      ${plan.price_per_meal}
                      <span className="text-lg font-normal text-gray-600">/meal</span>
                    </div>
                    <div className="text-gray-600">
                      ${plan.total_price}/week for {plan.meals_per_week} meals
                    </div>
                    {plan.discount > 0 && (
                      <div className="text-green-600 font-semibold text-sm mt-1">
                        Save {plan.discount}%!
                      </div>
                    )}
                  </div>

                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <Check className="w-5 h-5 text-green-500 mr-3" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    to="/quiz"
                    className={`block w-full text-center py-3 px-4 rounded-lg font-semibold transition-colors ${
                      plan.is_popular
                        ? 'btn-green'
                        : 'btn-primary'
                    }`}
                  >
                    Get Started
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            All plans include free shipping and no long-term commitments
          </p>
          <Link
            to="/quiz"
            className="text-green-600 hover:text-green-700 font-medium"
          >
            Take our quiz to find your perfect plan →
          </Link>
        </div>
      </div>
    </div>
  )
}

export default PricingPage