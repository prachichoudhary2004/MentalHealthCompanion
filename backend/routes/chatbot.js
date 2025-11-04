import { Router } from 'express';
import { body } from 'express-validator';
import { chat } from '../controllers/chatbotController.js';
import { validate } from '../middlewares/validate.js';

const router = Router();

router.post('/', [body('message').isString().isLength({ min: 1 })], validate, chat);

export default router;
