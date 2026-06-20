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
      <main className="min-h-screen pt-28 pb-24 bg-stone-950">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block text-xs font-bold uppercase tracking-[0.25em] text-accent border border-accent/40 px-3 py-1 rounded-full mb-4">Packages</span>
            <h1 className="font-display text-5xl font-bold text-white mt-3 mb-4">Training Plans</h1>
            <p className="text-stone-400 text-lg max-w-xl mx-auto">
              Choose the plan that fits your goals. All packages include personalised attention and progress tracking.
            </p>
          </div>

          {packages.length === 0 ? (
            <p className="text-center text-stone-500 py-20">No packages available yet.</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
              {packages.map((pkg: any) => (
                <div
                  key={pkg._id.toString()}
                  className={`rounded-2xl p-8 border transition-all ${
                    pkg.highlighted
                      ? 'bg-accent border-accent shadow-xl shadow-accent/20'
                      : 'bg-stone-900 border-stone-800 hover:border-accent/40'
                  }`}
                >
                  {pkg.highlighted && (
                    <span className="inline-block text-xs font-bold uppercase tracking-widest bg-stone-950 text-accent px-3 py-1 rounded-full mb-4">
                      Most Popular
                    </span>
                  )}
                  <h2 className={`font-display text-2xl font-bold mb-1 ${pkg.highlighted ? 'text-stone-950' : 'text-white'}`}>
                    {pkg.name}
                  </h2>
                  <p className={`text-sm mb-6 ${pkg.highlighted ? 'text-stone-700' : 'text-stone-400'}`}>
                    {pkg.tagline}
                  </p>
                  <div className="mb-6">
                    <span className={`font-display text-4xl font-bold ${pkg.highlighted ? 'text-stone-950' : 'text-accent'}`}>
                      {pkg.currency} {pkg.price.toLocaleString()}
                    </span>
                    <span className={`text-sm ml-1 ${pkg.highlighted ? 'text-stone-700' : 'text-stone-500'}`}>
                      {pkg.duration}
                    </span>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((f: string, i: number) => (
                      <li key={i} className="flex items-start gap-3 text-sm">
                        <svg className={`w-4 h-4 mt-0.5 flex-shrink-0 ${pkg.highlighted ? 'text-stone-950' : 'text-accent'}`} fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className={pkg.highlighted ? 'text-stone-800' : 'text-stone-300'}>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href={bio?.whatsapp || '#contact'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`block text-center py-3 rounded-full font-bold text-sm transition-colors ${
                      pkg.highlighted
                        ? 'bg-stone-950 text-white hover:bg-stone-800'
                        : 'bg-accent text-stone-950 hover:bg-accent-light'
                    }`}
                  >
                    Get Started
                  </a>
                </div>
              ))}
            </div>
          )}

          <p className="text-center text-stone-500 text-sm mt-12">
            Need a custom plan?{' '}
            <a href={bio?.whatsapp || '/#contact'} className="text-accent hover:underline" target="_blank" rel="noopener noreferrer">
              Message on WhatsApp
            </a>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
