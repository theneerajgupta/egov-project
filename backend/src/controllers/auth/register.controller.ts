import { Request, Response, NextFunction } from 'express';
import { databasePool } from '../../db/pool';
import { ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import {
  ConflictError,
  ValidationError,
} from '../../middlewares/errors/client.error';
import bcrypt from 'bcrypt';

// import jwt from 'jsonwebtoken';

interface sqlUserRow extends RowDataPacket {
  id: number;
}

interface sqlUserTableRow extends RowDataPacket {
  id: number;
  name: string;
}

export async function registerController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const connection = await databasePool.getConnection();

  const sql1 = `SELECT id FROM user WHERE email = ? LIMIT 1`;
  const sql2 = `SELECT id, name FROM user_type WHERE code = ? LIMIT 1`;
  const sql3 = `
    INSERT INTO user (display_name, email, phone, user_type_id)
    VALUES (?, ?, ?, ?)
  `;
  const sql4 = `
    INSERT INTO auth (user_id, secret_hash)
    VALUES (?, ?)
  `;

  try {
    const [rows1] = await databasePool.execute<sqlUserRow[]>(sql1, [
      req.body.email,
    ]);

    if (rows1.length !== 0) throw new ConflictError('Email ID Taken');

    console.log(req.body.email, rows1[0]);

    const secret_hash: string = await bcrypt.hash(req.body.password, 10);
    console.log({
      inputPassword: req.body.password,
      passwordHash: secret_hash,
    });

    const [rows2] = await databasePool.execute<sqlUserTableRow[]>(sql2, [
      req.body.user_type,
    ]);

    if (rows2.length === 0) throw new ValidationError('User Type Invalid');

    const userType = {
      id: rows2[0].id,
      code: req.body.user_type,
      name: rows2[0].name,
    };

    await connection.beginTransaction();

    const [rows3] = await connection.execute<ResultSetHeader>(sql3, [
      req.body.name,
      req.body.email,
      req.body.phone ?? null,
      userType.id,
    ]);

    const userId = rows3.insertId;

    const [rows4] = await connection.execute<ResultSetHeader>(sql4, [
      userId,
      secret_hash,
    ]);

    await connection.commit();

    // const access_token = jwt.sign(
    //   {
    //     sub: userId,
    //     email: req.body.email,
    //     user_type: userType.code,
    //   },
    //   'f046e977c08dfd94e734136c95735a5aa67718871cae67e6ec7bc9924994f244be188504e8a91394b88258d5ff32d470f455f8718a529842a2d8a46655274fc5',
    //   {
    //     expiresIn: '15m',
    //   },
    // );

    // res.cookie('access_token', access_token, {
    //   httpOnly: true,
    //   secure: true,
    //   sameSite: 'strict',
    //   maxAge: 15 * 60 * 1000,
    // });

    // connection.commit();
    return res.status(200).json({
      success: true,
      user: {
        id: userId,
        display_name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        user_type_id: userType.id,
      },
      auth: {
        user_id: userId,
        secret_hash: secret_hash,
      },
    });
  } catch (error) {
    await connection.rollback();
    next(error); // centralized error handler
  } finally {
    await connection.release();
  }
}
