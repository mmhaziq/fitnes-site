'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface Props {
  className?: string;
  delay?: number;
  direction?: 'left' | 'right' | 'top';
}

export default function RevealLine({ className = '', delay = 0, direction = 'left' }: Props) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  const initial = direction === 'top' ? { scaleY: 0, originY: 0 } : { scaleX: 0, originX: direction === 'left' ? 0 : 1 };
  const animate = direction === 'top' ? { scaleY: inView ? 1 : 0 } : { scaleX: inView ? 1 : 0 };

  return (
    <motion.span
      ref={ref}
      className={`block ${className}`}
      initial={initial}
      animate={animate}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    />
  );
}
