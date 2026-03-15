-- Add telefone column to reservas for phone/whatsapp contact
ALTER TABLE public.reservas ADD COLUMN IF NOT EXISTS telefone text;

-- Add sala_privada_disponivel config
INSERT INTO public.site_config (chave, valor) VALUES ('sala_privada_disponivel', 'true')
ON CONFLICT (chave) DO NOTHING;