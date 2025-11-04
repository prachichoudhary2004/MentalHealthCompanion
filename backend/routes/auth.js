import { Router } from 'express';
import { body } from 'express-validator';
import { register, login, me, forgotPassword } from '../controllers/authController.js';
import { auth } from '../middlewares/auth.js';
import { validate } from '../middlewares/validate.js';

const router = Router();

router.post(
  '/register',
  [body('email').isEmail(), body('password').isLength({ min: 6 }), body('name').isLength({ min: 2 })],
  validate,
  register
);

router.post('/login', [body('email').isEmail(), body('password').notEmpty()], validate, login);
router.get('/me', auth, me);
router.post('/forgot-password', [body('email').isEmail()], validate, forgotPassword);

export default router;
