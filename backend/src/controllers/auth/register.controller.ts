import { Request, Response, NextFunction } from 'express';

export async function registerController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    return res.status(200).json({
      success: true,
      data: null,
    });
  } catch (error) {
    next(error);
  }
}
