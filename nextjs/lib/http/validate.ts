import { ZodType } from 'zod';
import { NextRequest, NextResponse } from 'next/server';

export async function validateBody<T>(
  req: NextRequest,
  schema: ZodType<T>,
): Promise<T | NextResponse> {
  try {
    const json = await req.json();
    return schema.parse(json);
  } catch (err: any) {
    return NextResponse.json(
      {
        error: 'VALIDATION_ERROR',
        issues: err?.errors ?? 'Invalid request body',
      },
      { status: 400 },
    );
  }
}
