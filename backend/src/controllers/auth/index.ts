import { loginController } from './login.controller';
import { logoutController } from './logout.controller';
import { meController } from './me.controller';
import { refreshController } from './refresh.controller';
import { verifyEmailController } from './verifyEmail.controller';
import { forgotPasswordController } from './forgotPassword.controller';
import { resetPasswordController } from './resetPassword.controller';

export const AuthController = {
  login: loginController,
  logout: logoutController,
  me: meController,
  refresh: refreshController,
  verifyEmail: verifyEmailController,
  forgotPassword: forgotPasswordController,
  resetPassword: resetPasswordController,
};
