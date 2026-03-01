import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, Settings, Check, X } from 'lucide-react';

const COOKIE_CONSENT_KEY = 'cmb_cookie_consent';
const CONSENT_EXPIRY_MS = 6 * 30 * 24 * 60 * 60 * 1000; // ~6 months

type ConsentLevel = 'all' | 'essential' | null;

export const CookieBanner: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed.expiry && Date.now() < parsed.expiry) {
          return; // consent still valid
        }
      } catch {
        // invalid, show banner
      }
    }
    // small delay so it doesn't flash on load
    const timer = setTimeout(() => setVisible(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  const saveConsent = (level: ConsentLevel) => {
    localStorage.setItem(
      COOKIE_CONSENT_KEY,
      JSON.stringify({ level, expiry: Date.now() + CONSENT_EXPIRY_MS })
    );
    setVisible(false);
    setShowPreferences(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-[90] p-4"
        >
          <div className="max-w-5xl mx-auto bg-brand-dark text-white rounded-xl shadow-2xl border border-gray-800 overflow-hidden">
            {!showPreferences ? (
              <div className="p-6 md:p-8">
                <div className="flex items-start gap-4">
                  <Cookie className="text-gold flex-shrink-0 mt-1" size={28} />
                  <div className="flex-1">
                    <h3 className="font-serif font-bold text-lg mb-2">Política de Cookies</h3>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      Este website utiliza cookies para melhorar a sua experiência de navegação. Ao continuar a utilizar o site, concorda com a nossa{' '}
                      <Link to="/politica-de-privacidade" className="text-gold underline hover:text-gold-light">
                        Política de Privacidade
                      </Link>{' '}
                      e uso de cookies.
                    </p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 mt-6">
                  <button
                    onClick={() => saveConsent('all')}
                    className="gold-gradient-bg text-white px-6 py-3 rounded-lg font-bold text-sm tracking-wider uppercase hover:brightness-110 transition-all flex items-center justify-center gap-2"
                  >
                    <Check size={16} /> Aceitar Todos
                  </button>
                  <button
                    onClick={() => saveConsent('essential')}
                    className="bg-white/10 border border-white/20 text-white px-6 py-3 rounded-lg font-bold text-sm tracking-wider uppercase hover:bg-white/20 transition-all flex items-center justify-center gap-2"
                  >
                    <X size={16} /> Rejeitar Não Essenciais
                  </button>
                  <button
                    onClick={() => setShowPreferences(true)}
                    className="bg-transparent border border-white/20 text-gray-300 px-6 py-3 rounded-lg font-bold text-sm tracking-wider uppercase hover:text-white hover:border-white/40 transition-all flex items-center justify-center gap-2"
                  >
                    <Settings size={16} /> Configurar Preferências
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-6 md:p-8">
                <h3 className="font-serif font-bold text-lg mb-4">Configurar Preferências de Cookies</h3>
                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <div>
                      <p className="font-bold text-sm">Cookies Essenciais</p>
                      <p className="text-gray-400 text-xs">Necessários para o funcionamento do site.</p>
                    </div>
                    <span className="text-gold text-xs font-bold uppercase">Sempre Ativo</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <div>
                      <p className="font-bold text-sm">Cookies Analíticos</p>
                      <p className="text-gray-400 text-xs">Ajudam a entender como utiliza o site.</p>
                    </div>
                    <span className="text-gray-500 text-xs font-bold uppercase">Opcional</span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => saveConsent('all')}
                    className="gold-gradient-bg text-white px-6 py-3 rounded-lg font-bold text-sm uppercase hover:brightness-110 transition-all"
                  >
                    Aceitar Todos
                  </button>
                  <button
                    onClick={() => saveConsent('essential')}
                    className="bg-white/10 border border-white/20 text-white px-6 py-3 rounded-lg font-bold text-sm uppercase hover:bg-white/20 transition-all"
                  >
                    Apenas Essenciais
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
