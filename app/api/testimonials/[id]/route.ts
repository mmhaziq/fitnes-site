import { NextRequest, NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
import { getToken } from 'next-auth/jwt';
import connectDB from '@/lib/mongodb';
import Testimonial from '@/models/Testimonial';

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    await connectDB();
    const body = await req.json();
    const t = await Testimonial.findByIdAndUpdate(params.id, body, { new: true });
    if (!t) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(t);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    await connectDB();
    await Testimonial.findByIdAndDelete(params.id);
    return NextResponse.json({ message: 'Deleted' });
  } catch {
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
  }
}
