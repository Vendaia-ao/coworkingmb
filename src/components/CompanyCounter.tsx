import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Building2, Users, Award, MapPin } from 'lucide-react';

const counters = [
  { icon: Building2, target: 25, label: "Empresas Instaladas", suffix: "+" },
  { icon: Users, target: 50, label: "Clientes Atendidos", suffix: "+" },
  { icon: Award, target: 3, label: "Soluções Disponíveis", suffix: "" },
  { icon: MapPin, target: 1, label: "Localização Premium", suffix: "" }
];

const AnimatedCounter: React.FC<{ target: number; suffix: string; inView: boolean }> = ({ target, suffix, inView }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const step = Math.max(1, Math.floor(duration / target));
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= target) clearInterval(timer);
    }, step);
    return () => clearInterval(timer);
  }, [inView, target]);

  return <span>{count}{suffix}</span>;
};

export const CompanyCounter: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-20 bg-brand-dark text-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div className="text-center mb-12" initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ duration: 0.6 }}>
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            A Coworking MB em <span className="gold-gradient-text">Números</span>
          </h2>
          <div className="w-24 h-1 gold-gradient-bg mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {counters.map((item, i) => (
            <motion.div key={i} className="text-center" initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.15 }}>
              <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4 text-gold">
                <item.icon size={28} />
              </div>
              <p className="text-4xl md:text-5xl font-bold font-serif gold-gradient-text">
                <AnimatedCounter target={item.target} suffix={item.suffix} inView={isInView} />
              </p>
              <p className="text-gray-400 text-sm mt-2 uppercase tracking-wider font-medium">{item.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
