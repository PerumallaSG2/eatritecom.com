import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Filter } from 'lucide-react'
import { useCart } from '../context/CartContext'
import LivingFoodCard from '../components/revolutionary/LivingFoodCard'
import RevolutionaryNavbar from '../components/revolutionary/RevolutionaryNavbar'
import livingFoodTokens from '../styles/design-system/living-food-tokens'

const RevolutionaryMenuPage: React.FC = () => {
  const { addToCart } = useCart()
  const [selectedGoal, setSelectedGoal] = useState<
    'energy' | 'wellness' | 'performance' | 'balance'
  >('energy')
  const [selectedCategory, setSelectedCategory] = useState<
    'all' | 'breakfast' | 'lunch' | 'dinner' | 'snacks'
  >('all')

  // Get current theme colors
  const currentTheme = livingFoodTokens.colors.adaptive[selectedGoal]

  // Enhanced meal data for revolutionary interface
  const revolutionaryMeals = [
    {
      id: 'power-bowl-supreme',
      name: 'Power Bowl Supreme',
      image: '/placeholder-meal-1.jpg',
      price: 16.99,
      calories: 450,
      protein: 35,
      carbs: 38,
      fats: 18,
      fiber: 12,
      ingredients: [
        'Quinoa',
        'Grilled Chicken',
        'Avocado',
        'Supergreens',
        'Hemp Seeds',
      ],
      healthBenefit: 'energy' as const,
      category: 'lunch',
    },
    {
      id: 'zen-garden-salad',
      name: 'Zen Garden Salad',
      image: '/placeholder-meal-2.jpg',
      price: 14.99,
      calories: 320,
      protein: 18,
      carbs: 25,
      fats: 12,
      fiber: 15,
      ingredients: ['Mixed Greens', 'Edamame', 'Cucumber', 'Ginger', 'Sesame'],
      healthBenefit: 'wellness' as const,
      category: 'lunch',
    },
    {
      id: 'athletes-fuel',
      name: "Athlete's Fuel",
      image: '/placeholder-meal-3.jpg',
      price: 19.99,
      calories: 580,
      protein: 42,
      carbs: 48,
      fats: 22,
      fiber: 8,
      ingredients: [
        'Lean Beef',
        'Sweet Potato',
        'Performance Greens',
        'Spirulina',
      ],
      healthBenefit: 'performance' as const,
      category: 'dinner',
    },
    {
      id: 'harmony-plate',
      name: 'Harmony Plate',
      image: '/placeholder-meal-4.jpg',
      price: 18.99,
      calories: 420,
      protein: 28,
      carbs: 35,
      fats: 16,
      fiber: 10,
      ingredients: [
        'Wild Salmon',
        'Brown Rice',
        'Seasonal Vegetables',
        'Herbs',
      ],
      healthBenefit: 'balance' as const,
      category: 'dinner',
    },
    {
      id: 'morning-warrior',
      name: 'Morning Warrior',
      image: '/placeholder-meal-5.jpg',
      price: 12.99,
      calories: 380,
      protein: 25,
      carbs: 42,
      fats: 14,
      fiber: 8,
      ingredients: ['Oats', 'Greek Yogurt', 'Berries', 'Nuts', 'Honey'],
      healthBenefit: 'energy' as const,
      category: 'breakfast',
    },
    {
      id: 'peaceful-morning',
      name: 'Peaceful Morning',
      image: '/placeholder-meal-6.jpg',
      price: 11.99,
      calories: 290,
      protein: 15,
      carbs: 35,
      fats: 10,
      fiber: 12,
      ingredients: [
        'Chia Seeds',
        'Almond Milk',
        'Fruits',
        'Coconut',
        'Vanilla',
      ],
      healthBenefit: 'wellness' as const,
      category: 'breakfast',
    },
    {
      id: 'power-snack',
      name: 'Power Snack',
      image: '/placeholder-meal-7.jpg',
      price: 8.99,
      calories: 220,
      protein: 18,
      carbs: 15,
      fats: 12,
      fiber: 6,
      ingredients: ['Protein Bar', 'Nuts', 'Seeds', 'Dark Chocolate'],
      healthBenefit: 'performance' as const,
      category: 'snacks',
    },
    {
      id: 'mindful-bites',
      name: 'Mindful Bites',
      image: '/placeholder-meal-8.jpg',
      price: 7.99,
      calories: 180,
      protein: 8,
      carbs: 22,
      fats: 8,
      fiber: 9,
      ingredients: ['Hummus', 'Vegetables', 'Herbs', 'Crackers'],
      healthBenefit: 'balance' as const,
      category: 'snacks',
    },
  ]

  // Filter meals based on selected goal and category
  const filteredMeals = revolutionaryMeals.filter(meal => {
    const goalMatch =
      selectedGoal === 'energy' ? true : meal.healthBenefit === selectedGoal
    const categoryMatch =
      selectedCategory === 'all' || meal.category === selectedCategory
    return goalMatch && categoryMatch
  })

  const handleAddToCart = (mealId: string) => {
    const meal = revolutionaryMeals.find(m => m.id === mealId)
    if (meal) {
      addToCart({
        id: meal.id,
        name: meal.name,
        description: meal.ingredients.join(', '),
        calories: meal.calories,
        protein: meal.protein,
        price: meal.price,
        image_url: meal.image,
      })
    }
  }

  const categories = [
    { id: 'all', name: 'All', icon: '🍽️' },
    { id: 'breakfast', name: 'Breakfast', icon: '🌅' },
    { id: 'lunch', name: 'Lunch', icon: '☀️' },
    { id: 'dinner', name: 'Dinner', icon: '🌙' },
    { id: 'snacks', name: 'Snacks', icon: '⚡' },
  ]

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
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full opacity-20"
              style={{
                background: currentTheme.primary,
                boxShadow: `0 0 8px ${currentTheme.primary}`,
              }}
              initial={{
                x:
                  Math.random() *
                  (typeof window !== 'undefined' ? window.innerWidth : 1000),
                y: Math.random() * 400,
              }}
              animate={{
                y: [0, -20, 0],
                x: [0, Math.random() * 100 - 50, 0],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: Math.random() * 8 + 6,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: Math.random() * 3,
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
              Living Menu
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Each dish pulses with life energy, adapting to your wellness
              journey
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

            {/* Category Filter */}
            <motion.div
              className="flex justify-center flex-wrap gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              {categories.map(category => (
                <motion.button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id as any)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2 ${
                    selectedCategory === category.id
                      ? 'text-white'
                      : 'text-white/60 hover:text-white/80'
                  }`}
                  style={{
                    background:
                      selectedCategory === category.id
                        ? `${currentTheme.secondary}40`
                        : 'rgba(255,255,255,0.1)',
                    border: `1px solid ${selectedCategory === category.id ? currentTheme.secondary : 'rgba(255,255,255,0.2)'}`,
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>{category.icon}</span>
                  <span>{category.name}</span>
                </motion.button>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Living Menu Grid */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            {filteredMeals.map((meal, index) => (
              <motion.div
                key={meal.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 1.2 + index * 0.1,
                  ease: 'easeOut',
                }}
              >
                <LivingFoodCard meal={meal} onAddToCart={handleAddToCart} />
              </motion.div>
            ))}
          </motion.div>

          {filteredMeals.length === 0 && (
            <motion.div
              className="text-center py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.5 }}
            >
              <div
                className="text-6xl mb-4"
                style={{
                  filter: `drop-shadow(0 0 10px ${currentTheme.primary})`,
                }}
              >
                🔍
              </div>
              <h3 className="text-2xl font-semibold text-white mb-2">
                No meals found
              </h3>
              <p className="text-white/60">
                Try adjusting your filters to discover more living meals
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Floating Action Button */}
      <motion.div
        className="fixed bottom-8 right-8 z-50"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 2 }}
      >
        <motion.button
          className="w-16 h-16 rounded-full text-white font-bold text-xl shadow-2xl"
          style={{
            background: `linear-gradient(135deg, ${currentTheme.primary}, ${currentTheme.secondary})`,
            boxShadow: `0 8px 25px ${currentTheme.primary}60`,
          }}
          whileHover={{
            scale: 1.1,
            boxShadow: `0 12px 35px ${currentTheme.primary}80`,
          }}
          whileTap={{ scale: 0.9 }}
          animate={{
            boxShadow: [
              `0 8px 25px ${currentTheme.primary}60`,
              `0 12px 35px ${currentTheme.primary}80`,
              `0 8px 25px ${currentTheme.primary}60`,
            ],
          }}
          transition={{
            boxShadow: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
          }}
        >
          <Filter size={24} />
        </motion.button>
      </motion.div>
    </div>
  )
}

export default RevolutionaryMenuPage
