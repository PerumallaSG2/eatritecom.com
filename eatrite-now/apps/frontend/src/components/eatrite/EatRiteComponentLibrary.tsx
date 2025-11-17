/**
 * EatRite Premium Component Library
 * Complete set of luxury UI components for the EatRite nutrition platform
 */

import React from 'react'
import { EatRiteDesignTokens } from '../../styles/design-system/eatrite-design-tokens'

// ============================================================================
// ICON COMPONENTS
// ============================================================================

interface IconProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  color?: 'gold' | 'white' | 'green' | 'inherit'
  className?: string
}

const iconSizes = {
  xs: '12px',
  sm: '16px',
  md: '20px',
  lg: '24px',
  xl: '32px',
  '2xl': '48px',
}

const iconColors = {
  gold: EatRiteDesignTokens.colors.primary.gold,
  white: EatRiteDesignTokens.colors.text.primary,
  green: EatRiteDesignTokens.colors.surface.darkGreen,
  inherit: 'currentColor',
}

// EatRite Logo Icon (Bowl + Leaves)
export const EatRiteIcon: React.FC<IconProps> = ({
  size = 'md',
  color = 'gold',
  className = '',
}) => {
  return (
    <svg
      width={iconSizes[size]}
      height={iconSizes[size]}
      viewBox="0 0 24 24"
      className={className}
      style={{ color: iconColors[color] }}
    >
      {/* Bowl Base */}
      <path
        d="M3 12C3 16.418 6.582 20 11 20H13C17.418 20 21 16.418 21 12C21 11.448 20.552 11 20 11H4C3.448 11 3 11.448 3 12Z"
        fill="currentColor"
        opacity="0.9"
      />
      {/* Leaf 1 */}
      <path
        d="M8 4C8 4 6 6 6 8C6 9.105 6.895 10 8 10C9.105 10 10 9.105 10 8C10 6 8 4 8 4Z"
        fill="currentColor"
      />
      {/* Leaf 2 */}
      <path
        d="M12 3C12 3 10 5 10 7C10 8.105 10.895 9 12 9C13.105 9 14 8.105 14 7C14 5 12 3 12 3Z"
        fill="currentColor"
      />
      {/* Leaf 3 */}
      <path
        d="M16 4C16 4 14 6 14 8C14 9.105 14.895 10 16 10C17.105 10 18 9.105 18 8C18 6 16 4 16 4Z"
        fill="currentColor"
      />
      {/* Bowl Rim Highlight */}
      <ellipse
        cx="12"
        cy="11"
        rx="8"
        ry="1"
        fill="currentColor"
        opacity="0.3"
      />
    </svg>
  )
}

// Nutrition Icons
export const ProteinIcon: React.FC<IconProps> = ({
  size = 'md',
  color = 'gold',
  className = '',
}) => (
  <svg
    width={iconSizes[size]}
    height={iconSizes[size]}
    viewBox="0 0 24 24"
    className={className}
    style={{ color: iconColors[color] }}
  >
    <path
      d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z"
      fill="currentColor"
    />
  </svg>
)

export const CarbIcon: React.FC<IconProps> = ({
  size = 'md',
  color = 'gold',
  className = '',
}) => (
  <svg
    width={iconSizes[size]}
    height={iconSizes[size]}
    viewBox="0 0 24 24"
    className={className}
    style={{ color: iconColors[color] }}
  >
    <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.8" />
    <circle cx="12" cy="12" r="6" fill="currentColor" />
  </svg>
)

export const FatIcon: React.FC<IconProps> = ({
  size = 'md',
  color = 'gold',
  className = '',
}) => (
  <svg
    width={iconSizes[size]}
    height={iconSizes[size]}
    viewBox="0 0 24 24"
    className={className}
    style={{ color: iconColors[color] }}
  >
    <path
      d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 13L13.5 7.5C13.1 6.4 12.1 5.5 11 5.5S8.9 6.4 8.5 7.5L7 13L1 7V9L6 13.5V22H8.5V13.5L9.5 9.5L11 15V22H13V15L14.5 9.5L15.5 13.5V22H18V13.5L23 9Z"
      fill="currentColor"
    />
  </svg>
)

// Utility Icons
export const LeafIcon: React.FC<IconProps> = ({
  size = 'md',
  color = 'gold',
  className = '',
}) => (
  <svg
    width={iconSizes[size]}
    height={iconSizes[size]}
    viewBox="0 0 24 24"
    className={className}
    style={{ color: iconColors[color] }}
  >
    <path
      d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22L6.66 19.7C7.14 19.87 7.64 20 8 20C19 20 22 3 22 3C21 5 14 5.25 9 6.25C4 7.25 2 11.5 2 13.5C2 15.5 3.75 17 6.5 17C9.25 17 12 15 13 12C14 9 17 8 17 8Z"
      fill="currentColor"
    />
  </svg>
)

export const CalendarIcon: React.FC<IconProps> = ({
  size = 'md',
  color = 'gold',
  className = '',
}) => (
  <svg
    width={iconSizes[size]}
    height={iconSizes[size]}
    viewBox="0 0 24 24"
    className={className}
    style={{ color: iconColors[color] }}
  >
    <path
      d="M19 3H18V1H16V3H8V1H6V3H5C3.89 3 3.01 3.9 3.01 5L3 19C3 20.1 3.89 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V8H19V19Z"
      fill="currentColor"
    />
  </svg>
)

export const CartIcon: React.FC<IconProps> = ({
  size = 'md',
  color = 'gold',
  className = '',
}) => (
  <svg
    width={iconSizes[size]}
    height={iconSizes[size]}
    viewBox="0 0 24 24"
    className={className}
    style={{ color: iconColors[color] }}
  >
    <path
      d="M7 18C5.9 18 5.01 18.9 5.01 20S5.9 22 7 22 9 21.1 9 20 8.1 18 7 18ZM1 2V4H3L6.6 11.59L5.25 14.04C5.09 14.32 5 14.65 5 15C5 16.1 5.9 17 7 17H19V15H7.42C7.28 15 7.17 14.89 7.17 14.75L7.2 14.63L8.1 13H15.55C16.3 13 16.96 12.59 17.3 11.97L20.88 5H5.21L4.27 3H1ZM17 18C15.9 18 15.01 18.9 15.01 20S15.9 22 17 22 19 21.1 19 20 18.1 18 17 18Z"
      fill="currentColor"
    />
  </svg>
)

export const UserIcon: React.FC<IconProps> = ({
  size = 'md',
  color = 'gold',
  className = '',
}) => (
  <svg
    width={iconSizes[size]}
    height={iconSizes[size]}
    viewBox="0 0 24 24"
    className={className}
    style={{ color: iconColors[color] }}
  >
    <path
      d="M12 12C14.21 12 16 10.21 16 8S14.21 4 12 4 8 5.79 8 8 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z"
      fill="currentColor"
    />
  </svg>
)

export const SearchIcon: React.FC<IconProps> = ({
  size = 'md',
  color = 'gold',
  className = '',
}) => (
  <svg
    width={iconSizes[size]}
    height={iconSizes[size]}
    viewBox="0 0 24 24"
    className={className}
    style={{ color: iconColors[color] }}
  >
    <path
      d="M15.5 14H14.71L14.43 13.73C15.41 12.59 16 11.11 16 9.5C16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16C11.11 16 12.59 15.41 13.73 14.43L14 14.71V15.5L19 20.49L20.49 19L15.5 14ZM9.5 14C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14Z"
      fill="currentColor"
    />
  </svg>
)

// ============================================================================
// BUTTON COMPONENTS
// ============================================================================

interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  disabled?: boolean
  loading?: boolean
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
  onClick?: () => void
  className?: string
  style?: React.CSSProperties
}

export const EatRiteButton: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'left',
  onClick,
  className = '',
  style = {},
}) => {
  const baseStyles: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: EatRiteDesignTokens.spacing.sm,
    fontFamily: EatRiteDesignTokens.typography.fontFamilies.body,
    fontSize: EatRiteDesignTokens.typography.scale.button.size,
    fontWeight: EatRiteDesignTokens.typography.scale.button.weight,
    lineHeight: EatRiteDesignTokens.typography.scale.button.lineHeight,
    borderRadius: EatRiteDesignTokens.borderRadius['2xl'],
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: `all ${EatRiteDesignTokens.animations.duration.normal} ${EatRiteDesignTokens.animations.easing.luxury}`,
    border: 'none',
    opacity: disabled ? 0.5 : 1,
    ...EatRiteDesignTokens.components.button.padding[size],
  }

  const variantStyles: Record<string, React.CSSProperties> = {
    primary: {
      background: EatRiteDesignTokens.colors.gradients.primary,
      color: EatRiteDesignTokens.colors.text.inverse,
      boxShadow: EatRiteDesignTokens.shadows.luxury.md,
    },
    secondary: {
      backgroundColor: EatRiteDesignTokens.colors.surface.darkGreenLight,
      color: EatRiteDesignTokens.colors.primary.gold,
      border: `1px solid ${EatRiteDesignTokens.colors.primary.gold}`,
      boxShadow: EatRiteDesignTokens.shadows.depth.sm,
    },
    outline: {
      backgroundColor: 'transparent',
      color: EatRiteDesignTokens.colors.primary.gold,
      border: `1px solid ${EatRiteDesignTokens.colors.primary.gold}`,
    },
    ghost: {
      backgroundColor: 'transparent',
      color: EatRiteDesignTokens.colors.text.primary,
    },
  }

  const sizeStyles: Record<string, React.CSSProperties> = {
    sm: { height: EatRiteDesignTokens.components.button.height.sm },
    md: { height: EatRiteDesignTokens.components.button.height.md },
    lg: { height: EatRiteDesignTokens.components.button.height.lg },
    xl: { height: EatRiteDesignTokens.components.button.height.xl },
  }

  return (
    <button
      style={{
        ...baseStyles,
        ...variantStyles[variant],
        ...sizeStyles[size],
        ...style,
      }}
      onClick={onClick}
      disabled={disabled}
      className={className}
    >
      {loading ? (
        <div
          style={{
            width: '16px',
            height: '16px',
            border: `2px solid ${variant === 'primary' ? EatRiteDesignTokens.colors.text.inverse : EatRiteDesignTokens.colors.primary.gold}`,
            borderTopColor: 'transparent',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
          }}
        />
      ) : (
        <>
          {icon && iconPosition === 'left' && icon}
          {children}
          {icon && iconPosition === 'right' && icon}
        </>
      )}
    </button>
  )
}

// ============================================================================
// CARD COMPONENTS
// ============================================================================

interface CardProps {
  children: React.ReactNode
  variant?: 'default' | 'elevated' | 'outlined' | 'luxury'
  padding?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  onClick?: () => void
  hover?: boolean
  style?: React.CSSProperties
}

export const EatRiteCard: React.FC<CardProps> = ({
  children,
  variant = 'default',
  padding = 'md',
  className = '',
  onClick,
  hover = false,
  style = {},
}) => {
  const baseStyles: React.CSSProperties = {
    borderRadius: EatRiteDesignTokens.borderRadius['2xl'],
    transition: `all ${EatRiteDesignTokens.animations.duration.normal} ${EatRiteDesignTokens.animations.easing.luxury}`,
    cursor: onClick ? 'pointer' : 'default',
    padding: EatRiteDesignTokens.components.card.padding[padding],
  }

  const variantStyles: Record<string, React.CSSProperties> = {
    default: {
      backgroundColor: EatRiteDesignTokens.colors.surface.darkGreenLight,
      border: `1px solid rgba(212, 180, 106, 0.1)`,
    },
    elevated: {
      backgroundColor: EatRiteDesignTokens.colors.surface.darkGreenLight,
      boxShadow: EatRiteDesignTokens.shadows.luxury.lg,
    },
    outlined: {
      backgroundColor: 'transparent',
      border: `1px solid ${EatRiteDesignTokens.colors.primary.gold}`,
    },
    luxury: {
      background: EatRiteDesignTokens.colors.gradients.surface,
      border: `1px solid ${EatRiteDesignTokens.colors.primary.gold}`,
      boxShadow: EatRiteDesignTokens.shadows.luxury.lg,
    },
  }

  const hoverStyles: React.CSSProperties = hover
    ? {
        transform: 'translateY(-4px)',
        boxShadow: EatRiteDesignTokens.shadows.luxury.lg,
      }
    : {}

  return (
    <div
      style={{
        ...baseStyles,
        ...variantStyles[variant],
        ...style,
      }}
      className={className}
      onClick={onClick}
      onMouseEnter={e => {
        if (hover) {
          Object.assign(e.currentTarget.style, hoverStyles)
        }
      }}
      onMouseLeave={e => {
        if (hover) {
          e.currentTarget.style.transform = 'translateY(0)'
          e.currentTarget.style.boxShadow =
            variantStyles[variant].boxShadow || ''
        }
      }}
    >
      {children}
    </div>
  )
}

// ============================================================================
// INPUT COMPONENTS
// ============================================================================

interface InputProps {
  label?: string
  placeholder?: string
  type?: 'text' | 'email' | 'password' | 'number' | 'search'
  value?: string
  onChange?: (value: string) => void
  disabled?: boolean
  error?: string
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export const EatRiteInput: React.FC<InputProps> = ({
  label,
  placeholder,
  type = 'text',
  value,
  onChange,
  disabled = false,
  error,
  icon,
  iconPosition = 'left',
  size = 'md',
  className = '',
}) => {
  const [focused, setFocused] = React.useState(false)

  const containerStyles: React.CSSProperties = {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    gap: EatRiteDesignTokens.spacing.sm,
  }

  const inputStyles: React.CSSProperties = {
    width: '100%',
    height: EatRiteDesignTokens.components.input.height[size],
    padding: EatRiteDesignTokens.components.input.padding,
    paddingLeft: icon && iconPosition === 'left' ? '3rem' : undefined,
    paddingRight: icon && iconPosition === 'right' ? '3rem' : undefined,
    backgroundColor: EatRiteDesignTokens.colors.surface.softBlackLight,
    color: EatRiteDesignTokens.colors.text.primary,
    border: `${focused ? EatRiteDesignTokens.components.input.focusBorderWidth : EatRiteDesignTokens.components.input.borderWidth} solid ${
      error
        ? EatRiteDesignTokens.colors.semantic.error
        : focused
          ? EatRiteDesignTokens.colors.primary.gold
          : 'rgba(212, 180, 106, 0.2)'
    }`,
    borderRadius: EatRiteDesignTokens.borderRadius.lg,
    fontSize: EatRiteDesignTokens.typography.scale.body.size,
    fontFamily: EatRiteDesignTokens.typography.fontFamilies.body,
    transition: `all ${EatRiteDesignTokens.animations.duration.normal} ${EatRiteDesignTokens.animations.easing.easeOut}`,
    outline: 'none',
  }

  const labelStyles: React.CSSProperties = {
    color: EatRiteDesignTokens.colors.text.secondary,
    fontSize: EatRiteDesignTokens.typography.scale.label.size,
    fontWeight: EatRiteDesignTokens.typography.scale.label.weight,
    fontFamily: EatRiteDesignTokens.typography.fontFamilies.body,
  }

  const iconStyles: React.CSSProperties = {
    position: 'absolute',
    top: label ? '2.25rem' : '50%',
    transform: label ? 'translateY(0)' : 'translateY(-50%)',
    [iconPosition === 'left' ? 'left' : 'right']: '1rem',
    pointerEvents: 'none',
  }

  return (
    <div style={containerStyles} className={className}>
      {label && <label style={labelStyles}>{label}</label>}
      <div style={{ position: 'relative' }}>
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={e => onChange?.(e.target.value)}
          disabled={disabled}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={inputStyles}
        />
        {icon && <div style={iconStyles}>{icon}</div>}
      </div>
      {error && (
        <span
          style={{
            color: EatRiteDesignTokens.colors.semantic.error,
            fontSize: EatRiteDesignTokens.typography.scale.caption.size,
          }}
        >
          {error}
        </span>
      )}
    </div>
  )
}

// ============================================================================
// SECTION HEADER COMPONENT
// ============================================================================

interface SectionHeaderProps {
  title: string
  subtitle?: string
  icon?: React.ReactNode
  action?: React.ReactNode
  centered?: boolean
  className?: string
}

export const EatRiteSectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  icon,
  action,
  centered = false,
  className = '',
}) => {
  const containerStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: centered ? 'column' : 'row',
    alignItems: centered ? 'center' : 'flex-start',
    justifyContent: centered ? 'center' : 'space-between',
    gap: EatRiteDesignTokens.spacing.lg,
    marginBottom: EatRiteDesignTokens.spacing['3xl'],
    textAlign: centered ? 'center' : 'left',
  }

  const titleStyles: React.CSSProperties = {
    fontFamily: EatRiteDesignTokens.typography.fontFamilies.heading,
    fontSize: EatRiteDesignTokens.typography.scale.h2.size,
    fontWeight: EatRiteDesignTokens.typography.scale.h2.weight,
    lineHeight: EatRiteDesignTokens.typography.scale.h2.lineHeight,
    letterSpacing: EatRiteDesignTokens.typography.scale.h2.letterSpacing,
    background: EatRiteDesignTokens.colors.gradients.primary,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    marginBottom: subtitle ? EatRiteDesignTokens.spacing.sm : 0,
  }

  const subtitleStyles: React.CSSProperties = {
    color: EatRiteDesignTokens.colors.text.secondary,
    fontSize: EatRiteDesignTokens.typography.scale.bodyLarge.size,
    lineHeight: EatRiteDesignTokens.typography.scale.bodyLarge.lineHeight,
    maxWidth: centered ? '600px' : 'none',
  }

  return (
    <div style={containerStyles} className={className}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: EatRiteDesignTokens.spacing.md,
          flexDirection: centered ? 'column' : 'row',
        }}
      >
        {icon && <div style={{ flexShrink: 0 }}>{icon}</div>}
        <div>
          <h2 style={titleStyles}>{title}</h2>
          {subtitle && <p style={subtitleStyles}>{subtitle}</p>}
        </div>
      </div>
      {action && !centered && <div style={{ flexShrink: 0 }}>{action}</div>}
    </div>
  )
}

// ============================================================================
// NAVIGATION TAB COMPONENT
// ============================================================================

interface TabItem {
  id: string
  label: string
  icon?: React.ReactNode
  count?: number
}

interface TabsProps {
  items: TabItem[]
  activeTab: string
  onChange: (tabId: string) => void
  variant?: 'default' | 'pills' | 'underline'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export const EatRiteTabs: React.FC<TabsProps> = ({
  items,
  activeTab,
  onChange,
  variant = 'underline',
  size = 'md',
  className = '',
}) => {
  const containerStyles: React.CSSProperties = {
    display: 'flex',
    borderBottom:
      variant === 'underline' ? `1px solid rgba(212, 180, 106, 0.2)` : 'none',
    gap: variant === 'pills' ? EatRiteDesignTokens.spacing.sm : 0,
  }

  const getTabStyles = (isActive: boolean): React.CSSProperties => {
    const baseStyles: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      gap: EatRiteDesignTokens.spacing.sm,
      padding:
        variant === 'pills'
          ? `${EatRiteDesignTokens.spacing.md} ${EatRiteDesignTokens.spacing.xl}`
          : `${EatRiteDesignTokens.spacing.lg} ${EatRiteDesignTokens.spacing.xl}`,
      fontSize: EatRiteDesignTokens.typography.scale.body.size,
      fontWeight: isActive ? 600 : 500,
      fontFamily: EatRiteDesignTokens.typography.fontFamilies.body,
      color: isActive
        ? EatRiteDesignTokens.colors.primary.gold
        : EatRiteDesignTokens.colors.text.secondary,
      backgroundColor:
        variant === 'pills' && isActive
          ? EatRiteDesignTokens.colors.surface.darkGreenLight
          : 'transparent',
      borderRadius:
        variant === 'pills' ? EatRiteDesignTokens.borderRadius.lg : 0,
      borderBottom:
        variant === 'underline' && isActive
          ? `2px solid ${EatRiteDesignTokens.colors.primary.gold}`
          : variant === 'underline'
            ? '2px solid transparent'
            : 'none',
      cursor: 'pointer',
      transition: `all ${EatRiteDesignTokens.animations.duration.normal} ${EatRiteDesignTokens.animations.easing.easeOut}`,
    }

    return baseStyles
  }

  return (
    <div style={containerStyles} className={className}>
      {items.map(item => (
        <div
          key={item.id}
          style={getTabStyles(item.id === activeTab)}
          onClick={() => onChange(item.id)}
        >
          {item.icon}
          <span>{item.label}</span>
          {item.count !== undefined && (
            <span
              style={{
                backgroundColor: EatRiteDesignTokens.colors.primary.gold,
                color: EatRiteDesignTokens.colors.text.inverse,
                padding: `2px 6px`,
                borderRadius: EatRiteDesignTokens.borderRadius.full,
                fontSize: EatRiteDesignTokens.typography.scale.caption.size,
                fontWeight: 600,
                minWidth: '20px',
                textAlign: 'center',
              }}
            >
              {item.count}
            </span>
          )}
        </div>
      ))}
    </div>
  )
}

// Export all components
export * from '../../styles/design-system/eatrite-design-tokens'
