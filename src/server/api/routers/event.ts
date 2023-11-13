import { z } from "zod";
import { CreateEventSchema } from "~/schema/event.schema";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const eventRouter = createTRPCRouter({
  getEventTypes: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.eventType.findMany();
  }),

  getEvents: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.event.findMany();
  }),

  getUpcomingEvents: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.event.findMany({ where: { start: { gte: new Date() } } });
  }),
  create: publicProcedure
    .input(z.object({ data: CreateEventSchema }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.event.create({
        data: {
          start: input.data.start,
          end: input.data.end,
          location: input.data.location,
          typeId: input.data.type,
        },
      });
    }),
});
