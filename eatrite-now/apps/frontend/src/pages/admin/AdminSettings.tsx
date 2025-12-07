import { Settings } from 'lucide-react';

/**
 * AdminSettings - Coming Soon Placeholder
 * 
 * Temporary placeholder for company settings and configuration.
 * Hidden from navigation during demo mode but accessible via direct URL.
 */
export default function AdminSettings() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center max-w-md mx-auto p-8 bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-purple-50 rounded-full">
            <Settings className="w-8 h-8 text-purple-600" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Coming Q1 2026
        </h2>
        <p className="text-gray-600">
          Advanced company settings and configuration options will be available in the next quarter.
        </p>
      </div>
    </div>
  );
}
