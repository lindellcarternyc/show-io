import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const callListRouter = createTRPCRouter({
  getByEventId: publicProcedure
    .input(z.object({ eventId: z.string() }))
    .query(({ ctx, input: { eventId } }) => {
      return ctx.db.callList.findFirst({
        where: { eventId },
        include: {
          calls: { include: { personnel: true } },
        },
      });
    }),
});
