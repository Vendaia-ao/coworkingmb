import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const VideoSection: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
        if (entry.isIntersecting) {
          videoRef.current?.play();
        } else {
          videoRef.current?.pause();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-foreground relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-serif">
            Conheça o Nosso <span className="gold-gradient-text">Espaço</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Descubra um ambiente profissional pensado para impulsionar o seu negócio.
          </p>
        </motion.div>

        <motion.div
          className="relative rounded-lg overflow-hidden shadow-2xl"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <video
            ref={videoRef}
            src="/promo-video.mp4"
            muted
            loop
            playsInline
            preload="metadata"
            className="w-full aspect-video object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
};
