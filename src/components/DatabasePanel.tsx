import React, { useState } from 'react';
import { Database, CheckCircle2, Copy, Download, Code, Server, ShieldCheck, Terminal, RefreshCw, ExternalLink } from 'lucide-react';
import { isSupabaseConfigured } from '../services/supabaseClient';

export const DatabasePanel: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'sql' | 'tables'>('overview');

  const supabaseSqlScript = `-- SCRIPT COMPLETO DE CRIAÇÃO DO BANCO DE DADOS SUPABASE (POSTGRESQL)
-- Igreja Cristã Maranata - Projeto de Extensão ADS

CREATE TABLE IF NOT EXISTS public.categorias (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    nome VARCHAR(100) NOT NULL UNIQUE,
    descricao TEXT,
    cor_hex VARCHAR(10) DEFAULT '#DC2626',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.transmissoes (
    id VARCHAR(50) PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    categoria_nome VARCHAR(100) REFERENCES public.categorias(nome) ON UPDATE CASCADE,
    data_transmissao DATE NOT NULL,
    visualizacoes INT DEFAULT 0 NOT NULL,
    pico_simultaneo INT DEFAULT 0,
    tempo_medio_minutos INT DEFAULT 0,
    horas_exibidas INT DEFAULT 0,
    likes INT DEFAULT 0,
    compartilhamentos INT DEFAULT 0,
    comentarios INT DEFAULT 0,
    taxa_retencao INT DEFAULT 0,
    thumbnail_url TEXT,
    is_live BOOLEAN DEFAULT true,
    youtube_url TEXT DEFAULT 'https://www.youtube.com/@IgrejaCristaMaranataOficial',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.audiencia_paises (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    transmissao_id VARCHAR(50) REFERENCES public.transmissoes(id) ON DELETE CASCADE,
    pais VARCHAR(100) NOT NULL,
    codigo_iso VARCHAR(5) NOT NULL,
    bandeira_emoji VARCHAR(10),
    visualizacoes INT NOT NULL,
    percentual NUMERIC(5,2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);`;

  const handleCopy = () => {
    navigator.clipboard.writeText(supabaseSqlScript);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadSql = () => {
    const blob = new Blob([supabaseSqlScript], { type: 'text/sql;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'supabase_schema_maranata.sql');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 mb-8">
      
      {/* Banner Principal Supabase */}
      <div className="glass-card-red p-6 rounded-2xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/30 flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5" /> Supabase PostgreSQL Cloud
            </span>
            <span className="text-xs text-slate-300">Backend Relacional (BaaS)</span>
          </div>
          <h2 className="text-2xl font-bold text-white font-['Outfit']">
            Integração com Banco de Dados Supabase
          </h2>
          <p className="text-sm text-slate-200 max-w-2xl mt-1">
            Modelagem física relacional desenvolvida para suportar o armazenamento persistente de transmissões, métricas geográficas e categorias da Igreja Cristã Maranata.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={handleDownloadSql}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 transition-all shadow-md shadow-emerald-600/20"
          >
            <Download className="w-4 h-4" />
            <span>Baixar script SQL</span>
          </button>
        </div>
      </div>

      {/* Tabs de Navegação da Seção de BD */}
      <div className="flex space-x-2 border-b border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
            activeTab === 'overview'
              ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/40'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Server className="w-4 h-4" /> Visão Geral & Conexão
        </button>

        <button
          onClick={() => setActiveTab('sql')}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
            activeTab === 'sql'
              ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/40'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Code className="w-4 h-4" /> Script SQL Supabase (DDL)
        </button>

        <button
          onClick={() => setActiveTab('tables')}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
            activeTab === 'tables'
              ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/40'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Terminal className="w-4 h-4" /> Tabelas & Schemas
        </button>
      </div>

      {/* Tab 1: Visão Geral de Conexão */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Card Status do Supabase */}
          <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white font-['Outfit'] flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                Status da Conexão Cloud
              </h3>
              <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-semibold border border-emerald-500/30 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span> Ativo (Pronto)
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              O sistema está estruturado com a biblioteca oficial <code>@supabase/supabase-js</code>. As credenciais de ambiente podem ser configuradas no arquivo <code>.env</code>.
            </p>

            <div className="space-y-2 bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 font-mono text-xs text-slate-300">
              <div>
                <span className="text-slate-500">VITE_SUPABASE_URL:</span>{' '}
                <span className="text-emerald-400">https://seu-projeto.supabase.co</span>
              </div>
              <div>
                <span className="text-slate-500">VITE_SUPABASE_ANON_KEY:</span>{' '}
                <span className="text-emerald-400">eyJhbGciOiJIUzI1NiIsInR5cCI6Ik...</span>
              </div>
            </div>

            <div className="p-3 bg-emerald-950/40 border border-emerald-800/40 rounded-xl text-xs text-emerald-300 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Modo Híbrido: Permite rodar com Supabase Cloud ou em modo demonstração local para apresentações na faculdade.</span>
            </div>
          </div>

          {/* Card Estrutura Relacional */}
          <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-white font-['Outfit'] flex items-center gap-2">
              <Database className="w-5 h-5 text-red-500" />
              Modelagem Relacional (PostgreSQL)
            </h3>

            <div className="space-y-2.5 text-xs">
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex justify-between items-center">
                <div>
                  <strong className="text-white block font-mono">public.transmissoes</strong>
                  <span className="text-slate-400">Tabela principal com dados de views, likes, retenção e links do YouTube</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">7 registros</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex justify-between items-center">
                <div>
                  <strong className="text-white block font-mono">public.categorias</strong>
                  <span className="text-slate-400">Categorização de cultos, EBD, seminários e lives multilíngues</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">7 categorias</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex justify-between items-center">
                <div>
                  <strong className="text-white block font-mono">public.audiencia_paises</strong>
                  <span className="text-slate-400">Tabela de alcance geográfico por país e percentuais de público</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">8 países</span>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* Tab 2: Script SQL Supabase */}
      {activeTab === 'sql' && (
        <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white font-['Outfit']">
                Script SQL DDL para o Supabase SQL Editor
              </h3>
              <p className="text-xs text-slate-400">
                Copie e cole este código diretamente no menu "SQL Editor" do seu painel do Supabase
              </p>
            </div>

            <button
              onClick={handleCopy}
              className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-2 border border-slate-700"
            >
              {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-slate-400" />}
              <span>{copied ? 'Copiado!' : 'Copiar SQL'}</span>
            </button>
          </div>

          <pre className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs font-mono text-emerald-400 overflow-x-auto max-h-[420px]">
            {supabaseSqlScript}
          </pre>
        </div>
      )}

      {/* Tab 3: Dicionário de Dados */}
      {activeTab === 'tables' && (
        <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white font-['Outfit']">
            Dicionário de Dados — Tabela `public.transmissoes`
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 uppercase font-semibold">
                  <th className="py-2.5 px-3">Coluna</th>
                  <th className="py-2.5 px-3">Tipo PostgreSQL</th>
                  <th className="py-2.5 px-3">Restrições</th>
                  <th className="py-2.5 px-3">Descrição</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                <tr>
                  <td className="py-2.5 px-3 font-mono font-bold text-emerald-400">id</td>
                  <td className="py-2.5 px-3 font-mono text-slate-400">VARCHAR(50)</td>
                  <td className="py-2.5 px-3 text-red-400 font-semibold">PRIMARY KEY</td>
                  <td className="py-2.5 px-3">Identificador único do vídeo no YouTube</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-mono font-bold text-slate-200">titulo</td>
                  <td className="py-2.5 px-3 font-mono text-slate-400">VARCHAR(255)</td>
                  <td className="py-2.5 px-3 text-amber-400 font-semibold">NOT NULL</td>
                  <td className="py-2.5 px-3">Título completo da live/vídeo</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-mono font-bold text-slate-200">categoria_nome</td>
                  <td className="py-2.5 px-3 font-mono text-slate-400">VARCHAR(100)</td>
                  <td className="py-2.5 px-3 text-blue-400 font-semibold">FOREIGN KEY</td>
                  <td className="py-2.5 px-3">Chave estrangeira vinculada a public.categorias</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-mono font-bold text-slate-200">visualizacoes</td>
                  <td className="py-2.5 px-3 font-mono text-slate-400">INT</td>
                  <td className="py-2.5 px-3 text-slate-500">DEFAULT 0</td>
                  <td className="py-2.5 px-3">Quantidade consolidada de visualizações</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-mono font-bold text-slate-200">pico_simultaneo</td>
                  <td className="py-2.5 px-3 font-mono text-slate-400">INT</td>
                  <td className="py-2.5 px-3 text-slate-500">DEFAULT 0</td>
                  <td className="py-2.5 px-3">Maior número de espectadores simultâneos ao vivo</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-mono font-bold text-slate-200">taxa_retencao</td>
                  <td className="py-2.5 px-3 font-mono text-slate-400">INT</td>
                  <td className="py-2.5 px-3 text-slate-500">DEFAULT 0</td>
                  <td className="py-2.5 px-3">Percentual médio de tempo assistido na live</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
};
