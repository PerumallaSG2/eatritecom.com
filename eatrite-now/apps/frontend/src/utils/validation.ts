// Validation utility functions

export interface ValidationResult {
  isValid: boolean
  error?: string
}

export interface ValidationRule<T> {
  required?: boolean
  min?: number
  max?: number
  minLength?: number
  maxLength?: number
  pattern?: RegExp
  custom?: (value: T) => boolean | string
  message?: string
}

// Generic validation function
export const validate = <T>(
  value: T,
  rules: ValidationRule<T>
): ValidationResult => {
  // Check required
  if (rules.required && (value === null || value === undefined || value === '')) {
    return { isValid: false, error: rules.message || 'This field is required' }
  }

  // Skip other validations if value is empty and not required
  if (!rules.required && (value === null || value === undefined || value === '')) {
    return { isValid: true }
  }

  // Check string length
  if (typeof value === 'string') {
    if (rules.minLength && value.length < rules.minLength) {
      return {
        isValid: false,
        error: rules.message || `Must be at least ${rules.minLength} characters`,
      }
    }
    if (rules.maxLength && value.length > rules.maxLength) {
      return {
        isValid: false,
        error: rules.message || `Must be no more than ${rules.maxLength} characters`,
      }
    }
  }

  // Check numeric range
  if (typeof value === 'number') {
    if (rules.min !== undefined && value < rules.min) {
      return {
        isValid: false,
        error: rules.message || `Must be at least ${rules.min}`,
      }
    }
    if (rules.max !== undefined && value > rules.max) {
      return {
        isValid: false,
        error: rules.message || `Must be no more than ${rules.max}`,
      }
    }
  }

  // Check pattern
  if (rules.pattern && typeof value === 'string') {
    if (!rules.pattern.test(value)) {
      return {
        isValid: false,
        error: rules.message || 'Invalid format',
      }
    }
  }

  // Check custom validation
  if (rules.custom) {
    const result = rules.custom(value)
    if (typeof result === 'string') {
      return { isValid: false, error: result }
    }
    if (!result) {
      return { isValid: false, error: rules.message || 'Invalid value' }
    }
  }

  return { isValid: true }
}

// Specific validation functions
export const validateEmail = (email: string): ValidationResult => {
  return validate(email, {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: 'Please enter a valid email address',
  })
}

export const validatePassword = (password: string): ValidationResult => {
  return validate(password, {
    required: true,
    minLength: 8,
    custom: (value: string) => {
      const hasUppercase = /[A-Z]/.test(value)
      const hasLowercase = /[a-z]/.test(value)
      const hasNumbers = /\d/.test(value)
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value)

      if (!hasUppercase) return 'Password must contain at least one uppercase letter'
      if (!hasLowercase) return 'Password must contain at least one lowercase letter'
      if (!hasNumbers) return 'Password must contain at least one number'
      if (!hasSpecialChar) return 'Password must contain at least one special character'

      return true
    },
  })
}

export const validatePhone = (phone: string): ValidationResult => {
  return validate(phone, {
    required: true,
    pattern: /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
    message: 'Please enter a valid phone number (e.g., (555) 123-4567)',
  })
}

export const validateName = (name: string): ValidationResult => {
  return validate(name, {
    required: true,
    minLength: 2,
    maxLength: 50,
    pattern: /^[a-zA-Z\s'-]+$/,
    message: 'Name can only contain letters, spaces, hyphens, and apostrophes',
  })
}

export const validateZipCode = (zipCode: string): ValidationResult => {
  return validate(zipCode, {
    required: true,
    pattern: /^\d{5}(-\d{4})?$/,
    message: 'Please enter a valid ZIP code (e.g., 12345 or 12345-6789)',
  })
}

export const validateAge = (age: number): ValidationResult => {
  return validate(age, {
    required: true,
    min: 13,
    max: 120,
    message: 'Age must be between 13 and 120',
  })
}

export const validateWeight = (weight: number, unit: 'kg' | 'lbs'): ValidationResult => {
  const min = unit === 'kg' ? 30 : 66
  const max = unit === 'kg' ? 300 : 661

  return validate(weight, {
    required: true,
    min,
    max,
    message: `Weight must be between ${min} and ${max} ${unit}`,
  })
}

export const validateHeight = (height: number, unit: 'cm' | 'ft'): ValidationResult => {
  const min = unit === 'cm' ? 120 : 4
  const max = unit === 'cm' ? 250 : 8

  return validate(height, {
    required: true,
    min,
    max,
    message: `Height must be between ${min} and ${max} ${unit}`,
  })
}

export const validateCreditCard = (cardNumber: string): ValidationResult => {
  // Remove spaces and hyphens
  const cleaned = cardNumber.replace(/[\s-]/g, '')

  // Check if it's all numbers
  if (!/^\d+$/.test(cleaned)) {
    return { isValid: false, error: 'Card number can only contain digits' }
  }

  // Check length (most cards are 13-19 digits)
  if (cleaned.length < 13 || cleaned.length > 19) {
    return { isValid: false, error: 'Invalid card number length' }
  }

  // Luhn algorithm
  let sum = 0
  let alternate = false

  for (let i = cleaned.length - 1; i >= 0; i--) {
    let digit = parseInt(cleaned.charAt(i), 10)

    if (alternate) {
      digit *= 2
      if (digit > 9) {
        digit = (digit % 10) + 1
      }
    }

    sum += digit
    alternate = !alternate
  }

  if (sum % 10 !== 0) {
    return { isValid: false, error: 'Invalid card number' }
  }

  return { isValid: true }
}

export const validateExpiryDate = (expiry: string): ValidationResult => {
  // Expected format: MM/YY or MM/YYYY
  const pattern = /^(0[1-9]|1[0-2])\/(\d{2}|\d{4})$/
  
  if (!pattern.test(expiry)) {
    return { isValid: false, error: 'Please enter expiry date as MM/YY' }
  }

  const [month, year] = expiry.split('/')
  const currentDate = new Date()
  const currentYear = currentDate.getFullYear()
  const currentMonth = currentDate.getMonth() + 1

  let fullYear = parseInt(year)
  if (fullYear < 100) {
    fullYear += fullYear < 30 ? 2000 : 1900
  }

  if (fullYear < currentYear || (fullYear === currentYear && parseInt(month) < currentMonth)) {
    return { isValid: false, error: 'Card has expired' }
  }

  return { isValid: true }
}

export const validateCVV = (cvv: string): ValidationResult => {
  return validate(cvv, {
    required: true,
    pattern: /^\d{3,4}$/,
    message: 'CVV must be 3 or 4 digits',
  })
}

// Form validation
export interface FormValidationRules {
  [key: string]: ValidationRule<any>
}

export interface FormValidationResult {
  isValid: boolean
  errors: { [key: string]: string }
}

export const validateForm = (
  formData: Record<string, any>,
  rules: FormValidationRules
): FormValidationResult => {
  const errors: { [key: string]: string } = {}

  Object.keys(rules).forEach(field => {
    const result = validate(formData[field], rules[field])
    if (!result.isValid && result.error) {
      errors[field] = result.error
    }
  })

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  }
}

// Common form validation rules
export const commonRules = {
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: 'Please enter a valid email address',
  },
  password: {
    required: true,
    minLength: 8,
    message: 'Password must be at least 8 characters',
  },
  confirmPassword: (password: string) => ({
    required: true,
    custom: (value: string) => value === password || 'Passwords do not match',
  }),
  firstName: {
    required: true,
    minLength: 2,
    maxLength: 50,
    pattern: /^[a-zA-Z\s'-]+$/,
    message: 'Please enter a valid first name',
  },
  lastName: {
    required: true,
    minLength: 2,
    maxLength: 50,
    pattern: /^[a-zA-Z\s'-]+$/,
    message: 'Please enter a valid last name',
  },
  phone: {
    required: true,
    pattern: /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
    message: 'Please enter a valid phone number',
  },
  zipCode: {
    required: true,
    pattern: /^\d{5}(-\d{4})?$/,
    message: 'Please enter a valid ZIP code',
  },
}

// Real-time validation helper
export class FormValidator {
  private rules: FormValidationRules
  private errors: { [key: string]: string } = {}

  constructor(rules: FormValidationRules) {
    this.rules = rules
  }

  validateField(field: string, value: any): string | null {
    if (!this.rules[field]) return null

    const result = validate(value, this.rules[field])
    if (!result.isValid && result.error) {
      this.errors[field] = result.error
      return result.error
    } else {
      delete this.errors[field]
      return null
    }
  }

  validateAll(formData: Record<string, any>): FormValidationResult {
    const result = validateForm(formData, this.rules)
    this.errors = result.errors
    return result
  }

  getErrors(): { [key: string]: string } {
    return { ...this.errors }
  }

  hasErrors(): boolean {
    return Object.keys(this.errors).length > 0
  }

  clearErrors(): void {
    this.errors = {}
  }
}