import { Link } from 'react-router-dom'
import EnhancedHero from '../components/EnhancedHero'
import PopularMeals from '../components/PopularMeals'
import { PageTransition } from '../components/AnimatedComponents'
import { FadeIn } from '../components/LoadingStates'

import { Star, Clock, Shield, Heart, TrendingUp } from 'lucide-react'

const HomePage = () => {
  return (
    <PageTransition>
      <div className="min-h-screen">
        {/* Enhanced Hero Section */}
        <EnhancedHero />

      {/* Popular Meals Section with all enhancements */}
      <PopularMeals />

      {/* Detailed Process Section - Factor75 Style */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Top benefits bar */}
          <div className="text-center mb-8">
            <div className="flex flex-wrap justify-center items-center gap-6 mb-6">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 text-green-600">✓</div>
                <span className="text-gray-700 font-medium">
                  Dietitian approved
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 text-green-600">✓</div>
                <span className="text-gray-700 font-medium">
                  Delivered Fresh
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 text-green-600">✓</div>
                <span className="text-gray-700 font-medium">
                  Chef-prepared meals
                </span>
              </div>
            </div>

            <FadeIn>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Here's How EatRite's Prepared Meal Delivery Works
              </h2>
            </FadeIn>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {/* Step 1 - Pick your meal preference */}
            <div className="text-center">
              <div className="bg-gray-200 rounded-2xl mb-4 overflow-hidden shadow-lg relative">
                <img 
                  src="/eatrite_step1.png?v=1" 
                  alt="Fresh prepared meals - salmon with spinach, pasta with vegetables, grilled chicken with quinoa" 
                  className="w-full h-64 object-cover object-center"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <div className="flex gap-2">
                    <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">KETO</span>
                    <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-medium">HIGH PROTEIN</span>
                    <span className="bg-purple-500 text-white px-2 py-1 rounded-full text-xs font-medium">GLUTEN-FREE</span>
                  </div>
                </div>
                <div className="absolute bottom-4 right-4 bg-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-xl text-gray-900 shadow-lg">
                  1
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Pick your meal preference
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Choose from 8 meal preferences to support your wellness goals.
                Pause, change, or cancel anytime.
              </p>
            </div>

            {/* Step 2 - Select your weekly meals */}
            <div className="text-center">
              <div className="bg-gray-200 rounded-2xl mb-4 overflow-hidden shadow-lg relative">
                <img 
                  src="/eatrite_step2.png?v=1" 
                  alt="Person selecting meals on tablet with meal grid interface showing various meal options" 
                  className="w-full h-64 object-cover object-center"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <div className="flex gap-2">
                    <span className="bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium">📅 WEEKLY</span>
                    <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">100+ MEALS</span>
                  </div>
                </div>
                <div className="absolute bottom-4 right-4 bg-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-xl text-gray-900 shadow-lg">
                  2
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Select your weekly meals
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Enjoy 100 delicious, dietitian-approved weekly options and 65+
                breakfast items, smoothies, and snacks.
              </p>
            </div>

            {/* Step 3 - Get your meals delivered */}
            <div className="text-center">
              <div className="bg-gray-200 rounded-2xl mb-4 overflow-hidden shadow-lg relative">
                <img 
                  src="/eatrite_step3.png?v=1" 
                  alt="EatRite branded delivery box with compartmentalized fresh prepared meals ready to eat" 
                  className="w-full h-64 object-cover object-center"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <div className="flex gap-2">
                    <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">🚚 FREE SHIPPING</span>
                    <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-medium">❄️ FRESH & COLD</span>
                    <span className="bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium">⚡ 90s READY</span>
                  </div>
                </div>
                <div className="absolute bottom-4 right-4 bg-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-xl text-gray-900 shadow-lg">
                  3
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Get your meals delivered
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Your fresh, never-frozen fully prepared meals arrive in an
                insulated, recyclable box. No meal prep, no cleanup—simply heat
                and eat.
              </p>
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center">
            <button className="bg-black hover:bg-gray-800 text-white font-bold px-6 py-3 rounded-lg text-base transition-colors duration-300 mb-3">
              GET STARTED
            </button>
            <p className="text-gray-500 text-sm">Skip or cancel at any time.</p>
          </div>
        </div>
      </section>

      {/* Features & Benefits */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2
              className="text-2xl lg:text-3xl font-bold text-[#0F2B1E] mb-3 tracking-tight"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Why Choose EatRite?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Feature 1 */}
            <div className="text-center space-y-2 p-3 bg-white rounded-lg shadow-sm">
              <div className="w-10 h-10 bg-[#0F2B1E] rounded-lg flex items-center justify-center mx-auto">
                <Shield className="w-5 h-5 text-[#D4B46A]" />
              </div>
              <h3 className="text-base font-bold text-[#0F2B1E]">
                Premium Quality
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Sourced from the finest farms and prepared with meticulous
                attention to detail.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center space-y-2 p-3 bg-white rounded-lg shadow-sm">
              <div className="w-10 h-10 bg-[#0F2B1E] rounded-lg flex items-center justify-center mx-auto">
                <Heart className="w-5 h-5 text-[#D4B46A]" />
              </div>
              <h3 className="text-base font-bold text-[#0F2B1E]">
                Health Focused
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Nutritionist-designed meals that support your wellness goals
                without compromising taste.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center space-y-2 p-3 bg-white rounded-lg shadow-sm">
              <div className="w-10 h-10 bg-[#0F2B1E] rounded-lg flex items-center justify-center mx-auto">
                <Clock className="w-5 h-5 text-[#D4B46A]" />
              </div>
              <h3 className="text-base font-bold text-[#0F2B1E]">Time Saving</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Skip meal planning, shopping, and prep. More time for what
                matters most to you.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="text-center space-y-2 p-3 bg-white rounded-lg shadow-sm">
              <div className="w-10 h-10 bg-[#0F2B1E] rounded-lg flex items-center justify-center mx-auto">
                <TrendingUp className="w-5 h-5 text-[#D4B46A]" />
              </div>
              <h3 className="text-base font-bold text-[#0F2B1E]">
                Results Driven
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Track your progress with our integrated health monitoring and
                achievement system.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Stats */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  50,000+
                </div>
                <p className="text-gray-600 text-sm">Happy Customers</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900 mb-1">5M+</div>
                <p className="text-gray-600 text-sm">Meals Delivered</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  4.8★
                </div>
                <p className="text-gray-600 text-sm">Average Rating</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Simple Testimonials */}
      <section className="py-8 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              What Our Customers Say
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Testimonial 1 */}
            <div className="bg-white border border-gray-100 rounded-lg p-4 shadow-sm">
              <div className="flex items-center mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-3 h-3 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <p className="text-gray-700 mb-3 leading-relaxed text-sm">
                "EatRite saved me hours each week. The meals taste incredible
                and I've never been healthier!"
              </p>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-700 font-bold text-xs">
                  S
                </div>
                <div>
                  <p className="font-medium text-gray-900 text-xs">Sarah C.</p>
                  <p className="text-xs text-gray-500">Verified Customer</p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white border border-gray-100 rounded-lg p-4 shadow-sm">
              <div className="flex items-center mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-3 h-3 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <p className="text-gray-700 mb-3 leading-relaxed text-sm">
                "Perfect for busy parents. My whole family loves these meals and
                they're so convenient!"
              </p>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-700 font-bold text-xs">
                  M
                </div>
                <div>
                  <p className="font-medium text-gray-900 text-xs">Mike R.</p>
                  <p className="text-xs text-gray-500">Verified Customer</p>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white border border-gray-100 rounded-lg p-4 shadow-sm">
              <div className="flex items-center mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-3 h-3 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <p className="text-gray-700 mb-3 leading-relaxed text-sm">
                "Lost 15 pounds in 3 months! The portion control and nutrition
                are perfect."
              </p>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-700 font-bold text-xs">
                  A
                </div>
                <div>
                  <p className="font-medium text-gray-900 text-xs">Alex J.</p>
                  <p className="text-xs text-gray-500">Verified Customer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-10 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center px-6 lg:px-8">
          <h2 className="text-2xl lg:text-3xl font-bold mb-3">
            Ready to Start Your Health Journey?
          </h2>
          <p className="text-base text-gray-300 mb-6 max-w-2xl mx-auto">
            Join thousands who've transformed their eating habits with EatRite's
            chef-crafted meals.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/plans"
              className="bg-white hover:bg-gray-100 text-gray-900 font-bold px-6 py-3 rounded-lg transition-colors duration-300 text-base"
            >
              Get Started Today
            </Link>
            <Link
              to="/menu"
              className="border-2 border-white text-white hover:bg-white hover:text-gray-900 font-bold px-6 py-3 rounded-lg transition-colors duration-300 text-base"
            >
              View Menu
            </Link>
          </div>
          <p className="text-xs text-gray-400 mt-4">
            No commitment required • Cancel anytime • Free shipping
          </p>
        </div>
      </section>
    </div>
    </PageTransition>
  )
}

export default HomePage
