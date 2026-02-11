import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { db } from '@/lib/db';
import { RegisterSchema } from '@/schemas/register.schema';
import { BadRequestError, ConflictError } from '@/errors/client.error';
import { errorToResponse } from '@/lib/http/error-response';
import { ResultSetHeader, RowDataPacket } from 'mysql2';

/* ------------------ SQL row typings ------------------ */

interface CheckUserExistQueryRow extends RowDataPacket {
  id: number;
}

interface FetchUserTypeQueryRow extends RowDataPacket {
  id: number;
  name: string;
}

/* ------------------ Route handler ------------------ */

export async function POST(req: NextRequest) {
  let connection;

  try {
    /* ------------------ validate input ------------------ */
    const body = RegisterSchema.parse(await req.json());

    /* ------------------ check user existence ------------------ */
    const [existingUsers] = await db.execute<CheckUserExistQueryRow[]>(
      `
      SELECT id
      FROM user
      WHERE email = ?
      LIMIT 1
      `,
      [body.email],
    );

    if (existingUsers.length > 0) {
      throw new ConflictError('email invalid, please use a different email id');
    }

    /* ------------------ fetch user type ------------------ */
    const [userTypeRows] = await db.execute<FetchUserTypeQueryRow[]>(
      `
      SELECT id, name
      FROM user_type
      WHERE code = ?
      LIMIT 1
      `,
      [body.user_type],
    );

    if (userTypeRows.length === 0) {
      throw new BadRequestError('user type invalid');
    }

    const userType = {
      user_type_id: userTypeRows[0].id,
      user_type_code: body.user_type,
      user_type_name: userTypeRows[0].name,
    };

    /* ------------------ hash password ------------------ */
    const secret_hash = await bcrypt.hash(body.password, 10);

    /* ------------------ begin transaction ------------------ */
    connection = await db.getConnection();
    await connection.beginTransaction();

    /* ------------------ insert user ------------------ */
    const [userInsertResult] = await connection.execute<ResultSetHeader>(
      `
        INSERT INTO user (display_name, user_type_id, email, phone)
        VALUES (?, ?, ?, ?)
        `,
      [body.name, userType.user_type_id, body.email, body.phone ?? ''],
    );

    const userId = userInsertResult.insertId;

    /* ------------------ insert auth ------------------ */
    await connection.execute<ResultSetHeader>(
      `
      INSERT INTO auth (user_id, secret_hash)
      VALUES (?, ?)
      `,
      [userId, secret_hash],
    );

    /* ------------------ commit transaction ------------------ */
    await connection.commit();

    console.log({
      status: 'ok',
      user: {
        id: userId,
        name: body.name,
        type: userType,
        contact: {
          phone: body.phone ?? '',
          email: body.email,
        },
      },
    });

    /* ------------------ response ------------------ */
    return NextResponse.json(
      {
        status: 'ok',
        user: {
          id: userId,
          name: body.name,
          type: userType,
          contact: {
            phone: body.phone ?? '',
            email: body.email,
          },
        },
      },
      { status: 201 },
    );
  } catch (err) {
    if (connection) {
      await connection.rollback();
    }
    return errorToResponse(err);
  } finally {
    if (connection) {
      connection.release();
    }
  }
}
