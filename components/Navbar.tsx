'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { href: '/#about', label: 'About' },
    { href: '/blog', label: 'Blog' },
    { href: '/packages', label: 'Packages' },
    { href: '/#contact', label: 'Contact' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-stone-950/95 backdrop-blur-sm border-b border-stone-800/60' : 'bg-transparent'
    }`}>
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="font-display text-2xl font-bold text-white uppercase tracking-tight">
          Pump &amp; Burn<span className="text-accent">.</span>
        </Link>

        {/* Desktop */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="text-xs font-semibold uppercase tracking-[0.15em] text-stone-400 hover:text-white transition-colors cursor-pointer">
                {l.label}
              </Link>
            </li>
          ))}
          <li>
            <Link href="/#contact" className="px-5 py-2 bg-accent text-stone-950 text-xs font-bold uppercase tracking-[0.1em] hover:bg-accent-light transition-colors cursor-pointer">
              Book a Session
            </Link>
          </li>
        </ul>

        {/* Mobile toggle */}
        <button className="md:hidden text-stone-300 cursor-pointer" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            }
          </svg>
        </button>
      </nav>

      {open && (
        <div className="md:hidden bg-stone-950 border-t border-stone-800 px-6 py-5 space-y-4">
          {links.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
              className="block text-xs font-bold uppercase tracking-[0.15em] text-stone-400 hover:text-white transition-colors cursor-pointer">
              {l.label}
            </Link>
          ))}
          <Link href="/#contact" onClick={() => setOpen(false)}
            className="block mt-2 px-4 py-2.5 bg-accent text-stone-950 text-xs font-bold uppercase tracking-[0.1em] text-center cursor-pointer">
            Book a Session
          </Link>
        </div>
      )}
    </header>
  );
}
