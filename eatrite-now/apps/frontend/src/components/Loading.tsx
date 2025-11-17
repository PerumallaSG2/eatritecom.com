import React from 'react'

interface SkeletonProps {
  className?: string
  variant?: 'text' | 'rectangular' | 'circular'
  width?: string
  height?: string
  animation?: 'pulse' | 'wave' | 'none'
}

const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  variant = 'text',
  width = 'auto',
  height = 'auto',
  animation = 'pulse',
}) => {
  const baseClasses =
    'bg-gradient-to-r from-[#F5EEDC] via-[#D4B46A]/20 to-[#F5EEDC] rounded-lg'

  const variantClasses = {
    text: 'rounded-md',
    rectangular: 'rounded-lg',
    circular: 'rounded-full',
  }

  const animationClasses = {
    pulse: 'animate-pulse',
    wave: 'bg-animate-shimmer',
    none: '',
  }

  const style = {
    width: width,
    height: variant === 'text' ? '1em' : height,
  }

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${animationClasses[animation]} ${className}`}
      style={style}
    />
  )
}

interface MealCardSkeletonProps {
  className?: string
}

export const MealCardSkeleton: React.FC<MealCardSkeletonProps> = ({
  className = '',
}) => {
  return (
    <div
      className={`bg-white rounded-2xl shadow-2xl overflow-hidden animate-pulse ${className}`}
    >
      {/* Image Skeleton */}
      <Skeleton variant="rectangular" className="w-full h-64" />

      {/* Content Skeleton */}
      <div className="p-8 space-y-6">
        {/* Rating and Time */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Skeleton variant="rectangular" width="80px" height="20px" />
            <Skeleton variant="rectangular" width="100px" height="16px" />
          </div>
          <Skeleton variant="rectangular" width="60px" height="16px" />
        </div>

        {/* Title */}
        <Skeleton variant="text" className="h-8 w-3/4" />

        {/* Description */}
        <div className="space-y-2">
          <Skeleton variant="text" className="h-4 w-full" />
          <Skeleton variant="text" className="h-4 w-2/3" />
        </div>

        {/* Tags */}
        <div className="flex gap-2">
          <Skeleton
            variant="rectangular"
            width="80px"
            height="24px"
            className="rounded-full"
          />
          <Skeleton
            variant="rectangular"
            width="100px"
            height="24px"
            className="rounded-full"
          />
          <Skeleton
            variant="rectangular"
            width="60px"
            height="24px"
            className="rounded-full"
          />
        </div>

        {/* Nutrition & Button */}
        <div className="flex items-center justify-between">
          <Skeleton
            variant="rectangular"
            width="120px"
            height="32px"
            className="rounded-full"
          />
          <Skeleton variant="circular" width="40px" height="40px" />
        </div>

        {/* Add to Cart Button */}
        <Skeleton variant="rectangular" className="w-full h-12 rounded-full" />
      </div>
    </div>
  )
}

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  color?: string
  className?: string
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  color = 'text-[#D4B46A]',
  className = '',
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12',
  }

  return (
    <div className={`${sizeClasses[size]} ${color} ${className}`}>
      <svg
        className="animate-spin"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
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
    </div>
  )
}

interface PageLoaderProps {
  message?: string
}

export const PageLoader: React.FC<PageLoaderProps> = ({
  message = 'Loading delicious meals...',
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0F2B1E] to-[#0A2418]">
      <div className="text-center space-y-8">
        {/* Animated Logo */}
        <div className="relative">
          <div className="w-24 h-24 mx-auto mb-8">
            <div className="absolute inset-0 bg-[#D4B46A] rounded-full animate-ping opacity-75"></div>
            <div className="relative w-full h-full bg-gradient-to-r from-[#D4B46A] to-[#B8964E] rounded-full flex items-center justify-center">
              <div className="w-12 h-12 bg-[#0F2B1E] rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Loading Spinner */}
        <LoadingSpinner size="xl" />

        {/* Message */}
        <div className="space-y-4">
          <h2
            className="text-3xl font-bold text-[#F5F2E8]"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            EatRite
          </h2>
          <p
            className="text-lg text-[#D4B46A] animate-pulse"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            {message}
          </p>
        </div>

        {/* Progress Dots */}
        <div className="flex justify-center space-x-2">
          <div
            className="w-2 h-2 bg-[#D4B46A] rounded-full animate-bounce"
            style={{ animationDelay: '0ms' }}
          ></div>
          <div
            className="w-2 h-2 bg-[#D4B46A] rounded-full animate-bounce"
            style={{ animationDelay: '150ms' }}
          ></div>
          <div
            className="w-2 h-2 bg-[#D4B46A] rounded-full animate-bounce"
            style={{ animationDelay: '300ms' }}
          ></div>
        </div>
      </div>
    </div>
  )
}

export default Skeleton
