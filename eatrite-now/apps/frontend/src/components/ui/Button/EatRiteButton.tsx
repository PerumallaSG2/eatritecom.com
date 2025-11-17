/**
 * EatRite Button Component
 * Styled button component following the brand design system
 */

import React from 'react'
import './Button.css'

export interface EatRiteButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'dark' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  as?: 'button' | 'a'
  href?: string
}

export const EatRiteButton: React.FC<EatRiteButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  className = '',
  disabled,
  as = 'button',
  href,
  ...props
}) => {
  const getButtonClasses = () => {
    const baseClass = 'btn'
    const variantClass = `btn-${variant}`
    const sizeClasses = {
      sm: 'text-sm p-sm px-lg',
      md: 'text-base p-md px-xl',
      lg: 'text-lg p-lg px-2xl',
    }

    return `${baseClass} ${variantClass} ${sizeClasses[size]} ${className}`
  }

  const classes = getButtonClasses()

  const content = (
    <>
      {isLoading && <div className="animate-pulse-gold">Loading...</div>}
      {!isLoading && leftIcon && <span className="icon">{leftIcon}</span>}
      <span>{children}</span>
      {!isLoading && rightIcon && <span className="icon">{rightIcon}</span>}
    </>
  )

  if (as === 'a') {
    return (
      <a
        href={href}
        className={classes}
        {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {content}
      </a>
    )
  }

  return (
    <button className={classes} disabled={disabled || isLoading} {...props}>
      {content}
    </button>
  )
}

export default EatRiteButton
