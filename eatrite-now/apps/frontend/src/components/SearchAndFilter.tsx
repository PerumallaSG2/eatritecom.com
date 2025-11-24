import React from 'react'
import EnhancedSearch from './EnhancedSearch'

export interface FilterOptions {
  dietary: string[]
  calorieRange: [number, number]
  proteinRange: [number, number]
  priceRange: [number, number]
  sortBy: 'name' | 'price' | 'calories' | 'protein' | 'popularity'
  sortOrder: 'asc' | 'desc'
}

interface SearchAndFilterProps {
  onSearch: (query: string) => void
}

const SearchAndFilter: React.FC<SearchAndFilterProps> = ({
  onSearch,
}) => {
  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Enhanced Search Bar */}
        <EnhancedSearch
          onSearch={onSearch}
          placeholder="Search meals... (e.g., 'chicken', 'keto', 'under 400 calories')"
          className="w-full"
        />
      </div>
    </div>
  )
}

export default SearchAndFilter
