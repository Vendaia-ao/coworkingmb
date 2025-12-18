import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "O que é a Coworking MB?",
    answer:
      "A Coworking MB é um espaço de trabalho moderno e flexível, pensado para profissionais, startups e empresas que buscam conforto, networking e produtividade.",
  },
  {
    question: "Quais serviços estão disponíveis?",
    answer:
      "Oferecemos escritórios virtuais, secretárias partilhadas, secretárias dedicadas, salas de reunião e espaços para eventos.",
  },
  {
    question: "É necessário contrato de longo prazo?",
    answer:
      "Não. Trabalhamos com planos flexíveis: uso pontual, mensal, trimestral ou anual.",
  },
  {
    question: "Posso reservar um espaço com antecedência?",
    answer:
      "Sim. Através do formulário de pré-reserva no site ou pelo nosso WhatsApp, podes garantir o teu espaço antecipadamente.",
  },
  {
    question: "Onde a Coworking MB está localizada?",
    answer:
      "Estamos localizados em uma área estratégica, com fácil acesso e infraestrutura moderna. Para mais detalhes, fale connosco pelo WhatsApp.",
  },
];

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-dark">
            Perguntas <span className="text-gold-dark">Frequentes</span>
          </h2>
          <p className="mt-4 text-gray-500">
            Tire as suas dúvidas antes de solicitar a reserva
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-lg shadow-sm"
            >
              <button
                onClick={() => toggle(index)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <span className="font-semibold text-brand-dark">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 transition-transform duration-300 ${
                    openIndex === index ? "rotate-180 text-gold-dark" : ""
                  }`}
                />
              </button>

              {openIndex === index && (
                <div className="px-5 pb-5 text-gray-600 leading-relaxed">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
