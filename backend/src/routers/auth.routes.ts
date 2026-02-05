import { Router } from 'express';

import { AuthController } from '../controllers';
import { validateBody } from '../middlewares/validate.middleware';
import { RegisterRequestSchema } from '../api/auth/schemas/register.schema';

const router = Router();

router.post(
  '/register',
  validateBody(RegisterRequestSchema),
  AuthController.register,
);

router.post('/login', AuthController.login);
router.post('/logout', AuthController.logout);
router.get('/me', AuthController.me);
router.post('/refresh', AuthController.refresh);
router.post('/verify-email', AuthController.verifyEmail);
router.post('/forgot-password', AuthController.forgotPassword);
router.post('/reset-password', AuthController.resetPassword);

export default router;
