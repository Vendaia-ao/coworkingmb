import React, { useState, useEffect, useRef, useCallback } from 'react';
import { OFFERINGS } from '../constants';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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
    <section className="py-20 bg-gray-50 bg-texture-noise relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-dark mb-4">
            O Que <span className="text-gold-dark">Oferecemos</span>
          </h2>
          <div className="w-24 h-1 gold-gradient-bg mx-auto rounded-full"></div>
        </div>

        {/* Carousel Container */}
        <div 
          className="relative group"
          onMouseEnter={pauseAutoPlay}
          onMouseLeave={resumeAutoPlay}
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
                  className="flex-shrink-0 px-4"
                  style={{ width: `${100 / itemsPerPage}%` }}
                >
                  <div className="group/card relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer border border-transparent hover:border-gold/30 h-full">
                    {/* Image Container */}
                    <div className="h-48 overflow-hidden relative">
                      <img 
                        src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop" 
                        alt={offer.title} 
                        className="w-full h-full object-cover transform group-hover/card:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover/card:bg-black/0 transition-colors duration-500"></div>
                    </div>

                    {/* Content */}
                    <div className="p-6 relative bg-white z-10 h-full">
                      <div className="absolute -top-10 right-6 w-12 h-12 gold-gradient-bg rounded-full flex items-center justify-center shadow-lg group-hover/card:rotate-12 transition-transform duration-300">
                        <offer.icon className="text-white w-6 h-6" />
                      </div>
                      
                      <h3 className="text-xl font-bold text-brand-dark mb-2 group-hover/card:text-gold-dark transition-colors">
                        {offer.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed mb-4">
                        {offer.description}
                      </p>
                      
                      <div className="absolute bottom-6 left-6 right-6">
                        <div className="w-full h-[1px] bg-gray-100 group-hover/card:bg-gold/50 transition-colors mb-4"></div>
                        <div className="text-xs font-bold text-gold-dark uppercase tracking-widest opacity-0 group-hover/card:opacity-100 transform translate-y-2 group-hover/card:translate-y-0 transition-all duration-300">
                          Saiba Mais
                        </div>
                      </div>
                      
                      {/* Spacer for absolute positioned bottom content */}
                      <div className="h-8"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
