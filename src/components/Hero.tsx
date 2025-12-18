import React from 'react';
import { Phone } from 'lucide-react';

interface HeroProps {
  onNavigate?: (href: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <section id="home" className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1920&auto=format&fit=crop" 
          alt="Sala de reuniões executiva" 
          className="w-full h-full object-cover"
        />
        {/* Dark Gradient Overlay for Depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80"></div>
        {/* Gold Texture Overlay Effect */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
          Soluções de Coworking <br />
          <span className="gold-gradient-text italic font-serif">Inteligentes</span>
        </h1>
        
        <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
          Espaços flexíveis, escritórios virtuais e soluções completas para trabalhar com conforto, profissionalismo e credibilidade.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button 
            onClick={() => onNavigate && onNavigate('#solutions')}
            className="w-full sm:w-auto gold-gradient-bg text-white px-8 py-4 rounded-sm font-bold tracking-wide shadow-lg hover:shadow-gold/50 hover:scale-105 transition-all duration-300 uppercase text-sm"
          >
            Ver os nossos serviços
          </button>
          
          <a 
            href="tel:+244924006984"
            className="w-full sm:w-auto bg-transparent border border-white text-white px-8 py-4 rounded-sm font-bold tracking-wide hover:bg-white hover:text-black transition-all duration-300 uppercase text-sm backdrop-blur-sm flex items-center justify-center gap-2"
          >
            <Phone size={18} />
            Ligue para nós agora
          </a>
        </div>
      </div>
    </section>
  );
};
