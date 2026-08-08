import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { LiveSpotlight } from './components/LiveSpotlight';
import { MetricsOverview } from './components/MetricsOverview';
import { AudienceCharts } from './components/AudienceCharts';
import { GeographicMap } from './components/GeographicMap';
import { EventComparator } from './components/EventComparator';
import { EventTable } from './components/EventTable';
import { DataImporterModal } from './components/DataImporterModal';
import { mockEvents as initialEvents } from './data/mockData';
import { EventData } from './types';
import { fetchYouTubeDataAuto } from './services/youtubeApi';
import { X, Calendar, Radio, RefreshCw, CheckCircle2 } from 'lucide-react';

export function App() {
  const [activeTab, setActiveTab] = useState<'overview' | 'events' | 'geo' | 'compare'>('overview');
  const [events, setEvents] = useState<EventData[]>(initialEvents);
  const [selectedEvent, setSelectedEvent] = useState<EventData | null>(null);
  const [isImporterOpen, setIsImporterOpen] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncStatusText, setSyncStatusText] = useState('');

  // Tentar buscar transmissões reais do RSS público do YouTube ao abrir a página
  useEffect(() => {
    handleLoadYouTubeDataAuto();
  }, []);

  const handleLoadYouTubeDataAuto = async (apiKey?: string) => {
    setIsSyncing(true);
    setSyncStatusText('Carregando vídeos reais do canal @IgrejaCristaMaranataOficial...');

    try {
      const ytEvents = await fetchYouTubeDataAuto(apiKey);
      if (ytEvents && ytEvents.length > 0) {
        setEvents(ytEvents);
        setSyncStatusText(`${ytEvents.length} vídeos reais do canal carregados e sincronizados!`);
        setTimeout(() => setSyncStatusText(''), 4000);
      }
    } catch (err) {
      console.warn('Usando dados extraídos do canal:', err);
    } finally {
      setIsSyncing(false);
    }
  };

  const handleAddEvent = (newEvent: EventData) => {
    setEvents([newEvent, ...events]);
  };

  const liveNowEvent = events.find(e => e.id.includes('live') || e.isLiveStream);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col font-['Inter'] selection:bg-red-600 selection:text-white">
      
      {/* Header Fixo com Navegação e Sincronizador sem Chave */}
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onOpenImporter={() => setIsImporterOpen(true)}
        onSyncYouTube={handleLoadYouTubeDataAuto}
        isLiveNow={Boolean(liveNowEvent)}
      />

      {/* Barra de Notificação de Leitura Automática sem Chave */}
      {syncStatusText && (
        <div className="bg-red-50 border-b border-red-100 py-1.5 px-4 text-center text-xs font-semibold text-red-700 flex items-center justify-center gap-2">
          {isSyncing ? (
            <RefreshCw className="w-3.5 h-3.5 text-red-600 animate-spin" />
          ) : (
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          )}
          <span>{syncStatusText}</span>
        </div>
      )}

      {/* Conteúdo Principal */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Aba 1: Dashboard Geral (Overview) */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            
            {/* Live Broadcast Spotlight Card (se houver transmissão ao vivo agora) */}
            {liveNowEvent && (
              <LiveSpotlight 
                liveEvent={liveNowEvent} 
                onSelectEvent={(evt) => setSelectedEvent(evt)} 
              />
            )}

            {/* Banner de Boas-Vindas & Contexto em Fundo Vermelho Maranata */}
            {!liveNowEvent && (
              <div className="glass-card-red p-6 sm:p-8 rounded-3xl relative overflow-hidden">
                <div className="relative z-10 max-w-3xl space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold border border-white/30 shadow-sm">
                      Projeto de Extensão ADS
                    </span>
                    <span className="text-xs text-white/90 font-medium">Temática 2: Inteligência e Decisão Social</span>
                  </div>
                  <h1 className="text-2xl sm:text-4xl font-extrabold text-white font-['Outfit'] tracking-tight">
                    Painel de Audiência Digital do YouTube
                  </h1>
                  <p className="text-sm text-white/90 leading-relaxed">
                    Plataforma desenvolvida para consolidar, analisar e transformar os dados de transmissões ao vivo da <strong>Igreja Cristã Maranata</strong> no YouTube (Escola Bíblica Dominical, Madrugadas de Oração, Cultos Especiais, Cantatas e Seminários) em conhecimento estratégico para planejamento social e comunicação.
                  </p>
                </div>
              </div>
            )}

            {/* Cards de Métricas Principais (RF01) */}
            <MetricsOverview events={events} />

            {/* Gráficos de Evolução e Categorias (RF05) */}
            <AudienceCharts events={events} />

            {/* Tabela/Grade de Transmissões Recentes */}
            <EventTable events={events} onSelectEvent={(evt) => setSelectedEvent(evt)} />
          </div>
        )}

        {/* Aba 2: Lista Completa de Transmissões & Acervo (RF02, RF03) */}
        {activeTab === 'events' && (
          <div className="animate-in fade-in duration-300 space-y-6">
            <EventTable events={events} onSelectEvent={(evt) => setSelectedEvent(evt)} />
          </div>
        )}

        {/* Aba 3: Alcance Geográfico por País (RF04) */}
        {activeTab === 'geo' && (
          <div className="animate-in fade-in duration-300">
            <GeographicMap />
          </div>
        )}

        {/* Aba 4: Comparador de Eventos e Lives (RF06) */}
        {activeTab === 'compare' && (
          <div className="animate-in fade-in duration-300">
            <EventComparator events={events} />
          </div>
        )}

      </main>

      {/* Modal de Detalhes da Transmissão (RF03) */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white max-w-2xl w-full p-6 rounded-3xl border border-red-100 relative shadow-2xl animate-in fade-in zoom-in-95 duration-200 space-y-6">
            
            <button 
              onClick={() => setSelectedEvent(null)}
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-start gap-4">
              <img 
                src={selectedEvent.thumbnailUrl} 
                alt={selectedEvent.title} 
                className="w-28 h-20 rounded-2xl object-cover border border-slate-200 shrink-0 shadow-sm" 
              />
              <div className="space-y-1.5">
                <span className="px-2.5 py-0.5 rounded-md text-[10px] uppercase font-extrabold bg-red-100 text-red-700 border border-red-200">
                  {selectedEvent.category}
                </span>
                <h3 className="text-lg font-bold text-slate-900 font-['Outfit'] leading-snug">
                  {selectedEvent.title}
                </h3>
                <div className="text-xs text-slate-500 flex items-center gap-3">
                  <span className="flex items-center gap-1 font-medium">
                    <Calendar className="w-3.5 h-3.5 text-red-600" />
                    {new Date(selectedEvent.date).toLocaleDateString('pt-BR')}
                  </span>
                  <span>•</span>
                  <span>{selectedEvent.isLiveStream ? 'Transmissão Ao Vivo' : 'Vídeo Publicado'}</span>
                </div>
              </div>
            </div>

            {/* Grid de Métricas do Evento */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] text-slate-500 uppercase font-bold">Visualizações</span>
                <div className="text-base font-extrabold text-slate-900 mt-1">
                  {selectedEvent.views.toLocaleString('pt-BR')}
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] text-slate-500 uppercase font-bold">Pico Ao Vivo</span>
                <div className="text-base font-extrabold text-red-600 mt-1">
                  {selectedEvent.peakConcurrent.toLocaleString('pt-BR')}
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] text-slate-500 uppercase font-bold">Horas Exibidas</span>
                <div className="text-base font-extrabold text-slate-900 mt-1">
                  {selectedEvent.totalWatchHours.toLocaleString('pt-BR')} hrs
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] text-slate-500 uppercase font-bold">Retenção</span>
                <div className="text-base font-extrabold text-emerald-600 mt-1">
                  {selectedEvent.retentionRate}%
                </div>
              </div>
            </div>

            {/* Distribuição por País deste Evento */}
            <div>
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                Alcance Geográfico Desta Transmissão:
              </h4>
              <div className="space-y-2">
                {selectedEvent.topCountries.map((c) => (
                  <div key={c.country} className="flex items-center justify-between text-xs p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="flex items-center gap-2 text-slate-800 font-medium">
                      <span>{c.flag}</span>
                      <span>{c.country}</span>
                    </span>
                    <span className="font-bold text-red-600">{c.percentage}% ({c.views.toLocaleString('pt-BR')} views)</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setSelectedEvent(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold"
              >
                Fechar Detalhes
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Modal Simulador de Importação */}
      <DataImporterModal
        isOpen={isImporterOpen}
        onClose={() => setIsImporterOpen(false)}
        onAddEvent={handleAddEvent}
      />

      {/* Rodapé Institucional */}
      <footer className="bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            <strong className="text-slate-900">Igreja Cristã Maranata</strong> — Projeto de Extensão Curricularizada ADS (Temática 2)
          </div>
          <div>
            Sincronização Automática via Feed do YouTube • Supabase Cloud Integrado
          </div>
        </div>
      </footer>

    </div>
  );
}
