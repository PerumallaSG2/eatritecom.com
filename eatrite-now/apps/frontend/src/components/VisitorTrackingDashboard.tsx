import React, { useState, useEffect } from 'react';
import { VisitorTracker } from '../utils/analytics';

interface VisitorStats {
  totalVisitors: number;
  uniqueSessions: number;
  todayVisitors: number;
  topReferrers: [string, number][];
  topDevices: [string, number][];
}

const VisitorTrackingDashboard: React.FC = () => {
  const [stats, setStats] = useState<VisitorStats | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [password, setPassword] = useState('');
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      // Try to fetch from backend API first
      const response = await fetch('http://localhost:4005/api/analytics/analytics');
      if (response.ok) {
        const backendData = await response.json();
        if (backendData.success) {
          // Transform backend data to match our interface
          const transformedStats: VisitorStats = {
            totalVisitors: backendData.data.totalStats?.totalVisitors || 0,
            uniqueSessions: backendData.data.totalStats?.uniqueVisitors || 0,
            todayVisitors: backendData.data.todayStats?.todayVisitors || 0,
            topReferrers: backendData.data.topReferrers?.map((r: any) => [r.referrer, r.count]) || [],
            topDevices: backendData.data.deviceBreakdown?.map((d: any) => [d.device_type, d.count]) || []
          };
          setStats(transformedStats);
          console.log('📊 Loaded analytics from database');
          return;
        }
      }
    } catch (error) {
      console.warn('Failed to load backend analytics, falling back to local storage:', error);
    }

    // Fallback to local storage
    const localStats = VisitorTracker.getVisitorStats();
    if (localStats) {
      setStats(localStats);
      console.log('📊 Loaded analytics from local storage');
    }
  };

  const handlePasswordSubmit = () => {
    if (password === 'eatrite2024') {
      setIsVisible(true);
      setShowPasswordPrompt(false);
    } else {
      alert('Invalid password');
    }
  };

  const clearData = () => {
    if (window.confirm('Are you sure you want to clear all visitor data?')) {
      localStorage.removeItem('eatrite_visitors');
      setStats(null);
      loadStats();
    }
  };

  if (showPasswordPrompt) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full mx-4">
          <div className="text-center mb-6">
            <div className="text-4xl mb-4">🔐</div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Analytics Access</h1>
            <p className="text-gray-600">Enter password to view visitor statistics</p>
          </div>
          
          <div className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onKeyPress={(e) => e.key === 'Enter' && handlePasswordSubmit()}
            />
            <button
              onClick={handlePasswordSubmit}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              Access Dashboard
            </button>
          </div>
          
          <p className="text-xs text-gray-500 text-center mt-4">
            Demo password: eatrite2024
          </p>
        </div>
      </div>
    );
  }

  if (!isVisible) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Access Denied</h1>
          <p className="text-gray-600">Invalid password.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              📊 Visitor Analytics
            </h1>
            <p className="text-gray-600">Real-time website visitor tracking</p>
          </div>
          <div className="space-x-3">
            <button
              onClick={loadStats}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center gap-2"
            >
              🔄 Refresh
            </button>
            <button
              onClick={clearData}
              className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold"
            >
              🗑️ Clear Data
            </button>
          </div>
        </div>

        {!stats ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
            <div className="text-8xl mb-6">📈</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">No Data Yet</h2>
            <p className="text-gray-600 max-w-md mx-auto">
              Visitor tracking will start automatically once users visit your website. 
              Check back after some traffic!
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {/* Stats Cards */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-2xl">👥</div>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Total Visitors</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.totalVisitors}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-2xl">🔗</div>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Unique Sessions</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.uniqueSessions}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-2xl">📅</div>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Today's Visitors</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.todayVisitors}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-2xl">📱</div>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Device Mix</p>
                    <p className="text-sm font-bold text-gray-900">
                      {stats.topDevices.slice(0, 2).map(([device]) => device).join(' • ')}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Top Referrers */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  🔗 Traffic Sources
                </h3>
                <div className="space-y-4">
                  {stats.topReferrers.length === 0 ? (
                    <div className="text-center py-8">
                      <div className="text-4xl mb-2">🌐</div>
                      <p className="text-gray-500">No referrer data yet</p>
                    </div>
                  ) : (
                    stats.topReferrers.map(([referrer, count], index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">
                            {referrer === 'Direct' ? '🔗' : '🌐'}
                          </span>
                          <span className="font-medium text-gray-700 truncate">
                            {referrer === 'Direct' ? 'Direct Traffic' : referrer}
                          </span>
                        </div>
                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                          {count} visits
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Device Breakdown */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  📱 Device Analytics
                </h3>
                <div className="space-y-4">
                  {stats.topDevices.map(([device, count], index) => {
                    const percentage = Math.round((count / stats.totalVisitors) * 100);
                    return (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">
                              {device === 'Mobile' ? '📱' : device === 'Desktop' ? '💻' : '📟'}
                            </span>
                            <span className="font-medium text-gray-700">{device}</span>
                          </div>
                          <span className="text-sm font-semibold text-gray-900">
                            {count} ({percentage}%)
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div 
                            className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500" 
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </>
        )}

        {/* Info Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-2xl p-6">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              📋 How to Access
            </h3>
            <div className="space-y-2 text-blue-100">
              <p>• Visit your website URL + <code className="bg-blue-700 px-2 py-1 rounded">/visitor-analytics</code></p>
              <p>• Use password: <code className="bg-blue-700 px-2 py-1 rounded">eatrite2024</code></p>
              <p>• Change the password in production!</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-2xl p-6">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              🚀 Upgrade Suggestions
            </h3>
            <div className="space-y-2 text-green-100">
              <p>• Add Google Analytics for detailed insights</p>
              <p>• Set up real-time notifications</p>
              <p>• Track conversion events</p>
              <p>• Monitor page performance</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisitorTrackingDashboard;