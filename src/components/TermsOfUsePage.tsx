import React from 'react';

export const TermsOfUsePage: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen animate-fade-in">
      <section className="relative h-[30vh] min-h-[240px] flex items-center justify-center overflow-hidden bg-brand-dark">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>
        <div className="relative z-10 text-center mt-12">
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-white">Termos de Uso</h1>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 space-y-8 text-gray-700 leading-relaxed">
          <div>
            <h2 className="text-xl font-serif font-bold text-brand-dark mb-3">1. Aceitação dos Termos</h2>
            <p>Ao aceder e utilizar o website da Mulato Business, o utilizador declara que leu, compreendeu e aceita ficar vinculado a estes Termos de Uso. Caso não concorde, deverá abster-se de utilizar o website.</p>
          </div>

          <div>
            <h2 className="text-xl font-serif font-bold text-brand-dark mb-3">2. Objeto do Website</h2>
            <p>Este website tem como finalidade apresentar os serviços de coworking da Mulato Business, permitir o contacto com a empresa e facilitar a reserva de espaços de trabalho na Centralidade do Kilamba, Luanda.</p>
          </div>

          <div>
            <h2 className="text-xl font-serif font-bold text-brand-dark mb-3">3. Responsabilidades do Utilizador</h2>
            <p>O utilizador compromete-se a:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Fornecer informações verdadeiras e atualizadas nos formulários</li>
              <li>Não utilizar o website para fins ilícitos</li>
              <li>Não tentar aceder a áreas restritas do sistema</li>
              <li>Respeitar a propriedade intelectual dos conteúdos</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-serif font-bold text-brand-dark mb-3">4. Propriedade Intelectual</h2>
            <p>Todos os conteúdos do website, incluindo textos, imagens, logótipos, design e marcas, são propriedade da Mulato Business e estão protegidos pela legislação de direitos de autor aplicável.</p>
          </div>

          <div>
            <h2 className="text-xl font-serif font-bold text-brand-dark mb-3">5. Limitação de Responsabilidade</h2>
            <p>A Mulato Business não se responsabiliza por danos directos ou indirectos resultantes do uso do website, incluindo interrupções temporárias do serviço, erros técnicos ou informações desatualizadas.</p>
          </div>

          <div>
            <h2 className="text-xl font-serif font-bold text-brand-dark mb-3">6. Alterações aos Termos</h2>
            <p>A Mulato Business reserva-se o direito de alterar estes Termos de Uso a qualquer momento. As alterações entram em vigor após a sua publicação no website.</p>
          </div>

          <div>
            <h2 className="text-xl font-serif font-bold text-brand-dark mb-3">7. Legislação Aplicável</h2>
            <p>Estes Termos de Uso são regidos pela legislação da República de Angola. Qualquer litígio será submetido aos tribunais competentes da comarca de Luanda.</p>
          </div>

          <div>
            <h2 className="text-xl font-serif font-bold text-brand-dark mb-3">8. Contacto</h2>
            <p>Para questões relacionadas com estes termos:</p>
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
