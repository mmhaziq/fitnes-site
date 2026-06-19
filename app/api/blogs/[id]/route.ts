import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';


import connectDB from '@/lib/mongodb';
import Blog from '@/models/Blog';
import slugify from 'slugify';

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const blog = await Blog.findOne({
      $or: [{ _id: params.id.length === 24 ? params.id : null }, { slug: params.id }],
    });
    if (!blog) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(blog);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch blog' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    await connectDB();
    const body = await req.json();
    if (body.title) body.slug = slugify(body.title, { lower: true, strict: true });
    if (body.published && !body.publishedAt) body.publishedAt = new Date();

    const blog = await Blog.findByIdAndUpdate(params.id, body, { new: true, runValidators: true });
    if (!blog) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(blog);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    await connectDB();
    await Blog.findByIdAndDelete(params.id);
    return NextResponse.json({ message: 'Deleted' });
  } catch {
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
  }
}
