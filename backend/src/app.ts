import express from 'express';
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

import errorHandler from './middlewares/error.middleware';

const app = express();

/* ---------- global middleware ---------- */
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ---------- routes ---------- */
app.use('/health', HealthRouter);
app.use('/auth', AuthRouter);
app.use('/grievances', GrievancesRouter);
app.use('/crisis', CrisisRouter);
app.use('/mti', MTIRouter);
app.use('/rpsl', RPSLRouter);

/* ---------- fallback ---------- */
app.use((_req, res) => {
  res.status(404).json({
    message: 'Route not found',
  });
});

/* ---------- error handler ---------- */
app.use(errorHandler);

export default app;
