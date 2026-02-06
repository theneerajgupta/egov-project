import { RegisterRequestType } from '../../api/auth/schemas/register.schema';

export async function RegisterUser(
  payload: RegisterRequestType,
): Promise<number | null> {
  // check if user exists ----------- error 409
  // check if user type is valid ---- error 422
  // check password strength -------- error 422

  // perform transaction ------------
  // 1. insert into user table -> get user id
  // 2. insert into auth table

  return null;
}

/**
 * * TESTS
 * * 401 - invalid credentials
 * * 403 - account disbaled
 */
