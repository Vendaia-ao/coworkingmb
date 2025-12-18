import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { NAVIGATION_LINKS } from '../constants';
import { HeaderLogo } from './HeaderLogo';

interface HeaderProps {
  onNavigate?: (href: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(href);
    }
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass-panel py-3 shadow-md' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center cursor-pointer">
            <a href="#home" onClick={(e) => handleLinkClick(e, '#home')} className="block">
              <HeaderLogo 
                className={`w-auto transition-all duration-300 ${isScrolled ? 'h-8' : 'h-10'}`} 
                lightMode={isScrolled} 
              />
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 items-center ml-auto mr-8">
            {NAVIGATION_LINKS.map((link) => (
              <div 
                key={link.label} 
                className="relative group"
                onMouseEnter={() => link.dropdown && setActiveDropdown(link.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <a 
                  href={link.href}
                  onClick={(e) => !link.dropdown && handleLinkClick(e, link.href)}
                  className={`text-sm font-medium tracking-wide transition-colors duration-200 flex items-center gap-1 cursor-pointer ${
                    isScrolled ? 'text-gray-700 hover:text-gold' : 'text-gray-200 hover:text-white'
                  }`}
                >
                  {link.label}
                  {link.dropdown && <ChevronDown size={14} />}
                </a>

                {/* Dropdown */}
                {link.dropdown && activeDropdown === link.label && (
                  <div className="absolute top-full left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 glass-panel transform transition-all duration-200 origin-top-left">
                    <div className="py-1">
                      {link.dropdown.map((dropItem) => (
                        <a
                          key={dropItem.label}
                          href={dropItem.href}
                          onClick={(e) => handleLinkClick(e, dropItem.href)}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gold-light/20 hover:text-gold-dark cursor-pointer"
                        >
                          {dropItem.label}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <button 
              onClick={(e) => handleLinkClick(e, '#booking')}
              className="gold-gradient-bg text-white px-6 py-2 rounded-sm font-medium text-sm tracking-wide shadow-lg hover:shadow-xl hover:brightness-110 transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
            >
              Efetuar Reserva
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`${isScrolled ? 'text-gray-800' : 'text-white'}`}
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full glass-panel border-t border-gray-200 shadow-xl transition-all duration-300 bg-white/95">
          <div className="px-4 pt-4 pb-6 space-y-2">
            {NAVIGATION_LINKS.map((link) => (
              <div key={link.label}>
                <a
                  href={link.href}
                  onClick={(e) => !link.dropdown && handleLinkClick(e, link.href)}
                  className="block px-3 py-3 text-base font-medium text-gray-800 hover:text-gold-dark hover:bg-gray-50 rounded-md cursor-pointer"
                >
                  {link.label}
                </a>
                {link.dropdown && (
                  <div className="pl-6 space-y-1">
                    {link.dropdown.map((drop) => (
                      <a
                        key={drop.label}
                        href={drop.href}
                        onClick={(e) => handleLinkClick(e, drop.href)}
                        className="block px-3 py-2 text-sm font-medium text-gray-500 hover:text-gold-dark cursor-pointer"
                      >
                        {drop.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="pt-4">
              <button 
                onClick={(e) => handleLinkClick(e, '#booking')}
                className="w-full gold-gradient-bg text-white px-6 py-3 rounded-sm font-medium shadow-md cursor-pointer"
              >
                Efetuar Reserva
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
