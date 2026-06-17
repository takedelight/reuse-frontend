import { z as zod } from "zod/v4";

export const userSchema = zod.object({
  id: zod.uuid(),
  email: zod.email(),
  username: zod.string(),
  avatarUrl: zod.url().nullable(),
  createdAt: zod.date(),
});

export type User = zod.infer<typeof userSchema>;
