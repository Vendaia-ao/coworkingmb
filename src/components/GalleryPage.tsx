import React, { useState } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const galleryImages = [
  { src: '/rooms.jpg', alt: 'Sala de Reunião', category: 'Salas' },
  { src: '/desks.jpg', alt: 'Secretárias de Coworking', category: 'Secretárias' },
  { src: '/hero.jpg', alt: 'Espaço Principal', category: 'Espaços' },
  { src: '/virtualroom.jpg', alt: 'Sala Virtual', category: 'Salas' },
  { src: '/salas.png', alt: 'Sala de Conferência', category: 'Salas' },
  { src: '/secretarias.png', alt: 'Área de Trabalho', category: 'Secretárias' },
  { src: '/networking.png', alt: 'Área de Networking', category: 'Espaços' },
  { src: '/credibilidade.png', alt: 'Recepção', category: 'Espaços' },
];

const categories = ['Todos', 'Salas', 'Secretárias', 'Espaços'];

export const GalleryPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('Todos');
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const filtered = activeFilter === 'Todos'
    ? galleryImages
    : galleryImages.filter((img) => img.category === activeFilter);

  return (
    <div className="bg-gray-50 min-h-screen animate-fade-in">
      {/* Hero */}
      <section className="relative h-[40vh] min-h-[320px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="/hero.jpg" alt="Galeria Mulato Business" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/90 via-brand-dark/70 to-gray-50"></div>
        </div>
        <div className="relative z-10 text-center mt-12">
          <span className="inline-block py-1 px-3 rounded-full border border-gold/50 text-gold text-xs font-bold tracking-widest uppercase mb-4 backdrop-blur-md">
            Os Nossos Espaços
          </span>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-4">Galeria</h1>
          <p className="text-gray-300 max-w-xl mx-auto font-light">Conheça os nossos espaços de trabalho premium.</p>
        </div>
      </section>

      {/* Filter + Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto -mt-12 relative z-20">
        {/* Filter tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-5 py-2 rounded-full text-sm font-bold tracking-wider uppercase transition-all duration-300 ${
                activeFilter === cat
                  ? 'gold-gradient-bg text-white shadow-lg'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-gold hover:text-gold'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((img, idx) => (
            <motion.div
              key={img.src + idx}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="group relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transition-shadow duration-300"
              onClick={() => setLightboxImage(img.src)}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                <div>
                  <p className="text-white font-serif font-bold text-lg">{img.alt}</p>
                  <span className="text-gold text-xs font-bold uppercase tracking-widest">{img.category}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
            onClick={() => setLightboxImage(null)}
          >
            <button
              className="absolute top-6 right-6 text-white hover:text-gold transition-colors"
              onClick={() => setLightboxImage(null)}
            >
              <X size={32} />
            </button>
            <motion.img
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              src={lightboxImage}
              alt="Galeria"
              className="max-w-full max-h-[85vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
