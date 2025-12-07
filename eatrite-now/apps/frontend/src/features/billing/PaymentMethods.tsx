/**
 * Payment Methods Page
 * Manage payment accounts (Stripe hidden behind UI)
 * 
 * Features:
 * - List payment methods
 * - Add new payment method (Stripe Elements)
 * - Set default method
 * - Remove methods
 * - Secure, PCI-compliant
 */

import React, { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { CreditCard, Plus, Trash2, Check } from 'lucide-react'

interface PaymentMethod {
  id: string
  type: string
  last4: string
  brand: string
  expiryMonth: number
  expiryYear: number
  isDefault: boolean
  createdAt: string
}

export const PaymentMethods: React.FC = () => {
  const queryClient = useQueryClient()
  const [showAddForm, setShowAddForm] = useState(false)

  const { data: methods, isLoading } = useQuery<PaymentMethod[]>({
    queryKey: ['payment-methods'],
    queryFn: async () => {
      // TODO: Replace with actual API call to /api/v1/billing/payment-methods
      return [
        {
          id: 'pm_1',
          type: 'card',
          last4: '4242',
          brand: 'Visa',
          expiryMonth: 12,
          expiryYear: 2026,
          isDefault: true,
          createdAt: '2025-01-15',
        },
        {
          id: 'pm_2',
          type: 'card',
          last4: '5555',
          brand: 'Mastercard',
          expiryMonth: 8,
          expiryYear: 2027,
          isDefault: false,
          createdAt: '2025-03-20',
        },
      ]
    },
  })

  const setDefaultMutation = useMutation({
    mutationFn: async (methodId: string) => {
      // TODO: API call to set default
      console.log('Setting default:', methodId)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payment-methods'] })
    },
  })

  const removeMutation = useMutation({
    mutationFn: async (methodId: string) => {
      // TODO: API call to remove
      console.log('Removing:', methodId)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payment-methods'] })
    },
  })

  const getBrandIcon = (_brand: string) => {
    // In production, use actual card brand logos
    return <CreditCard className="h-6 w-6 text-gray-600" />
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary-600 border-r-transparent"></div>
          <p className="mt-4 text-sm text-gray-600">Loading payment methods...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">Payment Methods</h1>
          <p className="mt-2 text-sm text-gray-600">
            Manage your payment accounts securely
          </p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Payment Method
        </button>
      </div>

      {/* Payment Methods List */}
      <div className="space-y-4">
        {methods?.map((method) => (
          <div
            key={method.id}
            className="bg-white border border-gray-200 rounded-lg p-6"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-gray-50 rounded-lg">
                  {getBrandIcon(method.brand)}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="text-base font-semibold text-gray-900">
                      {method.brand} •••• {method.last4}
                    </h3>
                    {method.isDefault && (
                      <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-primary-100 text-primary-800">
                        <Check className="mr-1 h-3 w-3" />
                        Default
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-gray-600">
                    Expires {method.expiryMonth.toString().padStart(2, '0')}/{method.expiryYear}
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    Added {new Date(method.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                {!method.isDefault && (
                  <button
                    onClick={() => setDefaultMutation.mutate(method.id)}
                    disabled={setDefaultMutation.isPending}
                    className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                  >
                    Set as Default
                  </button>
                )}
                <button
                  onClick={() => {
                    if (window.confirm('Are you sure you want to remove this payment method?')) {
                      removeMutation.mutate(method.id)
                    }
                  }}
                  disabled={method.isDefault || removeMutation.isPending}
                  className="p-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  title={method.isDefault ? 'Cannot remove default payment method' : 'Remove payment method'}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Payment Method Form */}
      {showAddForm && (
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Add New Payment Method</h2>
            <p className="mt-1 text-sm text-gray-600">
              Enter your card details securely
            </p>
          </div>

          {/* Stripe Elements would go here in production */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Card Number
              </label>
              <input
                type="text"
                placeholder="1234 5678 9012 3456"
                className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expiry Date
                </label>
                <input
                  type="text"
                  placeholder="MM / YY"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  CVC
                </label>
                <input
                  type="text"
                  placeholder="123"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cardholder Name
              </label>
              <input
                type="text"
                placeholder="Full name as shown on card"
                className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            <div className="flex items-center">
              <input
                id="set-default"
                type="checkbox"
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label htmlFor="set-default" className="ml-2 text-sm text-gray-700">
                Set as default payment method
              </label>
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              Cancel
            </button>
            <button className="px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-primary-600 hover:bg-primary-700">
              Add Payment Method
            </button>
          </div>

          <div className="mt-4 p-4 bg-gray-50 rounded-md">
            <p className="text-xs text-gray-600">
              <strong>Security:</strong> Your payment information is encrypted and securely processed. 
              We are PCI DSS Level 1 compliant and never store your full card details.
            </p>
          </div>
        </div>
      )}

      {/* Empty State */}
      {methods?.length === 0 && !showAddForm && (
        <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
          <CreditCard className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-4 text-base font-medium text-gray-900">No payment methods</h3>
          <p className="mt-2 text-sm text-gray-600">
            Add a payment method to enable automatic billing
          </p>
          <button
            onClick={() => setShowAddForm(true)}
            className="mt-6 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Payment Method
          </button>
        </div>
      )}

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-sm font-medium text-blue-900 mb-2">Payment Terms</h3>
        <p className="text-sm text-blue-700">
          Your account is configured for <strong>NET 30</strong> payment terms. 
          Payment methods are charged automatically when invoices are due. 
          Contact finance@eatrite.com to modify payment terms.
        </p>
      </div>
    </div>
  )
}
