
import { initTRPC } from '@trpc/server';
import { cache } from 'react';
import { createClient } from '@/utils/supabase/server';
import { SuperJSON } from 'superjson';
import { cookies } from 'next/headers';

export const createTRPCContext = cache(async () => {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  return { supabase };
});

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: SuperJSON,
});

export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const baseProcedure = t.procedure;