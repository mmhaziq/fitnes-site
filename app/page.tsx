export const revalidate = 0;

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import connectDB from '@/lib/mongodb';
import Bio from '@/models/Bio';

async function getBio() {
  try {
    await connectDB();
    const bio = await Bio.findOne().lean();
    return bio;
  } catch {
    return null;
  }
}

export default async function HomePage() {
  const bio: any = await getBio();

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="min-h-screen flex items-center bg-stone-950 pt-20 relative overflow-hidden">
        {/* Background accent glow */}
        <div className="absolute top-1/3 -left-32 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center relative z-10">
          <div>
            <span className="inline-block text-xs font-bold uppercase tracking-[0.25em] text-accent border border-accent/40 px-3 py-1 rounded-full mb-6">
              Personal Trainer · Karachi
            </span>
            <h1 className="font-display text-6xl md:text-7xl font-bold text-white leading-[1.05] mb-6">
              {bio?.tagline ? (
                bio.tagline
              ) : (
                <>Transform your body.<br /><span className="text-accent">Elevate</span> your life.</>
              )}
            </h1>
            <p className="text-stone-400 text-lg leading-relaxed mb-10 max-w-md">
              Science-backed training and nutrition coaching, built around you — in Karachi and online.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/packages"
                className="px-7 py-3.5 bg-accent text-stone-950 font-bold rounded-full hover:bg-accent-light transition-colors text-sm"
              >
                View Packages
              </Link>
              <Link
                href="/#about"
                className="px-7 py-3.5 border border-stone-700 text-stone-300 font-medium rounded-full hover:border-accent hover:text-accent transition-colors text-sm"
              >
                About Me
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            {(bio?.stats || [
              { value: '500+', label: 'Clients Trained' },
              { value: '8+', label: 'Years Experience' },
              { value: '120+', label: 'Programs Designed' },
              { value: '3', label: 'Certifications' },
            ]).map((s: any, i: number) => (
              <div key={i} className="bg-stone-900 border border-stone-800 rounded-2xl p-6 hover:border-accent/40 transition-colors">
                <p className="font-display text-4xl font-bold text-accent">{s.value}</p>
                <p className="text-sm text-stone-400 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-28 bg-stone-900">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="w-full aspect-[3/4] bg-stone-800 rounded-2xl overflow-hidden border border-stone-700">
              {bio?.profileImage ? (
                <img src={bio.profileImage} alt={bio.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-stone-600">
                  <svg className="w-24 h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              )}
            </div>
            <div className="absolute -bottom-4 -right-4 bg-accent text-stone-950 px-5 py-3 rounded-xl text-sm font-bold shadow-lg">
              📍 {bio?.location || 'Karachi, Pakistan'}
            </div>
          </div>

          <div>
            <span className="inline-block text-xs font-bold uppercase tracking-[0.25em] text-accent border border-accent/40 px-3 py-1 rounded-full mb-4">About</span>
            <h2 className="font-display text-5xl font-bold text-white mb-2">
              {bio?.name || 'Alex Malik'}
            </h2>
            <p className="text-accent font-semibold mb-6 text-sm uppercase tracking-wider">{bio?.title || 'Certified Personal Trainer'}</p>
            <p className="text-stone-400 leading-relaxed mb-10">
              {bio?.about || 'With over 8 years of experience in personal training and nutrition coaching, I help individuals in Karachi achieve their fitness goals through science-backed programs and personalised attention.'}
            </p>

            {/* Certifications */}
            {bio?.certifications?.length > 0 && (
              <div className="space-y-3">
                <p className="text-xs font-bold uppercase tracking-widest text-stone-500 mb-4">Certifications</p>
                {bio.certifications.map((c: any, i: number) => (
                  <div key={i} className="flex items-start gap-3 bg-stone-800 border border-stone-700 rounded-xl px-4 py-3">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-stone-950" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-white">{c.title}</p>
                      <p className="text-xs text-stone-500">{c.issuer} · {c.year}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-24 bg-accent relative overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'repeating-linear-gradient(45deg, #000 0, #000 1px, transparent 0, transparent 50%)', backgroundSize: '12px 12px' }}
        />
        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
          <h2 className="font-display text-5xl font-bold text-stone-950 mb-4">
            Ready to start your journey?
          </h2>
          <p className="text-stone-800 mb-10 text-lg">
            Choose a package or get in touch to discuss a custom plan.
          </p>
          <Link
            href="/packages"
            className="inline-block px-8 py-4 bg-stone-950 text-white font-bold rounded-full hover:bg-stone-800 transition-colors text-sm"
          >
            See Packages →
          </Link>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-28 bg-stone-950">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <span className="inline-block text-xs font-bold uppercase tracking-[0.25em] text-accent border border-accent/40 px-3 py-1 rounded-full mb-4">Contact</span>
          <h2 className="font-display text-5xl font-bold text-white mb-4">Get in Touch</h2>
          <p className="text-stone-400 mb-10">
            Reach out via WhatsApp for the fastest response, or send an email.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {bio?.whatsapp && (
              <a
                href={bio.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-7 py-3.5 bg-green-500 text-white rounded-full font-bold hover:bg-green-400 transition-colors text-sm"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp
              </a>
            )}
            {bio?.email && (
              <a
                href={`mailto:${bio.email}`}
                className="flex items-center gap-2 px-7 py-3.5 border border-stone-700 text-stone-300 rounded-full font-medium hover:border-accent hover:text-accent transition-colors text-sm"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {bio.email}
              </a>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
