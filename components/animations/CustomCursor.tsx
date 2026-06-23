'use client';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function CustomCursor() {
  const mx = useMotionValue(-100);
  const my = useMotionValue(-100);
  // Ring lags slightly — tight spring for snappiness
  const rx = useSpring(mx, { stiffness: 800, damping: 40, mass: 0.3 });
  const ry = useSpring(my, { stiffness: 800, damping: 40, mass: 0.3 });
  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);
    };
    const over = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      setHovering(!!el.closest('a, button, [role="button"], details summary'));
    };
    const down = () => setClicking(true);
    const up = () => setClicking(false);

    window.addEventListener('mousemove', move, { passive: true });
    window.addEventListener('mouseover', over, { passive: true });
    window.addEventListener('mousedown', down);
    window.addEventListener('mouseup', up);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', over);
      window.removeEventListener('mousedown', down);
      window.removeEventListener('mouseup', up);
    };
  }, []);

  return (
    <>
      {/* Dot — uses raw motion value, zero lag */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none rounded-full bg-accent"
        style={{
          x: mx,
          y: my,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{ width: clicking ? 5 : 7, height: clicking ? 5 : 7 }}
        transition={{ duration: 0.1 }}
      />
      {/* Ring — spring follow, stays tight */}
      <motion.div
        className="fixed top-0 left-0 z-[9998] pointer-events-none rounded-full border border-accent/70"
        style={{ x: rx, y: ry, translateX: '-50%', translateY: '-50%' }}
        animate={{
          width: hovering ? 44 : clicking ? 18 : 28,
          height: hovering ? 44 : clicking ? 18 : 28,
          opacity: hovering ? 1 : 0.5,
        }}
        transition={{ duration: 0.15, ease: 'easeOut' }}
      />
    </>
  );
}
