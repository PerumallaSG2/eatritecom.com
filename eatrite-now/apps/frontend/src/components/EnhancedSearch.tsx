import React, { useState, useRef, useEffect } from 'react'
import { Search, X, Clock, TrendingUp } from 'lucide-react'

interface SearchSuggestion {
  id: string
  type: 'meal' | 'category' | 'ingredient' | 'recent' | 'trending'
  text: string
  subtitle?: string
  icon?: string
}

interface EnhancedSearchProps {
  onSearch: (query: string) => void
  onSelectSuggestion?: (suggestion: SearchSuggestion) => void
  placeholder?: string
  className?: string
}

const EnhancedSearch: React.FC<EnhancedSearchProps> = ({
  onSearch,
  onSelectSuggestion,
  placeholder = "Search meals, ingredients, categories...",
  className = ""
}) => {
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const searchInputRef = useRef<HTMLInputElement>(null)
  const debounceTimer = useRef<number>()

  // Mock data for suggestions
  const mockMeals = [
    { name: 'Grilled Salmon', category: 'Seafood', calories: 420 },
    { name: 'Chicken Caesar Salad', category: 'Salads', calories: 350 },
    { name: 'Beef Stir Fry', category: 'Asian', calories: 480 },
    { name: 'Vegetarian Pasta', category: 'Italian', calories: 380 },
    { name: 'Greek Bowl', category: 'Mediterranean', calories: 450 },
    { name: 'Salmon Teriyaki', category: 'Asian', calories: 390 },
    { name: 'Chicken Tikka', category: 'Indian', calories: 410 },
    { name: 'Turkey Meatballs', category: 'American', calories: 360 }
  ]

  const mockCategories = ['Keto', 'Vegan', 'Paleo', 'Mediterranean', 'Asian', 'Italian', 'Mexican']
  const mockIngredients = ['Salmon', 'Chicken', 'Quinoa', 'Avocado', 'Spinach', 'Sweet Potato']
  const trendingSearches = ['Keto meals', 'High protein', 'Under 400 calories', 'Mediterranean']

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('eatrite_recent_searches')
    if (saved) {
      setRecentSearches(JSON.parse(saved))
    }
  }, [])

  // Save recent search
  const saveRecentSearch = (searchQuery: string) => {
    if (!searchQuery.trim() || recentSearches.includes(searchQuery)) return
    
    const updated = [searchQuery, ...recentSearches.slice(0, 4)] // Keep last 5
    setRecentSearches(updated)
    localStorage.setItem('eatrite_recent_searches', JSON.stringify(updated))
  }

  // Generate suggestions based on query
  const generateSuggestions = (searchQuery: string): SearchSuggestion[] => {
    if (!searchQuery.trim()) {
      const suggestions: SearchSuggestion[] = []
      
      // Add recent searches
      recentSearches.forEach((search, index) => {
        suggestions.push({
          id: `recent-${index}`,
          type: 'recent',
          text: search,
          subtitle: 'Recent search'
        })
      })
      
      // Add trending searches
      trendingSearches.forEach((trend, index) => {
        suggestions.push({
          id: `trending-${index}`,
          type: 'trending',
          text: trend,
          subtitle: 'Trending'
        })
      })
      
      return suggestions.slice(0, 6)
    }

    const lowercaseQuery = searchQuery.toLowerCase()
    const suggestions: SearchSuggestion[] = []

    // Search meals
    mockMeals.forEach((meal, index) => {
      if (meal.name.toLowerCase().includes(lowercaseQuery)) {
        suggestions.push({
          id: `meal-${index}`,
          type: 'meal',
          text: meal.name,
          subtitle: `${meal.category} • ${meal.calories} cal`,
          icon: '🍽️'
        })
      }
    })

    // Search categories
    mockCategories.forEach((category, index) => {
      if (category.toLowerCase().includes(lowercaseQuery)) {
        suggestions.push({
          id: `category-${index}`,
          type: 'category',
          text: category,
          subtitle: 'Category',
          icon: '🏷️'
        })
      }
    })

    // Search ingredients
    mockIngredients.forEach((ingredient, index) => {
      if (ingredient.toLowerCase().includes(lowercaseQuery)) {
        suggestions.push({
          id: `ingredient-${index}`,
          type: 'ingredient',
          text: ingredient,
          subtitle: 'Ingredient',
          icon: '🥬'
        })
      }
    })

    return suggestions.slice(0, 8)
  }

  // Debounced search
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value
    setQuery(newQuery)
    setSelectedIndex(-1)

    // Clear previous timer
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current)
    }

    // Set new timer
    debounceTimer.current = setTimeout(() => {
      const newSuggestions = generateSuggestions(newQuery)
      setSuggestions(newSuggestions)
      setShowSuggestions(true)
    }, 200)
  }

  // Handle search submission
  const handleSearch = (searchQuery?: string) => {
    const finalQuery = searchQuery || query
    if (finalQuery.trim()) {
      onSearch(finalQuery)
      saveRecentSearch(finalQuery)
      setShowSuggestions(false)
      setQuery(finalQuery)
    }
  }

  // Handle suggestion selection
  const handleSuggestionSelect = (suggestion: SearchSuggestion) => {
    setQuery(suggestion.text)
    setShowSuggestions(false)
    onSelectSuggestion?.(suggestion)
    handleSearch(suggestion.text)
  }

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions || suggestions.length === 0) return

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setSelectedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        )
        break
      case 'ArrowUp':
        e.preventDefault()
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1)
        break
      case 'Enter':
        e.preventDefault()
        if (selectedIndex >= 0) {
          handleSuggestionSelect(suggestions[selectedIndex])
        } else {
          handleSearch()
        }
        break
      case 'Escape':
        setShowSuggestions(false)
        setSelectedIndex(-1)
        searchInputRef.current?.blur()
        break
    }
  }

  // Clear search
  const clearSearch = () => {
    setQuery('')
    setSuggestions([])
    setShowSuggestions(false)
    setSelectedIndex(-1)
    searchInputRef.current?.focus()
  }

  // Focus management
  const handleFocus = () => {
    const newSuggestions = generateSuggestions(query)
    setSuggestions(newSuggestions)
    setShowSuggestions(true)
  }

  const handleBlur = () => {
    // Delay hiding to allow clicks on suggestions
    setTimeout(() => setShowSuggestions(false), 200)
  }

  return (
    <div className={`relative ${className}`}>
      {/* Search Input */}
      <div className="search-input-container">
        <Search className="search-icon h-5 w-5 text-gray-400" />
        <input
          ref={searchInputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className="block w-full pr-12 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
          placeholder={placeholder}
          autoComplete="off"
        />
        {query && (
          <button
            onClick={clearSearch}
            className="absolute inset-y-0 right-0 pr-3 flex items-center z-10"
          >
            <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
          </button>
        )}
      </div>

      {/* Search Suggestions */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
          {suggestions.map((suggestion, index) => (
            <button
              key={suggestion.id}
              onClick={() => handleSuggestionSelect(suggestion)}
              className={`w-full px-4 py-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors ${
                index === selectedIndex ? 'bg-blue-50' : ''
              }`}
            >
              <div className="flex items-center space-x-3">
                {/* Icon */}
                <div className="text-lg">
                  {suggestion.icon || 
                    (suggestion.type === 'recent' ? <Clock className="h-4 w-4 text-gray-400" /> :
                     suggestion.type === 'trending' ? <TrendingUp className="h-4 w-4 text-orange-500" /> :
                     <Search className="h-4 w-4 text-gray-400" />)
                  }
                </div>
                
                {/* Content */}
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{suggestion.text}</div>
                  {suggestion.subtitle && (
                    <div className="text-sm text-gray-500">{suggestion.subtitle}</div>
                  )}
                </div>

                {/* Type Badge */}
                {suggestion.type === 'trending' && (
                  <span className="px-2 py-1 text-xs bg-orange-100 text-orange-600 rounded-full">
                    Trending
                  </span>
                )}
              </div>
            </button>
          ))}
          
          {/* Search Action */}
          {query.trim() && (
            <button
              onClick={() => handleSearch()}
              className="w-full px-4 py-3 text-left hover:bg-gray-50 border-t border-gray-200"
            >
              <div className="flex items-center space-x-3">
                <Search className="h-4 w-4 text-green-600" />
                <div>
                  <span className="font-medium text-green-600">Search for "</span>
                  <span className="font-medium text-green-600">{query}</span>
                  <span className="font-medium text-green-600">"</span>
                </div>
              </div>
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default EnhancedSearch