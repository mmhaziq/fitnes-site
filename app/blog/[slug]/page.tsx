export const revalidate = 0;

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import connectDB from '@/lib/mongodb';
import Blog from '@/models/Blog';
import { format } from 'date-fns';
import { notFound } from 'next/navigation';

async function getBlog(slug: string) {
  try {
    await connectDB();
    const blog = await Blog.findOne({ slug, published: true }).lean();
    return blog;
  } catch {
    return null;
  }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const blog: any = await getBlog(params.slug);
  if (!blog) notFound();

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-28 pb-24 bg-stone-50">
        <article className="max-w-2xl mx-auto px-6">
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-stone-500 hover:text-stone-900 mb-8 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Blog
          </Link>

          {blog.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {blog.tags.map((tag: string) => (
                <span key={tag} className="text-xs px-2 py-0.5 bg-accent-muted text-accent rounded-full font-medium">
                  {tag}
                </span>
              ))}
            </div>
          )}

          <h1 className="font-display text-4xl md:text-5xl font-bold text-stone-900 leading-tight mb-4">
            {blog.title}
          </h1>

          <p className="text-stone-400 text-sm mb-8">
            {blog.publishedAt ? format(new Date(blog.publishedAt), 'MMMM d, yyyy') : ''}
          </p>

          {blog.coverImage && (
            <div className="rounded-2xl overflow-hidden mb-10 aspect-video">
              <img src={blog.coverImage} alt={blog.title} className="w-full h-full object-cover" />
            </div>
          )}

          <div
            className="tiptap-content"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </article>
      </main>
      <Footer />
    </>
  );
}
