import { AppError } from '../error.middleware';

/**
 * Base class for all 5xx server errors
 */
export abstract class ServerError extends AppError {
  constructor(message: string, statusCode = 500) {
    super(message, statusCode);
  }
}

/**
 * 500 – Internal Server Error
 * Use when something unexpected happens
 */
export class InternalServerError extends ServerError {
  constructor(message = 'internal server error') {
    super(message, 500);
  }
}

/**
 * 501 – Not Implemented
 * Route or feature exists but is not ready
 */
export class NotImplementedError extends ServerError {
  constructor(message = 'not implemented') {
    super(message, 501);
  }
}

/**
 * 502 – Bad Gateway
 * Upstream dependency failed
 */
export class BadGatewayError extends ServerError {
  constructor(message = 'bad gateway') {
    super(message, 502);
  }
}

/**
 * 503 – Service Unavailable
 * DB down, cache unavailable, maintenance mode
 */
export class ServiceUnavailableError extends ServerError {
  constructor(message = 'service unavailable') {
    super(message, 503);
  }
}

/**
 * 504 – Gateway Timeout
 * Upstream service did not respond in time
 */
export class GatewayTimeoutError extends ServerError {
  constructor(message = 'gateway timeout') {
    super(message, 504);
  }
}
