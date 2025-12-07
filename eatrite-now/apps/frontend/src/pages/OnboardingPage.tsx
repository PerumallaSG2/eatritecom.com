/**
 * Onboarding Page
 * Entry point for Company Admin onboarding flow
 */

import { OnboardingRouter } from '../features/onboarding';
import { useSearchParams } from 'react-router-dom';

export default function OnboardingPage() {
  const [searchParams] = useSearchParams();
  
  // TODO: Replace with actual companyId from auth context
  // For now, get from URL parameter for testing
  const companyId = searchParams.get('companyId') || 'demo-company-id';

  return <OnboardingRouter companyId={companyId} />;
}
