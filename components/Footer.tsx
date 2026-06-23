import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-stone-950 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-8">
        {/* Top row */}
        <div className="grid md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-stone-800 py-16">
          <div className="pb-10 md:pb-0 md:pr-12">
            <p className="font-display text-3xl font-bold text-white uppercase tracking-tight mb-3">
              Pump &amp; Burn<span className="text-accent">.</span>
            </p>
            <p className="text-stone-500 text-sm font-light leading-relaxed max-w-xs">
              Science-backed personal training and nutrition coaching. Based in Karachi — online worldwide.
            </p>
          </div>

          <div className="py-10 md:py-0 md:px-12">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-stone-600 mb-6">Navigate</p>
            <ul className="space-y-3">
              {[
                { href: '/#about', label: 'About' },
                { href: '/packages', label: 'Packages' },
                { href: '/blog', label: 'Blog' },
                { href: '/#contact', label: 'Contact' },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-stone-400 text-sm hover:text-accent transition-colors uppercase tracking-[0.08em] font-medium">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-10 md:pt-0 md:pl-12">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-stone-600 mb-6">Start Today</p>
            <p className="text-stone-400 text-sm font-light mb-6">Ready to transform your body? Get in touch.</p>
            <Link href="/#contact" className="inline-block px-5 py-2.5 bg-accent text-stone-950 text-xs font-bold uppercase tracking-[0.12em] hover:bg-accent-light transition-colors cursor-pointer">
              Book a Session →
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-stone-800 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-stone-700 uppercase tracking-[0.15em]">
            © {new Date().getFullYear()} Pump &amp; Burn · Karachi, Pakistan
          </p>
          <p className="text-xs text-stone-800 uppercase tracking-[0.1em]">All rights reserved</p>
        </div>
      </div>
    </footer>
  );
}
