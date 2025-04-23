// supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mvhofqwvjmiqxucehiph.supabase.co'; 
const supabaseKey = import.meta.env.VITE_SUPABASE_APIKEY;

export const supabase = createClient(supabaseUrl, supabaseKey);
