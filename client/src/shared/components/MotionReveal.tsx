import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export interface MotionRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number;
}

export const MotionReveal: React.FC<MotionRevealProps> = ({
  children,
  className,
  delay = 0,
  duration = 0.65,
  direction = 'up',
  distance = 24
}) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const getInitialPosition = () => {
    switch (direction) {
      case 'up':
        return { y: distance, x: 0 };
      case 'down':
        return { y: -distance, x: 0 };
      case 'left':
        return { x: distance, y: 0 };
      case 'right':
        return { x: -distance, y: 0 };
      case 'none':
      default:
        return { x: 0, y: 0 };
    }
  };

  const initial = {
    opacity: 0,
    ...getInitialPosition()
  };

  const animate = {
    opacity: 1,
    x: 0,
    y: 0
  };

  return (
    <motion.div
      initial={initial}
      whileInView={animate}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98] // Architectural cubic bezier
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
