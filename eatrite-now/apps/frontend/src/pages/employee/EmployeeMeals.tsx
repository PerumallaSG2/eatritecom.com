import React, { useState, useEffect } from 'react';
import { 
  Search,
  ShoppingCart,
  X,
  Plus,
  Filter,
  Package,
  ChevronRight,
  CloudOff,
  Utensils
} from 'lucide-react';

/**
 * AVAILABLE MEALS - Enterprise Meal Selection
 * 
 * Purpose: Functional meal catalog for employees to browse and order meals
 * 
 * Design: B2B enterprise interface - utility-first, clinical nutrition data
 * 
 * TODO: Connect to meal catalog API
 * TODO: Implement search functionality
 * TODO: Wire up filter logic
 * TODO: Add cart state management
 * TODO: Implement pagination
 */

type LoadingState = 'idle' | 'loading' | 'success' | 'error';

const EmployeeMeals: React.FC = () => {
  const [loadingState, setLoadingState] = useState<LoadingState>('loading');
  const [cartOpen, setCartOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeDietFilters, setActiveDietFilters] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [hasFilteredResults, setHasFilteredResults] = useState(true);

  // TODO: Replace with real data from API
  const cartItemCount = 3;

  /**
   * Diet filter options
   * TODO: Load from API/config
   */
  const dietFilters = [
    'All',
    'Keto',
    'Vegan', 
    'Vegetarian',
    'High Protein',
    'Gluten-Free',
    'Low Carb',
    'Paleo'
  ];

  /**
   * Category options
   * TODO: Load from API/config
   */
  const categories = [
    { id: 'all', label: 'All Meals' },
    { id: 'breakfast', label: 'Breakfast' },
    { id: 'lunch', label: 'Lunch' },
    { id: 'dinner', label: 'Dinner' }
  ];

  // Simulate API call for meal data
  useEffect(() => {
    const loadMeals = async () => {
      setLoadingState('loading');
      
      // TODO: Replace with actual API call
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 400));
      
      // Simulate different states for testing
      // Change these values to test different states:
      const shouldError = false; // Set to true to test error state
      const shouldShowEmpty = false; // Set to true to test empty/no results state
      
      if (shouldError) {
        setLoadingState('error');
      } else if (shouldShowEmpty) {
        setHasFilteredResults(false);
        setLoadingState('success');
      } else {
        setHasFilteredResults(true);
        setLoadingState('success');
      }
    };

    loadMeals();
  }, [searchQuery, activeDietFilters, activeCategory]); // Re-load when filters change

  const handleRetry = () => {
    setLoadingState('loading');
    setTimeout(() => {
      setLoadingState('success');
      setHasFilteredResults(true);
    }, 400);
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setActiveDietFilters([]);
    setActiveCategory('all');
  };

  // Cart panel component (extracted for reuse)
  const renderCartPanel = () => (
    <>
      {/* Overlay */}
      <div
        onClick={() => setCartOpen(false)}
        className="fixed inset-0 bg-black/50 z-40 transition-opacity"
      />

      {/* Cart Panel */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col">
        {/* Cart Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <ShoppingCart className="w-6 h-6 text-gray-900" />
            <h2 className="text-xl font-bold text-gray-900">Your Cart</h2>
          </div>
          <button
            onClick={() => setCartOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Cart Items Area - Placeholder */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-4">
            {/* TODO: Cart items will be rendered here */}
            <div className="text-center py-12 text-gray-500">
              <ShoppingCart className="w-16 h-16 mx-auto mb-4 opacity-20" />
              <p className="text-sm">Cart items will appear here</p>
            </div>
          </div>
        </div>

        {/* Cart Footer - Subtotal & Checkout */}
        <div className="border-t border-gray-200 p-6 space-y-4">
          <div className="flex items-center justify-between text-lg">
            <span className="font-medium text-gray-700">Subtotal</span>
            <span className="font-bold text-gray-900">$0.00</span>
          </div>

          <button className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
            Proceed to Checkout
          </button>

          <button
            onClick={() => setCartOpen(false)}
            className="w-full text-gray-600 hover:text-gray-900 font-medium py-2"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </>
  );

  // SHARED HEADER (shown in all states)
  const renderHeader = () => (
    <div className="flex items-start justify-between">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Available Meals</h1>
        <p className="text-sm text-gray-600 mt-1">
          Week of December 6-10, 2025
        </p>
      </div>

      {/* Cart Button - Always accessible */}
      <button
        onClick={() => setCartOpen(true)}
        className="relative bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
      >
        <ShoppingCart className="w-4 h-4" />
        <span>Cart</span>
        {cartItemCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
            {cartItemCount}
          </span>
        )}
      </button>
    </div>
  );

  // SHARED FILTERS (shown in loading and success states)
  const renderFilters = (disabled = false) => (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search meals by name or ingredient..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          disabled={disabled}
          className={`w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none ${
            disabled ? 'opacity-50 cursor-wait' : ''
          }`}
        />
      </div>

      {/* Diet Filter Pills */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Filter className="w-4 h-4 text-gray-500" />
          <span className="text-sm font-medium text-gray-700">Dietary Preferences</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {dietFilters.map((filter) => {
            const isActive = filter === 'All' 
              ? activeDietFilters.length === 0 
              : activeDietFilters.includes(filter);
            
            return (
              <button
                key={filter}
                onClick={() => {
                  if (filter === 'All') {
                    setActiveDietFilters([]);
                  } else {
                    setActiveDietFilters(prev => 
                      prev.includes(filter) 
                        ? prev.filter(f => f !== filter)
                        : [...prev, filter]
                    );
                  }
                }}
                disabled={disabled}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                } ${disabled ? 'cursor-wait' : ''}`}
              >
                {filter}
              </button>
            );
          })}
        </div>
      </div>

      {/* Category Tabs */}
      <div className="border-b border-gray-200">
        <div className="flex gap-1 -mb-px">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              disabled={disabled}
              className={`px-6 py-3 font-medium text-sm transition-colors ${
                activeCategory === category.id
                  ? 'border-b-2 border-primary-600 text-primary-600'
                  : 'text-gray-600 hover:text-gray-900'
              } ${disabled ? 'cursor-wait' : ''}`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* Active Filters Summary */}
      {activeDietFilters.length > 0 && (
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-sm text-gray-600">Active filters:</span>
          {activeDietFilters.map((filter) => (
            <span
              key={filter}
              className="inline-flex items-center gap-2 bg-primary-50 text-primary-700 px-3 py-1 rounded-full text-sm font-medium"
            >
              {filter}
              <button
                onClick={() => {
                  setActiveDietFilters(prev => prev.filter(f => f !== filter));
                }}
                disabled={disabled}
                className="hover:bg-primary-100 rounded-full p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
          <button
            onClick={() => setActiveDietFilters([])}
            disabled={disabled}
            className="text-sm text-gray-500 hover:text-gray-700 underline"
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  );

  // LOADING STATE
  if (loadingState === 'loading') {
    return (
      <>
        <div className="max-w-7xl mx-auto space-y-6">
          {renderHeader()}
          {renderFilters(false)} {/* Filters remain interactive during loading */}

          {/* Skeleton Meal Grid */}
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  {/* Image Skeleton */}
                  <div className="h-48 bg-gray-200 animate-pulse" />
                  
                  {/* Content Skeleton */}
                  <div className="p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="h-5 w-32 bg-gray-200 rounded animate-pulse" />
                      <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
                    </div>
                    
                    <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
                    <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse" />
                    
                    <div className="flex items-center justify-between">
                      <div className="h-3 w-16 bg-gray-200 rounded animate-pulse" />
                      <div className="h-3 w-16 bg-gray-200 rounded animate-pulse" />
                      <div className="h-3 w-16 bg-gray-200 rounded animate-pulse" />
                    </div>
                    
                    <div className="flex gap-1.5">
                      <div className="h-5 w-20 bg-gray-200 rounded-full animate-pulse" />
                      <div className="h-5 w-16 bg-gray-200 rounded-full animate-pulse" />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="h-6 w-16 bg-gray-200 rounded animate-pulse" />
                      <div className="h-10 w-20 bg-gray-200 rounded-lg animate-pulse" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Cart Panel */}
        {cartOpen && renderCartPanel()}
      </>
    );
  }

  // ERROR STATE
  if (loadingState === 'error') {
    return (
      <>
        <div className="max-w-7xl mx-auto space-y-6">
          {renderHeader()}
          {renderFilters(true)} {/* Filters shown but disabled */}

          {/* Error Message */}
          <div className="flex items-center justify-center min-h-[500px]">
            <div className="max-w-md w-full text-center" role="alert">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-6">
                <CloudOff className="w-8 h-8 text-gray-400" />
              </div>
              
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                We can't load meals right now
              </h2>
              
              <p className="text-gray-600 mb-8">
                Our kitchen's menu is temporarily unavailable. Try again in a moment.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={handleRetry}
                  className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors"
                >
                  Retry
                </button>
                <button
                  onClick={handleClearFilters}
                  className="px-6 py-3 text-primary-600 hover:text-primary-700 font-medium hover:bg-primary-50 rounded-lg transition-colors"
                >
                  Clear Filters
                </button>
              </div>

              <p className="text-sm text-gray-500 mt-6">
                Having trouble? <button className="text-primary-600 hover:underline">Contact support</button>
              </p>
            </div>
          </div>
        </div>

        {/* Cart Panel */}
        {cartOpen && renderCartPanel()}
      </>
    );
  }

  // EMPTY STATE (No Results from Filters)
  if (!hasFilteredResults) {
    return (
      <>
        <div className="max-w-7xl mx-auto space-y-6">
          {renderHeader()}
          {renderFilters(false)} {/* Filters remain interactive */}

          {/* Empty State Message */}
          <div className="flex items-center justify-center min-h-[500px]">
            <div className="max-w-md w-full text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-6">
                <Utensils className="w-8 h-8 text-gray-400" />
              </div>
              
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                No meals match your filters
              </h2>
              
              <p className="text-gray-600 mb-8">
                Try adjusting your dietary preferences or search to see more options.
              </p>
              
              <button
                onClick={handleClearFilters}
                className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        {/* Cart Panel */}
        {cartOpen && renderCartPanel()}
      </>
    );
  }

  // SUCCESS STATE (Normal Meal Catalog View)
  return (
    <>
      <div className="max-w-7xl mx-auto space-y-6">
        {renderHeader()}
        {renderFilters(false)}

        {/* Section 4: Meal Grid */}
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {/* Meal Card 1 */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:border-gray-300 transition-colors">
              <div className="h-40 bg-gray-100 flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <Package className="w-10 h-10 mx-auto mb-2 opacity-50" />
                  <p className="text-xs">Meal Image</p>
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-base font-medium text-gray-900">Cincinnati Chili Bowl</h3>
                  <span className="text-sm text-gray-600">520 cal</span>
                </div>

                <p className="text-sm text-gray-600 mb-3">
                  Quinoa, beans, vegetables
                </p>

                <div className="flex items-center justify-between text-xs text-gray-500 mb-3 pb-3 border-b border-gray-200">
                  <span>Protein: 32g</span>
                  <span>Carbs: 45g</span>
                  <span>Fat: 18g</span>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  <span className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs font-medium rounded">
                    High Protein
                  </span>
                  <span className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs font-medium rounded">
                    Gluten-Free
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-base font-semibold text-gray-900">$12.99</span>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5">
                    <Plus className="w-4 h-4" />
                    Add
                  </button>
                </div>
              </div>
            </div>

            {/* Meal Card 2 */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:border-gray-300 transition-colors">
              <div className="h-40 bg-gray-100 flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <Package className="w-10 h-10 mx-auto mb-2 opacity-50" />
                  <p className="text-xs">Meal Image</p>
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-base font-medium text-gray-900">Grilled Salmon Bowl</h3>
                  <span className="text-sm text-gray-600">485 cal</span>
                </div>

                <p className="text-sm text-gray-600 mb-3">
                  Atlantic salmon, vegetables, quinoa
                </p>

                <div className="flex items-center justify-between text-xs text-gray-500 mb-3 pb-3 border-b border-gray-200">
                  <span>Protein: 38g</span>
                  <span>Carbs: 35g</span>
                  <span>Fat: 22g</span>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  <span className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs font-medium rounded">
                    Omega-3
                  </span>
                  <span className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs font-medium rounded">
                    Low Carb
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-base font-semibold text-gray-900">$14.99</span>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5">
                    <Plus className="w-4 h-4" />
                    Add
                  </button>
                </div>
              </div>
            </div>

            {/* Meal Card 3 */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:border-gray-300 transition-colors">
              <div className="h-40 bg-gray-100 flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <Package className="w-10 h-10 mx-auto mb-2 opacity-50" />
                  <p className="text-xs">Meal Image</p>
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-base font-medium text-gray-900">Mediterranean Chicken</h3>
                  <span className="text-sm text-gray-600">450 cal</span>
                </div>

                <p className="text-sm text-gray-600 mb-3">
                  Chicken, couscous, vegetables
                </p>

                <div className="flex items-center justify-between text-xs text-gray-500 mb-3 pb-3 border-b border-gray-200">
                  <span>Protein: 42g</span>
                  <span>Carbs: 38g</span>
                  <span>Fat: 15g</span>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  <span className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs font-medium rounded">
                    High Protein
                  </span>
                  <span className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs font-medium rounded">
                    Balanced
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-base font-semibold text-gray-900">$11.99</span>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5">
                    <Plus className="w-4 h-4" />
                    Add
                  </button>
                </div>
              </div>
            </div>

            {/* Meal Card 4 */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:border-gray-300 transition-colors">
              <div className="h-40 bg-gray-100 flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <Package className="w-10 h-10 mx-auto mb-2 opacity-50" />
                  <p className="text-xs">Meal Image</p>
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-base font-medium text-gray-900">Keto Power Bowl</h3>
                  <span className="text-sm text-gray-600">380 cal</span>
                </div>

                <p className="text-sm text-gray-600 mb-3">
                  Beef, cauliflower rice, avocado
                </p>

                <div className="flex items-center justify-between text-xs text-gray-500 mb-3 pb-3 border-b border-gray-200">
                  <span>Protein: 35g</span>
                  <span>Carbs: 8g</span>
                  <span>Fat: 28g</span>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  <span className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs font-medium rounded">
                    Keto
                  </span>
                  <span className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs font-medium rounded">
                    Low Carb
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-base font-semibold text-gray-900">$13.99</span>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5">
                    <Plus className="w-4 h-4" />
                    Add
                  </button>
                </div>
              </div>
            </div>

            {/* Meal Card 5 */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:border-gray-300 transition-colors">
              <div className="h-40 bg-gray-100 flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <Package className="w-10 h-10 mx-auto mb-2 opacity-50" />
                  <p className="text-xs">Meal Image</p>
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-base font-medium text-gray-900">Vegan Buddha Bowl</h3>
                  <span className="text-sm text-gray-600">420 cal</span>
                </div>

                <p className="text-sm text-gray-600 mb-3">
                  Chickpeas, sweet potato, kale, tahini
                </p>

                <div className="flex items-center justify-between text-xs text-gray-500 mb-3 pb-3 border-b border-gray-200">
                  <span>Protein: 18g</span>
                  <span>Carbs: 58g</span>
                  <span>Fat: 12g</span>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  <span className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs font-medium rounded">
                    Vegan
                  </span>
                  <span className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs font-medium rounded">
                    Plant-Based
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-base font-semibold text-gray-900">$10.99</span>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5">
                    <Plus className="w-4 h-4" />
                    Add
                  </button>
                </div>
              </div>
            </div>

            {/* Meal Card 6 */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:border-gray-300 transition-colors">
              <div className="h-40 bg-gray-100 flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <Package className="w-10 h-10 mx-auto mb-2 opacity-50" />
                  <p className="text-xs">Meal Image</p>
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-base font-medium text-gray-900">Turkey & Veggie Wrap</h3>
                  <span className="text-sm text-gray-600">395 cal</span>
                </div>

                <p className="text-sm text-gray-600 mb-3">
                  Turkey breast, vegetables, whole wheat
                </p>

                <div className="flex items-center justify-between text-xs text-gray-500 mb-3 pb-3 border-b border-gray-200">
                  <span>Protein: 28g</span>
                  <span>Carbs: 42g</span>
                  <span>Fat: 10g</span>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  <span className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs font-medium rounded">
                    High Protein
                  </span>
                  <span className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs font-medium rounded">
                    Low Fat
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-base font-semibold text-gray-900">$9.99</span>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5">
                    <Plus className="w-4 h-4" />
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Section 5: Load More */}
          <div className="flex justify-center mt-6">
            <button className="bg-white hover:bg-gray-50 border border-gray-300 text-gray-700 px-6 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
              Load More
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Cart Panel */}
      {cartOpen && renderCartPanel()}
    </>
  );
};

export default EmployeeMeals;