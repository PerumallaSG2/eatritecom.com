import React, { useState, useRef, useEffect } from 'react';
import { Search, X, ChevronDown, SlidersHorizontal } from 'lucide-react';

export interface FilterOptions {
  dietary: string[];
  calorieRange: [number, number];
  proteinRange: [number, number];
  priceRange: [number, number];
  sortBy: 'name' | 'price' | 'calories' | 'protein' | 'popularity';
  sortOrder: 'asc' | 'desc';
}

interface SearchAndFilterProps {
  onSearch: (query: string) => void;
  onFilter: (filters: FilterOptions) => void;
  totalResults: number;
}

const SearchAndFilter: React.FC<SearchAndFilterProps> = ({
  onSearch,
  onFilter,
  totalResults
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    dietary: [],
    calorieRange: [200, 800],
    proteinRange: [10, 50],
    priceRange: [8, 15],
    sortBy: 'popularity',
    sortOrder: 'desc'
  });

  const searchInputRef = useRef<HTMLInputElement>(null);

  const dietaryOptions = [
    { id: 'keto', label: 'Keto', color: 'bg-purple-100 text-purple-800' },
    { id: 'paleo', label: 'Paleo', color: 'bg-orange-100 text-orange-800' },
    { id: 'vegan', label: 'Vegan', color: 'bg-green-100 text-green-800' },
    { id: 'vegetarian', label: 'Vegetarian', color: 'bg-emerald-100 text-emerald-800' },
    { id: 'gluten-free', label: 'Gluten-Free', color: 'bg-blue-100 text-blue-800' },
    { id: 'dairy-free', label: 'Dairy-Free', color: 'bg-yellow-100 text-yellow-800' },
    { id: 'high-protein', label: 'High-Protein', color: 'bg-red-100 text-red-800' },
    { id: 'low-carb', label: 'Low-Carb', color: 'bg-indigo-100 text-indigo-800' }
  ];

  const quickFilters = [
    { label: 'All', value: 'all', icon: '🍽️' },
    { label: 'Keto', value: 'keto', icon: '🥑' },
    { label: 'High Protein', value: 'high-protein', icon: '💪' },
    { label: 'Under 500 cal', value: 'low-cal', icon: '⚖️' },
    { label: 'Quick Prep', value: 'quick', icon: '⚡' },
    { label: 'Popular', value: 'popular', icon: '⭐' }
  ];

  const sortOptions = [
    { value: 'popularity', label: 'Most Popular' },
    { value: 'price', label: 'Price' },
    { value: 'calories', label: 'Calories' },
    { value: 'protein', label: 'Protein' },
    { value: 'name', label: 'Name' }
  ];

  // Handle search input changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  // Handle dietary filter toggle
  const toggleDietaryFilter = (option: string) => {
    const newDietary = filters.dietary.includes(option)
      ? filters.dietary.filter(item => item !== option)
      : [...filters.dietary, option];
    
    const newFilters = { ...filters, dietary: newDietary };
    setFilters(newFilters);
    onFilter(newFilters);
  };

  // Handle quick filter selection
  const handleQuickFilter = (filterValue: string) => {
    let newFilters = { ...filters };
    
    switch (filterValue) {
      case 'all':
        newFilters = {
          ...filters,
          dietary: [],
          calorieRange: [200, 800],
          proteinRange: [10, 50],
          priceRange: [8, 15]
        };
        break;
      case 'keto':
        newFilters.dietary = ['keto'];
        break;
      case 'high-protein':
        newFilters.dietary = ['high-protein'];
        break;
      case 'low-cal':
        newFilters.calorieRange = [200, 500];
        break;
      case 'popular':
        newFilters.sortBy = 'popularity';
        newFilters.sortOrder = 'desc';
        break;
    }
    
    setFilters(newFilters);
    onFilter(newFilters);
  };

  // Handle range input changes
  const handleRangeChange = (
    type: 'calorieRange' | 'proteinRange' | 'priceRange',
    index: number,
    value: number
  ) => {
    const newRange = [...filters[type]] as [number, number];
    newRange[index] = value;
    
    const newFilters = { ...filters, [type]: newRange };
    setFilters(newFilters);
    onFilter(newFilters);
  };

  // Handle sort change
  const handleSortChange = (sortBy: FilterOptions['sortBy']) => {
    const newFilters = { ...filters, sortBy };
    setFilters(newFilters);
    onFilter(newFilters);
  };

  // Clear all filters
  const clearFilters = () => {
    const defaultFilters: FilterOptions = {
      dietary: [],
      calorieRange: [200, 800],
      proteinRange: [10, 50],
      priceRange: [8, 15],
      sortBy: 'popularity',
      sortOrder: 'desc'
    };
    setFilters(defaultFilters);
    setSearchQuery('');
    onSearch('');
    onFilter(defaultFilters);
  };

  // Focus search input when component mounts
  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        
        {/* Search Bar */}
        <div className="flex items-center space-x-4 mb-4">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
              placeholder="Search meals... (e.g., 'chicken', 'keto', 'under 400 calories')"
            />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  onSearch('');
                }}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
              </button>
            )}
          </div>

          <button
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            className={`flex items-center space-x-2 px-4 py-3 border rounded-lg font-medium transition-colors ${
              showAdvancedFilters
                ? 'bg-green-50 border-green-300 text-green-700'
                : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <SlidersHorizontal className="h-4 w-4" />
            <span className="hidden sm:inline">Filters</span>
            <ChevronDown className={`h-4 w-4 transition-transform ${showAdvancedFilters ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Quick Filters */}
        <div className="flex flex-wrap gap-2 mb-4">
          {quickFilters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => handleQuickFilter(filter.value)}
              className="inline-flex items-center space-x-1 px-3 py-2 rounded-full text-sm font-medium bg-gray-100 text-gray-700 hover:bg-green-100 hover:text-green-700 transition-colors active:scale-95"
            >
              <span>{filter.icon}</span>
              <span>{filter.label}</span>
            </button>
          ))}
        </div>

        {/* Results Count and Sort */}
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm text-gray-600">
            {totalResults} meal{totalResults !== 1 ? 's' : ''} found
          </div>
          
          <div className="flex items-center space-x-2">
            <label className="text-sm text-gray-600">Sort by:</label>
            <select
              value={filters.sortBy}
              onChange={(e) => handleSortChange(e.target.value as FilterOptions['sortBy'])}
              className="text-sm border border-gray-300 rounded px-3 py-1 bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Advanced Filters Panel */}
        {showAdvancedFilters && (
          <div className="bg-gray-50 rounded-lg p-4 space-y-4 animate-fade-in">
            
            {/* Dietary Preferences */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Dietary Preferences</h3>
              <div className="flex flex-wrap gap-2">
                {dietaryOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => toggleDietaryFilter(option.id)}
                    className={`px-3 py-2 rounded-full text-xs font-medium transition-all ${
                      filters.dietary.includes(option.id)
                        ? option.color + ' ring-2 ring-green-500'
                        : 'bg-white text-gray-700 border border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {option.label}
                    {filters.dietary.includes(option.id) && (
                      <X className="inline ml-1 h-3 w-3" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Range Filters */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              {/* Calories Range */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Calories: {filters.calorieRange[0]} - {filters.calorieRange[1]}
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="range"
                    min="200"
                    max="800"
                    value={filters.calorieRange[0]}
                    onChange={(e) => handleRangeChange('calorieRange', 0, parseInt(e.target.value))}
                    className="flex-1"
                  />
                  <input
                    type="range"
                    min="200"
                    max="800"
                    value={filters.calorieRange[1]}
                    onChange={(e) => handleRangeChange('calorieRange', 1, parseInt(e.target.value))}
                    className="flex-1"
                  />
                </div>
              </div>

              {/* Protein Range */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Protein: {filters.proteinRange[0]}g - {filters.proteinRange[1]}g
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="range"
                    min="10"
                    max="50"
                    value={filters.proteinRange[0]}
                    onChange={(e) => handleRangeChange('proteinRange', 0, parseInt(e.target.value))}
                    className="flex-1"
                  />
                  <input
                    type="range"
                    min="10"
                    max="50"
                    value={filters.proteinRange[1]}
                    onChange={(e) => handleRangeChange('proteinRange', 1, parseInt(e.target.value))}
                    className="flex-1"
                  />
                </div>
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Price: ${filters.priceRange[0]} - ${filters.priceRange[1]}
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="range"
                    min="8"
                    max="15"
                    step="0.50"
                    value={filters.priceRange[0]}
                    onChange={(e) => handleRangeChange('priceRange', 0, parseFloat(e.target.value))}
                    className="flex-1"
                  />
                  <input
                    type="range"
                    min="8"
                    max="15"
                    step="0.50"
                    value={filters.priceRange[1]}
                    onChange={(e) => handleRangeChange('priceRange', 1, parseFloat(e.target.value))}
                    className="flex-1"
                  />
                </div>
              </div>
            </div>

            {/* Clear Filters */}
            <div className="flex justify-end">
              <button
                onClick={clearFilters}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <X className="h-4 w-4 mr-2" />
                Clear All Filters
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchAndFilter;