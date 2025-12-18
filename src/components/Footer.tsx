import React from 'react';
import { Phone, MapPin, Clock, Facebook, Instagram, Linkedin } from 'lucide-react';
import { Logo } from './Logo';

export const Footer: React.FC = () => {
  return (
    <footer id="footer" className="bg-brand-dark text-white border-t border-gray-800 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Brand */}
          <div className="space-y-4">
            <div className="mb-6">
              <Logo className="h-32 w-auto -ml-4" />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              O parceiro ideal para o crescimento do seu negócio. Profissionalismo, luxo e eficiência em um só lugar.
            </p>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-white mb-2">Contactos</h4>
            <div className="flex items-start space-x-3 text-gray-300">
              <Phone className="w-5 h-5 text-gold mt-1" />
              <div>
                <p>+244 924 006 984</p>
                <p className="text-xs text-gray-500">Atendimento Geral</p>
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-white mb-2">Localização</h4>
            <div className="flex items-start space-x-3 text-gray-300">
              <MapPin className="w-5 h-5 text-gold mt-1" />
              <p>Centralidade do Kilamba,<br />Q14, 5º andar<br />Luanda, Angola</p>
            </div>
          </div>

          {/* Hours */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-white mb-2">Horário</h4>
            <div className="flex items-start space-x-3 text-gray-300">
              <Clock className="w-5 h-5 text-gold mt-1" />
              <div>
                <p>Segunda - Sexta</p>
                <p className="text-gold">08:00 - 17:00</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Mulato Business. Todos os direitos reservados.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-gold transition-colors"><Facebook size={20} /></a>
            <a href="#" className="hover:text-gold transition-colors"><Instagram size={20} /></a>
            <a href="#" className="hover:text-gold transition-colors"><Linkedin size={20} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};
