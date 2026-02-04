/**
 * * ERROR HANDLING MIDDLEWARE
 * * ------------------------------------------------------------------------------
 * * An Error System Must Have
 * *
 * * -- What Happened?
 * * -- Is this client's fault or ours? (HTTP status)
 * * -- Is it safe to show this message to clients? (security)
 * * -- Can the app keep running? (operational vs programmer error)
 */

import type { Request, Response, NextFunction } from 'express';

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain
    Error.captureStackTrace(this); // capture stack trace
  }
}

export class ValidationError extends AppError {
  constructor(message = 'invalid request data') {
    super(message, 400);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = 'Unauthorized') {
    super(message, 401);
  }
}

export class ConflictError extends AppError {
  constructor(message = 'resource already exists') {
    super(message, 409);
  }
}

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  // handle known / operational errors
  if (err instanceof AppError) {
    console.warn('[ AppError ] ', {
      message: err.message,
      statusCode: err.statusCode,
    });
    return res.status(err.statusCode).json({
      message: err.message,
    });
  }

  console.error('[ Unknown Error ] ', err);

  return res.status(500).json({
    message: 'internal server error',
  });
}
