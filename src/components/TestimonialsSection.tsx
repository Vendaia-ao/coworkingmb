import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Quote, Star } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Skeleton } from '@/components/ui/skeleton';

type Testimonial = {
  id: string;
  nome: string;
  empresa: string | null;
  texto: string;
  video_url: string | null;
};

export const TestimonialsSection: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (supabase.from('testimonials' as any) as any).select('*').eq('ativo', true).order('ordem')
      .then(({ data }: any) => { setTestimonials(data || []); setLoading(false); });
  }, []);

  if (loading) {
    return (
      <section className="py-24 bg-[#0A0A0A] px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Skeleton className="h-10 w-64 mx-auto mb-12 bg-white/10" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-80 rounded-2xl bg-white/5" />)}
          </div>
        </div>
      </section>
    );
  }

  if (testimonials.length === 0) return null;

  return (
    <section className="py-24 bg-[#0A0A0A] px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-5 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <span className="inline-block text-xs tracking-[0.25em] text-gold uppercase font-semibold mb-4">Reputação</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
            O Que Dizem os Nossos <span className="text-gold">Clientes</span>
          </h2>
          <div className="w-16 h-[2px] gold-gradient-bg mx-auto mt-4 rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="group relative rounded-2xl overflow-hidden border border-white/8 bg-white/[0.03] hover:bg-white/[0.06] hover:border-gold/25 transition-all duration-500"
              style={{ backdropFilter: 'blur(12px)' }}
            >
              {t.video_url ? (
                <div className="relative aspect-video">
                  <video src={t.video_url} controls className="w-full h-full object-cover" preload="metadata" />
                  <div className="absolute inset-0 ring-1 ring-white/10 rounded-t-2xl pointer-events-none" />
                </div>
              ) : (
                <div className="relative aspect-video bg-gradient-to-br from-brand-dark/60 to-black flex items-center justify-center">
                  <div className="absolute inset-0 bg-[url('/placeholder.svg')] bg-cover bg-center opacity-10" />
                  <div className="relative z-10 flex flex-col items-center gap-3">
                    <div className="w-16 h-16 rounded-full gold-gradient-bg flex items-center justify-center shadow-2xl shadow-gold/30 group-hover:scale-110 transition-transform duration-300">
                      <Play size={26} className="text-white ml-1" />
                    </div>
                    <span className="text-white/50 text-xs font-medium tracking-wider uppercase">Vídeo Testemunho</span>
                  </div>
                </div>
              )}

              <div className="p-7 relative">
                {/* Stars */}
                <div className="flex gap-0.5 mb-4">
                  {[...Array(5)].map((_, s) => (
                    <Star key={s} size={13} className="text-gold fill-gold" />
                  ))}
                </div>

                {/* Large decorative quote */}
                <Quote size={40} className="text-gold/10 absolute top-6 right-6" />

                <p className="text-gray-300 leading-relaxed mb-6 text-sm font-light tracking-wide">
                  "{t.texto}"
                </p>

                <div className="flex items-center gap-3 pt-5 border-t border-white/8">
                  <div className="w-10 h-10 rounded-full gold-gradient-bg flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-gold/20 flex-shrink-0">
                    {t.nome.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-white text-sm">{t.nome}</p>
                    {t.empresa && <p className="text-xs text-gold/70 font-medium tracking-wide">{t.empresa}</p>}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
