import React, { Component, ErrorInfo, ReactNode } from 'react'
import { FadeIn, SlideIn } from './LoadingStates'

interface Props {
  children?: ReactNode
  fallback?: ReactNode
  onError?: (error: Error, errorInfo: ErrorInfo) => void
  resetOnPropsChange?: boolean
  resetKeys?: Array<string | number>
}

interface State {
  hasError: boolean
  error: Error | null
  errorInfo: ErrorInfo | null
  errorId: string
}

class ErrorBoundary extends Component<Props, State> {
  private resetTimeoutId: number | null = null

  constructor(props: Props) {
    super(props)

    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: ''
    }
  }

  static getDerivedStateFromError(error: Error): State {
    // Generate unique error ID for tracking
    const errorId = `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    
    return {
      hasError: true,
      error,
      errorInfo: null,
      errorId
    }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
    
    this.setState({
      error,
      errorInfo
    })

    // Call custom error handler if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo)
    }

    // Report error to monitoring service
    this.reportError(error, errorInfo)
  }

  componentDidUpdate(prevProps: Props) {
    const { resetKeys, resetOnPropsChange } = this.props
    const { hasError } = this.state

    if (hasError && prevProps.resetKeys !== resetKeys) {
      if (resetKeys?.some((resetKey, idx) => 
        resetKey !== prevProps.resetKeys?.[idx]
      )) {
        this.resetErrorBoundary()
      }
    }

    if (hasError && resetOnPropsChange && prevProps.children !== this.props.children) {
      this.resetErrorBoundary()
    }
  }

  componentWillUnmount() {
    if (this.resetTimeoutId) {
      clearTimeout(this.resetTimeoutId)
    }
  }

  resetErrorBoundary = () => {
    if (this.resetTimeoutId) {
      clearTimeout(this.resetTimeoutId)
    }

    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: ''
    })
  }

  retryWithDelay = (delay: number = 1000) => {
    this.resetTimeoutId = window.setTimeout(() => {
      this.resetErrorBoundary()
    }, delay)
  }

  reportError = async (error: Error, errorInfo: ErrorInfo) => {
    try {
      // In a real app, send to error monitoring service like Sentry, LogRocket, etc.
      const errorReport = {
        message: error.message,
        stack: error.stack,
        componentStack: errorInfo.componentStack,
        errorId: this.state.errorId,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        url: window.location.href,
        userId: localStorage.getItem('userId') || 'anonymous'
      }

      console.log('Error Report:', errorReport)

      // Store error locally for debugging
      const existingErrors = JSON.parse(localStorage.getItem('eatrite_errors') || '[]')
      existingErrors.push(errorReport)
      
      // Keep only last 10 errors to avoid storage bloat
      const recentErrors = existingErrors.slice(-10)
      localStorage.setItem('eatrite_errors', JSON.stringify(recentErrors))

      // In production, send to monitoring service:
      // await fetch('/api/errors', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(errorReport)
      // })

    } catch (reportingError) {
      console.error('Failed to report error:', reportingError)
    }
  }

  render() {
    const { hasError, error, errorInfo } = this.state
    const { fallback, children } = this.props

    if (hasError) {
      // Use custom fallback if provided
      if (fallback) {
        return fallback
      }

      // Default error UI
      return (
        <ErrorFallback
          error={error}
          errorInfo={errorInfo}
          onReset={this.resetErrorBoundary}
          onRetry={() => this.retryWithDelay(1000)}
        />
      )
    }

    return children
  }
}

// Default Error Fallback Component
interface ErrorFallbackProps {
  error: Error | null
  errorInfo: ErrorInfo | null
  onReset: () => void
  onRetry: () => void
}

const ErrorFallback: React.FC<ErrorFallbackProps> = ({
  error,
  errorInfo,
  onReset,
  onRetry
}) => {
  const isDevelopment = import.meta.env.DEV

  const copyErrorToClipboard = async () => {
    const errorText = `
Error: ${error?.message}
Stack: ${error?.stack}
Component Stack: ${errorInfo?.componentStack}
Timestamp: ${new Date().toISOString()}
    `.trim()

    try {
      await navigator.clipboard.writeText(errorText)
      alert('Error details copied to clipboard')
    } catch (err) {
      console.error('Failed to copy to clipboard:', err)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
      <FadeIn>
        <div className="max-w-lg w-full bg-white rounded-xl shadow-lg p-8 text-center">
          <SlideIn direction="down" delay={200}>
            <div className="w-16 h-16 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
              <span className="text-3xl">😕</span>
            </div>
          </SlideIn>

          <SlideIn direction="up" delay={400}>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Oops! Something went wrong
            </h1>
            <p className="text-gray-600 mb-6">
              We encountered an unexpected error. Don't worry, our team has been notified and is working on a fix.
            </p>
          </SlideIn>

          <SlideIn direction="up" delay={600}>
            <div className="space-y-3 mb-6">
              <button
                onClick={onRetry}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
              >
                Try Again
              </button>
              
              <button
                onClick={onReset}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
              >
                Reset Application
              </button>

              <button
                onClick={() => window.location.reload()}
                className="w-full bg-blue-100 hover:bg-blue-200 text-blue-700 font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
              >
                Reload Page
              </button>
            </div>
          </SlideIn>

          {isDevelopment && error && (
            <SlideIn direction="up" delay={800}>
              <details className="text-left bg-gray-50 p-4 rounded-lg mb-4">
                <summary className="cursor-pointer font-semibold text-red-600 mb-2">
                  Debug Information
                </summary>
                <div className="space-y-2 text-sm">
                  <div>
                    <strong>Error:</strong>
                    <pre className="bg-red-50 p-2 rounded text-xs overflow-x-auto mt-1">
                      {error.message}
                    </pre>
                  </div>
                  {error.stack && (
                    <div>
                      <strong>Stack Trace:</strong>
                      <pre className="bg-red-50 p-2 rounded text-xs overflow-x-auto mt-1 max-h-32 overflow-y-auto">
                        {error.stack}
                      </pre>
                    </div>
                  )}
                  {errorInfo?.componentStack && (
                    <div>
                      <strong>Component Stack:</strong>
                      <pre className="bg-red-50 p-2 rounded text-xs overflow-x-auto mt-1 max-h-32 overflow-y-auto">
                        {errorInfo.componentStack}
                      </pre>
                    </div>
                  )}
                  <button
                    onClick={copyErrorToClipboard}
                    className="mt-2 text-xs bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded transition-colors"
                  >
                    Copy Error Details
                  </button>
                </div>
              </details>
            </SlideIn>
          )}

          <SlideIn direction="up" delay={1000}>
            <div className="text-sm text-gray-500">
              <p>Error ID: <code className="bg-gray-100 px-2 py-1 rounded text-xs">{Date.now()}</code></p>
              <p className="mt-2">
                If this problem persists, please contact{' '}
                <a 
                  href="mailto:support@eatrite.com" 
                  className="text-green-600 hover:underline"
                >
                  support@eatrite.com
                </a>
              </p>
            </div>
          </SlideIn>
        </div>
      </FadeIn>
    </div>
  )
}

// Specialized Error Boundaries for different app sections
export const RouteErrorBoundary: React.FC<{ children: ReactNode }> = ({ children }) => (
  <ErrorBoundary 
    onError={(error, errorInfo) => {
      console.error('Route Error:', error, errorInfo)
    }}
  >
    {children}
  </ErrorBoundary>
)

export const ComponentErrorBoundary: React.FC<{ 
  children: ReactNode
  componentName?: string 
}> = ({ children, componentName = 'Component' }) => (
  <ErrorBoundary 
    fallback={
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 m-4">
        <div className="flex items-center space-x-2">
          <span className="text-red-600">⚠️</span>
          <span className="text-red-800 font-medium">
            {componentName} encountered an error
          </span>
        </div>
        <p className="text-red-600 text-sm mt-2">
          Please refresh the page or try again later.
        </p>
      </div>
    }
    onError={(error, errorInfo) => {
      console.error(`${componentName} Error:`, error, errorInfo)
    }}
  >
    {children}
  </ErrorBoundary>
)

export const AsyncErrorBoundary: React.FC<{ 
  children: ReactNode
  resetKeys?: Array<string | number>
}> = ({ children, resetKeys }) => (
  <ErrorBoundary 
    resetKeys={resetKeys}
    resetOnPropsChange={true}
    onError={(error, errorInfo) => {
      console.error('Async Operation Error:', error, errorInfo)
    }}
  >
    {children}
  </ErrorBoundary>
)

export default ErrorBoundary