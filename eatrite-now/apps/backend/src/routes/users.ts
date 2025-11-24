import express, { Router } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { Request, Response } from 'express'
// Inline type definitions to avoid ES module import issues
interface User {
  id: string
  email: string
  password_hash: string
  first_name: string
  last_name: string
  phone?: string
  is_active: boolean
  email_verified: boolean
  created_at: Date
  updated_at: Date
}

interface UserProfile {
  user_id: string
  date_of_birth?: Date
  gender?: 'male' | 'female' | 'other'
  height?: number
  weight?: number
  activity_level?: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active'
  dietary_restrictions?: string
  health_goals?: string
  allergies?: string
  updated_at: Date
}
import { OTPUtils } from '../utils/otpUtils.js'
import { EmailService } from '../services/emailService.js'
import { SMSService } from '../services/smsService.js'

const router: Router = express.Router()

// ============================================================================
// TYPES AND INTERFACES
// ============================================================================

interface RegisterRequest {
  firstName: string
  lastName: string
  email: string
  password: string
  phone?: string
}

interface ProfileUpdateRequest {
  dateOfBirth?: string
  gender?: 'male' | 'female' | 'other' | 'prefer-not-to-say'
  heightCm?: number
  weightKg?: number
  activityLevel?: 'sedentary' | 'lightly-active' | 'moderately-active' | 'very-active' | 'extremely-active'
  fitnessLevel?: 'beginner' | 'intermediate' | 'advanced'
  healthGoals?: string[]
  dietaryRestrictions?: string[]
  allergies?: string[]
  medicalConditions?: string[]
  dailyCalories?: number
  proteinPercentage?: number
  carbsPercentage?: number
  fatPercentage?: number
  waterIntakeMl?: number
  mealsPerDay?: number
  weightGoal?: 'lose' | 'maintain' | 'gain'
  targetWeightKg?: number
}

// ============================================================================
// AUTHENTICATION ROUTES
// ============================================================================

// Register new user
router.post('/register', async (req: Request<{}, {}, RegisterRequest>, res: Response) => {
  try {
    const { firstName, lastName, email, password, phone } = req.body

    // Validate required fields
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'First name, last name, email, and password are required' 
      })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please enter a valid email address' 
      })
    }

    // Validate password strength
    if (password.length < 8) {
      return res.status(400).json({ 
        success: false, 
        message: 'Password must be at least 8 characters long' 
      })
    }

    // Hash password
    const saltRounds = 12
    const passwordHash = await bcrypt.hash(password, saltRounds)

    // For now, simulate database operations with mock data
    // In production, you would use your SQL Server connection
    const mockUser = {
      id: `user_${Date.now()}`,
      email: email.toLowerCase(),
      firstName,
      lastName,
      phone: phone || null,
      isActive: true,
      emailVerified: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: mockUser.id, email: mockUser.email },
      process.env.JWT_SECRET || 'fallback_secret_key',
      { expiresIn: '7d' }
    )

    // Return user data (without password hash)
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user: mockUser,
        token,
        profile: null // Will be created in onboarding
      }
    })

  } catch (error) {
    console.error('Registration error:', error)
    res.status(500).json({ 
      success: false, 
      message: 'Registration failed. Please try again.' 
    })
  }
})

// Login user
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email and password are required' 
      })
    }

    // For demo purposes, simulate login with any valid credentials
    // In production, you would verify against the database
    const mockUser = {
      id: `user_${Date.now()}`,
      email: email.toLowerCase(),
      firstName: 'Demo',
      lastName: 'User',
      phone: null,
      isActive: true,
      emailVerified: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    const token = jwt.sign(
      { userId: mockUser.id, email: mockUser.email },
      process.env.JWT_SECRET || 'fallback_secret_key',
      { expiresIn: '7d' }
    )

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        user: mockUser,
        token
      }
    })

  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({ 
      success: false, 
      message: 'Login failed. Please try again.' 
    })
  }
})

// ============================================================================
// PROFILE ROUTES
// ============================================================================

// Get user profile
router.get('/profile/:userId', async (req: Request, res: Response) => {
  try {
    const { userId } = req.params

    // Mock profile data - in production, fetch from database
    const mockProfile = {
      userId,
      dateOfBirth: '1990-01-15',
      gender: 'prefer-not-to-say' as const,
      avatarUrl: `https://ui-avatars.com/api/?name=Demo+User&background=D4B46A&color=0F2B1E`,
      subscriptionTier: 'basic' as const,
      heightCm: 170,
      weightKg: 70,
      activityLevel: 'moderately-active' as const,
      fitnessLevel: 'intermediate' as const,
      healthGoals: ['weight-maintenance', 'muscle-gain'],
      dietaryRestrictions: ['vegetarian'],
      allergies: [],
      medicalConditions: [],
      dailyCalories: 2000,
      proteinPercentage: 25,
      carbsPercentage: 45,
      fatPercentage: 30,
      waterIntakeMl: 2000,
      mealsPerDay: 3,
      weightGoal: 'maintain' as const,
      targetWeightKg: 70,
      updatedAt: new Date()
    }

    res.json({
      success: true,
      data: mockProfile
    })

  } catch (error) {
    console.error('Profile fetch error:', error)
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch profile' 
    })
  }
})

// Create or update user profile
router.put('/profile/:userId', async (req: Request<{userId: string}, {}, ProfileUpdateRequest>, res: Response) => {
  try {
    const { userId } = req.params
    const profileData = req.body

    // Validate numeric values
    if (profileData.heightCm && (profileData.heightCm < 50 || profileData.heightCm > 250)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Height must be between 50 and 250 cm' 
      })
    }

    if (profileData.weightKg && (profileData.weightKg < 20 || profileData.weightKg > 300)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Weight must be between 20 and 300 kg' 
      })
    }

    // Mock saving to database
    const updatedProfile = {
      userId,
      ...profileData,
      updatedAt: new Date()
    }

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: updatedProfile
    })

  } catch (error) {
    console.error('Profile update error:', error)
    res.status(500).json({ 
      success: false, 
      message: 'Profile update failed. Please try again.' 
    })
  }
})

// Get user settings
router.get('/settings/:userId', async (req: Request, res: Response) => {
  try {
    const { userId } = req.params

    const mockSettings = {
      userId,
      emailNotifications: true,
      pushNotifications: true,
      mealReminders: true,
      supplementReminders: false,
      progressUpdates: true,
      promotionalOffers: false,
      weeklyReports: true,
      profileVisibility: 'friends' as const,
      shareProgressData: true,
      allowDataAnalytics: true,
      marketingCommunications: false,
      updatedAt: new Date()
    }

    res.json({
      success: true,
      data: mockSettings
    })

  } catch (error) {
    console.error('Settings fetch error:', error)
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch settings' 
    })
  }
})

// Update user settings
router.put('/settings/:userId', async (req: Request, res: Response) => {
  try {
    const { userId } = req.params
    const settings = req.body

    const updatedSettings = {
      userId,
      ...settings,
      updatedAt: new Date()
    }

    res.json({
      success: true,
      message: 'Settings updated successfully',
      data: updatedSettings
    })

  } catch (error) {
    console.error('Settings update error:', error)
    res.status(500).json({ 
      success: false, 
      message: 'Settings update failed' 
    })
  }
})

// ============================================================================
// ADDRESS MANAGEMENT
// ============================================================================

// Get user addresses
router.get('/addresses/:userId', async (req: Request, res: Response) => {
  try {
    const { userId } = req.params

    const mockAddresses = [
      {
        id: 'addr_1',
        userId,
        name: 'Home',
        streetAddress: '123 Main St',
        apartmentUnit: 'Apt 4B',
        city: 'San Francisco',
        state: 'CA',
        postalCode: '94102',
        country: 'United States',
        deliveryInstructions: 'Leave at front door',
        isDefault: true,
        createdAt: new Date()
      }
    ]

    res.json({
      success: true,
      data: mockAddresses
    })

  } catch (error) {
    console.error('Addresses fetch error:', error)
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch addresses' 
    })
  }
})

// Add new address
router.post('/addresses/:userId', async (req: Request, res: Response) => {
  try {
    const { userId } = req.params
    const addressData = req.body

    const newAddress = {
      id: `addr_${Date.now()}`,
      userId,
      ...addressData,
      createdAt: new Date()
    }

    res.status(201).json({
      success: true,
      message: 'Address added successfully',
      data: newAddress
    })

  } catch (error) {
    console.error('Address creation error:', error)
    res.status(500).json({ 
      success: false, 
      message: 'Failed to add address' 
    })
  }
})

// ============================================================================
// VERIFICATION ROUTES
// ============================================================================

// Send email verification OTP
router.post('/send-email-verification', async (req: Request, res: Response) => {
  try {
    const { email, firstName } = req.body

    if (!email || !firstName) {
      return res.status(400).json({
        success: false,
        message: 'Email and first name are required'
      })
    }

    if (!OTPUtils.isValidEmail(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please enter a valid email address'
      })
    }

    // Generate OTP
    const otpData = await OTPUtils.createOTPData()
    
    // Send verification email
    const emailResult = await EmailService.sendVerificationEmail(
      email,
      firstName,
      otpData.code
    )

    if (!emailResult.success) {
      return res.status(500).json({
        success: false,
        message: 'Failed to send verification email'
      })
    }

    // In production, store OTP data in database
    // For now, we'll use a simple in-memory store
    console.log(`📧 Email OTP for ${email}: ${otpData.code} (expires: ${otpData.expiresAt})`)

    res.json({
      success: true,
      message: 'Verification code sent to your email',
      data: {
        expiresAt: otpData.expiresAt,
        // Don't return the actual code in production
        ...(process.env.NODE_ENV === 'development' && { otpCode: otpData.code })
      }
    })

  } catch (error) {
    console.error('Email verification send error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to send verification code'
    })
  }
})

// Send SMS verification OTP
router.post('/send-sms-verification', async (req: Request, res: Response) => {
  try {
    const { phoneNumber, firstName } = req.body

    if (!phoneNumber || !firstName) {
      return res.status(400).json({
        success: false,
        message: 'Phone number and first name are required'
      })
    }

    if (!OTPUtils.isValidPhoneNumber(phoneNumber)) {
      return res.status(400).json({
        success: false,
        message: 'Please enter a valid phone number'
      })
    }

    // Generate OTP
    const otpData = await OTPUtils.createOTPData()
    
    // Send verification SMS
    const smsResult = await SMSService.sendVerificationSMS(
      phoneNumber,
      firstName,
      otpData.code
    )

    if (!smsResult.success) {
      return res.status(500).json({
        success: false,
        message: 'Failed to send verification SMS'
      })
    }

    // In production, store OTP data in database
    console.log(`📱 SMS OTP for ${phoneNumber}: ${otpData.code} (expires: ${otpData.expiresAt})`)

    res.json({
      success: true,
      message: 'Verification code sent to your phone',
      data: {
        expiresAt: otpData.expiresAt,
        // Don't return the actual code in production
        ...(process.env.NODE_ENV === 'development' && { otpCode: otpData.code })
      }
    })

  } catch (error) {
    console.error('SMS verification send error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to send verification code'
    })
  }
})

// Verify email OTP
router.post('/verify-email', async (req: Request, res: Response) => {
  try {
    const { email, otpCode, userId } = req.body

    if (!email || !otpCode) {
      return res.status(400).json({
        success: false,
        message: 'Email and OTP code are required'
      })
    }

    if (!OTPUtils.isValidOTPFormat(otpCode)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid OTP format'
      })
    }

    // In production, you would:
    // 1. Fetch stored OTP data from database by email/userId
    // 2. Verify the OTP using OTPUtils.verifyOTP()
    // 3. Update user's email_verified status
    // 4. Clear the OTP data

    // For demo, accept any 6-digit code
    const isValid = /^\d{6}$/.test(otpCode)
    
    if (!isValid) {
      return res.status(400).json({
        success: false,
        message: 'Invalid verification code'
      })
    }

    // Send welcome email
    const firstName = email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1)
    await EmailService.sendWelcomeEmail(email, firstName)

    res.json({
      success: true,
      message: 'Email verified successfully',
      data: {
        emailVerified: true,
        verifiedAt: new Date()
      }
    })

  } catch (error) {
    console.error('Email verification error:', error)
    res.status(500).json({
      success: false,
      message: 'Email verification failed'
    })
  }
})

// Verify phone OTP
router.post('/verify-phone', async (req: Request, res: Response) => {
  try {
    const { phoneNumber, otpCode, userId } = req.body

    if (!phoneNumber || !otpCode) {
      return res.status(400).json({
        success: false,
        message: 'Phone number and OTP code are required'
      })
    }

    if (!OTPUtils.isValidOTPFormat(otpCode)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid OTP format'
      })
    }

    // In production, similar to email verification
    const isValid = /^\d{6}$/.test(otpCode)
    
    if (!isValid) {
      return res.status(400).json({
        success: false,
        message: 'Invalid verification code'
      })
    }

    // Send welcome SMS
    const firstName = 'User' // In production, get from database
    await SMSService.sendWelcomeSMS(phoneNumber, firstName)

    res.json({
      success: true,
      message: 'Phone number verified successfully',
      data: {
        phoneVerified: true,
        verifiedAt: new Date()
      }
    })

  } catch (error) {
    console.error('Phone verification error:', error)
    res.status(500).json({
      success: false,
      message: 'Phone verification failed'
    })
  }
})

// Resend verification code
router.post('/resend-verification', async (req: Request, res: Response) => {
  try {
    const { type, email, phoneNumber, firstName } = req.body

    if (!type || !firstName) {
      return res.status(400).json({
        success: false,
        message: 'Verification type and first name are required'
      })
    }

    if (type === 'email') {
      if (!email) {
        return res.status(400).json({
          success: false,
          message: 'Email is required for email verification'
        })
      }

      // Check rate limiting
      // In production, fetch user's last request times from database
      const rateLimit = OTPUtils.checkRateLimit([])
      
      if (!rateLimit.allowed) {
        return res.status(429).json({
          success: false,
          message: OTPUtils.getRateLimitMessage(rateLimit.waitTime || 60)
        })
      }

      // Generate and send new OTP
      const otpData = await OTPUtils.createOTPData()
      const emailResult = await EmailService.sendVerificationEmail(email, firstName, otpData.code)

      if (!emailResult.success) {
        return res.status(500).json({
          success: false,
          message: 'Failed to resend verification email'
        })
      }

      res.json({
        success: true,
        message: 'New verification code sent to your email'
      })

    } else if (type === 'sms') {
      if (!phoneNumber) {
        return res.status(400).json({
          success: false,
          message: 'Phone number is required for SMS verification'
        })
      }

      // Generate and send new OTP
      const otpData = await OTPUtils.createOTPData()
      const smsResult = await SMSService.sendVerificationSMS(phoneNumber, firstName, otpData.code)

      if (!smsResult.success) {
        return res.status(500).json({
          success: false,
          message: 'Failed to resend verification SMS'
        })
      }

      res.json({
        success: true,
        message: 'New verification code sent to your phone'
      })

    } else {
      return res.status(400).json({
        success: false,
        message: 'Invalid verification type. Use "email" or "sms"'
      })
    }

  } catch (error) {
    console.error('Resend verification error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to resend verification code'
    })
  }
})

// Get verification status
router.get('/verification-status/:userId', async (req: Request, res: Response) => {
  try {
    const { userId } = req.params

    // In production, fetch from database
    const mockStatus = {
      emailVerified: false,
      phoneVerified: false,
      emailVerificationSent: false,
      phoneVerificationSent: false,
      canResendEmail: true,
      canResendSMS: true
    }

    res.json({
      success: true,
      data: mockStatus
    })

  } catch (error) {
    console.error('Verification status error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to get verification status'
    })
  }
})

export default router
