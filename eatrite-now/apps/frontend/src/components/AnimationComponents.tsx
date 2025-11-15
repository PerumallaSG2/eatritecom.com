import React, { useEffect, useRef, useState } from 'react';

// Intersection Observer Hook for scroll animations
export const useScrollAnimation = (threshold: number = 0.1) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Once visible, we can disconnect to avoid re-triggering
          observer.disconnect();
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
};

// Staggered Children Animation Component
interface StaggeredAnimationProps {
  children: React.ReactNode;
  stagger?: number;
  className?: string;
}

export const StaggeredAnimation: React.FC<StaggeredAnimationProps> = ({
  children,
  stagger = 100,
  className = ''
}) => {
  const { ref, isVisible } = useScrollAnimation();
  
  return (
    <div ref={ref} className={className}>
      {React.Children.map(children, (child, index) => (
        <div
          className={`transform transition-all duration-700 ease-out ${
            isVisible 
              ? 'translate-y-0 opacity-100' 
              : 'translate-y-8 opacity-0'
          }`}
          style={{
            transitionDelay: isVisible ? `${index * stagger}ms` : '0ms'
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
};

// Fade In Animation Component
interface FadeInProps {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  delay?: number;
  duration?: number;
  className?: string;
}

export const FadeIn: React.FC<FadeInProps> = ({
  children,
  direction = 'up',
  delay = 0,
  duration = 600,
  className = ''
}) => {
  const { ref, isVisible } = useScrollAnimation();
  
  const getTransform = () => {
    if (!isVisible) {
      switch (direction) {
        case 'up': return 'translate-y-8';
        case 'down': return '-translate-y-8';
        case 'left': return 'translate-x-8';
        case 'right': return '-translate-x-8';
        default: return '';
      }
    }
    return 'translate-y-0 translate-x-0';
  };

  const getOpacity = () => isVisible ? 'opacity-100' : 'opacity-0';

  return (
    <div
      ref={ref}
      className={`transform transition-all ease-out ${getTransform()} ${getOpacity()} ${className}`}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`
      }}
    >
      {children}
    </div>
  );
};

// Scale Animation Component
interface ScaleInProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export const ScaleIn: React.FC<ScaleInProps> = ({
  children,
  delay = 0,
  className = ''
}) => {
  const { ref, isVisible } = useScrollAnimation();
  
  return (
    <div
      ref={ref}
      className={`transform transition-all duration-500 ease-out ${
        isVisible 
          ? 'scale-100 opacity-100' 
          : 'scale-95 opacity-0'
      } ${className}`}
      style={{
        transitionDelay: `${delay}ms`
      }}
    >
      {children}
    </div>
  );
};

// Floating Animation Component
interface FloatingProps {
  children: React.ReactNode;
  intensity?: 'subtle' | 'normal' | 'strong';
  speed?: 'slow' | 'normal' | 'fast';
  className?: string;
}

export const Floating: React.FC<FloatingProps> = ({
  children,
  intensity = 'normal',
  speed = 'normal',
  className = ''
}) => {
  const intensityMap = {
    subtle: '2px',
    normal: '4px',
    strong: '6px'
  };

  const speedMap = {
    slow: '4s',
    normal: '3s',
    fast: '2s'
  };

  const floatingKeyframes = `
    @keyframes floating-${intensity} {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-${intensityMap[intensity]}); }
    }
  `;

  return (
    <>
      <style>{floatingKeyframes}</style>
      <div
        className={`${className}`}
        style={{
          animation: `floating-${intensity} ${speedMap[speed]} ease-in-out infinite`
        }}
      >
        {children}
      </div>
    </>
  );
};

// Pulse Animation Component
export const PulseGlow: React.FC<{ children: React.ReactNode; color?: string; className?: string }> = ({
  children,
  color = 'green',
  className = ''
}) => {
  return (
    <div className={`relative ${className}`}>
      <div 
        className={`absolute inset-0 rounded-full bg-${color}-400 opacity-20 animate-ping`}
      />
      <div 
        className={`absolute inset-0 rounded-full bg-${color}-400 opacity-10 animate-pulse`}
      />
      {children}
    </div>
  );
};

// Typewriter Effect
interface TypewriterProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
  onComplete?: () => void;
}

export const Typewriter: React.FC<TypewriterProps> = ({
  text,
  speed = 100,
  delay = 0,
  className = '',
  onComplete
}) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentIndex < text.length) {
        setDisplayText(text.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      } else {
        onComplete?.();
      }
    }, currentIndex === 0 ? delay : speed);

    return () => clearTimeout(timer);
  }, [currentIndex, text, speed, delay, onComplete]);

  return (
    <span className={className}>
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  );
};

// Parallax Scroll Effect
interface ParallaxProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}

export const Parallax: React.FC<ParallaxProps> = ({
  children,
  speed = 0.5,
  className = ''
}) => {
  const [offset, setOffset] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const scrolled = window.pageYOffset;
        const rate = scrolled * speed;
        setOffset(rate);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transform: `translateY(${offset}px)`
      }}
    >
      {children}
    </div>
  );
};

// Morphing Button Component
interface MorphButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}

export const MorphButton: React.FC<MorphButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  onClick,
  className = ''
}) => {
  const [isPressed, setIsPressed] = useState(false);

  const baseClasses = 'relative overflow-hidden font-medium rounded-lg transition-all duration-200 transform focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variantClasses = {
    primary: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500 shadow-lg hover:shadow-xl',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500',
    success: 'bg-emerald-600 text-white hover:bg-emerald-700 focus:ring-emerald-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500'
  };

  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg'
  };

  const handleMouseDown = () => setIsPressed(true);
  const handleMouseUp = () => setIsPressed(false);
  const handleMouseLeave = () => setIsPressed(false);

  return (
    <button
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${isPressed ? 'scale-95' : 'hover:scale-105'}
        ${disabled || loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
      onClick={onClick}
      disabled={disabled || loading}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
    >
      {/* Ripple Effect */}
      <div className="absolute inset-0 bg-white opacity-0 hover:opacity-10 transition-opacity duration-200" />
      
      {/* Loading Spinner */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      
      {/* Content */}
      <div className={`transition-opacity duration-200 ${loading ? 'opacity-0' : 'opacity-100'}`}>
        {children}
      </div>
    </button>
  );
};

// Gradient Text Component
interface GradientTextProps {
  children: React.ReactNode;
  gradient?: 'sunset' | 'ocean' | 'forest' | 'purple' | 'fire';
  className?: string;
}

export const GradientText: React.FC<GradientTextProps> = ({
  children,
  gradient = 'sunset',
  className = ''
}) => {
  const gradients = {
    sunset: 'bg-gradient-to-r from-orange-400 via-red-500 to-pink-500',
    ocean: 'bg-gradient-to-r from-blue-400 via-purple-500 to-purple-600',
    forest: 'bg-gradient-to-r from-green-400 via-green-500 to-green-600',
    purple: 'bg-gradient-to-r from-purple-400 via-pink-500 to-red-500',
    fire: 'bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500'
  };

  return (
    <span className={`${gradients[gradient]} bg-clip-text text-transparent ${className}`}>
      {children}
    </span>
  );
};