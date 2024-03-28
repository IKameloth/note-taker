import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const topicRouter = createTRPCRouter({
  getAllTopic: protectedProcedure.query(({ ctx }) => {
    return ctx.db.topic.findMany({
      where: {
        userId: ctx.session.user.id,
      },
    });
  }),
  createTopic: protectedProcedure
    .input(
      z.object({
        title: z.string(),
      }),
    )
    .mutation(({ input, ctx }) => {
      return ctx.db.topic.create({
        data: {
          title: input.title,
          userId: ctx.session.user.id,
        },
      });
    }),
});
