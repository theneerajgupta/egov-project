import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    await db.query('SELECT 1');
    return NextResponse.json(
      {
        status: 'ok',
        database: 'connected',
        timestamp: new Date().toISOString(),
      },
      {
        status: 200,
      },
    );
  } catch (err) {
    console.error('[ healthcheck ] db error', err);
    return NextResponse.json(
      {
        status: 'error',
        database: 'disconnected',
        timestamp: new Date().toISOString(),
      },
      {
        status: 503,
      },
    );
  }
}
