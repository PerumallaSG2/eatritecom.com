import express, { Router } from 'express';
import { dataAccessService } from '../services/dataAccess';

const router: Router = express.Router();

// ==================== WRITE OPERATIONS (to user interaction tables) ====================

// @route   POST /api/quiz/submit
// @desc    Save user quiz response (WRITE to user_quiz_responses)  
// @access  Public
router.post('/submit', async (req, res) => {
  try {
    const quizData = req.body;
    
    if (!quizData || Object.keys(quizData).length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Quiz data is required'
      });
    }
    
    const result = await dataAccessService.saveUserQuizResponse(quizData);
    
    res.json({
      success: true,
      message: 'Quiz response saved successfully',
      data: result
    });
  } catch (error) {
    console.error('Error saving quiz response:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error saving quiz response', 
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
  }
});

// @route   GET /api/quiz/stats
// @desc    Get user interaction statistics (READ from user tables)
// @access  Public  
router.get('/stats', async (req, res) => {
  try {
    const stats = await dataAccessService.getUserInteractionStats();
    
    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('Error fetching interaction stats:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching stats', 
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
  }
});

export default router;
