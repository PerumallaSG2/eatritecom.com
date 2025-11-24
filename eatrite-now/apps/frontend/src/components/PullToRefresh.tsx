import React, { useState, useRef, useCallback } from 'react'
import { RefreshCw } from 'lucide-react'

interface PullToRefreshProps {
  onRefresh: () => Promise<void>
  children: React.ReactNode
  disabled?: boolean
  pullDistance?: number
  className?: string
}

const PullToRefresh: React.FC<PullToRefreshProps> = ({
  onRefresh,
  children,
  disabled = false,
  pullDistance = 80,
  className = '',
}) => {
  const [isPulling, setIsPulling] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [pullY, setPullY] = useState(0)
  
  const containerRef = useRef<HTMLDivElement>(null)
  const startY = useRef<number>(0)

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (disabled || isRefreshing) return
    
    const container = containerRef.current
    if (!container || container.scrollTop > 0) return
    
    startY.current = e.touches[0].clientY
  }, [disabled, isRefreshing])

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (disabled || isRefreshing) return
    
    const container = containerRef.current
    if (!container || container.scrollTop > 0) return
    
    const currentY = e.touches[0].clientY
    const deltaY = currentY - startY.current
    
    if (deltaY > 0) {
      e.preventDefault()
      const pull = Math.min(deltaY * 0.5, pullDistance * 1.5)
      setPullY(pull)
      setIsPulling(pull > pullDistance * 0.5)
    }
  }, [disabled, isRefreshing, pullDistance])

  const handleTouchEnd = useCallback(async () => {
    if (disabled || isRefreshing) return
    
    if (pullY > pullDistance) {
      setIsRefreshing(true)
      try {
        await onRefresh()
      } catch (error) {
        console.error('Refresh failed:', error)
      } finally {
        setIsRefreshing(false)
      }
    }
    
    setPullY(0)
    setIsPulling(false)
  }, [disabled, isRefreshing, pullY, pullDistance, onRefresh])

  const refreshProgress = Math.min((pullY / pullDistance) * 100, 100)
  const isReady = pullY > pullDistance

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{
        transform: `translateY(${Math.min(pullY * 0.3, 40)}px)`,
        transition: isPulling ? 'none' : 'transform 0.3s ease-out',
      }}
    >
      {/* Refresh Indicator */}
      <div
        className={`absolute top-0 left-0 right-0 flex flex-col items-center justify-center bg-gradient-to-b from-orange-50 to-transparent transition-all duration-300 ${
          pullY > 0 ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          height: `${Math.min(pullY, 100)}px`,
          transform: `translateY(-${Math.max(100 - pullY, 0)}px)`,
        }}
      >
        <div className="flex flex-col items-center space-y-2 py-4">
          {/* Refresh Icon */}
          <div
            className={`transition-transform duration-300 ${
              isRefreshing
                ? 'animate-spin text-orange-500'
                : isReady
                ? 'text-orange-500 scale-110'
                : 'text-orange-300'
            }`}
            style={{
              transform: `rotate(${refreshProgress * 3.6}deg)`,
            }}
          >
            <RefreshCw size={24} />
          </div>
          
          {/* Status Text */}
          <div className="text-sm font-medium text-center">
            {isRefreshing ? (
              <span className="text-orange-600">Refreshing...</span>
            ) : isReady ? (
              <span className="text-orange-600">Release to refresh</span>
            ) : (
              <span className="text-orange-400">Pull to refresh</span>
            )}
          </div>
          
          {/* Progress Bar */}
          <div className="w-20 h-1 bg-orange-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-orange-400 to-orange-500 rounded-full transition-all duration-300"
              style={{ width: `${refreshProgress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}

export default PullToRefresh