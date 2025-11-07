/**
 * Questionnaire Controller
 * Handles all questionnaire-related business logic and data processing
 * 
 * In a production application, this would typically:
 * - Validate and sanitize input data
 * - Save data to a database (MongoDB/PostgreSQL)
 * - Trigger email notifications
 * - Generate nutrition recommendations using AI/ML
 * - Integrate with payment processing
 */

// Mock database for storing submissions (in production, use real database)
let submissionDatabase = []

/**
 * Handles questionnaire form submission from web and mobile clients
 * @param {Object} req - Express request object containing form data
 * @param {Object} res - Express response object
 */
export const submitQuestionnaire = async (req, res) => {
  try {
    const submissionData = req.body
    const timestamp = new Date().toISOString()
    const clientInfo = {
      ip: req.ip,
      userAgent: req.get('User-Agent'),
      timestamp
    }
    
    // Enhanced logging for development and debugging
    console.log('\n🍃 NEW QUESTIONNAIRE SUBMISSION')
    console.log('======================================')
    console.log(`⏰ Timestamp: ${timestamp}`)
    console.log(`🌐 Client IP: ${clientInfo.ip}`)
    console.log(`� User Agent: ${clientInfo.userAgent}`)
    console.log(`📊 Total submissions: ${submissionDatabase.length + 1}`)
    console.log('\n📝 SUBMITTED DATA:')
    console.log(JSON.stringify(submissionData, null, 2))
    console.log('======================================\n')
    
    // Comprehensive input validation
    const validationResult = validateSubmissionData(submissionData)
    if (!validationResult.isValid) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: validationResult.errors,
        timestamp
      })
    }
    
    // Simulate processing time for realistic API behavior
    await simulateProcessingDelay()
    
    // Generate unique submission ID
    const submissionId = generateSubmissionId()
    
    // Create complete submission record
    const submissionRecord = {
      id: submissionId,
      data: submissionData,
      clientInfo,
      timestamp,
      status: 'received'
    }
    
    // Store in mock database (replace with real database in production)
    submissionDatabase.push(submissionRecord)
    
    // In production, you would trigger these processes:
    // await saveToDatabase(submissionRecord)
    // await sendConfirmationEmail(submissionData.email, submissionId)
    // await generateNutritionPlan(submissionData)
    // await scheduleFollowUpTasks(submissionId)
    
    // Calculate estimated plan delivery time
    const planDeliveryDate = new Date(Date.now() + 24 * 60 * 60 * 1000)
    
    // Send success response with useful information
    res.status(200).json({
      success: true,
      message: 'Questionnaire submitted successfully! Your personalized nutrition plan is being created.',
      data: {
        submissionId,
        customerName: submissionData.name,
        email: submissionData.email,
        primaryGoal: submissionData.goal,
        estimatedPlanDelivery: planDeliveryDate.toISOString(),
        nextSteps: [
          'Our nutrition experts will review your information',
          'You\'ll receive a personalized meal plan within 24 hours',
          'Check your email for detailed recommendations and next steps',
          'Download our mobile app to track your progress'
        ],
        supportContact: 'sairam.perumalla@eatrite.com'
      },
      timestamp
    })
    
  } catch (error) {
    console.error('❌ Questionnaire submission error:', error)
    
    res.status(500).json({
      success: false,
      message: 'Internal server error. Our team has been notified.',
      timestamp: new Date().toISOString(),
      supportContact: 'sairam.perumalla@eatrite.com'
    })
  }
}

/**
 * Handles request for submission statistics (analytics endpoint)
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const getSubmissionStats = (req, res) => {
  try {
    // Calculate basic statistics from mock database
    const totalSubmissions = submissionDatabase.length
    const todaySubmissions = submissionDatabase.filter(submission => {
      const submissionDate = new Date(submission.timestamp).toDateString()
      const today = new Date().toDateString()
      return submissionDate === today
    }).length
    
    // Count submissions by goal type
    const goalCounts = submissionDatabase.reduce((acc, submission) => {
      const goal = submission.data.goal || 'unknown'
      acc[goal] = (acc[goal] || 0) + 1
      return acc
    }, {})
    
    // Get recent submissions (last 10)
    const recentSubmissions = submissionDatabase
      .slice(-10)
      .map(submission => ({
        id: submission.id,
        name: submission.data.name,
        goal: submission.data.goal,
        timestamp: submission.timestamp
      }))
    
    res.json({
      success: true,
      statistics: {
        totalSubmissions,
        todaySubmissions,
        goalDistribution: goalCounts,
        recentSubmissions
      },
      timestamp: new Date().toISOString()
    })
    
  } catch (error) {
    console.error('❌ Statistics error:', error)
    
    res.status(500).json({
      success: false,
      message: 'Error retrieving statistics',
      timestamp: new Date().toISOString()
    })
  }
}

/**
 * Validates questionnaire submission data
 * @param {Object} data - Form submission data
 * @returns {Object} Validation result with isValid flag and errors array
 */
function validateSubmissionData(data) {
  const errors = []
  
  // Required fields validation
  const requiredFields = ['name', 'email', 'goal']
  requiredFields.forEach(field => {
    if (!data[field] || !data[field].toString().trim()) {
      errors.push(`${field} is required`)
    }
  })
  
  // Email format validation
  if (data.email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(data.email)) {
      errors.push('Invalid email address format')
    }
  }
  
  // Name length validation
  if (data.name && data.name.length > 100) {
    errors.push('Name must be less than 100 characters')
  }
  
  // Goal validation (ensure it's from allowed list)
  const validGoals = [
    'weight-loss', 'weight-gain', 'muscle-building', 
    'maintenance', 'general-health', 'energy'
  ]
  if (data.goal && !validGoals.includes(data.goal)) {
    errors.push('Invalid health goal selected')
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}

/**
 * Simulates processing delay for realistic API behavior
 * @param {number} minMs - Minimum delay in milliseconds
 * @param {number} maxMs - Maximum delay in milliseconds
 */
function simulateProcessingDelay(minMs = 800, maxMs = 2000) {
  const delay = Math.floor(Math.random() * (maxMs - minMs + 1)) + minMs
  return new Promise(resolve => setTimeout(resolve, delay))
}

/**
 * Generates a unique submission ID
 * @returns {string} Unique submission identifier
 */
function generateSubmissionId() {
  const timestamp = Date.now()
  const randomString = Math.random().toString(36).substring(2, 9).toUpperCase()
  return `EAT_${timestamp}_${randomString}`
}