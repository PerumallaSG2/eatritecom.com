import React, { useState } from 'react'

// TypeScript Interfaces
interface MenuItem {
  id: number
  name: string
  description: string
  category: string
  cuisine: string
  calories: number
  protein: number
  carbs: number
  fat: number
  fiber: number
  prepTime: number
  price: number
  rating: number
  reviews: number
  image: string
  badges: string[]
  difficulty: string
  allergens: string[]
  ingredients: string[]
}

interface FilterOption {
  key: string
  label: string
  count?: number
}

// Premium Menu Page with EatRite Design System
const PremiumMenuPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  // Premium Components
  const PremiumCard: React.FC<{
    children: React.ReactNode
    className?: string
    hover?: boolean
  }> = ({ children, className = '', hover = false }) => {
    return (
      <div
        className={`
          bg-white rounded-2xl shadow-sm border border-[#F9FAFB]
          ${hover ? 'hover:shadow-lg transition-all duration-200 cursor-pointer' : ''}
          ${className}
        `}
      >
        {children}
      </div>
    )
  }

  const PremiumButton: React.FC<{
    children: React.ReactNode
    variant?: 'primary' | 'secondary' | 'outline'
    size?: 'sm' | 'md' | 'lg'
    className?: string
    onClick?: () => void
  }> = ({
    children,
    variant = 'primary',
    size = 'md',
    className = '',
    onClick,
  }) => {
    const baseClass =
      'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2'

    const variants = {
      primary:
        'bg-[#0B4F3C] text-white hover:bg-[#083d2f] shadow-sm hover:shadow-md focus:ring-[#0B4F3C]',
      secondary:
        'bg-[#34D399] text-white hover:bg-[#10B981] shadow-sm hover:shadow-md focus:ring-[#34D399]',
      outline:
        'border border-[#D1D5DB] bg-white text-[#4B5563] hover:bg-[#F9FAFB] hover:border-[#6B7280] focus:ring-[#D1D5DB]',
    }

    const sizes = {
      sm: 'px-4 py-2 text-sm rounded-full',
      md: 'px-6 py-3 text-base rounded-xl',
      lg: 'px-8 py-4 text-lg rounded-xl',
    }

    return (
      <button
        className={`${baseClass} ${variants[variant]} ${sizes[size]} ${className}`}
        onClick={onClick}
      >
        {children}
      </button>
    )
  }

  // Mock meal data with premium photography aesthetic
  const meals: MenuItem[] = [
    {
      id: 1,
      name: 'Mediterranean Power Bowl',
      description:
        'Quinoa, grilled chicken breast, roasted vegetables, tahini dressing, fresh herbs',
      category: 'bowls',
      cuisine: 'Mediterranean',
      calories: 420,
      protein: 28,
      carbs: 42,
      fat: 18,
      fiber: 8,
      prepTime: 15,
      price: 16.99,
      rating: 4.8,
      reviews: 342,
      image: '🥗',
      badges: ['High Protein', 'Gluten Free', 'Popular'],
      difficulty: 'Easy',
      allergens: ['None'],
      ingredients: [
        'Quinoa',
        'Chicken Breast',
        'Bell Peppers',
        'Cucumber',
        'Cherry Tomatoes',
        'Red Onion',
        'Tahini',
        'Lemon',
        'Herbs',
      ],
    },
    {
      id: 2,
      name: 'Wild Caught Salmon',
      description:
        'Pan-seared Atlantic salmon, roasted asparagus, sweet potato, lemon herb butter',
      category: 'mains',
      cuisine: 'American',
      calories: 380,
      protein: 35,
      carbs: 28,
      fat: 16,
      fiber: 6,
      prepTime: 12,
      price: 19.99,
      rating: 4.9,
      reviews: 567,
      image: '🐟',
      badges: ['Omega-3 Rich', 'Keto Friendly', 'Chef Choice'],
      difficulty: 'Medium',
      allergens: ['Fish'],
      ingredients: [
        'Salmon Fillet',
        'Asparagus',
        'Sweet Potato',
        'Butter',
        'Lemon',
        'Herbs',
        'Garlic',
      ],
    },
    {
      id: 3,
      name: 'Plant-Based Buddha Bowl',
      description:
        'Marinated tofu, roasted vegetables, quinoa, avocado, hemp seeds, green goddess dressing',
      category: 'bowls',
      cuisine: 'Asian',
      calories: 450,
      protein: 24,
      carbs: 52,
      fat: 22,
      fiber: 12,
      prepTime: 18,
      price: 15.99,
      rating: 4.7,
      reviews: 289,
      image: '🥙',
      badges: ['Vegan', 'Fiber Rich', 'Sustainable'],
      difficulty: 'Easy',
      allergens: ['Soy'],
      ingredients: [
        'Tofu',
        'Quinoa',
        'Avocado',
        'Broccoli',
        'Carrots',
        'Hemp Seeds',
        'Tahini',
        'Nutritional Yeast',
      ],
    },
    {
      id: 4,
      name: 'Grass-Fed Beef & Vegetables',
      description:
        'Lean grass-fed beef, roasted root vegetables, chimichurri sauce, microgreens',
      category: 'mains',
      cuisine: 'South American',
      calories: 490,
      protein: 42,
      carbs: 24,
      fat: 26,
      fiber: 7,
      prepTime: 20,
      price: 22.99,
      rating: 4.9,
      reviews: 198,
      image: '🥩',
      badges: ['High Protein', 'Grass-Fed', 'Premium'],
      difficulty: 'Medium',
      allergens: ['None'],
      ingredients: [
        'Grass-Fed Beef',
        'Sweet Potato',
        'Carrots',
        'Parsley',
        'Cilantro',
        'Garlic',
        'Olive Oil',
      ],
    },
    {
      id: 5,
      name: 'Coconut Curry Chicken',
      description:
        'Free-range chicken, coconut curry sauce, jasmine rice, fresh vegetables, cilantro',
      category: 'mains',
      cuisine: 'Thai',
      calories: 435,
      protein: 32,
      carbs: 38,
      fat: 20,
      fiber: 5,
      prepTime: 16,
      price: 17.99,
      rating: 4.8,
      reviews: 423,
      image: '🍛',
      badges: ['Comfort Food', 'Dairy Free', 'Spicy'],
      difficulty: 'Easy',
      allergens: ['Coconut'],
      ingredients: [
        'Chicken Thigh',
        'Coconut Milk',
        'Jasmine Rice',
        'Bell Peppers',
        'Onions',
        'Curry Paste',
        'Cilantro',
      ],
    },
    {
      id: 6,
      name: 'Superfood Smoothie Bowl',
      description:
        'Acai base, fresh berries, granola, chia seeds, almond butter, coconut flakes',
      category: 'breakfast',
      cuisine: 'American',
      calories: 320,
      protein: 18,
      carbs: 42,
      fat: 14,
      fiber: 11,
      prepTime: 8,
      price: 12.99,
      rating: 4.6,
      reviews: 156,
      image: '🍓',
      badges: ['Antioxidant Rich', 'Gluten Free', 'Energy Boost'],
      difficulty: 'Easy',
      allergens: ['Tree Nuts'],
      ingredients: [
        'Acai',
        'Blueberries',
        'Strawberries',
        'Granola',
        'Chia Seeds',
        'Almond Butter',
        'Coconut',
      ],
    },
  ]

  const filters: FilterOption[] = [
    { key: 'all', label: 'All Meals', count: meals.length },
    {
      key: 'bowls',
      label: 'Bowls',
      count: meals.filter(m => m.category === 'bowls').length,
    },
    {
      key: 'mains',
      label: 'Mains',
      count: meals.filter(m => m.category === 'mains').length,
    },
    {
      key: 'breakfast',
      label: 'Breakfast',
      count: meals.filter(m => m.category === 'breakfast').length,
    },
  ]

  const filteredMeals =
    activeFilter === 'all'
      ? meals
      : meals.filter(meal => meal.category === activeFilter)

  const MealCard: React.FC<{ meal: (typeof meals)[0] }> = ({ meal }) => (
    <PremiumCard hover={true} className="overflow-hidden p-0 group">
      {/* Premium Meal Image */}
      <div className="relative h-64 bg-gradient-to-br from-[#F9FAFB] via-[#34D399]/5 to-[#0B4F3C]/5 flex items-center justify-center overflow-hidden">
        <div className="text-8xl group-hover:scale-110 transition-transform duration-300">
          {meal.image}
        </div>

        {/* Overlay badges */}
        <div className="absolute top-4 left-4">
          {meal.badges.slice(0, 1).map(badge => (
            <span
              key={badge}
              className="bg-white/90 backdrop-blur-sm text-[#0B4F3C] text-xs font-medium px-3 py-1 rounded-full shadow-sm"
            >
              {badge}
            </span>
          ))}
        </div>

        {/* Rating */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center space-x-1">
          <span className="text-[#D4A857] text-sm">⭐</span>
          <span className="text-[#111827] font-medium text-sm">
            {meal.rating}
          </span>
        </div>
      </div>

      <div className="p-6">
        {/* Header */}
        <div className="mb-3">
          <h3 className="text-xl font-bold text-[#111827] mb-2 leading-tight">
            {meal.name}
          </h3>
          <p className="text-[#6B7280] text-sm leading-relaxed line-clamp-2">
            {meal.description}
          </p>
        </div>

        {/* Nutrition Stats */}
        <div className="grid grid-cols-4 gap-3 mb-4 p-3 bg-[#F9FAFB] rounded-xl">
          <div className="text-center">
            <p className="text-sm font-bold text-[#111827]">{meal.calories}</p>
            <p className="text-xs text-[#6B7280]">calories</p>
          </div>
          <div className="text-center">
            <p className="text-sm font-bold text-[#0B4F3C]">{meal.protein}g</p>
            <p className="text-xs text-[#6B7280]">protein</p>
          </div>
          <div className="text-center">
            <p className="text-sm font-bold text-[#34D399]">{meal.carbs}g</p>
            <p className="text-xs text-[#6B7280]">carbs</p>
          </div>
          <div className="text-center">
            <p className="text-sm font-bold text-[#D4A857]">{meal.fiber}g</p>
            <p className="text-xs text-[#6B7280]">fiber</p>
          </div>
        </div>

        {/* Meta Info */}
        <div className="flex items-center justify-between text-sm text-[#6B7280] mb-4">
          <span className="flex items-center">
            <span className="text-[#34D399] mr-1">⏱️</span>
            {meal.prepTime} min
          </span>
          <span className="flex items-center">
            <span className="text-[#0B4F3C] mr-1">👨‍🍳</span>
            {meal.difficulty}
          </span>
          <span className="flex items-center">
            <span className="text-[#D4A857] mr-1">🍽️</span>
            {meal.cuisine}
          </span>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-2 mb-4">
          {meal.badges.slice(1).map(badge => (
            <span
              key={badge}
              className="text-xs bg-[#34D399]/10 text-[#0B4F3C] px-2 py-1 rounded-full font-medium"
            >
              {badge}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold text-[#111827]">${meal.price}</p>
            <p className="text-xs text-[#6B7280]">{meal.reviews} reviews</p>
          </div>
          <div className="flex space-x-2">
            <PremiumButton variant="outline" size="sm">
              Details
            </PremiumButton>
            <PremiumButton variant="primary" size="sm">
              Add to Plan
            </PremiumButton>
          </div>
        </div>
      </div>
    </PremiumCard>
  )

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      {/* Premium Navigation */}
      <nav className="bg-white border-b border-[#F9FAFB] px-6 py-4 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#0B4F3C] to-[#34D399] rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">E</span>
              </div>
              <h1 className="text-xl font-bold text-[#111827]">EatRite</h1>
            </div>

            <div className="hidden md:flex space-x-6">
              {['Dashboard', 'Meals', 'Plans', 'Progress', 'Corporate'].map(
                item => (
                  <button
                    key={item}
                    className={`text-sm font-medium transition-colors ${
                      item === 'Meals'
                        ? 'text-[#0B4F3C]'
                        : 'text-[#6B7280] hover:text-[#4B5563]'
                    }`}
                  >
                    {item}
                  </button>
                )
              )}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search meals..."
                className="w-64 pl-10 pr-4 py-2 border border-[#D1D5DB] rounded-xl 
                         focus:ring-2 focus:ring-[#0B4F3C] focus:border-transparent
                         text-[#111827] placeholder-[#6B7280] bg-white"
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#6B7280]">
                🔍
              </div>
            </div>
            <div className="w-10 h-10 bg-gradient-to-br from-[#34D399] to-[#10B981] rounded-full flex items-center justify-center">
              <span className="text-white font-medium text-sm">S</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[#111827] mb-3">
            Premium Wellness Meals
          </h1>
          <p className="text-lg text-[#6B7280] max-w-2xl">
            Nutritionist-designed meals crafted with premium ingredients. Each
            dish is optimized for taste, health, and your wellness goals.
          </p>
        </div>

        {/* Filter Bar */}
        <PremiumCard className="p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="flex flex-wrap gap-2">
              {filters.map(filter => (
                <button
                  key={filter.key}
                  onClick={() => setActiveFilter(filter.key)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    activeFilter === filter.key
                      ? 'bg-[#0B4F3C] text-white shadow-sm'
                      : 'bg-[#F9FAFB] text-[#6B7280] hover:bg-[#0B4F3C]/10 hover:text-[#0B4F3C]'
                  }`}
                >
                  {filter.label}
                  <span
                    className={`ml-2 ${
                      activeFilter === filter.key
                        ? 'text-white/80'
                        : 'text-[#6B7280]'
                    }`}
                  >
                    ({filter.count})
                  </span>
                </button>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-[#6B7280]">Sort by:</span>
                <select className="border border-[#D1D5DB] rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#0B4F3C] focus:border-transparent">
                  <option>Most Popular</option>
                  <option>Highest Rated</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Prep Time</option>
                </select>
              </div>

              <div className="flex border border-[#D1D5DB] rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 text-sm ${
                    viewMode === 'grid'
                      ? 'bg-[#0B4F3C] text-white'
                      : 'bg-white text-[#6B7280] hover:bg-[#F9FAFB]'
                  }`}
                >
                  ⊞ Grid
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 text-sm ${
                    viewMode === 'list'
                      ? 'bg-[#0B4F3C] text-white'
                      : 'bg-white text-[#6B7280] hover:bg-[#F9FAFB]'
                  }`}
                >
                  ☰ List
                </button>
              </div>
            </div>
          </div>
        </PremiumCard>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-[#6B7280]">
            Showing{' '}
            <span className="font-medium text-[#111827]">
              {filteredMeals.length}
            </span>{' '}
            meals
          </p>
          <div className="flex items-center space-x-4 text-sm text-[#6B7280]">
            <span className="flex items-center">
              <span className="w-3 h-3 bg-[#34D399] rounded-full mr-2"></span>
              Vegetarian Options
            </span>
            <span className="flex items-center">
              <span className="w-3 h-3 bg-[#0B4F3C] rounded-full mr-2"></span>
              High Protein
            </span>
            <span className="flex items-center">
              <span className="w-3 h-3 bg-[#D4A857] rounded-full mr-2"></span>
              Premium Ingredients
            </span>
          </div>
        </div>

        {/* Meals Grid */}
        <div
          className={`grid gap-8 ${
            viewMode === 'grid'
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
              : 'grid-cols-1'
          }`}
        >
          {filteredMeals.map(meal => (
            <MealCard key={meal.id} meal={meal} />
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <PremiumButton variant="outline" size="lg">
            Load More Meals
          </PremiumButton>
        </div>
      </div>
    </div>
  )
}

export default PremiumMenuPage
