import { z as zod } from "zod/v4";
import { userSchema } from "./user.schema";

export const updateUserSchema = userSchema.partial();

export type UpdateUserInput = zod.input<typeof updateUserSchema>;
export type UpdateUserOutput = zod.output<typeof updateUserSchema>;
