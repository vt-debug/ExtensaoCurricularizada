import React from 'react';
import { Eye, Users, Clock, TrendingUp, Award, Radio } from 'lucide-react';
import { EventData } from '../types';

interface MetricsOverviewProps {
  events: EventData[];
}

export const MetricsOverview: React.FC<MetricsOverviewProps> = ({ events }) => {
  const totalViews = events.reduce((sum, e) => sum + e.views, 0);
  const totalWatchHours = events.reduce((sum, e) => sum + e.totalWatchHours, 0);
  const maxConcurrent = Math.max(...events.map(e => e.peakConcurrent));
  const avgRetention = Math.round(
    events.reduce((sum, e) => sum + e.retentionRate, 0) / (events.length || 1)
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
      {/* KPI 1: Visualizações Totais em Fundo Vermelho Destaque */}
      <div className="glass-card-red p-5 rounded-2xl relative overflow-hidden transition-all duration-300 hover:translate-y-[-2px]">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-white">
            Total de Visualizações (RF01)
          </span>
          <div className="p-2.5 rounded-xl bg-white/20 border border-white/30 text-white">
            <Eye className="w-5 h-5" />
          </div>
        </div>
        <div className="mt-4">
          <div className="text-3xl font-extrabold text-white font-['Outfit'] tracking-tight">
            {totalViews.toLocaleString('pt-BR')}
          </div>
          <div className="flex items-center gap-1.5 mt-2 text-xs text-white/90">
            <TrendingUp className="w-3.5 h-3.5" />
            <span className="font-bold">+24.5%</span>
            <span className="text-white/80 font-normal">vs. trimestre anterior</span>
          </div>
        </div>
      </div>

      {/* KPI 2: Pico de Espectadores Ao Vivo (Card Branco) */}
      <div className="glass-card p-5 rounded-2xl relative overflow-hidden transition-all duration-300 hover:translate-y-[-2px]">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Pico Simultâneo (Ao Vivo)
          </span>
          <div className="p-2.5 rounded-xl bg-red-50 border border-red-200 text-red-600">
            <Radio className="w-5 h-5 animate-pulse" />
          </div>
        </div>
        <div className="mt-4">
          <div className="text-3xl font-extrabold text-slate-900 font-['Outfit'] tracking-tight">
            {maxConcurrent.toLocaleString('pt-BR')}
          </div>
          <div className="flex items-center gap-1.5 mt-2 text-xs text-slate-600">
            <Users className="w-3.5 h-3.5 text-red-600" />
            <span>Simultâneos nos cultos globais</span>
          </div>
        </div>
      </div>

      {/* KPI 3: Horas Exibidas (Card Branco) */}
      <div className="glass-card p-5 rounded-2xl relative overflow-hidden transition-all duration-300 hover:translate-y-[-2px]">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Tempo Total Assistido
          </span>
          <div className="p-2.5 rounded-xl bg-red-50 border border-red-200 text-red-600">
            <Clock className="w-5 h-5" />
          </div>
        </div>
        <div className="mt-4">
          <div className="text-3xl font-extrabold text-slate-900 font-['Outfit'] tracking-tight">
            {totalWatchHours.toLocaleString('pt-BR')} <span className="text-lg font-normal text-slate-500">hrs</span>
          </div>
          <div className="flex items-center gap-1.5 mt-2 text-xs text-slate-600">
            <span className="text-red-600 font-bold">54 min</span>
            <span>duração média por espectador</span>
          </div>
        </div>
      </div>

      {/* KPI 4: Taxa Média de Retenção (Card Branco) */}
      <div className="glass-card p-5 rounded-2xl relative overflow-hidden transition-all duration-300 hover:translate-y-[-2px]">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Engajamento & Retenção
          </span>
          <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-600">
            <Award className="w-5 h-5" />
          </div>
        </div>
        <div className="mt-4">
          <div className="text-3xl font-extrabold text-slate-900 font-['Outfit'] tracking-tight">
            {avgRetention}%
          </div>
          <div className="flex items-center gap-1.5 mt-2 text-xs text-emerald-600">
            <span className="font-bold">Alta Fidelização</span>
            <span className="text-slate-500 font-normal">permanência nas lives</span>
          </div>
        </div>
      </div>
    </div>
  );
};
