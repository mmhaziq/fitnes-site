'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import FadeUp from '@/components/animations/FadeUp';
import SplitText from '@/components/animations/SplitText';
import CountUp from '@/components/animations/CountUp';
import StaggerChildren, { staggerItem } from '@/components/animations/StaggerChildren';
import MagneticButton from '@/components/animations/MagneticButton';
import ImageMarquee from '@/components/animations/ImageMarquee';
import ContactForm from '@/components/ContactForm';

interface Props {
  bio: any;
  testimonials: any[];
  gallery: any[];
  faqs: any[];
}

const defaultStats = [
  { value: '500+', label: 'Clients Trained' },
  { value: '8+', label: 'Years Experience' },
  { value: '120+', label: 'Programs Designed' },
  { value: '3', label: 'Certifications' },
];

const HERO_IMAGES = [
  { src: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=85', label: 'Strength' },
  { src: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&q=85', label: 'Conditioning' },
  { src: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=800&q=85', label: 'Power' },
];

export default function AnimatedHomepage({ bio, testimonials, gallery, faqs }: Props) {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const imgParallax = useTransform(scrollYProgress, [0, 1], ['0%', '12%']);

  const stats = bio?.stats || defaultStats;

  return (
    <main>
      {/* ── HERO ── */}
      <section ref={heroRef} className="relative bg-stone-950 overflow-hidden">
        {/* Left accent stripe */}
        <motion.div
          className="absolute top-0 left-0 w-1 bg-accent z-10"
          initial={{ height: 0 }}
          animate={{ height: '100%' }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        />

        <div className="max-w-7xl mx-auto px-8">
          <div className="grid md:grid-cols-2 gap-8 min-h-[88vh] items-center pt-28 pb-0">

            {/* LEFT — text */}
            <motion.div style={{ y: heroY, opacity: heroOpacity }} className="pb-16 relative z-10">
              <motion.p
                className="text-xs font-bold uppercase tracking-[0.3em] text-accent mb-6 flex items-center gap-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <motion.span
                  className="block h-px bg-accent"
                  initial={{ width: 0 }}
                  animate={{ width: 32 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                />
                Personal Trainer · Karachi, Pakistan
              </motion.p>

              <SplitText
                text={bio?.tagline || 'Transform your body. Elevate your life.'}
                className="font-display font-bold uppercase text-white leading-none mb-8"
                style={{ fontSize: 'clamp(2.8rem, 6vw, 6.5rem)', letterSpacing: '-0.02em' }}
                as="h1"
                delay={0.5}
                stagger={0.06}
              />

              <motion.p
                className="text-stone-400 text-base leading-relaxed max-w-sm font-light mb-10"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 1.0 }}
              >
                Science-backed training and nutrition coaching, built around you — in-person in Karachi and online worldwide.
              </motion.p>

              <motion.div
                className="flex gap-3"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 1.1 }}
              >
                <MagneticButton>
                  <Link href="/packages" className="block px-6 py-3 bg-accent text-stone-950 text-xs font-bold uppercase tracking-[0.12em] hover:bg-accent-light transition-colors">
                    View Packages
                  </Link>
                </MagneticButton>
                <MagneticButton>
                  <Link href="/#about" className="block px-6 py-3 border border-stone-700 text-stone-300 text-xs font-bold uppercase tracking-[0.12em] hover:border-white hover:text-white transition-colors">
                    About Me
                  </Link>
                </MagneticButton>
              </motion.div>
            </motion.div>

            {/* RIGHT — floating workout images */}
            <motion.div style={{ y: imgParallax }} className="hidden md:block relative h-[88vh]">
              {/* Main large image */}
              <motion.div
                className="absolute top-16 right-0 w-72 h-96 overflow-hidden"
                initial={{ opacity: 0, x: 60, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 0.9, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <motion.img
                  src="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&q=85"
                  alt="Gym training"
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.5 }}
                />
                <motion.div
                  className="absolute bottom-0 left-0 bg-accent text-stone-950 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest"
                  initial={{ width: 0 }}
                  animate={{ width: 'auto' }}
                  transition={{ duration: 0.5, delay: 1.2 }}
                >
                  Strength
                </motion.div>
              </motion.div>

              {/* Second image — offset left */}
              <motion.div
                className="absolute top-60 left-0 w-56 h-72 overflow-hidden border-4 border-stone-950"
                initial={{ opacity: 0, x: -40, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 0.9, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
              >
                <motion.img
                  src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=85"
                  alt="Barbell lift"
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.5 }}
                />
                <motion.div
                  className="absolute bottom-0 left-0 bg-stone-950/80 text-accent px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5 }}
                >
                  Power
                </motion.div>
              </motion.div>

              {/* Third image — bottom right */}
              <motion.div
                className="absolute bottom-20 right-4 w-48 h-56 overflow-hidden"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <motion.img
                  src="https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=600&q=85"
                  alt="Boxing"
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.5 }}
                />
                <div className="absolute inset-0 bg-accent/10" />
              </motion.div>

              {/* Floating accent badge */}
              <motion.div
                className="absolute top-8 left-1/2 -translate-x-1/2 border border-accent/40 text-accent text-[10px] font-bold uppercase tracking-widest px-4 py-2"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1.4 }}
              >
                Est. 2016 · Karachi
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="border-t border-stone-800 bg-stone-900/60">
          <div className="max-w-7xl mx-auto px-8">
            <StaggerChildren className="grid grid-cols-2 md:grid-cols-4 divide-x divide-stone-800" delay={1.2} stagger={0.12}>
              {stats.map((s: any, i: number) => (
                <motion.div key={i} variants={staggerItem} className="px-8 py-6">
                  <CountUp value={s.value} className="font-display font-bold text-accent uppercase block" delay={1.3 + i * 0.1} />
                  <p className="text-xs text-stone-500 uppercase tracking-[0.15em] mt-1">{s.label}</p>
                </motion.div>
              ))}
            </StaggerChildren>
          </div>
        </div>
      </section>

      {/* ── IMAGE MARQUEE ── */}
      <section className="py-6 bg-stone-900 border-y border-stone-800 overflow-hidden">
        <div className="flex flex-col gap-3">
          <ImageMarquee />
          <ImageMarquee reverse />
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="py-24 bg-stone-950 overflow-hidden">
        <div className="max-w-7xl mx-auto px-8">
          <FadeUp>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent mb-12 flex items-center gap-3">
              <span className="block w-8 h-px bg-accent" /> About
            </p>
          </FadeUp>

          <div className="grid md:grid-cols-2 gap-16 items-start">
            {/* Image with wipe reveal */}
            <FadeUp delay={0.1}>
              <div className="relative overflow-hidden group">
                <motion.div
                  className="absolute inset-0 bg-accent z-10"
                  initial={{ scaleY: 1, originY: 0 }}
                  whileInView={{ scaleY: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                />
                <div className="w-full aspect-[3/4] bg-stone-800 overflow-hidden">
                  {bio?.profileImage ? (
                    <motion.img
                      src={bio.profileImage}
                      alt={bio.name}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.04 }}
                      transition={{ duration: 0.6 }}
                    />
                  ) : (
                    <motion.img
                      src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=85"
                      alt="Personal trainer"
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.04 }}
                      transition={{ duration: 0.6 }}
                    />
                  )}
                </div>
                <div className="absolute bottom-0 left-0 bg-accent text-stone-950 px-4 py-2 text-xs font-bold uppercase tracking-widest z-20">
                  {bio?.location || 'Karachi, Pakistan'}
                </div>
              </div>
            </FadeUp>

            {/* Content */}
            <div className="pt-2">
              <FadeUp delay={0.2}>
                <SplitText
                  text={bio?.name || 'Your Trainer'}
                  as="h2"
                  className="font-display font-bold uppercase text-white mb-1 leading-none"
                  style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', letterSpacing: '-0.02em' }}
                  delay={0.3}
                  stagger={0.04}
                />
                <p className="text-accent text-xs font-bold uppercase tracking-[0.25em] mb-8 mt-2">{bio?.title || 'Certified Personal Trainer'}</p>
              </FadeUp>

              <FadeUp delay={0.35}>
                <p className="text-stone-400 leading-relaxed mb-10 text-base font-light">
                  {bio?.about || 'With over 8 years of experience in personal training and nutrition coaching, I help individuals in Karachi achieve their fitness goals through science-backed programs and personalised attention.'}
                </p>
              </FadeUp>

              {/* Workout image trio */}
              <FadeUp delay={0.4}>
                <div className="grid grid-cols-3 gap-2 mb-10">
                  {[
                    'https://images.unsplash.com/photo-1549476464-37392f717541?w=400&q=80',
                    'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400&q=80',
                    'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=400&q=80',
                  ].map((src, i) => (
                    <motion.div
                      key={i}
                      className="aspect-square overflow-hidden"
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                      whileHover={{ scale: 1.04 }}
                    >
                      <img src={src} alt="workout" className="w-full h-full object-cover" loading="lazy" />
                    </motion.div>
                  ))}
                </div>
              </FadeUp>

              {bio?.certifications?.length > 0 && (
                <FadeUp delay={0.5}>
                  <p className="text-xs font-bold uppercase tracking-[0.25em] text-stone-500 mb-5 flex items-center gap-3">
                    <span className="block w-5 h-px bg-stone-600" /> Certifications
                  </p>
                  <StaggerChildren className="space-y-2" stagger={0.08} delay={0.5}>
                    {bio.certifications.map((c: any, i: number) => (
                      <motion.div key={i} variants={staggerItem} className="flex items-start gap-4 border-l-2 border-accent pl-4 py-1">
                        <div>
                          <p className="text-sm font-semibold text-white">{c.title}</p>
                          <p className="text-xs text-stone-500">{c.issuer} · {c.year}</p>
                        </div>
                      </motion.div>
                    ))}
                  </StaggerChildren>
                </FadeUp>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── WORKOUT SHOWCASE ── */}
      <section className="py-24 bg-stone-900 overflow-hidden">
        <div className="max-w-7xl mx-auto px-8">
          <FadeUp>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent mb-4 flex items-center gap-3">
              <span className="block w-8 h-px bg-accent" /> Training
            </p>
            <SplitText
              text="What we train."
              as="h2"
              className="font-display font-bold uppercase text-white leading-none mb-14"
              style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', letterSpacing: '-0.02em' }}
              delay={0.1}
              stagger={0.06}
            />
          </FadeUp>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-stone-800">
            {[
              { src: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80', label: 'Strength', desc: 'Barbell & free weights' },
              { src: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=600&q=80', label: 'Cardio', desc: 'Boxing & conditioning' },
              { src: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600&q=80', label: 'Mobility', desc: 'Flexibility & recovery' },
              { src: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=600&q=80', label: 'Nutrition', desc: 'Diet & meal planning' },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="relative overflow-hidden group bg-stone-950"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="aspect-[3/4] overflow-hidden">
                  <motion.img
                    src={item.src}
                    alt={item.label}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    loading="lazy"
                  />
                </div>
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-stone-950/0 group-hover:bg-stone-950/50 transition-colors duration-400" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <p className="font-display font-bold text-white uppercase tracking-wide" style={{ fontSize: '1.3rem' }}>{item.label}</p>
                  <motion.p
                    className="text-stone-400 text-xs mt-1 overflow-hidden"
                    initial={{ height: 0, opacity: 0 }}
                    whileInView={{ height: 'auto', opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
                  >
                    {item.desc}
                  </motion.p>
                </div>
                {/* Accent bar bottom */}
                <motion.div
                  className="absolute bottom-0 left-0 h-0.5 bg-accent"
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.4 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GALLERY ── */}
      {gallery.length > 0 && (
        <section id="gallery" className="py-24 bg-stone-950">
          <div className="max-w-7xl mx-auto px-8">
            <FadeUp>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent mb-4 flex items-center gap-3">
                <span className="block w-8 h-px bg-accent" /> Results
              </p>
              <div className="flex items-end justify-between mb-12">
                <SplitText text="Real Transformations" as="h2" className="font-display font-bold uppercase text-white leading-none" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', letterSpacing: '-0.02em' }} delay={0.1} stagger={0.05} />
                <p className="text-stone-500 text-sm max-w-xs text-right hidden md:block">No filters. No tricks. Real clients, real results.</p>
              </div>
            </FadeUp>

            <StaggerChildren className="grid md:grid-cols-3 gap-px bg-stone-800" stagger={0.1}>
              {gallery.map((item: any) => (
                <motion.div key={item._id.toString()} variants={staggerItem} className="bg-stone-950 group">
                  <div className="grid grid-cols-2 gap-px bg-stone-800">
                    <div className="relative overflow-hidden">
                      <motion.img src={item.beforeImage} alt="Before" className="w-full h-56 object-cover" whileHover={{ scale: 1.06 }} transition={{ duration: 0.5 }} />
                      <span className="absolute top-2 left-2 text-[10px] bg-stone-950/90 text-stone-400 px-2 py-0.5 uppercase tracking-widest font-bold">Before</span>
                    </div>
                    <div className="relative overflow-hidden">
                      <motion.img src={item.afterImage} alt="After" className="w-full h-56 object-cover" whileHover={{ scale: 1.06 }} transition={{ duration: 0.5 }} />
                      <span className="absolute top-2 left-2 text-[10px] bg-accent text-stone-950 px-2 py-0.5 uppercase tracking-widest font-bold">After</span>
                    </div>
                  </div>
                  <div className="p-4 border-t border-stone-800">
                    <p className="text-white text-sm font-semibold uppercase tracking-wide">{item.clientName || 'Client'}</p>
                    {item.duration && <p className="text-accent text-xs font-bold mt-0.5">{item.duration}</p>}
                  </div>
                </motion.div>
              ))}
            </StaggerChildren>
          </div>
        </section>
      )}

      {/* ── TESTIMONIALS ── */}
      {testimonials.length > 0 && (
        <section id="testimonials" className="py-24 bg-stone-900">
          <div className="max-w-7xl mx-auto px-8">
            <FadeUp>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent mb-4 flex items-center gap-3">
                <span className="block w-8 h-px bg-accent" /> Testimonials
              </p>
              <SplitText text="What Clients Say" as="h2" className="font-display font-bold uppercase text-white leading-none mb-14" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', letterSpacing: '-0.02em' }} delay={0.1} stagger={0.05} />
            </FadeUp>

            <StaggerChildren className="grid md:grid-cols-3 gap-px bg-stone-800" stagger={0.12}>
              {testimonials.map((t: any) => (
                <motion.div key={t._id.toString()} variants={staggerItem} className="bg-stone-900 p-8" whileHover={{ backgroundColor: 'rgb(28 25 23)' }} transition={{ duration: 0.2 }}>
                  <p className="text-accent text-sm mb-5 tracking-widest">{'★'.repeat(t.rating)}{'☆'.repeat(5 - t.rating)}</p>
                  <p className="text-stone-300 text-sm leading-relaxed mb-8 font-light">"{t.text}"</p>
                  <div className="flex items-center gap-3 border-t border-stone-800 pt-5">
                    {t.photo ? (
                      <img src={t.photo} alt={t.name} className="w-9 h-9 object-cover" />
                    ) : (
                      <div className="w-9 h-9 bg-accent/20 flex items-center justify-center text-accent font-bold text-sm">{t.name[0]}</div>
                    )}
                    <div>
                      <p className="text-white font-bold text-xs uppercase tracking-wider">{t.name}</p>
                      {t.role && <p className="text-stone-500 text-xs mt-0.5">{t.role}</p>}
                    </div>
                  </div>
                </motion.div>
              ))}
            </StaggerChildren>
          </div>
        </section>
      )}

      {/* ── CTA ── */}
      <section className="relative py-32 overflow-hidden">
        {/* Full-bleed background image with parallax */}
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.1 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <img
            src="https://images.unsplash.com/photo-1549476464-37392f717541?w=1600&q=80"
            alt="Training"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-stone-950/75" />
          <div className="absolute inset-0 bg-accent/10" />
        </motion.div>

        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-[0.05]"
          style={{ backgroundImage: 'repeating-linear-gradient(0deg, #fff 0, #fff 1px, transparent 0, transparent 40px), repeating-linear-gradient(90deg, #fff 0, #fff 1px, transparent 0, transparent 40px)' }}
        />

        <div className="max-w-7xl mx-auto px-8 relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <SplitText
            text="Ready to start?"
            as="h2"
            className="font-display font-bold uppercase text-white leading-none"
            style={{ fontSize: 'clamp(2.5rem, 7vw, 6rem)', letterSpacing: '-0.02em' }}
            delay={0.1}
            stagger={0.08}
          />
          <MagneticButton>
            <Link href="/packages" className="inline-block px-8 py-4 bg-accent text-stone-950 text-xs font-bold uppercase tracking-[0.15em] hover:bg-accent-light transition-colors">
              See Packages →
            </Link>
          </MagneticButton>
        </div>
      </section>

      {/* ── FAQ ── */}
      {faqs.length > 0 && (
        <section id="faq" className="py-24 bg-stone-950">
          <div className="max-w-7xl mx-auto px-8">
            <FadeUp>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent mb-4 flex items-center gap-3">
                <span className="block w-8 h-px bg-accent" /> FAQ
              </p>
              <SplitText text="Common Questions" as="h2" className="font-display font-bold uppercase text-white leading-none mb-14" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', letterSpacing: '-0.02em' }} delay={0.1} stagger={0.05} />
            </FadeUp>
            <StaggerChildren className="divide-y divide-stone-800 border-t border-stone-800" stagger={0.07}>
              {faqs.map((faq: any) => (
                <motion.details key={faq._id.toString()} variants={staggerItem} className="group py-5">
                  <summary className="flex items-center justify-between text-white font-display font-semibold uppercase tracking-wide select-none hover:text-accent transition-colors cursor-pointer" style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)' }}>
                    {faq.question}
                    <svg className="w-4 h-4 text-stone-500 group-open:rotate-180 transition-transform flex-shrink-0 ml-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <p className="mt-4 text-stone-400 text-sm leading-relaxed font-light max-w-2xl">{faq.answer}</p>
                </motion.details>
              ))}
            </StaggerChildren>
          </div>
        </section>
      )}

      {/* ── CONTACT ── */}
      <section id="contact" className="py-24 bg-stone-900">
        <div className="max-w-7xl mx-auto px-8">
          <FadeUp>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent mb-4 flex items-center gap-3">
              <span className="block w-8 h-px bg-accent" /> Contact
            </p>
          </FadeUp>
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <SplitText text="Let's Talk." as="h2" className="font-display font-bold uppercase text-white leading-none mb-6" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', letterSpacing: '-0.02em' }} delay={0.1} stagger={0.08} />
              <FadeUp delay={0.3}>
                <p className="text-stone-400 mb-8 font-light text-base leading-relaxed max-w-sm">
                  Reach out via WhatsApp for the fastest response, or fill the form and I'll get back to you.
                </p>
                <div className="flex flex-col gap-3">
                  {bio?.whatsapp && (
                    <MagneticButton>
                      <a href={bio.whatsapp} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-3 px-5 py-3.5 bg-green-500/10 border border-green-500/30 text-green-400 text-xs font-bold uppercase tracking-[0.12em] hover:bg-green-500/20 transition-colors">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                        </svg>
                        Chat on WhatsApp
                      </a>
                    </MagneticButton>
                  )}
                  {bio?.email && (
                    <MagneticButton>
                      <a href={`mailto:${bio.email}`}
                        className="flex items-center gap-3 px-5 py-3.5 border border-stone-700 text-stone-300 text-xs font-bold uppercase tracking-[0.12em] hover:border-white hover:text-white transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        {bio.email}
                      </a>
                    </MagneticButton>
                  )}
                </div>
              </FadeUp>
            </div>
            <FadeUp delay={0.2}>
              <ContactForm />
            </FadeUp>
          </div>
        </div>
      </section>
    </main>
  );
}
