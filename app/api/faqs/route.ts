import { NextRequest, NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
import { getToken } from 'next-auth/jwt';
import connectDB from '@/lib/mongodb';
import Faq from '@/models/Faq';

export async function GET() {
  try {
    await connectDB();
    const faqs = await Faq.find({ active: true }).sort({ order: 1 });
    return NextResponse.json(faqs);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    await connectDB();
    const body = await req.json();
    const faq = await Faq.create(body);
    return NextResponse.json(faq, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
