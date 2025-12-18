import React from "react";

export const TrustedCompanies: React.FC = () => {
  const companies = [
    { name: "VENDAIA", logo: "/VENDAIA.png" },
    { name: "UNITEL", logo: "/UNITEL.png" },
    { name: "ORBE", logo: "/ORBE.png" },
    { name: "COMPRAKI", logo: "/COMPRAKI.png" },
  ];

  return (
    <section className="py-20 bg-white overflow-hidden relative">
      
      {/* Title */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-center text-brand-dark">
          Empresas que <span className="text-gold-dark">Confiam em Nós</span>
        </h2>
        <div className="w-24 h-1 gold-gradient-bg mx-auto rounded-full mt-4" />
      </div>

      {/* Slider */}
      <div className="relative w-screen overflow-hidden">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10" />

        <div className="flex gap-20 animate-scroll min-w-max px-10">
          {[...companies, ...companies].map((company, index) => (
            <div
              key={index}
              className="flex-shrink-0 flex items-center justify-center"
            >
              <img
                src={company.logo}
                alt={company.name}
                className="h-20 md:h-24 w-auto object-contain"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Animation */}
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
          animation: scroll 35s linear infinite;
        }

        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

