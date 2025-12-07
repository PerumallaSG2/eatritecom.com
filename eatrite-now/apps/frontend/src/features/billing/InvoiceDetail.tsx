/**
 * Invoice Detail Page
 * Immutable invoice view - READ ONLY
 * 
 * Features:
 * - Complete invoice breakdown
 * - Line items table
 * - Payment history
 * - Download PDF
 * - No edit actions (immutable)
 */

import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Download, Printer, CheckCircle, Clock } from 'lucide-react'
import type { Invoice, InvoiceLineItem, PaymentRecord } from '../../shared/types'

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

export const InvoiceDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const { data: invoice, isLoading } = useQuery<Invoice & { lineItems: InvoiceLineItem[], payments: PaymentRecord[] }>({
    queryKey: ['invoice', id],
    queryFn: async () => {
      // TODO: Replace with actual API call to /api/v1/billing/invoices/:id
      return {
        id: '1',
        companyId: 'comp_1',
        invoiceNumber: 'INV-2025-11-001',
        periodStart: '2025-11-01',
        periodEnd: '2025-11-30',
        status: 'PAID',
        subtotalCents: 2300000,
        taxCents: 150000,
        totalCents: 2450000,
        currency: 'USD',
        dueDate: '2025-12-15',
        issuedAt: '2025-11-30',
        paidAt: '2025-12-10',
        createdAt: '2025-11-30',
        updatedAt: '2025-12-10',
        lineItems: [
          {
            id: '1',
            invoiceId: '1',
            type: 'MEAL',
            description: 'Corporate meal orders - November 2025',
            quantity: 200,
            unitPriceCents: 11000,
            totalCents: 2200000,
            createdAt: '2025-11-30',
          },
          {
            id: '2',
            invoiceId: '1',
            type: 'SUBSCRIPTION',
            description: 'Platform subscription fee',
            quantity: 1,
            unitPriceCents: 100000,
            totalCents: 100000,
            createdAt: '2025-11-30',
          },
        ],
        payments: [
          {
            id: '1',
            invoiceId: '1',
            companyId: 'comp_1',
            stripePaymentIntentId: 'pi_1234567890',
            amountCents: 2450000,
            status: 'SUCCEEDED',
            paymentMethod: 'CREDIT_CARD',
            createdAt: '2025-12-10',
            updatedAt: '2025-12-10',
          },
        ],
      }
    },
  })

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary-600 border-r-transparent"></div>
          <p className="mt-4 text-sm text-gray-600">Loading invoice...</p>
        </div>
      </div>
    )
  }

  if (!invoice) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900">Invoice not found</h3>
        <button
          onClick={() => navigate('/app/billing/invoices')}
          className="mt-4 text-primary-600 hover:text-primary-900"
        >
          Return to invoices
        </button>
      </div>
    )
  }

  const getStatusBadge = () => {
    const config = {
      DRAFT: { color: 'bg-gray-100 text-gray-800', icon: Clock, text: 'Draft' },
      ISSUED: { color: 'bg-blue-100 text-blue-800', icon: Clock, text: 'Issued' },
      PAID: { color: 'bg-green-100 text-green-800', icon: CheckCircle, text: 'Paid' },
      OVERDUE: { color: 'bg-red-100 text-red-800', icon: Clock, text: 'Overdue' },
      CANCELLED: { color: 'bg-gray-100 text-gray-800', icon: Clock, text: 'Cancelled' },
    }
    
    const { color, icon: Icon, text } = config[invoice.status]

    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-md text-sm font-medium ${color}`}>
        <Icon className="mr-2 h-4 w-4" />
        {text}
      </span>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/app/billing/invoices')}
            className="p-2 hover:bg-gray-100 rounded-md"
          >
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </button>
          <div>
            <h1 className="text-3xl font-semibold text-gray-900">{invoice.invoiceNumber}</h1>
            <p className="mt-1 text-sm text-gray-600">
              Issued {invoice.issuedAt ? formatDate(invoice.issuedAt) : 'Pending'}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          {getStatusBadge()}
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            <Printer className="mr-2 h-4 w-4" />
            Print
          </button>
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            <Download className="mr-2 h-4 w-4" />
            Download PDF
          </button>
        </div>
      </div>

      {/* Invoice Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Company Info */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-sm font-medium text-gray-500 mb-4">BILL TO</h2>
          <div className="space-y-1">
            <p className="text-base font-semibold text-gray-900">Your Company Name</p>
            <p className="text-sm text-gray-600">123 Business Street</p>
            <p className="text-sm text-gray-600">San Francisco, CA 94105</p>
            <p className="text-sm text-gray-600">finance@company.com</p>
          </div>
        </div>

        {/* Invoice Summary */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-sm font-medium text-gray-500 mb-4">INVOICE DETAILS</h2>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Period:</span>
              <span className="font-medium text-gray-900">
                {formatDate(invoice.periodStart)} - {formatDate(invoice.periodEnd)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Issue Date:</span>
              <span className="font-medium text-gray-900">
                {invoice.issuedAt ? formatDate(invoice.issuedAt) : '-'}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Due Date:</span>
              <span className="font-medium text-gray-900">{formatDate(invoice.dueDate)}</span>
            </div>
            {invoice.paidAt && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Paid Date:</span>
                <span className="font-medium text-green-600">{formatDate(invoice.paidAt)}</span>
              </div>
            )}
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Payment Terms:</span>
              <span className="font-medium text-gray-900">NET 30</span>
            </div>
          </div>
        </div>
      </div>

      {/* Line Items */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Line Items</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantity
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Unit Price
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {invoice.lineItems.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 text-sm text-gray-900">{item.description}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    <span className="inline-flex px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded">
                      {item.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 text-right">{item.quantity}</td>
                  <td className="px-6 py-4 text-sm text-gray-900 text-right">
                    {formatCurrency(item.unitPriceCents)}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 text-right">
                    {formatCurrency(item.totalCents)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals */}
        <div className="border-t border-gray-200 bg-gray-50 px-6 py-4">
          <div className="flex justify-end">
            <div className="w-80 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal:</span>
                <span className="font-medium text-gray-900">{formatCurrency(invoice.subtotalCents)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Tax (6.5%):</span>
                <span className="font-medium text-gray-900">{formatCurrency(invoice.taxCents)}</span>
              </div>
              <div className="flex justify-between text-base font-semibold pt-2 border-t border-gray-300">
                <span className="text-gray-900">Total:</span>
                <span className="text-gray-900">{formatCurrency(invoice.totalCents)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment History */}
      {invoice.payments && invoice.payments.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Payment History</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Method
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {invoice.payments.map((payment) => (
                  <tr key={payment.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatDate(payment.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {payment.paymentMethod.replace('_', ' ')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded ${
                        payment.status === 'SUCCEEDED' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {payment.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-right">
                      {formatCurrency(payment.amountCents)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Footer Note */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
        <p className="text-sm text-gray-600">
          <strong>Note:</strong> This invoice is immutable and serves as an official financial record. 
          For questions or disputes, contact <a href="mailto:billing@eatrite.com" className="text-primary-600 hover:text-primary-900">billing@eatrite.com</a>.
        </p>
      </div>
    </div>
  )
}
