import { NextResponse } from 'next/server';
import { AppError } from '@/errors/app.error';
import { ZodError } from 'zod';

export function errorToResponse(err: unknown): Response {
  // Zod validation errors
  if (err instanceof ZodError) {
    return NextResponse.json(
      {
        message: 'invalid request data',
        issues: err.issues,
      },
      { status: 422 },
    );
  }

  // Known / operational errors
  if (err instanceof AppError) {
    return NextResponse.json(
      { message: err.message },
      { status: err.statusCode },
    );
  }

  // Unknown / programmer errors
  console.error('[Unhandled Error]', err);

  return NextResponse.json(
    { message: 'internal server error' },
    { status: 500 },
  );
}
