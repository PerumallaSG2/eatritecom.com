import React from 'react'
import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'

// Core Button Component
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'gold'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  isLoading?: boolean
  leftIcon?: LucideIcon
  rightIcon?: LucideIcon
  children: React.ReactNode
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  children,
  className = '',
  disabled,
  ...props
}) => {
  const baseClasses = `
    inline-flex items-center justify-center gap-2 font-medium
    transition-all duration-300 ease-premium focus:outline-none focus:ring-2 
    focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed
    active:scale-95 select-none
  `

  const variantClasses = {
    primary: `
      bg-gradient-to-r from-primary-500 to-primary-600 
      hover:from-primary-600 hover:to-primary-700 
      text-white shadow-md hover:shadow-lg
      focus:ring-primary-500
    `,
    secondary: `
      bg-gray-100 hover:bg-gray-200 text-gray-900
      focus:ring-gray-500
    `,
    outline: `
      border-2 border-gray-200 hover:border-primary-300 
      text-gray-700 hover:text-primary-600 hover:bg-primary-50
      focus:ring-primary-500
    `,
    ghost: `
      text-gray-600 hover:text-primary-600 hover:bg-primary-50
      focus:ring-primary-500
    `,
    gold: `
      bg-gradient-to-r from-gold-400 to-gold-500 
      hover:from-gold-500 hover:to-gold-600 
      text-gray-900 shadow-md hover:shadow-lg
      focus:ring-gold-500
    `,
  }

  const sizeClasses = {
    sm: 'h-8 px-3 text-sm rounded-md',
    md: 'h-11 px-6 text-base rounded-xl',
    lg: 'h-12 px-8 text-lg rounded-xl',
    xl: 'h-14 px-10 text-xl rounded-2xl',
  }

  return (
    <button
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        hover:scale-[1.02] active:scale-[0.98]
        ${className}
      `}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : (
        <>
          {LeftIcon && <LeftIcon className="w-4 h-4" />}
          {children}
          {RightIcon && <RightIcon className="w-4 h-4" />}
        </>
      )}
    </button>
  )
}

// Premium Card Component
interface CardProps {
  children: React.ReactNode
  variant?: 'default' | 'premium' | 'subtle' | 'bordered'
  padding?: 'sm' | 'md' | 'lg' | 'xl'
  hover?: boolean
  className?: string
  onClick?: () => void
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  padding = 'md',
  hover = false,
  className = '',
  onClick,
}) => {
  const baseClasses = `
    bg-white rounded-2xl border border-gray-100 
    transition-all duration-300 ease-premium
  `

  const variantClasses = {
    default: 'shadow-card',
    premium: 'shadow-premium border-gold-100',
    subtle: 'shadow-xs',
    bordered: 'border-gray-200 shadow-none',
  }

  const paddingClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-10',
  }

  const hoverClasses = hover ? 'hover:shadow-lg hover:-translate-y-1' : ''

  const Component = onClick ? 'button' : 'div'

  return (
    <Component
      onClick={onClick}
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${paddingClasses[padding]}
        ${hoverClasses}
        ${onClick ? 'cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2' : ''}
        ${className}
      `}
    >
      {children}
    </Component>
  )
}

// Input Component
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helper?: string
  leftIcon?: LucideIcon
  rightIcon?: LucideIcon
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helper,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  className = '',
  ...props
}) => {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className="relative">
        {LeftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <LeftIcon className="w-5 h-5" />
          </div>
        )}
        <input
          className={`
            w-full h-11 px-4 py-3 bg-white border border-gray-200 rounded-xl
            text-gray-900 placeholder-gray-500
            transition-all duration-200 ease-premium
            focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
            disabled:opacity-50 disabled:cursor-not-allowed
            ${LeftIcon ? 'pl-11' : ''}
            ${RightIcon ? 'pr-11' : ''}
            ${error ? 'border-red-300 focus:ring-red-500' : ''}
            ${className}
          `}
          {...props}
        />
        {RightIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
            <RightIcon className="w-5 h-5" />
          </div>
        )}
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {helper && !error && <p className="text-sm text-gray-500">{helper}</p>}
    </div>
  )
}

// Badge Component
interface BadgeProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'gold' | 'success' | 'warning' | 'error'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
}) => {
  const baseClasses = 'inline-flex items-center font-medium rounded-full'

  const variantClasses = {
    primary: 'bg-primary-100 text-primary-700',
    secondary: 'bg-gray-100 text-gray-700',
    gold: 'bg-gold-100 text-gold-700',
    success: 'bg-green-100 text-green-700',
    warning: 'bg-yellow-100 text-yellow-700',
    error: 'bg-red-100 text-red-700',
  }

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base',
  }

  return (
    <span
      className={`
      ${baseClasses}
      ${variantClasses[variant]}
      ${sizeClasses[size]}
      ${className}
    `}
    >
      {children}
    </span>
  )
}

// Progress Bar Component
interface ProgressBarProps {
  value: number
  max?: number
  label?: string
  showValue?: boolean
  variant?: 'primary' | 'gold' | 'success'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  label,
  showValue = true,
  variant = 'primary',
  size = 'md',
  className = '',
}) => {
  const percentage = Math.min((value / max) * 100, 100)

  const variantClasses = {
    primary: 'bg-primary-500',
    gold: 'bg-gradient-to-r from-gold-400 to-gold-500',
    success: 'bg-green-500',
  }

  const sizeClasses = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4',
  }

  return (
    <div className={`space-y-2 ${className}`}>
      {(label || showValue) && (
        <div className="flex justify-between items-center text-sm">
          {label && <span className="text-gray-700">{label}</span>}
          {showValue && (
            <span className="text-gray-500 font-medium">
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      )}
      <div
        className={`w-full bg-gray-200 rounded-full overflow-hidden ${sizeClasses[size]}`}
      >
        <motion.div
          className={`h-full ${variantClasses[variant]} rounded-full`}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}

// Avatar Component
interface AvatarProps {
  src?: string
  alt?: string
  name?: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  name,
  size = 'md',
  className = '',
}) => {
  const sizeClasses = {
    xs: 'w-6 h-6 text-xs',
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg',
    xl: 'w-16 h-16 text-xl',
  }

  const initials = name
    ? name
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
    : ''

  return (
    <div
      className={`
      ${sizeClasses[size]}
      rounded-full bg-gradient-to-br from-primary-400 to-primary-600
      flex items-center justify-center text-white font-semibold
      ring-2 ring-white shadow-md
      ${className}
    `}
    >
      {src ? (
        <img
          src={src}
          alt={alt || name || ''}
          className="w-full h-full rounded-full object-cover"
        />
      ) : (
        <span>{initials}</span>
      )}
    </div>
  )
}

// Container Component
interface ContainerProps {
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  padding?: boolean
  className?: string
}

export const Container: React.FC<ContainerProps> = ({
  children,
  size = 'lg',
  padding = true,
  className = '',
}) => {
  const sizeClasses = {
    sm: 'max-w-2xl',
    md: 'max-w-4xl',
    lg: 'max-w-6xl',
    xl: 'max-w-7xl',
    full: 'max-w-full',
  }

  const paddingClasses = padding ? 'px-4 sm:px-6 lg:px-8' : ''

  return (
    <div
      className={`
      ${sizeClasses[size]}
      mx-auto
      ${paddingClasses}
      ${className}
    `}
    >
      {children}
    </div>
  )
}
