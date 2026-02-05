// src/db/repositories/authCredentials.repository.ts
import { PoolConnection } from 'mysql2/promise';

export async function createAuthCredentials(
  connection: PoolConnection,
  payload: {
    user_id: number;
    secret_hash: string;
  },
): Promise<void> {
  const sql = `
    INSERT INTO auth_credentials (user_id, secret_hash)
    VALUES (?, ?)
  `;
  await connection.execute(sql, [payload.user_id, payload.secret_hash]);
}
