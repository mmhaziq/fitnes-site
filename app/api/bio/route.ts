import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import Bio from '@/models/Bio';

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
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    await connectDB();
    const body = await req.json();
    const bio = await Bio.findOneAndUpdate({}, body, { new: true, upsert: true, runValidators: true });
    return NextResponse.json(bio);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
