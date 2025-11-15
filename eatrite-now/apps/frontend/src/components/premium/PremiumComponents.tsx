/**
 * EatRite Premium UI Components
 * Luxury components with inline styles matching the gold-on-dark-green brand
 */

import React from 'react';

// Brand color constants
const BRAND_COLORS = {
  gold: '#D4B46A',
  darkGreen: '#0F2B1E',
  softBlack: '#0A0A0A',
  offWhite: '#F5F2E8',
  surfaceSecondary: '#152D22',
  surfaceTertiary: '#1A3327',
  textSecondary: '#E0DDD5',
  textTertiary: '#B8B5AD',
};

// 🔘 PREMIUM BUTTON
interface PremiumButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const PremiumButton: React.FC<PremiumButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  style,
  disabled,
  ...props
}) => {
  const sizeStyles = {
    sm: { height: '36px', padding: '0 16px', fontSize: '14px' },
    md: { height: '44px', padding: '0 24px', fontSize: '16px' },
    lg: { height: '52px', padding: '0 32px', fontSize: '18px' },
    xl: { height: '60px', padding: '0 40px', fontSize: '20px' },
  };

  const variantStyles = {
    primary: {
      backgroundColor: BRAND_COLORS.gold,
      color: BRAND_COLORS.softBlack,
      border: 'none',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 0 20px rgba(212, 180, 106, 0.3)',
    },
    secondary: {
      backgroundColor: 'transparent',
      color: BRAND_COLORS.gold,
      border: `1px solid ${BRAND_COLORS.gold}`,
      boxShadow: 'none',
    },
    tertiary: {
      backgroundColor: BRAND_COLORS.surfaceSecondary,
      color: BRAND_COLORS.offWhite,
      border: 'none',
      boxShadow: '0 2px 4px -1px rgba(0, 0, 0, 0.3)',
    },
  };

  const baseStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    borderRadius: '14px',
    fontFamily: '"Inter", sans-serif',
    fontWeight: 600,
    cursor: disabled || isLoading ? 'not-allowed' : 'pointer',
    opacity: disabled || isLoading ? 0.5 : 1,
    transition: 'all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    outline: 'none',
    ...sizeStyles[size],
    ...variantStyles[variant],
    ...style,
  };

  return (
    <button
      style={baseStyle}
      disabled={disabled || isLoading}
      onMouseEnter={(e) => {
        if (variant === 'primary') {
          e.currentTarget.style.transform = 'translateY(-1px)';
          e.currentTarget.style.boxShadow = '0 6px 12px -2px rgba(0, 0, 0, 0.5), 0 0 30px rgba(212, 180, 106, 0.5)';
        }
      }}
      onMouseLeave={(e) => {
        if (variant === 'primary') {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 0 20px rgba(212, 180, 106, 0.3)';
        }
      }}
      {...props}
    >
      {isLoading ? (
        <div
          style={{
            width: '20px',
            height: '20px',
            border: '2px solid currentColor',
            borderTopColor: 'transparent',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
          }}
        />
      ) : (
        <>
          {leftIcon && <span style={{ width: '20px', height: '20px' }}>{leftIcon}</span>}
          {children}
          {rightIcon && <span style={{ width: '20px', height: '20px' }}>{rightIcon}</span>}
        </>
      )}
    </button>
  );
};

// 📄 PREMIUM CARD
interface PremiumCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'outlined';
  padding?: 'sm' | 'md' | 'lg' | 'xl';
  goldAccent?: boolean;
}

export const PremiumCard: React.FC<PremiumCardProps> = ({
  children,
  variant = 'default',
  padding = 'md',
  goldAccent = false,
  style,
  ...props
}) => {
  const paddingStyles = {
    sm: '16px',
    md: '24px',
    lg: '32px',
    xl: '40px',
  };

  const variantStyles = {
    default: {
      backgroundColor: BRAND_COLORS.surfaceSecondary,
      border: `1px solid rgba(212, 180, 106, 0.2)`,
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.3)',
    },
    elevated: {
      background: `linear-gradient(145deg, ${BRAND_COLORS.surfaceSecondary}, ${BRAND_COLORS.surfaceTertiary})`,
      border: `1px solid rgba(212, 180, 106, 0.1)`,
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 10px 10px -5px rgba(0, 0, 0, 0.3)',
    },
    outlined: {
      backgroundColor: BRAND_COLORS.darkGreen,
      border: `1px solid ${BRAND_COLORS.gold}`,
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3)',
    },
  };

  const baseStyle: React.CSSProperties = {
    borderRadius: '20px',
    padding: paddingStyles[padding],
    position: 'relative',
    transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    ...variantStyles[variant],
    ...style,
  };

  const accentStyle: React.CSSProperties = goldAccent
    ? {
        borderLeft: `4px solid ${BRAND_COLORS.gold}`,
        paddingLeft: `calc(${paddingStyles[padding]} - 4px)`,
      }
    : {};

  return (
    <div
      style={{ ...baseStyle, ...accentStyle }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        if (variant === 'default') {
          e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.4)';
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        if (variant === 'default') {
          e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.3)';
        }
      }}
      {...props}
    >
      {children}
    </div>
  );
};

// 📝 PREMIUM INPUT
interface PremiumInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helper?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const PremiumInput: React.FC<PremiumInputProps> = ({
  label,
  error,
  helper,
  leftIcon,
  rightIcon,
  style,
  ...props
}) => {
  const [focused, setFocused] = React.useState(false);

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: '"Playfair Display", serif',
    fontSize: '14px',
    fontWeight: 500,
    color: BRAND_COLORS.offWhite,
    marginBottom: '4px',
  };

  const inputContainerStyle: React.CSSProperties = {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    height: '44px',
    padding: leftIcon || rightIcon ? '0 48px 0 16px' : '0 16px',
    paddingLeft: leftIcon ? '48px' : '16px',
    paddingRight: rightIcon ? '48px' : '16px',
    backgroundColor: BRAND_COLORS.surfaceSecondary,
    color: BRAND_COLORS.offWhite,
    border: `1px solid ${error ? '#CC4444' : focused ? BRAND_COLORS.gold : 'rgba(212, 180, 106, 0.3)'}`,
    borderRadius: '10px',
    fontFamily: '"Inter", sans-serif',
    fontSize: '16px',
    outline: 'none',
    transition: 'all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    boxShadow: focused ? `0 0 0 2px ${BRAND_COLORS.gold}40` : 'none',
    ...style,
  };

  const iconStyle: React.CSSProperties = {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    width: '20px',
    height: '20px',
    color: BRAND_COLORS.textTertiary,
    pointerEvents: 'none',
  };

  const helperStyle: React.CSSProperties = {
    fontSize: '12px',
    color: error ? '#CC4444' : BRAND_COLORS.textSecondary,
    fontFamily: '"Inter", sans-serif',
  };

  return (
    <div style={containerStyle}>
      {label && <label style={labelStyle}>{label}</label>}
      
      <div style={inputContainerStyle}>
        {leftIcon && (
          <span style={{ ...iconStyle, left: '12px' }}>
            {leftIcon}
          </span>
        )}
        
        <input
          style={inputStyle}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          {...props}
        />
        
        {rightIcon && (
          <span style={{ ...iconStyle, right: '12px' }}>
            {rightIcon}
          </span>
        )}
      </div>
      
      {(error || helper) && (
        <span style={helperStyle}>
          {error || helper}
        </span>
      )}
    </div>
  );
};

// 🏷️ PREMIUM BADGE
interface PremiumBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg';
}

export const PremiumBadge: React.FC<PremiumBadgeProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  style,
  ...props
}) => {
  const sizeStyles = {
    sm: { padding: '4px 8px', fontSize: '12px', height: '20px' },
    md: { padding: '6px 12px', fontSize: '14px', height: '24px' },
    lg: { padding: '8px 16px', fontSize: '16px', height: '32px' },
  };

  const variantStyles = {
    primary: {
      backgroundColor: BRAND_COLORS.gold,
      color: BRAND_COLORS.softBlack,
    },
    secondary: {
      backgroundColor: BRAND_COLORS.surfaceSecondary,
      color: BRAND_COLORS.offWhite,
      border: `1px solid rgba(212, 180, 106, 0.3)`,
    },
    success: {
      backgroundColor: '#4A7C59',
      color: BRAND_COLORS.offWhite,
    },
    warning: {
      backgroundColor: BRAND_COLORS.gold,
      color: BRAND_COLORS.softBlack,
    },
    error: {
      backgroundColor: '#CC4444',
      color: BRAND_COLORS.offWhite,
    },
  };

  const baseStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '12px',
    fontFamily: '"Inter", sans-serif',
    fontWeight: 500,
    border: 'none',
    ...sizeStyles[size],
    ...variantStyles[variant],
    ...style,
  };

  return (
    <span style={baseStyle} {...props}>
      {children}
    </span>
  );
};

// Add CSS animation keyframes to the document
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }
  `;
  document.head.appendChild(style);
}

// Export components
export const EatRitePremiumComponents = {
  PremiumButton,
  PremiumCard,
  PremiumInput,
  PremiumBadge,
};