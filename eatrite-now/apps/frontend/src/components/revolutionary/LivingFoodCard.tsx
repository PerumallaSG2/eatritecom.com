/**
 * Living Food Card - Revolutionary Component That Breathes
 * Food cards that pulse, adapt colors based on health goals, and show living ingredients
 */

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface LivingFoodCardProps {
  meal: {
    id: string
    name: string
    image: string
    calories: number
    protein: number
    carbs: number
    fats: number
    fiber: number
    price: number
    ingredients: string[]
    healthBenefit: 'energy' | 'wellness' | 'performance' | 'balance'
  }
  userHealthGoal?: 'energy' | 'wellness' | 'performance' | 'balance'
  onAddToCart: (meal: any) => void
}

const LivingFoodCard = ({
  meal,
  userHealthGoal = 'wellness',
  onAddToCart,
}: LivingFoodCardProps) => {
  const [isHovered, setIsHovered] = useState(false)
  const [ingredientsFloating, setIngredientsFloating] = useState(false)

  // Adaptive colors based on health goal
  const getThemeColors = (goal: string) => {
    const themes = {
      energy: { primary: '#FF6B35', bg: '#FFF8F0', accent: '#FFD23F' },
      wellness: { primary: '#00C896', bg: '#F0FFF4', accent: '#40E0D0' },
      performance: { primary: '#6C5CE7', bg: '#F8F7FF', accent: '#00CEC9' },
      balance: { primary: '#FF7675', bg: '#FFEAA7', accent: '#74B9FF' },
    }
    return themes[goal as keyof typeof themes] || themes.wellness
  }

  const theme = getThemeColors(userHealthGoal)
  const isGoalMatch = meal.healthBenefit === userHealthGoal

  return (
    <motion.div
      className="relative group cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.03, rotate: 1 }}
      onHoverStart={() => {
        setIsHovered(true)
        setIngredientsFloating(true)
      }}
      onHoverEnd={() => {
        setIsHovered(false)
        setIngredientsFloating(false)
      }}
      style={{
        background: `linear-gradient(135deg, ${theme.bg} 0%, #FFFFFF 100%)`,
        borderRadius: '20px',
        overflow: 'hidden',
        boxShadow: isGoalMatch
          ? `0 10px 40px ${theme.primary}20, 0 0 0 2px ${theme.primary}40`
          : '0 4px 25px rgba(0,0,0,0.08)',
      }}
    >
      {/* Pulsing Effect for Goal Match */}
      {isGoalMatch && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${theme.primary}10 0%, transparent 70%)`,
            animation: 'foodPulse 3s ease-in-out infinite',
          }}
        />
      )}

      {/* Goal Match Badge */}
      {isGoalMatch && (
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          className="absolute top-3 right-3 z-20"
          style={{
            background: `linear-gradient(135deg, ${theme.primary}, ${theme.accent})`,
            borderRadius: '12px',
            padding: '4px 8px',
            color: '#FFFFFF',
            fontSize: '0.75rem',
            fontWeight: '600',
            boxShadow: `0 4px 15px ${theme.primary}40`,
          }}
        >
          Perfect Match! ✨
        </motion.div>
      )}

      {/* Floating Ingredients */}
      <AnimatePresence>
        {ingredientsFloating && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {meal.ingredients.slice(0, 6).map((ingredient, index) => (
              <motion.div
                key={ingredient}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                  x: [0, Math.random() * 200 - 100],
                  y: [0, Math.random() * 150 - 75],
                  rotate: [0, 360],
                }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{
                  duration: 2,
                  delay: index * 0.2,
                  repeat: Infinity,
                  repeatDelay: 1,
                }}
                className="absolute top-1/2 left-1/2 text-xs font-medium px-2 py-1 rounded-full"
                style={{
                  background: `${theme.accent}80`,
                  color: '#FFFFFF',
                  backdropFilter: 'blur(4px)',
                }}
              >
                {ingredient}
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Food Image with Living Effect */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={meal.image}
          alt={meal.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          style={{
            filter: isHovered ? 'saturate(1.2) brightness(1.1)' : 'saturate(1)',
          }}
        />

        {/* Nutrition Overlay */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute inset-0 flex items-end"
              style={{
                background:
                  'linear-gradient(transparent 0%, rgba(0,0,0,0.7) 100%)',
              }}
            >
              <div className="p-4 w-full">
                <div className="grid grid-cols-4 gap-2 text-white text-xs">
                  <div className="text-center">
                    <div
                      className="w-6 h-6 mx-auto mb-1 rounded-full"
                      style={{ background: '#E17055' }}
                    ></div>
                    <div>{meal.protein}g</div>
                    <div className="opacity-75">Protein</div>
                  </div>
                  <div className="text-center">
                    <div
                      className="w-6 h-6 mx-auto mb-1 rounded-full"
                      style={{ background: '#FDCB6E' }}
                    ></div>
                    <div>{meal.carbs}g</div>
                    <div className="opacity-75">Carbs</div>
                  </div>
                  <div className="text-center">
                    <div
                      className="w-6 h-6 mx-auto mb-1 rounded-full"
                      style={{ background: '#6C5CE7' }}
                    ></div>
                    <div>{meal.fats}g</div>
                    <div className="opacity-75">Fats</div>
                  </div>
                  <div className="text-center">
                    <div
                      className="w-6 h-6 mx-auto mb-1 rounded-full"
                      style={{ background: '#00B894' }}
                    ></div>
                    <div>{meal.fiber}g</div>
                    <div className="opacity-75">Fiber</div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="font-semibold text-lg mb-2 text-gray-800 group-hover:text-gray-900 transition-colors">
          {meal.name}
        </h3>

        {/* Dynamic Health Benefit */}
        <div
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium mb-4"
          style={{
            background: `${theme.primary}15`,
            color: theme.primary,
          }}
        >
          {meal.healthBenefit === 'energy' && '⚡ Energy Boost'}
          {meal.healthBenefit === 'wellness' && '🌱 Wellness'}
          {meal.healthBenefit === 'performance' && '💪 Performance'}
          {meal.healthBenefit === 'balance' && '⚖️ Balance'}
        </div>

        {/* Flowing Nutrition Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Nutrition Score</span>
            <span className="font-medium">
              {Math.round((meal.protein + meal.fiber) * 2)}%
            </span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{
                width: `${Math.round((meal.protein + meal.fiber) * 2)}%`,
              }}
              transition={{ duration: 1, delay: 0.5 }}
              className="h-full rounded-full"
              style={{
                background: `linear-gradient(90deg, ${theme.primary}, ${theme.accent})`,
                backgroundSize: '200% 100%',
                animation: 'nutritionFlow 2s ease-in-out infinite',
              }}
            />
          </div>
        </div>

        {/* Price and Action */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-gray-800">
              ${meal.price}
            </span>
            <span className="text-sm text-gray-500 ml-1">per meal</span>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onAddToCart(meal)}
            className="px-6 py-2 rounded-full font-medium text-white transition-all duration-300"
            style={{
              background: `linear-gradient(135deg, ${theme.primary}, ${theme.accent})`,
              boxShadow: `0 4px 15px ${theme.primary}30`,
            }}
          >
            Add to Cart
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

export default LivingFoodCard
