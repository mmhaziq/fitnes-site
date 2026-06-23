export const revalidate = 0;
export const metadata = {
  title: 'Blog',
  description: 'Training tips, nutrition guides, and mindset articles from Pump & Burn.',
};

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
  const [featured, ...rest] = blogs;

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-stone-950">
        {/* Header */}
        <div className="pt-32 pb-16 border-b border-stone-800 relative">
          <div className="absolute left-0 top-0 w-1 h-full bg-accent" />
          <div className="max-w-7xl mx-auto px-8">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent mb-4 flex items-center gap-3">
              <span className="block w-8 h-px bg-accent" /> Blog
            </p>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <h1 className="font-display font-bold uppercase text-white" style={{ fontSize: 'clamp(3rem, 8vw, 7rem)', lineHeight: '1', letterSpacing: '-0.02em' }}>
                Fitness<br />Insights
              </h1>
              <p className="text-stone-500 text-sm font-light max-w-xs md:text-right">
                Training science, nutrition facts, and mindset shifts.
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-8 py-16">
          {blogs.length === 0 ? (
            <p className="text-stone-500 py-20">No posts yet. Check back soon.</p>
          ) : (
            <>
              {/* Featured post */}
              {featured && (
                <Link href={`/blog/${featured.slug}`} className="group block mb-px">
                  <article className="grid md:grid-cols-2 gap-px bg-stone-800 hover:bg-stone-700 transition-colors">
                    <div className="aspect-video md:aspect-auto bg-stone-900 overflow-hidden">
                      {featured.coverImage ? (
                        <img src={featured.coverImage} alt={featured.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                        <div className="w-full h-full min-h-[280px] bg-stone-800" />
                      )}
                    </div>
                    <div className="bg-stone-950 p-10 flex flex-col justify-between group-hover:bg-stone-900 transition-colors">
                      <div>
                        <div className="flex items-center gap-3 mb-6">
                          <span className="text-[10px] bg-accent text-stone-950 px-2 py-0.5 font-bold uppercase tracking-widest">Featured</span>
                          {featured.tags?.[0] && (
                            <span className="text-[10px] border border-stone-700 text-stone-500 px-2 py-0.5 uppercase tracking-widest">{featured.tags[0]}</span>
                          )}
                        </div>
                        <h2 className="font-display font-bold uppercase text-white group-hover:text-accent transition-colors mb-4" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', lineHeight: '1.05', letterSpacing: '-0.01em' }}>
                          {featured.title}
                        </h2>
                        <p className="text-stone-400 text-sm font-light leading-relaxed line-clamp-3">{featured.excerpt}</p>
                      </div>
                      <div className="flex items-center justify-between mt-8 pt-6 border-t border-stone-800">
                        <p className="text-xs text-stone-600 uppercase tracking-[0.12em]">
                          {featured.publishedAt ? format(new Date(featured.publishedAt), 'MMM d, yyyy') : ''}
                        </p>
                        <span className="text-xs text-accent font-bold uppercase tracking-[0.12em] group-hover:gap-3 transition-all">
                          Read →
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              )}

              {/* Rest of posts */}
              {rest.length > 0 && (
                <div className="grid md:grid-cols-3 gap-px bg-stone-800 border-t border-stone-800">
                  {rest.map((blog) => (
                    <Link key={blog._id.toString()} href={`/blog/${blog.slug}`} className="group block">
                      <article className="bg-stone-950 hover:bg-stone-900 transition-colors h-full flex flex-col">
                        <div className="aspect-video bg-stone-900 overflow-hidden">
                          {blog.coverImage ? (
                            <img src={blog.coverImage} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                          ) : (
                            <div className="w-full h-full bg-stone-800" />
                          )}
                        </div>
                        <div className="p-7 flex flex-col flex-1">
                          {blog.tags?.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 mb-4">
                              {blog.tags.slice(0, 2).map((tag: string) => (
                                <span key={tag} className="text-[10px] border border-stone-800 text-stone-600 px-2 py-0.5 uppercase tracking-widest font-bold">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                          <h2 className="font-display font-bold uppercase text-white group-hover:text-accent transition-colors mb-3 leading-tight" style={{ fontSize: 'clamp(1rem, 1.8vw, 1.25rem)', letterSpacing: '-0.01em' }}>
                            {blog.title}
                          </h2>
                          <p className="text-stone-500 text-xs font-light leading-relaxed line-clamp-2 flex-1 mb-5">
                            {blog.excerpt}
                          </p>
                          <p className="text-xs text-stone-700 uppercase tracking-[0.12em]">
                            {blog.publishedAt ? format(new Date(blog.publishedAt), 'MMM d, yyyy') : ''}
                          </p>
                        </div>
                      </article>
                    </Link>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
