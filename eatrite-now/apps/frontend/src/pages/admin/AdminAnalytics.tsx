import React, { useState, useEffect } from 'react';
import {
  Users,
  ShoppingBag,
  Truck,
  Heart,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Calendar,
  BarChart3,
  Activity,
  Clock,
  CheckCircle,
  CloudOff,
  FileQuestion,
  ArrowRight
} from 'lucide-react';

/**
 * ADMIN ANALYTICS PAGE - EatRite Work
 * 
 * Purpose: Comprehensive analytics across 5 key dimensions
 * State Management: Loading, Error, Empty, and Success states
 */

type LoadingState = 'idle' | 'loading' | 'success' | 'error';
type TabId = 'engagement' | 'orders' | 'delivery' | 'wellness' | 'roi';

const AdminAnalytics: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabId>('engagement');
  const [loadingState, setLoadingState] = useState<LoadingState>('loading');
  const [hasInsufficientData, setHasInsufficientData] = useState(false);

  // Simulate API call
  useEffect(() => {
    const loadAnalytics = async () => {
      setLoadingState('loading');
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const shouldError = false;
      const shouldShowEmpty = false;
      
      if (shouldError) {
        setLoadingState('error');
      } else if (shouldShowEmpty) {
        setHasInsufficientData(true);
        setLoadingState('success');
      } else {
        setHasInsufficientData(false);
        setLoadingState('success');
      }
    };

    loadAnalytics();
  }, [activeTab]);

  const handleRetry = () => {
    setLoadingState('loading');
    setTimeout(() => {
      setLoadingState('success');
      setHasInsufficientData(false);
    }, 800);
  };

  // Shared Components
  const renderHeader = () => (
    <div className="mb-6">
      <h1 className="text-3xl font-bold text-gray-900">Analytics & Insights</h1>
      <p className="text-gray-500 mt-1">
        Comprehensive program metrics across engagement, orders, delivery, wellness, and ROI
      </p>
    </div>
  );

  const renderTabs = () => {
    const tabs = [
      { id: 'engagement' as TabId, label: 'Engagement', icon: Users },
      { id: 'orders' as TabId, label: 'Orders', icon: ShoppingBag },
      { id: 'delivery' as TabId, label: 'Delivery', icon: Truck },
      { id: 'wellness' as TabId, label: 'Wellness', icon: Heart },
      { id: 'roi' as TabId, label: 'ROI', icon: DollarSign }
    ];

    return (
      <div className="border-b border-gray-200 mb-6">
        <div className="flex space-x-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-3 border-b-2 font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  const renderDateFilter = () => (
    <div className="flex items-center justify-end space-x-3 mb-6">
      <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
        <Calendar className="w-5 h-5 text-gray-700" />
        <span className="text-gray-700 font-medium">Last 30 Days</span>
      </button>
    </div>
  );

  // LOADING STATE
  if (loadingState === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          {renderHeader()}
          {renderTabs()}
          {renderDateFilter()}

          <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
            <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-4"></div>
            <div className="h-80 bg-gray-100 rounded-lg animate-pulse"></div>
          </div>

          <div className="grid grid-cols-3 gap-6 mb-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <div className="h-5 w-32 bg-gray-200 rounded animate-pulse"></div>
                  <div className="w-10 h-10 bg-gray-100 rounded-lg animate-pulse"></div>
                </div>
                <div className="h-8 w-24 bg-gray-200 rounded animate-pulse mb-2"></div>
                <div className="h-4 w-20 bg-gray-100 rounded animate-pulse"></div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gray-100 rounded-lg animate-pulse"></div>
              <div className="h-6 w-40 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="space-y-2">
              <div className="h-4 w-full bg-gray-100 rounded animate-pulse"></div>
              <div className="h-4 w-5/6 bg-gray-100 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ERROR STATE
  if (loadingState === 'error') {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          {renderHeader()}
          {renderTabs()}

          <div className="bg-white rounded-xl p-12 shadow-sm text-center">
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-gray-100 rounded-full">
                <CloudOff className="w-12 h-12 text-gray-400" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Analytics data unavailable
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              We're having trouble loading {activeTab} analytics right now. 
              Your data is still being tracked and will be available soon.
            </p>
            <div className="flex items-center justify-center space-x-3">
              <button
                onClick={handleRetry}
                className="px-6 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                Retry
              </button>
              <button
                onClick={() => {
                  const tabs: TabId[] = ['engagement', 'orders', 'delivery', 'wellness', 'roi'];
                  const currentIndex = tabs.indexOf(activeTab);
                  const nextTab = tabs[(currentIndex + 1) % tabs.length];
                  setActiveTab(nextTab);
                }}
                className="px-6 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                View Other Analytics
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // EMPTY STATE
  if (loadingState === 'success' && hasInsufficientData) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          {renderHeader()}
          {renderTabs()}

          <div className="bg-white rounded-xl p-12 shadow-sm text-center">
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-blue-50 rounded-full">
                <FileQuestion className="w-12 h-12 text-blue-500" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Collecting data...
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Analytics will populate as your team uses the program. We need a few days 
              of activity to generate meaningful {activeTab} insights.
            </p>
            <button
              onClick={() => window.location.href = '/admin/home'}
              className="px-6 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium inline-flex items-center space-x-2"
            >
              <span>View Program Overview</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // SUCCESS STATE - Tab Content
  const renderTabContent = () => {
    if (activeTab === 'engagement') {
      return (
        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Daily Active Users</h3>
            <div className="h-80 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="w-16 h-16 mx-auto mb-3 text-gray-400" />
                <p className="text-sm text-gray-600 font-medium">Line chart: Daily active users</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-gray-500">Active Users</span>
                <Users className="w-10 h-10 text-green-100 bg-green-50 p-2 rounded-lg" />
              </div>
              <p className="text-3xl font-bold text-gray-900">127</p>
              <div className="flex items-center mt-2 text-green-600 text-sm">
                <TrendingUp className="w-4 h-4 mr-1" />
                <span>+12% from last week</span>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-gray-500">Engagement Rate</span>
                <Activity className="w-10 h-10 text-blue-100 bg-blue-50 p-2 rounded-lg" />
              </div>
              <p className="text-3xl font-bold text-gray-900">73%</p>
              <div className="flex items-center mt-2 text-green-600 text-sm">
                <TrendingUp className="w-4 h-4 mr-1" />
                <span>+5% from last week</span>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-gray-500">Avg. Session Time</span>
                <Clock className="w-10 h-10 text-purple-100 bg-purple-50 p-2 rounded-lg" />
              </div>
              <p className="text-3xl font-bold text-gray-900">4.2m</p>
              <div className="flex items-center mt-2 text-gray-500 text-sm">
                <span>Stable</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-200">
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-white rounded-lg">
                <Activity className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">📈 Engagement Trending Up</h4>
                <p className="text-gray-700">
                  Your team's engagement has increased 12% this week.
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (activeTab === 'orders') {
      return (
        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Volume Trends</h3>
            <div className="h-80 bg-gradient-to-br from-green-50 to-yellow-50 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="w-16 h-16 mx-auto mb-3 text-gray-400" />
                <p className="text-sm text-gray-600 font-medium">Bar chart: Orders per day</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-gray-500">Total Orders</span>
                <ShoppingBag className="w-10 h-10 text-green-100 bg-green-50 p-2 rounded-lg" />
              </div>
              <p className="text-3xl font-bold text-gray-900">1,247</p>
              <div className="flex items-center mt-2 text-green-600 text-sm">
                <TrendingUp className="w-4 h-4 mr-1" />
                <span>+18% from last month</span>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-gray-500">Avg. Order Value</span>
                <DollarSign className="w-10 h-10 text-blue-100 bg-blue-50 p-2 rounded-lg" />
              </div>
              <p className="text-3xl font-bold text-gray-900">$14.50</p>
              <div className="flex items-center mt-2 text-gray-500 text-sm">
                <span>Stable</span>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-gray-500">Repeat Rate</span>
                <CheckCircle className="w-10 h-10 text-purple-100 bg-purple-50 p-2 rounded-lg" />
              </div>
              <p className="text-3xl font-bold text-gray-900">82%</p>
              <div className="flex items-center mt-2 text-green-600 text-sm">
                <TrendingUp className="w-4 h-4 mr-1" />
                <span>+7% from last month</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-200">
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-white rounded-lg">
                <ShoppingBag className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">🍽️ Popular Meals</h4>
                <p className="text-gray-700">
                  82% of employees reorder their favorite meals weekly.
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (activeTab === 'delivery') {
      return (
        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Delivery Performance</h3>
            <div className="h-80 bg-gradient-to-br from-orange-50 to-red-50 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="w-16 h-16 mx-auto mb-3 text-gray-400" />
                <p className="text-sm text-gray-600 font-medium">Line chart: On-time delivery rate</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-gray-500">On-Time Rate</span>
                <Truck className="w-10 h-10 text-green-100 bg-green-50 p-2 rounded-lg" />
              </div>
              <p className="text-3xl font-bold text-gray-900">94%</p>
              <div className="flex items-center mt-2 text-green-600 text-sm">
                <TrendingUp className="w-4 h-4 mr-1" />
                <span>+3% from last month</span>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-gray-500">Avg. Delivery Time</span>
                <Clock className="w-10 h-10 text-blue-100 bg-blue-50 p-2 rounded-lg" />
              </div>
              <p className="text-3xl font-bold text-gray-900">32min</p>
              <div className="flex items-center mt-2 text-green-600 text-sm">
                <TrendingDown className="w-4 h-4 mr-1" />
                <span>-4min improvement</span>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-gray-500">Satisfaction Score</span>
                <CheckCircle className="w-10 h-10 text-purple-100 bg-purple-50 p-2 rounded-lg" />
              </div>
              <p className="text-3xl font-bold text-gray-900">4.8</p>
              <div className="flex items-center mt-2 text-gray-500 text-sm">
                <span>Out of 5.0</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-200">
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-white rounded-lg">
                <Truck className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">🚚 Excellent Performance</h4>
                <p className="text-gray-700">
                  Your delivery partner maintains a 94% on-time rate.
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (activeTab === 'wellness') {
      return (
        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Nutritional Balance</h3>
            <div className="h-80 bg-gradient-to-br from-pink-50 to-red-50 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="w-16 h-16 mx-auto mb-3 text-gray-400" />
                <p className="text-sm text-gray-600 font-medium">Stacked area chart: Macro distribution</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-gray-500">Healthy Choices</span>
                <Heart className="w-10 h-10 text-green-100 bg-green-50 p-2 rounded-lg" />
              </div>
              <p className="text-3xl font-bold text-gray-900">76%</p>
              <div className="flex items-center mt-2 text-green-600 text-sm">
                <TrendingUp className="w-4 h-4 mr-1" />
                <span>+9% from last month</span>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-gray-500">Avg. Calories</span>
                <Activity className="w-10 h-10 text-blue-100 bg-blue-50 p-2 rounded-lg" />
              </div>
              <p className="text-3xl font-bold text-gray-900">520</p>
              <div className="flex items-center mt-2 text-gray-500 text-sm">
                <span>Per meal</span>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-gray-500">Protein Intake</span>
                <CheckCircle className="w-10 h-10 text-purple-100 bg-purple-50 p-2 rounded-lg" />
              </div>
              <p className="text-3xl font-bold text-gray-900">32g</p>
              <div className="flex items-center mt-2 text-green-600 text-sm">
                <span>Above recommended</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-200">
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-white rounded-lg">
                <Heart className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">💚 Wellness Improving</h4>
                <p className="text-gray-700">
                  76% of meals ordered are classified as healthy.
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (activeTab === 'roi') {
      return (
        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Program ROI</h3>
            <div className="h-80 bg-gradient-to-br from-green-50 to-teal-50 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="w-16 h-16 mx-auto mb-3 text-gray-400" />
                <p className="text-sm text-gray-600 font-medium">Line chart: Cost savings vs. investment</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-gray-500">Monthly Investment</span>
                <DollarSign className="w-10 h-10 text-green-100 bg-green-50 p-2 rounded-lg" />
              </div>
              <p className="text-3xl font-bold text-gray-900">$8,200</p>
              <div className="flex items-center mt-2 text-gray-500 text-sm">
                <span>Program costs</span>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-gray-500">Est. Savings</span>
                <TrendingUp className="w-10 h-10 text-blue-100 bg-blue-50 p-2 rounded-lg" />
              </div>
              <p className="text-3xl font-bold text-gray-900">$12,400</p>
              <div className="flex items-center mt-2 text-green-600 text-sm">
                <span>Productivity gains</span>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-gray-500">Net ROI</span>
                <CheckCircle className="w-10 h-10 text-purple-100 bg-purple-50 p-2 rounded-lg" />
              </div>
              <p className="text-3xl font-bold text-gray-900">151%</p>
              <div className="flex items-center mt-2 text-green-600 text-sm">
                <TrendingUp className="w-4 h-4 mr-1" />
                <span>Positive return</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-200">
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-white rounded-lg">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">💰 Strong ROI Performance</h4>
                <p className="text-gray-700">
                  For every $1 invested, you're seeing $1.51 in returns.
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {renderHeader()}
        {renderTabs()}
        {renderDateFilter()}
        {renderTabContent()}
      </div>
    </div>
  );
};

export default AdminAnalytics;
