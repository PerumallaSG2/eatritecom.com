import React, { useState, useEffect } from 'react';
import { 
  Package,
  Clock,
  CheckCircle,
  RotateCcw,
  Calendar,
  MapPin,
  ChevronRight,
  CloudOff
} from 'lucide-react';

/**
 * EMPLOYEE ORDERS PAGE - EatRite Work (Cincinnati)
 * 
 * Purpose: Provides employees with complete order history, clear delivery tracking, and quick reordering.
 * 
 * Reassurance: "Your meals are on track, and you can easily see what's coming and what you've enjoyed before."
 * 
 * This page gives transparency into order status and reduces "where's my food?" anxiety
 * through clear status indicators and delivery information.
 * 
 * TODO: Connect to orders API
 * TODO: Implement real-time order tracking
 * TODO: Wire up reorder functionality
 * TODO: Add order details modal/page
 * TODO: Implement pagination for past orders
 */

type LoadingState = 'idle' | 'loading' | 'success' | 'error';

const EmployeeOrders: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
  const [loadingState, setLoadingState] = useState<LoadingState>('loading');
  const [hasUpcomingOrders, setHasUpcomingOrders] = useState(true);
  const [hasPastOrders, setHasPastOrders] = useState(true);

  // Simulate API call for orders data
  useEffect(() => {
    const loadOrders = async () => {
      setLoadingState('loading');
      
      // TODO: Replace with actual API call
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 600));
      
      // Simulate different states for testing
      // Change these values to test different states:
      const shouldError = false; // Set to true to test error state
      const shouldShowEmptyUpcoming = false; // Set to true to test empty upcoming orders
      const shouldShowEmptyPast = false; // Set to true to test empty past orders
      
      if (shouldError) {
        setLoadingState('error');
      } else {
        setHasUpcomingOrders(!shouldShowEmptyUpcoming);
        setHasPastOrders(!shouldShowEmptyPast);
        setLoadingState('success');
      }
    };

    loadOrders();
  }, [activeTab]); // Re-load when tab changes

  const handleRetry = () => {
    setLoadingState('loading');
    setTimeout(() => {
      setLoadingState('success');
      setHasUpcomingOrders(true);
      setHasPastOrders(true);
    }, 600);
  };

  /**
   * Helper function to render status badge
   */
  const renderStatusBadge = (status: 'pending' | 'preparing' | 'delivered') => {
    const config = {
      pending: {
        icon: Clock,
        label: 'Pending',
        color: 'bg-yellow-100 text-yellow-700 border-yellow-200'
      },
      preparing: {
        icon: Package,
        label: 'Preparing',
        color: 'bg-blue-100 text-blue-700 border-blue-200'
      },
      delivered: {
        icon: CheckCircle,
        label: 'Delivered',
        color: 'bg-green-100 text-green-700 border-green-200'
      }
    };

    const { icon: Icon, label, color } = config[status];

    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium border ${color}`}>
        <Icon className="w-4 h-4" />
        {label}
      </span>
    );
  };

  // Shared components
  const renderHeader = () => (
    <div>
      <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
      <p className="text-gray-600 mt-2">
        Track your meal deliveries and view order history
      </p>
    </div>
  );

  const renderTabs = () => (
    <div className="border-b border-gray-200">
      <div className="flex gap-1 -mb-px">
        <button
          onClick={() => setActiveTab('upcoming')}
          className={`px-6 py-3 font-medium text-sm transition-colors ${
            activeTab === 'upcoming'
              ? 'border-b-2 border-primary-600 text-primary-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Upcoming Orders
        </button>
        <button
          onClick={() => setActiveTab('past')}
          className={`px-6 py-3 font-medium text-sm transition-colors ${
            activeTab === 'past'
              ? 'border-b-2 border-primary-600 text-primary-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Past Orders
        </button>
      </div>
    </div>
  );

  // LOADING STATE
  if (loadingState === 'loading') {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        {renderHeader()}
        {renderTabs()}

        {/* Skeleton Order Cards */}
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              {/* Order Header Skeleton */}
              <div className="flex items-start justify-between mb-4">
                <div className="space-y-2 flex-1">
                  <div className="h-6 w-32 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 w-48 bg-gray-200 rounded animate-pulse" />
                </div>
                <div className="h-8 w-24 bg-gray-200 rounded-full animate-pulse" />
              </div>

              {/* Delivery Info Skeleton */}
              <div className="bg-gray-100 rounded-lg p-4 mb-4">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-5 h-5 bg-gray-200 rounded animate-pulse" />
                  <div className="flex-1 space-y-2">
                    <div className="h-5 w-56 bg-gray-200 rounded animate-pulse" />
                    <div className="h-4 w-40 bg-gray-200 rounded animate-pulse" />
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 w-64 bg-gray-200 rounded animate-pulse" />
                </div>
              </div>

              {/* Order Items Skeleton */}
              <div className="space-y-3 mb-4">
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                <div className="space-y-2">
                  {[1, 2, 3].map((j) => (
                    <div key={j} className="flex items-center justify-between">
                      <div className="h-4 w-40 bg-gray-200 rounded animate-pulse" />
                      <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Total Skeleton */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="space-y-2">
                  <div className="h-4 w-12 bg-gray-200 rounded animate-pulse" />
                  <div className="h-7 w-20 bg-gray-200 rounded animate-pulse" />
                </div>
                <div className="h-12 w-32 bg-gray-200 rounded-lg animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ERROR STATE
  if (loadingState === 'error') {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        {renderHeader()}
        {renderTabs()}

        {/* Error Message */}
        <div className="flex items-center justify-center min-h-[500px]">
          <div className="max-w-md w-full text-center" role="alert">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-6">
              <CloudOff className="w-8 h-8 text-gray-400" />
            </div>
            
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              We can't load your orders right now
            </h2>
            
            <p className="text-gray-600 mb-8">
              Your order history is safe. This usually resolves in a moment.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={handleRetry}
                className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors"
              >
                Retry
              </button>
              <button
                onClick={() => {/* TODO: Navigate to meals page */}}
                className="px-6 py-3 text-primary-600 hover:text-primary-700 font-medium hover:bg-primary-50 rounded-lg transition-colors"
              >
                Browse Meals
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // EMPTY STATE (No Orders)
  const showEmptyState = (activeTab === 'upcoming' && !hasUpcomingOrders) || (activeTab === 'past' && !hasPastOrders);

  if (showEmptyState) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        {renderHeader()}
        {renderTabs()}

        {/* Empty State */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-6">
            <Package className="w-8 h-8 text-gray-400" />
          </div>
          
          <h3 className="text-2xl font-semibold text-gray-900 mb-3">
            No {activeTab} orders yet
          </h3>
          
          <p className="text-gray-600 mb-8">
            {activeTab === 'upcoming' 
              ? "You don't have any upcoming orders. Browse our meals to get started."
              : "Your past orders will appear here once delivered."
            }
          </p>
          
          {activeTab === 'upcoming' && (
            <button
              onClick={() => {/* TODO: Navigate to meals page */}}
              className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors inline-flex items-center gap-2"
            >
              Browse Meals
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    );
  }

  // SUCCESS STATE (Normal Order List View)
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {renderHeader()}
      {renderTabs()}

      {/* Section 3: Order Cards */}
      <div className="space-y-4">
        {activeTab === 'upcoming' ? (
          <>
            {/* Upcoming Order Card 1 */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              {/* Order Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg">
                    Order #4782
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Placed on November 27, 2025
                  </p>
                </div>
                {renderStatusBadge('preparing')}
              </div>

              {/* Delivery Information */}
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-4">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-blue-900">
                      Scheduled Delivery: December 2, 2025
                    </p>
                    <p className="text-sm text-blue-700 mt-1">
                      Between 11:00 AM - 1:00 PM
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 mt-3">
                  <MapPin className="w-5 h-5 text-blue-600 mt-0.5" />
                  <p className="text-sm text-blue-700">
                    Your office location (Building A, Floor 3)
                  </p>
                </div>
              </div>

              {/* Order Items */}
              <div className="space-y-3 mb-4">
                <h4 className="text-sm font-medium text-gray-700">Order Items</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-900">Cincinnati Chili Bowl</span>
                    <span className="text-gray-600">$12.99</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-900">Grilled Salmon Bowl</span>
                    <span className="text-gray-600">$14.99</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-900">Mediterranean Chicken</span>
                    <span className="text-gray-600">$11.99</span>
                  </div>
                </div>
              </div>

              {/* Order Total & Action */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div>
                  <p className="text-sm text-gray-600">Total</p>
                  <p className="text-xl font-bold text-gray-900">$39.97</p>
                </div>
                <button className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2">
                  Track Order
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Upcoming Order Card 2 */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              {/* Order Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg">
                    Order #4756
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Placed on November 20, 2025
                  </p>
                </div>
                {renderStatusBadge('pending')}
              </div>

              {/* Delivery Information */}
              <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4 mb-4">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-yellow-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-yellow-900">
                      Scheduled Delivery: December 5, 2025
                    </p>
                    <p className="text-sm text-yellow-700 mt-1">
                      Between 11:00 AM - 1:00 PM
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 mt-3">
                  <MapPin className="w-5 h-5 text-yellow-600 mt-0.5" />
                  <p className="text-sm text-yellow-700">
                    Your office location (Building A, Floor 3)
                  </p>
                </div>
              </div>

              {/* Order Items */}
              <div className="space-y-3 mb-4">
                <h4 className="text-sm font-medium text-gray-700">Order Items</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-900">Keto Power Bowl</span>
                    <span className="text-gray-600">$13.99</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-900">Vegan Buddha Bowl</span>
                    <span className="text-gray-600">$10.99</span>
                  </div>
                </div>
              </div>

              {/* Order Total & Action */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div>
                  <p className="text-sm text-gray-600">Total</p>
                  <p className="text-xl font-bold text-gray-900">$24.98</p>
                </div>
                <button className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2">
                  Track Order
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Past Order Card 1 */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              {/* Order Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg">
                    Order #4689
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Placed on November 15, 2025
                  </p>
                </div>
                {renderStatusBadge('delivered')}
              </div>

              {/* Delivery Information */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-gray-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">
                      Delivered: November 18, 2025
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      12:15 PM
                    </p>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="space-y-3 mb-4">
                <h4 className="text-sm font-medium text-gray-700">Order Items</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-900">Cincinnati Chili Bowl</span>
                    <span className="text-gray-600">$12.99</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-900">Mediterranean Chicken</span>
                    <span className="text-gray-600">$11.99</span>
                  </div>
                </div>
              </div>

              {/* Order Total & Action */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div>
                  <p className="text-sm text-gray-600">Total</p>
                  <p className="text-xl font-bold text-gray-900">$24.98</p>
                </div>
                <button className="bg-white hover:bg-gray-50 border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2">
                  <RotateCcw className="w-4 h-4" />
                  Reorder
                </button>
              </div>
            </div>

            {/* Past Order Card 2 */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              {/* Order Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg">
                    Order #4612
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Placed on November 8, 2025
                  </p>
                </div>
                {renderStatusBadge('delivered')}
              </div>

              {/* Delivery Information */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-gray-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">
                      Delivered: November 11, 2025
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      11:45 AM
                    </p>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="space-y-3 mb-4">
                <h4 className="text-sm font-medium text-gray-700">Order Items</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-900">Grilled Salmon Bowl</span>
                    <span className="text-gray-600">$14.99</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-900">Turkey & Veggie Wrap</span>
                    <span className="text-gray-600">$9.99</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-900">Vegan Buddha Bowl</span>
                    <span className="text-gray-600">$10.99</span>
                  </div>
                </div>
              </div>

              {/* Order Total & Action */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div>
                  <p className="text-sm text-gray-600">Total</p>
                  <p className="text-xl font-bold text-gray-900">$35.97</p>
                </div>
                <button className="bg-white hover:bg-gray-50 border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2">
                  <RotateCcw className="w-4 h-4" />
                  Reorder
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default EmployeeOrders;
