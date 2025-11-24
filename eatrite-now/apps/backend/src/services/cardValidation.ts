/**
 * Card Validation Service
 * Comprehensive credit card validation and detection
 */

export interface CardValidationResult {
  isValid: boolean
  cardType: string
  errors: string[]
}

export interface CreditCardData {
  number: string
  expiryMonth: string
  expiryYear: string
  cvv: string
  name?: string
}

// ============================================================================
// CARD TYPE DETECTION
// ============================================================================

const CARD_PATTERNS = {
  visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
  mastercard: /^5[1-5][0-9]{14}$|^2(?:2(?:2[1-9]|[3-9][0-9])|[3-6][0-9][0-9]|7(?:[01][0-9]|20))[0-9]{12}$/,
  amex: /^3[47][0-9]{13}$/,
  discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
  diners: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
  jcb: /^(?:2131|1800|35\d{3})\d{11}$/,
  unionpay: /^(62[0-9]{14,17})$/,
}

const CARD_NAMES = {
  visa: 'Visa',
  mastercard: 'Mastercard',
  amex: 'American Express',
  discover: 'Discover',
  diners: 'Diners Club',
  jcb: 'JCB',
  unionpay: 'UnionPay',
}

// ============================================================================
// VALIDATION FUNCTIONS
// ============================================================================

/**
 * Validate credit card number using Luhn algorithm
 */
export function validateCardNumber(cardNumber: string): boolean {
  // Remove spaces and non-digits
  const cleanNumber = cardNumber.replace(/\D/g, '')
  
  // Check length (13-19 digits for most cards)
  if (cleanNumber.length < 13 || cleanNumber.length > 19) {
    return false
  }
  
  // Luhn algorithm
  let sum = 0
  let shouldDouble = false
  
  // Process digits from right to left
  for (let i = cleanNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(cleanNumber.charAt(i), 10)
    
    if (shouldDouble) {
      digit *= 2
      if (digit > 9) {
        digit -= 9
      }
    }
    
    sum += digit
    shouldDouble = !shouldDouble
  }
  
  return sum % 10 === 0
}

/**
 * Detect card type based on number pattern
 */
export function detectCardType(cardNumber: string): string {
  const cleanNumber = cardNumber.replace(/\D/g, '')
  
  for (const [type, pattern] of Object.entries(CARD_PATTERNS)) {
    if (pattern.test(cleanNumber)) {
      return CARD_NAMES[type as keyof typeof CARD_NAMES] || type
    }
  }
  
  return 'Unknown'
}

/**
 * Validate expiry date
 */
export function validateExpiryDate(month: string, year: string): boolean {
  const currentDate = new Date()
  const currentMonth = currentDate.getMonth() + 1 // getMonth() returns 0-11
  const currentYear = currentDate.getFullYear()
  
  const expMonth = parseInt(month, 10)
  const expYear = parseInt(year, 10)
  
  // Validate month range
  if (expMonth < 1 || expMonth > 12) {
    return false
  }
  
  // Handle 2-digit year format
  let fullYear = expYear
  if (expYear < 100) {
    fullYear = expYear < 50 ? 2000 + expYear : 1900 + expYear
  }
  
  // Check if card is expired
  if (fullYear < currentYear) {
    return false
  }
  
  if (fullYear === currentYear && expMonth < currentMonth) {
    return false
  }
  
  // Check if expiry date is too far in the future (10 years)
  if (fullYear > currentYear + 10) {
    return false
  }
  
  return true
}

/**
 * Validate CVV based on card type
 */
export function validateCVV(cvv: string, cardType: string): boolean {
  const cleanCvv = cvv.replace(/\D/g, '')
  
  // American Express uses 4 digits, others use 3
  if (cardType.toLowerCase().includes('american express') || cardType.toLowerCase().includes('amex')) {
    return cleanCvv.length === 4
  }
  
  return cleanCvv.length === 3
}

/**
 * Validate cardholder name
 */
export function validateCardholderName(name: string): boolean {
  if (!name || name.trim().length < 2) {
    return false
  }
  
  // Allow letters, spaces, hyphens, apostrophes
  const namePattern = /^[a-zA-Z\s\-'\.]+$/
  return namePattern.test(name.trim())
}

/**
 * Comprehensive card validation
 */
export function validateCreditCard(cardData: CreditCardData): CardValidationResult {
  const errors: string[] = []
  let cardType = 'Unknown'
  
  // Clean and validate card number
  const cleanCardNumber = cardData.number.replace(/\D/g, '')
  
  if (!cleanCardNumber) {
    errors.push('Card number is required')
  } else if (!validateCardNumber(cleanCardNumber)) {
    errors.push('Invalid card number')
  } else {
    cardType = detectCardType(cleanCardNumber)
    if (cardType === 'Unknown') {
      errors.push('Unsupported card type')
    }
  }
  
  // Validate expiry date
  if (!cardData.expiryMonth || !cardData.expiryYear) {
    errors.push('Expiry date is required')
  } else if (!validateExpiryDate(cardData.expiryMonth, cardData.expiryYear)) {
    errors.push('Invalid or expired date')
  }
  
  // Validate CVV
  if (!cardData.cvv) {
    errors.push('CVV is required')
  } else if (!validateCVV(cardData.cvv, cardType)) {
    const expectedLength = cardType.toLowerCase().includes('amex') ? 4 : 3
    errors.push(`CVV must be ${expectedLength} digits for ${cardType}`)
  }
  
  // Validate cardholder name
  if (cardData.name && !validateCardholderName(cardData.name)) {
    errors.push('Invalid cardholder name')
  }
  
  return {
    isValid: errors.length === 0,
    cardType,
    errors,
  }
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Format card number with spaces for display
 */
export function formatCardNumber(cardNumber: string): string {
  const cleanNumber = cardNumber.replace(/\D/g, '')
  const cardType = detectCardType(cleanNumber)
  
  // American Express: XXXX XXXXXX XXXXX
  if (cardType.toLowerCase().includes('amex')) {
    return cleanNumber.replace(/(\d{4})(\d{6})(\d{5})/, '$1 $2 $3')
  }
  
  // Others: XXXX XXXX XXXX XXXX
  return cleanNumber.replace(/(\d{4})/g, '$1 ').trim()
}

/**
 * Mask card number for display (show only last 4 digits)
 */
export function maskCardNumber(cardNumber: string): string {
  const cleanNumber = cardNumber.replace(/\D/g, '')
  if (cleanNumber.length < 4) return cleanNumber
  
  const lastFour = cleanNumber.slice(-4)
  const maskedPart = '*'.repeat(cleanNumber.length - 4)
  
  return formatCardNumber(maskedPart + lastFour)
}

/**
 * Get card type icon/emoji
 */
export function getCardTypeIcon(cardType: string): string {
  const icons = {
    visa: '💳',
    mastercard: '💳',
    'american express': '💎',
    discover: '🔍',
    'diners club': '🍽️',
    jcb: '🏯',
    unionpay: '🇨🇳',
  }
  
  return icons[cardType.toLowerCase() as keyof typeof icons] || '💳'
}

/**
 * Check if card is test card (for development)
 */
export function isTestCard(cardNumber: string): boolean {
  const testCards = [
    '4242424242424242', // Visa
    '4000056655665556', // Visa (debit)
    '5555555555554444', // Mastercard
    '2223003122003222', // Mastercard (2-series)
    '5200828282828210', // Mastercard (debit)
    '5105105105105100', // Mastercard (prepaid)
    '378282246310005',  // American Express
    '371449635398431',  // American Express
    '6011111111111117', // Discover
    '6011000990139424', // Discover
    '30569309025904',   // Diners Club
    '38520000023237',   // Diners Club
  ]
  
  const cleanNumber = cardNumber.replace(/\D/g, '')
  return testCards.includes(cleanNumber)
}

export default {
  validateCreditCard,
  validateCardNumber,
  detectCardType,
  validateExpiryDate,
  validateCVV,
  validateCardholderName,
  formatCardNumber,
  maskCardNumber,
  getCardTypeIcon,
  isTestCard,
}