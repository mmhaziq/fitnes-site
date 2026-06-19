'use client';

import AdminGuard from '@/components/admin/AdminGuard';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function DashboardPage() {
  const [stats, setStats] = useState({ blogs: 0, packages: 0, published: 0 });

  useEffect(() => {
    Promise.all([
      fetch('/api/blogs?admin=1').then(r => r.json()),
      fetch('/api/packages?admin=1').then(r => r.json()),
    ]).then(([blogs, packages]) => {
      setStats({
        blogs: blogs.length,
        packages: packages.length,
        published: blogs.filter((b: any) => b.published).length,
      });
    });
  }, []);

  const cards = [
    { label: 'Total Blogs', value: stats.blogs, href: '/admin/blogs', color: 'bg-stone-800 border-stone-700 text-blue-400' },
    { label: 'Published', value: stats.published, href: '/admin/blogs', color: 'bg-stone-800 border-stone-700 text-accent' },
    { label: 'Packages', value: stats.packages, href: '/admin/packages', color: 'bg-stone-800 border-stone-700 text-amber-400' },
  ];

  const actions = [
    { label: 'Edit Bio / Profile', href: '/admin/bio', desc: 'Update name, about, certifications, contact info' },
    { label: 'New Blog Post', href: '/admin/blogs/new', desc: 'Write and publish a new fitness article' },
    { label: 'Manage Packages', href: '/admin/packages', desc: 'Add, edit, or reorder training packages' },
  ];

  return (
    <AdminGuard>
      <div className="p-8">
        <h1 className="font-display text-2xl font-bold text-white mb-8">Dashboard</h1>

        <div className="grid grid-cols-3 gap-4 mb-10">
          {cards.map((c) => (
            <Link key={c.label} href={c.href} className={`rounded-xl p-5 border ${c.color} hover:border-accent/50 transition-colors`}>
              <p className={`text-3xl font-display font-bold ${c.color.includes('accent') ? 'text-accent' : c.color.includes('blue') ? 'text-blue-400' : 'text-amber-400'}`}>{c.value}</p>
              <p className="text-sm font-medium mt-1 text-stone-400">{c.label}</p>
            </Link>
          ))}
        </div>

        <h2 className="text-xs font-bold uppercase tracking-widest text-stone-500 mb-4">Quick Actions</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {actions.map((a) => (
            <Link
              key={a.href}
              href={a.href}
              className="bg-stone-900 border border-stone-800 rounded-xl p-5 hover:border-accent/50 transition-all"
            >
              <p className="font-semibold text-white mb-1">{a.label}</p>
              <p className="text-xs text-stone-500">{a.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </AdminGuard>
  );
}
