'use client';
import { motion } from 'framer-motion';

const IMAGES = [
  { src: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80', alt: 'Barbell training' },
  { src: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&q=80', alt: 'Gym workout' },
  { src: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=600&q=80', alt: 'Boxing training' },
  { src: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80', alt: 'Fitness training' },
  { src: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600&q=80', alt: 'Push up' },
  { src: 'https://images.unsplash.com/photo-1549476464-37392f717541?w=600&q=80', alt: 'Deadlift' },
  { src: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=600&q=80', alt: 'Weight training' },
  { src: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=600&q=80', alt: 'Gym session' },
];

// Duplicate for seamless loop
const TRACK = [...IMAGES, ...IMAGES];

export default function ImageMarquee({ reverse = false }: { reverse?: boolean }) {
  return (
    <div className="overflow-hidden w-full">
      <motion.div
        className="flex gap-3 w-max"
        animate={{ x: reverse ? ['-50%', '0%'] : ['0%', '-50%'] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear', repeatType: 'loop' }}
      >
        {TRACK.map((img, i) => (
          <div
            key={i}
            className="relative w-52 h-36 flex-shrink-0 overflow-hidden group"
          >
            <motion.img
              src={img.src}
              alt={img.alt}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.08 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              loading="lazy"
            />
            {/* Accent tint on hover */}
            <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/20 transition-colors duration-300" />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
