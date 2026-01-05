import React from 'react';
import { Link } from 'react-router-dom';
import { Check, Users, Wifi, Coffee, Clock, ArrowRight } from 'lucide-react';
import { BookingModule } from './BookingModule';

export const DesksPage: React.FC = () => {
  const plans = [
    {
      name: "Bronze",
      price: "45.000",
      period: "Kz / mês",
      icon: Users,
      features: [
        "Secretária",
        "Internet de Alta Velocidade",
        "Sala de reunião (6 horas)",
        "Cacifo particular",
        "Até 20 impressões ou cópias",
        "Endereço físico",
        "Água mineral (30 garrafas)",
        "Copa"
      ],
      highlight: false
    },
    {
      name: "Prata",
      price: "60.000",
      period: "Kz / mês",
      icon: Wifi,
      features: [
        "Secretária",
        "Internet de Alta Velocidade",
        "Sala de reunião (10 horas)",
        "Cacifo particular",
        "Até 40 impressões ou cópias",
        "Endereço físico",
        "Recepcionista partilhada",
        "Água mineral (30 garrafas)",
        "Copa",
        "Chá/Café (15)",
        "Biscoitos (15)"
      ],
      highlight: true
    },
    {
      name: "Diamante",
      price: "100.000",
      period: "Kz / dia",
      icon: Clock,
      features: [
        "Secretária",
        "Internet de Alta Velocidade",
        "Sala de reunião (20 horas)",
        "Cacifo particular",
        "Até 60 impressões ou cópias",
        "Endereço físico",
        "Recepcionista partilhada",
        "Água mineral (30 garrafas)",
        "Copa",
        "Chá/Café (25)",
        "Biscoitos (25)",
        "Estacionamento"
      ],
      highlight: false
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen animate-fade-in">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/desks.jpg" 
            alt="Secretárias Mulato Business" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/90 via-brand-dark/70 to-gray-50"></div>
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center mt-12">
          <span className="inline-block py-1 px-3 rounded-full border border-gold/50 text-gold text-xs font-bold tracking-widest uppercase mb-4 backdrop-blur-md">
            Espaços de Trabalho
          </span>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">
            Secretárias <span className="gold-gradient-text">Flexíveis</span>
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
                Flexibilidade Total
                <div className="absolute -bottom-2 left-0 w-16 h-1 gold-gradient-bg"></div>
              </h2>
              
              <div className="space-y-6 text-gray-600 leading-relaxed text-lg">
                <p>
                  Opções de secretárias <strong className="text-brand-dark">partilhadas ou dedicadas</strong> para quem busca um espaço profissional e produtivo.
                </p>
                <p>
                  Ideal para freelancers, empreendedores e profissionais que precisam de um ambiente de trabalho inspirador sem compromissos de longo prazo.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10">
                <div className="flex items-start gap-3">
                  <div className="bg-gray-50 p-2 rounded-lg text-gold-dark">
                    <Wifi size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-dark">Internet Rápida</h4>
                    <p className="text-sm text-gray-500">Conexão de alta velocidade incluída.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-gray-50 p-2 rounded-lg text-gold-dark">
                    <Coffee size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-dark">Copa Equipada</h4>
                    <p className="text-sm text-gray-500">Espaço para refeições e café.</p>
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
                src="/secretarias.png" 
                alt="Secretárias Mulato Business" 
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/60 to-transparent"></div>
              
              {/* Floating Badge */}
              <div className="absolute bottom-8 left-8 right-8 glass-panel p-6 rounded-lg border-l-4 border-gold">
                <p className="text-brand-dark font-serif italic text-lg">
                  "Seu espaço de trabalho, do seu jeito."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Plans Section */}
      <section className="py-20 bg-brand-dark text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-serif font-bold mb-4">Nossos Planos</h2>
            <div className="w-24 h-1 gold-gradient-bg mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div 
                key={index}
                className={`relative rounded-xl overflow-hidden transition-all duration-300 group ${
                  plan.highlight 
                    ? 'transform md:-translate-y-4 shadow-2xl border-2 border-gold bg-white' 
                    : 'bg-white shadow-xl hover:-translate-y-2 border border-gray-100'
                }`}
              >
                {plan.highlight && (
                  <div className="absolute top-0 inset-x-0 h-1 gold-gradient-bg"></div>
                )}
                
                {plan.highlight && (
                  <div className="absolute top-4 right-4">
                    <span className="bg-gold text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
                      Popular
                    </span>
                  </div>
                )}

                <div className="p-8 flex flex-col h-full">
                  <div className="mb-6 text-center">
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-4 mx-auto ${
                      plan.highlight ? 'gold-gradient-bg text-white shadow-lg' : 'bg-gray-100 text-brand-dark'
                    }`}>
                      <plan.icon size={28} strokeWidth={1.5} />
                    </div>
                    <h3 className="text-2xl font-serif font-bold text-brand-dark mb-2">
                      {plan.name}
                    </h3>
                    <div className="flex items-baseline justify-center gap-1">
                      <span className={`text-3xl font-bold tracking-tight ${plan.highlight ? 'text-gold-dark' : 'text-gray-900'}`}>
                        {plan.price}
                      </span>
                      <span className="text-sm text-gray-500 font-medium">{plan.period}</span>
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
                    className={`w-full py-3 rounded-sm font-bold uppercase tracking-widest text-xs transition-all duration-300 ${
                    plan.highlight 
                      ? 'gold-gradient-bg text-white shadow-md hover:shadow-lg' 
                      : 'bg-brand-dark text-white hover:bg-black'
                  }`}>
                    Selecionar
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
