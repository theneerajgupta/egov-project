import { AppError } from '../error.middleware';

/**
 * Base class for all 4xx client errors
 * (optional, but useful for grouping / instanceof checks later)
 */
export abstract class ClientError extends AppError {
  constructor(message: string, statusCode: number) {
    super(message, statusCode);
  }
}

/**
 * 400 – Bad Request
 */
export class BadRequestError extends ClientError {
  constructor(message = 'bad request') {
    super(message, 400);
  }
}

/**
 * 401 – Unauthorized
 */
export class UnauthorizedError extends ClientError {
  constructor(message = 'unauthorized') {
    super(message, 401);
  }
}

/**
 * 403 – Forbidden
 */
export class ForbiddenError extends ClientError {
  constructor(message = 'forbidden') {
    super(message, 403);
  }
}

/**
 * 404 – Not Found
 */
export class NotFoundError extends ClientError {
  constructor(message = 'resource not found') {
    super(message, 404);
  }
}

/**
 * 409 – Conflict
 */
export class ConflictError extends ClientError {
  constructor(message = 'resource already exists') {
    super(message, 409);
  }
}

/**
 * 422 – Unprocessable Entity
 * (great fit for validation errors like Zod)
 */
export class ValidationError extends ClientError {
  constructor(message = 'invalid request data') {
    super(message, 422);
  }
}

/**
 * 429 – Too Many Requests
 */
export class TooManyRequestsError extends ClientError {
  constructor(message = 'too many requests') {
    super(message, 429);
  }
}
