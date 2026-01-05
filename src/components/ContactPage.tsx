import React, { useState } from 'react';
import { MapPin, Phone, MessageCircle, Send } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'Informações sobre Escritório Virtual',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const whatsappNumber = '244924006984';
    const text = `*Novo Contacto - Coworking MB*%0A%0A*Nome:* ${encodeURIComponent(formData.name)}%0A*Telefone:* ${encodeURIComponent(formData.phone)}%0A*Email:* ${encodeURIComponent(formData.email)}%0A*Assunto:* ${encodeURIComponent(formData.subject)}%0A*Mensagem:* ${encodeURIComponent(formData.message)}`;
    
    window.open(`https://wa.me/${whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <div className="bg-gray-50 min-h-screen animate-fade-in">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/suporte.png" 
            alt="Fale Conosco Mulato Business" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/90 via-brand-dark/70 to-gray-50"></div>
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center mt-12">
          <span className="inline-block py-1 px-3 rounded-full border border-gold/50 text-gold text-xs font-bold tracking-widest uppercase mb-4 backdrop-blur-md">
            Atendimento Exclusivo
          </span>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">
            Contacte-nos
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto font-light">
            Estamos prontos para elevar o nível do seu negócio. Agende uma visita ou tire as suas dúvidas.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 -mt-20 relative z-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Left Column: Contact Info & Map */}
            <div className="space-y-8">
              {/* Info Cards */}
              <div className="bg-brand-dark text-white p-8 rounded-xl shadow-2xl border border-gray-800 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 rounded-full blur-2xl group-hover:bg-gold/20 transition-all duration-500"></div>
                
                <h3 className="text-2xl font-serif font-bold mb-8 flex items-center gap-3">
                  Canais de Atendimento
                  <div className="h-px bg-gold flex-grow opacity-50"></div>
                </h3>

                <div className="space-y-8 relative z-10">
                  {/* Address */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gold flex-shrink-0">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-widest font-bold mb-1">Localização Premium</p>
                      <p className="text-lg font-medium leading-snug">
                        Centralidade do Kilamba,<br />
                        Q14, 5º Andar
                      </p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gold flex-shrink-0">
                      <Phone size={24} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-widest font-bold mb-1">Telefone / Geral</p>
                      <p className="text-lg font-medium tracking-wide">+244 924 006 984</p>
                      <p className="text-sm text-gray-500 mt-1">Seg - Sex: 08:00 - 17:00</p>
                    </div>
                  </div>

                  {/* WhatsApp Direct Button */}
                  <div className="pt-4">
                    <a 
                      href="https://wa.me/244924006984" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20bd5a] text-white py-4 rounded-lg font-bold shadow-lg hover:shadow-green-500/30 transition-all duration-300 transform hover:-translate-y-1"
                    >
                      <MessageCircle size={24} />
                      Conversar no WhatsApp
                    </a>
                  </div>
                </div>
              </div>

              {/* Map Embed */}
              <div className="bg-white p-2 rounded-xl shadow-lg border border-gray-100 h-[300px] relative overflow-hidden">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3942.066066627066!2d13.268884314782046!3d-8.87333899363065!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1a51f5c0c0000001%3A0x0!2zOMKwNTInMjQuMCJTIDEzwrAxNicxNi4wIkU!5e0!3m2!1spt-PT!2sao!4v1625576891234!5m2!1spt-PT!2sao" 
                  width="100%" 
                  height="100%" 
                  style={{border:0}} 
                  allowFullScreen={true} 
                  loading="lazy"
                  className="rounded-lg grayscale hover:grayscale-0 transition-all duration-700"
                ></iframe>
              </div>
            </div>

            {/* Right Column: Contact Form */}
            <div className="bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col">
              <div className="p-1 gold-gradient-bg"></div>
              <div className="p-8 md:p-10 bg-texture-noise flex-grow">
                <h3 className="text-2xl font-serif font-bold text-brand-dark mb-2">Envie uma Mensagem</h3>
                <p className="text-gray-500 mb-8 text-sm">Preencha o formulário abaixo e entraremos em contacto consigo o mais breve possível.</p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Nome Completo</label>
                      <input 
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-sm focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all"
                        placeholder="Seu nome"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Telefone</label>
                      <input 
                        type="tel" 
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-sm focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all"
                        placeholder="+244 9xx xxx xxx"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Email</label>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full p-3 bg-gray-50 border border-gray-200 rounded-sm focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all"
                      placeholder="seu.email@empresa.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Assunto</label>
                    <select 
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full p-3 bg-gray-50 border border-gray-200 rounded-sm focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all"
                    >
                      <option>Informações sobre Escritório Virtual</option>
                      <option>Orçamento para Salas de Reunião</option>
                      <option>Agendamento de Visita</option>
                      <option>Outros Assuntos</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Mensagem</label>
                    <textarea 
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className="w-full p-3 bg-gray-50 border border-gray-200 rounded-sm focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all resize-none"
                      placeholder="Como podemos ajudar?"
                    ></textarea>
                  </div>

                  <button 
                    type="submit" 
                    className="w-full gold-gradient-bg text-white p-4 rounded-sm font-bold uppercase tracking-widest hover:shadow-xl hover:brightness-110 transition-all duration-300 flex items-center justify-center gap-2 group"
                  >
                    Enviar Mensagem
                    <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
