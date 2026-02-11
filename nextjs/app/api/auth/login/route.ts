import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { db } from '@/lib/db';
import { AuthLoginSchema } from '@/schemas/auth/login.auth.schema';
import { UnauthorizedError } from '@/errors/client.error';
import { errorToResponse } from '@/lib/http/error-response';
import { ResultSetHeader, RowDataPacket } from 'mysql2';

interface FetchUserRow extends RowDataPacket {
  id: number;
  display_name: string;
  email: string;
  phone: string | null;
  status: 'ACTIVE' | 'DISABLED' | 'DELETED';
  created_at: Date;
  updated_at: Date;
  user_type_code: string;
  user_type_name: string;
  secret_hash: string;
}

export async function POST(req: NextRequest) {
  let connection;

  try {
    const body = AuthLoginSchema.parse(await req.json());

    const forwardedFor = req.headers.get('x-forwarded-for');
    const ip = forwardedFor?.split(',')[0] ?? 'unknown';

    const fetchUserSQL = `
      SELECT 
        u.id,
        u.display_name,
        u.email,
        u.phone,
        u.status,
        u.created_at,
        u.updated_at,
        ut.code AS user_type_code,
        ut.name AS user_type_name,
        a.secret_hash
      FROM user u
      JOIN user_type ut ON u.user_type_id = ut.id
      JOIN auth a ON u.id = a.user_id
      WHERE u.email = ?
      LIMIT 1
    `;

    const insertLogSQL = `
      INSERT INTO login_logs (
        user_id,
        ip_address,
        attempted_email,
        success,
        failure_reason
      )
      VALUES (?, ?, ?, ?, ?)
    `;

    const [rows] = await db.execute<FetchUserRow[]>(fetchUserSQL, [body.email]);

    const user = rows.length > 0 ? rows[0] : null;

    let isSuccessful = false;
    let failureReason: string | null = null;

    // ----------------------------
    // Authentication Logic
    // ----------------------------

    if (!user) {
      failureReason = 'invalid credentials';
    } else if (user.status !== 'ACTIVE') {
      // Do not leak internal state
      failureReason = 'invalid credentials';
    } else {
      const passwordValid = await bcrypt.compare(
        body.password,
        user.secret_hash,
      );

      if (!passwordValid) {
        failureReason = 'invalid credentials';
      } else {
        isSuccessful = true;
      }
    }

    // ----------------------------
    // Log Attempt (Always)
    // ----------------------------

    connection = await db.getConnection();

    const [logResult] = await connection.execute<ResultSetHeader>(
      insertLogSQL,
      [user?.id ?? null, ip, body.email, isSuccessful, failureReason],
    );

    // ----------------------------
    // Fail Response
    // ----------------------------

    if (!isSuccessful) {
      throw new UnauthorizedError('invalid credentials');
    }

    // ----------------------------
    // Safe User Object (no hash)
    // ----------------------------

    const { secret_hash, ...safeUser } = user!;

    return NextResponse.json(
      {
        user: safeUser,
        login_logged_at: logResult.insertId,
      },
      { status: 200 },
    );
  } catch (err) {
    return errorToResponse(err);
  } finally {
    if (connection) await connection.release();
  }
}
