import { z } from 'zod';
import { baseProcedure, createTRPCRouter } from '../init';
import { userRouter } from './user';
import { taskRouter } from './task';

export const appRouter = createTRPCRouter({
  hello: baseProcedure
    .input(
      z.object({
        text: z.string(),
      }),
    )
    .query((opts) => {
      return {
        greeting: `hello ${opts.input.text}`,
      };
    }),
  user: userRouter,
  task: taskRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;