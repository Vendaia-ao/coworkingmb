import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MapPin, Clock, Facebook, Instagram, Mail } from 'lucide-react';
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

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-white mb-2">Links Rápidos</h4>
            <div className="flex flex-col space-y-2">
              <Link to="/" className="text-gray-300 hover:text-gold transition-colors">Início</Link>
              <Link to="/sobre" className="text-gray-300 hover:text-gold transition-colors">Sobre</Link>
              <Link to="/galeria" className="text-gray-300 hover:text-gold transition-colors">Galeria</Link>
              <Link to="/contacto" className="text-gray-300 hover:text-gold transition-colors">Contactos</Link>
            </div>
          </div>

          {/* Solutions */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-white mb-2">Soluções</h4>
            <div className="flex flex-col space-y-2">
              <Link to="/escritorio-virtual" className="text-gray-300 hover:text-gold transition-colors">Escritório Virtual</Link>
              <Link to="/salas" className="text-gray-300 hover:text-gold transition-colors">Salas & Espaços</Link>
              <Link to="/secretarias" className="text-gray-300 hover:text-gold transition-colors">Secretárias</Link>
            </div>
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
            <div className="flex items-start space-x-3 text-gray-300">
              <Mail className="w-5 h-5 text-gold mt-1" />
              <div>
                <a href="mailto:geral@mulatobusiness.com" className="hover:text-gold transition-colors">geral@mulatobusiness.com</a>
                <p className="text-xs text-gray-500">E-mail Oficial</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 text-gray-300">
              <MapPin className="w-5 h-5 text-gold mt-1" />
              <p>Centralidade do Kilamba,<br />Q14, 5º andar<br />Luanda, Angola</p>
            </div>
            <div className="flex items-start space-x-3 text-gray-300">
              <Clock className="w-5 h-5 text-gold mt-1" />
              <div>
                <p>Segunda - Sexta</p>
                <p className="text-gold">08:00 - 17:00</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
            <div className="flex space-x-6">
              <a href="https://www.facebook.com/share/1Ef41VV5oS/?mibextid=wwXIfr" className="hover:text-gold transition-colors"><Facebook size={20} /></a>
              <a href="https://www.instagram.com/coworking.mb?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" className="hover:text-gold transition-colors"><Instagram size={20} /></a>
            </div>
            <p className="text-center">
              &copy; {new Date().getFullYear()} Mulato Business. Todos os direitos reservados. | Desenvolvido por: <a href="https://vendaia.site" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline">Vendaia</a>
            </p>
            <div className="flex space-x-4 text-xs">
              <Link to="/politica-de-privacidade" className="hover:text-gold transition-colors">Política de Privacidade</Link>
              <span>|</span>
              <Link to="/termos-de-uso" className="hover:text-gold transition-colors">Termos de Uso</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
