import React, { useState, useEffect } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { supabase } from '@/integrations/supabase/client';
import { Skeleton } from '@/components/ui/skeleton';

type FAQ = { id: string; pergunta: string; resposta: string };

export const FAQSection: React.FC = () => {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useEffect(() => {
    supabase.from('faqs').select('*').eq('ativo', true).order('ordem')
      .then(({ data }) => { setFaqs((data as any[]) || []); setLoading(false); });
  }, []);

  if (loading) {
    return (
      <section className="py-24 bg-gradient-to-b from-[#C6A664]/20 via-[#C6A664]/30 to-[#C6A664]/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Skeleton className="h-10 w-48 mx-auto mb-12" />
          {[1,2,3,4].map(i => <Skeleton key={i} className="h-20 mb-4 rounded-3xl" />)}
        </div>
      </section>
    );
  }

  if (faqs.length === 0) return null;

  return (
    <section id="faq" className="py-24 bg-gradient-to-b from-[#C6A664]/20 via-[#C6A664]/30 to-[#C6A664]/10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gold/10 text-gold mb-6">
            <HelpCircle className="w-6 h-6" />
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-dark">
            Perguntas <span className="text-gold-dark">Frequentes</span>
          </h2>
          <p className="mt-4 text-gray-500 max-w-xl mx-auto">
            Tudo o que precisas de saber antes de reservar o teu espaço
          </p>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={faq.id} className={`group rounded-3xl border transition-all duration-300 ${isOpen ? "border-gold/40 bg-white shadow-xl" : "border-gray-200 bg-white hover:shadow-md"}`}>
                <button onClick={() => setOpenIndex(isOpen ? null : index)} className="w-full flex items-center justify-between p-6 md:p-7 text-left">
                  <h3 className="text-base md:text-lg font-semibold text-brand-dark pr-4">{faq.pergunta}</h3>
                  <div className={`flex items-center justify-center w-9 h-9 rounded-full border transition-all duration-300 ${isOpen ? "bg-gold text-white border-gold rotate-180" : "border-gray-300 text-gray-500 group-hover:text-gold"}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-40" : "max-h-0"}`}>
                  <div className="px-6 md:px-7 pb-6 text-gray-600 leading-relaxed">{faq.resposta}</div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-16">
          <p className="text-gray-500 mb-4">Ainda tens dúvidas?</p>
          <a href="https://wa.me/244924006984" className="inline-block bg-brand-dark text-white px-8 py-3 rounded-full font-semibold hover:bg-black transition">
            Falar com a equipa
          </a>
        </div>
      </div>
    </section>
  );
};
