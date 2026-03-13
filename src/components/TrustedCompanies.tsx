import React, { useEffect, useState } from "react";
import { supabase } from '@/integrations/supabase/client';

type Company = { id: string; nome: string; logo_url: string };

export const TrustedCompanies: React.FC = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from('trusted_companies').select('*').eq('ativo', true).order('ordem')
      .then(({ data }) => { setCompanies((data as any[]) || []); setLoading(false); });
  }, []);

  if (loading || companies.length === 0) return null;

  return (
    <section className="py-20 bg-white overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-center text-brand-dark">
          Empresas que <span className="text-gold-dark">Confiam em Nós</span>
        </h2>
        <div className="w-24 h-1 gold-gradient-bg mx-auto rounded-full mt-4" />
      </div>

      <div className="relative w-screen overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10" />

        <div className="flex gap-16 animate-scroll min-w-max px-10">
          {[...companies, ...companies].map((company, index) => (
            <div key={index} className="flex-shrink-0 flex items-center justify-center">
              <img
                src={company.logo_url}
                alt={company.nome}
                className="h-16 md:h-20 w-auto object-contain hover:scale-110 transition-transform duration-300"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 45s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};
