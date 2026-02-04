import { Router } from 'express';
import type { Request, Response } from 'express';
import { databasePool } from '../db/pool';

const router = Router();

router.get('/', (_req: Request, res: Response) => {
  res.status(200).json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

router.get('/database', async (_req: Request, res: Response) => {
  try {
    await databasePool.query('SELECT 1');
    res.status(200).json({
      status: 'ok',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      message: 'database connected and working',
    });
  } catch (err) {
    console.error('[ database : error ] connection failed');
    res.status(500).json({
      status: 'error',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      message: err,
    });
  }
});

export default router;
