import { useEffect, useState } from 'react'
import { Star, Clock, Leaf } from 'lucide-react'
import { buildApiUrl } from '../config/api'

interface Meal {
  id: string
  name: string
  description: string
  short_description: string
  calories: number
  protein: number
  carbs: number
  fat: number
  price: number
  prep_time: number
  image_url: string
  is_popular: boolean
  allergens: string
  category_name: string
}

interface Category {
  id: string
  name: string
  description: string
}

const MenuPage = () => {
  const [meals, setMeals] = useState<Meal[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch meals and categories in parallel
        const [mealsResponse, categoriesResponse] = await Promise.all([
          fetch(buildApiUrl('/api/meals')),
          fetch(buildApiUrl('/api/categories'))
        ])

        if (mealsResponse.ok && categoriesResponse.ok) {
          const [mealsData, categoriesData] = await Promise.all([
            mealsResponse.json(),
            categoriesResponse.json()
          ])
          
          // Remove duplicate meals (by name for now)
          const uniqueMeals = mealsData.reduce((acc: Meal[], current: Meal) => {
            const existingMeal = acc.find(meal => meal.name === current.name)
            if (!existingMeal) {
              acc.push(current)
            }
            return acc
          }, [])
          
          setMeals(uniqueMeals)
          setCategories(categoriesData)
        }
      } catch (error) {
        console.error('Error fetching menu data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const filteredMeals = selectedCategory === 'all' 
    ? meals 
    : meals.filter(meal => meal.category_name === selectedCategory)

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Our Menu
          </h1>
          <p className="text-xl text-gray-600">
            Chef-prepared meals made with premium ingredients
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-12">
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-6 py-2 rounded-full font-medium transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-green-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-green-50'
              }`}
            >
              All Meals
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.name)}
                className={`px-6 py-2 rounded-full font-medium transition-colors ${
                  selectedCategory === category.name
                    ? 'bg-green-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-green-50'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Meals Grid */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="card overflow-hidden animate-pulse">
                <div className="aspect-video bg-gray-300"></div>
                <div className="p-6">
                  <div className="h-6 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded mb-4"></div>
                  <div className="flex justify-between mb-4">
                    <div className="h-4 bg-gray-300 rounded w-24"></div>
                    <div className="h-4 bg-gray-300 rounded w-16"></div>
                  </div>
                  <div className="h-10 bg-gray-300 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredMeals.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredMeals.map((meal) => (
              <div key={meal.id} className="card overflow-hidden group hover:shadow-xl transition-all duration-300">
                <div className="aspect-video bg-gradient-to-br from-green-100 to-orange-100 flex items-center justify-center relative overflow-hidden">
                  {meal.image_url ? (
                    <img 
                      src={meal.image_url} 
                      alt={meal.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      onError={(e) => {
                        e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzMzNzNkYyIvPgogIDx0ZXh0IHg9IjEwMCIgeT0iMTAwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iNDAiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+🍽️</text></svg>'
                      }}
                    />
                  ) : (
                    <div className="text-6xl">🥗</div>
                  )}
                  {meal.is_popular && (
                    <div className="absolute top-3 left-3 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center">
                      <Star className="w-3 h-3 mr-1" />
                      Popular
                    </div>
                  )}
                  <div className="absolute top-3 right-3 bg-green-600 text-white px-2 py-1 rounded-full text-sm font-bold">
                    ${meal.price}
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-semibold text-gray-900 group-hover:text-green-600 transition-colors">
                      {meal.name}
                    </h3>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full ml-2 flex-shrink-0">
                      {meal.category_name}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {meal.short_description || meal.description}
                  </p>

                  {/* Nutrition Info */}
                  <div className="grid grid-cols-3 gap-2 text-sm text-gray-500 mb-4">
                    <div className="text-center">
                      <div className="font-semibold text-gray-900">{meal.calories}</div>
                      <div>calories</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-gray-900">{meal.protein}g</div>
                      <div>protein</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-gray-900">{meal.carbs}g</div>
                      <div>carbs</div>
                    </div>
                  </div>

                  {/* Additional Info */}
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {meal.prep_time} min
                    </div>
                    {meal.allergens && meal.allergens !== 'None' && (
                      <div className="flex items-center text-orange-600">
                        <Leaf className="w-4 h-4 mr-1" />
                        Contains: {meal.allergens}
                      </div>
                    )}
                  </div>

                  <button className="w-full btn-green py-2 px-4 rounded-lg font-medium group-hover:shadow-lg transition-shadow">
                    Add to Plan
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">
              No meals found in this category.
            </p>
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center mt-16 p-8 bg-gradient-to-r from-green-50 to-primary-50 rounded-2xl">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Start Your Meal Plan?
          </h3>
          <p className="text-gray-600 mb-6">
            Take our quick quiz to get personalized meal recommendations
          </p>
          <button className="btn-green px-8 py-3 text-lg font-semibold rounded-lg">
            Get My Recommendations
          </button>
        </div>
      </div>
    </div>
  )
}

export default MenuPage