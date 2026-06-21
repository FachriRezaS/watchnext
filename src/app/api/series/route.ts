import { NextResponse } from 'next/server';
import { apiService } from '@/lib/api-service';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get('page') || '1';
  const genres = searchParams.get('genres');
  const source_ids = searchParams.get('source_ids');
  
  const query: Record<string, string> = {
    limit: '20',
    page,
  };

  if (genres) query.genres = genres;
  if (source_ids) query.source_ids = source_ids;

  try {
    const data = await apiService.getSeries(query);
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
