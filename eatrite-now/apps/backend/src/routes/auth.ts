import express, { Router } from 'express';
const router: Router = express.Router();

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post('/register', async (req, res) => {
  res.status(501).json({ message: 'Auth registration not implemented yet' });
});

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post('/login', async (req, res) => {
  res.status(501).json({ message: 'Auth login not implemented yet' });
});

export default router;