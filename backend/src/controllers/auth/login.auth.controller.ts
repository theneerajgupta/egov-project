import { Request, Response, NextFunction } from 'express';
import { RowDataPacket } from 'mysql2/promise';
import { databasePool } from '../../db/pool';
import {
  ConflictError,
  ForbiddenError,
  UnauthorizedError,
} from '../../middlewares/errors/client.error';
import bcrypt from 'bcrypt';
import { signAccessToken, signRefreshToken } from '../../utils/jwt';

interface CheckUserExistSQLRow extends RowDataPacket {
  id: number;
  display_name: string;
  phone?: string;
  user_type_id: number;
  user_type_code: string;
  user_type_name: string;
}

interface FetchSecretHashSQLRow extends RowDataPacket {
  secret_hash: string;
}

export async function LoginController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const CheckUserExistSQL: string = `
      SELECT 
        u.id, 
        u.display_name, 
        u.phone, 
        u.user_type_id, 
        ut.code AS user_type_code, 
        ut.name AS user_type_name
      FROM user AS u
      INNER JOIN user_type AS ut ON u.user_type_id = ut.id
      WHERE u.email = ?
      LIMIT 1
    `;

    const [sqlResult1] = await databasePool.execute<CheckUserExistSQLRow[]>(
      CheckUserExistSQL,
      [req.body.email],
    );

    const FetchSecretHashSQL = `
      SELECT secret_hash
      FROM auth
      WHERE user_id = ?
      LIMIT 1;
    `;

    if (sqlResult1.length === 0)
      return next(
        new ConflictError('email not found, please try another email id'),
      );

    const [sqlResult2] = await databasePool.execute<FetchSecretHashSQLRow[]>(
      FetchSecretHashSQL,
      [sqlResult1[0].id],
    );

    if (sqlResult2.length === 0)
      return next(new ForbiddenError('error in auth table'));

    const validationCheck = await bcrypt.compare(
      req.body.password,
      sqlResult2[0].secret_hash,
    );

    if (validationCheck === false)
      return next(new UnauthorizedError('invalid credentials, yeet'));
    else {
      const accessToken = signAccessToken({
        userId: sqlResult1[0].id,
        userType: sqlResult1[0].user_type_code,
      });

      const refreshToken = signRefreshToken({
        userId: sqlResult1[0].id,
        userType: sqlResult1[0].user_type_code,
      });

      res
        .cookie('refresh_token', refreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          path: '/auth/refresh',
          maxAge: 7 * 24 * 60 * 60 * 1000,
        })
        .status(200)
        .json({
          status: 'ok',
          user: sqlResult1[0],
          auth: {
            providedPassword: req.body.password,
            secret_hash: sqlResult2[0].secret_hash,
            validation: validationCheck,
          },
          tokens: {
            access: accessToken,
            refresh: refreshToken,
          },
        });
    }
  } catch (err) {
    console.error(err);
  } finally {
  }
}
