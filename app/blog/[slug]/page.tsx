export const revalidate = 0;

import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import connectDB from '@/lib/mongodb';
import Blog from '@/models/Blog';
import { format } from 'date-fns';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  try {
    await connectDB();
    const blog: any = await Blog.findOne({ slug: params.slug, published: true }).lean();
    if (!blog) return {};
    return {
      title: blog.title,
      description: blog.excerpt || blog.title,
      openGraph: { title: blog.title, description: blog.excerpt, images: blog.coverImage ? [blog.coverImage] : [] },
    };
  } catch {
    return {};
  }
}

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
      <main className="min-h-screen bg-stone-950">
        {/* Hero */}
        <div className="pt-28 pb-0 border-b border-stone-800">
          <div className="max-w-7xl mx-auto px-8">
            <Link href="/blog" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-stone-500 hover:text-accent mb-10 transition-colors cursor-pointer">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              All Posts
            </Link>

            <div className="grid md:grid-cols-2 gap-12 items-end pb-14">
              <div>
                {blog.tags?.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {blog.tags.map((tag: string) => (
                      <span key={tag} className="text-[10px] border border-accent/40 text-accent px-2.5 py-0.5 font-bold uppercase tracking-widest">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <h1 className="font-display font-bold uppercase text-white mb-6" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', lineHeight: '1.02', letterSpacing: '-0.02em' }}>
                  {blog.title}
                </h1>

                <p className="text-xs text-stone-600 uppercase tracking-[0.2em]">
                  {blog.publishedAt ? format(new Date(blog.publishedAt), 'MMMM d, yyyy') : ''}
                </p>
              </div>

              {blog.excerpt && (
                <p className="text-stone-400 text-base font-light leading-relaxed border-l-2 border-accent pl-6">
                  {blog.excerpt}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Cover image */}
        {blog.coverImage && (
          <div className="max-w-7xl mx-auto px-8 py-10">
            <div className="w-full aspect-video overflow-hidden">
              <img src={blog.coverImage} alt={blog.title} className="w-full h-full object-cover" />
            </div>
          </div>
        )}

        {/* Content */}
        <div className="max-w-7xl mx-auto px-8 pb-24">
          <div className="max-w-2xl">
            <div
              className="prose prose-invert prose-stone max-w-none prose-headings:font-display prose-headings:uppercase prose-headings:text-white prose-headings:tracking-tight prose-p:text-stone-300 prose-p:leading-relaxed prose-a:text-accent prose-strong:text-white prose-li:text-stone-300 prose-blockquote:border-accent prose-blockquote:text-stone-400"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          </div>
        </div>

        {/* Bottom nav */}
        <div className="border-t border-stone-800 py-8">
          <div className="max-w-7xl mx-auto px-8">
            <Link href="/blog" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-stone-500 hover:text-accent transition-colors cursor-pointer">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to All Posts
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
