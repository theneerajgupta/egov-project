import { AppError } from './app.error';

export class BadRequestError extends AppError {
  constructor(message = 'bad request') {
    super(message, 400);
  }
}

export class ConflictError extends AppError {
  constructor(message = 'resource already exists') {
    super(message, 409);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = 'unauthorized') {
    super(message, 401);
  }
}

export class ForbiddenError extends AppError {
  constructor(message = 'forbidden') {
    super(message, 403);
  }
}

export class NotFoundError extends AppError {
  constructor(message = 'not found') {
    super(message, 404);
  }
}
