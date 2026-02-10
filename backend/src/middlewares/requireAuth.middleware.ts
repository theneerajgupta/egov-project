import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';
import { UnauthorizedError } from './errors/client.error';
import { AccessTokenPayload } from '../types/jwt';

export function requireAuth(req: Request, _res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new UnauthorizedError('missing access token'));
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(
      token,
      config.jwt_access.secret,
    ) as AccessTokenPayload;

    req.user = decoded;
    next();
  } catch {
    return next(new UnauthorizedError('invalid or expired access token'));
  }
}
