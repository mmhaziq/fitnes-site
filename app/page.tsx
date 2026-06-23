export const revalidate = 0;

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import Link from 'next/link';
import connectDB from '@/lib/mongodb';
import Bio from '@/models/Bio';
import Testimonial from '@/models/Testimonial';
import Gallery from '@/models/Gallery';
import Faq from '@/models/Faq';
import ContactForm from '@/components/ContactForm';

async function getData() {
  try {
    await connectDB();
    const [bio, testimonials, gallery, faqs] = await Promise.all([
      Bio.findOne().lean(),
      Testimonial.find({ active: true }).sort({ order: 1 }).lean(),
      Gallery.find({ active: true }).sort({ order: 1 }).lean(),
      Faq.find({ active: true }).sort({ order: 1 }).lean(),
    ]);
    return { bio, testimonials, gallery, faqs };
  } catch {
    return { bio: null, testimonials: [], gallery: [], faqs: [] };
  }
}

export default async function HomePage() {
  const { bio, testimonials, gallery, faqs }: any = await getData();

  return (
    <>
      <Navbar />

      {/* ── HERO ── */}
      <section className="min-h-screen flex flex-col justify-end bg-stone-950 pt-24 pb-0 relative overflow-hidden">
        {/* Accent stripe */}
        <div className="absolute top-0 left-0 w-1 h-full bg-accent" />

        <div className="max-w-7xl mx-auto px-8 w-full pb-16">
          {/* Label */}
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent mb-6">
            Personal Trainer · Karachi, Pakistan
          </p>

          {/* Giant headline */}
          <h1 className="font-display font-bold uppercase text-white leading-none mb-8" style={{ fontSize: 'clamp(3.5rem, 11vw, 9.5rem)', letterSpacing: '-0.02em' }}>
            {bio?.tagline ? bio.tagline : (
              <>
                <span className="block">Build</span>
                <span className="block text-accent">the body</span>
                <span className="block">you want.</span>
              </>
            )}
          </h1>

          {/* Bottom row */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-t border-stone-800 pt-8">
            <p className="text-stone-400 text-base leading-relaxed max-w-sm font-light">
              Science-backed training and nutrition coaching, built around you — in-person in Karachi and online worldwide.
            </p>
            <div className="flex gap-3">
              <Link href="/packages" className="px-6 py-3 bg-accent text-stone-950 text-xs font-bold uppercase tracking-[0.12em] hover:bg-accent-light transition-colors cursor-pointer">
                View Packages
              </Link>
              <Link href="/#about" className="px-6 py-3 border border-stone-700 text-stone-300 text-xs font-bold uppercase tracking-[0.12em] hover:border-white hover:text-white transition-colors cursor-pointer">
                About Me
              </Link>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="border-t border-stone-800 bg-stone-900/50">
          <div className="max-w-7xl mx-auto px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-stone-800">
              {(bio?.stats || [
                { value: '500+', label: 'Clients Trained' },
                { value: '8+', label: 'Years Experience' },
                { value: '120+', label: 'Programs Designed' },
                { value: '3', label: 'Certifications' },
              ]).map((s: any, i: number) => (
                <div key={i} className="px-8 py-6">
                  <p className="font-display font-bold text-accent uppercase" style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}>{s.value}</p>
                  <p className="text-xs text-stone-500 uppercase tracking-[0.15em] mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="py-24 bg-stone-900">
        <div className="max-w-7xl mx-auto px-8">
          {/* Section label */}
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent mb-12 flex items-center gap-3">
            <span className="block w-8 h-px bg-accent" /> About
          </p>

          <div className="grid md:grid-cols-2 gap-16 items-start">
            {/* Image */}
            <div className="relative">
              <div className="w-full aspect-[3/4] bg-stone-800 overflow-hidden">
                {bio?.profileImage ? (
                  <img src={bio.profileImage} alt={bio.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-stone-700">
                    <svg className="w-24 h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                )}
              </div>
              <div className="absolute bottom-0 left-0 bg-accent text-stone-950 px-4 py-2 text-xs font-bold uppercase tracking-widest">
                📍 {bio?.location || 'Karachi, Pakistan'}
              </div>
            </div>

            {/* Content */}
            <div className="pt-2">
              <h2 className="font-display font-bold uppercase text-white mb-1" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', lineHeight: '1', letterSpacing: '-0.02em' }}>
                {bio?.name || 'Alex Malik'}
              </h2>
              <p className="text-accent text-xs font-bold uppercase tracking-[0.25em] mb-8">{bio?.title || 'Certified Personal Trainer'}</p>

              <p className="text-stone-400 leading-relaxed mb-10 text-base font-light">
                {bio?.about || 'With over 8 years of experience in personal training and nutrition coaching, I help individuals in Karachi achieve their fitness goals through science-backed programs and personalised attention.'}
              </p>

              {bio?.certifications?.length > 0 && (
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.25em] text-stone-500 mb-5 flex items-center gap-3">
                    <span className="block w-5 h-px bg-stone-600" /> Certifications
                  </p>
                  <div className="space-y-2">
                    {bio.certifications.map((c: any, i: number) => (
                      <div key={i} className="flex items-start gap-4 border-l-2 border-accent pl-4 py-1">
                        <div>
                          <p className="text-sm font-semibold text-white">{c.title}</p>
                          <p className="text-xs text-stone-500">{c.issuer} · {c.year}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── GALLERY ── */}
      {gallery.length > 0 && (
        <section id="gallery" className="py-24 bg-stone-950">
          <div className="max-w-7xl mx-auto px-8">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent mb-4 flex items-center gap-3">
              <span className="block w-8 h-px bg-accent" /> Results
            </p>
            <div className="flex items-end justify-between mb-12">
              <h2 className="font-display font-bold uppercase text-white" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', lineHeight: '1', letterSpacing: '-0.02em' }}>
                Real<br />Transformations
              </h2>
              <p className="text-stone-500 text-sm max-w-xs text-right hidden md:block">No filters. No tricks. Real clients, real results.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-px bg-stone-800">
              {gallery.map((item: any) => (
                <div key={item._id.toString()} className="bg-stone-950 group cursor-pointer">
                  <div className="grid grid-cols-2 gap-px bg-stone-800">
                    <div className="relative overflow-hidden">
                      <img src={item.beforeImage} alt="Before" className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500" />
                      <span className="absolute top-2 left-2 text-[10px] bg-stone-950/90 text-stone-400 px-2 py-0.5 uppercase tracking-widest font-bold">Before</span>
                    </div>
                    <div className="relative overflow-hidden">
                      <img src={item.afterImage} alt="After" className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500" />
                      <span className="absolute top-2 left-2 text-[10px] bg-accent text-stone-950 px-2 py-0.5 uppercase tracking-widest font-bold">After</span>
                    </div>
                  </div>
                  <div className="p-4 border-t border-stone-800">
                    <p className="text-white text-sm font-semibold uppercase tracking-wide">{item.clientName || 'Client'}</p>
                    {item.duration && <p className="text-accent text-xs font-bold mt-0.5">{item.duration}</p>}
                    {item.description && <p className="text-stone-500 text-xs mt-1">{item.description}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── TESTIMONIALS ── */}
      {testimonials.length > 0 && (
        <section id="testimonials" className="py-24 bg-stone-900">
          <div className="max-w-7xl mx-auto px-8">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent mb-4 flex items-center gap-3">
              <span className="block w-8 h-px bg-accent" /> Testimonials
            </p>
            <h2 className="font-display font-bold uppercase text-white mb-14" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', lineHeight: '1', letterSpacing: '-0.02em' }}>
              What Clients Say
            </h2>

            <div className="grid md:grid-cols-3 gap-px bg-stone-800">
              {testimonials.map((t: any) => (
                <div key={t._id.toString()} className="bg-stone-900 p-8 hover:bg-stone-800 transition-colors cursor-default">
                  <p className="text-accent text-sm mb-5 tracking-widest">{'★'.repeat(t.rating)}{'☆'.repeat(5 - t.rating)}</p>
                  <p className="text-stone-300 text-sm leading-relaxed mb-8 font-light">"{t.text}"</p>
                  <div className="flex items-center gap-3 border-t border-stone-800 pt-5">
                    {t.photo ? (
                      <img src={t.photo} alt={t.name} className="w-9 h-9 object-cover" />
                    ) : (
                      <div className="w-9 h-9 bg-accent/20 flex items-center justify-center text-accent font-bold text-sm">
                        {t.name[0]}
                      </div>
                    )}
                    <div>
                      <p className="text-white font-bold text-xs uppercase tracking-wider">{t.name}</p>
                      {t.role && <p className="text-stone-500 text-xs mt-0.5">{t.role}</p>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ── */}
      <section className="py-24 bg-accent relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.07]"
          style={{ backgroundImage: 'repeating-linear-gradient(0deg, #000 0, #000 1px, transparent 0, transparent 40px), repeating-linear-gradient(90deg, #000 0, #000 1px, transparent 0, transparent 40px)' }}
        />
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row md:items-center md:justify-between gap-8 relative z-10">
          <h2 className="font-display font-bold uppercase text-stone-950" style={{ fontSize: 'clamp(2rem, 6vw, 5rem)', lineHeight: '1', letterSpacing: '-0.02em' }}>
            Ready to<br />start?
          </h2>
          <Link href="/packages" className="inline-block px-8 py-4 bg-stone-950 text-white text-xs font-bold uppercase tracking-[0.15em] hover:bg-stone-800 transition-colors cursor-pointer self-start md:self-auto">
            See Packages →
          </Link>
        </div>
      </section>

      {/* ── FAQ ── */}
      {faqs.length > 0 && (
        <section id="faq" className="py-24 bg-stone-950">
          <div className="max-w-7xl mx-auto px-8">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent mb-4 flex items-center gap-3">
              <span className="block w-8 h-px bg-accent" /> FAQ
            </p>
            <h2 className="font-display font-bold uppercase text-white mb-14" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', lineHeight: '1', letterSpacing: '-0.02em' }}>
              Common Questions
            </h2>

            <div className="divide-y divide-stone-800 border-t border-stone-800">
              {faqs.map((faq: any) => (
                <details key={faq._id.toString()} className="group py-5 cursor-pointer">
                  <summary className="flex items-center justify-between text-white font-display font-semibold uppercase tracking-wide select-none hover:text-accent transition-colors" style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)' }}>
                    {faq.question}
                    <svg className="w-4 h-4 text-stone-500 group-open:rotate-180 transition-transform flex-shrink-0 ml-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <p className="mt-4 text-stone-400 text-sm leading-relaxed font-light max-w-2xl">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CONTACT ── */}
      <section id="contact" className="py-24 bg-stone-900">
        <div className="max-w-7xl mx-auto px-8">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent mb-4 flex items-center gap-3">
            <span className="block w-8 h-px bg-accent" /> Contact
          </p>

          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="font-display font-bold uppercase text-white mb-6" style={{ fontSize: 'clamp(2rem, 5vw, 4.5rem)', lineHeight: '1', letterSpacing: '-0.02em' }}>
                Let's<br />Talk.
              </h2>
              <p className="text-stone-400 mb-8 font-light text-base leading-relaxed max-w-sm">
                Reach out via WhatsApp for the fastest response, or fill the form and I'll get back to you.
              </p>
              <div className="flex flex-col gap-3">
                {bio?.whatsapp && (
                  <a href={bio.whatsapp} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-3 px-5 py-3.5 bg-green-500/10 border border-green-500/30 text-green-400 text-xs font-bold uppercase tracking-[0.12em] hover:bg-green-500/20 transition-colors cursor-pointer">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    Chat on WhatsApp
                  </a>
                )}
                {bio?.email && (
                  <a href={`mailto:${bio.email}`}
                    className="flex items-center gap-3 px-5 py-3.5 border border-stone-700 text-stone-300 text-xs font-bold uppercase tracking-[0.12em] hover:border-white hover:text-white transition-colors cursor-pointer">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    {bio.email}
                  </a>
                )}
              </div>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton whatsapp={bio?.whatsapp} />
    </>
  );
}
