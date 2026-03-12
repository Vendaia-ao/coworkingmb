import React from "react";

export const TrustedCompanies: React.FC = () => {
  const companies = [
    { name: "VENDAIA", logo: "/VENDAIA.png" },
    { name: "UNITEL", logo: "/UNITEL.png" },
    { name: "ORBE", logo: "/ORBE.png" },
    { name: "COMPRAKI", logo: "/COMPRAKI.png" },
    { name: "EA Nova", logo: "/empresa-01.png" },
    { name: "Renascer Imobiliária", logo: "/empresa-02.png" },
    { name: "Chiloia", logo: "/empresa-03.png" },
    { name: "Finalizações 3D", logo: "/empresa-04.png" },
    { name: "Finance Well", logo: "/empresa-05.png" },
    { name: "Águias Expressa", logo: "/empresa-06.png" },
    { name: "Bella Domus", logo: "/empresa-07.png" },
    { name: "HS ITC", logo: "/empresa-09.png" },
    { name: "Climatizar", logo: "/empresa-11.png" },
    { name: "MT House", logo: "/empresa-12.png" },
  ];

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
                src={company.logo}
                alt={company.name}
                className="h-16 md:h-20 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
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
