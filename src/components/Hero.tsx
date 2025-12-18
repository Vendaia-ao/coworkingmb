import React from 'react';
import { Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import { Typewriter } from './animations/Typewriter';
import { ShimmerButton } from './animations/ShimmerButton';

interface HeroProps {
  onNavigate?: (href: string) => void;
}

const heroTexts = [
  "Espaços flexíveis, escritórios virtuais e soluções completas para trabalhar com conforto, profissionalismo e credibilidade.",
  "A morada comercial de prestígio que o seu negócio precisa para conquistar novos mercados e clientes.",
  "Reduza os seus custos fixos e foque apenas no crescimento da sua empresa com a nossa estrutura completa."
];

const premiumEasing = [0.22, 1, 0.36, 1] as [number, number, number, number];

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <section id="home" className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image with Ken Burns Effect */}
      <div className="absolute inset-0 z-0">
        <motion.img 
          src="/hero.jpg" 
          alt="Sala de reuniões executiva" 
          className="w-full h-full object-cover"
          initial={{ scale: 1 }}
          animate={{ scale: 1.08 }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'linear',
          }}
        />
        {/* Dark Gradient Overlay for Depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80"></div>
        {/* Gold Texture Overlay Effect */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h1 
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight tracking-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: premiumEasing }}
        >
          <span className="font-playfair font-semibold">
    Soluções de Coworking
  </span>
  <br />
          <span className="gold-gradient-text italic font-serif">Inteligentes</span>
        </motion.h1>
        
        <motion.div 
          className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl mx-auto font-light leading-relaxed min-h-[4rem] md:min-h-[3rem]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: premiumEasing }}
        >
          <Typewriter texts={heroTexts} typingSpeed={23} deletingSpeed={15} pauseDuration={3000} />
        </motion.div>
        
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: premiumEasing }}
        >
          <ShimmerButton 
            onClick={() => onNavigate && onNavigate('#solutions')}
            className="w-full sm:w-auto gold-gradient-bg text-white px-8 py-4 rounded-sm font-bold tracking-wide shadow-lg hover:shadow-gold/50 transition-all duration-300 uppercase text-sm"
          >
            Ver os nossos serviços
          </ShimmerButton>
          
          <motion.a 
            href="tel:+244924006984"
            className="w-full sm:w-auto bg-transparent border border-white text-white px-8 py-4 rounded-sm font-bold tracking-wide hover:bg-white hover:text-black transition-all duration-300 uppercase text-sm backdrop-blur-sm flex items-center justify-center gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2, ease: premiumEasing }}
          >
            <Phone size={18} />
            Ligue para nós agora
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};
