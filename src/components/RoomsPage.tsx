import React from 'react';
import { Link } from 'react-router-dom';
import { Check, Gem, Shield, Medal, Wifi, Coffee, ArrowRight } from 'lucide-react';
import { BookingModule } from './BookingModule';

export const RoomsPage: React.FC = () => {
  const monthlyPlans = [
    {
      name: "Sala Bronze",
      price: "55.000",
      period: "Kz / mês",
      icon: Medal,
      features: [
        "Acesso ao Espaço",
        "Internet de Alta Velocidade",
        "Cacifo particular",
        "Endereço físico",
        "Água mineral (30 garrafas)",
        "Acesso à Copa"
      ],
      highlight: false,
      color: "text-amber-700",
      bg: "bg-amber-700"
    },
    {
      name: "Sala Prata",
      price: "85.000",
      period: "Kz / mês",
      icon: Shield,
      features: [
        "Acesso ao Espaço & Internet",
        "Sala de Reunião (5 horas)",
        "Até 50 impressões ou cópias",
        "Endereço físico",
        "Rececionista partilhada",
        "Água mineral (30 garrafas)",
        "Acesso à Copa"
      ],
      highlight: false,
      color: "text-gray-400",
      bg: "bg-gray-400"
    },
    {
      name: "Sala Diamante",
      price: "150.000",
      period: "Kz / mês",
      icon: Gem,
      features: [
        "Acesso ao Espaço",
        "Internet (10 convidados)",
        "Sala de Reunião (15 horas)",
        "Até 100 impressões ou cópias",
        "Endereço físico & Rececionista",
        "Água mineral (60 garrafas)",
        "Copa, Chá/Café (30), Biscoitos (30)",
        "Estacionamento Privativo"
      ],
      highlight: true,
      color: "text-gold",
      bg: "gold-gradient-bg"
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen animate-fade-in">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/rooms.jpg" 
            alt="Salas e Espaços Mulato Business" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/90 via-brand-dark/60 to-gray-50"></div>
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center mt-12">
          <span className="inline-block py-1 px-3 rounded-full border border-gold/50 text-gold text-xs font-bold tracking-widest uppercase mb-4 backdrop-blur-md">
            Ambientes Corporativos
          </span>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">
            Salas & <span className="gold-gradient-text">Espaços</span>
          </h1>
        </div>
      </section>

      {/* Main Content Section - Two Layers */}
      <section className="py-20 -mt-20 relative z-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-100 flex flex-col lg:flex-row">
            
            {/* Text Content */}
            <div className="w-full lg:w-1/2 p-8 md:p-16 flex flex-col justify-center bg-texture-noise">
              <h2 className="text-3xl font-serif font-bold text-brand-dark mb-8 relative">
                Espaços Premium
                <div className="absolute -bottom-2 left-0 w-16 h-1 gold-gradient-bg"></div>
              </h2>
              
              <div className="space-y-6 text-gray-600 leading-relaxed text-lg">
                <p>
                  Soluções flexíveis de <strong className="text-brand-dark">salas e espaços equipados</strong> para atender diferentes níveis de necessidade profissional.
                </p>
                <p>
                  Desde salas privativas até espaços colaborativos, oferecemos ambientes modernos, climatizados e com toda a infraestrutura necessária para o seu negócio prosperar.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10">
                <div className="flex items-start gap-3">
                  <div className="bg-gray-50 p-2 rounded-lg text-gold-dark">
                    <Wifi size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-dark">Internet de Alta Velocidade</h4>
                    <p className="text-sm text-gray-500">Conexão estável e rápida para todas as suas necessidades.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-gray-50 p-2 rounded-lg text-gold-dark">
                    <Coffee size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-dark">Amenidades Incluídas</h4>
                    <p className="text-sm text-gray-500">Copa, água mineral e café à disposição.</p>
                  </div>
                </div>
              </div>

              <div className="mt-10">
                <Link 
                  to="/contacto"
                  className="inline-flex items-center gap-2 text-brand-dark font-bold border-b-2 border-gold pb-1 hover:text-gold transition-colors uppercase tracking-widest text-sm"
                >
                  Solicitar Informação
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            {/* Image Content */}
            <div className="w-full lg:w-1/2 relative min-h-[400px]">
              <img 
                src="/salas.png" 
                alt="Salas Mulato Business" 
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/60 to-transparent"></div>
              
              {/* Floating Badge */}
              <div className="absolute bottom-8 left-8 right-8 glass-panel p-6 rounded-lg border-l-4 border-gold">
                <p className="text-brand-dark font-serif italic text-lg">
                  "Ambientes que inspiram produtividade e sucesso."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Monthly Plans Section */}
      <section className="py-20 bg-brand-dark text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-serif font-bold mb-4">Nossos Planos</h2>
            <div className="w-24 h-1 gold-gradient-bg mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            {monthlyPlans.map((plan, index) => (
              <div 
                key={index}
                className={`relative rounded-xl overflow-hidden transition-all duration-300 flex flex-col h-full ${
                  plan.highlight 
                    ? 'transform md:-translate-y-6 shadow-2xl border-2 border-gold bg-white z-10' 
                    : 'bg-white shadow-xl border border-gray-100 mt-0 md:mt-4'
                }`}
              >
                {plan.highlight && (
                  <div className="absolute top-0 inset-x-0 h-1 gold-gradient-bg"></div>
                )}
                
                <div className="p-8 flex flex-col h-full">
                  <div className="mb-6 text-center">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto ${
                      plan.highlight ? 'gold-gradient-bg text-white shadow-lg' : 'bg-gray-100 ' + plan.color
                    }`}>
                      <plan.icon size={32} strokeWidth={1.5} />
                    </div>
                    <h3 className="text-2xl font-serif font-bold text-brand-dark mb-2">
                      {plan.name}
                    </h3>
                    <div className="flex flex-col items-center">
                      <span className={`text-3xl font-bold tracking-tight ${plan.highlight ? 'text-gold-dark' : 'text-gray-900'}`}>
                        {plan.price}
                      </span>
                      <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">{plan.period}</span>
                    </div>
                  </div>

                  <div className="w-full h-px bg-gray-100 mb-6"></div>

                  <ul className="space-y-3 mb-8 flex-grow">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className={`flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center mr-3 mt-1 ${
                          plan.highlight ? 'bg-gold/20 text-gold-dark' : 'bg-gray-100 text-gray-400'
                        }`}>
                          <Check size={10} strokeWidth={3} />
                        </span>
                        <span className="text-gray-600 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button 
                    onClick={() => document.getElementById('booking-section')?.scrollIntoView({behavior: 'smooth'})}
                    className={`w-full py-4 rounded-sm font-bold uppercase tracking-widest text-sm transition-all duration-300 ${
                    plan.highlight 
                      ? 'gold-gradient-bg text-white shadow-lg hover:shadow-gold/50' 
                      : 'bg-brand-dark text-white hover:bg-black'
                  }`}>
                    Selecionar Plano
                  </button>
                </div>
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
