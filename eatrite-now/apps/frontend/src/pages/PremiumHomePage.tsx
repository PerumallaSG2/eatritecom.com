/**
 * EatRite Premium HomePage - World-Class UI Design
 * Fresh, vitality, nutrition, premium quality, modern healthy-living lifestyle
 */

import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { buildApiUrl } from '../config/api'
import { mealImages, sampleMeals } from '../utils/images'
import { useCart } from '../context/CartContext'

// Icons - using simple SVGs for better performance and customization
const LeafIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3l3.5 3.5M9 21a9 9 0 110-18 9 9 0 010 18zM15 9a9 9 0 11-6-6 9 9 0 016 6z" />
  </svg>
)

const StarIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
)

const HeartIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
)

const TruckIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
  </svg>
)

const CheckIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
)

const ArrowRightIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
)

const FilterIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707v4.586a1 1 0 01-.293.707l-2 2A1 1 0 0111 21v-6.586a1 1 0 00-.293-.707L4.293 7.293A1 1 0 014 6.586V4z" />
  </svg>
)

interface Meal {
  id: string
  name: string
  description: string
  short_description?: string
  calories: number
  protein: number
  price: number
  image_url: string
  is_popular: boolean
  dietary_tags?: string
}

export const PremiumHomePage = () => {
  const { addToCart } = useCart()
  const [popularMeals, setPopularMeals] = useState<Meal[]>([])
  const [loading, setLoading] = useState(true)
  const [activeFilter, setActiveFilter] = useState('all')

  useEffect(() => {
    const fetchPopularMeals = async () => {
      try {
        const response = await fetch(buildApiUrl('/api/meals?popular=true&limit=6'))
        if (response.ok) {
          const meals = await response.json()
          setPopularMeals(meals)
        } else {
          setPopularMeals(sampleMeals.slice(0, 6))
        }
      } catch (error) {
        console.error('Error fetching popular meals:', error)
        setPopularMeals(sampleMeals.slice(0, 6))
      } finally {
        setLoading(false)
      }
    }

    fetchPopularMeals()
  }, [])

  const mealFilters = [
    { id: 'all', label: 'All Meals', icon: <LeafIcon className="w-4 h-4" /> },
    { id: 'vegan', label: 'Vegan', icon: <LeafIcon className="w-4 h-4" /> },
    { id: 'protein', label: 'High-Protein', icon: <StarIcon className="w-4 h-4" /> },
    { id: 'keto', label: 'Keto', icon: <HeartIcon className="w-4 h-4" /> }
  ]

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Wellness Coach",
      content: "EatRite transformed my relationship with food. The quality is exceptional!",
      rating: 5
    },
    {
      name: "Marcus Johnson", 
      role: "Fitness Enthusiast",
      content: "Perfect macros, incredible taste. This is the future of healthy eating.",
      rating: 5
    },
    {
      name: "Dr. Emily Rodriguez",
      role: "Nutritionist", 
      content: "I recommend EatRite to all my clients. Pure ingredients, expert preparation.",
      rating: 5
    }
  ]

  return (
    <div className="min-h-screen">
      {/* 🌟 Promotional Banner */}
      <section className="bg-gradient-to-r from-green-600 to-green-700 text-white text-center py-3">
        <div className="container mx-auto px-4">
          <p className="text-sm font-medium flex items-center justify-center gap-2">
            <StarIcon className="w-4 h-4" />
            <span className="text-orange-200">50% OFF</span> Your First Box + 
            <span className="text-orange-200">Free Delivery</span> for Life*
            <StarIcon className="w-4 h-4" />
          </p>
        </div>
      </section>

      {/* 🏠 Hero Section - Clean Two-Column Layout */}
      <section className="section--hero">
        <div className="container">
          <div className="hero">
            <div className="hero-content">
              <h1 className="h1">Eat Healthy.<br />Live Better</h1>
              
              <p className="p-lead">
                Nutritious and delicious meals<br />
                delivered to your door
              </p>
              
              <div className="hero-actions">
                <Link to="/plans" className="btn btn-primary btn-lg">
                  Get Started
                </Link>
              </div>
              
              <div className="hero-metadata">
                <div className="flex items-center gap-2 text-sm">
                  <LeafIcon className="w-4 h-4 text-green-600" />
                  <span>Fresh ingredients</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <TruckIcon className="w-4 h-4 text-green-600" />
                  <span>Free delivery</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <HeartIcon className="w-4 h-4 text-green-600" />
                  <span>Health focused</span>
                </div>
              </div>
            </div>
            
            <div className="hero-image">
              <img 
                src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=600&fit=crop&crop=center"
                alt="Fresh healthy bowl"
                className="w-full h-full object-cover"
              />
              <div className="hero-pill">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span>Fresh today</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* � Features Section - Three Column Layout */}
      <section className="section bg-white">
        <div className="container">
          <div className="grid-3">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-orange-100 rounded-full flex items-center justify-center">
                <LeafIcon className="w-8 h-8 text-orange-500" />
              </div>
              <h3 className="h3 mb-2">Healthy Meals</h3>
              <p className="text-muted">Wholesome, balanced dishes</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-orange-100 rounded-full flex items-center justify-center">
                <LeafIcon className="w-8 h-8 text-orange-500" />
              </div>
              <h3 className="h3 mb-2">Fresh Ingredients</h3>
              <p className="text-muted">Locally sourced produce</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-orange-100 rounded-full flex items-center justify-center">
                <TruckIcon className="w-8 h-8 text-orange-500" />
              </div>
              <h3 className="h3 mb-2">Customizable Plans</h3>
              <p className="text-muted">Tailored to your needs</p>
            </div>
          </div>
        </div>
      </section>

      {/* 📖 Our Meal Plans Section */}
      <section className="section bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="h2 mb-4">Our Meal Plans</h2>
          </div>

          {/* Three-Column Meal Cards */}
          <div className="grid-3">
            {/* Grilled Chicken Salad */}
            <div className="card-meal">
              <div className="card-meal-image">
                <img 
                  src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop"
                  alt="Grilled Chicken Salad"
                />
              </div>
              <div className="card-meal-body">
                <h3 className="card-meal-title">Grilled Chicken Salad</h3>
                <p className="card-meal-sub">Wholesome, balanced dishes</p>
                <div className="card-meal-badges">
                  <div className="badge badge--orange">High Protein</div>
                </div>
                <div className="macros">
                  <div className="macro-pill">25g Protein</div>
                  <div className="macro-pill">60g Carbs</div>
                  <div className="macro-pill">10g Fat</div>
                </div>
              </div>
            </div>

            {/* Vegan & Veggie Bowl */}
            <div className="card-meal">
              <div className="card-meal-image">
                <img 
                  src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop"
                  alt="Vegan Bowl"
                />
              </div>
              <div className="card-meal-body">
                <h3 className="card-meal-title">Vegan & Veggie Bowl</h3>
                <p className="card-meal-sub">Locally sourced produce</p>
                <div className="card-meal-badges">
                  <div className="badge badge--green">Vegan</div>
                </div>
                <div className="macros">
                  <div className="macro-pill">15g Protein</div>
                  <div className="macro-pill">60g Carbs</div>
                  <div className="macro-pill">10g Fat</div>
                </div>
              </div>
            </div>

            {/* Teriyaki Salmon */}
            <div className="card-meal">
              <div className="card-meal-image">
                <img 
                  src="https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400&h=300&fit=crop"
                  alt="Teriyaki Salmon"
                />
              </div>
              <div className="card-meal-body">
                <h3 className="card-meal-title">Teriyaki Salmon</h3>
                <p className="card-meal-sub">Gluten-free* your needs</p>
                <div className="card-meal-badges">
                  <div className="badge badge--outline">Gluten-Free</div>
                </div>
                <div className="macros">
                  <div className="macro-pill">22g Protein</div>
                  <div className="macro-pill">20g Carbs</div>
                  <div className="macro-pill">16g Fat</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🌱 Why Choose Us Section */}
      <section className="section section-alternate">
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'center' }}>
            <div>
              <div className="grid-2" style={{ gap: '20px' }}>
                <img 
                  src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=300&h=200&fit=crop"
                  alt="Fresh ingredients"
                  className="rounded-lg"
                />
                <img 
                  src="https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=300&h=200&fit=crop"
                  alt="Healthy salad"
                  className="rounded-lg"
                />
                <img 
                  src="https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=300&h=200&fit=crop"
                  alt="Nutritious bowl"
                  className="rounded-lg"
                />
                <img 
                  src="https://images.unsplash.com/photo-1540420773420-3366772f4999?w=300&h=200&fit=crop"
                  alt="Fresh vegetables"
                  className="rounded-lg"
                />
              </div>
            </div>
            
            <div>
              <h2 className="h2 mb-6">Why Choose Us</h2>
              <p className="text-lg mb-6">
                Our meals are designed to provide the nutrientous you need to thrive .. to mear.
              </p>
              
              <div className="space-y-6">
                <div>
                  <h3 className="h3 mb-2">Fuel Your Body</h3>
                  <p className="text-muted">
                    Our meals are designed to provide the nutrients you need to thrive.
                  </p>
                </div>
                
                <div>
                  <h3 className="h3 mb-2">Eat Well, Feel Amazing</h3>
                  <p className="text-muted">
                    Experience the benefits of eating well with chef-crafted meals.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* 🍽️ Featured Meals Section */}
      <section className="section">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-green-700">
              Featured Healthy Meals
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Chef-crafted meals designed to fuel your body and delight your taste buds
            </p>
          </div>

          {loading && (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
            </div>
          )}
        
          {!loading && popularMeals.length > 0 && (
            <div className="meal-grid animate-fade-in-up">
              {popularMeals.slice(3).map((meal, index) => (
              <div 
                key={meal.id} 
                className={`card-meal hover-lift animate-delay-${(index + 1) * 100}`}
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={meal.image_url || mealImages.grilledChicken} 
                    alt={meal.name}
                    className="w-full h-48 object-cover"
                  />

                    {/* Nutrition hover overlay */}
                    <div className="absolute inset-0 bg-black/75 opacity-0 hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                      <div className="text-white text-center">
                        <div className="text-sm mb-2">Nutrition Facts</div>
                        <div className="flex justify-center gap-4 text-xs">
                          <div>{meal.calories} cal</div>
                          <div>{meal.protein}g protein</div>
                        </div>
                        <div className="mt-4">
                          <div className="nutrition-meter" data-score="high"></div>
                          <div className="text-xs mt-1">Nutrition Score: A+</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      {meal.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {meal.short_description || meal.description}
                    </p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <HeartIcon className="w-4 h-4 text-green-600" />
                          {meal.calories} cal
                        </div>
                        <div className="flex items-center gap-1">
                          <StarIcon className="w-4 h-4 text-orange-500" />
                          {meal.protein}g protein
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-green-700">
                        ${meal.price}
                      </span>
                      <button
                        onClick={() => addToCart(meal)}
                        className="btn btn-primary"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 📊 Stats Section */}
      <section className="section section-alternate">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-green-700">
              Trusted Excellence
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Numbers that speak to our commitment to luxury and quality
            </p>
          </div>
          
          <div className="feature-grid">
            <div className="card text-center p-8 hover-glow animate-fade-in-up">
              <LeafIcon className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <div className="text-4xl font-bold text-green-700 mb-2">500+</div>
              <div className="text-gray-600 uppercase tracking-wide font-medium">Premium Meals</div>
            </div>

            <div className="card text-center p-8 hover-glow animate-fade-in-up animate-delay-100">
              <HeartIcon className="w-12 h-12 text-orange-500 mx-auto mb-4" />
              <div className="text-4xl font-bold text-green-700 mb-2">50K+</div>
              <div className="text-gray-600 uppercase tracking-wide font-medium">Happy Customers</div>
            </div>

            <div className="card text-center p-8 hover-glow animate-fade-in-up animate-delay-200">
              <TruckIcon className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <div className="text-4xl font-bold text-green-700 mb-2">24/7</div>
              <div className="text-gray-600 uppercase tracking-wide font-medium">Fresh Delivery</div>
            </div>

            <div className="card text-center p-8 hover-glow animate-fade-in-up animate-delay-300">
              <StarIcon className="w-12 h-12 text-orange-500 mx-auto mb-4" />
              <div className="text-4xl font-bold text-green-700 mb-2">4.9★</div>
              <div className="text-gray-600 uppercase tracking-wide font-medium">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* 💬 Testimonials Section */}
      <section className="section bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-green-700">
              What Our Customers Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real stories from real people who've transformed their health with EatRite
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className={`card p-8 text-center hover-lift animate-fade-in-up animate-delay-${(index + 1) * 100}`}
              >
                <div className="flex justify-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <StarIcon key={i} className="w-5 h-5 text-orange-500" />
                  ))}
                </div>
                
                <p className="text-gray-600 mb-6 italic">
                  "{testimonial.content}"
                </p>
                
                <div>
                  <div className="font-semibold text-gray-800">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 💎 Premium Plans Section */}
      <section className="section section-alternate">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-green-700">
              Choose Your Luxury Experience
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Premium meal plans crafted for the discerning palate. Complete flexibility, cancel anytime.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Discovery Plan */}
            <div className="card p-8 text-center hover-lift">
              <div className="mb-6">
                <LeafIcon className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-green-700 mb-2">Discovery</h3>
                <p className="text-gray-600">Perfect for trying our luxury cuisine</p>
              </div>
              
              <div className="mb-8">
                <div className="text-5xl font-bold text-green-700 mb-2">$60</div>
                <div className="text-gray-600">$15.00 per gourmet meal</div>
              </div>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <CheckIcon className="w-5 h-5 text-green-600" />
                  <span className="text-gray-700">Complimentary delivery</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckIcon className="w-5 h-5 text-green-600" />
                  <span className="text-gray-700">Skip or pause anytime</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckIcon className="w-5 h-5 text-green-600" />
                  <span className="text-gray-700">Premium organic ingredients</span>
                </div>
              </div>
              
              <Link to="/plans" className="btn btn-primary w-full">
                Begin Discovery
              </Link>
            </div>
            
            {/* Connoisseur Plan - Most Popular */}
            <div className="card p-8 text-center relative transform scale-105 border-2 border-orange-500 hover-lift">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider">
                  Most Popular
                </span>
              </div>
              
              <div className="mb-6">
                <HeartIcon className="w-12 h-12 text-orange-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-green-700 mb-2">Connoisseur</h3>
                <p className="text-gray-600">Optimal luxury dining experience</p>
              </div>
              
              <div className="mb-8">
                <div className="text-5xl font-bold text-green-700 mb-2">$108</div>
                <div className="text-gray-600">$13.50 per gourmet meal</div>
                <div className="text-orange-600 text-sm font-medium mt-2">
                  Save $12 vs Discovery plan
                </div>
              </div>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <CheckIcon className="w-5 h-5 text-green-600" />
                  <span className="text-gray-700">Complimentary delivery</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckIcon className="w-5 h-5 text-green-600" />
                  <span className="text-gray-700">Skip or pause anytime</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckIcon className="w-5 h-5 text-green-600" />
                  <span className="text-gray-700">Premium organic ingredients</span>
                </div>
                <div className="flex items-center gap-3">
                  <StarIcon className="w-5 h-5 text-orange-500" />
                  <span className="text-orange-600 font-medium">Optimal value per meal</span>
                </div>
              </div>
              
              <Link to="/plans" className="btn btn-primary w-full">
                Choose Connoisseur
              </Link>
            </div>
            
            {/* Epicurean Plan */}
            <div className="card p-8 text-center hover-lift">
              <div className="mb-6">
                <StarIcon className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-green-700 mb-2">Epicurean</h3>
                <p className="text-gray-600">Ultimate culinary indulgence</p>
              </div>
              
              <div className="mb-8">
                <div className="text-5xl font-bold text-green-700 mb-2">$144</div>
                <div className="text-gray-600">$12.00 per gourmet meal</div>
                <div className="text-orange-600 text-sm font-medium mt-2">
                  Save $36 vs Discovery plan
                </div>
              </div>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <CheckIcon className="w-5 h-5 text-green-600" />
                  <span className="text-gray-700">Complimentary delivery</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckIcon className="w-5 h-5 text-green-600" />
                  <span className="text-gray-700">Skip or pause anytime</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckIcon className="w-5 h-5 text-green-600" />
                  <span className="text-gray-700">Premium organic ingredients</span>
                </div>
                <div className="flex items-center gap-3">
                  <StarIcon className="w-5 h-5 text-orange-500" />
                  <span className="text-orange-600 font-medium">Maximum luxury savings</span>
                </div>
              </div>
              
              <Link to="/plans" className="btn btn-primary w-full">
                Select Epicurean
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 🚀 Final CTA Section */}
      <section className="section bg-gradient-to-br from-green-600 via-green-700 to-green-800 text-white">
        <div className="container">
          <div className="text-center max-w-4xl mx-auto">
            <div className="mb-8 animate-float">
              <LeafIcon className="w-20 h-20 mx-auto text-green-200" />
            </div>
            
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Ready to Transform Your Nutrition?
            </h2>
            
            <p className="text-xl mb-12 text-green-100 leading-relaxed">
              Join thousands who've discovered the perfect balance of luxury, health, and convenience. 
              Start your journey to better health today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link to="/plans" className="btn btn-primary btn-lg">
                <LeafIcon className="w-5 h-5" />
                Start Your Plan
                <ArrowRightIcon className="w-5 h-5" />
              </Link>
              <Link to="/menu" className="btn btn-ghost btn-lg text-white border-white hover:bg-white hover:text-green-700">
                Explore Menu
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}