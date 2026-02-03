import { Router } from 'express';
import type { Request, Response } from 'express';

const router = Router();

router.get('/', (_req, res) => {
  res.status(200).send('you have reached the rpsl endpoint');
});

export default router;
