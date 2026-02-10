import { RegisterController } from './register.auth.controller';
import { LoginController } from './login.auth.controller';
import { RefreshTokenController } from './refreshToken.auth.controller';

export const AuthController = {
  register: RegisterController,
  login: LoginController,
  refreshToken: RefreshTokenController,
};
