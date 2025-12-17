import { createClient } from '@supabase/supabase-js';

const environment = {
  production: false,
  supabaseUrl: 'https://plpvrdbxqjtzubxyqvsh.supabase.co',
  supabaseAnonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBscHZyZGJ4cWp0enVieHlxdnNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMwNzM3MTAsImV4cCI6MjA3ODY0OTcxMH0.sLdHXXJrdo-LUS7y3npI4ok6WAdOblap6x2ks7236_4'
};

const supabaseUrl = environment.supabaseUrl;
const supabaseAnonKey = environment.supabaseAnonKey;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
