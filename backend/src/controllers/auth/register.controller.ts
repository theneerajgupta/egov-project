import { Request, Response, NextFunction } from 'express';
import { RegisterUser } from '../../services/auth/register.service';

export async function registerController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const result = RegisterUser(req.body);

  try {
    return res.status(200).json({
      success: true,
      data: {
        id: result,
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        user_type: req.body.user_type,
      },
    });
  } catch (error) {
    next(error);
  }
}
