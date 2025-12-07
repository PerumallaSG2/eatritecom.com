/**
 * Onboarding API Services
 * React Query hooks for Company Admin onboarding flow
 */

import { useQuery, useMutation, useQueryClient, UseQueryOptions } from '@tanstack/react-query';
import type {
  OnboardingStatus,
  CompanyProfileData,
  EmployeeInviteData,
  BillingPreviewData,
  BillingPreviewResponse,
  OnboardingStepResponse,
  EmployeeInviteResponse,
} from './types';

// ============================================================================
// API CLIENT
// ============================================================================

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4005';

async function fetchAPI<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      // TODO: Add JWT token when auth is enabled
      // 'Authorization': `Bearer ${getAuthToken()}`,
      ...options?.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(error.error || `HTTP ${response.status}`);
  }

  return response.json();
}

// ============================================================================
// QUERY HOOKS
// ============================================================================

/**
 * Check onboarding status
 * Used by router guard to enforce onboarding flow
 */
export function useOnboardingStatus(
  companyId: string,
  options?: Omit<UseQueryOptions<OnboardingStatus>, 'queryKey' | 'queryFn'>
) {
  return useQuery<OnboardingStatus>({
    queryKey: ['onboarding', 'status', companyId],
    queryFn: () => fetchAPI<OnboardingStatus>(`/api/v1/onboarding/status?companyId=${companyId}`),
    staleTime: 0, // Always fresh - critical for routing
    ...options,
  });
}

/**
 * Get billing preview (no charge)
 */
export function useBillingPreview(
  companyId: string,
  data: BillingPreviewData,
  enabled: boolean = true
) {
  return useQuery<BillingPreviewResponse>({
    queryKey: ['onboarding', 'billing-preview', companyId, data],
    queryFn: () => 
      fetchAPI<BillingPreviewResponse>(`/api/v1/onboarding/billing-preview?companyId=${companyId}`, {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    enabled,
    staleTime: 5 * 60 * 1000, // 5 minutes - preview data doesn't change often
  });
}

// ============================================================================
// MUTATION HOOKS
// ============================================================================

/**
 * Step 1: Update company profile
 */
export function useUpdateCompanyProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { companyId: string; profile: CompanyProfileData }) => {
      return fetchAPI<OnboardingStepResponse>(
        `/api/v1/onboarding/company?companyId=${data.companyId}`,
        {
          method: 'POST',
          body: JSON.stringify(data.profile),
        }
      );
    },
    onSuccess: (_data, variables) => {
      // Invalidate onboarding status
      queryClient.invalidateQueries({ queryKey: ['onboarding', 'status', variables.companyId] });
    },
  });
}

/**
 * Step 2: Invite employees
 */
export function useInviteEmployees() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { companyId: string; employees: EmployeeInviteData }) => {
      return fetchAPI<EmployeeInviteResponse>(
        `/api/v1/onboarding/employees?companyId=${data.companyId}`,
        {
          method: 'POST',
          body: JSON.stringify(data.employees),
        }
      );
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['onboarding', 'status', variables.companyId] });
    },
  });
}

/**
 * Step 4: Complete onboarding
 */
export function useCompleteOnboarding() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { companyId: string }) => {
      return fetchAPI<OnboardingStepResponse>(
        `/api/v1/onboarding/complete?companyId=${data.companyId}`,
        {
          method: 'POST',
        }
      );
    },
    onSuccess: (_data, variables) => {
      // Invalidate all onboarding queries
      queryClient.invalidateQueries({ queryKey: ['onboarding'] });
      // Invalidate company data
      queryClient.invalidateQueries({ queryKey: ['company', variables.companyId] });
    },
  });
}

// ============================================================================
// UTILITY HOOKS
// ============================================================================

/**
 * Format currency from cents
 */
export function useFormatCurrency() {
  return (cents: number, currency: string = 'USD'): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      minimumFractionDigits: 2,
    }).format(cents / 100);
  };
}

/**
 * Invalidate all onboarding-related queries (force refetch)
 */
export function useInvalidateOnboardingCache() {
  const queryClient = useQueryClient();

  return () => {
    queryClient.invalidateQueries({ queryKey: ['onboarding'] });
  };
}
