import bcrypt from 'bcrypt';
import { RegisterRequestType } from '../api/auth/schemas/register.schema';
import { databasePool } from '../db/pool';

import {
  findUserByEmail,
  createUser,
} from '../db/repositories/user.repositories';
import { findUserTypeByName } from '../db/repositories/userType.repositories';
import { createAuthCredentials } from '../db/repositories/authCredentials.repositories';

/**
 * * RegisterUser
 * * > check if userExists
 * * > verify user type
 * * > hash password
 * * > create a connection (to initiate a transaction)
 * * ---- begin transaction
 * * ---- createUser (query)
 * * ---- createAuthCredential (query)
 * * ---- success / rollback
 */

export async function registerUser(input: RegisterRequestType) {
  // what this service does?
  // checks if the user already exists
  // checks if the user type is correct
  // create password hash
  // create user -> transaction -> on database
  // |--- create user
  // |--- store user auth credentials

  const existingUser = await findUserByEmail(input.email);
  if (!existingUser) {
    // this will stop the application
    throw new Error('EMAIL_ALREADY_EXISTS');
  }

  const userType = await findUserTypeByName(input.user_type);
  if (!userType) {
    throw new Error('USER_TYPE_INVALID');
  }

  const passwordHash = await bcrypt.hash(input.password, 10);

  const connection = await databasePool.getConnection();

  try {
    connection.beginTransaction();
    const userId = await createUser(connection, {
      user_type_id: userType.id,
      email: input.email,
      phone: input.phone,
      display_name: input.display_name,
    });
    await createAuthCredentials(connection, {
      user_id: userType.id,
      secret_hash: passwordHash,
    });
    connection.commit();
    return {
      id: userId,
      email: input.email,
      display_name: input.display_name,
      role: userType.name,
      status: 'ACTIVE',
      created_at: new Date().toISOString(),
    };
  } catch (err) {
    connection.rollback();
    throw err;
  } finally {
    connection.release();
  }
}
