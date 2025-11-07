/**
 * Questionnaire Controller with RavenDB Integration
 */

import { questionnaireService } from '../services/questionnaireService.js'

function validateSubmissionData(data) {
  const errors = []
  const requiredFields = ['name', 'email', 'goal']
  
  requiredFields.forEach(field => {
    if (!data[field] || !data[field].toString().trim()) {
      errors.push(`${field} is required`)
    }
  })
  
  if (data.email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(data.email)) {
      errors.push('Invalid email address format')
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}

export const submitQuestionnaire = async (req, res) => {
  try {
    const submissionData = req.body
    const timestamp = new Date().toISOString()
    const clientInfo = {
      ip: req.ip,
      userAgent: req.get('User-Agent'),
      timestamp
    }
    
    console.log('\n🍃 NEW QUESTIONNAIRE SUBMISSION')
    console.log(`⏰ Timestamp: ${timestamp}`)
    console.log('📝 SUBMITTED DATA:')
    console.log(JSON.stringify(submissionData, null, 2))
    
    const validationResult = validateSubmissionData(submissionData)
    if (!validationResult.isValid) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: validationResult.errors,
        timestamp
      })
    }
    
    const enrichedData = {
      ...submissionData,
      clientInfo,
      submittedAt: timestamp
    }
    
    const result = await questionnaireService.submitQuestionnaire(enrichedData)
    
    const planDeliveryDate = new Date(Date.now() + 24 * 60 * 60 * 1000)
    
    res.status(200).json({
      success: true,
      message: 'Questionnaire submitted successfully!',
      data: {
        submissionId: result.data.id,
        customerName: submissionData.name,
        email: submissionData.email,
        primaryGoal: submissionData.goal,
        estimatedPlanDelivery: planDeliveryDate.toISOString(),
        supportContact: 'sairam.perumalla@eatrite.com'
      },
      timestamp
    })
    
  } catch (error) {
    console.error('❌ Questionnaire submission error:', error)
    
    res.status(500).json({
      success: false,
      message: 'Database error occurred.',
      timestamp: new Date().toISOString(),
      supportContact: 'sairam.perumalla@eatrite.com'
    })
  }
}

export const getAllSubmissions = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 0
    const pageSize = parseInt(req.query.pageSize) || 50
    
    const submissions = await questionnaireService.getAllQuestionnaires(page, pageSize)
    
    res.status(200).json({
      success: true,
      data: submissions,
      count: submissions.length,
      page,
      pageSize
    })
  } catch (error) {
    console.error('❌ Error retrieving submissions:', error)
    res.status(500).json({
      success: false,
      error: 'Database error occurred'
    })
  }
}
