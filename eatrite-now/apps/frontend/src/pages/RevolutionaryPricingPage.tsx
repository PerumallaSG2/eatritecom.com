import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, Crown, Star, ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import RevolutionaryNavbar from '../components/revolutionary/RevolutionaryNavbar'
import livingFoodTokens from '../styles/design-system/living-food-tokens'

const RevolutionaryPricingPage: React.FC = () => {
  const [selectedGoal, setSelectedGoal] = useState<
    'energy' | 'wellness' | 'performance' | 'balance'
  >('energy')
  const [billingCycle, setBillingCycle] = useState<
    'monthly' | 'quarterly' | 'yearly'
  >('monthly')
  const [selectedTier, setSelectedTier] = useState<string>('performance')
  const navigate = useNavigate()

  // Get current theme colors
  const currentTheme = livingFoodTokens.colors.adaptive[selectedGoal]

  const pricingTiers = [
    {
      id: 'energy',
      name: 'Energy Boost',
      description: 'Perfect for busy professionals',
      icon: '⚡',
      healthBenefit: 'energy',
      popular: false,
      prices: {
        monthly: 49,
        quarterly: 39,
        yearly: 29,
      },
      features: [
        '8 Energy-focused meals per month',
        'Quick prep recipes (under 20 min)',
        'Productivity nutrition guides',
        'Mobile app access',
        'Email support',
      ],
      limitations: [],
    },
    {
      id: 'wellness',
      name: 'Wellness Harmony',
      description: 'Holistic health transformation',
      icon: '🧘',
      healthBenefit: 'wellness',
      popular: false,
      prices: {
        monthly: 79,
        quarterly: 69,
        yearly: 59,
      },
      features: [
        '16 Wellness-focused meals per month',
        'Mindful eating guides',
        'Stress-reduction recipes',
        'Meditation meal prep videos',
        'Priority chat support',
        'Monthly wellness check-ins',
      ],
      limitations: [],
    },
    {
      id: 'performance',
      name: 'Performance Pro',
      description: 'Optimize athletic potential',
      icon: '💪',
      healthBenefit: 'performance',
      popular: true,
      prices: {
        monthly: 119,
        quarterly: 99,
        yearly: 79,
      },
      features: [
        '24 Performance meals per month',
        'Pre/post workout nutrition',
        'Sports supplement integration',
        'Performance tracking dashboard',
        'Dedicated nutritionist support',
        'Custom macro optimization',
        'Recovery meal protocols',
      ],
      limitations: [],
    },
    {
      id: 'balance',
      name: 'Balance Master',
      description: 'Complete lifestyle mastery',
      icon: '⚖️',
      healthBenefit: 'balance',
      popular: false,
      prices: {
        monthly: 199,
        quarterly: 169,
        yearly: 129,
      },
      features: [
        'Unlimited meal access',
        'Personalized meal planning',
        'VIP nutritionist consultations',
        'Custom recipe creation',
        'Family meal planning',
        'Lifestyle coaching sessions',
        '24/7 premium support',
        'Exclusive member events',
      ],
      limitations: [],
    },
  ]

  const addOns = [
    {
      name: 'Premium Supplements',
      description: 'Curated supplements to enhance your meals',
      price: 29,
      icon: '💊',
    },
    {
      name: 'Personal Chef Consultation',
      description: 'Monthly video call with our head chef',
      price: 99,
      icon: '👨‍🍳',
    },
    {
      name: 'Organic Upgrade',
      description: '100% organic ingredients for all meals',
      price: 39,
      icon: '🌿',
    },
  ]

  const getSavingsPercentage = (tier: any, cycle: string) => {
    const monthly = tier.prices.monthly
    const current = tier.prices[cycle as keyof typeof tier.prices]
    return Math.round(((monthly - current) / monthly) * 100)
  }

  // Filter tiers based on selected goal
  const filteredTiers = pricingTiers.filter(tier =>
    selectedGoal === 'energy' ? true : tier.healthBenefit === selectedGoal
  )

  return (
    <div
      className="min-h-screen transition-all duration-1000"
      style={{
        background: currentTheme.bg,
      }}
    >
      <RevolutionaryNavbar selectedGoal={selectedGoal} />
      {/* Revolutionary Header */}
      <motion.div
        className="relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0">
          {/* Floating particles background */}
          {[...Array(25)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full opacity-10"
              style={{
                width: Math.random() * 4 + 2,
                height: Math.random() * 4 + 2,
                background: currentTheme.primary,
                boxShadow: `0 0 10px ${currentTheme.primary}`,
              }}
              initial={{
                x:
                  Math.random() *
                  (typeof window !== 'undefined' ? window.innerWidth : 1000),
                y: Math.random() * 600,
              }}
              animate={{
                y: [0, -40, 0],
                x: [0, Math.random() * 200 - 100, 0],
                opacity: [0.1, 0.5, 0.1],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: Math.random() * 12 + 10,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: Math.random() * 5,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 pt-20 pb-16 px-6">
          <div className="max-w-7xl mx-auto text-center">
            <motion.h1
              className="text-5xl md:text-7xl font-bold mb-6"
              style={{
                color: currentTheme.primary,
                textShadow: `0 0 30px ${currentTheme.primary}40`,
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Living Pricing
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Invest in your transformation with plans that evolve and save you
              more
            </motion.p>

            {/* Health Goal Selector */}
            <motion.div
              className="flex justify-center mb-8"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className="flex space-x-3 p-2 rounded-2xl bg-black/20 backdrop-blur-sm">
                {(
                  ['energy', 'wellness', 'performance', 'balance'] as const
                ).map(goal => (
                  <motion.button
                    key={goal}
                    onClick={() => setSelectedGoal(goal)}
                    className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                      selectedGoal === goal
                        ? 'text-white shadow-lg'
                        : 'text-white/60 hover:text-white/80'
                    }`}
                    style={{
                      background:
                        selectedGoal === goal
                          ? livingFoodTokens.colors.adaptive[goal].primary
                          : 'transparent',
                      boxShadow:
                        selectedGoal === goal
                          ? `0 4px 15px ${livingFoodTokens.colors.adaptive[goal].primary}40`
                          : 'none',
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {goal.charAt(0).toUpperCase() + goal.slice(1)}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Billing Cycle Selector */}
            <motion.div
              className="flex justify-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <div className="flex space-x-1 p-1 rounded-xl bg-black/30 backdrop-blur-sm">
                {(['monthly', 'quarterly', 'yearly'] as const).map(cycle => (
                  <motion.button
                    key={cycle}
                    onClick={() => setBillingCycle(cycle)}
                    className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 relative ${
                      billingCycle === cycle
                        ? 'text-white'
                        : 'text-white/60 hover:text-white/80'
                    }`}
                    style={{
                      background:
                        billingCycle === cycle
                          ? currentTheme.primary
                          : 'transparent',
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {cycle.charAt(0).toUpperCase() + cycle.slice(1)}
                    {cycle === 'yearly' && (
                      <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                        Save 40%
                      </span>
                    )}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Pricing Grid */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            {filteredTiers.map((tier, index) => (
              <motion.div
                key={tier.id}
                className={`relative overflow-hidden rounded-3xl p-8 cursor-pointer transition-all duration-500 ${
                  selectedTier === tier.id
                    ? 'scale-105 z-10'
                    : 'hover:scale-102'
                }`}
                style={{
                  background:
                    selectedTier === tier.id
                      ? `linear-gradient(145deg, ${currentTheme.primary}20, ${currentTheme.secondary}20)`
                      : tier.popular
                        ? `linear-gradient(145deg, ${currentTheme.primary}10, ${currentTheme.secondary}10)`
                        : 'rgba(255,255,255,0.05)',
                  border: `2px solid ${
                    selectedTier === tier.id
                      ? currentTheme.primary
                      : tier.popular
                        ? currentTheme.secondary
                        : 'rgba(255,255,255,0.1)'
                  }`,
                  boxShadow:
                    selectedTier === tier.id
                      ? `0 25px 50px ${currentTheme.primary}30`
                      : tier.popular
                        ? `0 15px 35px ${currentTheme.secondary}20`
                        : '0 10px 30px rgba(0,0,0,0.2)',
                }}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 1.2 + index * 0.15,
                  ease: 'easeOut',
                }}
                onClick={() => setSelectedTier(tier.id)}
                whileHover={{ y: -8 }}
              >
                {/* Popular Badge */}
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <div
                      className="px-6 py-2 rounded-full text-sm font-bold text-white flex items-center space-x-1"
                      style={{
                        background: `linear-gradient(135deg, ${currentTheme.primary}, ${currentTheme.secondary})`,
                      }}
                    >
                      <Crown size={16} />
                      <span>Most Popular</span>
                    </div>
                  </div>
                )}

                {/* Tier Header */}
                <div className="text-center mb-8 mt-4">
                  <div
                    className="text-4xl mb-4"
                    style={{
                      filter: `drop-shadow(0 0 10px ${currentTheme.primary})`,
                    }}
                  >
                    {tier.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {tier.name}
                  </h3>
                  <p className="text-white/70 text-sm">{tier.description}</p>
                </div>

                {/* Pricing */}
                <div className="text-center mb-8">
                  <div className="flex items-baseline justify-center mb-2">
                    <span className="text-4xl font-bold text-white">
                      ${tier.prices[billingCycle]}
                    </span>
                    <span className="text-white/50 ml-2">
                      /
                      {billingCycle === 'monthly'
                        ? 'mo'
                        : billingCycle === 'quarterly'
                          ? 'qtr'
                          : 'yr'}
                    </span>
                  </div>
                  {billingCycle !== 'monthly' && (
                    <div className="text-sm">
                      <span className="text-green-400 font-semibold">
                        Save {getSavingsPercentage(tier, billingCycle)}%
                      </span>
                      <span className="text-white/50 ml-2 line-through">
                        ${tier.prices.monthly}/
                        {billingCycle === 'quarterly' ? 'qtr' : 'yr'}
                      </span>
                    </div>
                  )}
                </div>

                {/* Features */}
                <div className="space-y-4 mb-8">
                  {tier.features.map((feature, featureIndex) => (
                    <div
                      key={featureIndex}
                      className="flex items-start space-x-3"
                    >
                      <Check
                        size={16}
                        className="mt-1 flex-shrink-0"
                        style={{ color: currentTheme.primary }}
                      />
                      <span className="text-white/80 text-sm leading-relaxed">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <motion.button
                  onClick={() => {
                    if (selectedTier !== tier.id) {
                      setSelectedTier(tier.id)
                    } else {
                      navigate('/checkout')
                    }
                  }}
                  className="w-full py-4 rounded-xl font-semibold text-white relative overflow-hidden"
                  style={{
                    background:
                      selectedTier === tier.id
                        ? `linear-gradient(135deg, ${currentTheme.primary}, ${currentTheme.secondary})`
                        : `${currentTheme.primary}60`,
                    boxShadow: `0 4px 15px ${currentTheme.primary}40`,
                  }}
                  whileHover={{
                    scale: 1.02,
                    boxShadow: `0 6px 20px ${currentTheme.primary}60`,
                  }}
                  whileTap={{ scale: 0.98 }}
                  animate={
                    selectedTier === tier.id
                      ? {
                          boxShadow: [
                            `0 4px 15px ${currentTheme.primary}40`,
                            `0 8px 25px ${currentTheme.primary}70`,
                            `0 4px 15px ${currentTheme.primary}40`,
                          ],
                        }
                      : {}
                  }
                  transition={{
                    boxShadow: {
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    },
                  }}
                >
                  <div className="flex items-center justify-center space-x-2">
                    <span>
                      {selectedTier === tier.id
                        ? 'Proceed to Checkout'
                        : 'Choose Plan'}
                    </span>
                    <ArrowRight size={16} />
                  </div>
                </motion.button>
              </motion.div>
            ))}
          </motion.div>

          {/* Add-ons Section */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.8 }}
          >
            <h2 className="text-3xl font-bold text-white text-center mb-12">
              Enhance Your Experience
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              {addOns.map((addon, index) => (
                <motion.div
                  key={addon.name}
                  className="p-6 rounded-2xl text-center"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 2 + index * 0.1 }}
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: 'rgba(255,255,255,0.08)',
                  }}
                >
                  <div
                    className="text-3xl mb-3"
                    style={{
                      filter: `drop-shadow(0 0 8px ${currentTheme.primary})`,
                    }}
                  >
                    {addon.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {addon.name}
                  </h3>
                  <p className="text-white/70 text-sm mb-4">
                    {addon.description}
                  </p>
                  <div
                    className="text-xl font-bold"
                    style={{ color: currentTheme.primary }}
                  >
                    +${addon.price}/mo
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* FAQ Section */}
          <motion.div
            className="text-center p-8 rounded-2xl"
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.5 }}
          >
            <Star
              size={48}
              className="mx-auto mb-4"
              style={{ color: currentTheme.primary }}
            />
            <h3 className="text-2xl font-bold text-white mb-4">
              Questions? We're here to help
            </h3>
            <p className="text-white/70 max-w-2xl mx-auto mb-6">
              Our living nutrition experts are available 24/7 to guide you on
              your transformation journey.
            </p>
            <motion.button
              onClick={() => navigate('/support')}
              className="px-8 py-3 rounded-xl font-semibold text-white"
              style={{
                background: `linear-gradient(135deg, ${currentTheme.primary}, ${currentTheme.secondary})`,
                boxShadow: `0 4px 15px ${currentTheme.primary}40`,
              }}
              whileHover={{
                scale: 1.05,
                boxShadow: `0 6px 20px ${currentTheme.primary}60`,
              }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Support
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default RevolutionaryPricingPage
