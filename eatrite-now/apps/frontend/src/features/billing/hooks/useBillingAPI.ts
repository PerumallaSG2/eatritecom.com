/**
 * Billing API Hooks
 * React Query wrappers for EatRite Billing Module
 * 
 * Usage:
 * - CFO Dashboard components
 * - Finance team views
 * - Invoice management pages
 * 
 * All hooks use React Query for caching, refetching, and optimistic updates
 */

import { useQuery, useMutation, useQueryClient, UseQueryOptions } from '@tanstack/react-query';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

interface BillingSummary {
  currentPeriodSpendCents: number;
  outstandingBalanceCents: number;
  lastInvoiceDate: string | null;
  nextDueDate: string | null;
  paymentTerms: string;
  currency: string;
}

interface Invoice {
  id: string;
  companyId: string;
  invoiceNumber: string;
  periodStart: string;
  periodEnd: string;
  status: 'DRAFT' | 'ISSUED' | 'PAID' | 'OVERDUE' | 'CANCELLED';
  subtotalCents: number;
  taxCents: number;
  totalCents: number;
  currency: string;
  dueDate: string;
  issuedAt?: string;
  paidAt?: string;
  createdAt: string;
  updatedAt: string;
  company?: {
    id: string;
    name: string;
    billingAddress?: string;
    billingEmail?: string;
  };
  lineItems?: InvoiceLineItem[];
  payments?: PaymentRecord[];
}

interface InvoiceLineItem {
  id: string;
  invoiceId: string;
  type: 'MEAL' | 'SUBSCRIPTION' | 'DISCOUNT' | 'CREDIT' | 'ADJUSTMENT';
  description: string;
  quantity: number;
  unitPriceCents: number;
  totalCents: number;
  metadata?: Record<string, unknown>;
  createdAt: string;
}

interface PaymentRecord {
  id: string;
  invoiceId?: string;
  companyId: string;
  stripePaymentIntentId?: string;
  amountCents: number;
  status: 'PENDING' | 'SUCCEEDED' | 'FAILED' | 'REFUNDED' | 'CANCELLED';
  paymentMethod: 'CREDIT_CARD' | 'ACH' | 'WIRE_TRANSFER' | 'NET_30' | 'NET_60';
  failureReason?: string;
  metadata?: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

interface InvoiceListParams {
  page?: number;
  limit?: number;
  status?: string;
  search?: string;
  companyId?: string;
}

interface InvoiceListResponse {
  invoices: Invoice[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

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
 * Fetch billing summary (CFO dashboard metrics)
 */
export function useBillingSummary(
  companyId: string,
  options?: Omit<UseQueryOptions<BillingSummary>, 'queryKey' | 'queryFn'>
) {
  return useQuery<BillingSummary>({
    queryKey: ['billing', 'summary', companyId],
    queryFn: () => fetchAPI<BillingSummary>(`/api/v1/billing/summary?companyId=${companyId}`),
    staleTime: 5 * 60 * 1000, // 5 minutes - billing data changes slowly
    ...options,
  });
}

/**
 * Fetch paginated invoice list with filters
 */
export function useInvoices(
  params: InvoiceListParams,
  options?: Omit<UseQueryOptions<InvoiceListResponse>, 'queryKey' | 'queryFn'>
) {
  const queryParams = new URLSearchParams();
  
  if (params.companyId) queryParams.set('companyId', params.companyId);
  if (params.page) queryParams.set('page', String(params.page));
  if (params.limit) queryParams.set('limit', String(params.limit));
  if (params.status && params.status !== 'ALL') queryParams.set('status', params.status);
  if (params.search) queryParams.set('search', params.search);

  return useQuery<InvoiceListResponse>({
    queryKey: ['billing', 'invoices', params],
    queryFn: () => fetchAPI<InvoiceListResponse>(`/api/v1/billing/invoices?${queryParams.toString()}`),
    staleTime: 2 * 60 * 1000, // 2 minutes
    ...options,
  });
}

/**
 * Fetch single invoice detail (immutable view)
 */
export function useInvoice(
  invoiceId: string,
  companyId?: string,
  options?: Omit<UseQueryOptions<Invoice>, 'queryKey' | 'queryFn'>
) {
  const queryParams = companyId ? `?companyId=${companyId}` : '';

  return useQuery<Invoice>({
    queryKey: ['billing', 'invoice', invoiceId],
    queryFn: () => fetchAPI<Invoice>(`/api/v1/billing/invoices/${invoiceId}${queryParams}`),
    staleTime: 10 * 60 * 1000, // 10 minutes - invoices are immutable
    ...options,
  });
}

/**
 * Fetch usage reports (consumption metrics)
 */
export function useUsageReports(
  companyId: string,
  periodStart?: string,
  periodEnd?: string,
  options?: Omit<UseQueryOptions<any>, 'queryKey' | 'queryFn'>
) {
  const queryParams = new URLSearchParams({ companyId });
  if (periodStart) queryParams.set('periodStart', periodStart);
  if (periodEnd) queryParams.set('periodEnd', periodEnd);

  return useQuery({
    queryKey: ['billing', 'usage', companyId, periodStart, periodEnd],
    queryFn: () => fetchAPI(`/api/v1/billing/usage?${queryParams.toString()}`),
    staleTime: 5 * 60 * 1000, // 5 minutes
    ...options,
  });
}

/**
 * Fetch payment methods (Stripe-managed)
 */
export function usePaymentMethods(
  companyId: string,
  options?: Omit<UseQueryOptions<any>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: ['billing', 'payment-methods', companyId],
    queryFn: () => fetchAPI(`/api/v1/billing/payment-methods?companyId=${companyId}`),
    staleTime: 5 * 60 * 1000, // 5 minutes
    ...options,
  });
}

// ============================================================================
// MUTATION HOOKS (For future write operations)
// ============================================================================

/**
 * Add new payment method
 */
export function useAddPaymentMethod() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { companyId: string; paymentMethodId: string }) => {
      return fetchAPI('/api/v1/billing/payment-methods', {
        method: 'POST',
        body: JSON.stringify(data),
      });
    },
    onSuccess: (_data, variables) => {
      // Invalidate payment methods cache
      queryClient.invalidateQueries({ queryKey: ['billing', 'payment-methods', variables.companyId] });
    },
  });
}

/**
 * Remove payment method
 */
export function useRemovePaymentMethod() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { companyId: string; paymentMethodId: string }) => {
      return fetchAPI(`/api/v1/billing/payment-methods/${data.paymentMethodId}`, {
        method: 'DELETE',
      });
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['billing', 'payment-methods', variables.companyId] });
    },
  });
}

/**
 * Set default payment method
 */
export function useSetDefaultPaymentMethod() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { companyId: string; paymentMethodId: string }) => {
      return fetchAPI(`/api/v1/billing/payment-methods/${data.paymentMethodId}/default`, {
        method: 'PUT',
      });
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['billing', 'payment-methods', variables.companyId] });
    },
  });
}

// ============================================================================
// UTILITY HOOKS
// ============================================================================

/**
 * Invalidate all billing-related queries (force refetch)
 * Use after major operations like payment completion
 */
export function useInvalidateBillingCache() {
  const queryClient = useQueryClient();

  return () => {
    queryClient.invalidateQueries({ queryKey: ['billing'] });
  };
}

/**
 * Prefetch invoice detail (optimize for detail page navigation)
 */
export function usePrefetchInvoice() {
  const queryClient = useQueryClient();

  return (invoiceId: string, companyId?: string) => {
    const queryParams = companyId ? `?companyId=${companyId}` : '';
    
    queryClient.prefetchQuery({
      queryKey: ['billing', 'invoice', invoiceId],
      queryFn: () => fetchAPI<Invoice>(`/api/v1/billing/invoices/${invoiceId}${queryParams}`),
    });
  };
}

// ============================================================================
// COMPUTED VALUES (Helper Hooks)
// ============================================================================

/**
 * Calculate total outstanding balance with breakdown
 */
export function useOutstandingBalance(companyId: string) {
  const { data: summary, isLoading } = useBillingSummary(companyId);
  const { data: invoices } = useInvoices({ companyId, status: 'ISSUED' });

  return {
    totalCents: summary?.outstandingBalanceCents || 0,
    invoiceCount: invoices?.invoices.length || 0,
    isLoading,
  };
}

/**
 * Get invoice status badge configuration
 */
export function useInvoiceStatusBadge(status: Invoice['status']) {
  const config = {
    DRAFT: { color: 'bg-gray-100 text-gray-800', label: 'Draft' },
    ISSUED: { color: 'bg-blue-100 text-blue-800', label: 'Issued' },
    PAID: { color: 'bg-green-100 text-green-800', label: 'Paid' },
    OVERDUE: { color: 'bg-red-100 text-red-800', label: 'Overdue' },
    CANCELLED: { color: 'bg-gray-100 text-gray-800', label: 'Cancelled' },
  };

  return config[status] || config.DRAFT;
}

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
