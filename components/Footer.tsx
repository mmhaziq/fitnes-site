import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-400 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          <div>
            <p className="font-display text-xl font-bold text-stone-100 mb-2">
              AM<span className="text-accent-light">.</span>
            </p>
            <p className="text-sm text-stone-500 max-w-xs">
              Personal trainer & nutritionist based in Karachi, Pakistan.
            </p>
          </div>
          <div className="flex gap-12">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-stone-500 mb-3">Navigation</p>
              <ul className="space-y-2 text-sm">
                <li><Link href="/#about" className="hover:text-stone-200 transition-colors">About</Link></li>
                <li><Link href="/blog" className="hover:text-stone-200 transition-colors">Blog</Link></li>
                <li><Link href="/packages" className="hover:text-stone-200 transition-colors">Packages</Link></li>
                <li><Link href="/#contact" className="hover:text-stone-200 transition-colors">Contact</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-stone-800 text-xs text-stone-600 text-center">
          © {new Date().getFullYear()} Alex Malik Fitness. Karachi, Pakistan.
        </div>
      </div>
    </footer>
  );
}
