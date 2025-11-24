import React from 'react'
import { FadeIn, SlideIn } from './LoadingStates'
import { ErrorType, AppError } from '../hooks/useErrorHandler'

interface ErrorDisplayProps {
  error: AppError
  onRetry?: () => void
  onDismiss?: () => void
  compact?: boolean
}

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({
  error,
  onRetry,
  onDismiss,
  compact = false
}) => {
  const getErrorIcon = (type: ErrorType) => {
    switch (type) {
      case ErrorType.NETWORK:
        return '📡'
      case ErrorType.AUTHENTICATION:
        return '🔐'
      case ErrorType.AUTHORIZATION:
        return '🚫'
      case ErrorType.NOT_FOUND:
        return '🔍'
      case ErrorType.VALIDATION:
        return '⚠️'
      case ErrorType.SERVER:
        return '🔧'
      default:
        return '❌'
    }
  }

  const getErrorColor = (type: ErrorType) => {
    switch (type) {
      case ErrorType.NETWORK:
        return 'blue'
      case ErrorType.AUTHENTICATION:
      case ErrorType.AUTHORIZATION:
        return 'yellow'
      case ErrorType.NOT_FOUND:
        return 'gray'
      case ErrorType.VALIDATION:
        return 'orange'
      case ErrorType.SERVER:
        return 'red'
      default:
        return 'red'
    }
  }

  const color = getErrorColor(error.type)
  const icon = getErrorIcon(error.type)

  if (compact) {
    return (
      <FadeIn>
        <div className={`bg-${color}-50 border border-${color}-200 rounded-lg p-4 mb-4`}>
          <div className="flex items-start space-x-3">
            <span className="text-xl flex-shrink-0">{icon}</span>
            <div className="flex-1 min-w-0">
              <p className={`text-${color}-800 font-medium`}>
                {error.userMessage || error.message}
              </p>
              {(onRetry || onDismiss) && (
                <div className="flex space-x-2 mt-2">
                  {onRetry && error.retryable && (
                    <button
                      onClick={onRetry}
                      className={`text-${color}-600 hover:text-${color}-800 text-sm font-medium`}
                    >
                      Try Again
                    </button>
                  )}
                  {onDismiss && (
                    <button
                      onClick={onDismiss}
                      className={`text-${color}-600 hover:text-${color}-800 text-sm font-medium`}
                    >
                      Dismiss
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </FadeIn>
    )
  }

  return (
    <div className={`bg-${color}-50 border border-${color}-200 rounded-xl p-6 mb-6`}>
      <FadeIn>
        <div className="text-center">
          <SlideIn direction="down">
            <div className={`w-16 h-16 mx-auto mb-4 bg-${color}-100 rounded-full flex items-center justify-center`}>
              <span className="text-3xl">{icon}</span>
            </div>
          </SlideIn>

          <SlideIn direction="up" delay={200}>
            <h3 className={`text-lg font-semibold text-${color}-900 mb-2`}>
              {getErrorTitle(error.type)}
            </h3>
            <p className={`text-${color}-700 mb-4`}>
              {error.userMessage || error.message}
            </p>
          </SlideIn>

          {(onRetry || onDismiss) && (
            <SlideIn direction="up" delay={400}>
              <div className="flex justify-center space-x-3">
                {onRetry && error.retryable && (
                  <button
                    onClick={onRetry}
                    className={`bg-${color}-600 hover:bg-${color}-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200`}
                  >
                    Try Again
                  </button>
                )}
                {onDismiss && (
                  <button
                    onClick={onDismiss}
                    className={`bg-${color}-100 hover:bg-${color}-200 text-${color}-700 font-semibold py-2 px-4 rounded-lg transition-colors duration-200`}
                  >
                    Dismiss
                  </button>
                )}
              </div>
            </SlideIn>
          )}
        </div>
      </FadeIn>
    </div>
  )
}

// Network Error Component
export const NetworkError: React.FC<{
  onRetry?: () => void
  message?: string
}> = ({ onRetry, message = "Please check your internet connection and try again." }) => (
  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
    <FadeIn>
      <div className="text-4xl mb-4">📡</div>
      <h3 className="text-lg font-semibold text-blue-900 mb-2">
        Connection Problem
      </h3>
      <p className="text-blue-700 mb-4">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
        >
          Try Again
        </button>
      )}
    </FadeIn>
  </div>
)

// Not Found Error Component
export const NotFoundError: React.FC<{
  message?: string
  onBack?: () => void
}> = ({ 
  message = "The page you're looking for doesn't exist.", 
  onBack 
}) => (
  <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
    <FadeIn>
      <div className="text-6xl mb-6">🔍</div>
      <h3 className="text-2xl font-bold text-gray-900 mb-4">
        Page Not Found
      </h3>
      <p className="text-gray-600 mb-6">{message}</p>
      {onBack && (
        <button
          onClick={onBack}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
        >
          Go Back
        </button>
      )}
    </FadeIn>
  </div>
)

// Form Error Display
interface FormErrorProps {
  errors: Record<string, string>
  className?: string
}

export const FormErrors: React.FC<FormErrorProps> = ({ 
  errors, 
  className = "" 
}) => {
  const errorEntries = Object.entries(errors)
  
  if (errorEntries.length === 0) return null

  return (
    <div className={`bg-red-50 border border-red-200 rounded-lg p-4 ${className}`}>
      <FadeIn>
        <div className="flex items-start space-x-2">
          <span className="text-red-600 text-lg flex-shrink-0">⚠️</span>
          <div className="flex-1">
            <h4 className="text-red-800 font-medium mb-2">
              Please fix the following errors:
            </h4>
            <ul className="text-red-700 text-sm space-y-1">
              {errorEntries.map(([field, message]) => (
                <li key={field}>
                  <strong>{formatFieldName(field)}:</strong> {message}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </FadeIn>
    </div>
  )
}

// Inline Field Error
interface FieldErrorProps {
  error?: string
  className?: string
}

export const FieldError: React.FC<FieldErrorProps> = ({ 
  error, 
  className = "" 
}) => {
  if (!error) return null

  return (
    <FadeIn>
      <p className={`text-red-600 text-sm mt-1 ${className}`}>
        {error}
      </p>
    </FadeIn>
  )
}

// Retry Button Component
interface RetryButtonProps {
  onRetry: () => void
  isRetrying?: boolean
  children?: React.ReactNode
  className?: string
}

export const RetryButton: React.FC<RetryButtonProps> = ({
  onRetry,
  isRetrying = false,
  children = "Try Again",
  className = ""
}) => (
  <button
    onClick={onRetry}
    disabled={isRetrying}
    className={`
      inline-flex items-center space-x-2 
      bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 
      text-white font-semibold py-2 px-4 rounded-lg 
      transition-colors duration-200
      ${className}
    `}
  >
    {isRetrying && (
      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    )}
    <span>{children}</span>
  </button>
)

// Error Toast Component (for use with toast system)
export const ErrorToast: React.FC<{
  error: AppError
  onClose: () => void
}> = ({ error, onClose }) => {
  const color = getErrorColor(error.type)
  
  return (
    <div className={`bg-${color}-600 text-white p-4 rounded-lg shadow-lg`}>
      <div className="flex items-start space-x-3">
        <span className="text-xl">{getErrorIcon(error.type)}</span>
        <div className="flex-1">
          <p className="font-medium">{getErrorTitle(error.type)}</p>
          <p className="text-sm opacity-90 mt-1">
            {error.userMessage || error.message}
          </p>
        </div>
        <button
          onClick={onClose}
          className={`text-${color}-200 hover:text-white`}
        >
          ✕
        </button>
      </div>
    </div>
  )
}

// Utility functions
const getErrorTitle = (type: ErrorType): string => {
  switch (type) {
    case ErrorType.NETWORK:
      return 'Connection Error'
    case ErrorType.AUTHENTICATION:
      return 'Authentication Required'
    case ErrorType.AUTHORIZATION:
      return 'Access Denied'
    case ErrorType.NOT_FOUND:
      return 'Not Found'
    case ErrorType.VALIDATION:
      return 'Validation Error'
    case ErrorType.SERVER:
      return 'Server Error'
    default:
      return 'Error'
  }
}

const getErrorColor = (type: ErrorType): string => {
  switch (type) {
    case ErrorType.NETWORK:
      return 'blue'
    case ErrorType.AUTHENTICATION:
    case ErrorType.AUTHORIZATION:
      return 'yellow'
    case ErrorType.NOT_FOUND:
      return 'gray'
    case ErrorType.VALIDATION:
      return 'orange'
    case ErrorType.SERVER:
      return 'red'
    default:
      return 'red'
  }
}

const getErrorIcon = (type: ErrorType): string => {
  switch (type) {
    case ErrorType.NETWORK:
      return '📡'
    case ErrorType.AUTHENTICATION:
      return '🔐'
    case ErrorType.AUTHORIZATION:
      return '🚫'
    case ErrorType.NOT_FOUND:
      return '🔍'
    case ErrorType.VALIDATION:
      return '⚠️'
    case ErrorType.SERVER:
      return '🔧'
    default:
      return '❌'
  }
}

const formatFieldName = (field: string): string => {
  return field
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, str => str.toUpperCase())
    .trim()
}