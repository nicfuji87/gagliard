import { createClient } from '@supabase/supabase-js';

// Fallback values in case env vars are not loaded (e.g. before server restart)
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://oyqauvfdgphohlkcmjew.supabase.co';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im95cWF1dmZkZ3Bob2hsa2NtamV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjcyODgyOTMsImV4cCI6MjA4Mjg2NDI5M30.1EzPqFrP3U8-vT8frY8OuAX_u56vv7wTraLLpyGaUOs';
export const SITE_ID = import.meta.env.VITE_SITE_ID || 'ac32b0c8-29e4-45c9-b50e-c1cc352ba83e';

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    console.error('Missing Supabase Config');
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
