import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    name: "Ana Sousa",
    company: "Sousa & Associados",
    text: "O Coworking MB transformou completamente a imagem da nossa empresa. O endereço de prestígio e o atendimento profissional fazem toda a diferença junto dos nossos clientes."
  },
  {
    name: "Carlos Mendes",
    company: "TechStart Angola",
    text: "Ambiente perfeito para a nossa startup. A infraestrutura é excelente e o networking com outros profissionais tem gerado oportunidades incríveis de negócio."
  },
  {
    name: "Maria João",
    company: "MJ Consultoria",
    text: "A flexibilidade dos planos permitiu-nos crescer sem preocupações. As salas de reunião são impecáveis e o suporte administrativo é de primeira classe."
  },
  {
    name: "Pedro Lopes",
    company: "Lopes Trading",
    text: "Reduzi os meus custos fixos drasticamente ao optar pelo escritório virtual. A credibilidade que o endereço no Kilamba traz ao meu negócio é inestimável."
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
            <motion.div key={i} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow relative"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <Quote size={32} className="text-gold/20 absolute top-6 right-6" />
              <p className="text-gray-600 leading-relaxed mb-6 italic">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full gold-gradient-bg flex items-center justify-center text-white font-bold text-sm">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-brand-dark text-sm">{t.name}</p>
                  <p className="text-xs text-gray-500">{t.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
