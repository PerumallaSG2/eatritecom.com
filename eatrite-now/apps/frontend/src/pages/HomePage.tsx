import { Link } from 'react-router-dom'
import { ArrowRight, Star, Truck, Clock, Shield } from 'lucide-react'
import { useEffect, useState } from 'react'
import { buildApiUrl } from '../config/api'

interface Meal {
  id: string
  name: string
  description: string
  short_description: string
  calories: number
  protein: number
  price: number
  image_url: string
  is_popular: boolean
}

const HomePage = () => {
  const [popularMeals, setPopularMeals] = useState<Meal[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPopularMeals = async () => {
      try {
        const response = await fetch(buildApiUrl('/api/meals?popular=true&limit=3'))
        if (response.ok) {
          const meals = await response.json()
          setPopularMeals(meals)
        }
      } catch (error) {
        console.error('Error fetching popular meals:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPopularMeals()
  }, [])
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-50 via-primary-50 to-orange-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Chef-Prepared{' '}
                <span className="bg-gradient-to-r from-green-600 to-primary-600 bg-clip-text text-transparent">
                  Fresh Meals
                </span>
                {' '}Delivered Daily
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl">
                Skip the prep, skip the cleanup. Get nutritionally balanced, chef-prepared meals 
                made with premium ingredients delivered fresh to your door.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  to="/quiz"
                  className="btn-green px-8 py-4 text-lg font-semibold rounded-lg inline-flex items-center justify-center group"
                >
                  Get Started Today
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                </Link>
                <Link
                  to="/menu"
                  className="btn-secondary px-8 py-4 text-lg font-semibold rounded-lg"
                >
                  Browse Menu
                </Link>
              </div>
              <div className="flex items-center justify-center lg:justify-start mt-8 space-x-6">
                <div className="flex items-center">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="w-10 h-10 rounded-full bg-gray-300 border-2 border-white"
                      />
                    ))}
                  </div>
                  <span className="ml-3 text-sm text-gray-600">
                    Join 10,000+ satisfied customers
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-600">4.9/5</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-300">
                <div className="aspect-square bg-gradient-to-br from-green-100 to-orange-100 rounded-xl flex items-center justify-center">
                  <div className="text-6xl">🍽️</div>
                </div>
                <div className="mt-4 text-center">
                  <h3 className="text-lg font-semibold text-gray-900">Premium Meals</h3>
                  <p className="text-gray-600">Chef-prepared with love</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Choose EatRite Now?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We make eating well effortless with premium ingredients, expert preparation, and flexible delivery.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Fresh Delivery</h3>
              <p className="text-gray-600">
                Fresh meals delivered to your door 2-3 times per week
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Ready in Minutes</h3>
              <p className="text-gray-600">
                Heat and eat in just 2-3 minutes - perfect for busy lifestyles
              </p>
            </div>

            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Chef Quality</h3>
              <p className="text-gray-600">
                Professionally prepared by experienced chefs with premium ingredients
              </p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Flexible Plans</h3>
              <p className="text-gray-600">
                Pause, skip, or cancel anytime. No long-term commitments required
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sample Meals Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Meals You'll Love
            </h2>
            <p className="text-xl text-gray-600">
              From comfort classics to globally-inspired dishes
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {loading ? (
              // Loading skeleton
              Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="card overflow-hidden animate-pulse">
                  <div className="aspect-video bg-gray-300"></div>
                  <div className="p-6">
                    <div className="h-6 bg-gray-300 rounded mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded mb-4"></div>
                    <div className="flex justify-between">
                      <div className="h-4 bg-gray-300 rounded w-16"></div>
                      <div className="h-4 bg-gray-300 rounded w-20"></div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              popularMeals.map((meal) => (
                <div key={meal.id} className="card overflow-hidden group hover:shadow-xl transition-shadow duration-300">
                  <div className="aspect-video bg-gradient-to-br from-green-100 to-orange-100 flex items-center justify-center relative overflow-hidden">
                    {meal.image_url ? (
                      <img 
                        src={meal.image_url} 
                        alt={meal.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        onError={(e) => {
                          e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzMzNzNkYyIvPgogIDx0ZXh0IHg9IjEwMCIgeT0iMTAwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iNDAiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+🍽️</3ZXh0Pgo8L3N2Zz4K'
                        }}
                      />
                    ) : (
                      <div className="text-4xl">🥗</div>
                    )}
                    {meal.is_popular && (
                      <div className="absolute top-2 right-2 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                        Popular
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {meal.name}
                    </h3>
                    <p className="text-gray-600 mb-4">{meal.short_description || meal.description}</p>
                    <div className="flex justify-between items-center text-sm">
                      <div className="text-gray-500">
                        <span>{meal.calories} cal</span>
                        <span className="mx-2">•</span>
                        <span>{meal.protein}g protein</span>
                      </div>
                      <div className="text-green-600 font-semibold">
                        ${meal.price}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/menu"
              className="btn-primary px-8 py-3 text-lg font-semibold rounded-lg"
            >
              View Full Menu
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-primary-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Ready to Start Eating Better?
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Take our quick quiz to get personalized meal recommendations
          </p>
          <Link
            to="/quiz"
            className="bg-white text-green-600 px-8 py-4 text-lg font-semibold rounded-lg hover:bg-gray-50 transition-colors inline-flex items-center"
          >
            Get My Meal Plan
            <ArrowRight className="ml-2" size={20} />
          </Link>
        </div>
      </section>
    </div>
  )
}

export default HomePage