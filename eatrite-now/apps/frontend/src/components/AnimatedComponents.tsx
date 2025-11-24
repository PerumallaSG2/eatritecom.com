import React, { useState } from 'react'
import { 
  SkeletonMealCard, 
  SkeletonText, 
  StaggeredList, 
  FadeIn, 
  SlideIn,
  LoadingButton,
  InlineLoader,
  ProgressBar
} from './LoadingStates'

// Enhanced Menu Loading with Animations
export const AnimatedMenuLoader: React.FC<{ itemCount?: number }> = ({ 
  itemCount = 6 
}) => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Loading */}
      <SlideIn direction="down">
        <div className="text-center mb-12">
          <SkeletonText lines={1} className="h-12 w-64 mx-auto mb-4" />
          <SkeletonText lines={2} className="w-96 mx-auto" />
        </div>
      </SlideIn>

      {/* Filter Loading */}
      <FadeIn delay={200}>
        <div className="flex flex-wrap gap-4 mb-8 justify-center">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="h-10 w-24 bg-gray-200 rounded-full animate-pulse"
            />
          ))}
        </div>
      </FadeIn>

      {/* Meal Cards Loading */}
      <StaggeredList 
        staggerDelay={150}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {Array.from({ length: itemCount }).map((_, i) => (
          <SkeletonMealCard key={i} />
        ))}
      </StaggeredList>
    </div>
  )
}

// Progressive Content Loader
export const ProgressiveLoader: React.FC<{
  steps: string[]
  currentStep: number
  progress: number
}> = ({ steps, currentStep, progress }) => {
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <FadeIn>
        <div className="text-center mb-6">
          <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
            <span className="text-2xl">🍽️</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900">
            Preparing Your Order
          </h3>
        </div>
      </FadeIn>

      <SlideIn direction="up" delay={300}>
        <ProgressBar 
          progress={progress} 
          className="mb-6" 
          showPercentage 
        />
      </SlideIn>

      <FadeIn delay={500}>
        <div className="space-y-3">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`flex items-center space-x-3 transition-all duration-300 ${
                index < currentStep 
                  ? 'text-green-600' 
                  : index === currentStep 
                  ? 'text-blue-600' 
                  : 'text-gray-400'
              }`}
            >
              <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                index < currentStep 
                  ? 'bg-green-600 text-white' 
                  : index === currentStep 
                  ? 'bg-blue-600 text-white animate-pulse' 
                  : 'bg-gray-200 text-gray-400'
              }`}>
                {index < currentStep ? '✓' : index + 1}
              </div>
              <span className="text-sm font-medium">{step}</span>
            </div>
          ))}
        </div>
      </FadeIn>
    </div>
  )
}

// Animated Search Results
export const AnimatedSearchResults: React.FC<{
  isLoading: boolean
  hasResults: boolean
  resultsCount: number
}> = ({ isLoading, hasResults, resultsCount }) => {
  if (isLoading) {
    return (
      <div className="space-y-4">
        <FadeIn>
          <InlineLoader message="Searching delicious meals..." />
        </FadeIn>
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <SlideIn key={i} direction="left" delay={i * 100}>
              <div className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow animate-pulse">
                <div className="w-16 h-16 bg-gray-200 rounded-lg" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-3 bg-gray-200 rounded w-1/2" />
                </div>
                <div className="h-8 bg-gray-200 rounded w-20" />
              </div>
            </SlideIn>
          ))}
        </div>
      </div>
    )
  }

  if (!hasResults) {
    return (
      <FadeIn>
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No meals found
          </h3>
          <p className="text-gray-600">
            Try adjusting your search or filters
          </p>
        </div>
      </FadeIn>
    )
  }

  return (
    <FadeIn>
      <div className="mb-4">
        <p className="text-sm text-gray-600">
          Found {resultsCount} delicious meal{resultsCount !== 1 ? 's' : ''}
        </p>
      </div>
    </FadeIn>
  )
}

// Button Loading States
export const AnimatedActionButton: React.FC<{
  onClick: () => Promise<void>
  children: React.ReactNode
  successMessage?: string
  className?: string
}> = ({ onClick, children, successMessage = "Success!", className = "" }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleClick = async () => {
    setIsLoading(true)
    try {
      await onClick()
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 2000)
    } catch (error) {
      console.error('Action failed:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <LoadingButton
      isLoading={isLoading}
      onClick={handleClick}
      className={`transition-all duration-200 ${
        showSuccess 
          ? 'bg-green-600 hover:bg-green-700' 
          : 'bg-blue-600 hover:bg-blue-700'
      } text-white px-6 py-3 rounded-lg font-medium ${className}`}
      loadingText="Processing..."
    >
      {showSuccess ? (
        <FadeIn>
          <span className="flex items-center space-x-2">
            <span>✓</span>
            <span>{successMessage}</span>
          </span>
        </FadeIn>
      ) : (
        children
      )}
    </LoadingButton>
  )
}

// Animated Page Transition
export const PageTransition: React.FC<{
  children: React.ReactNode
  direction?: 'left' | 'right' | 'up' | 'down'
}> = ({ children, direction = 'up' }) => {
  return (
    <SlideIn direction={direction} className="min-h-screen">
      {children}
    </SlideIn>
  )
}

// Loading States for Different Content Types
export const ContentLoaders = {
  ProfileCard: () => (
    <div className="bg-white rounded-xl shadow-lg p-6 animate-pulse">
      <div className="flex items-center space-x-4 mb-6">
        <div className="w-16 h-16 bg-gray-200 rounded-full" />
        <div className="space-y-2">
          <div className="h-5 bg-gray-200 rounded w-32" />
          <div className="h-4 bg-gray-200 rounded w-24" />
        </div>
      </div>
      <div className="space-y-3">
        <div className="h-4 bg-gray-200 rounded" />
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-4 bg-gray-200 rounded w-1/2" />
      </div>
    </div>
  ),

  OrderHistory: () => (
    <div className="space-y-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="bg-white rounded-lg shadow p-4 animate-pulse">
          <div className="flex justify-between items-start mb-3">
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-24" />
              <div className="h-3 bg-gray-200 rounded w-32" />
            </div>
            <div className="h-6 bg-gray-200 rounded-full w-20" />
          </div>
          <div className="space-y-2">
            <div className="h-3 bg-gray-200 rounded" />
            <div className="h-3 bg-gray-200 rounded w-2/3" />
          </div>
        </div>
      ))}
    </div>
  ),

  StatCard: () => (
    <div className="bg-white rounded-lg shadow-lg p-6 animate-pulse">
      <div className="flex items-center justify-between mb-4">
        <div className="w-8 h-8 bg-gray-200 rounded" />
        <div className="h-4 bg-gray-200 rounded w-16" />
      </div>
      <div className="space-y-2">
        <div className="h-8 bg-gray-200 rounded w-20" />
        <div className="h-3 bg-gray-200 rounded w-24" />
      </div>
    </div>
  )
}

// Micro-interactions
export const AnimatedCheckbox: React.FC<{
  checked: boolean
  onChange: (checked: boolean) => void
  label: string
}> = ({ checked, onChange, label }) => {
  return (
    <label className="flex items-center space-x-3 cursor-pointer group">
      <div
        className={`relative w-5 h-5 rounded border-2 transition-all duration-200 ${
          checked
            ? 'bg-green-600 border-green-600'
            : 'border-gray-300 group-hover:border-green-400'
        }`}
      >
        {checked && (
          <FadeIn>
            <svg
              className="w-3 h-3 text-white absolute top-0.5 left-0.5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </FadeIn>
        )}
      </div>
      <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
        {label}
      </span>
      <input
        type="checkbox"
        className="sr-only"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
    </label>
  )
}

export default {
  AnimatedMenuLoader,
  ProgressiveLoader,
  AnimatedSearchResults,
  AnimatedActionButton,
  PageTransition,
  ContentLoaders,
  AnimatedCheckbox
}