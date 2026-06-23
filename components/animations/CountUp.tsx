'use client';
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';
import { useRef, useEffect } from 'react';

interface Props {
  value: string;
  className?: string;
  delay?: number;
}

export default function CountUp({ value, className = '', delay = 0 }: Props) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const num = parseFloat(value.replace(/[^0-9.]/g, ''));
  const suffix = value.replace(/[0-9.]/g, '');
  const motionVal = useMotionValue(0);
  const rounded = useTransform(motionVal, (v) =>
    Number.isInteger(num) ? Math.round(v).toString() : v.toFixed(1)
  );

  useEffect(() => {
    if (inView && !isNaN(num)) {
      const ctrl = animate(motionVal, num, {
        duration: 1.8,
        delay,
        ease: [0.16, 1, 0.3, 1],
      });
      return ctrl.stop;
    }
  }, [inView]);

  if (isNaN(num)) {
    return <span ref={ref} className={className}>{value}</span>;
  }

  return (
    <span ref={ref} className={className}>
      <motion.span>{rounded}</motion.span>{suffix}
    </span>
  );
}
