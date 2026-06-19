import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import connectDB from '@/lib/mongodb';
import Package from '@/models/Package';

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const pkg = await Package.findById(params.id);
    if (!pkg) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(pkg);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch package' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    await connectDB();
    const body = await req.json();
    const pkg = await Package.findByIdAndUpdate(params.id, body, { new: true, runValidators: true });
    if (!pkg) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(pkg);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    await connectDB();
    await Package.findByIdAndDelete(params.id);
    return NextResponse.json({ message: 'Deleted' });
  } catch {
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
  }
}
