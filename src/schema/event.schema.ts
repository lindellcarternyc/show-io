import { z } from "zod";

export const EventSchema = z.object({
  id: z.string(),
  type: z.string(),
  start: z.coerce.date(),
  end: z.coerce.date(),
  location: z.string().min(5),
});

export const CreateEventSchema = EventSchema.omit({ id: true });

export type CreateEventData = z.infer<typeof CreateEventSchema>;
