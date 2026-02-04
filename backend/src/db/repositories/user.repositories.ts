// src/db/repositories/user.repository.ts
import { PoolConnection, ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import { databasePool } from '../pool';

/**
 * Row shape for SELECT queries on `user`
 */
interface UserIdRow extends RowDataPacket {
  id: number;
}

/**
 * Find a user by email (read-only, no transaction)
 */
export async function findUserByEmail(
  email: string,
): Promise<UserIdRow | null> {
  const [rows] = await databasePool.query<UserIdRow[]>(
    `
    SELECT id
    FROM user
    WHERE email = ?
    LIMIT 1
    `,
    [email],
  );

  return rows[0] ?? null;
}

/**
 * Create a user (must participate in a transaction)
 */
export async function createUser(
  connection: PoolConnection,
  data: {
    user_type_id: number;
    email: string;
    phone?: string;
    display_name: string;
  },
): Promise<number> {
  const [result] = await connection.query<ResultSetHeader>(
    `
    INSERT INTO user (user_type_id, email, phone, display_name)
    VALUES (?, ?, ?, ?)
    `,
    [data.user_type_id, data.email, data.phone ?? null, data.display_name],
  );

  return result.insertId;
}
