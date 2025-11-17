import React, { useState } from 'react'
import {
  Calendar,
  Clock,
  PauseCircle,
  Play,
  Settings,
  Truck,
  CheckCircle,
  AlertCircle,
  Package,
  DollarSign,
} from 'lucide-react'
import { FadeIn, StaggeredAnimation } from './AnimationComponents'

interface SubscriptionPlan {
  id: string
  name: string
  mealsPerWeek: number
  servings: number
  pricePerServing: number
  totalPrice: number
  description: string
  popular?: boolean
}

interface BillingHistory {
  id: string
  date: string
  amount: number
  status: 'paid' | 'pending' | 'failed'
  invoice: string
  period: string
}

interface DeliverySchedule {
  id: string
  date: string
  status: 'upcoming' | 'delivered' | 'in-transit' | 'cancelled'
  meals: string[]
  trackingNumber?: string
}

const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: 'plan-4-meals',
    name: '4 Meals',
    mealsPerWeek: 4,
    servings: 2,
    pricePerServing: 15.0,
    totalPrice: 120.0,
    description: 'Perfect for couples or small families',
  },
  {
    id: 'plan-6-meals',
    name: '6 Meals',
    mealsPerWeek: 6,
    servings: 2,
    pricePerServing: 13.5,
    totalPrice: 162.0,
    description: 'Great value for regular meal planning',
    popular: true,
  },
  {
    id: 'plan-8-meals',
    name: '8 Meals',
    mealsPerWeek: 8,
    servings: 2,
    pricePerServing: 12.5,
    totalPrice: 200.0,
    description: 'Best savings for large families',
  },
  {
    id: 'plan-12-meals',
    name: '12 Meals',
    mealsPerWeek: 12,
    servings: 2,
    pricePerServing: 11.5,
    totalPrice: 276.0,
    description: 'Maximum convenience and savings',
  },
]

const mockBillingHistory: BillingHistory[] = [
  {
    id: 'bill-1',
    date: '2024-01-15',
    amount: 162.0,
    status: 'paid',
    invoice: 'INV-2024-001',
    period: 'Jan 15 - Jan 22, 2024',
  },
  {
    id: 'bill-2',
    date: '2024-01-08',
    amount: 162.0,
    status: 'paid',
    invoice: 'INV-2024-002',
    period: 'Jan 8 - Jan 15, 2024',
  },
  {
    id: 'bill-3',
    date: '2024-01-01',
    amount: 162.0,
    status: 'paid',
    invoice: 'INV-2024-003',
    period: 'Jan 1 - Jan 8, 2024',
  },
]

const mockDeliverySchedule: DeliverySchedule[] = [
  {
    id: 'delivery-1',
    date: '2024-01-22',
    status: 'upcoming',
    meals: [
      'Grilled Chicken & Vegetables',
      'Salmon with Quinoa',
      'Beef Steak & Sweet Potato',
    ],
  },
  {
    id: 'delivery-2',
    date: '2024-01-15',
    status: 'delivered',
    meals: ['Turkey Meatballs', 'Cod Fish & Rice', 'Chicken Caesar Bowl'],
    trackingNumber: 'TRK123456789',
  },
  {
    id: 'delivery-3',
    date: '2024-01-08',
    status: 'delivered',
    meals: ['Pork Tenderloin', 'Shrimp Scampi', 'Vegetarian Bowl'],
    trackingNumber: 'TRK987654321',
  },
]

export const SubscriptionManagement: React.FC = () => {
  const [currentPlan, setCurrentPlan] = useState(subscriptionPlans[1]) // 6 Meals plan
  const [subscriptionStatus, setSubscriptionStatus] = useState<
    'active' | 'paused' | 'cancelled'
  >('active')
  const [showPlanSelector, setShowPlanSelector] = useState(false)
  const [activeTab, setActiveTab] = useState<
    'overview' | 'billing' | 'delivery'
  >('overview')
  const [nextDeliveryDate] = useState('January 22, 2024')

  const handlePlanChange = (plan: SubscriptionPlan) => {
    setCurrentPlan(plan)
    setShowPlanSelector(false)
  }

  const handleStatusChange = (newStatus: 'active' | 'paused' | 'cancelled') => {
    setSubscriptionStatus(newStatus)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
      case 'paid':
      case 'delivered':
        return 'text-green-600 bg-green-50'
      case 'paused':
      case 'pending':
      case 'in-transit':
        return 'text-yellow-600 bg-yellow-50'
      case 'cancelled':
      case 'failed':
        return 'text-red-600 bg-red-50'
      default:
        return 'text-gray-600 bg-gray-50'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
      case 'paid':
      case 'delivered':
        return <CheckCircle className="w-4 h-4" />
      case 'paused':
      case 'pending':
      case 'in-transit':
        return <Clock className="w-4 h-4" />
      case 'cancelled':
      case 'failed':
        return <AlertCircle className="w-4 h-4" />
      default:
        return <Package className="w-4 h-4" />
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <FadeIn>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Subscription Management
          </h1>
          <p className="text-gray-600">
            Manage your meal plan, billing, and delivery preferences
          </p>
        </div>
      </FadeIn>

      {/* Status Cards */}
      <FadeIn delay={0.2}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Current Plan
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {currentPlan.name}
                </p>
                <p className="text-sm text-gray-500">
                  {currentPlan.mealsPerWeek} meals/week
                </p>
              </div>
              <Package className="w-8 h-8 text-green-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Status</p>
                <div className="flex items-center space-x-2">
                  <span
                    className={`inline-flex items-center px-2 py-1 rounded-full text-sm font-medium ${getStatusColor(subscriptionStatus)}`}
                  >
                    {getStatusIcon(subscriptionStatus)}
                    <span className="ml-1 capitalize">
                      {subscriptionStatus}
                    </span>
                  </span>
                </div>
              </div>
              <Settings className="w-8 h-8 text-blue-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Next Delivery
                </p>
                <p className="text-lg font-bold text-gray-900">
                  {nextDeliveryDate}
                </p>
                <p className="text-sm text-gray-500">3 days remaining</p>
              </div>
              <Truck className="w-8 h-8 text-purple-500" />
            </div>
          </div>
        </div>
      </FadeIn>

      {/* Quick Actions */}
      <FadeIn delay={0.3}>
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Quick Actions
          </h2>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => setShowPlanSelector(!showPlanSelector)}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Settings className="w-4 h-4" />
              <span>Change Plan</span>
            </button>

            {subscriptionStatus === 'active' ? (
              <button
                onClick={() => handleStatusChange('paused')}
                className="flex items-center space-x-2 bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors"
              >
                <PauseCircle className="w-4 h-4" />
                <span>Pause Subscription</span>
              </button>
            ) : subscriptionStatus === 'paused' ? (
              <button
                onClick={() => handleStatusChange('active')}
                className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                <Play className="w-4 h-4" />
                <span>Resume Subscription</span>
              </button>
            ) : null}

            <button className="flex items-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors">
              <Calendar className="w-4 h-4" />
              <span>Skip Next Delivery</span>
            </button>
          </div>
        </div>
      </FadeIn>

      {/* Plan Selector Modal */}
      {showPlanSelector && (
        <FadeIn>
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8 border-2 border-blue-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">
                Choose Your Plan
              </h3>
              <button
                onClick={() => setShowPlanSelector(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <StaggeredAnimation className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {subscriptionPlans.map(plan => (
                <div
                  key={plan.id}
                  className={`relative border-2 rounded-lg p-4 cursor-pointer transition-all ${
                    plan.id === currentPlan.id
                      ? 'border-green-500 bg-green-50'
                      : plan.popular
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => handlePlanChange(plan)}
                >
                  {plan.popular && (
                    <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                      <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-semibold">
                        POPULAR
                      </span>
                    </div>
                  )}
                  <div className="text-center">
                    <h4 className="font-semibold text-gray-900">{plan.name}</h4>
                    <p className="text-2xl font-bold text-gray-900 mt-2">
                      ${plan.pricePerServing}
                      <span className="text-sm font-normal text-gray-600">
                        /serving
                      </span>
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      {plan.mealsPerWeek} meals/week
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                      {plan.description}
                    </p>
                    <p className="text-sm font-semibold text-gray-900 mt-2">
                      Total: ${plan.totalPrice}/week
                    </p>
                  </div>
                </div>
              ))}
            </StaggeredAnimation>
          </div>
        </FadeIn>
      )}

      {/* Tab Navigation */}
      <FadeIn delay={0.4}>
        <div className="bg-white rounded-lg shadow-md mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex">
              {[
                { id: 'overview', label: 'Overview', icon: Package },
                { id: 'billing', label: 'Billing History', icon: DollarSign },
                { id: 'delivery', label: 'Delivery Schedule', icon: Truck },
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id as any)}
                  className={`flex items-center space-x-2 px-6 py-3 border-b-2 font-medium text-sm ${
                    activeTab === id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{label}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <FadeIn>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Subscription Overview
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">
                        Current Plan Details
                      </h4>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Plan:</span>
                            <span className="font-medium">
                              {currentPlan.name}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">
                              Meals per week:
                            </span>
                            <span className="font-medium">
                              {currentPlan.mealsPerWeek}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Servings:</span>
                            <span className="font-medium">
                              {currentPlan.servings} per meal
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">
                              Price per serving:
                            </span>
                            <span className="font-medium">
                              ${currentPlan.pricePerServing}
                            </span>
                          </div>
                          <div className="flex justify-between border-t pt-2">
                            <span className="text-gray-900 font-semibold">
                              Total per week:
                            </span>
                            <span className="font-bold text-green-600">
                              ${currentPlan.totalPrice}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">
                        Subscription Stats
                      </h4>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Member since:</span>
                            <span className="font-medium">December 2023</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Total orders:</span>
                            <span className="font-medium">12</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">
                              Meals delivered:
                            </span>
                            <span className="font-medium">72</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Total saved:</span>
                            <span className="font-medium text-green-600">
                              $240
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            )}

            {activeTab === 'billing' && (
              <FadeIn>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Billing History
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Period
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Amount
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Invoice
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {mockBillingHistory.map(bill => (
                          <tr key={bill.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {new Date(bill.date).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {bill.period}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              ${bill.amount.toFixed(2)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span
                                className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(bill.status)}`}
                              >
                                {getStatusIcon(bill.status)}
                                <span className="ml-1 capitalize">
                                  {bill.status}
                                </span>
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 hover:text-blue-800">
                              <button className="hover:underline">
                                {bill.invoice}
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </FadeIn>
            )}

            {activeTab === 'delivery' && (
              <FadeIn>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Delivery Schedule
                  </h3>
                  <div className="space-y-4">
                    {mockDeliverySchedule.map(delivery => (
                      <div
                        key={delivery.id}
                        className="bg-gray-50 rounded-lg p-4"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <div className="flex-shrink-0">
                              <Calendar className="w-5 h-5 text-gray-400" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">
                                {new Date(delivery.date).toLocaleDateString(
                                  'en-US',
                                  {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                  }
                                )}
                              </p>
                              {delivery.trackingNumber && (
                                <p className="text-xs text-gray-500">
                                  Tracking: {delivery.trackingNumber}
                                </p>
                              )}
                            </div>
                          </div>
                          <span
                            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(delivery.status)}`}
                          >
                            {getStatusIcon(delivery.status)}
                            <span className="ml-1 capitalize">
                              {delivery.status.replace('-', ' ')}
                            </span>
                          </span>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 mb-2">
                            Meals included:
                          </p>
                          <ul className="text-sm text-gray-700 space-y-1">
                            {delivery.meals.map((meal, index) => (
                              <li
                                key={index}
                                className="flex items-center space-x-2"
                              >
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                <span>{meal}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>
            )}
          </div>
        </div>
      </FadeIn>
    </div>
  )
}

export default SubscriptionManagement
