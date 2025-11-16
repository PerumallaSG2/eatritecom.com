import React, { useState } from 'react';
import { Search, Filter, SlidersHorizontal, X, ChevronDown } from 'lucide-react';

interface MealFiltersProps {
  onFilterChange: (filters: FilterState) => void;
  className?: string;
}

interface FilterState {
  search: string;
  dietary: string[];
  priceRange: [number, number];
  sortBy: 'popular' | 'price' | 'rating' | 'name';
  calories: [number, number];
}

const MealFilters: React.FC<MealFiltersProps> = ({ onFilterChange, className = '' }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    dietary: [],
    priceRange: [10, 30],
    sortBy: 'popular',
    calories: [200, 800]
  });

  const dietaryOptions = [
    { id: 'keto', label: 'Keto-Friendly', color: 'bg-purple-500' },
    { id: 'gluten-free', label: 'Gluten-Free', color: 'bg-green-500' },
    { id: 'high-protein', label: 'High-Protein', color: 'bg-red-500' },
    { id: 'dairy-free', label: 'Dairy-Free', color: 'bg-blue-500' },
    { id: 'vegan', label: 'Vegan', color: 'bg-emerald-500' },
    { id: 'paleo', label: 'Paleo', color: 'bg-orange-500' }
  ];

  const sortOptions = [
    { value: 'popular', label: 'Most Popular' },
    { value: 'price', label: 'Price: Low to High' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'name', label: 'Name A-Z' }
  ];

  const updateFilters = (newFilters: Partial<FilterState>) => {
    const updated = { ...filters, ...newFilters };
    setFilters(updated);
    onFilterChange(updated);
  };

  const toggleDietaryFilter = (dietary: string) => {
    const newDietary = filters.dietary.includes(dietary)
      ? filters.dietary.filter(d => d !== dietary)
      : [...filters.dietary, dietary];
    updateFilters({ dietary: newDietary });
  };

  const clearFilters = () => {
    const resetFilters = {
      search: '',
      dietary: [],
      priceRange: [10, 30] as [number, number],
      sortBy: 'popular' as const,
      calories: [200, 800] as [number, number]
    };
    setFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  return (
    <div className={`bg-gradient-to-r from-[#F5F2E8] to-[#F5EEDC] border-b border-[#D4B46A]/30 ${className}`}>
      <div className="max-w-8xl mx-auto px-8 lg:px-12 py-8">
        {/* Main Filter Bar */}
        <div className="flex items-center gap-6 mb-6">
          {/* Search Input */}
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#0A2418]/60" />
            <input
              type="text"
              placeholder="Search meals, ingredients, or cuisines..."
              value={filters.search}
              onChange={(e) => updateFilters({ search: e.target.value })}
              className="w-full pl-12 pr-4 py-4 bg-white border border-[#D4B46A]/30 rounded-full focus:outline-none focus:ring-2 focus:ring-[#D4B46A]/50 focus:border-[#D4B46A] transition-all duration-300 text-lg"
              style={{ fontFamily: 'Inter, sans-serif' }}
            />
          </div>

          {/* Sort Dropdown */}
          <div className="relative">
            <select
              value={filters.sortBy}
              onChange={(e) => updateFilters({ sortBy: e.target.value as FilterState['sortBy'] })}
              className="appearance-none bg-white border border-[#D4B46A]/30 rounded-full px-6 py-4 pr-12 focus:outline-none focus:ring-2 focus:ring-[#D4B46A]/50 cursor-pointer text-lg font-medium text-[#0F2B1E]"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#0A2418]/60 pointer-events-none" />
          </div>

          {/* Advanced Filters Toggle */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className={`flex items-center gap-3 px-6 py-4 rounded-full transition-all duration-300 hover:scale-105 shadow-lg font-semibold ${isExpanded ? 'bg-[#0F2B1E] text-[#F5F2E8]' : 'bg-white text-[#0F2B1E] border border-[#D4B46A]/30'}`}
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            <SlidersHorizontal className="w-5 h-5" />
            <span>Filters</span>
            {(filters.dietary.length > 0 || filters.priceRange[0] !== 10 || filters.priceRange[1] !== 30) && (
              <span className="bg-[#FF6B35] text-white text-xs font-bold px-2 py-1 rounded-full min-w-[20px] text-center">
                {filters.dietary.length + (filters.priceRange[0] !== 10 || filters.priceRange[1] !== 30 ? 1 : 0)}
              </span>
            )}
          </button>
        </div>

        {/* Expanded Filters */}
        {isExpanded && (
          <div className="bg-white rounded-2xl p-8 shadow-2xl border border-[#D4B46A]/20 animate-in slide-in-from-top duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Dietary Filters */}
              <div className="space-y-4">
                <h3 
                  className="text-xl font-bold text-[#0F2B1E] mb-4"
                  style={{ fontFamily: 'Playfair Display, serif' }}
                >
                  Dietary Preferences
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {dietaryOptions.map(option => (
                    <button
                      key={option.id}
                      onClick={() => toggleDietaryFilter(option.id)}
                      className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-300 hover:scale-105 ${
                        filters.dietary.includes(option.id)
                          ? 'bg-[#0F2B1E] text-white shadow-lg'
                          : 'bg-[#F5EEDC] text-[#0F2B1E] hover:bg-[#D4B46A]/20'
                      }`}
                    >
                      <div className={`w-3 h-3 rounded-full ${option.color}`}></div>
                      <span 
                        className="text-sm font-medium"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      >
                        {option.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="space-y-4">
                <h3 
                  className="text-xl font-bold text-[#0F2B1E] mb-4"
                  style={{ fontFamily: 'Playfair Display, serif' }}
                >
                  Price Range
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-[#0A2418]/70" style={{ fontFamily: 'Inter, sans-serif' }}>
                      ${filters.priceRange[0]} - ${filters.priceRange[1]}
                    </span>
                    <button
                      onClick={() => updateFilters({ priceRange: [10, 30] })}
                      className="text-sm text-[#D4B46A] hover:text-[#B8964E] transition-colors"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      Reset
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      type="range"
                      min="10"
                      max="50"
                      value={filters.priceRange[1]}
                      onChange={(e) => updateFilters({ 
                        priceRange: [filters.priceRange[0], parseInt(e.target.value)] 
                      })}
                      className="w-full h-2 bg-[#F5EEDC] rounded-lg appearance-none cursor-pointer slider"
                    />
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {['$10-15', '$15-20', '$20-25', '$25+'].map((range, index) => (
                      <button
                        key={range}
                        onClick={() => {
                          const ranges = [[10, 15], [15, 20], [20, 25], [25, 50]];
                          updateFilters({ priceRange: ranges[index] as [number, number] });
                        }}
                        className="p-2 text-xs bg-[#F5EEDC] hover:bg-[#D4B46A]/20 rounded-lg transition-colors font-medium"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      >
                        {range}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Calories Range */}
              <div className="space-y-4">
                <h3 
                  className="text-xl font-bold text-[#0F2B1E] mb-4"
                  style={{ fontFamily: 'Playfair Display, serif' }}
                >
                  Calories per Meal
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-[#0A2418]/70" style={{ fontFamily: 'Inter, sans-serif' }}>
                      {filters.calories[0]} - {filters.calories[1]} cal
                    </span>
                    <button
                      onClick={() => updateFilters({ calories: [200, 800] })}
                      className="text-sm text-[#D4B46A] hover:text-[#B8964E] transition-colors"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      Reset
                    </button>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { label: 'Light', range: [200, 400] },
                      { label: 'Moderate', range: [400, 600] },
                      { label: 'Hearty', range: [600, 800] }
                    ].map((option) => (
                      <button
                        key={option.label}
                        onClick={() => updateFilters({ calories: option.range as [number, number] })}
                        className={`p-3 rounded-lg transition-all duration-300 hover:scale-105 text-sm font-medium ${
                          filters.calories[0] === option.range[0] && filters.calories[1] === option.range[1]
                            ? 'bg-[#0F2B1E] text-white'
                            : 'bg-[#F5EEDC] text-[#0F2B1E] hover:bg-[#D4B46A]/20'
                        }`}
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      >
                        {option.label}
                        <div className="text-xs opacity-70 mt-1">
                          {option.range[0]}-{option.range[1]}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Filter Actions */}
            <div className="flex justify-between items-center mt-8 pt-6 border-t border-[#D4B46A]/20">
              <div className="flex items-center gap-2 text-sm text-[#0A2418]/70">
                <Filter className="w-4 h-4" />
                <span style={{ fontFamily: 'Inter, sans-serif' }}>
                  {filters.dietary.length > 0 || filters.search || filters.priceRange[0] !== 10 || filters.priceRange[1] !== 30
                    ? 'Active filters applied'
                    : 'No filters applied'
                  }
                </span>
              </div>
              
              <div className="flex items-center gap-4">
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-2 px-4 py-2 text-[#0A2418]/70 hover:text-[#0F2B1E] transition-colors"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  <X className="w-4 h-4" />
                  Clear All
                </button>
                
                <button
                  onClick={() => setIsExpanded(false)}
                  className="bg-[#D4B46A] hover:bg-[#B8964E] text-[#0F2B1E] font-bold px-6 py-3 rounded-full transition-all duration-300 hover:scale-105 shadow-lg"
                  style={{ fontFamily: 'Playfair Display, serif' }}
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Quick Filter Chips */}
        {!isExpanded && filters.dietary.length > 0 && (
          <div className="flex flex-wrap gap-3 mt-4">
            {filters.dietary.map(dietary => {
              const option = dietaryOptions.find(opt => opt.id === dietary);
              return option ? (
                <div
                  key={dietary}
                  className="flex items-center gap-2 bg-[#0F2B1E] text-white px-4 py-2 rounded-full text-sm font-medium"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  <div className={`w-2 h-2 rounded-full ${option.color}`}></div>
                  {option.label}
                  <button
                    onClick={() => toggleDietaryFilter(dietary)}
                    className="ml-1 hover:bg-white/20 rounded-full p-1 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ) : null;
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MealFilters;