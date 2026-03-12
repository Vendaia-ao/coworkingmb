import React, { useCallback, useEffect } from 'react';
import { Linkedin } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';

const teamMembers = [
  {
    name: 'Maria Clementina',
    role: 'Directora de Operações',
    image: '/placeholder.svg',
    linkedin: '#',
  },
  {
    name: 'Arlete Cacoma',
    role: 'Gestora Comercial',
    image: '/placeholder.svg',
    linkedin: '#',
  },
  {
    name: 'Gamaliel Jorge',
    role: 'Recepcionista',
    image: '/placeholder.svg',
    linkedin: '#',
  },
];

export const TeamSection: React.FC = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'center' });

  const autoplay = useCallback(() => {
    if (!emblaApi) return;
    const interval = setInterval(() => emblaApi.scrollNext(), 3000);
    return () => clearInterval(interval);
  }, [emblaApi]);

  useEffect(() => {
    const cleanup = autoplay();
    return cleanup;
  }, [autoplay]);

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

        {/* Desktop grid */}
        <div className="hidden md:grid grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <TeamCard key={member.name} member={member} />
          ))}
        </div>

        {/* Mobile carousel */}
        <div className="md:hidden overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {teamMembers.map((member) => (
              <div key={member.name} className="flex-[0_0_85%] min-w-0 pl-4 first:pl-0">
                <TeamCard member={member} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

function TeamCard({ member }: { member: typeof teamMembers[0] }) {
  return (
    <div className="group text-center">
      <div className="relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden border-4 border-gray-100 group-hover:border-gold transition-colors duration-300">
        <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-brand-dark/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-white hover:text-gold transition-colors">
            <Linkedin size={28} />
          </a>
        </div>
      </div>
      <h3 className="text-lg font-serif font-bold text-brand-dark">{member.name}</h3>
      <p className="text-sm text-gold font-medium uppercase tracking-wider">{member.role}</p>
    </div>
  );
}
