import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Zap, Heart, Star, Crown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import RevolutionaryNavbar from '../components/revolutionary/RevolutionaryNavbar';
import livingFoodTokens from '../styles/design-system/living-food-tokens';

const RevolutionaryPlansPage: React.FC = () => {
  const [selectedGoal, setSelectedGoal] = useState<'energy' | 'wellness' | 'performance' | 'balance'>('energy');
  const [selectedPlan, setSelectedPlan] = useState<string>('performance-pro');
  const navigate = useNavigate();

  // Get current theme colors
  const currentTheme = livingFoodTokens.colors.adaptive[selectedGoal];

  const livingPlans = [
    {
      id: 'energy-starter',
      name: 'Energy Starter',
      description: 'Perfect for beginners on their energy journey',
      healthBenefit: 'energy',
      price: 59.99,
      originalPrice: 79.99,
      mealsPerWeek: 4,
      icon: '⚡',
      features: [
        'Energy-boosting breakfast bowls',
        'Nutrient-dense smoothies',
        'Quick preparation (under 15min)',
        'Personalized nutrition coaching',
        'Mobile app access'
      ],
      badge: 'Most Popular',
      badgeColor: 'bg-gradient-to-r from-yellow-400 to-orange-500'
    },
    {
      id: 'wellness-harmony',
      name: 'Wellness Harmony',
      description: 'Balanced nutrition for holistic wellness',
      healthBenefit: 'wellness',
      price: 79.99,
      originalPrice: 99.99,
      mealsPerWeek: 6,
      icon: '🧘',
      features: [
        'Mindful eating recipes',
        'Anti-inflammatory ingredients',
        'Stress-reducing adaptogens',
        'Weekly wellness check-ins',
        'Meditation meal prep guides'
      ],
      badge: 'Best Value',
      badgeColor: 'bg-gradient-to-r from-green-400 to-teal-500'
    },
    {
      id: 'performance-pro',
      name: 'Performance Pro',
      description: 'Optimized for peak athletic performance',
      healthBenefit: 'performance',
      price: 99.99,
      originalPrice: 129.99,
      mealsPerWeek: 8,
      icon: '💪',
      features: [
        'High-protein recovery meals',
        'Pre/post workout nutrition',
        'Performance supplements included',
        'Sports nutritionist consultations',
        'Macro tracking & optimization'
      ],
      badge: 'Premium',
      badgeColor: 'bg-gradient-to-r from-red-400 to-pink-500'
    },
    {
      id: 'balance-master',
      name: 'Balance Master',
      description: 'Complete lifestyle transformation',
      healthBenefit: 'balance',
      price: 119.99,
      originalPrice: 159.99,
      mealsPerWeek: 12,
      icon: '⚖️',
      features: [
        'Comprehensive meal variety',
        'Lifestyle coaching sessions',
        'Custom meal planning',
        'Priority customer support',
        'Exclusive recipe collections',
        'Monthly progress reviews'
      ],
      badge: 'Ultimate',
      badgeColor: 'bg-gradient-to-r from-purple-400 to-indigo-500'
    }
  ];

  const benefits = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Living Nutrition',
      description: 'Meals that adapt to your body\'s changing needs'
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: 'Wellness Focus',
      description: 'Every meal designed to enhance your wellbeing'
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: 'Premium Quality',
      description: 'Organic, locally-sourced ingredients only'
    }
  ];

  // Filter plans based on selected goal
  const filteredPlans = livingPlans.filter(plan => 
    selectedGoal === 'energy' ? true : plan.healthBenefit === selectedGoal
  );

  return (
    <div 
      className="min-h-screen transition-all duration-1000"
      style={{ 
        background: currentTheme.bg
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
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full opacity-20"
              style={{ 
                background: currentTheme.primary,
                boxShadow: `0 0 8px ${currentTheme.primary}`
              }}
              initial={{
                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                y: Math.random() * 500,
              }}
              animate={{
                y: [0, -30, 0],
                x: [0, Math.random() * 150 - 75, 0],
                opacity: [0.1, 0.4, 0.1]
              }}
              transition={{
                duration: Math.random() * 10 + 8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 4,
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
                textShadow: `0 0 30px ${currentTheme.primary}40`
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Living Plans
            </motion.h1>
            
            <motion.p
              className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Choose your transformation journey with plans that evolve with you
            </motion.p>

            {/* Health Goal Selector */}
            <motion.div 
              className="flex justify-center mb-8"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className="flex space-x-3 p-2 rounded-2xl bg-black/20 backdrop-blur-sm">
                {(['energy', 'wellness', 'performance', 'balance'] as const).map((goal) => (
                  <motion.button
                    key={goal}
                    onClick={() => setSelectedGoal(goal)}
                    className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                      selectedGoal === goal 
                        ? 'text-white shadow-lg' 
                        : 'text-white/60 hover:text-white/80'
                    }`}
                    style={{
                      background: selectedGoal === goal 
                        ? livingFoodTokens.colors.adaptive[goal].primary 
                        : 'transparent',
                      boxShadow: selectedGoal === goal 
                        ? `0 4px 15px ${livingFoodTokens.colors.adaptive[goal].primary}40`
                        : 'none'
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {goal.charAt(0).toUpperCase() + goal.slice(1)}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Benefits Row */}
            <motion.div
              className="grid md:grid-cols-3 gap-8 mb-16 max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1 + index * 0.2 }}
                >
                  <div 
                    className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center"
                    style={{ 
                      background: `${currentTheme.primary}20`,
                      color: currentTheme.primary,
                      boxShadow: `0 8px 20px ${currentTheme.primary}20`
                    }}
                  >
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{benefit.title}</h3>
                  <p className="text-white/70">{benefit.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Plans Grid */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="grid md:grid-cols-2 xl:grid-cols-4 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.4 }}
          >
            {filteredPlans.map((plan, index) => (
              <motion.div
                key={plan.id}
                className={`relative overflow-hidden rounded-3xl p-8 cursor-pointer transition-all duration-300 ${
                  selectedPlan === plan.id ? 'scale-105 z-10' : 'hover:scale-102'
                }`}
                style={{
                  background: selectedPlan === plan.id 
                    ? `linear-gradient(145deg, ${currentTheme.primary}15, ${currentTheme.secondary}15)`
                    : 'rgba(255,255,255,0.05)',
                  border: `2px solid ${selectedPlan === plan.id ? currentTheme.primary : 'rgba(255,255,255,0.1)'}`,
                  boxShadow: selectedPlan === plan.id 
                    ? `0 20px 40px ${currentTheme.primary}30`
                    : '0 10px 30px rgba(0,0,0,0.2)'
                }}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.6, 
                  delay: 1.6 + index * 0.2,
                  ease: "easeOut"
                }}
                onClick={() => setSelectedPlan(plan.id)}
                whileHover={{ y: -5 }}
              >
                {/* Badge */}
                {plan.badge && (
                  <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold text-white ${plan.badgeColor}`}>
                    {plan.badge}
                  </div>
                )}

                {/* Plan Header */}
                <div className="text-center mb-6">
                  <div 
                    className="text-4xl mb-3"
                    style={{ filter: `drop-shadow(0 0 10px ${currentTheme.primary})` }}
                  >
                    {plan.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <p className="text-white/70 text-sm">{plan.description}</p>
                </div>

                {/* Pricing */}
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <span className="text-3xl font-bold text-white">${plan.price}</span>
                    <span className="text-lg text-white/50 line-through">${plan.originalPrice}</span>
                  </div>
                  <p className="text-white/60 text-sm">{plan.mealsPerWeek} meals per week</p>
                </div>

                {/* Features */}
                <div className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start space-x-3">
                      <Check 
                        size={16} 
                        className="mt-1 flex-shrink-0"
                        style={{ color: currentTheme.primary }}
                      />
                      <span className="text-white/80 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <motion.button
                  onClick={() => {
                    if (selectedPlan !== plan.id) {
                      setSelectedPlan(plan.id);
                    } else {
                      navigate('/checkout');
                    }
                  }}
                  className="w-full py-4 rounded-xl font-semibold text-white relative overflow-hidden"
                  style={{
                    background: selectedPlan === plan.id 
                      ? `linear-gradient(135deg, ${currentTheme.primary}, ${currentTheme.secondary})`
                      : `${currentTheme.primary}80`,
                    boxShadow: `0 4px 15px ${currentTheme.primary}40`
                  }}
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: `0 6px 20px ${currentTheme.primary}60`
                  }}
                  whileTap={{ scale: 0.98 }}
                  animate={selectedPlan === plan.id ? {
                    boxShadow: [
                      `0 4px 15px ${currentTheme.primary}40`,
                      `0 8px 25px ${currentTheme.primary}60`,
                      `0 4px 15px ${currentTheme.primary}40`
                    ]
                  } : {}}
                  transition={{
                    boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                  }}
                >
                  {selectedPlan === plan.id ? 'Proceed to Checkout' : 'Choose Plan'}
                </motion.button>
              </motion.div>
            ))}
          </motion.div>

          {/* Guarantee Section */}
          <motion.div
            className="text-center mt-16 p-8 rounded-2xl"
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)'
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.5 }}
          >
            <Crown 
              size={48} 
              className="mx-auto mb-4"
              style={{ color: currentTheme.primary }}
            />
            <h3 className="text-2xl font-bold text-white mb-4">30-Day Living Food Guarantee</h3>
            <p className="text-white/70 max-w-2xl mx-auto">
              If you don't feel the transformative power of our living meals within 30 days, 
              we'll refund your entire purchase. No questions asked.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default RevolutionaryPlansPage;