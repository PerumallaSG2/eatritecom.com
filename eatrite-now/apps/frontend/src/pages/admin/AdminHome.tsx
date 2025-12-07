import React, { useState, useEffect } from 'react';
import { 
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  CheckCircle,
  Calendar,
  Building2,
  BarChart3,
  FileText,
  UserPlus,
  Settings,
  ArrowRight,
  CloudOff,
  Sparkles,
  Package
} from 'lucide-react';

/**
 * PROGRAM DASHBOARD - Enterprise Control Center
 * 
 * Purpose: Operational dashboard for HR and Finance leaders to monitor meal program health,
 * track costs, and identify issues requiring attention.
 * 
 * Key Metrics: Program status, employee participation, spend tracking, delivery success rate
 * 
 * Design: B2B enterprise interface - neutral, data-focused, no promotional content
 * 
 * TODO: Connect to company analytics API
 * TODO: Implement date range filtering
 * TODO: Add export/reporting functionality
 */

type LoadingState = 'idle' | 'loading' | 'success' | 'error';

const AdminHome: React.FC = () => {
  const [loadingState, setLoadingState] = useState<LoadingState>('loading');
  const [isProgramEmpty, setIsProgramEmpty] = useState(false);

  // Remove greeting - too consumer-focused
  // const currentHour = new Date().getHours();
  // const greeting = currentHour < 12 ? 'Good morning' : currentHour < 18 ? 'Good afternoon' : 'Good evening';

  // Simulate API call for dashboard data
  useEffect(() => {
    const loadDashboard = async () => {
      setLoadingState('loading');
      
      // TODO: Replace with actual API call
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 700));
      
      // Simulate different states for testing
      // Change these values to test different states:
      const shouldError = false; // Set to true to test error state
      const shouldShowEmpty = false; // Set to true to test empty/new program state
      
      if (shouldError) {
        setLoadingState('error');
      } else if (shouldShowEmpty) {
        setIsProgramEmpty(true);
        setLoadingState('success');
      } else {
        setIsProgramEmpty(false);
        setLoadingState('success');
      }
    };

    loadDashboard();
  }, []);

  const handleRetry = () => {
    setLoadingState('loading');
    setTimeout(() => {
      setLoadingState('success');
      setIsProgramEmpty(false);
    }, 700);
  };

  // Shared components
  const renderHeader = () => (
    <div className="flex items-start justify-between">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          Program Dashboard
        </h1>
        <p className="text-sm text-gray-600 mt-1">
          Cincinnati Manufacturing Co. • 247 Active Employees
        </p>
      </div>
      
      {/* Date Range Selector (Visual Only) */}
      <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
        <Calendar className="w-4 h-4 text-gray-600" />
        <span className="text-sm font-medium text-gray-700">Last 30 Days</span>
      </button>
    </div>
  );

  const renderQuickActions = () => (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-base font-semibold text-gray-900 mb-4">
        Quick Actions
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Action 1 */}
        <button className="bg-white hover:bg-gray-50 border border-gray-200 rounded-lg p-5 text-left transition-all hover:shadow-sm group">
          <div className="flex items-start justify-between mb-3">
            <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
              <FileText className="w-5 h-5 text-blue-600" />
            </div>
            <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
          </div>
          <h3 className="font-medium text-gray-900 mb-1">View Analytics</h3>
          <p className="text-sm text-gray-600">
            Generate reports and export data
          </p>
        </button>

        {/* Action 2 */}
        <button className="bg-white hover:bg-gray-50 border border-gray-200 rounded-lg p-5 text-left transition-all hover:shadow-sm group">
          <div className="flex items-start justify-between mb-3">
            <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-gray-200 transition-colors">
              <UserPlus className="w-5 h-5 text-gray-700" />
            </div>
            <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-gray-700 transition-colors" />
          </div>
          <h3 className="font-medium text-gray-900 mb-1">Manage Employees</h3>
          <p className="text-sm text-gray-600">
            Add or update employee access
          </p>
        </button>

        {/* Action 3 */}
        <button className="bg-white hover:bg-gray-50 border border-gray-200 rounded-lg p-5 text-left transition-all hover:shadow-sm group">
          <div className="flex items-start justify-between mb-3">
            <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-gray-200 transition-colors">
              <Settings className="w-5 h-5 text-gray-700" />
            </div>
            <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-gray-700 transition-colors" />
          </div>
          <h3 className="font-medium text-gray-900 mb-1">Program Settings</h3>
          <p className="text-sm text-gray-600">
            Configure budgets and policies
          </p>
        </button>
      </div>
    </div>
  );

  // LOADING STATE
  if (loadingState === 'loading') {
    return (
      <div className="max-w-7xl mx-auto space-y-8">
        {renderHeader()}

        {/* KPI Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 bg-gray-200 rounded-lg animate-pulse" />
                <div className="h-5 w-12 bg-gray-200 rounded animate-pulse" />
              </div>
              <div className="h-8 w-16 bg-gray-200 rounded animate-pulse mb-2" />
              <div className="h-4 w-32 bg-gray-200 rounded animate-pulse mb-2" />
              <div className="h-3 w-28 bg-gray-200 rounded animate-pulse" />
            </div>
          ))}
        </div>

        {/* Quick Insights Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[1, 2].map((i) => (
            <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="space-y-2 flex-1">
                  <div className="h-6 w-40 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 w-48 bg-gray-200 rounded animate-pulse" />
                </div>
                <div className="w-5 h-5 bg-gray-200 rounded animate-pulse" />
              </div>
              <div className="h-48 bg-gray-100 rounded-lg animate-pulse mb-6" />
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200">
                {[1, 2, 3].map((j) => (
                  <div key={j} className="space-y-2">
                    <div className="h-3 w-20 bg-gray-200 rounded animate-pulse" />
                    <div className="h-6 w-12 bg-gray-200 rounded animate-pulse" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Department Cards Skeleton */}
        <div>
          <div className="h-7 w-48 bg-gray-200 rounded animate-pulse mb-4" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="h-5 w-24 bg-gray-200 rounded animate-pulse" />
                  <div className="h-6 w-20 bg-gray-200 rounded-full animate-pulse" />
                </div>
                <div className="space-y-3 mb-4">
                  {[1, 2, 3].map((j) => (
                    <div key={j} className="flex items-center justify-between">
                      <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
                      <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
                    </div>
                  ))}
                </div>
                <div className="h-2 bg-gray-200 rounded-full animate-pulse mb-3" />
                <div className="h-3 w-full bg-gray-200 rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions - Always Visible */}
        {renderQuickActions()}
      </div>
    );
  }

  // ERROR STATE
  if (loadingState === 'error') {
    return (
      <div className="max-w-7xl mx-auto space-y-8">
        {renderHeader()}

        {/* Error Message */}
        <div className="flex items-center justify-center min-h-[500px]">
          <div className="max-w-md w-full text-center" role="alert">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-6">
              <CloudOff className="w-8 h-8 text-gray-400" />
            </div>
            
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Unable to load dashboard data
            </h2>
            
            <p className="text-sm text-gray-600 mb-6">
              Your program data is safe. Please try again in a moment.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={handleRetry}
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
              >
                Retry
              </button>
              <button
                onClick={() => {/* TODO: Navigate to employees page */}}
                className="px-6 py-2.5 text-blue-600 hover:text-blue-700 text-sm font-medium hover:bg-blue-50 rounded-lg transition-colors"
              >
                Manage Employees
              </button>
            </div>
          </div>
        </div>

        {/* Quick Actions - Always Visible */}
        {renderQuickActions()}
      </div>
    );
  }

  // EMPTY STATE (New Program - No Employees Yet)
  if (isProgramEmpty) {
    return (
      <div className="max-w-7xl mx-auto space-y-8">
        {renderHeader()}

        {/* Empty State Message */}
        <div className="flex items-center justify-center min-h-[500px]">
          <div className="max-w-md w-full text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-50 rounded-full mb-6">
              <Sparkles className="w-8 h-8 text-blue-600" />
            </div>
            
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Program configured
            </h2>
            
            <p className="text-sm text-gray-600 mb-6">
              Add employees to begin tracking program metrics and engagement.
            </p>
            
            <button
              onClick={() => {/* TODO: Navigate to employees page */}}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors inline-flex items-center gap-2"
            >
              <UserPlus className="w-4 h-4" />
              Add Employees
            </button>
          </div>
        </div>

        {/* Quick Actions - Always Visible */}
        {renderQuickActions()}
      </div>
    );
  }

  // SUCCESS STATE (Normal Dashboard View)
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {renderHeader()}

      {/* Program Status Banner */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 bg-green-100 rounded-full">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Operational</p>
              <p className="text-xs text-gray-600">Last 30 days • No issues detected</p>
            </div>
          </div>
          <p className="text-xs text-gray-500">Updated 2 min ago</p>
        </div>
      </div>

      {/* Section 2: KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI Card 1: Active Employees */}
        <div className="bg-white rounded-lg border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="p-1.5 bg-gray-100 rounded-lg">
              <Users className="w-5 h-5 text-gray-700" />
            </div>
            <span className="flex items-center gap-1 text-xs font-medium text-green-600">
              <TrendingUp className="w-3.5 h-3.5" />
              12%
            </span>
          </div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-0.5">
            247
          </h3>
          <p className="text-sm text-gray-600 mb-1">
            Active Employees
          </p>
          <p className="text-xs text-gray-500">
            89% participation rate
          </p>
        </div>

        {/* KPI Card 2: Weekly Orders */}
        <div className="bg-white rounded-lg border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="p-1.5 bg-gray-100 rounded-lg">
              <Package className="w-5 h-5 text-gray-700" />
            </div>
            <span className="flex items-center gap-1 text-xs font-medium text-green-600">
              <TrendingUp className="w-3.5 h-3.5" />
              8%
            </span>
          </div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-0.5">
            1,834
          </h3>
          <p className="text-sm text-gray-600 mb-1">
            Meals Delivered
          </p>
          <p className="text-xs text-gray-500">
            Last 30 days
          </p>
        </div>

        {/* KPI Card 3: Program Spend */}
        <div className="bg-white rounded-lg border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="p-1.5 bg-gray-100 rounded-lg">
              <DollarSign className="w-5 h-5 text-gray-700" />
            </div>
            <span className="flex items-center gap-1 text-xs font-medium text-gray-600">
              <TrendingDown className="w-3.5 h-3.5" />
              3%
            </span>
          </div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-0.5">
            $47,820
          </h3>
          <p className="text-sm text-gray-600 mb-1">
            Total Program Cost
          </p>
          <p className="text-xs text-gray-500">
            $12.3K under budget
          </p>
        </div>

        {/* KPI Card 4: Delivery Success */}
        <div className="bg-white rounded-lg border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="p-1.5 bg-gray-100 rounded-lg">
              <CheckCircle className="w-5 h-5 text-gray-700" />
            </div>
            <span className="flex items-center gap-1 text-xs font-medium text-green-600">
              <TrendingUp className="w-3.5 h-3.5" />
              2%
            </span>
          </div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-0.5">
            98.2%
          </h3>
          <p className="text-sm text-gray-600 mb-1">
            Delivery Success Rate
          </p>
          <p className="text-xs text-gray-500">
            1,801 of 1,834 on-time
          </p>
        </div>
      </div>

      {/* Requires Attention Section */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <div className="flex items-center justify-center w-5 h-5 bg-amber-100 rounded-full mt-0.5">
            <span className="text-xs font-bold text-amber-700">!</span>
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-medium text-gray-900 mb-2">Requires Attention</h3>
            <ul className="space-y-1.5">
              <li className="text-sm text-gray-700">• Budget review due December 15</li>
              <li className="text-sm text-gray-700">• 12 employees pending dietary profile completion</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Section 3: Analytics Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Left: Participation Trend Placeholder */}
        <div className="bg-white rounded-lg border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-medium text-gray-900">
                Participation Trend
              </h3>
              <p className="text-xs text-gray-600 mt-0.5">
                Weekly order volume
              </p>
            </div>
            <BarChart3 className="w-4 h-4 text-gray-400" />
          </div>

          {/* Chart Placeholder Area */}
          <div className="h-40 bg-gray-50 rounded border border-dashed border-gray-300 flex items-center justify-center">
            <div className="text-center">
              <BarChart3 className="w-10 h-10 mx-auto mb-2 text-gray-400" />
              <p className="text-xs text-gray-600 font-medium">
                Chart visualization
              </p>
              <p className="text-xs text-gray-500 mt-0.5">
                TODO: Integrate charting library
              </p>
            </div>
          </div>

          {/* Summary Stats Below Chart */}
          <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-gray-200">
            <div>
              <p className="text-xs text-gray-600 mb-0.5">Avg Weekly</p>
              <p className="text-base font-semibold text-gray-900">287</p>
            </div>
            <div>
              <p className="text-xs text-gray-600 mb-0.5">Peak Week</p>
              <p className="text-base font-semibold text-gray-900">341</p>
            </div>
            <div>
              <p className="text-xs text-gray-600 mb-0.5">Growth</p>
              <p className="text-base font-semibold text-green-600">+12%</p>
            </div>
          </div>
        </div>

        {/* Right: Department Performance */}
        <div className="bg-white rounded-lg border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-medium text-gray-900">
                Department Performance
              </h3>
              <p className="text-xs text-gray-600 mt-0.5">
                Engagement by department
              </p>
            </div>
            <Building2 className="w-4 h-4 text-gray-400" />
          </div>

          {/* Department List */}
          <div className="space-y-3">
            {/* Department 1 */}
            <div className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 bg-gray-700 rounded flex items-center justify-center text-white text-sm font-semibold">
                  1
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Engineering</p>
                  <p className="text-xs text-gray-600">48 of 52 employees</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-base font-semibold text-gray-900">92%</p>
                <p className="text-xs text-gray-500">Rate</p>
              </div>
            </div>

            {/* Department 2 */}
            <div className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 bg-gray-600 rounded flex items-center justify-center text-white text-sm font-semibold">
                  2
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Operations</p>
                  <p className="text-xs text-gray-600">62 of 78 employees</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-base font-semibold text-gray-900">79%</p>
                <p className="text-xs text-gray-500">Rate</p>
              </div>
            </div>

            {/* Department 3 */}
            <div className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 bg-gray-500 rounded flex items-center justify-center text-white text-sm font-semibold">
                  3
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Sales</p>
                  <p className="text-xs text-gray-600">32 of 52 employees</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-base font-semibold text-gray-900">62%</p>
                <p className="text-xs text-gray-500">Rate</p>
              </div>
            </div>
          </div>

          {/* View All Link */}
          <button className="w-full mt-3 text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center justify-center gap-1">
            View All Departments
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Section 4: Quick Actions */}
      {renderQuickActions()}
    </div>
  );
};

export default AdminHome;
