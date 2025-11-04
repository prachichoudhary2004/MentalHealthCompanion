import { Router } from 'express';
import { body, param } from 'express-validator';
import { auth } from '../middlewares/auth.js';
import { createMood, getMoods, deleteMood } from '../controllers/moodController.js';
import { validate } from '../middlewares/validate.js';

const router = Router();

router.post(
  '/',
  auth,
  [body('score').isInt({ min: 1, max: 10 }), body('note').optional().isString().isLength({ max: 500 })],
  validate,
  createMood
);

router.get('/', auth, getMoods);
router.delete('/:id', auth, [param('id').isMongoId()], validate, deleteMood);

export default router;
