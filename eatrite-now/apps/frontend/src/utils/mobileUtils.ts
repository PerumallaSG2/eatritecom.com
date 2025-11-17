// Mobile touch interaction utilities and CSS classes

export const touchInteractionClasses = {
  // Basic touch-friendly button
  touchButton:
    'touch-manipulation select-none active:scale-95 transition-transform duration-150',

  // Card that responds to touch
  touchCard:
    'touch-manipulation active:scale-98 transition-all duration-200 cursor-pointer',

  // Large touch target (minimum 44px)
  touchTarget: 'min-h-[44px] min-w-[44px] touch-manipulation',

  // Ripple effect on touch
  touchRipple:
    'relative overflow-hidden before:absolute before:inset-0 before:bg-white/20 before:scale-0 before:rounded-full active:before:scale-100 before:transition-transform before:duration-300',

  // Swipe-friendly container
  swipeContainer: 'touch-pan-x overscroll-contain',

  // Prevent text selection on touch
  noSelect: 'select-none',

  // Enhanced mobile scroll
  mobileScroll: 'touch-pan-y overscroll-behavior-y-contain scroll-smooth',
}

// Touch gesture detection
export const detectTouchGesture = (
  element: HTMLElement,
  onSwipe?: (direction: 'left' | 'right' | 'up' | 'down') => void,
  onTap?: () => void
) => {
  let startX = 0
  let startY = 0
  let startTime = 0

  const handleTouchStart = (e: TouchEvent) => {
    const touch = e.touches[0]
    startX = touch.clientX
    startY = touch.clientY
    startTime = Date.now()
  }

  const handleTouchEnd = (e: TouchEvent) => {
    const touch = e.changedTouches[0]
    const endX = touch.clientX
    const endY = touch.clientY
    const endTime = Date.now()

    const deltaX = endX - startX
    const deltaY = endY - startY
    const deltaTime = endTime - startTime

    // Tap detection (short touch, minimal movement)
    if (deltaTime < 300 && Math.abs(deltaX) < 10 && Math.abs(deltaY) < 10) {
      onTap?.()
      return
    }

    // Swipe detection
    const minSwipeDistance = 50

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      // Horizontal swipe
      if (Math.abs(deltaX) > minSwipeDistance) {
        onSwipe?.(deltaX > 0 ? 'right' : 'left')
      }
    } else {
      // Vertical swipe
      if (Math.abs(deltaY) > minSwipeDistance) {
        onSwipe?.(deltaY > 0 ? 'down' : 'up')
      }
    }
  }

  element.addEventListener('touchstart', handleTouchStart, { passive: false })
  element.addEventListener('touchend', handleTouchEnd, { passive: false })

  // Cleanup function
  return () => {
    element.removeEventListener('touchstart', handleTouchStart)
    element.removeEventListener('touchend', handleTouchEnd)
  }
}

// Haptic feedback for supported devices
export const triggerHapticFeedback = (
  type: 'light' | 'medium' | 'heavy' = 'light'
) => {
  if ('vibrate' in navigator) {
    const patterns = {
      light: [10],
      medium: [20],
      heavy: [30],
    }
    navigator.vibrate(patterns[type])
  }
}

// Mobile-optimized animation variants
export const mobileAnimationVariants = {
  // Faster animations for mobile
  fast: 'duration-200',
  medium: 'duration-300',
  slow: 'duration-500',

  // Reduced motion respect
  reducedMotion: 'motion-reduce:transition-none motion-reduce:animate-none',

  // Touch-friendly hover states (using hover:hover)
  hoverOnlyDesktop: 'hover:hover:bg-opacity-80 hover:hover:scale-105',
}

// Mobile breakpoint utilities
export const isMobile = () => {
  if (typeof window === 'undefined') return false
  return window.innerWidth < 768
}

export const isTouchDevice = () => {
  if (typeof window === 'undefined') return false
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0
}

// Smooth scroll utility for mobile
export const smoothScrollTo = (elementId: string, offset: number = 0) => {
  const element = document.getElementById(elementId)
  if (element) {
    const top = element.offsetTop - offset
    window.scrollTo({
      top,
      behavior: 'smooth',
    })
  }
}

// Mobile-optimized CSS classes as constants
export const MOBILE_STYLES = {
  // Large touch targets
  TOUCH_TARGET: 'min-h-[44px] min-w-[44px] touch-manipulation',

  // Fast tap response
  FAST_TAP: 'active:scale-95 active:bg-opacity-80 transition-all duration-150',

  // Mobile-safe hover (only on devices that support hover)
  SAFE_HOVER: 'hover:hover:opacity-80 hover:hover:scale-105',

  // Prevent zoom on input focus (mobile Safari)
  NO_ZOOM_INPUT: 'text-base', // Prevents zoom on iOS when font-size < 16px

  // Mobile scroll optimizations
  MOBILE_SCROLL: 'overscroll-behavior-y-contain scroll-smooth touch-pan-y',

  // Safe area padding for notched phones
  SAFE_AREA_TOP: 'pt-safe-area-inset-top',
  SAFE_AREA_BOTTOM: 'pb-safe-area-inset-bottom',

  // Mobile spacing (larger for easier touch)
  MOBILE_PADDING: 'p-6 sm:p-4',
  MOBILE_MARGIN: 'm-4 sm:m-2',
} as const
