import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "O que é a Coworking MB?",
    answer:
      "A Coworking MB é um espaço de trabalho moderno e flexível, ideal para profissionais, startups e empresas que procuram produtividade, conforto e networking.",
  },
  {
    question: "Quais serviços estão disponíveis?",
    answer:
      "Dispomos de escritórios virtuais, secretárias partilhadas e dedicadas, salas de reunião e espaços para eventos corporativos.",
  },
  {
    question: "Preciso de contrato de longo prazo?",
    answer:
      "Não. Trabalhamos com planos flexíveis que podem ser pontuais, mensais, trimestrais ou anuais.",
  },
  {
    question: "Como funciona a pré-reserva?",
    answer:
      "Basta preencher o formulário no site ou contactar-nos pelo WhatsApp. A nossa equipa confirma a disponibilidade rapidamente.",
  },
];

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
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

        {/* FAQ Cards */}
        <div className="space-y-6">
