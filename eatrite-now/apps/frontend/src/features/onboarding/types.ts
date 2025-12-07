/**
 * Onboarding Types
 * Enterprise-grade type definitions for Company Admin onboarding flow
 */

export interface OnboardingStatus {
  onboardingCompleted: boolean;
  onboardingCompletedAt: string | null;
  companyName: string;
}

export interface CompanyProfileData {
  name: string;
  industry: string;
  employeeCount: number;
}

export interface EmployeeInviteData {
  emails: string[];
}

export interface BillingPreviewData {
  planId?: string;
}

export interface BillingPreviewResponse {
  projectedMonthlyCents: number;
  subtotalCents: number;
  taxCents: number;
  costPerEmployeeCents: number;
  employeeCount: number;
  currency: string;
  lineItems: LineItem[];
  note: string;
}

export interface LineItem {
  type: 'MEAL' | 'SUBSCRIPTION' | 'DISCOUNT' | 'CREDIT' | 'ADJUSTMENT';
  description: string;
  quantity: number;
  unitPriceCents: number;
  totalCents: number;
}

export interface OnboardingStepResponse {
  success: boolean;
  message: string;
  step?: number;
  redirectTo?: string;
}

export interface EmployeeInviteResponse extends OnboardingStepResponse {
  invited?: number;
  skipped?: string[];
}

export type OnboardingStep = 'company' | 'employees' | 'billing' | 'complete';

export interface OnboardingProgress {
  currentStep: OnboardingStep;
  completedSteps: OnboardingStep[];
}

// Industry options for dropdown
export const INDUSTRY_OPTIONS = [
  'Technology',
  'Healthcare',
  'Finance',
  'Manufacturing',
  'Retail',
  'Education',
  'Professional Services',
  'Government',
  'Non-Profit',
  'Other',
] as const;

export type Industry = typeof INDUSTRY_OPTIONS[number];
