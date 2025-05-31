import { NextResponse } from 'next/server';
import { fetchProfessionals } from '@/lib/api';

export async function GET() {
  const result = await fetchProfessionals();

  return result.match(
    (data) => NextResponse.json(data),
    (error) => NextResponse.json(
      { error: error.message },
      { status: error.message.includes('Bearer token') ? 401 : 500 }
    )
  );
} 