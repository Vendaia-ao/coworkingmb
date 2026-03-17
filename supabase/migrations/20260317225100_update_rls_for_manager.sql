-- Servicos Planos
DROP POLICY IF EXISTS "Admins can manage plans" ON public.servicos_planos;
CREATE POLICY "Admins and managers can manage plans" ON public.servicos_planos FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'manager'));

-- Team Members
DROP POLICY IF EXISTS "Admins can manage team" ON public.team_members;
CREATE POLICY "Admins and managers can manage team" ON public.team_members FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'manager'));

-- Testimonials
DROP POLICY IF EXISTS "Admins can manage testimonials" ON public.testimonials;
CREATE POLICY "Admins and managers can manage testimonials" ON public.testimonials FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'manager'));

-- Blog Posts
DROP POLICY IF EXISTS "Admins can manage blog posts" ON public.blog_posts;
CREATE POLICY "Admins and managers can manage blog posts" ON public.blog_posts FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'manager'));

-- Faqs
DROP POLICY IF EXISTS "Admins can manage faqs" ON public.faqs;
CREATE POLICY "Admins and managers can manage faqs" ON public.faqs FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'manager'));

-- Trusted Companies
DROP POLICY IF EXISTS "Admins can manage companies" ON public.trusted_companies;
CREATE POLICY "Admins and managers can manage companies" ON public.trusted_companies FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'manager'));

-- Recursos
DROP POLICY IF EXISTS "Admins can manage recursos" ON public.recursos;
CREATE POLICY "Admins and managers can manage recursos" ON public.recursos FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'manager'));

-- Clientes
DROP POLICY IF EXISTS "Admins can manage clientes" ON public.clientes;
CREATE POLICY "Admins and managers can manage clientes" ON public.clientes FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'manager'));

-- Reservas
DROP POLICY IF EXISTS "Admins can manage reservas" ON public.reservas;
CREATE POLICY "Admins and managers can manage reservas" ON public.reservas FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'manager'));

-- Bloqueios
DROP POLICY IF EXISTS "Admins can manage bloqueios" ON public.bloqueios;
CREATE POLICY "Admins and managers can manage bloqueios" ON public.bloqueios FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'manager'));

-- Site config
DROP POLICY IF EXISTS "Admins can manage config" ON public.site_config;
CREATE POLICY "Admins and managers can manage config" ON public.site_config FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'manager'));

-- Gallery
DROP POLICY IF EXISTS "Admins can manage gallery" ON public.galeria;
CREATE POLICY "Admins and managers can manage gallery" ON public.galeria FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'manager'));

-- Storage Gallery
DROP POLICY IF EXISTS "Admins can upload gallery images" ON storage.objects;
DROP POLICY IF EXISTS "Admins can delete gallery images" ON storage.objects;
DROP POLICY IF EXISTS "Admins can update gallery images" ON storage.objects;

CREATE POLICY "Admins and managers can upload gallery images" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'galeria' AND (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'manager')));
CREATE POLICY "Admins and managers can update gallery images" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'galeria' AND (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'manager')));
CREATE POLICY "Admins and managers can delete gallery images" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'galeria' AND (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'manager')));
