import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';

export const revalidate = 0;

export async function GET() {
  try {
    await connectDB();
    return NextResponse.json({ ok: true, ts: new Date().toISOString() });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e.message }, { status: 503 });
  }
}
