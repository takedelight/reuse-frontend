import { z as zod } from "zod/v4";

export const sessionSchema = zod.object({
  id: zod.uuid(),
  userAgent: zod.string().nullable(),
  ip_address: zod.string().nullable(),
  isCurrent: zod.boolean(),
  device: zod.string().nullable(),
  expires: zod.date(),
});

export type Session = zod.infer<typeof sessionSchema>;
