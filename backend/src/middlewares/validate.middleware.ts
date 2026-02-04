// src/api/middlewares/validate.ts
import { Request, Response, NextFunction } from 'express';
import { ZodType } from 'zod';

export function validateBody<T>(schema: ZodType<T>) {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      const parsed = schema.parse(req.body);
      req.body = parsed; // parsed === TOutput
      next();
    } catch (err) {
      next(err);
    }
  };
}
