import React from 'react';
import { Calendar } from 'lucide-react';

export const BookingModule: React.FC = () => {
  return (
    <section id="booking" className="py-20 bg-white bg-texture-noise scroll-mt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-100">
          <div className="gold-gradient-bg p-6 text-center">
            <h2 className="text-2xl font-bold text-white tracking-wide uppercase">Pré-Reserva</h2>
            <p className="text-white/80 text-sm mt-1">Garanta o seu espaço com antecedência</p>
          </div>
          
          <form className="p-8 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Field 1: Service */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Espaço / Serviço</label>
              <div className="relative">
                <select className="w-full p-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold appearance-none text-gray-700">
                  <option>Escritório Virtual</option>
                  <option>Salas & Espaços</option>
                  <option>Secretária Partilhada</option>
                  <option>Secretária Dedicada</option>
                </select>
                <div className="absolute right-3 top-3.5 pointer-events-none text-gray-400">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
                </div>
              </div>
            </div>

            {/* Field 2: Pax */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Nº de Pessoas</label>
              <div className="relative">
                <select className="w-full p-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold appearance-none text-gray-700">
                  <option>1 Pessoa</option>
                  <option>2 - 4 Pessoas</option>
                  <option>5 - 8 Pessoas (Max)</option>
                </select>
                <div className="absolute right-3 top-3.5 pointer-events-none text-gray-400">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
                </div>
              </div>
            </div>

            {/* Field 3: Frequency */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Frequência</label>
              <div className="relative">
                <select className="w-full p-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold appearance-none text-gray-700">
                  <option>Uso Pontual (Hora/Dia)</option>
                  <option>Mensal</option>
                  <option>Trimestral</option>
                  <option>Anual</option>
                </select>
                <div className="absolute right-3 top-3.5 pointer-events-none text-gray-400">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
                </div>
              </div>
            </div>

            {/* Field 4: Date */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Data Preferencial</label>
              <div className="relative">
                <input 
                  type="date" 
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold text-gray-700"
                />
                <Calendar className="absolute right-3 top-3.5 text-gray-400 w-4 h-4 pointer-events-none" />
              </div>
            </div>

            {/* Submit */}
            <div className="md:col-span-2 mt-4">
              <button type="submit" className="w-full bg-brand-dark text-white p-4 rounded-sm font-bold uppercase tracking-widest hover:bg-black transition-colors duration-300 shadow-lg border-b-4 border-gold">
                Solicitar Disponibilidade
              </button>
            </div>

          </form>
        </div>
      </div>
    </section>
  );
};
