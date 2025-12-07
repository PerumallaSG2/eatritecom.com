import React, { useState } from 'react';
import { 
  DollarSign,
  Calendar,
  FileText,
  Download,
  CheckCircle,
  Clock,
  AlertCircle,
  X,
  CreditCard
} from 'lucide-react';

/**
 * COMPANY ADMIN BILLING & INVOICES PAGE - EatRite Work (Cincinnati)
 * 
 * Purpose: Provides Finance teams with transparent billing history, clear invoice status tracking, 
 * and easy access to payment records for accounting and reconciliation.
 * 
 * Reassurance: "Every charge is documented, predictable, and easy to verify—no hidden fees or billing surprises."
 * 
 * This page prioritizes transparency and Finance-team needs: clear status, downloadable records,
 * and predictable billing structure.
 * 
 * TODO: Connect to billing API
 * TODO: Implement PDF download functionality
 * TODO: Add payment method management
 * TODO: Wire up invoice detail retrieval
 * TODO: Add payment processing integration
 */

interface Invoice {
  id: string;
  invoiceNumber: string;
  period: string;
  amount: number;
  status: 'paid' | 'issued' | 'overdue';
  issueDate: string;
  dueDate: string;
}

const AdminBilling: React.FC = () => {
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  /**
   * Placeholder invoice data
   * TODO: Replace with API data
   */
  const invoices: Invoice[] = [
    {
      id: '1',
      invoiceNumber: 'INV-2025-011',
      period: 'Nov 1-30, 2025',
      amount: 18420,
      status: 'issued',
      issueDate: 'Nov 28, 2025',
      dueDate: 'Dec 15, 2025'
    },
    {
      id: '2',
      invoiceNumber: 'INV-2025-010',
      period: 'Oct 1-31, 2025',
      amount: 17850,
      status: 'paid',
      issueDate: 'Oct 28, 2025',
      dueDate: 'Nov 15, 2025'
    },
    {
      id: '3',
      invoiceNumber: 'INV-2025-009',
      period: 'Sep 1-30, 2025',
      amount: 16920,
      status: 'paid',
      issueDate: 'Sep 28, 2025',
      dueDate: 'Oct 15, 2025'
    },
    {
      id: '4',
      invoiceNumber: 'INV-2025-008',
      period: 'Aug 1-31, 2025',
      amount: 15680,
      status: 'paid',
      issueDate: 'Aug 28, 2025',
      dueDate: 'Sep 15, 2025'
    },
    {
      id: '5',
      invoiceNumber: 'INV-2025-007',
      period: 'Jul 1-31, 2025',
      amount: 14230,
      status: 'paid',
      issueDate: 'Jul 28, 2025',
      dueDate: 'Aug 15, 2025'
    }
  ];

  /**
   * Helper function to render status badge
   */
  const renderStatusBadge = (status: 'paid' | 'issued' | 'overdue') => {
    const config = {
      paid: {
        icon: CheckCircle,
        label: 'Paid',
        color: 'bg-green-100 text-green-700 border-green-200'
      },
      issued: {
        icon: Clock,
        label: 'Issued',
        color: 'bg-blue-100 text-blue-700 border-blue-200'
      },
      overdue: {
        icon: AlertCircle,
        label: 'Overdue',
        color: 'bg-red-100 text-red-700 border-red-200'
      }
    };

    const { icon: Icon, label, color } = config[status];

    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${color}`}>
        <Icon className="w-3.5 h-3.5" />
        {label}
      </span>
    );
  };

  /**
   * Format currency
   */
  const formatCurrency = (cents: number) => {
    return `$${(cents / 100).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  return (
    <>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Section 1: Page Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Billing & Invoices</h1>
            <p className="text-gray-600 mt-2">
              Transparent billing history with no hidden fees
            </p>
          </div>
          
          {/* Current Billing Period Badge */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-2">
            <p className="text-xs text-blue-700 font-medium mb-1">Current Billing Period</p>
            <p className="text-sm font-semibold text-blue-900">Nov 1-30, 2025</p>
          </div>
        </div>

        {/* Section 2: Billing Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Current Balance */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <DollarSign className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Current Balance</h3>
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-2">
              $184.20
            </p>
            <p className="text-sm text-gray-600">
              Invoice issued • Due Dec 15
            </p>
          </div>

          {/* Card 2: Next Invoice Date */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Calendar className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Next Invoice</h3>
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-2">
              Dec 28
            </p>
            <p className="text-sm text-gray-600">
              For period Dec 1-31, 2025
            </p>
          </div>

          {/* Card 3: Year-to-Date Spend */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <FileText className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Year-to-Date</h3>
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-2">
              $183,100
            </p>
            <p className="text-sm text-gray-600">
              Total spend in 2025
            </p>
          </div>
        </div>

        {/* Section 3: Invoices Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Invoice History</h2>
            <p className="text-sm text-gray-600 mt-1">
              All invoices are available for download and archived for your records
            </p>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Invoice #
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Period
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Issue Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Due Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {invoices.map((invoice) => (
                  <tr
                    key={invoice.id}
                    onClick={() => setSelectedInvoice(invoice)}
                    className="hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-gray-900">
                        {invoice.invoiceNumber}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-700">
                        {invoice.period}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-semibold text-gray-900">
                        {formatCurrency(invoice.amount)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {renderStatusBadge(invoice.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-600">
                        {invoice.issueDate}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-600">
                        {invoice.dueDate}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          // TODO: Implement PDF download
                        }}
                        className="text-primary-600 hover:text-primary-700 transition-colors"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table Footer */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Showing {invoices.length} invoices • All payments processed securely
            </p>
          </div>
        </div>

        {/* Billing Information Panel */}
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border border-blue-100 p-8">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-white rounded-lg shadow-sm">
              <CreditCard className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Payment Information
              </h3>
              <p className="text-sm text-gray-700 mb-4">
                Your payment method is securely stored and charged automatically on the due date. 
                You'll receive email confirmation for every transaction.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <p className="text-xs text-gray-600 mb-1">Payment Method</p>
                  <p className="text-sm font-medium text-gray-900">•••• •••• •••• 4242</p>
                  <p className="text-xs text-gray-500 mt-1">Visa ending in 4242</p>
                </div>
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <p className="text-xs text-gray-600 mb-1">Billing Contact</p>
                  <p className="text-sm font-medium text-gray-900">finance@cincymfg.com</p>
                  <p className="text-xs text-gray-500 mt-1">Invoice notifications sent here</p>
                </div>
              </div>
              <button className="mt-4 text-sm text-primary-600 hover:text-primary-700 font-medium">
                Update Payment Method →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Section 4: Invoice Detail Panel (Slide-in) */}
      {selectedInvoice && (
        <>
          {/* Overlay */}
          <div
            onClick={() => setSelectedInvoice(null)}
            className="fixed inset-0 bg-black/50 z-40 transition-opacity"
          />

          {/* Panel */}
          <div className="fixed right-0 top-0 h-full w-full max-w-2xl bg-white shadow-2xl z-50 flex flex-col">
            {/* Panel Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  {selectedInvoice.invoiceNumber}
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  Invoice Details
                </p>
              </div>
              <button
                onClick={() => setSelectedInvoice(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Panel Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Invoice Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-600 mb-1">Billing Period</p>
                  <p className="text-sm font-medium text-gray-900">{selectedInvoice.period}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">Status</p>
                  {renderStatusBadge(selectedInvoice.status)}
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">Issue Date</p>
                  <p className="text-sm font-medium text-gray-900">{selectedInvoice.issueDate}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">Due Date</p>
                  <p className="text-sm font-medium text-gray-900">{selectedInvoice.dueDate}</p>
                </div>
              </div>

              {/* Line Items */}
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-4">Line Items</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-700">Base Subscription Fee</span>
                    <span className="font-medium text-gray-900">$50.00</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-700">Per-Employee Fee (142 active users × $1.15)</span>
                    <span className="font-medium text-gray-900">$163.30</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-700">Platform Fee</span>
                    <span className="font-medium text-gray-900">$12.00</span>
                  </div>
                  
                  <div className="pt-3 border-t border-gray-300">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-gray-700">Subtotal</span>
                      <span className="font-medium text-gray-900">$225.30</span>
                    </div>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-gray-700">Tax (8.25%)</span>
                      <span className="font-medium text-gray-900">$18.59</span>
                    </div>
                    <div className="flex items-center justify-between text-base font-semibold pt-2 border-t border-gray-300">
                      <span className="text-gray-900">Total</span>
                      <span className="text-gray-900">{formatCurrency(selectedInvoice.amount)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Usage Summary */}
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                <h3 className="font-semibold text-gray-900 mb-3">Usage Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Total Orders</span>
                    <span className="font-medium text-gray-900">1,847</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Active Employees</span>
                    <span className="font-medium text-gray-900">142</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Avg Orders Per Employee</span>
                    <span className="font-medium text-gray-900">13.0</span>
                  </div>
                </div>
              </div>

              {/* Payment Information (if paid) */}
              {selectedInvoice.status === 'paid' && (
                <div className="bg-green-50 rounded-lg p-4 border border-green-100">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Payment Confirmed</h3>
                      <p className="text-sm text-gray-700 mb-2">
                        Paid on Nov 10, 2025
                      </p>
                      <p className="text-xs text-gray-600">
                        Payment method: Visa •••• 4242
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Panel Footer */}
            <div className="border-t border-gray-200 p-6 bg-gray-50">
              <div className="flex gap-3">
                <button className="flex-1 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
                  <Download className="w-4 h-4" />
                  Download PDF
                </button>
                <button className="flex-1 bg-white hover:bg-gray-50 border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors">
                  Print Invoice
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AdminBilling;
