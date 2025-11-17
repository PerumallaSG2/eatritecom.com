/**
 * EatRite Authentication Screens
 * Factor-style login, signup, and password recovery interfaces
 */

import React, { useState } from 'react'
import { Facebook, Apple, Mail } from 'lucide-react'
import EatRiteIcons from '../icons/EatRiteIcons'

// ============================================================================
// LOGIN SCREEN
// ============================================================================

interface LoginScreenProps {
  onLogin: (email: string, password: string) => void
  onSignupClick: () => void
  onForgotPasswordClick: () => void
  loading?: boolean
  error?: string
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  onLogin,
  onSignupClick,
  onForgotPasswordClick,
  loading = false,
  error,
}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) {
      setEmailError(true)
      return
    }
    setEmailError(false)
    onLogin(email, password)
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Left Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-2xl font-semibold text-gray-900 mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                Sign in to EatRite
              </h1>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      setEmailError(false)
                    }}
                    className={`w-full px-4 py-3 border rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent ${
                      emailError ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder=""
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  />
                  {emailError && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">!</span>
                      </div>
                    </div>
                  )}
                </div>
                {emailError && (
                  <p className="text-red-500 text-sm mt-1">Required</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                />
                <div className="text-right mt-2">
                  <button
                    type="button"
                    onClick={onForgotPasswordClick}
                    className="text-sm text-green-600 hover:text-green-700 transition-colors"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    Forgot your password?
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-black hover:bg-gray-800 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 disabled:opacity-50"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                {loading ? 'Signing in...' : 'Log in'}
              </button>
            </form>

            {/* Login without password */}
            <div className="mt-4">
              <button
                type="button"
                className="w-full border border-gray-300 text-gray-700 font-medium py-3 px-4 rounded-lg transition-colors duration-200 hover:bg-gray-50 flex items-center justify-center gap-2"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                <Mail size={18} />
                Log in without password
              </button>
            </div>

            {/* Divider */}
            <div className="my-6 flex items-center">
              <div className="flex-1 border-t border-gray-300"></div>
              <span className="px-4 text-sm text-gray-500">or</span>
              <div className="flex-1 border-t border-gray-300"></div>
            </div>

            {/* Social Login */}
            <div className="space-y-3">
              <button
                type="button"
                className="w-full border border-gray-300 text-gray-700 font-medium py-3 px-4 rounded-lg transition-colors duration-200 hover:bg-gray-50 flex items-center justify-center gap-2"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                <Facebook size={18} className="text-blue-600" />
                Continue with Facebook
              </button>

              <button
                type="button"
                className="w-full border border-gray-300 text-gray-700 font-medium py-3 px-4 rounded-lg transition-colors duration-200 hover:bg-gray-50 flex items-center justify-center gap-2"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Sign in with Google
              </button>

              <button
                type="button"
                className="w-full border border-gray-300 text-gray-700 font-medium py-3 px-4 rounded-lg transition-colors duration-200 hover:bg-gray-50 flex items-center justify-center gap-2"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                <Apple size={18} />
                Continue with Apple
              </button>
            </div>

            {/* Sign up link */}
            <div className="mt-8 text-center">
              <span className="text-gray-600 text-sm">New to EatRite? </span>
              <button
                onClick={onSignupClick}
                className="text-green-600 hover:text-green-700 text-sm font-medium transition-colors"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Sign Up Here
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - App Promotion */}
      <div className="flex-1 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-8">
        <div className="max-w-md text-center">
          <div className="mb-8">
            <div className="relative mx-auto w-48 h-96">
              {/* Phone mockup */}
              <div className="absolute inset-0 bg-black rounded-3xl shadow-2xl">
                <div className="absolute inset-2 bg-white rounded-2xl overflow-hidden">
                  <div className="p-6 pt-12">
                    <div className="bg-black w-12 h-12 rounded-lg mb-4 flex items-center justify-center">
                      <span className="text-white font-bold">ER</span>
                    </div>
                    <div className="space-y-3">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-200 rounded w-full"></div>
                      <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <p className="text-sm text-gray-600 font-medium mb-2">THE EATRITE APP</p>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Meals at Your Fingertips
            </h2>
            <p className="text-gray-600">
              With our app you can view menus, select meals, and see your scheduled deliveries.
            </p>
          </div>

          {/* App Store Buttons */}
          <div className="flex gap-3 justify-center">
            <img
              src="/api/placeholder/140/42"
              alt="Download on the App Store"
              className="h-12 rounded-lg"
            />
            <img
              src="/api/placeholder/140/42"
              alt="Get it on Google Play"
              className="h-12 rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

// ============================================================================
// SIGNUP SCREEN
// ============================================================================

interface SignupScreenProps {
  onSignup: (data: { name: string; email: string; password: string }) => void
  onLoginClick: () => void
  loading?: boolean
  error?: string
}

export const SignupScreen: React.FC<SignupScreenProps> = ({
  onSignup,
  onLoginClick,
  loading = false,
  error,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validation
    const errors: Record<string, string> = {}

    if (!formData.name.trim()) {
      errors.name = 'Name is required'
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email'
    }

    if (!formData.password) {
      errors.password = 'Password is required'
    } else if (formData.password.length < 8) {
      errors.password = 'Password must be at least 8 characters'
    }

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match'
    }

    setFormErrors(errors)

    if (Object.keys(errors).length === 0) {
      onSignup({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      })
    }
  }

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-8">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-semibold text-gray-900 mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
              Join EatRite
            </h1>
            <p className="text-gray-600">Start your premium wellness journey today</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6 text-sm">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => updateFormData('name', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent ${
                  formErrors.name ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter your full name"
                style={{ fontFamily: 'Inter, sans-serif' }}
              />
              {formErrors.name && (
                <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email address
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => updateFormData('email', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent ${
                  formErrors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter your email"
                style={{ fontFamily: 'Inter, sans-serif' }}
              />
              {formErrors.email && (
                <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => updateFormData('password', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent ${
                  formErrors.password ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Create a password"
                style={{ fontFamily: 'Inter, sans-serif' }}
              />
              {formErrors.password && (
                <p className="text-red-500 text-sm mt-1">{formErrors.password}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => updateFormData('confirmPassword', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent ${
                  formErrors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Confirm your password"
                style={{ fontFamily: 'Inter, sans-serif' }}
              />
              {formErrors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">{formErrors.confirmPassword}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black hover:bg-gray-800 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 disabled:opacity-50"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          {/* Sign in link */}
          <div className="mt-8 text-center">
            <span className="text-gray-600 text-sm">Already have an account? </span>
            <button
              onClick={onLoginClick}
              className="text-green-600 hover:text-green-700 text-sm font-medium transition-colors"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Sign in
            </button>
          </div>

          {/* Terms */}
          <p className="text-xs text-gray-500 text-center mt-6 leading-relaxed">
            By creating an account, you agree to our{' '}
            <span className="text-green-600 cursor-pointer hover:text-green-700">
              Terms of Service
            </span>{' '}
            and{' '}
            <span className="text-green-600 cursor-pointer hover:text-green-700">
              Privacy Policy
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}

// ============================================================================
// FORGOT PASSWORD SCREEN
// ============================================================================

interface ForgotPasswordScreenProps {
  onSubmit: (email: string) => void
  onBackToLogin: () => void
  loading?: boolean
  success?: boolean
  error?: string
}

export const ForgotPasswordScreen: React.FC<ForgotPasswordScreenProps> = ({
  onSubmit,
  onBackToLogin,
  loading = false,
  success = false,
  error,
}) => {
  const [email, setEmail] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      onSubmit(email)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-8">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-semibold text-gray-900 mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
              Reset Password
            </h1>
            <p className="text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
              {success
                ? "We've sent password reset instructions to your email address."
                : "Enter your email address and we'll send you instructions to reset your password."}
            </p>
          </div>

          {(error || success) && (
            <div className={`px-4 py-3 rounded-lg mb-6 text-sm ${
              success 
                ? 'bg-green-50 border border-green-200 text-green-600' 
                : 'bg-red-50 border border-red-200 text-red-600'
            }`}>
              {error ||
                "Check your email for reset instructions. Don't forget to check your spam folder."}
            </div>
          )}

          {!success && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  placeholder="Enter your email address"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-black hover:bg-gray-800 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 disabled:opacity-50"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                {loading ? 'Sending...' : 'Send Reset Instructions'}
              </button>
            </form>
          )}

          {/* Back to login link */}
          <div className="mt-8 text-center">
            <button
              onClick={onBackToLogin}
              className="text-green-600 hover:text-green-700 text-sm font-medium transition-colors flex items-center justify-center gap-1"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              ← Back to Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default {
  LoginScreen,
  SignupScreen,
  ForgotPasswordScreen,
}
