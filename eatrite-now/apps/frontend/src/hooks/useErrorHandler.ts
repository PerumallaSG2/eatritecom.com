import { useState, useCallback } from 'react'
import { useToast } from '../context/ToastContext'

// Error types for better categorization
export enum ErrorType {
  NETWORK = 'NETWORK',
  VALIDATION = 'VALIDATION',
  AUTHENTICATION = 'AUTHENTICATION',
  AUTHORIZATION = 'AUTHORIZATION',
  NOT_FOUND = 'NOT_FOUND',
  SERVER = 'SERVER',
  CLIENT = 'CLIENT',
  UNKNOWN = 'UNKNOWN'
}

export interface AppError {
  type: ErrorType
  message: string
  code?: string | number
  details?: any
  timestamp: string
  retryable?: boolean
  userMessage?: string
}

export interface ErrorHandlerOptions {
  showToast?: boolean
  logError?: boolean
  retryable?: boolean
  fallbackMessage?: string
}

// Custom hook for error handling
export const useErrorHandler = () => {
  const [errors, setErrors] = useState<AppError[]>([])
  const { showToast } = useToast()

  const createError = useCallback((
    error: Error | string,
    type: ErrorType = ErrorType.UNKNOWN,
    options: ErrorHandlerOptions = {}
  ): AppError => {
    const {
      showToast: shouldShowToast = true,
      logError = true,
      retryable = false,
      fallbackMessage = 'An unexpected error occurred'
    } = options

    const errorMessage = typeof error === 'string' ? error : error.message
    const appError: AppError = {
      type,
      message: errorMessage,
      timestamp: new Date().toISOString(),
      retryable,
      userMessage: getUserFriendlyMessage(type, errorMessage, fallbackMessage)
    }

    if (logError) {
      console.error('Application Error:', appError, typeof error === 'object' ? error : null)
    }

    if (shouldShowToast) {
      showToast('error', 'Error', appError.userMessage || appError.message)
    }

    return appError
  }, [showToast])

  const handleError = useCallback((
    error: Error | string,
    type: ErrorType = ErrorType.UNKNOWN,
    options: ErrorHandlerOptions = {}
  ) => {
    const appError = createError(error, type, options)
    setErrors(prev => [...prev.slice(-9), appError]) // Keep last 10 errors
    return appError
  }, [createError])

  const clearErrors = useCallback(() => {
    setErrors([])
  }, [])

  const clearError = useCallback((timestamp: string) => {
    setErrors(prev => prev.filter(error => error.timestamp !== timestamp))
  }, [])

  return {
    errors,
    handleError,
    createError,
    clearErrors,
    clearError
  }
}

// Network error handler with retry logic
export const useNetworkErrorHandler = () => {
  const { handleError } = useErrorHandler()

  const handleNetworkError = useCallback(async <T>(
    operation: () => Promise<T>,
    options: {
      maxRetries?: number
      retryDelay?: number
      retryCondition?: (error: any) => boolean
    } = {}
  ): Promise<T> => {
    const { 
      maxRetries = 3, 
      retryDelay = 1000, 
      retryCondition = (error) => error.name === 'NetworkError' || error.code === 'NETWORK_ERROR'
    } = options

    let lastError: any

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        return await operation()
      } catch (error: any) {
        lastError = error
        
        if (attempt === maxRetries || !retryCondition(error)) {
          break
        }

        // Wait before retrying
        await new Promise(resolve => setTimeout(resolve, retryDelay * Math.pow(2, attempt)))
      }
    }

    // Handle the final error
    const errorType = getErrorType(lastError)
    handleError(lastError, errorType, {
      retryable: maxRetries > 0,
      fallbackMessage: getNetworkErrorMessage(lastError)
    })

    throw lastError
  }, [handleError])

  return { handleNetworkError }
}

// Async operation wrapper with error handling
export const useAsyncError = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<AppError | null>(null)
  const { handleError } = useErrorHandler()

  const execute = useCallback(async <T>(
    asyncFn: () => Promise<T>,
    errorType: ErrorType = ErrorType.UNKNOWN,
    options: ErrorHandlerOptions = {}
  ): Promise<T | null> => {
    try {
      setIsLoading(true)
      setError(null)
      const result = await asyncFn()
      return result
    } catch (err: any) {
      const appError = handleError(err, errorType, options)
      setError(appError)
      return null
    } finally {
      setIsLoading(false)
    }
  }, [handleError])

  const reset = useCallback(() => {
    setError(null)
    setIsLoading(false)
  }, [])

  return {
    isLoading,
    error,
    execute,
    reset
  }
}

// Form error handler
export const useFormErrorHandler = () => {
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const { handleError } = useErrorHandler()

  const setFieldError = useCallback((field: string, message: string) => {
    setFieldErrors(prev => ({ ...prev, [field]: message }))
  }, [])

  const clearFieldError = useCallback((field: string) => {
    setFieldErrors(prev => {
      const newErrors = { ...prev }
      delete newErrors[field]
      return newErrors
    })
  }, [])

  const clearAllFieldErrors = useCallback(() => {
    setFieldErrors({})
  }, [])

  const handleValidationErrors = useCallback((errors: any) => {
    if (typeof errors === 'object' && errors !== null) {
      setFieldErrors(errors)
    } else {
      handleError('Validation failed', ErrorType.VALIDATION, {
        fallbackMessage: 'Please check your input and try again'
      })
    }
  }, [handleError])

  const getFieldError = useCallback((field: string) => {
    return fieldErrors[field]
  }, [fieldErrors])

  const hasFieldError = useCallback((field: string) => {
    return Boolean(fieldErrors[field])
  }, [fieldErrors])

  return {
    fieldErrors,
    setFieldError,
    clearFieldError,
    clearAllFieldErrors,
    handleValidationErrors,
    getFieldError,
    hasFieldError
  }
}

// Utility functions
const getErrorType = (error: any): ErrorType => {
  if (!error) return ErrorType.UNKNOWN

  // Network errors
  if (error.name === 'NetworkError' || error.code === 'NETWORK_ERROR') {
    return ErrorType.NETWORK
  }

  // HTTP status codes
  if (error.status || error.response?.status) {
    const status = error.status || error.response.status
    
    if (status === 401) return ErrorType.AUTHENTICATION
    if (status === 403) return ErrorType.AUTHORIZATION
    if (status === 404) return ErrorType.NOT_FOUND
    if (status >= 400 && status < 500) return ErrorType.CLIENT
    if (status >= 500) return ErrorType.SERVER
  }

  // Validation errors
  if (error.name === 'ValidationError' || error.type === 'validation') {
    return ErrorType.VALIDATION
  }

  return ErrorType.UNKNOWN
}

const getUserFriendlyMessage = (
  type: ErrorType, 
  _originalMessage: string, 
  fallback: string
): string => {
  switch (type) {
    case ErrorType.NETWORK:
      return 'Please check your internet connection and try again'
    
    case ErrorType.AUTHENTICATION:
      return 'Please log in to continue'
    
    case ErrorType.AUTHORIZATION:
      return 'You don\'t have permission to perform this action'
    
    case ErrorType.NOT_FOUND:
      return 'The requested item could not be found'
    
    case ErrorType.VALIDATION:
      return 'Please check your input and try again'
    
    case ErrorType.SERVER:
      return 'Our servers are experiencing issues. Please try again later'
    
    default:
      return fallback
  }
}

const getNetworkErrorMessage = (error: any): string => {
  if (error.code === 'ENOTFOUND' || error.message?.includes('ENOTFOUND')) {
    return 'Unable to connect to our servers. Please check your internet connection'
  }
  
  if (error.code === 'ECONNREFUSED') {
    return 'Connection refused. Our servers may be temporarily unavailable'
  }
  
  if (error.name === 'TimeoutError') {
    return 'Request timed out. Please try again'
  }
  
  return 'Network error occurred. Please check your connection and try again'
}

// Error reporting utilities
export const reportError = async (error: AppError, context?: any) => {
  try {
    const report = {
      ...error,
      context,
      url: window.location.href,
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString()
    }

    // Store locally
    const errors = JSON.parse(localStorage.getItem('eatrite_errors') || '[]')
    errors.push(report)
    localStorage.setItem('eatrite_errors', JSON.stringify(errors.slice(-50))) // Keep last 50

    // In production, send to error reporting service
    // await fetch('/api/errors', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(report)
    // })

    console.log('Error reported:', report)
  } catch (reportingError) {
    console.error('Failed to report error:', reportingError)
  }
}

// Global error handler for unhandled promises
export const setupGlobalErrorHandlers = () => {
  // Handle unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason)
    
    const error: AppError = {
      type: ErrorType.UNKNOWN,
      message: event.reason?.message || 'Unhandled promise rejection',
      timestamp: new Date().toISOString(),
      details: event.reason
    }
    
    reportError(error, { type: 'unhandledrejection' })
  })

  // Handle global JavaScript errors
  window.addEventListener('error', (event) => {
    console.error('Global JavaScript error:', event.error)
    
    const error: AppError = {
      type: ErrorType.CLIENT,
      message: event.error?.message || 'Global JavaScript error',
      timestamp: new Date().toISOString(),
      details: {
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        error: event.error
      }
    }
    
    reportError(error, { type: 'javascriptError' })
  })
}

export default {
  useErrorHandler,
  useNetworkErrorHandler,
  useAsyncError,
  useFormErrorHandler,
  ErrorType,
  reportError,
  setupGlobalErrorHandlers
}