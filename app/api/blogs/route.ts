import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import Blog from '@/models/Blog';
import slugify from 'slugify';

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const adminView = searchParams.get('admin') === '1';

    const filter = adminView ? {} : { published: true };
    const blogs = await Blog.find(filter)
      .select('-content')
      .sort({ publishedAt: -1, createdAt: -1 });

    return NextResponse.json(blogs);
  } catch (err) {
    return NextResponse.json({ error: 'Failed to fetch blogs' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    await connectDB();
    const body = await req.json();
    const slug = slugify(body.title, { lower: true, strict: true });

    const blog = await Blog.create({
      ...body,
      slug,
      publishedAt: body.published ? new Date() : undefined,
    });

    return NextResponse.json(blog, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
