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

      {/* Hero */}
      <section className="min-h-screen flex items-center bg-stone-950 pt-20 relative overflow-hidden">
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
              <Link href="/packages" className="px-7 py-3.5 bg-accent text-stone-950 font-bold rounded-full hover:bg-accent-light transition-colors text-sm">
                View Packages
              </Link>
              <Link href="/#about" className="px-7 py-3.5 border border-stone-700 text-stone-300 font-medium rounded-full hover:border-accent hover:text-accent transition-colors text-sm">
                About Me
              </Link>
            </div>
          </div>

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
            <h2 className="font-display text-5xl font-bold text-white mb-2">{bio?.name || 'Alex Malik'}</h2>
            <p className="text-accent font-semibold mb-6 text-sm uppercase tracking-wider">{bio?.title || 'Certified Personal Trainer'}</p>
            <p className="text-stone-400 leading-relaxed mb-10">
              {bio?.about || 'With over 8 years of experience in personal training and nutrition coaching, I help individuals in Karachi achieve their fitness goals through science-backed programs and personalised attention.'}
            </p>
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

      {/* Before / After Gallery */}
      {gallery.length > 0 && (
        <section id="gallery" className="py-28 bg-stone-950">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-14">
              <span className="inline-block text-xs font-bold uppercase tracking-[0.25em] text-accent border border-accent/40 px-3 py-1 rounded-full mb-4">Results</span>
              <h2 className="font-display text-5xl font-bold text-white mt-3">Real Transformations</h2>
              <p className="text-stone-400 mt-3 text-lg max-w-xl mx-auto">These are real clients with real results. No filters, no tricks.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {gallery.map((item: any) => (
                <div key={item._id.toString()} className="bg-stone-900 border border-stone-800 rounded-2xl overflow-hidden hover:border-accent/40 transition-colors">
                  <div className="grid grid-cols-2">
                    <div className="relative">
                      <img src={item.beforeImage} alt="Before" className="w-full h-48 object-cover" />
                      <span className="absolute top-2 left-2 text-xs bg-stone-950/80 text-stone-300 px-2 py-0.5 rounded font-medium">Before</span>
                    </div>
                    <div className="relative">
                      <img src={item.afterImage} alt="After" className="w-full h-48 object-cover" />
                      <span className="absolute top-2 left-2 text-xs bg-accent/90 text-stone-950 px-2 py-0.5 rounded font-bold">After</span>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-white font-semibold text-sm">{item.clientName || 'Client'}</p>
                    {item.duration && <p className="text-accent text-xs mt-0.5">{item.duration}</p>}
                    {item.description && <p className="text-stone-400 text-xs mt-1">{item.description}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section id="testimonials" className="py-28 bg-stone-900">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-14">
              <span className="inline-block text-xs font-bold uppercase tracking-[0.25em] text-accent border border-accent/40 px-3 py-1 rounded-full mb-4">Testimonials</span>
              <h2 className="font-display text-5xl font-bold text-white mt-3">What Clients Say</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((t: any) => (
                <div key={t._id.toString()} className="bg-stone-800 border border-stone-700 rounded-2xl p-6 hover:border-accent/40 transition-colors">
                  <p className="text-accent text-sm mb-4">{'★'.repeat(t.rating)}{'☆'.repeat(5 - t.rating)}</p>
                  <p className="text-stone-300 text-sm leading-relaxed mb-6">"{t.text}"</p>
                  <div className="flex items-center gap-3">
                    {t.photo ? (
                      <img src={t.photo} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold text-sm">
                        {t.name[0]}
                      </div>
                    )}
                    <div>
                      <p className="text-white font-semibold text-sm">{t.name}</p>
                      {t.role && <p className="text-stone-500 text-xs">{t.role}</p>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Banner */}
      <section className="py-24 bg-accent relative overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'repeating-linear-gradient(45deg, #000 0, #000 1px, transparent 0, transparent 50%)', backgroundSize: '12px 12px' }}
        />
        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
          <h2 className="font-display text-5xl font-bold text-stone-950 mb-4">Ready to start your journey?</h2>
          <p className="text-stone-800 mb-10 text-lg">Choose a package or get in touch to discuss a custom plan.</p>
          <Link href="/packages" className="inline-block px-8 py-4 bg-stone-950 text-white font-bold rounded-full hover:bg-stone-800 transition-colors text-sm">
            See Packages →
          </Link>
        </div>
      </section>

      {/* FAQ */}
      {faqs.length > 0 && (
        <section id="faq" className="py-28 bg-stone-950">
          <div className="max-w-3xl mx-auto px-6">
            <div className="text-center mb-14">
              <span className="inline-block text-xs font-bold uppercase tracking-[0.25em] text-accent border border-accent/40 px-3 py-1 rounded-full mb-4">FAQ</span>
              <h2 className="font-display text-5xl font-bold text-white mt-3">Common Questions</h2>
            </div>
            <div className="space-y-3">
              {faqs.map((faq: any) => (
                <details key={faq._id.toString()} className="group bg-stone-900 border border-stone-800 rounded-xl overflow-hidden">
                  <summary className="flex items-center justify-between px-6 py-4 cursor-pointer text-white font-semibold text-sm select-none hover:text-accent transition-colors">
                    {faq.question}
                    <svg className="w-4 h-4 text-stone-500 group-open:rotate-180 transition-transform flex-shrink-0 ml-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <p className="px-6 pb-5 text-stone-400 text-sm leading-relaxed">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact */}
      <section id="contact" className="py-28 bg-stone-900">
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-start">
          <div>
            <span className="inline-block text-xs font-bold uppercase tracking-[0.25em] text-accent border border-accent/40 px-3 py-1 rounded-full mb-4">Contact</span>
            <h2 className="font-display text-5xl font-bold text-white mb-4">Get in Touch</h2>
            <p className="text-stone-400 mb-8">Reach out via WhatsApp for the fastest response, or fill the form and I'll get back to you.</p>
            <div className="flex flex-col gap-3">
              {bio?.whatsapp && (
                <a href={bio.whatsapp} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 px-5 py-3 bg-green-500/10 border border-green-500/30 text-green-400 rounded-xl font-medium text-sm hover:bg-green-500/20 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Chat on WhatsApp
                </a>
              )}
              {bio?.email && (
                <a href={`mailto:${bio.email}`}
                  className="flex items-center gap-3 px-5 py-3 border border-stone-700 text-stone-300 rounded-xl font-medium text-sm hover:border-accent hover:text-accent transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {bio.email}
                </a>
              )}
            </div>
          </div>
          <ContactForm />
        </div>
      </section>

      <Footer />
      <WhatsAppButton whatsapp={bio?.whatsapp} />
    </>
  );
}
