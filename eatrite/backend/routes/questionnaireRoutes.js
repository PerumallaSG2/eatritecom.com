/**
 * Questionnaire Routes - RavenDB Integration
 */

import { Router } from 'express'
import { 
  submitQuestionnaire, 
  getAllSubmissions 
} from '../controllers/questionnaireController.js'

const router = Router()

// POST /api/submit - Submit new questionnaire
router.post('/submit', submitQuestionnaire)

// GET /api/submissions - Get all submissions (admin endpoint)
router.get('/submissions', getAllSubmissions)

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Questionnaire API with RavenDB is healthy',
    timestamp: new Date().toISOString(),
    endpoints: [
      'POST /api/submit - Submit questionnaire',
      'GET /api/submissions - Get all submissions (paginated)',
      'GET /api/health - Health check'
    ]
  })
})

export default router
