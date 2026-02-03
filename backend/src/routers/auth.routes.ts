import { Router } from 'express';
import type { Request, Response } from 'express';

import { AuthController } from '../controllers';

const router = Router();

router.post('/login', AuthController.login);
router.post('/logout', AuthController.logout);
router.get('/me', AuthController.me);
router.post('/refresh', AuthController.refresh);
router.post('/verify-email', AuthController.verifyEmail);
router.post('/forgot-password', AuthController.forgotPassword);
router.post('/reset-password', AuthController.resetPassword);

export default router;
