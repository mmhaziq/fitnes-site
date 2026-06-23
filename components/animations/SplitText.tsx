'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface Props {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  stagger?: number;
  as?: 'h1' | 'h2' | 'p' | 'span';
}

export default function SplitText({ text, className = '', style, delay = 0, stagger = 0.04, as = 'h1' }: Props) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const words = text.split(' ');
  const Tag = as;

  return (
    <Tag ref={ref} className={className} style={style} aria-label={text}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.25em] last:mr-0">
          <motion.span
            className="inline-block"
            initial={{ y: '110%', opacity: 0 }}
            animate={inView ? { y: '0%', opacity: 1 } : { y: '110%', opacity: 0 }}
            transition={{ duration: 0.65, delay: delay + i * stagger, ease: [0.16, 1, 0.3, 1] }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
