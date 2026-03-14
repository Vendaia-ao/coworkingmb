
-- Unique constraint on site_config.chave
ALTER TABLE public.site_config ADD CONSTRAINT site_config_chave_unique UNIQUE (chave);

-- Service plans table
CREATE TABLE public.servicos_planos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  servico text NOT NULL,
  nome text NOT NULL,
  preco text NOT NULL,
  periodo text NOT NULL,
  features text[] DEFAULT '{}',
  destaque boolean DEFAULT false,
  promo text,
  nota text,
  preco_alt text,
  ordem integer DEFAULT 0,
  ativo boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

CREATE POLICY "Admins can manage plans" ON public.servicos_planos FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Public can view active plans" ON public.servicos_planos FOR SELECT TO public USING (ativo = true);

-- Allow anyone to create reservas with pendente status
CREATE POLICY "Anyone can create reservas" ON public.reservas FOR INSERT TO anon, authenticated WITH CHECK (status = 'pendente');

-- Storage policies for galeria bucket
CREATE POLICY "Admins upload galeria" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'galeria' AND public.has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins update galeria" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'galeria' AND public.has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins delete galeria" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'galeria' AND public.has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Public view galeria" ON storage.objects FOR SELECT TO public USING (bucket_id = 'galeria');

-- Seed plans
INSERT INTO public.servicos_planos (servico, nome, preco, periodo, features, destaque, promo, nota, preco_alt, ordem) VALUES
('escritorio-virtual', 'Endereço Comercial', '3.000', 'Kz / mês', ARRAY['Endereço Fiscal de Prestígio'], false, null, null, null, 0),
('escritorio-virtual', 'Escritório Virtual', '10.500', 'Kz / mês', ARRAY['Endereço Fiscal de Prestígio', 'Rececionista partilhada'], false, null, null, null, 1),
('escritorio-virtual', 'Escritório Virtual Plus', '17.800', 'Kz / mês', ARRAY['Endereço Fiscal de Prestígio', 'Rececionista partilhada', 'Atendimento de clientes', 'Sala de Reunião (5H mensais)'], true, '🎁 Promoção: Ao subscrever o pacote Escritório Virtual Plus, ganha +5H na Sala de Reunião, totalizando 10H mensais!', null, null, 2),
('salas', 'Sala de Reunião', '5.000', 'Kz (até às 12H)', ARRAY['Disponível de segunda a sábado', 'Lotação até 8 pessoas', 'Smart TV & HDMI', 'Quadro Branco', 'Internet de Alta Velocidade', 'Coffee Break disponível'], false, null, 'Período matinal: até às 12H. Após as 12H: 10.500 Kz/hora.', '10.500 Kz/hora após as 12H', 0),
('salas', 'Sala de Formação', '10.500', 'Kz / hora', ARRAY['Espaço amplo para formações', 'Projetor ou Smart TV', 'Quadro Branco', 'Internet de Alta Velocidade', 'Climatização', 'Coffee Break disponível'], true, null, null, null, 1),
('salas', 'Sala Privada', '150.000', 'Kz / mês', ARRAY['Escritório privado para 1 pessoa', 'Mobiliário completo', 'Internet de Alta Velocidade', 'Climatização individual', 'Acesso à Copa', 'Endereço físico'], false, null, 'Adição de pessoas na sala privada mediante negociação.', null, 2),
('secretarias', 'Bronze', '45.000', 'Kz / mês', ARRAY['Secretária', 'Internet de Alta Velocidade', 'Sala de reunião (6 horas/mês)', 'Cacifo particular', 'Até 20 impressões ou cópias', 'Endereço físico', 'Acesso ao bebedouro de água', 'Copa'], false, null, null, null, 0),
('secretarias', 'Prata', '60.000', 'Kz / mês', ARRAY['Secretária', 'Internet de Alta Velocidade', 'Sala de reunião (10 horas)', 'Cacifo particular', 'Até 40 impressões ou cópias', 'Endereço físico', 'Recepcionista partilhada', 'Acesso ao bebedouro de água', 'Copa', 'Chá (5)', 'Café (5)'], true, null, null, null, 1),
('secretarias', 'Diamante', '100.000', 'Kz / dia', ARRAY['Secretária', 'Internet de Alta Velocidade', 'Sala de reunião (20 horas)', 'Cacifo particular', 'Até 60 impressões ou cópias', 'Endereço físico', 'Recepcionista partilhada', 'Água mineral (30 garrafas)', 'Copa', 'Chá (10)', 'Café (10)', 'Biscoitos (10)', 'Estacionamento'], false, null, null, null, 2);

-- Seed site_config entries
INSERT INTO public.site_config (chave, valor) VALUES
('video_url', '/promo-video.mp4'),
('video_titulo', 'Tour Virtual pelo Nosso Espaço'),
('video_subtitulo', 'Descubra um ambiente profissional pensado para impulsionar o seu negócio na Centralidade do Kilamba.'),
('counter_1_valor', '25'),
('counter_1_label', 'Empresas Instaladas'),
('counter_1_sufixo', '+'),
('counter_2_valor', '50'),
('counter_2_label', 'Clientes Atendidos'),
('counter_2_sufixo', '+'),
('counter_3_valor', '3'),
('counter_3_label', 'Soluções Disponíveis'),
('counter_3_sufixo', ''),
('counter_4_valor', '1'),
('counter_4_label', 'Localização Premium'),
('counter_4_sufixo', ''),
('about_descricao1', 'A Coworking MB é um espaço pensado para profissionais, startups, freelancers e empresas que procuram flexibilidade, estrutura e um ambiente profissional para crescer.'),
('about_descricao2', 'Com soluções adaptáveis, oferecemos desde escritórios virtuais até salas completas, sempre com foco no conforto, eficiência e credibilidade dos nossos clientes.'),
('about_missao', 'A nossa missão é oferecer soluções de trabalho flexíveis e acessíveis, promovendo um ambiente profissional que estimule a produtividade, a colaboração e o networking entre empreendedores, profissionais independentes e empresas.'),
('about_visao', 'Ser reconhecida como a principal referência em espaços de trabalho partilhados no Kilamba e em Angola. Contribuindo para o fortalecimento do ecossistema empreendedor e para o crescimento sustentável dos nossos clientes.'),
('about_citacao', 'Onde a sua empresa encontra o ambiente ideal para prosperar.'),
('contact_mapa_url', 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3942.066066627066!2d13.268884314782046!3d-8.87333899363065!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1a51f5c0c0000001%3A0x0!2zOMKwNTInMjQuMCJTIDEzwrAxNicxNi4wIkU!5e0!3m2!1spt-PT!2sao!4v1625576891234!5m2!1spt-PT!2sao'),
('contact_subtitulo', 'Estamos prontos para elevar o nível do seu negócio. Agende uma visita ou tire as suas dúvidas.')
ON CONFLICT (chave) DO NOTHING;
