import { Router } from 'express';
import authenticationMiddleware from '../middlewares/auth/auth.middleware.js';

const router = Router();

/* ------------------------------- Chat router ------------------------------ */
router.get('/', (req, res) => {
  res.render('chat');
});

router.get('/private', authenticationMiddleware, (req, res) => {
  res.render('privateChat', { email: req.user.email });
});

export default router;
