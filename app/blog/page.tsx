export const revalidate = 0;

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import connectDB from '@/lib/mongodb';
import Blog from '@/models/Blog';
import { format } from 'date-fns';

async function getBlogs() {
  try {
    await connectDB();
    const blogs = await Blog.find({ published: true })
      .select('-content')
      .sort({ publishedAt: -1 })
      .lean();
    return blogs;
  } catch {
    return [];
  }
}

export default async function BlogPage() {
  const blogs: any[] = await getBlogs();

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-28 pb-24 bg-stone-950">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-14">
            <span className="inline-block text-xs font-bold uppercase tracking-[0.25em] text-accent border border-accent/40 px-3 py-1 rounded-full mb-4">Blog</span>
            <h1 className="font-display text-5xl font-bold text-white mt-3">Fitness Insights</h1>
            <p className="text-stone-400 mt-3 text-lg">Training tips, nutrition guides, and mindset articles.</p>
          </div>

          {blogs.length === 0 ? (
            <div className="text-center py-24 text-stone-500">
              <p className="text-lg">No posts yet. Check back soon.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog) => (
                <Link key={blog._id.toString()} href={`/blog/${blog.slug}`} className="group block">
                  <article className="bg-stone-900 rounded-2xl overflow-hidden border border-stone-800 hover:border-accent/40 transition-all duration-200">
                    <div className="aspect-video bg-stone-800 overflow-hidden">
                      {blog.coverImage ? (
                        <img
                          src={blog.coverImage}
                          alt={blog.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-stone-800 to-stone-700" />
                      )}
                    </div>
                    <div className="p-6">
                      {blog.tags?.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-3">
                          {blog.tags.slice(0, 2).map((tag: string) => (
                            <span key={tag} className="text-xs px-2 py-0.5 bg-accent/10 text-accent rounded-full font-medium border border-accent/20">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                      <h2 className="font-display text-lg font-bold text-white mb-2 group-hover:text-accent transition-colors line-clamp-2">
                        {blog.title}
                      </h2>
                      <p className="text-stone-400 text-sm leading-relaxed line-clamp-2 mb-4">
                        {blog.excerpt}
                      </p>
                      <p className="text-xs text-stone-500">
                        {blog.publishedAt ? format(new Date(blog.publishedAt), 'MMM d, yyyy') : ''}
                      </p>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
