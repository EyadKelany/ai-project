/* ===== SUPABASE CLIENT CONFIGURATION ===== */
const SUPABASE_URL = 'https://xknsmzuewsbtruqhfker.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhrbnNtenVld3NidHJ1cWhma2VyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQwMTc1ODIsImV4cCI6MjA5OTU5MzU4Mn0.1SXx1oRzGKjjsJC_yV2OGbdH-HBbPlnWWfaJs_1j5sE';

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
