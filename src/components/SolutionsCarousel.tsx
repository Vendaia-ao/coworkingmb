import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SOLUTIONS_DETAILS } from '../constants';
import { Check } from 'lucide-react';

export const SolutionsCarousel: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const navigate = useNavigate();

  const handlePlanClick = () => {
    const solution = SOLUTIONS_DETAILS[activeTab];
    if (solution.href) {
      navigate(solution.href);
    }
  };

  return (
    <section id="solutions" className="py-24 bg-brand-dark text-white relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4">
            Nossas <span className="gold-gradient-text">Soluções</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Planos desenhados para cada etapa do seu negócio.
          </p>
        </div>

        {/* Tabs Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {SOLUTIONS_DETAILS.map((solution, index) => (
            <button
              key={solution.id}
              onClick={() => setActiveTab(index)}
              className={`px-6 py-3 rounded-full text-sm font-semibold tracking-wide transition-all duration-300 border ${activeTab === index
                  ? 'bg-white text-brand-dark border-white shadow-[0_0_20px_rgba(255,255,255,0.3)]'
                  : 'bg-transparent text-gray-400 border-gray-700 hover:border-gold hover:text-gold'
                }`}
            >
              {solution.title}
            </button>
          ))}
        </div>

        {/* Content Display */}
        <div className="glass-dark rounded-2xl p-8 md:p-12 border border-white/10 shadow-2xl">
          <div className="flex flex-col lg:flex-row items-center gap-12">

            {/* Image Side - Clean, no overlay */}
            <div className="w-full lg:w-1/2 relative">
              <img
                src={SOLUTIONS_DETAILS[activeTab].image}
                alt={SOLUTIONS_DETAILS[activeTab].title}
                className="relative rounded-lg w-full shadow-2xl object-cover h-[300px] md:h-[400px]"
              />
            </div>

            {/* Info Side */}
            <div className="w-full lg:w-1/2 space-y-6">
              <h3 className="text-3xl font-serif font-bold text-white">
                {SOLUTIONS_DETAILS[activeTab].title}
              </h3>
              <div className="text-2xl font-bold gold-gradient-text">
                {SOLUTIONS_DETAILS[activeTab].price}
              </div>

              <ul className="space-y-4 my-6">
                {SOLUTIONS_DETAILS[activeTab].features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-gray-300">
                    <span className="w-6 h-6 rounded-full bg-gold/20 flex items-center justify-center mr-3 text-gold">
                      <Check size={14} strokeWidth={3} />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                onClick={handlePlanClick}
                className="gold-gradient-bg text-white px-8 py-3 rounded-sm font-bold shadow-lg hover:shadow-gold/30 hover:-translate-y-1 transition-all duration-300 uppercase tracking-widest text-sm"
              >
                Ver Planos
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
