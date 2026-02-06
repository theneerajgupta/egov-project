import { registerController } from './register.controller';
import { loginController } from './login.controller';
import { logoutController } from './logout.controller';
import { meController } from './me.controller';
import { refreshController } from './refresh.controller';
import { validateController } from './validate.controller';
import { forgotPasswordController } from './forgotPassword.controller';
import { resetPasswordController } from './resetPassword.controller';

export const AuthController = {
  register: registerController,
  login: loginController,
  logout: logoutController,
  me: meController,
  refresh: refreshController,
  validate: validateController,
  forgotPassword: forgotPasswordController,
  resetPassword: resetPasswordController,
};
