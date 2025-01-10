import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../init";
import { TRPCError } from "@trpc/server";

export const taskRouter = createTRPCRouter({
  getTasks: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.supabase
      .from("task")
      .select("*")
      .eq("user_id", ctx.user.id);
  }),
  createTask: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        description: z.string().optional(),
        deadline: z.string().optional(),
        startline: z.string().optional(),
        enforceChildOrder: z.boolean().optional(),
        parentTaskId: z.number().optional(),
        parentTaskIndex: z.number().optional(),
        timeEstimate: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (
        typeof input.parentTaskIndex !== "undefined" &&
        typeof input.parentTaskId === "undefined"
      ) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message:
            "Parent task ID is required when parent task index is provided",
        });
      }

      if (
        typeof input.parentTaskId !== "undefined" &&
        typeof input.parentTaskIndex === "undefined"
      ) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message:
            "Parent task index is required when parent task ID is provided",
        });
      }

      return await ctx.supabase.from("task").insert({
        name: input.name,
        description: input.description,
        deadline: input.deadline,
        startline: input.startline,
        user_id: ctx.user.id,
        enforce_child_order: input.enforceChildOrder,
        parent_task_id: input.parentTaskId,
        parent_task_index: input.parentTaskIndex,
        time_estimate: input.timeEstimate,
        complete: false,
      });
    }),
  deleteTask: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.supabase.from("task").delete().eq("id", input.id);
    }),
  updateTask: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        name: z.string().optional(),
        description: z.string().optional(),
        deadline: z.string().optional(),
        startline: z.string().optional(),
        complete: z.boolean().optional(),
        timeEstimate: z.number().optional(),
        enforceChildOrder: z.boolean().optional(),
        parentTaskId: z.number().optional(),
        parentTaskIndex: z.number().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.supabase
        .from("task")
        .update({
          name: input.name,
          description: input.description,
          deadline: input.deadline,
          startline: input.startline,
          complete: input.complete,
          time_estimate: input.timeEstimate,
          enforce_child_order: input.enforceChildOrder,
          parent_task_id: input.parentTaskId,
          parent_task_index: input.parentTaskIndex,
        })
        .eq("id", input.id);
    }),
  updateTaskLocations: protectedProcedure
    .input(
      z.object({
        tasks: z.array(
          z.object({
            id: z.number(),
            parentTaskId: z.number().optional(),
            parentTaskIndex: z.number().optional(),
          })
        ),
      })
    )
    .mutation(async ({ ctx, input }) => {
      console.log(input.tasks)
      const results = await Promise.all(input.tasks.map(async (task) => {
        await ctx.supabase
          .from("task")
          .update({
            parent_task_id: task.parentTaskId,
            parent_task_index: task.parentTaskIndex,
          })
          .eq("id", task.id);
      }));
      return results;
    }),
});
