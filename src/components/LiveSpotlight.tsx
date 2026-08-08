import React from 'react';
import { Radio, Users, Clock, Youtube, Play, Award, Eye } from 'lucide-react';
import { EventData } from '../types';

interface LiveSpotlightProps {
  liveEvent: EventData;
  onSelectEvent: (event: EventData) => void;
}

export const LiveSpotlight: React.FC<LiveSpotlightProps> = ({ liveEvent, onSelectEvent }) => {
  const officialLiveUrl = 'https://www.youtube.com/@IgrejaCristaMaranataOficial/live';

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-red-600 via-red-700 to-red-600 p-6 sm:p-8 text-white shadow-red-glow mb-8 animate-in fade-in zoom-in-95 duration-300">
      
      {/* Background Decorativo */}
      <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute right-1/3 -top-12 w-48 h-48 bg-rose-500/20 rounded-full blur-2xl pointer-events-none"></div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Esquerda: Detalhes da Live Ao Vivo e Badge de Transmissão */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="px-3.5 py-1.5 rounded-full bg-white text-red-700 text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-md">
              <Radio className="w-3.5 h-3.5 text-red-600 animate-pulse" />
              TRANSMISSÃO AO VIVO AGORA
            </span>
            <span className="px-3 py-1 rounded-full bg-black/20 text-white/90 text-xs font-semibold backdrop-blur-md">
              @IgrejaCristaMaranataOficial
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-['Outfit'] leading-tight tracking-tight">
            {liveEvent.title}
          </h2>

          <p className="text-xs sm:text-sm text-white/90 leading-relaxed font-normal">
            Transmissão oficial em tempo real da Igreja Cristã Maranata. Acompanhe os indicadores de público ao vivo, pico de simultâneos e engajamento global.
          </p>

          {/* Cards Rápidos de Métricas da Live */}
          <div className="grid grid-cols-3 gap-3 pt-2">
            <div className="p-3 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20">
              <span className="text-[10px] uppercase font-bold text-white/80">Pico Ao Vivo</span>
              <div className="text-lg sm:text-xl font-black text-white font-['Outfit'] mt-0.5 flex items-center gap-1">
                <Users className="w-4 h-4 text-white" />
                {liveEvent.peakConcurrent.toLocaleString('pt-BR')}
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20">
              <span className="text-[10px] uppercase font-bold text-white/80">Retenção</span>
              <div className="text-lg sm:text-xl font-black text-white font-['Outfit'] mt-0.5 flex items-center gap-1">
                <Award className="w-4 h-4 text-white" />
                {liveEvent.retentionRate}%
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20">
              <span className="text-[10px] uppercase font-bold text-white/80">Horas Exibidas</span>
              <div className="text-lg sm:text-xl font-black text-white font-['Outfit'] mt-0.5 flex items-center gap-1">
                <Clock className="w-4 h-4 text-white" />
                {liveEvent.totalWatchHours.toLocaleString('pt-BR')}h
              </div>
            </div>
          </div>

          {/* Botões de Ação */}
          <div className="flex flex-wrap items-center gap-3 pt-3">
            <a
              href={officialLiveUrl}
              target="_blank"
              rel="noreferrer"
              className="px-5 py-2.5 rounded-xl bg-white text-red-700 hover:bg-slate-100 font-extrabold text-xs shadow-lg transition-all flex items-center gap-2"
            >
              <Youtube className="w-4 h-4 fill-current text-red-600" />
              <span>Assistir Live no YouTube</span>
            </a>

            <button
              onClick={() => onSelectEvent(liveEvent)}
              className="px-5 py-2.5 rounded-xl bg-black/25 hover:bg-black/40 text-white font-bold text-xs border border-white/30 backdrop-blur-md transition-all flex items-center gap-2"
            >
              <Eye className="w-4 h-4" />
              <span>Ver Detalhes do Evento</span>
            </button>
          </div>
        </div>

        {/* Direita: Mockup do Player do YouTube HD com Overlay */}
        <div className="lg:col-span-5">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-white/30 group">
            <img 
              src={liveEvent.thumbnailUrl} 
              alt={liveEvent.title} 
              className="w-full h-56 sm:h-64 object-cover group-hover:scale-105 transition-transform duration-500" 
            />
            
            {/* Dark Overlay com Play */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-center justify-center">
              <a
                href={officialLiveUrl}
                target="_blank"
                rel="noreferrer"
                className="w-16 h-16 rounded-full bg-red-600 hover:bg-red-500 text-white flex items-center justify-center shadow-xl shadow-red-600/50 hover:scale-110 transition-all duration-300 group-hover:pulse-glow"
              >
                <Play className="w-7 h-7 fill-current ml-1" />
              </a>
            </div>

            {/* Live Indicator Ticker */}
            <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-red-600 text-white text-[11px] font-black tracking-wider flex items-center gap-1.5 shadow-md">
              <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
              <span>AO VIVO AGORA</span>
            </div>

            <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md text-white text-xs font-bold flex items-center gap-1">
              <Eye className="w-3.5 h-3.5 text-red-400" />
              <span>{liveEvent.peakConcurrent.toLocaleString('pt-BR')} assistindo</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
