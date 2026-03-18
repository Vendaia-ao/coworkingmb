import React, { useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Linkedin } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import { supabase } from '@/integrations/supabase/client';
import { Skeleton } from '@/components/ui/skeleton';

type TeamMember = {
  id: string;
  nome: string;
  cargo: string;
  imagem: string;
  linkedin: string;
};

export const TeamSection: React.FC = () => {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' });

  useEffect(() => {
    (supabase.from('team_members' as any) as any)
      .select('*').eq('ativo', true).order('ordem')
      .then(({ data }: any) => { setMembers(data || []); setLoading(false); });
  }, []);

  const autoplay = useCallback(() => {
    if (!emblaApi) return;
    const interval = setInterval(() => {
      emblaApi.scrollNext();
      setActiveIndex(emblaApi.selectedScrollSnap());
    }, 3500);
    return () => clearInterval(interval);
  }, [emblaApi]);

  useEffect(() => { const cleanup = autoplay(); return cleanup; }, [autoplay]);

  if (loading) {
    return (
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Skeleton className="h-8 w-48 mx-auto mb-4" />
          <div className="flex gap-5 mt-12">
            {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-96 w-64 flex-shrink-0" />)}
          </div>
        </div>
      </section>
    );
  }

  if (members.length === 0) return null;

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="inline-block text-xs tracking-[0.25em] text-gold uppercase font-semibold mb-3">
            Quem Somos
          </span>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-dark leading-tight">
              A Nossa <span className="text-gold-dark">Equipa</span>
            </h2>
            <p className="text-gray-500 text-sm max-w-sm leading-relaxed md:text-right">
              Profissionais dedicados a criar a melhor experiência de coworking em Angola.
            </p>
          </div>
          <div className="w-16 h-[2px] gold-gradient-bg mt-5 rounded-full" />
        </motion.div>

        {/* Desktop Grid */}
        <div className="hidden md:flex gap-5 items-end">
          {members.map((member, i) => (
            <TeamCard key={member.id} member={member} featured={i === activeIndex} index={i} onClick={() => setActiveIndex(i)} />
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden overflow-hidden" ref={emblaRef}>
          <div className="flex gap-4">
            {members.map((member, i) => (
              <div key={member.id} className="flex-[0_0_78%] min-w-0">
                <TeamCard member={member} featured={i === activeIndex} index={i} onClick={() => setActiveIndex(i)} />
              </div>
            ))}
          </div>
        </div>

        {/* Dot indicators */}
        {members.length > 1 && (
          <div className="flex justify-center gap-2 mt-8 md:hidden">
            {members.map((_, i) => (
              <button
                key={i}
                onClick={() => { setActiveIndex(i); emblaApi?.scrollTo(i); }}
                className={`h-1.5 rounded-full transition-all duration-300 ${i === activeIndex ? 'w-6 bg-gold' : 'w-1.5 bg-gray-300'}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

function TeamCard({
  member,
  featured,
  index,
  onClick,
}: {
  member: TeamMember;
  featured: boolean;
  index: number;
  onClick: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      onClick={onClick}
      className={`group relative cursor-pointer flex-1 transition-all duration-500 ${featured ? 'md:-translate-y-4' : ''}`}
    >
      {/* Photo container */}
      <div className="relative overflow-hidden" style={{ aspectRatio: '3/4' }}>
        <img
          src={member.imagem}
          alt={member.nome}
          className={`w-full h-full object-cover object-top transition-all duration-700 ${featured ? 'grayscale-0 scale-105' : 'grayscale group-hover:grayscale-0'} group-hover:scale-105`}
        />

        {/* Dark gradient bottom overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* LinkedIn badge — bottom left corner */}
        <a
          href={member.linkedin !== '#' ? member.linkedin : undefined}
          target="_blank"
          rel="noopener noreferrer"
          onClick={e => e.stopPropagation()}
          className={`absolute bottom-4 left-4 w-9 h-9 flex items-center justify-center transition-all duration-300 ${featured ? 'bg-white text-brand-dark' : 'bg-brand-dark text-white hover:bg-gold hover:text-white'}`}
        >
          <Linkedin size={15} />
        </a>
      </div>

      {/* Info strip */}
      <div
        className={`px-5 py-4 flex items-center justify-between transition-all duration-500 ${featured ? 'gold-gradient-bg' : 'bg-gray-50 group-hover:bg-gray-100'}`}
      >
        <div>
          <p className={`font-bold text-sm leading-snug ${featured ? 'text-white' : 'text-brand-dark'}`}>
            {member.nome}
          </p>
          <p className={`text-xs mt-0.5 font-medium tracking-wide ${featured ? 'text-white/80' : 'text-gray-400'}`}>
            {member.cargo}
          </p>
        </div>
        <div
          className={`w-8 h-8 flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:translate-x-1 ${featured ? 'bg-white/20' : 'bg-white'}`}
        >
          <ArrowRight size={14} className={featured ? 'text-white' : 'text-brand-dark'} />
        </div>
      </div>
    </motion.div>
  );
}
