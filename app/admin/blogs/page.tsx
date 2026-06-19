'use client';

import AdminGuard from '@/components/admin/AdminGuard';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBlogs = () => {
    fetch('/api/blogs?admin=1')
      .then(r => r.json())
      .then(data => { setBlogs(data); setLoading(false); });
  };

  useEffect(() => { fetchBlogs(); }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this blog post?')) return;
    await fetch(`/api/blogs/${id}`, { method: 'DELETE' });
    fetchBlogs();
  };

  const handleToggle = async (blog: any) => {
    await fetch(`/api/blogs/${blog._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ published: !blog.published }),
    });
    fetchBlogs();
  };

  return (
    <AdminGuard>
      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-display text-2xl font-bold text-stone-900">Blog Posts</h1>
          <Link
            href="/admin/blogs/new"
            className="px-4 py-2 bg-stone-900 text-stone-50 text-sm font-medium rounded-full hover:bg-accent transition-colors"
          >
            + New Post
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-6 h-6 border-2 border-stone-200 border-t-accent rounded-full animate-spin" />
          </div>
        ) : blogs.length === 0 ? (
          <div className="text-center py-20 text-stone-400">
            <p>No blog posts yet.</p>
            <Link href="/admin/blogs/new" className="mt-3 inline-block text-accent underline text-sm">
              Create your first post
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-stone-100 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-stone-50 border-b border-stone-100">
                <tr>
                  <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider text-stone-400">Title</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider text-stone-400">Status</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider text-stone-400">Date</th>
                  <th className="px-5 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-50">
                {blogs.map((blog) => (
                  <tr key={blog._id} className="hover:bg-stone-50 transition-colors">
                    <td className="px-5 py-3.5 font-medium text-stone-800">{blog.title}</td>
                    <td className="px-5 py-3.5">
                      <button
                        onClick={() => handleToggle(blog)}
                        className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                          blog.published
                            ? 'bg-green-50 text-green-700'
                            : 'bg-stone-100 text-stone-500'
                        }`}
                      >
                        {blog.published ? 'Published' : 'Draft'}
                      </button>
                    </td>
                    <td className="px-5 py-3.5 text-stone-400 text-xs">
                      {blog.createdAt ? format(new Date(blog.createdAt), 'MMM d, yyyy') : '—'}
                    </td>
                    <td className="px-5 py-3.5 text-right space-x-3">
                      <Link href={`/admin/blogs/${blog._id}`} className="text-accent text-xs hover:underline">
                        Edit
                      </Link>
                      <button onClick={() => handleDelete(blog._id)} className="text-red-400 text-xs hover:underline">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminGuard>
  );
}
