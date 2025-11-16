import { useState } from 'react'
import { Check, Star, ArrowRight } from 'lucide-react'

const PricingPage = () => {
  const [billingCycle, setBillingCycle] = useState<'weekly' | 'monthly'>('weekly')

  const pricingPlans = [
    {
      id: 'starter',
      name: 'Essential',
      description: 'Perfect for discovering healthy eating habits',
      mealsPerWeek: 4,
      pricePerMeal: 13.95,
      totalWeekly: 55.80,
      totalMonthly: 223.20,
      popular: false,
      savings: null,
      features: [
        '4 chef-prepared meals weekly',
        'Fresh, premium ingredients',
        'Free delivery on $70+ orders',
        'Nutritionist-approved recipes',
        'Flexible delivery scheduling'
      ],
      badge: null,
      highlight: false
    },
    {
      id: 'balanced',
      name: 'Popular',
      description: 'Most chosen by health-conscious professionals',
      mealsPerWeek: 8,
      pricePerMeal: 11.95,
      totalWeekly: 95.60,
      totalMonthly: 382.40,
      popular: true,
      savings: 'Save $16/week',
      features: [
        '8 chef-prepared meals weekly',
        'Premium organic ingredients',
        'Complimentary delivery nationwide',
        'Dedicated nutrition support',
        'Priority customer service',
        'Access to seasonal specialties'
      ],
      badge: 'Most Popular',
      highlight: true
    },
    {
      id: 'family',
      name: 'Premium',
      description: 'Ultimate value for families and meal enthusiasts',
      mealsPerWeek: 12,
      pricePerMeal: 10.95,
      totalWeekly: 131.40,
      totalMonthly: 525.60,
      popular: false,
      savings: 'Save $36/week',
      features: [
        '12 chef-prepared meals weekly',
        'Family-size portions available',
        'Express delivery included',
        'Personal nutrition consultation',
        'White-glove customer support',
        'Custom meal modifications',
        'Exclusive member perks'
      ],
      badge: 'Best Value',
      highlight: false
    }
  ]

  const addOnServices = [
    {
      id: 'nutrition-coaching',
      name: 'Personal Nutrition Coaching',
      description: 'One-on-one sessions with certified nutritionists',
      price: 49.99,
      period: 'per session',
      features: ['Personalized meal planning', 'Health goal tracking', 'Weekly check-ins']
    },
    {
      id: 'premium-ingredients',
      name: 'Premium Ingredient Upgrade',
      description: 'Organic, grass-fed, and sustainably sourced ingredients',
      price: 4.99,
      period: 'per meal',
      features: ['Certified organic produce', 'Grass-fed proteins', 'Sustainable sourcing']
    },
    {
      id: 'express-delivery',
      name: 'Express Delivery',
      description: 'Same-day or next-day delivery in select cities',
      price: 9.99,
      period: 'per delivery',
      features: ['Same-day delivery', 'Premium packaging', 'SMS notifications']
    }
  ]

  const faqs = [
    {
      question: 'How does pricing work?',
      answer: 'Our pricing is simple and transparent. You pay per meal with no hidden fees. Larger plans offer better value with lower per-meal costs.'
    },
    {
      question: 'Can I change my plan anytime?',
      answer: 'Yes! You can upgrade, downgrade, or pause your subscription at any time through your account dashboard.'
    },
    {
      question: 'Are there any additional fees?',
      answer: 'No hidden fees! Delivery is free on orders over $70. The only additional costs are optional add-on services.'
    },
    {
      question: 'What if I want to skip a week?',
      answer: 'You can skip weeks or pause your subscription anytime. We understand life gets busy!'
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-[#0F2B1E] font-playfair">
              Transparent Pricing
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Choose the plan that fits your lifestyle. Premium, chef-prepared meals 
              delivered fresh with complete flexibility to change anytime.
            </p>
          </div>

          {/* Elegant Billing Toggle */}
          <div className="flex justify-center mb-16">
            <div className="bg-gray-50 p-1 rounded-xl border">
              <button
                onClick={() => setBillingCycle('weekly')}
                className={`px-8 py-3 rounded-lg font-medium transition-all duration-200 ${
                  billingCycle === 'weekly' 
                    ? 'bg-white text-[#0F2B1E] shadow-sm' 
                    : 'text-gray-600 hover:text-[#0F2B1E]'
                }`}
              >
                Weekly Delivery
              </button>
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-8 py-3 rounded-lg font-medium transition-all duration-200 ${
                  billingCycle === 'monthly' 
                    ? 'bg-white text-[#0F2B1E] shadow-sm' 
                    : 'text-gray-600 hover:text-[#0F2B1E]'
                }`}
              >
                Monthly Plan
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan) => (
              <div 
                key={plan.id} 
                className={`relative bg-white rounded-xl border transition-all duration-300 hover:shadow-lg ${
                  plan.highlight 
                    ? 'border-[#D4B46A] shadow-md scale-105' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <div className="bg-[#D4B46A] text-white px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                      <Star className="w-3 h-3 fill-current" />
                      {plan.badge}
                    </div>
                  </div>
                )}

                <div className="p-8">
                  {/* Plan Header */}
                  <div className="text-center mb-8">
                    <h3 className="text-xl font-semibold text-[#0F2B1E] mb-2 font-playfair">
                      {plan.name}
                    </h3>
                    <p className="text-gray-600 mb-6">{plan.description}</p>
                    
                    {plan.savings && (
                      <div className="inline-block bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-medium mb-4">
                        {plan.savings}
                      </div>
                    )}

                    <div className="mb-6">
                      <div className="text-4xl font-bold text-[#0F2B1E] mb-1">
                        ${billingCycle === 'weekly' ? plan.totalWeekly : plan.totalMonthly}
                      </div>
                      <div className="text-gray-500">
                        per {billingCycle}
                      </div>
                      <div className="text-sm text-gray-400 mt-1">
                        ${plan.pricePerMeal} per meal • {plan.mealsPerWeek} meals/week
                      </div>
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="space-y-3 mb-8">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start">
                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-50 flex items-center justify-center mt-0.5 mr-3">
                          <Check className="w-3 h-3 text-green-600" />
                        </div>
                        <span className="text-gray-700 text-sm leading-relaxed">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <button 
                    className={`w-full py-3 px-4 rounded-lg font-medium transition-colors duration-200 ${
                      plan.highlight
                        ? 'bg-[#0F2B1E] hover:bg-[#1a4d33] text-white'
                        : 'bg-gray-50 hover:bg-gray-100 text-[#0F2B1E] border border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {plan.highlight ? 'Start Free Trial' : 'Choose Plan'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Add-On Services */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold mb-4 text-[#0F2B1E] font-playfair">
              Enhance Your Experience
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Optional services to personalize and elevate your healthy eating journey
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {addOnServices.map((service) => (
              <div key={service.id} className="bg-white rounded-lg border border-gray-200 p-6 text-center hover:shadow-md transition-shadow duration-200">
                <h3 className="text-lg font-semibold text-[#0F2B1E] mb-3">
                  {service.name}
                </h3>
                <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                  {service.description}
                </p>
                
                <div className="mb-6 pb-6 border-b border-gray-100">
                  <div className="text-2xl font-bold text-[#0F2B1E]">
                    ${service.price}
                  </div>
                  <div className="text-sm text-gray-500">{service.period}</div>
                </div>

                <div className="space-y-2 mb-8">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center justify-center text-sm">
                      <div className="w-1 h-1 bg-[#D4B46A] rounded-full mr-2"></div>
                      <span className="text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>

                <button className="w-full py-2 px-4 border border-[#0F2B1E] text-[#0F2B1E] rounded-lg hover:bg-[#0F2B1E] hover:text-white transition-colors duration-200 font-medium">
                  Add to Plan
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-semibold mb-4 text-[#0F2B1E] font-playfair">
              Common Questions
            </h2>
            <p className="text-gray-600">
              Everything you need to know about our pricing and plans
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-sm transition-shadow duration-200">
                <h3 className="text-lg font-medium text-[#0F2B1E] mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#F5F2E8]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-semibold mb-6 text-[#0F2B1E] font-playfair">
            Ready to Begin?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Join thousands who have transformed their relationship with food through our 
            thoughtfully prepared, nutritionist-approved meals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-[#0F2B1E] hover:bg-[#1a4d33] text-white font-medium py-3 px-8 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2">
              Start Your Free Trial
              <ArrowRight className="w-4 h-4" />
            </button>
            <button className="border border-[#0F2B1E] text-[#0F2B1E] hover:bg-[#0F2B1E] hover:text-white font-medium py-3 px-8 rounded-lg transition-colors duration-200">
              Browse Sample Menus
            </button>
          </div>
          
          <div className="mt-8 text-sm text-gray-500">
            <p>✓ No commitment required • ✓ Cancel anytime • ✓ Free delivery included</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default PricingPage