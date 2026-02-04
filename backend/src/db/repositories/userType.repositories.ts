// src/db/repositories/userType.repository.ts
import { RowDataPacket } from 'mysql2';
import { databasePool } from '../pool';

export interface UserTypeRow extends RowDataPacket {
  id: number;
  name: string;
}

export async function findUserTypeByName(
  name: string,
): Promise<UserTypeRow | null> {
  const [rows] = await databasePool.query<UserTypeRow[]>(
    `
    SELECT id, name
    FROM user_type
    WHERE name = ?
    LIMIT 1
    `,
    [name],
  );

  return rows[0] ?? null;
}
