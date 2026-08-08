import React from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell 
} from 'recharts';
import { mockMonthlyAudience } from '../data/mockData';
import { EventData } from '../types';
import { TrendingUp, PieChart as PieIcon } from 'lucide-react';

interface AudienceChartsProps {
  events: EventData[];
}

const CATEGORY_COLORS: Record<string, string> = {
  'Culto Especial': '#DC2626',
  'EBD': '#E50914',
  'Madrugada de Oração': '#EF4444',
  'Convenção': '#991B1B',
  'Louvor': '#F87171',
  'Ensino / Seminário': '#B91C1C',
  'Multilíngue': '#475569'
};

export const AudienceCharts: React.FC<AudienceChartsProps> = ({ events }) => {
  // Aggregate category views
  const categoryDataMap: Record<string, number> = {};
  events.forEach(e => {
    categoryDataMap[e.category] = (categoryDataMap[e.category] || 0) + e.views;
  });

  const categoryPieData = Object.entries(categoryDataMap).map(([name, value]) => ({
    name,
    value
  }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      
      {/* Chart 1: Evolução da Audiência ao Longo dos Meses (Fundo Branco) */}
      <div className="lg:col-span-2 glass-card p-6 rounded-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-lg font-bold text-slate-900 font-['Outfit'] flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-red-600" />
              Evolução Temporal da Audiência no YouTube (RF05)
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Volume de visualizações nas transmissões Ao Vivo vs. Vídeos Publicados
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs font-semibold">
            <span className="flex items-center gap-1.5 text-slate-800">
              <span className="w-3 h-3 rounded-full bg-red-600 inline-block shadow-sm"></span> Ao Vivo
            </span>
            <span className="flex items-center gap-1.5 text-slate-600">
              <span className="w-3 h-3 rounded-full bg-slate-300 inline-block shadow-sm"></span> Vídeos Gravados
            </span>
          </div>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={mockMonthlyAudience} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorLive" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#DC2626" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#DC2626" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorRecorded" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#94A3B8" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#94A3B8" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="month" stroke="#64748B" fontSize={12} />
              <YAxis stroke="#64748B" fontSize={12} tickFormatter={(v) => `${v / 1000}k`} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#FFFFFF', 
                  borderColor: '#FCA5A5', 
                  borderRadius: '12px',
                  color: '#0F172A',
                  fontSize: '13px',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
                }}
                formatter={(value: number) => [`${value.toLocaleString('pt-BR')} visualizações`, '']}
              />
              <Area type="monotone" dataKey="liveViews" name="Ao Vivo" stroke="#DC2626" strokeWidth={3} fillOpacity={1} fill="url(#colorLive)" />
              <Area type="monotone" dataKey="recordedViews" name="Gravado" stroke="#94A3B8" strokeWidth={2.5} fillOpacity={1} fill="url(#colorRecorded)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Chart 2: Distribuição por Categoria (Fundo Branco) */}
      <div className="glass-card p-6 rounded-2xl flex flex-col justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900 font-['Outfit'] flex items-center gap-2 mb-1">
            <PieIcon className="w-5 h-5 text-red-600" />
            Por Categoria de Conteúdo
          </h2>
          <p className="text-xs text-slate-500 mb-4">
            Proporção de visualizações acumuladas no canal
          </p>

          <div className="h-52 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryPieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {categoryPieData.map((entry) => (
                    <Cell key={`cell-${entry.name}`} fill={CATEGORY_COLORS[entry.name] || '#DC2626'} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#FFFFFF', 
                    borderColor: '#FCA5A5', 
                    borderRadius: '12px',
                    color: '#0F172A',
                    fontSize: '12px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
                  }}
                  formatter={(value: number) => [`${value.toLocaleString('pt-BR')} views`, '']}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-2 mt-2 pt-3 border-t border-slate-100">
          {categoryPieData.map((c) => (
            <div key={c.name} className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-2 text-slate-700 font-medium">
                <span 
                  className="w-2.5 h-2.5 rounded-full inline-block shadow-sm" 
                  style={{ backgroundColor: CATEGORY_COLORS[c.name] || '#DC2626' }}
                ></span>
                {c.name}
              </span>
              <span className="font-bold text-slate-900">
                {c.value.toLocaleString('pt-BR')} views
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
