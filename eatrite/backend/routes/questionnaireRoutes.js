import express from 'express'
import { submitQuestionnaire, getSubmissionStats } from '../controllers/questionnaireController.js'

const router = express.Router()

/**
 * Questionnaire routes for the Eatrite API
 * All routes are prefixed with /api
 */

// POST /api/submit - Submit questionnaire data
router.post('/submit', submitQuestionnaire)

// GET /api/stats - Get submission statistics (optional endpoint for analytics)
router.get('/stats', getSubmissionStats)

export default router