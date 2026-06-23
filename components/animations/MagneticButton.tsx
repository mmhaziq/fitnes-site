'use client';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';

interface Props {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}

export default function MagneticButton({ children, className = '', strength = 0.3 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 150, damping: 15 });
  const sy = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouse = (e: React.MouseEvent) => {
    const rect = ref.current!.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * strength);
    y.set((e.clientY - cy) * strength);
  };

  const reset = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      ref={ref}
      style={{ x: sx, y: sy }}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      className={className}
    >
      {children}
    </motion.div>
  );
}
