import React, { useState, useEffect } from 'react';
import {
  TrendingUp,
  Users,
  DollarSign,
  Zap,
  CheckCircle2,
  AlertCircle,
  Download,
  Share2,
  BarChart3,
  Clock,
  Heart,
  Briefcase,
  Shield,
  Package,
  RefreshCw
} from 'lucide-react';
import { usePreview } from '../../context/PreviewContext';

type LoadingState = 'idle' | 'loading' | 'success' | 'error';

/**
 * ADMIN IMPACT PAGE
 * 
 * Purpose: Convince HR/Finance/Leadership that the program is worth the cost.
 * This is a SALES, ROI, and CONFIDENCE page - not an analytics deep-dive.
 * 
 * Target audience: CFO, HR Director, Executive Leadership
 * Tone: Calm, executive, factual, confidence-building
 */

const AdminImpact: React.FC = () => {
  const [loadingState, setLoadingState] = useState<LoadingState>('idle');
  const preview = usePreview();

  // Preview state resolution
  const resolvedState = 
    preview.enabled && preview.page === 'admin-impact' 
      ? preview.state === 'empty' ? 'success' : preview.state
      : loadingState;

  const resolvedIsEmpty = 
    preview.enabled && preview.page === 'admin-impact' && preview.state === 'empty';

  useEffect(() => {
    // Skip data fetching in preview mode
    if (preview.enabled && preview.page === 'admin-impact') {
      return;
    }

    // Simulate data loading
    setLoadingState('loading');
    const timer = setTimeout(() => {
      setLoadingState('success');
    }, 800);

    return () => clearTimeout(timer);
  }, [preview.enabled, preview.page]);

  // ERROR STATE
  if (resolvedState === 'error') {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12">
            <div className="max-w-md mx-auto text-center">
              <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-8 h-8 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Unable to Load Impact Data
              </h2>
              <p className="text-gray-600 mb-6">
                We couldn't retrieve your program impact metrics. This is typically a temporary issue.
              </p>
              <button
                onClick={() => setLoadingState('loading')}
                className="inline-flex items-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <RefreshCw className="w-5 h-5" />
                <span>Try Again</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // LOADING STATE
  if (resolvedState === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header Skeleton */}
          <div className="h-8 w-64 bg-gray-200 rounded animate-pulse" />

          {/* Financial Summary Skeleton */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="space-y-4">
              <div className="h-8 w-48 bg-gray-200 rounded animate-pulse" />
              <div className="h-16 w-64 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 w-96 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>

          {/* KPI Cards Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="space-y-3">
                  <div className="h-5 w-32 bg-gray-200 rounded animate-pulse" />
                  <div className="h-8 w-24 bg-gray-200 rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>

          {/* Other Sections Skeleton */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <div className="space-y-4">
              <div className="h-6 w-48 bg-gray-200 rounded animate-pulse" />
              <div className="space-y-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-4 w-full bg-gray-200 rounded animate-pulse" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // EMPTY STATE
  if (resolvedIsEmpty) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12">
            <div className="max-w-md mx-auto text-center">
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Your Program is Getting Started
              </h2>
              <p className="text-gray-600 mb-6">
                Impact metrics will appear once employees begin using the meal program. 
                Typically, we can show ROI insights within the first 2-3 weeks.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-left">
                <p className="font-semibold text-blue-900 mb-2">What happens next:</p>
                <ul className="space-y-1 text-blue-800">
                  <li>• Employees place their first orders</li>
                  <li>• Engagement data begins tracking</li>
                  <li>• ROI calculations become available</li>
                  <li>• Impact metrics update daily</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // SUCCESS STATE - FULL PAGE
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Financial Impact Report</h1>
          <p className="text-sm text-gray-600 mt-1">Program ROI analysis and business metrics</p>
        </div>

        {/* SECTION 1 — FINANCIAL SUMMARY */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-gray-700" />
                </div>
                <div>
                  <h2 className="text-lg font-medium text-gray-900">
                    Return on Investment
                  </h2>
                </div>
              </div>
              
              <div className="mb-3">
                <div className="text-4xl font-semibold text-gray-900">
                  2.3× ROI
                </div>
              </div>
              
              <p className="text-sm text-gray-600">
                Based on employee engagement, participation rates, and estimated productivity impact
              </p>
            </div>
            
            <div className="hidden lg:block">
              <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-gray-700" />
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 2 — CORE BUSINESS METRICS (4 CARDS) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Employee Engagement */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Employee Engagement</h3>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">78%</div>
            <p className="text-sm text-gray-600">active participation</p>
          </div>

          {/* Cost per Employee */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Cost per Employee</h3>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">$101</div>
            <p className="text-sm text-gray-600">per month</p>
          </div>

          {/* Productivity Gained */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-orange-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Productivity Gained (Est.)</h3>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">$235</div>
            <p className="text-sm text-gray-600">per active employee</p>
          </div>

          {/* Net Program Impact */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Net Program Impact</h3>
            </div>
            <div className="text-3xl font-bold text-green-700 mb-1">+$17,840</div>
            <p className="text-sm text-gray-600">this month</p>
          </div>
        </div>

        {/* SECTION 3 — VALUE DRIVERS */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Where the value comes from</h2>
          
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Time saved ordering meals at work</h3>
                <p className="text-gray-600">Employees reclaim 15-20 minutes daily that would be spent deciding on lunch</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <Briefcase className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Reduced daily decision fatigue</h3>
                <p className="text-gray-600">Simplified meal choices preserve mental energy for work priorities</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <Heart className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Healthier meals → fewer absences</h3>
                <p className="text-gray-600">Better nutrition correlates with improved attendance and lower healthcare costs</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <Users className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Improved employee satisfaction & retention</h3>
                <p className="text-gray-600">Valued benefit that increases workplace happiness and reduces turnover</p>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 4 — RISK REMOVERS (TRUST SECTION) */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Program Health Indicators</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <Package className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">96.8%</div>
                <p className="text-sm text-gray-600">on-time delivery</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">134</div>
                <p className="text-sm text-gray-600">employees participated this month</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <Shield className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">No issues</div>
                <p className="text-sm text-gray-600">billing anomalies detected</p>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 5 — ACTION (SELL INTERNALLY) */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Share These Results</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="flex items-center justify-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium">
              <Download className="w-5 h-5" />
              <span>Export executive report</span>
            </button>

            <button className="flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
              <Share2 className="w-5 h-5" />
              <span>Share with leadership</span>
            </button>

            <button className="flex items-center justify-center space-x-2 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium">
              <BarChart3 className="w-5 h-5" />
              <span>View detailed analytics</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminImpact;
