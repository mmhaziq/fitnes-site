export const revalidate = 0;
export const metadata = {
  title: 'About | Pump & Burn',
  description: 'Learn about your personal trainer based in Karachi, Pakistan.',
};

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import connectDB from '@/lib/mongodb';
import Bio from '@/models/Bio';

async function getData() {
  try {
    await connectDB();
    const bio = await Bio.findOne().lean();
    return { bio };
  } catch {
    return { bio: null };
  }
}

export default async function AboutPage() {
  const { bio }: any = await getData();

  return (
    <>
      <Navbar />
      <section className="min-h-screen py-28 bg-stone-900 pt-36">
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
            <h1 className="font-display text-5xl font-bold text-white mb-2">{bio?.name || 'Alex Malik'}</h1>
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
      <Footer />
    </>
  );
}
