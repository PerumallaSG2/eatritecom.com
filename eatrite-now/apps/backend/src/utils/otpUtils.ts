/**
 * OTP (One-Time Password) Utilities
 * Secure generation and verification of OTP codes for email and SMS verification
 */

import crypto from 'crypto'
import bcrypt from 'bcryptjs'

// ============================================================================
// TYPES
// ============================================================================

export interface OTPData {
  code: string
  hashedCode: string
  expiresAt: Date
  attempts: number
}

export interface VerificationResult {
  success: boolean
  message: string
  remainingAttempts?: number
}

// ============================================================================
// CONFIGURATION
// ============================================================================

const OTP_CONFIG = {
  // OTP code length (6 digits for better UX)
  CODE_LENGTH: 6,
  
  // Expiration time in minutes
  EXPIRATION_MINUTES: 10,
  
  // Maximum verification attempts before blocking
  MAX_ATTEMPTS: 5,
  
  // Salt rounds for hashing
  SALT_ROUNDS: 12,
  
  // Rate limiting - max OTP requests per user per hour
  MAX_REQUESTS_PER_HOUR: 5,
}

// ============================================================================
// OTP GENERATION
// ============================================================================

/**
 * Generate a secure OTP code
 */
export function generateOTP(): string {
  // Use crypto.randomBytes for cryptographically secure random numbers
  const buffer = crypto.randomBytes(4)
  const randomNumber = buffer.readUInt32BE(0)
  
  // Generate 6-digit code, pad with zeros if necessary
  const code = (randomNumber % Math.pow(10, OTP_CONFIG.CODE_LENGTH))
    .toString()
    .padStart(OTP_CONFIG.CODE_LENGTH, '0')
  
  return code
}

/**
 * Hash OTP code for secure storage
 */
export async function hashOTP(code: string): Promise<string> {
  return await bcrypt.hash(code, OTP_CONFIG.SALT_ROUNDS)
}

/**
 * Create complete OTP data object
 */
export async function createOTPData(): Promise<OTPData> {
  const code = generateOTP()
  const hashedCode = await hashOTP(code)
  const expiresAt = new Date(Date.now() + OTP_CONFIG.EXPIRATION_MINUTES * 60 * 1000)
  
  return {
    code,
    hashedCode,
    expiresAt,
    attempts: 0
  }
}

// ============================================================================
// OTP VERIFICATION
// ============================================================================

/**
 * Verify OTP code against stored hash
 */
export async function verifyOTP(
  inputCode: string,
  storedHash: string,
  expiresAt: Date,
  attempts: number
): Promise<VerificationResult> {
  // Check if OTP has expired
  if (new Date() > expiresAt) {
    return {
      success: false,
      message: 'OTP code has expired. Please request a new one.',
    }
  }
  
  // Check if maximum attempts exceeded
  if (attempts >= OTP_CONFIG.MAX_ATTEMPTS) {
    return {
      success: false,
      message: 'Too many incorrect attempts. Please request a new OTP.',
    }
  }
  
  // Verify the code
  const isValid = await bcrypt.compare(inputCode, storedHash)
  
  if (isValid) {
    return {
      success: true,
      message: 'OTP verified successfully.',
    }
  } else {
    const remainingAttempts = OTP_CONFIG.MAX_ATTEMPTS - attempts - 1
    return {
      success: false,
      message: remainingAttempts > 0 
        ? `Invalid OTP code. ${remainingAttempts} attempts remaining.`
        : 'Invalid OTP code. Maximum attempts exceeded.',
      remainingAttempts: Math.max(0, remainingAttempts),
    }
  }
}

// ============================================================================
// VALIDATION HELPERS
// ============================================================================

/**
 * Validate OTP code format
 */
export function isValidOTPFormat(code: string): boolean {
  const otpRegex = new RegExp(`^\\d{${OTP_CONFIG.CODE_LENGTH}}$`)
  return otpRegex.test(code)
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Validate phone number format (international format)
 */
export function isValidPhoneNumber(phone: string): boolean {
  // Accept international format: +1234567890 or local format: 1234567890
  const phoneRegex = /^(\+?1-?)?(\([0-9]{3}\)|[0-9]{3})[-.]?[0-9]{3}[-.]?[0-9]{4}$/
  const internationalRegex = /^\+?[1-9]\d{1,14}$/
  
  // Remove all non-digit characters for length check
  const digitsOnly = phone.replace(/\D/g, '')
  
  return (phoneRegex.test(phone) || internationalRegex.test(phone)) && 
         digitsOnly.length >= 10 && digitsOnly.length <= 15
}

// ============================================================================
// RATE LIMITING HELPERS
// ============================================================================

/**
 * Check if user has exceeded rate limit for OTP requests
 */
export function checkRateLimit(lastRequestTimes: Date[]): { allowed: boolean; waitTime?: number } {
  const now = new Date()
  const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000)
  
  // Filter requests within the last hour
  const recentRequests = lastRequestTimes.filter(time => time > oneHourAgo)
  
  if (recentRequests.length >= OTP_CONFIG.MAX_REQUESTS_PER_HOUR) {
    // Calculate wait time until the oldest request expires
    const oldestRequest = recentRequests[0]
    if (!oldestRequest) {
      return { allowed: false, waitTime: 60 }
    }
    const waitTime = Math.ceil((oldestRequest.getTime() + 60 * 60 * 1000 - now.getTime()) / 1000 / 60)
    
    return {
      allowed: false,
      waitTime: waitTime
    }
  }
  
  return { allowed: true }
}

/**
 * Generate a user-friendly error message for rate limiting
 */
export function getRateLimitMessage(waitTime: number): string {
  if (waitTime <= 1) {
    return 'Too many OTP requests. Please try again in a few minutes.'
  } else if (waitTime <= 60) {
    return `Too many OTP requests. Please try again in ${waitTime} minutes.`
  } else {
    const hours = Math.ceil(waitTime / 60)
    return `Too many OTP requests. Please try again in ${hours} hour${hours > 1 ? 's' : ''}.`
  }
}

// ============================================================================
// EXPORTS
// ============================================================================

export const OTPUtils = {
  generateOTP,
  hashOTP,
  createOTPData,
  verifyOTP,
  isValidOTPFormat,
  isValidEmail,
  isValidPhoneNumber,
  checkRateLimit,
  getRateLimitMessage,
  CONFIG: OTP_CONFIG,
}

export default OTPUtils