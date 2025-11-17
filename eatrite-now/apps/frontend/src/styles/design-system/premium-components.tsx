/**
 * EatRite Premium Component Library
 * Luxury components matching the gold-on-dark-green brand aesthetic
 */

import React from 'react'
import { eatRiteBrandColors } from './brand-tokens'

// 🔘 PREMIUM BUTTON COMPONENTS
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  isLoading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

export const PremiumButton: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = `
    inline-flex items-center justify-center gap-2 
    font-semibold transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent
    disabled:opacity-50 disabled:cursor-not-allowed
  `

  const variantStyles = {
    primary: `
      bg-[${eatRiteBrandColors.button.primary.background}] 
      text-[${eatRiteBrandColors.button.primary.text}]
      border border-transparent
      hover:bg-[${eatRiteBrandColors.button.primary.hover}] 
      active:bg-[${eatRiteBrandColors.button.primary.active}]
      shadow-lg hover:shadow-xl
      focus:ring-[${eatRiteBrandColors.border.focus}]
    `,
    secondary: `
      bg-transparent 
      text-[${eatRiteBrandColors.button.secondary.text}]
      border border-[${eatRiteBrandColors.button.secondary.border}]
      hover:bg-[${eatRiteBrandColors.button.secondary.hover}]
      focus:ring-[${eatRiteBrandColors.border.focus}]
    `,
    tertiary: `
      bg-[${eatRiteBrandColors.button.tertiary.background}]
      text-[${eatRiteBrandColors.button.tertiary.text}]
      border border-transparent
      hover:bg-[${eatRiteBrandColors.button.tertiary.hover}]
      focus:ring-[${eatRiteBrandColors.border.secondary}]
    `,
  }

  const sizeStyles = {
    sm: `h-9 px-4 text-sm rounded-md`,
    md: `h-11 px-6 text-base rounded-lg`,
    lg: `h-13 px-8 text-lg rounded-lg`,
    xl: `h-15 px-10 text-xl rounded-xl`,
  }

  const combinedClassName = `
    ${baseStyles}
    ${variantStyles[variant]}
    ${sizeStyles[size]}
    ${className}
  `
    .replace(/\s+/g, ' ')
    .trim()

  return (
    <button
      className={combinedClassName}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : (
        <>
          {leftIcon && <span className="w-5 h-5">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="w-5 h-5">{rightIcon}</span>}
        </>
      )}
    </button>
  )
}

// 📄 PREMIUM CARD COMPONENT
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'outlined'
  padding?: 'sm' | 'md' | 'lg' | 'xl'
  goldAccent?: boolean
}

export const PremiumCard: React.FC<CardProps> = ({
  children,
  variant = 'default',
  padding = 'md',
  goldAccent = false,
  className = '',
  ...props
}) => {
  const baseStyles = `
    rounded-xl transition-all duration-300
    border
  `

  const variantStyles = {
    default: `
      bg-[${eatRiteBrandColors.surface.secondary}]
      border-[${eatRiteBrandColors.border.secondary}]
      shadow-lg hover:shadow-xl
    `,
    elevated: `
      bg-[${eatRiteBrandColors.surface.tertiary}]
      border-[${eatRiteBrandColors.border.tertiary}]
      shadow-xl hover:shadow-2xl
    `,
    outlined: `
      bg-[${eatRiteBrandColors.surface.primary}]
      border-[${eatRiteBrandColors.border.primary}]
      shadow-md hover:shadow-lg
    `,
  }

  const paddingStyles = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-10',
  }

  const accentStyles = goldAccent
    ? `
    relative
    before:absolute before:top-0 before:left-0 before:w-1 before:h-full 
    before:bg-gradient-to-b before:from-[${eatRiteBrandColors.primary.gold}] 
    before:to-transparent before:rounded-l-xl
  `
    : ''

  const combinedClassName = `
    ${baseStyles}
    ${variantStyles[variant]}
    ${paddingStyles[padding]}
    ${accentStyles}
    ${className}
  `
    .replace(/\s+/g, ' ')
    .trim()

  return (
    <div className={combinedClassName} {...props}>
      {children}
    </div>
  )
}

// 📝 PREMIUM INPUT COMPONENT
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helper?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

export const PremiumInput: React.FC<InputProps> = ({
  label,
  error,
  helper,
  leftIcon,
  rightIcon,
  className = '',
  ...props
}) => {
  const inputStyles = `
    w-full h-11 px-4 rounded-md
    bg-[${eatRiteBrandColors.input.background}]
    text-[${eatRiteBrandColors.input.text}]
    border transition-colors duration-200
    placeholder:text-[${eatRiteBrandColors.input.placeholder}]
    focus:outline-none focus:ring-2 focus:ring-offset-2 
    focus:ring-offset-transparent
    disabled:opacity-50 disabled:cursor-not-allowed
  `

  const borderStyle = error
    ? `border-[${eatRiteBrandColors.input.borderError}] focus:border-[${eatRiteBrandColors.input.borderError}] focus:ring-red-500`
    : `border-[${eatRiteBrandColors.input.border}] focus:border-[${eatRiteBrandColors.input.borderFocus}] focus:ring-[${eatRiteBrandColors.border.focus}]`

  return (
    <div className="space-y-2">
      {label && (
        <label
          className={`
          block text-sm font-medium 
          text-[${eatRiteBrandColors.text.primary}]
          font-serif
        `}
        >
          {label}
        </label>
      )}

      <div className="relative">
        {leftIcon && (
          <div
            className={`
            absolute left-3 top-1/2 transform -translate-y-1/2 
            w-5 h-5 text-[${eatRiteBrandColors.input.placeholder}]
          `}
          >
            {leftIcon}
          </div>
        )}

        <input
          className={`
            ${inputStyles}
            ${borderStyle}
            ${leftIcon ? 'pl-11' : ''}
            ${rightIcon ? 'pr-11' : ''}
            ${className}
          `
            .replace(/\s+/g, ' ')
            .trim()}
          {...props}
        />

        {rightIcon && (
          <div
            className={`
            absolute right-3 top-1/2 transform -translate-y-1/2 
            w-5 h-5 text-[${eatRiteBrandColors.input.placeholder}]
          `}
          >
            {rightIcon}
          </div>
        )}
      </div>

      {(error || helper) && (
        <p
          className={`
          text-sm
          ${
            error
              ? `text-[${eatRiteBrandColors.status.error}]`
              : `text-[${eatRiteBrandColors.text.secondary}]`
          }
        `}
        >
          {error || helper}
        </p>
      )}
    </div>
  )
}

// 🏷️ PREMIUM BADGE COMPONENT
export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error'
  size?: 'sm' | 'md' | 'lg'
}

export const PremiumBadge: React.FC<BadgeProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}) => {
  const baseStyles = `
    inline-flex items-center justify-center font-medium rounded-full
    border transition-colors duration-200
  `

  const variantStyles = {
    primary: `
      bg-[${eatRiteBrandColors.primary.gold}] 
      text-[${eatRiteBrandColors.text.inverse}]
      border-transparent
    `,
    secondary: `
      bg-[${eatRiteBrandColors.surface.secondary}]
      text-[${eatRiteBrandColors.text.primary}]
      border-[${eatRiteBrandColors.border.secondary}]
    `,
    success: `
      bg-[${eatRiteBrandColors.status.success}]
      text-[${eatRiteBrandColors.text.primary}]
      border-transparent
    `,
    warning: `
      bg-[${eatRiteBrandColors.status.warning}]
      text-[${eatRiteBrandColors.text.inverse}]
      border-transparent
    `,
    error: `
      bg-[${eatRiteBrandColors.status.error}]
      text-[${eatRiteBrandColors.text.primary}]
      border-transparent
    `,
  }

  const sizeStyles = {
    sm: 'px-2 py-1 text-xs h-5',
    md: 'px-3 py-1 text-sm h-6',
    lg: 'px-4 py-2 text-base h-8',
  }

  const combinedClassName = `
    ${baseStyles}
    ${variantStyles[variant]}
    ${sizeStyles[size]}
    ${className}
  `
    .replace(/\s+/g, ' ')
    .trim()

  return (
    <span className={combinedClassName} {...props}>
      {children}
    </span>
  )
}

// Export all premium components
export const EatRitePremiumComponents = {
  PremiumButton,
  PremiumCard,
  PremiumInput,
  PremiumBadge,
}
