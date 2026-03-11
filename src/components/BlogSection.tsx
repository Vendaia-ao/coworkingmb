import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Clock } from 'lucide-react';

const blogPosts = [
  {
    title: "5 Vantagens de um Escritório Virtual para Startups em Angola",
    excerpt: "Descubra como um escritório virtual pode reduzir custos e aumentar a credibilidade da sua startup no mercado angolano.",
    date: "10 Mar 2026",
    category: "Dicas",
    image: "/credibilidade.png"
  },
  {
    title: "Como o Coworking Impulsiona o Networking Empresarial",
    excerpt: "O ambiente de coworking oferece oportunidades únicas de conexão profissional. Saiba como aproveitar ao máximo.",
    date: "05 Mar 2026",
    category: "Networking",
    image: "/networking.png"
  },
  {
    title: "Guia Completo: Escolher a Sala de Reunião Ideal",
    excerpt: "Saiba o que considerar ao escolher uma sala de reunião para garantir uma apresentação profissional e eficaz.",
    date: "28 Fev 2026",
    category: "Guia",
    image: "/salas.png"
  }
];

export const BlogSection: React.FC = () => {
  return (
    <section className="py-20 bg-white px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-dark mb-4">
            Blog <span className="text-gold-dark">Corporativo</span>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">Insights, dicas e novidades do mundo do coworking e empreendedorismo em Angola.</p>
          <div className="w-24 h-1 gold-gradient-bg mx-auto rounded-full mt-4"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post, i) => (
            <motion.article key={i} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 group cursor-pointer"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <div className="h-48 overflow-hidden relative">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute top-4 left-4">
                  <span className="bg-gold text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">{post.category}</span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
                  <Clock size={12} />
                  <span>{post.date}</span>
                </div>
                <h3 className="text-lg font-bold text-brand-dark mb-2 group-hover:text-gold-dark transition-colors line-clamp-2">{post.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">{post.excerpt}</p>
                <span className="inline-flex items-center gap-1 text-sm font-bold text-gold-dark uppercase tracking-wider group-hover:gap-2 transition-all">
                  Ler Mais <ArrowRight size={14} />
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
