'use client';

import AdminGuard from '@/components/admin/AdminGuard';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function DashboardPage() {
  const [stats, setStats] = useState({ blogs: 0, published: 0, packages: 0, testimonials: 0, gallery: 0, faqs: 0, unreadContacts: 0 });

  useEffect(() => {
    Promise.all([
      fetch('/api/blogs?admin=1').then(r => r.json()),
      fetch('/api/packages?admin=1').then(r => r.json()),
      fetch('/api/testimonials').then(r => r.json()),
      fetch('/api/gallery').then(r => r.json()),
      fetch('/api/faqs').then(r => r.json()),
      fetch('/api/contact').then(r => r.json()),
    ]).then(([blogs, packages, testimonials, gallery, faqs, contacts]) => {
      setStats({
        blogs: blogs.length ?? 0,
        published: (blogs ?? []).filter((b: any) => b.published).length,
        packages: packages.length ?? 0,
        testimonials: testimonials.length ?? 0,
        gallery: gallery.length ?? 0,
        faqs: faqs.length ?? 0,
        unreadContacts: (contacts ?? []).filter((c: any) => !c.read).length,
      });
    });
  }, []);

  const cards = [
    { label: 'Blog Posts', value: stats.blogs, sub: `${stats.published} published`, href: '/admin/blogs', accent: 'text-blue-400' },
    { label: 'Packages', value: stats.packages, href: '/admin/packages', accent: 'text-amber-400' },
    { label: 'Testimonials', value: stats.testimonials, href: '/admin/testimonials', accent: 'text-accent' },
    { label: 'Gallery Entries', value: stats.gallery, href: '/admin/gallery', accent: 'text-purple-400' },
    { label: 'FAQs', value: stats.faqs, href: '/admin/faqs', accent: 'text-pink-400' },
    { label: 'New Inquiries', value: stats.unreadContacts, href: '/admin/contacts', accent: 'text-green-400' },
  ];

  const actions = [
    { label: 'Edit Bio / Profile', href: '/admin/bio', desc: 'Update name, about, certifications, contact info' },
    { label: 'New Blog Post', href: '/admin/blogs/new', desc: 'Write and publish a new fitness article' },
    { label: 'Manage Packages', href: '/admin/packages', desc: 'Add, edit, or reorder training packages' },
    { label: 'Add Testimonial', href: '/admin/testimonials', desc: 'Add a client review or rating' },
    { label: 'Gallery', href: '/admin/gallery', desc: 'Upload before/after transformation photos' },
    { label: 'View Inquiries', href: '/admin/contacts', desc: 'Read messages sent via the contact form' },
  ];

  return (
    <AdminGuard>
      <div className="p-8">
        <h1 className="font-display text-2xl font-bold text-white mb-8">Dashboard</h1>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
          {cards.map((c) => (
            <Link key={c.label} href={c.href} className="bg-stone-800 border border-stone-700 rounded-xl p-5 hover:border-accent/50 transition-colors">
              <p className={`text-3xl font-display font-bold ${c.accent}`}>{c.value}</p>
              <p className="text-sm font-medium mt-1 text-stone-400">{c.label}</p>
              {c.sub && <p className="text-xs text-stone-600 mt-0.5">{c.sub}</p>}
            </Link>
          ))}
        </div>

        <h2 className="text-xs font-bold uppercase tracking-widest text-stone-500 mb-4">Quick Actions</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {actions.map((a) => (
            <Link key={a.href} href={a.href} className="bg-stone-900 border border-stone-800 rounded-xl p-5 hover:border-accent/50 transition-all">
              <p className="font-semibold text-white mb-1">{a.label}</p>
              <p className="text-xs text-stone-500">{a.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </AdminGuard>
  );
}
