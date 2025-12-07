 /**
 * Onboarding Guard Hook
 * Enforces mandatory onboarding for Company Admins
 * 
 * Usage: Call this hook in any protected route that requires onboarding completion
 */

import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useOnboardingStatus } from '../features/onboarding';

interface OnboardingGuardOptions {
  companyId?: string;
  enabled?: boolean;
}

/**
 * Hook to enforce onboarding completion
 * Redirects to /onboarding if not completed
 */
export function useOnboardingGuard(options: OnboardingGuardOptions = {}) {
  const { companyId, enabled = true } = options;
  const navigate = useNavigate();
  const location = useLocation();

  // Skip guard if disabled or already on onboarding route
  const shouldCheck = enabled && companyId && !location.pathname.startsWith('/onboarding');

  const { data: status, isLoading, error } = useOnboardingStatus(
    companyId || '',
    { enabled: !!shouldCheck }
  );

  useEffect(() => {
    if (!shouldCheck || isLoading) {
      return;
    }

    // If onboarding not completed, redirect
    if (status && !status.onboardingCompleted) {
      console.log('🔒 Onboarding not completed, redirecting...');
      navigate('/onboarding', { 
        replace: true,
        state: { from: location.pathname }
      });
    }
  }, [status, isLoading, shouldCheck, navigate, location.pathname]);

  return {
    isLoading,
    onboardingCompleted: status?.onboardingCompleted ?? false,
    error,
  };
}

/**
 * Hook to check if user should see onboarding
 * Does NOT redirect, just returns status
 */
export function useOnboardingCheck(companyId?: string) {
  const { data: status, isLoading } = useOnboardingStatus(
    companyId || '',
    { enabled: !!companyId }
  );

  return {
    isLoading,
    needsOnboarding: status ? !status.onboardingCompleted : false,
    onboardingCompleted: status?.onboardingCompleted ?? false,
    companyName: status?.companyName,
  };
}
