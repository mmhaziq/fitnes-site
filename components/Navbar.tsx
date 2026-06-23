'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

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
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-stone-950/95 backdrop-blur-sm border-b border-stone-800/60' : 'bg-transparent'
      }`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
    >
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Link href="/" className="font-display text-2xl font-bold text-white uppercase tracking-tight">
            Pump &amp; Burn<span className="text-accent">.</span>
          </Link>
        </motion.div>

        {/* Desktop */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map((l, i) => (
            <motion.li
              key={l.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 + i * 0.07 }}
            >
              <Link href={l.href} className="relative text-xs font-semibold uppercase tracking-[0.15em] text-stone-400 hover:text-white transition-colors group">
                {l.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-accent group-hover:w-full transition-all duration-300" />
              </Link>
            </motion.li>
          ))}
          <motion.li
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.65 }}
          >
            <Link href="/#contact" className="px-5 py-2 bg-accent text-stone-950 text-xs font-bold uppercase tracking-[0.1em] hover:bg-accent-light transition-colors">
              Book a Session
            </Link>
          </motion.li>
        </ul>

        {/* Mobile toggle */}
        <button className="md:hidden text-stone-300" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            }
          </svg>
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            className="md:hidden bg-stone-950 border-t border-stone-800 px-6 py-5 space-y-4"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {links.map((l) => (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
                className="block text-xs font-bold uppercase tracking-[0.15em] text-stone-400 hover:text-white transition-colors">
                {l.label}
              </Link>
            ))}
            <Link href="/#contact" onClick={() => setOpen(false)}
              className="block mt-2 px-4 py-2.5 bg-accent text-stone-950 text-xs font-bold uppercase tracking-[0.1em] text-center">
              Book a Session
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
