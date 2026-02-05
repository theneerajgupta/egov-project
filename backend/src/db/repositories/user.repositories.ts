import { RowDataPacket, PoolConnection, ResultSetHeader } from 'mysql2/promise';
import { databasePool } from '../pool';

interface UserIdRow extends RowDataPacket {
  id: number;
}

export async function findUserByEmail(
  email: string,
): Promise<UserIdRow | null> {
  const sql = `
    SELECT u.id
    FROM user AS u
    WHERE u.email = ?
    LIMIT 1
  `;
  const [rows] = await databasePool.execute<UserIdRow[]>(sql, [email]);
  return rows[0] ?? null;
}

export async function createUser(
  connection: PoolConnection,
  payload: {
    user_type_id: number;
    email: string;
    phone?: string;
    display_name: string;
  },
): Promise<number> {
  const sql: string = `
    INSERT INTO user (user_type_id, email, phone, display)
    VALUES (?, ?, ?, ?)
  `;
  const [result] = await connection.execute<ResultSetHeader>(sql, [
    payload.user_type_id,
    payload.email,
    payload.phone ?? null,
    payload.display_name,
  ]);
  return result.insertId;
}
