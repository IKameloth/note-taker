import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const noteRouter = createTRPCRouter({
  getAll: protectedProcedure
    .input(z.object({ topicId: z.string() }))
    .query(({ input, ctx }) => {
      return ctx.db.note.findMany({
        where: {
          topicId: input.topicId,
        },
      });
    }),
  createNote: protectedProcedure
    .input(
      z.object({ title: z.string(), content: z.string(), topicId: z.string() }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.note.create({
        data: {
          title: input.title,
          topicId: input.topicId,
          content: input.content,
        },
      });
    }),
  removeNote: protectedProcedure
    .input(z.object({ noteId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      return ctx.db.note.delete({
        where: {
          id: input.noteId,
        },
      });
    }),
});
