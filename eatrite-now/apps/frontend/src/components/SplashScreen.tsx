import React, { useState, useEffect } from 'react'

interface SplashScreenProps {
  onComplete?: () => void
  duration?: number
}

const SplashScreen: React.FC<SplashScreenProps> = ({ 
  onComplete, 
  duration = 2500 
}) => {
  const [isVisible, setIsVisible] = useState(true)
  const [loadingProgress, setLoadingProgress] = useState(0)

  useEffect(() => {
    // Animate loading progress
    const progressInterval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + 2
      })
    }, 25)

    // Auto-complete splash screen
    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(() => {
        onComplete?.()
      }, 300) // Allow fade out animation
    }, duration)

    return () => {
      clearTimeout(timer)
      clearInterval(progressInterval)
    }
  }, [duration, onComplete])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-orange-50 via-white to-yellow-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-20 h-20 bg-orange-300 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-yellow-300 rounded-full blur-xl animate-pulse delay-300"></div>
        <div className="absolute bottom-40 left-1/4 w-24 h-24 bg-orange-200 rounded-full blur-xl animate-pulse delay-700"></div>
        <div className="absolute bottom-20 right-1/3 w-18 h-18 bg-yellow-200 rounded-full blur-xl animate-pulse delay-500"></div>
      </div>

      {/* Main Logo Container */}
      <div className="flex flex-col items-center space-y-8 animate-fade-in">
        {/* Logo */}
        <div className="relative">
          <div className="w-32 h-32 relative animate-bounce-subtle">
            <img
              src="/eatrite-full-logo.svg"
              alt="EatRite"
              className="w-full h-full object-contain drop-shadow-2xl"
            />
          </div>
          
          {/* Glow Effect */}
          <div className="absolute inset-0 w-32 h-32 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-full blur-3xl opacity-20 animate-pulse"></div>
        </div>

        {/* App Title & Tagline */}
        <div className="text-center space-y-3">
          <h1 className="text-4xl font-bold text-gray-800 tracking-tight">
            <span className="bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent">
              EatRite
            </span>
          </h1>
          <p className="text-lg text-gray-600 font-medium">
            Premium Meal Delivery
          </p>
          <p className="text-sm text-gray-500 max-w-xs mx-auto">
            Healthy meals, delivered fresh to your door
          </p>
        </div>

        {/* Loading Progress */}
        <div className="w-64 space-y-3">
          <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${loadingProgress}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-gray-500">
            <span>Loading your experience...</span>
            <span>{loadingProgress}%</span>
          </div>
        </div>

        {/* Feature Icons */}
        <div className="flex space-x-8 opacity-60">
          <div className="flex flex-col items-center space-y-1">
            <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center">
              <span className="text-white text-lg">🥗</span>
            </div>
            <span className="text-xs text-gray-600">Fresh</span>
          </div>
          <div className="flex flex-col items-center space-y-1">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white text-lg">🚚</span>
            </div>
            <span className="text-xs text-gray-600">Fast</span>
          </div>
          <div className="flex flex-col items-center space-y-1">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-purple-500 rounded-full flex items-center justify-center">
              <span className="text-white text-lg">💪</span>
            </div>
            <span className="text-xs text-gray-600">Healthy</span>
          </div>
        </div>
      </div>

      {/* Version Info */}
      <div className="absolute bottom-8 text-xs text-gray-400">
        EatRite v2.0.0 • Made with ❤️
      </div>
    </div>
  )
}

export default SplashScreen