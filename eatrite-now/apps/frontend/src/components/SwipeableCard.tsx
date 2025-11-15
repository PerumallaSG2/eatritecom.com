import React, { useState, useRef, useEffect } from 'react';
import { Heart, ShoppingCart } from 'lucide-react';

interface SwipeableCardProps {
  children: React.ReactNode;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onAddToCart?: () => void;
  onToggleFavorite?: () => void;
  isFavorited?: boolean;
}

const SwipeableCard: React.FC<SwipeableCardProps> = ({
  children,
  onSwipeLeft,
  onSwipeRight,
  onAddToCart: _onAddToCart,
  onToggleFavorite: _onToggleFavorite,
  isFavorited = false
}) => {
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [swipeOffset, setSwipeOffset] = useState(0);
  const [isPressed, setIsPressed] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
    setIsPressed(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStart === 0) return;
    
    const currentTouch = e.targetTouches[0].clientX;
    const diff = currentTouch - touchStart;
    
    // Limit swipe distance
    const maxSwipe = 100;
    const clampedDiff = Math.max(-maxSwipe, Math.min(maxSwipe, diff));
    
    setSwipeOffset(clampedDiff);
    setTouchEnd(currentTouch);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && onSwipeLeft) {
      onSwipeLeft();
    } else if (isRightSwipe && onSwipeRight) {
      onSwipeRight();
    }

    // Reset
    setTouchStart(0);
    setTouchEnd(0);
    setSwipeOffset(0);
    setIsPressed(false);
  };

  // Add haptic feedback for mobile devices
  const triggerHaptic = () => {
    if ('vibrate' in navigator) {
      navigator.vibrate(10);
    }
  };

  useEffect(() => {
    if (Math.abs(swipeOffset) > 30) {
      triggerHaptic();
    }
  }, [swipeOffset]);

  return (
    <div className="relative overflow-hidden rounded-xl">
      {/* Background Action Buttons */}
      <div className="absolute inset-0 flex">
        {/* Left Action - Add to Cart */}
        <div 
          className={`w-1/2 bg-green-500 flex items-center justify-center transform transition-transform duration-200 ${
            swipeOffset > 30 ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="text-white text-center">
            <ShoppingCart className="w-8 h-8 mx-auto mb-1" />
            <span className="text-sm font-semibold">Add to Cart</span>
          </div>
        </div>

        {/* Right Action - Favorite */}
        <div 
          className={`w-1/2 bg-red-500 flex items-center justify-center ml-auto transform transition-transform duration-200 ${
            swipeOffset < -30 ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="text-white text-center">
            <Heart className={`w-8 h-8 mx-auto mb-1 ${isFavorited ? 'fill-current' : ''}`} />
            <span className="text-sm font-semibold">
              {isFavorited ? 'Unfavorite' : 'Favorite'}
            </span>
          </div>
        </div>
      </div>

      {/* Main Card */}
      <div
        ref={cardRef}
        className={`relative bg-white transform transition-transform duration-200 ${
          isPressed ? 'scale-98' : 'scale-100'
        }`}
        style={{
          transform: `translateX(${swipeOffset}px) ${isPressed ? 'scale(0.98)' : 'scale(1)'}`,
          transition: isPressed ? 'none' : 'transform 0.2s ease-out'
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {children}

        {/* Swipe Hints on First Load */}
        {swipeOffset === 0 && !isPressed && (
          <div className="absolute top-2 left-2 right-2">
            <div className="flex justify-between items-center">
              <div className="bg-black bg-opacity-20 text-white text-xs px-2 py-1 rounded-full opacity-0 animate-pulse">
                ← Cart
              </div>
              <div className="bg-black bg-opacity-20 text-white text-xs px-2 py-1 rounded-full opacity-0 animate-pulse">
                Heart →
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SwipeableCard;