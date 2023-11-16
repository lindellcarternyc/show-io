import { createTRPCRouter, publicProcedure } from "../trpc";

export const showRoleRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.showRole.findMany({
      include: {
        showMembers: true,
      },
    });
  }),
});
