// types/supabase.d.ts
import { Database } from "./supabaseTypes"; // assuming you will generate these types from Supabase later

declare module "@supabase/supabase-js" {
  export interface SupabaseClient extends Database {}
}
