import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface ShimmerButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  shimmerInterval?: number;
}

export const ShimmerButton: React.FC<ShimmerButtonProps> = ({
  children,
  onClick,
  className = '',
  shimmerInterval = 4000,
}) => {
  const [isShimmering, setIsShimmering] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsShimmering(true);
      setTimeout(() => setIsShimmering(false), 600);
    }, shimmerInterval);

    return () => clearInterval(interval);
  }, [shimmerInterval]);

  return (
    <motion.button
      onClick={onClick}
      className={`relative overflow-hidden ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ x: '-100%', opacity: 0 }}
        animate={isShimmering ? { x: '100%', opacity: 1 } : { x: '-100%', opacity: 0 }}
        transition={{ duration: 0.6, ease: 'linear' }}
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)',
          transform: 'skewX(-20deg)',
        }}
      />
    </motion.button>
  );
};
