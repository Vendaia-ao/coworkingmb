import React from 'react';
import { motion } from 'framer-motion';
import { Play, Quote } from 'lucide-react';

const testimonials = [
  {
    name: "Ana Sousa",
    company: "Sousa & Associados",
    text: "O Coworking MB transformou completamente a imagem da nossa empresa. O endereço de prestígio e o atendimento profissional fazem toda a diferença junto dos nossos clientes.",
    videoUrl: null,
  },
  {
    name: "Carlos Mendes",
    company: "TechStart Angola",
    text: "Ambiente perfeito para a nossa startup. A infraestrutura é excelente e o networking com outros profissionais tem gerado oportunidades incríveis de negócio.",
    videoUrl: null,
  },
  {
    name: "Maria João",
    company: "MJ Consultoria",
    text: "A flexibilidade dos planos permitiu-nos crescer sem preocupações. As salas de reunião são impecáveis e o suporte administrativo é de primeira classe.",
    videoUrl: null,
  },
  {
    name: "Pedro Lopes",
    company: "Lopes Trading",
    text: "Reduzi os meus custos fixos drasticamente ao optar pelo escritório virtual. A credibilidade que o endereço no Kilamba traz ao meu negócio é inestimável.",
    videoUrl: null,
  }
];

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-20 bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-dark mb-4">
            O Que Dizem os Nossos <span className="text-gold-dark">Clientes</span>
          </h2>
          <div className="w-24 h-1 gold-gradient-bg mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((t, i) => (
            <motion.div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              
              {/* Video placeholder */}
              <div className="relative aspect-video bg-gradient-to-br from-brand-dark to-brand-dark/80 flex items-center justify-center group cursor-pointer">
                <div className="absolute inset-0 bg-[url('/placeholder.svg')] bg-cover bg-center opacity-20" />
                <div className="relative z-10 flex flex-col items-center gap-3">
                  <div className="w-16 h-16 rounded-full gold-gradient-bg flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Play size={28} className="text-white ml-1" />
                  </div>
                  <span className="text-white/70 text-sm font-medium">Vídeo em breve</span>
                </div>
              </div>

              {/* Quote content */}
              <div className="p-6 relative">
                <Quote size={24} className="text-gold/20 absolute top-4 right-4" />
                <p className="text-gray-600 leading-relaxed mb-4 italic text-sm">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full gold-gradient-bg flex items-center justify-center text-white font-bold text-sm">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-brand-dark text-sm">{t.name}</p>
                    <p className="text-xs text-gray-500">{t.company}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
