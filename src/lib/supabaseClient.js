import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

let supabase;

if (!globalThis.supabase) {
  globalThis.supabase = createClient(supabaseUrl, supabaseAnonKey);
}

supabase = globalThis.supabase;

export { supabase };
