/**
 * Revolutionary Hero - "Food Intelligence" Interface
 * World's first AI-powered food discovery that adapts to your body and goals
 */

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface RevolutionaryHeroProps {
  onHealthGoalSelect: (goal: 'energy' | 'wellness' | 'performance' | 'balance') => void
}

const RevolutionaryHero = ({ onHealthGoalSelect }: RevolutionaryHeroProps) => {
  const [currentGoal, setCurrentGoal] = useState<'energy' | 'wellness' | 'performance' | 'balance'>('wellness')
  const [isPersonalizing, setIsPersonalizing] = useState(false)

  // Auto-cycle through health goals to show adaptability
  useEffect(() => {
    const goals: ('energy' | 'wellness' | 'performance' | 'balance')[] = ['energy', 'wellness', 'performance', 'balance']
    const interval = setInterval(() => {
      setCurrentGoal(prev => {
        const currentIndex = goals.indexOf(prev)
        const nextIndex = (currentIndex + 1) % goals.length
        return goals[nextIndex]
      })
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  const healthGoals = {
    energy: {
      title: "Boost Your Energy",
      subtitle: "Fuel your day with meals that energize",
      color: '#FF6B35',
      gradient: 'from-orange-400 to-red-400',
      bg: 'from-orange-50 to-red-50',
      emoji: '⚡',
      description: "High-protein, complex carbs for sustained energy"
    },
    wellness: {
      title: "Optimize Your Wellness", 
      subtitle: "Nourish your body with pure, clean nutrition",
      color: '#00C896',
      gradient: 'from-green-400 to-emerald-400',
      bg: 'from-green-50 to-emerald-50',
      emoji: '🌱',
      description: "Organic, nutrient-dense meals for total body health"
    },
    performance: {
      title: "Peak Performance Mode",
      subtitle: "Meals engineered for athletes and achievers", 
      color: '#6C5CE7',
      gradient: 'from-purple-400 to-indigo-400',
      bg: 'from-purple-50 to-indigo-50',
      emoji: '💪',
      description: "Precision nutrition for strength and recovery"
    },
    balance: {
      title: "Find Your Balance",
      subtitle: "Harmony between taste, health, and convenience",
      color: '#FF7675',
      gradient: 'from-pink-400 to-rose-400', 
      bg: 'from-pink-50 to-rose-50',
      emoji: '⚖️',
      description: "Perfectly portioned meals for a balanced lifestyle"
    }
  }

  const currentTheme = healthGoals[currentGoal]

  const handleGoalSelect = (goal: 'energy' | 'wellness' | 'performance' | 'balance') => {
    setIsPersonalizing(true)
    setCurrentGoal(goal)
    onHealthGoalSelect(goal)
    
    // Simulate AI personalization process
    setTimeout(() => setIsPersonalizing(false), 2000)
  }

  return (
    <section className="relative min-h-screen overflow-hidden">
      
      {/* Dynamic Background */}
      <div 
        className={`absolute inset-0 bg-gradient-to-br ${currentTheme.bg} transition-all duration-1000`}
      />
      
      {/* Floating Food Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-4 h-4 rounded-full opacity-20"
            style={{ backgroundColor: currentTheme.color }}
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              scale: [1, 1.5, 1],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
          
          {/* Left Column: Revolutionary Interface */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              key={currentGoal}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl">{currentTheme.emoji}</span>
                <span 
                  className="text-lg font-semibold px-4 py-2 rounded-full"
                  style={{ 
                    backgroundColor: `${currentTheme.color}20`,
                    color: currentTheme.color 
                  }}
                >
                  AI Recommendation
                </span>
              </div>

              <h1 className="text-5xl md:text-6xl font-bold mb-4 text-gray-900">
                <span className="block">EatRite</span>
                <motion.span 
                  className={`block bg-gradient-to-r ${currentTheme.gradient} bg-clip-text text-transparent`}
                  key={currentTheme.title}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  {currentTheme.title}
                </motion.span>
              </h1>

              <motion.p 
                className="text-xl text-gray-600 mb-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {currentTheme.subtitle}
              </motion.p>

              <motion.p 
                className="text-gray-500 mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                {currentTheme.description}
              </motion.p>
            </motion.div>

            {/* Interactive Health Goal Selector */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">
                What's your primary health goal? ✨
              </h3>
              
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(healthGoals).map(([key, goal]) => (
                  <motion.button
                    key={key}
                    onClick={() => handleGoalSelect(key as any)}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                      currentGoal === key 
                        ? 'border-current shadow-lg' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    style={{
                      borderColor: currentGoal === key ? goal.color : undefined,
                      backgroundColor: currentGoal === key ? `${goal.color}10` : '#FFFFFF'
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{goal.emoji}</span>
                      <div>
                        <div className="font-medium text-gray-800">
                          {goal.title.replace(/^(Boost Your|Optimize Your|Peak|Find Your)\s/, '')}
                        </div>
                        <div className="text-sm text-gray-500">
                          {goal.subtitle.split(' ').slice(0, 3).join(' ')}...
                        </div>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Revolutionary CTA */}
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-full text-white font-semibold text-lg shadow-lg flex items-center justify-center gap-2 min-w-[200px]"
                style={{
                  background: `linear-gradient(135deg, ${currentTheme.color}, ${currentTheme.color}CC)`
                }}
                disabled={isPersonalizing}
              >
                {isPersonalizing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Personalizing...
                  </>
                ) : (
                  <>
                    🚀 Start My Journey
                  </>
                )}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-full bg-white text-gray-700 font-semibold text-lg border-2 border-gray-200 hover:border-gray-300 transition-colors"
              >
                🍽️ Explore Meals
              </motion.button>
            </div>

            {/* Trust Indicators */}
            <div className="mt-8 grid grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-gray-800">50K+</div>
                <div className="text-sm text-gray-500">Happy Members</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-800">4.9★</div>
                <div className="text-sm text-gray-500">Average Rating</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-800">500+</div>
                <div className="text-sm text-gray-500">Meal Varieties</div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Living Food Preview */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative">
              
              {/* Sample Meal Card with Living Effects */}
              <motion.div
                key={currentGoal}
                initial={{ opacity: 0, scale: 0.8, rotateY: 90 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="bg-white rounded-3xl p-6 shadow-xl"
                style={{
                  boxShadow: `0 20px 60px ${currentTheme.color}20`
                }}
              >
                <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl mb-4 overflow-hidden relative">
                  <img 
                    src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=400&fit=crop"
                    alt="Sample Meal"
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Floating Nutrition Indicators */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                      className="relative w-32 h-32"
                    >
                      {/* Protein */}
                      <div 
                        className="absolute w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
                        style={{ 
                          backgroundColor: '#E17055',
                          top: '10%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)'
                        }}
                      >
                        25g
                      </div>
                      
                      {/* Carbs */}
                      <div 
                        className="absolute w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
                        style={{ 
                          backgroundColor: '#FDCB6E',
                          top: '50%',
                          right: '10%',
                          transform: 'translate(50%, -50%)'
                        }}
                      >
                        30g
                      </div>
                      
                      {/* Fats */}
                      <div 
                        className="absolute w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
                        style={{ 
                          backgroundColor: '#6C5CE7',
                          bottom: '10%',
                          left: '50%',
                          transform: 'translate(-50%, 50%)'
                        }}
                      >
                        12g
                      </div>
                      
                      {/* Fiber */}
                      <div 
                        className="absolute w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
                        style={{ 
                          backgroundColor: '#00B894',
                          top: '50%',
                          left: '10%',
                          transform: 'translate(-50%, -50%)'
                        }}
                      >
                        8g
                      </div>
                    </motion.div>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Mediterranean Power Bowl
                </h3>
                
                <div 
                  className="inline-block px-3 py-1 rounded-full text-sm font-medium mb-3"
                  style={{
                    backgroundColor: `${currentTheme.color}15`,
                    color: currentTheme.color
                  }}
                >
                  Perfect for {currentGoal}! {currentTheme.emoji}
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-gray-800">$14.99</span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 rounded-full text-white font-medium"
                    style={{ backgroundColor: currentTheme.color }}
                  >
                    Add to Cart
                  </motion.button>
                </div>
              </motion.div>

              {/* Floating Elements */}
              <motion.div
                animate={{ y: [-10, 10, -10], rotate: [0, 5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -top-6 -right-6 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-white font-bold"
              >
                AI
              </motion.div>

              <motion.div
                animate={{ y: [10, -10, 10], rotate: [0, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                className="absolute -bottom-6 -left-6 w-12 h-12 bg-green-400 rounded-full flex items-center justify-center text-white font-bold"
              >
                🌱
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default RevolutionaryHero