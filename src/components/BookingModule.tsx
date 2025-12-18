import React, { useState } from "react";
import { Calendar } from "lucide-react";

export const BookingModule: React.FC = () => {
  const [service, setService] = useState("");
  const [people, setPeople] = useState("");
  const [frequency, setFrequency] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const phoneNumber = "244924006984"; // WhatsApp (sem espaços)

    const message = `
📌 *Pré-Reserva – Coworking MB*

🧩 *Espaço / Serviço:* ${service}
👥 *Nº de Pessoas:* ${people}
🔁 *Frequência:* ${frequency}
📅 *Data Preferencial:* ${date || "Não informada"}

Gostaria de confirmar a disponibilidade.
    `.trim();

    const encodedMessage = encodeURIComponent(message);

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, "_blank");
  };

  return (
    <section id="booking" className="py-20 bg-white bg-texture-noise scroll-mt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-100">
          
          {/* Header */}
          <div className="gold-gradient-bg p-6 text-center">
            <h2 className="text-2xl font-bold text-white tracking-wide uppercase">
              Pré-Reserva
            </h2>
            <p className="text-white/80 text-sm mt-1">
              Garanta o seu espaço com antecedência
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="p-8 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* Espaço / Serviço */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                Espaço / Serviço
              </label>
              <select
                required
                value={service}
                onChange={(e) => setService(e.target.value)}
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold appearance-none text-gray-700"
              >
                <option value="">Selecionar</option>
                <option>Escritório Virtual</option>
                <option>Salas & Espaços</option>
                <option>Secretária Partilhada</option>
                <option>Secretária Dedicada</option>
              </select>
            </div>

            {/* Nº de Pessoas */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                Nº de Pessoas
              </label>
              <select
                required
                value={people}
                onChange={(e) => setPeople(e.target.value)}
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold appearance-none text-gray-700"
              >
                <option value="">Selecionar</option>
                <option>1 Pessoa</option>
                <option>2 - 4 Pessoas</option>
                <option>5 - 8 Pessoas (Max)</option>
              </select>
            </div>

            {/* Frequência */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                Frequência
              </label>
              <select
                required
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold appearance-none text-gray-700"
              >
                <option value="">Selecionar</option>
                <option>Uso Pontual (Hora/Dia)</option>
                <option>Mensal</option>
                <option>Trimestral</option>
                <option>Anual</option>
              </select>
            </div>

            {/* Data */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                Data Preferencial
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold text-gray-700"
                />
                <Calendar className="absolute right-3 top-3.5 text-gray-400 w-4 h-4 pointer-events-none" />
              </div>
            </div>

            {/* Submit */}
            <div className="md:col-span-2 mt-4">
              <button
                type="submit"
                className="w-full bg-brand-dark text-white p-4 rounded-sm font-bold uppercase tracking-widest hover:bg-black transition-colors duration-300 shadow-lg border-b-4 border-gold"
              >
                Solicitar Disponibilidade
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

