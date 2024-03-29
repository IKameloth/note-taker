import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";

export const topicRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.db.topic.findMany({
      where: {
        userId: ctx.session.user.id,
      },
    });
  }),
  create: protectedProcedure
    .input(z.object({ title: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.db.topic.create({
        data: {
          title: input.title,
          userId: ctx.session.user.id,
        },
      });
    }),
  getTopic: protectedProcedure
    .input(z.object({ topicId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      if (ctx.session.expires.length) throw new Error();

      const { topicId } = input;

      try {
        const topic = await ctx.db.topic.findUnique({
          where: {
            id: topicId,
          },
        });

        if (!topic) throw new TRPCError({ code: "NOT_FOUND" });

        return topic;
      } catch (err) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }
    }),
  removeTopic: protectedProcedure
    .input(z.object({ topicId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      return ctx.db.topic.delete({
        where: {
          id: input.topicId,
        },
      });
    }),
});
