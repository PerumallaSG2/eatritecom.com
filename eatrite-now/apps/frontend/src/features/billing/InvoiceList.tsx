/**
 * Invoice List Page
 * CFO-Grade Invoice Management
 * 
 * Features:
 * - Searchable table
 * - Status filters
 * - Date range filtering
 * - Bulk download
 * - Immutable records
 */

import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { Search, Download, Filter, ChevronDown, FileText } from 'lucide-react'
import type { Invoice, InvoiceStatus } from '../../shared/types'

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
    month: 'short',
    day: 'numeric',
  })
}

const STATUS_COLORS: Record<InvoiceStatus, string> = {
  DRAFT: 'bg-gray-100 text-gray-800',
  ISSUED: 'bg-blue-100 text-blue-800',
  PAID: 'bg-green-100 text-green-800',
  OVERDUE: 'bg-red-100 text-red-800',
  CANCELLED: 'bg-gray-100 text-gray-800',
}

export const InvoiceList: React.FC = () => {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<InvoiceStatus | 'ALL'>('ALL')
  const [selectedInvoices, setSelectedInvoices] = useState<string[]>([])

  const { data: invoices, isLoading } = useQuery<Invoice[]>({
    queryKey: ['invoices', statusFilter],
    queryFn: async () => {
      // TODO: Replace with actual API call to /api/v1/billing/invoices
      return [
        {
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
        },
        {
          id: '2',
          companyId: 'comp_1',
          invoiceNumber: 'INV-2025-10-001',
          periodStart: '2025-10-01',
          periodEnd: '2025-10-31',
          status: 'PAID',
          subtotalCents: 2180000,
          taxCents: 140000,
          totalCents: 2320000,
          currency: 'USD',
          dueDate: '2025-11-15',
          issuedAt: '2025-10-31',
          paidAt: '2025-11-12',
          createdAt: '2025-10-31',
          updatedAt: '2025-11-12',
        },
        {
          id: '3',
          companyId: 'comp_1',
          invoiceNumber: 'INV-2025-12-001',
          periodStart: '2025-12-01',
          periodEnd: '2025-12-31',
          status: 'ISSUED',
          subtotalCents: 2500000,
          taxCents: 162500,
          totalCents: 2662500,
          currency: 'USD',
          dueDate: '2026-01-15',
          issuedAt: '2025-12-30',
          createdAt: '2025-12-30',
          updatedAt: '2025-12-30',
        },
      ]
    },
  })

  const filteredInvoices = invoices?.filter((invoice) => {
    const matchesSearch = invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'ALL' || invoice.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleSelectAll = (checked: boolean) => {
    if (checked && filteredInvoices) {
      setSelectedInvoices(filteredInvoices.map((inv) => inv.id))
    } else {
      setSelectedInvoices([])
    }
  }

  const handleSelectInvoice = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedInvoices([...selectedInvoices, id])
    } else {
      setSelectedInvoices(selectedInvoices.filter((invId) => invId !== id))
    }
  }

  const handleBulkDownload = () => {
    console.log('Downloading invoices:', selectedInvoices)
    // TODO: Implement bulk download
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary-600 border-r-transparent"></div>
          <p className="mt-4 text-sm text-gray-600">Loading invoices...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">Invoices</h1>
          <p className="mt-2 text-sm text-gray-600">
            Complete invoice history and records
          </p>
        </div>
        {selectedInvoices.length > 0 && (
          <button
            onClick={handleBulkDownload}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <Download className="mr-2 h-4 w-4" />
            Download ({selectedInvoices.length})
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by invoice number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as InvoiceStatus | 'ALL')}
              className="appearance-none pl-10 pr-10 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
            >
              <option value="ALL">All Statuses</option>
              <option value="DRAFT">Draft</option>
              <option value="ISSUED">Issued</option>
              <option value="PAID">Paid</option>
              <option value="OVERDUE">Overdue</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="w-12 px-6 py-3">
                  <input
                    type="checkbox"
                    checked={
                      (filteredInvoices?.length ?? 0) > 0 &&
                      selectedInvoices.length === (filteredInvoices?.length ?? 0)
                    }
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Invoice #
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Period
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Issue Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Due Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredInvoices?.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={selectedInvoices.includes(invoice.id)}
                      onChange={(e) => handleSelectInvoice(invoice.id, e.target.checked)}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 text-gray-400 mr-2" />
                      <span className="text-sm font-medium text-gray-900">
                        {invoice.invoiceNumber}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {formatDate(invoice.periodStart)} - {formatDate(invoice.periodEnd)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {invoice.issuedAt ? formatDate(invoice.issuedAt) : '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {formatDate(invoice.dueDate)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-md ${STATUS_COLORS[invoice.status]}`}>
                      {invoice.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-right">
                    {formatCurrency(invoice.totalCents)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => navigate(`/app/billing/invoices/${invoice.id}`)}
                      className="text-primary-600 hover:text-primary-900 mr-4"
                    >
                      View
                    </button>
                    <button className="text-gray-600 hover:text-gray-900">
                      <Download className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredInvoices?.length === 0 && (
          <div className="text-center py-12">
            <FileText className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No invoices found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm || statusFilter !== 'ALL'
                ? 'Try adjusting your search or filters'
                : 'Invoices will appear here once generated'}
            </p>
          </div>
        )}
      </div>

      {/* Summary */}
      {filteredInvoices && filteredInvoices.length > 0 && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">
              Showing {filteredInvoices.length} invoice{filteredInvoices.length !== 1 ? 's' : ''}
            </span>
            <span className="font-medium text-gray-900">
              Total: {formatCurrency(
                filteredInvoices.reduce((sum, inv) => sum + inv.totalCents, 0)
              )}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
