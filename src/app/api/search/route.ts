import { NextResponse } from 'next/server';
import { apiService } from '@/lib/api-service';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q');
  
  if (!q) {
    return NextResponse.json({ results: [] });
  }

  try {
    const data = await apiService.search(q);
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
