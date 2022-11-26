import { Router } from 'express';
import authenticationMiddleware from '../../middlewares/auth/auth.middleware.js';
import { LoggerWarn } from '../../config/log4.js';

const router = new Router();

router.get('/user', authenticationMiddleware, (req, res, next) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    next(error);
  }
});

export default router;
