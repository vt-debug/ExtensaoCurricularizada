import React, { useState } from 'react';
import { EventData, FilterState } from '../types';
import { Search, Filter, Download, ArrowUpDown, ChevronRight, X, Radio, LayoutGrid, List, Play, Eye, ThumbsUp, Clock, Calendar } from 'lucide-react';

interface EventTableProps {
  events: EventData[];
  onSelectEvent: (event: EventData) => void;
}

export const EventTable: React.FC<EventTableProps> = ({ events, onSelectEvent }) => {
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [filterState, setFilterState] = useState<FilterState>({
    period: 'all',
    category: 'all',
    searchQuery: '',
    sortBy: 'views',
    sortOrder: 'desc'
  });

  const categoryPills = [
    { label: 'Todos os Conteúdos', value: 'all', icon: '📺' },
    { label: 'Escola Bíblica (EBD)', value: 'EBD', icon: '📖' },
    { label: 'Madrugada de Oração', value: 'Madrugada de Oração', icon: '🙏' },
    { label: 'Cultos Especiais', value: 'Culto Especial', icon: '🏛️' },
    { label: 'Convenções', value: 'Convenção', icon: '🌍' },
    { label: 'Louvor & Orquestra', value: 'Louvor', icon: '🎶' },
    { label: 'Ensino & Seminários', value: 'Ensino / Seminário', icon: '📜' },
  ];

  // Filtering
  const filteredEvents = events.filter((e) => {
    // Category filter
    if (filterState.category !== 'all' && e.category !== filterState.category) {
      return false;
    }
    // Search query filter
    if (
      filterState.searchQuery &&
      !e.title.toLowerCase().includes(filterState.searchQuery.toLowerCase()) &&
      !e.category.toLowerCase().includes(filterState.searchQuery.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  // Sorting
  const sortedEvents = [...filteredEvents].sort((a, b) => {
    let valA = a[filterState.sortBy];
    let valB = b[filterState.sortBy];

    if (typeof valA === 'string') {
      return filterState.sortOrder === 'asc'
        ? (valA as string).localeCompare(valB as string)
        : (valB as string).localeCompare(valA as string);
    }
    return filterState.sortOrder === 'asc'
      ? (valA as number) - (valB as number)
      : (valB as number) - (valA as number);
  });

  const handleSort = (field: 'date' | 'views' | 'peakConcurrent' | 'totalWatchHours') => {
    if (filterState.sortBy === field) {
      setFilterState({
        ...filterState,
        sortOrder: filterState.sortOrder === 'asc' ? 'desc' : 'asc'
      });
    } else {
      setFilterState({
        ...filterState,
        sortBy: field,
        sortOrder: 'desc'
      });
    }
  };

  const handleExportCSV = () => {
    const headers = 'ID,Título,Categoria,Data,Visualizações,Pico Simultâneo,Tempo Exibido (hrs),Retenção (%)\n';
    const rows = sortedEvents
      .map((e) => `"${e.id}","${e.title}","${e.category}","${e.date}",${e.views},${e.peakConcurrent},${e.totalWatchHours},${e.retentionRate}`)
      .join('\n');
    
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `relatorio_audiencia_maranata_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="glass-card p-6 rounded-3xl border border-red-100 mb-8 space-y-6">
      
      {/* Cabeçalho do Módulo & Alternador de Visualização */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <h2 className="text-xl font-bold text-slate-900 font-['Outfit'] flex items-center gap-2">
            <Filter className="w-5 h-5 text-red-600" />
            Acervo Completo de Vídeos e Lives do YouTube
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Explore as transmissões ao vivo e publicações do canal oficial da Igreja Cristã Maranata
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Alternador de Layout: Cards vs Tabela */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                viewMode === 'grid'
                  ? 'bg-white text-red-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Cards em Grade</span>
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                viewMode === 'table'
                  ? 'bg-white text-red-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <List className="w-3.5 h-3.5" />
              <span>Tabela Detalhada</span>
            </button>
          </div>

          {/* Busca Textual */}
          <div className="relative min-w-[200px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar evento..."
              value={filterState.searchQuery}
              onChange={(e) => setFilterState({ ...filterState, searchQuery: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-8 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-red-600 focus:bg-white"
            />
            {filterState.searchQuery && (
              <button 
                onClick={() => setFilterState({ ...filterState, searchQuery: '' })}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Botão Exportar CSV */}
          <button
            onClick={handleExportCSV}
            className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-red-50 text-slate-700 hover:text-red-600 text-xs font-bold border border-slate-200 flex items-center gap-2 transition-all shadow-sm"
          >
            <Download className="w-3.5 h-3.5 text-red-600" />
            <span>Exportar CSV</span>
          </button>
        </div>
      </div>

      {/* Pílulas de Filtragem por Categoria */}
      <div className="flex space-x-2 overflow-x-auto pb-2 no-scrollbar">
        {categoryPills.map((pill) => {
          const isActive = filterState.category === pill.value;
          return (
            <button
              key={pill.value}
              onClick={() => setFilterState({ ...filterState, category: pill.value })}
              className={`px-3.5 py-2 rounded-2xl text-xs font-bold flex items-center gap-2 transition-all whitespace-nowrap border ${
                isActive
                  ? 'bg-red-600 text-white border-red-600 shadow-md shadow-red-600/20'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-red-200 hover:bg-red-50/50'
              }`}
            >
              <span>{pill.icon}</span>
              <span>{pill.label}</span>
            </button>
          );
        })}
      </div>

      {/* MODO 1: Visualização em Grade de Cards (Cards HD) */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
          {sortedEvents.map((evt) => {
            const isLiveNow = evt.id.includes('live');
            return (
              <div
                key={evt.id}
                onClick={() => onSelectEvent(evt)}
                className="group glass-card-white rounded-3xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl border border-slate-200/80 hover:border-red-300 flex flex-col justify-between"
              >
                {/* Thumbnail HD com Badge de Transmissão */}
                <div className="relative h-44 overflow-hidden bg-slate-100">
                  <img 
                    src={evt.thumbnailUrl} 
                    alt={evt.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                  {isLiveNow ? (
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-red-600 text-white text-[10px] font-black tracking-wider flex items-center gap-1.5 shadow-md">
                      <Radio className="w-3 h-3 text-white animate-pulse" />
                      AO VIVO AGORA
                    </span>
                  ) : (
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-bold">
                      {evt.category}
                    </span>
                  )}

                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs font-bold">
                    <span className="flex items-center gap-1 bg-black/50 px-2 py-0.5 rounded-lg backdrop-blur-md">
                      <Eye className="w-3.5 h-3.5 text-red-400" />
                      {evt.views.toLocaleString('pt-BR')} views
                    </span>
                    <span className="bg-black/50 px-2 py-0.5 rounded-lg backdrop-blur-md text-emerald-400">
                      {evt.retentionRate}% retenção
                    </span>
                  </div>
                </div>

                {/* Conteúdo do Card */}
                <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm font-extrabold text-slate-900 font-['Outfit'] line-clamp-2 leading-snug group-hover:text-red-600 transition-colors">
                      {evt.title}
                    </h3>
                    <div className="text-xs text-slate-500 flex items-center gap-2 mt-2 font-medium">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>{new Date(evt.date).toLocaleDateString('pt-BR')}</span>
                      <span>•</span>
                      <span>{evt.isLiveStream ? 'Transmissão' : 'Vídeo'}</span>
                    </div>
                  </div>

                  {/* Indicadores Rápidos */}
                  <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-100 text-xs">
                    <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                      <span className="text-[10px] text-slate-400 uppercase font-bold block">Pico Ao Vivo</span>
                      <span className="font-extrabold text-red-600">{evt.peakConcurrent.toLocaleString('pt-BR')}</span>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                      <span className="text-[10px] text-slate-400 uppercase font-bold block">Horas Exibidas</span>
                      <span className="font-extrabold text-slate-900">{evt.totalWatchHours.toLocaleString('pt-BR')}h</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* MODO 2: Visualização em Tabela Tradicional */
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-slate-500">
                <th className="py-3 px-4 uppercase font-semibold">Evento / Transmissão</th>
                <th className="py-3 px-4 uppercase font-semibold cursor-pointer hover:text-red-600 transition-colors" onClick={() => handleSort('date')}>
                  <div className="flex items-center gap-1">
                    Data <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="py-3 px-4 uppercase font-semibold cursor-pointer hover:text-red-600 transition-colors" onClick={() => handleSort('views')}>
                  <div className="flex items-center gap-1">
                    Visualizações <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="py-3 px-4 uppercase font-semibold cursor-pointer hover:text-red-600 transition-colors" onClick={() => handleSort('peakConcurrent')}>
                  <div className="flex items-center gap-1">
                    Pico Ao Vivo <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="py-3 px-4 uppercase font-semibold cursor-pointer hover:text-red-600 transition-colors" onClick={() => handleSort('totalWatchHours')}>
                  <div className="flex items-center gap-1">
                    Horas Exibidas <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="py-3 px-4 uppercase font-semibold">Retenção</th>
                <th className="py-3 px-4 text-right uppercase font-semibold">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800">
              {sortedEvents.map((evt) => {
                const isLiveNow = evt.id.includes('live');
                return (
                  <tr 
                    key={evt.id}
                    className={`hover:bg-red-50/50 transition-colors group cursor-pointer ${isLiveNow ? 'bg-red-50/30' : ''}`}
                    onClick={() => onSelectEvent(evt)}
                  >
                    <td className="py-3.5 px-4 font-bold text-slate-900">
                      <div className="flex items-center gap-3">
                        <img 
                          src={evt.thumbnailUrl} 
                          alt={evt.title} 
                          className="w-12 h-8 rounded-md object-cover border border-slate-200 shrink-0" 
                        />
                        <div>
                          {isLiveNow ? (
                            <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-red-600 text-white mr-2 shadow-sm flex-inline items-center gap-1">
                              <Radio className="w-2.5 h-2.5 inline animate-pulse mr-1" />
                              AO VIVO AGORA
                            </span>
                          ) : (
                            <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-red-100 text-red-700 border border-red-200 mr-2">
                              {evt.category}
                            </span>
                          )}
                          <span className="font-bold text-slate-900 group-hover:text-red-600 transition-colors">
                            {evt.title}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-slate-500 whitespace-nowrap">
                      {new Date(evt.date).toLocaleDateString('pt-BR')}
                    </td>

                    <td className="py-3.5 px-4 font-extrabold text-slate-900 whitespace-nowrap">
                      {evt.views.toLocaleString('pt-BR')}
                    </td>

                    <td className="py-3.5 px-4 font-bold text-red-600 whitespace-nowrap">
                      {evt.peakConcurrent.toLocaleString('pt-BR')}
                    </td>

                    <td className="py-3.5 px-4 font-bold text-slate-800 whitespace-nowrap">
                      {evt.totalWatchHours.toLocaleString('pt-BR')} hrs
                    </td>

                    <td className="py-3.5 px-4 font-bold text-emerald-600 whitespace-nowrap">
                      {evt.retentionRate}%
                    </td>

                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectEvent(evt);
                        }}
                        className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-red-600 hover:text-white text-slate-700 font-bold text-xs transition-all flex items-center gap-1 ml-auto border border-slate-200"
                      >
                        <span>Detalhes</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

    </div>
  );
};
