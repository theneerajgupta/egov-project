// src/db/repositories/userType.repository.ts
import { RowDataPacket } from 'mysql2';
import { databasePool } from '../pool';

interface UserTypeRow extends RowDataPacket {
  id: number;
  name: string;
}

export async function findUserTypeByName(
  user_type: string,
): Promise<UserTypeRow | null> {
  const sql = `
    SELECT ut.id, ut.name
    FROM user_type ut
    WHERE ut.name = ?
    LIMIT 1
  `;
  const [rows] = await databasePool.execute<UserTypeRow[]>(sql, [user_type]);
  return rows[0] ?? null;
}
