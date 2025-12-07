import React, { useState, useEffect } from 'react';
import { 
  Package, 
  Clock,
  ArrowRight,
  CloudOff,
  Sparkles
} from 'lucide-react';
import { usePreview } from '../../context/PreviewContext';

/**
 * MEAL PORTAL - Employee Entry Point
 * 
 * Purpose: Functional meal ordering interface for employees
 * 
 * Design: B2B enterprise style - utility-first, no lifestyle marketing
 * 
 * TODO: Connect to real user data API
 * TODO: Implement meal ordering
 * TODO: Add real-time delivery tracking
 */

type LoadingState = 'idle' | 'loading' | 'success' | 'error';

const EmployeeHome: React.FC = () => {
  const [loadingState, setLoadingState] = useState<LoadingState>('loading');
  const [isNewUser, setIsNewUser] = useState(false);
  const preview = usePreview();

  // Resolve final state: preview state takes precedence when in preview mode
  const resolvedState: LoadingState = 
    preview.enabled && preview.page === 'employee-home' && preview.state
      ? (preview.state === 'empty' ? 'success' : preview.state)
      : loadingState;

  // Handle preview empty state
  const resolvedIsNewUser = 
    preview.enabled && preview.page === 'employee-home' && preview.state === 'empty'
      ? true
      : isNewUser;

  // TODO: Replace with real user data from context/API
  const userName = "Sarah Chen";
  const userDepartment = "Engineering";

  // Simulate API call
  useEffect(() => {
    const loadData = async () => {
      setLoadingState('loading');
      await new Promise(resolve => setTimeout(resolve, 700));
      
      const shouldError = false;
      const shouldShowEmpty = false;
      
      if (shouldError) {
        setLoadingState('error');
      } else if (shouldShowEmpty) {
        setIsNewUser(true);
        setLoadingState('success');
      } else {
        setIsNewUser(false);
        setLoadingState('success');
      }
    };

    loadData();
  }, []);

  const handleRetry = () => {
    setLoadingState('loading');
    setTimeout(() => {
      setLoadingState('success');
    }, 700);
  };

  // LOADING STATE
  if (resolvedState === 'loading') {
    return (
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header Skeleton */}
        <div className="space-y-2">
          <div className="h-7 w-48 bg-gray-200 rounded animate-pulse" />
          <div className="h-5 w-64 bg-gray-200 rounded animate-pulse" />
        </div>

        {/* Order deadline banner skeleton */}
        <div className="bg-gray-200 rounded-lg p-4 h-20 animate-pulse" />

        {/* Meals grid skeleton */}
        <div>
          <div className="h-6 w-56 bg-gray-200 rounded animate-pulse mb-4" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-lg p-5 h-48 animate-pulse" />
            ))}
          </div>
        </div>

        {/* Recent orders skeleton */}
        <div>
          <div className="h-6 w-40 bg-gray-200 rounded animate-pulse mb-4" />
          <div className="bg-white border border-gray-200 rounded-lg p-5 h-40 animate-pulse" />
        </div>
      </div>
    );
  }

  // ERROR STATE
  if (resolvedState === 'error') {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-center min-h-[500px]">
          <div className="max-w-md w-full text-center" role="alert">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-6">
              <CloudOff className="w-8 h-8 text-gray-400" />
            </div>
            
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Unable to load meal portal
            </h2>
            
            <p className="text-sm text-gray-600 mb-6">
              Please try again in a moment.
            </p>
            
            <button
              onClick={handleRetry}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  // EMPTY STATE (New User)
  if (resolvedIsNewUser) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-center min-h-[500px]">
          <div className="max-w-md w-full text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-50 rounded-full mb-6">
              <Sparkles className="w-8 h-8 text-blue-600" />
            </div>
            
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Welcome to the meal program
            </h2>
            
            <p className="text-sm text-gray-600 mb-6">
              Complete your dietary preferences to begin ordering meals.
            </p>
            
            <button
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
            >
              Set Preferences
            </button>
          </div>
        </div>
      </div>
    );
  }

  // SUCCESS STATE (Normal Portal View)
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          Meal Portal
        </h1>
        <p className="text-sm text-gray-600 mt-1">
          {userName} • {userDepartment}
        </p>
      </div>

      {/* Order Deadline Banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Clock className="w-5 h-5 text-blue-600 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900">
              Order by 2:00 PM for today's delivery
            </p>
            <p className="text-sm text-gray-600 mt-0.5">
              Delivery window: 12:00-1:00 PM • Building A, Floor 3
            </p>
          </div>
          <p className="text-xs text-gray-500 whitespace-nowrap">2h 15m remaining</p>
        </div>
      </div>

      {/* Today's Meal Selection */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-medium text-gray-900">
            Available Meals — Friday, December 6
          </h2>
          <button className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
            View All Options
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Meal Card 1 */}
          <div className="bg-white border border-gray-200 rounded-lg p-5 hover:border-gray-300 transition-colors">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="text-base font-medium text-gray-900 mb-1">
                  Grilled Chicken Bowl
                </h3>
                <p className="text-sm text-gray-600">
                  520 cal • High Protein • Gluten-Free
                </p>
              </div>
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors">
                Order
              </button>
            </div>
            <div className="pt-3 border-t border-gray-200">
              <p className="text-xs text-gray-600">
                $0.00 (covered by company)
              </p>
            </div>
          </div>

          {/* Meal Card 2 */}
          <div className="bg-white border border-gray-200 rounded-lg p-5 hover:border-gray-300 transition-colors">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="text-base font-medium text-gray-900 mb-1">
                  Mediterranean Salad
                </h3>
                <p className="text-sm text-gray-600">
                  380 cal • Vegetarian • Dairy-Free
                </p>
              </div>
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors">
                Order
              </button>
            </div>
            <div className="pt-3 border-t border-gray-200">
              <p className="text-xs text-gray-600">
                $0.00 (covered by company)
              </p>
            </div>
          </div>

          {/* Meal Card 3 */}
          <div className="bg-white border border-gray-200 rounded-lg p-5 hover:border-gray-300 transition-colors">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="text-base font-medium text-gray-900 mb-1">
                  Teriyaki Salmon
                </h3>
                <p className="text-sm text-gray-600">
                  580 cal • Omega-3 • Low Carb
                </p>
              </div>
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors">
                Order
              </button>
            </div>
            <div className="pt-3 border-t border-gray-200">
              <p className="text-xs text-gray-600">
                $0.00 (covered by company)
              </p>
            </div>
          </div>

          {/* Meal Card 4 */}
          <div className="bg-white border border-gray-200 rounded-lg p-5 hover:border-gray-300 transition-colors">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="text-base font-medium text-gray-900 mb-1">
                  Buddha Bowl
                </h3>
                <p className="text-sm text-gray-600">
                  420 cal • Vegan • High Fiber
                </p>
              </div>
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors">
                Order
              </button>
            </div>
            <div className="pt-3 border-t border-gray-200">
              <p className="text-xs text-gray-600">
                $0.00 (covered by company)
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div>
        <h2 className="text-base font-medium text-gray-900 mb-4">
          Recent Orders
        </h2>
        <div className="bg-white border border-gray-200 rounded-lg divide-y divide-gray-200">
          {/* Order 1 */}
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-10 h-10 bg-green-50 rounded">
                  <Package className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Teriyaki Salmon</p>
                  <p className="text-xs text-gray-600">December 5 • Delivered 12:15 PM</p>
                </div>
              </div>
              <span className="text-xs font-medium text-green-600">Delivered</span>
            </div>
          </div>

          {/* Order 2 */}
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-10 h-10 bg-green-50 rounded">
                  <Package className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Buddha Bowl</p>
                  <p className="text-xs text-gray-600">December 4 • Delivered 12:22 PM</p>
                </div>
              </div>
              <span className="text-xs font-medium text-green-600">Delivered</span>
            </div>
          </div>

          {/* Order 3 */}
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-10 h-10 bg-green-50 rounded">
                  <Package className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Grilled Chicken Bowl</p>
                  <p className="text-xs text-gray-600">December 3 • Delivered 12:18 PM</p>
                </div>
              </div>
              <span className="text-xs font-medium text-green-600">Delivered</span>
            </div>
          </div>
        </div>

        <button className="w-full mt-4 text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center justify-center gap-1">
          View All Orders
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Account Info */}
      <div className="bg-white border border-gray-200 rounded-lg p-5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-1">
              Account Balance
            </h3>
            <p className="text-xs text-gray-600">
              Company-funded program • No payment required
            </p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-semibold text-gray-900">$0.00</p>
            <p className="text-xs text-gray-500">Due today</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeHome;
