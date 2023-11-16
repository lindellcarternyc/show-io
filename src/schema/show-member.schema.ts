import { z } from "zod";

export const CreateShowMemberSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  showRoleId: z.string().min(1),
});

export type CreateShowMemberData = z.infer<typeof CreateShowMemberSchema>;
