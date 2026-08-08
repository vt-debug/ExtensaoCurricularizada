import React, { useState } from 'react';
import { X, Upload, CheckCircle2 } from 'lucide-react';
import { EventData } from '../types';

interface DataImporterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddEvent: (newEvent: EventData) => void;
}

export const DataImporterModal: React.FC<DataImporterModalProps> = ({ isOpen, onClose, onAddEvent }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<any>('Culto Especial');
  const [views, setViews] = useState('');
  const [peakConcurrent, setPeakConcurrent] = useState('');
  const [totalWatchHours, setTotalWatchHours] = useState('');
  const [retentionRate, setRetentionRate] = useState('');
  const [successMessage, setSuccessMessage] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !views) return;

    const newEvt: EventData = {
      id: `evt-custom-${Date.now()}`,
      title,
      category,
      date: new Date().toISOString().slice(0, 10),
      views: parseInt(views) || 50000,
      peakConcurrent: parseInt(peakConcurrent) || 12000,
      avgWatchTimeMinutes: 45,
      totalWatchHours: parseInt(totalWatchHours) || 37500,
      likes: Math.round((parseInt(views) || 50000) * 0.1),
      shares: 1200,
      comments: 450,
      retentionRate: parseInt(retentionRate) || 75,
      thumbnailUrl: 'https://images.unsplash.com/photo-1548625361-185d2eb7b1a4?w=600&q=80',
      isLiveStream: true,
      topCountries: [
        { country: 'Brasil', flag: '🇧🇷', percentage: 80, views: Math.round((parseInt(views) || 50000) * 0.8) },
        { country: 'Estados Unidos', flag: '🇺🇸', percentage: 12, views: Math.round((parseInt(views) || 50000) * 0.12) },
        { country: 'Outros', flag: '🌐', percentage: 8, views: Math.round((parseInt(views) || 50000) * 0.08) }
      ]
    };

    onAddEvent(newEvt);
    setSuccessMessage(true);
    setTimeout(() => {
      setSuccessMessage(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="glass-card max-w-lg w-full p-6 rounded-2xl border border-slate-800 relative shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-slate-400 hover:text-slate-100 p-1.5 rounded-lg hover:bg-slate-800/60"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-xl bg-red-600/20 border border-red-500/30 text-red-500">
            <Upload className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-100 font-['Outfit']">
              Simulador de Importação (YouTube Studio)
            </h3>
            <p className="text-xs text-slate-400">
              Cadastre novos relatórios de transmissões para testes da banca de ADS
            </p>
          </div>
        </div>

        {successMessage ? (
          <div className="py-8 text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
            <h4 className="text-base font-bold text-slate-100">Transmissão Cadastrada com Sucesso!</h4>
            <p className="text-xs text-slate-400">Os indicadores foram consolidados nos gráficos e no Supabase.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Título da Transmissão / Evento</label>
              <input
                type="text"
                required
                placeholder="Ex: Escola Bíblica Dominical Especial"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-slate-100 focus:outline-none focus:border-red-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Categoria</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-slate-100 focus:outline-none focus:border-red-500"
                >
                  <option value="EBD">Escola Bíblica (EBD)</option>
                  <option value="Madrugada de Oração">Madrugada de Oração</option>
                  <option value="Culto Especial">Culto Especial</option>
                  <option value="Convenção">Convenção</option>
                  <option value="Louvor">Louvor</option>
                  <option value="Ensino / Seminário">Ensino / Seminário</option>
                  <option value="Multilíngue">Multilíngue</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Visualizações Totais</label>
                <input
                  type="number"
                  required
                  placeholder="Ex: 125000"
                  value={views}
                  onChange={(e) => setViews(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-slate-100 focus:outline-none focus:border-red-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Pico Ao Vivo</label>
                <input
                  type="number"
                  placeholder="Ex: 35000"
                  value={peakConcurrent}
                  onChange={(e) => setPeakConcurrent(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Horas Exibidas</label>
                <input
                  type="number"
                  placeholder="Ex: 95000"
                  value={totalWatchHours}
                  onChange={(e) => setTotalWatchHours(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Retenção (%)</label>
                <input
                  type="number"
                  placeholder="Ex: 80"
                  value={retentionRate}
                  onChange={(e) => setRetentionRate(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-red-500"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs shadow-lg shadow-red-600/30"
              >
                Salvar Transmissão
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
