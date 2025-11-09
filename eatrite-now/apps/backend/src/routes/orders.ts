import express, { Router } from 'express';
const router: Router = express.Router();

router.get('/', async (req, res) => {
  res.status(501).json({ message: 'Orders not implemented yet' });
});

export default router;