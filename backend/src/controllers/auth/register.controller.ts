import { Request, Response, NextFunction } from 'express';

export async function registerController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.log('[ controller ] login controller : auth router');

  try {
    // 1. validate input
    // 2. call service / business logic
    // 3. return response

    return res.status(200).json({
      success: true,
      data: 'you have reached register endpoint',
    });
  } catch (error) {
    next(error); // centralized error handler
  }
}
