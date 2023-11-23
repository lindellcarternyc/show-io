import { z } from "zod";

export const CreateCallSchema = z.object({
  start: z.union([z.string(), z.date()]),
  end: z.union([z.string(), z.date()]),
  title: z.string().min(5),
  personnel: z.string().array(),
});

export type CreateCallData = z.infer<typeof CreateCallSchema>;
