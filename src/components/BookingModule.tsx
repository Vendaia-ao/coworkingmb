import React, { useState, useEffect } from "react";
import { Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();
const MONTHS_PT = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
const WEEKDAYS_PT = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

const DatePicker: React.FC<{ value: string; onChange: (val: string) => void }> = ({ value, onChange }) => {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay = getFirstDayOfMonth(viewYear, viewMonth);

  const isPast = (day: number) => {
    const d = new Date(viewYear, viewMonth, day);
    const t = new Date(); t.setHours(0, 0, 0, 0);
    return d < t;
  };

  const isSelected = (day: number) => {
    const dateStr = `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return value === dateStr;
  };

  const selectDay = (day: number) => {
    if (isPast(day)) return;
    const dateStr = `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    onChange(dateStr);
  };

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  };

  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(<div key={`e-${i}`} />);
  for (let d = 1; d <= daysInMonth; d++) {
    const past = isPast(d);
    const sel = isSelected(d);
    cells.push(
      <button key={d} type="button" onClick={() => selectDay(d)} disabled={past}
        className={`w-9 h-9 rounded-full text-sm font-medium transition-all ${sel ? 'gold-gradient-bg text-white shadow-md' :
          past ? 'text-gray-300 cursor-not-allowed' :
            'text-gray-700 hover:bg-gold/10 hover:text-gold cursor-pointer'
          }`}>{d}</button>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <button type="button" onClick={prevMonth} className="p-1 hover:text-gold transition-colors text-gray-500">&larr;</button>
        <span className="font-bold text-sm text-brand-dark">{MONTHS_PT[viewMonth]} {viewYear}</span>
        <button type="button" onClick={nextMonth} className="p-1 hover:text-gold transition-colors text-gray-500">&rarr;</button>
      </div>
      <div className="grid grid-cols-7 gap-1 mb-2">
        {WEEKDAYS_PT.map(w => <div key={w} className="text-center text-xs font-bold text-gray-400">{w}</div>)}
      </div>
      <div className="grid grid-cols-7 gap-1">{cells}</div>
    </div>
  );
};

interface BookingModuleProps {
  preselectedService?: string;
}

export const BookingModule: React.FC<BookingModuleProps> = ({ preselectedService }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState(preselectedService || "");
  const [people, setPeople] = useState("");
  const [frequency, setFrequency] = useState("");
  const [date, setDate] = useState("");
  const [horaInicio, setHoraInicio] = useState("");
  const [horaFim, setHoraFim] = useState("");
  const [acceptedPrivacy, setAcceptedPrivacy] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [bookedSlots, setBookedSlots] = useState<{ start: number; end: number }[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const fetchBookings = async () => {
      if (!date || !service) {
        setBookedSlots([]);
        return;
      }

      const { data } = await supabase
        .from('reservas')
        .select('hora_inicio, hora_fim, status, notas, recursos(nome)')
        .eq('data', date)
        .eq('status', 'confirmada');

      if (!data) return;

      const toMinsStr = (t: string) => {
        if (!t) return 0;
        const [h, m] = t.split(':').map(Number);
        return h * 60 + (m || 0);
      };

      const related = data.filter((r: any) => {
        const hasNotas = r.notas && r.notas.includes(service);
        const hasRecurso = r.recursos && r.recursos.nome && r.recursos.nome.toLowerCase().includes(service.toLowerCase());
        return hasNotas || hasRecurso;
      });

      setBookedSlots(related.map((r: any) => ({
        start: toMinsStr(r.hora_inicio),
        end: toMinsStr(r.hora_fim)
      })));
    };

    fetchBookings();
  }, [date, service]);

  const generateTimeSlots = () => {
    const slots = [];
    for (let h = 8; h <= 18; h++) {
      for (let m = 0; m < 60; m += 30) {
        if (h === 18 && m > 0) continue;
        slots.push(`${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`);
      }
    }
    return slots;
  };

  const TIME_SLOTS = generateTimeSlots();

  const toMins = (t: string) => {
    if (!t) return 0;
    const [h, m] = t.split(':').map(Number);
    return h * 60 + m;
  };

  const availableStartSlots = TIME_SLOTS.filter(time => {
    if (time === "18:00") return false;
    const s = toMins(time);
    const e = s + 30; // check for at least 30 min availability
    return !bookedSlots.some(slot => s < slot.end && e > slot.start);
  });

  const availableEndSlots = TIME_SLOTS.filter(time => {
    if (!horaInicio) return false;
    const s = toMins(horaInicio);
    const e = toMins(time);
    if (e <= s) return false;
    return !bookedSlots.some(slot => s < slot.end && e > slot.start);
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!acceptedPrivacy || submitting) return;
    setSubmitting(true);

    const notasLines = [
      `📌 Espaço/Serviço: ${service}`,
      `👥 Nº Pessoas: ${people}`,
      `🔁 Frequência: ${frequency}`,
      `📅 Data Preferencial: ${date || 'Não informada'}`,
      `🕐 Horário: ${horaInicio || '—'} - ${horaFim || '—'}`,
      `📞 Telefone/WhatsApp: ${phone || 'Não informado'}`,
    ].join('\n');

    const { error } = await (supabase.from('reservas') as any).insert({
      cliente_nome: name,
      telefone: phone || null,
      data: date || new Date().toISOString().split('T')[0],
      hora_inicio: horaInicio || '08:00',
      hora_fim: horaFim || '09:00',
      status: 'pendente',
      notas: notasLines,
    });

    if (!error) {
      toast({ title: '✅ Pré-reserva enviada!', description: 'A sua solicitação foi recebida. Entraremos em contacto em breve.' });

      // Clear form
      setName("");
      setPhone("");
      setService(preselectedService || "");
      setPeople("");
      setFrequency("");
      setDate("");
      setHoraInicio("");
      setHoraFim("");
      setAcceptedPrivacy(false);
    } else {
      toast({ title: '❌ Erro', description: 'Não foi possível enviar a pré-reserva.', variant: 'destructive' });
    }

    setSubmitting(false);
  };

  return (
    <section id="booking" className="py-20 bg-white bg-texture-noise scroll-mt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-100">
          <div className="gold-gradient-bg p-6 text-center">
            <h2 className="text-2xl font-bold text-white tracking-wide uppercase">Pré-Reserva</h2>
            <p className="text-white/80 text-sm mt-1">Garanta o seu espaço com antecedência</p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Nome do Solicitante</label>
              <input type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Ex: João Silva"
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold text-gray-700" />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Telefone / WhatsApp</label>
              <input type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Ex: +244 9XX XXX XXX"
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold text-gray-700" />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Espaço / Serviço</label>
              <select required value={service} onChange={(e) => setService(e.target.value)}
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold appearance-none text-gray-700">
                <option value="">Selecionar</option>
                <option>Escritório Virtual</option>
                <option>Sala de Reunião</option>
                <option>Sala de Formação</option>
                <option>Sala Privada</option>
                <option>Secretária</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Nº de Pessoas</label>
              <select required value={people} onChange={(e) => setPeople(e.target.value)}
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold appearance-none text-gray-700">
                <option value="">Selecionar</option>
                <option>1 Pessoa</option>
                <option>2 - 4 Pessoas</option>
                <option>5 - 8 Pessoas (Max)</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Frequência</label>
              <select required value={frequency} onChange={(e) => setFrequency(e.target.value)}
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold appearance-none text-gray-700">
                <option value="">Selecionar</option>
                <option>Uso Pontual (Hora/Dia)</option>
                <option>Mensal</option>
                <option>Trimestral</option>
                <option>Anual</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Horário Preferencial</label>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-xs text-gray-400">Início</span>
                  <select value={horaInicio} onChange={(e) => { setHoraInicio(e.target.value); setHoraFim(""); }} disabled={!date || !service}
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold appearance-none text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed">
                    <option value="">Selecionar</option>
                    {availableStartSlots.map(time => <option key={time} value={time}>{time}</option>)}
                  </select>
                </div>
                <div>
                  <span className="text-xs text-gray-400">Fim</span>
                  <select value={horaFim} onChange={(e) => setHoraFim(e.target.value)} disabled={!horaInicio}
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold appearance-none text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed">
                    <option value="">Selecionar</option>
                    {availableEndSlots.map(time => <option key={time} value={time}>{time}</option>)}
                  </select>
                </div>
              </div>
              {(!date || !service) && <p className="text-[10px] text-amber-600 mt-1">Selecione primeiro o Serviço e a Data.</p>}
            </div>

            <div className="md:col-span-2 space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Data Preferencial</label>
              <DatePicker value={date} onChange={setDate} />
              {date && (
                <p className="text-sm text-gold font-medium mt-1">
                  <Calendar className="inline w-4 h-4 mr-1" />Selecionada: {date}
                </p>
              )}
            </div>

            <div className="md:col-span-2 flex items-start gap-3">
              <input type="checkbox" id="privacy-booking" checked={acceptedPrivacy} onChange={(e) => setAcceptedPrivacy(e.target.checked)}
                className="mt-1 w-4 h-4 accent-gold cursor-pointer" required />
              <label htmlFor="privacy-booking" className="text-sm text-gray-600 cursor-pointer">
                Declaro que li e concordo com a{' '}
                <Link to="/politica-de-privacidade" className="text-gold underline hover:text-gold-dark">Política de Privacidade</Link>.
              </label>
            </div>

            <div className="md:col-span-2 mt-4">
              <button type="submit" disabled={!acceptedPrivacy || submitting}
                className="w-full bg-brand-dark text-white p-4 rounded-sm font-bold uppercase tracking-widest hover:bg-black transition-colors duration-300 shadow-lg border-b-4 border-gold disabled:opacity-50 disabled:cursor-not-allowed">
                {submitting ? 'A enviar...' : 'Solicitar Disponibilidade'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
