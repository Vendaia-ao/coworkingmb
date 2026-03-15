import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { Skeleton } from '@/components/ui/skeleton';

type GalleryImage = { id: string; url: string; titulo: string | null; descricao: string | null };

// Fallback static images used when galeria table is empty
const fallbackImages = [
  { id: 'f1', url: '/rooms.jpg', titulo: 'Sala de Reunião', descricao: 'Salas' },
  { id: 'f2', url: '/desks.jpg', titulo: 'Secretárias de Coworking', descricao: 'Secretárias' },
  { id: 'f3', url: '/hero.jpg', titulo: 'Espaço Principal', descricao: 'Espaços' },
  { id: 'f4', url: '/virtualroom.jpg', titulo: 'Sala Virtual', descricao: 'Salas' },
  { id: 'f5', url: '/salas.png', titulo: 'Sala de Conferência', descricao: 'Salas' },
  { id: 'f6', url: '/secretarias.png', titulo: 'Área de Trabalho', descricao: 'Secretárias' },
  { id: 'f7', url: '/networking.png', titulo: 'Área de Networking', descricao: 'Espaços' },
  { id: 'f8', url: '/credibilidade.png', titulo: 'Recepção', descricao: 'Espaços' },
];

export const GalleryPage: React.FC = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  useEffect(() => {
    supabase.from('galeria').select('*').eq('ativo', true).order('ordem')
      .then(({ data }) => {
        const items = (data as any[]) || [];
        setImages(items.length > 0 ? items : fallbackImages);
        setLoading(false);
      });
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen animate-fade-in">
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

      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto -mt-12 relative z-20">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1,2,3,4,5,6].map(i => <Skeleton key={i} className="aspect-[4/3] rounded-xl" />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map((img) => (
              <motion.div
                key={img.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="group relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transition-shadow duration-300"
                onClick={() => setLightboxImage(img.url)}
              >
                <img src={img.url} alt={img.titulo || ''} className="w-full h-full object-contain bg-gray-100 group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                  <div>
                    <p className="text-white font-serif font-bold text-lg">{img.titulo}</p>
                    {img.descricao && <span className="text-gold text-xs font-bold uppercase tracking-widest">{img.descricao}</span>}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      <AnimatePresence>
        {lightboxImage && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4" onClick={() => setLightboxImage(null)}>
            <button className="absolute top-6 right-6 text-white hover:text-gold transition-colors" onClick={() => setLightboxImage(null)}>
              <X size={32} />
            </button>
            <motion.img initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }}
              src={lightboxImage} alt="Galeria" className="max-w-full max-h-[85vh] object-contain rounded-lg" onClick={(e) => e.stopPropagation()} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
