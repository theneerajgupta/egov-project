import express from 'express';
import cors from 'cors';

import healthRoute from './routes/health.route';
import { errorHandler } from './middlewares/error.middleware';

const app = express();

/* ---------- global middleware ---------- */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ---------- routes ---------- */
app.use('/health', healthRoute);

/* ---------- fallback ---------- */
app.use((req, res) => {
  res.status(404).json({
    message: 'Route not found',
  });
});

/* ---------- error handler ---------- */
app.use(errorHandler);

export default app;
