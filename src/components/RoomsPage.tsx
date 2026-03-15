import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, Presentation, GraduationCap, Lock, Wifi, Coffee, ArrowRight, Info } from 'lucide-react';
import { BookingModule } from './BookingModule';
import { supabase } from '@/integrations/supabase/client';
import { Skeleton } from '@/components/ui/skeleton';

const ICONS: Record<string, any> = { 'Sala de Reunião': Presentation, 'Sala de Formação': GraduationCap, 'Sala Privada': Lock };
type Plan = { id: string; nome: string; preco: string; periodo: string; features: string[]; destaque: boolean; promo: string | null; nota: string | null; preco_alt: string | null };

export const RoomsPage: React.FC = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [salaPrivadaDisponivel, setSalaPrivadaDisponivel] = useState(true);

  useEffect(() => {
    (supabase.from('servicos_planos' as any) as any).select('*').eq('servico', 'salas').eq('ativo', true).order('ordem')
      .then(({ data }: any) => { setPlans(data || []); setLoading(false); });
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen animate-fade-in">
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="/rooms.jpg" alt="Salas de reunião e formação em Luanda" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/90 via-brand-dark/60 to-gray-50"></div>
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center mt-12">
          <span className="inline-block py-1 px-3 rounded-full border border-gold/50 text-gold text-xs font-bold tracking-widest uppercase mb-4 backdrop-blur-md">Ambientes Corporativos</span>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6"><span className="gold-gradient-text">Salas</span></h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">Sala de Reunião · Sala de Formação · Sala Privada</p>
        </div>
      </section>

      <section className="py-20 -mt-20 relative z-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-100 flex flex-col lg:flex-row">
            <div className="w-full lg:w-1/2 p-8 md:p-16 flex flex-col justify-center bg-texture-noise">
              <h2 className="text-3xl font-serif font-bold text-brand-dark mb-8 relative">Espaços Premium<div className="absolute -bottom-2 left-0 w-16 h-1 gold-gradient-bg"></div></h2>
              <div className="space-y-6 text-gray-600 leading-relaxed text-lg">
                <p>Soluções flexíveis de <strong className="text-brand-dark">salas equipadas</strong> para reuniões, formações e escritórios privativos.</p>
                <p>Ambientes modernos, climatizados e com toda a infraestrutura necessária para o seu negócio prosperar na Centralidade do Kilamba.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10">
                <div className="flex items-start gap-3"><div className="bg-gray-50 p-2 rounded-lg text-gold-dark"><Wifi size={24} /></div><div><h4 className="font-bold text-brand-dark">Internet de Alta Velocidade</h4><p className="text-sm text-gray-500">Conexão estável e rápida.</p></div></div>
                <div className="flex items-start gap-3"><div className="bg-gray-50 p-2 rounded-lg text-gold-dark"><Coffee size={24} /></div><div><h4 className="font-bold text-brand-dark">Amenidades Incluídas</h4><p className="text-sm text-gray-500">Copa, água mineral e café.</p></div></div>
              </div>
              <div className="mt-10"><Link to="/contacto" className="inline-flex items-center gap-2 text-brand-dark font-bold border-b-2 border-gold pb-1 hover:text-gold transition-colors uppercase tracking-widest text-sm">Solicitar Informação <ArrowRight size={16} /></Link></div>
            </div>
            <div className="w-full lg:w-1/2 relative min-h-[400px]">
              <img src="/salas.png" alt="Salas Mulato Business" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/60 to-transparent"></div>
              <div className="absolute bottom-8 left-8 right-8 glass-panel p-6 rounded-lg border-l-4 border-gold"><p className="text-brand-dark font-serif italic text-lg">"Ambientes que inspiram produtividade e sucesso."</p></div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-brand-dark text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16"><h2 className="text-3xl font-serif font-bold mb-4">Tipos de Salas & Preços</h2><div className="w-24 h-1 gold-gradient-bg mx-auto rounded-full"></div></div>
          {loading ? <div className="grid grid-cols-1 md:grid-cols-3 gap-8">{[1,2,3].map(i => <Skeleton key={i} className="h-96 rounded-xl" />)}</div> : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
              {plans.map((room) => {
                const Icon = ICONS[room.nome] || Presentation;
                return (
                  <div key={room.id} className={`relative rounded-xl overflow-hidden transition-all duration-300 flex flex-col h-full ${room.destaque ? 'transform md:-translate-y-6 shadow-2xl border-2 border-gold bg-white z-10' : 'bg-white shadow-xl border border-gray-100 mt-0 md:mt-4'}`}>
                    {room.destaque && <div className="absolute top-0 inset-x-0 h-1 gold-gradient-bg"></div>}
                    {room.destaque && <div className="absolute top-4 right-4"><span className="bg-gold text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">Popular</span></div>}
                    <div className="p-8 flex flex-col h-full">
                      <div className="mb-6 text-center">
                        <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto ${room.destaque ? 'gold-gradient-bg text-white shadow-lg' : 'bg-gray-100 text-brand-dark'}`}><Icon size={32} strokeWidth={1.5} /></div>
                        <h3 className="text-2xl font-serif font-bold text-brand-dark mb-2">{room.nome}</h3>
                        <div className="flex flex-col items-center">
                          <span className={`text-3xl font-bold tracking-tight ${room.destaque ? 'text-gold-dark' : 'text-gray-900'}`}>{room.preco}</span>
                          <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">{room.periodo}</span>
                          {room.preco_alt && <span className="text-xs text-gold-dark font-semibold mt-1">{room.preco_alt}</span>}
                        </div>
                      </div>
                      <div className="w-full h-px bg-gray-100 mb-6"></div>
                      <ul className="space-y-3 mb-6 flex-grow">
                        {room.features.map((f, idx) => (
                          <li key={idx} className="flex items-start">
                            <span className={`flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center mr-3 mt-1 ${room.destaque ? 'bg-gold/20 text-gold-dark' : 'bg-gray-100 text-gray-400'}`}><Check size={10} strokeWidth={3} /></span>
                            <span className="text-gray-600 text-sm">{f}</span>
                          </li>
                        ))}
                      </ul>
                      {room.nota && <div className="flex items-start gap-2 mb-6 bg-gray-50 p-3 rounded-lg"><Info size={14} className="text-gold-dark mt-0.5 flex-shrink-0" /><span className="text-xs text-gray-500">{room.nota}</span></div>}
                      <button onClick={() => document.getElementById('booking-section')?.scrollIntoView({ behavior: 'smooth' })}
                        className={`w-full py-4 rounded-sm font-bold uppercase tracking-widest text-sm transition-all duration-300 ${room.destaque ? 'gold-gradient-bg text-white shadow-lg hover:shadow-gold/50' : 'bg-brand-dark text-white hover:bg-black'}`}>Selecionar</button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <div id="booking-section"><BookingModule preselectedService="Sala de Reunião" /></div>
    </div>
  );
};
