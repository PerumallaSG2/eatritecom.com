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
    console.log('======================================')
    console.log(`⏰ Timestamp: ${timestamp}`)
    console.log(`🌐 Client IP: ${clientInfo.ip}`)
    console.log(`📱 User Agent: ${clientInfo.userAgent}`)
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
    
    console.log(`\n✅ SUBMISSION PROCESSED SUCCESSFULLY`)
    console.log(`📊 Storage: ${result.storage}`)
    console.log(`🆔 Submission ID: ${result.data.id}`)
    console.log(`📧 Customer: ${submissionData.name} <${submissionData.email}>`)
    console.log(`🎯 Goal: ${submissionData.goal}`)
    if (questionnaireService.useDatabase) {
      console.log(`🗃️ Database: UserSubmissions table updated`)
      console.log(`🍽️ Nutrition plan: Auto-generated in NutritionPlans table`)
    }
    console.log('======================================\n')
    
    res.status(200).json({
      success: true,
      message: 'Questionnaire submitted successfully! Your personalized nutrition plan will be ready soon.',
      data: {
        submissionId: result.data.id,
        customerName: submissionData.name,
        email: submissionData.email,
        primaryGoal: submissionData.goal,
        estimatedPlanDelivery: planDeliveryDate.toISOString(),
        supportContact: 'sairam.perumalla@eatrite.com',
        storage: result.storage,
        nutritionPlanIncluded: questionnaireService.useDatabase
      },
      timestamp
    })
    
  } catch (error) {
    console.error('❌ Questionnaire submission error:', error)
    
    res.status(500).json({
      success: false,
      message: 'Database error occurred. Please try again.',
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
      pageSize,
      storage: questionnaireService.useDatabase ? 'database' : 'memory',
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('❌ Error retrieving submissions:', error)
    res.status(500).json({
      success: false,
      error: 'Database error occurred'
    })
  }
}

export const getSubmissionStats = async (req, res) => {
  try {
    const stats = await questionnaireService.getSubmissionStats()
    
    console.log('📊 Statistics requested')
    console.log(`📈 Total submissions: ${stats.totalSubmissions}`)
    console.log(`📅 Today's submissions: ${stats.todaySubmissions}`)
    console.log(`🗃️ Storage type: ${stats.storage || 'memory'}`)
    
    res.status(200).json({
      success: true,
      statistics: stats,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('❌ Error retrieving stats:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve statistics',
      timestamp: new Date().toISOString()
    })
  }
}

export const getSubmissionById = async (req, res) => {
  try {
    const { id } = req.params
    
    if (questionnaireService.useDatabase) {
      const submission = await questionnaireService.getSubmissionById(id)
      
      if (!submission) {
        return res.status(404).json({
          success: false,
          message: 'Submission not found',
          submissionId: id
        })
      }
      
      res.status(200).json({
        success: true,
        data: submission,
        timestamp: new Date().toISOString()
      })
    } else {
      res.status(501).json({
        success: false,
        message: 'Database not connected. Individual submission lookup not available in memory mode.',
        storage: 'memory'
      })
    }
  } catch (error) {
    console.error('❌ Error retrieving submission by ID:', error)
    res.status(500).json({
      success: false,
      error: 'Database error occurred'
    })
  }
}

export const getDatabaseStatus = async (req, res) => {
  try {
    const status = {
      database: {
        connected: questionnaireService.useDatabase,
        type: questionnaireService.useDatabase ? 'RavenDB' : 'In-Memory',
        url: process.env.RAVEN_DB_URL || 'http://localhost:8080',
        name: process.env.RAVEN_DB_NAME || 'EatriteDB'
      },
      server: {
        uptime: process.uptime(),
        memory: process.memoryUsage(),
        version: '2.0.0'
      },
      features: {
        persistentStorage: questionnaireService.useDatabase,
        nutritionPlanGeneration: questionnaireService.useDatabase,
        analytics: true,
        search: questionnaireService.useDatabase
      }
    }
    
    res.status(200).json({
      success: true,
      status,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('❌ Error getting database status:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve status'
    })
  }
}
