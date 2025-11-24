import React from 'react'

// Skeleton Loading Components
export const SkeletonCard: React.FC<{ className?: string }> = ({ className = "" }) => (
  <div className={`animate-pulse bg-gray-200 rounded-lg ${className}`}>
    <div className="aspect-w-16 aspect-h-9 bg-gray-300 rounded-t-lg mb-4"></div>
    <div className="p-4 space-y-3">
      <div className="h-4 bg-gray-300 rounded w-3/4"></div>
      <div className="h-3 bg-gray-300 rounded w-1/2"></div>
      <div className="flex justify-between items-center">
        <div className="h-4 bg-gray-300 rounded w-1/4"></div>
        <div className="h-8 bg-gray-300 rounded w-20"></div>
      </div>
    </div>
  </div>
)

export const SkeletonMealCard: React.FC = () => (
  <div className="animate-pulse bg-white rounded-xl shadow-lg overflow-hidden">
    <div className="h-48 bg-gray-300"></div>
    <div className="p-6 space-y-4">
      <div className="flex items-center space-x-2">
        <div className="h-6 bg-gray-300 rounded-full w-20"></div>
        <div className="h-6 bg-gray-300 rounded-full w-16"></div>
      </div>
      <div className="h-6 bg-gray-300 rounded w-3/4"></div>
      <div className="h-4 bg-gray-300 rounded w-full"></div>
      <div className="h-4 bg-gray-300 rounded w-2/3"></div>
      <div className="flex justify-between items-center pt-4">
        <div className="space-y-2">
          <div className="h-4 bg-gray-300 rounded w-24"></div>
          <div className="h-6 bg-gray-300 rounded w-20"></div>
        </div>
        <div className="h-10 bg-gray-300 rounded w-28"></div>
      </div>
    </div>
  </div>
)

export const SkeletonText: React.FC<{ 
  lines?: number
  className?: string 
}> = ({ lines = 3, className = "" }) => (
  <div className={`animate-pulse space-y-2 ${className}`}>
    {Array.from({ length: lines }).map((_, i) => (
      <div
        key={i}
        className={`h-4 bg-gray-300 rounded ${
          i === lines - 1 ? 'w-2/3' : 'w-full'
        }`}
      />
    ))}
  </div>
)

export const SkeletonProfile: React.FC = () => (
  <div className="animate-pulse bg-white rounded-xl shadow-lg p-6">
    <div className="flex items-center space-x-4 mb-6">
      <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
      <div className="space-y-2">
        <div className="h-5 bg-gray-300 rounded w-32"></div>
        <div className="h-4 bg-gray-300 rounded w-24"></div>
      </div>
    </div>
    <div className="space-y-4">
      <div className="h-4 bg-gray-300 rounded w-full"></div>
      <div className="h-4 bg-gray-300 rounded w-3/4"></div>
      <div className="h-4 bg-gray-300 rounded w-1/2"></div>
    </div>
  </div>
)

// Spinner Components
export const SpinnerDots: React.FC<{ 
  size?: 'sm' | 'md' | 'lg'
  color?: string 
}> = ({ size = 'md', color = 'text-green-600' }) => {
  const sizeClasses = {
    sm: 'w-1 h-1',
    md: 'w-2 h-2',
    lg: 'w-3 h-3'
  }

  return (
    <div className="flex space-x-1 items-center justify-center">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={`${sizeClasses[size]} ${color.replace('text-', 'bg-')} rounded-full animate-bounce`}
          style={{ animationDelay: `${i * 0.1}s` }}
        />
      ))}
    </div>
  )
}

export const SpinnerCircle: React.FC<{ 
  size?: 'sm' | 'md' | 'lg'
  color?: string 
}> = ({ size = 'md', color = 'text-green-600' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  }

  return (
    <div className={`${sizeClasses[size]} ${color} animate-spin`}>
      <svg className="w-full h-full" viewBox="0 0 24 24" fill="none">
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="31.416"
          strokeDashoffset="31.416"
          className="animate-spin-dash"
        />
      </svg>
    </div>
  )
}

export const SpinnerPulse: React.FC<{ 
  size?: 'sm' | 'md' | 'lg'
  color?: string 
}> = ({ size = 'md', color = 'bg-green-600' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  }

  return (
    <div className={`${sizeClasses[size]} ${color} rounded-full animate-pulse opacity-75`} />
  )
}

// Loading Overlays
export const LoadingOverlay: React.FC<{
  isVisible: boolean
  message?: string
  spinner?: React.ReactNode
}> = ({ isVisible, message = 'Loading...', spinner }) => {
  if (!isVisible) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4 text-center">
        <div className="mb-4">
          {spinner || <SpinnerCircle size="lg" />}
        </div>
        <p className="text-gray-600 font-medium">{message}</p>
      </div>
    </div>
  )
}

export const InlineLoader: React.FC<{
  message?: string
  spinner?: React.ReactNode
  className?: string
}> = ({ message = 'Loading...', spinner, className = "" }) => (
  <div className={`flex flex-col items-center justify-center py-8 ${className}`}>
    <div className="mb-4">
      {spinner || <SpinnerDots />}
    </div>
    <p className="text-gray-500 text-sm">{message}</p>
  </div>
)

// Progress Indicators
export const ProgressBar: React.FC<{
  progress: number
  className?: string
  showPercentage?: boolean
}> = ({ progress, className = "", showPercentage = false }) => (
  <div className={`w-full ${className}`}>
    <div className="flex justify-between items-center mb-2">
      <span className="text-sm text-gray-600">Progress</span>
      {showPercentage && (
        <span className="text-sm font-medium text-gray-900">
          {Math.round(progress)}%
        </span>
      )}
    </div>
    <div className="w-full bg-gray-200 rounded-full h-2">
      <div
        className="bg-green-600 h-2 rounded-full transition-all duration-300 ease-out"
        style={{ width: `${Math.min(progress, 100)}%` }}
      />
    </div>
  </div>
)

export const StepProgress: React.FC<{
  currentStep: number
  totalSteps: number
  steps?: string[]
}> = ({ currentStep, totalSteps, steps }) => (
  <div className="w-full">
    <div className="flex items-center">
      {Array.from({ length: totalSteps }).map((_, i) => (
        <React.Fragment key={i}>
          <div
            className={`flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all ${
              i <= currentStep - 1
                ? 'bg-green-600 border-green-600 text-white'
                : 'bg-white border-gray-300 text-gray-500'
            }`}
          >
            {i <= currentStep - 1 ? '✓' : i + 1}
          </div>
          {i < totalSteps - 1 && (
            <div
              className={`flex-1 h-1 mx-2 transition-all ${
                i < currentStep - 1 ? 'bg-green-600' : 'bg-gray-300'
              }`}
            />
          )}
        </React.Fragment>
      ))}
    </div>
    {steps && steps[currentStep - 1] && (
      <p className="text-center mt-2 text-sm text-gray-600">
        {steps[currentStep - 1]}
      </p>
    )}
  </div>
)

// Animated Transitions
export const FadeIn: React.FC<{
  children: React.ReactNode
  delay?: number
  className?: string
}> = ({ children, delay = 0, className = "" }) => (
  <div
    className={`animate-fadeIn ${className}`}
    style={{ animationDelay: `${delay}ms` }}
  >
    {children}
  </div>
)

export const SlideIn: React.FC<{
  children: React.ReactNode
  direction?: 'left' | 'right' | 'up' | 'down'
  delay?: number
  className?: string
}> = ({ children, direction = 'up', delay = 0, className = "" }) => {
  const directionClasses = {
    left: 'animate-slideInLeft',
    right: 'animate-slideInRight',
    up: 'animate-slideInUp',
    down: 'animate-slideInDown'
  }

  return (
    <div
      className={`${directionClasses[direction]} ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

export const StaggeredList: React.FC<{
  children: React.ReactNode[]
  staggerDelay?: number
  className?: string
}> = ({ children, staggerDelay = 100, className = "" }) => (
  <div className={className}>
    {React.Children.map(children, (child, index) => (
      <FadeIn delay={index * staggerDelay}>
        {child}
      </FadeIn>
    ))}
  </div>
)

// Loading Button States
export const LoadingButton: React.FC<{
  isLoading: boolean
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
  className?: string
  loadingText?: string
}> = ({ 
  isLoading, 
  children, 
  onClick, 
  disabled, 
  className = "", 
  loadingText = "Loading..." 
}) => (
  <button
    onClick={onClick}
    disabled={isLoading || disabled}
    className={`relative transition-all duration-200 ${
      isLoading ? 'cursor-not-allowed opacity-70' : ''
    } ${className}`}
  >
    {isLoading && (
      <div className="absolute inset-0 flex items-center justify-center">
        <SpinnerDots size="sm" color="text-white" />
        <span className="ml-2 text-sm">{loadingText}</span>
      </div>
    )}
    <div className={isLoading ? 'invisible' : 'visible'}>
      {children}
    </div>
  </button>
)

// CSS Animations (to be added to global CSS)
export const cssAnimations = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes slideInUp {
    from { 
      opacity: 0; 
      transform: translateY(30px); 
    }
    to { 
      opacity: 1; 
      transform: translateY(0); 
    }
  }

  @keyframes slideInDown {
    from { 
      opacity: 0; 
      transform: translateY(-30px); 
    }
    to { 
      opacity: 1; 
      transform: translateY(0); 
    }
  }

  @keyframes slideInLeft {
    from { 
      opacity: 0; 
      transform: translateX(-30px); 
    }
    to { 
      opacity: 1; 
      transform: translateX(0); 
    }
  }

  @keyframes slideInRight {
    from { 
      opacity: 0; 
      transform: translateX(30px); 
    }
    to { 
      opacity: 1; 
      transform: translateX(0); 
    }
  }

  @keyframes spin-dash {
    0% { 
      stroke-dasharray: 1, 200; 
      stroke-dashoffset: 0; 
    }
    50% { 
      stroke-dasharray: 89, 200; 
      stroke-dashoffset: -35px; 
    }
    100% { 
      stroke-dasharray: 89, 200; 
      stroke-dashoffset: -124px; 
    }
  }

  .animate-fadeIn {
    animation: fadeIn 0.5s ease-out forwards;
  }

  .animate-slideInUp {
    animation: slideInUp 0.6s ease-out forwards;
  }

  .animate-slideInDown {
    animation: slideInDown 0.6s ease-out forwards;
  }

  .animate-slideInLeft {
    animation: slideInLeft 0.6s ease-out forwards;
  }

  .animate-slideInRight {
    animation: slideInRight 0.6s ease-out forwards;
  }

  .animate-spin-dash {
    animation: spin-dash 1.5s ease-in-out infinite;
  }

  /* Enhanced Pulse Animation */
  .animate-pulse {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.7; }
  }

  /* Bounce Animation for Dots */
  .animate-bounce {
    animation: bounce 1s infinite;
  }

  @keyframes bounce {
    0%, 80%, 100% { 
      transform: scale(0); 
    } 
    40% { 
      transform: scale(1); 
    }
  }
`