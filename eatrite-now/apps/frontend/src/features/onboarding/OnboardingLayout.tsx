/**
 * Onboarding Layout
 * Clean, enterprise-grade onboarding container
 * No fluff, no animations beyond transitions
 */

import React from 'react';

interface OnboardingLayoutProps {
  currentStep: number;
  totalSteps: number;
  children: React.ReactNode;
}

export function OnboardingLayout({ currentStep, totalSteps, children }: OnboardingLayoutProps) {
  const steps = [
    { number: 1, label: 'Company Setup' },
    { number: 2, label: 'Invite Team' },
    { number: 3, label: 'Billing Preview' },
    { number: 4, label: 'Complete' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-2xl font-bold text-gray-900">EatRite</h1>
          <p className="mt-1 text-sm text-gray-600">
            We'll get your organization ready in a few minutes.
          </p>
        </div>
      </header>

      {/* Progress Stepper */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav aria-label="Progress">
            <ol className="flex items-center justify-between">
              {steps.map((step, index) => (
                <li
                  key={step.number}
                  className={`flex items-center ${
                    index !== steps.length - 1 ? 'flex-1' : ''
                  }`}
                >
                  <div className="flex items-center">
                    <div
                      className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors ${
                        step.number < currentStep
                          ? 'bg-blue-600 border-blue-600 text-white'
                          : step.number === currentStep
                          ? 'border-blue-600 text-blue-600 bg-white'
                          : 'border-gray-300 text-gray-400 bg-white'
                      }`}
                    >
                      {step.number < currentStep ? (
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ) : (
                        <span className="text-sm font-semibold">{step.number}</span>
                      )}
                    </div>
                    <span
                      className={`ml-3 text-sm font-medium ${
                        step.number <= currentStep
                          ? 'text-gray-900'
                          : 'text-gray-400'
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>
                  {index !== steps.length - 1 && (
                    <div
                      className={`flex-1 h-0.5 mx-4 transition-colors ${
                        step.number < currentStep
                          ? 'bg-blue-600'
                          : 'bg-gray-300'
                      }`}
                    />
                  )}
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-2xl w-full">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            {children}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-xs text-gray-500 text-center">
            Step {currentStep} of {totalSteps} • Questions? Contact support@eatrite.com
          </p>
        </div>
      </footer>
    </div>
  );
}
