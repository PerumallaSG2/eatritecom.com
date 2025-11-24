/**
 * SMS Service for EatRite  
 * Handles sending SMS verification codes using Twilio
 */

// ============================================================================
// TYPES
// ============================================================================

export interface SMSConfig {
  accountSid: string
  authToken: string
  fromNumber: string
}

export interface SendSMSResult {
  success: boolean
  messageId?: string
  error?: string
}

// ============================================================================
// SMS CONFIGURATION
// ============================================================================

const SMS_CONFIG: SMSConfig = {
  accountSid: process.env.TWILIO_ACCOUNT_SID || '',
  authToken: process.env.TWILIO_AUTH_TOKEN || '',
  fromNumber: process.env.TWILIO_PHONE_NUMBER || '+1234567890',
}

// ============================================================================
// SMS CLIENT
// ============================================================================

let twilioClient: any = null

function getTwilioClient() {
  if (!twilioClient && process.env.NODE_ENV !== 'development') {
    try {
      // Dynamically import Twilio only when needed and in production
      const twilio = require('twilio')
      twilioClient = twilio(SMS_CONFIG.accountSid, SMS_CONFIG.authToken)
    } catch (error) {
      console.warn('Twilio not available:', error)
    }
  }
  return twilioClient
}

// ============================================================================
// SMS TEMPLATES
// ============================================================================

/**
 * Generate SMS verification message
 */
export function createVerificationSMS(
  firstName: string,
  otpCode: string,
  expirationMinutes: number = 10
): string {
  return `Hi ${firstName}! Your EatRite verification code is: ${otpCode}. This code expires in ${expirationMinutes} minutes. Don't share this code with anyone. - EatRite Team`
}

/**
 * Generate welcome SMS message
 */
export function createWelcomeSMS(firstName: string): string {
  return `Welcome to EatRite, ${firstName}! 🍃 Your phone number has been verified. Start exploring our premium meal delivery service at eatrite.com - EatRite Team`
}

// ============================================================================
// SMS SENDING FUNCTIONS
// ============================================================================

/**
 * Send SMS message
 */
export async function sendSMS(
  to: string,
  message: string
): Promise<SendSMSResult> {
  try {
    // Check if we should send real SMS or just log
    const forceRealOTP = process.env.FORCE_REAL_OTP === 'true'
    const hasSMSConfig = SMS_CONFIG.accountSid && SMS_CONFIG.authToken && 
                        SMS_CONFIG.accountSid !== 'your-twilio-account-sid'
    
    // In development mode without real config, just log the SMS instead of sending
    if (process.env.NODE_ENV === 'development' && !forceRealOTP && !hasSMSConfig) {
      console.log('\n📱 SMS SENT (Development Mode - Check Terminal)')
      console.log('To:', to)
      console.log('🔑 OTP CODE:', message.match(/\b\d{6}\b/)?.[0] || 'Not found')
      console.log('Message:', message)
      
      return {
        success: true,
        messageId: `dev_sms_${Date.now()}`,
      }
    }
    
    const client = getTwilioClient()
    
    if (!client) {
      throw new Error('SMS service not configured')
    }
    
    // Format phone number to E.164 format if needed
    const formattedNumber = formatPhoneNumber(to)
    
    const result = await client.messages.create({
      body: message,
      from: SMS_CONFIG.fromNumber,
      to: formattedNumber,
    })
    
    return {
      success: true,
      messageId: result.sid,
    }
  } catch (error) {
    console.error('SMS sending failed:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown SMS error',
    }
  }
}

/**
 * Send verification SMS with OTP
 */
export async function sendVerificationSMS(
  phoneNumber: string,
  firstName: string,
  otpCode: string,
  expirationMinutes: number = 10
): Promise<SendSMSResult> {
  const message = createVerificationSMS(firstName, otpCode, expirationMinutes)
  return await sendSMS(phoneNumber, message)
}

/**
 * Send welcome SMS after successful verification
 */
export async function sendWelcomeSMS(
  phoneNumber: string,
  firstName: string
): Promise<SendSMSResult> {
  const message = createWelcomeSMS(firstName)
  return await sendSMS(phoneNumber, message)
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Format phone number to E.164 format
 */
function formatPhoneNumber(phoneNumber: string): string {
  // Remove all non-digit characters
  const digitsOnly = phoneNumber.replace(/\D/g, '')
  
  // If it starts with 1 and has 11 digits, assume it's US/Canada
  if (digitsOnly.length === 11 && digitsOnly.startsWith('1')) {
    return `+${digitsOnly}`
  }
  
  // If it has 10 digits, assume it's US/Canada without country code
  if (digitsOnly.length === 10) {
    return `+1${digitsOnly}`
  }
  
  // If it already starts with +, return as is
  if (phoneNumber.startsWith('+')) {
    return phoneNumber
  }
  
  // For other cases, add + if not present
  return `+${digitsOnly}`
}

/**
 * Validate if SMS service is configured
 */
export function isSMSConfigured(): boolean {
  return !!(
    SMS_CONFIG.accountSid &&
    SMS_CONFIG.authToken &&
    SMS_CONFIG.fromNumber &&
    SMS_CONFIG.fromNumber !== '+1234567890' // Default placeholder
  )
}

/**
 * Get SMS service status
 */
export function getSMSServiceStatus(): {
  configured: boolean
  development: boolean
  message: string
} {
  const isDev = process.env.NODE_ENV === 'development'
  const isConfigured = isSMSConfigured()
  
  if (isDev) {
    return {
      configured: true,
      development: true,
      message: 'SMS service running in development mode (logging only)',
    }
  }
  
  if (!isConfigured) {
    return {
      configured: false,
      development: false,
      message: 'SMS service not configured. Set TWILIO_* environment variables.',
    }
  }
  
  return {
    configured: true,
    development: false,
    message: 'SMS service ready with Twilio integration',
  }
}

// ============================================================================
// EXPORTS
// ============================================================================

export const SMSService = {
  sendSMS,
  sendVerificationSMS,
  sendWelcomeSMS,
  createVerificationSMS,
  createWelcomeSMS,
  formatPhoneNumber,
  isSMSConfigured,
  getSMSServiceStatus,
}

export default SMSService