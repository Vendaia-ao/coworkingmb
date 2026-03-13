import React, { useCallback, useEffect, useState } from 'react';
import { Linkedin } from 'lucide-react';
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
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'center' });

  useEffect(() => {
    supabase.from('team_members').select('*').eq('ativo', true).order('ordem')
      .then(({ data }) => { setMembers((data as any[]) || []); setLoading(false); });
  }, []);

  const autoplay = useCallback(() => {
    if (!emblaApi) return;
    const interval = setInterval(() => emblaApi.scrollNext(), 3000);
    return () => clearInterval(interval);
  }, [emblaApi]);

  useEffect(() => { const cleanup = autoplay(); return cleanup; }, [autoplay]);

  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Skeleton className="h-8 w-48 mx-auto mb-4" />
            <Skeleton className="h-4 w-64 mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1,2,3].map(i => <Skeleton key={i} className="h-64 rounded-xl" />)}
          </div>
        </div>
      </section>
    );
  }

  if (members.length === 0) return null;

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block py-1 px-3 rounded-full border border-gold/50 text-gold text-xs font-bold tracking-widest uppercase mb-4">
            Quem Somos
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-dark mb-4">
            A Nossa Equipa
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Profissionais dedicados a criar a melhor experiência de coworking em Angola.
          </p>
        </div>

        <div className="hidden md:grid grid-cols-3 gap-8">
          {members.map((member) => <TeamCard key={member.id} member={member} />)}
        </div>

        <div className="md:hidden overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {members.map((member) => (
              <div key={member.id} className="flex-[0_0_85%] min-w-0 pl-4 first:pl-0">
                <TeamCard member={member} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

function TeamCard({ member }: { member: TeamMember }) {
  return (
    <div className="group text-center">
      <div className="relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden border-4 border-gray-100 group-hover:border-gold transition-colors duration-300">
        <img src={member.imagem} alt={member.nome} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-brand-dark/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-white hover:text-gold transition-colors">
            <Linkedin size={28} />
          </a>
        </div>
      </div>
      <h3 className="text-lg font-serif font-bold text-brand-dark">{member.nome}</h3>
      <p className="text-sm text-gold font-medium uppercase tracking-wider">{member.cargo}</p>
    </div>
  );
}
