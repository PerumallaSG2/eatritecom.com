import React, { useState, useRef, useEffect } from 'react'

interface SwipeGestureProps {
  children: React.ReactNode
  onSwipeLeft?: () => void
  onSwipeRight?: () => void
  onSwipeUp?: () => void
  onSwipeDown?: () => void
  threshold?: number
  className?: string
  disabled?: boolean
}

interface TouchPosition {
  x: number
  y: number
  time: number
}

export const SwipeGesture: React.FC<SwipeGestureProps> = ({
  children,
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  onSwipeDown,
  threshold = 50,
  className = '',
  disabled = false
}) => {
  const [startTouch, setStartTouch] = useState<TouchPosition | null>(null)
  const [currentTouch, setCurrentTouch] = useState<TouchPosition | null>(null)
  const elementRef = useRef<HTMLDivElement>(null)

  const getTouchPosition = (touch: React.Touch): TouchPosition => ({
    x: touch.clientX,
    y: touch.clientY,
    time: Date.now()
  })

  const handleTouchStart = (e: React.TouchEvent) => {
    if (disabled) return
    
    const touch = e.touches[0]
    const position = getTouchPosition(touch)
    setStartTouch(position)
    setCurrentTouch(position)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (disabled || !startTouch) return
    
    const touch = e.touches[0]
    const position = getTouchPosition(touch)
    setCurrentTouch(position)
  }

  const handleTouchEnd = () => {
    if (disabled || !startTouch || !currentTouch) return

    const deltaX = currentTouch.x - startTouch.x
    const deltaY = currentTouch.y - startTouch.y
    const deltaTime = currentTouch.time - startTouch.time
    
    // Calculate velocity (pixels per millisecond)
    const velocityX = Math.abs(deltaX) / deltaTime
    const velocityY = Math.abs(deltaY) / deltaTime
    
    // Minimum velocity to register as swipe (0.5 pixels per millisecond)
    const minVelocity = 0.5

    // Determine swipe direction based on the larger delta
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      // Horizontal swipe
      if (Math.abs(deltaX) >= threshold && velocityX >= minVelocity) {
        if (deltaX > 0 && onSwipeRight) {
          onSwipeRight()
        } else if (deltaX < 0 && onSwipeLeft) {
          onSwipeLeft()
        }
      }
    } else {
      // Vertical swipe
      if (Math.abs(deltaY) >= threshold && velocityY >= minVelocity) {
        if (deltaY > 0 && onSwipeDown) {
          onSwipeDown()
        } else if (deltaY < 0 && onSwipeUp) {
          onSwipeUp()
        }
      }
    }

    setStartTouch(null)
    setCurrentTouch(null)
  }

  return (
    <div
      ref={elementRef}
      className={className}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
    >
      {children}
    </div>
  )
}

interface PullToRefreshProps {
  children: React.ReactNode
  onRefresh: () => Promise<void>
  threshold?: number
  className?: string
  disabled?: boolean
}

export const PullToRefresh: React.FC<PullToRefreshProps> = ({
  children,
  onRefresh,
  threshold = 80,
  className = '',
  disabled = false
}) => {
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [pullDistance, setPullDistance] = useState(0)
  const [startY, setStartY] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleTouchStart = (e: React.TouchEvent) => {
    if (disabled || isRefreshing) return
    
    // Only start pull-to-refresh if at the top of the scrollable area
    const container = containerRef.current
    if (container && container.scrollTop === 0) {
      setStartY(e.touches[0].clientY)
    }
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (disabled || isRefreshing || startY === null) return

    const currentY = e.touches[0].clientY
    const distance = currentY - startY

    if (distance > 0) {
      // Prevent default scrolling when pulling down
      e.preventDefault()
      
      // Apply resistance to the pull (diminishing returns)
      const resistedDistance = Math.min(distance * 0.5, threshold * 1.5)
      setPullDistance(resistedDistance)
    }
  }

  const handleTouchEnd = async () => {
    if (disabled || isRefreshing || startY === null) return

    if (pullDistance >= threshold) {
      setIsRefreshing(true)
      try {
        await onRefresh()
      } catch (error) {
        console.error('Refresh failed:', error)
      } finally {
        setIsRefreshing(false)
      }
    }

    setPullDistance(0)
    setStartY(null)
  }

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
    >
      {/* Pull indicator */}
      <div 
        className="absolute top-0 left-0 right-0 flex items-center justify-center transition-all duration-200"
        style={{
          transform: `translateY(${pullDistance - 60}px)`,
          opacity: pullDistance > 20 ? 1 : 0
        }}
      >
        <div className={`flex items-center space-x-2 bg-white rounded-full px-4 py-2 shadow-lg ${
          pullDistance >= threshold ? 'text-green-600' : 'text-gray-500'
        }`}>
          {isRefreshing ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-gray-300 border-t-green-600"></div>
              <span className="text-sm font-medium">Refreshing...</span>
            </>
          ) : (
            <>
              <div className={`transition-transform duration-200 ${
                pullDistance >= threshold ? 'rotate-180' : 'rotate-0'
              }`}>
                ↓
              </div>
              <span className="text-sm font-medium">
                {pullDistance >= threshold ? 'Release to refresh' : 'Pull to refresh'}
              </span>
            </>
          )}
        </div>
      </div>

      {/* Content with transform */}
      <div 
        style={{
          transform: `translateY(${pullDistance}px)`,
          transition: pullDistance === 0 ? 'transform 0.3s ease-out' : 'none'
        }}
      >
        {children}
      </div>
    </div>
  )
}

interface InfiniteScrollProps {
  children: React.ReactNode
  onLoadMore: () => Promise<void>
  hasMore: boolean
  threshold?: number
  className?: string
  loading?: boolean
}

export const InfiniteScroll: React.FC<InfiniteScrollProps> = ({
  children,
  onLoadMore,
  hasMore,
  threshold = 200,
  className = '',
  loading = false
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleScroll = async () => {
    const container = containerRef.current
    if (!container || isLoading || !hasMore) return

    const { scrollTop, scrollHeight, clientHeight } = container
    const distanceFromBottom = scrollHeight - scrollTop - clientHeight

    if (distanceFromBottom <= threshold) {
      setIsLoading(true)
      try {
        await onLoadMore()
      } catch (error) {
        console.error('Load more failed:', error)
      } finally {
        setIsLoading(false)
      }
    }
  }

  useEffect(() => {
    const container = containerRef.current
    if (container) {
      container.addEventListener('scroll', handleScroll)
      return () => container.removeEventListener('scroll', handleScroll)
    }
  }, [hasMore, isLoading])

  return (
    <div ref={containerRef} className={`overflow-y-auto ${className}`}>
      {children}
      
      {(isLoading || loading) && (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-300 border-t-[#0F2B1E]"></div>
          <span className="ml-3 text-gray-600">Loading more...</span>
        </div>
      )}
      
      {!hasMore && (
        <div className="text-center py-8">
          <div className="inline-flex items-center px-4 py-2 bg-gray-100 rounded-full text-gray-600 text-sm">
            <span>🎉 You've reached the end!</span>
          </div>
        </div>
      )}
    </div>
  )
}

// Touch-friendly button component
interface TouchButtonProps {
  children: React.ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  className?: string
}

export const TouchButton: React.FC<TouchButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = ''
}) => {
  const [isPressed, setIsPressed] = useState(false)

  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 active:scale-95'
  
  const variantClasses = {
    primary: 'bg-[#0F2B1E] text-white hover:bg-[#1a4d33] active:bg-[#0a1f15]',
    secondary: 'bg-[#D4B46A] text-[#0F2B1E] hover:bg-[#B8935A] active:bg-[#9e7e4a]',
    outline: 'border-2 border-[#0F2B1E] text-[#0F2B1E] hover:bg-[#0F2B1E] hover:text-white',
    ghost: 'text-[#0F2B1E] hover:bg-gray-100 active:bg-gray-200'
  }

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm min-h-[36px]',
    md: 'px-6 py-3 text-base min-h-[44px]',
    lg: 'px-8 py-4 text-lg min-h-[52px]'
  }

  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'

  const handleTouchStart = () => {
    if (!disabled) setIsPressed(true)
  }

  const handleTouchEnd = () => {
    setIsPressed(false)
    if (!disabled && onClick) onClick()
  }

  return (
    <button
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${disabledClasses}
        ${isPressed ? 'scale-95' : 'scale-100'}
        ${className}
      `}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={() => setIsPressed(false)}
      onMouseDown={handleTouchStart}
      onMouseUp={handleTouchEnd}
      onMouseLeave={() => setIsPressed(false)}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

export default {
  SwipeGesture,
  PullToRefresh,
  InfiniteScroll,
  TouchButton
}