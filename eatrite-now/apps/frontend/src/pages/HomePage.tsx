import React from 'react'
import { Link } from 'react-router-dom'
import EnhancedHero from '../components/EnhancedHero'
import PopularMeals from '../components/PopularMeals'
import MealFilters from '../components/MealFilters'
import { PageLoader } from '../components/Loading'
import { useToast } from '../context/ToastContext'
import { CheckCircle, Star, Clock, Shield, Award, Zap, Heart, TrendingUp } from 'lucide-react'

const HomePage = () => {
  const { showToast } = useToast()

  const handleFilterChange = (filters: any) => {
    console.log('Filters applied:', filters)
    showToast('info', 'Filters Applied', 'Your meal preferences have been updated')
  }

  return (
    <div className="min-h-screen">
      {/* Enhanced Hero Section */}
      <EnhancedHero />
      
      {/* Meal Filters - Optional */}
      <MealFilters 
        onFilterChange={handleFilterChange}
        className="border-b border-[#D4B46A]/20"
      />
      
      {/* Popular Meals Section with all enhancements */}
      <PopularMeals />

      {/* How It Works Section */}
      <section className="py-20 bg-gradient-to-br from-[#F5F2E8] to-[#F5EEDC]">
        <div className="max-w-8xl mx-auto px-8 lg:px-12">
          <div className="text-center mb-16">
            <h2 
              className="text-5xl lg:text-6xl font-bold text-[#0F2B1E] mb-6 tracking-tight"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              How It Works
            </h2>
            <p 
              className="text-xl lg:text-2xl text-[#0A2418]/80 max-w-3xl mx-auto leading-relaxed"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              From selection to your table in three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 lg:gap-16">
            {/* Step 1 */}
            <div className="text-center space-y-6 group">
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-r from-[#D4B46A] to-[#B8964E] text-[#0F2B1E] rounded-3xl flex items-center justify-center font-bold text-3xl mx-auto shadow-2xl group-hover:scale-110 transition-transform duration-300" style={{ fontFamily: 'Playfair Display, serif' }}>
                  1
                </div>
                <div className="absolute inset-0 bg-[#D4B46A] rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
              </div>
              <div>
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Star className="w-8 h-8 text-[#D4B46A]" />
                  <h3 
                    className="text-3xl font-bold text-[#0F2B1E]" 
                    style={{ fontFamily: 'Playfair Display, serif' }}
                  >
                    Choose Your Meals
                  </h3>
                </div>
                <p className="text-[#0F2B1E]/70 leading-relaxed text-lg" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Pick from 50+ weekly options crafted by our expert chefs. Filter by dietary preferences, taste profiles, and nutritional goals.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="text-center space-y-6 group">
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-r from-[#D4B46A] to-[#B8964E] text-[#0F2B1E] rounded-3xl flex items-center justify-center font-bold text-3xl mx-auto shadow-2xl group-hover:scale-110 transition-transform duration-300" style={{ fontFamily: 'Playfair Display, serif' }}>
                  2
                </div>
                <div className="absolute inset-0 bg-[#D4B46A] rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
              </div>
              <div>
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Award className="w-8 h-8 text-[#D4B46A]" />
                  <h3 
                    className="text-3xl font-bold text-[#0F2B1E]" 
                    style={{ fontFamily: 'Playfair Display, serif' }}
                  >
                    We Prepare
                  </h3>
                </div>
                <p className="text-[#0F2B1E]/70 leading-relaxed text-lg" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Freshly cooked by award-winning chefs every morning using premium, locally-sourced ingredients. No preservatives, just pure nutrition.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="text-center space-y-6 group">
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-r from-[#D4B46A] to-[#B8964E] text-[#0F2B1E] rounded-3xl flex items-center justify-center font-bold text-3xl mx-auto shadow-2xl group-hover:scale-110 transition-transform duration-300" style={{ fontFamily: 'Playfair Display, serif' }}>
                  3
                </div>
                <div className="absolute inset-0 bg-[#D4B46A] rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
              </div>
              <div>
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Zap className="w-8 h-8 text-[#D4B46A]" />
                  <h3 
                    className="text-3xl font-bold text-[#0F2B1E]" 
                    style={{ fontFamily: 'Playfair Display, serif' }}
                  >
                    Delivered Fresh
                  </h3>
                </div>
                <p className="text-[#0F2B1E]/70 leading-relaxed text-lg" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Arrives chilled & ready to heat at your doorstep. Temperature-controlled delivery ensures optimal freshness and taste.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features & Benefits */}
      <section className="py-20 bg-white">
        <div className="max-w-8xl mx-auto px-8 lg:px-12">
          <div className="text-center mb-16">
            <h2 
              className="text-5xl lg:text-6xl font-bold text-[#0F2B1E] mb-6 tracking-tight"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Why Choose EatRite?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="text-center space-y-6 p-8 bg-gradient-to-b from-[#F5EEDC] to-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group">
              <div className="w-20 h-20 bg-gradient-to-r from-[#0F2B1E] to-[#0A2418] rounded-2xl flex items-center justify-center mx-auto shadow-xl group-hover:scale-110 transition-transform duration-300">
                <Shield className="w-10 h-10 text-[#D4B46A]" />
              </div>
              <h3 
                className="text-2xl font-bold text-[#0F2B1E]" 
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                Premium Quality
              </h3>
              <p className="text-[#0F2B1E]/70 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                Sourced from the finest farms and prepared with meticulous attention to detail.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center space-y-6 p-8 bg-gradient-to-b from-[#F5EEDC] to-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group">
              <div className="w-20 h-20 bg-gradient-to-r from-[#0F2B1E] to-[#0A2418] rounded-2xl flex items-center justify-center mx-auto shadow-xl group-hover:scale-110 transition-transform duration-300">
                <Heart className="w-10 h-10 text-[#D4B46A]" />
              </div>
              <h3 
                className="text-2xl font-bold text-[#0F2B1E]" 
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                Health Focused
              </h3>
              <p className="text-[#0F2B1E]/70 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                Nutritionist-designed meals that support your wellness goals without compromising taste.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center space-y-6 p-8 bg-gradient-to-b from-[#F5EEDC] to-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group">
              <div className="w-20 h-20 bg-gradient-to-r from-[#0F2B1E] to-[#0A2418] rounded-2xl flex items-center justify-center mx-auto shadow-xl group-hover:scale-110 transition-transform duration-300">
                <Clock className="w-10 h-10 text-[#D4B46A]" />
              </div>
              <h3 
                className="text-2xl font-bold text-[#0F2B1E]" 
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                Time Saving
              </h3>
              <p className="text-[#0F2B1E]/70 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                Skip meal planning, shopping, and prep. More time for what matters most to you.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="text-center space-y-6 p-8 bg-gradient-to-b from-[#F5EEDC] to-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group">
              <div className="w-20 h-20 bg-gradient-to-r from-[#0F2B1E] to-[#0A2418] rounded-2xl flex items-center justify-center mx-auto shadow-xl group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="w-10 h-10 text-[#D4B46A]" />
              </div>
              <h3 
                className="text-2xl font-bold text-[#0F2B1E]" 
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                Results Driven
              </h3>
              <p className="text-[#0F2B1E]/70 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                Track your progress with our integrated health monitoring and achievement system.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof & Testimonials */}
      <section className="py-20 bg-gradient-to-r from-[#0F2B1E] to-[#0A2418]">
        <div className="max-w-8xl mx-auto px-8 lg:px-12">
          <div className="text-center mb-16">
            <h2 
              className="text-5xl lg:text-6xl font-bold text-[#F5F2E8] mb-6 tracking-tight"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Loved by Thousands
            </h2>
            <p 
              className="text-xl lg:text-2xl text-[#D4B46A] max-w-3xl mx-auto leading-relaxed"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Join our community of health-conscious food lovers
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-gradient-to-b from-[#F5F2E8] to-white p-8 rounded-2xl shadow-2xl">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-[#0F2B1E] mb-6 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                "EatRite completely transformed my relationship with food. The meals are restaurant-quality and I've never felt healthier!"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#D4B46A] rounded-full flex items-center justify-center text-[#0F2B1E] font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>
                  S
                </div>
                <div>
                  <p className="font-bold text-[#0F2B1E]" style={{ fontFamily: 'Playfair Display, serif' }}>Sarah Chen</p>
                  <p className="text-sm text-[#0F2B1E]/60" style={{ fontFamily: 'Inter, sans-serif' }}>Marketing Executive</p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-gradient-to-b from-[#F5F2E8] to-white p-8 rounded-2xl shadow-2xl">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-[#0F2B1E] mb-6 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                "As a busy parent, EatRite is a lifesaver. Healthy, delicious meals without the hassle. My kids love them too!"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#D4B46A] rounded-full flex items-center justify-center text-[#0F2B1E] font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>
                  M
                </div>
                <div>
                  <p className="font-bold text-[#0F2B1E]" style={{ fontFamily: 'Playfair Display, serif' }}>Mike Rodriguez</p>
                  <p className="text-sm text-[#0F2B1E]/60" style={{ fontFamily: 'Inter, sans-serif' }}>Father of Two</p>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-gradient-to-b from-[#F5F2E8] to-white p-8 rounded-2xl shadow-2xl">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-[#0F2B1E] mb-6 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                "The convenience and quality are unmatched. I've lost 15 pounds and feel amazing. EatRite is worth every penny!"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#D4B46A] rounded-full flex items-center justify-center text-[#0F2B1E] font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>
                  A
                </div>
                <div>
                  <p className="font-bold text-[#0F2B1E]" style={{ fontFamily: 'Playfair Display, serif' }}>Alex Johnson</p>
                  <p className="text-sm text-[#0F2B1E]/60" style={{ fontFamily: 'Inter, sans-serif' }}>Fitness Enthusiast</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#F5EEDC] to-[#F5F2E8]">
        <div className="max-w-6xl mx-auto text-center px-8 lg:px-12">
          <div className="bg-white rounded-3xl p-12 shadow-2xl">
            <h2 
              className="text-4xl lg:text-6xl font-bold text-[#0F2B1E] mb-6 tracking-tight" 
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Ready to Transform Your Health?
            </h2>
            <p className="text-xl lg:text-2xl text-[#0F2B1E]/70 mb-10 leading-relaxed max-w-4xl mx-auto" style={{ fontFamily: 'Inter, sans-serif' }}>
              Join thousands who have discovered the luxury of effortless, healthy eating. Start your journey today with our chef-crafted meals.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                to="/plans"
                className="bg-gradient-to-r from-[#FF6B35] to-[#E55A2B] hover:from-[#E55A2B] hover:to-[#FF6B35] text-white px-12 py-5 rounded-2xl font-bold text-xl transition-all duration-300 inline-flex items-center justify-center shadow-2xl hover:shadow-3xl hover:scale-105 gap-3"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                <CheckCircle className="w-6 h-6" />
                Get Started Today
              </Link>
              <Link
                to="/menu"
                className="bg-[#0F2B1E] hover:bg-[#0A2418] text-[#F5F2E8] px-12 py-5 rounded-2xl font-bold text-xl transition-all duration-300 inline-flex items-center justify-center shadow-xl hover:shadow-2xl hover:scale-105"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                Explore Menu
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage