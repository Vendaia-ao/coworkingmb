import React from 'react';
import { Building2, Users, TrendingUp, Zap, ArrowRight } from 'lucide-react';
import { BookingModule } from './BookingModule';

export const AboutPage: React.FC = () => {
  const values = [
    {
      icon: Building2,
      title: "Infraestrutura",
      description: "Ambientes modernos, equipados e climatizados para o máximo conforto."
    },
    {
      icon: Users,
      title: "Networking",
      description: "Conexão com profissionais e empresas de diversos setores."
    },
    {
      icon: TrendingUp,
      title: "Economia",
      description: "Redução significativa de custos operacionais comparado ao escritório tradicional."
    },
    {
      icon: Zap,
      title: "Flexibilidade",
      description: "Soluções adaptáveis que acompanham o crescimento do seu negócio."
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen animate-fade-in">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/networking.png" 
            alt="Interior Mulato Business" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/90 via-brand-dark/70 to-gray-50"></div>
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center mt-12">
          <span className="inline-block py-1 px-3 rounded-full border border-gold/50 text-gold text-xs font-bold tracking-widest uppercase mb-4 backdrop-blur-md">
            Nossa Essência
          </span>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">
            Sobre a <span className="gold-gradient-text">Coworking MB</span>
          </h1>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-20 -mt-20 relative z-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-100 flex flex-col lg:flex-row">
            
            {/* Text Content */}
            <div className="w-full lg:w-1/2 p-8 md:p-16 flex flex-col justify-center bg-texture-noise">
              <h2 className="text-3xl font-serif font-bold text-brand-dark mb-8 relative">
                Estrutura e Profissionalismo
                <div className="absolute -bottom-2 left-0 w-16 h-1 gold-gradient-bg"></div>
              </h2>
              
              <div className="space-y-6 text-gray-600 leading-relaxed text-lg">
                <p>
                  A <strong className="text-brand-dark">Coworking MB</strong> é um espaço pensado para profissionais, startups, freelancers e empresas que procuram flexibilidade, estrutura e um ambiente profissional para crescer. Oferecendo Infraestrutura, networking e economia.
                </p>
                <p>
                  Com soluções adaptáveis, oferecemos desde escritórios virtuais até salas completas, sempre com foco no conforto, eficiência e credibilidade dos nossos clientes.
                </p>
              </div>

              <div className="mt-10">
                 <button 
                    onClick={() => document.getElementById('booking-section')?.scrollIntoView({behavior: 'smooth'})}
                    className="inline-flex items-center gap-2 text-brand-dark font-bold border-b-2 border-gold pb-1 hover:text-gold transition-colors uppercase tracking-widest text-sm"
                  >
                    Agendar uma Visita
                    <ArrowRight size={16} />
                 </button>
              </div>
            </div>

            {/* Image Content */}
            <div className="w-full lg:w-1/2 relative min-h-[400px]">
              <img 
                src="/logotipo.png" 
                alt="Ambiente Profissional MB" 
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/60 to-transparent"></div>
              
              {/* Floating Badge */}
              <div className="absolute bottom-8 left-8 right-8 glass-panel p-6 rounded-lg border-l-4 border-gold">
                <p className="text-brand-dark font-serif italic text-lg">
                  "Onde a sua empresa encontra o ambiente ideal para prosperar."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="py-20 bg-brand-dark text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-serif font-bold mb-4">Pilares do Nosso Sucesso</h2>
            <div className="w-24 h-1 gold-gradient-bg mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((item, index) => (
              <div key={index} className="glass-dark p-8 rounded-lg border border-white/10 hover:border-gold/30 transition-all duration-300 group hover:-translate-y-2">
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center mb-6 group-hover:bg-gold text-gold group-hover:text-white transition-colors duration-300">
                  <item.icon size={24} />
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div id="booking-section">
        <BookingModule />
      </div>
    </div>
  );
};
