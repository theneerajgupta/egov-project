import { Router } from 'express';

import { AuthController } from '../controllers';
import { validate } from '../middlewares/validate.middleware';
import { RegisterReqSchema } from '../api/auth/schemas/register.schema';

const router = Router();

router.post('/register', validate(RegisterReqSchema), AuthController.register);
router.post('/login', AuthController.login);
router.post('/refresh', AuthController.refreshToken);

export default router;
