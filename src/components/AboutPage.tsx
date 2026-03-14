import React, { useEffect, useState } from 'react';
import { Building2, Users, TrendingUp, Zap, ArrowRight, Target, Eye, Heart, Calendar, UserCheck, Award } from 'lucide-react';
import { BookingModule } from './BookingModule';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';

export const AboutPage: React.FC = () => {
  const [config, setConfig] = useState<Record<string, string>>({});

  useEffect(() => {
    supabase.from('site_config').select('chave, valor').then(({ data }) => {
      const map: Record<string, string> = {};
      (data || []).forEach((c: any) => { map[c.chave] = c.valor || ''; });
      setConfig(map);
    });
  }, []);

  const desc1 = config.about_descricao1 || 'A Coworking MB é um espaço pensado para profissionais, startups, freelancers e empresas que procuram flexibilidade, estrutura e um ambiente profissional para crescer.';
  const desc2 = config.about_descricao2 || 'Com soluções adaptáveis, oferecemos desde escritórios virtuais até salas completas, sempre com foco no conforto, eficiência e credibilidade dos nossos clientes.';
  const missao = config.about_missao || 'A nossa missão é oferecer soluções de trabalho flexíveis e acessíveis, promovendo um ambiente profissional que estimule a produtividade, a colaboração e o networking entre empreendedores, profissionais independentes e empresas.';
  const visao = config.about_visao || 'Ser reconhecida como a principal referência em espaços de trabalho partilhados no Kilamba e em Angola. Contribuindo para o fortalecimento do ecossistema empreendedor e para o crescimento sustentável dos nossos clientes.';
  const citacao = config.about_citacao || 'Onde a sua empresa encontra o ambiente ideal para prosperar.';

  const values = [
    { icon: Building2, title: "Profissionalismo", description: "Excelência em todos os detalhes do nosso serviço." },
    { icon: Users, title: "Colaboração", description: "Ambientes que promovem conexão e crescimento mútuo." },
    { icon: Zap, title: "Flexibilidade", description: "Soluções que se adaptam à evolução do seu negócio." },
    { icon: TrendingUp, title: "Inovação", description: "Infraestrutura moderna e soluções criativas." },
    { icon: Heart, title: "Compromisso", description: "Dedicação total ao sucesso dos nossos clientes." }
  ];

  const stats = [
    { icon: Calendar, value: "2024", label: "Ano de Fundação" },
    { icon: UserCheck, value: "25+", label: "Clientes Ativos" },
    { icon: Award, value: "50+", label: "Clientes Atendidos" }
  ];

  return (
    <div className="bg-gray-50 min-h-screen animate-fade-in">
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="/networking.png" alt="Interior Mulato Business" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/90 via-brand-dark/70 to-gray-50"></div>
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center mt-12">
          <span className="inline-block py-1 px-3 rounded-full border border-gold/50 text-gold text-xs font-bold tracking-widest uppercase mb-4 backdrop-blur-md">Nossa Essência</span>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">Sobre a <span className="gold-gradient-text">Coworking MB</span></h1>
        </div>
      </section>

      <section className="py-20 -mt-20 relative z-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-100 flex flex-col lg:flex-row">
            <div className="w-full lg:w-1/2 p-8 md:p-16 flex flex-col justify-center bg-texture-noise">
              <h2 className="text-3xl font-serif font-bold text-brand-dark mb-8 relative">Estrutura e Profissionalismo<div className="absolute -bottom-2 left-0 w-16 h-1 gold-gradient-bg"></div></h2>
              <div className="space-y-6 text-gray-600 leading-relaxed text-lg">
                <p>{desc1}</p>
                <p>{desc2}</p>
              </div>
              <div className="mt-10">
                <button onClick={() => document.getElementById('booking-section')?.scrollIntoView({behavior: 'smooth'})}
                  className="inline-flex items-center gap-2 text-brand-dark font-bold border-b-2 border-gold pb-1 hover:text-gold transition-colors uppercase tracking-widest text-sm">Agendar uma Visita <ArrowRight size={16} /></button>
              </div>
            </div>
            <div className="w-full lg:w-1/2 relative min-h-[400px]">
              <img src="/logotipo.png" alt="Ambiente Profissional MB" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/60 to-transparent"></div>
              <div className="absolute bottom-8 left-8 right-8 glass-panel p-6 rounded-lg border-l-4 border-gold">
                <p className="text-brand-dark font-serif italic text-lg">"{citacao}"</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, i) => (
            <motion.div key={i} className="text-center p-8 rounded-xl border border-gray-100 shadow-sm hover:shadow-lg transition-shadow"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <div className="w-14 h-14 rounded-full gold-gradient-bg flex items-center justify-center mx-auto mb-4 text-white"><stat.icon size={24} /></div>
              <p className="text-4xl font-bold text-brand-dark font-serif">{stat.value}</p>
              <p className="text-gray-500 text-sm mt-1 uppercase tracking-wider font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-20 bg-gray-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div className="bg-white p-10 rounded-xl shadow-lg border border-gray-100" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full gold-gradient-bg flex items-center justify-center text-white"><Target size={24} /></div>
              <h3 className="text-2xl font-serif font-bold text-brand-dark">Nossa Missão</h3>
            </div>
            <p className="text-gray-600 leading-relaxed text-lg">{missao}</p>
          </motion.div>
          <motion.div className="bg-white p-10 rounded-xl shadow-lg border border-gray-100" initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full gold-gradient-bg flex items-center justify-center text-white"><Eye size={24} /></div>
              <h3 className="text-2xl font-serif font-bold text-brand-dark">Nossa Visão</h3>
            </div>
            <p className="text-gray-600 leading-relaxed text-lg">{visao}</p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-brand-dark text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16"><h2 className="text-3xl font-serif font-bold mb-4">Nossos Valores</h2><div className="w-24 h-1 gold-gradient-bg mx-auto rounded-full"></div></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {values.map((item, index) => (
              <div key={index} className="glass-dark p-6 rounded-lg border border-white/10 hover:border-gold/30 transition-all duration-300 group hover:-translate-y-2 text-center">
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center mb-4 mx-auto group-hover:bg-gold text-gold group-hover:text-white transition-colors duration-300"><item.icon size={24} /></div>
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div id="booking-section"><BookingModule /></div>
    </div>
  );
};
