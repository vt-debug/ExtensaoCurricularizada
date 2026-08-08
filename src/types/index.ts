export type Category = 
  | 'Culto Especial' 
  | 'EBD' 
  | 'Madrugada de Oração' 
  | 'Louvor' 
  | 'Convenção' 
  | 'Ensino / Seminário'
  | 'Multilíngue';

export interface EventData {
  id: string;
  title: string;
  category: Category;
  date: string;
  views: number;
  peakConcurrent: number;
  avgWatchTimeMinutes: number;
  totalWatchHours: number;
  likes: number;
  shares: number;
  comments: number;
  retentionRate: number; // percentage
  thumbnailUrl: string;
  isLiveStream: boolean;
  topCountries: { country: string; flag: string; percentage: number; views: number }[];
}

export interface CountryStat {
  code: string;
  country: string;
  flag: string;
  views: number;
  percentage: number;
  avgWatchTime: string;
}

export interface MonthlyAudience {
  month: string;
  views: number;
  liveViews: number;
  recordedViews: number;
  watchHours: number;
}

export interface FilterState {
  period: '7d' | '30d' | '90d' | '1y' | 'all';
  category: string;
  searchQuery: string;
  sortBy: 'date' | 'views' | 'peakConcurrent' | 'totalWatchHours';
  sortOrder: 'asc' | 'desc';
}
