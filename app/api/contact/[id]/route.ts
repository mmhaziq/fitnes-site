import { NextRequest, NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
import { getToken } from 'next-auth/jwt';
import connectDB from '@/lib/mongodb';
import Contact from '@/models/Contact';

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    await connectDB();
    const body = await req.json();
    const contact = await Contact.findByIdAndUpdate(params.id, body, { new: true });
    return NextResponse.json(contact);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    await connectDB();
    await Contact.findByIdAndDelete(params.id);
    return NextResponse.json({ message: 'Deleted' });
  } catch {
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
  }
}
