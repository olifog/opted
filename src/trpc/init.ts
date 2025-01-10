
import { initTRPC, TRPCError } from '@trpc/server';
import { cache } from 'react';
import { createClient } from '@/utils/supabase/server';
import { SuperJSON } from 'superjson';

export const createTRPCContext = cache(async () => {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  return { supabase, user };
});

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: SuperJSON,
});

export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const baseProcedure = t.procedure;

export const protectedProcedure = t.procedure.use((opts) => {
  if (!opts.ctx.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }
  return opts.next({
    ctx: { user: opts.ctx.user },
  });
});
