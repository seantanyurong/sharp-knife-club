import { createClient, type SupabaseClient } from '@supabase/supabase-js';

let client: SupabaseClient | null = null;

/**
 * Lazily created so the module can be imported without the env vars present —
 * Next evaluates route modules at build time, and createClient throws
 * immediately on a missing URL.
 */
export function getSupabase(): SupabaseClient {
  if (!client) {
    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!url || !key) {
      throw new Error(
        'SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set',
      );
    }

    client = createClient(url, key);
  }

  return client;
}
