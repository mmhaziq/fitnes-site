import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import connectDB from '@/lib/mongodb';
import Bio from '@/models/Bio';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await connectDB();
    const bio = await Bio.findOne();
    if (!bio) return NextResponse.json({ error: 'Bio not found' }, { status: 404 });
    return NextResponse.json(bio);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch bio' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    await connectDB();
    const body = await req.json();
    const bio = await Bio.findOneAndUpdate({}, body, { new: true, upsert: true, runValidators: true });
    return NextResponse.json(bio);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
