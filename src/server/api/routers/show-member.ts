import { createTRPCRouter, publicProcedure } from "../trpc";
import { CreateShowMemberSchema } from "~/schema/show-member.schema";

export const showMemberRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.showMember.findMany({
      include: { showRole: true },
    });
  }),
  create: publicProcedure
    .input(CreateShowMemberSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.showMember.create({
        data: input,
      });
    }),
});
