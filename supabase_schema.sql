-- ==============================================================================
-- SCRIPT DDL COMPLETO DE BANCO DE DADOS SUPABASE (POSTGRESQL) - SEM ERROS
-- PROJETO DE EXTENSÃO CURRICULARIZADA - CURSO DE ADS
-- INSTITUIÇÃO PARCEIRA: IGREJA CRISTÃ MARANATA (@IgrejaCristaMaranataOficial)
-- ==============================================================================

-- 1. Tabela de Categorias de Transmissões
CREATE TABLE IF NOT EXISTS public.categorias (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    nome TEXT NOT NULL UNIQUE,
    descricao TEXT,
    cor_hex TEXT DEFAULT '#DC2626',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Inserção Limpa de Categorias Base
INSERT INTO public.categorias (nome, descricao, cor_hex) VALUES
('Escola Bíblica Dominical (EBD)', 'Transmissões semanais de ensino bíblico aos domingos às 10h', '#DC2626'),
('Culto Especial', 'Cultos de glorificação, aniversários e eventos festivos', '#EF4444'),
('Madrugada de Oração', 'Lives diárias de clamor e oração às 05:00h da manhã', '#F87171'),
('Convenção Internacional', 'Grandes encontros nos Maanains com participantes globais', '#B91C1C'),
('Louvor & Orquestra', 'Apresentações da Orquestra e Coral Maranata e hinos da coletânea', '#F43F5E'),
('Ensino & Seminários', 'Seminários de doutrina nos Maanains de Manhuaçu, Anápolis e Vitória', '#E11D48'),
('Internacional (Multilíngue)', 'Transmissões com tradução simultânea em Inglês, Espanhol e Francês', '#991B1B')
ON CONFLICT (nome) DO NOTHING;


-- 2. Tabela Principal de Transmissões e Vídeos do YouTube (Populada via API)
CREATE TABLE IF NOT EXISTS public.transmissoes (
    id TEXT PRIMARY KEY, -- ID real do vídeo no YouTube (ex: dQw4w9WgXcQ)
    titulo TEXT NOT NULL,
    categoria_nome TEXT REFERENCES public.categorias(nome) ON UPDATE CASCADE ON DELETE SET NULL,
    data_transmissao DATE NOT NULL,
    visualizacoes INT DEFAULT 0 NOT NULL,
    pico_simultaneo INT DEFAULT 0,
    tempo_medio_minutos INT DEFAULT 0,
    horas_exibidas INT DEFAULT 0,
    likes INT DEFAULT 0,
    compartilhamentos INT DEFAULT 0,
    comentarios INT DEFAULT 0,
    taxa_retencao INT DEFAULT 0, -- Percentual (0-100%)
    thumbnail_url TEXT,
    is_live BOOLEAN DEFAULT false,
    youtube_url TEXT DEFAULT 'https://www.youtube.com/@IgrejaCristaMaranataOficial',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);


-- 3. Tabela de Audiência Geográfica por País
CREATE TABLE IF NOT EXISTS public.audiencia_paises (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    transmissao_id TEXT REFERENCES public.transmissoes(id) ON DELETE CASCADE,
    pais TEXT NOT NULL,
    codigo_iso TEXT NOT NULL,
    bandeira_emoji TEXT,
    visualizacoes INT NOT NULL,
    percentual NUMERIC(5,2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);


-- 4. Tabela de Histórico Mensal Consolidado (Analytics)
CREATE TABLE IF NOT EXISTS public.historico_mensal (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    mes_ano TEXT NOT NULL UNIQUE,
    nome_mes TEXT NOT NULL,
    total_views INT NOT NULL,
    live_views INT NOT NULL,
    recorded_views INT NOT NULL,
    horas_assistidas INT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);


-- HABILITAR SEGURANÇA POR LINHA (Row Level Security - RLS)
ALTER TABLE public.categorias ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transmissoes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audiencia_paises ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.historico_mensal ENABLE ROW LEVEL SECURITY;


-- DROPAR POLÍTICAS ANTIGAS SE EXISTIREM (EVITA ERRO DE POLÍTICA DUPLICADA)
DROP POLICY IF EXISTS "Permitir leitura publica de transmissoes" ON public.transmissoes;
DROP POLICY IF EXISTS "Permitir insercao publica de transmissoes" ON public.transmissoes;
DROP POLICY IF EXISTS "Permitir atualizacao publica de transmissoes" ON public.transmissoes;

DROP POLICY IF EXISTS "Permitir leitura publica de categorias" ON public.categorias;
DROP POLICY IF EXISTS "Permitir insercao publica de categorias" ON public.categorias;

DROP POLICY IF EXISTS "Permitir leitura publica de audiencia_paises" ON public.audiencia_paises;
DROP POLICY IF EXISTS "Permitir insercao publica de audiencia_paises" ON public.audiencia_paises;

DROP POLICY IF EXISTS "Permitir leitura publica de historico_mensal" ON public.historico_mensal;


-- CRIAR NOVAS POLÍTICAS DE PERMISSÃO PÚBLICA (SELECT, INSERT, UPDATE)
CREATE POLICY "Permitir leitura publica de transmissoes" ON public.transmissoes FOR SELECT USING (true);
CREATE POLICY "Permitir insercao publica de transmissoes" ON public.transmissoes FOR INSERT WITH CHECK (true);
CREATE POLICY "Permitir atualizacao publica de transmissoes" ON public.transmissoes FOR UPDATE USING (true);

CREATE POLICY "Permitir leitura publica de categorias" ON public.categorias FOR SELECT USING (true);
CREATE POLICY "Permitir insercao publica de categorias" ON public.categorias FOR INSERT WITH CHECK (true);

CREATE POLICY "Permitir leitura publica de audiencia_paises" ON public.audiencia_paises FOR SELECT USING (true);
CREATE POLICY "Permitir insercao publica de audiencia_paises" ON public.audiencia_paises FOR INSERT WITH CHECK (true);

CREATE POLICY "Permitir leitura publica de historico_mensal" ON public.historico_mensal FOR SELECT USING (true);
