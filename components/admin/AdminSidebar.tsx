'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';

const links = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: '▦' },
  { href: '/admin/bio', label: 'Bio / Profile', icon: '◉' },
  { href: '/admin/blogs', label: 'Blogs', icon: '✎' },
  { href: '/admin/packages', label: 'Packages', icon: '⬡' },
  { href: '/admin/testimonials', label: 'Testimonials', icon: '★' },
  { href: '/admin/gallery', label: 'Gallery', icon: '⊞' },
  { href: '/admin/faqs', label: 'FAQs', icon: '?' },
  { href: '/admin/contacts', label: 'Inquiries', icon: '✉' },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-56 bg-stone-900 min-h-screen flex flex-col">
      <div className="px-6 py-6 border-b border-stone-800">
        <Link href="/" className="font-display text-xl font-bold text-stone-100">
          Pump &amp; Burn<span className="text-accent-light">.</span>
        </Link>
        <p className="text-xs text-stone-500 mt-0.5">Admin Panel</p>
      </div>

      <nav className="flex-1 py-4">
        {links.map((l) => {
          const active = pathname === l.href || pathname.startsWith(l.href + '/');
          return (
            <Link
              key={l.href}
              href={l.href}
              className={`flex items-center gap-3 px-6 py-3 text-sm font-medium transition-colors ${
                active
                  ? 'bg-stone-800 text-stone-100'
                  : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/50'
              }`}
            >
              <span className="text-base">{l.icon}</span>
              {l.label}
            </Link>
          );
        })}
      </nav>

      <div className="px-6 py-4 border-t border-stone-800">
        <Link
          href="/"
          className="block text-xs text-stone-500 hover:text-stone-300 mb-3 transition-colors"
          target="_blank"
        >
          ↗ View Site
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: '/admin/login' })}
          className="text-xs text-stone-500 hover:text-red-400 transition-colors"
        >
          Sign Out
        </button>
      </div>
    </aside>
  );
}
