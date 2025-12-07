/**
 * Step 3: Billing Preview
 * MOST IMPORTANT STEP - Must feel extremely safe
 * Shows projected costs WITHOUT charging
 */

import { useBillingPreview, useFormatCurrency } from '../services';

interface BillingPreviewStepProps {
  companyId: string;
  onComplete: () => void;
}

export function BillingPreviewStep({ companyId, onComplete }: BillingPreviewStepProps) {
  const formatCurrency = useFormatCurrency();
  
  const { data, isLoading, error } = useBillingPreview(companyId, {}, true);

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <p className="mt-4 text-gray-600">Calculating your costs...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 mb-4">
          <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <p className="text-gray-900 font-medium">Failed to calculate costs</p>
        <p className="text-sm text-gray-600 mt-2">
          {error instanceof Error ? error.message : 'Please try again'}
        </p>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Billing Preview</h2>
      <p className="text-sm text-gray-600 mb-8">
        Review your estimated monthly costs. This is a preview only.
      </p>

      {/* Safety Banner */}
      <div className="bg-blue-50 border-l-4 border-blue-600 p-4 mb-8">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-blue-800">
              You will not be charged yet
            </p>
            <p className="mt-1 text-sm text-blue-700">
              This is an estimate. Billing begins after your first usage.
            </p>
          </div>
        </div>
      </div>

      {/* Cost Breakdown */}
      <div className="space-y-6">
        {/* Line Items */}
        <div className="bg-gray-50 rounded-lg p-6 space-y-4">
          <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
            Monthly Subscription
          </h3>
          
          {data.lineItems.map((item, index) => (
            <div key={index} className="flex justify-between items-start">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{item.description}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {item.quantity} × {formatCurrency(item.unitPriceCents)}
                </p>
              </div>
              <p className="text-sm font-medium text-gray-900">
                {formatCurrency(item.totalCents)}
              </p>
            </div>
          ))}

          <div className="pt-4 border-t border-gray-200 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium text-gray-900">{formatCurrency(data.subtotalCents)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Tax</span>
              <span className="font-medium text-gray-900">{formatCurrency(data.taxCents)}</span>
            </div>
          </div>
        </div>

        {/* Total */}
        <div className="bg-blue-50 rounded-lg p-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-600">Estimated Monthly Cost</p>
              <p className="text-xs text-gray-500 mt-1">
                {formatCurrency(data.costPerEmployeeCents)} per employee
              </p>
            </div>
            <p className="text-3xl font-bold text-blue-900">
              {formatCurrency(data.projectedMonthlyCents)}
            </p>
          </div>
        </div>

        {/* What's Included */}
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-4">What's Included</h3>
          <ul className="space-y-3">
            {[
              'Unlimited meal ordering for all employees',
              'Corporate analytics and reporting',
              'Bulk ordering for company events',
              'Wellness tracking and insights',
              'Priority customer support',
              'Flexible billing (NET 30)',
            ].map((feature, index) => (
              <li key={index} className="flex items-start">
                <svg className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm text-gray-700">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Action Button */}
        <div className="pt-4">
          <button
            type="button"
            onClick={onComplete}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Confirm & Continue
          </button>
          <p className="mt-2 text-xs text-center text-gray-500">
            No payment method required at this time
          </p>
        </div>
      </div>
    </div>
  );
}
