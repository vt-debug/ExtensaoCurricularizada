import { createClient } from '@supabase/supabase-js';

// URL e chave pública do projeto Supabase: kkdtlaoizooxibimntec
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://kkdtlaoizooxibimntec.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_tsfH1ClgG0h5_oURYm_MbQ_oNhWp-g2';

export const isSupabaseConfigured = Boolean(supabaseAnonKey);

// Cliente oficial nativo do Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
