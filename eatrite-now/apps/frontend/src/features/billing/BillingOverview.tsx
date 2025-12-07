/**
 * Billing Overview Page
 * CFO-Grade Billing Dashboard
 * 
 * Must show:
 * - Current Period Spend
 * - Outstanding Balance
 * - Last Invoice
 * - Next Due Date
 * 
 * Tone: Neutral, Clear, No excitement language
 */

import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { Receipt, AlertCircle, CheckCircle, Clock, Download } from 'lucide-react'
import type { Invoice } from '../../shared/types'

const formatCurrency = (cents: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(cents / 100)
}

const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

interface BillingSummary {
  currentPeriodSpendCents: number
  outstandingBalanceCents: number
  lastInvoice: Invoice | null
  nextDueDate: string | null
}

export const BillingOverview: React.FC = () => {
  const navigate = useNavigate()

  const { data: summary, isLoading } = useQuery<BillingSummary>({
    queryKey: ['billing-summary'],
    queryFn: async () => {
      // TODO: Replace with actual API call to /api/v1/billing/summary
      return {
        currentPeriodSpendCents: 2450000,
        outstandingBalanceCents: 1225000,
        lastInvoice: {
          id: '1',
          companyId: 'comp_1',
          invoiceNumber: 'INV-2025-11-001',
          periodStart: '2025-11-01',
          periodEnd: '2025-11-30',
          status: 'ISSUED',
          subtotalCents: 2300000,
          taxCents: 150000,
          totalCents: 2450000,
          currency: 'USD',
          dueDate: '2025-12-15',
          issuedAt: '2025-11-30',
          createdAt: '2025-11-30',
          updatedAt: '2025-11-30',
        },
        nextDueDate: '2025-12-15',
      }
    },
  })

  const getStatusBadge = (status: string) => {
    const config = {
      DRAFT: { color: 'bg-gray-100 text-gray-800', icon: Clock },
      ISSUED: { color: 'bg-blue-100 text-blue-800', icon: AlertCircle },
      PAID: { color: 'bg-green-100 text-green-800', icon: CheckCircle },
      OVERDUE: { color: 'bg-red-100 text-red-800', icon: AlertCircle },
      CANCELLED: { color: 'bg-gray-100 text-gray-800', icon: Clock },
    }
    
    const { color, icon: Icon } = config[status as keyof typeof config] || config.DRAFT

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium ${color}`}>
        <Icon className="mr-1.5 h-4 w-4" />
        {status}
      </span>
    )
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary-600 border-r-transparent"></div>
          <p className="mt-4 text-sm text-gray-600">Loading billing information...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-semibold text-gray-900">Billing</h1>
        <p className="mt-2 text-sm text-gray-600">
          Manage invoices, payments, and billing settings
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Current Period */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="text-sm font-medium text-gray-600 mb-2">Current Period</div>
          <div className="text-2xl font-semibold text-gray-900">
            {formatCurrency(summary?.currentPeriodSpendCents || 0)}
          </div>
          <div className="mt-2 text-xs text-gray-500">
            {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </div>
        </div>

        {/* Outstanding Balance */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="text-sm font-medium text-gray-600 mb-2">Outstanding Balance</div>
          <div className="text-2xl font-semibold text-gray-900">
            {formatCurrency(summary?.outstandingBalanceCents || 0)}
          </div>
          <div className="mt-2 text-xs text-gray-500">
            {summary?.outstandingBalanceCents ? 'Payment pending' : 'Current'}
          </div>
        </div>

        {/* Next Due Date */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="text-sm font-medium text-gray-600 mb-2">Next Due Date</div>
          <div className="text-2xl font-semibold text-gray-900">
            {summary?.nextDueDate ? formatDate(summary.nextDueDate) : 'N/A'}
          </div>
          <div className="mt-2 text-xs text-gray-500">
            {summary?.nextDueDate && 'Payment deadline'}
          </div>
        </div>

        {/* Payment Terms */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="text-sm font-medium text-gray-600 mb-2">Payment Terms</div>
          <div className="text-2xl font-semibold text-gray-900">NET 30</div>
          <div className="mt-2 text-xs text-gray-500">Standard terms</div>
        </div>
      </div>

      {/* Last Invoice */}
      {summary?.lastInvoice && (
        <div className="bg-white border border-gray-200 rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Last Invoice</h2>
          </div>
          <div className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <Receipt className="h-6 w-6 text-gray-600" />
                </div>
                <div>
                  <div className="flex items-center space-x-3">
                    <h3 className="text-base font-semibold text-gray-900">
                      {summary.lastInvoice.invoiceNumber}
                    </h3>
                    {getStatusBadge(summary.lastInvoice.status)}
                  </div>
                  <div className="mt-2 space-y-1 text-sm text-gray-600">
                    <p>
                      Period: {formatDate(summary.lastInvoice.periodStart)} - {formatDate(summary.lastInvoice.periodEnd)}
                    </p>
                    <p>
                      Issued: {summary.lastInvoice.issuedAt ? formatDate(summary.lastInvoice.issuedAt) : 'Pending'}
                    </p>
                    <p>
                      Due: {formatDate(summary.lastInvoice.dueDate)}
                    </p>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-semibold text-gray-900">
                  {formatCurrency(summary.lastInvoice.totalCents)}
                </div>
                <div className="mt-4 flex space-x-2">
                  <button
                    onClick={() => navigate(`/app/billing/invoices/${summary.lastInvoice!.id}`)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    View
                  </button>
                  <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                    <Download className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <button
          onClick={() => navigate('/app/billing/invoices')}
          className="bg-white border border-gray-200 rounded-lg p-6 text-left hover:border-primary-500 transition-colors"
        >
          <Receipt className="h-8 w-8 text-gray-600 mb-4" />
          <h3 className="text-base font-semibold text-gray-900 mb-2">View All Invoices</h3>
          <p className="text-sm text-gray-600">Access complete invoice history</p>
        </button>

        <button
          onClick={() => navigate('/app/billing/payment-methods')}
          className="bg-white border border-gray-200 rounded-lg p-6 text-left hover:border-primary-500 transition-colors"
        >
          <Receipt className="h-8 w-8 text-gray-600 mb-4" />
          <h3 className="text-base font-semibold text-gray-900 mb-2">Payment Methods</h3>
          <p className="text-sm text-gray-600">Manage payment accounts</p>
        </button>

        <button
          onClick={() => navigate('/app/billing/usage')}
          className="bg-white border border-gray-200 rounded-lg p-6 text-left hover:border-primary-500 transition-colors"
        >
          <Receipt className="h-8 w-8 text-gray-600 mb-4" />
          <h3 className="text-base font-semibold text-gray-900 mb-2">Usage Reports</h3>
          <p className="text-sm text-gray-600">Detailed consumption metrics</p>
        </button>
      </div>
    </div>
  )
}
