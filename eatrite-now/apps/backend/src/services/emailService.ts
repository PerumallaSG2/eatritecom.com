/**
 * Email Service for EatRite
 * Handles sending verification emails, welcome emails, and notifications
 */

import nodemailer from 'nodemailer'

// ============================================================================
// TYPES
// ============================================================================

export interface EmailConfig {
  host: string
  port: number
  secure: boolean
  auth: {
    user: string
    pass: string
  }
}

export interface EmailTemplate {
  subject: string
  html: string
  text: string
}

export interface SendEmailResult {
  success: boolean
  messageId?: string
  error?: string
}

// ============================================================================
// EMAIL CONFIGURATION
// ============================================================================

const EMAIL_CONFIG: EmailConfig = {
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: process.env.EMAIL_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER || '',
    pass: process.env.EMAIL_PASS || '',
  },
}

const FROM_EMAIL = process.env.EMAIL_FROM || process.env.EMAIL_USER || 'noreply@eatrite.com'
const FROM_NAME = process.env.FROM_NAME || 'EatRite Team'

// ============================================================================
// EMAIL TRANSPORTER
// ============================================================================

let transporter: nodemailer.Transporter | null = null

function getTransporter(): nodemailer.Transporter {
  if (!transporter) {
    // Check if we should force real email sending or if email is configured
    const forceRealOTP = process.env.FORCE_REAL_OTP === 'true'
    const hasEmailConfig = EMAIL_CONFIG.auth.user && EMAIL_CONFIG.auth.pass
    
    if ((process.env.NODE_ENV === 'development' && !forceRealOTP) || !hasEmailConfig) {
      // Use mock transporter for development or when not configured
      transporter = nodemailer.createTransport({
        streamTransport: true,
        newline: 'unix',
        buffer: true,
      })
    } else {
      // Use real SMTP for production or when forced
      transporter = nodemailer.createTransport(EMAIL_CONFIG)
    }
  }
  return transporter!
}

// ============================================================================
// EMAIL TEMPLATES
// ============================================================================

/**
 * Generate email verification template
 */
export function createVerificationEmail(
  firstName: string,
  otpCode: string,
  expirationMinutes: number = 10
): EmailTemplate {
  const subject = 'Verify Your EatRite Account'
  
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify Your EatRite Account</title>
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; background-color: #f5f5f5; }
        .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
        .header { background: linear-gradient(135deg, #D4B46A 0%, #B8935A 100%); padding: 40px 20px; text-align: center; }
        .logo { color: #ffffff; font-size: 28px; font-weight: bold; margin: 0; }
        .content { padding: 40px 20px; }
        .otp-section { background-color: #F5EEDC; border: 2px solid #D4B46A; border-radius: 12px; padding: 30px; text-align: center; margin: 30px 0; }
        .otp-code { font-size: 36px; font-weight: bold; color: #0F2B1E; letter-spacing: 8px; margin: 20px 0; font-family: 'Courier New', monospace; }
        .footer { background-color: #0F2B1E; color: #ffffff; padding: 20px; text-align: center; font-size: 14px; }
        .btn { display: inline-block; padding: 12px 30px; background-color: #D4B46A; color: #ffffff; text-decoration: none; border-radius: 8px; margin: 20px 0; }
        h1 { color: #0F2B1E; font-size: 24px; margin-bottom: 20px; }
        p { color: #4A5568; line-height: 1.6; margin-bottom: 15px; }
        .warning { background-color: #FEF2F2; border-left: 4px solid #F56565; padding: 15px; margin: 20px 0; }
        .warning p { color: #C53030; margin: 0; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1 class="logo">🍃 EatRite</h1>
        </div>
        
        <div class="content">
            <h1>Welcome to EatRite, ${firstName}!</h1>
            
            <p>Thank you for joining EatRite, your premium meal delivery service. To complete your account setup, please verify your email address using the verification code below:</p>
            
            <div class="otp-section">
                <p style="margin: 0; font-size: 16px; color: #0F2B1E; font-weight: 600;">Your Verification Code</p>
                <div class="otp-code">${otpCode}</div>
                <p style="margin: 0; font-size: 14px; color: #718096;">This code expires in ${expirationMinutes} minutes</p>
            </div>
            
            <p>If you didn't create an account with EatRite, please ignore this email.</p>
            
            <div class="warning">
                <p><strong>Security Note:</strong> Never share this verification code with anyone. EatRite will never ask for your verification code over the phone or email.</p>
            </div>
            
            <p>Once verified, you'll have access to:</p>
            <ul style="color: #4A5568; padding-left: 20px;">
                <li>🍽️ Personalized meal recommendations</li>
                <li>📅 Flexible delivery scheduling</li>
                <li>📊 Nutrition tracking and goals</li>
                <li>🎯 AI-powered health insights</li>
            </ul>
            
            <p>Questions? Contact our support team at <a href="mailto:support@eatrite.com" style="color: #D4B46A;">support@eatrite.com</a></p>
        </div>
        
        <div class="footer">
            <p>&copy; 2025 EatRite. Premium Meal Delivery Service.</p>
            <p style="margin: 5px 0 0 0; font-size: 12px; opacity: 0.8;">This is an automated message, please do not reply to this email.</p>
        </div>
    </div>
</body>
</html>`

  const text = `
Welcome to EatRite, ${firstName}!

Thank you for joining EatRite. To complete your account setup, please verify your email address using this verification code:

Verification Code: ${otpCode}

This code expires in ${expirationMinutes} minutes.

If you didn't create an account with EatRite, please ignore this email.

Questions? Contact support@eatrite.com

© 2025 EatRite. Premium Meal Delivery Service.
`

  return { subject, html, text }
}

/**
 * Generate welcome email template (sent after verification)
 */
export function createWelcomeEmail(firstName: string): EmailTemplate {
  const subject = 'Welcome to EatRite - Your Culinary Journey Begins!'
  
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to EatRite</title>
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; background-color: #f5f5f5; }
        .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
        .header { background: linear-gradient(135deg, #D4B46A 0%, #B8935A 100%); padding: 40px 20px; text-align: center; }
        .logo { color: #ffffff; font-size: 28px; font-weight: bold; margin: 0; }
        .content { padding: 40px 20px; }
        .cta-button { display: inline-block; padding: 15px 30px; background-color: #D4B46A; color: #ffffff; text-decoration: none; border-radius: 8px; margin: 20px 0; font-weight: 600; }
        .feature-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 30px 0; }
        .feature { text-align: center; padding: 20px; background-color: #F5EEDC; border-radius: 8px; }
        .footer { background-color: #0F2B1E; color: #ffffff; padding: 20px; text-align: center; font-size: 14px; }
        h1 { color: #0F2B1E; font-size: 24px; margin-bottom: 20px; }
        p { color: #4A5568; line-height: 1.6; margin-bottom: 15px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1 class="logo">🍃 EatRite</h1>
        </div>
        
        <div class="content">
            <h1>Welcome aboard, ${firstName}! 🎉</h1>
            
            <p>Your email has been verified successfully! You're now part of the EatRite family, where premium nutrition meets convenience.</p>
            
            <div style="text-align: center;">
                <a href="${process.env.FRONTEND_URL || 'http://localhost:4006'}" class="cta-button">Start Exploring Meals</a>
            </div>
            
            <div class="feature-grid">
                <div class="feature">
                    <h3>🎯 Personalized</h3>
                    <p>AI-powered meal recommendations based on your goals</p>
                </div>
                <div class="feature">
                    <h3>🚚 Fresh Delivery</h3>
                    <p>Restaurant-quality meals delivered to your door</p>
                </div>
                <div class="feature">
                    <h3>📊 Track Progress</h3>
                    <p>Monitor your nutrition and health journey</p>
                </div>
                <div class="feature">
                    <h3>⭐ Premium Quality</h3>
                    <p>Chef-crafted meals with premium ingredients</p>
                </div>
            </div>
            
            <p>Ready to get started? Here's what you can do next:</p>
            <ul style="color: #4A5568; padding-left: 20px;">
                <li>Complete your profile for personalized recommendations</li>
                <li>Browse our weekly menu of chef-crafted meals</li>
                <li>Set up your first delivery schedule</li>
                <li>Explore nutrition tracking features</li>
            </ul>
            
            <p>Need help? Our support team is here for you at <a href="mailto:support@eatrite.com" style="color: #D4B46A;">support@eatrite.com</a></p>
        </div>
        
        <div class="footer">
            <p>&copy; 2025 EatRite. Premium Meal Delivery Service.</p>
        </div>
    </div>
</body>
</html>`

  const text = `
Welcome aboard, ${firstName}!

Your email has been verified successfully! You're now part of the EatRite family.

Start exploring: ${process.env.FRONTEND_URL || 'http://localhost:4006'}

What you can do next:
- Complete your profile for personalized recommendations
- Browse our weekly menu of chef-crafted meals  
- Set up your first delivery schedule
- Explore nutrition tracking features

Need help? Contact support@eatrite.com

© 2025 EatRite. Premium Meal Delivery Service.
`

  return { subject, html, text }
}

// ============================================================================
// EMAIL SENDING FUNCTIONS
// ============================================================================

/**
 * Send email using nodemailer
 */
export async function sendEmail(
  to: string,
  template: EmailTemplate,
  fromEmail: string = FROM_EMAIL,
  fromName: string = FROM_NAME
): Promise<SendEmailResult> {
  try {
    const transporter = getTransporter()
    
    const mailOptions = {
      from: `${fromName} <${fromEmail}>`,
      to,
      subject: template.subject,
      text: template.text,
      html: template.html,
    }
    
    // Check if we should send real emails or just log
    const forceRealOTP = process.env.FORCE_REAL_OTP === 'true'
    const hasEmailConfig = EMAIL_CONFIG.auth.user && EMAIL_CONFIG.auth.pass && 
                           EMAIL_CONFIG.auth.user !== 'your-actual-gmail@gmail.com'
    
    // In development mode without real config, just log the email instead of sending
    if (process.env.NODE_ENV === 'development' && !forceRealOTP && !hasEmailConfig) {
      console.log('\n📧 EMAIL SENT (Development Mode - Check Terminal)')
      console.log('To:', to)
      console.log('Subject:', template.subject)
      console.log('🔑 OTP CODE:', template.text.match(/\b\d{6}\b/)?.[0] || 'Not found')
      console.log('Text preview:', template.text.substring(0, 200) + '...')
      
      return {
        success: true,
        messageId: `dev_${Date.now()}`,
      }
    }
    
    const result = await transporter.sendMail(mailOptions)
    
    return {
      success: true,
      messageId: result.messageId,
    }
  } catch (error) {
    console.error('Email sending failed:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown email error',
    }
  }
}

/**
 * Send verification email with OTP
 */
export async function sendVerificationEmail(
  email: string,
  firstName: string,
  otpCode: string,
  expirationMinutes: number = 10
): Promise<SendEmailResult> {
  const template = createVerificationEmail(firstName, otpCode, expirationMinutes)
  return await sendEmail(email, template)
}

/**
 * Send welcome email after successful verification
 */
export async function sendWelcomeEmail(
  email: string,
  firstName: string
): Promise<SendEmailResult> {
  const template = createWelcomeEmail(firstName)
  return await sendEmail(email, template)
}

// ============================================================================
// EXPORTS
// ============================================================================

export const EmailService = {
  sendEmail,
  sendVerificationEmail,
  sendWelcomeEmail,
  createVerificationEmail,
  createWelcomeEmail,
}

export default EmailService