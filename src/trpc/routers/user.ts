import { z } from "zod";
import { baseProcedure, createTRPCRouter, protectedProcedure } from "../init";

export const userRouter = createTRPCRouter({
  deleteUser:
    protectedProcedure
    .input(z.object({
      id: z.string()
    }))
    .mutation(async ({ input, ctx }) => {
      return await ctx.supabase.auth.admin.deleteUser(input.id);
    }),
  getSignedInUser:
    baseProcedure
    .query(async ({ ctx }) => {
      const user = await ctx.supabase.auth.getUser();
      return user.data.user;
    }),
});
