import { Request, Response, NextFunction } from 'express';
import { UnauthorizedError } from '../../middlewares/errors/client.error';
import jwt from 'jsonwebtoken';
import config from '../../config';
import { AccessTokenPayload } from '../../types/jwt';
import { signAccessToken, signRefreshToken } from '../../utils/jwt';

export function RefreshTokenController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const refreshToken = req.cookies?.refresh_token;

    if (!refreshToken)
      return next(new UnauthorizedError('missing refresh token'));

    const decoded = jwt.verify(
      refreshToken,
      config.jwt_refresh.secret,
    ) as AccessTokenPayload;

    const newAccessToken = signAccessToken({
      userId: decoded.userId,
      userType: decoded.userType,
    });

    const newRefreshToken = signRefreshToken({
      userId: decoded.userId,
      userType: decoded.userType,
    });

    res.cookie('refresh_token', newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/auth/refresh',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      status: 'ok',
      accessToken: newAccessToken,
    });
  } catch (err) {
    return next(new UnauthorizedError('invalid or expired refresh token'));
  }
}
