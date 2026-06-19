import { z as zod } from "zod/v4";
import {
  BIO_MAX_LENGTH,
  USERNAME_MAX_LENGTH,
  USERNAME_MIN_LENGTH,
} from "../const";

export const userSchema = zod.object({
  id: zod.uuid(),
  email: zod.email(),
  username: zod
    .string()
    .min(USERNAME_MIN_LENGTH, "validation.user.username.min_length")
    .max(USERNAME_MAX_LENGTH, "validation.user.username.max_length"),
  bio: zod
    .string()
    .max(BIO_MAX_LENGTH, "validation.user.bio.max_length")
    .nullable(),
  avatarUrl: zod.url().nullable(),
  createdAt: zod.date(),
});

export type User = zod.infer<typeof userSchema>;
