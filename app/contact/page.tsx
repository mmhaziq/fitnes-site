export const revalidate = 0;
export const metadata = {
  title: 'Contact | Pump & Burn',
  description: 'Get in touch with your personal trainer in Karachi, Pakistan.',
};

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactForm from '@/components/ContactForm';
import connectDB from '@/lib/mongodb';
import Bio from '@/models/Bio';

async function getData() {
  try {
    await connectDB();
    const bio = await Bio.findOne().select('whatsapp email').lean();
    return { bio };
  } catch {
    return { bio: null };
  }
}

export default async function ContactPage() {
  const { bio }: any = await getData();

  return (
    <>
      <Navbar />
      <section className="min-h-screen py-28 bg-stone-900 pt-36">
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-start">
          <div>
            <span className="inline-block text-xs font-bold uppercase tracking-[0.25em] text-accent border border-accent/40 px-3 py-1 rounded-full mb-4">Contact</span>
            <h1 className="font-display text-5xl font-bold text-white mb-4">Get in Touch</h1>
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
    </>
  );
}
