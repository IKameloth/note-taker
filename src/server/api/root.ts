import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { topicRouter } from "./routers/topicRouter";
import { noteRouter } from "./routers/noteRouter";

export const appRouter = createTRPCRouter({
  topic: topicRouter,
  note: noteRouter,
});

export type AppRouter = typeof appRouter;
export const createCaller = createCallerFactory(appRouter);
