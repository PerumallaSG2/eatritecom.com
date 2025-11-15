import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { buildApiUrl } from '../config/api'
import EatRiteIcons from '../components/icons/EatRiteIcons'
import { FadeIn, StaggeredAnimation, Floating } from '../components/AnimationComponents'

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
          // Remove duplicates using multiple criteria for better deduplication
          const uniquePlans = plansData.reduce((acc: Plan[], current: Plan) => {
            // Check for duplicates using name and meals_per_week as identifiers
            const existingPlan = acc.find(plan => 
              plan.name.trim().toLowerCase() === current.name.trim().toLowerCase() &&
              plan.meals_per_week === current.meals_per_week
            )
            if (!existingPlan) {
              acc.push(current)
            }
            return acc
          }, [])
          
          console.log(`Filtered ${plansData.length} plans down to ${uniquePlans.length} unique plans`)
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
    <div className="min-h-screen bg-gradient-dark py-16">
      {/* Luxury Hero Section */}
      <div className="bg-gradient-to-br from-eatrite-black-pure via-eatrite-black-900 to-eatrite-black-850 py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="luxury-dots" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="10" cy="10" r="1" fill="currentColor" opacity="0.3"/>
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#luxury-dots)" />
          </svg>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <FadeIn>
            <div className="flex items-center justify-center mb-8">
              <EatRiteIcons.ThreeLeaves size="xl" color="gold" className="animate-glow" />
            </div>
            
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-gradient-gold">
              Select Your Luxury Experience
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
              Exclusive meal plans crafted for the discerning palate. Complete flexibility, 
              premium quality, uncompromising luxury.
            </p>
          </FadeIn>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <StaggeredAnimation>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {loading ? (
              // Luxury Loading Skeleton
              Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="card-premium animate-pulse">
                  <div className="p-8">
                    <div className="h-8 bg-eatrite-gold-800 rounded mb-2"></div>
                    <div className="h-4 bg-eatrite-black-700 rounded mb-4"></div>
                    <div className="h-12 bg-eatrite-gold-800 rounded mb-6"></div>
                    <div className="space-y-3 mb-8">
                      {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="h-4 bg-eatrite-black-700 rounded"></div>
                      ))}
                    </div>
                    <div className="h-12 bg-eatrite-gold-800 rounded"></div>
                  </div>
                </div>
              ))
            ) : (
              plans.map((plan, index) => (
                <Floating key={plan.id}>
                  <div
                    className={`card-premium relative overflow-hidden hover:shadow-gold transition-all duration-500 transform hover:-translate-y-2 ${
                      plan.is_popular ? 'border-2 border-eatrite-gold-500 scale-105 shadow-gold animate-glow' : ''
                    }`}
                  >
                    {plan.is_popular && (
                      <div className="absolute top-0 left-0 right-0 bg-gradient-gold text-black text-center py-3 text-sm font-bold uppercase tracking-wider">
                        <EatRiteIcons.Star size="sm" color="white" className="inline mr-2" />
                        Most Elite Choice
                      </div>
                    )}
                    
                    <div className={`p-8 ${plan.is_popular ? 'pt-20' : 'pt-8'}`}>
                      {/* Plan Icon */}
                      <div className="flex justify-center mb-6">
                        {index === 0 && <EatRiteIcons.Leaf size="lg" color="gold" />}
                        {index === 1 && <EatRiteIcons.ThreeLeaves size="lg" color="gold" />}
                        {index === 2 && <EatRiteIcons.ChefHat size="lg" color="gold" />}
                      </div>
                      
                      <h3 className="font-serif text-2xl font-bold text-eatrite-gold-300 mb-3 text-center">
                        {plan.name}
                      </h3>
                      <p className="text-gray-400 mb-6 text-center leading-relaxed">
                        {plan.description}
                      </p>
                      
                      <div className="text-center mb-8">
                        <div className="font-serif text-5xl font-bold text-gradient-gold mb-2">
                          ${plan.price_per_meal}
                          <span className="text-lg font-normal text-gray-400">/meal</span>
                        </div>
                        <div className="text-gray-400 text-lg">
                          ${plan.total_price}/week for {plan.meals_per_week} gourmet meals
                        </div>
                        {plan.discount > 0 && (
                          <div className="text-eatrite-gold-400 font-semibold mt-2 inline-flex items-center">
                            <EatRiteIcons.Star size="sm" color="gold" className="mr-1" />
                            Save {plan.discount}% Premium Value!
                          </div>
                        )}
                      </div>

                      <ul className="space-y-4 mb-10">
                        {plan.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center">
                            <EatRiteIcons.Check size="sm" color="gold" className="mr-3" />
                            <span className="text-gray-300">{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <Link
                        to="/quiz"
                        className={`block w-full text-center py-4 px-6 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 active:scale-95 ${
                          plan.is_popular
                            ? 'btn-primary animate-glow'
                            : 'btn-secondary'
                        }`}
                      >
                        {plan.is_popular ? 'Begin Elite Journey' : 'Start Luxury Experience'}
                      </Link>
                    </div>
                  </div>
                </Floating>
              ))
            )}
          </div>
        </StaggeredAnimation>

        {/* Luxury Benefits Section */}
        <FadeIn>
          <div className="text-center mt-20 bg-eatrite-black-900 rounded-2xl p-12 border border-eatrite-gold-800">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div className="flex flex-col items-center">
                <EatRiteIcons.Truck size="xl" color="gold" className="mb-4" />
                <h3 className="font-serif text-lg font-bold text-eatrite-gold-300 mb-2">
                  White-Glove Delivery
                </h3>
                <p className="text-gray-400 text-center">
                  Complimentary luxury delivery service
                </p>
              </div>
              
              <div className="flex flex-col items-center">
                <EatRiteIcons.Heart size="xl" color="gold" className="mb-4" />
                <h3 className="font-serif text-lg font-bold text-eatrite-gold-300 mb-2">
                  Complete Flexibility
                </h3>
                <p className="text-gray-400 text-center">
                  No commitments, cancel anytime
                </p>
              </div>
              
              <div className="flex flex-col items-center">
                <EatRiteIcons.Star size="xl" color="gold" className="mb-4" />
                <h3 className="font-serif text-lg font-bold text-eatrite-gold-300 mb-2">
                  Michelin Quality
                </h3>
                <p className="text-gray-400 text-center">
                  World-class culinary excellence
                </p>
              </div>
            </div>
            
            <Link
              to="/quiz"
              className="text-eatrite-gold-400 hover:text-eatrite-gold-300 font-medium text-lg transition-colors duration-200 inline-flex items-center"
            >
              Discover Your Perfect Plan
              <EatRiteIcons.ArrowRight size="sm" color="gold" className="ml-2" />
            </Link>
          </div>
        </FadeIn>
      </div>
    </div>
  )
}

export default PricingPage