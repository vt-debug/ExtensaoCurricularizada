import React from 'react';
import { mockCountryStats } from '../data/mockData';
import { Globe2, Flag, MapPin, Eye, Clock } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export const GeographicMap: React.FC = () => {
  return (
    <div className="space-y-6 mb-8">
      
      {/* Banner Geográfico Vermelho e Branco Maranata */}
      <div className="glass-card-red p-6 rounded-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold border border-white/30">
                Requisito RF04
              </span>
              <span className="text-xs text-white/90">Alcance Internacional & Lusofonia</span>
            </div>
            <h2 className="text-2xl font-bold text-white font-['Outfit']">
              Distribuição Geográfica da Audiência
            </h2>
            <p className="text-sm text-white/90 max-w-2xl">
              Monitoramento do alcance global dos cultos, transmissões da EBD e seminários transmitidos pela Igreja Cristã Maranata no YouTube, destacando a audiência no Brasil, Américas, Europa e países de Língua Portuguesa.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20 shrink-0 shadow-lg">
            <Globe2 className="w-10 h-10 text-white" />
            <div>
              <div className="text-xl font-bold text-white font-['Outfit']">
                50+ Países
              </div>
              <div className="text-xs text-white/80">Com espectadores nas transmissões</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Gráfico de Barras por País (Fundo Branco) */}
        <div className="lg:col-span-2 glass-card p-6 rounded-2xl">
          <h3 className="text-base font-bold text-slate-900 font-['Outfit'] mb-1 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-red-600" />
            Países com Maior Volume de Audiência (RF04)
          </h3>
          <p className="text-xs text-slate-500 mb-6">
            Métricas de visualização acumuladas do canal oficial
          </p>

          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                layout="vertical" 
                data={mockCountryStats} 
                margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" horizontal={false} />
                <XAxis type="number" stroke="#64748B" fontSize={12} tickFormatter={(v) => `${v / 1000}k`} />
                <YAxis dataKey="country" type="category" stroke="#0F172A" fontSize={12} width={110} />
                <Tooltip
                  contentStyle={{ 
                    backgroundColor: '#FFFFFF', 
                    borderColor: '#FCA5A5', 
                    borderRadius: '12px',
                    color: '#0F172A',
                    fontSize: '12px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
                  }}
                  formatter={(value: number) => [
                    `${value.toLocaleString('pt-BR')} visualizações`, 
                    'Visualizações'
                  ]}
                />
                <Bar dataKey="views" fill="#DC2626" radius={[0, 8, 8, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Tabela Detalhada de Países (Fundo Branco) */}
        <div className="glass-card p-6 rounded-2xl">
          <h3 className="text-base font-bold text-slate-900 font-['Outfit'] mb-4 flex items-center gap-2">
            <Flag className="w-4 h-4 text-red-600" />
            Detalhamento Geográfico
          </h3>

          <div className="space-y-3 max-h-[340px] overflow-y-auto pr-1">
            {mockCountryStats.map((stat) => (
              <div 
                key={stat.code}
                className="p-3 rounded-xl bg-slate-50 border border-slate-100 hover:border-red-200 hover:bg-red-50/50 transition-all flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{stat.flag}</span>
                  <div>
                    <div className="text-sm font-bold text-slate-900">
                      {stat.country}
                    </div>
                    <div className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
                      <span className="flex items-center gap-1">
                        <Eye className="w-3 h-3 text-red-600" />
                        {stat.views.toLocaleString('pt-BR')}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-400" />
                        {stat.avgWatchTime}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <span className="px-2.5 py-1 rounded-full bg-red-100 text-red-700 font-bold text-xs border border-red-200">
                    {stat.percentage}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
