import bcrypt from 'bcrypt';
import { RegisterRequestType } from '../api/auth/schemas/register.schema';
import { databasePool } from '../db/pool';

import {
  findUserByEmail,
  createUser,
} from '../db/repositories/user.repositories';
import { findUserTypeByName } from '../db/repositories/userType.repositories';
import { createAuthCredentials } from '../db/repositories/authCredentials.repositories';

export async function registerUser(input: RegisterRequestType) {
  // 1. Enforce email uniqueness
  const existingUser = await findUserByEmail(input.email);
  if (existingUser) {
    throw new Error('EMAIL_ALREADY_EXISTS');
  }

  // 2. Resolve user_type → id
  const userType = await findUserTypeByName(input.user_type);
  if (!userType) {
    throw new Error('INVALID_USER_TYPE');
  }

  // 3. Hash password (CPU work before DB work)
  const passwordHash = await bcrypt.hash(input.password, 10);

  // 4. Start transaction
  const connection = await databasePool.getConnection();

  try {
    await connection.beginTransaction();

    const userId = await createUser(connection, {
      user_type_id: userType.id,
      email: input.email,
      phone: input.phone,
      display_name: input.display_name,
    });

    await createAuthCredentials(connection, {
      user_id: userId,
      secret_hash: passwordHash,
    });

    await connection.commit();

    // 5. Return public-facing user DTO
    return {
      id: userId,
      email: input.email,
      display_name: input.display_name,
      role: userType.name,
      status: 'ACTIVE',
      created_at: new Date().toISOString(),
    };
  } catch (err) {
    await connection.rollback();
    throw err;
  } finally {
    connection.release();
  }
}
