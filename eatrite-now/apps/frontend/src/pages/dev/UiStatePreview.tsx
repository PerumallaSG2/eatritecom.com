import React, { useState, Suspense } from 'react';
import { Eye, RefreshCw } from 'lucide-react';
import { PreviewContext } from '../../context/PreviewContext';
import type { PreviewState } from '../../context/PreviewContext';

// Lazy load pages for preview
const EmployeeHome = React.lazy(() => import('../employee/EmployeeHome'));

/**
 * UI STATE PREVIEW PAGE - DEV ONLY
 * 
 * Purpose: Visual inspection tool for all UI states (Loading, Empty, Error, Success)
 * across Employee and Admin pages without modifying production code.
 * 
 * Usage: Navigate to /app/dev/ui-preview to test different states
 */

type PageOption = 
  | 'employee-home'
  | 'employee-meals'
  | 'employee-orders'
  | 'admin-home'
  | 'admin-analytics'
  | 'admin-impact';

type StateOption = 'success' | 'loading' | 'empty' | 'error';

const UiStatePreview: React.FC = () => {
  const [selectedPage, setSelectedPage] = useState<PageOption>('employee-home');
  const [selectedState, setSelectedState] = useState<StateOption>('success');

  const pageOptions: { value: PageOption; label: string }[] = [
    { value: 'employee-home', label: 'Employee Home' },
    { value: 'employee-meals', label: 'Employee Meals' },
    { value: 'employee-orders', label: 'Employee Orders' },
    { value: 'admin-home', label: 'Admin Home' },
    { value: 'admin-analytics', label: 'Admin Analytics' },
    { value: 'admin-impact', label: 'Admin Impact' }
  ];

  const stateOptions: { value: StateOption; label: string; color: string }[] = [
    { value: 'success', label: 'Success', color: 'bg-green-600 hover:bg-green-700' },
    { value: 'loading', label: 'Loading', color: 'bg-blue-600 hover:bg-blue-700' },
    { value: 'empty', label: 'Empty', color: 'bg-yellow-600 hover:bg-yellow-700' },
    { value: 'error', label: 'Error', color: 'bg-red-600 hover:bg-red-700' }
  ];

  const renderPreviewContent = () => {
    // Render the selected page component wrapped in PreviewContext
    const previewValue = {
      enabled: true,
      page: selectedPage,
      state: selectedState as PreviewState
    };

    // Only EmployeeHome is implemented for now
    if (selectedPage === 'employee-home') {
      return (
        <PreviewContext.Provider value={previewValue}>
          <Suspense fallback={
            <div className="flex items-center justify-center h-96">
              <div className="text-gray-500">Loading preview...</div>
            </div>
          }>
            <EmployeeHome />
          </Suspense>
        </PreviewContext.Provider>
      );
    }

    // Placeholder for other pages
    return (
      <div className="bg-white rounded-lg border-2 border-dashed border-gray-300 p-8 text-center">
        <div className="max-w-md mx-auto">
          <Eye className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Preview: {pageOptions.find(p => p.value === selectedPage)?.label}
          </h3>
          <p className="text-gray-600 mb-4">
            State: <span className="font-semibold capitalize">{selectedState}</span>
          </p>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm">
            <p className="font-semibold text-yellow-900 mb-2">⚠️ Not Yet Implemented</p>
            <p className="text-yellow-800">
              This page hasn't been connected to the preview system yet.
              Currently only <strong>Employee Home</strong> is available for preview.
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Dev Warning Banner */}
      <div className="bg-yellow-500 text-black py-3 px-6 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <RefreshCw className="w-5 h-5" />
            <span className="font-bold text-lg">UI STATE PREVIEW — DEV ONLY</span>
          </div>
          <span className="text-sm font-medium">
            Route: /app/dev/ui-preview
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6">
        {/* Control Panel */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Preview Controls</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Page Selector */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Page
              </label>
              <select
                value={selectedPage}
                onChange={(e) => setSelectedPage(e.target.value as PageOption)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                {pageOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* State Selector */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select State
              </label>
              <div className="grid grid-cols-4 gap-2">
                {stateOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setSelectedState(option.value)}
                    className={`px-3 py-2 rounded-lg text-white font-medium transition-colors ${
                      selectedState === option.value
                        ? option.color
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Current Selection Info */}
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Current Preview:</span>{' '}
                  {pageOptions.find(p => p.value === selectedPage)?.label} →{' '}
                  <span className="capitalize font-semibold">{selectedState}</span> State
                </p>
              </div>
              <button
                onClick={() => {
                  // Trigger a re-render or refresh
                  setSelectedState(selectedState);
                }}
                className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Refresh Preview</span>
              </button>
            </div>
          </div>
        </div>

        {/* Preview Area */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Preview Window</h2>
            <div className="flex items-center space-x-2">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                selectedState === 'success' ? 'bg-green-100 text-green-800' :
                selectedState === 'loading' ? 'bg-blue-100 text-blue-800' :
                selectedState === 'empty' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {selectedState.toUpperCase()}
              </span>
            </div>
          </div>

          {renderPreviewContent()}
        </div>

        {/* Implementation Guide */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="font-semibold text-blue-900 mb-3">📘 Implementation Guide</h3>
          <div className="space-y-2 text-sm text-blue-800">
            <p>
              <strong>Step 1:</strong> Modify each page component to accept optional preview props:
            </p>
            <code className="block bg-white p-2 rounded text-xs">
              {'interface PreviewProps { __previewMode?: boolean; __previewState?: StateOption; }'}
            </code>
            
            <p className="mt-3">
              <strong>Step 2:</strong> In each component's useEffect, check for preview mode:
            </p>
            <code className="block bg-white p-2 rounded text-xs">
              {'if (__previewMode) { setLoadingState(__previewState); return; }'}
            </code>
            
            <p className="mt-3">
              <strong>Step 3:</strong> Import and render components dynamically based on selection
            </p>
            
            <p className="mt-3">
              <strong>Alternative:</strong> Use React Context to provide preview state globally
            </p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-sm text-green-600 font-medium">Total Pages</p>
            <p className="text-2xl font-bold text-green-900">{pageOptions.length}</p>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-600 font-medium">UI States</p>
            <p className="text-2xl font-bold text-blue-900">{stateOptions.length}</p>
          </div>
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <p className="text-sm text-purple-600 font-medium">Test Combinations</p>
            <p className="text-2xl font-bold text-purple-900">
              {pageOptions.length * stateOptions.length}
            </p>
          </div>
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <p className="text-sm text-orange-600 font-medium">Current View</p>
            <p className="text-2xl font-bold text-orange-900 capitalize">{selectedState}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UiStatePreview;
