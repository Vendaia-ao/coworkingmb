import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import { OFFERINGS } from '../constants';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const premiumEasing = [0.22, 1, 0.36, 1] as [number, number, number, number];

export const ServicesGrid: React.FC = () => {
  const extendedOfferings = [
    OFFERINGS[OFFERINGS.length - 1],
    ...OFFERINGS,
    ...OFFERINGS.slice(0, 3)
  ];

  const [currentIndex, setCurrentIndex] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const transitionRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  useEffect(() => {
    const handleResize = () => {
      setItemsPerPage(window.innerWidth >= 1024 ? 3 : 1);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleTransitionEnd = () => {
    setIsTransitioning(false);

    if (currentIndex >= OFFERINGS.length + 1) {
      setCurrentIndex(1);
    }
    else if (currentIndex <= 0) {
      setCurrentIndex(OFFERINGS.length);
    }
  };

  const nextSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(prev => prev + 1);
  }, [isTransitioning]);

  const prevSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(prev => prev - 1);
  }, [isTransitioning]);

  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        nextSlide();
      }, 4000);
    }
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isAutoPlaying, nextSlide]);

  const pauseAutoPlay = () => setIsAutoPlaying(false);
  const resumeAutoPlay = () => setIsAutoPlaying(true);

  const translateX = -(currentIndex * (100 / itemsPerPage));

  return (
    <section ref={sectionRef} className="py-20 bg-gray-50 bg-texture-noise relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, ease: premiumEasing }}
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-dark mb-4">
            O Que <span className="text-gold-dark">Oferecemos</span>
          </h2>
          <motion.div
            className="w-24 h-1 gold-gradient-bg mx-auto rounded-full"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: premiumEasing }}
          />
        </motion.div>

        {/* Carousel Container */}
        <motion.div
          className="relative group"
          onMouseEnter={pauseAutoPlay}
          onMouseLeave={resumeAutoPlay}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.3, ease: premiumEasing }}
        >
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-gold hover:text-white text-brand-dark p-3 rounded-full shadow-lg backdrop-blur-sm transition-all duration-300 transform -translate-x-1/2 md:-translate-x-6 opacity-0 group-hover:opacity-100"
            aria-label="Anterior"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-gold hover:text-white text-brand-dark p-3 rounded-full shadow-lg backdrop-blur-sm transition-all duration-300 transform translate-x-1/2 md:translate-x-6 opacity-0 group-hover:opacity-100"
            aria-label="Próximo"
          >
            <ChevronRight size={24} />
          </button>

          {/* Slider Track Wrapper */}
          <div className="overflow-hidden py-10 -my-10">
            <div
              ref={transitionRef}
              className="flex"
              style={{
                transform: `translateX(${translateX}%)`,
                transition: isTransitioning ? 'transform 500ms ease-out' : 'none'
              }}
              onTransitionEnd={handleTransitionEnd}
            >
              {extendedOfferings.map((offer, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 px-3"
                  style={{ width: `${100 / itemsPerPage}%` }}
                >
                  <motion.div
                    className="group/card relative bg-white overflow-hidden cursor-pointer h-full flex flex-col"
                    style={{
                      boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
                      willChange: 'transform, box-shadow',
                    }}
                    whileHover={{
                      y: -6,
                      boxShadow: '0 16px 48px -8px rgba(0,0,0,0.14)',
                    }}
                    transition={{ duration: 0.35, ease: premiumEasing }}
                  >
                    {/* Image — clean, no overlay */}
                    <div className="h-56 overflow-hidden flex-shrink-0">
                      <img
                        src={offer.image}
                        alt={offer.title}
                        className="w-full h-full object-cover transform group-hover/card:scale-105 transition-transform duration-700 ease-out"
                      />
                    </div>

                    {/* Gold accent bar */}
                    <div className="h-[3px] w-full gold-gradient-bg flex-shrink-0" />

                    {/* Content */}
                    <div className="p-7 flex flex-col flex-1">
                      <h3 className="text-base font-bold text-brand-dark mb-3 tracking-tight leading-snug group-hover/card:text-gold-dark transition-colors duration-300">
                        {offer.title}
                      </h3>
                      <p className="text-gray-500 text-sm leading-relaxed flex-1">
                        {offer.description}
                      </p>

                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
