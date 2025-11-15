/**
 * EatRite Input Component
 * Styled input component following the brand design system
 */

import React, { forwardRef } from 'react';
import './Input.css';

export interface EatRiteInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  variant?: 'default' | 'error' | 'success';
  size?: 'sm' | 'md' | 'lg';
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  label?: string;
  helperText?: string;
  errorText?: string;
  isRequired?: boolean;
}

export const EatRiteInput = forwardRef<HTMLInputElement, EatRiteInputProps>(({
  variant = 'default',
  size = 'md',
  leftIcon,
  rightIcon,
  label,
  helperText,
  errorText,
  isRequired = false,
  className = '',
  id,
  ...props
}, ref) => {
  const inputId = id || `input-${Math.random().toString(36).substring(2, 9)}`;
  const hasError = variant === 'error' || !!errorText;
  const finalVariant = hasError ? 'error' : variant;
  
  const baseClasses = `eatrite-input eatrite-input--${finalVariant} eatrite-input--${size}`;
  const wrapperClasses = `eatrite-input-wrapper ${leftIcon ? 'eatrite-input-wrapper--left-icon' : ''} ${rightIcon ? 'eatrite-input-wrapper--right-icon' : ''}`;
  const inputClasses = `${baseClasses} ${className}`.trim();
  
  return (
    <div className="eatrite-input-container">
      {label && (
        <label htmlFor={inputId} className="eatrite-input-label">
          {label}
          {isRequired && <span className="eatrite-input-required">*</span>}
        </label>
      )}
      
      <div className={wrapperClasses}>
        {leftIcon && (
          <div className="eatrite-input-icon eatrite-input-icon--left">
            {leftIcon}
          </div>
        )}
        
        <input
          ref={ref}
          id={inputId}
          className={inputClasses}
          {...props}
        />
        
        {rightIcon && (
          <div className="eatrite-input-icon eatrite-input-icon--right">
            {rightIcon}
          </div>
        )}
      </div>
      
      {(helperText || errorText) && (
        <div className={`eatrite-input-message ${hasError ? 'eatrite-input-message--error' : ''}`}>
          {errorText || helperText}
        </div>
      )}
    </div>
  );
});

EatRiteInput.displayName = 'EatRiteInput';

export default EatRiteInput;