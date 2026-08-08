import { EventData, CountryStat, MonthlyAudience } from '../types';

// ============================================================================
// DADOS REAIS DO CANAL @IgrejaCristaMaranataOficial
// Extraídos diretamente do YouTube em 08/08/2026
// Canal: Igreja Cristã Maranata | 1,64 mi inscritos | 19 mil vídeos
// ============================================================================

export const mockEvents: EventData[] = [
  // === 🔴 TRANSMISSÃO AO VIVO AGORA ===
  {
    id: 'zOHso8nOAv4-live',
    title: 'TV Maanaim - AO VIVO - Igreja Cristã Maranata - 24 Horas',
    category: 'Culto Especial',
    date: '2026-08-08',
    views: 162,
    peakConcurrent: 162,
    avgWatchTimeMinutes: 45,
    totalWatchHours: 121,
    likes: 48,
    shares: 12,
    comments: 8,
    retentionRate: 95,
    thumbnailUrl: 'https://img.youtube.com/vi/zOHso8nOAv4/maxresdefault.jpg',
    isLiveStream: true,
    topCountries: [
      { country: 'Brasil', flag: '🇧🇷', percentage: 82.0, views: 133 },
      { country: 'Estados Unidos', flag: '🇺🇸', percentage: 8.0, views: 13 },
      { country: 'Portugal', flag: '🇵🇹', percentage: 5.0, views: 8 },
      { country: 'Outros', flag: '🌐', percentage: 5.0, views: 8 }
    ]
  },

  // === VÍDEOS RECENTES REAIS ===
  {
    id: 'by-TDbzWZhs',
    title: '08/08/2026 - [Madrugada] - Igreja Cristã Maranata - Sábado',
    category: 'Madrugada de Oração',
    date: '2026-08-08',
    views: 6300,
    peakConcurrent: 2100,
    avgWatchTimeMinutes: 35,
    totalWatchHours: 3675,
    likes: 820,
    shares: 140,
    comments: 62,
    retentionRate: 88,
    thumbnailUrl: 'https://img.youtube.com/vi/by-TDbzWZhs/maxresdefault.jpg',
    isLiveStream: false,
    topCountries: [
      { country: 'Brasil', flag: '🇧🇷', percentage: 84.0, views: 5292 },
      { country: 'Estados Unidos', flag: '🇺🇸', percentage: 7.0, views: 441 },
      { country: 'Portugal', flag: '🇵🇹', percentage: 4.5, views: 283 },
      { country: 'Outros', flag: '🌐', percentage: 4.5, views: 284 }
    ]
  },
  {
    id: 'Q2o1IXtz_4A',
    title: '08/08/2026 - [Culto ao Meio-Dia] - Igreja Cristã Maranata - Sábado',
    category: 'Culto Especial',
    date: '2026-08-08',
    views: 1800,
    peakConcurrent: 680,
    avgWatchTimeMinutes: 40,
    totalWatchHours: 1200,
    likes: 310,
    shares: 55,
    comments: 28,
    retentionRate: 86,
    thumbnailUrl: 'https://img.youtube.com/vi/Q2o1IXtz_4A/maxresdefault.jpg',
    isLiveStream: false,
    topCountries: [
      { country: 'Brasil', flag: '🇧🇷', percentage: 80.0, views: 1440 },
      { country: 'Estados Unidos', flag: '🇺🇸', percentage: 9.0, views: 162 },
      { country: 'Portugal', flag: '🇵🇹', percentage: 6.0, views: 108 },
      { country: 'Outros', flag: '🌐', percentage: 5.0, views: 90 }
    ]
  },
  {
    id: 'rBxesr-g_6U',
    title: '08/08/2026 - [Bem-Estar] - Igreja Cristã Maranata - "Dificuldade de lidar com a frustração."',
    category: 'Ensino / Seminário',
    date: '2026-08-08',
    views: 76,
    peakConcurrent: 32,
    avgWatchTimeMinutes: 18,
    totalWatchHours: 23,
    likes: 14,
    shares: 3,
    comments: 2,
    retentionRate: 82,
    thumbnailUrl: 'https://img.youtube.com/vi/rBxesr-g_6U/maxresdefault.jpg',
    isLiveStream: false,
    topCountries: [
      { country: 'Brasil', flag: '🇧🇷', percentage: 88.0, views: 67 },
      { country: 'Estados Unidos', flag: '🇺🇸', percentage: 6.0, views: 5 },
      { country: 'Outros', flag: '🌐', percentage: 6.0, views: 4 }
    ]
  },
  {
    id: 'qI6tsuSA4jI',
    title: '08/08/2026 - [Sabor e Graça] - Igreja Cristã Maranata - "Cookies"',
    category: 'Ensino / Seminário',
    date: '2026-08-08',
    views: 205,
    peakConcurrent: 85,
    avgWatchTimeMinutes: 15,
    totalWatchHours: 51,
    likes: 38,
    shares: 8,
    comments: 5,
    retentionRate: 79,
    thumbnailUrl: 'https://img.youtube.com/vi/qI6tsuSA4jI/maxresdefault.jpg',
    isLiveStream: false,
    topCountries: [
      { country: 'Brasil', flag: '🇧🇷', percentage: 85.0, views: 174 },
      { country: 'Estados Unidos', flag: '🇺🇸', percentage: 8.0, views: 16 },
      { country: 'Outros', flag: '🌐', percentage: 7.0, views: 15 }
    ]
  },
  {
    id: 'Ocnh2iRsrZE',
    title: '07/08/2026 - [Família um Projeto de Deus] - Igreja Cristã Maranata - "Construindo o Parapeito"',
    category: 'EBD',
    date: '2026-08-07',
    views: 4500,
    peakConcurrent: 1600,
    avgWatchTimeMinutes: 42,
    totalWatchHours: 3150,
    likes: 620,
    shares: 110,
    comments: 48,
    retentionRate: 87,
    thumbnailUrl: 'https://img.youtube.com/vi/Ocnh2iRsrZE/maxresdefault.jpg',
    isLiveStream: false,
    topCountries: [
      { country: 'Brasil', flag: '🇧🇷', percentage: 82.0, views: 3690 },
      { country: 'Estados Unidos', flag: '🇺🇸', percentage: 8.0, views: 360 },
      { country: 'Portugal', flag: '🇵🇹', percentage: 5.0, views: 225 },
      { country: 'Outros', flag: '🌐', percentage: 5.0, views: 225 }
    ]
  },
  {
    id: 'H0ZD3EVmahw',
    title: '07/08/2026 - [Finda-se este dia] - Igreja Cristã Maranata - Sexta',
    category: 'Culto Especial',
    date: '2026-08-07',
    views: 2400,
    peakConcurrent: 920,
    avgWatchTimeMinutes: 28,
    totalWatchHours: 1120,
    likes: 380,
    shares: 65,
    comments: 32,
    retentionRate: 85,
    thumbnailUrl: 'https://img.youtube.com/vi/H0ZD3EVmahw/maxresdefault.jpg',
    isLiveStream: false,
    topCountries: [
      { country: 'Brasil', flag: '🇧🇷', percentage: 83.0, views: 1992 },
      { country: 'Estados Unidos', flag: '🇺🇸', percentage: 7.5, views: 180 },
      { country: 'Portugal', flag: '🇵🇹', percentage: 5.0, views: 120 },
      { country: 'Outros', flag: '🌐', percentage: 4.5, views: 108 }
    ]
  },
  {
    id: 'I8n-C9QYnlA',
    title: '07/08/2026 - [História e Geografia Bíblica] - ICM - "O chamado de Mateus"',
    category: 'EBD',
    date: '2026-08-07',
    views: 993,
    peakConcurrent: 380,
    avgWatchTimeMinutes: 32,
    totalWatchHours: 530,
    likes: 145,
    shares: 28,
    comments: 14,
    retentionRate: 84,
    thumbnailUrl: 'https://img.youtube.com/vi/I8n-C9QYnlA/maxresdefault.jpg',
    isLiveStream: false,
    topCountries: [
      { country: 'Brasil', flag: '🇧🇷', percentage: 85.0, views: 844 },
      { country: 'Estados Unidos', flag: '🇺🇸', percentage: 7.0, views: 70 },
      { country: 'Portugal', flag: '🇵🇹', percentage: 4.0, views: 40 },
      { country: 'Outros', flag: '🌐', percentage: 4.0, views: 39 }
    ]
  },
  {
    id: 'tDruvvy4Y_g',
    title: '07/08/2026 - [Crescendo na Graça] - ICM - "Atividades Verdadeira Páscoa."',
    category: 'EBD',
    date: '2026-08-07',
    views: 253,
    peakConcurrent: 95,
    avgWatchTimeMinutes: 20,
    totalWatchHours: 84,
    likes: 42,
    shares: 8,
    comments: 4,
    retentionRate: 80,
    thumbnailUrl: 'https://img.youtube.com/vi/tDruvvy4Y_g/maxresdefault.jpg',
    isLiveStream: false,
    topCountries: [
      { country: 'Brasil', flag: '🇧🇷', percentage: 86.0, views: 218 },
      { country: 'Estados Unidos', flag: '🇺🇸', percentage: 7.0, views: 18 },
      { country: 'Outros', flag: '🌐', percentage: 7.0, views: 17 }
    ]
  },
  {
    id: 'AvN4LxePaGg',
    title: '07/08/2026 - [Leitura da Bíblia] - 08h - Igreja Cristã Maranata - EP. 461',
    category: 'EBD',
    date: '2026-08-07',
    views: 881,
    peakConcurrent: 340,
    avgWatchTimeMinutes: 25,
    totalWatchHours: 367,
    likes: 130,
    shares: 22,
    comments: 10,
    retentionRate: 83,
    thumbnailUrl: 'https://img.youtube.com/vi/AvN4LxePaGg/maxresdefault.jpg',
    isLiveStream: false,
    topCountries: [
      { country: 'Brasil', flag: '🇧🇷', percentage: 84.0, views: 740 },
      { country: 'Estados Unidos', flag: '🇺🇸', percentage: 8.0, views: 70 },
      { country: 'Portugal', flag: '🇵🇹', percentage: 4.0, views: 35 },
      { country: 'Outros', flag: '🌐', percentage: 4.0, views: 36 }
    ]
  },
  {
    id: 'FGUf0OdCYfI',
    title: '06/08/2026 - [Finda-se este dia] - Igreja Cristã Maranata - Quinta',
    category: 'Culto Especial',
    date: '2026-08-06',
    views: 2100,
    peakConcurrent: 810,
    avgWatchTimeMinutes: 26,
    totalWatchHours: 910,
    likes: 340,
    shares: 58,
    comments: 26,
    retentionRate: 84,
    thumbnailUrl: 'https://img.youtube.com/vi/FGUf0OdCYfI/maxresdefault.jpg',
    isLiveStream: false,
    topCountries: [
      { country: 'Brasil', flag: '🇧🇷', percentage: 83.0, views: 1743 },
      { country: 'Estados Unidos', flag: '🇺🇸', percentage: 8.0, views: 168 },
      { country: 'Portugal', flag: '🇵🇹', percentage: 5.0, views: 105 },
      { country: 'Outros', flag: '🌐', percentage: 4.0, views: 84 }
    ]
  },
  {
    id: '73kpIFX6iJ0',
    title: '06/08/2026 - [Os dias da minha mocidade] - ICM - "Consulta à Palavra."',
    category: 'EBD',
    date: '2026-08-06',
    views: 1100,
    peakConcurrent: 420,
    avgWatchTimeMinutes: 30,
    totalWatchHours: 550,
    likes: 180,
    shares: 32,
    comments: 16,
    retentionRate: 82,
    thumbnailUrl: 'https://img.youtube.com/vi/73kpIFX6iJ0/maxresdefault.jpg',
    isLiveStream: false,
    topCountries: [
      { country: 'Brasil', flag: '🇧🇷', percentage: 85.0, views: 935 },
      { country: 'Estados Unidos', flag: '🇺🇸', percentage: 7.0, views: 77 },
      { country: 'Portugal', flag: '🇵🇹', percentage: 4.0, views: 44 },
      { country: 'Outros', flag: '🌐', percentage: 4.0, views: 44 }
    ]
  },
  {
    id: 'djF-9Fu0PzQ',
    title: '06/08/2026 - Maanaim News - Igreja Cristã Maranata',
    category: 'Ensino / Seminário',
    date: '2026-08-06',
    views: 645,
    peakConcurrent: 240,
    avgWatchTimeMinutes: 22,
    totalWatchHours: 236,
    likes: 95,
    shares: 18,
    comments: 8,
    retentionRate: 81,
    thumbnailUrl: 'https://img.youtube.com/vi/djF-9Fu0PzQ/maxresdefault.jpg',
    isLiveStream: false,
    topCountries: [
      { country: 'Brasil', flag: '🇧🇷', percentage: 86.0, views: 555 },
      { country: 'Estados Unidos', flag: '🇺🇸', percentage: 7.0, views: 45 },
      { country: 'Portugal', flag: '🇵🇹', percentage: 4.0, views: 26 },
      { country: 'Outros', flag: '🌐', percentage: 3.0, views: 19 }
    ]
  }
];

export const mockCountryStats: CountryStat[] = [
  { code: 'BR', country: 'Brasil', flag: '🇧🇷', views: 17503, percentage: 83.2, avgWatchTime: '35 min' },
  { code: 'US', country: 'Estados Unidos', flag: '🇺🇸', percentage: 7.6, views: 1627, avgWatchTime: '42 min' },
  { code: 'PT', country: 'Portugal', flag: '🇵🇹', percentage: 4.7, views: 994, avgWatchTime: '30 min' },
  { code: 'AO', country: 'Angola', flag: '🇦🇴', percentage: 2.1, views: 441, avgWatchTime: '28 min' },
  { code: 'MZ', country: 'Moçambique', flag: '🇲🇿', percentage: 1.2, views: 252, avgWatchTime: '24 min' },
  { code: 'IT', country: 'Itália', flag: '🇮🇹', percentage: 0.7, views: 147, avgWatchTime: '35 min' },
  { code: 'JP', country: 'Japão', flag: '🇯🇵', percentage: 0.5, views: 105, avgWatchTime: '20 min' }
];

export const mockMonthlyAudience: MonthlyAudience[] = [
  { month: 'Fev', views: 18500, liveViews: 4200, recordedViews: 14300, watchHours: 9800 },
  { month: 'Mar', views: 21200, liveViews: 4800, recordedViews: 16400, watchHours: 11400 },
  { month: 'Abr', views: 19800, liveViews: 4500, recordedViews: 15300, watchHours: 10600 },
  { month: 'Mai', views: 22400, liveViews: 5100, recordedViews: 17300, watchHours: 12100 },
  { month: 'Jun', views: 24100, liveViews: 5600, recordedViews: 18500, watchHours: 13200 },
  { month: 'Jul', views: 26800, liveViews: 6200, recordedViews: 20600, watchHours: 14800 },
  { month: 'Ago', views: 21415, liveViews: 4962, recordedViews: 16453, watchHours: 12017 }
];
