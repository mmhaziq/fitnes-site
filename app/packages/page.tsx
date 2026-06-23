export const revalidate = 0;
export const metadata = {
  title: 'Training Packages',
  description: 'Choose from personalised training packages designed for your goals. In-person and online coaching in Karachi.',
};

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import connectDB from '@/lib/mongodb';
import Package from '@/models/Package';
import Bio from '@/models/Bio';

async function getData() {
  try {
    await connectDB();
    const [packages, bio] = await Promise.all([
      Package.find({ active: true }).sort({ order: 1 }).lean(),
      Bio.findOne().select('whatsapp phone').lean(),
    ]);
    return { packages, bio };
  } catch {
    return { packages: [], bio: null };
  }
}

export default async function PackagesPage() {
  const { packages, bio }: any = await getData();

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-stone-950">
        {/* Header */}
        <div className="pt-32 pb-16 border-b border-stone-800 relative">
          <div className="absolute left-0 top-0 w-1 h-full bg-accent" />
          <div className="max-w-7xl mx-auto px-8">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent mb-4 flex items-center gap-3">
              <span className="block w-8 h-px bg-accent" /> Packages
            </p>
            <h1 className="font-display font-bold uppercase text-white" style={{ fontSize: 'clamp(3rem, 8vw, 7rem)', lineHeight: '1', letterSpacing: '-0.02em' }}>
              Training<br />Plans
            </h1>
            <p className="text-stone-400 mt-6 text-base font-light max-w-md">
              Every package includes personalised programming, direct coaching access, and regular progress check-ins.
            </p>
          </div>
        </div>

        {/* Packages */}
        <div className="max-w-7xl mx-auto px-8 py-20">
          {packages.length === 0 ? (
            <p className="text-stone-500 py-20">No packages available yet.</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-stone-800">
              {packages.map((pkg: any, i: number) => (
                <div
                  key={pkg._id.toString()}
                  className={`relative p-10 flex flex-col ${
                    pkg.highlighted ? 'bg-accent' : 'bg-stone-950 hover:bg-stone-900 transition-colors'
                  }`}
                >
                  {pkg.highlighted && (
                    <span className="absolute top-5 right-5 text-[10px] bg-stone-950 text-accent px-2.5 py-1 font-bold uppercase tracking-widest">
                      Popular
                    </span>
                  )}

                  <div className="mb-8">
                    <p className={`text-xs font-bold uppercase tracking-[0.25em] mb-3 ${pkg.highlighted ? 'text-stone-700' : 'text-stone-600'}`}>
                      0{i + 1}
                    </p>
                    <h2 className={`font-display font-bold uppercase leading-none mb-2 ${pkg.highlighted ? 'text-stone-950' : 'text-white'}`} style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', letterSpacing: '-0.01em' }}>
                      {pkg.name}
                    </h2>
                    {pkg.tagline && (
                      <p className={`text-sm font-light ${pkg.highlighted ? 'text-stone-700' : 'text-stone-500'}`}>
                        {pkg.tagline}
                      </p>
                    )}
                  </div>

                  <div className="mb-8 pb-8 border-b ${pkg.highlighted ? 'border-stone-700/30' : 'border-stone-800'}">
                    <span className={`font-display font-bold uppercase ${pkg.highlighted ? 'text-stone-950' : 'text-accent'}`} style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.02em' }}>
                      {pkg.currency} {pkg.price.toLocaleString()}
                    </span>
                    <span className={`text-sm ml-2 ${pkg.highlighted ? 'text-stone-700' : 'text-stone-500'}`}>
                      {pkg.duration}
                    </span>
                  </div>

                  <ul className="space-y-3 mb-10 flex-1">
                    {pkg.features.map((f: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-3 text-sm">
                        <svg className={`w-3.5 h-3.5 mt-0.5 flex-shrink-0 ${pkg.highlighted ? 'text-stone-800' : 'text-accent'}`} fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className={pkg.highlighted ? 'text-stone-800' : 'text-stone-300'}>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href={bio?.whatsapp || '/#contact'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`block text-center py-3.5 text-xs font-bold uppercase tracking-[0.12em] transition-colors cursor-pointer ${
                      pkg.highlighted
                        ? 'bg-stone-950 text-white hover:bg-stone-800'
                        : 'bg-accent text-stone-950 hover:bg-accent-light'
                    }`}
                  >
                    Get Started →
                  </a>
                </div>
              ))}
            </div>
          )}

          <div className="mt-12 pt-8 border-t border-stone-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <p className="text-stone-500 text-sm font-light">Need something custom? Message directly.</p>
            <a href={bio?.whatsapp || '/#contact'} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-accent hover:text-accent-light transition-colors cursor-pointer">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
