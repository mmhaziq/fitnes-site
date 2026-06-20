import { NextRequest, NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
import { getToken } from 'next-auth/jwt';
import connectDB from '@/lib/mongodb';
import Contact from '@/models/Contact';

export async function GET(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    await connectDB();
    const contacts = await Contact.find().sort({ createdAt: -1 });
    return NextResponse.json(contacts);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const contact = await Contact.create(body);
    return NextResponse.json(contact, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
