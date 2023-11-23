import { z } from "zod";
import { CreateEventSchema } from "~/schema/event.schema";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const eventRouter = createTRPCRouter({
  getEventTypes: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.eventType.findMany();
  }),

  getEvents: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.event.findMany({ include: { type: true } });
  }),
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input: { id } }) => {
      return ctx.db.event.findFirst({
        where: {
          id,
        },
        include: { type: true },
      });
    }),
  getUpcomingEvents: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.event.findMany({
      where: { start: { gte: new Date() } },
      include: { type: true },
    });
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
