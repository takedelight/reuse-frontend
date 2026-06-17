import { z as zod } from "zod/v4";

export const loginSchema = zod.object({
  email: zod.email({ error: "errors.client.invalid_email" }),
  password: zod
    .string()
    .min(8, { error: "errors.client.invalid_password.min_length" })
    .max(32, { error: "errors.client.invalid_password.max_length" }),
  isRememberMe: zod.boolean().default(false).optional(),
});

export type LoginSchemaInput = zod.input<typeof loginSchema>;
export type LoginSchemaOutput = zod.output<typeof loginSchema>;
