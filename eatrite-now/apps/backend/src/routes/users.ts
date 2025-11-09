import express, { Router } from 'express';
const router: Router = express.Router();

router.get('/', async (req, res) => {
  res.status(501).json({ message: 'Users not implemented yet' });
});

export default router;