import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X } from 'lucide-react';

const COOKIE_CONSENT_KEY = 'cmb_cookie_consent';
const CONSENT_EXPIRY_MS = 6 * 30 * 24 * 60 * 60 * 1000;

export const CookieBanner: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed.expiry && Date.now() < parsed.expiry) return;
      } catch { /* invalid */ }
    }
    const timer = setTimeout(() => setVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const saveConsent = (level: string) => {
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify({ level, expiry: Date.now() + CONSENT_EXPIRY_MS }));
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 400, damping: 35 }}
          className="fixed bottom-4 left-4 right-4 z-[90] flex justify-center pointer-events-none"
        >
          <div className="pointer-events-auto max-w-xl w-full bg-brand-dark/95 backdrop-blur-xl text-white rounded-2xl shadow-2xl border border-white/10 px-5 py-4 flex items-center gap-4">
            <p className="text-sm text-gray-300 flex-1 leading-snug">
              Usamos cookies para melhorar a sua experiência.{' '}
              <Link to="/politica-de-privacidade" className="text-gold underline underline-offset-2 hover:text-gold-light">
                Saber mais
              </Link>
            </p>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={() => saveConsent('all')}
                className="gold-gradient-bg text-white px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider hover:brightness-110 transition-all flex items-center gap-1.5"
              >
                <Check size={14} /> Aceitar
              </button>
              <button
                onClick={() => saveConsent('essential')}
                className="bg-white/10 border border-white/20 text-white p-2 rounded-lg hover:bg-white/20 transition-all"
                aria-label="Rejeitar"
              >
                <X size={14} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
