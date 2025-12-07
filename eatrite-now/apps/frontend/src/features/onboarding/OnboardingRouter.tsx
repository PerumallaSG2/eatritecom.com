/**
 * Onboarding Router
 * Orchestrates the 4-step onboarding flow
 */

import { useState } from 'react';
import { OnboardingLayout } from './OnboardingLayout';
import { CompanySetupStep } from './steps/CompanySetupStep';
import { EmployeeInviteStep } from './steps/EmployeeInviteStep';
import { BillingPreviewStep } from './steps/BillingPreviewStep';
import { CompletionStep } from './steps/CompletionStep';

interface OnboardingRouterProps {
  companyId: string;
}

export function OnboardingRouter({ companyId }: OnboardingRouterProps) {
  const [currentStep, setCurrentStep] = useState(1);

  const handleStepComplete = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <CompanySetupStep companyId={companyId} onComplete={handleStepComplete} />;
      case 2:
        return <EmployeeInviteStep companyId={companyId} onComplete={handleStepComplete} />;
      case 3:
        return <BillingPreviewStep companyId={companyId} onComplete={handleStepComplete} />;
      case 4:
        return <CompletionStep companyId={companyId} />;
      default:
        return <CompanySetupStep companyId={companyId} onComplete={handleStepComplete} />;
    }
  };

  return (
    <OnboardingLayout currentStep={currentStep} totalSteps={4}>
      {renderStep()}
    </OnboardingLayout>
  );
}
