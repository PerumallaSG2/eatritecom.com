import { User } from 'lucide-react';

/**
 * EmployeeProfile - Coming Soon Placeholder
 * 
 * Temporary placeholder for personal profile management.
 * Hidden from navigation during demo mode but accessible via direct URL.
 */
export default function EmployeeProfile() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center max-w-md mx-auto p-8 bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-indigo-50 rounded-full">
            <User className="w-8 h-8 text-indigo-600" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Coming Q1 2026
        </h2>
        <p className="text-gray-600">
          Profile customization, preferences, and account settings will be available in the next quarter.
        </p>
      </div>
    </div>
  );
}
