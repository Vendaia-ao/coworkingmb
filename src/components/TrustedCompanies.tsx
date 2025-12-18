import React from 'react';

export const TrustedCompanies: React.FC = () => {
  const companies = [
    { name: 'VENDAIA', logo: '/VENDAIA.png' },
    { name: 'UNITEL', logo: '/UNITEL.png' },
    { name: 'ORBE', logo: 'ORBE.png' },
   
  ];

  return (
    <section className="py-20 bg-white overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-center text-brand-dark">
          Empresas que <span className="text-gold-dark">Confiam em Nós</span>
        </h2>
        <div className="w-24 h-1 gold-gradient-bg mx-auto rounded-full mt-4"></div>
      </div>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10"></div>
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10"></div>

        <div className="flex gap-12 animate-scroll">
          {[...companies, ...companies].map((company, index) => (
            <div
              key={index}
              className="flex-shrink-0 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100"
            >
              <img
                src={company.logo}
                alt={company.name}
                className="h-12 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll {
          animation: scroll 30s linear infinite;
        }

        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};
