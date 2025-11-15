import React from 'react';

interface EatRiteLogoProps {
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  variant?: 'icon' | 'full' | 'minimal';
  animated?: boolean;
}

const EatRiteLogo: React.FC<EatRiteLogoProps> = ({ 
  className = '', 
  size = 'md', 
  variant = 'icon',
  animated = false 
}) => {
  const sizeClasses = {
    xs: 'w-6 h-6',
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
    '2xl': 'w-20 h-20'
  };

  const textSizeClasses = {
    xs: 'text-sm',
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-xl',
    xl: 'text-2xl',
    '2xl': 'text-3xl'
  };

  if (variant === 'full') {
    return (
      <div className={`flex items-center gap-sm ${className}`}>
        <div className={`${sizeClasses[size]} ${animated ? 'animate-pulse-gold' : ''}`}>
          <svg viewBox="0 0 200 200" className="w-full h-full" fill="none">
            <defs>
              <linearGradient id="luxuryGold" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#D4B46A" />
                <stop offset="50%" stopColor="#F5EEDC" />
                <stop offset="100%" stopColor="#C4A45A" />
              </linearGradient>
              <filter id="goldGlow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            
            {/* Elegant leaf bowl design */}
            <circle cx="100" cy="100" r="90" fill="#0A2418" stroke="#D4B46A" strokeWidth="2"/>
            
            {/* Center leaf */}
            <path d="M100 60 Q85 80 100 120 Q115 80 100 60 Z" fill="url(#luxuryGold)" filter="url(#goldGlow)"/>
            
            {/* Side leaves */}
            <path d="M70 100 Q60 85 80 75 Q90 90 70 100 Z" fill="url(#luxuryGold)" opacity="0.8"/>
            <path d="M130 100 Q140 85 120 75 Q110 90 130 100 Z" fill="url(#luxuryGold)" opacity="0.8"/>
            
            {/* Bowl base */}
            <ellipse cx="100" cy="130" rx="25" ry="8" fill="url(#luxuryGold)" opacity="0.6"/>
          </svg>
        </div>
        <span className={`heading-3 text-accent ${textSizeClasses[size]}`}>EatRite</span>
      </div>
    );
  }

  return (
    <div className={`${sizeClasses[size]} ${animated ? 'animate-pulse-gold' : ''} ${className}`}>
      <svg viewBox="0 0 200 200" className="w-full h-full" fill="none">
        <defs>
          <linearGradient id="luxuryGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D4B46A" />
            <stop offset="50%" stopColor="#F5EEDC" />
            <stop offset="100%" stopColor="#C4A45A" />
          </linearGradient>
          <filter id="goldGlow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Luxury background */}
        <circle cx="100" cy="100" r="90" fill="#0A2418" stroke="#D4B46A" strokeWidth="2"/>
        
        {/* Center leaf */}
        <path d="M100 60 Q85 80 100 120 Q115 80 100 60 Z" fill="url(#luxuryGold)" filter="url(#goldGlow)"/>
        
        {/* Side leaves */}
        <path d="M70 100 Q60 85 80 75 Q90 90 70 100 Z" fill="url(#luxuryGold)" opacity="0.8"/>
        <path d="M130 100 Q140 85 120 75 Q110 90 130 100 Z" fill="url(#luxuryGold)" opacity="0.8"/>
        
        {/* Bowl base */}
        <ellipse cx="100" cy="130" rx="25" ry="8" fill="url(#luxuryGold)" opacity="0.6"/>
      </svg>
    </div>
  );
};

export default EatRiteLogo;