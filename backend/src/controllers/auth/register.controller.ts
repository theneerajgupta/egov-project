import { Request, Response, NextFunction } from 'express';
import { registerUser } from '../../services/register.service';

export async function registerController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const result = await registerUser(req.body);
    return res.status(201).json({
      user: result,
    });
  } catch (error) {
    next(error); // centralized error handler
  }
}
