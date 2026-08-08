import React, { useState } from 'react';
import { EventData } from '../types';
import { GitCompare, Check, Eye, Users, Clock, ThumbsUp, Award, Sparkles, Trophy, Zap, Flame } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

interface EventComparatorProps {
  events: EventData[];
}

export const EventComparator: React.FC<EventComparatorProps> = ({ events }) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([events[0]?.id, events[2]?.id].filter(Boolean));

  const toggleSelect = (id: string) => {
    if (selectedIds.includes(id)) {
      if (selectedIds.length > 1) {
        setSelectedIds(selectedIds.filter(item => item !== id));
      }
    } else {
      if (selectedIds.length < 3) {
        setSelectedIds([...selectedIds, id]);
      }
    }
  };

  const selectedEvents = events.filter(e => selectedIds.includes(e.id));

  // Find winners for badges
  const maxViewsEvent = selectedEvents.reduce((prev, current) => (prev.views > current.views) ? prev : current, selectedEvents[0]);
  const maxPeakEvent = selectedEvents.reduce((prev, current) => (prev.peakConcurrent > current.peakConcurrent) ? prev : current, selectedEvents[0]);
  const maxRetentionEvent = selectedEvents.reduce((prev, current) => (prev.retentionRate > current.retentionRate) ? prev : current, selectedEvents[0]);

  // Chart dataset
  const compareChartData = [
    {
      metric: 'Visualizações (x1k)',
      ...selectedEvents.reduce((acc, evt) => ({ ...acc, [evt.title.substring(0, 18) + '...']: Math.round(evt.views / 1000) }), {})
    },
    {
      metric: 'Pico Ao Vivo (x1k)',
      ...selectedEvents.reduce((acc, evt) => ({ ...acc, [evt.title.substring(0, 18) + '...']: Math.round(evt.peakConcurrent / 1000) }), {})
    },
    {
      metric: 'Horas Exibidas (x1k)',
      ...selectedEvents.reduce((acc, evt) => ({ ...acc, [evt.title.substring(0, 18) + '...']: Math.round(evt.totalWatchHours / 1000) }), {})
    }
  ];

  const colors = ['#DC2626', '#E50914', '#991B1B'];

  return (
    <div className="space-y-6 mb-8">
      
      {/* Banner do Módulo Vermelho e Branco Maranata */}
      <div className="glass-card-red p-6 rounded-3xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold border border-white/30">
                Requisito RF06
              </span>
              <span className="text-xs text-white/90 font-medium">Comparativo Lado a Lado do YouTube</span>
            </div>
            <h2 className="text-2xl font-bold text-white font-['Outfit']">
              Comparador de Transmissões e Vídeos do YouTube
            </h2>
            <p className="text-sm text-white/90 max-w-2xl mt-1">
              Selecione até 3 transmissões ou vídeos do canal oficial para realizar um confronto direto de público, engajamento e retenção.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/20 shrink-0 text-xs text-white font-bold shadow-lg">
            <Sparkles className="w-4 h-4 text-white" />
            <span>{selectedEvents.length} de 3 selecionados</span>
          </div>
        </div>
      </div>

      {/* Cartões Lado a Lado dos Vídeos Selecionados (High-Impact UI) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {selectedEvents.map((evt, idx) => {
          const isMaxViews = maxViewsEvent?.id === evt.id;
          const isMaxPeak = maxPeakEvent?.id === evt.id;
          const isMaxRetention = maxRetentionEvent?.id === evt.id;

          return (
            <div 
              key={evt.id} 
              className="glass-card p-6 rounded-3xl space-y-4 border border-red-100 relative overflow-hidden flex flex-col justify-between"
            >
              {/* Badges de Destaque / Conquista */}
              <div className="flex flex-wrap gap-1.5 absolute top-3 right-3 z-10">
                {isMaxViews && (
                  <span className="px-2.5 py-1 rounded-full bg-amber-500 text-white text-[10px] font-black uppercase shadow-sm flex items-center gap-1">
                    <Trophy className="w-3 h-3" /> Maior Audiência
                  </span>
                )}
                {isMaxPeak && (
                  <span className="px-2.5 py-1 rounded-full bg-red-600 text-white text-[10px] font-black uppercase shadow-sm flex items-center gap-1">
                    <Zap className="w-3 h-3" /> Maior Pico
                  </span>
                )}
                {isMaxRetention && (
                  <span className="px-2.5 py-1 rounded-full bg-emerald-600 text-white text-[10px] font-black uppercase shadow-sm flex items-center gap-1">
                    <Award className="w-3 h-3" /> Maior Retenção
                  </span>
                )}
              </div>

              <div>
                <img 
                  src={evt.thumbnailUrl} 
                  alt={evt.title} 
                  className="w-full h-36 object-cover rounded-2xl border border-slate-200 mb-3" 
                />
                <span className="text-[10px] uppercase font-extrabold px-2.5 py-0.5 rounded bg-red-100 text-red-700 border border-red-200">
                  {evt.category}
                </span>
                <h3 className="text-base font-extrabold text-slate-900 font-['Outfit'] mt-2 line-clamp-2">
                  {evt.title}
                </h3>
              </div>

              {/* Barra de Métricas Visuais */}
              <div className="space-y-3 pt-3 border-t border-slate-100 text-xs">
                <div>
                  <div className="flex justify-between font-bold mb-1">
                    <span className="text-slate-500">Visualizações</span>
                    <span className="text-slate-900">{evt.views.toLocaleString('pt-BR')}</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-red-600 rounded-full" 
                      style={{ width: `${Math.min(100, (evt.views / (maxViewsEvent?.views || 1)) * 100)}%` }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-bold mb-1">
                    <span className="text-slate-500">Pico Simultâneo</span>
                    <span className="text-red-600">{evt.peakConcurrent.toLocaleString('pt-BR')}</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-rose-500 rounded-full" 
                      style={{ width: `${Math.min(100, (evt.peakConcurrent / (maxPeakEvent?.peakConcurrent || 1)) * 100)}%` }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-bold mb-1">
                    <span className="text-slate-500">Taxa de Retenção</span>
                    <span className="text-emerald-600 font-extrabold">{evt.retentionRate}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-emerald-500 rounded-full" 
                      style={{ width: `${evt.retentionRate}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Seleção de Eventos */}
      <div className="glass-card p-6 rounded-3xl">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
          Selecione outros vídeos do acervo para comparar:
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {events.map((evt) => {
            const isSelected = selectedIds.includes(evt.id);
            return (
              <div
                key={evt.id}
                onClick={() => toggleSelect(evt.id)}
                className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-start justify-between gap-3 ${
                  isSelected
                    ? 'bg-red-50 border-red-500 shadow-md'
                    : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold text-red-600">
                    {evt.category}
                  </span>
                  <div className="text-xs font-bold text-slate-900 line-clamp-2">
                    {evt.title}
                  </div>
                  <div className="text-[11px] text-slate-500 font-medium">
                    {new Date(evt.date).toLocaleDateString('pt-BR')} • {evt.views.toLocaleString('pt-BR')} views
                  </div>
                </div>

                <div className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-1 ${
                  isSelected ? 'bg-red-600 text-white font-bold shadow-sm' : 'border border-slate-300'
                }`}>
                  {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
