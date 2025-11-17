/**
 * EatRite Card Component
 * Styled card component following the brand design system
 */

import React from 'react'
import './Card.css'

export interface EatRiteCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'premium' | 'interactive' | 'flat'
  padding?: 'sm' | 'md' | 'lg' | 'xl'
  as?: 'div' | 'article' | 'section'
  header?: React.ReactNode
  footer?: React.ReactNode
}

export const EatRiteCard: React.FC<EatRiteCardProps> = ({
  children,
  variant = 'default',
  padding = 'md',
  className = '',
  as: Component = 'div',
  header,
  footer,
  ...props
}) => {
  const baseClasses = `eatrite-card eatrite-card--${variant} eatrite-card--${padding}`
  const classes = `${baseClasses} ${className}`.trim()

  return (
    <Component className={classes} {...props}>
      {header && <div className="eatrite-card__header">{header}</div>}
      <div className="eatrite-card__content">{children}</div>
      {footer && <div className="eatrite-card__footer">{footer}</div>}
    </Component>
  )
}

export default EatRiteCard
