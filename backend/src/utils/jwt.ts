import jwt, { SignOptions } from 'jsonwebtoken';
import config from '../config';
import { AccessTokenPayload } from '../types/jwt';

export function signAccessToken(payload: AccessTokenPayload) {
  const options: SignOptions = {
    expiresIn: config.jwt_access.expires_in,
  };

  return jwt.sign(payload, config.jwt_access.secret, options);
}

export function signRefreshToken(payload: AccessTokenPayload) {
  const options: SignOptions = {
    expiresIn: config.jwt_refresh.expires_in,
  };

  return jwt.sign(payload, config.jwt_refresh.secret, options);
}
