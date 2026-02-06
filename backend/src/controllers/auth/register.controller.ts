import { Request, Response, NextFunction } from 'express';
import { databasePool } from '../../db/pool';
import { ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import {
  ConflictError,
  ValidationError,
} from '../../middlewares/errors/client.error';
import bcrypt from 'bcrypt';

interface UserRow extends RowDataPacket {
  id: number;
}

interface UserTypeRow extends RowDataPacket {
  id: number;
  name: string;
}

export async function registerController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { name, email, password, phone, user_type } = req.body;

  /* -------------------------------------------------- */
  /* 1. Basic validation (422)                           */
  /* -------------------------------------------------- */
  if (!name || !email || !password || !user_type) {
    return next(new ValidationError('required fields missing'));
  }

  const connection = await databasePool.getConnection();

  try {
    /* -------------------------------------------------- */
    /* 2. Check email uniqueness (409)                     */
    /* -------------------------------------------------- */
    const [existingUsers] = await connection.execute<UserRow[]>(
      `SELECT id FROM user WHERE email = ? LIMIT 1`,
      [email],
    );

    if (existingUsers.length > 0) {
      return next(new ConflictError('email already registered'));
    }

    /* -------------------------------------------------- */
    /* 3. Validate user_type (422)                         */
    /* -------------------------------------------------- */
    const [userTypes] = await connection.execute<UserTypeRow[]>(
      `SELECT id, name FROM user_type WHERE code = ? LIMIT 1`,
      [user_type],
    );

    if (!userTypes[0]) {
      return next(new ValidationError('invalid user_type'));
    }

    const { id: user_type_id, name: user_type_name } = userTypes[0];

    /* -------------------------------------------------- */
    /* 4. Transaction                                     */
    /* -------------------------------------------------- */
    const passwordHash = await bcrypt.hash(password, 10);

    await connection.beginTransaction();

    const [userInsert] = await connection.execute<ResultSetHeader>(
      `
      INSERT INTO user (display_name, email, phone, user_type_id)
      VALUES (?, ?, ?, ?)
      `,
      [name, email, phone ?? null, user_type_id],
    );

    const userId = userInsert.insertId;

    await connection.execute<ResultSetHeader>(
      `
      INSERT INTO auth (user_id, secret_hash)
      VALUES (?, ?)
      `,
      [userId, passwordHash],
    );

    await connection.commit();

    /* -------------------------------------------------- */
    /* 5. Response (201)                                   */
    /* -------------------------------------------------- */
    return res.status(201).json({
      success: true,
      data: {
        id: userId,
        name,
        email,
        phone,
        user_type,
        designation: user_type_name,
      },
    });
  } catch (error) {
    await connection.rollback();
    next(error);
  } finally {
    connection.release();
  }
}
