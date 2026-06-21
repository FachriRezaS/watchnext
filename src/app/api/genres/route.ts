import { NextResponse } from 'next/server';
import { apiService } from '@/lib/api-service';

export async function GET() {
  try {
    const data = await apiService.getGenres();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
