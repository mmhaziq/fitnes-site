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
import AnimatedHomepage from '@/components/AnimatedHomepage';

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

  // Serialize Mongoose docs to plain objects for client components
  const serialized = {
    bio: bio ? JSON.parse(JSON.stringify(bio)) : null,
    testimonials: JSON.parse(JSON.stringify(testimonials)),
    gallery: JSON.parse(JSON.stringify(gallery)),
    faqs: JSON.parse(JSON.stringify(faqs)),
  };

  return (
    <>
      <Navbar />
      <AnimatedHomepage {...serialized} />
      <Footer />
      <WhatsAppButton whatsapp={bio?.whatsapp} />
    </>
  );
}
