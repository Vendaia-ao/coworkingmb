
-- Seed team members
INSERT INTO public.team_members (nome, cargo, imagem, linkedin, ordem) VALUES
('Maria Clementina', 'Directora de Operações', '/placeholder.svg', '#', 1),
('Arlete Cacoma', 'Gestora Comercial', '/placeholder.svg', '#', 2),
('Gamaliel Jorge', 'Recepcionista', '/placeholder.svg', '#', 3);

-- Seed testimonials
INSERT INTO public.testimonials (nome, empresa, texto, video_url, ordem) VALUES
('Ana Sousa', 'Sousa & Associados', 'O Coworking MB transformou completamente a imagem da nossa empresa. O endereço de prestígio e o atendimento profissional fazem toda a diferença junto dos nossos clientes.', NULL, 1),
('Carlos Mendes', 'TechStart Angola', 'Ambiente perfeito para a nossa startup. A infraestrutura é excelente e o networking com outros profissionais tem gerado oportunidades incríveis de negócio.', NULL, 2),
('Maria João', 'MJ Consultoria', 'A flexibilidade dos planos permitiu-nos crescer sem preocupações. As salas de reunião são impecáveis e o suporte administrativo é de primeira classe.', NULL, 3),
('Pedro Lopes', 'Lopes Trading', 'Reduzi os meus custos fixos drasticamente ao optar pelo escritório virtual. A credibilidade que o endereço no Kilamba traz ao meu negócio é inestimável.', NULL, 4);

-- Seed blog posts (no ordem column)
INSERT INTO public.blog_posts (titulo, resumo, imagem, categoria, data_publicacao) VALUES
('5 Vantagens de um Escritório Virtual para Startups em Angola', 'Descubra como um escritório virtual pode reduzir custos e aumentar a credibilidade da sua startup no mercado angolano.', '/credibilidade.png', 'Dicas', '2026-03-10'),
('Como o Coworking Impulsiona o Networking Empresarial', 'O ambiente de coworking oferece oportunidades únicas de conexão profissional. Saiba como aproveitar ao máximo.', '/networking.png', 'Networking', '2026-03-05'),
('Guia Completo: Escolher a Sala de Reunião Ideal', 'Saiba o que considerar ao escolher uma sala de reunião para garantir uma apresentação profissional e eficaz.', '/salas.png', 'Guia', '2026-02-28');

-- Seed FAQs
INSERT INTO public.faqs (pergunta, resposta, ordem) VALUES
('O que é a Coworking MB?', 'A Coworking MB é um espaço de trabalho moderno e flexível, ideal para profissionais, startups e empresas que procuram produtividade, conforto e networking.', 1),
('Quais serviços estão disponíveis?', 'Dispomos de escritórios virtuais, secretárias partilhadas e dedicadas, salas de reunião e espaços para eventos corporativos.', 2),
('Preciso de contrato de longo prazo?', 'Não. Trabalhamos com planos flexíveis que podem ser pontuais, mensais, trimestrais ou anuais.', 3),
('Como funciona a pré-reserva?', 'Basta preencher o formulário no site ou contactar-nos pelo WhatsApp. A nossa equipa confirma a disponibilidade rapidamente.', 4);

-- Seed trusted companies
INSERT INTO public.trusted_companies (nome, logo_url, ordem) VALUES
('VENDAIA', '/VENDAIA.png', 1),
('UNITEL', '/UNITEL.png', 2),
('ORBE', '/ORBE.png', 3),
('COMPRAKI', '/COMPRAKI.png', 4),
('EA Nova', '/empresa-01.png', 5),
('Renascer Imobiliária', '/empresa-02.png', 6),
('Chiloia', '/empresa-03.png', 7),
('Finalizações 3D', '/empresa-04.png', 8),
('Finance Well', '/empresa-05.png', 9),
('Águias Expressa', '/empresa-06.png', 10),
('Bella Domus', '/empresa-07.png', 11),
('HS ITC', '/empresa-09.png', 12),
('Climatizar', '/empresa-11.png', 13),
('MT House', '/empresa-12.png', 14);

-- Update site_config with current values
UPDATE public.site_config SET valor = '+244 924 006 984' WHERE chave = 'telefone';
UPDATE public.site_config SET valor = 'geral@mulatobusiness.com' WHERE chave = 'email';
UPDATE public.site_config SET valor = 'Centralidade do Kilamba, Q14, 5º andar, Luanda, Angola' WHERE chave = 'morada';
UPDATE public.site_config SET valor = 'Segunda - Sexta: 08:00 - 17:00' WHERE chave = 'horario';
