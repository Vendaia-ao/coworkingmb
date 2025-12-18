import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TypewriterProps {
  texts: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  className?: string;
}

export const Typewriter: React.FC<TypewriterProps> = ({
  texts,
  typingSpeed = 40,
  deletingSpeed = 25,
  pauseDuration = 3000,
  className = '',
}) => {
  const [displayText, setDisplayText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const typeText = useCallback(() => {
    const currentText = texts[textIndex];

    if (isPaused) return;

    if (!isDeleting) {
      if (displayText.length < currentText.length) {
        setDisplayText(currentText.slice(0, displayText.length + 1));
      } else {
        setIsPaused(true);
        setTimeout(() => {
          setIsPaused(false);
          setIsDeleting(true);
        }, pauseDuration);
      }
    } else {
      if (displayText.length > 0) {
        setDisplayText(currentText.slice(0, displayText.length - 1));
      } else {
        setIsDeleting(false);
        setTextIndex((prev) => (prev + 1) % texts.length);
      }
    }
  }, [displayText, isDeleting, isPaused, textIndex, texts, pauseDuration]);

  useEffect(() => {
    const timeout = setTimeout(
      typeText,
      isDeleting ? deletingSpeed : typingSpeed
    );
    return () => clearTimeout(timeout);
  }, [typeText, isDeleting, typingSpeed, deletingSpeed]);

  return (
    <span className={className}>
      {displayText}
      <motion.span
        className="inline-block w-[3px] h-[1em] ml-1 align-middle"
        style={{
          background: 'linear-gradient(135deg, #D4AF37 0%, #E6C86E 50%, #C5A059 100%)',
        }}
        animate={{ opacity: [1, 0] }}
        transition={{
          duration: 0.6,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
      />
    </span>
  );
};
