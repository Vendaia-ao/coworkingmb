import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { Skeleton } from '@/components/ui/skeleton';

type GalleryImage = { id: string; url: string; titulo: string | null; descricao: string | null; categoria?: string | null };

// Fallback static images used when galeria table is empty
const fallbackImages: GalleryImage[] = [
  { id: 'f1', url: '/rooms.jpg', titulo: 'Sala de Reunião', descricao: 'Salas', categoria: 'Destaques' },
  { id: 'f2', url: '/desks.jpg', titulo: 'Secretárias de Coworking', descricao: 'Secretárias', categoria: 'Destaques' },
  { id: 'f3', url: '/hero.jpg', titulo: 'Espaço Principal', descricao: 'Espaços', categoria: 'Destaques' },
  { id: 'f4', url: '/virtualroom.jpg', titulo: 'Sala Virtual', descricao: 'Salas', categoria: 'Destaques' },
  { id: 'f5', url: '/salas.png', titulo: 'Sala de Conferência', descricao: 'Salas', categoria: 'Dinâmica' },
  { id: 'f6', url: '/secretarias.png', titulo: 'Área de Trabalho', descricao: 'Secretárias', categoria: 'Dinâmica' },
  { id: 'f7', url: '/networking.png', titulo: 'Área de Networking', descricao: 'Espaços', categoria: 'Dinâmica' },
  { id: 'f8', url: '/credibilidade.png', titulo: 'Recepção', descricao: 'Espaços', categoria: 'Dinâmica' },
];

const BentoGrid = ({ images, setLightboxImage }: { images: GalleryImage[], setLightboxImage: (url: string) => void }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[250px] md:auto-rows-[300px] max-w-7xl mx-auto px-4 relative z-20">
      {images.map((img, index) => {
        let spanClass = "md:col-span-1 md:row-span-1";
        const mod = index % 5;
        if (mod === 0) spanClass = "md:col-span-2 md:row-span-2";
        else if (mod === 4) spanClass = "md:col-span-2 md:row-span-1";

        return (
          <motion.div
            key={img.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`group relative overflow-hidden cursor-pointer shadow-md ${spanClass}`}
            onClick={() => setLightboxImage(img.url)}
          >
            <img src={img.url} alt={img.titulo || ''} className="w-full h-full object-cover bg-gray-100 group-hover:scale-105 transition-transform duration-500" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
              <div>
                <p className="text-white font-serif font-bold text-lg">{img.titulo}</p>
                {img.descricao && <span className="text-gold text-xs font-bold uppercase tracking-widest">{img.descricao}</span>}
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

export const GalleryPage: React.FC = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('Todos');

  useEffect(() => {
    supabase.from('galeria').select('*').eq('ativo', true).order('ordem')
      .then(({ data }) => {
        const items = (data as any[]) || [];
        setImages(items.length > 0 ? items : fallbackImages);
        setLoading(false);
      });
  }, []);

  const categories = ['Todos', ...Array.from(new Set(images.map(img => img.categoria || 'Geral')))];

  const filteredImages = activeCategory === 'Todos'
    ? images
    : images.filter(img => (img.categoria || 'Geral') === activeCategory);

  return (
    <div className="bg-gray-50 min-h-screen animate-fade-in pb-24">
      <Helmet>
        <title>Galeria de Fotos | Conheça os Nossos Espaços na Coworking MB</title>
        <meta name="description" content="Veja fotos reais das nossas salas de reunião, escritórios privativos e áreas de coworking no Kilamba, Luanda. Um ambiente de alto padrão para o seu negócio." />
        <link rel="canonical" href="https://coworking.mulatobusiness.com/galeria" />
      </Helmet>
      <section className="relative h-[40vh] min-h-[320px] flex items-center justify-center overflow-hidden mb-12">
        <div className="absolute inset-0 z-0">
          <img src="/hero.jpg" alt="Galeria de fotos do espaço Coworking MB no Kilamba, Luanda" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/90 via-brand-dark/70 to-gray-50"></div>
        </div>
        <div className="relative z-10 text-center mt-12">
          <span className="inline-block py-1 px-3 rounded-full border border-gold/50 text-gold text-xs font-bold tracking-widest uppercase mb-4 backdrop-blur-md">
            Os Nossos Espaços
          </span>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-4">Galeria</h1>
          <p className="text-gray-300 max-w-xl mx-auto font-light px-4">Conheça os nossos espaços de trabalho premium.</p>
        </div>
      </section>

      {loading ? (
        <div className="py-16 px-4 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map(i => <Skeleton key={i} className={`${i === 1 ? 'col-span-2 row-span-2 h-[500px]' : 'h-[240px]'}`} />)}
          </div>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 border ${activeCategory === cat ? 'bg-brand-dark text-white border-brand-dark' : 'bg-white text-gray-700 border-gray-200 hover:border-gold hover:text-gold'} transition-all duration-300 shadow-sm text-sm font-medium`}
              >
                {cat}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <BentoGrid images={filteredImages} setLightboxImage={setLightboxImage} />

              {filteredImages.length === 0 && (
                <div className="text-center py-20 text-gray-500">
                  Nenhuma imagem encontrada nesta categoria.
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      )}

      <AnimatePresence>
        {lightboxImage && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 backdrop-blur-sm" onClick={() => setLightboxImage(null)}>
            <button className="absolute top-6 right-6 text-white hover:text-gold transition-colors z-50 bg-black/50 p-2 rounded-full" onClick={() => setLightboxImage(null)}>
              <X size={28} />
            </button>
            <motion.img initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              src={lightboxImage} alt="Galeria" className="max-w-[95vw] max-h-[90vh] object-contain shadow-2xl" onClick={(e) => e.stopPropagation()} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
