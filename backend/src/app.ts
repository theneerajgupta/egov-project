import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

import { errorHandler, AppError } from './middlewares/error.middleware';

import { requireAuth } from './middlewares/requireAuth.middleware';

const app = express();

import { databasePool } from './db/pool';
import { AuthRouter, HealthRouter } from './routers';

/* ---------- global middleware ---------- */
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

/* ---------- routes ---------- */
app.use('/health', requireAuth, HealthRouter);
app.use('/auth', AuthRouter);
app.use('/api', (_req, res) => {
  res.status(200).json({ message: 'api under development' });
});

app.get('/', async (req, res) => {
  const [rows] = await databasePool.query('SELECT * FROM egov_db.user');
  console.log(rows);
  await databasePool.end();
  res.status(200).json(rows);
});

/* ---------- fallback ---------- */
app.use((_req: Request, _res: Response, next: NextFunction) => {
  next(new AppError('Route not found', 404));
});

/* ---------- error handler ---------- */
app.use(errorHandler);

export default app;
