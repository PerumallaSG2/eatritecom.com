import { useState, useEffect } from 'react'
import { Plus, ChevronDown, Minus } from 'lucide-react'
import { useCart } from '../context/CartContext'
import MealFilters from '../components/MealFilters'
import { 
  AnimatedMenuLoader, 
  PageTransition 
} from '../components/AnimatedComponents'
import { 
  FadeIn, 
  SlideIn, 
  StaggeredList
} from '../components/LoadingStates'
import { useAsyncError, ErrorType } from '../hooks/useErrorHandler'
import { PullToRefresh } from '../components/GestureComponents'
import { useIsMobile } from '../context/MobileNavigationContext'

interface Meal {
  id: number
  name: string
  description: string
  price: number
  image_url: string
  tags: string[]
  calories?: number
  protein?: number
  isNew?: boolean
  isPopular?: boolean
  isPremium?: boolean
  isTopRated?: boolean
}

const generateMeals = (): Meal[] => {
  const mealData = [
    {
      name: 'Roasted Garlic Chicken',
      description: 'with Gravy, Chive-Yukon Mash & Green Beans',
      price: 15.99,
      isPremium: true,
      imageUrl: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      tags: ['gluten-free', 'high-protein'],
      calories: 520,
      protein: 45,
    },
    {
      name: 'Smoky Gouda Chicken',
      description: 'with Potatoes & Parmesan Green Beans',
      price: 14.99,
      isTopRated: true,
      imageUrl: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      tags: ['high-protein'],
      calories: 480,
      protein: 42,
    },
    {
      name: 'Shredded Chicken Taco Bowl',
      description: 'with Corn Salsa & Cilantro Crema',
      price: 13.99,
      isNew: true,
      imageUrl: 'https://images.unsplash.com/photo-1565299585323-38174c5a702a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      tags: ['dairy-free', 'high-protein'],
      calories: 420,
      protein: 38,
    },
    {
      name: 'Herb-Crusted Salmon',
      description: 'with Lemon Butter & Roasted Asparagus',
      price: 17.99,
      isPremium: true,
      imageUrl: 'https://images.unsplash.com/photo-1485704686097-ed47f7263ca4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      tags: ['keto', 'gluten-free', 'high-protein'],
      calories: 380,
      protein: 35,
    },
    {
      name: 'BBQ Pork Ribs',
      description: 'with Sweet Potato Fries & Coleslaw',
      price: 16.99,
      imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      tags: ['dairy-free', 'high-protein'],
      calories: 650,
      protein: 50,
    },
    {
      name: 'Mediterranean Bowl',
      description: 'with Quinoa, Feta & Olive Tapenade',
      price: 12.99,
      isNew: true,
      imageUrl: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      tags: ['gluten-free', 'vegetarian'],
      calories: 350,
      protein: 15,
    },
    {
      name: 'Spicy Thai Curry',
      description: 'with Jasmine Rice & Fresh Herbs',
      price: 14.99,
      imageUrl: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      tags: ['dairy-free', 'vegan'],
      calories: 380,
      protein: 12,
    },
    {
      name: 'Beef Stir Fry',
      description: 'with Broccoli & Teriyaki Glaze',
      price: 15.99,
      isTopRated: true,
      imageUrl: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      tags: ['dairy-free', 'high-protein'],
      calories: 440,
      protein: 40,
    },
    {
      name: 'Turkey Meatballs',
      description: 'with Marinara & Zucchini Noodles',
      price: 13.99,
      imageUrl: 'https://images.unsplash.com/photo-1551782450-17144efb9c50?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      tags: ['paleo', 'gluten-free', 'high-protein'],
      calories: 320,
      protein: 35,
    },
    {
      name: 'Moroccan Chicken',
      description: 'with Couscous & Dried Fruits',
      price: 14.99,
      imageUrl: 'https://images.unsplash.com/photo-1574484284002-952d92456975?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      tags: ['dairy-free', 'high-protein'],
      calories: 450,
      protein: 38,
    },
    {
      name: 'Grilled Steak Fajitas',
      description: 'with Peppers & Guacamole',
      price: 18.99,
      isPremium: true,
      imageUrl: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      tags: ['keto', 'dairy-free', 'high-protein'],
      calories: 580,
      protein: 48,
    },
    {
      name: 'Lemon Herb Cod',
      description: 'with Wild Rice & Steamed Vegetables',
      price: 16.99,
      imageUrl: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      tags: ['gluten-free', 'high-protein'],
      calories: 360,
      protein: 32,
    },
  ]

  // Additional unique images for recipe variations beyond the base 12 meals
  const additionalImages = [
    'https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', // Grilled chicken variation
    'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', // Pancakes
    'https://images.unsplash.com/photo-1563379091339-03246963d96c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', // Beef bowl
    'https://images.unsplash.com/photo-1551024506-0bccd828d307?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', // Pasta
    'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', // Pizza
    'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', // Fresh salad
    'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', // Herb chicken variation
    'https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', // Food spread
    'https://images.unsplash.com/photo-1565976469981-95c51e2dee90?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', // Sandwich
    'https://images.unsplash.com/photo-1571091718767-18b5b1457add?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', // Gourmet burger
    'https://images.unsplash.com/photo-1558030006-450675393462?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', // Sushi
    'https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', // Soup
    'https://images.unsplash.com/photo-1529042410759-befb1204b468?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', // Grilled steak
    'https://images.unsplash.com/photo-1572441713132-51c75654db73?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', // Healthy bowl
    'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', // Avocado toast
    'https://images.unsplash.com/photo-1551183053-bf91a1d81141?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', // Salad bowl
    'https://images.unsplash.com/photo-1559181567-c3190ca9959b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', // Breakfast plate
    'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', // Healthy meal prep
    'https://images.unsplash.com/photo-1551218808-94e220e084d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', // Fish dish variation
  ]

  // Generate 101 meals by cycling through the base data with consistent images
  const meals: Meal[] = []
  for (let i = 1; i <= 101; i++) {
    const baseIndex = (i - 1) % mealData.length
    const baseMeal = mealData[baseIndex]
    
    // Each recipe always gets the same image - base meals use their specific imageUrl
    // Additional variations use additionalImages array consistently
    let imageUrl = baseMeal.imageUrl
    if (!imageUrl) {
      // For base meals without specific images, use additional images array
      imageUrl = additionalImages[baseIndex % additionalImages.length]
    }

    // Create clean price variations (e.g., $14.99, $15.49, etc.)
    const priceVariation = Math.floor(Math.random() * 5) * 0.5 - 1 // -1.0 to +1.5 in 0.5 increments
    const cleanPrice = Math.round((baseMeal.price + priceVariation) * 2) / 2 // Round to nearest 0.5

    meals.push({
      id: i,
      name: baseMeal.name,
      description: baseMeal.description,
      price: cleanPrice,
      image_url: imageUrl,
      tags: baseMeal.tags || ['healthy', 'chef-prepared'],
      calories: baseMeal.calories || 400 + Math.floor(Math.random() * 200),
      protein: baseMeal.protein || 25 + Math.floor(Math.random() * 15),
      isPremium: baseMeal.isPremium,
      isNew: baseMeal.isNew,
      isTopRated: baseMeal.isTopRated,
    })
  }

  return meals
}

const allMeals = generateMeals()
const mealsPerPage = 12

interface FilterState {
  search: string
  dietary: string[]
  priceRange: [number, number]
  sortBy: 'popular' | 'price' | 'rating' | 'name'
  calories: [number, number]
}

export default function MenuPage() {
  const [displayedMeals, setDisplayedMeals] = useState<Meal[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [isInitialLoading, setIsInitialLoading] = useState(true)
  const [hasMore, setHasMore] = useState(true)
  const [filteredMeals, setFilteredMeals] = useState<Meal[]>(allMeals)
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    dietary: [],
    priceRange: [10, 30],
    sortBy: 'popular',
    calories: [200, 800],
  })

  const { execute: executeAsync } = useAsyncError()

  // Apply filters whenever filters change
  useEffect(() => {
    const filtered = applyFilters(allMeals, filters)
    setFilteredMeals(filtered)
    setCurrentPage(1) // Reset pagination when filters change
    setDisplayedMeals(filtered.slice(0, 8))
    setHasMore(filtered.length > 8)
  }, [filters])

  const { addToCart, items, updateQuantity } = useCart()
  const isMobile = useIsMobile()

  // Filter and sort meals based on current filters
  const applyFilters = (meals: Meal[], filterState: FilterState) => {
    let filtered = [...meals]

    // Search filter - match name, description, or tags
    if (filterState.search) {
      const searchTerm = filterState.search.toLowerCase()
      filtered = filtered.filter(
        meal =>
          meal.name.toLowerCase().includes(searchTerm) ||
          meal.description.toLowerCase().includes(searchTerm) ||
          meal.tags.some(tag => tag.toLowerCase().includes(searchTerm))
      )
    }

    // Price range filter
    filtered = filtered.filter(
      meal =>
        meal.price >= filterState.priceRange[0] &&
        meal.price <= filterState.priceRange[1]
    )

    // Calories filter - only apply if meal has calories data
    filtered = filtered.filter(meal => {
      if (!meal.calories) return true // Include meals without calorie data
      return (
        meal.calories >= filterState.calories[0] &&
        meal.calories <= filterState.calories[1]
      )
    })

    // Dietary filters (simplified - would need meal tags to match dietary preferences)
    if (filterState.dietary.length > 0) {
      filtered = filtered.filter(meal =>
        filterState.dietary.some(dietary =>
          meal.tags.some(tag =>
            tag.toLowerCase().includes(dietary.toLowerCase())
          )
        )
      )
    }

    // Sort meals
    switch (filterState.sortBy) {
      case 'price':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name))
        break
      case 'rating':
        // Sort by rating - put top-rated first, then premium, then new
        filtered.sort((a, b) => {
          if (a.isTopRated && !b.isTopRated) return -1
          if (b.isTopRated && !a.isTopRated) return 1
          if (a.isPremium && !b.isPremium) return -1
          if (b.isPremium && !a.isPremium) return 1
          return 0
        })
        break
      case 'popular':
      default:
        // Sort by popular - new items first, then premium, then top-rated
        filtered.sort((a, b) => {
          if (a.isNew && !b.isNew) return -1
          if (b.isNew && !a.isNew) return 1
          if (a.isPremium && !b.isPremium) return -1
          if (b.isPremium && !a.isPremium) return 1
          return 0
        })
        break
    }

    return filtered
  }

  // Handle filter changes
  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters)
    const filtered = applyFilters(allMeals, newFilters)
    setFilteredMeals(filtered)

    // Reset pagination and display first page of filtered results
    const initialMeals = filtered.slice(0, mealsPerPage)
    setDisplayedMeals(initialMeals)
    setCurrentPage(1)
    setHasMore(filtered.length > mealsPerPage)
  }

  useEffect(() => {
    // Simulate loading for better UX
    setIsInitialLoading(true)
    setTimeout(() => {
      const initialMeals = allMeals.slice(0, mealsPerPage)
      setDisplayedMeals(initialMeals)
      setHasMore(allMeals.length > mealsPerPage)
      setIsInitialLoading(false)
    }, 1000) // 1 second loading simulation
  }, [])

  const loadMoreMeals = async () => {
    if (!hasMore) return

    await executeAsync(async () => {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800))

      // Simulate occasional errors in development
      if (import.meta.env.DEV && Math.random() < 0.15) {
        throw new Error('Network error: Failed to fetch more meals')
      }

      const nextPageStart = currentPage * mealsPerPage
      const nextPageEnd = nextPageStart + mealsPerPage
      const newMeals = filteredMeals.slice(nextPageStart, nextPageEnd)

      if (newMeals.length > 0) {
        setDisplayedMeals(prev => [...prev, ...newMeals])
        setCurrentPage(prev => prev + 1)
        
        // Check if we've loaded all meals
        if (nextPageEnd >= filteredMeals.length) {
          setHasMore(false)
        }
      }

      return newMeals
    }, ErrorType.NETWORK, {
      retryable: true,
      fallbackMessage: 'Failed to load more meals. Please try again.'
    })
  }

  // Refresh function for pull-to-refresh
  const handleRefresh = async () => {
    await executeAsync(async () => {
      // Simulate network delay for refresh
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Simulate occasional refresh errors in development
      if (import.meta.env.DEV && Math.random() < 0.1) {
        throw new Error('Network error: Failed to refresh meals')
      }

      // Reset to initial state
      setCurrentPage(1)
      setDisplayedMeals(filteredMeals.slice(0, mealsPerPage))
      setHasMore(filteredMeals.length > mealsPerPage)
    }, ErrorType.NETWORK, {
      retryable: false,
      fallbackMessage: 'Failed to refresh meals. Please try again.'
    })
  }

  const handleAddToCart = (meal: Meal) => {
    const cartItem = {
      id: meal.id.toString(),
      name: meal.name,
      description: meal.description,
      calories: meal.calories || 0,
      protein: meal.protein || 0,
      price: meal.price,
      image_url: meal.image_url,
    }

    addToCart(cartItem)
  }

  // Show loading animation on initial load
  if (isInitialLoading) {
    return <AnimatedMenuLoader itemCount={8} />
  }

  const MainContent = () => (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F2E8] to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 pb-24 md:pb-16">
        <div className="text-center mb-16">
          <FadeIn>
            <h1 className="text-5xl md:text-6xl font-bold text-[#0F2B1E] mb-4">
              Explore our Flexible Weekly Menu
            </h1>
          </FadeIn>
          <SlideIn direction="up" delay={200}>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-8">
              Choose from {allMeals.length} healthy, restaurant-quality meals
              each week
            </p>
          </SlideIn>
          <SlideIn direction="up" delay={400}>
            <div className="flex justify-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2 animate-fadeIn animate-stagger-1">
                <div className="w-4 h-4 bg-gradient-to-r from-[#D4B46A] to-[#B8935A] rounded-full"></div>
                <span>Premium</span>
              </div>
              <div className="flex items-center gap-2 animate-fadeIn animate-stagger-2">
                <div className="w-4 h-4 bg-[#FF6B35] rounded-full"></div>
                <span>New</span>
              </div>
              <div className="flex items-center gap-2 animate-fadeIn animate-stagger-3">
                <div className="w-4 h-4 bg-[#0F2B1E] rounded-full"></div>
                <span>Top-Rated</span>
              </div>
            </div>
          </SlideIn>
        </div>

        {/* Meal Filters */}
        <MealFilters onFilterChange={handleFilterChange} className="mb-8" />

        {/* Search Results Info */}
        {filters.search && (
          <div className="mb-6 p-4 bg-white rounded-lg border-l-4 border-[#D4B46A]">
            <p className="text-lg font-medium text-[#0F2B1E]">
              {filteredMeals.length > 0 
                ? `Found ${filteredMeals.length} meal${filteredMeals.length !== 1 ? 's' : ''} matching "${filters.search}"`
                : `No meals found matching "${filters.search}"`
              }
            </p>
            {filteredMeals.length === 0 && (
              <p className="text-sm text-gray-600 mt-1">
                Try searching for different ingredients, meal names, or dietary preferences.
              </p>
            )}
          </div>
        )}

        {/* No Results State */}
        {filteredMeals.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
              <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">No meals found</h3>
            <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
              Try adjusting your search terms or filters to find the perfect meal for you.
            </p>
            <button
              onClick={() => handleFilterChange({
                search: '',
                dietary: [],
                priceRange: [10, 30],
                sortBy: 'popular',
                calories: [200, 800],
              })}
              className="bg-[#0F2B1E] hover:bg-[#0A2418] text-white font-bold px-8 py-4 rounded-lg transition-colors duration-300"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <>
            <StaggeredList className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {displayedMeals.map(meal => (
            <div
              key={meal.id}
              className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
            >
              <div className="relative overflow-hidden">
                <img
                  src={meal.image_url}
                  alt={meal.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={e => {
                    // Fallback to professional food images if the original fails to load
                    const fallbackImages = [
                      'https://images.unsplash.com/photo-1532550907401-a500c9a57435?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
                      'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
                      'https://images.unsplash.com/photo-1571091718767-18b5b1457add?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
                      'https://images.unsplash.com/photo-1551024506-0bccd828d307?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
                      'https://images.unsplash.com/photo-1485704686097-ed47f7263ca4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
                    ]
                    const fallback =
                      fallbackImages[meal.id % fallbackImages.length]
                    ;(e.target as HTMLImageElement).src = fallback
                  }}
                />

                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {meal.isPremium && (
                    <span className="bg-gradient-to-r from-[#D4B46A] to-[#B8935A] text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Premium
                    </span>
                  )}
                  {meal.isNew && (
                    <span className="bg-[#FF6B35] text-white px-3 py-1 rounded-full text-sm font-semibold">
                      New
                    </span>
                  )}
                  {meal.isTopRated && (
                    <span className="bg-[#0F2B1E] text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Top-Rated
                    </span>
                  )}
                </div>

                <div className="absolute bottom-4 right-4">
                  <div className="bg-white/95 backdrop-blur-sm text-[#0F2B1E] px-4 py-2 rounded-full font-bold text-lg shadow-lg">
                    ${meal.price}
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-[#0F2B1E] mb-2">
                  {meal.name}
                </h3>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                  {meal.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {meal.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
                  <span>{meal.calories} cal</span>
                  <span>{meal.protein}g protein</span>
                </div>

                <div className="flex justify-between items-center mb-4">
                  <span className="text-2xl font-bold text-[#0F2B1E]">
                    ${meal.price.toFixed(2)}
                  </span>
                  {(() => {
                    const cartItem = items.find(
                      item => item.id === meal.id.toString()
                    )
                    const quantity = cartItem?.quantity || 0

                    return quantity > 0 ? (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            updateQuantity(
                              meal.id.toString(),
                              Math.max(0, quantity - 1)
                            )
                          }
                          className="w-8 h-8 rounded-full bg-red-100 text-red-600 hover:bg-red-200 flex items-center justify-center transition-colors"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-8 text-center font-bold text-[#0F2B1E]">
                          {quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(meal.id.toString(), quantity + 1)
                          }
                          className="w-8 h-8 rounded-full bg-green-100 text-green-600 hover:bg-green-200 flex items-center justify-center transition-colors"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleAddToCart(meal)}
                        className="bg-gradient-to-r from-[#0F2B1E] to-[#1a4d33] hover:from-[#1a4d33] hover:to-[#0F2B1E] text-white font-semibold py-2 px-4 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg flex items-center gap-2"
                      >
                        <Plus className="h-4 w-4" />
                        Add
                      </button>
                    )
                  })()}
                </div>
              </div>
            </div>
          ))}
        </StaggeredList>

        {hasMore && (
          <FadeIn>
            <div className="text-center mb-16">
              <button
                onClick={loadMoreMeals}
                className="bg-gradient-to-r from-[#0F2B1E] to-[#1a4d33] hover:from-[#1a4d33] hover:to-[#0F2B1E] text-white font-bold px-12 py-4 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg flex items-center gap-3 mx-auto"
              >
                <ChevronDown className="h-5 w-5" />
                Load More Meals ({allMeals.length - displayedMeals.length} remaining)
              </button>
            </div>
          </FadeIn>
        )}

        {!hasMore && (
          <div className="text-center mb-16">
            <div className="inline-block bg-gradient-to-r from-[#0F2B1E] to-[#1a4d33] text-white px-8 py-3 rounded-xl">
              🎉 You've seen all {allMeals.length} delicious meals!
            </div>
          </div>
        )}

          </>
        )}

        <SlideIn direction="up" delay={300}>
          <div className="mt-16 bg-gradient-to-r from-[#0F2B1E] to-[#1a4d33] rounded-2xl p-8 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-lg mb-6 opacity-90">
              Build your personalized meal plan with our fresh, chef-prepared
              meals
            </p>
            <button className="bg-[#D4B46A] hover:bg-[#B8935A] text-[#0F2B1E] font-bold px-8 py-3 rounded-xl transition-all duration-300 hover:scale-105 animate-press">
              Start Your Plan
            </button>
          </div>
        </SlideIn>
      </div>
    </div>
  )

  return (
    <PageTransition>
      {isMobile ? (
        <PullToRefresh onRefresh={handleRefresh}>
          <MainContent />
        </PullToRefresh>
      ) : (
        <MainContent />
      )}
    </PageTransition>
  )
}
