// src/db/repositories/authCredentials.repository.ts
import { PoolConnection } from 'mysql2/promise';

export async function createAuthCredentials(
  connection: PoolConnection,
  data: {
    user_id: number;
    secret_hash: string;
  },
): Promise<void> {
  await connection.query(
    `
    INSERT INTO auth_credentials (user_id, secret_hash)
    VALUES (?, ?)
    `,
    [data.user_id, data.secret_hash],
  );
}
