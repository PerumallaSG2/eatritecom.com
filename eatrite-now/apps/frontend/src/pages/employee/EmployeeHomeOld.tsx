import React, { useState, useEffect } from 'react';
import { 
  Flame, 
  TrendingUp, 
  Calendar, 
  Package, 
  Heart,
  ArrowRight,
  Clock,
  MapPin,
  Plus,
  CloudOff,
  Sparkles
} from 'lucide-react';
import { usePreview } from '../../context/PreviewContext';

/**
 * EMPLOYEE HOME PAGE - EatRite Work (Cincinnati)
 * 
 * Purpose: Daily landing page showing wellness progress, upcoming meals, and personalized recommendations.
 * 
 * Main Question: "What should I eat today, and how am I doing with my wellness goals?"
 * 
 * This page is the primary entry point for employees using the EatRite Work meal program.
 * It provides a calm, motivating view of their wellness journey and makes ordering meals easy.
 * 
 * TODO: Connect to real user data API
 * TODO: Wire up wellness score calculations
 * TODO: Implement meal recommendation engine
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
      ? (preview.state === 'empty' ? 'success' : preview.state) // Map 'empty' to 'success' with isNewUser flag
      : loadingState;

  // Handle preview empty state by setting isNewUser flag
  const resolvedIsNewUser = 
    preview.enabled && preview.page === 'employee-home' && preview.state === 'empty'
      ? true
      : isNewUser;

  // TODO: Replace with real user data from context/API
  const userName = "Sarah";
  const currentHour = new Date().getHours();
  
  // Get time-of-day greeting
  const getGreeting = () => {
    if (currentHour < 12) return "Good morning";
    if (currentHour < 17) return "Good afternoon";
    return "Good evening";
  };

  // Simulate API call for dashboard data
  useEffect(() => {
    const loadDashboardData = async () => {
      setLoadingState('loading');
      
      // TODO: Replace with actual API call
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Simulate different states for testing
      // Change these values to test different states:
      const shouldError = false; // Set to true to test error state
      const shouldShowEmpty = false; // Set to true to test empty/new user state
      
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

    loadDashboardData();
  }, []);

  const handleRetry = () => {
    setLoadingState('loading');
    // Re-trigger the load
    setTimeout(() => {
      setLoadingState('success');
    }, 800);
  };

  // LOADING STATE
  if (resolvedState === 'loading') {
    return (
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Welcome Section Skeleton */}
        <div className="flex items-center justify-between">
          <div className="space-y-3">
            <div className="h-9 w-64 bg-gray-200 rounded animate-pulse" />
            <div className="h-5 w-80 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>

        {/* Wellness Score + Plan Status Skeletons */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Wellness Score Skeleton */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-6">
              <div className="space-y-2">
                <div className="h-6 w-40 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-48 bg-gray-200 rounded animate-pulse" />
              </div>
            </div>
            <div className="flex items-center justify-center mb-6">
              <div className="w-32 h-32 rounded-full bg-gray-200 animate-pulse" />
            </div>
            <div className="h-20 bg-gray-100 rounded-lg mb-4 animate-pulse" />
            <div className="h-10 bg-gray-200 rounded-lg animate-pulse" />
          </div>

          {/* Plan Status Skeleton */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-6">
              <div className="space-y-2">
                <div className="h-6 w-32 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
              </div>
            </div>
            <div className="mb-6">
              <div className="flex items-baseline justify-between mb-2">
                <div className="h-10 w-12 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 animate-pulse" />
            </div>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-100 rounded-lg p-3 h-16 animate-pulse" />
              <div className="bg-gray-100 rounded-lg p-3 h-16 animate-pulse" />
            </div>
            <div className="h-12 bg-gray-200 rounded-lg animate-pulse" />
          </div>
        </div>

        {/* Recommended Meals Skeleton */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div className="space-y-2">
              <div className="h-8 w-96 bg-gray-200 rounded animate-pulse" />
              <div className="h-5 w-80 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="h-48 bg-gray-200 animate-pulse" />
                <div className="p-5 space-y-4">
                  <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
                  <div className="flex gap-2">
                    <div className="h-6 w-20 bg-gray-200 rounded-full animate-pulse" />
                    <div className="h-6 w-16 bg-gray-200 rounded-full animate-pulse" />
                  </div>
                  <div className="h-10 bg-gray-200 rounded-lg animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Delivery Skeleton */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-start justify-between mb-6">
            <div className="space-y-2">
              <div className="h-6 w-40 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gray-200 rounded-lg animate-pulse" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                    <div className="h-5 w-40 bg-gray-200 rounded animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
            <div className="space-y-3">
              <div className="h-5 w-48 bg-gray-200 rounded animate-pulse" />
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-16 bg-gray-100 rounded-lg animate-pulse" />
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions Skeleton */}
        <div>
          <div className="h-7 w-32 bg-gray-200 rounded animate-pulse mb-4" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-xl p-6 opacity-50">
                <div className="w-12 h-12 bg-gray-200 rounded-lg mb-4 animate-pulse" />
                <div className="h-6 w-3/4 bg-gray-200 rounded mb-2 animate-pulse" />
                <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ERROR STATE
  if (resolvedState === 'error') {
    return (
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-center min-h-[600px]">
          <div className="max-w-md w-full text-center" role="alert">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-6">
              <CloudOff className="w-8 h-8 text-gray-400" />
            </div>
            
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              We're having trouble loading your dashboard
            </h2>
            
            <p className="text-gray-600 mb-8">
              Your data is safe. This usually resolves in a moment.
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

  // EMPTY STATE (New User)
  if (resolvedIsNewUser) {
    return (
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-center min-h-[600px]">
          <div className="max-w-md w-full text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-50 rounded-full mb-6">
              <Sparkles className="w-8 h-8 text-primary-600" />
            </div>
            
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              Welcome to EatRite Work!
            </h2>
            
            <p className="text-gray-600 mb-8">
              You're all set. Start exploring fresh, healthy meals prepared by local Cincinnati chefs.
            </p>
            
            <button
              onClick={() => {/* TODO: Navigate to meals page */}}
              className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors inline-flex items-center gap-2"
            >
              Browse Meals
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // SUCCESS STATE (Normal Dashboard View)
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Section 1: Welcome Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {getGreeting()}, {userName}
          </h1>
          <div className="flex items-center gap-2 mt-2">
            <Flame className="w-5 h-5 text-orange-500" />
            <p className="text-gray-600">
              You're on a <span className="font-semibold text-orange-600">12-day streak</span> — keep it going!
            </p>
          </div>
        </div>
      </div>

      {/* Section 2 & 3: Wellness Score + Plan Status (Side by Side) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Wellness Score Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Your Wellness Score</h2>
              <p className="text-sm text-gray-500 mt-1">Based on your meal choices</p>
            </div>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>

          {/* Circular Progress Indicator - Placeholder */}
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <div className="w-32 h-32 rounded-full border-8 border-gray-100 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary-600">87</div>
                  <div className="text-sm text-gray-500">out of 100</div>
                </div>
              </div>
              {/* TODO: Add actual circular progress SVG */}
            </div>
          </div>

          <div className="bg-green-50 rounded-lg p-4 mb-4">
            <p className="text-sm text-green-800 font-medium">
              Great! You're consistently choosing balanced, nutritious meals.
            </p>
          </div>

          <button className="w-full text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center justify-center gap-2 py-2 hover:bg-primary-50 rounded-lg transition-colors">
            View Detailed Report
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Plan Status Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Your Plan Status</h2>
              <p className="text-sm text-gray-500 mt-1">This month</p>
            </div>
            <Heart className="w-5 h-5 text-primary-500" />
          </div>

          {/* Meals Remaining */}
          <div className="mb-6">
            <div className="flex items-baseline justify-between mb-2">
              <span className="text-3xl font-bold text-gray-900">8</span>
              <span className="text-sm text-gray-500">of 15 meals remaining</span>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
              <div 
                className="bg-primary-500 h-full rounded-full transition-all duration-500"
                style={{ width: '47%' }}
              />
            </div>
          </div>

          {/* Usage Stats */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="text-2xl font-bold text-gray-900">7</div>
              <div className="text-xs text-gray-500 mt-1">Meals ordered</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="text-2xl font-bold text-gray-900">12</div>
              <div className="text-xs text-gray-500 mt-1">Days left</div>
            </div>
          </div>

          <button className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 rounded-lg transition-colors flex items-center justify-center gap-2">
            Browse Meals
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Section 4: Recommended Meals */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Recommended Cincinnati Meals for You</h2>
            <p className="text-gray-600 mt-1">Based on your preferences and wellness goals</p>
          </div>
          <button className="text-primary-600 hover:text-primary-700 font-medium text-sm flex items-center gap-2">
            View All
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Meal Card 1 */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            {/* Meal Image Placeholder */}
            <div className="h-48 bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <Package className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p className="text-sm">Meal Image</p>
              </div>
            </div>

            {/* Meal Info */}
            <div className="p-5">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-gray-900 text-lg">Cincinnati Chili Bowl</h3>
                <span className="text-sm font-medium text-gray-600">520 cal</span>
              </div>

              <p className="text-sm text-gray-600 mb-4">
                Local favorite with quinoa, beans, and fresh vegetables
              </p>

              {/* Diet Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                  High Protein
                </span>
                <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                  Local
                </span>
              </div>

              {/* Add Button */}
              <button className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2">
                <Plus className="w-4 h-4" />
                Add to Cart
              </button>
            </div>
          </div>

          {/* Meal Card 2 */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            <div className="h-48 bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <Package className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p className="text-sm">Meal Image</p>
              </div>
            </div>

            <div className="p-5">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-gray-900 text-lg">Grilled Salmon Bowl</h3>
                <span className="text-sm font-medium text-gray-600">485 cal</span>
              </div>

              <p className="text-sm text-gray-600 mb-4">
                Fresh Atlantic salmon with roasted vegetables and quinoa
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">
                  Omega-3
                </span>
                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                  Heart Healthy
                </span>
              </div>

              <button className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2">
                <Plus className="w-4 h-4" />
                Add to Cart
              </button>
            </div>
          </div>

          {/* Meal Card 3 */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            <div className="h-48 bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <Package className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p className="text-sm">Meal Image</p>
              </div>
            </div>

            <div className="p-5">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-gray-900 text-lg">Mediterranean Chicken</h3>
                <span className="text-sm font-medium text-gray-600">450 cal</span>
              </div>

              <p className="text-sm text-gray-600 mb-4">
                Herb-marinated chicken with couscous and seasonal veggies
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                  Lean Protein
                </span>
                <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-medium rounded-full">
                  Balanced
                </span>
              </div>

              <button className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2">
                <Plus className="w-4 h-4" />
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Section 5: Upcoming Delivery */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Upcoming Delivery</h2>
            <p className="text-sm text-gray-500 mt-1">Your next meal delivery</p>
          </div>
          <div className="px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full">
            On Track
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Delivery Info */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <div className="text-sm text-gray-500">Scheduled for</div>
                <div className="font-semibold text-gray-900">Monday, December 2</div>
              </div>
            </div>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div className="text-sm text-gray-500">Delivery window</div>
                <div className="font-semibold text-gray-900">2:00 PM - 4:00 PM</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <MapPin className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <div className="text-sm text-gray-500">Location</div>
                <div className="font-semibold text-gray-900">Cincinnati, OH</div>
              </div>
            </div>
          </div>

          {/* Meals in Delivery */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Meals in this delivery (3)</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-lg flex-shrink-0"></div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-gray-900 text-sm truncate">Cincinnati Chili Bowl</div>
                  <div className="text-xs text-gray-500">High Protein</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-orange-200 rounded-lg flex-shrink-0"></div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-gray-900 text-sm truncate">Grilled Salmon Bowl</div>
                  <div className="text-xs text-gray-500">Heart Healthy</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg flex-shrink-0"></div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-gray-900 text-sm truncate">Mediterranean Chicken</div>
                  <div className="text-xs text-gray-500">Balanced</div>
                </div>
              </div>
            </div>

            <button className="w-full mt-4 text-primary-600 hover:text-primary-700 font-medium text-sm flex items-center justify-center gap-2 py-2 hover:bg-primary-50 rounded-lg transition-colors">
              Track Delivery
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Section 6: Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="bg-white hover:bg-gray-50 border border-gray-200 rounded-xl p-6 text-left transition-colors group">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary-200 transition-colors">
              <Package className="w-6 h-6 text-primary-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Browse All Meals</h3>
            <p className="text-sm text-gray-600">
              Explore our full menu of Cincinnati meals
            </p>
          </button>

          <button className="bg-white hover:bg-gray-50 border border-gray-200 rounded-xl p-6 text-left transition-colors group">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors">
              <Calendar className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">View Orders</h3>
            <p className="text-sm text-gray-600">
              Track your order history and deliveries
            </p>
          </button>

          <button className="bg-white hover:bg-gray-50 border border-gray-200 rounded-xl p-6 text-left transition-colors group">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-200 transition-colors">
              <Heart className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Update Preferences</h3>
            <p className="text-sm text-gray-600">
              Manage dietary preferences and settings
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeHome;
