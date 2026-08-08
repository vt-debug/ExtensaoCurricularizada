import React from 'react';
import { FileText, Printer, Bookmark, Lightbulb, ShieldCheck, Database } from 'lucide-react';

export const ReportViewer: React.FC = () => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 mb-12">
      
      {/* Top Banner Vermelho e Branco */}
      <div className="glass-card-red p-6 rounded-2xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-3 py-1 rounded-full bg-red-600/30 text-red-300 text-xs font-bold border border-red-500/40">
              Documentação Oficial de Extensão
            </span>
            <span className="text-xs text-slate-300">Curso: ADS</span>
          </div>
          <h2 className="text-2xl font-bold text-white font-['Outfit']">
            Relatório Parcial do Projeto de Extensão
          </h2>
          <p className="text-sm text-slate-200 max-w-2xl mt-1">
            Documentação acadêmica entregue à faculdade, estruturada conforme as normas do projeto de extensão curricularizada.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={handlePrint}
            className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs flex items-center gap-2 transition-all shadow-md shadow-red-600/30"
          >
            <Printer className="w-4 h-4" />
            <span>Imprimir / Salvar PDF</span>
          </button>
        </div>
      </div>

      {/* Relatório Estruturado */}
      <div className="glass-card p-8 rounded-2xl border border-slate-800 space-y-8 text-slate-200 text-sm leading-relaxed max-w-4xl mx-auto font-['Inter']">
        
        {/* Seção 1 */}
        <section className="space-y-3 pb-6 border-b border-slate-800/80">
          <div className="flex items-center gap-2 text-red-400 font-bold text-xs uppercase tracking-wider">
            <Bookmark className="w-4 h-4" /> Seção 1
          </div>
          <h3 className="text-xl font-bold text-white font-['Outfit']">1. Identificação do Projeto</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 bg-slate-900/60 p-4 rounded-xl border border-slate-800 text-xs">
            <div><strong className="text-red-400">Nome do Projeto:</strong> Dashboard de Consolidação e Análise de Audiência Digital</div>
            <div><strong className="text-red-400">Curso:</strong> Análise e Desenvolvimento de Sistemas (ADS)</div>
            <div><strong className="text-red-400">Instituição Parceira:</strong> Igreja Cristã Maranata</div>
            <div><strong className="text-red-400">Canal YouTube:</strong> @IgrejaCristaMaranataOficial</div>
            <div><strong className="text-red-400">Banco de Dados Cloud:</strong> Supabase (PostgreSQL BaaS)</div>
            <div><strong className="text-red-400">Temática:</strong> Temática 2 — Dados, Inteligência e Tomada de Decisão Social</div>
          </div>
        </section>

        {/* Seção 2 e 3 */}
        <section className="space-y-3 pb-6 border-b border-slate-800/80">
          <div className="flex items-center gap-2 text-red-400 font-bold text-xs uppercase tracking-wider">
            <Bookmark className="w-4 h-4" /> Seção 2 & 3
          </div>
          <h3 className="text-xl font-bold text-white font-['Outfit']">2. Introdução e 3. Justificativa</h3>
          <p>
            A Igreja Cristã Maranata realiza transmissões diárias no YouTube para milhares de espectadores no Brasil e no exterior. 
            O projeto justifica-se pela necessidade de transformar dados isolados por vídeo em informações centralizadas e inteligência de decisão social, 
            potencializando o planejamento de eventos e mídias da instituição.
          </p>
        </section>

        {/* Seção 4 - ODS */}
        <section className="space-y-3 pb-6 border-b border-slate-800/80">
          <div className="flex items-center gap-2 text-red-400 font-bold text-xs uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" /> Seção 4
          </div>
          <h3 className="text-xl font-bold text-white font-['Outfit']">4. ODS Relacionados ao Projeto</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
              <h4 className="font-bold text-red-400 mb-1">ODS 9 — Indústria, Inovação e Infraestrutura</h4>
              <p className="text-xs text-slate-300">
                Meta 9.c: Aumento do acesso à tecnologia de informação. Modernização da gestão de comunicação com infraestrutura de inteligência de dados.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
              <h4 className="font-bold text-slate-100 mb-1">ODS 16 — Paz, Justiça e Instituições Eficazes</h4>
              <p className="text-xs text-slate-300">
                Meta 16.6: Desenvolvimento de instituições eficazes. Decisão baseada em evidências de público e uso consciente de recursos comunitários.
              </p>
            </div>
          </div>
        </section>

        {/* Seção Arquitetura & Banco de Dados Supabase */}
        <section className="space-y-3 pb-6 border-b border-slate-800/80">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
            <Database className="w-4 h-4" /> Arquitetura de Banco de Dados
          </div>
          <h3 className="text-xl font-bold text-white font-['Outfit']">Persistência Cloud com Supabase (PostgreSQL)</h3>
          <p className="text-xs text-slate-300">
            A solução utiliza o **Supabase** como backend de banco de dados relacional em nuvem, garantindo alta disponibilidade, consultas otimizadas e segurança via Row Level Security (RLS). A modelagem contempla as tabelas <code>public.transmissoes</code>, <code>public.categorias</code> e <code>public.audiencia_paises</code>.
          </p>
        </section>

        {/* Seção 11 - Requisitos */}
        <section className="space-y-3 pb-6 border-b border-slate-800/80">
          <div className="flex items-center gap-2 text-red-400 font-bold text-xs uppercase tracking-wider">
            <Bookmark className="w-4 h-4" /> Seção 11
          </div>
          <h3 className="text-xl font-bold text-white font-['Outfit']">11. Requisitos do Sistema</h3>
          <div className="space-y-2 text-xs">
            <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 font-semibold text-red-400">
              RF01 — Quantidade de visualizações consolidadas e por evento.
            </div>
            <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 font-semibold text-red-400">
              RF02 — Filtros por período e categoria.
            </div>
            <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 font-semibold text-red-400">
              RF04 — Distribuição geográfica da audiência por país.
            </div>
            <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 font-semibold text-red-400">
              RF05 — Gráficos de evolução da audiência.
            </div>
            <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 font-semibold text-red-400">
              RF06 — Comparação de múltiplos eventos lado a lado.
            </div>
            <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 font-semibold text-emerald-400">
              RF08 — Conexão e integração de dados via Supabase (PostgreSQL Cloud).
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};
