import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Skeleton } from '@/components/ui/skeleton';

type Testimonial = {
  id: string;
  nome: string;
  empresa: string | null;
  texto: string;
  video_url: string | null; // reutilizado como foto_url do cliente
};

export const TestimonialsSection: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (supabase.from('testimonials' as any) as any)
      .select('*')
      .eq('ativo', true)
      .order('ordem')
      .then(({ data }: any) => {
        setTestimonials(data || []);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section className="py-24 bg-[#0A0A0A] px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Skeleton className="h-10 w-64 mx-auto mb-12 bg-white/10" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map(i => (
              <Skeleton key={i} className="h-56 rounded-2xl bg-white/5" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (testimonials.length === 0) return null;

  return (
    <section className="py-24 bg-[#0A0A0A] px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative top line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="inline-block text-xs tracking-[0.25em] text-gold uppercase font-semibold mb-4">
            Reputação
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
            O Que Dizem os Nossos <span className="text-gold">Clientes</span>
          </h2>
          <div className="w-16 h-[2px] gold-gradient-bg mx-auto mt-4 rounded-full" />
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="group relative rounded-2xl overflow-hidden border border-white/8 bg-white/[0.03] hover:bg-white/[0.06] hover:border-gold/25 transition-all duration-500 p-7"
              style={{ backdropFilter: 'blur(12px)' }}
            >
              {/* Big decorative quote */}
              <Quote size={48} className="text-gold/8 absolute top-5 right-5" />

              {/* Stars */}
              <div className="flex gap-0.5 mb-5">
                {[...Array(5)].map((_, s) => (
                  <Star key={s} size={13} className="text-gold fill-gold" />
                ))}
              </div>

              {/* Testimonial text */}
              <p className="text-gray-300 leading-relaxed text-sm font-light tracking-wide mb-7 relative z-10">
                "{t.texto}"
              </p>

              {/* Author row */}
              <div className="flex items-center gap-4 pt-5 border-t border-white/8">
                {/* Client photo or initials avatar */}
                {t.video_url ? (
                  <img
                    src={t.video_url}
                    alt={t.nome}
                    className="w-12 h-12 rounded-full object-cover flex-shrink-0 ring-2 ring-gold/30"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full gold-gradient-bg flex items-center justify-center text-white font-bold text-base shadow-lg shadow-gold/20 flex-shrink-0 flex-shrink-0">
                    {t.nome.charAt(0)}
                  </div>
                )}
                <div>
                  <p className="font-semibold text-white text-sm">{t.nome}</p>
                  {t.empresa && (
                    <p className="text-xs text-gold/70 font-medium tracking-wide mt-0.5">
                      {t.empresa}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
