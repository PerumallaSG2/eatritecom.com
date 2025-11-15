import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import RevolutionaryHero from '../components/revolutionary/RevolutionaryHero';
import LivingFoodCard from '../components/revolutionary/LivingFoodCard';
import RevolutionaryNavbar from '../components/revolutionary/RevolutionaryNavbar';
import livingFoodTokens from '../styles/design-system/living-food-tokens';

// Sample meal data matching LivingFoodCard interface
const featuredMeals = [
  {
    id: "1",
    name: "Power Bowl Supreme",
    image: "/placeholder-meal-1.jpg",
    price: 16.99,
    calories: 450,
    protein: 35,
    carbs: 38,
    fats: 18,
    fiber: 12,
    ingredients: ["Quinoa", "Grilled Chicken", "Avocado", "Supergreens", "Hemp Seeds"],
    healthBenefit: "energy" as const
  },
  {
    id: "2",
    name: "Zen Garden Salad",
    image: "/placeholder-meal-2.jpg",
    price: 14.99,
    calories: 320,
    protein: 18,
    carbs: 25,
    fats: 12,
    fiber: 15,
    ingredients: ["Mixed Greens", "Edamame", "Cucumber", "Ginger", "Sesame"],
    healthBenefit: "wellness" as const
  },
  {
    id: "3",
    name: "Athlete's Fuel",
    image: "/placeholder-meal-3.jpg",
    price: 19.99,
    calories: 580,
    protein: 42,
    carbs: 48,
    fats: 22,
    fiber: 8,
    ingredients: ["Lean Beef", "Sweet Potato", "Performance Greens", "Spirulina"],
    healthBenefit: "performance" as const
  },
  {
    id: "4",
    name: "Harmony Plate",
    image: "/placeholder-meal-4.jpg",
    price: 18.99,
    calories: 420,
    protein: 28,
    carbs: 35,
    fats: 16,
    fiber: 10,
    ingredients: ["Wild Salmon", "Brown Rice", "Seasonal Vegetables", "Herbs"],
    healthBenefit: "balance" as const
  }
];

export const RevolutionaryHomePage: React.FC = () => {
  const [selectedGoal, setSelectedGoal] = useState<'energy' | 'wellness' | 'performance' | 'balance'>('energy');
  const navigate = useNavigate();

  // Get current theme colors - using more subtle backgrounds
  const currentTheme = {
    ...livingFoodTokens.colors.adaptive[selectedGoal],
    bg: '#1a1a1a' // Consistent dark background to reduce jarring transitions
  };

  const handleAddToCart = (mealId: string) => {
    console.log(`Added meal ${mealId} to cart`);
  };

  return (
    <div 
      className="min-h-screen"
      style={{ 
        background: currentTheme.bg,
        transition: 'background 0.8s ease'
      }}
    >
      {/* Revolutionary Navigation */}
      <RevolutionaryNavbar selectedGoal={selectedGoal} />
      
      {/* Revolutionary Hero Section */}
      <RevolutionaryHero onHealthGoalSelect={setSelectedGoal} />

      {/* Living Food Gallery */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Adaptive Section Header */}
          <motion.div
            key={selectedGoal}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 
              className="text-4xl md:text-6xl font-bold mb-6"
              style={{ 
                color: currentTheme.primary,
                textShadow: `0 0 20px ${currentTheme.primary}40`
              }}
            >
              Living Food Collection
            </h2>
            <p 
              className="text-xl md:text-2xl opacity-80 max-w-3xl mx-auto text-white"
            >
              Each meal pulses with life, adapting to your health journey
            </p>
          </motion.div>

          {/* Health Goal Selector */}
          <div className="flex justify-center mb-16">
            <div className="flex space-x-4 p-2 rounded-2xl bg-black/20 backdrop-blur-sm">
              {(['energy', 'wellness', 'performance', 'balance'] as const).map((goal) => (
                <button
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
                >
                  {goal.charAt(0).toUpperCase() + goal.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Living Meals Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 
              className="text-3xl md:text-4xl font-semibold mb-12 text-center text-white"
            >
              Living Menu Collection
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredMeals.map((meal, index) => (
                <motion.div
                  key={`all-${meal.id}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: 0.6 + index * 0.1,
                    ease: "easeOut"
                  }}
                  whileHover={{ 
                    scale: 1.02,
                    transition: { duration: 0.2 }
                  }}
                >
                  <LivingFoodCard meal={meal} onAddToCart={handleAddToCart} />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Floating Particles Background */}
          <div className="fixed inset-0 pointer-events-none overflow-hidden">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full opacity-20"
                style={{ 
                  background: currentTheme.primary,
                  boxShadow: `0 0 10px ${currentTheme.primary}`
                }}
                initial={{
                  x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                  y: (typeof window !== 'undefined' ? window.innerHeight : 1000) + 50,
                }}
                animate={{
                  y: -50,
                  x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                }}
                transition={{
                  duration: Math.random() * 10 + 15,
                  repeat: Infinity,
                  ease: "linear",
                  delay: Math.random() * 5,
                }}
              />
            ))}
          </div>

          {/* Interactive CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.5 }}
            className="text-center py-20"
          >
            <motion.button
              className="px-12 py-6 rounded-2xl font-semibold text-xl relative overflow-hidden text-white"
              style={{
                background: `linear-gradient(135deg, ${currentTheme.primary}, ${currentTheme.secondary})`,
                boxShadow: `0 10px 30px ${currentTheme.primary}40`
              }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: `0 15px 40px ${currentTheme.primary}60`
              }}
              whileTap={{ scale: 0.95 }}
              animate={{
                boxShadow: [
                  `0 10px 30px ${currentTheme.primary}40`,
                  `0 15px 40px ${currentTheme.primary}60`,
                  `0 10px 30px ${currentTheme.primary}40`
                ]
              }}
              transition={{
                boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" }
              }}
              onClick={() => navigate('/plans')}
            >
              <motion.span
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{
                  background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)`,
                  backgroundSize: '200% 100%',
                  position: 'absolute',
                  inset: 0,
                  pointerEvents: 'none'
                }}
              />
              Start Your Living Food Journey
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};