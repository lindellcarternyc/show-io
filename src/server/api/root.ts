import { postRouter } from "~/server/api/routers/post";
import { createTRPCRouter } from "~/server/api/trpc";
import { eventRouter } from "./routers/event";
import { showRoleRouter } from "./routers/show-role";
import { showMemberRouter } from "./routers/show-member";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  event: eventRouter,
  post: postRouter,
  showRole: showRoleRouter,
  showMember: showMemberRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
