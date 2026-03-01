import React from 'react';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen animate-fade-in">
      <section className="relative h-[30vh] min-h-[240px] flex items-center justify-center overflow-hidden bg-brand-dark">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>
        <div className="relative z-10 text-center mt-12">
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-white">Política de Privacidade</h1>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 space-y-8 text-gray-700 leading-relaxed">
          <div>
            <h2 className="text-xl font-serif font-bold text-brand-dark mb-3">1. Introdução</h2>
            <p>A Mulato Business ("nós", "nosso") está comprometida em proteger a privacidade dos seus dados pessoais. Esta Política de Privacidade descreve como recolhemos, utilizamos e protegemos as suas informações quando visita o nosso website ou utiliza os nossos serviços.</p>
          </div>

          <div>
            <h2 className="text-xl font-serif font-bold text-brand-dark mb-3">2. Dados Recolhidos</h2>
            <p>Podemos recolher os seguintes dados pessoais:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Nome completo</li>
              <li>Endereço de email</li>
              <li>Número de telefone</li>
              <li>Informações sobre a empresa</li>
              <li>Dados de navegação (cookies)</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-serif font-bold text-brand-dark mb-3">3. Finalidade do Tratamento</h2>
            <p>Os dados recolhidos são utilizados para:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Responder a pedidos de informação e contacto</li>
              <li>Processar reservas de espaços</li>
              <li>Enviar comunicações comerciais (com consentimento)</li>
              <li>Melhorar a experiência no website</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-serif font-bold text-brand-dark mb-3">4. Partilha de Dados</h2>
            <p>Não vendemos nem partilhamos os seus dados pessoais com terceiros, exceto quando necessário para a prestação dos nossos serviços ou quando exigido por lei.</p>
          </div>

          <div>
            <h2 className="text-xl font-serif font-bold text-brand-dark mb-3">5. Segurança</h2>
            <p>Implementamos medidas técnicas e organizacionais adequadas para proteger os seus dados pessoais contra acesso não autorizado, alteração, divulgação ou destruição.</p>
          </div>

          <div>
            <h2 className="text-xl font-serif font-bold text-brand-dark mb-3">6. Retenção</h2>
            <p>Os seus dados pessoais são mantidos apenas pelo tempo necessário para cumprir as finalidades para as quais foram recolhidos, salvo obrigação legal de conservação.</p>
          </div>

          <div>
            <h2 className="text-xl font-serif font-bold text-brand-dark mb-3">7. Direitos do Utilizador</h2>
            <p>Tem o direito de:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Aceder aos seus dados pessoais</li>
              <li>Solicitar a retificação de dados incorretos</li>
              <li>Solicitar a eliminação dos seus dados</li>
              <li>Retirar o consentimento a qualquer momento</li>
              <li>Apresentar reclamação junto das autoridades competentes</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-serif font-bold text-brand-dark mb-3">8. Cookies</h2>
            <p>O nosso website utiliza cookies para melhorar a sua experiência de navegação. Pode gerir as suas preferências de cookies através do banner apresentado na primeira visita ao site.</p>
          </div>

          <div>
            <h2 className="text-xl font-serif font-bold text-brand-dark mb-3">9. Contacto</h2>
            <p>Para questões relacionadas com a privacidade dos seus dados, contacte-nos:</p>
            <p className="mt-2"><strong>Email:</strong> info@mulatobusiness.com</p>
            <p><strong>Telefone:</strong> +244 924 006 984</p>
            <p><strong>Morada:</strong> Centralidade do Kilamba, Q14, 5º Andar, Luanda, Angola</p>
          </div>

          <p className="text-sm text-gray-400 pt-4 border-t border-gray-100">
            Última atualização: Março de {new Date().getFullYear()}
          </p>
        </div>
      </section>
    </div>
  );
};
