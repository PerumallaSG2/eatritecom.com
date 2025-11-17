import React, { useState } from 'react'
import {
  Gift,
  Tag,
  Copy,
  Share,
  Users,
  CheckCircle,
  AlertCircle,
  DollarSign,
  Percent,
  Clock,
} from 'lucide-react'
import { FadeIn, StaggeredAnimation } from './AnimationComponents'

interface PromoCode {
  id: string
  code: string
  type: 'percentage' | 'fixed_amount' | 'free_shipping' | 'bogo'
  value: number
  description: string
  minOrderAmount?: number
  maxDiscount?: number
  expiryDate: string
  usageLimit?: number
  usedCount: number
  isActive: boolean
  category: 'new_customer' | 'loyalty' | 'seasonal' | 'referral'
}

interface ReferralProgram {
  totalReferrals: number
  successfulReferrals: number
  totalEarned: number
  pendingRewards: number
  referralCode: string
  referralLink: string
}

const mockPromoCodes: PromoCode[] = [
  {
    id: 'promo-1',
    code: 'WELCOME50',
    type: 'percentage',
    value: 50,
    description: 'Welcome offer: 50% off your first order',
    minOrderAmount: 50,
    maxDiscount: 30,
    expiryDate: '2024-03-31T23:59:59Z',
    usageLimit: 1,
    usedCount: 0,
    isActive: true,
    category: 'new_customer',
  },
  {
    id: 'promo-2',
    code: 'FREESHIP',
    type: 'free_shipping',
    value: 0,
    description: 'Free shipping on any order',
    minOrderAmount: 25,
    expiryDate: '2024-02-29T23:59:59Z',
    usedCount: 0,
    isActive: true,
    category: 'loyalty',
  },
  {
    id: 'promo-3',
    code: 'SAVE15',
    type: 'fixed_amount',
    value: 15,
    description: '$15 off orders over $100',
    minOrderAmount: 100,
    expiryDate: '2024-02-15T23:59:59Z',
    usageLimit: 3,
    usedCount: 1,
    isActive: true,
    category: 'seasonal',
  },
  {
    id: 'promo-4',
    code: 'EXPIRED10',
    type: 'percentage',
    value: 10,
    description: '10% off any order (Expired)',
    expiryDate: '2024-01-15T23:59:59Z',
    usedCount: 2,
    isActive: false,
    category: 'loyalty',
  },
]

const mockReferralProgram: ReferralProgram = {
  totalReferrals: 8,
  successfulReferrals: 5,
  totalEarned: 75.0,
  pendingRewards: 25.0,
  referralCode: 'JOHN2024',
  referralLink: 'https://factor75.com/ref/JOHN2024',
}

export const PromoCodes: React.FC = () => {
  const [promoCodes, setPromoCodes] = useState<PromoCode[]>(mockPromoCodes)
  const [referralProgram] = useState<ReferralProgram>(mockReferralProgram)
  const [activeTab, setActiveTab] = useState<
    'available' | 'referral' | 'history'
  >('available')
  const [copiedCode, setCopiedCode] = useState<string | null>(null)
  const [newPromoCode, setNewPromoCode] = useState('')
  const [promoError, setPromoError] = useState('')
  const [promoSuccess, setPromoSuccess] = useState('')

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(code)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const handleCopyReferralLink = () => {
    navigator.clipboard.writeText(referralProgram.referralLink)
    setCopiedCode('referral-link')
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const handleApplyPromoCode = (e: React.FormEvent) => {
    e.preventDefault()
    setPromoError('')
    setPromoSuccess('')

    if (!newPromoCode.trim()) {
      setPromoError('Please enter a promo code')
      return
    }

    const code = promoCodes.find(
      p => p.code.toLowerCase() === newPromoCode.toLowerCase() && p.isActive
    )

    if (!code) {
      setPromoError('Invalid or expired promo code')
      return
    }

    if (code.usageLimit && code.usedCount >= code.usageLimit) {
      setPromoError('This promo code has reached its usage limit')
      return
    }

    if (new Date(code.expiryDate) < new Date()) {
      setPromoError('This promo code has expired')
      return
    }

    setPromoSuccess(`Promo code "${code.code}" applied successfully!`)
    setNewPromoCode('')

    // Update usage count
    setPromoCodes(
      promoCodes.map(p =>
        p.id === code.id ? { ...p, usedCount: p.usedCount + 1 } : p
      )
    )
  }

  const formatDiscountValue = (code: PromoCode) => {
    switch (code.type) {
      case 'percentage':
        return `${code.value}% OFF`
      case 'fixed_amount':
        return `$${code.value} OFF`
      case 'free_shipping':
        return 'FREE SHIPPING'
      case 'bogo':
        return 'BUY 1 GET 1'
      default:
        return 'DISCOUNT'
    }
  }

  const getPromoIcon = (type: PromoCode['type']) => {
    switch (type) {
      case 'percentage':
        return <Percent className="w-5 h-5" />
      case 'fixed_amount':
        return <DollarSign className="w-5 h-5" />
      case 'free_shipping':
        return <Gift className="w-5 h-5" />
      case 'bogo':
        return <Tag className="w-5 h-5" />
      default:
        return <Tag className="w-5 h-5" />
    }
  }

  const getCategoryColor = (category: PromoCode['category']) => {
    switch (category) {
      case 'new_customer':
        return 'bg-blue-100 text-blue-800'
      case 'loyalty':
        return 'bg-purple-100 text-purple-800'
      case 'seasonal':
        return 'bg-orange-100 text-orange-800'
      case 'referral':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const activePromoCodes = promoCodes.filter(
    code => code.isActive && new Date(code.expiryDate) > new Date()
  )
  const expiredPromoCodes = promoCodes.filter(
    code => !code.isActive || new Date(code.expiryDate) <= new Date()
  )

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <FadeIn>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Promo Codes & Rewards
          </h1>
          <p className="text-gray-600">
            Save money with exclusive promo codes and earn rewards through
            referrals
          </p>
        </div>
      </FadeIn>

      {/* Tab Navigation */}
      <FadeIn delay={0.1}>
        <div className="bg-white rounded-lg shadow-md mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex">
              {[
                { id: 'available', label: 'Available Codes', icon: Tag },
                { id: 'referral', label: 'Referral Program', icon: Users },
                { id: 'history', label: 'Usage History', icon: Clock },
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
            {/* Apply Promo Code Section */}
            <FadeIn delay={0.2}>
              <div className="mb-8 p-4 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Apply Promo Code
                </h3>
                <form
                  onSubmit={handleApplyPromoCode}
                  className="flex space-x-4"
                >
                  <div className="flex-1">
                    <input
                      type="text"
                      value={newPromoCode}
                      onChange={e =>
                        setNewPromoCode(e.target.value.toUpperCase())
                      }
                      placeholder="Enter promo code"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {promoError && (
                      <p className="text-red-600 text-sm mt-1 flex items-center space-x-1">
                        <AlertCircle className="w-4 h-4" />
                        <span>{promoError}</span>
                      </p>
                    )}
                    {promoSuccess && (
                      <p className="text-green-600 text-sm mt-1 flex items-center space-x-1">
                        <CheckCircle className="w-4 h-4" />
                        <span>{promoSuccess}</span>
                      </p>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium"
                  >
                    Apply Code
                  </button>
                </form>
              </div>
            </FadeIn>

            {activeTab === 'available' && (
              <FadeIn>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">
                    Available Promo Codes
                  </h3>

                  {activePromoCodes.length === 0 ? (
                    <div className="text-center py-8">
                      <Tag className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500">
                        No active promo codes available
                      </p>
                    </div>
                  ) : (
                    <StaggeredAnimation className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {activePromoCodes.map(code => (
                        <div
                          key={code.id}
                          className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                        >
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center space-x-3">
                              <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                                {getPromoIcon(code.type)}
                              </div>
                              <div>
                                <div className="flex items-center space-x-2">
                                  <h4 className="font-bold text-lg text-gray-900">
                                    {code.code}
                                  </h4>
                                  <span
                                    className={`px-2 py-1 rounded text-xs font-medium ${getCategoryColor(code.category)}`}
                                  >
                                    {code.category
                                      .replace('_', ' ')
                                      .toUpperCase()}
                                  </span>
                                </div>
                                <p className="text-2xl font-bold text-blue-600">
                                  {formatDiscountValue(code)}
                                </p>
                              </div>
                            </div>
                            <button
                              onClick={() => handleCopyCode(code.code)}
                              className="flex items-center space-x-1 px-3 py-1 text-blue-600 border border-blue-300 rounded hover:bg-blue-50"
                            >
                              {copiedCode === code.code ? (
                                <>
                                  <CheckCircle className="w-4 h-4" />
                                  <span className="text-sm">Copied!</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-4 h-4" />
                                  <span className="text-sm">Copy</span>
                                </>
                              )}
                            </button>
                          </div>

                          <p className="text-gray-600 mb-4">
                            {code.description}
                          </p>

                          <div className="space-y-2 text-sm text-gray-500">
                            {code.minOrderAmount && (
                              <p>• Minimum order: ${code.minOrderAmount}</p>
                            )}
                            {code.maxDiscount && (
                              <p>• Maximum discount: ${code.maxDiscount}</p>
                            )}
                            <p>
                              • Expires:{' '}
                              {new Date(code.expiryDate).toLocaleDateString()}
                            </p>
                            {code.usageLimit && (
                              <p>
                                • Uses remaining:{' '}
                                {code.usageLimit - code.usedCount}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </StaggeredAnimation>
                  )}
                </div>
              </FadeIn>
            )}

            {activeTab === 'referral' && (
              <FadeIn>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">
                    Referral Program
                  </h3>

                  {/* Referral Stats */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-blue-50 rounded-lg p-4 text-center">
                      <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                      <p className="text-2xl font-bold text-blue-900">
                        {referralProgram.totalReferrals}
                      </p>
                      <p className="text-sm text-blue-600">Total Referrals</p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4 text-center">
                      <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                      <p className="text-2xl font-bold text-green-900">
                        {referralProgram.successfulReferrals}
                      </p>
                      <p className="text-sm text-green-600">Successful</p>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-4 text-center">
                      <DollarSign className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                      <p className="text-2xl font-bold text-purple-900">
                        ${referralProgram.totalEarned}
                      </p>
                      <p className="text-sm text-purple-600">Total Earned</p>
                    </div>
                    <div className="bg-orange-50 rounded-lg p-4 text-center">
                      <Clock className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                      <p className="text-2xl font-bold text-orange-900">
                        ${referralProgram.pendingRewards}
                      </p>
                      <p className="text-sm text-orange-600">Pending</p>
                    </div>
                  </div>

                  {/* Referral Code & Link */}
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 mb-6">
                    <h4 className="font-semibold text-gray-900 mb-4">
                      Share Your Referral Code
                    </h4>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Your Referral Code
                        </label>
                        <div className="flex items-center space-x-2">
                          <input
                            type="text"
                            value={referralProgram.referralCode}
                            readOnly
                            className="flex-1 px-4 py-2 bg-white border border-gray-300 rounded-md font-mono text-lg"
                          />
                          <button
                            onClick={() =>
                              handleCopyCode(referralProgram.referralCode)
                            }
                            className="flex items-center space-x-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                          >
                            {copiedCode === referralProgram.referralCode ? (
                              <>
                                <CheckCircle className="w-4 h-4" />
                                <span>Copied!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-4 h-4" />
                                <span>Copy</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Your Referral Link
                        </label>
                        <div className="flex items-center space-x-2">
                          <input
                            type="text"
                            value={referralProgram.referralLink}
                            readOnly
                            className="flex-1 px-4 py-2 bg-white border border-gray-300 rounded-md text-sm"
                          />
                          <button
                            onClick={handleCopyReferralLink}
                            className="flex items-center space-x-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                          >
                            {copiedCode === 'referral-link' ? (
                              <>
                                <CheckCircle className="w-4 h-4" />
                                <span>Copied!</span>
                              </>
                            ) : (
                              <>
                                <Share className="w-4 h-4" />
                                <span>Share</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* How It Works */}
                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h4 className="font-semibold text-gray-900 mb-4">
                      How Referrals Work
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="text-center">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Share className="w-6 h-6 text-blue-600" />
                        </div>
                        <h5 className="font-medium text-gray-900 mb-2">
                          Share Your Code
                        </h5>
                        <p className="text-sm text-gray-600">
                          Share your referral code or link with friends and
                          family
                        </p>
                      </div>
                      <div className="text-center">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Users className="w-6 h-6 text-green-600" />
                        </div>
                        <h5 className="font-medium text-gray-900 mb-2">
                          Friend Orders
                        </h5>
                        <p className="text-sm text-gray-600">
                          Your friend gets 50% off their first order
                        </p>
                      </div>
                      <div className="text-center">
                        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Gift className="w-6 h-6 text-purple-600" />
                        </div>
                        <h5 className="font-medium text-gray-900 mb-2">
                          You Both Win
                        </h5>
                        <p className="text-sm text-gray-600">
                          You get $15 credit when they complete their first
                          order
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            )}

            {activeTab === 'history' && (
              <FadeIn>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">
                    Usage History
                  </h3>

                  {expiredPromoCodes.length === 0 ? (
                    <div className="text-center py-8">
                      <Clock className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500">
                        No promo code usage history
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {expiredPromoCodes.map(code => (
                        <div
                          key={code.id}
                          className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                        >
                          <div className="flex items-center space-x-4">
                            <div className="p-2 bg-gray-200 rounded-lg text-gray-500">
                              {getPromoIcon(code.type)}
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900">
                                {code.code}
                              </h4>
                              <p className="text-sm text-gray-600">
                                {code.description}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-gray-900">
                              Used {code.usedCount} time
                              {code.usedCount !== 1 ? 's' : ''}
                            </p>
                            <p className="text-sm text-gray-500">
                              Expired{' '}
                              {new Date(code.expiryDate).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </FadeIn>
            )}
          </div>
        </div>
      </FadeIn>
    </div>
  )
}

export default PromoCodes
