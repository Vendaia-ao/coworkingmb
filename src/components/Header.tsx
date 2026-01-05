import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { NAVIGATION_LINKS } from '../constants';

const premiumEasing = [0.22, 1, 0.36, 1] as [number, number, number, number];

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (href: string) => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
    
    // Handle hash navigation (for sections on the same page)
    if (href.startsWith('#')) {
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          const element = document.querySelector(href);
          element?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        const element = document.querySelector(href);
        element?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const isActiveRoute = (href: string) => {
    if (href === '/') return location.pathname === '/';
    if (href.startsWith('#')) return false;
    return location.pathname === href;
  };

  return (
    <motion.header 
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        isScrolled ? 'glass-panel shadow-md' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: premiumEasing }}
      style={{
        backdropFilter: isScrolled ? 'blur(16px)' : 'blur(0px)',
        WebkitBackdropFilter: isScrolled ? 'blur(16px)' : 'blur(0px)',
      }}
    >
      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        animate={{ paddingTop: isScrolled ? '0.75rem' : '1.5rem', paddingBottom: isScrolled ? '0.75rem' : '1.5rem' }}
        transition={{ duration: 0.3, ease: premiumEasing }}
      >
        <div className="flex justify-between items-center">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center cursor-pointer">
            <Link to="/" className="block">
              <motion.div
                animate={{ scale: isScrolled ? 0.9 : 1 }}
                transition={{ duration: 0.3, ease: premiumEasing }}
              >
                <img 
                  src="/logotipo.png" 
                  alt="Mulato Business" 
                  className={`w-auto transition-all duration-300 ${isScrolled ? 'h-12' : 'h-16'}`}
                />
              </motion.div>
            </Link>
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
                {link.dropdown ? (
                  <button
                    onClick={() => handleLinkClick(link.href)}
                    className={`text-sm font-medium tracking-wide transition-colors duration-200 flex items-center gap-1 cursor-pointer ${
                      isScrolled ? 'text-gray-700 hover:text-gold' : 'text-gray-200 hover:text-white'
                    }`}
                  >
                    {link.label}
                    <motion.span
                      animate={{ rotate: activeDropdown === link.label ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown size={14} />
                    </motion.span>
                  </button>
                ) : link.href.startsWith('#') ? (
                  <button
                    onClick={() => handleLinkClick(link.href)}
                    className={`text-sm font-medium tracking-wide transition-colors duration-200 cursor-pointer ${
                      isScrolled ? 'text-gray-700 hover:text-gold' : 'text-gray-200 hover:text-white'
                    }`}
                  >
                    {link.label}
                  </button>
                ) : (
                  <Link
                    to={link.href}
                    className={`text-sm font-medium tracking-wide transition-colors duration-200 cursor-pointer ${
                      isScrolled ? 'text-gray-700 hover:text-gold' : 'text-gray-200 hover:text-white'
                    } ${isActiveRoute(link.href) ? 'text-gold' : ''}`}
                  >
                    {link.label}
                  </Link>
                )}

                {/* Dropdown with Spring Animation */}
                <AnimatePresence>
                  {link.dropdown && activeDropdown === link.label && (
                    <motion.div 
                      className="absolute top-full left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 overflow-hidden"
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ 
                        type: 'spring',
                        stiffness: 400,
                        damping: 25,
                      }}
                      style={{
                        transformOrigin: 'top left',
                      }}
                    >
                      <div className="py-1">
                        {link.dropdown.map((dropItem, idx) => (
                          <motion.div
                            key={dropItem.label}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.05 }}
                          >
                            <Link
                              to={dropItem.href}
                              onClick={() => setActiveDropdown(null)}
                              className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gold-light/20 hover:text-gold-dark cursor-pointer ${
                                isActiveRoute(dropItem.href) ? 'bg-gold-light/20 text-gold-dark' : ''
                              }`}
                            >
                              {dropItem.label}
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <motion.button 
              onClick={() => handleLinkClick('#booking')}
              className="gold-gradient-bg text-white px-6 py-2 rounded-sm font-medium text-sm tracking-wide shadow-lg hover:shadow-xl hover:brightness-110 transition-all duration-300 cursor-pointer relative overflow-hidden"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2, ease: premiumEasing }}
            >
              Efetuar Reserva
            </motion.button>
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
      </motion.div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            className="md:hidden absolute top-full left-0 w-full glass-panel border-t border-gray-200 shadow-xl bg-white/95"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: premiumEasing }}
          >
            <div className="px-4 pt-4 pb-6 space-y-2">
              {NAVIGATION_LINKS.map((link, idx) => (
                <motion.div 
                  key={link.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  {link.dropdown ? (
                    <>
                      <span className="block px-3 py-3 text-base font-medium text-gray-800">
                        {link.label}
                      </span>
                      <div className="pl-6 space-y-1">
                        {link.dropdown.map((drop) => (
                          <Link
                            key={drop.label}
                            to={drop.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={`block px-3 py-2 text-sm font-medium text-gray-500 hover:text-gold-dark cursor-pointer ${
                              isActiveRoute(drop.href) ? 'text-gold-dark' : ''
                            }`}
                          >
                            {drop.label}
                          </Link>
                        ))}
                      </div>
                    </>
                  ) : link.href.startsWith('#') ? (
                    <button
                      onClick={() => handleLinkClick(link.href)}
                      className="block w-full text-left px-3 py-3 text-base font-medium text-gray-800 hover:text-gold-dark hover:bg-gray-50 rounded-md cursor-pointer"
                    >
                      {link.label}
                    </button>
                  ) : (
                    <Link
                      to={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`block px-3 py-3 text-base font-medium text-gray-800 hover:text-gold-dark hover:bg-gray-50 rounded-md cursor-pointer ${
                        isActiveRoute(link.href) ? 'text-gold-dark' : ''
                      }`}
                    >
                      {link.label}
                    </Link>
                  )}
                </motion.div>
              ))}
              <motion.div 
                className="pt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <button 
                  onClick={() => handleLinkClick('#booking')}
                  className="w-full gold-gradient-bg text-white px-6 py-3 rounded-sm font-medium shadow-md cursor-pointer"
                >
                  Efetuar Reserva
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
