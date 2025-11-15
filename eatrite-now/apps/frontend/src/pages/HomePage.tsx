/**
 * Enhanced HomePage with EatRite Design System Integration
 * Showcases the luxury design system components
 */

import { useEffect, useState } from 'react'
import { buildApiUrl } from '../config/api'
import { mealImages, sampleMeals } from '../utils/images'
import { useCart } from '../context/CartContext'
import EatRiteIcons from '../components/icons/EatRiteIcons'
import { EatRiteButton } from '../components/ui/Button/EatRiteButton'
import { EatRiteCard } from '../components/ui/Card/EatRiteCard'
import { EatRiteInput } from '../components/ui/Input/EatRiteInput'
import EatRiteHomeScreen from '../components/examples/EatRiteHomeScreen'
import { FadeIn, StaggeredAnimation } from '../components/AnimationComponents'

// Keep all your existing advanced components
import ROICalculator from '../components/ROICalculator'
import InteractiveMealBuilder from '../components/InteractiveMealBuilder'
import TransformationGallery from '../components/TransformationGallery'
import LiveNutritionScore from '../components/LiveNutritionScore'
import LiveCustomerActivity from '../components/LiveCustomerActivity'
import CelebrityEndorsements from '../components/CelebrityEndorsements'
import CorporatePartnerships from '../components/CorporatePartnerships'
import RealTimeReviews from '../components/RealTimeReviews'
import CustomerMilestoneTracking from '../components/CustomerMilestoneTracking'
import HealthAchievementBadges from '../components/HealthAchievementBadges'
import MealStreakCounters from '../components/MealStreakCounters'
import ProgressVisualization from '../components/ProgressVisualization'
import AIPoweredMealRecommendations from '../components/AIPoweredMealRecommendations'
import DynamicPricingEngine from '../components/DynamicPricingEngine'
import PersonalizedHealthGoals from '../components/PersonalizedHealthGoals'
import SmartSubstitutionSuggestions from '../components/SmartSubstitutionSuggestions'
import ExecutiveSummaryDashboard from '../components/ExecutiveSummaryDashboard'

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
  is_new?: boolean
  is_top_rated?: boolean
  dietary_tags?: string
}

const HomePage = () => {
  const { addToCart } = useCart()
  const [popularMeals, setPopularMeals] = useState<Meal[]>([])
  const [loading, setLoading] = useState(true)
  const [showDesignSystemDemo, setShowDesignSystemDemo] = useState(false)

  useEffect(() => {
    const fetchPopularMeals = async () => {
      try {
        const response = await fetch(buildApiUrl('/api/meals?popular=true&limit=3'))
        if (response.ok) {
          const meals = await response.json()
          setPopularMeals(meals)
        } else {
          setPopularMeals(sampleMeals)
        }
      } catch (error) {
        console.error('Error fetching popular meals:', error)
        setPopularMeals(sampleMeals)
      } finally {
        setLoading(false)
      }
    }

    fetchPopularMeals()
  }, [])

  // Toggle between original homepage and design system demo
  if (showDesignSystemDemo) {
    return (
      <div className="min-h-screen">
        {/* Toggle Button */}
        <div className="fixed top-20 right-4 z-50">
          <EatRiteButton
            variant="secondary"
            size="sm"
            onClick={() => setShowDesignSystemDemo(false)}
          >
            Back to Homepage
          </EatRiteButton>
        </div>
        
        <EatRiteHomeScreen />
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Design System Demo Toggle */}
      <div className="fixed top-20 right-4 z-50">
        <EatRiteButton
          variant="primary"
          size="sm"
          onClick={() => setShowDesignSystemDemo(true)}
          leftIcon={<EatRiteIcons.Star size="sm" />}
        >
          View Design System
        </EatRiteButton>
      </div>

      {/* Promotional Banner - EatRite Luxury */}
      <section className="bg-secondary text-accent text-center p-lg border-b border-gold">
        <div className="container">
          <FadeIn>
            <p className="text-sm font-medium tracking-wider flex items-center justify-center gap-sm">
              <EatRiteIcons.Star size="sm" color="gold" />
              <span className="text-accent">50% OFF</span> Your First Luxury Box + 
              <span className="text-accent"> Free Premium Meals</span> for 1 Year*
              <EatRiteIcons.Star size="sm" color="gold" />
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Hero Section - EatRite Luxury Experience */}
      <section className="page section relative flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient(135deg, var(--surface-primary), var(--surface-secondary))"></div>
        
        <div className="relative z-10 container text-center">
          <FadeIn>
            <div className="section-header">
              <EatRiteIcons.ThreeLeaves size="xl" color="gold" className="mx-auto mb-2xl animate-pulse-gold" />
              <h1 className="heading-1 text-5xl">
                EatRite
              </h1>
              <h2 className="heading-2 text-secondary">
                Luxury Nutrition, Delivered
              </h2>
            </div>
            
            <p className="text-xl text-tertiary m-3xl max-w-4xl mx-auto">
              Experience premium, chef-crafted meals designed to nourish your body 
              and elevate your lifestyle. Pure ingredients, exceptional taste.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-2xl justify-center items-center m-4xl">
              <EatRiteButton
                variant="primary"
                size="lg"
                leftIcon={<EatRiteIcons.Leaf size="md" />}
                as="a"
                href="/plans"
              >
                Start Your Journey
              </EatRiteButton>
              
              <EatRiteButton
                variant="secondary"
                size="lg"
                as="a"
                href="/menu"
              >
                Explore Menu
              </EatRiteButton>
            </div>

            {/* Search Section with Luxury Design */}
            <div className="max-w-2xl mx-auto">
              <EatRiteInput
                placeholder="Search gourmet meals, ingredients, or dietary preferences..."
                size="lg"
                leftIcon={<EatRiteIcons.Search size="md" />}
                rightIcon={<EatRiteIcons.Filter size="md" />}
              />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Popular Meals - Luxury Collection */}
      {!loading && popularMeals.length > 0 && (
        <section className="section bg-secondary">
          <div className="container">
            <FadeIn>
              <div className="text-center section-header">
                <h2 className="heading-2">
                  Chef's Premium Selection
                </h2>
                <p className="text-xl text-secondary max-w-3xl mx-auto">
                  Discover our most celebrated meals, crafted with luxury ingredients and 
                  perfected by world-class chefs
                </p>
              </div>
            </FadeIn>
            
            <StaggeredAnimation>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2xl">
                {popularMeals.map((meal) => (
                  <EatRiteCard 
                    key={meal.id}
                    variant="premium" 
                    className="card card-highlight overflow-hidden"
                  >
                    <div className="relative">
                      <div className="h-48 bg-tertiary rounded-card m-lg overflow-hidden">
                        <img 
                          src={meal.image_url || mealImages.grilledChicken} 
                          alt={meal.name}
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                        />
                        
                        {meal.is_popular && (
                          <div className="absolute top-3 left-3">
                            <div className="chip selected flex items-center gap-xs">
                              <EatRiteIcons.Star size="sm" />
                              Chef's Choice
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="heading-4 text-accent m-md">
                        {meal.name}
                      </h3>
                      <p className="text-tertiary text-sm m-lg">
                        {meal.short_description || meal.description}
                      </p>
                      
                      <div className="flex items-center justify-between m-lg">
                        <div className="flex items-center gap-lg text-sm">
                          <div className="flex items-center gap-xs text-tertiary">
                            <EatRiteIcons.Activity size="sm" color="gold" />
                            {meal.calories} cal
                          </div>
                          <div className="flex items-center gap-xs text-tertiary">
                            <EatRiteIcons.Target size="sm" color="gold" />
                            {meal.protein}g protein
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="heading-3 text-accent">
                          ${meal.price}
                        </span>
                        <EatRiteButton
                          variant="primary"
                          size="sm"
                          onClick={() => addToCart(meal)}
                          leftIcon={<EatRiteIcons.Plus size="sm" />}
                        >
                          Add to Cart
                        </EatRiteButton>
                      </div>
                    </div>
                  </EatRiteCard>
                ))}
              </div>
            </StaggeredAnimation>
          </div>
        </section>
      )}

      {/* Stats Section with Design System */}
      <section className="py-20 bg-eatrite-black-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-gradient-gold mb-6">
                Trusted Excellence
              </h2>
              <p className="text-xl text-eatrite-text-secondary max-w-3xl mx-auto leading-relaxed">
                Numbers that speak to our commitment to luxury and quality
              </p>
            </div>
          </FadeIn>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <EatRiteCard variant="flat" className="text-center">
              <div className="mb-4">
                <EatRiteIcons.ChefHat size="lg" color="gold" className="mx-auto" />
              </div>
              <div className="font-serif text-4xl font-bold text-gradient-gold mb-2">500+</div>
              <div className="text-eatrite-text-tertiary text-sm uppercase tracking-wide">Premium Meals</div>
            </EatRiteCard>

            <EatRiteCard variant="flat" className="text-center">
              <div className="mb-4">
                <EatRiteIcons.Heart size="lg" color="gold" className="mx-auto" />
              </div>
              <div className="font-serif text-4xl font-bold text-gradient-gold mb-2">50K+</div>
              <div className="text-eatrite-text-tertiary text-sm uppercase tracking-wide">Happy Customers</div>
            </EatRiteCard>

            <EatRiteCard variant="flat" className="text-center">
              <div className="mb-4">
                <EatRiteIcons.Truck size="lg" color="gold" className="mx-auto" />
              </div>
              <div className="font-serif text-4xl font-bold text-gradient-gold mb-2">24/7</div>
              <div className="text-eatrite-text-tertiary text-sm uppercase tracking-wide">Fresh Delivery</div>
            </EatRiteCard>

            <EatRiteCard variant="flat" className="text-center">
              <div className="mb-4">
                <EatRiteIcons.Star size="lg" color="gold" className="mx-auto" />
              </div>
              <div className="font-serif text-4xl font-bold text-gradient-gold mb-2">4.9★</div>
              <div className="text-eatrite-text-tertiary text-sm uppercase tracking-wide">Average Rating</div>
            </EatRiteCard>
          </div>
        </div>
      </section>

      {/* Keep all your existing advanced sections */}
      
      {/* Interactive Value Proposition Section */}
      <section className="py-20 bg-gradient-to-br from-eatrite-black-900 via-eatrite-black-850 to-eatrite-black-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-gradient-gold mb-6">
                Discover Your Personalized Luxury
              </h2>
              <p className="text-xl text-eatrite-text-secondary max-w-3xl mx-auto leading-relaxed">
                Experience the power of personalized nutrition with our premium interactive tools
              </p>
            </div>
          </FadeIn>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <ROICalculator />
            <InteractiveMealBuilder />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <TransformationGallery />
            <LiveNutritionScore />
          </div>
        </div>
      </section>

      {/* Social Proof & Trust Signals */}
      <section className="py-20 bg-eatrite-black-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-gradient-gold mb-6">
                Trusted by Elite Clientele Worldwide
              </h2>
              <p className="text-xl text-eatrite-text-secondary max-w-3xl mx-auto leading-relaxed">
                Join our exclusive community of discerning customers and industry partners
              </p>
            </div>
          </FadeIn>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <LiveCustomerActivity />
            <CelebrityEndorsements />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <CorporatePartnerships />
            <RealTimeReviews />
          </div>
        </div>
      </section>

      {/* Gamification & Achievement System */}
      <section className="py-20 bg-gradient-to-br from-eatrite-black-950 via-eatrite-black-900 to-eatrite-black-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-gradient-gold mb-6">
                Track Your Wellness Journey
              </h2>
              <p className="text-xl text-eatrite-text-secondary max-w-3xl mx-auto leading-relaxed">
                Celebrate your achievements and stay motivated with our luxury wellness features
              </p>
            </div>
          </FadeIn>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <CustomerMilestoneTracking />
            <HealthAchievementBadges />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <MealStreakCounters />
            <ProgressVisualization />
          </div>
        </div>
      </section>

      {/* Dynamic Personalization Engine */}
      <section className="py-20 bg-eatrite-black-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-gradient-gold mb-6">
                AI-Powered Luxury Personalization
              </h2>
              <p className="text-xl text-eatrite-text-secondary max-w-3xl mx-auto leading-relaxed">
                Experience next-generation personalization with our premium AI technology
              </p>
            </div>
          </FadeIn>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <AIPoweredMealRecommendations />
            <DynamicPricingEngine />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <PersonalizedHealthGoals />
            <SmartSubstitutionSuggestions />
          </div>
        </div>
      </section>

      {/* Business Intelligence Dashboard */}
      <section className="py-20 bg-gradient-to-br from-eatrite-black-800 via-eatrite-black-900 to-eatrite-black-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-gradient-gold mb-6">
                Business Intelligence & Impact
              </h2>
              <p className="text-xl text-eatrite-text-secondary max-w-3xl mx-auto leading-relaxed">
                Real-time insights into our business performance and customer success
              </p>
            </div>
          </FadeIn>
          
          <ExecutiveSummaryDashboard />
        </div>
      </section>

      {/* Enhanced Pricing Plans with Design System */}
      <section className="py-20 bg-eatrite-black-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-gradient-gold mb-6">
                Select Your Luxury Experience
              </h2>
              <p className="text-xl text-eatrite-text-secondary max-w-3xl mx-auto leading-relaxed">
                Premium meal plans crafted for the discerning palate. Complete flexibility, 
                cancel anytime.
              </p>
            </div>
          </FadeIn>
          
          <StaggeredAnimation>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Discovery Plan */}
              <EatRiteCard variant="premium" className="text-center p-8 hover:shadow-gold transition-all">
                <div className="mb-6">
                  <EatRiteIcons.Leaf size="lg" color="gold" className="mx-auto mb-4" />
                  <h3 className="font-serif text-2xl font-bold text-eatrite-gold-400 mb-2">
                    Discovery
                  </h3>
                  <p className="text-eatrite-text-tertiary">Perfect for trying our luxury cuisine</p>
                </div>
                
                <div className="mb-8">
                  <div className="font-serif text-5xl font-bold text-gradient-gold mb-2">$60</div>
                  <div className="text-eatrite-text-tertiary">$15.00 per gourmet meal</div>
                </div>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3">
                    <EatRiteIcons.Check size="sm" color="gold" />
                    <span className="text-eatrite-text-secondary">Complimentary white-glove delivery</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <EatRiteIcons.Check size="sm" color="gold" />
                    <span className="text-eatrite-text-secondary">Skip or pause anytime</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <EatRiteIcons.Check size="sm" color="gold" />
                    <span className="text-eatrite-text-secondary">Premium organic ingredients</span>
                  </div>
                </div>
                
                <EatRiteButton variant="primary" size="lg" className="w-full">
                  Begin Discovery
                </EatRiteButton>
              </EatRiteCard>
              
              {/* Connoisseur Plan - Most Popular */}
              <EatRiteCard variant="premium" className="text-center p-8 relative transform scale-105 border-2 border-eatrite-gold-500 shadow-gold">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-gold text-eatrite-text-inverse px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider shadow-gold-sm">
                    Most Elite
                  </span>
                </div>
                
                <div className="mb-6">
                  <EatRiteIcons.ThreeLeaves size="lg" color="gold" className="mx-auto mb-4" />
                  <h3 className="font-serif text-2xl font-bold text-eatrite-gold-300 mb-2">
                    Connoisseur
                  </h3>
                  <p className="text-eatrite-text-tertiary">Optimal luxury dining experience</p>
                </div>
                
                <div className="mb-8">
                  <div className="font-serif text-5xl font-bold text-gradient-gold mb-2">$108</div>
                  <div className="text-eatrite-text-tertiary">$13.50 per gourmet meal</div>
                  <div className="text-eatrite-gold-400 text-sm font-medium mt-2">
                    Save $12 vs Discovery plan
                  </div>
                </div>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3">
                    <EatRiteIcons.Check size="sm" color="gold" />
                    <span className="text-eatrite-text-secondary">Complimentary white-glove delivery</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <EatRiteIcons.Check size="sm" color="gold" />
                    <span className="text-eatrite-text-secondary">Skip or pause anytime</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <EatRiteIcons.Check size="sm" color="gold" />
                    <span className="text-eatrite-text-secondary">Premium organic ingredients</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <EatRiteIcons.Star size="sm" color="gold" />
                    <span className="text-eatrite-gold-400 font-medium">Optimal value per meal</span>
                  </div>
                </div>
                
                <EatRiteButton variant="primary" size="lg" className="w-full animate-glow">
                  Choose Connoisseur
                </EatRiteButton>
              </EatRiteCard>
              
              {/* Epicurean Plan */}
              <EatRiteCard variant="premium" className="text-center p-8 hover:shadow-gold transition-all">
                <div className="mb-6">
                  <EatRiteIcons.ChefHat size="lg" color="gold" className="mx-auto mb-4" />
                  <h3 className="font-serif text-2xl font-bold text-eatrite-gold-400 mb-2">
                    Epicurean
                  </h3>
                  <p className="text-eatrite-text-tertiary">Ultimate culinary indulgence</p>
                </div>
                
                <div className="mb-8">
                  <div className="font-serif text-5xl font-bold text-gradient-gold mb-2">$144</div>
                  <div className="text-eatrite-text-tertiary">$12.00 per gourmet meal</div>
                  <div className="text-eatrite-gold-400 text-sm font-medium mt-2">
                    Save $36 vs Discovery plan
                  </div>
                </div>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3">
                    <EatRiteIcons.Check size="sm" color="gold" />
                    <span className="text-eatrite-text-secondary">Complimentary white-glove delivery</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <EatRiteIcons.Check size="sm" color="gold" />
                    <span className="text-eatrite-text-secondary">Skip or pause anytime</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <EatRiteIcons.Check size="sm" color="gold" />
                    <span className="text-eatrite-text-secondary">Premium organic ingredients</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <EatRiteIcons.Star size="sm" color="gold" />
                    <span className="text-eatrite-gold-400 font-medium">Maximum luxury savings</span>
                  </div>
                </div>
                
                <EatRiteButton variant="primary" size="lg" className="w-full">
                  Select Epicurean
                </EatRiteButton>
              </EatRiteCard>
            </div>
          </StaggeredAnimation>
          
          {/* Enhanced Plan Features */}
          <FadeIn>
            <div className="mt-20 text-center">
              <h3 className="font-serif text-3xl font-bold text-gradient-gold mb-12">
                Every Plan Includes Premium Benefits
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
                <div className="text-center">
                  <EatRiteCard variant="flat" className="p-6 h-full flex flex-col items-center">
                    <EatRiteIcons.Truck size="lg" color="gold" className="mb-4" />
                    <h4 className="font-serif font-semibold text-eatrite-gold-400 mb-2">
                      White-Glove Delivery
                    </h4>
                    <p className="text-sm text-eatrite-text-tertiary">
                      Complimentary premium delivery service
                    </p>
                  </EatRiteCard>
                </div>
                
                <div className="text-center">
                  <EatRiteCard variant="flat" className="p-6 h-full flex flex-col items-center">
                    <EatRiteIcons.Clock size="lg" color="gold" className="mb-4" />
                    <h4 className="font-serif font-semibold text-eatrite-gold-400 mb-2">
                      Complete Flexibility
                    </h4>
                    <p className="text-sm text-eatrite-text-tertiary">
                      Skip, pause, or modify anytime
                    </p>
                  </EatRiteCard>
                </div>
                
                <div className="text-center">
                  <EatRiteCard variant="flat" className="p-6 h-full flex flex-col items-center">
                    <EatRiteIcons.Heart size="lg" color="gold" className="mb-4" />
                    <h4 className="font-serif font-semibold text-eatrite-gold-400 mb-2">
                      No Commitment
                    </h4>
                    <p className="text-sm text-eatrite-text-tertiary">
                      Cancel anytime, no questions asked
                    </p>
                  </EatRiteCard>
                </div>
                
                <div className="text-center">
                  <EatRiteCard variant="flat" className="p-6 h-full flex flex-col items-center">
                    <EatRiteIcons.Leaf size="lg" color="gold" className="mb-4" />
                    <h4 className="font-serif font-semibold text-eatrite-gold-400 mb-2">
                      Chef's Quality
                    </h4>
                    <p className="text-sm text-eatrite-text-tertiary">
                      Michelin-inspired gourmet cuisine
                    </p>
                  </EatRiteCard>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA Section with Design System */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <EatRiteCard variant="premium" className="p-12 text-center">
            <div className="mb-8">
              <EatRiteIcons.ThreeLeaves size="xl" color="gold" className="mx-auto mb-6 animate-glow" />
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-eatrite-gold-400 mb-6">
                Ready to Transform Your Nutrition?
              </h2>
              <p className="text-xl text-eatrite-text-secondary leading-relaxed max-w-2xl mx-auto">
                Join thousands who've discovered the perfect balance of luxury, health, and convenience.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <EatRiteButton 
                variant="primary" 
                size="lg"
                leftIcon={<EatRiteIcons.ArrowRight size="md" />}
                as="a"
                href="/plans"
              >
                Start Your Plan
              </EatRiteButton>
              <EatRiteButton variant="ghost" size="lg">
                Learn More
              </EatRiteButton>
            </div>
          </EatRiteCard>
        </div>
      </section>
    </div>
  )
}

export default HomePage