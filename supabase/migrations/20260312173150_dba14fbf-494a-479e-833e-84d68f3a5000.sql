
-- Roles enum
CREATE TYPE public.app_role AS ENUM ('admin', 'manager');

-- User roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function for role check
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

-- RLS for user_roles
CREATE POLICY "Admins can manage roles" ON public.user_roles
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Users can read own role" ON public.user_roles
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());

-- Profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  email TEXT,
  phone TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT TO authenticated USING (id = auth.uid());
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE TO authenticated USING (id = auth.uid());
CREATE POLICY "Admins can view all profiles" ON public.profiles FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Trigger to create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'full_name', ''), NEW.email);
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Recursos (rooms/spaces)
CREATE TABLE public.recursos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome TEXT NOT NULL,
  descricao TEXT,
  tipo TEXT NOT NULL DEFAULT 'sala', -- sala_reuniao, sala_formacao, sala_privada, hot_desk
  capacidade INTEGER NOT NULL DEFAULT 1,
  preco_hora NUMERIC(10,2),
  preco_info TEXT,
  tour_virtual_url TEXT,
  galeria TEXT[] DEFAULT '{}',
  ativo BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.recursos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view active recursos" ON public.recursos FOR SELECT USING (ativo = true);
CREATE POLICY "Admins can manage recursos" ON public.recursos FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Clientes
CREATE TABLE public.clientes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome TEXT NOT NULL,
  empresa TEXT,
  email TEXT,
  telefone TEXT,
  whatsapp TEXT,
  creditos_horas NUMERIC(10,2) NOT NULL DEFAULT 0,
  notas TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.clientes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage clientes" ON public.clientes FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Reservas
CREATE TABLE public.reservas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cliente_id UUID REFERENCES public.clientes(id) ON DELETE SET NULL,
  recurso_id UUID REFERENCES public.recursos(id) ON DELETE SET NULL,
  cliente_nome TEXT,
  data DATE NOT NULL,
  hora_inicio TIME NOT NULL,
  hora_fim TIME NOT NULL,
  status TEXT NOT NULL DEFAULT 'pendente', -- pendente, confirmada, cancelada
  notas TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.reservas ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage reservas" ON public.reservas FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Enable realtime on reservas
ALTER PUBLICATION supabase_realtime ADD TABLE public.reservas;

-- Bloqueios de horário
CREATE TABLE public.bloqueios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  recurso_id UUID REFERENCES public.recursos(id) ON DELETE CASCADE NOT NULL,
  data DATE NOT NULL,
  hora_inicio TIME NOT NULL,
  hora_fim TIME NOT NULL,
  motivo TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.bloqueios ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage bloqueios" ON public.bloqueios FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Public can view bloqueios" ON public.bloqueios FOR SELECT USING (true);

-- Site config
CREATE TABLE public.site_config (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  chave TEXT NOT NULL UNIQUE,
  valor TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.site_config ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read config" ON public.site_config FOR SELECT USING (true);
CREATE POLICY "Admins can manage config" ON public.site_config FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Gallery images
CREATE TABLE public.galeria (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  url TEXT NOT NULL,
  titulo TEXT,
  descricao TEXT,
  ordem INTEGER NOT NULL DEFAULT 0,
  ativo BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.galeria ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view active gallery" ON public.galeria FOR SELECT USING (ativo = true);
CREATE POLICY "Admins can manage gallery" ON public.galeria FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Storage bucket for gallery
INSERT INTO storage.buckets (id, name, public) VALUES ('galeria', 'galeria', true);

-- Storage policies
CREATE POLICY "Public can view gallery images" ON storage.objects FOR SELECT USING (bucket_id = 'galeria');
CREATE POLICY "Admins can upload gallery images" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'galeria' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete gallery images" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'galeria' AND public.has_role(auth.uid(), 'admin'));

-- Insert default site config
INSERT INTO public.site_config (chave, valor) VALUES
  ('telefone', '+244 924 006 984'),
  ('email', 'geral@mulatobusiness.com'),
  ('morada', 'Centralidade do Kilamba, Q14, 5º andar, Luanda, Angola'),
  ('horario', 'Segunda - Sexta: 08:00 - 17:00'),
  ('google_reviews_widget', '');
