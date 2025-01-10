import { z } from "zod";
import { createTRPCRouter } from "../init";
import { baseProcedure } from "../init";

export const userRouter = createTRPCRouter({
  deleteUser:
    baseProcedure
    .input(z.object({
      id: z.string()
    }))
    .mutation(async ({ input, ctx }) => {
      return await ctx.supabase.auth.admin.deleteUser(input.id);
    }),
  getSignedInUser:
    baseProcedure
    .query(async ({ ctx }) => {
      return await ctx.supabase.auth.getUser()
    }),
});
