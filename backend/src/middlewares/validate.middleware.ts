// src/api/middlewares/validate.ts
import { Request, Response, NextFunction } from 'express';
import { ZodError, ZodType } from 'zod';
import { BadRequestError } from './errors/client.error';

export function validate<T>(schema: ZodType<T>) {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      const parsed = schema.parse(req.body);
      req.body = parsed; // parsed === TOutput
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        const message = err.issues[0].message ?? 'invalid request body';
        return next(new BadRequestError(message));
      }
      next(err);
    }
  };
}
