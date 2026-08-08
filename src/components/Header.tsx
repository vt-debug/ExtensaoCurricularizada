import React, { useState } from 'react';
import { 
  BarChart3, 
  Globe2, 
  GitCompare, 
  Upload, 
  Youtube, 
  Layers, 
  RefreshCw,
  Radio,
  CheckCircle2
} from 'lucide-react';

interface HeaderProps {
  activeTab: 'overview' | 'events' | 'geo' | 'compare';
  setActiveTab: (tab: 'overview' | 'events' | 'geo' | 'compare') => void;
  onOpenImporter: () => void;
  onSyncYouTube: () => void;
  isLiveNow?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ 
  activeTab, 
  setActiveTab, 
  onOpenImporter,
  onSyncYouTube,
  isLiveNow = true
}) => {
  const [syncing, setSyncing] = useState(false);
  const [syncSuccess, setSyncSuccess] = useState(false);

  const handleManualSync = async () => {
    setSyncing(true);
    await onSyncYouTube();
    setSyncing(false);
    setSyncSuccess(true);
    setTimeout(() => setSyncSuccess(false), 2000);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-red-100 shadow-sm">
      {/* Top Banner Vermelho Institucional Maranata */}
      <div className="bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white text-[11px] font-semibold py-1.5 px-4">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
            <span className="tracking-wide uppercase font-bold">PROJETO DE EXTENSÃO ADS — INTELIGÊNCIA DE AUDIÊNCIA SOCIAL</span>
          </div>
          {isLiveNow && (
            <div className="flex items-center gap-1.5 bg-black/20 px-2.5 py-0.5 rounded-full text-white font-black text-[10px] backdrop-blur-md">
              <Radio className="w-3 h-3 text-white animate-pulse" />
              <span>TRANSMISSÃO AO VIVO AGORA</span>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo Vermelho e Branco Maranata */}
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-red-600 to-rose-600 p-0.5 shadow-md shadow-red-600/30">
              <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center">
                <span className="font-black text-xl text-red-600 font-['Outfit'] tracking-wider">ICM</span>
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-xl font-extrabold text-slate-900 tracking-tight font-['Outfit']">
                  Maranata Analytics
                </h1>
                <span className="px-2.5 py-0.5 text-[10px] font-extrabold rounded-full bg-red-50 text-red-600 border border-red-200 shadow-sm flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  Sincronizado Sem Chave
                </span>
              </div>
              <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5 font-medium">
                <a 
                  href="https://www.youtube.com/@IgrejaCristaMaranataOficial" 
                  target="_blank" 
                  rel="noreferrer"
                  className="hover:text-red-600 transition-colors flex items-center gap-1 text-slate-700 font-bold"
                >
                  <Youtube className="w-3.5 h-3.5 text-red-600 fill-current" />
                  @IgrejaCristaMaranataOficial
                </a>
                <span>•</span>
                <span>Canal Oficial do YouTube</span>
              </p>
            </div>
          </div>

          {/* Action Buttons em Fundo Claro */}
          <div className="flex items-center space-x-3">
            <button
              onClick={handleManualSync}
              disabled={syncing}
              className="px-4 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 text-xs font-bold border border-red-200 flex items-center gap-2 transition-all shadow-sm disabled:opacity-50"
            >
              {syncSuccess ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              ) : (
                <RefreshCw className={`w-4 h-4 text-red-600 ${syncing ? 'animate-spin' : ''}`} />
              )}
              <span>{syncing ? 'Sincronizando...' : syncSuccess ? 'Atualizado!' : 'Sincronizar YouTube'}</span>
            </button>

            <button
              onClick={onOpenImporter}
              className="px-4 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200 flex items-center gap-2 transition-all shadow-sm"
            >
              <Upload className="w-4 h-4 text-slate-600" />
              <span className="hidden sm:inline">Importar YouTube Studio</span>
            </button>
            
            <a
              href="https://www.youtube.com/@IgrejaCristaMaranataOficial"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white text-xs font-extrabold flex items-center gap-2 transition-all shadow-md shadow-red-600/25"
            >
              <Youtube className="w-4 h-4 fill-current" />
              <span>Canal no YouTube</span>
            </a>
          </div>
        </div>

        {/* Navigation Tabs (Pílulas de Navegação em Fundo Branco) */}
        <div className="flex space-x-2 overflow-x-auto py-2.5 border-t border-slate-100 no-scrollbar">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === 'overview'
                ? 'bg-red-600 text-white shadow-md shadow-red-600/25'
                : 'text-slate-600 hover:text-red-600 hover:bg-red-50'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            Dashboard Geral (RF01, RF05)
          </button>

          <button
            onClick={() => setActiveTab('events')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === 'events'
                ? 'bg-red-600 text-white shadow-md shadow-red-600/25'
                : 'text-slate-600 hover:text-red-600 hover:bg-red-50'
            }`}
          >
            <Layers className="w-4 h-4" />
            Transmissões & Acervo (RF02, RF03)
          </button>

          <button
            onClick={() => setActiveTab('geo')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === 'geo'
                ? 'bg-red-600 text-white shadow-md shadow-red-600/25'
                : 'text-slate-600 hover:text-red-600 hover:bg-red-50'
            }`}
          >
            <Globe2 className="w-4 h-4" />
            Alcance Geográfico (RF04)
          </button>

          <button
            onClick={() => setActiveTab('compare')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === 'compare'
                ? 'bg-red-600 text-white shadow-md shadow-red-600/25'
                : 'text-slate-600 hover:text-red-600 hover:bg-red-50'
            }`}
          >
            <GitCompare className="w-4 h-4" />
            Comparar Vídeos & Lives (RF06)
          </button>
        </div>
      </div>
    </header>
  );
};
