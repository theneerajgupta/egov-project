import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import morgan from 'morgan';

import {
  HealthRouter,
  AuthRouter,
  GrievancesRouter,
  CrisisRouter,
  MTIRouter,
  RPSLRouter,
} from './routers';

import { errorHandler, AppError } from './middlewares/error.middleware';

const app = express();

import { databasePool } from './db/pool';

/* ---------- global middleware ---------- */
app.use(cors());
// app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ---------- routes ---------- */
app.use('/health', HealthRouter);
app.use('/auth', AuthRouter);
app.use('/grievances', GrievancesRouter);
app.use('/crisis', CrisisRouter);
app.use('/mti', MTIRouter);
app.use('/rpsl', RPSLRouter);

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
