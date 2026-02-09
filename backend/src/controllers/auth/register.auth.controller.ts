import { Request, Response, NextFunction } from 'express';
import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { databasePool } from '../../db/pool';
import {
  BadRequestError,
  ConflictError,
} from '../../middlewares/errors/client.error';
import bcrypt from 'bcrypt';

interface CheckUserExistSQLRow extends RowDataPacket {
  id: string;
}

interface FetchUserTypeInfoSQLRow extends RowDataPacket {
  id: number;
  name: string;
}

export async function RegisterController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const connection = await databasePool.getConnection();

  try {
    console.log(req.body);

    const CheckUserExistSQL: string = `
      SELECT id
      FROM user
      WHERE email = ?
      LIMIT 1
    `;

    const FetchUserTypeInfoSQL: string = `
      SELECT id, name
      FROM user_type
      WHERE code = ?
      LIMIT 1
    `;

    /**---------------------------------------------------------------- */

    const [sqlResult1] = await databasePool.execute<CheckUserExistSQLRow[]>(
      CheckUserExistSQL,
      [req.body.email],
    );

    if (sqlResult1[0] ?? null !== null)
      return next(
        new ConflictError('email invalid, please use a different email id'),
      );

    const [sqlResult2] = await databasePool.execute<FetchUserTypeInfoSQLRow[]>(
      FetchUserTypeInfoSQL,
      [req.body.user_type],
    );

    if (sqlResult2.length === 0)
      return next(new BadRequestError('user type invalid'));

    const userType = {
      user_type_id: sqlResult2[0].id,
      user_type_code: req.body.user_type,
      user_type_name: sqlResult2[0].name,
    };

    const secret_hash = await bcrypt.hash(req.body.password, 10);

    await connection.beginTransaction();

    const [sqlResult3] = await connection.execute<ResultSetHeader>(
      `
        INSERT INTO user (display_name, user_type_id, email, phone)
        VALUES (?, ?, ?, ?)
      `,
      [
        req.body.name,
        userType.user_type_id,
        req.body.email,
        req.body.phone ?? '',
      ],
    );

    const userId = sqlResult3.insertId;

    const [sqlResult4] = await connection.execute<ResultSetHeader>(
      `
        INSERT INTO auth (user_id, secret_hash)
        VALUES (?, ?)  
      `,
      [userId, secret_hash],
    );

    await connection.commit();

    res.status(201).json({
      status: 'ok',
      user: {
        id: userId,
        name: req.body.name,
        type: userType,
        contact: {
          phone: req.body.phone ?? '',
          email: req.body.email,
        },
        auth: {
          password: req.body.password,
          secret_hash: secret_hash,
        },
      },
    });
  } catch (err) {
    await connection.rollback();
    console.log(err);
  } finally {
    await connection.release();
  }
}
