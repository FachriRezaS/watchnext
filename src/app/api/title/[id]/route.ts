import { NextResponse } from 'next/server';
import { apiService } from '@/lib/api-service';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const data = await apiService.getTitleDetails(params.id);
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
