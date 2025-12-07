/**
 * Step 4: Completion
 * Success screen with options to proceed
 */

import { useCompleteOnboarding } from '../services';
import { useNavigate } from 'react-router-dom';

interface CompletionStepProps {
  companyId: string;
}

export function CompletionStep({ companyId }: CompletionStepProps) {
  const navigate = useNavigate();
  const completeOnboarding = useCompleteOnboarding();

  const handleComplete = async () => {
    try {
      const result = await completeOnboarding.mutateAsync({ companyId });
      
      // Redirect to dashboard
      if (result.redirectTo) {
        navigate(result.redirectTo);
      } else {
        navigate('/app/dashboard');
      }
    } catch (error) {
      console.error('Failed to complete onboarding:', error);
    }
  };

  return (
    <div className="text-center py-8">
      {/* Success Icon */}
      <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
        <svg
          className="h-10 w-10 text-green-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>

      {/* Content */}
      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        Your EatRite workspace is ready!
      </h2>
      <p className="text-gray-600 mb-8 max-w-md mx-auto">
        You're all set. Your team can now start ordering healthy meals and tracking wellness.
      </p>

      {/* Action Buttons */}
      <div className="space-y-3 max-w-sm mx-auto">
        <button
          type="button"
          onClick={handleComplete}
          disabled={completeOnboarding.isPending}
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {completeOnboarding.isPending ? 'Finalizing...' : 'Go to Dashboard'}
        </button>

        <button
          type="button"
          onClick={() => navigate('/app/billing')}
          className="w-full bg-white text-gray-700 py-3 px-6 rounded-lg font-medium border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          Add Billing Method (Optional)
        </button>
      </div>

      {/* Next Steps */}
      <div className="mt-12 text-left max-w-md mx-auto">
        <h3 className="text-sm font-semibold text-gray-900 mb-4">Next Steps:</h3>
        <ul className="space-y-3 text-sm text-gray-600">
          <li className="flex items-start">
            <span className="flex-shrink-0 h-5 w-5 text-blue-600 mr-2">1.</span>
            <span>Employees will receive invitation emails to join</span>
          </li>
          <li className="flex items-start">
            <span className="flex-shrink-0 h-5 w-5 text-blue-600 mr-2">2.</span>
            <span>Review your corporate dashboard for usage insights</span>
          </li>
          <li className="flex items-start">
            <span className="flex-shrink-0 h-5 w-5 text-blue-600 mr-2">3.</span>
            <span>Set up your first bulk order for a team event</span>
          </li>
          <li className="flex items-start">
            <span className="flex-shrink-0 h-5 w-5 text-blue-600 mr-2">4.</span>
            <span>Invoices will be sent monthly via email</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
