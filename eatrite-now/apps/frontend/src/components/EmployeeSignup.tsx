import React, { useState } from 'react'
import { Building2, Users, Check, AlertCircle, Eye, EyeOff } from 'lucide-react'

interface CompanyInfo {
  id: string
  name: string
  tier: string
  employeeCount: number
  benefits: string[]
}

interface EmployeeSignupProps {
  onSignupComplete?: (user: any) => void
  onSwitchToLogin?: () => void
}

const EmployeeSignup: React.FC<EmployeeSignupProps> = ({
  onSignupComplete,
  onSwitchToLogin,
}) => {
  const [currentStep, setCurrentStep] = useState(1)
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo | null>(null)

  const [formData, setFormData] = useState({
    companyCode: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    department: '',
    agreeToTerms: false,
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateCompanyCode = async (code: string) => {
    if (!code.trim()) {
      setErrors({ companyCode: 'Company code is required' })
      return false
    }

    setLoading(true)
    try {
      // Simulate API call to validate company code
      const response = await fetch('/api/corporate/validate-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: code.toUpperCase() }),
      })

      if (response.ok) {
        const company = await response.json()
        setCompanyInfo(company)
        setErrors({})
        return true
      } else {
        const error = await response.json()
        setErrors({ companyCode: error.message || 'Invalid company code' })
        return false
      }
    } catch (error) {
      // Mock validation for demo
      const mockCompanyData: CompanyInfo = {
        id: 'comp_123',
        name: 'TechCorp Solutions',
        tier: 'TIER_B',
        employeeCount: 85,
        benefits: [
          'Free meal delivery',
          'Wellness tracking',
          'Team challenges',
          'Nutrition coaching',
        ],
      }

      if (code.toUpperCase() === 'TECHCORP2024') {
        setCompanyInfo(mockCompanyData)
        setErrors({})
        return true
      } else {
        setErrors({ companyCode: 'Invalid company code. Try: TECHCORP2024' })
        return false
      }
    } finally {
      setLoading(false)
    }
  }

  const handleStepOne = async (e: React.FormEvent) => {
    e.preventDefault()
    const isValid = await validateCompanyCode(formData.companyCode)
    if (isValid) {
      setCurrentStep(2)
    }
  }

  const handleFinalSignup = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    const newErrors: Record<string, string> = {}

    if (!formData.firstName.trim())
      newErrors.firstName = 'First name is required'
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    if (!formData.password) newErrors.password = 'Password is required'
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }
    if (!formData.agreeToTerms) newErrors.terms = 'You must agree to the terms'

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/auth/employee-signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          companyId: companyInfo?.id,
        }),
      })

      if (response.ok) {
        const user = await response.json()
        onSignupComplete?.(user)
      } else {
        const error = await response.json()
        setErrors({ submit: error.message })
      }
    } catch (error) {
      console.error('Signup error:', error)
      setErrors({ submit: 'An error occurred. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F2E8] to-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-[#0F2B1E] to-[#0A2418] rounded-xl flex items-center justify-center mb-4">
            <Building2 className="w-8 h-8 text-[#D4B46A]" />
          </div>
          <h2
            className="text-3xl font-bold text-[#0F2B1E]"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Join Your Company
          </h2>
          <p className="text-gray-600 mt-2">
            {currentStep === 1
              ? 'Enter your company code to get started'
              : 'Complete your profile'}
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                currentStep >= 1
                  ? 'bg-[#D4B46A] text-[#0F2B1E]'
                  : 'bg-gray-200 text-gray-500'
              }`}
            >
              {currentStep > 1 ? <Check className="w-4 h-4" /> : '1'}
            </div>
            <div
              className={`w-16 h-1 mx-2 ${currentStep >= 2 ? 'bg-[#D4B46A]' : 'bg-gray-200'}`}
            />
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                currentStep >= 2
                  ? 'bg-[#D4B46A] text-[#0F2B1E]'
                  : 'bg-gray-200 text-gray-500'
              }`}
            >
              2
            </div>
          </div>
        </div>

        {currentStep === 1 ? (
          /* Step 1: Company Code */
          <form onSubmit={handleStepOne} className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-lg border border-[#D4B46A]/20">
              <label className="block text-sm font-medium text-[#0F2B1E] mb-2">
                Company Code
              </label>
              <input
                type="text"
                value={formData.companyCode}
                onChange={e =>
                  handleInputChange('companyCode', e.target.value.toUpperCase())
                }
                placeholder="Enter your company code"
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4B46A]/50 ${
                  errors.companyCode ? 'border-red-300' : 'border-[#D4B46A]/30'
                }`}
                disabled={loading}
              />
              {errors.companyCode && (
                <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  {errors.companyCode}
                </div>
              )}

              <div className="mt-4 p-4 bg-[#F5EEDC] rounded-lg">
                <p className="text-sm text-gray-600">
                  <strong>Don't have a company code?</strong> Contact your HR
                  department or ask your admin to invite you to the EatRite
                  corporate program.
                </p>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !formData.companyCode.trim()}
              className="w-full bg-gradient-to-r from-[#0F2B1E] to-[#0A2418] hover:from-[#0A2418] hover:to-[#0F2B1E] text-[#F5F2E8] font-bold py-3 px-6 rounded-lg transition-all duration-300 hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              {loading ? 'Validating...' : 'Continue'}
            </button>
          </form>
        ) : (
          /* Step 2: Company Info + User Details */
          <div className="space-y-6">
            {/* Company Info Display */}
            {companyInfo && (
              <div className="bg-white rounded-xl p-6 shadow-lg border border-[#D4B46A]/20">
                <div className="flex items-center gap-3 mb-4">
                  <Users className="w-5 h-5 text-[#D4B46A]" />
                  <div>
                    <h3 className="font-bold text-[#0F2B1E]">
                      {companyInfo.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {companyInfo.employeeCount} employees
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium text-[#0F2B1E]">
                    Your Benefits:
                  </p>
                  {companyInfo.benefits.map((benefit, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 text-sm text-gray-600"
                    >
                      <Check className="w-4 h-4 text-green-600" />
                      {benefit}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* User Registration Form */}
            <form
              onSubmit={handleFinalSignup}
              className="bg-white rounded-xl p-6 shadow-lg border border-[#D4B46A]/20 space-y-4"
            >
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#0F2B1E] mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={e =>
                      handleInputChange('firstName', e.target.value)
                    }
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4B46A]/50 ${
                      errors.firstName
                        ? 'border-red-300'
                        : 'border-[#D4B46A]/30'
                    }`}
                  />
                  {errors.firstName && (
                    <p className="text-red-600 text-xs mt-1">
                      {errors.firstName}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#0F2B1E] mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={e =>
                      handleInputChange('lastName', e.target.value)
                    }
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4B46A]/50 ${
                      errors.lastName ? 'border-red-300' : 'border-[#D4B46A]/30'
                    }`}
                  />
                  {errors.lastName && (
                    <p className="text-red-600 text-xs mt-1">
                      {errors.lastName}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#0F2B1E] mb-1">
                  Work Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={e => handleInputChange('email', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4B46A]/50 ${
                    errors.email ? 'border-red-300' : 'border-[#D4B46A]/30'
                  }`}
                />
                {errors.email && (
                  <p className="text-red-600 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-[#0F2B1E] mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={e =>
                      handleInputChange('password', e.target.value)
                    }
                    className={`w-full px-3 py-2 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4B46A]/50 ${
                      errors.password ? 'border-red-300' : 'border-[#D4B46A]/30'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-600 text-xs mt-1">{errors.password}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-[#0F2B1E] mb-1">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={e =>
                    handleInputChange('confirmPassword', e.target.value)
                  }
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4B46A]/50 ${
                    errors.confirmPassword
                      ? 'border-red-300'
                      : 'border-[#D4B46A]/30'
                  }`}
                />
                {errors.confirmPassword && (
                  <p className="text-red-600 text-xs mt-1">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-[#0F2B1E] mb-1">
                  Department (Optional)
                </label>
                <input
                  type="text"
                  value={formData.department}
                  onChange={e =>
                    handleInputChange('department', e.target.value)
                  }
                  placeholder="e.g., Engineering, Marketing"
                  className="w-full px-3 py-2 border border-[#D4B46A]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4B46A]/50"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="terms"
                  checked={formData.agreeToTerms}
                  onChange={e =>
                    handleInputChange('agreeToTerms', e.target.checked)
                  }
                  className="rounded border-[#D4B46A]/30 text-[#D4B46A] focus:ring-[#D4B46A]/50"
                />
                <label htmlFor="terms" className="text-sm text-gray-600">
                  I agree to the Terms of Service and Privacy Policy
                </label>
              </div>
              {errors.terms && (
                <p className="text-red-600 text-xs">{errors.terms}</p>
              )}

              {errors.submit && (
                <div className="flex items-center gap-2 text-red-600 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  {errors.submit}
                </div>
              )}

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-3 px-6 rounded-lg transition-colors"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-gradient-to-r from-[#0F2B1E] to-[#0A2418] hover:from-[#0A2418] hover:to-[#0F2B1E] text-[#F5F2E8] font-bold py-3 px-6 rounded-lg transition-all duration-300 hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ fontFamily: 'Playfair Display, serif' }}
                >
                  {loading ? 'Creating Account...' : 'Join Company'}
                </button>
              </div>
            </form>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <button
                  onClick={onSwitchToLogin}
                  className="text-[#D4B46A] hover:text-[#B8935A] font-medium"
                >
                  Sign in
                </button>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default EmployeeSignup
